import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import { BoundCurves } from "./components/bound-curves";
import { CallStack } from "./components/call-stack";
import "./face.css";

export default function ComplexityAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const showCurves = controls.showGrowthCurves?.value ?? true;

  return (
    <div
      ref={ref}
      className="w-full h-full bg-midnight text-ivory font-body overflow-hidden flex flex-col p-5 @xl:p-14"
    >
      <div className="flex items-baseline justify-between border-b border-gold/40 pb-2 @xl:pb-4">
        <div className="flex items-baseline gap-3 @xl:gap-7">
          <TextContent
            content={blocks.sectionNo.content}
            data-content-keys={["sectionNo"]}
            className="font-mono text-[12px] @xl:text-[24px] text-gold tracking-[0.2em]"
          />
          <TextContent
            content={blocks.sectionTitle.content}
            data-content-keys={["sectionTitle"]}
            className="font-display font-bold text-[22px] @xl:text-[54px] leading-none text-ivory-soft"
          />
        </div>
        <TextContent
          content={blocks.sectionNote.content}
          data-content-keys={["sectionNote"]}
          className="hidden @xl:block font-mono text-[18px] tracking-[0.2em] uppercase text-warm-gray"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 @xl:gap-7 pt-2.5 @xl:pt-6">
        {blocks.bounds.rows.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
            className="border border-gold/35 bg-royal/60 px-2 @xl:px-6 py-2.5 @xl:py-5"
          >
            <TextContent
              content={r.symbol}
              data-content-keys={[`bounds.rows.${i}.symbol`]}
              className="font-mono text-[24px] @xl:text-[72px] leading-none text-champagne"
            />
            <TextContent
              content={r.name}
              data-content-keys={[`bounds.rows.${i}.name`]}
              className="mt-1 @xl:mt-3 font-mono text-[9px] @xl:text-[18px] tracking-[0.18em] uppercase text-gold"
            />
            <TextContent
              content={r.detail}
              data-content-keys={[`bounds.rows.${i}.detail`]}
              className="mt-1 @xl:mt-3 text-[10px] @xl:text-[20px] leading-snug text-ivory/80"
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 @xl:grid-cols-[1fr_1fr_1fr] gap-3 @xl:gap-10 pt-2.5 @xl:pt-7 flex-1 min-h-0">
        <div className="flex flex-col">
          <TextContent
            content={blocks.timeLabel.content}
            data-content-keys={["timeLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
          />
          <div className="mt-1.5 @xl:mt-3 flex flex-wrap items-center gap-x-1.5 @xl:gap-x-4 gap-y-1">
            {blocks.timeChain.rows.map((r, i) => (
              <motion.span
                key={r.id}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.14 }}
                className="font-mono text-[9px] @xl:text-[18px] tracking-[0.1em] uppercase text-ivory/85 border-b border-gold/50 pb-0.5"
              >
                <TextContent content={r.label} data-content-keys={[`timeChain.rows.${i}.label`]} className="inline" />
              </motion.span>
            ))}
          </div>
          <div className="mt-2 @xl:mt-5 border-l-2 border-champagne pl-2 @xl:pl-5">
            <TextContent
              content={blocks.keyInsightLabel.content}
              data-content-keys={["keyInsightLabel"]}
              className="font-mono text-[9px] @xl:text-[18px] tracking-[0.3em] uppercase text-champagne"
            />
            <TextContent
              content={blocks.keyInsight.content}
              data-content-keys={["keyInsight"]}
              className="mt-1 @xl:mt-3 font-display font-semibold text-[14px] @xl:text-[32px] leading-[1.18] text-ivory-soft"
            />
          </div>
          <TextContent
            content={blocks.timeDetail.content}
            data-content-keys={["timeDetail"]}
            className="mt-2 @xl:mt-4 text-[10px] @xl:text-[20px] leading-snug text-ivory/72"
          />
          {showCurves && (
            <div className="mt-auto pt-2 @xl:pt-5">
              <TextContent
                content={blocks.curvesLabel.content}
                data-content-keys={["curvesLabel"]}
                className="font-mono text-[9px] @xl:text-[18px] tracking-[0.3em] uppercase text-gold"
              />
              <div className="mt-1 @xl:mt-2">
                <BoundCurves inView={inView} />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <TextContent
            content={blocks.spaceLabel.content}
            data-content-keys={["spaceLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
          />
          <TextContent
            content={blocks.spaceIntro.content}
            data-content-keys={["spaceIntro"]}
            className="mt-1 @xl:mt-3 text-[10px] @xl:text-[20px] leading-snug text-ivory/75"
          />
          <div className="mt-2 @xl:mt-4">
            <CallStack rows={blocks.stackFrames.rows} inView={inView} />
          </div>
          <TextContent
            content={blocks.spaceTakeaway.content}
            data-content-keys={["spaceTakeaway"]}
            className="mt-2 @xl:mt-4 font-display italic text-[12px] @xl:text-[26px] leading-snug text-champagne"
          />
          <TextContent
            content={blocks.curvesNote.content}
            data-content-keys={["curvesNote"]}
            className="mt-auto pt-2 @xl:pt-4 text-[10px] @xl:text-[19px] leading-snug text-ivory/65"
          />
        </div>

        <div className="flex flex-col border border-champagne/30 bg-royal/45 p-2.5 @xl:p-6">
          <TextContent
            content={blocks.qLabel.content}
            data-content-keys={["qLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-champagne"
          />
          {blocks.questions.rows.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 + i * 0.13 }}
              className={i > 0 ? "mt-2 @xl:mt-5 pt-2 @xl:pt-5 border-t border-ivory/12" : "mt-1.5 @xl:mt-4"}
            >
              <TextContent
                content={q.question}
                data-content-keys={[`questions.rows.${i}.question`]}
                className="font-display italic font-semibold text-[12px] @xl:text-[27px] leading-tight text-champagne"
              />
              <TextContent
                content={q.answer}
                data-content-keys={[`questions.rows.${i}.answer`]}
                className="mt-0.5 @xl:mt-2 text-[10px] @xl:text-[19px] leading-snug text-ivory/80"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
