import { Publisher, OrderCreatedEvent, Subjects } from "@m-gtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}