import CustomerCreatedEvent from "../customer-created.event";
import SendEmailWhenCustomerIsCreatedHandler from "./send-email-when-customer-is-created.handler";

describe("SendEmailWhenCustomerIsCreatedHandler", () => {
  it("should display console log on handle", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    const event = new CustomerCreatedEvent({
      id: "123",
      name: "Customer name",
      email: "someEmail@gmail.com",
    });
    const handler = new SendEmailWhenCustomerIsCreatedHandler();
    handler.handle(event);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );
  });
});
