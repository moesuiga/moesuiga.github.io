document.head.innerHTML += `
<style>
  .live2d-widget-dialog-container-2 {
    width: 100%;
    position: absolute;
    z-index: -1;
    bottom: 100%;
    left: 0;
    padding: 12px;
    box-sizing: border-box;
  }
  .live2d-widget-dialog-2 {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 60px;
    color: #917159;
    font-size: 16px;
    padding: 12px;
    border: 2px solid rgb(236, 203, 180);
    background: rgb(252, 248, 244);
    box-sizing: border-box;
    border-radius: 10px;
    -webkit-font-smoothing: antialiased;
    opacity: 0;
    transition: 200ms opacity;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    word-break: break-all;
    font-family: STXinwei, STKaiTi, STHeiti, STLiTi, Roboto, "Open Sans", "Hiragino Sans GB", "Hannotate SC", "Hanzipen SC", "Source Han Sans CN", FZYiHei-M20S, "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  .live2d-widget-dialog-2::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 10px;
    height: 10px;
    border-bottom: 2px solid rgb(236, 203, 180);
    background: rgb(252, 248, 244);
    border-right: 2px solid rgb(236, 203, 180);
    transform: translate(-50%, -4px) rotate(45deg);
  }
  .live2d-widget-dialog-container-2 p {
    margin: 0;
  }
  .live2d-widget-dialog-true {
    display: none;
  }
  .live2d-widget-dialog-container-2:active .live2d-widget-dialog-true {
    display: block;
  }
</style>
`;

(function myLive2dWidgetDialog() {
  var containerElement,dialogElement,dialogContent,dialogTrueContent,closeTimer,timer;
  var dialogShowTime = 10000;

  /**
   * 创建对话框元素
   * @param {HTMLElement} root 位置
   */
  function createDialogElement(root) {
    containerElement = document.createElement('div');
    containerElement.className = 'live2d-widget-dialog-container-2';
    // containerElement.style.transform = `scale(${config.display.width / 250})`
    dialogElement = document.createElement('div');
    dialogElement.className = 'live2d-widget-dialog-2';
    dialogContent = document.createElement('p');
    dialogTrueContent = document.createElement('p');
    dialogTrueContent.className = 'live2d-widget-dialog-true';
    dialogElement.appendChild(dialogContent);
    dialogElement.appendChild(dialogTrueContent);
    containerElement.appendChild(dialogElement);
    root.appendChild(containerElement);

    showHitokotoLoop()
  }

  function displayDialog() {
    dialogElement.style.opacity = 1;
  }

  function hiddenDialog() {
    dialogElement.style.opacity = 0;
  }

  function cnLangIsDead(s) {
    return s.replace(/[\u4e00-\u9fd5]/g, '￿');
  }

  function alertText(text) {
    displayDialog();
    var sep = '|';
    var interval = 300;
    var i = 0;
    var len = text.length;
    var deadText = cnLangIsDead(text);
    dialogContent.innerText = sep;
    dialogTrueContent.innerText = sep;
    clearInterval(timer);
    clearTimeout(closeTimer);
    timer = setInterval(() => {
      if (i >= len) {
        clearInterval(timer);

        closeTimer = setTimeout(function () {
          hiddenDialog();
          setTimeout(showHitokotoLoop, dialogShowTime);
        }, dialogShowTime);
        return;
      }
      dialogContent.innerText =
        dialogContent.innerText.slice(0, -1) +
        deadText[i] +
        (i === len - 1 ? '' : sep);
      if (deadText !== text) {
        dialogTrueContent.innerText =
          dialogTrueContent.innerText.slice(0, -1) +
          text[i] +
          (i === len - 1 ? '' : sep);
      } else if (dialogTrueContent.innerText) {
        dialogTrueContent.innerText = '';
      }
      i++;
    }, interval);
  }

  function showHitokotoLoop() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn');
    // xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        alertText(data.hitokoto.trim());
        // setTimeout(showHitokotoLoop, dialogShowTime * 2)
      }
    }
    xhr.send();
  }

  document.addEventListener('readystatechange', function () {
    if (document.readyState === 'complete') {
      const live2d = document.getElementById('live2d-widget');
      if (live2d) {
        createDialogElement(live2d);
      } else {
        console.error('Can not find live2d element');
      }


      // drag live2d-widget
      var live2dWidget = document.getElementById('live2d-widget');
      if (live2dWidget) {
        // set draggable
        live2dWidget.setAttribute('draggable', true);
        live2dWidget.style.pointerEvents = '';
        live2dWidget.style.cursor = 'move';
        var posXRight = parseFloat(live2dWidget.style.right);
        var posYBottom = parseFloat(live2dWidget.style.bottom);

        var dragstartX, dragstartY;
        var draggingWidget = false;
        // live2dWidget.addEventListener('dragstart', function (e) {
        live2dWidget.addEventListener('mousedown', function (e) {
          e.preventDefault();
          // e.dataTransfer.dropEffect = 'move';
          // set start coordinate
          draggingWidget = true;
          dragstartX = e.pageX;
          dragstartY = e.pageY;
        });

        // document.addEventListener('dragover', function (e) {
        document.addEventListener('mousemove', function (e) {
          if (draggingWidget) {
            e.preventDefault();
            var movedX = e.pageX - dragstartX;
            var movedY = e.pageY - dragstartY;
            live2dWidget.style.right = `${posXRight - movedX}px`;
            live2dWidget.style.bottom = `${posYBottom - movedY}px`;
          }
        });

        // document.addEventListener('drop', function (e) {
        document.addEventListener('mouseup', function (e) {
          if (draggingWidget) {
            e.preventDefault();
            posXRight -= e.pageX - dragstartX;
            posYBottom -= e.pageY - dragstartY;
            draggingWidget = false;
          }
        })
      }
    }
  });

})();
