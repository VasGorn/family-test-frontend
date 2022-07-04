import { Gender } from "./gender.enum";

export interface Person {
  id: number | null;
  name: string;
  birthday: Date;
  gender: Gender;
}
