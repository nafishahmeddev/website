import type { TopicTutorial } from './phase1';

export const phase5Tutorials: Record<string, TopicTutorial> = {
  't5_1': {
    topicId: 't5_1',
    lessons: [
      {
        title: 'Evaluation Metrics',
        noobDefinition: 'Metrics are like the "Scoreboard" for your AI. Accuracy isn\'t always enough. If you have a test for a rare disease, and you just say "No one has it," you\'ll be 99% accurate but 100% useless! Metrics like Recall help you catch those rare cases.',
        realWorldExample: 'A spam filter. Precision means: "When I say it\'s spam, am I right?" Recall means: "Did I catch ALL the spam emails?"',
        content: `Choosing the right metric is critical. 
        
For **Classification**, we use a **Confusion Matrix** to see True Positives, False Positives, etc. 
For **Regression**, we use metrics like **RMSE** (Root Mean Squared Error) to see how many "dollars" or "units" we were off by.`,
        keyPoints: [
          'Accuracy: Total correct / Total samples',
          'Precision: Quality over quantity',
          'Recall: Quantity over quality (finding all cases)',
          'F1-Score: The harmonic mean of Precision and Recall',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.metrics import classification_report, confusion_matrix

# Get a detailed breakdown of performance
print(classification_report(y_test, predictions))
print(confusion_matrix(y_test, predictions))`,
        },
      },
    ],
  },
  't5_3': {
    topicId: 't5_3',
    lessons: [
      {
        title: 'FastAPI Model Serving',
        noobDefinition: 'FastAPI is like "Building a Counter" for your AI shop. Your AI lives in the back room, and FastAPI provides a window where people can send data and get a prediction back in milliseconds.',
        realWorldExample: 'A website like Remove.bg. You upload a photo (the Request), the AI processes it, and 2 seconds later you get the result (the Response).',
        content: `Once your model is trained, you need to expose it as an API. FastAPI is the go-to for Python because it is extremely fast and handles asynchronous requests perfectly.`,
        keyPoints: [
          'Pydantic: For validating the data people send to your API',
          'async/await: Handling many users at once without slowing down',
          'JSON: The language the web API uses to communicate',
          'Swagger UI: Automatically generated documentation (/docs)',
        ],
        codeExample: {
          language: 'python',
          code: `from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("my_model.pkl")

@app.post("/predict")
def predict(data: dict):
    prediction = model.predict([data["features"]])
    return {"prediction": int(prediction[0])}`,
        },
      },
    ],
  },
  't5_4': {
    topicId: 't5_4',
    lessons: [
      {
        title: 'Docker for ML',
        noobDefinition: 'Docker is like a "Shipping Container". It packs your code, Python version, and libraries into one box that is guaranteed to run perfectly on any computer, anywhere.',
        realWorldExample: 'The "It works on my machine" problem. Docker solves this by making sure your code runs on the Server exactly like it does on your Laptop.',
        content: `Machine Learning environments are notoriously fragile. Docker ensures environment consistency. 
        
You write a **Dockerfile**, which is a list of instructions to build your "Container".`,
        keyPoints: [
          'Image: The "frozen" blueprint of your environment',
          'Container: The running instance of an image',
          'Requirements.txt: The list of libraries you need',
          'Multi-stage builds: Keeping your final container small and fast',
        ],
        codeExample: {
          language: 'dockerfile',
          code: `FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]`,
        },
      },
    ],
  },
  't5_6': {
    topicId: 't5_6',
    lessons: [
      {
        title: 'LLM APIs & RAG',
        noobDefinition: 'RAG (Retrieval-Augmented Generation) is like "Giving an AI an Open-Book Exam". Instead of just relying on what it learned in school (training), it can look up specific info in your private documents to answer questions.',
        realWorldExample: 'A customer support bot for a specific company. It looks up the company\'s 500-page manual to answer exactly how to reset your password.',
        content: `Large Language Models (LLMs) like Claude or GPT-4 are powerful but have a "cut-off" date. 
        
RAG solves this by:
1. Converting your docs into **Embeddings** (numbers)
2. Storing them in a **Vector Database**
3. Searching for relevant chunks when a user asks a question`,
        keyPoints: [
          'Embeddings: Converting text into mathematical vectors',
          'Vector DB (like Pinecone/Chroma): A database for searching by meaning',
          'Prompt Engineering: Crafting the perfect instruction for the LLM',
          'Semantic Search: Finding info based on intent, not just keywords',
        ],
        codeExample: {
          language: 'python',
          code: `# Simple RAG logic
query_vector = embed(user_query)
relevant_docs = vector_db.search(query_vector)

prompt = f"Use these docs: {relevant_docs} to answer: {user_query}"
response = llm.generate(prompt)`,
        },
      },
    ],
  },
};
