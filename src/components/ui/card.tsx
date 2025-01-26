import { Heading } from '@/components/ui/heading'
import * as React from 'react'
import { tv } from 'tailwind-variants'

const card = tv({
  slots: {
    root: [
      'xrkr xkd2 rounded-lg border bg-bg text-fg shadow-xs has-[table]:overflow-hidden **:data-[slot=table-header]:bg-muted/50 has-[table]:**:data-[slot=card-footer]:border-t **:[table]:overflow-hidden',
    ],
    header: 'flex flex-col gap-y-1 px-6 py-5',
    title: 'font-semibold leading-none tracking-tight sm:leading-6',
    description: 'text-muted-fg text-sm',
    content:
      'px-6 pb-6 has-[table]:border-t has-[[data-slot=table-header]]:bg-muted/40 has-[table]:p-0 **:data-[slot=table-cell]:px-6 **:data-[slot=table-column]:px-6 [&:has(table)+[data-slot=card-footer]]:py-5',
    footer: 'flex items-center p-6 pt-0',
  },
})

const { root, header, title, description, content, footer } = card()

const Card: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div data-slot="card" className={root({ className })} {...props} />
)

const CardHeader: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div data-slot="card-header" className={header({ className })} ref={ref} {...props} />
)

const CardTitle: React.FC<
  { ref?: React.Ref<HTMLHeadingElement> } & React.ComponentProps<typeof Heading>
> = ({ className, ref, level, ...props }) => (
  <Heading data-slot="card-title" level={level} className={title({ className })} {...props} />
)

const CardDescription: React.FC<
  { ref?: React.Ref<HTMLParagraphElement> } & React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ref, ...props }) => (
  <p data-slot="description" className={description({ className })} ref={ref} {...props} />
)

const CardContent: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div cdata-slot="card-content" className={content({ className })} ref={ref} {...props} />
)

const CardFooter: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div data-slot="card-footer" className={footer({ className })} ref={ref} {...props} />
)

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
