import { constants } from "buffer";

/**
 * 取得所有簽到格子
 * @returns
 */
 function getAllSignContent() {
    return new Promise<HTMLDivElement[]>((resolve) => {
      setInterval(() => {
        let dom = document.querySelectorAll("div[class*=components-home-assets-__sign-content_---signday]");
  
        if (dom && dom.length > 0) {
          resolve(Array.from(dom) as HTMLDivElement[]);
        } else {
          setTimeout(()=>{}, 10000);
          dom = document.querySelectorAll("[class*=components-pc-assets-__prize-list_---item]");
          if(dom) {
            resolve(Array.from(dom) as HTMLDivElement[]);
          }
        }
      }, 1000);
    });
  }
  
  (async () => {
    //取得簽到
    const contents = await getAllSignContent();

    //需要點擊的div
    const needSignDiv = contents.find((el) => el.className.includes("signday")) || contents.filter(el => el.style.backgroundImage.indexOf('6285576485616685271') != -1)?.[0];
   
    //簽到
    if (needSignDiv) {
      needSignDiv.click();
    }
  })();