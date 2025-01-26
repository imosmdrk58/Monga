'use client'

import { badgeStyles } from "@/components/ui/badge"
import { Story } from "@/payload-types"
import Link from "next/link"

function TagList(props: { tags: Story['categories'] }) {
  const { tags } = props
  if (tags === undefined || tags === null) return tags
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        if (typeof tag === 'number') return tag
        return (
          <Link
            href={`/stories?category=${tag.slug}`}
            className={badgeStyles({
              intent: 'primary',
            })}
            key={tag.id}
          >
            {tag.title}
          </Link>
        )
      })}
    </div>
  )
}

export default TagList
