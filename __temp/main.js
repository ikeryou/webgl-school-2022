
// 動かすボール
const ball = document.querySelector('.js-ball');

// ボールのプロパティ
const ballProp = {
  x:0,
  y:0,
  size:200
};

// マウス座標
const mouse = {
  x:0,
  y:0,
}


// ----------------------
// 初期化
// ----------------------
function _init() {
  // マウス座標を取得するイベント
  window.addEventListener('mousemove', _eMouseMove);

  // 毎フレーム実行していく関数
  _update();
}


// ----------------------
// マウス位置を取得
// ----------------------
function _eMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}


// ----------------------
// 毎フレーム実行
// requestAnimationFrameの機能で約fps60で実行される
// ----------------------
function _update() {

  window.requestAnimationFrame(_update);
}


_init()
