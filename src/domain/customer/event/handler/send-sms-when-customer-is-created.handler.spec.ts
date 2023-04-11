import CustomerCreatedEvent from "../customer-created.event";
import SendSmsWhenCustomerIsCreatedHandler from "./send-sms-when-customer-is-created.handler";

describe("SendSmsWhenCustomerIsCreatedHandler", () => {
  it("should display console log on handle", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    const event = new CustomerCreatedEvent({
      id: "123",
      name: "Customer name",
      email: "someEmail@gmail.com",
    });
    const handler = new SendSmsWhenCustomerIsCreatedHandler();
    handler.handle(event);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
  });
});
