import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default interface EventDispatcherInterface<
  T extends EventInterface = EventInterface
> {
  notify(event: T): void;
  register(eventName: string, handler: EventHandlerInterface<T>): void;
  unregister(eventName: string, handler: EventHandlerInterface<T>): void;
  unregisterAll(): void;
}
