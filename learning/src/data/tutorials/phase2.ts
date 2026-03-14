import type { TopicTutorial } from './phase1';

export const phase2Tutorials: Record<string, TopicTutorial> = {
  't2_1': {
    topicId: 't2_1',
    lessons: [
      {
        title: "The Learning Paradigms",
        content: `### Teaching the Machine
The first major decision in any AI project is choosing the **Learning Paradigm**. This is the high-level strategy for how the model learns from data.

### Step-by-Step Breakdown
1.  **Supervised**: Learning with a Teacher. You provide (Input, Label) pairs. The AI learns the map between them.
2.  **Unsupervised**: Learning by Discovery. No labels are provided. The AI finds hidden patterns or groups (clusters).
3.  **Reinforcement**: Learning by Interaction. The AI takes actions in an environment to maximize a reward.

#### Decision Framework
- Do you have the "Answers" (Labels)? Use **Supervised**.
- Do you just have a "Pile of Data"? Use **Unsupervised**.`,
        noobDefinition: "Supervised learning is like study-guides with answers included. Unsupervised learning is like being a detective trying to find a pattern in a crime scene with no clues.",
        realWorldExample: "A Medical AI (Supervised) is trained on 1M X-rays labeled 'Cancer' or 'Healthy'. A Customer Segmenter (Unsupervised) groups millions of shoppers into 'Budget' vs 'Premium' without being told who is who.",
        codeExample: {
          language: "python",
          code: `# Supervised: Linear Regression with Labels
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_training_features, y_actual_labels)

# Unsupervised: K-Means Clustering for Patterns
from sklearn.cluster import KMeans
clusterer = KMeans(n_clusters=3)
clusters = clusterer.fit_predict(unlabeled_data)`
        }
      }
    ]
  },
  't2_2': {
    topicId: 't2_2',
    lessons: [
      {
        title: "Linear Regression: The Trend Finder",
        content: `### The Line of Best Fit
Linear Regression is the "Hello World" of Machine Learning. It's the art of drawing a straight line through complex data points to predict numerical values.

### Step-by-Step Process
1.  **Hypothesis**: Assume the data follows a line equation: \`y = mx + b\`.
2.  **Weights (m)**: Determine how much impact a feature (like size) has on the target (like price).
3.  **Bias (b)**: The baseline value (initial starting point).
4.  **Error Calculation**: Measure how far the line is from the actual data points.

#### Why Linear?
It’s easy to interpret. If \`m = 100\`, you know that for every 1 unit increase in X, Y increases by 100.`,
        vizType: 'linear-regression',
        codeExample: {
          language: "python",
          code: `import numpy as np
from sklearn.linear_model import LinearRegression

# Step 1: Prepare data (House size vs. Price)
# reshape(-1, 1) is required for single features in Scikit-Learn
X = np.array([1200, 1500, 1800, 2100, 2400]).reshape(-1, 1)
y = np.array([250000, 310000, 380000, 420000, 490000])

# Step 2: Initialize and Train
regressor = LinearRegression()
regressor.fit(X, y)

# Step 3: Predict
prediction = regressor.predict([[2000]])
print(f"Estimated Price: \${prediction[0]:,.2f}")`
        }
      }
    ]
  },
  't2_3': {
    topicId: 't2_3',
    lessons: [
      {
        title: "Gradient Descent: The Engine",
        content: `### How AI Learns
How does the computer actually find the "Perfect Weights"? It doesn't guess; it uses **Gradient Descent**.

### Step-by-Step Optimization
1.  **Initialize**: Start with random weights (a terrible line).
2.  **Calculate Loss**: Find the "Total Error" of the current line.
3.  **Find Gradient**: Calculate the slope of the error. Which way is "downhill"?
4.  **Step Down**: Adjust weights slightly in the opposite direction of the gradient.
5.  **Converge**: Repeat until the error is as low as possible.

#### The Learning Rate (α)
This is your step size.
- **Too Big**: You overstep and bounce around the valley.
- **Too Small**: It takes years to reach the bottom.`,
        vizType: 'gradient-descent',
        codeExample: {
          language: "python",
          code: `# The core update rule in almost ALL of AI
# weight = weight - (learning_rate * gradient)

import numpy as np

def simple_gradient_descent(x, learning_rate=0.1):
    # Function to minimize: f(x) = x^2 (Error curve)
    # Gradient (Derivative): 2x
    gradient = 2 * x
    
    # Update step
    new_x = x - (learning_rate * gradient)
    return new_x

# Start at x=10, run 1 step
pos = simple_gradient_descent(10) # 8.0`
        }
      }
    ]
  },
  't2_4': {
    topicId: 't2_4',
    lessons: [
      {
        title: "Logistic Regression: The Classifier",
        content: `### From Lines to Categories
Despite the name, Logistic Regression is for **Classification** (Yes/No, Spam/Not-Spam). It uses a mathematical "S-Curve" (Sigmoid) to turn linear outputs into probabilities.

### Step-by-Step Logic
1.  **Linear Score**: Calculate a raw score (like linear regression).
2.  **Squashing**: Pass that score through the **Sigmoid Function**.
3.  **Probability**: The result is a value between 0 and 1.
4.  **Threshold**: If prob > 0.5, classify as "1" (Yes), else "0" (No).

#### The Sigmoid Secret
It turns a raw prediction of 100 or -100 into a clean 0.999 or 0.001.`,
        vizType: 'logistic-sigmoid',
        codeExample: {
          language: "python",
          code: `import numpy as np
from sklearn.linear_model import LogisticRegression

# Step 1: Prepare classification data
# Features: [Hours Studied, Sleep Amount]
X = [[2, 8], [8, 5], [1, 9], [9, 7]]
y = [0, 1, 0, 1] # 0 = Fail, 1 = Pass

# Step 2: Initialize & Fit
clf = LogisticRegression()
clf.fit(X, y)

# Step 3: Probability Output
# Returns chance of Fail vs. Pass
probs = clf.predict_proba([[7, 6]])
print(f"Confidence of Passing: {probs[0][1] * 100:.1f}%")`
        }
      }
    ]
  },
  't2_5': {
    topicId: 't2_5',
    lessons: [
      {
        title: "The Data Divide: Train / Val / Test",
        content: `### Why We Split Data
If you give an AI the answers to the test while it's studying, it will just memorize them. To build a model that works in the **real world**, we must hide some data from it until the very end.

### Step-by-Step Splitting Strategy
1.  **Training Set (70-80%)**: The "Textbook". The model sees this data over and over to learn patterns.
2.  **Validation Set (10-15%)**: The "Practice Quiz". Used to tune settings (hyperparameters) without 'cheating' on the final exam.
3.  **Test Set (10-15%)**: The "Final Exam". Seen ONLY once. It gives the true measure of performance.

#### k-Fold Cross-Validation
A pro technique where you rotate which part of the data is used for validation, ensuring every single row gets a chance to be part of the "Practice Quiz".`,
        noobDefinition: "Imagine teaching a child to solve math problems. You show them 10 examples (Training), give them 2 practice problems to see if they need help (Validation), and then give them a totally new problem they've never seen (Test) to see if they actually understand math.",
        realWorldExample: "Self-driving cars are trained on millions of miles of footage. But their true test is driving on a street they have never 'seen' before in their training data.",
        codeExample: {
          language: "python",
          code: `from sklearn.model_selection import train_test_split

# Step 1: Split into Train (80%) and 'Temporary' (20%)
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Step 2: Split the 20% into Val and Test (10% each of total)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42
)

print(f"Training items: {len(X_train)}")
print(f"Validation items: {len(X_val)}")
print(f"Test items: {len(X_test)}")`
        }
      }
    ]
  },
  't2_6': {
    topicId: 't2_6',
    lessons: [
      {
        title: "Feature Engineering: Crafting Intelligence",
        content: `### Data is Raw Material
Raw data is rarely ready for AI. Feature Engineering is the process of transforming raw inputs (like dates or text) into numbers that highlight the "Patterns" the AI needs to see.

### Step-by-Step Transformation
1.  **Normalization**: Scaling numbers (like 0-100 and 0-1,000,000) to the same range so one doesn't 'drown out' the other.
2.  **One-Hot Encoding**: Turning categories (like 'Red', 'Blue') into 0s and 1s that math can handle.
3.  **Handling Missing Data**: Filling gaps (Imputation) rather than throwing away valuable rows.
4.  **Polynomial Features**: Creating new data by combining existing ones (e.g., multiplying "House Size" by "Number of Rooms").

#### The Gold Standard
Great features are more important than complex algorithms. A simple model with perfect features will beat a complex model with noisy data every time.`,
        noobDefinition: "It's like cooking. You don't just throw a whole unpeeled potato and a raw steak into a pot. You peel, chop, and season (Feature Engineering) so the heat (the ML model) can cook it perfectly.",
        realWorldExample: "Credit card companies don't just look at 'Amount Spent'. They engineer features like 'Ratio of spent amount to credit limit' or 'Time since last international purchase' to detect fraud.",
        codeExample: {
          language: "python",
          code: `from sklearn.preprocessing import StandardScaler, OneHotEncoder
import pandas as pd

# Step 1: Scaling Numerical Data
scaler = StandardScaler()
# Transforms data to have Mean=0 and Std=1
scaled_prices = scaler.fit_transform(df[['price']])

# Step 2: Encoding Categorical Data
encoder = OneHotEncoder()
# Turns ['Red', 'Blue'] into [[1,0], [0,1]]
encoded_colors = encoder.fit_transform(df[['color']])

# Step 3: Handling Missing Values
df['age'] = df['age'].fillna(df['age'].median())`
        }
      }
    ]
  },
  't2_7': {
    topicId: 't2_7',
    lessons: [
      {
        title: "The scikit-learn API: The ML Standard",
        content: `### The Unified Mental Model
Scikit-learn is the most popular ML library because almost everything follows the same three steps. Once you learn the pattern, you can use any algorithm in the world.

### Step-by-Step Workflow
1.  **Initialize**: Choose your model (e.g., \`model = RandomForest()\`).
2.  **Fit**: Train the model on your data (\`model.fit(X_train, y_train)\`).
3.  **Predict**: Use it on new data (\`predictions = model.predict(X_test)\`).

#### Pipelines: The Pro Move
Instead of doing 10 manual steps, you can chain Preprocessing, Scaling, and Training into a single object that handles everything automatically.`,
        noobDefinition: "Think of scikit-learn like a universal remote control. Whether you're turning on a TV, a Stereo, or a DVD player, the 'Power' button is always in the same place. In scikit-learn, the 'Learn' button is always called '.fit()'.",
        realWorldExample: "Data scientists at companies like Spotify use scikit-learn 'Pipelines' to ensure that the data cleaning used for training is exactly the same as the cleaning used when you hit 'Play' on a song.",
        codeExample: {
          language: "python",
          code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

# Step 1: Define the Pipeline (Cleaning + Training)
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])

# Step 2: The 'One-Click' Training
pipe.fit(X_train, y_train)

# Step 3: The 'One-Click' Prediction
accuracy = pipe.score(X_test, y_test)
print(f"Model Integrity: {accuracy * 100}%")`
        }
      }
    ]
  }
};
