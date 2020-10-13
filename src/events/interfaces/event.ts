import { ListenerGroups, Subjects } from "../types/custom-types";

export interface NATSEvent {
  subject: Subjects;
  data: any;
  listenerGroup: ListenerGroups;
}