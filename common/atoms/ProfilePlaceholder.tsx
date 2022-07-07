const hashStringToHue = (str: string) => {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return (hash + 2147483648) % 256;
};

export const ProfilePlaceholder = ({
  size,
  value,
  className,
}: React.PropsWithoutRef<{
  size: number;
  value: string;
  className?: string;
}>) => {
  return (
    <span
      className={className}
      css={{
        width: size,
        height: size,
        borderRadius: size,
        overflow: "hidden",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        preserveAspectRatio="xMinYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect
          width="64"
          height="64"
          fill={`hsl(${hashStringToHue(value)}, 100%, 90%)`}
        />
        <text
          x="50%"
          y="55%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="32"
          fontWeight="600"
          fill="black"
        >
          {value[0]?.toLocaleUpperCase()}
        </text>
      </svg>
    </span>
  );
};
