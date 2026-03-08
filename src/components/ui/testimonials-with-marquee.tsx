import { cn } from "../../lib/utils"
import { TestimonialCard, TestimonialAuthor } from "./testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-transparent text-foreground",
      "py-24 sm:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex w-full flex-col items-center gap-16 text-center">
        <div className="flex flex-col items-center gap-6 px-4">
          <span className="text-orange-700 dark:text-orange-400 uppercase tracking-[0.4em] text-[10px] font-bold">Client Rituals</span>
          <h2 className="max-w-[720px] text-4xl md:text-6xl font-serif leading-tight text-stone-900 dark:text-white">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-light text-stone-500 dark:text-neutral-400 sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10">
          <div className="group flex overflow-hidden p-2 [--gap:2rem] [gap:var(--gap)] flex-row [--duration:60s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-[#fff5f0] dark:from-neutral-950 sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 bg-gradient-to-l from-[#fff5f0] dark:from-neutral-950 sm:block" />
        </div>
      </div>
    </section>
  )
}
