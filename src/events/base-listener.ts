import { Message, Stan } from "node-nats-streaming";
import { NATSBaseClient } from "./base-client";

export abstract class NATSBaseListener extends NATSBaseClient {
  abstract clusterID: string;
  abstract clientIDPrefix: string;
  abstract natsssURI: string;

  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;

  protected ackWait: number = 5 * 1000;

  // Setup subscription options
  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setAckWait(this.ackWait)
      .setDeliverAllAvailable() // Required to boostrap a new listener with all historical data
      .setManualAckMode(true) // Ensure NATSSS doesn't assume successfull processing of a message
      .setDurableName(this.queueGroupName); // Required to allow a listener to catchup with missed messages by having NATSSS track delivery status of each message
  }

  // Start listening
  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    // Register event handlers/callbacks
    subscription.on("message", (msg: Message) => {
      console.log(`${msg.getSequence()}: "${msg.getSubject()}" received.`);

      const parsedMessage = this.parseMessage(msg);
      
      this.onMessage(parsedMessage, msg);
    });

    subscription.on("close", () => {
      console.log("Subscription closed, exiting process gracefully...I hope.");
      process.exit();
    });
  }

  private parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}