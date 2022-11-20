import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// import React, { ReactNode } from 'react';
// type TypeModal = { children: React.ReactNode };
export function Modal({ children }) {
  const elementRef = useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }
  useEffect(function () {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elementRef.current);

    return function () {
      modalRoot.removeChild(elementRef.current);
    };
  }, []);
  return createPortal(<>{children}</>, elementRef.current);
}
