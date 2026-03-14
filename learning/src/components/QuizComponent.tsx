import { useState } from 'react';

export interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizComponentProps {
  quizzes: Quiz[];
  color: string;
}

export function QuizComponent({ quizzes, color }: QuizComponentProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const quiz = quizzes[currentIdx];

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    setShowExplanation(true);
    if (idx === quiz.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizzes.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIdx(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const percentage = Math.round((score / quizzes.length) * 100);
    return (
      <div
        className="p-8 rounded-lg text-center"
        style={{ background: 'var(--bg2)', border: `1px solid ${color}30` }}
      >
        <h3 className="text-3xl font-bold mb-2">Quiz Complete! 🎉</h3>
        <div
          className="text-5xl font-bold mb-4"
          style={{ color }}
        >
          {percentage}%
        </div>
        <p className="mb-2">
          You scored {score} out of {quizzes.length} questions correctly.
        </p>
        <button
          onClick={handleRetry}
          className="mt-4 px-6 py-2 rounded-lg font-semibold transition-all"
          style={{
            background: `${color}20`,
            color: color,
            border: `1px solid ${color}40`,
          }}
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="mono text-sm" style={{ color }}>
            Question {currentIdx + 1} of {quizzes.length}
          </span>
          <span className="text-sm" style={{ color: 'var(--muted)' }}>
            Score: {score}
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full"
          style={{ background: 'var(--bg3)' }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${((currentIdx + 1) / quizzes.length) * 100}%`,
              background: `linear-gradient(90deg, ${color}, #00ccff)`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div
        className="p-6 rounded-lg mb-6"
        style={{ background: 'var(--bg2)', border: `1px solid var(--border)` }}
      >
        <h3 className="text-lg font-bold mb-6">{quiz.question}</h3>

        {/* Options */}
        <div className="space-y-3">
          {quiz.options.map((option, idx) => {
            const isCorrect = idx === quiz.correct;
            const isSelected = selected === idx;
            let optionStyle = {
              background: 'var(--bg3)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
              cursor: selected === null ? 'pointer' : 'default',
            };

            if (selected !== null && isSelected) {
              if (isCorrect) {
                optionStyle = {
                  background: '#00ff9d20',
                  borderColor: '#00ff9d',
                  color: '#00ff9d',
                  cursor: 'default',
                };
              } else {
                optionStyle = {
                  background: '#ff6b3520',
                  borderColor: '#ff6b35',
                  color: '#ff6b35',
                  cursor: 'default',
                };
              }
            } else if (selected !== null && isCorrect && !isSelected) {
              optionStyle = {
                background: '#00ff9d20',
                borderColor: '#00ff9d',
                color: '#00ff9d',
                cursor: 'default',
              };
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className="w-full p-4 rounded-lg border-2 transition-all text-left"
                style={optionStyle}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm"
                    style={{
                      background: selected === null ? `${color}20` : 'currentColor',
                      opacity: selected === null ? 0.5 : 1,
                    }}
                  >
                    {selected === idx && isCorrect && '✓'}
                    {selected === idx && !isCorrect && '✗'}
                    {selected === null && String.fromCharCode(65 + idx)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className="mt-6 p-4 rounded-lg"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}30`,
              color: 'var(--text)',
            }}
          >
            <p className="font-semibold mb-2">Explanation:</p>
            <p>{quiz.explanation}</p>
          </div>
        )}
      </div>

      {/* Next Button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg font-semibold transition-all"
          style={{
            background: `${color}20`,
            color: color,
            border: `1px solid ${color}40`,
          }}
        >
          {currentIdx === quizzes.length - 1 ? 'Complete Quiz' : 'Next Question'} →
        </button>
      )}
    </div>
  );
}
