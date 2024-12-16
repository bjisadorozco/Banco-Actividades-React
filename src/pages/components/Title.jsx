const Title = ({ children, theme='dark' }) => {
  const themeClass = theme === 'dark' ? 'text-white' : 'text-secondary-color';
  return <h1 className={`${themeClass} text-title-size font-bold`}>{children}</h1>;
}

export default Title;