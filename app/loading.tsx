import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 py-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
}
