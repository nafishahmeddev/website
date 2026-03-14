import { TutorialContent, type Lesson } from '../../../components/TutorialContent';
import { PHASES } from '../../../data/roadmap';

export default function Overview() {
  const color = PHASES[0].color;
  const lessons: Lesson[] = [
    {
      id: 'overview',
      title: 'Module Overview',
      noobDefinition: "This is the 'table of contents' for your Python journey. It shows you everything you'll learn and why it matters.",
      realWorldExample: 'Like checking the map before a road trip, the overview prepares you for the landmarks ahead.',
      content: `Welcome to the **Python for ML** module. Python is the lingua franca of artificial intelligence and data science. In this module, we'll bridge your JavaScript knowledge to Python, focusing on the core syntax and specialized features that make it so powerful for machine learning.

**What we'll cover:**
1. **Basics from JS**: Mapping your existing knowledge.
2. **Data Collections**: Master Lists, Dicts, and Sets.
3. **Comprehensions**: The "Pythonic" way to process data.
4. **Lambdas**: Functional programming for data pipelines.
5. **Modules**: Organizing your research code.`,
      keyPoints: [
        'Python is indentation-based (no curly braces)',
        'Rich standard library for scientific computing',
        'High-level, readable syntax',
      ],
    }
  ];

  return (
    <TutorialContent 
      color={color} 
      lessons={lessons} 
      activeLesson={0} 
      onActiveLessonChange={() => {}}
    />
  );
}
