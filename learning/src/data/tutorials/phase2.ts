import type { TopicTutorial } from './phase1';

export const phase2Tutorials: Record<string, TopicTutorial> = {
  't2_1': {
    topicId: 't2_1',
    lessons: [
      {
        title: 'Supervised vs. Unsupervised',
        noobDefinition: 'Supervised learning is like having a teacher who tells you the answers. Unsupervised learning is like being a detective who has to find patterns in a giant stack of folders with no labels.',
        realWorldExample: 'Email spam filter (Supervised: user marks spam) vs. Customer Segments (Unsupervised: AI groups users by shopping habits).',
        content: `The first big fork in the road of AI is deciding if you have "Labels".

### Supervised Learning
You feed the model **(Input, Label)** pairs.
- **Goal**: Learn the mapping from Input to Label.
- **Example**: Predicting if an image is a "Cat" or "Dog".

### Unsupervised Learning
You feed the model **Input** only.
- **Goal**: Find structure, clusters, or simplify the data.
- **Example**: Grouping news articles into "Sports", "Politics", and "Tech" automatically.`,
        keyPoints: [
          'Classification (Labels) and Regression (Numbers) are Supervised',
          'Clustering and Dimensionality Reduction are Unsupervised',
          'Reinforcement Learning is a third type (Trial and Error)',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.linear_model import LinearRegression

# Supervised: We have X (hours studied) and y (test score)
model = LinearRegression()
model.fit(X_train, y_train)`,
        },
      },
    ],
  },
  't2_2': {
    topicId: 't2_2',
    lessons: [
      {
        title: 'Linear Regression (The Best Fit)',
        noobDefinition: 'Linear Regression is like drawing a straight line through a bunch of scattered dots to find the general "trend".',
        realWorldExample: 'Predicting the cost of a house based on its size. Generally, as size goes up, price goes up in a straight-ish line.',
        content: `Linear Regression is the "Hello World" of Machine Learning. It assumes that your target value (y) can be calculated by multiplying your input (x) by a weight and adding a bias.

### The Equation:
\`y = mx + b\`
- **m (Weight)**: How much the price changes per square foot.
- **b (Bias)**: The base price of just owning the land.

The goal of the AI is to find the **Best m and b** that minimize the distance between the line and the actual dots (the "Residuals").`,
        vizType: 'linear-regression',
        keyPoints: [
          'Goal: Continuous output (price, temperature, stock price)',
          'Requires numeric input features',
          'Sensitive to Outliers (one crazy dot can pull the whole line away)',
        ],
        codeExample: {
          language: 'python',
          code: `# Predicting House Prices
from sklearn.linear_model import LinearRegression

model = LinearRegression()
model.fit(house_sizes, house_prices)
new_price = model.predict([[2500]]) # Price for 2500 sqft`,
        },
      },
    ],
  },
  't2_3': {
    topicId: 't2_3',
    lessons: [
      {
        title: 'Gradient Descent (The Rollercoaster)',
        noobDefinition: 'Gradient Descent is the "Engine" that makes AI learn. It is the process of rolling a ball down a hill to find the lowest point (the point where the AI makes the fewest mistakes).',
        realWorldExample: 'Fixing the focus on a camera. You turn the dial slightly, check the image, and keep turning it in the direction that makes the image clearer.',
        content: `How does the computer find the "Best Fit" line? It uses **Gradient Descent**.

### The Process:
1. **Start Random**: The AI picks random weights (a random line).
2. **Calculate Loss**: It measures how far the line is from the dots.
3. **Calculate Gradient**: It calculates the "slope" of the error.
4. **Update Weights**: It takes a small step "downhill" (reducing the error).
5. **Repeat**: It does this thousands of times until it reaches the bottom.

**Learning Rate (α)**: This is crucial!
- Too large: The ball bounces around and never reaches the bottom.
- Too small: It takes years to reach the bottom.`,
        vizType: 'gradient-descent',
        keyPoints: [
          'Gradient = Direction of steepest increase (we go opposite)',
          'Optimizer = The algorithm handling the descent (e.g., Adam, SGD)',
          'Loss Function = The terrain/map the ball rolls on',
        ],
        codeExample: {
          language: 'python',
          code: `# Simple Manual Gradient Update
weight = weight - learning_rate * gradient`,
        },
      },
    ],
  },
  't2_4': {
    topicId: 't2_4',
    lessons: [
      {
        title: 'Logistic Regression (The Switch)',
        noobDefinition: 'Despite the name, Logistic Regression is used for COMPARING things (Classifying), not just finding trends. It uses a "S-curve" to squash results between 0 (No) and 1 (Yes).',
        realWorldExample: 'Predicting if an email is "Spam" (1) or "Not Spam" (0). It\'s either one or the other, not a continuous number.',
        content: `If Linear Regression gives you a line, Logistic Regression gives you a **Probability**.

### The Sigmoid Function
The magic happens here. It takes any number and squashes it into the range \`[0, 1]\`.
- If the result is **0.85**: The AI is 85% sure it's Spam.
- If the result is **0.12**: The AI is 88% sure it's Not Spam.

**Decision Boundary**: We usually pick a threshold (like 0.5). Above it is Class A, below it is Class B.`,
        vizType: 'logistic-sigmoid',
        keyPoints: [
          'Used for Classification (Categorical output)',
          'The output is a probability percentage between 0 and 1',
          'Sigmoid function: 1 / (1 + e^-z)',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.linear_model import LogisticRegression

# Binary Classification (Spam/Not Spam)
clf = LogisticRegression()
clf.fit(X_train, y_train)
prob = clf.predict_proba(X_test) # [0.1, 0.9]`,
        },
      },
    ],
  },
};
