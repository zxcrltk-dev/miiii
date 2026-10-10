import { interpolate, useCurrentFrame } from "remotion";

// 단순화한 팬아트풍 피카츄 얼굴. body 색만 바꿔 피츄/라이츄 표현에도 재사용.
export const Pikachu: React.FC<{
  size: number;
  body?: string;
  cheekGlow?: number;
}> = ({ size, body = "#FFD43B", cheekGlow = 0 }) => {
  const frame = useCurrentFrame();
  // 2.5초마다 눈 깜빡임
  const blink = frame % 75 < 4 ? 0.15 : 1;

  return (
    <svg width={size} height={size} viewBox="0 0 400 400">
      <defs>
        <clipPath id="earL">
          <ellipse cx="105" cy="90" rx="38" ry="95" transform="rotate(-30 105 90)" />
        </clipPath>
        <clipPath id="earR">
          <ellipse cx="295" cy="90" rx="38" ry="95" transform="rotate(30 295 90)" />
        </clipPath>
      </defs>
      <ellipse cx="105" cy="90" rx="38" ry="95" transform="rotate(-30 105 90)" fill={body} stroke="#222" strokeWidth="6" />
      <rect x="0" y="-20" width="200" height="75" fill="#222" clipPath="url(#earL)" />
      <ellipse cx="295" cy="90" rx="38" ry="95" transform="rotate(30 295 90)" fill={body} stroke="#222" strokeWidth="6" />
      <rect x="200" y="-20" width="200" height="75" fill="#222" clipPath="url(#earR)" />
      <ellipse cx="200" cy="250" rx="160" ry="135" fill={body} stroke="#222" strokeWidth="6" />
      <ellipse cx="140" cy="225" rx="18" ry={22 * blink} fill="#222" />
      <ellipse cx="260" cy="225" rx="18" ry={22 * blink} fill="#222" />
      <circle cx="146" cy="216" r="6" fill="#fff" opacity={blink} />
      <circle cx="266" cy="216" r="6" fill="#fff" opacity={blink} />
      <path d="M192 255 L208 255 L200 263 Z" fill="#222" />
      <path d="M175 275 Q187 290 200 275 Q213 290 225 275" fill="none" stroke="#222" strokeWidth="5" strokeLinecap="round" />
      {[90, 310].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy="275"
          r="32"
          fill="#F03E3E"
          style={{
            filter: `drop-shadow(0 0 ${cheekGlow * 30}px #FFF3BF)`,
          }}
        />
      ))}
      <circle cx="90" cy="275" r="32" fill="#FFF3BF" opacity={cheekGlow * interpolate(Math.sin(frame / 2), [-1, 1], [0.2, 0.7])} />
      <circle cx="310" cy="275" r="32" fill="#FFF3BF" opacity={cheekGlow * interpolate(Math.sin(frame / 2), [-1, 1], [0.2, 0.7])} />
    </svg>
  );
};

export const Bolt: React.FC<{ size: number; color?: string }> = ({ size, color = "#FFD43B" }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 40 60">
    <path d="M24 0 L4 34 L18 34 L12 60 L36 22 L22 22 Z" fill={color} stroke="#222" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
