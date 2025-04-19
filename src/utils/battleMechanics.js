// Type effectiveness chart (attack type vs defender type)
// Values: 2 = super effective, 1 = normal, 0.5 = not very effective, 0 = no effect
export const typeEffectiveness = {
  Normal: {
    Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, 
    Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0, 
    Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1
  },
  Fire: {
    Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 2, Fighting: 1, 
    Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, 
    Dragon: 0.5, Dark: 1, Steel: 2, Fairy: 1
  },
  Water: {
    Normal: 1, Fire: 2, Water: 0.5, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, 
    Poison: 1, Ground: 2, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, 
    Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1
  },
  Electric: {
    Normal: 1, Fire: 1, Water: 2, Electric: 0.5, Grass: 0.5, Ice: 1, Fighting: 1, 
    Poison: 1, Ground: 0, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, 
    Dragon: 0.5, Dark: 1, Steel: 1, Fairy: 1
  },
  Grass: {
    Normal: 1, Fire: 0.5, Water: 2, Electric: 1, Grass: 0.5, Ice: 1, Fighting: 1, 
    Poison: 0.5, Ground: 2, Flying: 0.5, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, 
    Dragon: 0.5, Dark: 1, Steel: 0.5, Fairy: 1
  },
  Ice: {
    Normal: 1, Fire: 0.5, Water: 0.5, Electric: 1, Grass: 2, Ice: 0.5, Fighting: 1, 
    Poison: 1, Ground: 2, Flying: 2, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, 
    Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 1
  },
  Fighting: {
    Normal: 2, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 1, 
    Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, 
    Dragon: 1, Dark: 2, Steel: 2, Fairy: 0.5
  },
  Poison: {
    Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 1, 
    Poison: 0.5, Ground: 0.5, Flying: 1, Psychic: 1, Bug: 1, Rock: 0.5, Ghost: 0.5, 
    Dragon: 1, Dark: 1, Steel: 0, Fairy: 2
  },
  Ground: {
    Normal: 1, Fire: 2, Water: 1, Electric: 2, Grass: 0.5, Ice: 1, Fighting: 1, 
    Poison: 2, Ground: 1, Flying: 0, Psychic: 1, Bug: 0.5, Rock: 2, Ghost: 1, 
    Dragon: 1, Dark: 1, Steel: 2, Fairy: 1
  },
  Flying: {
    Normal: 1, Fire: 1, Water: 1, Electric: 0.5, Grass: 2, Ice: 1, Fighting: 2, 
    Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 2, Rock: 0.5, Ghost: 1, 
    Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1
  },
  Psychic: {
    Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, 
    Poison: 2, Ground: 1, Flying: 1, Psychic: 0.5, Bug: 1, Rock: 1, Ghost: 1, 
    Dragon: 1, Dark: 0, Steel: 0.5, Fairy: 1
  },
  Bug: {
    Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 2, Ice: 1, Fighting: 0.5, 
    Poison: 0.5, Ground: 1, Flying: 0.5, Psychic: 2, Bug: 1, Rock: 1, Ghost: 0.5, 
    Dragon: 1, Dark: 2, Steel: 0.5, Fairy: 0.5
  },
  Rock: {
    Normal: 1, Fire: 2, Water: 1, Electric: 1, Grass: 1, Ice: 2, Fighting: 0.5, 
    Poison: 1, Ground: 0.5, Flying: 2, Psychic: 1, Bug: 2, Rock: 1, Ghost: 1, 
    Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 1
  },
  Ghost: {
    Normal: 0, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0, 
    Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, 
    Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 1
  },
  Dragon: {
    Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 1, 
    Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, 
    Dragon: 2, Dark: 1, Steel: 0.5, Fairy: 0
  },
  Dark: {
    Normal: 1, Fire: 1, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 0.5, 
    Poison: 1, Ground: 1, Flying: 1, Psychic: 2, Bug: 1, Rock: 1, Ghost: 2, 
    Dragon: 1, Dark: 0.5, Steel: 1, Fairy: 0.5
  },
  Steel: {
    Normal: 1, Fire: 0.5, Water: 0.5, Electric: 0.5, Grass: 1, Ice: 2, Fighting: 1, 
    Poison: 1, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 2, Ghost: 1, 
    Dragon: 1, Dark: 1, Steel: 0.5, Fairy: 2
  },
  Fairy: {
    Normal: 1, Fire: 0.5, Water: 1, Electric: 1, Grass: 1, Ice: 1, Fighting: 2, 
    Poison: 0.5, Ground: 1, Flying: 1, Psychic: 1, Bug: 1, Rock: 1, Ghost: 1, 
    Dragon: 2, Dark: 2, Steel: 0.5, Fairy: 1
  }
};

// Calculate damage multiplier based on attacking type vs defending type
export const calculateTypeEffectiveness = (attackType, defenseType) => {
  return typeEffectiveness[attackType][defenseType] || 1;
};

// Calculate approximate power level for a Pokémon
export const calculatePowerLevel = (pokemon) => {
  // Base power from level (1-100)
  let power = pokemon.level;
  
  // Bonus for certain categories
  const categoryBonus = {
    'Legendary': 25,
    'Starter': 10,
    'Evolution': 15,
    'Fossil': 12,
    'Wild': 5,
    '': 0
  };
  
  power += categoryBonus[pokemon.category] || 0;
  
  // Type bonus - some types get small bonuses
  const typeBonus = {
    'Dragon': 8,
    'Psychic': 5,
    'Fire': 3,
    'Water': 3,
    'Electric': 3,
    'Steel': 5
  };
  
  power += typeBonus[pokemon.type] || 0;
  
  return power;
};

