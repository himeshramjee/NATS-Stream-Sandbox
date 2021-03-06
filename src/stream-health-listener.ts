import { Message } from "node-nats-streaming";
import { NATSBaseListener } from "./events/base-classes/base-listener";
import { iNatsHealthDeepPingEvent } from "./events/interfaces/iNat-health-deep-ping-event";
import { ListenerGroups, Subjects } from "./events/types/custom-types";

export class StreamHealthListener extends NATSBaseListener<iNatsHealthDeepPingEvent> {
  readonly subject: Subjects.NATS_HEALTH_DEEP_PING = Subjects.NATS_HEALTH_DEEP_PING;
  readonly queueGroupName = ListenerGroups.NAT_HEALTH;

  constructor() {
    super();
    this.init();
  }

  async init() {
    await this.connect("teekeet-streaming-cluster", "natsss-demo-stream", "http://localhost:4222");
    await this.registerSubscriptions();
  }

  onMessage(data: iNatsHealthDeepPingEvent["data"], msg: Message) {
    console.log(`${msg.getSequence()}: Processing "${msg.getSubject()}".`);
    console.log(`\tData: ${data.message}`);

    msg.ack();
  }
}

const healthListener: StreamHealthListener = new StreamHealthListener();

