import { motion } from "motion/react";
import { TextContent } from "@/components/ui/text-content";

export function CallStack({
  rows,
  inView,
}: {
  rows: { id: string; frame: string; note: string }[];
  inView: boolean;
}) {
  return (
    <div className="flex flex-col gap-[3px] @xl:gap-2">
      {rows.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, y: -8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.45 + i * 0.12 }}
          className="flex items-center justify-between gap-2 border border-gold/40 bg-ink/50 px-2 @xl:px-5 py-1 @xl:py-2.5"
          style={{ marginLeft: `${i * 6}%` }}
        >
          <TextContent
            content={r.frame}
            data-content-keys={[`stackFrames.rows.${i}.frame`]}
            className="font-mono text-[10px] @xl:text-[22px] text-ivory-soft"
          />
          <TextContent
            content={r.note}
            data-content-keys={[`stackFrames.rows.${i}.note`]}
            className="text-[8px] @xl:text-[16px] text-warm-gray whitespace-nowrap"
          />
        </motion.div>
      ))}
    </div>
  );
}
