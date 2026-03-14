import type { TopicTutorial } from './phase1';

export const phase4Tutorials: Record<string, TopicTutorial> = {
  't4_1': {
    topicId: 't4_1',
    lessons: [
      {
        title: 'Neural Networks (Multi-Layer Perceptron)',
        noobDefinition: 'A Neural Network is like a "Chain of Committees". The first committee looks at the raw data and finds tiny patterns. They pass their notes to the second committee, which finds bigger patterns, and so on until the final committee makes the decision.',
        realWorldExample: 'A system recognizing a handwriting digit "8". Layer 1 finds small lines. Layer 2 finds circles. Layer 3 realizes two circles together make an "8".',
        content: `Neural Networks are sets of layers that transform data.

### The Anatomy:
1. **Input Layer**: Where the data enters (e.g., 784 pixels of an image).
2. **Hidden Layers**: Where the "Magic" happens. Each layer builds on the previous one's findings.
3. **Output Layer**: The final prediction (e.g., "This is an 8").

### The Math: Weights & Biases
Every connection between layers has a **Weight**. This is a number that tells the AI how important that specific signal is. The AI learns by adjusting these millions of weights.`,
        vizType: 'neural-network',
        keyPoints: [
          'Layers can find non-linear patterns that regular math can\'t',
          'Deep Learning just means a network with MANY hidden layers',
          'Activation functions (like ReLU) act as a "switch" for the neurons',
        ],
        codeExample: {
          language: 'python',
          code: `import torch.nn as nn

# A simple 3-layer neural network in PyTorch
model = nn.Sequential(
    nn.Linear(784, 128), # Input (784) -> Hidden (128)
    nn.ReLU(),           # Activation Function
    nn.Linear(128, 10)   # Hidden (128) -> Output (10 classes)
)`,
        },
      },
    ],
  },
  't4_2': {
    topicId: 't4_2',
    lessons: [
      {
        title: 'Backpropagation (The Learning Loop)',
        noobDefinition: 'Backprop is how the AI "Checks its Homework". It looks at the mistake it made at the end, and then "goes backwards" through the network to blame and fix exactly which part was responsible for the error.',
        realWorldExample: 'A chef tasting an over-salted soup. They don\'t just throw it away; they trace back and realize: "Ah, the intern who added the broth used the wrong salt bag." They fix that specific step next time.',
        content: `How does a network with 1 billion weights actually learn? **Backpropagation**.

### The Flow:
1. **Forward Pass**: Data goes Input -> Output. A prediction is made.
2. **Calculate Loss**: How far off was the prediction? (e.g., predicted 7, actual was 8).
3. **Backward Pass**: We calculate the "Gradient" (the blame) for every single weight, starting from the last layer and going back to the first.
4. **Update**: We slightly nudge every weight in the "Correct" direction.`,
        vizType: 'backprop',
        keyPoints: [
          'Backprop is just the "Chain Rule" from Calculus applied to networks',
          'It is why networks can learn from hundreds of millions of examples',
          'Optimization (like SGD or Adam) is the tool that applies these fixes',
        ],
        codeExample: {
          language: 'python',
          code: `# PyTorch handles backprop automatically!
loss.backward()  # Calculates the "blame" (gradients)
optimizer.step()  # Moves weights in the correct direction`,
        },
      },
    ],
  },
  't4_4': {
    topicId: 't4_4',
    lessons: [
      {
        title: 'CNNs (The Eyes of AI)',
        noobDefinition: 'A Convolutional Neural Network (CNN) is like a detective with a magnifying glass. It slides the glass over every square inch of an image, looking for specific "clues" like vertical lines, corners, or textures.',
        realWorldExample: 'Your phone camera finding faces in a group photo. It looks for the specific patterns of eyes, noses, and mouths.',
        content: `CNNs are specialized for images. Instead of seeing an image as one giant list of numbers, they see it in **Chunks**.

### The Convolution Layer
A small matrix (called a **Filter**) slides over the image. It does math on a 3x3 or 5x5 area and "highlights" features.
- If the filter is for "Edges", the output will show only the edges.
- If the filter is for "Curves", only curves will be highlighted.

By stacking these filters, the model can eventually "see" complex objects like cars or faces.`,
        vizType: 'cnn-conv',
        keyPoints: [
          'Invariance: CNNs can find a dog even if it\'s in the corner of the photo',
          'Pooling: Shorthand for "Shrinking" the image to focus on important parts',
          'CNNs are the tech behind Self-Driving cars and medical imaging',
        ],
        codeExample: {
          language: 'python',
          code: `import torch.nn as nn

# A simple Image-Processing layer
conv_layer = nn.Conv2d(
    in_channels=3,  # RGB Color
    out_channels=16, # Search for 16 different clues
    kernel_size=3   # Look at 3x3 pixel areas
)`,
        },
      },
    ],
  },
  't4_6': {
    topicId: 't4_6',
    lessons: [
      {
        title: 'Transformers & ChatGPT',
        noobDefinition: 'Transformers are the "Super-Readers" of AI. Instead of reading a sentence word-by-word (like humans), they see the whole book at once and use "Attention" to focus on the most important words that give a sentence its meaning.',
        realWorldExample: 'In the sentence: "The boy went to the park because he was bored," the word "he" refers to "boy". Attention is the mechanism that tells the AI to link those two words together.',
        content: `Transformers are the architecture that changed everything. They power Siri, Claude, Gemini, and ChatGPT.

### Self-Attention: The Secret Sauce
Before Transformers, AI processed text in a line (RNNs). They often "forgot" the beginning of a long sentence.
Transformers solve this with **Self-Attention**. Every word in a sentence "looks" at every other word and decides: "How relevant is this word to me right now?"

### Parallelism
Because Transformers see the whole sentence at once, we can train them on the entire Internet at the same time using thousands of GPUs.`,
        vizType: 'attention-heatmap',
        keyPoints: [
          'Attention: Focusing on the most relevant parts of the input',
          'GPT stands for Generative Pre-trained Transformer',
          'Transformers are now being used for Images and Sound too!',
        ],
        codeExample: {
          language: 'python',
          code: `from transformers import pipeline

# Use a state-of-the-art model in 2 lines!
translator = pipeline("translation_en_to_fr")
print(translator("AI is amazing!")) # "L'IA est incroyable!"`,
        },
      },
    ],
  },
};
