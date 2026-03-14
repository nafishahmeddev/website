# ML Engineer Roadmap 🚀

Complete learning roadmap with 5 phases, 34 topics, and 170+ subtopics.

---

## Phase 01: Math & Python Foundations (∑)
**Duration:** 2–3 weeks  
**Color:** #00ff9d  
*The bedrock. You already know JS — Python will take days, not weeks.*

### Topic 1.1: Python for JS Devs
**Difficulty:** Beginner | **Tag:** lang  
*Syntax, list comprehensions, dicts, modules. Fast track from JS.*

- Variables, types, and operators
- Functions, scope, and closures
- List comprehensions & generators
- Dictionaries and sets
- Modules and imports

### Topic 1.2: NumPy Arrays
**Difficulty:** Beginner | **Tag:** lib  
*N-dimensional arrays, broadcasting, vectorisation — replaces loops.*

- Creating and indexing arrays
- Array shapes and reshaping
- Broadcasting rules
- Vectorized operations
- Matrix operations

### Topic 1.3: Pandas DataFrames
**Difficulty:** Beginner | **Tag:** lib  
*Load CSVs, filter rows, group-by, handle missing data.*

- Series and DataFrame basics
- Loading and saving data (CSV, JSON)
- Indexing and selecting data
- Filtering, sorting, and grouping
- Handling missing data

### Topic 1.4: Matplotlib / Seaborn
**Difficulty:** Beginner | **Tag:** lib  
*Visualise data distributions, correlations, training curves.*

- Basic plots (line, scatter, histogram)
- Subplots and figure customization
- Seaborn statistical plots
- Heatmaps and correlation matrices
- Export and styling

### Topic 1.5: Linear Algebra Intuition
**Difficulty:** Easy | **Tag:** math  
*Vectors, matrices, dot product, eigenvalues — visual-first approach.*

- Vectors and vector spaces
- Matrices and matrix operations
- Dot product and projection
- Determinants and inverses
- Eigenvalues and eigenvectors

### Topic 1.6: Calculus — Derivatives
**Difficulty:** Easy | **Tag:** math  
*Chain rule, partial derivatives. All of backprop is just this.*

- Limits and continuity
- Single variable derivatives
- Chain rule and product rule
- Partial derivatives
- Gradients and directional derivatives

### Topic 1.7: Probability & Statistics
**Difficulty:** Easy | **Tag:** math  
*Distributions, expectation, variance, Bayes theorem.*

- Probability basics and rules
- Distributions (Normal, Binomial, Poisson)
- Expectation and variance
- Conditional probability & Bayes theorem
- Hypothesis testing and confidence intervals

---

## Phase 02: Core ML Concepts (⊕)
**Duration:** 3–4 weeks  
**Color:** #00ccff  
*The mental model. Understand *why* before you touch a framework.*

### Topic 2.1: Supervised vs Unsupervised
**Difficulty:** Beginner | **Tag:** concept  
*Types of ML, when to use each, the taxonomy of problems.*

- Supervised learning: regression & classification
- Unsupervised learning: clustering & dimensionality reduction
- Semi-supervised learning
- Reinforcement learning overview
- Problem-to-approach mapping

### Topic 2.2: Loss Functions
**Difficulty:** Easy | **Tag:** concept  
*MSE, cross-entropy, huber. What "learning" actually means numerically.*

- Mean Squared Error (MSE)
- Cross-entropy and log loss
- Huber loss and robust losses
- Custom loss functions
- Why loss matters for learning

### Topic 2.3: Gradient Descent
**Difficulty:** Easy | **Tag:** algo  
*The engine of all ML. SGD, mini-batch, momentum, Adam.*

- Batch gradient descent
- Stochastic gradient descent (SGD)
- Mini-batch gradient descent
- Momentum and Nesterov
- Adam, RMSprop, and adaptive methods

### Topic 2.4: Overfitting & Regularisation
**Difficulty:** Easy | **Tag:** concept  
*Bias-variance tradeoff, L1/L2, dropout, early stopping.*

- Understanding bias and variance
- L1 (Lasso) and L2 (Ridge) regularization
- Elastic Net
- Early stopping and validation
- Dropout (for neural networks)

### Topic 2.5: Train / Val / Test Split
**Difficulty:** Beginner | **Tag:** concept  
*Why data splits matter. k-fold cross validation.*

- Train-validation-test split strategy
- Stratified sampling
- k-fold cross-validation
- Time series splitting
- Avoiding data leakage

### Topic 2.6: Feature Engineering
**Difficulty:** Easy | **Tag:** skill  
*Normalisation, encoding categoricals, handling nulls, feature selection.*