// Simple battle simulation between two teams
export const simulateBattle = (userTeam, opponentTeam) => {
  // Calculate team power levels
  const userTeamPower = userTeam.reduce((total, pokemon) => total + calculatePowerLevel(pokemon), 0);
  const opponentTeamPower = opponentTeam.reduce((total, pokemon) => total + calculatePowerLevel(pokemon), 0);
  
  // Calculate type advantages
  let userTeamAdvantage = 0;
  let opponentTeamAdvantage = 0;
  
  // Check each possible matchup for type advantages
  userTeam.forEach(userPokemon => {
    opponentTeam.forEach(oppPokemon => {
      const userAttackEffectiveness = calculateTypeEffectiveness(userPokemon.type, oppPokemon.type);
      const oppAttackEffectiveness = calculateTypeEffectiveness(oppPokemon.type, userPokemon.type);
      
      userTeamAdvantage += (userAttackEffectiveness - 1) * 10; // Convert to percentage points (1.5 -> 5%)
      opponentTeamAdvantage += (oppAttackEffectiveness - 1) * 10; // Convert to percentage points (1.5 -> 5%)
    });
  });
  
  // Normalize advantages based on team sizes
  userTeamAdvantage = userTeamAdvantage / (userTeam.length * opponentTeam.length);
  opponentTeamAdvantage = opponentTeamAdvantage / (userTeam.length * opponentTeam.length);
  
  // Calculate base win probability from power levels
  const totalPower = userTeamPower + opponentTeamPower;
  let winProbability = (userTeamPower / totalPower) * 100;
  
  // Adjust for type advantages
  winProbability += (userTeamAdvantage - opponentTeamAdvantage);
  
  // Apply team size adjustment (smaller teams are at disadvantage)
  const teamSizeFactor = Math.log(userTeam.length) / Math.log(opponentTeam.length);
  winProbability *= teamSizeFactor;
  
  // Ensure probability stays within 1-99% range (never certain)
  winProbability = Math.min(99, Math.max(1, Math.round(winProbability)));
  
  return {
    userTeamPower,
    opponentTeamPower,
    userTeamAdvantage,
    opponentTeamAdvantage,
    winProbability
  };
};

// A set of predefined opponent teams for simulation
export const commonTeamCompositions = [
  {
    name: "Starter Trio",
    description: "A balanced team of evolved starter Pokémon",
    team: [
      { name: "Charizard", species: "Charizard", type: "Fire", level: 36, category: "Starter" },
      { name: "Blastoise", species: "Blastoise", type: "Water", level: 36, category: "Starter" },
      { name: "Venusaur", species: "Venusaur", type: "Grass", level: 36, category: "Starter" }
    ]
  },
  {
    name: "Elite Four",
    description: "A powerful team inspired by the Elite Four",
    team: [
      { name: "Dragonite", species: "Dragonite", type: "Dragon", level: 55, category: "Evolution" },
      { name: "Gengar", species: "Gengar", type: "Ghost", level: 50, category: "Evolution" },
      { name: "Alakazam", species: "Alakazam", type: "Psychic", level: 52, category: "Evolution" },
      { name: "Arcanine", species: "Arcanine", type: "Fire", level: 50, category: "Evolution" }
    ]
  },
  {
    name: "Champion's Team",
    description: "An extremely powerful and balanced team",
    team: [
      { name: "Mewtwo", species: "Mewtwo", type: "Psychic", level: 70, category: "Legendary" },
      { name: "Tyranitar", species: "Tyranitar", type: "Rock", level: 60, category: "Evolution" },
      { name: "Gyarados", species: "Gyarados", type: "Water", level: 62, category: "Evolution" },
      { name: "Dragonite", species: "Dragonite", type: "Dragon", level: 65, category: "Evolution" },
      { name: "Metagross", species: "Metagross", type: "Steel", level: 63, category: "Evolution" },
      { name: "Salamence", species: "Salamence", type: "Dragon", level: 64, category: "Evolution" }
    ]
  },
  {
    name: "Bug Catcher",
    description: "A team of bug-type Pokémon",
    team: [
      { name: "Butterfree", species: "Butterfree", type: "Bug", level: 22, category: "Evolution" },
      { name: "Beedrill", species: "Beedrill", type: "Bug", level: 22, category: "Evolution" },
      { name: "Scyther", species: "Scyther", type: "Bug", level: 25, category: "Wild" }
    ]
  },
  {
    name: "Gym Leader",
    description: "A type-specialized team with moderate strength",
    team: [
      { name: "Raichu", species: "Raichu", type: "Electric", level: 33, category: "Evolution" },
      { name: "Magneton", species: "Magneton", type: "Electric", level: 30, category: "Evolution" },
      { name: "Electabuzz", species: "Electabuzz", type: "Electric", level: 35, category: "Wild" }
    ]
  }
];

// Get type coverage statistics for a team
export const getTypeCoverage = (team) => {
  const coverage = {
    superEffective: {},
    notVeryEffective: {},
    noEffect: {}
  };
  
  // Initialize all types
  const allTypes = Object.keys(typeEffectiveness);
  allTypes.forEach(type => {
    coverage.superEffective[type] = 0;
    coverage.notVeryEffective[type] = 0;
    coverage.noEffect[type] = 0;
  });
  
  // Calculate coverage
  team.forEach(pokemon => {
    allTypes.forEach(defenderType => {
      const effectiveness = calculateTypeEffectiveness(pokemon.type, defenderType);
      if (effectiveness > 1) {
        coverage.superEffective[defenderType]++;
      } else if (effectiveness < 1 && effectiveness > 0) {
        coverage.notVeryEffective[defenderType]++;
      } else if (effectiveness === 0) {
        coverage.noEffect[defenderType]++;
      }
    });
  });
  
  return coverage;
};
