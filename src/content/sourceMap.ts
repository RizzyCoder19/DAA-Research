import { sources } from './research'

export const sourceMap = {
  identity: { source: sources.paper.name, section: 'Cover and certificate', page: 'Unnumbered cover pages' },
  abstract: { source: sources.paper.name, section: 'Abstract', page: 'Printed page 1' },
  objectives: { source: sources.paper.name, section: '1.2 Objectives', page: 'Printed page 2' },
  methodology: { source: sources.paper.name, section: '3. Methodology', page: 'Printed page 4' },
  equation: { source: sources.paper.name, section: 'Abstract; 1.4 Fundamental Concept; 4.1 Working Principle', page: 'Printed pages 1, 2 and 5' },
  bounds: { source: sources.paper.name, section: '4.2 Complexity Analysis', page: 'Printed page 5' },
  applications: { source: sources.paper.name, section: '6.1 Applications', page: 'Printed page 7' },
  advantages: { source: sources.paper.name, section: '6.2 Advantages', page: 'Printed page 7' },
  limitations: { source: sources.paper.name, section: '6.3 Limitations', page: 'Printed page 7' },
  futureScope: { source: sources.paper.name, section: '6.5 Future Scope', page: 'Printed page 7' },
  conclusion: { source: sources.paper.name, section: '7. Conclusion', page: 'Printed page 8' },
  references: { source: sources.paper.name, section: '8. Bibliography', page: 'Printed page 8' },
  viva: { source: sources.viva.name, section: 'Common Viva Questions', page: 'Page 1' },
} as const
