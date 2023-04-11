import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("event", eventHandler);
    expect(eventDispatcher.getEventHandlers).toEqual({
      event: [eventHandler],
    });
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("event", eventHandler);
    expect(eventDispatcher.getEventHandlers).toEqual({
      event: [eventHandler],
    });
    eventDispatcher.unregister("event", eventHandler);
    expect(eventDispatcher.getEventHandlers).toEqual({
      event: [],
    });
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register("event", eventHandler);
    expect(eventDispatcher.getEventHandlers).toEqual({
      event: [eventHandler],
    });
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers).toEqual({});
  });

  it("should notify an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyHandle = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers).toEqual({
      ProductCreatedEvent: [eventHandler],
    });

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product name",
      description: "Product description",
      price: 100,
    });
    eventDispatcher.notify(productCreatedEvent);

    expect(spyHandle).toHaveBeenCalled();
  });
});
