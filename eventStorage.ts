import { EventSubscriber } from './subscriber';

type eventStorage = Map<string | Symbol, EventSubscriber[]>;

class EventStorage {
  static instance: EventStorage;
  private storage: eventStorage;

  private constructor() {
    this.storage = new Map<string | Symbol, EventSubscriber[]>();
  }

  public static getInstance(): EventStorage {
    if (!EventStorage.instance) {
      EventStorage.instance = new EventStorage();
    }
    return EventStorage.instance;
  }

  addSubscriber(eventName: string | Symbol, subscriber: EventSubscriber): void {
    if (!this.storage.has(eventName)) {
      this.storage.set(eventName, []);
    }
    this.storage.get(eventName)?.push(subscriber);
  }
  // Надо отдебажить
  deleteSubscriber(
    eventName: string | Symbol,
    subscriber: EventSubscriber
  ): boolean {
    const newSubscriberList = this.storage
      .get(eventName)
      ?.filter((sub) => sub.id !== subscriber.id);
    if (!newSubscriberList) {
      throw new Error('Storage undefined error???');
    }
    this.storage.set(eventName, newSubscriberList);
    return true;
  }

  notifySubscribers(eventName: string | Symbol, payload?: any): void {
    const eventSubscribers = this.storage.get(eventName);
    if (eventSubscribers?.length === 0) {
      this.storage.delete(eventName);
      throw new Error('Event storage is empty');
    }
    eventSubscribers?.forEach((sub) => sub.callEvent(payload));
  }
}

const eventStorage = EventStorage.getInstance();

export { eventStorage };
