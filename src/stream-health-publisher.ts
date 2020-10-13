import { NATSBaseClient } from "./events/base-classes/base-client";
import { NATSEvent } from "./events/interfaces/event";
import { NatsHealthDeepPingEvent } from "./events/nat-health-deep-ping-event";
import { Subjects } from "./events/types/custom-types";

class StreamHealthPublisherClient<T extends NATSEvent> extends NATSBaseClient {
  constructor() {
    super(
      "teekeet-streaming-cluster", 
      "natsss-demo-stream", 
      "http://localhost:4222"
    );
  }
  
  onClientConnect() {
    console.log("Publisher connected to NATS on port 4222");

    // Message payload
    const data: T["data"] = JSON.stringify({
      id: "10101010",
      message: "Deep ping from Publisher",
    });
    
    // Publish a message
    this.client.publish(
      Subjects.NATS_HEALTH_DEEP_PING,
      data,
      (err, guid) => {
        if (err) {
          console.log(`Failed to publish ping. Error: ${err}`);
        } else {
          console.log(`Ping message published. Guid: ${guid}`);
        }
      }
    );
  }
}

const listenerClient: StreamHealthPublisherClient<NatsHealthDeepPingEvent> = new StreamHealthPublisherClient();
