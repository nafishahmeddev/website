import type { VizType } from '../components/TutorialContent';

export interface Lesson {
  id: string;
  title: string;
  content?: string; // Optional since we are moving towards React components for content
  noobDefinition?: string;
  realWorldExample?: string;
  keyPoints?: string[];
  formula?: string;
  vizType?: VizType;
  codeExample?: {
    language: string;
    code: string;
  };
}

export interface TopicTutorial {
  topicId: string;
  lessons: Lesson[];
}

export const TUTORIALS: Record<string, TopicTutorial> = {
  't1_1': {
    topicId: 't1_1',
    lessons: [
      {
        id: 'overview',
        title: 'Module Overview',
        noobDefinition: 'This is the "table of contents" for your Python journey. It shows you everything you\'ll learn and why it matters.',
        realWorldExample: 'Like checking the map before a road trip, the overview prepares you for the landmarks ahead.',
        keyPoints: [
          'Python is indentation-based (no curly braces)',
          'Rich standard library for scientific computing',
          'High-level, readable syntax',
        ],
      },
      {
        id: 'python-basics',
        title: 'Python Basics from JavaScript',
        noobDefinition: 'Python is like a cleaner version of JavaScript. If JS is a messy desk, Python is one where everything is in its own labeled drawer.',
        realWorldExample: 'Switching from JS to Python is like moving from a manual car (JS) where you shift gears yourself, to an automatic car (Python) that handles the boring stuff for you.',
        keyPoints: [
          'Indentation matters in Python - it defines code blocks',
          'Variables don\'t need type declarations',
          'Comments use # instead of //',
          'Both are dynamically typed and flexible',
          'Python is slower but more readable; JS is faster in browsers',
        ],
        codeExample: {
          language: 'python',
          code: `# Python
name = "Alice"
age = 30
is_student = False

if age > 18:
    print(f"Hello {name}, you're an adult!")
    
for i in range(5):
    print(i)`,
        },
      },
      {
        id: 'data-types',
        title: 'Data Types & Collections',
        noobDefinition: 'Data types are like the "shape" of your data. You can\'t put a square peg (text) in a round hole (math) without telling the computer first.',
        realWorldExample: 'A list is like a shopping list; a dictionary is like a real dictionary where you look up a word (key) to find its meaning (value).',
        keyPoints: [
          'Lists are mutable - you can change them after creation',
          'Tuples are immutable - used for fixed collections',
          'Dicts are like JSON - great for structured data',
          'Sets automatically remove duplicates',
          'Use type() to check variable type at runtime',
        ],
        codeExample: {
          language: 'python',
          code: `# Different data types
numbers = [1, 2, 3, 4]  # List
tuples = (1, 2, 3)       # Tuple - can't change
person = {"name": "Bob", "age": 25}  # Dictionary
unique = {1, 2, 2, 3, 3}  # Set - {1, 2, 3}

# Type checking
print(type(numbers))  # <class 'list'>
print(type(person))   # <class 'dict'>`,
        },
      },
      {
        id: 'list-comprehensions',
        title: 'List Comprehensions',
        noobDefinition: 'List comprehension is a "shortcut" for creating lists. It\'s like using a microwave instead of a stove to cook the same meal faster.',
        realWorldExample: 'Instead of picking up 10 apples one by one and putting them in a bag, you just say "bag all apples". One line, same result.',
        keyPoints: [
          'List comprehensions are faster than for loops',
          'They\'re more readable once you understand the syntax',
          'Can include if conditions for filtering',
          'Can be nested for multi-dimensional operations',
          'Perfect for transforming data quickly',
        ],
        formula: '[expression for x in iterable if condition]',
        codeExample: {
          language: 'python',
          code: `# Without list comprehension (verbose)
squares = []
for i in range(10):
    squares.append(i ** 2)

# With list comprehension (elegant!)
squares = [i ** 2 for i in range(10)]

# With condition
even_squares = [i ** 2 for i in range(10) if i % 2 == 0]

# Nested
matrix = [[i + j for j in range(3)] for i in range(3)]`,
        },
      },
      {
        id: 'functions-lambdas',
        title: 'Functions & Lambdas',
        noobDefinition: 'Functions are like "recipe cards". You write the steps once, and you can cook that meal (run that code) whenever you want just by calling its name.',
        realWorldExample: 'A function is like a light switch. You don\'t need to know the electric wiring every time; you just flip the switch (call the function) to get light.',
        keyPoints: [
          'def keyword defines regular functions',
          'lambda creates anonymous functions for simple operations',
          'Functions can return multiple values (tuple)',
          'Default arguments and *args, **kwargs for flexibility',
          'Lambdas with map() and filter() for functional programming',
        ],
        codeExample: {
          language: 'python',
          code: `# Regular function
def add(a, b):
    return a + b

result = add(5, 3)

# Lambda function
square = lambda x: x ** 2
print(square(5))  # 25

# Using with map()
numbers = [1, 2, 3, 4]
squared = list(map(lambda x: x ** 2, numbers))

# Default arguments
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"`,
        },
      },
      {
        id: 'modules-packages',
        title: 'Modules & Packages',
        noobDefinition: 'Modules are like folders in your filing cabinet. If all your papers were in one pile, you\'d never find anything. Modules keep things organized.',
        realWorldExample: 'A "math" module is like a specific toolbox for fixing plumbing. You only bring it out (import it) when you have a leak to fix.',
        keyPoints: [
          'Modules are .py files; packages are directories with __init__.py',
          'Use import for entire modules, from...import for specific items',
          'Virtual environments isolate project dependencies',
          'pip is the Python package installer',
          'Third-party packages massively extend Python\'s capabilities',
        ],
        codeExample: {
          language: 'python',
          code: `# Import entire module
import math
print(math.pi)

# Import specific items
from math import sqrt, pi
print(sqrt(16))

# Import with alias
import numpy as np
arr = np.array([1, 2, 3])

# Create your own module
# in mymodule.py:
# def greet(name):
#     return f"Hi {name}"

# Then use:
# from mymodule import greet`,
        },
      },
    ],
  },

  't1_2': {
    topicId: 't1_2',
    lessons: [
      {
        id: 'overview',
        title: 'NumPy Overview',
        noobDefinition: 'NumPy is the math engine under the hood of almost every AI tool. It makes the computer think in grids and matrices at lightning speed.',
        realWorldExample: 'If Python is a calculator, NumPy is a supercomputer specialized in grids.',
        keyPoints: [
          'NumPy arrays are fixed-size and single-type (optimized)',
          'Vectorized operations remove the need for slow loops',
          'The core of Pandas, Scikit-Learn, and PyTorch',
        ],
      },
      {
        id: 'numpy-vs-lists',
        title: 'NumPy Arrays vs Python Lists',
        noobDefinition: 'NumPy is Python on steroids for numbers. It makes handling millions of data points feel like handling just five.',
        realWorldExample: 'If a regular Python list is a single-lane road, NumPy is a 10-lane highway where cars (data) move much faster in parallel.',
        keyPoints: [
          'np.array() creates NumPy arrays from lists',
          'Arrays have fixed data types (int, float, etc.)',
          'Much faster than Python lists for math operations',
          'Broadcasting allows operations on different-shaped arrays',
          'Arrays are the foundation of pandas DataFrames',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np

# Python list vs NumPy array
py_list = [1, 2, 3, 4, 5]
np_array = np.array([1, 2, 3, 4, 5])

# Simple operation - much faster with NumPy!
result = np_array * 2  # [2, 4, 6, 8, 10]

# Data types
arr = np.array([1, 2, 3], dtype=float)
print(arr)  # [1. 2. 3.]

# 2D array (matrix)
matrix = np.array([[1, 2], [3, 4], [5, 6]])`,
        },
      },
      {
        id: 'shapes-indexing',
        title: 'Array Shapes & Indexing',
        noobDefinition: 'Array shapes are like the dimensions of a box. Indexing is just reaching into the box to grab the exact piece you need.',
        realWorldExample: 'Indexing is like finding your seat in a theater using a Row (Row 5) and Seat Number (Seat 12). The theater is the array; your coordinates are the index.',
        keyPoints: [
          'Shape describes array dimensions: arr.shape gives (rows, cols)',
          'Slicing: [start:stop:step] - stop is exclusive',
          'Negative indices count from the end',
          'Boolean indexing filters based on conditions',
          'reshape() and transpose() change array structure',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np

arr = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(arr.shape)  # (3, 3)

# Indexing
print(arr[0, 0])    # 1 (row 0, col 0)
print(arr[1, 2])    # 6

# Slicing
print(arr[0:2])     # First 2 rows
print(arr[:, 1])    # All rows, column 1
print(arr[1:, :2])  # Rows 1+ and first 2 cols

# Boolean indexing
print(arr[arr > 5])  # [6, 7, 8, 9]

# Reshape
reshaped = arr.reshape(1, 9)  # 1x9 array`,
        },
      },
      {
        id: 'broadcasting-vectorization',
        title: 'Broadcasting & Vectorization',
        keyPoints: [
          'Broadcasting aligns arrays from the right dimension',
          'Missing dimensions are treated as size 1',
          'Eliminates need for explicit loops',
          'Much faster than Python for loops',
          'Element-wise operations: arr1 + arr2, arr * 2, etc.',
        ],
        formula: 'Broadcasting rule: Dimensions are compatible if equal or one is 1',
        codeExample: {
          language: 'python',
          code: `import numpy as np

# Vectorization - no loops!
arr = np.array([1, 2, 3, 4, 5])
result = arr * 2  # [2, 4, 6, 8, 10]

# Broadcasting example
matrix = np.array([[1, 2], [3, 4], [5, 6]])  # Shape (3, 2)
row = np.array([10, 20])                      # Shape (2,)
result = matrix + row  # Broadcasting adds row to each row

# Element-wise operations
mat1 = np.array([[1, 2], [3, 4]])
mat2 = np.array([[5, 6], [7, 8]])
result = mat1 + mat2
result = mat1 * mat2  # Element-wise, not matrix multiplication

# Matrix multiplication (different from *)
result = mat1 @ mat2  # or np.dot(mat1, mat2)`,
        },
      },
      {
        id: 'common-functions',
        title: 'Common NumPy Functions',
        keyPoints: [
          'Use axis parameter: axis=0 (down columns), axis=1 (across rows)',
          'keepdims=True to preserve dimensions after reduction',
          'np.where() for conditional selection',
          'np.concatenate() and np.stack() to combine arrays',
          'np.save() and np.load() for file I/O',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr.sum())       # 15
print(arr.mean())      # 3.0
print(arr.std())       # Standard deviation

matrix = np.array([[1, 2], [3, 4], [5, 6]])
print(matrix.sum(axis=0))  # Sum down columns [9, 12]
print(matrix.sum(axis=1))  # Sum across rows [3, 7, 11]

# Create ranges
x = np.linspace(0, 10, 11)  # 11 points from 0 to 10
y = np.arange(0, 10, 2)     # [0, 2, 4, 6, 8]

# Random numbers
random_arr = np.random.rand(3, 3)  # 0-1 uniform
normal = np.random.randn(3, 3)     # Standard normal`,
        },
      },
      {
        id: 'performance',
        title: 'Performance Optimization',
        keyPoints: [
          'Vectorized operations are 10-100x faster than loops',
          'Use np.dot() for matrix multiplication, not loops',
          'Avoid copying arrays - use slices and views',
          'float32 uses less memory than float64',
          'NumPy operations are implemented in optimized C',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np
import time

# Slow: Python loop
arr = list(range(1000000))
start = time.time()
result = [x * 2 for x in arr]
print(f"Python loop: {time.time() - start:.4f}s")

# Fast: NumPy vectorization
arr_np = np.arange(1000000)
start = time.time()
result = arr_np * 2
print(f"NumPy: {time.time() - start:.6f}s")

# In-place operation saves memory
arr = np.array([1, 2, 3, 4])
arr *= 2  # Modifies in place`,
        },
      },
    ],
  },

  't1_3': {
    topicId: 't1_3',
    lessons: [
      {
        id: 'overview',
        title: 'Pandas Overview',
        noobDefinition: 'Pandas is the ultimate tool for handling data that looks like a table. It makes "cleaning" messy data feel like magic.',
        realWorldExample: 'It\'s like Excel with infinite power and a built-in brain for finding patterns.',
        content: `**Pandas** is the definitive library for data manipulation and analysis. It introduces the **DataFrame**, a powerful 2D data structure that handles missing data, joining, and complex transformations with ease.

**What you'll learn:**
1. **Series & DataFrames**: The core structures.
2. **Data Selection**: Precise filtering and slicing.
3. **Aggregation**: Summarizing data using GroupBy.
4. **Data Cleaning**: Handling missing values (NaN).
5. **Merging**: Combining multiple data sources.`,
      },
      {
        id: 'series-dataframes',
        title: 'Pandas Series & DataFrames',
        noobDefinition: 'Pandas is like Excel for Python. A "Series" is one column, and a "DataFrame" is the whole spreadsheet.',
        realWorldExample: 'If your computer is the kitchen, Pandas is the chef who organizes all the ingredients (data) into beautiful, labeled jars (DataFrames).',
        content: `Pandas is built on NumPy and provides high-level data structures for data analysis.

Two main structures:
1. Series: 1D labeled array (column of data)
2. DataFrame: 2D labeled table (like SQL table or Excel sheet)

DataFrames are the workhorse of data science. They handle messy, real-world data beautifully.`,
        keyPoints: [
          'Series is a 1D vector with index labels',
          'DataFrame is a collection of Series (columns)',
          'Both have index (row labels) and columns (headers)',
          'Built on top of NumPy for performance',
          'Read/write CSV, Excel, SQL databases, etc.',
        ],
        codeExample: {
          language: 'python',
          code: `import pandas as pd

# Series (1D)
prices = pd.Series([10, 20, 30, 40], 
                   index=['apple', 'banana', 'orange', 'grape'])
print(prices['apple'])  # 10

# DataFrame (2D)
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['NYC', 'LA', 'Chicago']
}
df = pd.DataFrame(data)

# Read from CSV
df = pd.read_csv('data.csv')
print(df.head())  # First 5 rows`,
        },
      },
      {
        id: 'selection-filtering',
        title: 'Data Selection & Filtering',
        noobDefinition: 'Selection is like using a search bar. You tell Pandas exactly which rows or columns you want to see, and it hides the rest.',
        realWorldExample: 'Filtering a guest list for a party. You only want the people (rows) who said "Yes" (column: Attending) to appear on your final list.',
        content: `Access data with:
- Column: df['column_name'] or df.column_name
- Row: df.loc[] (label-based) or df.iloc[] (position-based)
- Conditions: df[df['age'] > 25]
- Multiple conditions: df[(df['age'] > 25) & (df['city'] == 'NYC')]

loc uses labels (row/column names), iloc uses integer positions.`,
        keyPoints: [
          'df[\'col\'] selects a column (returns Series)',
          'df[[ \'col1\', \'col2\' ]] selects multiple columns (returns DataFrame)',
          'loc[] uses label-based indexing',
          'iloc[] uses position-based indexing (0, 1, 2...)',
          '& for AND, | for OR, ~ for NOT in conditions',
        ],
        codeExample: {
          language: 'python',
          code: `import pandas as pd

df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'Salary': [50000, 60000, 70000]
})

# Column selection
print(df['Age'])  # Series
print(df[['Name', 'Age']])  # DataFrame

# Row selection
print(df.loc[0])  # First row by label
print(df.iloc[0])  # First row by position

# Filtering
high_earners = df[df['Salary'] > 55000]
young = df[(df['Age'] < 30) & (df['Salary'] > 50000)]

# Setting values
df.loc[0, 'Age'] = 26`,
        },
      },
      {
        id: 'groupby-aggregation',
        title: 'GroupBy & Aggregation',
        noobDefinition: 'GroupBy is like sorting socks. You put all the black socks together, all the white ones together, and then count how many pairs you have.',
        realWorldExample: 'A school wanting to know the average score of each class. They "group" the students by "Class ID" and "aggregate" their scores to get an average.',
        content: `GroupBy splits data into groups and applies functions.

Process:
1. Group by category
2. Apply aggregation function (sum, mean, count, etc.)
3. Result is usually smaller dataset

Perfect for: "What's the average salary by department?" type questions.`,
        keyPoints: [
          'groupby() creates groupby object (lazy evaluation)',
          'Call aggregation function to get results',
          'agg() for multiple functions at once',
          'transform() applies function without aggregating shape',
          'Can group by multiple columns: groupby([\'dept\', \'year\'])',
        ],
        codeExample: {
          language: 'python',
          code: `import pandas as pd

df = pd.DataFrame({
    'Department': ['Sales', 'Sales', 'IT', 'IT', 'HR'],
    'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'Salary': [50000, 55000, 70000, 72000, 45000]
})

# Simple groupby
dept_avg = df.groupby('Department')['Salary'].mean()
# Sales: 52500, IT: 71000, HR: 45000

# Multiple operations
summary = df.groupby('Department').agg({
    'Salary': ['mean', 'min', 'max'],
    'Name': 'count'
})

# GroupBy multiple columns
df.groupby(['Department', 'Year'])[['Salary']].sum()`,
        },
      },
      {
        id: 'missing-data',
        title: 'Handling Missing Data',
        noobDefinition: 'Missing data is like a puzzle with missing pieces. You can either throw away those pieces (dropna) or try to guess what they look like (fillna).',
        realWorldExample: 'A contact form where someone forgot to fill in their phone number. You can either delete that contact or fill it in with "N/A" so your system doesn\'t crash.',
        content: `Real data has missing values (NaN, None, null).

Pandas gives you tools:
- isnull() / isna(): Find missing values
- dropna(): Remove rows/columns with missing data
- fillna(): Replace missing values
- interpolate(): Estimate missing values

Strategy depends on why data is missing and how much is missing.`,
        keyPoints: [
          'NaN (Not a Number) represents missing numeric data',
          'None is Python\'s null value',
          'dropna() removes rows with ANY missing value by default',
          'fillna() can use constants, forward-fill, or interpolation',
          'Consider impact before removing data',
        ],
        codeExample: {
          language: 'python',
          code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'A': [1, 2, None, 4],
    'B': [5, None, 7, 8],
    'C': [9, 10, 11, None]
})

# Check missing values
print(df.isnull())  # Boolean mask
print(df.isnull().sum())  # Count per column

# Remove rows with any NaN
clean = df.dropna()

# Remove rows where specific column is NaN
clean = df.dropna(subset=['A'])

# Fill with value
df.fillna(0)

# Fill with mean
df['A'].fillna(df['A'].mean())

# Forward fill (use previous value)
df.fillna(method='ffill')`,
        },
      },
      {
        id: 'merging-joining',
        title: 'Merging & Joining Data',
        noobDefinition: 'Merging is like taping two different lists together. If you have a list of names and a list of phone numbers, you can merge them into one full directory.',
        realWorldExample: 'Combining your Apple Music library with your Spotify library. You match the song titles (the key) to create one master playlist.',
        content: `Combine multiple DataFrames:
- merge(): SQL-like join (inner, left, right, outer)
- concat(): Stack frames horizontally or vertically
- join(): Join on index

Essential for combining data from different sources.`,
        keyPoints: [
          'merge() is SQL INNER/LEFT/RIGHT/OUTER join',
          'on parameter specifies join column(s)',
          'concat() stacks DataFrames (axis=0 vertical, axis=1 horizontal)',
          'join() is like merge but simpler for index-based',
          'Watch for duplicate column names after join',
        ],
        codeExample: {
          language: 'python',
          code: `import pandas as pd

df1 = pd.DataFrame({'ID': [1, 2, 3], 'Name': ['Alice', 'Bob', 'Charlie']})
df2 = pd.DataFrame({'ID': [1, 2, 3], 'Salary': [50000, 60000, 70000]})

# Merge on ID
result = pd.merge(df1, df2, on='ID')

# Left join
result = pd.merge(df1, df2, on='ID', how='left')

# Concat vertically
df3 = pd.concat([df1, df1])

# Concat horizontally
df_combined = pd.concat([df1, df2], axis=1)`,
        },
      },
    ],
  },

  't2_1': {
    topicId: 't2_1',
    lessons: [
      {
        id: 'overview',
        title: 'ML Paradigms Overview',
        noobDefinition: 'Machine Learning isn\'t one thing; it\'s a set of different ways to teach a computer. Some use "teachers" (Supervised) and some let the computer explore (Unsupervised).',
        realWorldExample: 'Like teaching a child: you either show them a picture of an apple and say "Apple" (Supervised) or you give them a box of shapes and let them sort the circles from the squares (Unsupervised).',
        content: `Machine Learning is broadly categorized into a few main paradigms based on how the "learning" happens. Understanding these categories is the first step to choosing the right tool for the job.

**Key Paradigms:**
- **Supervised**: Learning from example output.
- **Unsupervised**: Finding structure in hidden patterns.
- **Reinforcement**: Learning through trial and error (Rewards).`,
      },
      {
        id: 'supervised',
        title: 'Supervised Learning',
        noobDefinition: 'Supervised Learning is like learning with flashcards that have the answer on the back.',
        realWorldExample: 'Like playing "20 Questions" to guess an object, where each question optimally splits the remaining possibilities.',
        content: `In Supervised Learning, the algorithm learns from "labeled" data. You provide the input AND the correct answer.

Think of it as learning with a teacher. The model makes a prediction, the teacher corrects it, and the model adjusts.`,
        keyPoints: [
          'Classification: Predicting a label (Spam vs Not Spam)',
          'Regression: Predicting a number (House price)',
          'Training set: The data we learn from',
          'Labels: The "ground truth" answers',
          'Feature: The input variables used for prediction',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.ensemble import RandomForestClassifier

# X = features, y = labels
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict on new data
predictions = model.predict(X_test)`,
        },
      },
      {
        id: 'unsupervised',
        title: 'Unsupervised Learning',
        noobDefinition: 'Unsupervised Learning is like sorting a giant bin of mixed Legos without an instruction manual.',
        realWorldExample: 'A recommendation engine on Netflix grouping movies together because they "feel" similar, even if no one told it they were both "Action" movies.',
        content: `In Unsupervised Learning, there are no labels. The algorithm tries to find hidden patterns or structures in the data on its own.

Common tasks include grouping similar items (Clustering) or simplifying complex data (Dimension Reduction).`,
        vizType: 'kmeans',
        keyPoints: [
          'Clustering: Grouping similar data points',
          'Anomaly Detection: Finding the "weird" outliers',
          'Association: Finding rules like "People who buy X also buy Y"',
          'Dimensionality Reduction: Compressing data without losing info',
          'No "ground truth" - evaluation is more subjective',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.cluster import KMeans

# Find 3 natural groups in the data
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)

clusters = kmeans.labels_`,
        },
      },
    ],
  },

  't1_4': {
    topicId: 't1_4',
    lessons: [
      {
        id: 'overview',
        title: 'Data Visualization Overview',
        noobDefinition: 'Visualization is how we turn dry numbers into stories. It\'s hard to spot a trend in 1,000,000 rows of text, but easy in a single graph.',
        realWorldExample: 'A pilot doesn\'t read the manual while flying; they look at a dashboard of gauges. Data viz is the dashboard for your research.',
        content: `In the world of ML, data visualization isn't just for pretty pictures—it's a critical tool for **Exploratory Data Analysis (EDA)** and model debugging.

We'll master two core libraries:
1. **Matplotlib**: The flexible, precise foundation.
2. **Seaborn**: High-level statistical visualization.`,
      },
      {
        id: 'matplotlib-basics',
        title: 'Matplotlib Basics',
        noobDefinition: 'Matplotlib is like a set of Lego bricks. It takes a bit of work to build something, but you can build literally anything you can imagine.',
        realWorldExample: 'Using Matplotlib is like drawing a chart on graph paper with a pencil and ruler—you have to tell it exactly where every line and dot goes.',
        content: `Matplotlib is the "grandfather" of Python visualization. It's highly customizable but can be verbose.

Think of it as a low-level building block. You control every axis, tick, and label.

Basic workflow:
1. Create a figure and axes
2. Plot data
3. Customize (labels, title, colors)
4. Show/save result`,
        keyPoints: [
          'plt.plot() for line charts',
          'plt.scatter() for scatter plots',
          'plt.hist() for distributions',
          'Use plt.subplots() for figure/axes control',
          'plt.show() actually renders the window',
        ],
        codeExample: {
          language: 'python',
          code: `import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='Sine Wave', color='teal')
