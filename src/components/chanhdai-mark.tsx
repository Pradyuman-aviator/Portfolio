export function PTMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 384"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontStyle="italic"
        fontSize="280"
        letterSpacing="-0.05em"
      >
        Ps
      </text>
    </svg>
  );
}

export function getMarkSVG(color: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 512 384"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" fill="${color}" font-family="Georgia, serif" font-weight="bold" font-style="italic" font-size="280" letter-spacing="-0.05em">Ps</text></svg>`;
}
