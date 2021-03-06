import { NATSBasePublisher } from "./events/base-classes/base-publisher";
import { iNatsHealthDeepPingEvent } from "./events/interfaces/iNat-health-deep-ping-event";
import { Subjects } from "./events/types/custom-types";

class StreamHealthPublisher extends NATSBasePublisher<iNatsHealthDeepPingEvent> {
  subject: Subjects.NATS_HEALTH_DEEP_PING = Subjects.NATS_HEALTH_DEEP_PING;
  public clientConnected = false;

  constructor() {
    super();
    this.init();
  }

  async init() {
    await this.connect("teekeet-streaming-cluster", 
      "natsss-demo-stream", 
      "http://localhost:4222"
      );
  }

  async publishEvent(data?: iNatsHealthDeepPingEvent["data"]) {
    if (!data) {
      // Message payload
      data = {
        id: "10101010",
        message: "[Default message] Deep ping from Publisher",
      };
    }

    await this.publish(data)
    .then(response => {
      console.log(`NatsHealthDeepPingEvent event published. Guid: ${response}`)
      return response;
    })
    .catch(err => {
      console.log(`Failed to publish NatsHealthDeepPingEvent event. Error: ${err}`);
    });
  }
}

const publisherClient: StreamHealthPublisher = new StreamHealthPublisher();

setInterval(async () => {
  await publisherClient.publishEvent()
  .then(guid => {
    // FIXME: Why is guid still undefined at this point?
    console.log(`\t Event published. Guid: ${guid}`);
  })
  .catch(error => {
    console.error(`Failed to publish message via StreamHealthPublisher. Error: ${error}`)
  });
}, 10000);