plt.title('Basic Plot')
plt.xlabel('Time')
plt.ylabel('Amplitude')
plt.legend()
plt.grid(True)
plt.show()`,
        },
      },
      {
        id: 'seaborn-art',
        title: 'Seaborn for Statistical Art',
        noobDefinition: 'Seaborn is like a professional decorator for Matplotlib. It makes everything look beautiful and organized with one click.',
        realWorldExample: 'If Matplotlib is plain graph paper, Seaborn is a pro-level infographic template where the colors and layout are already perfect.',
        content: `Seaborn is built on top of Matplotlib. It makes beautiful statistical plots with much less code.

It understands Pandas DataFrames natively and handles things like confidence intervals and color palettes automatically.`,
        keyPoints: [
          'sns.set_theme() for instant aesthetics',
          'sns.lineplot() automatically aggregates',
          'sns.heatmap() for correlations',
          'sns.regplot() adds regression lines',
          'Beautiful built-in color palettes',
        ],
        codeExample: {
          language: 'python',
          code: `import seaborn as sns
import matplotlib.pyplot as plt

# Load sample data
df = sns.load_dataset('iris')

sns.set_theme(style="darkgrid")
sns.scatterplot(data=df, x='sepal_length', y='sepal_width', hue='species')
plt.title('Iris Dataset - Species Differentiation')
plt.show()`,
        },
      },
    ],
  },

  't1_5': {
    topicId: 't1_5',
    lessons: [
      {
        id: 'overview',
        title: 'Linear Algebra Overview',
        noobDefinition: 'Linear Algebra is the language of space and transformations. It\'s how we describe colors, rotations, and neural patterns in a way a computer can process.',
        realWorldExample: 'Every time you zoom into a photo or play a 3D game, your computer is doing millions of Linear Algebra calculations.',
        content: `Linear Algebra is the silent engine behind modern AI. Every piece of data—be it an image, a word, or a sound—is ultimately transformed into a **vector**. 

