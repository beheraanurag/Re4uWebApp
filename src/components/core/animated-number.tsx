"use client";

interface AnimatedNumberProps {
  value: number;
  className?: string;
  springOptions?: { bounce?: number; duration?: number };
}

export function AnimatedNumber({
  value,
  className,
}: AnimatedNumberProps) {
  return (
    <span className={className}>{value.toLocaleString()}</span>
  );
}
