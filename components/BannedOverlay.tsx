export default function BannedOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)] p-4">
      <div className="text-center">
        <span className="text-5xl">🚫</span>
        <h1 className="mt-4 text-xl font-bold text-[var(--color-danger)]">
          Tài khoản của bạn đã bị cấm truy cập
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          Nếu bạn cho rằng đây là nhầm lẫn, vui lòng liên hệ quản trị viên.
        </p>
      </div>
    </div>
  );
}