**Focus Areas:**
- **Vectors**: Representing data as points in space.
- **Matrices**: Transforming that data through neural layers.
- **Spaces**: Understanding how dimensions relate to features.`,
      },
      {
        id: 'vectors-spaces',
        title: 'Vectors & Vector Spaces',
        noobDefinition: 'A vector is just a point on a map. "Vector Space" is the map itself where all those points live.',
        realWorldExample: 'Think of a music app recommendation. You are a "point" (vector) on a map based on how much you like Rock vs Pop. The map is the "Vector Space".',
        content: `Vectors are the fundamental building blocks of AI. In ML, we represent data (pixels, words, numbers) as vectors.

A vector is just a list of numbers that represents a point in space. An image might be a vector of 784 numbers (28x28 pixels).`,
        vizType: 'vector-space',
        keyPoints: [
          'Vectors are arrows in space (direction + magnitude)',
          'Vector addition: combining influences',
          'Scalar multiplication: scaling a vector',
          'Dot product: how much two vectors align',
          'The basis: the "unit" dimensions of our space',
        ],
        codeExample: {
          language: 'python',
          code: `import numpy as np

# A vector in 3D space
v = np.array([1, 2, 3])

# Vector addition
u = np.array([4, 5, 6])
result = v + u

# Magnitude (length)
norm = np.linalg.norm(v)`,
        },
      },
      {
        id: 'matrices-transformations',
        title: 'Matrices as Transformations',
        noobDefinition: 'A matrix is like a "filter" or a "lens". When you look at data through it, the data gets stretched, rotated, or squished.',
        realWorldExample: 'In your Instagram app, a filter is just a matrix that changes the numbers (colors) of your photo to make it look different.',
        content: `If vectors are "data", matrices are "functions". 

