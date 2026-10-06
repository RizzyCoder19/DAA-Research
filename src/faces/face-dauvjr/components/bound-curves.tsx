import { motion } from "motion/react";

function path(fn: (t: number) => number) {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const x = 10 + t * 280;
    const y = 150 - Math.min(1, fn(t)) * 130;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export function BoundCurves({ inView }: { inView: boolean }) {
  const curves = [
    { d: path((t) => t * t * 0.95), op: 0.95 },
    { d: path((t) => t * 0.8), op: 0.62 },
    { d: path((t) => Math.log2(1 + t * 31) / 5.2), op: 0.42 },
  ];
  return (
    <svg viewBox="0 0 300 165" className="w-full" fill="none">
      <line x1={10} y1={150} x2={292} y2={150} stroke="var(--gold)" strokeOpacity={0.45} strokeWidth={1} />
      <line x1={10} y1={14} x2={10} y2={150} stroke="var(--gold)" strokeOpacity={0.45} strokeWidth={1} />
      {curves.map((c, i) => (
        <motion.path
          key={i}
          d={c.d}
          stroke="var(--champagne)"
          strokeOpacity={c.op}
          strokeWidth={2.1}
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.5 + i * 0.25, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
