export class Deferred<T> {
  public promise: Promise<T>;

  public resolve: (value: T) => void;

  public reject: (reason: unknown) => void;

  public constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}
