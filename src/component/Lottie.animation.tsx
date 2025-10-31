import Lottie from "lottie-react";
import animationData from "../assets/Full Lottie animation.json";

function LottieAnimation() {
  return (
    <div className="container py-5">
      <Lottie animationData={animationData} loop />
    </div>
  );
}

export default LottieAnimation;
