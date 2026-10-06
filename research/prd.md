
# PRD — Recursive Algorithms Visualizer

## 1. Product Identity

### Product name

**Recursive Algorithms Visualizer**

### Subtitle

**Mathematical Analysis of Recursive Algorithms**

### Core positioning

An interactive academic web application that explains and visualizes the concepts presented in the research paper:

> **“Mathematical Analysis of Recursive Algorithms: A Study of Recurrence Relations, Recursion Trees, Substitution, and Recursive Complexity.”**

The application should allow a student or professor to **explore the research conceptually and visually**, while remaining strictly grounded in the research paper and official viva material.

---

# 2. NON-NEGOTIABLE CONTENT RULE

This is the most important requirement of the entire project.

## SOURCE-LOCKED CONTENT

The webapp must **never go beyond the research paper's claims**.

The attached research paper is the primary source.

The official viva Q&A PDF is the secondary source for viva-oriented explanations.

### The application MAY:

- reorganize information
- visualize concepts
- animate mathematical relationships
- create interactive representations of concepts already discussed
- simplify wording without changing meaning
- turn existing explanations into interactive learning experiences
- expose definitions progressively
- create conceptual diagrams
- create interactive representations of recurrence relations discussed in the paper

### The application MUST NOT:

- invent research findings
- invent experiments
- invent benchmarks
- invent measured performance improvements
- claim that an algorithm was implemented if the paper doesn't say so
- claim that an experiment was conducted if it wasn't
- invent datasets
- invent statistical results
- invent citations
- invent references
- introduce unrelated algorithms as if they were studied
- expand the research into machine learning, AI optimization, etc. unless the source explicitly supports it
- make the research sound more innovative than it actually is
- turn generic computer-science knowledge into supposed findings of this research

### Critical distinction

The app can explain **what recursive algorithms are**.

It can explain **how recurrence relations work**.

It can visualize **the recurrence relation `T(n) = aT(n/b) + f(n)`**.

But it must not imply:

> “Our research developed this algorithm.”

when the research is actually an analytical/literature-based study.

---

# 3. SOURCE DIRECTORY

The project should support a simple source structure such as:

```text
/
├── research/
│   ├── research-paper.pdf
│   └── viva-questions-answers.pdf
│
├── src/
│   └── ...
```

The filenames may differ.

The developer should inspect the actual files and use them as the authoritative content source.

### Future-proofing

Create a clear content/data layer so that source-derived content is separated from UI components.

For example:

```text
src/
├── content/
│   ├── research/
│   ├── viva/
│   └── source-map.ts
├── components/
├── features/
├── pages/
├── visualizations/
└── utils/
```

Do not hard-code the entire research paper inside individual React components.

---

# 4. TARGET USERS

### Primary

**The student presenting/defending the research.**

The app should help them:

- understand the topic
- revise before viva
- visually remember concepts
- explain mathematics
- navigate quickly to relevant concepts

### Secondary

**Professor / evaluator**

The professor should be able to explore:

- research scope
- methodology
- mathematical framework
- complexity
- applications
- limitations
- future scope

without being overwhelmed.

### Tertiary

**Other students**

They should be able to use the application as an educational visualization of the research topic.

---

# 5. DESIGN DIRECTION

The UI should follow the visual reference generated for this project.

## Design personality

**Royal academic × mathematical laboratory × premium editorial**

Keywords:

- sophisticated
- intelligent
- dark
- mathematical
- cinematic
- refined
- premium
- academic
- interactive

Not:

- generic SaaS
- childish education app
- neon cyberpunk
- gaming UI
- generic AI dashboard

---

# 6. COLOR SYSTEM

Primary:

```text
Midnight       #111827
Royal Navy     #172033
Deep Ink       #20283A
Ivory          #F7F2E8
Soft Ivory     #FFFDF8
Antique Gold   #B08A45
Champagne      #D6BC83
Warm Gray      #6F6A61
Deep Wine      #542632
```

Gold should be used strategically.

Examples:

- active navigation
- mathematical highlights
- borders
- progress indicators
- key numbers
- important interactive controls

Do **not** make the entire application gold.

---

# 7. TYPOGRAPHY

### Display

Cormorant Garamond / Playfair Display style.

Used for:

- hero headings
- section titles
- major mathematical statements

### Interface

Inter / Manrope.

Used for:

- navigation
- descriptions
- cards
- buttons
- labels

### Technical

IBM Plex Mono.

Used for:

- equations
- recurrence relations
- complexity notation
- code-like mathematical labels
- numerical values

---

# 8. INFORMATION ARCHITECTURE

The application should have a persistent left navigation on desktop.

