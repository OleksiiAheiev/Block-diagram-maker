export default function getColorForLevel(level: number, colors: string[]): string {
  const index = level % colors.length;
  return colors[index];
}