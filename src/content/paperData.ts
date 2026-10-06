// ============================================================================
// AUTHORITATIVE SOURCE OF TRUTH
// Direct extraction from: Mathematical_Analysis_of_Recursive_Algorithms_Final.pdf (13 pages)
// Author: Khan Umar Abdulaziz (Roll No. 45)
// Guide: Prof. Jeicy Sahaya | HOD: Prof. Khushali Sharma
// Institution: R.P. Institute of Hospitality & Management (Affiliated to Mumbai University)
// Department of Data Science | S.Y. B.Sc. DS – Semester III | Academic Year 2026–2027
// ============================================================================

export interface PaperData {
  meta: {
    title: string
    subtitle: string
    course: string
    subject: string
    studentName: string
    rollNo: string
    guide: string
    hod: string
    department: string
    institution: string
    affiliation: string
    location: string
    academicYear: string
  }
  abstract: {
    text: string
    keywords: string[]
  }
  introduction: {
    problemStatement: string
    importance: string
    fundamentalConcept: string
  }
  objectives: string[]
  literatureReview: {
    overview: string
    standardTextbooks: string
    dataStructureReferences: string
    researchPerspective: {
      intro: string
      questions: string[]
    }
    summary: Array<{
      sourceType: string
      contribution: string
    }>
  }
  methodology: {
    overview: string
    steps: Array<{
      stepNumber: number
      title: string
      description: string
    }>
    toolsAndResources: {
      description: string
      programmingLanguages: string[]
      environment: string
      sources: string[]
    }
    evaluationCriteria: Array<{
      criterion: string
      question: string
    }>
  }
  workingPrinciple: {
    overview: string
    stages: Array<{
      label: string
      sub: string
    }>
    analysisTask: string
  }
  recurrenceRelation: {
    formula: string
    terms: Array<{
      symbol: string
      name: string
      meaning: string
    }>
  }
  complexityAnalysis: {
    overview: string
    notations: Array<{
      symbol: string
      meaning: string
      description: string
    }>
    growthPatterns: Array<{
      notation: string
      name: string
      behavior: string
    }>
  }
  representativeExample: {
    text: string
    derivationNote: string
  }
  spaceConsiderations: {
    overview: string
    stackLevels: string[]
    conclusion: string
  }
  resultsAndDiscussion: {
    analyticalResult: string
    generalObservations: Array<{
      aspect: string
      observation: string
    }>
    practicalInterpretation: {
      overview: string
      factors: string[]
    }
    outcome: string
  }
  applications: string[]
  advantages: string[]
  limitations: string[]
  discussion: string
  futureScope: string[]
  conclusion: {
    summary: string
    keyFinding: string
    representationNote: string
    closingStatement: string
  }
  bibliography: Array<{
    id: number
    citation: string
  }>
  vivaPrep: Array<{
    category: string
    question: string
    answer: string
    academicDefense: string
  }>
}

