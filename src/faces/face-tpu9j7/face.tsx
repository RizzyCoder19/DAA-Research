import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import "./face.css";

export default function Conclusion() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const showChain = controls.showClosingChain?.value ?? true;

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

      <div className="grid grid-cols-1 @xl:grid-cols-3 gap-3 @xl:gap-11 pt-2.5 @xl:pt-7 flex-1 min-h-0">
        <div className="flex flex-col">
          <TextContent
            content={blocks.contribLabel.content}
            data-content-keys={["contribLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
          />
          <TextContent
            content={blocks.contribStatement.content}
            data-content-keys={["contribStatement"]}
            className="mt-1.5 @xl:mt-4 font-display font-semibold text-[16px] @xl:text-[35px] leading-[1.15] text-ivory-soft"
          />
          <TextContent
            content={blocks.contribDetail.content}
            data-content-keys={["contribDetail"]}
            className="mt-1.5 @xl:mt-4 text-[10px] @xl:text-[20px] leading-snug text-ivory/72"
          />
          <div className="mt-2.5 @xl:mt-6">
            <TextContent
              content={blocks.futureLabel.content}
              data-content-keys={["futureLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
            />
            <div className="mt-1.5 @xl:mt-3 flex flex-col gap-1 @xl:gap-2.5">
              {blocks.future.rows.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1 }}
                  className="flex gap-2 @xl:gap-5 items-baseline border-b border-ivory/12 pb-1 @xl:pb-2"
                >
                  <span className="font-mono text-[9px] @xl:text-[18px] text-gold">{`0${i + 1}`}</span>
                  <span className="flex-1">
                    <TextContent
                      content={r.name}
                      data-content-keys={[`future.rows.${i}.name`]}
                      className="font-display font-bold text-[12px] @xl:text-[25px] leading-tight text-ivory-soft"
                    />
                    <TextContent
                      content={r.detail}
                      data-content-keys={[`future.rows.${i}.detail`]}
                      className="text-[9px] @xl:text-[17px] leading-snug text-warm-gray"
                    />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <TextContent
            content={blocks.learnLabel.content}
            data-content-keys={["learnLabel"]}
            className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
          />
          <div className="mt-1.5 @xl:mt-4 flex flex-col gap-1.5 @xl:gap-3.5">
            {blocks.learnings.rows.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.11 }}
                className="border-l border-gold/50 pl-2 @xl:pl-5"
              >
                <TextContent
                  content={r.label}
                  data-content-keys={[`learnings.rows.${i}.label`]}
                  className="text-[11px] @xl:text-[21px] leading-snug text-ivory/85"
                />
              </motion.div>
            ))}
          </div>
          <div className="mt-auto pt-2.5 @xl:pt-6 border-t border-gold/35">
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

        <div className="flex flex-col">
          <div className="border border-gold/35 bg-royal/70 p-3 @xl:p-8 flex-1 flex flex-col">
            <TextContent
              content={blocks.conclLabel.content}
              data-content-keys={["conclLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-champagne"
            />
            <TextContent
              content={blocks.conclusion.content}
              data-content-keys={["conclusion"]}
              className="mt-2 @xl:mt-5 font-display font-semibold text-[16px] @xl:text-[36px] leading-[1.17] text-ivory-soft"
            />
            <TextContent
              content={blocks.conclusionDetail.content}
              data-content-keys={["conclusionDetail"]}
              className="mt-2 @xl:mt-5 text-[10px] @xl:text-[20px] leading-snug text-ivory/72"
            />
            {showChain && (
              <div className="mt-auto pt-3 @xl:pt-7">
                <div className="h-px bg-gold/45 mb-2 @xl:mb-5" />
                <div className="flex flex-col gap-0.5 @xl:gap-2">
                  {blocks.chain.rows.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.13 }}
                      className="flex items-center gap-2 @xl:gap-3"
                    >
                      <span className="w-1 h-1 @xl:w-1.5 @xl:h-1.5 bg-champagne rounded-full" />
                      <TextContent
                        content={r.label}
                        data-content-keys={[`chain.rows.${i}.label`]}
                        className="font-mono text-[10px] @xl:text-[20px] tracking-[0.12em] uppercase text-champagne/90"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <TextContent
            content={blocks.signoff.content}
            data-content-keys={["signoff"]}
            className="mt-2 @xl:mt-4 font-mono text-[9px] @xl:text-[16px] tracking-[0.2em] uppercase text-warm-gray"
          />
        </div>
      </div>
    </div>
  );
}
