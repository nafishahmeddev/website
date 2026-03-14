import type { TopicTutorial } from './phase1';

export const phase4Tutorials: Record<string, TopicTutorial> = {
  't4_1': {
    topicId: 't4_1',
    lessons: [
      {
        title: "Neural Networks: The Layered Mind",
        content: `### Thinking in Layers
A Neural Network is a series of mathematical layers that transform raw data into abstract concepts. It is the core architecture behind all modern AI.

### Step-by-Step Architecture
1.  **Input Layer**: Data enters the system (e.g., 784 pixels of an image).
2.  **Hidden Layers**: Neurons detect features. Layer 1 might find edges; Layer 2 finds circles; Layer 3 finds eyes.
3.  **Activation (ReLU)**: A "Filter" that decides if a neuron should fire, adding non-linearity to the system.
4.  **Output Layer**: The final prediction (e.g., "This image is a 9").

#### Weights & Biases
The 'Knowledge' of an AI is stored in its **Weights**. Learning is simply the process of finding the perfect numbers for these connections.`,
        vizType: 'neural-network',
        noobDefinition: "A Neural Network is like a 'Chain of Committees'. The first committee looks at the raw pixels. They pass their notes to the next committee, which finds shapes, and eventually, the final committee decides what the object is.",
        realWorldExample: "Facial Recognition on your phone. One layer detects skin color, the next detects eye shapes, and the final layer realizes: 'This is Ahmed'.",
        codeExample: {
          language: "python",
          code: `import torch.nn as nn

# Step 1: Define a 3-Layer Architecture
# This network takes 784 inputs and outputs 10 classes
model = nn.Sequential(
    nn.Linear(784, 128), # Layer 1: Detection
    nn.ReLU(),           # Activation: The 'Switch'
    nn.Linear(128, 64),  # Layer 2: Refinement
    nn.ReLU(),
    nn.Linear(64, 10)    # Layer 3: Decision
)`
        }
      }
    ]
  },
  't4_2': {
    topicId: 't4_2',
    lessons: [
      {
        title: "Backpropagation: The Learning Loop",
        content: `### How AI Fixes Mistakes
How does a network with 1 billion weights learn? It "blames" its errors on specific weights and fixes them using **Backpropagation**.

### Step-by-Step Training
1.  **Forward Pass**: Data travels from Input to Output. A prediction is made.
2.  **Loss Calculation**: The AI compares its guess to the truth and calculates a "Mistake Score".
3.  **Backward Pass**: The AI goes backwards, calculating the "Gradient" (the blame) for every single weight.
4.  **Optimizer Step**: The weights are nudged slightly in the direction that reduces the error.

#### The Chain Rule
Technically, Backprop is just the application of the Calculus Chain Rule across millions of connections.`,
        vizType: 'backprop',
        noobDefinition: "Backprop is like a chef tasting a soup. If it's too salty, they trace it back: 'Did the intern add too much salt? Yes. Fix the intern's recipe for next time.'",
        realWorldExample: "Self-Driving Cars. When a car accidentally clips a curb in simulation, Backprop 'blames' the specific neurons that made that steering decision and adjusts them instantly.",
        codeExample: {
          language: "python",
          code: `# The standard training loop in PyTorch
# 1. Forward Pass
outputs = model(inputs)
loss = criterion(outputs, labels)

# 2. Backward Pass (The Magic)
# This calculates 'blame' for 1,000,000 weights instantly
loss.backward()

# 3. Apply the Fix
optimizer.step()
optimizer.zero_grad()`
        }
      }
    ]
  },
  't4_3': {
    topicId: 't4_3',
    lessons: [
      {
        title: "PyTorch: The Modern AI Framework",
        content: `### Why PyTorch?
Unlike earlier frameworks that used static graphs, PyTorch uses a **Dynamic Computational Graph**. This means you can change your network on the fly, making it the favorite for AI researchers.

### Step-by-Step Tensors
1.  **Tensors**: The core data structure. Think of them as NumPy arrays that can live on your GPU for 100x speed.
2.  **nn.Module**: The blueprint for any network. You define your layers in \`__init__\` and your logic in \`forward\`.
3.  **DataLoader**: Effortlessly shuffle and batch millions of images or text snippets.
4.  **The Train Loop**: The manual, controlled process of moving data to GPU, calculating loss, and updating weights.

#### Autograd
The magic engine that calculates all gradients (slopes) for you automatically as your data flows through the model.`,
        noobDefinition: "If building an AI from scratch is like building a car from raw iron, PyTorch is like having a high-tech factory where you just snap pre-made engines and wheels together.",
        realWorldExample: "Tesla's Autopilot and OpenAI's Whisper are built on PyTorch. It handles the massive scale of data and complex logic needed for real-time safety.",
        codeExample: {
          language: "python",
          code: `import torch
import torch.nn as nn

# Step 1: Define the Architecture
class TinyNerv(nn.Module):
    def __init__(self):
        super().__init__()
        self.flat = nn.Flatten()
        self.fc = nn.Linear(784, 10) # 784 inputs, 10 outputs

    def forward(self, x):
        return self.fc(self.flat(x))

# Step 2: Initialize & Move to GPU if available
device = "cuda" if torch.cuda.is_available() else "cpu"
model = TinyNerv().to(device)

# Step 3: Autograd in action
input_data = torch.randn(1, 28, 28)
output = model(input_data)
print(f"Prediction Tensor: {output.shape}")`
        }
      }
    ]
  },
  't4_4': {
    topicId: 't4_4',
    lessons: [
      {
        title: "CNNs: The Vision Engine",
        content: `### Specialized for Images
Convolutional Neural Networks (CNNs) don't see images as flat lines; they see them as **Spatial Grids**. They are the technology behind face-unlock and self-driving cars.

### Step-by-Step Vision
1.  **Convolution**: A small 'Filter' (magnifying glass) slides over the image looking for edges.
2.  **Feature Mapping**: The filters create a map of where all the vertical and horizontal lines are.
3.  **Pooling**: The image is "Shrunk" to focus only on the most important parts, saving memory.
4.  **Classification**: The final features are passed to a standard neural network to decide the label.

#### Kernel Magic
A single 3x3 'Kernel' can be designed to find sharp edges, blur an image, or detect specific textures.`,
        vizType: 'cnn-conv',
        noobDefinition: "Imagine a detective sliding a magnifying glass over a photo. They aren't looking at the whole photo at once; they are looking for tiny clues (edges, corners, colors) square-by-square.",
        realWorldExample: "Google Photos search. When you search for 'Dog', a CNN has already scanned your photos looking for 4-legged shapes, snout textures, and tail patterns.",
        codeExample: {
          language: "python",
          code: `import torch.nn as nn

# A Convolutional Layer for Image Processing
conv_layer = nn.Conv2d(
    in_channels=3,    # RGB (Red, Green, Blue)
    out_channels=32,   # Find 32 different types of clues
    kernel_size=3,    # Look at 3x3 pixel patches
    padding=1         # Keep the image size consistent
)

# Pooling: Shrink the image by 50%
pool_layer = nn.MaxPool2d(kernel_size=2)`
        }
      }
    ]
  },
  't4_5': {
    topicId: 't4_5',
    lessons: [
      {
        title: "RNNs & LSTMs: Processing Sequences",
        content: `### Data with a Memory
Standard networks treat every input as independent. **RNNs (Recurrent Neural Networks)** have a 'loop' that allows them to remember what happened in the previous step, making them perfect for text or audio.

### Step-by-Step Sequence Logic
1.  **Hidden State**: The "Internal Memory" that travels from one word to the next.
2.  **Vanishing Gradients**: Standard RNNs share a flaw—they forget the beginning of a long sentence.
3.  **LSTM (Long Short-Term Memory)**: A special architecture with "Gates" that decide exactly what info to keep, what to forget, and what to pass on.

#### The State of the Art
While Transformers (like GPT) have taken over for long text, LSTMs remain crucial for real-time sensor data and smaller sequence tasks.`,
        noobDefinition: "A standard AI is like reading a single word. An RNN is like reading a whole sentence—you remember the first word so the last word actually makes sense.",
        realWorldExample: "Siri and Alexa use sequence models to understand your speech patterns over time, ensuring they catch the context of your request.",
        codeExample: {
          language: "python",
          code: `import torch.nn as nn

# Step 1: Define an LSTM Layer
# input_size=10 (features), hidden_size=20 (memory capacity)
lstm = nn.LSTM(input_size=10, hidden_size=20, num_layers=2)

# Step 2: Process a sequence of 5 items
# [sequence_length, batch_size, input_size]
input_seq = torch.randn(5, 1, 10)

# Step 3: Output + Hidden/Cell state
output, (hn, cn) = lstm(input_seq)

print(f"Internal Memory Shape: {hn.shape}")`
        }
      }
    ]
  },
  't4_6': {
    topicId: 't4_6',
    lessons: [
      {
        title: "Transformers: The Attention Revolution",
        content: `### The Tech Behind ChatGPT
Transformers are the "Super-Readers" of AI. Before them, AI read word-by-word. Transformers read everything at once using **Attention**.

### Step-by-Step Attention
1.  **Embeddings**: Each word is turned into a high-dimensional vector.
2.  **Self-Attention**: Every word in a sentence "looks" at every other word to find meaning.
3.  **Context**: In "Bank of the river" vs "Bank account", the word 'Bank' looks at 'River' vs 'Account' to know its meaning.
4.  **Generative Output**: The model predicts the **most likely next word** based on the whole context.

#### Parallel Power
Because they process the whole sentence at once (not word-by-word), we can train them on the entire internet using massive GPU clusters.`,
        vizType: 'attention-heatmap',
        noobDefinition: "Imagine reading a book where you can see every page at the same time. You can instantly link a character's name on page 1 to an action they take on page 500.",
        realWorldExample: "Language Translation. To translate 'The cat sat on the mat', the AI needs to know 'The' refers to 'Cat' to get the grammar right in other languages. Attention handles this perfectly.",
        codeExample: {
          language: "python",
          code: `# Using a Pre-trained Transformer with HuggingFace
from transformers import pipeline

# Step 1: Initialize the specialized model
nlp = pipeline("sentiment-analysis")

# Step 2: Instant Inference (Contextual Understanding)
result = nlp("This tutorial is absolutely mind-blowing!")
# Output: [{'label': 'POSITIVE', 'score': 0.9998}]`
        }
      }
    ]
  },
  't4_7': {
    topicId: 't4_7',
    lessons: [
      {
        title: "Transfer Learning: Standing on Giants",
        content: `### Don't Retrain the Wheel
You don't need a supercomputer to build world-class AI. You can download a model that already "knows" how to see or speak, and then **Fine-tune** it for your specific task.

### Step-by-Step Fine-Tuning
1.  **Select Pretrained Model**: Pick a giant model (like ResNet or BERT) trained on billions of data points.
2.  **Freeze Layers**: Lock the base layers so the AI doesn't "forget" how to see edges or shapes.
3.  **Replace the Head**: Swap the final layer for a new one that fits your specific categories (e.g., 'X-ray' vs 'Normal').
4.  **Train (Fine-tune)**: Use a very slow learning rate to slightly adjust the weights for your data.

#### Efficiency
Transfer learning allows you to get 99% accuracy with 1,000 images instead of 1,000,000.`,
        noobDefinition: "It's like hiring a professional chef to cook for your specific party. They already know how to cook (Pretrained); they just need to learn your specific menu for the night (Fine-tuning).",
        realWorldExample: "Medical AI companies take a model trained on general internet photos and 'fine-tune' it on medical scans to detect rare diseases with superhuman accuracy.",
        codeExample: {
          language: "python",
          code: `from torchvision import models
import torch.nn as nn

# Step 1: Load a model that already 'knows' images
resnet = models.resnet18(pretrained=True)

# Step 2: Freeze all existing knowledge
for param in resnet.parameters():
    param.requires_grad = False

# Step 3: Replace the output layer for our 2 categories
# (e.g., Cat vs Dog)
resnet.fc = nn.Linear(resnet.fc.in_features, 2)

# Now only the last layer will 'learn' from our data
print("Knowledge Transfer Complete.")`
        }
      }
    ]
  }
};
