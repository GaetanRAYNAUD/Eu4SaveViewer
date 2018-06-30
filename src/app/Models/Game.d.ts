import { GreatPower, Session } from "./Session";
import { Time, WeekDay } from "@angular/common";
import { User } from "./User.model";

export interface Game {
  day: WeekDay; //Form
  start_hour: Time; //Form
  end_hour: Time; //Form
  creator: User; //Form
  admins: User[]; //Form
  title: string; //Form
  image_url: string; //Form
  sessions: Session[];
  nb_player: number; //Computed
  dev_total: number; //Computed
  losses_total: number; //Computed
  date: Date; //Computed
  great_powers: GreatPower[]; //Computed
  map_url: string; //Computed
}
