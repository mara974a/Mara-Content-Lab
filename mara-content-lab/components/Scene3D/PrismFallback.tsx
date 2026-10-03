export default function PrismFallback() {
  return (
    <svg
      className="prism-fallback"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{
        width: "100%",
        height: "100%",
        opacity: 0.85,
        filter: "drop-shadow(0 0 35px rgba(16, 185, 129, 0.25))",
      }}
    >
      <defs>
        <radialGradient id="prismCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#059669" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="beamInGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="beamOutEmerald" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beamOutCyan" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beamOutAmber" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="beamOutViolet" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="720" cy="450" r="180" fill="url(#prismCoreGrad)" />

      {/* Input Source Laser */}
      <line x1="0" y1="450" x2="680" y2="450" stroke="url(#beamInGrad)" strokeWidth="3" strokeDasharray="8 4" />

      {/* Refracted Spectrum Output */}
      <line x1="760" y1="450" x2="1440" y2="220" stroke="url(#beamOutEmerald)" strokeWidth="3.5" />
      <line x1="760" y1="450" x2="1440" y2="360" stroke="url(#beamOutCyan)" strokeWidth="3" />
      <line x1="760" y1="450" x2="1440" y2="540" stroke="url(#beamOutAmber)" strokeWidth="3" />
      <line x1="760" y1="450" x2="1440" y2="680" stroke="url(#beamOutViolet)" strokeWidth="2.5" />

      {/* Geometric Prism Octahedron */}
      <g stroke="#34d399" strokeWidth="2" fill="rgba(16, 185, 129, 0.08)">
        <polygon points="720,330 800,450 720,570 640,450" />
        <line x1="720" y1="330" x2="720" y2="570" stroke="#22d3ee" strokeOpacity="0.7" />
        <line x1="640" y1="450" x2="800" y2="450" stroke="#34d399" strokeOpacity="0.8" />
      </g>
      <circle cx="720" cy="450" r="6" fill="#ffffff" filter="drop-shadow(0 0 10px #34d399)" />
    </svg>
  );
}
