const Paragraph = ({ children, theme='dark', justify='center' }) => {
  const themeClass = theme === 'dark' ? 'text-paragraph-color' : 'text-paragraph-light-color';
  return <p className={`${themeClass} text-p-size text-${justify}`}>{children}</p>;
}

export default Paragraph;