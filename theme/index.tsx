import Theme from "rspress/theme";
import { useEffect } from "react";
// 以下展示所有的 Props
const Layout = () => {
  useEffect(() => {
    let dom = document.getElementById("aside-container");

    dom?.addEventListener("mouseenter", () => {
      let stage = document.getElementById("oml2d-stage") as HTMLElement;
      stage.style.opacity = "0";
      stage.style.zIndex = "-1";
    });
    dom?.addEventListener("mouseleave", () => {
      let stage = document.getElementById("oml2d-stage") as HTMLElement;
      stage.style.opacity = "1";
      stage.style.zIndex = "0";
    });
  }, []);

  return <Theme.Layout />;
};
export default {
  ...Theme,
  Layout,
};

export * from "rspress/theme";
