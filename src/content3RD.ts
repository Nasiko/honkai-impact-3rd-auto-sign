/**
 * 取得所有簽到格子
 * @returns
 */
 function get3RDSignContent() {
    return new Promise<HTMLDivElement[]>((resolve) => {
      setTimeout(() => {
        let dom = document.querySelectorAll("div[class*=components-home-assets-__sign-content_---signday]"); 
        if (dom) {
          resolve(Array.from(dom) as HTMLDivElement[]);
        } 
      }, 1000);
    });
  }
  
  (async () => {
    //取得簽到
    const contents = await get3RDSignContent();

    //需要點擊的div
    const needSignDiv = contents.find((el) => el.className.includes("signday"));
  
    //簽到
    if (needSignDiv) {
      console.log("簽到成功!")
      needSignDiv.click();
    } else {
      console.log("簽到失敗.")
    }
  })();