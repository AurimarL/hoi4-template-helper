export type UnitStats = {
    hp: number
    org: number
    recovery: number
    suppression: number
    weight: number
    supply: number
    softAttack: number
    hardAttack: number
    defense: number
    breakthrough: number
    armor?: number
    piercing?: number
    speed: number
    airAttack: number
    combatWidth: number
    hardness: number
    manpower: number
    trainingTime: number
    icCost: number
    reliability: number
    trickleback: number
    expLoss: number
}

export type Unit = {
    id: number
    name: string
    icon: string
    category: 'infantry' | 'mobile' | 'armored' | 'support'
    subCategory: string
    xpCost: number
    stats: UnitStats
    isSpecialForces?: boolean
}

export const units: Unit[] = [
    {
        id: 1,
        name: 'Infantry',
        icon: '🪖',
        category: 'infantry',
        subCategory: 'Line Infantry',
        xpCost: 5,
        stats: {
            hp: 25, org: 60, recovery: 0.3, suppression: 1.5, weight: 0.5,
            supply: 0.06, softAttack: 3, hardAttack: 0.5, defense: 20,
            breakthrough: 2, speed: 4, airAttack: 0, combatWidth: 2,
            hardness: 0, manpower: 1000, trainingTime: 120, icCost: 100,
            reliability: 0.9, trickleback: 0, expLoss: 0
        }
    },
    {
        id: 2,
        name: 'Marines',
        icon: '🌊',
        category: 'infantry',
        subCategory: 'Special Forces',
        xpCost: 8,
        stats: {
            hp: 20, org: 70, recovery: 0.4, suppression: 1.8, weight: 0.5,
            supply: 0.08, softAttack: 4, hardAttack: 0.7, defense: 25,
            breakthrough: 3, speed: 4, airAttack: 0, combatWidth: 2,
            hardness: 0, manpower: 1000, trainingTime: 180, icCost: 140,
            reliability: 0.8, trickleback: 0, expLoss: 0
        },
        isSpecialForces: true
    },
    {
        id: 3,
        name: 'Artillery',
        icon: '🎯',
        category: 'support',
        subCategory: 'Fire Support',
        xpCost: 10,
        stats: {
            hp: 0.2, org: 0, recovery: -0.1, suppression: 0, weight: 0.1,
            supply: 0.16, softAttack: 15, hardAttack: 1.2, defense: 6,
            breakthrough: 3.6, speed: 4, airAttack: 0, combatWidth: 3,
            hardness: 0, manpower: 300, trainingTime: 120, icCost: 126,
            reliability: 0.8, trickleback: 0, expLoss: 0
        }
    },
    {
        id: 4,
        name: 'Medium Tank',
        icon: '🚜',
        category: 'armored',
        subCategory: 'Tanks',
        xpCost: 20,
        stats: {
            hp: 2, org: 10, recovery: 0.3, suppression: 1, weight: 2,
            supply: 0.25, softAttack: 15, hardAttack: 15, defense: 10,
            breakthrough: 25, armor: 60, piercing: 65, speed: 7, airAttack: 0,
            combatWidth: 2, hardness: 0.8, manpower: 500, trainingTime: 180, icCost: 450,
            reliability: 0.8, trickleback: 0, expLoss: 0
        }
    },
    {
        id: 5,
        name: 'Motorized',
        icon: '🚙',
        category: 'mobile',
        subCategory: 'Motorized Infantry',
        xpCost: 7,
        stats: {
            hp: 25, org: 60, recovery: 0.3, suppression: 2.2, weight: 0.75,
            supply: 0.065, softAttack: 3, hardAttack: 0.5, defense: 20,
            breakthrough: 7, speed: 12, airAttack: 0, combatWidth: 2,
            hardness: 0.1, manpower: 1200, trainingTime: 120, icCost: 150,
            reliability: 0.9, trickleback: 0, expLoss: 0
        }
    },
    {
        id: 6,
        name: 'Engineer',
        icon: '🛠️',
        category: 'support',
        subCategory: 'Combat Support',
        xpCost: 3,
        stats: {
            hp: 2, org: 20, recovery: 0.3, suppression: 0, weight: 0.1,
            supply: 0.02, softAttack: 1.5, hardAttack: 0.5, defense: 22,
            breakthrough: 3, speed: 4, airAttack: 0, combatWidth: 0,
            hardness: 0, manpower: 300, trainingTime: 120, icCost: 75,
            reliability: 0.85, trickleback: 0, expLoss: 0
        }
    },
]