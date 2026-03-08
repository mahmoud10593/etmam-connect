import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.5 } },
    },
  },
  particles: {
    color: { value: ["#3B82F6", "#60A5FA", "#2563EB", "#1D4ED8"] },
    links: {
      color: "#3B82F6",
      distance: 180,
      enable: true,
      opacity: 0.25,
      width: 1.2,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      outModes: { default: "out" },
    },
    number: {
      density: { enable: true },
      value: 120,
    },
    opacity: {
      value: { min: 0.25, max: 0.7 },
      animation: {
        enable: true,
        speed: 0.8,
        startValue: "random",
      },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1.5, max: 4 },
      animation: {
        enable: true,
        speed: 1.5,
        startValue: "random",
      },
    },
  },
  detectRetina: true,
};

const ParticleBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0">
      {/* Ambient gradient orbs for depth */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-[100px]" />
      
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(hsl(210 100% 55% / 0.4) 1px, transparent 1px), linear-gradient(90deg, hsl(210 100% 55% / 0.4) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={particleOptions}
        className="h-full w-full"
      />
    </div>
  );
};

export default ParticleBackground;
