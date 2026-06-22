export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-[var(--color-border)] ${className || "h-24 w-full"}`} />
  );
}
