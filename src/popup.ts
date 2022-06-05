function loadPage() {
  let enable = document.querySelector("#enable") as HTMLInputElement; //開啟自動簽到
  let hours = document.querySelector("#hours") as HTMLInputElement; //小時
  let minutes = document.querySelector("#minutes") as HTMLInputElement; //分鐘
  let container = document.querySelector(".container") as HTMLDivElement;
  let home = document.querySelector(".home") as HTMLDivElement;

  let page = localStorage.getItem("page");

  if (page) {
    if (page !== "home") {
      container.style.width = "298px";
      home.setAttribute("hidden", "");
    } else {
      container.style.width = "200px";
      home.removeAttribute("hidden");
    }
  }

  chrome.storage.sync.get(["signTime", "enable"], (data) => {
    
    if (data.signTime === undefined) {
      data.signTime = { hours: 0, minutes: 5 };
      chrome.storage.sync.set({
        signTime: data.signTime, //預計簽到時間
      });
    }

    if (data.enable === undefined) {
      data.enable = true;
      chrome.storage.sync.set({
        enable: data.enable, //是否啟動
      });
    }

    enable.checked = Boolean(data.enable);
    hours.value = data.signTime.hours;
    minutes.value = data.signTime.minutes;
  });

  // 修改過時間，今日就設為未簽到
  function change() {
    chrome.storage.sync.set({
      signTime: {
        hours: Number(hours.value),
        minutes: Number(minutes.value),
      },
      isopen: false,
    });
  }

  function changeSetting() {
    chrome.storage.sync.set({
      enable: enable.checked,
    });
  }

  hours.addEventListener("change", change);
  minutes.addEventListener("change", change);
  enable.addEventListener("change", changeSetting);
}

window.onload = loadPage;