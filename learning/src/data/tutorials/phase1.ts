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
        title: 'Python Basics from JavaScript',
        noobDefinition: 'Python is like a cleaner version of JavaScript. If JS is a messy desk, Python is one where everything is in its own labeled drawer.',
        realWorldExample: 'Switching from JS to Python is like moving from a manual car (JS) where you shift gears yourself, to an automatic car (Python) that handles the boring stuff for you.',
        content: `Python and JavaScript have many similarities. Let's explore the fundamental differences:

Key similarities:
- Variables, functions, loops, conditionals
- Objects (JS) ≈ Dictionaries (Python)
- Arrays (JS) ≈ Lists (Python)

Key differences:
- Python uses indentation for blocks (no curly braces)
- Python emphasizes readability and simplicity
- Different naming conventions (snake_case vs camelCase)

Since you know JavaScript, Python will feel familiar. The syntax is just cleaner!`,
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
        title: 'Data Types & Collections',
        noobDefinition: 'Data types are like the "shape" of your data. You can\'t put a square peg (text) in a round hole (math) without telling the computer first.',
        realWorldExample: 'A list is like a shopping list; a dictionary is like a real dictionary where you look up a word (key) to find its meaning (value).',
        content: `Python has rich built-in data types perfect for data science:

1. Numbers: int, float (no separate integer type like in some languages)
2. Strings: Immutable sequences of characters
3. Lists: Ordered, mutable collections (like JS arrays)
4. Tuples: Ordered, immutable collections (great for fixed data)
5. Dicts: Unordered key-value pairs (like JS objects)
6. Sets: Unordered, unique collections (no duplicates)

Each type has specific methods and use cases. For ML/AI, you'll mostly use lists, dicts, and numbers.`,
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
        title: 'List Comprehensions',
        noobDefinition: 'List comprehension is a "shortcut" for creating lists. It\'s like using a microwave instead of a stove to cook the same meal faster.',
        realWorldExample: 'Instead of picking up 10 apples one by one and putting them in a bag, you just say "bag all apples". One line, same result.',
        content: `List comprehensions are Python's elegant way to create lists. They're much more concise than loops and very Pythonic.

Syntax: [expression for item in iterable if condition]

This is one of Python's superpowers for data processing. Instead of writing 5 lines of loops, you write 1 line!`,
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
        title: 'Functions & Lambdas',
        noobDefinition: 'Functions are like "recipe cards". You write the steps once, and you can cook that meal (run that code) whenever you want just by calling its name.',
        realWorldExample: 'A function is like a light switch. You don\'t need to know the electric wiring every time; you just flip the switch (call the function) to get light.',
        content: `Functions are reusable blocks of code. Python functions use the 'def' keyword.

Lambda functions are small anonymous functions for quick operations. They're especially useful with map(), filter(), and reduce().

Use regular functions for complex logic, lambdas for simple one-liners.`,
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
        title: 'Modules & Packages',
        noobDefinition: 'Modules are like folders in your filing cabinet. If all your papers were in one pile, you\'d never find anything. Modules keep things organized.',
        realWorldExample: 'A "math" module is like a specific toolbox for fixing plumbing. You only bring it out (import it) when you have a leak to fix.',
        content: `Python code is organized into modules (files) and packages (directories).

import: Load code from other modules
from ... import ...: Import specific items

Python has an incredible standard library and third-party packages (NumPy, Pandas, TensorFlow, etc.).

Package managers:
- pip: Standard package manager (pip install package_name)
- Anaconda/Conda: Popular for data science`,
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
        title: 'NumPy Arrays vs Python Lists',
        noobDefinition: 'NumPy is Python on steroids for numbers. It makes handling millions of data points feel like handling just five.',
        realWorldExample: 'If a regular Python list is a single-lane road, NumPy is a 10-lane highway where cars (data) move much faster in parallel.',
        content: `NumPy (Numerical Python) is fundamental for scientific computing and ML. Its core data structure is the ndarray (n-dimensional array).

Why NumPy over Python lists?
1. Speed: 10-100x faster for numerical operations
2. Memory efficiency: Uses much less RAM
3. Broadcasting: Perform operations on arrays of different shapes
4. Vectorization: Write code without loops

Under the hood, NumPy arrays are stored contiguously in memory with fixed data types. Python lists are scattered pointers.`,
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
        title: 'Array Shapes & Indexing',
        noobDefinition: 'Array shapes are like the dimensions of a box. Indexing is just reaching into the box to grab the exact piece you need.',
        realWorldExample: 'Indexing is like finding your seat in a theater using a Row (Row 5) and Seat Number (Seat 12). The theater is the array; your coordinates are the index.',
        content: `NumPy arrays have shapes that define their dimensions.

Shape is a tuple: (rows, columns) for 2D, (rows, cols, depth) for 3D, etc.

Indexing lets you access specific elements:
- Single index: arr[0]
- 2D index: arr[0, 1] (row 0, column 1)
- Slicing: arr[1:4] (elements 1-3)
- Negative indexing: arr[-1] (last element)
- Boolean indexing: arr[arr > 5] (elements > 5)`,
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
        title: 'Broadcasting & Vectorization',
        content: `Broadcasting is NumPy's feature to perform operations on arrays of different shapes.

The key rule: Arrays are broadcast along their dimensions if they have compatible shapes.

Vectorization means writing code WITHOUT explicit loops. NumPy operations automatically apply to each element.

This is what makes NumPy fast - operations happen in optimized C code, not Python loops!`,
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
        title: 'Common NumPy Functions',
        content: `NumPy has built-in functions for statistics, linear algebra, and array manipulation.

Key functions:
- sum(), mean(), std(): Basic statistics
- min(), max(), argmin(), argmax(): Finding extremes
- sort(), argsort(): Sorting
- linspace(): Create evenly spaced numbers
- random: Random number generation
- dot(), linalg: Linear algebra operations`,
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
        title: 'Performance Optimization',
        content: `NumPy is fast, but you can make it even faster:

1. Use vectorization - avoid explicit Python loops
2. Minimize array copying - work in-place when possible
3. Choose right data types - float32 vs float64
4. Use appropriate functions - built-ins are optimized
5. Consider memory layout - C vs Fortran order

For extremely large datasets, look into libraries like CuPy (GPU acceleration) or Dask (parallel computing).`,
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
  't1_4': {
    topicId: 't1_4',
    lessons: [
      {
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
        title: 'Distributions & Uncertainty',
        noobDefinition: 'A distribution is a bar chart of "how common" things are. Most people are average height, so the chart is tallest in the middle.',
        realWorldExample: 'If you count the number of chocolate chips in 100 cookies, most will have about the same amount. That pattern is a "distribution".',
        content: `Probability is the core of how AI handles uncertainty. Most real-world data follows known "distributions".

The Normal (Gaussian) distribution is the most important one - it summarizes how data clusters around an average.`,
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
};
