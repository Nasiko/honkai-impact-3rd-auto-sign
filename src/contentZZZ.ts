/**
 * 取得所有簽到格子
 * @returns
 */
function getZZZSignContent() {
    return new Promise<HTMLDivElement[]>((resolve) => {
      setTimeout(() => {
        let dom = document.querySelectorAll("[class*=components-pc-assets-__prize-list_---item]");
        if (dom) {
          resolve(Array.from(dom) as HTMLDivElement[]);
        }
      }, 5000);
    });
  }
  
  (async () => {
    //取得簽到
    const contents = await getZZZSignContent();

    //需要點擊的div
    const needSignDiv = contents.filter(el => el.style.backgroundImage.indexOf('3b211daae47bbfac6bed5b447374a325_3353871917298254056') != -1)?.[0];

    //星鐵簽到頁有BUG會跳登入畫面
    const logindiv = document.querySelector(".close-icon") as HTMLDivElement

    if (logindiv) {
      console.log(logindiv);
      logindiv.click();
    }
   
    //簽到
    if (needSignDiv) {
      console.log("簽到成功!")
      needSignDiv.click();
    } else {
      console.log("簽到失敗.")
    }
  })();