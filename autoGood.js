// インターバルの時間（ミリ）
const INTERVAL = 1500;

// タイムアウトになるまでの最大処理回数
const TIMEOUT_LIMIT = 5;

chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  // 接続タイプがrequestじゃなかったら何もせず処理終了
  if (msg.type != "request") return;

  let notice = "";
  let exec_num = 0;

  while (true) {
    // ボタンを取得
    let btnType = document.getElementById("btnType");

    if (btnType == null) {
      notice = "対象のボタンが見つかりません";
      break;
    }

    // goodボタン非表示のセレクタがあったら処理終了(hiddenElementが非表示セレクタ)
    if (btnType.className.match(/hiddenElement/) != null) {
      notice = `処理が完了しました。今回処理した件数は「${exec_num}件」です`;
      break;
    }

    for (let timeoutCnt = 0; timeoutCnt < TIMEOUT_LIMIT; timeoutCnt++) {
      // 指定した秒数処理をストップ
      await new Promise(resolve => setTimeout(resolve, INTERVAL));

      // waitセレクタを取得
      let wait = document.querySelector(".wait");

      // waitが消えていたらいいねをクリック
      if (wait == null) {
        btnType.click();
        exec_num++;
        break;
      } else {
        timeoutCnt++;
      }

      // タイムアウト
      if (TIMEOUT_LIMIT <= timeoutCnt) {
        notice = "タイムアウト:ネットワーク状況が悪いようです。";
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, INTERVAL));
  }
  chrome.runtime.sendMessage({ type: "response", notice });
});
