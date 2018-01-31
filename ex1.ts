import { CLS_AH } from './base';

class CLS_AH_220 implements CLS_AH {
  static NO_CONTEXT = -1;
  private contexts: { [uid: number]: {} } = { [CLS_AH_220.NO_CONTEXT]: {} };
  private currentUid: number = CLS_AH_220.NO_CONTEXT;

  get context() {
    return this.contexts[this.currentUid];
  }
  
  get asyncHook() {
    return {
      init: (uid: number, type: string) => {
        this.contexts[uid] = this.contexts[this.currentUid];
      },
      before: (uid: number) => {
        this.currentUid = uid;
      },
      after: () => {},
      destroy: (uid: number) => {
        delete this.contexts[uid];
      }
    };
  }

  runInNewContext<T>(fn: () => T): T {
    const oldContext = this.contexts[this.currentUid];
    this.contexts[this.currentUid] = {};
    const result = fn();
    this.contexts[this.currentUid] = oldContext;
    return result;
  }

  bindInCurrentContext<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
    const boundContext = this.contexts[this.currentUid];
    return (...args) => {
      const oldContext = this.contexts[this.currentUid];
      this.contexts[this.currentUid] = boundContext;
      const result = fn(...args);
      this.contexts[this.currentUid] = oldContext;
      return result;
    }
  }
}
