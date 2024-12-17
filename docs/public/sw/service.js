if ("serviceWorker" in window.navigator) {
  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/Manshawar-blog/sw/index.js", {
          scope: "/sw/",
        });
        console.log(registration, "注册");
        if (registration.installing) {
          console.log("正在安装 Service worker");
        } else if (registration.waiting) {
          console.log("已安装 Service worker installed");
        } else if (registration.active) {
          console.log("激活 Service worker");
        }
      } catch (error) {
        console.error(`注册失败：${error}`);
      }
    }
  };

  registerServiceWorker();
}
