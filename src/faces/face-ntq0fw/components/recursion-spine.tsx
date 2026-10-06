import { motion } from "motion/react";

type Node = { x: number; y: number; d: number };
type Edge = { x1: number; y1: number; x2: number; y2: number; d: number };

function build(x: number, y: number, dx: number, depth: number, out: Node[], edges: Edge[]) {
  if (depth > 3) return;
  const ny = y + 62;
  for (const s of [-1, 1]) {
    const nx = x + s * dx;
    edges.push({ x1: x, y1: y, x2: nx, y2: ny, d: depth });
    out.push({ x: nx, y: ny, d: depth });
    build(nx, ny, dx / 2, depth + 1, out, edges);
  }
}

export function RecursionSpine({ className = "" }: { className?: string }) {
  const nodes: Node[] = [{ x: 260, y: 16, d: 0 }];
  const edges: Edge[] = [];
  build(260, 16, 124, 0, nodes, edges);

  return (
    <svg viewBox="0 0 520 220" className={className} fill="none">
      {edges.map((e, i) => (
        <motion.line
          key={`e${i}`}
          x1={e.x1}
          y1={e.y1}
          x2={e.x2}
          y2={e.y2}
          stroke="var(--gold)"
          strokeWidth={1.2}
          strokeOpacity={0.55 - e.d * 0.1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 + e.d * 0.38, ease: "easeOut" }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r={n.d === 0 ? 5.5 : 4 - n.d * 0.5}
          fill="var(--champagne)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - n.d * 0.17 }}
          transition={{ duration: 0.6, delay: 0.7 + n.d * 0.38 }}
        />
      ))}
    </svg>
  );
}
