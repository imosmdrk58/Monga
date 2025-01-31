import { Button, Heading } from '@/components/ui'
import StoryDescription from '@/heros/StoryHero/StoryDescription'
import StoryDescriptionList from '@/heros/StoryHero/StoryDescriptionList'
import { Story } from '@/payload-types'
import { BookmarkPlus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ReadNowButton from './ReadNowButton'

type StoryHeroProps = {
  item: Story
}
function StoryHero({ item }: StoryHeroProps) {
  const { title, banner, publishedAt, categories, slug } = item
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[minmax(200px,400px)_auto] gap-4">
      <div className="space-y-4">
        {banner && typeof banner !== 'number' && (
          <Image
            src={banner.url ?? banner.thumbnailURL ?? ''}
            width={500}
            height={800}
            alt={banner.alt ?? banner.filename ?? title}
            className="aspect-[5:8] h-[192px] rounded-md"
            // placeholder="blur"
          />
        )}
        <div className="grid grid-cols-[1fr_auto] gap-4">
          <ReadNowButton story={item} className="uppercase col-span-full" />
          <Button appearance="outline" size="large" className="">
            Newest chapter
          </Button>
          <Button appearance="outline" size="large" isIconOnly className="">
            <BookmarkPlus />
          </Button>
        </div>
      </div>
      <div className="space-y-8">
        <div className="space-y-4">
          <Heading level={1} tracking="wider">
            {title}
          </Heading>
        </div>
        <StoryDescriptionList item={item} />
        <div className="space-y-2">
          <Heading level={4}>Description</Heading>
          <StoryDescription item={item} />
        </div>
      </div>
    </div>
  )
}

export default StoryHero
