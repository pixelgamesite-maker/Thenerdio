import { heading, body, white, whiteSoft, lemon } from "@/lib/theme";

const PARTICLES = [
  { left: "8%",  size: 6,  duration: 9,  delay: 0    },
  { left: "18%", size: 4,  duration: 7,  delay: 1.2  },
  { left: "30%", size: 8,  duration: 11, delay: 0.4  },
  { left: "45%", size: 5,  duration: 8,  delay: 2.1  },
  { left: "58%", size: 7,  duration: 10, delay: 0.8  },
  { left: "70%", size: 4,  duration: 6.5,delay: 1.6  },
  { left: "82%", size: 6,  duration: 9.5,delay: 0.2  },
  { left: "92%", size: 5,  duration: 8.5,delay: 2.6  },
  { left: "38%", size: 3,  duration: 7.5,delay: 3.1  },
  { left: "64%", size: 3,  duration: 6,  delay: 1.9  },
];

export function HeroSection() {
  return (
    <div style={{
      position: "relative", overflow: "hidden", textAlign: "center",
      padding: "38px 20px 30px", marginBottom: "6px",
      background: "radial-gradient(ellipse at center 20%, rgba(215,242,76,0.1), transparent 65%)",
    }}>
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="nerdio-particle"
          style={{
            left: p.left, width: `${p.size}px`, height: `${p.size}px`,
            animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="nerdio-hero-photo-wrap">
        <div className="nerdio-hero-glow" />
        <img src="/Nerd-head.png" alt="Nerdio" className="nerdio-hero-photo" />
      </div>

      <h1 style={{
        margin: "22px 0 8px", fontFamily: heading, fontWeight: 800, color: white,
        fontSize: "clamp(1.6rem, 7vw, 2.2rem)", lineHeight: 1.15, letterSpacing: "-0.01em",
      }}>
        The internet's favorite<br />crypto nerd
      </h1>
      <p style={{
        margin: "0 auto", maxWidth: "320px", fontFamily: body,
        fontSize: "0.9rem", lineHeight: 1.6, color: whiteSoft,
      }}>
        Connect, complete daily tasks, and stack points while Nerdio runs the airdrop.
      </p>

      <div className="nerdio-scroll-cue" style={{ color: lemon }}>&darr;</div>

      <style>{`
        .nerdio-hero-photo-wrap {
          position: relative; width: 148px; height: 148px; margin: 0 auto;
        }
        .nerdio-hero-photo {
          position: relative; width: 100%; height: 100%; object-fit: cover;
          border-radius: 50%; border: 4px solid ${lemon};
          background: #fff; z-index: 1;
          animation: nerdio-float 4.5s ease-in-out infinite;
        }
        .nerdio-hero-glow {
          position: absolute; inset: -14px; border-radius: 50%;
          background: ${lemon}; opacity: 0.22; filter: blur(22px);
          animation: nerdio-pulse 3.2s ease-in-out infinite;
        }
        @keyframes nerdio-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes nerdio-pulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50% { opacity: 0.32; transform: scale(1.08); }
        }
        .nerdio-particle {
          position: absolute; bottom: -10px; border-radius: 50%;
          background: ${lemon}; opacity: 0;
          animation-name: nerdio-rise; animation-timing-function: ease-in;
          animation-iteration-count: infinite;
        }
        @keyframes nerdio-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.55; }
          90%  { opacity: 0.15; }
          100% { transform: translateY(-220px) scale(0.6); opacity: 0; }
        }
        .nerdio-scroll-cue {
          margin-top: 18px; font-size: 1.1rem;
          animation: nerdio-bounce 1.8s ease-in-out infinite;
        }
        @keyframes nerdio-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
