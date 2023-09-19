import { Action, createHashHistory, type Update } from "history";
import type { HistorySource } from "svelte-navigator";

export type HistoryNavigationListener = (location: Update) => Promise<void> | void;

export function createHashHistorySource(): HistorySource {
  const history = createHashHistory();
  let listeners: HistoryNavigationListener[] = [];

  history.listen((location) => {
    if (history.action !== Action.Pop) {
      return;
    }

    for (const listener of listeners) {
      void listener(location);
    }
  });

  return {
    history: {
      get state() {
        return history.location.state as object;
      },
      go(to: number) {
        history.go(to);
      },
      pushState(state: object, _: string, uri: string) {
        history.push(uri, state);
      },
      replaceState(state: object, _: string, uri: string) {
        history.replace(uri, state);
      },
    },
    get location() {
      return history.location as unknown as Location;
    },
    addEventListener(_: "popstate", handler: HistoryNavigationListener) {
      listeners.push(handler);
    },
    removeEventListener(_: "popstate", handler: HistoryNavigationListener) {
      listeners = listeners.filter((callback) => callback !== handler);
    },
  };
}
