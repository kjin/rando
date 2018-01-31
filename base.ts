export interface CLS_AH {
  /**
   * Gets an object that is specific to the currently executing continuation.
   */
  readonly context: {};

  /**
   * An object that, when passed as x to async_hooks.createHook(x).enable(),
   * enables the trace context propagation mechanism necessary to make the
   * other functions work.
   */
  readonly asyncHook: {
    init: (uid: number, type: string) => void;
    before: (uid: number) => void;
    after: (uid: number) => void;
    destroy: (uid: number) => void;
  };

  /**
   * Runs a function with a new context.
   */
  runInNewContext<T>(fn: () => T): T;

  /**
   * Accepts a function and returns a wrapped version of the function that has
   * the same context as the one in which bind was called.
   */
  bindInCurrentContext<T>(fn: (...args: any[]) => T): (...args: any[]) => T;
}
