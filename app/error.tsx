"use client";

import ErrorState from "@/components/ErrorState";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorState message="Không thể tải trang. Vui lòng thử lại." onRetry={reset} />;
}
