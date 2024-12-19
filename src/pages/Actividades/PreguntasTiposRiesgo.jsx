import React, { useState, useEffect, useRef } from 'react';
import Audio1 from '../../assets/audio/sld8_fatiga.mp3';
import Audio2 from '../../assets/audio/sld8_uso_repetitivo.mp3';
import Audio3 from '../../assets/audio/sld8_riesgo_ergonomico.mp3';

const OPTIONS = [
  { value: 'Fatiga', label: 'Fatiga' },
  { value: 'Uso repetitivo', label: 'Uso repetitivo' },
  { value: 'Posturas incorrectas', label: 'Posturas incorrectas' },
];

const CORRECT_ANSWERS = {
  select1: 'Fatiga',
  select2: 'Uso repetitivo',
  select3: 'Posturas incorrectas',
};

export default function ErgonomicRisks() {
  const audioRefs = useRef([]);
  const [selections, setSelections] = useState({
    select1: '',
    select2: '',
    select3: '',
  });
  const [feedback, setFeedback] = useState('');
  const [isResetDisabled, setIsResetDisabled] = useState(true);
  const [validationStatus, setValidationStatus] = useState({});
  const [showValidateError, setShowValidateError] = useState(false);

  useEffect(() => {
    const hasAnySelection = Object.values(selections).some(value => value !== '');
    setIsResetDisabled(!hasAnySelection);
    setShowValidateError(false);
  }, [selections]);

  const handleAudioPlay = (index) => {
    audioRefs.current.forEach((audio, i) => {
      if (i !== index && audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const handleSelectChange = (selectId, value) => {
    setSelections(prev => ({
      ...prev,
      [selectId]: value
    }));
    setFeedback('');
    setValidationStatus({});
  };

  const getAvailableOptions = (currentSelectId) => {
    const selectedValues = Object.entries(selections)
      .filter(([key, value]) => key !== currentSelectId && value !== '')
      .map(([_, value]) => value);

    return OPTIONS.filter(option => !selectedValues.includes(option.value));
  };

  const handleReset = () => {
    setSelections({
      select1: '',
      select2: '',
      select3: '',
    });
    setFeedback('');
    setValidationStatus({});
    setShowValidateError(false);
    
    audioRefs.current.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const validateAnswers = () => {
    const allSelected = Object.values(selections).every(value => value !== '');
    
    if (!allSelected) {
      setShowValidateError(true);
      return;
    }

    const results = {
      select1: selections.select1 === CORRECT_ANSWERS.select1,
      select2: selections.select2 === CORRECT_ANSWERS.select2,
      select3: selections.select3 === CORRECT_ANSWERS.select3,
    };

    setValidationStatus(results);

    const correctCount = Object.values(results).filter(Boolean).length;
    setFeedback(
      correctCount === 3
        ? '¡Correcto! Todas las respuestas son correctas.'
        : `Tienes ${correctCount} de 3 respuestas correctas. Intenta de nuevo.`
    );
  };

  return (
    <div className="main-container mx-auto" style={{ maxWidth: '1200px', padding: '2rem' }}>
      <div className="activity-container bg-white rounded-lg shadow-lg p-6">
        <div className="row justify-content-center">
          {/* Primera fila con dos elementos */}
          <div className="col-md-6 mb-4">
            <div className="preguntas_01">
              <div className="ctItem-7">
                <p className="mb-3 fw-bold">Fatiga</p>
                <div className="audio-container mb-3">
                  <audio 
                    controls 
                    className="w-100"
                    ref={el => audioRefs.current[0] = el}
                    onPlay={() => handleAudioPlay(0)}
                  >
                    <source src={Audio1} type="audio/mp3" />
                  </audio>
                </div>
                <select
                  className={`form-select ${
                    validationStatus.select1 !== undefined
                      ? validationStatus.select1
                        ? 'is-valid'
                        : 'is-invalid'
                      : ''
                  }`}
                  value={selections.select1}
                  onChange={(e) => handleSelectChange('select1', e.target.value)}
                >
                  <option value="">Seleccione...</option>
                  {getAvailableOptions('select1').map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="preguntas_01">
              <div className="ctItem-7">
                <p className="mb-3 fw-bold">Uso repetitivo</p>
                <div className="audio-container mb-3">
                  <audio 
                    controls 
                    className="w-100"
                    ref={el => audioRefs.current[1] = el}
                    onPlay={() => handleAudioPlay(1)}
                  >
                    <source src={Audio2} type="audio/mp3" />
                  </audio>
                </div>
                <select
                  className={`form-select ${
                    validationStatus.select2 !== undefined
                      ? validationStatus.select2
                        ? 'is-valid'
                        : 'is-invalid'
                      : ''
                  }`}
                  value={selections.select2}
                  onChange={(e) => handleSelectChange('select2', e.target.value)}
                >
                  <option value="">Seleccione...</option>
                  {getAvailableOptions('select2').map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Segunda fila con un elemento centrado */}
          <div className="col-md-6 mb-4">
            <div className="preguntas_01">
              <div className="ctItem-7">
                <p className="mb-3 fw-bold">Posturas incorrectas</p>
                <div className="audio-container mb-3">
                  <audio 
                    controls 
                    className="w-100"
                    ref={el => audioRefs.current[2] = el}
                    onPlay={() => handleAudioPlay(2)}
                  >
                    <source src={Audio3} type="audio/mp3" />
                  </audio>
                </div>
                <select
                  className={`form-select ${
                    validationStatus.select3 !== undefined
                      ? validationStatus.select3
                        ? 'is-valid'
                        : 'is-invalid'
                      : ''
                  }`}
                  value={selections.select3}
                  onChange={(e) => handleSelectChange('select3', e.target.value)}
                >
                  <option value="">Seleccione...</option>
                  {getAvailableOptions('select3').map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Contenedor de retroalimentación y botones */}
        <div className="row justify-content-center">
          <div className="col-12">
            {(showValidateError || feedback) && (
              <div className="feedback-container">
                {showValidateError && (
                  <div className="text-error mb-3">
                    Por favor selecciona todas las opciones antes de validar
                  </div>
                )}
                {feedback && (
                  <div className={feedback.includes('Correcto') ? 'text-success' : 'text-error'}>
                    {feedback}
                  </div>
                )}
              </div>
            )}
            <div className="d-flex justify-content-center gap-3 mt-4" style={{ flexDirection: 'row' }}>
              <button
                onClick={validateAnswers}
                className="validate-button"
              >
                Validar
              </button>
              <button
                onClick={handleReset}
                className="validate-button reset-button"
                disabled={isResetDisabled}
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

