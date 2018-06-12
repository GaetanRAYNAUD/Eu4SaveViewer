import { GreatPower, Session } from "./Session";

export interface Game {
  day: string;
  start_hour: number;
  end_hour: number;
  title: string;
  sessions: Session[];
  nb_player: number;
  dev_total: number;
  losses_total: number;
  date: Date;
  great_powers: GreatPower[];
  map_url: string;
}
