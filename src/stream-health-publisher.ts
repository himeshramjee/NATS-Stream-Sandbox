import { NATSBaseClient } from "./events/base-client";

class StreamHealthPublisherClient extends NATSBaseClient {
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
    const data = JSON.stringify({
      id: "10101010",
      message: "Deep ping from Publisher",
    });
    
    // Publish a message
    this.client.publish(
      "nats-health:deep-ping",
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

const listenerClient: StreamHealthPublisherClient = new StreamHealthPublisherClient();
