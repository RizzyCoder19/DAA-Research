import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { RecurrenceEquation } from "./components/recurrence-equation";
import { RecursionLadder } from "./components/recursion-ladder";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import "./face.css";

export default function RecurrenceFace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [hover, setHover] = useState<string | null>(null);
  const showLadder = controls.showReductionLadder?.value ?? true;

  const terms = blocks.equationTerms.rows;
  const activeIndex = terms.findIndex((t) => t.id === hover);
  const active = activeIndex >= 0 ? terms[activeIndex] : terms[1];
  const activeIdx = activeIndex >= 0 ? activeIndex : 1;

  return (
    <div
      ref={ref}
      className="w-full h-full bg-midnight text-ivory font-body overflow-hidden flex flex-col p-5 @xl:p-16 relative"
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--champagne) 1.3px, transparent 1.3px)",
          backgroundSize: "54px 54px",
        }}
      />

      <div className="relative flex items-baseline justify-between border-b border-gold/40 pb-2 @xl:pb-5">
        <div className="flex items-baseline gap-3 @xl:gap-7">
          <TextContent
            content={blocks.sectionNo.content}
            data-content-keys={["sectionNo"]}
            className="font-mono text-[12px] @xl:text-[24px] tracking-[0.2em] text-gold"
          />
          <TextContent
            content={blocks.sectionTitle.content}
            data-content-keys={["sectionTitle"]}
            className="font-display font-bold text-[23px] @xl:text-[56px] leading-none text-ivory-soft"
          />
        </div>
        <TextContent
          content={blocks.sectionNote.content}
          data-content-keys={["sectionNote"]}
          className="hidden @xl:block font-mono text-[18px] tracking-[0.2em] uppercase text-warm-gray"
        />
      </div>

      <div className="relative grid grid-cols-1 @xl:grid-cols-12 gap-3 @xl:gap-12 pt-2.5 @xl:pt-7 flex-1 min-h-0">
        <div className="@xl:col-span-3 flex flex-col">
          <TextContent
            content={blocks.coreLabel.content}
            data-content-keys={["coreLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
          />
          <TextContent
            content={blocks.coreStatement.content}
            data-content-keys={["coreStatement"]}
            className="mt-1.5 @xl:mt-4 font-display font-semibold text-[16px] @xl:text-[34px] leading-[1.15] text-ivory-soft"
          />
          <div className="mt-2.5 @xl:mt-6 flex flex-col gap-1.5 @xl:gap-4">
            {blocks.components.rows.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="border-l border-gold/55 pl-2 @xl:pl-5"
              >
                <TextContent
                  content={c.name}
                  data-content-keys={[`components.rows.${i}.name`]}
                  className="font-mono text-[10px] @xl:text-[19px] tracking-[0.14em] uppercase text-champagne"
                />
                <TextContent
                  content={c.detail}
                  data-content-keys={[`components.rows.${i}.detail`]}
                  className="text-[10px] @xl:text-[19px] leading-snug text-ivory/70"
                />
              </motion.div>
            ))}
          </div>
          {showLadder && (
            <div className="mt-auto pt-2.5 @xl:pt-6">
              <TextContent
                content={blocks.ladderLabel.content}
                data-content-keys={["ladderLabel"]}
                className="font-mono text-[9px] @xl:text-[18px] tracking-[0.3em] uppercase text-gold"
              />
              <div className="mt-1.5 @xl:mt-4">
                <RecursionLadder rows={blocks.ladder.rows} inView={inView} blockKey="ladder" />
              </div>
            </div>
          )}
        </div>

        <div className="@xl:col-span-5 flex flex-col justify-center">
          <TextContent
            content={blocks.eqLabel.content}
            data-content-keys={["eqLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.26em] uppercase text-gold text-center"
          />
          <div className="my-3 @xl:my-9">
            <RecurrenceEquation terms={terms} activeId={hover} onHover={setHover} inView={inView} />
          </div>
          <div className="border-t border-b border-gold/40 py-2.5 @xl:py-7 min-h-[88px] @xl:min-h-[230px]">
            <TextContent
              content={active.label}
              data-content-keys={[`equationTerms.rows.${activeIdx}.label`]}
              className="font-mono text-[11px] @xl:text-[22px] tracking-[0.18em] uppercase text-champagne"
            />
            <TextContent
              content={active.meaning}
              data-content-keys={[`equationTerms.rows.${activeIdx}.meaning`]}
              className="mt-1.5 @xl:mt-4 font-display text-[14px] @xl:text-[31px] leading-[1.25] text-ivory-soft"
            />
          </div>
          <TextContent
            content={blocks.whyRecurrence.content}
            data-content-keys={["whyRecurrence"]}
            className="mt-2 @xl:mt-6 text-[11px] @xl:text-[21px] leading-snug text-ivory/70 text-center"
          />
        </div>

        <div className="@xl:col-span-4 flex flex-col">
          <div className="flex flex-col gap-1.5 @xl:gap-4">
            {blocks.methods.rows.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: 14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.4 + i * 0.12 }}
                className="border border-ivory/15 bg-royal/55 p-2 @xl:p-5"
              >
                <TextContent
                  content={m.name}
                  data-content-keys={[`methods.rows.${i}.name`]}
                  className="font-display font-bold text-[13px] @xl:text-[28px] leading-tight text-champagne"
                />
                <TextContent
                  content={m.detail}
                  data-content-keys={[`methods.rows.${i}.detail`]}
                  className="mt-0.5 @xl:mt-2 text-[10px] @xl:text-[19px] leading-snug text-ivory/72"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-auto pt-2.5 @xl:pt-6 border-t border-gold/35">
            <TextContent
              content={blocks.qLabel.content}
              data-content-keys={["qLabel"]}
              className="font-mono text-[9px] @xl:text-[18px] tracking-[0.3em] uppercase text-gold"
            />
            {blocks.questions.rows.map((q, i) => (
              <div key={q.id} className={i > 0 ? "mt-2 @xl:mt-5" : "mt-1.5 @xl:mt-4"}>
                <TextContent
                  content={q.question}
                  data-content-keys={[`questions.rows.${i}.question`]}
                  className="font-display italic font-semibold text-[12px] @xl:text-[27px] leading-tight text-champagne"
                />
                <TextContent
                  content={q.answer}
                  data-content-keys={[`questions.rows.${i}.answer`]}
                  className="mt-0.5 @xl:mt-2 text-[10px] @xl:text-[19px] leading-snug text-ivory/78"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