export const PAPER_DATA: PaperData = {
  meta: {
    title: "Mathematical Analysis of Recursive Algorithms",
    subtitle: "A Study of recurrence relations, recursion trees, substitution, and recursive complexity.",
    course: "S.Y. B.Sc. DS – Semester III",
    subject: "Design and Analysis of Algorithms — Research Study",
    studentName: "Khan Umar Abdulaziz",
    rollNo: "45",
    guide: "Prof. Jeicy Sahaya",
    hod: "Prof. Khushali Sharma",
    department: "Department of Data Science",
    institution: "R.P. Institute of Hospitality & Management",
    affiliation: "Affiliated to Mumbai University",
    location: "Mumbai, 401105, Maharashtra",
    academicYear: "2026–2027",
  },

  abstract: {
    text: "This research paper presents a structured study of Mathematical Analysis of Recursive Algorithms, a topic included in the Design and Analysis of Algorithms syllabus. The paper focuses on recurrence relations, recursion trees, substitution, and recursive complexity. Recursive algorithms solve a problem by reducing it to smaller instances of the same problem. Their running time is often represented by a recurrence such as T(n) = aT(n/b) + f(n). Recursion trees, substitution, and standard recurrence results can be used to derive asymptotic bounds. The discussion connects the underlying data structure or algorithm to problem-solving, correctness, resource usage and asymptotic analysis. Examples are used to explain the main operations and to show how design choices influence performance. The objective is to provide a clear academic overview suitable for a Semester III DAA research assignment, while keeping the distinction between theoretical complexity and practical implementation considerations.",
    keywords: [
      "Mathematical Analysis",
      "Recursive Algorithms",
      "Recurrence Relations",
      "Recursion Trees",
      "Substitution",
      "Complexity",
      "Asymptotic Bounds",
      "Data Structures"
    ],
  },

  introduction: {
    problemStatement: "Modern software systems process large quantities of data and repeatedly solve computational problems. The topic Mathematical Analysis of Recursive Algorithms addresses an important part of this challenge by providing principles for organizing data or carrying out computation efficiently. The main problem considered in this paper is how the chosen method works, what assumptions it requires, and how its resource requirements change as input size grows.",
    importance: "Mathematical Analysis of Recursive Algorithms is important in DAA because algorithm selection should be based not only on whether a solution works, but also on how it scales. Understanding mathematical analysis of recursive algorithms helps students compare alternative approaches, identify bottlenecks, and reason about correctness and efficiency. The topic also provides a foundation for more advanced algorithms and data structures.",
    fundamentalConcept: "Recursive algorithms solve a problem by reducing it to smaller instances of the same problem. Their running time is often represented by a recurrence such as T(n) = aT(n/b) + f(n). Recursion trees, substitution, and standard recurrence results can be used to derive asymptotic bounds.",
  },

  objectives: [
    "To explain the fundamental concepts of Mathematical Analysis of Recursive Algorithms.",
    "To describe the principal operations or algorithmic steps.",
    "To analyze time and space requirements using asymptotic notation.",
    "To discuss advantages, limitations and suitable applications.",
    "To connect theoretical analysis with a representative example.",
  ],

  literatureReview: {
    overview: "Standard algorithm literature treats the selected topic as part of a broader framework for designing and analyzing computational procedures. Classical textbooks emphasize the importance of precise problem definitions, correctness arguments and asymptotic analysis. Open educational data-structure references provide implementation-oriented explanations, while academic references formalize complexity and algorithmic properties.",
    standardTextbooks: "Cormen, Leiserson, Rivest and Stein's Introduction to Algorithms presents a systematic treatment of algorithm design, data structures, sorting, graph algorithms and asymptotic analysis. Its approach is useful for relating an algorithm's pseudocode to formal running-time bounds.",
    dataStructureReferences: "Open Data Structures and similar open educational resources provide detailed descriptions of concrete structures, operations and complexity. Such sources are useful for connecting abstract definitions to implementations and examples.",
    researchPerspective: {
      intro: "The literature suggests that mathematical analysis of recursive algorithms should be studied through three connected questions:",
      questions: [
        "What computational problem does it solve?",
        "How does the method solve it?",
        "How do its resource requirements behave as the input size changes?",
      ],
    },
    summary: [
      {
        sourceType: "Algorithm Textbooks",
        contribution: "Definitions, pseudocode, correctness arguments and asymptotic analysis.",
      },
      {
        sourceType: "Open Data-Structure References",
        contribution: "Implementation-oriented explanations and concrete examples.",
      },
      {
        sourceType: "Academic References",
        contribution: "Formal treatment of complexity and algorithmic properties.",
      },
    ],
  },

  methodology: {
    overview: "The research uses a descriptive and analytical methodology. The topic is first defined using standard algorithm terminology. Its principal operations or steps are then explained using pseudocode-style reasoning and representative examples. Finally, time and space complexity are examined using asymptotic notation. This is a literature-based academic study rather than a large hardware benchmark.",
    steps: [
      {
        stepNumber: 1,
        title: "Identify Problem",
        description: "Identify the computational problem addressed by the topic.",
      },
      {
        stepNumber: 2,
        title: "Define Structures",
        description: "Define the relevant data structure, algorithm or operation.",
      },
      {
        stepNumber: 3,
        title: "Representative Example",
        description: "Describe the main steps using a simple representative example.",
      },
      {
        stepNumber: 4,
        title: "Identify Dominant Operations",
        description: "Determine the dominant operations as the input size grows.",
      },
      {
        stepNumber: 5,
        title: "Asymptotic Expression",
        description: "Express the running time or space requirement using asymptotic notation.",
      },
      {
        stepNumber: 6,
        title: "Examine Trade-offs",
        description: "Discuss alternative methods and practical trade-offs.",
      },
      {
        stepNumber: 7,
        title: "Synthesize Findings",
        description: "Summarize the findings and their relevance to algorithm design.",
      },
    ],
    toolsAndResources: {
      description: "The study can be implemented or demonstrated using standard programming languages together with compiler/IDE and simple test inputs. For the research component, standard algorithm textbooks and reliable educational references are utilized.",
      programmingLanguages: ["Java", "Python", "C/C++"],
      environment: "Compiler / IDE with simple test inputs",
      sources: ["Algorithm Textbooks", "Educational References"],
    },
    evaluationCriteria: [
      { criterion: "Correctness", question: "Does the method produce the required result?" },
      { criterion: "Efficiency", question: "How does time grow with input size?" },
      { criterion: "Space", question: "How much additional memory is required?" },
      { criterion: "Scalability", question: "Does the method remain practical as input grows?" },
      { criterion: "Applicability", question: "Where is the method suitable or unsuitable?" },
    ],
  },

  workingPrinciple: {
    overview: "Recursive algorithms solve a problem by reducing it to smaller instances of the same problem. Their running time is often represented by a recurrence such as T(n) = aT(n/b) + f(n). Recursion trees, substitution, and standard recurrence results can be used to derive asymptotic bounds.",
    stages: [
      { label: "Original Problem", sub: "Problem of size n" },
      { label: "Recursive Step", sub: "Reduce to smaller instance (size n/b)" },
      { label: "Solve Recursively", sub: "Solve the smaller instances" },
      { label: "Combine Results", sub: "Merge partial solutions" },
      { label: "Final Solution", sub: "Obtain result for input n" },
    ],
    analysisTask: "In a typical implementation, the algorithmic behavior can be described as a sequence of elementary operations. The important analytical task is to identify which operations dominate when the input becomes large. Constant-time setup is normally less significant than loops, recursive calls, comparisons, edge scans, or other repeated work.",
  },

  recurrenceRelation: {
    formula: "T(n) = aT(n/b) + f(n)",
    terms: [
      {
        symbol: "T(n)",
        name: "Running Time",
        meaning: "The total running time for an input of size n, represented by the recurrence relation.",
      },
      {
        symbol: "a",
        name: "Number of Subproblems",
        meaning: "The number of recursive subproblems generated at each step of decomposition (a ≥ 1).",
      },
      {
        symbol: "n/b",
        name: "Subproblem Size",
        meaning: "The size of each subproblem, reduced by a constant division factor b (b > 1).",
      },
      {
        symbol: "f(n)",
        name: "Non-Recursive Work",
        meaning: "The additional work performed outside recursive calls, including problem division and combining partial results.",
      },
      {
        symbol: "b",
        name: "Reduction Factor",
        meaning: "The factor by which the original input size n is reduced in each subproblem call.",
      },
    ],
  },

  complexityAnalysis: {
    overview: "Asymptotic notation summarizes growth without depending on a particular processor. Actual execution time can still depend on hardware, programming language, compiler, memory behavior and input distribution.",
    notations: [
      {
        symbol: "O(f(n))",
        meaning: "Upper Bound",
        description: "Gives an upper-bound style description of asymptotic running time or space.",
      },
      {
        symbol: "Ω(f(n))",
        meaning: "Lower Bound",
        description: "Gives a lower-bound style description of asymptotic running time or space.",
      },
      {
        symbol: "Θ(f(n))",
        meaning: "Tight Bound",
        description: "Describes a tight asymptotic bound when both upper and lower bounds match.",
      },
    ],
    growthPatterns: [
      {
        notation: "O(log n)",
        name: "Logarithmic Growth",
        behavior: "Occurs when problem size is repeatedly reduced by a constant factor.",
      },
      {
        notation: "O(n)",
        name: "Linear Growth",
        behavior: "Occurs when the amount of work grows proportionally with input size n.",
      },
      {
        notation: "O(n²)",
        name: "Quadratic Growth",
        behavior: "Arises when every element is combined or compared with many other elements.",
      },
    ],
  },

  representativeExample: {
    text: "Consider a representative input of size n for mathematical analysis of recursive algorithms. The method processes the input according to its defining operations. If the amount of work grows proportionally with n, the running time is linear. If the problem size is repeatedly reduced by a constant factor, logarithmic behavior can occur. If every element is combined with many other elements, quadratic behavior may arise.",
    derivationNote: "The exact bound must be derived from the specific algorithm rather than assumed from the topic name alone.",
  },

  spaceConsiderations: {
    overview: "Space analysis distinguishes the memory required to store the input from additional or auxiliary memory used by the algorithm. In-place algorithms may use O(1) auxiliary storage apart from recursion or implementation overhead, whereas algorithms that build additional arrays, lists, queues or tables may require O(n) or more auxiliary space.",
    stackLevels: ["Call n", "Call n/b", "Call n/b²", "Call n/b³", "Base Case"],
    conclusion: "Auxiliary space grows with the recursion depth on the execution stack. Memory is reclaimed as stack frames unwind upon reaching base cases.",
  },

  resultsAndDiscussion: {
    analyticalResult: "The analysis confirms that the performance of mathematical analysis of recursive algorithms is governed by its dominant operations and by the assumptions under which the method is used. For small inputs, several methods may appear similarly fast, but asymptotic differences become increasingly important as n grows. This is the central reason DAA studies both correctness and efficiency.",
    generalObservations: [
      { aspect: "Purpose", observation: "Addresses the computational requirements associated with mathematical analysis of recursive algorithms." },
      { aspect: "Main Resource", observation: "Usually running time, auxiliary memory, or both." },
      { aspect: "Best Use", observation: "Depends on input properties and required operations." },
      { aspect: "Main Limitation", observation: "Performance may depend on input distribution, representation or implementation." },
      { aspect: "Scalability", observation: "Determined by the dominant asymptotic growth rate." },
    ],
    practicalInterpretation: {
      overview: "In practical software, the choice of method for mathematical analysis of recursive algorithms should consider more than Big-O notation. Nevertheless, asymptotic analysis provides a reliable first framework for comparing scalability.",
      factors: [
        "Memory Locality",
        "Constant Factors",
        "Implementation Complexity",
        "Input Distribution",
        "Frequency of Operations",
        "Correctness Requirements",
      ],
    },
    outcome: "The research establishes a clear link between the theoretical model and algorithmic performance. A correct algorithm is necessary, but efficient organization of computation or data can substantially reduce the resources required for large inputs.",
  },

  applications: [
    "Data Organization",
    "Searching",
    "Scheduling",
    "Graph Processing",
    "Text Processing",
    "Database Operations",
    "Compilers",
    "Operating Systems",
    "Networking",
    "Simulation and Scientific Computing",
  ],

  advantages: [
    "Provides a systematic solution to a clearly defined computational problem.",
    "Allows efficiency to be evaluated using standard asymptotic measures.",
    "Can often be implemented using well-understood data structures and algorithms.",
    "Provides a foundation for more advanced algorithmic techniques.",
  ],

  limitations: [
    "Theoretical complexity does not capture every hardware or implementation effect.",
    "Some methods depend strongly on input assumptions or data distribution.",
    "Additional memory or implementation complexity may be required for better performance.",
    "Choosing an algorithm requires matching its assumptions to the actual problem.",
  ],

  discussion: "The study of mathematical analysis of recursive algorithms illustrates a broader DAA principle: algorithm design is a trade-off between correctness, efficiency, simplicity and resource constraints. A method that is excellent under one input model may be less suitable under another. Therefore, the problem statement and input characteristics should be considered before selecting an implementation.",

  futureScope: [
    "Implementation in Java / Python / C++.",
    "Empirical benchmarking on different input sizes.",
    "Visualization of algorithm steps.",
    "Comparison of alternative implementations.",
    "Analysis of average-case behaviour using generated or real datasets.",
  ],

  conclusion: {
    summary: "This paper studied Mathematical Analysis of Recursive Algorithms as a fundamental topic in Design and Analysis of Algorithms. The study explained its basic purpose, working principles, analysis approach, applications and limitations.",
    keyFinding: "The central finding is that recurrence relations, recursion trees, substitution, and recursive complexity should be evaluated using both correctness and resource efficiency. Asymptotic analysis provides a common language for comparing growth as input size increases.",
    representationNote: "The research also highlights the importance of selecting an appropriate representation and implementation. Even when two methods solve the same problem, they can differ significantly in time, auxiliary space, simplicity and behavior on particular inputs.",
    closingStatement: "Understanding these trade-offs is essential for designing scalable software.",
  },

  bibliography: [
    {
      id: 1,
      citation: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein, Introduction to Algorithms, 4th ed., MIT Press, 2022.",
    },
    {
      id: 2,
      citation: "Anany Levitin, Introduction to the Design & Analysis of Algorithms, Pearson.",
    },
    {
      id: 3,
      citation: "Robert Sedgewick and Kevin Wayne, Algorithms, 4th ed., Addison-Wesley.",
    },
    {
      id: 4,
      citation: "Pat Morin, Open Data Structures, online/open educational edition.",
    },
    {
      id: 5,
      citation: "National Institute of Standards and Technology, Dictionary of Algorithms and Data Structures, NIST.",
    },
  ],

  vivaPrep: [
    {
      category: "Research Identity",
      question: "What is the main objective of your research?",
      answer: "My main objective is to understand how recursive algorithms can be mathematically analyzed, especially how time and space requirements change as input size increases using recurrence relations, recursion trees, substitution and asymptotic notation.",
      academicDefense: "The paper is a descriptive and analytical study of recursive analysis fundamentals, not a proposed newly invented algorithm.",
    },
    {
      category: "Algorithm Scope",
      question: "Which algorithm did you study in your paper and why?",
      answer: "My paper does not focus on one specific algorithm. It studies mathematical analysis of recursive algorithms as a broader concept, including recurrence relations, recursion trees, substitution and asymptotic analysis.",
      academicDefense: "Do not name Merge Sort or Dijkstra as the studied algorithm; the paper provides an analytical framework for recursive procedures.",
    },
    {
      category: "Recurrence",
      question: "What is the general recurrence relation and what does it represent?",
      answer: "T(n) = aT(n/b) + f(n). It expresses the running time of a recursive algorithm in terms of smaller subproblems (a recursive calls of size n/b) and the additional non-recursive work f(n) performed outside the calls.",
      academicDefense: "Terms: T(n) = total time, a = subproblems, n/b = reduced subproblem size, f(n) = divide/combine work, b = input reduction factor.",
    },
    {
      category: "Methodology",
      question: "What methodology did you follow for your research?",
      answer: "The study is descriptive, analytical and literature-based. It follows a 7-step procedure: identifying the problem, defining relevant operations, describing steps via representative examples, determining dominant operations, expressing time/space in asymptotic notation, examining trade-offs, and summarizing design relevance.",
      academicDefense: "Explicitly avoid claiming hardware benchmarks; it is a formal literature-based analytical study.",
    },
    {
      category: "Asymptotics",
      question: "What is Big-O, Big-Omega, and Big-Theta notation?",
      answer: "O(f(n)) gives an asymptotic upper bound. Ω(f(n)) gives an asymptotic lower bound. Θ(f(n)) describes an asymptotically tight bound when both upper and lower bounds match.",
      academicDefense: "Never equate O to worst case or Ω to best case; asymptotic notation describes mathematical bounding functions, not input case distributions.",
    },
    {
      category: "Solving Methods",
      question: "What are recursion trees and the substitution method?",
      answer: "A recursion tree visualizes how recursive work expands across levels and helps in deriving asymptotic bounds. The substitution method guesses the form of a bound and uses mathematical induction to verify it.",
      academicDefense: "Both methods are identified in the paper as analytical techniques alongside standard recurrence results.",
    },
    {
      category: "Space Complexity",
      question: "How is space complexity analyzed in recursive algorithms?",
      answer: "Space analysis distinguishes the memory required to store input from additional auxiliary memory. Recursive calls add auxiliary memory through the call stack proportional to the maximum recursion depth.",
      academicDefense: "In-place algorithms use O(1) auxiliary space apart from stack overhead, while recursive trees require stack frames that unwind at base cases.",
    },
    {
      category: "Applications",
      question: "What are the real-world applications of your research?",
      answer: "The paper identifies ten applications: data organization, searching, scheduling, graph processing, text processing, database operations, compilers, operating systems, networking, and simulation and scientific computing.",
      academicDefense: "Stick strictly to the 10 domains explicitly listed in Section 6.1 of the paper.",
    },
    {
      category: "Limitations",
      question: "What are the limitations of theoretical complexity analysis?",
      answer: "Theoretical complexity does not capture every hardware or implementation effect like memory locality and cache hierarchy. Performance also depends on input distribution, representation, and constant factors.",
      academicDefense: "Derived directly from Section 6.3 of the research paper.",
    },
    {
      category: "Future Scope",
      question: "What is the future scope of your research?",
      answer: "Future work includes practical implementation in Java/Python/C++, empirical benchmarking across different input sizes, visualization of algorithm steps, comparing alternative implementations, and analyzing average-case behavior.",
      academicDefense: "Directly matches Section 6.5 of the paper without invented AI/ML claims.",
    },
    {
      category: "Core Takeaway",
      question: "What is the most fundamental lesson from this research?",
      answer: "Algorithm design is a trade-off between correctness, efficiency, simplicity, and resource constraints. Understanding recurrence relations, recursion trees, and asymptotic analysis is essential for designing scalable software.",
      academicDefense: "Directly articulates the central thesis of the paper's conclusion and discussion.",
    },
  ],
}
