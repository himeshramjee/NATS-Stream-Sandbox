import { ListenerGroups, Subjects } from "../types/custom-types";

export interface iNATSEvent {
  subject: Subjects;
  data: any;
  listenerGroup: ListenerGroups;
}