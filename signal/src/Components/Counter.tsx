import { signal, computed } from "@preact/signals-react";

export function Counter() {
  const count = signal(0);
  const double = computed(() => count.value * 2);
  
  return (
    <button onClick={() => count.value++}>
      <>{count} x 2 = {double}</>
    </button>
  );
}