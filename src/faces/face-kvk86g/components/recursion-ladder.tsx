import { motion } from "motion/react";
import { TextContent } from "@/components/ui/text-content";

export function RecursionLadder({
  rows,
  inView,
  blockKey,
}: {
  rows: { id: string; label: string; note: string }[];
  inView: boolean;
  blockKey: string;
}) {
  return (
    <div className="flex flex-col">
      {rows.map((r, i) => (
        <motion.div
          key={r.id}
          initial={{ opacity: 0, x: -14 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 + i * 0.14 }}
          style={{ marginLeft: `${i * 7}%` }}
          className="relative border-l border-gold/50 pl-2 @xl:pl-6 pb-1.5 @xl:pb-4"
        >
          <span className="absolute -left-[4px] top-1.5 w-[7px] h-[7px] rounded-full bg-champagne" />
          <TextContent
            content={r.label}
            data-content-keys={[`${blockKey}.rows.${i}.label`]}
            className="font-mono text-[11px] @xl:text-[25px] text-ivory-soft"
          />
          <TextContent
            content={r.note}
            data-content-keys={[`${blockKey}.rows.${i}.note`]}
            className="text-[9px] @xl:text-[17px] text-warm-gray leading-tight"
          />
        </motion.div>
      ))}
    </div>
  );
}
