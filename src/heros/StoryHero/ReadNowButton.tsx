import { Button } from '@/components/ui'
import { Story } from '@/payload-types'
import Link from 'next/link'

type ReadNowButtonProps = {
  story: Story
  className?: string
}
function ReadNowButton({ story, ...rest }: ReadNowButtonProps) {
  const firstChapterSlug = getFirstChapterSlug(story)
  if (!firstChapterSlug) {
    return (
      <Button {...rest} isDisabled>
        COMING SOON
      </Button>
    )
  }
  return (
    <Link href={`/stories/${story.slug}/${firstChapterSlug}`} className={rest.className}>
      <Button className="w-full">READ NOW</Button>
    </Link>
  )
}

function getFirstChapterSlug(story: Story) {
  if (!story.chapters?.chapters || story.chapters.chapters.length === 0) {
    return null
  }

  if (typeof story.chapters.chapters[0] === 'object') {
    return story.chapters.chapters[0].slug
  }

  return story.chapters.chapters[0]
}

export default ReadNowButton
