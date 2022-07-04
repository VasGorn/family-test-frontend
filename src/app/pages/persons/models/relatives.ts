import { Person } from "./person";

export interface Relatives {
  id: number;
  person: Person;
  parents: Person[];
  children: Person[];
}
