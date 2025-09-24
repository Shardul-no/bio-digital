// --- frontend/src/components/SensorSlider.jsx ---
import React from 'react';

export default function SensorSlider({label, min, max, step=1, value, onChange}){
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <label className="font-medium">{label}</label>
        <span className="text-sm text-gray-600">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}