import React from 'react';
import { FaArrowRight, FaArrowLeft, FaArrowUp, FaArrowCircleRight } from 'react-icons/fa';
import { MdRoundaboutLeft } from 'react-icons/md';

/**
 * Returns an icon component for a given OSRM step type + modifier.
 */
const StepIcon = ({ type, modifier }) => {
  const mod = modifier?.toLowerCase() || '';
  const t = type?.toLowerCase() || '';

  if (t === 'arrive') return <span className="text-green-500 font-bold text-xl">📍</span>;
  if (t === 'depart') return <span className="text-blue-500 font-bold text-xl">🚦</span>;
  if (t === 'roundabout' || t === 'rotary') return <MdRoundaboutLeft className="text-indigo-600 text-xl" />;

  if (mod.includes('left')) return <FaArrowLeft className="text-gray-700 text-lg" />;
  if (mod.includes('right')) return <FaArrowRight className="text-gray-700 text-lg" />;
  if (mod.includes('straight')) return <FaArrowUp className="text-gray-700 text-lg" />;
  return <FaArrowCircleRight className="text-gray-700 text-lg" />;
};

/**
 * Renders the current top step prominently and the step list below.
 */
const NavigationPanel = ({ steps, distance, duration, isVisible }) => {
  if (!isVisible || !steps || steps.length === 0) return null;

  const currentStep = steps[0];
  const remainingSteps = steps.slice(1);

  const formatDist = (m) => {
    if (m == null) return '';
    return m < 1000 ? `${Math.round(m)} m` : `${(m / 1000).toFixed(1)} km`;
  };

  const formatDur = (s) => {
    if (s == null) return '';
    const mins = Math.round(s / 60);
    if (mins < 60) return `${mins} min`;
    const h = Math.floor(mins / 60);
    const rem = mins % 60;
    return rem ? `${h} hr ${rem} min` : `${h} hr`;
  };

  return (
    <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-none select-none">

      {/* Current Step Banner */}
      <div className="bg-black text-white px-5 py-4 flex items-start gap-4 pointer-events-auto shadow-2xl">
        <div className="flex-shrink-0 mt-1">
          <StepIcon type={currentStep.type} modifier={currentStep.modifier} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight truncate">{currentStep.instruction}</p>
          <p className="text-yellow-400 text-xs mt-1">{formatDist(currentStep.distance)}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="text-xs text-gray-300">{formatDist(distance)}</p>
          <p className="text-xs text-yellow-400">{formatDur(duration)}</p>
        </div>
      </div>

      {/* Step List */}
      {remainingSteps.length > 0 && (
        <div className="bg-white/95 backdrop-blur-sm max-h-48 overflow-y-auto pointer-events-auto border-t border-gray-200 shadow-lg">
          {remainingSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
              <div className="flex-shrink-0 w-7">
                <StepIcon type={step.type} modifier={step.modifier} />
              </div>
              <p className="text-sm text-gray-800 flex-1 leading-snug">{step.instruction}</p>
              <p className="text-xs text-gray-500 flex-shrink-0">{formatDist(step.distance)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavigationPanel;