```text
R
Recursive
Algorithms
Visualizer

HOME

01  Research
02  Recursion
03  Recurrences
04  Recursion Trees
05  Solving Methods
06  Asymptotic Analysis
07  Time & Space
08  Applications
09  Limitations
10  Viva / Learn
11  About Research
```

On mobile:

- collapsible navigation
- bottom navigation or hamburger drawer
- preserve the same information architecture

---

# 9. HOME / HERO

The homepage should immediately communicate the project.

### Hero

**MATHEMATICAL ANALYSIS**

# Recursive Algorithms

**An interactive exploration of recurrence relations, recursion trees, substitution, asymptotic analysis, and recursive complexity.**

Primary CTA:

**Start Exploring →**

Secondary:

**Learn the Basics**

### Hero visualization

Use a beautiful recursive structure.

For example:

```text
                    T(n)
                  /      \
              T(n/b)    T(n/b)
              /   \      /   \
           ...    ...  ...    ...
```

with subtle animated branching.

The hero should visually communicate:

> **Large problem → smaller problems → mathematical model**

---

# 10. RESEARCH OVERVIEW

Create a dedicated section:

## Research Identity

Show:

- exact research title
- institution
- department
- academic year
- researcher
- guide
- research objective

All of these must be taken from the actual source document.

Do not invent metadata.

---

# 11. RESEARCH SCOPE

Present the research scope visually.

Possible structure:

```text
RECURRENCE
     ↓
RECURSION TREES
     ↓
SUBSTITUTION
     ↓
ASYMPTOTIC NOTATION
     ↓
TIME COMPLEXITY
     ↓
SPACE COMPLEXITY
     ↓
APPLICATIONS
     ↓
LIMITATIONS
```

The exact scope must follow the paper.

---

# 12. METHODOLOGY

Create an interactive methodology timeline.

Example:

```text
01
Problem Definition

↓

02
Literature Review

↓

03
Algorithmic Understanding

↓

04
Identify Dominant Operations

↓

05
Mathematical Analysis

↓

06
Interpretation & Trade-offs
```

Each step can expand into the source-supported explanation.

Do not add methodology steps that aren't supported by the research.

---

# 13. RECURSION CONCEPT

This section should remain **abstract and conceptual**.

Do NOT turn it into:

> Merge Sort tutorial

or:

> Fibonacci tutorial

or:

> Binary Search tutorial.

Instead show:

```text
PROBLEM
   ↓
SMALLER INSTANCE
   ↓
SMALLER INSTANCE
   ↓
SMALLER INSTANCE
   ↓
BASE CASE
```

Allow users to click through each stage.

### Interactive behavior

Clicking **Recursive Case**:

> Show explanation from research.

Clicking **Base Case**:

> Show explanation from research.

Clicking **Reduction**:

> Show how the problem size decreases conceptually.

---

# 14. RECURRENCE RELATION EXPLORER

This should be one of the flagship features.

Display:

# `T(n) = aT(n/b) + f(n)`

Then allow the user to inspect:

### T(n)

Total running time for input size `n`.

### a

Number of recursive subproblems.

### n/b

Size of each subproblem.

### f(n)

Non-recursive work.

Clicking each term highlights it in the equation.

---

# 15. RECURSION TREE VISUALIZER

Build an interactive visualization.

Example:

```text
                     T(n)
                    /    \
               T(n/b)   T(n/b)
                /  \      /  \
              ... ...   ... ...
```

Controls:

**Expand level**

**Collapse level**

**Show work**

**Show level**

**Reset**

The visualization must remain faithful to the recurrence being represented.

Don't create arbitrary algorithm benchmarks.

---

# 16. SOLVING METHODS

Create tabs:

### Recursion Tree

Explain the method.

### Substitution

Explain the method.

### Standard Results

Explain the method.

Each method should have:

1. Definition
2. Conceptual procedure
3. Mathematical visualization
4. Research-supported takeaway

Do not invent a new derivation that isn't supported by the source.

---

# 17. ASYMPTOTIC NOTATION EXPLORER

Create three primary tabs:

## O

Upper bound.

## Ω

Lower bound.

## Θ

Tight bound.

Each has:

- notation
- source-supported definition
- visual representation
- explanation
- concise takeaway

---

# 18. GROWTH VISUALIZATION

If the research paper supports the relevant growth comparisons, create an interactive visualization showing the appropriate functions.

Important:

**Do not imply that the research measured these values experimentally.**

Label visual examples appropriately as:

> **Illustrative mathematical visualization**

when necessary.

The visualization is explaining the mathematics, not presenting research results.

---

# 19. TIME COMPLEXITY

Create a dedicated interactive explanation:

