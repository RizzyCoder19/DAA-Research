export const sources = {
  paper: {
    id: "paper",
    name: "Mathematical_Analysis_of_Recursive_Algorithms_Final.pdf",
    pages: "Printed pages 1–8",
  },
  viva: {
    id: "viva",
    name: "DAA_Common_Viva_Questions.pdf",
    pages: "Page 1",
  },
} as const;

export const research = {
  title: "Mathematical Analysis of Recursive Algorithms",
  subtitle: "A Study of recurrence relations, recursion trees, substitution, and recursive complexity",
  researcher: "Khan Umar Abdulaziz",
  rollNumber: "45",
  institution: "R.P. Institute of Hospitality & Management",
  affiliation: "Affiliated to Mumbai University",
  location: "Mumbai, 401105, Maharashtra",
  department: "Department of Data Science",
  course: "S.Y. B.Sc. Data Science · Semester III",
  academicYear: "2026–2027",
  guide: "Prof. Jeicy Sahaya",
  departmentHead: "Prof. Khushali Sharma",
  objective:
    "To explain the fundamental concepts of mathematical analysis of recursive algorithms; describe principal operations or algorithmic steps; analyze time and space requirements using asymptotic notation; discuss advantages, limitations and suitable applications; and connect theoretical analysis with a representative example.",
  abstract:
    "This paper presents a structured study of mathematical analysis of recursive algorithms. It focuses on recurrence relations, recursion trees, substitution, and recursive complexity. Recursive algorithms reduce a problem to smaller instances of the same problem. Their running time is often represented by a recurrence, and the paper discusses how analysis connects algorithmic steps with correctness, resource usage and asymptotic analysis. The study distinguishes theoretical complexity from practical implementation considerations.",
  methodology:
    "The research uses a descriptive and analytical methodology. It defines the topic using standard algorithm terminology, explains principal operations or steps using pseudocode-style reasoning and representative examples, and examines time and space complexity using asymptotic notation. The paper describes this as a literature-based academic study rather than a large hardware benchmark.",
  contribution:
    "The paper organizes an academic overview of recursive-algorithm analysis: its basic purpose, working principles, analysis approach, applications and limitations. It does not report a newly proposed algorithm or a hardware benchmark.",
  conclusion:
    "The paper presents recurrence relations, recursion trees, substitution and recursive complexity as topics to evaluate through correctness and resource efficiency. It describes asymptotic analysis as a common language for comparing growth as input size increases, and highlights the importance of selecting an appropriate representation and implementation.",
  equation: "T(n) = aT(n/b) + f(n)",
  equationTerms: [
    { id: "tn", symbol: "T(n)", label: "Running time", description: "The running time for an input of size n, represented by the recurrence." },
    { id: "a", symbol: "a", label: "Recursive calls", description: "The multiplier on the recursive term in the paper’s recurrence notation." },
    { id: "nb", symbol: "n/b", label: "Reduced input", description: "The size argument of each recursive instance in this recurrence notation." },
    { id: "fn", symbol: "f(n)", label: "Other work", description: "The non-recursive part of the recurrence; the paper also discusses identifying dominant operations." },
  ],
  objectives: [
    "Explain the fundamental concepts of mathematical analysis of recursive algorithms.",
    "Describe the principal operations or algorithmic steps.",
    "Analyze time and space requirements using asymptotic notation.",
    "Discuss advantages, limitations and suitable applications.",
    "Connect theoretical analysis with a representative example.",
  ],
  methodSteps: [
    "Identify the computational problem addressed by the topic.",
    "Define the relevant data structure, algorithm or operation.",
    "Describe the main steps using a simple representative example.",
    "Determine the dominant operations as input size grows.",
    "Express the running time or space requirement using asymptotic notation.",
    "Discuss alternative methods and practical trade-offs.",
    "Summarize the findings and their relevance to algorithm design.",
  ],
  methods: [
    { id: "tree", name: "Recursion trees", description: "A method the paper identifies for deriving asymptotic bounds from a recurrence." },
    { id: "substitution", name: "Substitution", description: "A named analysis method in the paper for deriving asymptotic bounds." },
    { id: "standard", name: "Standard recurrence results", description: "The paper lists standard recurrence results alongside recursion trees and substitution." },
  ],
  bounds: [
    { id: "O", symbol: "O(f(n))", name: "Upper bound", description: "An upper-bound style description." },
    { id: "Omega", symbol: "Ω(f(n))", name: "Lower bound", description: "A lower-bound style description." },
    { id: "Theta", symbol: "Θ(f(n))", name: "Tight bound", description: "A tight asymptotic bound when both upper and lower bounds match." },
  ],
  applications: [
    "Data organization", "Searching", "Scheduling", "Graph processing", "Text processing",
    "Database operations", "Compilers", "Operating systems", "Networking", "Simulation and scientific computing",
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
  practicalFactors: ["Memory locality", "Constant factors", "Implementation complexity", "Input distribution", "Frequency of operations", "Correctness requirements"],
  futureScope: [
    "Implementation in Java, Python or C++.",
    "Empirical benchmarking on different input sizes.",
    "Visualization of algorithm steps.",
    "Comparison of alternative implementations.",
    "Analysis of average-case behavior using generated or real datasets.",
  ],
  references: [
    "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, and Clifford Stein, Introduction to Algorithms, 4th ed., MIT Press, 2022.",
    "Anany Levitin, Introduction to the Design & Analysis of Algorithms, Pearson.",
    "Robert Sedgewick and Kevin Wayne, Algorithms, 4th ed., Addison-Wesley.",
    "Pat Morin, Open Data Structures, online/open educational edition.",
    "National Institute of Standards and Technology, Dictionary of Algorithms and Data Structures, NIST.",
  ],
} as const;



export const objectives = research.objectives;
export const methodSteps = research.methodSteps;
export const methods = research.methods;
export const bounds = research.bounds;
export const applications = research.applications;
export const advantages = research.advantages;
export const limitations = research.limitations;
export const futureScope = research.futureScope;
export const practicalFactors = research.practicalFactors;