- Normalization and standardization
- One-hot encoding and label encoding
- Handling missing data
- Feature scaling and transformation
- Feature selection methods

### Topic 2.7: scikit-learn API
**Difficulty:** Beginner | **Tag:** lib  
*fit / predict / score. Pipelines, transformers. The sklearn mental model.*

- Estimators: fit and predict
- Transformers and scaling
- Pipelines and composition
- Cross-validation with sklearn
- Model selection and hyperparameter tuning

---

## Phase 03: Classical Algorithms (◈)
**Duration:** 2–3 weeks  
**Color:** #ffbe00  
*Still the best tools for tabular data. Know when to reach for these over deep learning.*

### Topic 3.1: Linear & Logistic Regression
**Difficulty:** Beginner | **Tag:** algo  
*Build from scratch first. Then use sklearn. Understand the maths.*

- Linear regression from scratch
- Maximum likelihood estimation
- Logistic regression fundamentals
- Decision boundaries
- Multi-class classification

### Topic 3.2: Decision Trees
**Difficulty:** Beginner | **Tag:** algo  
*Gini impurity, information gain, pruning. Very visual to understand.*

- Information gain and entropy
- Gini impurity
- Building decision trees recursively
- Pruning techniques
- Interpretability of trees

### Topic 3.3: Random Forests
**Difficulty:** Easy | **Tag:** algo  
*Bagging. Ensemble methods. Feature importance. Go-to baseline.*

- Bootstrap aggregating (Bagging)
- Random forest construction
- Feature importance from forests
- Out-of-bag error estimation
- Hyperparameter tuning

### Topic 3.4: Gradient Boosting / XGBoost
**Difficulty:** Medium | **Tag:** algo  
*The king of Kaggle tabular. Boosting vs bagging intuition.*

- Boosting algorithm basics
- Gradient boosting machines
- XGBoost architecture
- LightGBM and CatBoost
- Regularization in boosting

### Topic 3.5: K-Means Clustering
**Difficulty:** Beginner | **Tag:** algo  
*Unsupervised grouping. Elbow method. Good for data exploration.*

- K-Means algorithm and convergence
- Choosing optimal k (Elbow method)
- Silhouette analysis
- Initialization strategies
- Mini-batch K-Means

### Topic 3.6: PCA / Dimensionality Reduction
**Difficulty:** Medium | **Tag:** algo  
*Compress high-dimensional data. Eigenvalue decomposition in practice.*

- Principal Component Analysis (PCA)
- Variance explained and scree plots
- Kernel PCA
- UMAP and t-SNE for visualization
- Feature selection vs dimensionality reduction

---

## Phase 04: Neural Networks & Deep Learning (⬡)
**Duration:** 4–6 weeks  
**Color:** #b855ff  
*The hard part. Take your time here — it pays off for everything that follows.*

### Topic 4.1: Perceptron & MLP
**Difficulty:** Easy | **Tag:** concept  
*Single neuron → layers. Forward pass, activation functions.*

- Perceptron algorithm and limitations
- Multi-layer perceptron (MLP) architecture
- Forward propagation process
- Activation functions (ReLU, tanh, sigmoid)
- Universal approximation theorem

### Topic 4.2: Backpropagation
**Difficulty:** Medium | **Tag:** concept  
*Chain rule applied to networks. Compute gradients layer-by-layer.*

- Chain rule in neural networks
- Backpropagation algorithm step-by-step
- Computing gradients for weights and biases
- Vanishing and exploding gradients
- Batch backpropagation

### Topic 4.3: PyTorch Fundamentals
**Difficulty:** Easy | **Tag:** lib  
*Tensors, autograd, nn.Module, DataLoader, training loop.*

- Tensors and tensor operations
- Automatic differentiation (autograd)
- Building models with nn.Module
- Custom layers and loss functions
- DataLoaders and training loops

### Topic 4.4: CNNs — Convolutional Nets
**Difficulty:** Medium | **Tag:** arch  
*Filters, feature maps, pooling. ResNet architecture overview.*

- Convolution operation and filters
- Pooling and stride concepts
- Classic architectures (AlexNet, VGG)
- ResNet and skip connections
- ImageNet and transfer learning

### Topic 4.5: RNNs & LSTMs
**Difficulty:** Medium | **Tag:** arch  
*Sequence modelling. Vanishing gradients problem. When to use RNN.*

- Recurrent Neural Network basics
- LSTM cells and gating mechanisms
- GRU and simplified RNNs
- Sequence-to-sequence models
- Bidirectional RNNs

