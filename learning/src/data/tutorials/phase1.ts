import type { Lesson } from '../../components/TutorialContent';

export interface TopicTutorial {
  topicId: string;
  lessons: Lesson[];
}

export const phase1Tutorials: Record<string, TopicTutorial> = {
  't1_1': {
    topicId: 't1_1',
    lessons: [
      {
        title: 'Python for JS Developers',
        noobDefinition: 'Python is like JavaScript but without the "messy parts" like semicolons and curly braces. It uses indentation (tabs/spaces) to stay organized.',
        realWorldExample: 'Switching from JS to Python is like moving from a manual car (where you control everything) to a high-end Tesla (where much of the routine work is handled for you).',
        content: `As a JavaScript developer, you are already 70% of the way to being a Python pro! Both languages are "high-level" and "dynamically typed".

### Key Philosophical Differences:
1. **Explicit vs. Implicit**: Python's motto is "Explicit is better than implicit." It tries to avoid magic and unexpected behavior.
2. **Indentation is Code**: In JS, you use \`{}\`. In Python, you use a colon \`:\` followed by 4 spaces. If your indentation is wrong, your code won't run!
3. **No Semicolons**: Just hit Enter. Python knows when a line ends.

### Variable Comparison:
- **JS**: \`const name = "AI";\`
- **Python**: \`name = "AI"\` (No keywords like const/let/var needed for basic assignment!)`,
        keyPoints: [
          'Python uses indentation (4 spaces) instead of curly braces {}',
          'Semicolons are not needed and generally not used',
          'Variables are created by simple assignment (no let/const)',
          'Comments use # instead of //',
        ],
        codeExample: {
          language: 'python',
          code: `# Regular Function in Python
def greet(name):
    if name == "Ahmed":
        print("Welcome back, Master!")
    else:
        print(f"Hello, {name}!")

greet("Ahmed")`,
        },
      },
      {
        title: 'Advanced Collections',
        noobDefinition: 'Data structures are just different types of "containers" for your stuff. A List is like a shelf, a Tuple is like a locked display case, and a Dictionary is like a labeled filing cabinet.',
        realWorldExample: 'A Movie List (mutable) vs. the Movie\'s Release Year (immutable) vs. the Movie Database (indexed by ID).',
        content: `In Data Science, how you store your data is just as important as the data itself.

### 1. Lists (The JS Array)
Mutable, ordered, and flexible. You use these for 90% of your work.
\`\`\`python
fruits = ["apple", "banana"]
fruits.append("cherry")
\`\`\`

### 2. Tuples (The Constant Array)
Immutable. Once created, they cannot change. This makes them faster and "thread-safe".
\`\`\`python
coordinates = (10, 20)
# coordinates[0] = 5  <-- This would throw an error!
\`\`\`

### 3. Dictionaries (The JS Object)
Key-value pairs. In Python, these are highly optimized and used everywhere to store parameters and metadata.`,
        keyPoints: [
          'Lists are mutable (can change), Tuples are immutable (read-only)',
          'Dictionaries use hash maps for O(1) lightning-fast lookups',
          'Sets are unique collections (no duplicates allowed)',
          'Use .append() for lists, not .push()!',
        ],
        codeExample: {
          language: 'python',
          code: `# Complex Data nesting
model_results = {
    "iteration_1": [0.85, 0.92, 0.88],
    "iteration_2": [0.91, 0.94, 0.93],
    "hyperparams": ("adam", 0.001)
}

print(model_results["iteration_1"][0]) # 0.85`,
        },
      },
    ],
  },
  't1_2': {
    topicId: 't1_2',
    lessons: [
      {
        title: 'NumPy: The Foundation of AI',
        noobDefinition: 'NumPy is like a specialized calculator that can do math on 1 million numbers at the same time. While regular Python is like a single-lane road, NumPy is a 50-lane highway.',
        realWorldExample: 'If a regular Python list is a row of people passing a bucket, NumPy is a giant crane that moves the entire pile of buckets at once.',
        content: `Standard Python lists are "slow" for math because they store pointers to objects scattered in memory. NumPy uses **Contiguous Memory blocks**, which means the CPU can process them incredibly fast.

### Why do we need it?
Every image, sound choice, and text in AI is converted into **Tensors** (multi-dimensional arrays). NumPy is the library that handles these Tensors.

### Core Concepts:
1. **ndarrays**: The N-Dimensional Array.
2. **Vectorization**: Performing math on whole arrays without writing "for loops".
3. **Broadcasting**: Making arrays of different sizes "fit" together for math.`,
        keyPoints: [
          'NumPy arrays are 50x to 100x faster than Python lists for math',
          'Arrays must contain elements of the SAME type (usually floats)',
          ' ফাউন্ডেশন (Foundation) of almost all other ML libraries (Pandas, Scikit-Learn)',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np

# Create a 3x3 matrix of zeros
weights = np.zeros((3, 3))

# Vectorized math (instant)
data = np.array([1, 2, 3])
scaled_data = data * 2.5 # [2.5, 5.0, 7.5]

# Shape manipulation
reshaped = data.reshape(3, 1)`,
        },
      },
    ],
  },
  't1_5': {
    topicId: 't1_5',
    lessons: [
      {
        title: 'Vector Spaces & AI',
        noobDefinition: 'A Vector Space is like a "Map" where every piece of data is a specific point. If two points are close on the map, the AI thinks they are related.',
        realWorldExample: 'A recommendation system like Netflix. You are a "Point" on a map. If you are close to the "Sci-Fi" region and the "Adventure" region, Netflix suggests Dune.',
        content: `In Linear Algebra, we don't just see numbers; we see **Geometry**.

### What is a Vector?
It is a list of numbers representing a point in space.
- 2D Vector: ` + "`[x, y]`" + `
- Image Vector: ` + "`[784]`" + ` (for a 28x28 grayscale image)

### The Dot Product (Alignment)
This is the most important calculation in AI. It measures how much two vectors are "pointing in the same direction".
- If Dot Product is high: The vectors are similar.
- If Dot Product is zero: They are totally unrelated (orthogonal).`,
        vizType: 'vector-space',
        keyPoints: [
          'Vectors represent data points in multi-dimensional space',
          'Linear Algebra allows us to manipulate shapes of data',
          'Dot products are the core of "Similarity Searches"',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np

v1 = np.array([1, 2])
v2 = np.array([3, 4])

# Dot product (Matrix multiplication foundation)
dot = np.dot(v1, v2)
# Or in modern Python:
dot = v1 @ v2`,
        },
      },
    ],
  },
  't1_7': {
    topicId: 't1_7',
    lessons: [
      {
        title: 'Probability Distributions',
        noobDefinition: 'A distribution is a chart of "How likely is this to happen?". The Bell Curve (Normal Distribution) is the most common, where most things are average and extremes are rare.',
        realWorldExample: 'Human height. Most people are near the average height (the peak), and it\'s very rare to see someone 3 feet tall or 8 feet tall (the tails).',
        content: `AI models don't "know" things; they "predict" probabilities.

### The Normal Distribution (Gaussian)
Defined by two things:
1. **Mean (μ)**: The center of the curve (the average).
2. **Standard Deviation (σ)**: How "spread out" the curve is.

If an AI says "I am 90% confident this is a cat," it is looking at the probability distribution of its output and finding that "Cat" is the most likely value.`,
        vizType: 'probability-dist',
        keyPoints: [
          'Probability is the mathematical language of uncertainty',
          'Mean is the center; Variance/Standard Deviation is the spread',
          'Most real-world noise follows a Normal Distribution',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np
from scipy.stats import norm

# Generate 1000 random heights with mean=170cm, std=10cm
heights = np.random.normal(170, 10, 1000)

# Calculate probability of someone being exactly 180cm
prob = norm.pdf(180, 170, 10)`,
        },
      },
    ],
  },
};