Multiplying a vector by a matrix transforms it: it can rotate, scale, or shear the vector space. This is how Neural Network layers process information!`,
        keyPoints: [
          'Matrices act as linear transformations',
          'Matrix multiplication is combining transformations',
          'The identity matrix keeps space unchanged',
          'Determinants measure how much area/volume changes',
          'Matrix inversion "undoes" a transformation',
        ],
        codeExample: { language: 'python', code: `A = np.array([[1, 2], [3, 4]])
v = np.array([1, 0])

# Transform vector v by matrix A
v_transformed = A @ v` },
      },
    ],
  },

  't1_6': {
    topicId: 't1_6',
    lessons: [
      {
        id: 'derivatives',
        title: 'Derivatives & Rate of Change',
        noobDefinition: 'A derivative is just a speedometer. It tells you exactly how fast a value is changing at this very second.',
        realWorldExample: 'If a ball is rolling down a hill, the derivative tells you how much faster it gets every inch it rolls.',
        content: `Calculus is the math of change. Derivatives tell us how a function changes at a specific point.

In ML, we use derivatives to find the "slope" of the loss function. If we know the slope, we know which way to "roll" to minimize error.`,
        vizType: 'gradient-descent',
        keyPoints: [
          'The derivative f\'(x) is the instant slope',
          'Chain Rule: How "composed" functions change (vital for Backprop)',
          'Partial Derivatives: Derivatives in multi-dimensional space',
          'The Gradient: A vector pointing to the steepest increase',
          'Optimization: Setting derivatives to zero to find peaks/valleys',
        ],
        formula: 'f\'(x) = lim(h→0) [f(x+h) - f(x)] / h',
      },
    ],
  },

  't1_7': {
    topicId: 't1_7',
    lessons: [
      {
        id: 'probability-dist',
        title: 'Probability Distributions',
        noobDefinition: 'A distribution is a bar chart of "how common" things are. Most people are average height, so the chart is tallest in the middle.',
        realWorldExample: 'If you count the number of chocolate chips in 100 cookies, most will have about the same amount. That pattern is a "distribution".',
        vizType: 'probability-dist',
        keyPoints: [
          'Mean (μ) is the center of the distribution',
          'Variance (σ²) is how "spread out" the data is',
          'Central Limit Theorem: Everything becomes normal eventually',
          'Probability Density (PDF) vs Cumulative (CDF)',
          'Z-scores: Measuring how "weird" a data point is',
        ],
        codeExample: {
          language: 'python',
          code: `from scipy import stats
