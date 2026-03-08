"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "../../lib/utils"

interface Social {
  name: string
  image: string
  href?: string
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[]
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null)
  const [rotation, setRotation] = React.useState<number>(0)
  const [clicked, setClicked] = React.useState<boolean>(false)

  const animation = {
    scale: clicked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  }

  React.useEffect(() => {
    const handleClick = () => {
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 200)
    }
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [clicked])

  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    >
      {socials.map((social, index) => (
        <div
          className={cn(
            "relative cursor-pointer px-6 py-4 transition-all duration-500",
            hoveredSocial && hoveredSocial !== social.name
              ? "opacity-30 blur-[1px]"
              : "opacity-100"
          )}
          key={index}
          onMouseEnter={() => {
            setHoveredSocial(social.name)
            setRotation(Math.random() * 30 - 15)
          }}
          onMouseLeave={() => setHoveredSocial(null)}
          onClick={() => {
            setClicked(true)
          }}
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] font-bold text-stone-900 dark:text-white">
            {social.name}
          </span>
          <AnimatePresence>
            {hoveredSocial === social.name && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={animation}
              >
                <motion.img
                  key={social.name}
                  src={social.image}
                  alt={social.name}
                  className="w-24 h-24 object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-neutral-800"
                  initial={{
                    y: 20,
                    rotate: rotation,
                    opacity: 0,
                    scale: 0.5,
                    filter: "blur(10px)",
                  }}
                  animate={{ y: -70, opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
