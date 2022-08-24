
// 動かすボール
const ball = document.querySelector('.js-ball');

// ボールのプロパティ
const ballProp = {
  x:0,
  y:0,
  size:200
};

function _init() {
  _update();
}


function _update() {
  
  // ボールの位置を更新
  ballProp.y -= 10;

  // X値は真ん中
  ballProp.x = window.innerWidth * 0.5 - ballProp.size * 0.5;

  // はみ出たら戻す
  if(ballProp.y < -ballProp.size) {
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
