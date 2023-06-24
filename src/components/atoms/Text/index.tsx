type TextType = {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};

export function Title({ children, size = "md" }: TextType) {
  const style = `text-${size} text-black font-semibold dark:text-white`;

  return <h1 className={style}>{children}</h1>;
}

export function Subtitle({ children, size = "md" }: TextType) {
  return (
    <h2 className={`text-${size} text-black dark:text-white`}>{children}</h2>
  );
}
