export type UnitStats = {
  hp: number;
  org: number;
  recovery: number;
  suppression: number;
  weight: number;
  supply: number;
  softAttack: number;
  hardAttack: number;
  defense: number;
  breakthrough: number;
  armor?: number;
  piercing?: number;
  speed: number;
  airAttack: number;
  combatWidth: number;
  hardness: number;
  manpower: number;
  trainingTime: number;
  icCost: number;
  reliability?: number;
  trickleback?: number;
  expLoss?: number;
};

export type UnitCategory =
  | "infantry"
  | "mobile"
  | "combat support"
  | "armored"
  | "support";

export type Unit = {
  id: number;
  name: string;
  icon: string;
  category: UnitCategory;
  stats: UnitStats;
  xpCost: number;
  specialEffects?: {
    label:
      | "Max Speed"
      | "Soft Atk"
      | "Hard Atk"
      | "Breakthrough"
      | "Defence"
      | "Pierce";
    value: number; // percentage
  }[];
  equipment: {
    type: equipmentTypes;
    amount: number;
  }[];
};

export type equipmentTypes =
  | "Infantry Equipment"
  | "Support Equipment"
  | "Motorized"
  | "Mechanized"
  | "Light Tanks"
  | "Medium Tanks"
  | "Heavy Tanks"
  | "Artillery"
  | "Anti-Tank"
  | "Anti-Air";

