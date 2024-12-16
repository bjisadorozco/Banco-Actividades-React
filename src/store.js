import create from "zustand";

/**
 * Este archivo define una tienda Zustand para gestionar el estado de la aplicación
 * 
 * La tienda contiene las siguientes variables de estado y sus correspondientes setters:
 * 
 * - slideIndex: El índice actual de la diapositiva que se está mostrando.
 *   - setSlideIndex(index): Establece el índice de la diapositiva actual al valor especificado.
 * 
 * - totalSlides: El número total de diapositivas en la presentación.
 *   - setTotalSlides(total): Establece el número total de diapositivas al valor especificado.
 * 
 * - currentProgress: El progreso actual de la presentación, típicamente representado como un porcentaje.
 *   - setCurrentProgress(progress): Establece el progreso actual al valor especificado.
 * 
 * - isOnDivisor: Un booleano que indica si la diapositiva actual es un divisor de momentos. Esto se hace con el propósito de definir el color de las flechas de navegación.
 *   - setIsOnDivisor(bool): Establece el indicador isOnDivisor al valor booleano especificado.
 * 
 */

const useStore = create((set) => ({
  slideIndex: 0,
  setSlideIndex: (index) => set({ slideIndex: index }),
  totalSlides: 0,
  setTotalSlides: (total) => set({ totalSlides: total }),
  currentProgress: 0,
  setCurrentProgress: (progress) => set({ currentProgress: progress }),
  isOnDivisor: false,
  setIsOnDivisor: (bool) => set({ isOnDivisor: bool }),
}));

export default useStore;
