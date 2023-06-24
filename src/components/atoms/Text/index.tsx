type TextType = {
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};

export function Title({ children, size = "md" }: TextType) {
  return (
    <h1 className={`text-${size} text-black font-semibold`}>{children}</h1>
  );
}

export function Paragraph({ children, size = "md" }: TextType) {
  return <p className={`text-${size} text-gray-500 `}>{children}</p>;
}

export function Subtitle({ children, size = "md" }: TextType) {
  return <h2 className={`text-${size} text-black`}>{children}</h2>;
}
