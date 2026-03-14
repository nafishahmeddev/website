import type { TopicTutorial } from './phase1';

export const phase3Tutorials: Record<string, TopicTutorial> = {
  't3_1': {
    topicId: 't3_1',
    lessons: [
      {
        title: 'Decision Trees (The Logic Flow)',
        noobDefinition: 'A Decision Tree is basically a giant "Choose Your Own Adventure" game. At every step, the AI asks a question (like "Is it raining?") and moves to the next branch until it finds the final answer.',
        realWorldExample: 'A bank deciding if you get a loan. 1. Age > 18? (No -> Reject). 2. Income > $50k? (No -> Review). 3. Score > 700? (Yes -> Approve).',
        content: `Decision Trees are the most "Human-Like" algorithms. They are easy to read and understand.

### How they Split:
The tree looks for the feature that gives the most information. It uses math like **Gini Impurity** or **Entropy** to decide where to make the split.
- **Root Node**: The very first question.
- **Leaf Node**: The final answer (Class or Number).

### The Danger: Overfitting
Trees can become too complex. If you let a tree grow forever, it will just "memorize" your data. We use **Pruning** to keep them small and smart.`,
        vizType: 'decision-tree',
        keyPoints: [
          'Highly interpretable (you can explain why a decision was made)',
          'Handles both numbers and categories out of the box',
          'Fast to train but prone to overfitting without pruning',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.tree import DecisionTreeClassifier

clf = DecisionTreeClassifier(max_depth=3) # Limit depth to avoid overfitting
clf.fit(X_train, y_train)`,
        },
      },
    ],
  },
  't3_3': {
    topicId: 't3_3',
    lessons: [
      {
        title: 'Random Forests (Wisdom of the Crowd)',
        noobDefinition: 'One tree might be wrong, but 100 trees are rarely wrong together. A Random Forest asks 100 different trees for their opinion and picks the most popular answer.',
        realWorldExample: 'If you want a movie recommendation, you don\'t ask one friend (who might have weird taste). You ask 10 friends and pick what most of them liked.',
        content: `Random Forests are an **Ensemble** method. They use multiple Decision Trees to build a stronger model.

### Key Innovations:
1. **Bagging (Bootstrap Aggregating)**: Each tree in the forest sees a slightly different "random slice" of the data.
2. **Feature Randomness**: Each tree is only allowed to look at a few random features. This forces the trees to be different from each other.

By combining many "weak" learners, we get one "strong" learner that is hard to fool!`,
        vizType: 'random-forest',
        keyPoints: [
          'Significantly more accurate than a single Decision Tree',
          'Extremely stable and handles "noisy" data well',
          'Gives you "Feature Importance" (which columns matters most)',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.ensemble import RandomForestClassifier

# Create a forest with 100 trees
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)`,
        },
      },
    ],
  },
  't3_5': {
    topicId: 't3_5',
    lessons: [
      {
        title: 'K-Means Clustering',
        noobDefinition: 'K-Means is like telling an AI: "Gather these items into 3 groups based on how similar they are." The AI then moves the "center" of each group until the members are as close as possible.',
        realWorldExample: 'A clothing brand grouping their customers into "Big Spenders", "Value Seekers", and "Window Shoppers" based on their visit history.',
        content: `K-Means is the most famous Unsupervised algorithm. It groups data points into **K** clusters.

### The 4-Step Walkthrough:
1. **Initialization**: Pick K random points as "Centroids" (centers).
2. **Assignment**: Every data point "joins" the cluster of the nearest centroid.
3. **Update**: Move the centroids to the mathematical center of their new members.
4. **Repeat**: Keep moving until the centroids stop changing.

**Choosing K**: We often use the "Elbow Method" to find the perfect number of groups.`,
        vizType: 'kmeans',
        keyPoints: [
          'Finds natural patterns without needing labels',
          'Sensitive to the initial starting points',
          'Works best when clusters are spherical (blobs)',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.cluster import KMeans

# Find 3 groups
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
groups = kmeans.labels_`,
        },
      },
    ],
  },
  't3_6': {
    topicId: 't3_6',
    lessons: [
      {
        title: 'PCA (Dimensionality Reduction)',
        noobDefinition: 'PCA is like taking a 3D shadow puppet and finding the best angle to project it onto a 2D wall. You lose some depth, but the "shape" of the data remains clear.',
        realWorldExample: 'Compressing a 4K movie to 1080p. It takes up much less space, but you can still perfectly understand what\'s happening in the story.',
        content: `Real-world data often has hundreds of columns (dimensions). Humans can only visualize 2D or 3D. **Principal Component Analysis** simplifies this.

### How it Works:
It finds new "Directions" (Principal Components) in your data that capture the most variations. 
- **PC1**: The direction with the most information.
- **PC2**: The direction with the second most info.

By keeping just PC1 and PC2, you can draw a map of 100-dimensional data on a simple 2D chart!`,
        vizType: 'pca-viz',
        keyPoints: [
          'Speeds up model training by removing "useless" columns',
          'Removes "noise" from the data',
          'Crucial for data visualization',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.decomposition import PCA

# Reduce data to 2 main features
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(X)`,
        },
      },
    ],
  },
};
