import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import useStore from "../store";

const desktopBackgroundImage = "https://placehold.co/1960x1080";
const mobileBackgroundImage = "https://placehold.co/640x1136"; // Example mobile background

function DivisorMomentos({
  background = desktopBackgroundImage,
  mobileBackground = mobileBackgroundImage,
  index,
  line1,
  line2,
  line3,
  momento,
}) {
  const setSlideIndex = useStore((state) => state.setSlideIndex);
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    setIsOnDivisor(true);
  }, [setIsOnDivisor]);

  const backgroundImage = isMobile ? mobileBackground : background;

  return (
    <div className="container slider02 relative min-h-screen p-0 m-0">
      <div
        className="absolute -z-10 inset-0 bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          width: "100vw",
          height: "100%",
        }}
      >
        <div className={`flex flex-col ${isMobile ? 'text-4xl px-6' : 'text-7xl px-40'} z-50 justify-center h-full -mt-20 font-bold text-center md:text-start content-start`}>
          <h1 className="text-white">
            {line1}
            <span className="text-main-color"></span>
          </h1>
          <h1 className="text-white">
            {line2}
            <span className="text-main-color"></span>
          </h1>
          <h1 className="text-white">
            {line3}
            <span className="text-main-color"></span>
          </h1>
          <div className="mt-5">
            <hr className="md:w-[70%] w-[100%] flex  h-1 bg-white border-none" />
          </div>
          <p className="text-white text-momento-size-mobile md:text-momento-size mt-5">
            {momento}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DivisorMomentos;