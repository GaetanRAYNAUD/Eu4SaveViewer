import { CultureCode, ReligionCode, Tag } from "./Country";

export declare interface Province {
  id: number;
  name: string;
  owner: Tag;
  controller: Tag;
  institutions: number[];
  estate: number;
  cores: Tag[];
  trade: string;
  original_culture: CultureCode;
  culture: CultureCode;
  religion: ReligionCode;
  original_religion: ReligionCode;
  base_tax: number;
  base_production: number;
  base_manpower: number;
  hre: boolean;
  trade_goods: string;
  autonomy: number;
  buildings: Building[];
  improve_count: number;
  trade_power: number;
}

export declare interface Building {
  code: BuildingCode;
  builder: Tag;
}

export declare const enum BuildingCode {
  BARRACKS,
  FORT_16TH,
  FORT_15TH,
  CATHEDRAL,
  NATIVE_CEREMONIAL_FIRE_PIT,
  CONSCRIPTION_CENTER,
  COUNTING_HOUSE,
  COURTHOUSE,
  DOCK,
  DRYDOCK,
  NATIVE_EARTHWORK,
  FARM_ESTATE,
  NATIVE_FORTIFIED_HOUSE,
  FORT_18TH,
  FURNACE,
  GRAND_SHIPYARD,
  NATIVE_GREAT_TRAIL,
  NATIVE_IRRIGATION,
  NATIVE_LONGHOUSE,
  MARKETPLACE,
  MILLS,
  WHARF,
  NATIVE_PALISADE,
  PLANTATIONS,
  REGIMENTAL_CAMP,
  SHIPYARD,
  FORT_17TH,
  STOCK_EXCHANGE,
  NATIVE_STOREHOUSE,
  NATIVE_SWEAT_LODGE,
  TEMPLE,
  TEXTILE,
  NATIVE_THREE_SISTERS_FIELD,
  TOWN_HALL,
  TRADE_DEPOT,
  TRADECOMPANY,
  TRAINING_FIELDS,
  UNIVERSITY,
  WEAPONS,
  WORKSHOP
}
