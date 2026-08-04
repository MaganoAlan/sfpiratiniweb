import React from "react";
import { Rim } from "react-glass-rim";

export function GlassCard() {
  return (
    <Rim
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      className="card"
      intensity={0.5}
    >
      <h3 style={{ color: "#d1d1d1" }}>Glass card</h3>
      <p style={{ color: "#d1d1d1" }}>The rim wraps these children.</p>
    </Rim>
  );
}
