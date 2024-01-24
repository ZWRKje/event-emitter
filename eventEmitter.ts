import { eventStorage } from './eventStorage';
import { EventSubscriber } from './subscriber';

class MyEventEmitter {
  private static instance: MyEventEmitter;

  private constructor() {}

  public static getInstance(): MyEventEmitter {
    if (!MyEventEmitter.instance) {
      MyEventEmitter.instance = new MyEventEmitter();
    }
    return MyEventEmitter.instance;
  }

  on(
    eventName: string | Symbol,
    callback: (payload?: any) => void
  ): () => void {
    const newSubscriber = new EventSubscriber(callback);
    eventStorage.addSubscriber(eventName, newSubscriber);

    return () => {
      const res = eventStorage.deleteSubscriber(eventName, newSubscriber);
      if (!res) {
        throw new Error('Cannot delete subscriber');
      }
    };
  }

  emit(eventName: string | Symbol, payload?: any): void {
    eventStorage.notifySubscribers(eventName, payload);
  }
}

const myEventEmitter = MyEventEmitter.getInstance();

export { myEventEmitter };
