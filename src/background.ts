import { IDataType } from "./interface/DataType";

let config: IDataType = {
  lastDate: new Date().getDate(), 
  signTime: {
    hours: 0,
    minutes: 5,
  },
  enableH: true, // 是否啟動「崩壞3RD」自動簽到
  enableS: true, // 是否啟動「星穹鐵道」自動簽到
  enableZ: true, // 是否啟動「絕區零」自動簽到
  isopen: false, // 是否簽到
};

chrome.alarms.clear('HoYoLabSign');

chrome.alarms.onAlarm.addListener(() => {
  chrome.storage.sync.get(["lastDate", "signTime", "enableH", "enableS", "enableZ", "isopen"], (data) => {
    let { lastDate, signTime, enableH, enableS, enableZ, isopen } = data as IDataType;

    if (lastDate === undefined) {
      lastDate = new Date().getDate();
      chrome.storage.sync.set({
        lastDate: lastDate, //上次簽到日期
      });
    }

    if (signTime === undefined) {
      signTime = { hours: 0, minutes: 5 };
      chrome.storage.sync.set({
        signTime: signTime, //預計簽到時間
      });
    }

    if (enableH === undefined) {
      enableH = true;
      chrome.storage.sync.set({
        enable: enableH, //是否啟動
      });
    }

    if (enableS === undefined) {
      enableS = true;
      chrome.storage.sync.set({
        enable: enableS, //是否啟動
      });
    }

    if (enableZ === undefined) {
      enableZ = true;
      chrome.storage.sync.set({
        enable: enableZ, //是否啟動
      });
    }

    if (isopen === undefined) {
      isopen = false;
      chrome.storage.sync.set({
        isopen: isopen, //是否簽到
      });
    }

    // 未啟動就不執行
    if (!(enableH || enableS || enableZ)) return;

    let h = Number(signTime.hours);
    let m = Number(signTime.minutes);

    let now = new Date(); //目前時間
    let year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDate();
    let old = new Date(year, month, day, h, m);

    /* debug */
    console.clear();
    console.log("CurrentDate:", now);
    // console.log("IsOpen:", isopen);
    // console.log("Now:", now.getDate(), ",Last:", lastDate);

    if (isopen && now.getDate() !== lastDate) {
      isopen = false;
      chrome.storage.sync.set({
        isopen: isopen,
      }); 
    }

    //如果日期不同且大於設定時間的話就自動開網頁簽到
    if (!isopen && now > old) {
      //簽到後用目前時間覆蓋掉上次時間，防止重複開啟網頁
      chrome.storage.sync.set({
        lastDate: new Date().getDate(),
      });

      //設定為已簽到
      chrome.storage.sync.set({
        isopen: true,
      });

      //開啟米哈遊的簽到頁面
      //這邊不需要做任何簽到動作，因為content.ts裡面已經設定只要開啟米哈遊網頁就會自動簽到了

      if (enableH) {
        chrome.tabs.create({
          url: "https://act.hoyolab.com/bbs/event/signin-bh3/index.html?act_id=e202110291205111",
          active: false, //開啟分頁時不會focus
        });
      }

      if (enableS) {
        chrome.tabs.create({
          url: "https://act.hoyolab.com/bbs/event/signin/hkrpg/index.html?act_id=e202303301540311",
          active: false, //開啟分頁時不會focus
        });
      }

      if (enableZ) {
        chrome.tabs.create({
          url: "https://act.hoyolab.com/bbs/event/signin/zzz/e202406031448091.html?act_id=e202406031448091",
          active: false, //開啟分頁時不會focus
        });
      }
    }
  });
});

chrome.alarms.create('HoYoLabSign', { delayInMinutes: 1, periodInMinutes : 1  });