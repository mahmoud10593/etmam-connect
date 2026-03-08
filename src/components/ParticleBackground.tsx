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
      onHover: { enable: true, mode: "bubble" },
    },
    modes: {
      bubble: { distance: 200, size: 12, duration: 2, opacity: 0.6 },
    },
  },
  particles: {
    color: { value: ["#3B82F6", "#60A5FA", "#93C5FD", "#2563EB"] },
    links: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      outModes: { default: "out" },
      random: true,
      straight: false,
    },
    number: {
      density: { enable: true },
      value: 40,
    },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: {
        enable: true,
        speed: 0.5,
        startValue: "random",
        sync: false,
      },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 4, max: 20 },
      animation: {
        enable: true,
        speed: 1.5,
        startValue: "random",
        sync: false,
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
