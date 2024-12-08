import { Subjects,Publisher,ExpirationCompleteEvent } from "@m-gtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  
}