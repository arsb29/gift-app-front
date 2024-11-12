import Star from "@/assets/star.svg?react";
import { randomInteger } from "@/helpers/randomInteger.ts";
import { pointsOnCircle } from "@/helpers/pointsOnCircle.ts";
import styles from "./Star.module.css";
import { useEffect, useState } from "react";

const COLORS: Record<number, string> = {
  1: "#FF9044",
  2: "#FEBF05",
  3: "#FECC13",
} as const;

const stars = Array.from({ length: 400 }).map((_, index) => {
  const [x, y] = pointsOnCircle({
    radius: randomInteger(100, 200),
    angle: randomInteger(0, 360),
  });
  const iconSize = randomInteger(6, 10);
  return (
    <Star
      className={styles.star}
      key={index}
      style={{
        animationDelay: `${index * 0.01}s`,
        transform: `translate(${x}px, ${y}px)`,
        color: COLORS[randomInteger(1, 3)],
        height: `${iconSize}px`,
        width: `${iconSize}px`,
      }}
    />
  );
});

export function Stars() {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRendered(true);
    }, 500);
  }, []);
  if (!rendered) return null;
  return stars;
}
