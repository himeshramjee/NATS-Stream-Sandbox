import { ListenerGroups, Subjects } from "./custom-types";

export interface NatsHealthDeepPingEvent {
  listenerGroup: ListenerGroups.NAT_HEALTH;
  subject: Subjects.NATS_HEALTH_DEEP_PING;
  data: {
    id: string,
    message: string
  };
}