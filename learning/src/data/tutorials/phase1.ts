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
        title: "Pythonic Foundations for AI",
        content: `### Why Python for Machine Learning?
Python isn't just a language; it's the **foundation** of the AI revolution. Its syntax is designed to be readable, allowing researchers to turn mathematical formulas into code with minimal friction.

### Step-by-Step: Thinking in Python
Unlike C++ or Java, Python handles complex memory management for you. Here’s the "Mental Model" you need:

1.  **Direct Assignment**: No need to declare types. Python understands context.
2.  **Indentation as Logic**: Using whitespace to define blocks makes code readable by default.
3.  **The Standard Library**: A massive collection of ready-made tools for math and logic.

#### The "AI Standard" Style
In AI, we follow **PEP 8** guidelines. Clean code isn't just for looks; it prevents bugs when dealing with massive datasets.`,
        noobDefinition: "Think of Python as a set of high-tech LEGO instructions. You don't need to know how the plastic is made; you just need to know how to snap the pieces together to build a spaceship.",
        realWorldExample: "Instagram's recommendation engine is built on Python. It processes millions of signals (likes, scrolls) using the same logic you're writing here.",
        codeExample: {
          language: "python",
          code: `# Step 1: Handling Data with Lists & Dicts
user_data = {
    "name": "Alex",
    "interests": ["Robotics", "Vision"],
    "is_pro": True
}

# Step 2: Logic with List Comprehensions (Pro-Tip)
# Filtering data in a single, readable line
skills = ["Vision", "NLP", "Robotics", "Stat"]
ai_skills = [s for s in skills if len(s) > 3]

# Step 3: Functions for Reusability
def calculate_confidence(score):
    return f"Accuracy: {score * 100}%"

print(calculate_confidence(0.985))`
        }
      },
      {
        title: "Data Structures for Model Weights",
        content: `### Managing Information
In ML, we don't just store names; we store **parameters** (the settings that make an AI smart).

### Step-by-Step: Choosing Your Container
1.  **Lists**: Flexible storage for sequences (e.g., a list of image file names).
2.  **Dictionaries**: Mapping descriptors to values (e.g., 'learning_rate': 0.001).
3.  **Sets**: Rapidly finding unique items in a noisy dataset.
4.  **Tuples**: Storing fixed information that should NEVER change (like image dimensions).

#### Efficiency Note
AI models can have millions of parameters. Choosing the right structure can be the difference between a model that runs in 1 second vs 1 minute.`,
        codeExample: {
          language: "python",
          code: `# Dictionaries are the backbone of Configuration
hyperparameters = {
    "learning_rate": 0.01,
    "batch_size": 32,
    "optimizer": "Adam"
}

# Sets: Finding unique categories in data
raw_labels = ["cat", "dog", "cat", "bird", "dog"]
unique_categories = set(raw_labels) # {'cat', 'dog', 'bird'}

# Slicing: Extracting a 'window' of data
data = [10, 20, 30, 40, 50, 60]
train_split = data[:4] # [10, 20, 30, 40]
test_split = data[4:]  # [50, 60]`
        }
      }
    ]
  },
  't1_2': {
    topicId: 't1_2',
    lessons: [
      {
        title: "NumPy: The Numerical Engine",
        content: `### The Performance Gap
Python lists are great for data, but they are **slow**. NumPy (Numerical Python) is written in C and handles math at the hardware level. In AI, every pixel or word is a number; NumPy is what moves them.

### Step-by-Step: Arrays vs Lists
1.  **Creation**: Turn plain Python lists into high-performance \`ndarrays\`.
2.  **Vectorization**: The "Superpower". Perform math on 1 million numbers at once without a slow 'for-loop'.
3.  **Shape**: Check the dimensions of your data (1D Vectors, 2D Matrices, 3D Tensors).

#### Memory Logic
NumPy stores numbers in a "Contiguous" block in your RAM, allowing your CPU to fetch them instantly.`,
        noobDefinition: "If a Python list is a row of people passing buckets by hand, NumPy is a high-speed conveyor belt that moves thousands of buckets a second.",
        vizType: 'vector-space',
        codeExample: {
          language: "python",
          code: `import numpy as np

# Step 1: Creating a Matrix (2D Array)
# This represents a 3x3 grid of weights
weights = np.array([
    [0.1, 0.2, 0.3],
    [0.4, 0.5, 0.6],
    [0.7, 0.8, 0.9]
])

# Step 2: Vectorization (Fast Math)
# Add 0.5 to every single weight instantly
adjusted_weights = weights + 0.5

# Step 3: Reduction Operations
# Calculate the average of all weights
average_weight = np.mean(weights)`
        }
      },
      {
        title: "Reshaping Tensors",
        content: `### Fitting Data to the Architecture
Imagine you have 784 pixels from a drawing. A model might need that as a **28x28 grid**. This is where reshaping comes in.

### Step-by-Step Transformation
1.  **Inspect**: Always check \`data.shape\` before processing.
2.  **Reshape**: Change dimensions without losing data.
3.  **Broadcast**: Perform math between arrays of different sizes automatically.

#### The Rule of Reshaping
The total number of elements must stay identical. You can't turn a (12,) array into a (5, 5).`,
        codeExample: {
          language: "python",
          code: `import numpy as np

# Create 12 flat elements
data = np.arange(12) # [0, 1, 2... 11]

# 1D to 2D (3 rows, 4 columns)
matrix = data.reshape(3, 4)

# 2D to 3D (2 layers, 2 rows, 3 columns)
tensor = data.reshape(2, 2, 3)

# Flattening: Reverting any shape back to a 1D line
# (Crucial for the final layer of many neural networks)
flat = tensor.flatten()`
        }
      }
    ]
  },
  't1_3': {
    topicId: 't1_3',
    lessons: [
      {
        title: "Pandas: Data Analysis at Scale",
        content: `### Handling Tabular Data
Pandas is the "Excel of Python". It allows you to load, clean, and analyze millions of rows of data with just a few lines of code.

### Step-by-Step Data Wrangling
1.  **Loading**: Read data from CSV, Excel, or SQL databases.
2.  **Filtering**: Select specific rows and columns based on complex conditions.
3.  **Grouping**: Aggregate data (like "Average Sale per Region") instantly.
4.  **Cleaning**: Detect and fill missing (null) values to keep your model accurate.

#### The DataFrame
A DataFrame is a 2D table where every column is a **Series**. It's the standard format for almost all ML datasets.`,
        noobDefinition: "Pandas is like having a super-powered Excel that never crashes, can handle billions of cells, and lets you ask complex questions about your data using simple code.",
        realWorldExample: "Netflix uses Pandas to analyze your viewing history and grouped by genres to decide which 'Trending' shows to show you first.",
        codeExample: {
          language: "python",
          code: `import pandas as pd

# Step 1: Create a DataFrame
data = {
    'city': ['NYC', 'SF', 'London', 'NYC'],
    'temp': [72, 68, 62, 75],
    'is_raining': [False, True, True, False]
}
df = pd.DataFrame(data)

# Step 2: Querying & Filtering
# Get cities where it's hotter than 70 degrees
hot_cities = df[df['temp'] > 70]

# Step 3: Aggregation
# Average temp by city
avg_temp = df.groupby('city')['temp'].mean()`
        }
      }
    ]
  },
  't1_4': {
    topicId: 't1_4',
    lessons: [
      {
        title: "Visualization: Seeing is Believing",
        content: `### The Power of Matplotlib
In ML, you can't just look at raw numbers. You need to see patterns. **Matplotlib** and **Seaborn** turn abstract tensors into clear, actionable charts.

### Step-by-Step Plotting
1.  **Distributions**: Use Histograms to see the "Shape" of your data.
2.  **Correlations**: Use Scatter Plots to see if two things (like Heat and Ice-Cream sales) move together.
3.  **Training Progress**: Plot "Loss over Time" to see if your AI is actually learning.

#### Aesthetic Power
While Matplotlib is for logic, **Seaborn** is for beauty. It applies professional color palettes with a single command.`,
        noobDefinition: "Visualization is like turning a boring list of 1 million GPS coordinates into a beautiful, glowing map of a city. It makes the 'invisible' patterns in data visible to the human eye.",
        realWorldExample: "Stock market charts are data visualizations. They turn thousands of individual trades into a single line that tells a story of growth or decline.",
        codeExample: {
          language: "python",
          code: `import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Step 1: Create sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Step 2: Styling with Seaborn
sns.set_theme(style="darkgrid")

# Step 3: Build the Plot
plt.figure(figsize=(10, 5))
plt.plot(x, y, label='Sine Wave', color='cyan')
plt.title("The Pulse of Data")
plt.xlabel("Time (s)")
plt.ylabel("Intensity")
plt.legend()
plt.show()`
        }
      }
    ]
  },
  't1_5': {
    topicId: 't1_5',
    lessons: [
      {
        title: "Vector Spaces & Geometry",
        content: `### Data as Coordinates
In AI, we don't just see numbers; we see **Geometry**. Every piece of data is a "Point" in a multi-dimensional map.

### Step-by-Step: The Dot Product
This is the single most important calculation in Machine Learning. It measures "Similarity".

1.  **Vector A**: Represents object 1.
2.  **Vector B**: Represents object 2.
3.  **Dot Product**: Multiply corresponding parts and sum them.

#### Similarity Index
*   **High Dot Product**: The objects are very similar (pointing the same way).
*   **Zero Dot Product**: They are totally unrelated (Orthogonal).`,
        vizType: 'vector-space',
        codeExample: {
          language: "python",
          code: `import numpy as np

# Two vectors representing product features
# [Price, Quality]
v1 = np.array([1, 2])
v2 = np.array([3, 4])

# Standard Dot Product calculation
# (1*3) + (2*4) = 11
similarity = np.dot(v1, v2)

# Modern Python Syntax (The @ operator)
# This is preferred in clean AI code
sim_modern = v1 @ v2`
        }
      }
    ]
  },
  't1_6': {
    topicId: 't1_6',
    lessons: [
      {
        title: "Calculus: The Mechanics of Change",
        content: `### The Core of 'Learning'
When we say an AI is "learning", we mean it is using **Calculus** to find the exact direction it needs to change its weights to reduce its error.

### Step-by-Step Optimization
1.  **Function**: Your model is a complex math function.
2.  **Derivative**: A measurement of "Slope". It tells you: "If I move X, how much will Y change?"
3.  **Partial Derivatives**: In AI, we have millions of X's. We calculate the slope for each one individually.
4.  **Chain Rule**: The secret recipe that allows us to calculate gradients across deep layers by multiplying simple slopes.

#### The Gradient
A collection of all partial derivatives. It's the "Compass" that points the AI toward the truth.`,
        noobDefinition: "Imagine you are blindfolded on a mountain. Calculus is like feeling the ground with your foot to know which way is 'Downhill'. If you keep stepping downhill, you'll eventually reach the valley floor (the answer).",
        realWorldExample: "Google Maps' route optimizer uses calculus-based algorithms to find the 'Minimum' travel time through millions of possible street combinations.",
        codeExample: {
          language: "python",
          code: `# Using Symbolic Math to find Derivatives
import sympy as sp

# Step 1: Define variables
x = sp.Symbol('x')
f = x**2 + 5*x + 10 # Our 'Error' function

# Step 2: Calculate Slope automatically
derivative = sp.diff(f, x) 
# Result: 2*x + 5

# Step 3: Evaluate at x=10
slope_at_10 = derivative.subs(x, 10)
print(f"At position 10, the slope is: {slope_at_10}")`
        }
      }
    ]
  },
  't1_7': {
    topicId: 't1_7',
    lessons: [
      {
        title: "Probability & Uncertainty",
        content: `### Predicting the Uncertain
AI models don't say "This is a cat." They say "There is a **98.2% probability** this is a cat." Understanding distributions is how we measure confidence.

### Step-by-Step: The Bell Curve
1.  **Mean (μ)**: The "Anchor" or average of your data.
2.  **Standard Deviation (σ)**: How "spread out" the results are from the average.
3.  **Inference**: Where does a new data point land on this curve?

#### Why it matters
Knowing the distribution helps models handle **outliers** (noise) and normalize data so the AI can learn faster.`,
        vizType: 'probability-dist',
        codeExample: {
          language: "python",
          code: `import numpy as np
from scipy import stats

# 1. Generate random human heights (mean=170, std=10)
heights = np.random.normal(170, 10, 1000)

# 2. Key Statistical Identifiers
avg = np.mean(heights)
variation = np.std(heights)

# 3. Probability Density Function (PDF)
# What is the likelihood of someone being 185cm?
prob_185 = stats.norm.pdf(185, 170, 10)`
        }
      }
    ]
  }
};
