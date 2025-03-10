const Paragraph = ({ children, theme = "dark", justify = "justify" }) => {
  const themeClass =
    theme === "dark" ? "text-paragraph-color" : "text-paragraph-light-color";
  return (
    <p
      className={`${themeClass} text-p-size text-${justify}`}
      style={{
        fontFamily: "Montserrat, sans-serif",
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {children}
    </p>
  );
};

export default Paragraph;
