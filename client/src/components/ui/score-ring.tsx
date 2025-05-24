import { useEffect, useState } from "react";

interface ScoreRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  animate?: boolean;
}

export default function ScoreRing({ 
  value, 
  size = 150, 
  strokeWidth = 8, 
  animate = true 
}: ScoreRingProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  
  // Calculate props
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayValue / 100) * circumference;
  
  // Animation effect
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [value, animate]);

  // Rating text based on value
  const getRatingText = () => {
    if (value >= 90) return "Excellent";
    if (value >= 80) return "Good Match";
    if (value >= 70) return "Decent";
    if (value >= 60) return "Needs Work";
    return "Poor Match";
  };
  
  // Color based on value
  const getColor = () => {
    if (value >= 80) return "text-green-500";
    if (value >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="score-ring" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            className="score-ring-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <circle
            className="score-ring-progress"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animate ? strokeDashoffset : circumference - (value / 100) * circumference}
            style={{ 
              transition: animate ? 'stroke-dashoffset 1s ease' : 'none',
              stroke: `hsl(${value >= 80 ? "142.1 76.2% 36.3%" : value >= 70 ? "38 92.7% 50.2%" : "0 84.2% 60.2%"})`
            }}
          />
        </svg>
        <div className="score-value">
          {Math.round(displayValue)}%
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          value >= 80 ? "bg-green-100 text-green-800" : 
          value >= 70 ? "bg-yellow-100 text-yellow-800" : 
          "bg-red-100 text-red-800"
        }`}>
          {getRatingText()}
        </span>
      </div>
    </div>
  );
}