### Topic 4.6: Transformers & Attention
**Difficulty:** Advanced | **Tag:** arch  
*Self-attention, multi-head, positional encoding. The GPT architecture.*

- Self-attention mechanism
- Multi-head attention
- Positional encoding
- Transformer encoder-decoder
- BERT, GPT, and modern transformers

### Topic 4.7: Transfer Learning & Fine-tuning
**Difficulty:** Easy | **Tag:** skill  
*Pretrained models, frozen layers, fine-tune on custom data.*

- Transfer learning concepts
- Feature extraction with pretrained models
- Fine-tuning strategies
- Learning rate scheduling for fine-tuning
- Avoiding catastrophic forgetting

---

## Phase 05: MLOps & Deployment (⬢)
**Duration:** 2–3 weeks  
**Color:** #ff6b35  
*Ship it. You know APIs — this phase will feel the most natural to you.*

### Topic 5.1: Evaluation Metrics
**Difficulty:** Easy | **Tag:** skill  
*Accuracy, precision, recall, F1, AUC-ROC. Pick the right one per task.*

- Accuracy, precision, recall, F1-score
- ROC curves and AUC
- Confusion matrices and threshold tuning
- RMSE, MAE for regression
- Choosing metrics for your problem

### Topic 5.2: Experiment Tracking
**Difficulty:** Beginner | **Tag:** tool  
*MLflow or Weights & Biases. Log params, metrics, artifacts.*

- MLflow setup and logging
- Weights & Biases (W&B) integration
- Hyperparameter tracking
- Model versioning
- Reproducibility and runs comparison

### Topic 5.3: FastAPI Model Serving
**Difficulty:** Beginner | **Tag:** deploy  
*Wrap your model in a REST endpoint. You know APIs — easiest phase.*

- FastAPI basics and routing
- Loading and serving ML models
- Request/response validation
- Async and batch predictions
- Error handling and monitoring

### Topic 5.4: Docker for ML
**Difficulty:** Easy | **Tag:** deploy  
*Containerise training + inference. Multi-stage builds, GPU images.*

- Docker fundamentals and Dockerfiles
- Multi-stage builds for optimization
- GPU containers and CUDA
- Docker Compose for orchestration
- Image best practices and versioning

### Topic 5.5: Hugging Face Ecosystem
**Difficulty:** Easy | **Tag:** lib  
*Transformers, datasets, PEFT, Spaces. The npm of ML.*

- Hugging Face Transformers library
- Model hub and downloading pretrained models
- Datasets library for data loading
- Parameter-Efficient Fine-Tuning (PEFT)
- Hugging Face Spaces for deployment

### Topic 5.6: LLM APIs & RAG
**Difficulty:** Medium | **Tag:** llm  
*Anthropic/OpenAI APIs, embeddings, vector DBs, RAG architecture.*

- OpenAI and Anthropic API integration
- Embeddings and vector representations
- Vector databases (Pinecone, Weaviate)
- Retrieval-Augmented Generation (RAG)
- Prompt engineering best practices

### Topic 5.7: Cloud ML (AWS / GCP)
**Difficulty:** Medium | **Tag:** deploy  
*SageMaker or Vertex AI basics. Training jobs, model registry.*

- AWS SageMaker setup and notebooks
- Training jobs and distributed training
- Model deployment and endpoints
- Google Vertex AI basics
- Monitoring and cost optimization

---

## Summary

| Phase | Title | Duration | Topics | Subtopics |
|-------|-------|----------|--------|-----------|
| 01 | Math & Python Foundations | 2–3 weeks | 7 | 35 |
| 02 | Core ML Concepts | 3–4 weeks | 7 | 35 |
| 03 | Classical Algorithms | 2–3 weeks | 6 | 30 |
| 04 | Neural Networks & Deep Learning | 4–6 weeks | 7 | 35 |
| 05 | MLOps & Deployment | 2–3 weeks | 7 | 35 |
| **Total** | | **13–19 weeks** | **34** | **170** |

---

## Resources

- ⚡ [fast.ai](https://www.fast.ai)
- 📊 [Kaggle Learn](https://kaggle.com/learn)
- 🔥 [PyTorch Docs](https://pytorch.org/tutorials)
- 🤗 [HuggingFace](https://huggingface.co/learn)
- 📐 [3Blue1Brown](https://www.youtube.com/@3blue1brown)
- 🔬 [sklearn Docs](https://scikit-learn.org/stable/tutorial)

---

**Created:** March 2026  
**Track your progress:** Open the interactive roadmap app to track topics and subtopics!
