import { ListenerGroups, Subjects } from "../types/custom-types";

export interface iNatsHealthDeepPingEvent {
  listenerGroup: ListenerGroups.NAT_HEALTH;
  subject: Subjects.NATS_HEALTH_DEEP_PING;
  data: {
    id: string,
    message: string
  };
}