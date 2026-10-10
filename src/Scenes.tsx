import { loadFont } from "@remotion/fonts";
import { AbsoluteFill, Easing, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Bolt, Pikachu } from "./Pikachu";

// Jua (SIL OFL) 로컬 파일: 오프라인 렌더링에서도 동작
const fontFamily = "Jua";
loadFont({ family: fontFamily, url: staticFile("Jua-Regular.ttf") });

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const Sparks: React.FC = () => {
  const frame = useCurrentFrame();
  const spots = [
    [30, 700, -15],
    [970, 560, 20],
    [30, 1780, 10],
    [970, 1700, -20],
  ];
  return (
    <>
      {spots.map(([x, y, r], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x,
            top: y,
            rotate: `${r}deg`,
            opacity: interpolate(Math.sin(frame / 6 + i * 2), [-1, 1], [0.25, 0.9]),
          }}
        >
          <Bolt size={70} />
        </div>
      ))}
    </>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 40%, #FFF3BF, #FFD43B 70%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily,
        wordBreak: "keep-all",
        gap: 40,
      }}
    >
      <Sparks />
      <Interactive.Div
        name="Pikachu"
        style={{
          scale: interpolate(frame, [0, 0.8 * fps], [0, 1], { ...clamp, easing: Easing.spring({ damping: 12 }), output: "perceptual-scale" }),
          translate: `0px ${Math.sin(frame / 8) * 12}px`,
        }}
      >
        <Pikachu size={620} />
      </Interactive.Div>
      <Interactive.Div
        name="Title"
        style={{
          fontSize: 130,
          color: "#222",
          opacity: interpolate(frame, [0.6 * fps, 1.2 * fps], [0, 1], { ...clamp, easing: ease }),
          translate: interpolate(frame, [0.6 * fps, 1.2 * fps], ["0px 60px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        피카츄 생태 탐구
      </Interactive.Div>
      <Interactive.Div
        name="Subtitle"
        style={{
          fontSize: 56,
          color: "#5C3D00",
          background: "#fff",
          padding: "16px 40px",
          borderRadius: 999,
          border: "5px solid #222",
          opacity: interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 1], { ...clamp, easing: ease }),
        }}
      >
        쥐포켓몬 · 전기 타입 · No.0025
      </Interactive.Div>
    </AbsoluteFill>
  );
};

export type FactProps = {
  tag: string;
  title: string;
  lines: string[];
  background: string;
  cheekGlow?: number;
};

export const FactScene: React.FC<FactProps> = ({ tag, title, lines, background, cheekGlow = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background, fontFamily, wordBreak: "keep-all", padding: "140px 80px", alignItems: "center" }}>
      <Sparks />
      <Interactive.Div
        name="Tag"
        style={{
          fontSize: 48,
          color: "#fff",
          background: "#222",
          padding: "12px 36px",
          borderRadius: 999,
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], { ...clamp, easing: ease }),
        }}
      >
        {tag}
      </Interactive.Div>
      <Interactive.Div
        name="Title"
        style={{
          fontSize: 120,
          color: "#222",
          marginTop: 40,
          textAlign: "center",
          lineHeight: 1.15,
          whiteSpace: "pre-line",
          opacity: interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], { ...clamp, easing: ease }),
          translate: interpolate(frame, [0.2 * fps, 0.7 * fps], ["0px 50px", "0px 0px"], { ...clamp, easing: ease }),
        }}
      >
        {title}
      </Interactive.Div>
      <Interactive.Div
        name="Pikachu"
        style={{
          marginTop: 30,
          translate: `0px ${Math.sin(frame / 8) * 12}px`,
          rotate: `${Math.sin(frame / 12) * 4}deg`,
        }}
      >
        <Pikachu size={520} cheekGlow={cheekGlow} />
      </Interactive.Div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 30, width: "100%" }}>
        {lines.map((line, i) => (
          <Interactive.Div
            key={line}
            name={`Line ${i + 1}`}
            style={{
              fontSize: 52,
              color: "#222",
              background: "rgba(255,255,255,0.85)",
              border: "4px solid #222",
              borderRadius: 32,
              padding: "24px 36px",
              lineHeight: 1.3,
              opacity: interpolate(frame, [(0.9 + i * 0.6) * fps, (1.3 + i * 0.6) * fps], [0, 1], { ...clamp, easing: ease }),
              translate: interpolate(frame, [(0.9 + i * 0.6) * fps, (1.3 + i * 0.6) * fps], ["-60px 0px", "0px 0px"], { ...clamp, easing: ease }),
            }}
          >
            ⚡ {line}
          </Interactive.Div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const stages = [
  { name: "피츄", body: "#FFE066", size: 220 },
  { name: "피카츄", body: "#FFD43B", size: 280 },
  { name: "라이츄", body: "#F59F00", size: 320 },
];

export const EvolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "linear-gradient(#E7F5FF, #A5D8FF)", fontFamily, wordBreak: "keep-all", padding: "140px 80px", alignItems: "center" }}>
      <Interactive.Div name="Tag" style={{ fontSize: 48, color: "#fff", background: "#222", padding: "12px 36px", borderRadius: 999 }}>
        생태 04 · 진화
      </Interactive.Div>
      <Interactive.Div name="Title" style={{ fontSize: 120, color: "#222", marginTop: 40 }}>
        진화 과정
      </Interactive.Div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
        {stages.map((s, i) => (
          <div key={s.name} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {i > 0 ? (
              <div style={{ fontSize: 44, color: "#1864AB", opacity: interpolate(frame, [i * 1.2 * fps - 10, i * 1.2 * fps], [0, 1], clamp) }}>
                ▼ {i === 1 ? "친밀도 UP" : "천둥의돌"}
              </div>
            ) : null}
            <Interactive.Div
              name={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 30,
                scale: interpolate(frame, [i * 1.2 * fps, (i * 1.2 + 0.5) * fps], [0, 1], { ...clamp, easing: Easing.spring({ damping: 12 }), output: "perceptual-scale" }),
              }}
            >
              <Pikachu size={s.size} body={s.body} />
              <span style={{ fontSize: 84, color: "#222" }}>{s.name}</span>
            </Interactive.Div>
          </div>
        ))}
      </div>
      <Interactive.Div
        name="Outro"
        style={{
          fontSize: 60,
          color: "#222",
          marginTop: "auto",
          opacity: interpolate(frame, [4 * fps, 4.5 * fps], [0, 1], { ...clamp, easing: ease }),
        }}
      >
        ⚡ 다음 생태 탐구도 기대해 주세요!
      </Interactive.Div>
    </AbsoluteFill>
  );
};
