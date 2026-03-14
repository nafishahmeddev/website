import type { TopicTutorial } from './phase1';

export const phase3Tutorials: Record<string, TopicTutorial> = {
  't3_1': {
    topicId: 't3_1',
    lessons: [
      {
        title: "Linear & Logistic Regression: The Baseline",
        content: `### The Direct Model
Regression is the process of finding the mathematical relationship between inputs and outputs. It is the most used algorithm in business and finance.

### Step-by-Step Logic
1.  **Linear Regression**: Predicting a continuous number (like Heart Rate). It fits a straight line that minimizes the "Residuals" (distance to points).
2.  **Logistic Regression**: Predicting a category (Yes/No). It takes that straight line and squashes it through a **Sigmoid** function to produce a probability.
3.  **Regularization**: Adding a 'penalty' (L1 or L2) to the math to prevent the model from becoming too complex (Overfitting).

#### Why start here?
Linear models are fast, interpretable, and often "good enough" for many real-world problems.`,
        noobDefinition: "Linear Regression is like drawing a line through a cloud of points on a graph. Logistic Regression is like taking that line and turning it into a light switch that is either 'On' or 'Off' based on the data.",
        realWorldExample: "A real estate app uses Linear Regression to predict a house's price based on its size. A bank uses Logistic Regression to predict if a loan will be 'Paid' or 'Defaulted'.",
        vizType: 'linear-regression',
        codeExample: {
          language: "python",
          code: `from sklearn.linear_model import LinearRegression, LogisticRegression

# 1. Linear Regression (Numerical)
# Predict house price based on square footage
price_model = LinearRegression()
price_model.fit(sf_train, price_train)

# 2. Logistic Regression (Categorical)
# Predict Spam vs Not Spam
spam_model = LogisticRegression()
spam_model.fit(emails_train, labels_train)

# Inspecting the model (Weights)
print(f"Impact of size on price: {price_model.coef_[0]}")`
        }
      }
    ]
  },
  't3_2': {
    topicId: 't3_2',
    lessons: [
      {
        title: "Decision Trees: Path of Pure Logic",
        content: `### The Logic Flow
Decision Trees are the most "Human-Like" algorithms. They arrive at a conclusion by asking a sequence of hierarchical questions.

### Step-by-Step Splitting
1.  **Root Selection**: Choose the feature that splits the data most cleanly (using Entropy or Gini Impurity).
2.  **Branching**: Create "Yes/No" or "Quantitative" paths based on the feature value.
3.  **Recursion**: Repeat the process for each subset of data.
4.  **Leafing**: Reach a "Leaf Node" where a final prediction is made.

#### The Overfitting Trap
If a tree grows too deep, it starts to memorize "noise" instead of "patterns". Always set a \`max_depth\`!`,
        vizType: 'decision-tree',
        noobDefinition: "A Decision Tree is basically a giant game of '20 Questions'. The AI keeps asking 'Is it X?' until it has narrowed down the list of possibilities to a single answer.",
        realWorldExample: "A Bank Loan Algorithm: 1. Is Income > $50k? (No -> Reject). 2. Is Credit Score > 700? (Yes -> Approve). It's a clear, traceable path.",
        codeExample: {
          language: "python",
          code: `from sklearn.tree import DecisionTreeClassifier
from sklearn import tree

# Step 1: Initialize with constraints
# max_depth=3 prevents the tree from 'memorizing' noise
clf = DecisionTreeClassifier(max_depth=3, criterion='entropy')

# Step 2: Fit the logic to data
clf.fit(X_train, y_train)

# Step 3: Interpretability (The Power of Trees)
# You can actually see the rules the AI created!
rules = tree.export_text(clf)`
        }
      }
    ]
  },
  't3_3': {
    topicId: 't3_3',
    lessons: [
      {
        title: "Random Forests: Wisdom of the Crowd",
        content: `### Strength in Numbers
One tree might be biased or wrong. A **Random Forest** builds hundreds of different trees and averages their results to reach a "consensus".

### Step-by-Step Ensemble
1.  **Bootstrap**: Take a random "slice" of the data for each tree.
2.  **Feature Masking**: Only allow each tree to see a few random columns. This prevents one strong column from dominating everything.
3.  **Growth**: Train 100+ trees independently.
4.  **Voting**: For a new prediction, ask every tree and take the majority vote.

#### Why it Wins
It is extremely hard to fool a Random Forest because individual tree errors are canceled out by the group.`,
        vizType: 'random-forest',
        noobDefinition: "If you ask 1 friend for a movie recommendation, you might get a weird answer. If you ask 100 friends and pick the most popular movie, you're much more likely to enjoy it.",
        realWorldExample: "E-commerce Fraud Detection. One signal (location) might be a fluke. 100 signals (device, time, history) processed by 100 trees provide a nearly bulletproof decision.",
        codeExample: {
          language: "python",
          code: `from sklearn.ensemble import RandomForestClassifier

# Step 1: Create the Forest
# n_estimators=100 means we build 100 individual trees
model = RandomForestClassifier(n_estimators=100, max_features='sqrt')

# Step 2: Train (Parallel Processing!)
model.fit(X_train, y_train)

# Step 3: Feature Importance
# Which data columns actually mattered the most?
importance = model.feature_importances_`
        }
      }
    ]
  },
  't3_4': {
    topicId: 't3_4',
    lessons: [
      {
        title: "Gradient Boosting & XGBoost",
        content: `### The King of Tabular Data
Gradient Boosting is an ensemble technique where models are built **sequentially**. Each new model is trained specifically to fix the errors made by the previous one.

### Step-by-Step Strategy
1.  **Initial Prediction**: Start with a simple average.
2.  **Calculate Residuals**: Find out exactly where the first prediction was wrong.
3.  **Train Weak Learner**: Build a small tree that predicts those errors (residuals).
4.  **Aggregate**: Add the new tree's insight to the previous prediction.
5.  **Repeat**: Do this hundreds of times until the error vanishes.

#### XGBoost (Extreme Gradient Boosting)
A highly optimized version of this algorithm that is used by winning teams in almost every tabular data competition on Kaggle.`,
        noobDefinition: "Imagine you're trying to hit a target. XGBoost is like taking a shot, seeing how far left you missed, and then pointing your next shot slightly right to correct it. You keep correcting until you hit the bullseye.",
        realWorldExample: "Walmart uses Gradient Boosting to predict demand for millions of products across its stores, correcting for factors like holidays, weather, and local events.",
        codeExample: {
          language: "python",
          code: `import xgboost as xgb
from sklearn.metrics import mean_squared_error

# Step 1: Initialize the King
# Using powerful defaults for tabular data
model = xgb.XGBRegressor(
    n_estimators=100, 
    learning_rate=0.1, 
    max_depth=5
)

# Step 2: Training (Gradient Correction)
model.fit(X_train, y_train)

# Step 3: Evaluation
preds = model.predict(X_test)
error = mean_squared_error(y_test, preds)
print(f"Prediction Error: {error:.4f}")`
        }
      }
    ]
  },
  't3_5': {
    topicId: 't3_5',
    lessons: [
      {
        title: "K-Means: Finding Hidden Groups",
        content: `### Unsupervised Discovery
K-Means is the go-to tool for finding clusters in unlabeled data. It groups "similar" items without being told what they are.

### Step-by-Step Clustering
1.  **Seeds**: Place **K** random "Centroids" (middle-points) in your data.
2.  **Assign**: Every data point joins the group of the nearest Centroid.
3.  **Migrate**: Move each Centroid to the mathematical center of its actual members.
4.  **Loop**: Repeat until the Centroids stop moving.

#### The Elbow Method
How many groups (K) should you have? We look for the "Elbow" in an error chart where adding more groups doesn't help much more.`,
        vizType: 'kmeans',
        noobDefinition: "K-Means is like telling a robot: 'Separate these 10,000 mixed socks into 4 piles.' The robot moves the piles around until all red socks are together, all blue together, etc.",
        realWorldExample: "Customer Segmentation. An airline uses K-Means to group travelers into 'Business Profs', 'One-time Vacay', and 'Frequent Flyers' to target their ads.",
        codeExample: {
          language: "python",
          code: `from sklearn.cluster import KMeans

# Step 1: Define the number of groups
# We want to find 5 distinct clusters
kmeans = KMeans(n_clusters=5, init='k-means++')

# Step 2: Fit (Discover patterns)
kmeans.fit(data_points)

# Step 3: Analyze the Results
centers = kmeans.cluster_centers_
labels = kmeans.labels_`
        }
      }
    ]
  },
  't3_6': {
    topicId: 't3_6',
    lessons: [
      {
        title: "PCA: Dimensionality Compression",
        content: `### Simplifying Complexity
High-dimensional data (hundreds of columns) is impossible for humans to visualize. **PCA** squashes those dimensions into 2D or 3D while keeping the most important "info" alive.

### Step-by-Step Reduction
1.  **Standardize**: Center the data so the average is zero.
2.  **Variability**: Find the directions where the data "spreads out" the most.
3.  **Project**: "Collapse" the data onto these main axes (Principal Components).
4.  **Visualize**: Plot the 100D data on a simple 2D or 3D chart.

#### The Shadow Metaphor
PCA is like looking at a complex 3D shape's shadow. The shadow has 1 less dimension, but you can still recognize the shape clearly.`,
        vizType: 'pca-viz',
        noobDefinition: "PCA is like summarizing a 500-page book into a 2-page executive summary. You lose the fine details, but the main story remains perfectly clear.",
        realWorldExample: "Facial Recognition. Instead of looking at 1,000,000 pixels (dimensions), PCA identifies the 50 most important 'features' (distance between eyes, nose width) to identify a person.",
        codeExample: {
          language: "python",
          code: `from sklearn.decomposition import PCA

# Step 1: Initialize
# Reduce the data to just its 2 most important 'storylines'
pca = PCA(n_components=2)

# Step 2: Transform
# X_high_dim has 50 columns -> X_low_dim has 2 columns
X_low_dim = pca.fit_transform(X_high_dim)

# Step 3: Check Explanations
# How much 'percent' of the original data did we keep?
print(f"Information Retained: {sum(pca.explained_variance_ratio_) * 100:.1f}%")`
        }
      }
    ]
  }
};
