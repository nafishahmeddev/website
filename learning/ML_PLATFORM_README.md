# AI/ML Learning Website

A comprehensive ReactJS-based machine learning educational platform with an interactive roadmap, progress tracking, and detailed learning materials.

## Features

✨ **Interactive Roadmap**
- 5 progressive phases covering ML fundamentals to deployment
- 34 total topics organized hierarchically
- Expandable/collapsible phase sections

📊 **Progress Tracking**
- Real-time progress visualization with animated progress rings
- Per-phase completion metrics
- Overall progress bar with percentage tracking
- All progress saved to localStorage

🎯 **Topic Details**
- In-depth learning materials for each topic
- Key concepts and learning paths
- Code examples and tutorials
- Resource links and references

🎨 **Modern UI Design**
- Dark theme with cyberpunk aesthetic
- Smooth animations and transitions
- Responsive grid layout
- UnoCSS for utility-first styling

📱 **Responsive Design**
- Desktop, tablet, and mobile optimized
- Grid layout that adapts to screen size
- Touch-friendly interactive elements

## Project Structure

```
src/
├── components/
│   ├── Roadmap.tsx              # Main roadmap component with routing
│   ├── PhaseBlock.tsx           # Phase container with topic list
│   ├── TopicCard.tsx            # Individual topic card
│   ├── TopicDetail.tsx          # Topic detail page
│   ├── ProgressBar.tsx          # Overall progress visualization
│   ├── CodeTutorial.tsx         # Code example display
│   ├── InteractiveVisualizer.tsx # SVG-based visualizations
│   └── icons/
│       └── ChevronDownIcon.tsx  # Icon components
├── data/
│   └── roadmap.ts               # Complete roadmap data structure
├── App.tsx                       # Main app component
├── main.tsx                      # Entry point
└── global.css                    # Global styles and animations
```

## Roadmap Structure

### Phase 01: Math & Python Foundations (7 topics)
- Python for JS Devs
- NumPy Arrays
- Pandas DataFrames
- Matplotlib / Seaborn
- Linear Algebra Intuition
- Calculus — Derivatives
- Probability & Statistics

### Phase 02: Core ML Concepts (7 topics)
- Supervised vs Unsupervised
- Loss Functions
- Gradient Descent
- Overfitting & Regularisation
- Train / Val / Test Split
- Feature Engineering
- scikit-learn API

### Phase 03: Classical Algorithms (6 topics)
- Linear & Logistic Regression
- Decision Trees
- Random Forests
- Gradient Boosting / XGBoost
- K-Means Clustering
- PCA / Dimensionality Reduction

### Phase 04: Neural Networks & Deep Learning (7 topics)
- Perceptron & MLP
- Backpropagation
- PyTorch Fundamentals
- CNNs — Convolutional Nets
- RNNs & LSTMs
- Transformers & Attention
- Transfer Learning & Fine-tuning

### Phase 05: MLOps & Deployment (7 topics)
- Evaluation Metrics
- Experiment Tracking
- FastAPI Model Serving
- Docker for ML
- Hugging Face Ecosystem
- LLM APIs & RAG
- Cloud ML (AWS / GCP)

## Component Documentation

### Roadmap Component
Main component managing state and routing between roadmap view and topic detail view.

**Features:**
- Progress state management with localStorage persistence
- Collapsible phase sections
- Navigation between list and detail views
- Reset progress functionality

### PhaseBlock Component
Container for displaying a single phase with all its topics.

**Props:**
- `phase: Phase` - Phase data
- `completed: Set<string>` - Completed topic IDs
- `collapsed: Set<string>` - Collapsed phase IDs
- `onToggleTopic: (topicId: string) => void` - Topic completion toggle
- `onTogglePhase: (phaseId: string) => void` - Phase collapse toggle
- `onViewTopic: (topicId: string) => void` - Navigate to topic detail

### TopicCard Component
Visual card for individual topics with completion checkbox.

