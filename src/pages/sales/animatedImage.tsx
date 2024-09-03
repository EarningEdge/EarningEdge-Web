import  { useMemo } from 'react';

export const AnimatedProfileImage = ({ imageUrl, size = 96, dotsPerOrbit = 5 }: any) => {
  const orbits = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      radius: 35 + i * 10, // Increasing radius for each orbit
      clockwise: i % 2 === 0, // Alternating direction
      dots: Array.from({ length: dotsPerOrbit }, (_, j) => ({
        id: `${i}-${j}`,
        delay: Math.random() * -10,
        duration: 15 + Math.random() * 10,
      }))
    }));
  }, [dotsPerOrbit]);

  const svgSize = size * 1.5; // Increase SVG size to accommodate orbits

  return (
    <div className="relative inline-block" style={{ width: svgSize, height: svgSize }}>
      <svg
        className="absolute inset-0"
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {orbits.map((orbit) => (
            <path
              key={`orbit-${orbit.id}`}
              id={`orbit-${orbit.id}`}
              d={`M ${svgSize/2 + orbit.radius} ${svgSize/2} A ${orbit.radius} ${orbit.radius} 0 1 1 ${svgSize/2 - orbit.radius} ${svgSize/2} A ${orbit.radius} ${orbit.radius} 0 1 1 ${svgSize/2 + orbit.radius} ${svgSize/2}`}
              fill="none"
              stroke="none"
            />
          ))}
        </defs>
        {orbits.map((orbit) => 
          orbit.dots.map((dot) => (
            <circle
              key={dot.id}
              r="2"
              fill={orbit.clockwise ? "#FFA500" : "#00CED1"} // Different colors for different directions
              opacity="0.7"
            >
              <animateMotion
                dur={`${dot.duration}s`}
                repeatCount="indefinite"
                begin={`${dot.delay}s`}
                rotate="auto"
              >
                <mpath xlinkHref={`#orbit-${orbit.id}`} />
              </animateMotion>
            </circle>
          ))
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Profile"
          className="rounded-full object-cover"
          style={{ width: size, height: size }}
        />
      </div>
    </div>
  );
};
