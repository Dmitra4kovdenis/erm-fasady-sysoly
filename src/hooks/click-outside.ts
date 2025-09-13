import { RefObject, useEffect } from "react";

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent) {
      // Если кликнули на сам элемент или на его детей → игнорируем
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event); // иначе вызываем обработчик
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