**Features:**
- Shows topic title, description, and metadata
- Difficulty indicator with color coding
- Tag-based categorization
- Click to view details, checkbox to toggle completion

### TopicDetail Component
Detailed view of a single topic with learning materials.

**Includes:**
- Overview section
- Key concepts list
- Learning path progression
- Resource links
- Practice exercise section

### ProgressBar Component
Overall progress visualization with phase rings.

**Features:**
- Master progress bar with shimmer animation
- Mini progress rings for each phase
- Percentage indicators
- Live update on topic completion

### CodeTutorial Component
Code example display with syntax highlighting.

**Supported Languages:**
- Python
- JavaScript
- JSX

### InteractiveVisualizer Component
SVG-based interactive visualizations for concepts.

**Visualization Types:**
- Gradient descent (loss landscape)
- Neural network architecture
- Matrix multiplication
- Future: Loss landscape, distributions, etc.

## Styling System

### UnoCSS Configuration
The project uses UnoCSS for utility-first styling with custom theme:

**Colors:**
- `--accent: #00ff9d` (Primary green)
- `--accent2: #ff6b35` (Secondary orange)
- `--bg: #0a0a0f` (Dark background)
- `--bg-2: #111118` (Secondary background)
- `--bg-3: #1a1a24` (Tertiary background)
- `--border: rgba(255,255,255,0.07)` (Border color)
- `--text: #e8e8f0` (Main text)
- `--muted: #6b6b80` (Muted text)

**Phase Colors:**
- Phase 1: `#00ff9d` (Accent green)
- Phase 2: `#00ccff` (Cyan)
- Phase 3: `#ffbe00` (Yellow)
- Phase 4: `#b855ff` (Purple)
- Phase 5: `#ff6b35` (Orange)

### Animations
- `fadeUp` - Content fade-in animation
- `blobFloat` - Floating background animation
- `scan` - Scanning line effect on badges
- `shimmer` - Shimmer effect on progress bars

## Data Structure

### Topic Interface
```typescript
interface Topic {
  id: string;
  title: string;
  desc: string;
  diff: 1 | 2 | 3 | 4;
  tag: 'lang' | 'lib' | 'math' | 'concept' | 'algo' | 'skill' | 'arch' | 'tool' | 'deploy' | 'llm';
  subtopics?: string[];
  resources?: { title: string; url: string; type: string }[];
}
```

### Phase Interface
```typescript
interface Phase {
  id: string;
  title: string;
  label: string;
  duration: string;
  color: string;
  icon: string;
  desc: string;
  topics: Topic[];
}
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Server runs at `http://localhost:5175`

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Local Storage

Progress data is automatically saved to localStorage with these keys:
- `ml-roadmap-v2` - Completed topic IDs
- `ml-collapsed` - Collapsed phase IDs

Reset progress with the "reset progress" button in the footer.

## Extending the Roadmap

To add new topics:

1. Add topic to `src/data/roadmap.ts` in the appropriate phase
2. Include subtopics, resources, and descriptions
3. Component will automatically render the new topic

To add visualization types:

1. Add new case to `InteractiveVisualizer` component
2. Create SVG or canvas visualization
3. Update visualization type enum

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **UnoCSS** - Utility-first CSS
- **localStorage API** - State persistence

## Performance Optimizations

- `useCallback` for event handler memoization
- `useState` with initializer functions for lazy initialization
- No unnecessary re-renders
- CSS animations with GPU acceleration
- Efficient SVG rendering for visualizations

## Future Enhancements

- 🔧 Interactive code editor for exercises
- 📚 Quiz and assessment system
- 👥 Community features and discussion
- 🎓 Certificates and achievements
- 🎬 Embedded video tutorials
- 📊 Advanced analytics and dashboards
- 🔍 Search and filtering
- 📲 Mobile app version
- 🌍 Multi-language support

## Resources

- [ML Roadmap Reference](./ml.html)
- [UnoCSS Documentation](https://unocss.dev)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## License

This project is part of a personal learning platform for machine learning education.
