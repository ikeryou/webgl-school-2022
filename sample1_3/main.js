
// 動かすボール
const ball = document.querySelector('.js-ball');

// ボールのプロパティ
const ballProp = {
  x:-200,
  y:window.innerHeight,
  size:200
};

function _init() {
  _update();
}


function _update() {
  
  // 何回で端っこに到達するか
  const interval = 70

  // ボールの位置を更新
  ballProp.x += window.innerWidth / interval;
  ballProp.y -= window.innerHeight / interval;

  // はみ出たら戻す
  if(ballProp.y < -ballProp.size && ballProp.x > window.innerWidth) {
    ballProp.x = -ballProp.size;
    ballProp.y = window.innerHeight;
  }

  // ボールにプロパティを反映
  ball.style.left = ballProp.x + 'px';
  ball.style.top = ballProp.y + 'px';
  ball.style.width = ballProp.size + 'px';
  ball.style.height = ballProp.size + 'px';

  window.requestAnimationFrame(_update);
}


_init()
