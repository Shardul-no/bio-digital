const SUGARCANE_STAGES = {
  Germination: {
    image: '/plant_germination.png',
    IDEAL: {
      temperature: { L: 28, U: 32, tol_low: 3, tol_high: 3 },
      soil_moisture: { L: 65, U: 85, tol_low: 20, tol_high: 15 },
      ph: { L: 6, U: 7, tol_low: 1, tol_high: 1 },
      humidity: { L: 65, U: 90, tol_low: 15, tol_high: 10 },
      light: { L: 20000, U: 30000, tol_low: 5000, tol_high: 5000 },
    },
  },
  Tillering: {
    image: '/plant_tillering.png',
    IDEAL: {
      temperature: { L: 26, U: 32, tol_low: 4, tol_high: 4 },
      soil_moisture: { L: 60, U: 80, tol_low: 30, tol_high: 20 },
      ph: { L: 6, U: 7, tol_low: 1, tol_high: 1 },
      humidity: { L: 60, U: 85, tol_low: 20, tol_high: 15 },
      light: { L: 20000, U: 40000, tol_low: 10000, tol_high: 20000 },
    },
  },
  "Grand Growth": {
    image: '/plant_grand.png',
    IDEAL: {
      temperature: { L: 25, U: 32, tol_low: 4, tol_high: 4 },
      soil_moisture: { L: 60, U: 85, tol_low: 25, tol_high: 20 },
      ph: { L: 6, U: 7, tol_low: 1, tol_high: 1 },
      humidity: { L: 55, U: 80, tol_low: 20, tol_high: 15 },
      light: { L: 25000, U: 45000, tol_low: 10000, tol_high: 20000 },
    },
  },
  Maturation: {
    image: '/plant_maturity.png',
    IDEAL: {
      temperature: { L: 24, U: 30, tol_low: 4, tol_high: 4 },
      soil_moisture: { L: 55, U: 75, tol_low: 25, tol_high: 20 },
      ph: { L: 6, U: 7, tol_low: 1, tol_high: 1 },
      humidity: { L: 50, U: 75, tol_low: 20, tol_high: 15 },
      light: { L: 20000, U: 40000, tol_low: 10000, tol_high: 20000 },
    },
  },
};

export default SUGARCANE_STAGES;
