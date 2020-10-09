import nats, { Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";

export abstract class NATSBaseClient {
  protected client: Stan;

  abstract onClientConnect(): void;

  constructor(clusterID: string, clientIDPrefix: string, natsssURI: string) {
    // Create a `client` connection to NATS Stream
    console.log(`Connecting client to ${natsssURI}/${clusterID}`);
    this.client = nats.connect(
      clusterID,
      `${clientIDPrefix}-${randomBytes(4).toString("hex")}`,
      {
        url: natsssURI,
      }
    );

  // Register event handlers/callbacks
  this.client.on("connect", () => {
    console.log("NATS client connected.");
  
    this.onClientConnect();
  });
  
  this.client.on("error", (err) => {
    console.error('Doh! Unhandled exception in Nats client. Error: \n', err);
  });
  
  this.client.on("close", () => {
    console.log("Client connection closed. Exiting process gracefully...I hope.");
    process.exit();
  });
  
  // FIXME: Not sure if these are OS/platform agnostic signal names
  process.on("SIGINT", () => {
    this.client.close();
  });
  process.on("SIGTERM", () => { 
    this.client.close();
  });
  }
}