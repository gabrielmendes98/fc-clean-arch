import EventInterface from "../../@shared/event/event.interface";
import Address from "../value-object/address";

type EventData = {
  id: string;
  name: string;
  address: Address;
};

export default class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: EventData;

  constructor(eventData: EventData) {
    this.dateTimeOccured = new Date();
    this.eventData = eventData;
  }
}
