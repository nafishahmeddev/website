import type { TopicTutorial } from './phase1';

export const phase5Tutorials: Record<string, TopicTutorial> = {
  't5_1': {
    topicId: 't5_1',
    lessons: [
      {
        title: 'Precision, Recall, and the Confusion Matrix',
        noobDefinition: 'Accuracy is a lie! If you have 100 people and only 1 has a disease, and you predict "Everyone is healthy", you are 99% accurate but 100% useless. We use Precision and Recall to see if we actually caught the important stuff.',
        realWorldExample: 'A airport security scanner. Precision: "If the alarm bleeps, is there actually a threat?" Recall: "Did we catch EVERY person with a threat?"',
        content: `In the real world, "correct" and "wrong" have different costs. 
        
- **True Positive (TP)**: You said "Spam" and it was Spam. (Good!)
- **False Positive (FP)**: You said "Spam" but it was a work email. (Bad! User missed a meeting).
- **False Negative (FN)**: You said "Clean" but it was Spam. (Annoying, but less harmful than missing a meeting).

We use the **Confusion Matrix** to visualize these four states.

### Key Metrics:
- **Precision**: How many of the people we "flagged" were actually positive?
- **Recall**: How many of the "total actual positives" did we manage to find?`,
        vizType: 'confusion-matrix',
        keyPoints: [
          'Precision = TP / (TP + FP)',
          'Recall = TP / (TP + FN)',
          'F1-Score = The balance between the two',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.metrics import classification_report

# Get a full report of Precision, Recall, and F1
print(classification_report(y_true, y_pred))`
        },
      },
      {
        title: 'ROC Curves & AUC',
        noobDefinition: 'An ROC curve is a graph that shows how "Separable" two groups are. A perfect model has a curve that hugs the top-left corner (high AUC), while a random guesser is just a diagonal line.',
        realWorldExample: 'A doctor adjusting a blood test threshold. If they make the test too sensitive, they get false alarms. If they make it too strict, they miss sick people. ROC shows all these trade-offs on one graph.',
        content: `The **ROC Curve** (Receiver Operating Characteristic) shows the trade-off between the True Positive Rate and the False Positive Rate.

### AUC (Area Under the Curve)
This is a single number between 0 and 1 that represents the model's quality.
- **AUC = 1.0**: Perfect model.
- **AUC = 0.5**: Random guessing (useless).
- **AUC = 0.8+**: Good, reliable model.`,
        vizType: 'roc-curve',
        keyPoints: [
          'ROC shows performance at ALL classification thresholds',
          'AUC is independent of the threshold you eventually choose',
          'A flat diagonal line means the AI is just flipping a coin',
        ],
        codeExample: {
          language: 'python',
          code: `from sklearn.metrics import roc_auc_score

# Calculate the AUC score
auc = roc_auc_score(y_true, model_probabilities)`
        },
      },
    ],
  },
  't5_3': {
    topicId: 't5_3',
    lessons: [
      {
        title: 'Serving AI with FastAPI',
        noobDefinition: 'Training a model is like writing a book. Serving it with FastAPI is like putting that book on Amazon so the whole world can read it.',
        realWorldExample: 'When you ask ChatGPT a question, your text is sent to an API (like FastAPI), the model processes it, and the answer is sent back via the same "pipe".',
        content: `Once your model is saved as a file (\`.pkl\` or \`.pt\`), you need to bridge it to the web. **FastAPI** is the modern standard for this.

### The Workflow:
1. **Load**: Load the model into memory.
2. **Endpoint**: Create a URL like \`/predict\`.
3. **Pydantic**: Validate that the data the user sent is in the right format.
4. **Predict**: Pass the data to the model and return the result as JSON.`,
        keyPoints: [
          'FastAPI is extremely fast (uses Python Async)',
          'Automatically generates documentation (/docs)',
          'The industry standard for ML Microservices',
        ],
        codeExample: {
          language: 'python',
          code: `from fastapi import FastAPI
import joblib

app = FastAPI()
model = joblib.load("model.pkl")

@app.post("/predict")
async def predict(data: dict):
    result = model.predict([data["features"]])
    return {"prediction": int(result[0])}`
        },
      },
    ],
  },
  't5_6': {
    topicId: 't5_6',
    lessons: [
      {
        title: 'RAG (Retrieval-Augmented Generation)',
        noobDefinition: 'RAG is like giving an AI an "Open-Book Exam". Instead of just relying on its memory, it can look up specific documents (like your companys internal wikis) to answer questions accurately.',
        realWorldExample: 'A customer support bot for a specific bank. It doesn\'t just "guess" the bank\'s rules; it looks up the 2024 PDF manual to find the exact interest rate before answering.',
        content: `AI models have a "Cut-off date" (they don't know what happened yesterday). **RAG** solves this by letting the AI search a database before it talks.

### The RAG Pipeline:
1. **User asks**: "How do I reset my Acme password?"
2. **Retrieve**: The system searches your private documents for "Acme password reset".
3. **Augment**: The system takes the user question and the retrieved text and gives them both to the LLM.
4. **Generate**: The AI says: "According to the manual I just read, you need to click the blue button..."`,
        vizType: 'rag-arch',
        keyPoints: [
          'Prevents "Hallucinations" (AI making things up)',
          'Allows AI to access private, real-time data',
          'Uses Vector Databases (like Pinecone or Chroma) for search',
        ],
        codeExample: {
          language: 'python',
          code: `# The core RAG logic (Simulated)
docs = vector_db.similarity_search(query)
context = "\\n".join(docs)
prompt = f"Using this context: {context}\\nAnswer this: {query}"
response = llm.invoke(prompt)`
        },
      },
    ],
  },
};
