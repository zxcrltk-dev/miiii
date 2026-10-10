import { Composition } from "remotion";
import { PikachuVideo } from "./PikachuVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="PikachuEcology"
      component={PikachuVideo}
      durationInFrames={900}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
