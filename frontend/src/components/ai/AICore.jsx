import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

/* =========================
   GENERIC VORTEX
   ========================= */
function Vortex({ color, speed }) {
  const groupRef = useRef();

  const particles = useMemo(() => {
    return Array.from({ length: 320 }).map((_, i) => {
      const t = i / 320;
      return {
        angle: t * Math.PI * 8,
        radius: 2.5 - t * 2.0,
        y: (Math.random() - 0.5) * 0.6,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const time = clock.elapsedTime;

    groupRef.current.children.forEach((mesh, i) => {
      const p = particles[i];
      p.angle += 0.01 * speed;

      mesh.position.x = Math.cos(p.angle) * p.radius;
      mesh.position.z = Math.sin(p.angle) * p.radius;
      mesh.position.y =
        p.y + Math.sin(time + p.angle) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.9}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================
   MAIN AI CORE
   ========================= */
export default function AICore({ threatLevel = 0.4 }) {
  let mode = "low";

  if (threatLevel >= 0.66) mode = "high";
  else if (threatLevel >= 0.33) mode = "medium";

  return (
    <div style={styles.container}>
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        {mode === "low" && (
          <Vortex color="#00ffff" speed={0.6} />
        )}
        {mode === "medium" && (
          <Vortex color="#ffd24d" speed={1.1} />
        )}
        {mode === "high" && (
          <Vortex color="#ff1a1a" speed={1.8} />
        )}
      </Canvas>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100%",
    background:
      "radial-gradient(circle at center, #020b14, #000)",
    borderRadius: "12px",
  },
};
