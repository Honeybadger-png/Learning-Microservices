import express, { Request, Response} from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@m-gtickets/common';
import { Order ,OrderStatus } from '../models/order';
import { natsWrapper } from '../nats-wrapper';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
const router = express.Router();

router.delete('/api/orders/:orderId',requireAuth, async( req:Request,res:Response)=> {
  const order = await Order.findById(req.params.orderId).populate('ticket');

  if(!order){
     throw new NotFoundError();
  }

  if(order.userId !== req.currentUser!.id){
    throw new NotAuthorizedError('You are not Authorized!');
  }
  order.status = OrderStatus.Cancelled;
  await order.save();

  // publishing an event saying this was cancelled!
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id,
      price: order.ticket.price.toString(),
    }
  })

  res.status(204).send(order);
})

export { router as deleteOrderRouter};