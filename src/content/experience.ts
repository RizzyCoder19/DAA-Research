export const scenes = [
  { id: 'research', label: 'Research', group: 'CORE' },
  { id: 'concepts', label: 'Recursion', group: 'CORE' },
  { id: 'recurrence', label: 'Recurrence', group: 'CORE' },
  { id: 'tree', label: 'Recursion tree', group: 'CORE' },
  { id: 'methods', label: 'Solving methods', group: 'CORE' },
  { id: 'asymptotic', label: 'Asymptotic bounds', group: 'CORE' },
  { id: 'complexity', label: 'Time & space', group: 'CORE' },
  { id: 'applications', label: 'Applications', group: 'CONTEXT' },
  { id: 'limitations', label: 'Limitations', group: 'CONTEXT' },
  { id: 'future', label: 'Future scope', group: 'CONTEXT' },
  { id: 'defense', label: 'Defense mode', group: 'DEFENSE' },
  { id: 'about', label: 'About & sources', group: 'DEFENSE' },
] as const

export type SceneId = (typeof scenes)[number]['id']

import { research } from './research'

export const methodologyStages = research.methodSteps
