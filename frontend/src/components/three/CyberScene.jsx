import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

/* =========================
   HELPERS
   ========================= */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* =========================
   AI MIND BODY (NEURAL SHELL)
   ========================= */
function AIMindBody({ threat }) {
  const meshRef = useRef();
  const base = useRef(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const t = clock.elapsedTime;
    const geom = meshRef.current.geometry;

    if (!base.current) {
      base.current = geom.attributes.position.array.slice();
    }

    const pos = geom.attributes.position.array;
    const orig = base.current;

    const distortion = lerp(0.12, 0.55, threat);
    const breatheAmp = lerp(0.04, 0.14, threat);
    const breatheSpeed = lerp(0.7, 2.6, threat);
    const rotateSpeed = lerp(0.08, 0.35, threat);

    for (let i = 0; i < pos.length; i += 3) {
      const ox = orig[i];
      const oy = orig[i + 1];
      const oz = orig[i + 2];

      const noise =
        Math.sin(t * 1.6 + ox * 0.8 + oy * 0.8 + oz * 0.8) *
        distortion;

      pos[i] = ox + noise;
      pos[i + 1] = oy + noise;
      pos[i + 2] = oz + noise;
    }

    geom.attributes.position.needsUpdate = true;

    const breathe =
      1 + Math.sin(t * breatheSpeed) * breatheAmp;
    meshRef.current.scale.set(breathe, breathe, breathe);
    meshRef.current.rotation.y = t * rotateSpeed;
  });

  const color = threat > 0.6 ? "#ff1a1a" : "#00ffff";

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5.4, 96, 96]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={lerp(0.16, 0.28, threat)}
      />
    </mesh>
  );
}

/* =========================
   ENERGY VORTEX (THOUGHT FLOW)
   ========================= */
function Vortex({ threat }) {
  const groupRef = useRef();
  const particles = useRef([]);

  if (particles.current.length === 0) {
    for (let i = 0; i < 320; i++) {
      particles.current.push({
        angle: Math.random() * Math.PI * 2,
        radius: 1.6 + Math.random() * 2.8,
        height: (Math.random() - 0.5) * 2.4,
        speed: 0.6 + Math.random(),
      });
    }
  }

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.elapsedTime;
    const swirl = lerp(0.015, 0.045, threat);
    const pull = lerp(0.01, 0.06, threat);

    groupRef.current.children.forEach((mesh, i) => {
      const p = particles.current[i];
      p.angle += swirl * p.speed;

      // Collapse when critical
      const collapse = threat > 0.85 ? (threat - 0.85) * 0.8 : 0;
      const r = Math.max(0.4, p.radius - pull - collapse);

      mesh.position.x = Math.cos(p.angle) * r;
      mesh.position.z = Math.sin(p.angle) * r;
      mesh.position.y =
        p.height + Math.sin(t + p.angle) * lerp(0.2, 0.45, threat);
    });
  });

  const color = threat > 0.6 ? "#ff1a1a" : "#00ffff";

  return (
    <group ref={groupRef}>
      {particles.current.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[lerp(0.05, 0.075, threat), 8, 8]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={lerp(0.4, 0.9, threat)}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================
   SHOCKWAVE (INTRUSION EVENT)
   ========================= */
function Shockwave({ trigger, threat }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scale.set(0.01, 0.01, 0.01);
    ref.current.material.opacity = 1;
  }, [trigger]);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.scale.multiplyScalar(1.08);
    ref.current.material.opacity *= 0.92;
  });

  const color = threat > 0.6 ? "#ff1a1a" : "#00ffff";

  return (
    <mesh ref={ref}>
      <ringGeometry args={[0.6, 0.9, 64]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

/* =========================
   AI HEARTBEAT (AUDIO)
   ========================= */
function useHeartbeat(threat) {
  useEffect(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = 48; // sub-bass
    gain.gain.value = 0;

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    let id;
    const tick = () => {
      const bpm = lerp(40, 120, threat);
      const interval = 60000 / bpm;

      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.linearRampToValueAtTime(lerp(0.02, 0.08, threat), ctx.currentTime + 0.02);
      gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.18);

      id = setTimeout(tick, interval);
    };
    tick();

    return () => {
      clearTimeout(id);
      osc.stop();
      ctx.close();
    };
  }, [threat]);
}

/* =========================
   GLOBAL CORE
   ========================= */
function AICore({ children, threat }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * lerp(0.12, 0.45, threat);
  });

  return <group ref={ref}>{children}</group>;
}

/* =========================
   MAIN SCENE
   ========================= */
function SceneController() {
  const [threat, setThreat] = useState(0.15);
  const [shock, setShock] = useState(0);
  const [override, setOverride] = useState(null);

  useFrame(({ clock }) => {
    const demo = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 0.15);
    const next = override
      ? override === "ultron"
        ? 0.95
        : 0.15
      : demo;

    setThreat((t) => lerp(t, clamp(next), 0.03));
  });

  useEffect(() => {
    if (threat > 0.8) setShock((s) => s + 1);
  }, [threat]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() === "u") setOverride("ultron");
      if (e.key.toLowerCase() === "j") setOverride("jarvis");
      if (e.key.toLowerCase() === "a") setOverride(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useHeartbeat(threat);

  return (
    <AICore threat={threat}>
      <AIMindBody threat={threat} />
      <Vortex threat={threat} />
      <Shockwave trigger={shock} threat={threat} />
    </AICore>
  );
}

export default function CyberScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.6} />
      <SceneController />
    </Canvas>
  );
}
