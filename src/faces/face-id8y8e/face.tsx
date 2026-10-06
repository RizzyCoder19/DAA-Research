import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import "./face.css";

export default function Applications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [hover, setHover] = useState<number | null>(null);
  const cols = Number(controls.gridColumns?.value ?? 2);

  return (
    <div
      ref={ref}
      className="w-full h-full bg-ivory-soft text-ink font-body overflow-hidden flex flex-col p-5 @xl:p-14"
    >
      <div className="flex items-baseline justify-between border-b border-gold/45 pb-2 @xl:pb-4">
        <div className="flex items-baseline gap-3 @xl:gap-7">
          <TextContent
            content={blocks.sectionNo.content}
            data-content-keys={["sectionNo"]}
            className="font-mono text-[12px] @xl:text-[24px] text-gold tracking-[0.2em]"
          />
          <TextContent
            content={blocks.sectionTitle.content}
            data-content-keys={["sectionTitle"]}
            className="font-display font-bold text-[22px] @xl:text-[54px] leading-none"
          />
        </div>
        <TextContent
          content={blocks.sectionNote.content}
          data-content-keys={["sectionNote"]}
          className="hidden @xl:block font-mono text-[18px] tracking-[0.2em] uppercase text-warm-gray"
        />
      </div>

      <div className="grid grid-cols-1 @xl:grid-cols-[1.35fr_1fr] gap-4 @xl:gap-12 pt-2.5 @xl:pt-7 flex-1 min-h-0">
        <div className="flex flex-col min-h-0">
          <TextContent
            content={blocks.appsIntro.content}
            data-content-keys={["appsIntro"]}
            className="text-[11px] @xl:text-[21px] leading-snug text-ink/75 max-w-[980px]"
          />
          <div
            className="mt-2.5 @xl:mt-6 grid gap-x-3 @xl:gap-x-10 gap-y-2 @xl:gap-y-4"
            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          >
            {blocks.domains.rows.map((r, i) => (
              <motion.div
                key={r.id}
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover(null)}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                className={`border-t pt-1.5 @xl:pt-3 transition-colors ${
                  hover === i ? "border-gold" : "border-ink/20"
                }`}
              >
                <TextContent
                  content={r.name}
                  data-content-keys={[`domains.rows.${i}.name`]}
                  className="font-display font-bold text-[13px] @xl:text-[28px] leading-tight"
                />
                <TextContent
                  content={r.detail}
                  data-content-keys={[`domains.rows.${i}.detail`]}
                  className="mt-0.5 @xl:mt-1.5 text-[9px] @xl:text-[18px] leading-snug text-warm-gray"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-auto pt-2.5 @xl:pt-6 border-t border-gold/40">
            <TextContent
              content={blocks.qLabel.content}
              data-content-keys={["qLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
            />
            <div className="grid grid-cols-1 @xl:grid-cols-2 gap-2 @xl:gap-8 mt-1.5 @xl:mt-4">
              {blocks.questions.rows.map((q, i) => (
                <div key={q.id}>
                  <TextContent
                    content={q.question}
                    data-content-keys={[`questions.rows.${i}.question`]}
                    className="font-display italic font-semibold text-[12px] @xl:text-[27px] leading-tight text-wine"
                  />
                  <TextContent
                    content={q.answer}
                    data-content-keys={[`questions.rows.${i}.answer`]}
                    className="mt-0.5 @xl:mt-2 text-[10px] @xl:text-[19px] leading-snug text-ink/80"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 @xl:gap-6 min-h-0">
          <div>
            <TextContent
              content={blocks.advLabel.content}
              data-content-keys={["advLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
            />
            <div className="mt-1.5 @xl:mt-3 flex flex-col gap-1 @xl:gap-3">
              {blocks.advantages.rows.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="border-l-2 border-gold/60 pl-2 @xl:pl-5"
                >
                  <TextContent
                    content={r.name}
                    data-content-keys={[`advantages.rows.${i}.name`]}
                    className="font-mono text-[9px] @xl:text-[17px] tracking-[0.16em] uppercase text-ink/55"
                  />
                  <TextContent
                    content={r.detail}
                    data-content-keys={[`advantages.rows.${i}.detail`]}
                    className="text-[10px] @xl:text-[20px] leading-snug text-ink/85"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="bg-royal text-ivory p-3 @xl:p-7 border-t-2 border-gold mt-auto"
          >
            <TextContent
              content={blocks.limLabel.content}
              data-content-keys={["limLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-champagne"
            />
            <div className="mt-1.5 @xl:mt-4 flex flex-col gap-1 @xl:gap-3">
              {blocks.limitations.rows.map((r, i) => (
                <div key={r.id}>
                  <TextContent
                    content={r.name}
                    data-content-keys={[`limitations.rows.${i}.name`]}
                    className="font-display font-bold text-[12px] @xl:text-[25px] leading-tight text-ivory-soft"
                  />
                  <TextContent
                    content={r.detail}
                    data-content-keys={[`limitations.rows.${i}.detail`]}
                    className="text-[9px] @xl:text-[18px] leading-snug text-ivory/68"
                  />
                </div>
              ))}
            </div>
            <div className="h-px bg-gold/35 my-2 @xl:my-4" />
            <TextContent
              content={blocks.tradeoff.content}
              data-content-keys={["tradeoff"]}
              className="font-display italic text-[11px] @xl:text-[23px] leading-snug text-champagne"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
