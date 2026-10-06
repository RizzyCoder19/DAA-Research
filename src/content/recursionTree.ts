export type RecursionNode = { depth: number; path: string; children?: RecursionNode[] }

/** Structured conceptual recurrence tree; no cost or complexity is calculated. */
export function createRecursionTree(a: number, depth: number, collapsed: ReadonlySet<string> = new Set(), level = 0, path = 'root'): RecursionNode {
  return {
    depth: level,
    path,
    ...(level < depth && !collapsed.has(path)
      ? { children: Array.from({ length: a }, (_, index) => createRecursionTree(a, depth, collapsed, level + 1, `${path}.${index + 1}`)) }
      : {}),
  }
}
