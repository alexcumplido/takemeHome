import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: ReactElement }) {
  const elementRef: MutableRefObject <HTMLDivElement | null> = useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }

  useEffect(function () {
    const modalRoot = document.getElementById("modal");
    if(!modalRoot || !elementRef.current) {
      return;
    } 
    modalRoot.appendChild(elementRef.current);
    return function () {
      if(elementRef.current) modalRoot.removeChild(elementRef.current);    
    };
  }, []);
  
  return createPortal(<>{children}</>, elementRef.current);
}
