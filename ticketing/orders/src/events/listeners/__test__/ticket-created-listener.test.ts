import mongoose from "mongoose";
import { TicketCreatedEvent } from "@m-gtickets/common";
import { TicketCreatedListener } from "../ticket-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async ( ) =>{
  // create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);
  // create a fake data event
  const data: TicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 50,
    title: "concert",
    userId: new mongoose.Types.ObjectId().toHexString()
  }
  // create a fake event message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener,data,msg};
};

it("creates and saves a ticket", async()=> {
  const { listener ,data,msg} = await setup();
  // call the onMessage function wtih the daya object + message object
  await listener.onMessage(data,msg);
  // write assertions to make sure a ticket was created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('ack the message',async()=>{
  const {listener,data,msg} = await setup();
  // call the onMessage function wtih the daya object + message object
  await listener.onMessage(data,msg)
  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();

});