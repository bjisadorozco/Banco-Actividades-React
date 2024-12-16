import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

// import imgMain from '../../assets/img/ManejoCargas/4-main.png'
// import imgSwiper1 from '../../assets/img/ManejoCargas/4-Slide-1.jpeg'
// import imgSwiper2 from '../../assets/img/ManejoCargas/4-Slide-2.jpeg'
// import imgSwiper3 from '../../assets/img/ManejoCargas/4-Slide-3.jpeg'

import Title from "../pages/components/Title";
import Subtitle from "../pages/components/Subtitle";
import Paragraph from "../pages/components/Paragraph";
import Instruction from "../pages/components/Instruction";
import Button from "../pages/components/Button";
import "../templates/styles/TreintaSetentaTemplate.css"
import useStore from "../store";

export default function TreintaSetentaTemplate() {
  const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [instructionWidth, setInstructionWidth] = useState(0);
  const mainImageRef = useRef(null);

  useEffect(() => {
    setIsOnDivisor(false);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsOnDivisor]);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  // Define slides array (replace with your actual images when uncommented)
  const slides = [
    { image: 'placeholder1.jpg' },
    { image: 'placeholder2.jpg' },
    { image: 'placeholder3.jpg' },
  ];

  return (
    <div className="flex flex-col md:flex-row mb-36 md:mb-0">
      {/* Left Column */}
      <div className="md:w-2/5 w-full h-auto md:h-screen bg-slate-900 px-6 md:px-20 py-6 md:py-3 flex flex-col justify-center items-center">
        <div className="text-center">
          <Title>Recordemos...</Title>
          <Subtitle>¿Qué es una carga?</Subtitle>
        </div>
        <Paragraph theme='dark' justify={isMobile ? 'justify' : 'justify'}>
          Recordemos que CARGA es cualquier objeto que puede ser removido o
          trasladado. Veamos algunos criterios para que sea una carga en el
          trabajo
        </Paragraph>
      </div>

      {/* Right Column */}
      <div className="md:w-3/5 w-full bg-white px-6 md:pr-20 py-6 md:py-3 flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="w-auto mb-4">
              <Instruction arrow="down" theme="light" className="w-full text-center">
                Haz clic para ver mas informacion
              </Instruction>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}