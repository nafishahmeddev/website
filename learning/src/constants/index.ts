import type { Phase, TagColorConfig, Resource } from '../types';

export const PHASES: Phase[] = [
  {
    id: 'p1',
    title: 'Math & Python Foundations',
    label: 'Phase 01',
    duration: '2–3 weeks',
    color: '#00ff9d',
    icon: '∑',
    desc: 'The bedrock. You already know JS — Python will take days, not weeks.',
    topics: [
      {
        id: 't1_1',
        title: 'Python for JS Devs',
        desc: 'Syntax, list comprehensions, dicts, modules. Fast track from JS.',
        diff: 1,
        tag: 'lang',
        subtopics: [
          { id: 's1_1_1', title: 'Variables, types, and operators' },
          { id: 's1_1_2', title: 'Functions, scope, and closures' },
          { id: 's1_1_3', title: 'List comprehensions & generators' },
          { id: 's1_1_4', title: 'Dictionaries and sets' },
          { id: 's1_1_5', title: 'Modules and imports' },
        ]
      },
      {
        id: 't1_2',
        title: 'NumPy Arrays',
        desc: 'N-dimensional arrays, broadcasting, vectorisation — replaces loops.',
        diff: 1,
        tag: 'lib',
        subtopics: [
          { id: 's1_2_1', title: 'Creating and indexing arrays' },
          { id: 's1_2_2', title: 'Array shapes and reshaping' },
          { id: 's1_2_3', title: 'Broadcasting rules' },
          { id: 's1_2_4', title: 'Vectorized operations' },
          { id: 's1_2_5', title: 'Matrix operations' },
        ]
      },
      {
        id: 't1_3',
        title: 'Pandas DataFrames',
        desc: 'Load CSVs, filter rows, group-by, handle missing data.',
        diff: 1,
        tag: 'lib',
        subtopics: [
          { id: 's1_3_1', title: 'Series and DataFrame basics' },
          { id: 's1_3_2', title: 'Loading and saving data (CSV, JSON)' },
          { id: 's1_3_3', title: 'Indexing and selecting data' },
          { id: 's1_3_4', title: 'Filtering, sorting, and grouping' },
          { id: 's1_3_5', title: 'Handling missing data' },
        ]
      },
      {
        id: 't1_4',
        title: 'Matplotlib / Seaborn',
        desc: 'Visualise data distributions, correlations, training curves.',
        diff: 1,
        tag: 'lib',
        subtopics: [
          { id: 's1_4_1', title: 'Basic plots (line, scatter, histogram)' },
          { id: 's1_4_2', title: 'Subplots and figure customization' },
          { id: 's1_4_3', title: 'Seaborn statistical plots' },
          { id: 's1_4_4', title: 'Heatmaps and correlation matrices' },
          { id: 's1_4_5', title: 'Export and styling' },
        ]
      },
      {
        id: 't1_5',
        title: 'Linear Algebra Intuition',
        desc: 'Vectors, matrices, dot product, eigenvalues — visual-first approach.',
        diff: 2,
        tag: 'math',
        subtopics: [
          { id: 's1_5_1', title: 'Vectors and vector spaces' },
          { id: 's1_5_2', title: 'Matrices and matrix operations' },
          { id: 's1_5_3', title: 'Dot product and projection' },
          { id: 's1_5_4', title: 'Determinants and inverses' },
          { id: 's1_5_5', title: 'Eigenvalues and eigenvectors' },
        ]
      },
      {
        id: 't1_6',
        title: 'Calculus — Derivatives',
        desc: 'Chain rule, partial derivatives. All of backprop is just this.',
        diff: 2,
        tag: 'math',
        subtopics: [
          { id: 's1_6_1', title: 'Limits and continuity' },
          { id: 's1_6_2', title: 'Single variable derivatives' },
          { id: 's1_6_3', title: 'Chain rule and product rule' },
          { id: 's1_6_4', title: 'Partial derivatives' },
          { id: 's1_6_5', title: 'Gradients and directional derivatives' },
        ]
      },
      {
        id: 't1_7',
        title: 'Probability & Statistics',
        desc: 'Distributions, expectation, variance, Bayes theorem.',
        diff: 2,
        tag: 'math',
        subtopics: [
          { id: 's1_7_1', title: 'Probability basics and rules' },
          { id: 's1_7_2', title: 'Distributions (Normal, Binomial, Poisson)' },
          { id: 's1_7_3', title: 'Expectation and variance' },
          { id: 's1_7_4', title: 'Conditional probability & Bayes theorem' },
          { id: 's1_7_5', title: 'Hypothesis testing and confidence intervals' },
        ]
      },
    ]
  },
  {
    id: 'p2',
    title: 'Core ML Concepts',
    label: 'Phase 02',
    duration: '3–4 weeks',
    color: '#00ccff',
    icon: '⊕',
    desc: 'The mental model. Understand *why* before you touch a framework.',
    topics: [
      {
        id: 't2_1',
        title: 'Supervised vs Unsupervised',
        desc: 'Types of ML, when to use each, the taxonomy of problems.',
        diff: 1,
        tag: 'concept',
        subtopics: [
          { id: 's2_1_1', title: 'Supervised learning: regression & classification' },
          { id: 's2_1_2', title: 'Unsupervised learning: clustering & dimensionality reduction' },
          { id: 's2_1_3', title: 'Semi-supervised learning' },
          { id: 's2_1_4', title: 'Reinforcement learning overview' },
          { id: 's2_1_5', title: 'Problem-to-approach mapping' },
        ]
      },
      {
        id: 't2_2',
        title: 'Loss Functions',
        desc: 'MSE, cross-entropy, huber. What "learning" actually means numerically.',
        diff: 2,
        tag: 'concept',
        subtopics: [
          { id: 's2_2_1', title: 'Mean Squared Error (MSE)' },
          { id: 's2_2_2', title: 'Cross-entropy and log loss' },
          { id: 's2_2_3', title: 'Huber loss and robust losses' },
          { id: 's2_2_4', title: 'Custom loss functions' },
          { id: 's2_2_5', title: 'Why loss matters for learning' },
        ]
      },
      {
        id: 't2_3',
        title: 'Gradient Descent',
        desc: 'The engine of all ML. SGD, mini-batch, momentum, Adam.',
        diff: 2,
        tag: 'algo',
        subtopics: [
          { id: 's2_3_1', title: 'Batch gradient descent' },
          { id: 's2_3_2', title: 'Stochastic gradient descent (SGD)' },
          { id: 's2_3_3', title: 'Mini-batch gradient descent' },
          { id: 's2_3_4', title: 'Momentum and Nesterov' },
          { id: 's2_3_5', title: 'Adam, RMSprop, and adaptive methods' },
        ]
      },
      {
        id: 't2_4',
        title: 'Overfitting & Regularisation',
        desc: 'Bias-variance tradeoff, L1/L2, dropout, early stopping.',
        diff: 2,
        tag: 'concept',
        subtopics: [
          { id: 's2_4_1', title: 'Understanding bias and variance' },
          { id: 's2_4_2', title: 'L1 (Lasso) and L2 (Ridge) regularization' },
          { id: 's2_4_3', title: 'Elastic Net' },
          { id: 's2_4_4', title: 'Early stopping and validation' },
          { id: 's2_4_5', title: 'Dropout (for neural networks)' },
        ]
      },
      {
        id: 't2_5',
        title: 'Train / Val / Test Split',
        desc: 'Why data splits matter. k-fold cross validation.',
        diff: 1,
        tag: 'concept',
        subtopics: [
          { id: 's2_5_1', title: 'Train-validation-test split strategy' },
          { id: 's2_5_2', title: 'Stratified sampling' },
          { id: 's2_5_3', title: 'k-fold cross-validation' },
          { id: 's2_5_4', title: 'Time series splitting' },
          { id: 's2_5_5', title: 'Avoiding data leakage' },
        ]
      },
      {
        id: 't2_6',
        title: 'Feature Engineering',
        desc: 'Normalisation, encoding categoricals, handling nulls, feature selection.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 's2_6_1', title: 'Normalization and standardization' },
          { id: 's2_6_2', title: 'One-hot encoding and label encoding' },
          { id: 's2_6_3', title: 'Handling missing data' },
          { id: 's2_6_4', title: 'Feature scaling and transformation' },
          { id: 's2_6_5', title: 'Feature selection methods' },
        ]
      },
      {
        id: 't2_7',
        title: 'scikit-learn API',
        desc: 'fit / predict / score. Pipelines, transformers. The sklearn mental model.',
        diff: 1,
        tag: 'lib',
        subtopics: [
          { id: 's2_7_1', title: 'Estimators: fit and predict' },
          { id: 's2_7_2', title: 'Transformers and scaling' },
          { id: 's2_7_3', title: 'Pipelines and composition' },
          { id: 's2_7_4', title: 'Cross-validation with sklearn' },
          { id: 's2_7_5', title: 'Model selection and hyperparameter tuning' },
        ]
      },
    ]
  },
  {
    id: 'p3',
    title: 'Classical Algorithms',
    label: 'Phase 03',
    duration: '2–3 weeks',
    color: '#ffbe00',
    icon: '◈',
    desc: 'Still the best tools for tabular data. Know when to reach for these over deep learning.',
    topics: [
      {
        id: 't3_1',
        title: 'Linear & Logistic Regression',
        desc: 'Build from scratch first. Then use sklearn. Understand the maths.',
        diff: 1,
        tag: 'algo',
        subtopics: [
          { id: 's3_1_1', title: 'Linear regression from scratch' },
          { id: 's3_1_2', title: 'Maximum likelihood estimation' },
          { id: 's3_1_3', title: 'Logistic regression fundamentals' },
          { id: 's3_1_4', title: 'Decision boundaries' },
          { id: 's3_1_5', title: 'Multi-class classification' },
        ]
      },
      {
        id: 't3_2',
        title: 'Decision Trees',
        desc: 'Gini impurity, information gain, pruning. Very visual to understand.',
        diff: 1,
        tag: 'algo',
        subtopics: [
          { id: 's3_2_1', title: 'Information gain and entropy' },
          { id: 's3_2_2', title: 'Gini impurity' },
          { id: 's3_2_3', title: 'Building decision trees recursively' },
          { id: 's3_2_4', title: 'Pruning techniques' },
          { id: 's3_2_5', title: 'Interpretability of trees' },
        ]
      },
      {
        id: 't3_3',
        title: 'Random Forests',
        desc: 'Bagging. Ensemble methods. Feature importance. Go-to baseline.',
        diff: 2,
        tag: 'algo',
        subtopics: [
          { id: 's3_3_1', title: 'Bootstrap aggregating (Bagging)' },
          { id: 's3_3_2', title: 'Random forest construction' },
          { id: 's3_3_3', title: 'Feature importance from forests' },
          { id: 's3_3_4', title: 'Out-of-bag error estimation' },
          { id: 's3_3_5', title: 'Hyperparameter tuning' },
        ]
      },
      {
        id: 't3_4',
        title: 'Gradient Boosting / XGBoost',
        desc: 'The king of Kaggle tabular. Boosting vs bagging intuition.',
        diff: 3,
        tag: 'algo',
        subtopics: [
          { id: 's3_4_1', title: 'Boosting algorithm basics' },
          { id: 's3_4_2', title: 'Gradient boosting machines' },
          { id: 's3_4_3', title: 'XGBoost architecture' },
          { id: 's3_4_4', title: 'LightGBM and CatBoost' },
          { id: 's3_4_5', title: 'Regularization in boosting' },
        ]
      },
      {
        id: 't3_5',
        title: 'K-Means Clustering',
        desc: 'Unsupervised grouping. Elbow method. Good for data exploration.',
        diff: 1,
        tag: 'algo',
        subtopics: [
          { id: 's3_5_1', title: 'K-Means algorithm and convergence' },
          { id: 's3_5_2', title: 'Choosing optimal k (Elbow method)' },
          { id: 's3_5_3', title: 'Silhouette analysis' },
          { id: 's3_5_4', title: 'Initialization strategies' },
          { id: 's3_5_5', title: 'Mini-batch K-Means' },
        ]
      },
      {
        id: 't3_6',
        title: 'PCA / Dimensionality Reduction',
        desc: 'Compress high-dimensional data. Eigenvalue decomposition in practice.',
        diff: 3,
        tag: 'algo',
        subtopics: [
          { id: 's3_6_1', title: 'Principal Component Analysis (PCA)' },
          { id: 's3_6_2', title: 'Variance explained and scree plots' },
          { id: 's3_6_3', title: 'Kernel PCA' },
          { id: 's3_6_4', title: 'UMAP and t-SNE for visualization' },
          { id: 's3_6_5', title: 'Feature selection vs dimensionality reduction' },
        ]
      },
    ]
  },
  {
    id: 'p4',
    title: 'Neural Networks & Deep Learning',
    label: 'Phase 04',
    duration: '4–6 weeks',
    color: '#b855ff',
    icon: '⬡',
    desc: 'The hard part. Take your time here — it pays off for everything that follows.',
    topics: [
      {
        id: 't4_1',
        title: 'Perceptron & MLP',
        desc: 'Single neuron → layers. Forward pass, activation functions.',
        diff: 2,
        tag: 'concept',
        subtopics: [
          { id: 's4_1_1', title: 'Perceptron algorithm and limitations' },
          { id: 's4_1_2', title: 'Multi-layer perceptron (MLP) architecture' },
          { id: 's4_1_3', title: 'Forward propagation process' },
          { id: 's4_1_4', title: 'Activation functions (ReLU, tanh, sigmoid)' },
          { id: 's4_1_5', title: 'Universal approximation theorem' },
        ]
      },
      {
        id: 't4_2',
        title: 'Backpropagation',
        desc: 'Chain rule applied to networks. Compute gradients layer-by-layer.',
        diff: 3,
        tag: 'concept',
        subtopics: [
          { id: 's4_2_1', title: 'Chain rule in neural networks' },
          { id: 's4_2_2', title: 'Backpropagation algorithm step-by-step' },
          { id: 's4_2_3', title: 'Computing gradients for weights and biases' },
          { id: 's4_2_4', title: 'Vanishing and exploding gradients' },
          { id: 's4_2_5', title: 'Batch backpropagation' },
        ]
      },
      {
        id: 't4_3',
        title: 'PyTorch Fundamentals',
        desc: 'Tensors, autograd, nn.Module, DataLoader, training loop.',
        diff: 2,
        tag: 'lib',
        subtopics: [
          { id: 's4_3_1', title: 'Tensors and tensor operations' },
          { id: 's4_3_2', title: 'Automatic differentiation (autograd)' },
          { id: 's4_3_3', title: 'Building models with nn.Module' },
          { id: 's4_3_4', title: 'Custom layers and loss functions' },
          { id: 's4_3_5', title: 'DataLoaders and training loops' },
        ]
      },
      {
        id: 't4_4',
        title: 'CNNs — Convolutional Nets',
        desc: 'Filters, feature maps, pooling. ResNet architecture overview.',
        diff: 3,
        tag: 'arch',
        subtopics: [
          { id: 's4_4_1', title: 'Convolution operation and filters' },
          { id: 's4_4_2', title: 'Pooling and stride concepts' },
          { id: 's4_4_3', title: 'Classic architectures (AlexNet, VGG)' },
          { id: 's4_4_4', title: 'ResNet and skip connections' },
          { id: 's4_4_5', title: 'ImageNet and transfer learning' },
        ]
      },
      {
        id: 't4_5',
        title: 'RNNs & LSTMs',
        desc: 'Sequence modelling. Vanishing gradients problem. When to use RNN.',
        diff: 3,
        tag: 'arch',
        subtopics: [
          { id: 's4_5_1', title: 'Recurrent Neural Network basics' },
          { id: 's4_5_2', title: 'LSTM cells and gating mechanisms' },
          { id: 's4_5_3', title: 'GRU and simplified RNNs' },
          { id: 's4_5_4', title: 'Sequence-to-sequence models' },
          { id: 's4_5_5', title: 'Bidirectional RNNs' },
        ]
      },
      {
        id: 't4_6',
        title: 'Transformers & Attention',
        desc: 'Self-attention, multi-head, positional encoding. The GPT architecture.',
        diff: 4,
        tag: 'arch',
        subtopics: [
          { id: 's4_6_1', title: 'Self-attention mechanism' },
          { id: 's4_6_2', title: 'Multi-head attention' },
          { id: 's4_6_3', title: 'Positional encoding' },
          { id: 's4_6_4', title: 'Transformer encoder-decoder' },
          { id: 's4_6_5', title: 'BERT, GPT, and modern transformers' },
        ]
      },
      {
        id: 't4_7',
        title: 'Transfer Learning & Fine-tuning',
        desc: 'Pretrained models, frozen layers, fine-tune on custom data.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 's4_7_1', title: 'Transfer learning concepts' },
          { id: 's4_7_2', title: 'Feature extraction with pretrained models' },
          { id: 's4_7_3', title: 'Fine-tuning strategies' },
          { id: 's4_7_4', title: 'Learning rate scheduling for fine-tuning' },
          { id: 's4_7_5', title: 'Avoiding catastrophic forgetting' },
        ]
      },
    ]
  },
  {
    id: 'p5',
    title: 'MLOps & Deployment',
    label: 'Phase 05',
    duration: '2–3 weeks',
    color: '#ff6b35',
    icon: '⬢',
    desc: 'Ship it. You know APIs — this phase will feel the most natural to you.',
    topics: [
      {
        id: 't5_1',
        title: 'Evaluation Metrics',
        desc: 'Accuracy, precision, recall, F1, AUC-ROC. Pick the right one per task.',
        diff: 2,
        tag: 'skill',
        subtopics: [
          { id: 's5_1_1', title: 'Accuracy, precision, recall, F1-score' },
          { id: 's5_1_2', title: 'ROC curves and AUC' },
          { id: 's5_1_3', title: 'Confusion matrices and threshold tuning' },
          { id: 's5_1_4', title: 'RMSE, MAE for regression' },
          { id: 's5_1_5', title: 'Choosing metrics for your problem' },
        ]
      },
      {
        id: 't5_2',
        title: 'Experiment Tracking',
        desc: 'MLflow or Weights & Biases. Log params, metrics, artifacts.',
        diff: 1,
        tag: 'tool',
        subtopics: [
          { id: 's5_2_1', title: 'MLflow setup and logging' },
          { id: 's5_2_2', title: 'Weights & Biases (W&B) integration' },
          { id: 's5_2_3', title: 'Hyperparameter tracking' },
          { id: 's5_2_4', title: 'Model versioning' },
          { id: 's5_2_5', title: 'Reproducibility and runs comparison' },
        ]
      },
      {
        id: 't5_3',
        title: 'FastAPI Model Serving',
        desc: 'Wrap your model in a REST endpoint. You know APIs — easiest phase.',
        diff: 1,
        tag: 'deploy',
        subtopics: [
          { id: 's5_3_1', title: 'FastAPI basics and routing' },
          { id: 's5_3_2', title: 'Loading and serving ML models' },
          { id: 's5_3_3', title: 'Request/response validation' },
          { id: 's5_3_4', title: 'Async and batch predictions' },
          { id: 's5_3_5', title: 'Error handling and monitoring' },
        ]
      },
      {
        id: 't5_4',
        title: 'Docker for ML',
        desc: 'Containerise training + inference. Multi-stage builds, GPU images.',
        diff: 2,
        tag: 'deploy',
        subtopics: [
          { id: 's5_4_1', title: 'Docker fundamentals and Dockerfiles' },
          { id: 's5_4_2', title: 'Multi-stage builds for optimization' },
          { id: 's5_4_3', title: 'GPU containers and CUDA' },
          { id: 's5_4_4', title: 'Docker Compose for orchestration' },
          { id: 's5_4_5', title: 'Image best practices and versioning' },
        ]
      },
      {
        id: 't5_5',
        title: 'Hugging Face Ecosystem',
        desc: 'Transformers, datasets, PEFT, Spaces. The npm of ML.',
        diff: 2,
        tag: 'lib',
        subtopics: [
          { id: 's5_5_1', title: 'Hugging Face Transformers library' },
          { id: 's5_5_2', title: 'Model hub and downloading pretrained models' },
          { id: 's5_5_3', title: 'Datasets library for data loading' },
          { id: 's5_5_4', title: 'Parameter-Efficient Fine-Tuning (PEFT)' },
          { id: 's5_5_5', title: 'Hugging Face Spaces for deployment' },
        ]
      },
      {
        id: 't5_6',
        title: 'LLM APIs & RAG',
        desc: 'Anthropic/OpenAI APIs, embeddings, vector DBs, RAG architecture.',
        diff: 3,
        tag: 'llm',
        subtopics: [
          { id: 's5_6_1', title: 'OpenAI and Anthropic API integration' },
          { id: 's5_6_2', title: 'Embeddings and vector representations' },
          { id: 's5_6_3', title: 'Vector databases (Pinecone, Weaviate)' },
          { id: 's5_6_4', title: 'Retrieval-Augmented Generation (RAG)' },
          { id: 's5_6_5', title: 'Prompt engineering best practices' },
        ]
      },
      {
        id: 't5_7',
        title: 'Cloud ML (AWS / GCP)',
        desc: 'SageMaker or Vertex AI basics. Training jobs, model registry.',
        diff: 3,
        tag: 'deploy',
        subtopics: [
          { id: 's5_7_1', title: 'AWS SageMaker setup and notebooks' },
          { id: 's5_7_2', title: 'Training jobs and distributed training' },
          { id: 's5_7_3', title: 'Model deployment and endpoints' },
          { id: 's5_7_4', title: 'Google Vertex AI basics' },
          { id: 's5_7_5', title: 'Monitoring and cost optimization' },
        ]
      },
    ]
  }
];

