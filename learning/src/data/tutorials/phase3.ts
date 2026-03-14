import type { TopicTutorial } from './phase1';

export const phase3Tutorials: Record<string, TopicTutorial> = {
  't3_1': {
    topicId: 't3_1',
    lessons: [
      {
        title: 'Linear Regression',
        noobDefinition: 'Linear Regression is like "Connecting the Dots" on a scatter plot to find a trend line. If you know how much a house costs per bedroom, you can predict any house’s price.',
        realWorldExample: 'Predicting how much weight a baby will gain based on their age. You draw a straight line through the weights from the last 6 months to guess the next month.',
        content: `Linear Regression predicts a continuous number. It finds the "Line of Best Fit" that minimizes the distance between the line and all data points.`,
        keyPoints: [
          'Goal: Minimize Mean Squared Error',
          'y = mx + b (Simple Linear Regression)',
          'Assumes a straight-line relationship between variables',
          'Sensitive to outliers',
        ],
        formula: 'y = β₀ + β₁X₁ + ε',
        codeExample: {
          language: 'python',
          code: `from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`,
        },
      },
      {
        title: 'Logistic Regression',
        noobDefinition: 'Logistic Regression is for "Yes/No" questions. It doesn\'t give you a straight line; it gives you an S-shaped curve that says "There’s an 80% chance this is a Yes."',
        realWorldExample: 'Predicting if a student passes or fails an exam. Instead of a score, you get a probability (e.g., 0.9 means they almost certainly passed).',
        content: `Despite the name, Logistic Regression is for Classification (not regression). It Uses the Sigmoid function to squish any number into a value between 0 and 1.`,
        keyPoints: [
          'Binary Classification (Yes/No, 0/1)',
          'Sigmoid Function: Squishes values to (0, 1)',
          'Decision Boundary: Usually at 0.5 probability',
          'Log-Loss: The error metric used for training',
        ],
        formula: 'P(y=1) = 1 / (1 + e⁻ᶻ)',
        codeExample: {
          language: 'python',
          code: `from sklearn.linear_model import LogisticRegression

clf = LogisticRegression()
clf.fit(X_train, y_train)
y_prob = clf.predict_proba(X_test)`,
        },
      },
    ],
  },
  't3_2': {
    topicId: 't3_2',
    lessons: [
      {
        title: 'Decision Trees',
        noobDefinition: 'A Decision Tree is just a game of "20 Questions". You ask Yes/No questions (Is it an animal? Is it bigger than a cat?) until you find the answer.',
        realWorldExample: 'A bank decided whether to give you a loan. "Is income > $50k?" -> Yes. "Is credit score > 700?" -> Yes. Decision: Give Loan.',
        content: `Decision Trees handle both numbers and categories. They split the data at each "node" to make the groups as "pure" (similar) as possible.`,
        vizType: 'decision-tree',
        keyPoints: [
          'Root Node: The very first question',
          'Leaves: The final predictions/answers',
          'Entropy/Gini: Measuring how "messy" a group is',
          'Pruning: Cutting off branches that are too specific (to avoid overfitting)',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.tree import DecisionTreeClassifier

tree = DecisionTreeClassifier(max_depth=3)
tree.fit(X_train, y_train)`,
        },
      },
    ],
  },
  't3_3': {
    topicId: 't3_3',
    lessons: [
      {
        title: 'Random Forests',
        noobDefinition: 'A Random Forest is a "Wisdom of the Crowd". Instead of asking one expert (one tree), you ask 100 experts and take the average answer.',
        realWorldExample: 'If you want a movie recommendation, you don’t just ask one friend (who might have weird taste). You ask 10 friends and pick the movie most of them liked.',
        content: `Random Forests are an "Ensemble" of many Decision Trees. They are much more accurate and stable than a single tree because they cancel out each other's mistakes.`,
        keyPoints: [
          'Bagging: Training trees on random subsets of data',
          'Feature Randomness: Each tree only sees some features',
          'Highly robust to overfitting',
          'The "Black Box" problem: Harder to explain than a single tree',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.ensemble import RandomForestClassifier

rf = RandomForestClassifier(n_estimators=100)
rf.fit(X_train, y_train)`,
        },
      },
    ],
  },
  't3_5': {
    topicId: 't3_5',
    lessons: [
      {
        title: 'K-Means Clustering',
        noobDefinition: 'K-Means is like "Sorting Laundry". You don’t know what the piles are called, but you put the towels together, the shirts together, and the socks together.',
        realWorldExample: 'A clothing brand grouping its customers into "Big Spenders", "Discount Hunters", and "Occasional Shoppers" based on their buying habits.',
        content: `K-Means is Unsupervised. It groups data into 'K' clusters by finding the "center" (centroid) of each group and assigning points to the nearest center.`,
        vizType: 'kmeans',
        keyPoints: [
          'Centroids: The "center of mass" for a cluster',
          'Elbow Method: How to pick the best number for K',
          'Scaling Matters: Always normalize data before K-Means',
          'Convergence: The algorithm stops when centers stop moving',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=3)
clusters = kmeans.fit_predict(X)`,
        },
      },
    ],
  },
  't3_4': {
    topicId: 't3_4',
    lessons: [
      {
        title: 'Gradient Boosting (XGBoost)',
        noobDefinition: 'Boosting is like a "Team of Interns". The first intern tries to solve the problem and makes mistakes. The second intern focuses ONLY on fixing those specific mistakes. By the 100th intern, the problem is solved perfectly.',
        realWorldExample: 'A basketball team learning from game tapes. They don\'t just practice everything; they specifically practice the exact plays they messed up in the last game.',
        content: `Gradient Boosting is currently the most powerful algorithm for tabular (Excel-style) data. 
        
It builds trees sequentially. Each new tree is trained to predict the "Residuals" (the errors) of the previous trees combined.`,
        keyPoints: [
          'Sequential learning: Trees are built one after another',
          'Learning Rate: How much we trust each new "intern" tree',
          'XGBoost: A highly optimized version of Gradient Boosting',
          'Very sensitive to hyperparameters; needs careful tuning',
        ],
        codeExample: {
          language: 'python',
          code: `from xgboost import XGBClassifier

model = XGBClassifier(n_estimators=100, learning_rate=0.1)
model.fit(X_train, y_train)
predictions = model.predict(X_test)`,
        },
      },
    ],
  },
  't3_6': {
    topicId: 't3_6',
    lessons: [
      {
        title: 'PCA (Dimensionality Reduction)',
        noobDefinition: 'PCA is like "Shadow Puppets". You have a complex 3D object, but you can understand its shape just by looking at its 2D shadow on the wall.',
        realWorldExample: 'Condensing a long 10-page resume into a 1-page summary. You lose some details, but the most important info (the "Principal Components") stays.',
        content: `Principal Component Analysis (PCA) simplifies data with many features (columns) into just a few important ones. 
        
It helps visualize high-dimensional data and speed up training by removing "noise" and redundant information.`,
        keyPoints: [
          'Goal: Reduce features while keeping as much "information" as possible',
          'Principal Components: The new, condensed features created by PCA',
          'Explained Variance: A score showing how much info we kept',
          'Great for pre-processing before other ML algorithms',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.decomposition import PCA

# Reduce data to only 2 main features
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)`,
        },
      },
    ],
  },
};
