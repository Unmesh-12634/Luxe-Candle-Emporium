import { cn } from "../../lib/utils"
import { Avatar, AvatarImage } from "./avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-orange-100 dark:border-white/5",
        "bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm",
        "p-6 text-start sm:p-8",
        "hover:border-orange-200 dark:hover:border-white/10 transition-all duration-500 hover:shadow-xl hover:shadow-orange-900/5",
        "w-[320px] sm:w-[380px]",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border border-orange-100 dark:border-white/10">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-serif text-stone-900 dark:text-white">
            {author.name}
          </h3>
          <p className="text-xs text-orange-700/60 dark:text-orange-400/60 uppercase tracking-widest font-bold">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-6 text-stone-600 dark:text-neutral-400 font-light leading-relaxed italic">
        "{text}"
      </p>
    </Card>
  )
}
