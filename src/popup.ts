function loadPage() {
  let enableH = document.querySelector("#enableH") as HTMLInputElement; //開啟自動簽到
  let enableS = document.querySelector("#enableS") as HTMLInputElement; //開啟自動簽到
  let enableZ = document.querySelector("#enableZ") as HTMLInputElement; //開啟自動簽到
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

  chrome.storage.sync.get(["signTime", "enableH", "enableS", "enableZ"], (data) => {
    
    if (data.signTime === undefined) {
      data.signTime = { hours: 0, minutes: 5 };
      chrome.storage.sync.set({
        signTime: data.signTime, //預計簽到時間
      });
    }

    if (data.enableH === undefined) {
      data.enableH = true;
      chrome.storage.sync.set({
        enableH: data.enableH, //是否啟動
      });
    }

    if (data.enableS === undefined) {
      data.enableS = true;
      chrome.storage.sync.set({
        enableS: data.enableS, //是否啟動
      });
    }

    if (data.enableZ === undefined) {
      data.enableZ = true;
      chrome.storage.sync.set({
        enableZ: data.enableZ, //是否啟動
      });
    }

    enableH.checked = Boolean(data.enableH);
    enableS.checked = Boolean(data.enableS);
    enableZ.checked = Boolean(data.enableZ);
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

  function changeSettingH() {
    chrome.storage.sync.set({
      enableH: enableH.checked,
      isopen: false,
    });
  }

  function changeSettingS() {
    chrome.storage.sync.set({
      enableS: enableS.checked,
      isopen: false,
    });
  }

  function changeSettingZ() {
    chrome.storage.sync.set({
      enableZ: enableZ.checked,
      isopen: false,
    });
  }

  hours.addEventListener("change", change);
  minutes.addEventListener("change", change);
  enableH.addEventListener("change", changeSettingH);
  enableS.addEventListener("change", changeSettingS);
  enableZ.addEventListener("change", changeSettingZ);
}

window.onload = loadPage;