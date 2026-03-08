import React from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-40 bg-[#fff5f0] dark:bg-neutral-950 transition-colors duration-700 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-24 lg:gap-40">
          <div className="lg:w-1/2 relative group">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-100px" }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl hover:shadow-orange-900/10 transition-all duration-700"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1734771708318-b8cb38c095d0"
                alt="Artisan Process"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-orange-900/5 dark:bg-neutral-950/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fff5f0]/80 dark:from-neutral-950 via-transparent to-transparent opacity-60 transition-colors duration-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5,
                duration: 1,
                ease: "easeOut",
              }}
              className="absolute -bottom-10 -right-10 lg:-right-20 bg-white/80 dark:bg-neutral-900/80 border border-orange-100 dark:border-white/5 p-12 rounded-[2rem] backdrop-blur-2xl shadow-2xl dark:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] max-w-[320px] hidden md:block"
            >
              <span className="text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-[0.4em] block mb-6">
                Certified Artisans
              </span>
              <p className="text-stone-900 dark:text-neutral-100 font-serif italic text-2xl leading-relaxed">
                "We don't just pour wax; we bottle atmosphere."
              </p>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="text-orange-700 dark:text-orange-400 uppercase tracking-[0.5em] text-[10px] font-bold">
                  The Studio Ethos
                </span>
                <h2 className="text-5xl md:text-7xl font-serif text-stone-900 dark:text-white leading-[1.1]">
                  Slow-Burned <br />
                  <span className="text-stone-400 font-light italic">
                    Perfection
                  </span>
                </h2>
              </div>

              <div className="space-y-8 text-stone-600 dark:text-neutral-400 text-xl leading-relaxed font-light">
                <p>
                  At Lumina, we reject the industrial. Each
                  candle is a testament to the patient hands of
                  our artisans in our Brooklyn-based studio.
                </p>
                <p>
                  By sourcing 100% ecological soy wax and
                  cold-pressed botanical essences, we create a
                  sensory experience that is as pure as it is
                  profound. No fillers, no toxins—just the quiet
                  poetry of light.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-16 gap-y-12 pt-12 border-t border-orange-100 dark:border-white/5">
                {[
                  {
                    title: "Eco-Soy",
                    desc: "Non-toxic, vegan wax",
                  },
                  {
                    title: "Pure Cotton",
                    desc: "Lead-free core wicks",
                  },
                  {
                    title: "Cold Pressed",
                    desc: "Premium essential oils",
                  },
                  {
                    title: "Recyclable",
                    desc: "Artisan glass jars",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-stone-900 dark:text-white text-base font-serif italic tracking-wide">
                      {item.title}
                    </h4>
                    <p className="text-[11px] uppercase tracking-widest text-orange-700/60 dark:text-orange-400/60 font-bold">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};