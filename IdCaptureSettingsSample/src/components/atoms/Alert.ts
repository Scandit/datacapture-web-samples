import { modalStore } from "@/settings/id-capture/store";
import { Deferred } from "@/Deferred";

let currentAlertDeferred: Deferred<void> | null = null;
export async function showAlert(title: string, content: string): Promise<void> {
  // resolve previous modal promise, if any
  currentAlertDeferred?.resolve();

  modalStore.set({
    title,
    content,
  });

  currentAlertDeferred = new Deferred();
  const unsubscribe = modalStore.subscribe((value) => {
    if (value == null) {
      currentAlertDeferred?.resolve();
      currentAlertDeferred = null;
      unsubscribe();
    }
  });

  return currentAlertDeferred.promise;
}

export function closeAlert(): void {
  modalStore.set(null);
}
