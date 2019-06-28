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
    width: 100%;
    height: 100%;
    color: #917159;
    font-size: 16px;
    padding: 12px;
    border: 2px solid rgb(236, 203, 180);
    background: rgb(252, 248, 244);
    box-sizing: border-box;
    border-radius: 10px;
    transform: rotate(-2deg) translateZ(0);
    -webkit-font-smoothing: antialiased;
    opacity: 0;
    transition: 200ms opacity;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
    animation: live2d-widget-dialog-tingle-2 4s linear 0s infinite alternate;
  }
  @keyframes live2d-widget-dialog-tingle-2 {
    0% { transform: rotate(-2deg) translateZ(0); }
    100% { transform: rotate(2deg) translateZ(0); }
  }
</style>
`;

(function myLive2dWidgetDialog() {
  var containerElement,dialogElement,closeTimer;
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

  function alertText(text) {
    displayDialog();
    dialogElement.innerText = text;
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      hiddenDialog();
    }, dialogShowTime);
  }

  function showHitokotoLoop() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'https://v1.hitokoto.cn');
    // xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var data = JSON.parse(xhr.responseText);
        alertText(data.hitokoto);
        setTimeout(showHitokotoLoop, dialogShowTime * 2)
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
        live2dWidget.addEventListener('dragstart', function (e) {
          // e.preventDefault();
          // e.dropEffect = 'move';
          // set start coordinate
          draggingWidget = true;
          dragstartX = e.screenX;
          dragstartY = e.screenY;
        });

        document.addEventListener('dragover', function (e) {
          e.preventDefault();
          if (draggingWidget) {
            var movedX = e.screenX - dragstartX;
            var movedY = e.screenY - dragstartY;
            live2dWidget.style.right = `${posXRight - movedX}px`;
            live2dWidget.style.bottom = `${posYBottom - movedY}px`;
          }
        });

        document.addEventListener('dragend', function (e) {
          e.preventDefault();
          if (draggingWidget) {
            posXRight -= e.screenX - dragstartX;
            posYBottom -= e.screenY - dragstartY;
            draggingWidget = false;
          }
        })
      }
    }
  });

})();