export const units: Unit[] = [
  {
    id: 1,
    name: "Infantry",
    icon: "🪖",
    category: "infantry",
    stats: {
      hp: 25,
      org: 60,
      recovery: 0.3,
      suppression: 1.5,
      weight: 0.5,
      supply: 0.06,
      softAttack: 3,
      hardAttack: 0.5,
      defense: 20,
      breakthrough: 2,
      speed: 4,
      airAttack: 0,
      combatWidth: 2,
      hardness: 0,
      manpower: 1000,
      trainingTime: 90,
      icCost: 43,
    },
    equipment: [{ type: "Infantry Equipment", amount: 100 }],
    xpCost: 0,
  },
  {
    id: 2,
    name: "Bicycle Infantry",
    icon: "🚲",
    category: "infantry",
    stats: {
      hp: 25,
      org: 60,
      recovery: 0.3,
      suppression: 2.0,
      weight: 0.5,
      supply: 0.06,
      softAttack: 3,
      hardAttack: 0.5,
      defense: 20,
      breakthrough: 2,
      speed: 6.4,
      airAttack: 0,
      combatWidth: 2,
      hardness: 0,
      manpower: 1000,
      trainingTime: 90,
      icCost: 83,
    },
    specialEffects: [
      {
        label: "Max Speed",
        value: 10,
      },
    ],
    equipment: [
      { type: "Infantry Equipment", amount: 100 },
      { type: "Support Equipment", amount: 10 },
    ],
    xpCost: 0,
  },
  {
    id: 3,
    name: "Motorized Infantry",
    icon: "🚙",
    category: "mobile",
    stats: {
      hp: 25,
      org: 60,
      recovery: 0.3,
      suppression: 2.2,
      weight: 0.75,
      supply: 0.065,
      softAttack: 3,
      hardAttack: 0.5,
      defense: 20,
      breakthrough: 7,
      speed: 12,
      airAttack: 0,
      combatWidth: 2,
      hardness: 10,
      manpower: 1200,
      trainingTime: 90,
      icCost: 130.5,
    },
    equipment: [
      { type: "Infantry Equipment", amount: 100 },
      { type: "Motorized", amount: 35 },
    ],
    xpCost: 0,
  },
  {
    id: 4,
    name: "Mechanized Infantry",
    icon: "🚛",
    category: "mobile",
    stats: {
      hp: 30,
      org: 60,
      recovery: 0.3,
      suppression: 2.0,
      weight: 1.0,
      supply: 0.14,
      softAttack: 3.3,
      hardAttack: 2.5,
      defense: 46,
      breakthrough: 8,
      speed: 8,
      airAttack: 0,
      combatWidth: 2,
      hardness: 60,
      manpower: 1200,
      trainingTime: 120,
      icCost: 443,
    },
    specialEffects: [
      {
        label: "Soft Atk",
        value: 10,
      },
      {
        label: "Hard Atk",
        value: 400,
      },
    ],
    equipment: [
      { type: "Infantry Equipment", amount: 100 },
      { type: "Mechanized", amount: 50 },
    ],
    xpCost: 0,
  },
  {
    id: 5,
    name: "Light Tank",
    icon: "🚜",
    category: "armored",
    stats: {
      hp: 2,
      org: 10,
      recovery: 0.3,
      suppression: 2.5,
      weight: 1.0,
      supply: 0.22,
      softAttack: 13,
      hardAttack: 4,
      defense: 4,
      breakthrough: 29.9,
      armor: 10,
      piercing: 10,
      speed: 10,
      airAttack: 0,
      combatWidth: 2,
      hardness: 80,
      manpower: 500,
      trainingTime: 180,
      icCost: 480,
    },
    specialEffects: [
      {
        label: "Breakthrough",
        value: 15,
      },
    ],
    equipment: [{ type: "Light Tanks", amount: 60 }],
    xpCost: 0,
  },

  {
    id: 6,
    name: "Medium Tank",
    icon: "🚛",
    category: "armored",
    stats: {
      hp: 2,
      org: 10,
      recovery: 0.3,
      suppression: 2.5,
      weight: 1.25,
      supply: 0.25,
      softAttack: 19,
      hardAttack: 14,
      defense: 5,
      breakthrough: 41.4,
      armor: 60,
      piercing: 61,
      speed: 8,
      airAttack: 0,
      combatWidth: 2,
      hardness: 90,
      manpower: 500,
      trainingTime: 180,
      icCost: 600,
    },
    specialEffects: [
      {
        label: "Breakthrough",
        value: 15,
      },
    ],
    equipment: [{ type: "Medium Tanks", amount: 50 }],
    xpCost: 0,
  },
  {
    id: 7,
    name: "Heavy Tank",
    icon: "🚚",
    category: "armored",
    stats: {
      hp: 2,
      org: 10,
      recovery: 0.3,
      suppression: 2.5,
      weight: 1.5,
      supply: 0.32,
      softAttack: 15,
      hardAttack: 12,
      defense: 6,
      breakthrough: 41.4,
      armor: 70,
      piercing: 35,
      speed: 5,
      airAttack: 0,
      combatWidth: 2,
      hardness: 95,
      manpower: 500,
      trainingTime: 180,
      icCost: 1000,
    },
    specialEffects: [
      {
        label: "Breakthrough",
        value: 15,
      },
    ],
    equipment: [{ type: "Heavy Tanks", amount: 40 }],
    xpCost: 0,
  },
  {
    id: 8,
    name: "Anti-Tank",
    icon: "🚀",
    category: "combat support",
    stats: {
      hp: 0.6,
      org: 0,
      recovery: 0,
      suppression: 0,
      weight: 0.5,
      supply: 0.1,
      softAttack: 4,
      hardAttack: 20,
      defense: 4,
      breakthrough: 0,
      piercing: 60,
      speed: 4,
      airAttack: 0,
      combatWidth: 1,
      hardness: 0,
      manpower: 500,
      trainingTime: 120,
      icCost: 144,
    },
    equipment: [{ type: "Anti-Tank", amount: 36 }],
    xpCost: 0,
  },
  {
    id: 9,
    name: "Artillery",
    icon: "🎯",
    category: "combat support",
    stats: {
      hp: 0.6,
      org: 0,
      recovery: 0.1,
      suppression: 0,
      weight: 0.5,
      supply: 0.21,
      softAttack: 25,
      hardAttack: 2,
      defense: 10,
      breakthrough: 6,
      piercing: 5,
      speed: 4,
      airAttack: 0,
      combatWidth: 3,
      hardness: 0,
      manpower: 500,
      trainingTime: 120,
      icCost: 126,
    },
    equipment: [{ type: "Artillery", amount: 36 }],
    xpCost: 0,
  },
  {
    id: 10,
    name: "Support Anti-Tank",
    icon: "🚀",
    category: "support",
    stats: {
      hp: 0.2,
      org: 0,
      recovery: -0.1,
      suppression: 0,
      weight: 0.1,
      supply: 0.08,
      softAttack: 2,
      hardAttack: 10,
      defense: 2,
      breakthrough: 0,
      piercing: 51,
      speed: 0,
      airAttack: 0,
      combatWidth: 0,
      hardness: 0,
      manpower: 300,
      trainingTime: 120,
      icCost: 96,
    },
    specialEffects: [
      {
        label: "Defence",
        value: -50,
      },
      {
        label: "Soft Atk",
        value: -50,
      },
      {
        label: "Hard Atk",
        value: -50,
      },
      {
        label: "Pierce",
        value: -15,
      },
    ],
    equipment: [{ type: "Anti-Tank", amount: 24 }],
    xpCost: 0,
  },
];
