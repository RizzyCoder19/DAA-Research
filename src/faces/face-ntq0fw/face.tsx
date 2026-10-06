import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { TextContent } from "@/components/ui/text-content";
import { RecursionSpine } from "./components/recursion-spine";
import { blocks } from "./face.content.json";
import { controls } from "./face.controls.json";
import "./face.css";

export default function TitleFace() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const showTree = controls.showRecursionTree?.value ?? true;

  return (
    <div
      ref={ref}
      className="w-full h-full bg-midnight text-ivory font-body overflow-hidden relative flex flex-col p-5 @xl:p-16"
    >
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
        }}
      />

      <div className="relative flex items-baseline justify-between">
        <TextContent
          content={blocks.eyebrow.content}
          data-content-keys={["eyebrow"]}
          className="font-mono text-[10px] @xl:text-[22px] tracking-[0.26em] uppercase text-gold"
        />
        <TextContent
          content={blocks.paperTag.content}
          data-content-keys={["paperTag"]}
          className="hidden @xl:block font-mono text-[20px] tracking-[0.18em] uppercase text-warm-gray"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="relative mt-3 @xl:mt-7"
      >
        <TextContent
          content={blocks.title.content}
          data-content-keys={["title"]}
          className="font-display font-bold text-[40px] @xl:text-[92px] leading-[0.98] text-ivory-soft break-words"
        />
        <div className="h-px bg-gold/55 my-2.5 @xl:my-6" />
        <TextContent
          content={blocks.subtitle.content}
          data-content-keys={["subtitle"]}
          className="font-display italic text-[15px] @xl:text-[34px] leading-snug text-champagne"
        />
      </motion.div>

      <div className="relative grid grid-cols-1 @xl:grid-cols-12 gap-4 @xl:gap-14 flex-1 min-h-0 pt-4 @xl:pt-10">
        <div className="@xl:col-span-7 flex flex-col gap-3 @xl:gap-8">
          <div className="border-l-2 border-gold pl-3 @xl:pl-8">
            <TextContent
              content={blocks.objLabel.content}
              data-content-keys={["objLabel"]}
              className="font-mono text-[10px] @xl:text-[19px] tracking-[0.3em] uppercase text-gold"
            />
            <TextContent
              content={blocks.objective.content}
              data-content-keys={["objective"]}
              className="mt-1.5 @xl:mt-4 font-display text-[17px] @xl:text-[40px] leading-[1.18] text-ivory-soft"
            />
          </div>
          <div className="border border-champagne/35 bg-royal/60 p-3 @xl:p-8">
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
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                className={i > 0 ? "mt-2.5 @xl:mt-6 pt-2.5 @xl:pt-6 border-t border-ivory/10" : "mt-2 @xl:mt-5"}
              >
                <TextContent
                  content={q.question}
                  data-content-keys={[`questions.rows.${i}.question`]}
                  className="font-display italic text-[14px] @xl:text-[31px] leading-tight text-champagne"
                />
                <TextContent
                  content={q.answer}
                  data-content-keys={[`questions.rows.${i}.answer`]}
                  className="mt-1 @xl:mt-3 text-[11px] @xl:text-[23px] leading-snug text-ivory/85"
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="@xl:col-span-5 flex flex-col">
          {showTree && <RecursionSpine className="hidden @xl:block w-full h-[150px] mb-6" />}
          <div className="flex flex-wrap gap-x-3 @xl:gap-x-7 gap-y-1 @xl:gap-y-2">
            {blocks.pillars.rows.map((p, i) => (
              <TextContent
                key={p.id}
                content={p.label}
                data-content-keys={[`pillars.rows.${i}.label`]}
                className="font-mono text-[9px] @xl:text-[19px] tracking-[0.16em] uppercase text-gold/90"
              />
            ))}
          </div>
          <div className="mt-3 @xl:mt-8 pt-3 @xl:pt-7 border-t border-gold/30 grid grid-cols-2 gap-2.5 @xl:gap-x-10 @xl:gap-y-6">
            {blocks.credits.rows.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
              >
                <TextContent
                  content={c.label}
                  data-content-keys={[`credits.rows.${i}.label`]}
                  className="font-mono text-[8px] @xl:text-[16px] tracking-[0.22em] uppercase text-warm-gray"
                />
                <TextContent
                  content={c.value}
                  data-content-keys={[`credits.rows.${i}.value`]}
                  className="font-display font-semibold text-[12px] @xl:text-[26px] leading-tight text-ivory-soft"
                />
                <TextContent
                  content={c.detail}
                  data-content-keys={[`credits.rows.${i}.detail`]}
                  className="text-[9px] @xl:text-[17px] leading-snug text-ivory/60"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