import numpy as np

# Generate normal distribution
data = np.random.normal(0, 1, 1000)
mean, std = np.mean(data), np.std(data)`,
        },
      },
    ],
  },
  't2_2': {
    topicId: 't2_2',
    lessons: [
      {
        id: 'bias-variance',
        title: 'Bias-Variance Tradeoff',
        noobDefinition: 'A Loss Function is a "Scoreboard" that tells the AI how bad its guess was. A high score is bad; a zero score is a perfect bullseye.',
        realWorldExample: 'Imagine playing darts while blindfolded. Your friend yelling "You missed by 2 feet" is the Loss Function helping you adjust.',
        vizType: 'bias-variance',
        keyPoints: [
          'Loss: The penalty for a single wrong prediction',
          'Cost: The average loss over the whole dataset',
          'L2 Loss (MSE): Penalizes large errors heavily',
          'L1 Loss (MAE): Robust to outliers',
          'Cross-Entropy: Measuring distance between probability distributions',
        ],
        formula: 'MSE = (1/n) * Σ(y_actual - y_pred)²',
      },
    ],
  },

  't2_3': {
    topicId: 't2_3',
    lessons: [
      {
        id: 'gradient-descent',
        title: 'Gradient Descent',
        noobDefinition: 'Gradient Descent is like being at the top of a dark mountain and trying to find the valley by feeling which way is down with your feet.',
        realWorldExample: 'Adjusting the temperature of your shower. If it\'s too cold, you turn it up a bit (a small step) until it\'s just right (the minimum error).',
        vizType: 'gradient-descent',
        keyPoints: [
          'Learning Rate (α): The size of the steps we take',
          'The Gradient: The direction to the steepest increase',
          'Stochastic Gradient Descent (SGD): One data point at a time',
          'Batch Gradient Descent: Whole dataset at once',
          'Local Minima: Getting stuck in a small dip instead of the valley',
        ],
        codeExample: {
          language: 'python',
          code: `# The core update rule
w = w - learning_rate * gradient

# In libraries like PyTorch:
optimizer.step()`,
        },
      },
    ],
  },
};