```text
Recursive Structure
        ↓
Recurrence
        ↓
Dominant Operations
        ↓
Solve / Bound
        ↓
Asymptotic Complexity
```

Key source-supported principle:

> There is no single “complexity of recursive algorithms.” Complexity depends on the specific recursive structure and recurrence.

This should be highly visible.

---

# 20. SPACE COMPLEXITY

Create an interactive call-stack visualization.

Example:

```text
┌──────────────┐
│    T(n)      │
├──────────────┤
│   T(n/b)     │
├──────────────┤
│  T(n/b²)     │
├──────────────┤
│     ...      │
└──────────────┘
```

As recursion deepens:

- stack grows
- depth is shown
- active calls are highlighted

Explain:

**recursion-stack space**

and

**additional auxiliary space**

separately.

---

# 21. PRACTICAL INTERPRETATION

The research explicitly recognizes that theoretical analysis doesn't capture every real-world factor.

Create a section showing:

### THEORY

Asymptotic growth

versus

### PRACTICE

- hardware
- compiler
- implementation
- memory
- input characteristics

Only include factors actually supported by the source.

The key idea:

> **Theoretical complexity provides a framework, but practical performance depends on implementation and problem conditions.**

---

# 22. APPLICATIONS

Create an elegant application grid.

Use only the application areas supported by the research paper.

Each should have a **very brief explanation**.

Do not create algorithm tutorials.

Do not claim that this research implemented these applications.

Example structure:

```text
DATA & SEARCH
Relevant recursive decomposition

SCHEDULING
Recursive task decomposition

GRAPH PROCESSING
Recursive traversal/decomposition

TEXT PROCESSING
Recursive parsing/pattern processing
```

Continue for the remaining source-supported domains.

---

# 23. ADVANTAGES

Create concise cards around the actual paper content.

Potential source-supported themes:

- systematic mathematical analysis
- efficiency comparison
- standardized asymptotic language
- foundation for advanced algorithmic techniques

Do not expand beyond the paper without labeling outside information.

---

# 24. LIMITATIONS

This section should be particularly academically honest.

Show:

### THEORETICAL LIMIT

Asymptotic analysis abstracts away from some hardware and implementation effects.

### INPUT DEPENDENCE

Actual behavior can depend on input characteristics.

### MEMORY

Recursive approaches can introduce stack overhead.

### TRADE-OFFS

Efficiency, memory and implementation complexity can conflict.

---

# 25. RESEARCH CONTRIBUTION

Clearly distinguish:

## WHAT THIS RESEARCH DOES

Organizes and analyzes the mathematical framework for understanding recursive algorithms.

## WHAT IT DOES NOT CLAIM

- New algorithm
- Large-scale benchmark
- Experimental performance improvement
- New dataset

This is actually a **strength**, because it makes the project academically honest.

---

# 26. FUTURE SCOPE

Only display future scope explicitly supported by the paper.

Possible areas already established in our source material include:

- implementation
- empirical benchmarking
- larger inputs
- visualization
- comparison of implementations
- average-case analysis

Do not automatically add:

> machine learning optimization

unless the actual PDF explicitly contains it.

---

# 27. LEARN / VIVA MODE

This is where the viva PDF becomes useful.

Create a dedicated mode:

# **Defense Mode**

But don't make it feel like a boring Q&A document.

Structure:

```text
CONCEPT
     ↓
UNDERSTAND
     ↓
EXPLAIN
     ↓
DEFEND
```

For example:

### Concept

**What is the main objective?**

Reveal:

The source-supported answer.

### Concept

**What methodology was followed?**

Reveal:

The source-supported answer.

### Concept

**What are the limitations?**

Reveal:

The source-supported answer.

---

# 28. VIVA SOURCE RULE

The viva answers should be treated as **supporting presentation material**, not permission to add unsupported research claims.

If the viva PDF contains an answer that conflicts with the research paper:

### PRIORITY

**Research paper > Viva answer**

Do not silently invent a reconciliation.

Flag the discrepancy in the internal content/data layer and use the wording that is academically defensible from the source material.

---

# 29. QUIZ MODE

Create optional lightweight quiz interactions.

Example:

> What does `Θ(f(n))` represent?

Answers can be revealed from the source material.

But:

**Do not invent dozens of questions.**

Use the official viva questions where possible.

The app should clearly distinguish:

**Official viva question**

from

**Interactive learning prompt**

---

# 30. ABOUT RESEARCH

Provide:

- research title
- researcher
- institution
- guide
- department
- academic year
- methodology
- references

References should come **exactly from the research paper**.

Do not generate additional references merely to make the application look academically richer.

---

# 31. INTERACTION DESIGN

Interactions should feel meaningful.

Use:

- hover
- click
- expand
- collapse
- step-through
- sliders
- tabs
- progressive reveals
- graph controls
- tree expansion

Avoid:

- pointless animations
- excessive parallax
- flashy effects
- distracting particles
- gaming mechanics

Animation should explain mathematics.

---

# 32. MOTION LANGUAGE

Use Motion for:

### Page transitions

Soft fade + subtle movement.

### Recursion tree

Branches appear progressively.

### Equation

Terms highlight when selected.

### Call stack

Frames enter and exit naturally.

### Complexity graph

Lines reveal progressively.

Keep animation fast and elegant.

---

# 33. RESPONSIVE DESIGN

Desktop:

**Persistent sidebar + large visualization canvas**

Tablet:

**Collapsible sidebar**

Mobile:

**Top navigation / drawer + stacked visualizations**

Do not simply shrink the desktop UI.

Recompose it.

---

# 34. ACCESSIBILITY

Required:

- keyboard navigation
- visible focus states
- sufficient contrast
- reduced-motion support
- semantic buttons
- meaningful labels
- readable equations
- no information conveyed solely by color

---

# 35. TECHNICAL FOUNDATION

Existing project:

```text
Vite
React 19
TypeScript
Tailwind CSS
Motion
Lucide React
```

Keep this stack unless there is a strong technical reason to change.

The existing Faces-generated components can be reused selectively.

Do not preserve the slide-based architecture merely because Faces generated it.

The final application should be a **real webapp**, not a slideshow pretending to be one.

---

# 36. ARCHITECTURE

Recommended:

```text
src/
├── app/
│   ├── App.tsx
│   └── routes/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── cards/
│   ├── typography/
│   └── ui/
│
├── features/
│   ├── recursion/
│   ├── recurrence/
│   ├── complexity/
│   ├── applications/
│   ├── research/
│   └── viva/
│
├── visualizations/
│   ├── RecursionTree/
│   ├── CallStack/
│   ├── RecurrenceEquation/
│   └── ComplexityGraph/
│
├── content/
│   ├── research/
│   ├── viva/
│   └── source-map.ts
│
├── hooks/
├── utils/
└── styles/
```

---

# 37. CONTENT/DATA SEPARATION

This is crucial.

Don't do:

```tsx
<h1>Research objective...</h1>
```

everywhere.

Instead:

```ts
researchContent.objective
```

and:

```ts
researchContent.methodology
```

This makes it possible to verify every displayed statement against the PDFs.

---

# 38. SOURCE TRACEABILITY

Every substantial research statement should have an internal source reference.

For example:

```ts
{
  id: "research-objective",
  text: "...",
  source: "research-paper",
  section: "Objectives"
}
```

For viva:

```ts
{
  id: "viva-objective",
  question: "...",
  answer: "...",
  source: "viva-pdf"
}
```

The source metadata does not necessarily need to be visible to the end user, but it should exist internally.

---

# 39. CONTENT VALIDATION

Before final build:

### Verify every statement

Ask:

> **Can this claim be supported by the attached research paper or official viva PDF?**

If yes:

**Keep it.**

If no:

**Remove it or clearly label it as an illustrative explanation.**

Never silently turn general knowledge into research findings.

---

# 40. VISUAL REFERENCE

Use the generated UI reference image as the **visual north star**.

The key aesthetic:

> **Dark royal academic interface with antique gold mathematical accents, elegant serif typography, sophisticated visualization panels, and cinematic but restrained mathematical imagery.**

However, don't copy the image literally.

Use it as a design language.

---

# 41. THE EXPERIENCE

The ideal user journey:

```text
LAND
 ↓
Understand the research
 ↓
Explore recursion
 ↓
See recurrence
 ↓
Build the recursion tree
 ↓
Understand solving methods
 ↓
Explore O / Ω / Θ
 ↓
See time & space
 ↓
Understand applications
 ↓
Review limitations
 ↓
Enter Defense Mode
 ↓
Test understanding
```

That is the product.

---

# 42. SUCCESS CRITERIA

The project is successful when:

### Academic

Every research claim is source-grounded.

### Interactive

The mathematics can actually be explored.

### Visual

It looks like a premium academic product.

### Educational

A student can understand the topic through the visualizations.

### Viva-ready

The official viva questions can be reviewed naturally.

### Honest

It never exaggerates what the research actually accomplished.

### Technical

The React app is maintainable and deployable.

---

# 43. FINAL PRODUCT PRINCIPLE

The entire project should follow this rule:

> **Visualize the research. Do not rewrite the research.**

The app can make the research **more understandable, interactive and beautiful**.

It cannot make the research **broader, more experimental or more impressive than it actually is**.

---

