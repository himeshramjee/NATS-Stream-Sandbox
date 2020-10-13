import { Message } from "node-nats-streaming";
import { NATSBaseListener } from "./events/base-listener";

export class StreamHealthListener extends NATSBaseListener {
  subject = "nats-health:deep-ping";
  queueGroupName = "nats-health-listener-queue-group";

  onMessage(data: any, msg: Message) {
    console.log(`${msg.getSequence()}: Processing "${msg.getSubject()}".`);
    console.log(`\tData: ${data.message}`);

    msg.ack();
  }
}

new StreamHealthListener(
  "teekeet-streaming-cluster", 
  "natsss-demo-stream", 
  "http://localhost:4222"
);