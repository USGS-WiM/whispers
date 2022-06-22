import { History } from "@interfaces/history";

import { AdministrativeLevelOne } from "@interfaces/administrative-level-one";
import { AdministrativeLevelTwo } from "@interfaces/administrative-level-two";
import { Species } from "@interfaces/species";
import { EventDiagnosis } from "@interfaces/event-diagnosis";
import { EventGroup } from "@interfaces/event-group";
import { Contact } from "@interfaces/contact";

export interface EventSummary extends History {
  id: number;
  affected_count: number;
  end_date: string;
  start_date: string;
  event_type: number;
  event_type_string: string;
  event_status?: number;
  event_status_string: string;
  staff?: number;
  staff_string?: string;
  legal_number?: string;
  legal_status_string?: string;
  eventdiagnoses: EventDiagnosis[];
  administrativelevelones: AdministrativeLevelOne[];
  administrativeleveltwos: AdministrativeLevelTwo[];
  species?: Species[];
  flyways?: [];
  organizations: [];
  permissions?: {};
  permission_source?: string;
  event_reference?: string;
  complete?: boolean;
  quality_check?: string;
  public?: boolean;
  eventgroups?: EventGroup[];
  contacts?: Contact[];
}
