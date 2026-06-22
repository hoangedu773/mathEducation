interface Props {
  icon?: string;
  message: string;
}

export default function EmptyState({ icon = "📭", message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-[var(--color-text-secondary)]">
      <span className="text-4xl">{icon}</span>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
}
