import { Session } from "./Session";
import { Time, WeekDay } from "@angular/common";

export declare interface Game {
  id: string; //Computed
  status: GameStatus; //Computed
  day: WeekDay; //Form
  start_hour: Time; //Form
  end_hour: Time; //Form
  creator: string; //Form
  admins: string[]; //Form
  title: string; //Form
  image_url: string; //Form
  sessions: Session[]; //Session Form
}

export declare const enum GameStatus {
  PENDING = 'PENDING',
  ON_GOING = 'ON_GOING',
  FINISHED = 'FINISHED'
}
