import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import "./face.css";

export default function ScopeMethodology() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [active, setActive] = useState<number | null>(null);
  const showCriteria = controls.showEvaluationCriteria?.value ?? true;

  return (
    <div
      ref={ref}
      className="w-full h-full bg-ivory text-ink font-body overflow-hidden flex flex-col p-5 @xl:p-16"
    >
      <div className="flex items-baseline justify-between border-b border-gold/45 pb-2 @xl:pb-5">
        <div className="flex items-baseline gap-3 @xl:gap-7">
          <TextContent
            content={blocks.sectionNo.content}
            data-content-keys={["sectionNo"]}
            className="font-mono text-[12px] @xl:text-[24px] tracking-[0.2em] text-gold"
          />
          <TextContent
            content={blocks.sectionTitle.content}
            data-content-keys={["sectionTitle"]}
            className="font-display font-bold text-[23px] @xl:text-[56px] leading-none"
          />
        </div>
        <TextContent
          content={blocks.sectionNote.content}
          data-content-keys={["sectionNote"]}
          className="hidden @xl:block font-mono text-[18px] tracking-[0.2em] uppercase text-warm-gray"
        />
      </div>

      <div className="grid grid-cols-1 @xl:grid-cols-12 gap-4 @xl:gap-14 pt-3 @xl:pt-8 flex-1 min-h-0">
        <div className="@xl:col-span-5 flex flex-col">
          <div className="bg-midnight text-ivory p-3 @xl:p-8">
            <TextContent
              content={blocks.positionLabel.content}
              data-content-keys={["positionLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-champagne"
            />
            <TextContent
              content={blocks.position.content}
              data-content-keys={["position"]}
              className="mt-1.5 @xl:mt-4 font-display font-semibold text-[16px] @xl:text-[36px] leading-[1.15] text-ivory-soft"
            />
            <TextContent
              content={blocks.positionDetail.content}
              data-content-keys={["positionDetail"]}
              className="mt-1.5 @xl:mt-4 text-[11px] @xl:text-[21px] leading-snug text-ivory/75"
            />
          </div>

          <div className="mt-3 @xl:mt-7">
            <TextContent
              content={blocks.scopeLabel.content}
              data-content-keys={["scopeLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
            />
            <div className="mt-1.5 @xl:mt-4 flex flex-wrap gap-1.5 @xl:gap-3">
              {blocks.scopeItems.rows.map((s, i) => (
                <motion.span
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                  className="border border-ink/25 px-2 @xl:px-4 py-0.5 @xl:py-1.5"
                >
                  <TextContent
                    content={s.label}
                    data-content-keys={[`scopeItems.rows.${i}.label`]}
                    className="font-mono text-[9px] @xl:text-[18px] tracking-[0.1em] uppercase"
                  />
                </motion.span>
              ))}
            </div>
          </div>

          <div className="mt-3 @xl:mt-7 border-t border-gold/40 pt-2.5 @xl:pt-6">
            <TextContent
              content={blocks.qLabel.content}
              data-content-keys={["qLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
            />
            {blocks.questions.rows.map((q, i) => (
              <div key={q.id} className={i > 0 ? "mt-2 @xl:mt-5" : "mt-1.5 @xl:mt-4"}>
                <TextContent
                  content={q.question}
                  data-content-keys={[`questions.rows.${i}.question`]}
                  className="font-display italic font-semibold text-[13px] @xl:text-[29px] leading-tight text-wine"
                />
                <TextContent
                  content={q.answer}
                  data-content-keys={[`questions.rows.${i}.answer`]}
                  className="mt-0.5 @xl:mt-2 text-[11px] @xl:text-[21px] leading-snug text-ink/80"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="@xl:col-span-7 flex flex-col min-h-0">
          <TextContent
            content={blocks.methodLabel.content}
            data-content-keys={["methodLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
          />
          <TextContent
            content={blocks.methodIntro.content}
            data-content-keys={["methodIntro"]}
            className="mt-1 @xl:mt-3 text-[11px] @xl:text-[21px] leading-snug text-ink/75"
          />
          <div className="mt-2 @xl:mt-5 flex flex-col">
            {blocks.steps.rows.map((s, i) => {
              const on = active === i;
              return (
                <motion.div
                  key={s.id}
                  onPointerEnter={() => setActive(i)}
                  onPointerLeave={() => setActive(null)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                  className={`flex gap-2.5 @xl:gap-7 items-baseline border-b py-1 @xl:py-2.5 transition-colors ${
                    on ? "border-gold bg-champagne/25" : "border-ink/15"
                  }`}
                >
                  <span
                    className={`font-mono text-[11px] @xl:text-[24px] w-5 @xl:w-12 shrink-0 ${
                      on ? "text-gold" : "text-warm-gray"
                    }`}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span className="flex-1">
                    <TextContent
                      content={s.name}
                      data-content-keys={[`steps.rows.${i}.name`]}
                      className="font-display font-bold text-[13px] @xl:text-[29px] leading-tight"
                    />
                    <TextContent
                      content={s.detail}
                      data-content-keys={[`steps.rows.${i}.detail`]}
                      className="text-[10px] @xl:text-[19px] leading-snug text-ink/65"
                    />
                  </span>
                </motion.div>
              );
            })}
          </div>

          {showCriteria && (
            <div className="mt-auto pt-2.5 @xl:pt-6">
              <TextContent
                content={blocks.evalLabel.content}
                data-content-keys={["evalLabel"]}
                className="font-mono text-[9px] @xl:text-[18px] tracking-[0.3em] uppercase text-gold"
              />
              <div className="mt-1.5 @xl:mt-3 grid grid-cols-5 gap-1.5 @xl:gap-4">
                {blocks.evalCriteria.rows.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.85 + i * 0.08 }}
                    className="border-t-2 border-gold/60 pt-1 @xl:pt-3"
                  >
                    <TextContent
                      content={c.name}
                      data-content-keys={[`evalCriteria.rows.${i}.name`]}
                      className="font-display font-bold text-[10px] @xl:text-[22px] leading-tight"
                    />
                    <TextContent
                      content={c.question}
                      data-content-keys={[`evalCriteria.rows.${i}.question`]}
                      className="text-[8px] @xl:text-[16px] leading-tight text-warm-gray"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
