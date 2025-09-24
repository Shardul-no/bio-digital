const RICE_STAGES = {
  Germination: {
    image: '/rice_germination.png',
    IDEAL: {
      temperature: { L: 25, U: 35, tol_low: 5, tol_high: 5 },
      soil_moisture: { L: 70, U: 90, tol_low: 15, tol_high: 10 },
      ph: { L: 5.5, U: 7.5, tol_low: 0.5, tol_high: 0.5 },
      humidity: { L: 70, U: 95, tol_low: 10, tol_high: 5 },
      light: { L: 20000, U: 30000, tol_low: 5000, tol_high: 5000 },
    },
  },
  Tillering: {
    image: '/rice_tillering.png',
    IDEAL: {
      temperature: { L: 25, U: 32, tol_low: 4, tol_high: 4 },
      soil_moisture: { L: 65, U: 85, tol_low: 20, tol_high: 15 },
      ph: { L: 5.5, U: 7.5, tol_low: 0.5, tol_high: 0.5 },
      humidity: { L: 65, U: 90, tol_low: 15, tol_high: 10 },
      light: { L: 25000, U: 40000, tol_low: 10000, tol_high: 15000 },
    },
  },
  "Panicle Initiation": {
    image: '/rice_panicle.png',
    IDEAL: {
      temperature: { L: 22, U: 30, tol_low: 4, tol_high: 4 },
      soil_moisture: { L: 65, U: 85, tol_low: 20, tol_high: 15 },
      ph: { L: 5.5, U: 7.5, tol_low: 0.5, tol_high: 0.5 },
      humidity: { L: 60, U: 85, tol_low: 15, tol_high: 10 },
      light: { L: 25000, U: 45000, tol_low: 10000, tol_high: 20000 },
    },
  },
  Flowering: {
    image: '/rice_flowering.png',
    IDEAL: {
      temperature: { L: 22, U: 28, tol_low: 3, tol_high: 3 },
      soil_moisture: { L: 65, U: 85, tol_low: 20, tol_high: 15 },
      ph: { L: 5.5, U: 7.5, tol_low: 0.5, tol_high: 0.5 },
      humidity: { L: 65, U: 90, tol_low: 15, tol_high: 10 },
      light: { L: 25000, U: 40000, tol_low: 10000, tol_high: 15000 },
    },
  },
  Maturation: {
    image: '/rice_maturity.png',
    IDEAL: {
      temperature: { L: 20, U: 25, tol_low: 3, tol_high: 3 },
      soil_moisture: { L: 55, U: 75, tol_low: 20, tol_high: 15 },
      ph: { L: 5.5, U: 7.5, tol_low: 0.5, tol_high: 0.5 },
      humidity: { L: 55, U: 80, tol_low: 20, tol_high: 15 },
      light: { L: 20000, U: 35000, tol_low: 8000, tol_high: 12000 },
    },
  },
};

export default RICE_STAGES;
