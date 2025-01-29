import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Button, Heading, headingStyles } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ChevronLeftIcon, ChevronRightIcon, HomeIcon } from 'lucide-react'
import type { Chapter } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const chapters = await payload.find({
    collection: 'chapters',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        exists: true,
      },
    },
    select: {
      slug: true,
      _status: true,
    },
  })

  const params = chapters.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    chapterSlug?: string
  }>
}

async function ReadPage({ params }: Args) {
  const { slug = '', chapterSlug = '' } = await params
  const { isEnabled: draft } = await draftMode()
  const url = '/stories/' + slug + '/' + chapterSlug
  const [chapter, story] = await Promise.all([
    queryChapterBySlug({ slug: chapterSlug }),
    queryStoryBySlug({ slug }),
  ])

  if (!chapter) return <PayloadRedirects url={url} />
  const nextChapter = getNextChapter(story.chapters?.chapters as Chapter[], chapterSlug)
  const previousChapter = getPreviousChapter(story.chapters?.chapters as Chapter[], chapterSlug)
  return (
    <article className="pt-16 pb-16">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <div className="container mx-auto space-y-12">
        <Card className="shadow-none bg-muted">
          <CardHeader>
            <Link href={`/stories/${slug}`}>
              <Heading level={1} tracking="wider" className="text-center">
                {story.title}
              </Heading>
            </Link>
            <Heading level={4} className="text-center text-muted-fg font-medium">
              {chapter.title}
            </Heading>
            <p className="text-center text-muted-fg">
              Updated at&nbsp;
              {chapter.updatedAt ? new Date(chapter.updatedAt).toLocaleDateString() : 'No date'}
            </p>
          </CardHeader>
          <CardContent className="flex justify-center space-x-4 flex-wrap">
            {previousChapter && (
              <Link href={`/stories/${slug}/${previousChapter?.slug}`}>
                <Button intent="primary">
                  <ChevronLeftIcon className="size-5" />
                  Previous chapter
                </Button>
              </Link>
            )}
            {nextChapter && (
              <Button intent="primary">
                Next chapter
                <ChevronRightIcon className="size-5" />
              </Button>
            )}
          </CardContent>
        </Card>
        <section className="max-w-2xl mx-auto relative">
          {chapter.images.map(
            (image, i) =>
              typeof image === 'object' && (
                <Image
                  key={image.id}
                  src={image.url ?? ''}
                  alt={image.alt ?? image.filename ?? `${chapter.title} - ${i}`}
                  width={image.width ?? 500}
                  height={image.height ?? 800}
                  className="w-full h-auto"
                />
              ),
          )}
          <Card className="shadow-none bg-muted mt-8">
            <CardHeader className="flex justify-center space-x-4 flex-wrap item-center flex-row">
              <Link href={`/stories/${slug}`} className="w-fit">
                <Button intent="primary">
                  <HomeIcon className="size-5" />
                  Back to story
                </Button>
              </Link>
              {previousChapter && (
                <Link href={`/stories/${slug}/${previousChapter?.slug}`}>
                  <Button intent="primary">
                    <ChevronLeftIcon className="size-5" />
                    Previous chapter
                  </Button>
                </Link>
              )}
              {nextChapter && (
                <Button intent="primary">
                  Next chapter
                  <ChevronRightIcon className="size-5" />
                </Button>
              )}
            </CardHeader>
          </Card>
        </section>
      </div>
    </article>
  )
}
export async function generateMetadata({ params }: Args) {
  const { chapterSlug = '' } = await params
  const chapter = await queryChapterBySlug({ slug: chapterSlug })
  return generateMeta({ doc: chapter })
}
const queryChapterBySlug = cache(async ({ slug }) => {
  const payload = await getPayload({ config: configPromise })
  const chapters = await payload.find({
    collection: 'chapters',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return chapters.docs?.[0] ?? null
})
const queryStoryBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'stories',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
function getNextChapter(chapters: Chapter[], currentSlug: string) {
  const currentIndex = chapters.findIndex((chapter) => chapter.slug === currentSlug)
  return chapters[currentIndex + 1]
}
function getPreviousChapter(chapters: Chapter[], currentSlug: string) {
  const currentIndex = chapters.findIndex((chapter) => chapter.slug === currentSlug)
  return chapters[currentIndex - 1]
}
export default ReadPage
