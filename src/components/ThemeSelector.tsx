import { useTheme, themes, type Theme } from '../hooks/useTheme';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="relative inline-block">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="px-2 py-1 text-sm rounded transition-colors cursor-pointer outline-none border"
        style={{
          backgroundColor: 'var(--color-ui-bg)',
          color: 'var(--color-ui-text)',
          borderColor: 'var(--color-border)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg-hover)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ui-bg)'}
        title="Cambiar tema"
      >
        {Object.entries(themes).map(([key, { name }]) => (
          <option key={key} value={key} style={{ backgroundColor: 'var(--color-ui-bg)', color: 'var(--color-ui-text)' }}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
