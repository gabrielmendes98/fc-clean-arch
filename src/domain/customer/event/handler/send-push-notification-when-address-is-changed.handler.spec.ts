import Address from "../../value-object/address";
import CustomerAddressChangedEvent from "../customer-address-changed.event";
import SendPushNotificationWhenAddressIsChangedHandler from "./send-push-notification-when-address-is-changed.handler";

describe("SendPushNotificationWhenAddressIsChangedHandler", () => {
  it("should display console log on handle", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    const address = new Address("Rua 1", 123, "12312321", "São Paulo");
    const event = new CustomerAddressChangedEvent({
      id: "123",
      name: "Customer name",
      address,
    });
    const handler = new SendPushNotificationWhenAddressIsChangedHandler();
    handler.handle(event);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Endereço do cliente ${event.eventData.id}, ${
        event.eventData.name
      } alterado para ${address.toString()}`
    );
  });
});
