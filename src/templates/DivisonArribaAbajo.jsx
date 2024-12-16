import React, { useState, useEffect, lazy, Suspense } from "react";
import useStore from "../store";
import "../templates/styles/DivisonArribaAbajo.css";
import Paragraph from "../pages/components/Paragraph";
import Title from "../pages//components/Title";
import { useMediaQuery } from "react-responsive";
import Instruction from "../pages/components/Instruction";
import Button from "../pages/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import imgAvatar from "../assets/img/avatar-hombre-morado-blanco.webp";
import imgPeligro1 from "../assets/img/item-peligro_1.webp";
import imgPeligro2 from "../assets/img/item-peligro_2.webp";
import imgPeligro3 from "../assets/img/item-peligro_3.webp";
import imgPeligro4 from "../assets/img/item-peligro_4.webp";
import imgRecuerda from "../assets/img/botones/no-olvides-color.webp";

const ModalDialog = lazy(() => import("../pages/components/ModalDialog"));

function DivisonArribaAbajo() {
    const setIsOnDivisor = useStore((state) => state.setIsOnDivisor);
    const isMobile = useMediaQuery({ maxWidth: 640 });
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsOnDivisor(false);
    }, [setIsOnDivisor]);

    const tabs = [
        {
            title: "Peligro 1",
            content: {
                title: "Peligro: Sustancias Químicas",
                image: imgPeligro1,
                risk: "Ingestión / Contacto con la piel / Contacto con los ojos",
                consequence: "Muerte /Quemaduras /Intoxicaciones",
            },
        },
        {
            title: "Peligro 2",
            content: {
                title: "Peligro: Equipos, Herramienta u Objeto Punzocortante",
                image: imgPeligro2,
                risk: "Golpes o cortes",
                consequence: "Amputaciones/Fracturas/Contusiones",
            },
        },
        {
            title: "Peligro 3",
            content: {
                title: "Peligro: Electricidad Estática",
                image: imgPeligro3,
                risk: "Descarga eléctrica estática - Incendio",
                consequence: "Amputaciones/Quemaduras de Segundo y tercer grado/Muerte",
            },
        },
        {
            title: "Peligro 4",
            content: {
                title: "Peligro: Carga Suspendida",
                image: imgPeligro4,
                risk: "Caída de objetos en manipulación",
                consequence: "Muerte/Fracturas/Contusiones",
            },
        },
    ];

    return (
        <div className="quiz-container mb-36 md:mb-0">
            <div className="quiz-header">
                <Title>Pensemos…</Title>
                <Title>
                    Peligro y Riesgo… <span className="text-subtitle-color-qa">¿Son lo mismo o son diferentes…?</span>
                </Title>
            </div>
            <div className="flex justify-center items-center px-3">
                <Instruction theme="light" arrow="down">
                    Desplaza las flechas para ver cada <span className="font-bold">peligro</span> y observa su <span className="font-bold">riesgo</span> a la derecha
                </Instruction>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="md:w-1/4 flex flex-col items-center justify-center p-0">
                    <img src={imgAvatar} alt="imagen-avatar" className="w-3/4 mb-4" />
                    <Button
                        bold={false}
                        icon={faQuestionCircle}
                        roundedFull={true}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Recuerda
                    </Button>
                </div>
                <div className="md:w-2/3 p-4">
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        <div className="flex justify-center md:flex-col md:mr-4 mb-4 gap-[10px] md:mb-0 overflow-x-auto md:overflow-x-visible">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    className={`nav-link flex justify-center items-center ${activeTab === index ? 'active' : ''}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                        <div className="tab-content flex-grow">
                            <h5 className="mt-2 text-secondary-color font-bold">{tabs[activeTab].content.title}</h5>
                            <div className="flex flex-col md:flex-row items-center">
                                <img src={tabs[activeTab].content.image} alt="" className="w-full md:w-1/2 my-4" />
                                <div className="md:ml-4">
                                    <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}><strong>RIESGO:</strong> {tabs[activeTab].content.risk}</Paragraph>
                                    <Paragraph theme="light" justify={isMobile ? "justify" : "justify"}><strong>CONSECUENCIAS:</strong><br />{tabs[activeTab].content.consequence}</Paragraph>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Suspense fallback={<div>Cargando...</div>}>
                {isModalOpen && (
                    <ModalDialog
                        open={isModalOpen}
                        handleClose={() => setIsModalOpen(false)}
                        title="Recuerda"
                    >
                        <div className="flex justify-center">
                            <img src={imgRecuerda} alt="Pregunta" className="w-32 mb-4" />
                        </div>
                        <Paragraph theme="light" justify="justify">
                            Mientras que el PELIGRO es una fuente o situación con potencial de causar daño, el RIESGO es la combinación de la probabilidad de que ocurra este daño y el IMPACTO o consecuencia que puede ocasionar en las personas y el ambiente.</Paragraph>
                    </ModalDialog>
                )}
            </Suspense>
        </div>
    );
}

export default DivisonArribaAbajo;