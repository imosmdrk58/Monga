import RelativeTime from '@/components/RelativeTime'
import { DescriptionList } from '@/components/ui'
import TagList from '@/heros/StoryHero/TagList'
import { Story } from '@/payload-types'

type StoryDescriptionListProps = {
  item: Story
}
function StoryDescriptionList({ item }: StoryDescriptionListProps) {
  return (
    <DescriptionList>
      <>
        <DescriptionList.Term>Author:</DescriptionList.Term>
        <DescriptionList.Details>{item.author}</DescriptionList.Details>
      </>
      <>
        <DescriptionList.Term>Chapters:</DescriptionList.Term>
        <DescriptionList.Details>
          <Chapters chapters={item.chapters} />
        </DescriptionList.Details>
      </>
      <>
        <DescriptionList.Term>Categories:</DescriptionList.Term>
        <DescriptionList.Details>
          <TagList tags={item.categories} />
        </DescriptionList.Details>
      </>
      <>
        <DescriptionList.Term>Published:</DescriptionList.Term>
        <DescriptionList.Details>
          <RelativeTime date={item.publishedAt} />
        </DescriptionList.Details>
      </>
    </DescriptionList>
  )
}

function Chapters(props: { chapters: Story['chapters'] }) {
  const { chapters } = props
  if (chapters === undefined || chapters === null) return chapters
  return chapters.chapters?.length
}

export default StoryDescriptionList
