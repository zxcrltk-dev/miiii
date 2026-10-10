import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { EvolutionScene, FactScene, IntroScene } from "./Scenes";

const t = <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 15 })} />;

// 장면 합계 960프레임 - 전환 4×15 = 900프레임(30초 @30fps)
export const PikachuVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Intro" durationInFrames={150}>
      <IntroScene />
    </TransitionSeries.Sequence>
    {t}
    <TransitionSeries.Sequence name="Habitat" durationInFrames={195}>
      <FactScene
        tag="생태 01 · 서식지"
        title={"숲 속에서\n무리 지어 생활"}
        background="linear-gradient(#EBFBEE, #8CE99A)"
        lines={["주로 숲에 무리를 지어 산다", "꼬리를 세워 주변 상황을 살핀다"]}
      />
    </TransitionSeries.Sequence>
    {t}
    <TransitionSeries.Sequence name="Food" durationInFrames={195}>
      <FactScene
        tag="생태 02 · 먹이"
        title={"나무열매를\n좋아해요"}
        background="linear-gradient(#FFF4E6, #FFC078)"
        lines={["단단한 열매는 전기로 구워 먹는다", "키 0.4m · 몸무게 6.0kg"]}
      />
    </TransitionSeries.Sequence>
    {t}
    <TransitionSeries.Sequence name="Electric" durationInFrames={225}>
      <FactScene
        tag="생태 03 · 전기 주머니"
        title="볼에 전기 저장!"
        background="linear-gradient(#FFF9DB, #FFE066)"
        cheekGlow={1}
        lines={["양 볼의 주머니에 전기를 모은다", "잠자는 동안 전기를 충전한다", "여럿 모이면 번개를 부르기도!"]}
      />
    </TransitionSeries.Sequence>
    {t}
    <TransitionSeries.Sequence name="Evolution" durationInFrames={195}>
      <EvolutionScene />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
