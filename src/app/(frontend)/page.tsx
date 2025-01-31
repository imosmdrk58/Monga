import { Heading } from '@/components/ui'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import Tooltip from '@/components/ui/tooltip'
import configPromise from '@payload-config'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import { generateMetadata } from './[slug]/page'
export const dynamic = 'force-static'
export const revalidate = 600

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const [stories, newUpdate] = await Promise.all([
    payload.find({
      collection: 'stories',
      depth: 1,
      limit: 16,
      sort: '-views',
      where: {
        publishedAt: {
          exists: true,
        },
      },
    }),
    payload.find({
      collection: 'stories',
      draft: false,
      depth: 1,
      limit: 16,
      sort: '-publishedAt',
      where: {
        publishedAt: {
          exists: true,
        },
      },
    }),
  ])

  return (
    <div className="container mx-auto space-y-12">
      <div className="space-y-4">
        <Heading level={1}>Hot Stories 🔥</Heading>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8">
          {stories.docs.map((story) => (
            <Link key={story.id} href={`/stories/${story.slug}`} className="w-full h-full">
              <Card key={story.id} className="flex flex-col h-full">
                <CardHeader className="flex-1">
                  {story.banner && typeof story.banner !== 'number' ? (
                    <Image
                      src={story.banner.url ?? story.banner.thumbnailURL ?? ''}
                      width={500}
                      height={800}
                      alt={story.banner.alt ?? story.banner.filename ?? story.title}
                      className="aspect-[5:8] h-[192px] rounded-sm"
                      // placeholder="blur"
                    />
                  ) : (
                    <div>No image</div>
                  )}
                </CardHeader>
                <CardFooter>
                  <Tooltip tooltip={story.title} delay={200} intent="inverse" placement="bottom">
                    <p className="text-sm line-clamp-1 w-full">{story.title}</p>
                  </Tooltip>
                  <span className="sr-only">{story.title}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Heading level={1}>New Updates 🆕</Heading>
        <ul className="relative [&>[data-drop-target]]:border [&>[data-drop-target]]:border-primary [&::-webkit-scrollbar]:size-0.5 [scrollbar-width:thin] max-h-96 overflow-auto rounded-lg border">
          {newUpdate.docs.map((story) => (
            <li
              className="relative group transition outline-none flex select-none gap-3 border-y px-3 -mb-px py-2 lg:text-sm text-fg -outline-offset-2 first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0 hover:bg-muted cursor-pointer"
              key={story.id}
            >
              <Link
                key={story.id}
                href={`/stories/${story.slug}`}
                className="w-full h-full flex items-center gap-2"
              >
                <ChevronRight className="size-3 text-muted-fg" />
                {story.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { generateMetadata }