export const TOTAL_TOPICS = PHASES.reduce((sum, phase) => sum + phase.topics.length, 0);

export const TAG_COLORS: Record<string, TagColorConfig> = {
  lang:    { bg: 'rgba(0,255,157,0.08)', color: '#00cc7d', border: 'rgba(0,255,157,0.15)' },
  lib:     { bg: 'rgba(0,204,255,0.08)', color: '#00aaff', border: 'rgba(0,204,255,0.15)' },
  math:    { bg: 'rgba(255,190,0,0.08)',  color: '#cc9900', border: 'rgba(255,190,0,0.15)' },
  concept: { bg: 'rgba(184,85,255,0.08)', color: '#a040ee', border: 'rgba(184,85,255,0.15)' },
  algo:    { bg: 'rgba(255,107,53,0.08)', color: '#ee5522', border: 'rgba(255,107,53,0.15)' },
  skill:   { bg: 'rgba(0,255,157,0.08)', color: '#00cc7d', border: 'rgba(0,255,157,0.15)' },
  arch:    { bg: 'rgba(184,85,255,0.08)', color: '#a040ee', border: 'rgba(184,85,255,0.15)' },
  tool:    { bg: 'rgba(255,190,0,0.08)',  color: '#cc9900', border: 'rgba(255,190,0,0.15)' },
  deploy:  { bg: 'rgba(255,107,53,0.08)', color: '#ee5522', border: 'rgba(255,107,53,0.15)' },
  llm:     { bg: 'rgba(0,204,255,0.08)', color: '#00aaff', border: 'rgba(0,204,255,0.15)' },
};

export const DIFFICULTY_COLORS = ['#00ff9d', '#00ccff', '#ffbe00', '#ff6b35'] as const;
export const DIFFICULTY_LABELS = ['Beginner', 'Easy', 'Medium', 'Advanced'] as const;

export const RESOURCES: Resource[] = [
  { href: 'https://www.fast.ai', label: '⚡ fast.ai' },
  { href: 'https://kaggle.com/learn', label: '📊 Kaggle Learn' },
  { href: 'https://pytorch.org/tutorials', label: '🔥 PyTorch Docs' },
  { href: 'https://huggingface.co/learn', label: '🤗 HuggingFace' },
  { href: 'https://www.youtube.com/@3blue1brown', label: '📐 3Blue1Brown' },
  { href: 'https://scikit-learn.org/stable/tutorial', label: '🔬 sklearn Docs' },
];

// LocalStorage keys
export const STORAGE_KEYS = {
  COMPLETED_TOPICS: 'ml-roadmap-v2',
  COLLAPSED_PHASES: 'ml-collapsed',
  COMPLETED_SUBTOPICS: 'ml-subtopics-v1',
} as const;
