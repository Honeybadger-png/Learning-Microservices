import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent} from '@m-gtickets/common';
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'],message:Message){
    const ticket = await Ticket.findByEvent(data);

    if(!ticket){
      throw new Error('Ticket not found');
    }
    // we just pass the version to the ticket if we want to do versioning without plugin
    const { title , price} = data;
    ticket.set({title,price});
    await ticket.save();

    message.ack();
  }
}