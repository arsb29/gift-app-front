type Options = {
  radius: number;
  angle: number;
};

export function pointsOnCircle({ radius, angle }: Options) {
  angle = angle * (Math.PI / 180); // Convert from Degrees to Radians
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return [x, y];
}
