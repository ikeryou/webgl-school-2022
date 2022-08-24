
// 動かすボール
const ball = document.querySelector('.js-ball');

// ボールのプロパティ
const ballProp = {
  x:0,
  y:0,
  size:200
};

// マウス座標
const mousePos = {
  x:0,
  y:0,
}

function _init() {
  // マウス座標を取得するイベント
  window.addEventListener('mousemove', _eMouseMove);

  _update();
}


function _eMouseMove(e) {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
}


function _update() {
  // ボールの位置をマウスに合わせる
  ballProp.x = mousePos.x - ballProp.size * 0.5;
  ballProp.y = mousePos.y - ballProp.size * 0.5;

  // ボールにプロパティを反映
  ball.style.left = ballProp.x + 'px';
  ball.style.top = ballProp.y + 'px';
  ball.style.width = ballProp.size + 'px';
  ball.style.height = ballProp.size + 'px';

  window.requestAnimationFrame(_update);
}


_init()
