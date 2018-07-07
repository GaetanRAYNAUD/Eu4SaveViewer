import { Country } from "./Country.model";
import { ReligionCode, Tag } from "./Country";

export declare interface Session {
  dev_total: number; // Computed
  losses_total: number; // Computed
  date: Date; // Computed
  played_countries: PlayedCountry[];
  players: Player[]; // Form
  countries: Country[]; // Computed
  great_powers: GreatPower[]; // Computed
  institutions: Institution[]; // Computed
  events: Eu4Event[]; // Computed
  hre: Hre; // Computed
  celestial_empire: CelestialEmpire; // Computed
  religions: Religion[]; // Computed
  map_url: string; // Form
  wars: War[];
}

export declare interface GreatPower {
  points: number;
  tag: string;
  rank: number;
}

export declare interface Player {
  tag: string;
  uid: string;
}

export declare interface PlayedCountry {
  playerName: string;
  tag: string;
}

export declare interface Institution {
  origin: number;
  id: number;
  available: boolean;
}

export declare interface Eu4Event {
  code: string;
  country: string;
}

export declare interface Hre {
  emperor: string;
  influence: number;
  reforms: number;
  electors: string;
}

export declare interface CelestialEmpire {
  emperor: string;
  influence: number;
  reforms: number;
}

export declare interface Religion {
  code: ReligionCode;
  date: Date;
}

export declare interface War {
  name: string;
  attackers: Tag[];
  defenders: Tag[];
  battle: Battle[];
  losses: Losses[];
  active: boolean;
}

export declare interface Battle {
  name: string;
  location: number;
  result: boolean;
  attacker: Fighter;
  defender: Fighter;
}

export declare interface Fighter {
  cavalry: number;
  artillery: number;
  infantry: number;
  losses: number;
  tag: Tag;
  commander: string;
}

export declare interface Losses {
  tag: Tag;
  number: number;
}
