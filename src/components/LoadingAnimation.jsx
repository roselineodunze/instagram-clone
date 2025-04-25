import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading-animation.json";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-280 h-280">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
