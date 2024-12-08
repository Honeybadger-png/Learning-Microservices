import { ExpirationCompleteListener} from "../expiration-complete-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";
import mongoose from "mongoose";
import { ExpirationCompleteEvent,OrderStatus } from "@m-gtickets/common";

const setup= async() => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price:25
  })
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'asdsa',
    expiresAt: new Date(),
    ticket,
  })
  await order.save();

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id
  }

  // @ts-ignore
  const msg:Message = {
    ack:jest.fn()
  }

  return {listener,order,ticket,data,msg};
}