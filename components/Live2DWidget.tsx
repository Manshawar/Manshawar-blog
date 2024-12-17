import React, { useEffect } from "react";

import { loadOml2d } from "oh-my-live2d";

// let stage = document.querySelector(".oml2d-stage");

const Live2DWidget = options => {
  useEffect(() => {
    loadOml2d(options);
    // dom.addEventListener("mouseenter", () => {
    //   // stage.style.display = "none";
    // });
  }, []);
  return;
};

export default Live2DWidget;
