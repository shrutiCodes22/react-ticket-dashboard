// src/components/ParticlesBackground.jsx
import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null; // only render after initialization

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 -z-10"
      options={{
        background: { color: { value: "#f9f9f5ff" } },
        particles: {
          number: { value: 70 },
          size: { value: 4 },
          move: { enable: true, speed: 1 },
          links: { enable: true, color: "#000080ff", distance: 150 },
        },
        interactivity: { // ✅ moved here
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 150, duration: 0.4 },
            push: { quantity: 4 },
          },
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: { number: { value: 10 } }, // fewer particles on small screens
            },
          },
        ],
      }}
    />
  );
};

export default ParticlesBackground;
