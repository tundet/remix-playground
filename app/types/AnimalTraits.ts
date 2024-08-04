export interface AnimalTraits {
    color: string;
    horns: number;
    eyes: number;
    legs: number;
    wings: boolean;
    tail: number; 
    snout: number;
}

export enum HornType {
    Unicorn = 1,
    Goat,
    Devil
  }

  export enum TailLength {
    Short = 1,
    Medium,
    Long
  }

  export enum SnoutType {
    Crocodile = 1,
    Dog,
    Pig,
    Default
  }