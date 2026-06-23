type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let _id = 0;
const listeners: Array<(toasts: ToastItem[]) => void> = [];
let _toasts: ToastItem[] = [];

function notify() {
  for (const fn of listeners) fn([..._toasts]);
}

function add(message: string, type: ToastType, duration = 3000) {
  const id = ++_id;
  _toasts = [..._toasts, { id, message, type }];
  notify();
  if (duration > 0) setTimeout(() => remove(id), duration);
}

function remove(id: number) {
  _toasts = _toasts.filter((t) => t.id !== id);
  notify();
}

export const toast = {
  success(msg: string) { add(msg, "success"); },
  error(msg: string) { add(msg, "error", 5000); },
  warning(msg: string) { add(msg, "warning"); },
  info(msg: string) { add(msg, "info"); },
};

export function subscribe(fn: (toasts: ToastItem[]) => void) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i >= 0) listeners.splice(i, 1);
  };
}

export function dismiss(id: number) { remove(id); }
