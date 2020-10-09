import { Message } from "node-nats-streaming";
import { NATSBaseListener } from "./events/base-listener";

export class StreamHealthListener extends NATSBaseListener {
  subject = "nats-health:deep-ping";
  queueGroupName = "nats-health-listener-queue-group";
  clusterID = "teekeet-streaming-cluster";
  clientIDPrefix = "natsss-demo-stream";
  natsssURI = "http://localhost:4222";

  onClientConnect() {
    console.log(`New StreamHealthListener started for ${this.subject} within ${this.queueGroupName}`);
  }

  onMessage(data: any, msg: Message) {
    console.log(`${msg.getSequence()}: Processing "${msg.getSubject()}".`);
    console.log(`\t Data: ${data.message}`);
    msg.ack();
  }
}