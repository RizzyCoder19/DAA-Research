import { motion } from "motion/react";
import { TextContent } from "@/components/ui/text-content";

type Term = { id: string; symbol: string; label: string; meaning: string };

export function RecurrenceEquation({
  terms,
  activeId,
  onHover,
  inView,
}: {
  terms: Term[];
  activeId: string | null;
  onHover: (id: string | null) => void;
  inView: boolean;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-center gap-x-1 @xl:gap-x-2 font-mono">
      {terms.map((t, i) => {
        const dim = activeId !== null && activeId !== t.id;
        return (
          <motion.span
            key={t.id}
            onPointerEnter={() => onHover(t.id)}
            onPointerLeave={() => onHover(null)}
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={inView ? { opacity: dim ? 0.28 : 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.12 }}
            className={`cursor-default text-[30px] @xl:text-[104px] leading-none transition-colors ${
              activeId === t.id ? "text-champagne" : "text-ivory-soft"
            }`}
          >
            <TextContent content={t.symbol} className="inline" />
          </motion.span>
        );
      })}
    </div>
  );
}
