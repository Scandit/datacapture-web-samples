export type ListenerForEvent<T extends keyof HTMLElementEventMap> = (
	event: HTMLElementEventMap[T],
) => void;
