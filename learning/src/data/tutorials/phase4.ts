import type { TopicTutorial } from './phase1';

export const phase4Tutorials: Record<string, TopicTutorial> = {
  't4_1': {
    topicId: 't4_1',
    lessons: [
      {
        title: 'Perceptrons & MLP',
        noobDefinition: 'A Perceptron is like a "Single Brain Cell". It takes in some signals, multiplies them by how much it "cares" about them, and fires a signal if the total is high enough. An MLP is just a whole bunch of these cells connected together in layers.',
        realWorldExample: 'A bouncer at a club deciding who to let in. He looks at three things: ID, Age, and Dress Code. He gives each a score, and if the total is > 7, you get in.',
        content: `The Multi-Layer Perceptron (MLP) is the classic "Neural Network". It consists of an Input layer, one or more Hidden layers, and an Output layer.
        
Each connection has a **weight** (how much we care about that input) and each neuron has a **bias** (the default state). We use **Activation Functions** like ReLU to make the network capable of learning complex, non-linear patterns.`,
        keyPoints: [
          'Neuron: The basic building block',
          'Weights & Biases: The "parameters" the model learns',
          'Activation Functions: The "switch" that decides if a neuron fires',
          'ReLU (Rectified Linear Unit): The most common activation function today',
        ],
        codeExample: {
          language: 'python',
          code: `import torch.nn as nn

# A simple 2-layer neural network
model = nn.Sequential(
    nn.Linear(10, 50), # Input: 10, Hidden: 50
    nn.ReLU(),
    nn.Linear(50, 1)   # Output: 1
)`,
        },
      },
    ],
  },
  't4_2': {
    topicId: 't4_2',
    lessons: [
      {
        title: 'Backpropagation',
        noobDefinition: 'Backprop is like "Pin the Tail on the Donkey" while someone shouts "LOWER" or "HIGHER". After every guess, you learn exactly how much to move your hand to be closer next time.',
        realWorldExample: 'A teacher grading a test and giving feedback. Instead of just saying "F", the teacher points to exactly which math step you got wrong so you can fix it in the next exam.',
        content: `Backpropagation is how neural networks learn. It uses the **Chain Rule** from calculus to calculate how much each weight contributed to the final error (Loss).
        
The algorithm starts at the output and "propagates" the error backwards through the layers, updating every weight slightly using Gradient Descent.`,
        keyPoints: [
          'Goal: Calculate the gradient of the Loss with respect to every weight',
          'The Chain Rule: The mathematical engine of deep learning',
          'Optimizer (like SGD or Adam): The tool that actually updates the weights',
          'Automatic Differentiation: Why tools like PyTorch are so powerful (they do this for you!)',
        ],
        formula: '∂L/∂w = (∂L/y) * (∂y/∂w)',
        codeExample: {
          language: 'python',
          code: `# PyTorch magic: backprop in 2 lines
loss.backward()  # Calculates all gradients
optimizer.step()  # Updates all weights`,
        },
      },
    ],
  },
  't4_3': {
    topicId: 't4_3',
    lessons: [
      {
        title: 'PyTorch Fundamentals',
        noobDefinition: 'PyTorch is like "Numpy with a Turbocharger". It looks just like Python math code, but it can run on super-fast GPUs and automatically calculates all the difficult calculus for you.',
        realWorldExample: 'If Numpy is a bicycle, PyTorch is a rocket ship. Both get you from A to B, but PyTorch handles massive datasets and complex AI models with ease.',
        content: `PyTorch is the most popular framework for AI research. It revolves around **Tensors** (fancy multi-dimensional arrays) and **Autograd** (automatic math).`,
        keyPoints: [
          'Tensors: The core data structure, similar to NumPy arrays',
          'nn.Module: The base class for all neural network building blocks',
          'DataLoader: Efficiently feeding chunks (batches) of data to the model',
          'CUDA: Moving your code to the GPU for 50x speed gains',
        ],
        codeExample: {
          language: 'python',
          code: `import torch

# Create a tensor and enable automatic math
x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
y = x.pow(2).sum()
y.backward()
print(x.grad) # Prints gradients automatically!`,
        },
      },
    ],
  },
  't4_4': {
    topicId: 't4_4',
    lessons: [
      {
        title: 'CNNs (Computer Vision)',
        noobDefinition: 'A CNN is like a "Detective looking for clues". The first layer looks for tiny edges, the second looks for shapes (circles, squares), and the final layers look for objects (wheels, doors, cars).',
        realWorldExample: 'How your phone recognizes your face. It starts by finding the contrast of your eyes/nose and builds up to your full face structure.',
        content: `Convolutional Neural Networks (CNNs) are the kings of Image Recognition. They use **Filters** (kernels) that slide over an image to detect specific patterns regardless of where they appear.`,
        keyPoints: [
          'Convolution: Sliding filters to extract features',
          'Pooling: Shrinking the image to focus on the important parts',
          'Stride & Padding: Controlling how the filter moves',
          'ResNet: A famous "Deep" CNN architecture used everywhere',
        ],
        codeExample: {
          language: 'python',
          code: `import torch.nn as nn

model = nn.Sequential(
    nn.Conv2d(3, 16, kernel_size=3), # 3 color channels (RGB)
    nn.MaxPool2d(2),
    nn.Flatten(),
    nn.Linear(16 * 14 * 14, 10) # 10 classes
)`,
        },
      },
    ],
  },
  't4_6': {
    topicId: 't4_6',
    lessons: [
      {
        title: 'Transformers & Attention',
        noobDefinition: 'Attention is like "Reading a Sentence and highlighting the important words". In the sentence "The animal didn\'t cross the street because IT was too tired", Attention helps the AI know that "IT" refers to "Animal", not "Street".',
        realWorldExample: 'Google Translate. Instead of translating one word at a time, it looks at the whole paragraph and gives the most relevant meaning based on the context.',
        content: `Transformers are the architecture behind ChatGPT (GPT stands for Generative Pre-trained **Transformer**).
        
The breakthrough was the **Self-Attention** mechanism, which allows the model to process all parts of a sequence simultaneously rather than one-by-one, making it incredibly fast and smart.`,
        keyPoints: [
          'Self-Attention: Weighing the importance of different parts of the input',
          'Positional Encoding: Telling the model where words are in a sentence',
          'Multi-Head Attention: Looking at the same data from different "perspectives"',
          'Encoder-Decoder: Initial architecture for translation (now mostly Decoder-only for LLMs)',
        ],
        codeExample: {
          language: 'python',
          code: `from transformers import pipeline

# Use a pre-trained Transformer with 2 lines
summarizer = pipeline("summarization")
result = summarizer("The long text goes here...", max_length=50)`,
        },
      },
    ],
  },
};
