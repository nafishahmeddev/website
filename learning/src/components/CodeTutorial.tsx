interface CodeTutorialProps {
  language: 'python' | 'javascript' | 'javascript-jsx';
  title: string;
  description: string;
  code: string;
}

export function CodeTutorial({ language, title, description, code }: CodeTutorialProps) {
  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case 'python':
        return '#3776ab';
      case 'javascript':
      case 'javascript-jsx':
        return '#f1e05a';
      default:
        return '#00ff9d';
    }
  };

  return (
    <div className="my-8">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>{description}</p>

      <div
        style={{
          background: '#0a0a0f',
          border: `1px solid var(--border)`,
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'var(--bg3)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <span className="mono text-xs" style={{ color: getLanguageColor(language) }}>
            {language}
          </span>
          <button
            style={{
              background: `${getLanguageColor(language)}20`,
              color: getLanguageColor(language),
              border: `1px solid ${getLanguageColor(language)}40`,
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
              fontFamily: 'Space Mono, monospace',
            }}
          >
            Copy
          </button>
        </div>

        {/* Code */}
        <pre
          style={{
            padding: '16px',
            margin: '0',
            overflow: 'auto',
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#e8e8f0',
            fontFamily: 'Space Mono, monospace',
          }}
        >
          <code>{code}</code>
        </pre>
      </div>

      {/* Explanation */}
      <div
        style={{
          marginTop: '12px',
          padding: '12px',
          background: `${getLanguageColor(language)}10`,
          border: `1px solid ${getLanguageColor(language)}20`,
          borderRadius: '6px',
          fontSize: '13px',
          color: 'var(--text)',
        }}
      >
        <p>💡 This example demonstrates key concepts in this topic. Try modifying the code and see how it behaves!</p>
      </div>
    </div>
  );
}
