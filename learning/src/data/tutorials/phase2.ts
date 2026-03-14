import type { TopicTutorial } from './phase1';

export const phase2Tutorials: Record<string, TopicTutorial> = {
  't2_1': {
    topicId: 't2_1',
    lessons: [
      {
        title: 'Supervised Learning',
        noobDefinition: 'Supervised Learning is like learning with flashcards that have the answer on the back.',
        realWorldExample: 'Teaching a baby what a "dog" is by pointing to a dog and saying "dog". The baby now has a labeled example to learn from.',
        content: `In Supervised Learning, the algorithm learns from "labeled" data. You provide the input AND the correct answer.

Think of it as learning with a teacher. The model makes a prediction, the teacher corrects it, and the model adjusts.`,
        vizType: 'decision-tree',
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
  't2_2': {
    topicId: 't2_2',
    lessons: [
      {
        title: 'Measuring Error: Loss Functions',
        noobDefinition: 'A Loss Function is a "Scoreboard" that tells the AI how bad its guess was. A high score is bad; a zero score is a perfect bullseye.',
        realWorldExample: 'Imagine playing darts while blindfolded. Your friend yelling "You missed by 2 feet" is the Loss Function helping you adjust.',
        content: `A Loss Function calculates how "wrong" a model's prediction is. Our goal is to minimize this loss.

Different problems need different loss functions:
- Regressions use Mean Squared Error (MSE)
- Classifications use Cross-Entropy Loss`,
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
        title: 'Gradient Descent Intuition',
        noobDefinition: 'Gradient Descent is like being at the top of a dark mountain and trying to find the valley by feeling which way is down with your feet.',
        realWorldExample: 'Adjusting the temperature of your shower. If it\'s too cold, you turn it up a bit (a small step) until it\'s just right (the minimum error).',
        content: `Gradient Descent is how models actually "learn". Imagine being on a mountain in thick fog. You want to reach the bottom (the minimum loss).

You feel the ground with your feet and take a step in the steepest direction downward. You repeat this until you reach the valley.`,
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
  't2_4': {
    topicId: 't2_4',
    lessons: [
      {
        title: 'Overfitting vs Underfitting',
        noobDefinition: 'Overfitting is like memorizing the answers to a test instead of learning the subject. You’ll ace the practice test but fail the real one.',
        realWorldExample: 'A student who only studies one specific old exam. When the real exam has slightly different questions, they have no idea what to do.',
        content: `Overfitting happens when a model learns "noise" in the data rather than the actual pattern. 
        
Underfitting is the opposite—it's when the model is too simple to learn even the basics (like trying to draw a circle with a straight ruler).`,
        vizType: 'bias-variance',
        keyPoints: [
          'Overfitting: High variance, low bias',
          'Underfitting: Low variance, high bias',
          'Generalization: The ability to perform on new, unseen data',
          'Complexity: More parameters usually lead to overfitting',
        ],
      },
      {
        title: 'Regularization (L1 & L2)',
        noobDefinition: 'Regularization is like a "simplicity tax". It penalizes the model for having too many complex rules, forcing it to focus on what actually matters.',
        realWorldExample: 'Editing a long essay. You cut out all the "fluff" words so that the main argument is clearer and stronger.',
        content: `Regularization prevents overfitting by adding a penalty term to the loss function.
        
L1 (Lasso) can shrink some feature weights to zero (feature selection).
L2 (Ridge) shrinks all weights but keeps them above zero.`,
        keyPoints: [
          'L1 Regularization: Adds absolute value of weights to loss',
          'L2 Regularization: Adds squared value of weights to loss',
          'Dropout: Randomly "turning off" neurons during training',
          'Early Stopping: Stopping training when validation error starts to rise',
        ],
        formula: 'Cost = Loss + λ * Σ|w| (L1) or λ * Σw² (L2)',
      },
    ],
  },
  't2_5': {
    topicId: 't2_5',
    lessons: [
      {
        title: 'The Golden Rule: Data Splitting',
        noobDefinition: 'Splitting data is like having a "Practice Match" and a "Final Exam". You never use the exam questions for practice, or you\'d be cheating!',
        realWorldExample: 'A chef tasting the soup (Validation) before serving it to the customers (Testing). If the chef uses the customers\' bowls to taste, there\'s no soup left!',
        content: `We split data into three sets:
1. Training Set: What the model learns from.
2. Validation Set: Used to tune settings (hyperparameters).
3. Test Set: Final evaluation only. NEVER look at this during training.`,
        keyPoints: [
          'Standard split: 70% Train, 15% Val, 15% Test',
          'Data Leakage: When info from the test set "leaks" into training',
          'k-Fold Cross Validation: Testing on different "slices" of data',
          'Stratified Split: Keeping the same ratio of classes in each split',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`,
        },
      },
    ],
  },
  't2_6': {
    topicId: 't2_6',
    lessons: [
      {
        title: 'The Art of Feature Engineering',
        noobDefinition: 'Feature Engineering is like "prepping ingredients" before cooking. You peel the potatoes and chop the onions so the cooking process is smooth.',
        realWorldExample: 'Instead of giving a map to a delivery driver, you give them "3 miles North" (a useful feature). It\'s the same info, but much easier to use.',
        content: `Machine learning models are only as good as the data you feed them.
        
Features are the inputs. Engineering means transforming raw data (like text or dates) into numbers the model can understand.`,
        keyPoints: [
          'Normalization: Scaling numbers between 0 and 1',
          'Standardization: Scaling numbers to have mean 0 and std 1',
          'One-Hot Encoding: Turning categories (Red, Blue) into numbers',
          'Handling Missing Values: Imputation (filling in the blanks)',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)`,
        },
      },
    ],
  },
  't2_7': {
    topicId: 't2_7',
    lessons: [
      {
        title: 'The scikit-learn Workflow',
        noobDefinition: 'scikit-learn is like a universal "Remote Control". No matter what brand of TV (algorithm) you use, the buttons (Fit, Predict) are always the same.',
        realWorldExample: 'A standard electrical outlet. Whether you plug in a toaster or a vacuum, the interface is identical. scikit-learn makes algorithms "pluggable".',
        content: `scikit-learn is the gold standard for classical ML in Python. 

The API is brilliantly consistent:
1. Instantiate: Choose your model.
2. Fit: Train on data.
3. Predict: Use on new data.
4. Score: Check how well it did.`,
        keyPoints: [
          'Consistent API: estimator.fit(X, y)',
          'Pipelines: Chaining preprocessing and modeling together',
          'Model Evaluation: confusion_matrix, accuracy_score',
          'Cross-Validation: cross_val_score(model, X, y, cv=5)',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.pipeline import Pipeline
from sklearn.svm import SVC

pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('svc', SVC())
])

pipeline.fit(X_train, y_train)
score = pipeline.score(X_test, y_test)`,
        },
      },
    ],
  },
};
