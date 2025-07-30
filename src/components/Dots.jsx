import React from 'react'
export default function ProgressDots({ total, current, currentType }) {
  // Determine color
  let colorClass;

  if (currentType === "crisis") {
    colorClass = "bg-red-600";
  } else if (currentType === "advantage") {
    colorClass = "bg-green-600";
  }

  return (
    <div className="flex gap-3 my-4">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-3 w-3 rounded-full ${
            currentType === "crisis" || currentType === "advantage"
              ? colorClass
              : current === i
              ? "bg-blue-800"
              : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}