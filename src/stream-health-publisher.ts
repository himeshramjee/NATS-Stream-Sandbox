import { NATSBasePublisher } from "./events/base-classes/base-publisher";
import { NatsHealthDeepPingEvent } from "./events/nat-health-deep-ping-event";
import { Subjects } from "./events/types/custom-types";

class StreamHealthPublisher extends NATSBasePublisher<NatsHealthDeepPingEvent> {
  subject: Subjects.NATS_HEALTH_DEEP_PING = Subjects.NATS_HEALTH_DEEP_PING;
  public clientConnected = false;

  onClientConnected() {
    console.log(`Publisher with subject ${this.subject} connected to NATS on port 4222`);
  }

  async publishEvent(data?: NatsHealthDeepPingEvent["data"]) {
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
  let guid = await publisherClient.publishEvent();
  console.log(`\t Event published. Guid: ${guid}`);
}, 10000);