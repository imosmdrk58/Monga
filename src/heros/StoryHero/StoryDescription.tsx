'use client'
import { ShowMore } from '@/components/ui'
import { Story } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type StoryDescriptionProps = {
  item: Story
}
function StoryDescription({ item }: StoryDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  if (!item.description || item.description.length <= 200)
    return <p className="text-sm">{item.description}</p>

  return (
    <div className="space-y-8">
      <p className={cn('text-sm transition-all', isExpanded ? 'line-clamp-none' : 'line-clamp-3')}>
        {item.description}
      </p>
      <ShowMore onChange={setIsExpanded} isSelected={isExpanded}>
        {({ isSelected }) => (
          <>
            {isSelected ? 'Show more' : 'Show less'}
            <ChevronDown
              className={cn(
                isSelected ? 'rotate-180' : '',
                'size-4 transition-transform duration-200',
              )}
            />
          </>
        )}
      </ShowMore>
    </div>
  )
}

export default StoryDescription
