export interface Session {
  dev_total: number;
  losses_total: number;
  start_date: string;
  end_date: string;
  players: Player[];
  great_powers: GreatPower[];
}

export interface GreatPower {
  points: number;
  tag: string;
}

export interface Player {
  display_name: string;
  tag: string;
  uid: string;
}
