import type { TopicTutorial } from './phase1';

export const phase5Tutorials: Record<string, TopicTutorial> = {
  't5_1': {
    topicId: 't5_1',
    lessons: [
      {
        title: "Model Evaluation: Beyond Accuracy",
        content: `### Why Accuracy is a Lie
In many AI problems, accuracy is the most misleading metric. If 99% of your emails are clean, an AI that predicts "NOT SPAM" for every single email is 99% accurate—but it manages to catch exactly 0% of actual spam.

### Step-by-Step Metrics
1.  **Recall**: The "Safety" Metric. Of all the actual spam emails, how many did we successfully find?
2.  **Precision**: The "Certainty" Metric. When we flag something as spam, how often are we actually right?
3.  **F1-Score**: The "Balance". A single number that combines both Precision and Recall.
4.  **Confusion Matrix**: A 4-quadrant map of hits, misses, and false alarms.

#### The Trade-off
Usually, increasing Recall (detecting more) decreases Precision (more false alarms). AI engineering is the art of finding the perfect balance for your specific problem.`,
        vizType: 'confusion-matrix',
        noobDefinition: "Think of an airport security scanner. Accuracy is how many people go through safely. Recall is finding every single weapon. Precision is making sure you don't keep frisking innocent people who just have big belt buckles.",
        realWorldExample: "Cancer detection. We want 100% Recall (don't miss anyone) even if Precision is lower (a few healthy people might get an extra check-up).",
        codeExample: {
          language: "python",
          code: `from sklearn.metrics import classification_report, confusion_matrix

# Step 1: Generate the Matrix
# This shows [True Positives, False Positives, etc.]
cm = confusion_matrix(y_true, y_pred)

# Step 2: The High-Level Report
# Prints Precision, Recall, and F1 for every category
report = classification_report(y_true, y_pred)
print(report)`
        }
      },
      {
        title: "ROC & AUC: The Separability Score",
        content: `### Measuring Capability
An **ROC Curve** (Receiver Operating Characteristic) is a graph that shows how well your model can distinguish between two classes (e.g., Cat vs Dog).

### Step-by-Step Analysis
1.  **Thresholding**: AI gives a probability (0.85). We decide if 0.5 is the cutoff or 0.7.
2.  **Plotting**: We plot the True Positive Rate against the False Positive Rate for every possible threshold.
3.  **AUC (Area Under the Curve)**: A score from 0 to 1.
    *   **1.0**: Perfect separation.
    *   **0.5**: Random guessing (worthless).

#### The 'Gold' Standard
In industry, a model with an **AUC > 0.8** is typically considered a very strong classifier.`,
        vizType: 'roc-curve',
        codeExample: {
          language: "python",
          code: `from sklearn.metrics import roc_auc_score, roc_curve

# Step 1: Measure Area Under Curve
# Values near 1.0 are excellent
auc_score = roc_auc_score(y_true, y_probabilities)

# Step 2: Extract Curve Data for Plotting
fpr, tpr, thresholds = roc_curve(y_true, y_probabilities)`
        }
      }
    ]
  },
  't5_2': {
    topicId: 't5_2',
    lessons: [
      {
        title: "Experiment Tracking: The Data Lab",
        content: `### From Messy to Managed
When you train dozens of models with different settings, you'll eventually forget which one was actually the best. **Experiment Tracking** tools like MLflow or W&B (Weights & Biases) act as a "Black Box" flight recorder for your training.

### Step-by-Step Logging
1.  **Params**: Log your settings (learning rate, batch size, model architecture).
2.  **Metrics**: Log the logic curves (accuracy, loss) in real-time.
3.  **Artifacts**: Save the actual model file (\`.pth\` or \`.joblib\`) along with the log.
4.  **Visualize**: Use a dashboard to compare all your runs side-by-side.

#### Why it matters
Scientific reproducibility. If you can't repeat your best run, you don't have a model; you have a lucky accident.`,
        noobDefinition: "It's like having a digital notebook that automatically writes down every single ingredient and temperature you used for every cake you baked, so when you find the perfect cake, you can make it again exactly the same way.",
        realWorldExample: "At Spotify, engineers use experiment tracking to test 50 different variations of their recommendation algorithm simultaneously, picking the one that makes people skip fewer songs.",
        codeExample: {
          language: "python",
          code: `import mlflow

# Step 1: Start the Recording Session
with mlflow.start_run():
    # Step 2: Log 'What' we did
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_param("optimizer", "Adam")
    
    # Step 3: Log 'How' it went
    # Usually logged inside the training loop
    mlflow.log_metric("accuracy", 0.94)
    
    # Step 4: Save the final Result
    mlflow.log_artifact("best_model.pth")
    
print("Experiment successfully memorialized.")`
        }
      }
    ]
  },
  't5_3': {
    topicId: 't5_3',
    lessons: [
      {
        title: "Serving AI with FastAPI",
        content: `### From Research to Production
Training a model is only half the battle. To make it useful, you must "Serve" it so that apps and users can talk to it via the web.

### Step-by-Step Deployment
1.  **Serialization**: Save your trained model as a \`.joblib\` or \`.pt\` file.
2.  **Environment**: Set up an async web server using **FastAPI**.
3.  **Inference Function**: Create a function that takes JSON input, passes it to the model, and returns the prediction.
4.  **Validation**: Use Pydantic to ensure the input data is clean before it touches the model.

#### Why FastAPI?
It is built on modern Python standards (\`async/await\`) making it one of the fastest ways to serve AI in the world.`,
        noobDefinition: "Training a model is like writing a book. Serving with FastAPI is like putting that book in a library where anyone can come and ask questions to it.",
        realWorldExample: "Every time you type a prompt into ChatGPT, your text is being sent to a high-performace API (like FastAPI) that runs the model and sends the reply back to your screen.",
        codeExample: {
          language: "python",
          code: `from fastapi import FastAPI
import joblib

# Step 1: Create the App & Load Model
app = FastAPI()
model = joblib.load("my_ai_model.joblib")

# Step 2: Define the Predict Endpoint
@app.post("/predict")
async def get_prediction(data: dict):
    # Convert input dict to model format
    features = [data["income"], data["age"]]
    prediction = model.predict([features])
    
    return {"is_approved": int(prediction[0])}`
        }
      }
    ]
  },
  't5_4': {
    topicId: 't5_4',
    lessons: [
      {
        title: "Docker: Standardizing ML Environments",
        content: `### The Environment Nightmare
"It works on my machine" is a disaster in AI. Python dependency hell is real. **Docker** ensures that your model runs in the exact same software environment on your laptop as it does on a massive GPU cloud.

### Step-by-Step Containerization
1.  **Base Image**: Use an image that already has Python and CUDA (GPU drivers) pre-installed.
2.  **Requirements**: Copy your \`requirements.txt\` and install the exact versions of PyTorch/TensorFlow you used.
3.  **Entrypoint**: Tell Docker which script to run (e.g., your FastAPI serving script).
4.  **Multi-Stage Builds**: Keep your final production image small by separating the "Builder" (heavy) from the "Runner" (lean).

#### GPU Support
Modern Docker supports \`nvidia-container-toolkit\`, allowing your containers to "see" and use the graphics card hardware for lightning-fast inference.`,
        noobDefinition: "Docker is like a shipping container for your code. It doesn't matter if the ship is a tiny tugboat or a giant carrier; the container stays exactly the same inside, and the code always runs perfectly.",
        realWorldExample: "Netflix serves every single user recommendation through Docker containers. It allows them to scale up 1,000 new servers in seconds during peak traffic hours.",
        codeExample: {
          language: "dockerfile",
          code: `# Step 1: Base image with Python
FROM python:3.9-slim

# Step 2: Set up environment
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 3: Copy AI assets
COPY server.py .
COPY model_v1.pth .

# Step 4: Run the API
EXPOSE 8000
CMD ["uvicorn", "server:app", "--host", "0.0.0.0"]`
        }
      }
    ]
  },
  't5_5': {
    topicId: 't5_5',
    lessons: [
      {
        title: "Hugging Face: The npm of AI",
        content: `### The Community Standard
Hugging Face is the central hub for the entire open-source AI community. It provides thousands of pretrained models, datasets, and optimized libraries.

### Step-by-Step Integration
1.  **Model Hub**: Browse models for text, image, audio, and even 3D.
2.  **Transformers Lib**: Five lines of code to load a state-of-the-art model (like Llama or Stable Diffusion).
3.  **Datasets Lib**: Instant access to terabytes of training data formatted for AI.
4.  **Spaces**: Host your AI demos for free (like a specialized Heroku for AI).

#### The Repository Logic
Every model is a Git repository. You can version them, fork them, and collaborate just like you do with code on GitHub.`,
        noobDefinition: "Hugging Face is like a giant communal library where the smartest people in the world leave their pre-built AIs for you to borrow and use for free.",
        realWorldExample: "The 'HuggingChat' and thousands of specialized business chatbots are all built using models downloaded directly from the Hugging Face hub.",
        codeExample: {
          language: "python",
          code: `from transformers import pipeline

# Step 1: Download & Load 'Sentiment Analysis' model
# This automatically fetches the best weights from the hub
classifier = pipeline("sentiment-analysis")

# Step 2: Inference in one line
result = classifier("I love building AI APIs!")[0]

print(f"Confidence: {result['score']:.2f}, Emotion: {result['label']}")`
        }
      }
    ]
  },
  't5_6': {
    topicId: 't5_6',
    lessons: [
      {
        title: "RAG: Knowledge-Augmented AI",
        content: `### The 'Open-Book' Exam
LLMs (like GPT-4) are limited by their "knowledge cutoff". **RAG** (Retrieval-Augmented Generation) allows the AI to look up your private, real-time documents before answering.

### Step-by-Step RAG Pipeline
1.  **Retrieval**: Search a "Vector Database" for documents related to the user's question.
2.  **Augmentation**: Add the text from those documents into the AI's prompt.
3.  **Generation**: The AI reads the provided context and writes a grounded, fact-based answer.

#### Why RAG Wins
It drastically reduces **Hallucinations** (where the AI makes things up) because the AI is forced to use the "book" you gave it.`,
        vizType: 'rag-arch',
        noobDefinition: "RAG is like giving a student an open-book exam. Instead of just guessing from memory, they can look at the textbook to give you a 100% accurate answer based on your specific rules.",
        realWorldExample: "A Bank's Support Bot. It doesn't know your specific account history until it 'Retrieves' your data from the database and 'Augments' its own knowledge with it.",
        codeExample: {
          language: "python",
          code: `# The core logic using LangChain (Simulated)
# Step 1: Find relevant private data
context_docs = vector_db.search_similarity(query, k=3)

# Step 2: Create a grounded prompt
prompt = f"""
Use the following context to answer:
---
{context_docs}
---
User Question: {query}
"""

# Step 3: Get Answer
answer = llm.generate(prompt)`
        }
      }
    ]
  },
  't5_7': {
    topicId: 't5_7',
    lessons: [
      {
        title: "Cloud ML: Scaling to Infinity",
        content: `### Beyond Local Hardware
Eventually, your laptop isn't enough. **Cloud ML Platforms** (AWS SageMaker, Google Vertex AI, Azure ML) provide virtually unlimited GPU power and automated scaling.

### Step-by-Step Cloud Workflow
1.  **Storage**: Upload your data to buckets (S3 or GCS).
2.  **Training Job**: Launch a container on a massive GPU rig for a few hours.
3.  **Model Registry**: Store your trained "Brain" in a versioned locker.
4.  **Auto-Scaling Endpoint**: Deploy the model to an API that automatically adds more servers when traffic spikes.

#### Cost Management
Cloud ML is expensive. Use "Spot Instances" (discounted spare capacity) and "Serverless Inference" (pay per request) to keep your project profitable.`,
        noobDefinition: "It's like renting a professional skyscraper to run your business instead of doing it from your garage. You get more power, better security, and you can add more floors whenever you need them.",
        realWorldExample: "Uber uses specialized cloud ML platforms to calculate car ETA and pricing for millions of riders every second, scaling their compute power up and down as the sun moves across the globe.",
        codeExample: {
          language: "python",
          code: `import boto3

# Step 1: Initialize Cloud Client (AWS SageMaker example)
sagemaker = boto3.client('sagemaker')

# Step 2: Deploy an existing model to a Production API
response = sagemaker.create_endpoint(
    EndpointName='Predictor-v2',
    EndpointConfigName='Config-A100-Rig'
)

print(f"Deployment Status: {response['ResponseMetadata']['HTTPStatusCode']}")`
        }
      }
    ]
  }
};
