import React, { useState, useEffect } from 'react';
import SensorSlider from './components/SensorSlider';
import RICE_STAGES from './stages/RiceStages';
import SUGARCANE_STAGES from './stages/SugarcaneStages';

const CROPS = {
  Rice: RICE_STAGES,
  Sugarcane: SUGARCANE_STAGES,
};

const WEIGHTS = { soil_moisture: 0.35, temperature: 0.2, ph: 0.15, humidity: 0.1, light: 0.1 };
const PENALTY_PARAMS = {
  soil_moisture: { alpha: 0.6, gamma: 1.8 },
  temperature: { alpha: 0.35, gamma: 1.5 },
  ph: { alpha: 0.2, gamma: 1.0 },
  humidity: { alpha: 0.15, gamma: 1.0 },
  light: { alpha: 0.15, gamma: 1.0 }
};
const ACTIONS = {
  temperature: "Adjust shade or irrigation",
  soil_moisture: "Irrigate or improve drainage",
  ph: "Add lime or gypsum",
  humidity: "Adjust irrigation or airflow",
  light: "Remove shading or add shade nets"
};
const DEFAULT_YMAX = 100;

export default function App() {
  const [crop, setCrop] = useState("Rice");
  const [stage, setStage] = useState("Germination");
  const [temperature, setTemperature] = useState(30);
  const [soilMoisture, setSoilMoisture] = useState(70);
  const [ph, setPh] = useState(6.5);
  const [humidity, setHumidity] = useState(75);
  const [light, setLight] = useState(28000);
  const [Ymax, setYmax] = useState(DEFAULT_YMAX);
  const [result, setResult] = useState(null);

  const STAGES = CROPS[crop];

  const paramScore = (x, L, U, tolLow, tolHigh) => {
    if (x >= L && x <= U) return 1;
    if (x < L) return x <= L - tolLow ? 0 : (x - (L - tolLow)) / tolLow;
    if (x > U) return x >= U + tolHigh ? 0 : ((U + tolHigh) - x) / tolHigh;
    return 0;
  };

  const compute = () => {
    const IDEAL = STAGES[stage].IDEAL;
    const readings = { temperature, soil_moisture: soilMoisture, ph, humidity, light };
    let scores = {};
    for (let k in IDEAL) {
      const spec = IDEAL[k];
      scores[k] = paramScore(readings[k], spec.L, spec.U, spec.tol_low, spec.tol_high);
    }

    let totalW = Object.values(WEIGHTS).reduce((a,b)=>a+b,0);
    let conf = 0;
    for (let k in WEIGHTS) conf += WEIGHTS[k]*scores[k];
    const confidence_pct = Math.round((conf/totalW)*100);

    let mult = 1.0;
    let penalties = {};
    for (let k in scores){
      if (PENALTY_PARAMS[k]){
        const {alpha,gamma} = PENALTY_PARAMS[k];
        const p = Math.max(0, 1 - alpha * Math.pow(1 - scores[k], gamma));
        penalties[k] = Math.round(p,3);
        mult *= p;
      }
    }
    const base_frac = 0.6 + 0.4*(confidence_pct/100);
    const expected_yield = Math.round(Ymax*base_frac*mult,2);

    let status = {};
    for (let k in IDEAL){
      const val = readings[k];
      const spec = IDEAL[k];
      let st = "within";
      if (val < spec.L) st="below";
      else if (val > spec.U) st="above";
      status[k] = { value: val, status: st, ideal: [spec.L,spec.U], action: ACTIONS[k] };
    }

    let note = confidence_pct>=90 ? "High chance of full yield" :
               confidence_pct>=70 ? "Mild stress, small yield reductions" :
               "High stress, significant yield reductions";

    setResult({ confidence_pct, expected_yield, Ymax, note, status });
  };

  useEffect(()=>compute(), [temperature, soilMoisture, ph, humidity, light, stage, crop, Ymax]);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Crop + Stage Selector */}
        <div className="col-span-1 flex flex-col items-center max-w-[220px] mx-auto">
          <select value={crop} onChange={e=>{setCrop(e.target.value); setStage(Object.keys(CROPS[e.target.value])[0]);}} className="mb-4 p-2 border rounded w-full">
            {Object.keys(CROPS).map(c=><option key={c} value={c}>{c}</option>)}
          </select>
          <img src={STAGES[stage].image} alt={stage} className="w-full h-auto object-contain rounded-lg shadow-md mb-4" />
          <select value={stage} onChange={e=>setStage(e.target.value)} className="mt-2 p-2 border rounded w-full">
            {Object.keys(STAGES).map(s=><option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Sliders */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-lg font-bold mb-4">Adjust sensors / stage</h2>
          <SensorSlider label="Temperature (°C)" min={15} max={40} value={temperature} onChange={setTemperature}/>
          <SensorSlider label="Soil moisture (%)" min={0} max={100} value={soilMoisture} onChange={setSoilMoisture}/>
          <SensorSlider label="Soil pH" min={4} max={9} step={0.1} value={ph} onChange={setPh}/>
          <SensorSlider label="Humidity (%)" min={10} max={100} value={humidity} onChange={setHumidity}/>
          <SensorSlider label="Light (lux)" min={5000} max={60000} step={500} value={light} onChange={setLight}/>
          <div className="mt-4">
            <label className="block font-medium">Baseline Ymax (t/ha)</label>
            <input type="number" value={Ymax} onChange={e=>setYmax(Number(e.target.value))} className="mt-1 p-2 border rounded w-full"/>
          </div>
        </div>

        {/* Estimate */}
        <div className="col-span-1 md:col-span-1">
          <h2 className="text-lg font-bold mb-4">Estimate</h2>
          {result ? (
            <div>
              <div className="mb-3 p-3 bg-slate-50 rounded">
                <div className="text-sm">Confidence</div>
                <div className="text-3xl font-bold">{result.confidence_pct}%</div>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div style={{width:`${result.confidence_pct}%`}} className="h-2 bg-green-500 rounded"></div>
                </div>
              </div>
              <div className="mb-3 p-3 bg-slate-50 rounded">
                <div className="text-sm">Expected yield</div>
                <div className="text-2xl font-semibold">{result.expected_yield} t/ha</div>
                <div className="text-sm text-gray-600">Baseline Ymax: {result.Ymax} t/ha</div>
                <div className="mt-2 text-sm">{result.note}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded">
                <div className="text-sm font-medium mb-2">Parameter statuses</div>
                {Object.entries(result.status).map(([k,v])=>(
                  <div key={k} className="mb-2 border-b pb-2">
                    <div className="flex justify-between">
                      <div className="capitalize">{k.replace('_',' ')}</div>
                      <div className={`font-semibold ${v.status==='within'? 'text-green-600' : v.status==='below'? 'text-orange-600' : 'text-red-600'}`}>{v.status}</div>
                    </div>
                    <div className="text-xs text-gray-600">Value: {v.value} (ideal {v.ideal[0]}–{v.ideal[1]})</div>
                    {v.status!=='within' && <div className="text-xs mt-1">Action: {v.action}</div>}
                  </div>
                ))}
              </div>
            </div>
          ) : (<div className="text-sm text-gray-500">Adjust sliders to see estimate.</div>)}
        </div>
      </div>
    </div>
  );
}
