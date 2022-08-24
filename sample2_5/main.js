
// ボールのプロパティ
const ball = [];

// マウス位置
const mouse = {
  x:0,
  y:0,
  tgX:0,
  tgY:0,
  dx:0,
  dy:0,
  dist:0,
};

function _init() {
  // 全部のボール入れておく
  document.querySelectorAll('.js-ball').forEach((val) => {
    ball.push({
      x:0,
      y:0,
      size:30,
      el:val,
    });
  })

  window.addEventListener('mousemove', _eMouseMove);

  _update();
}


function _eMouseMove(e) {
  mouse.tgX = e.clientX;
  mouse.tgY = e.clientY;
}


function _update() {
  // マウス位置更新
  updateMouse();

  // アニメーション速度
  let ang = new Date().getTime() * 0.05;

  // 中心
  const center = {
    x:mouse.x,
    y:mouse.y,
  }

  const radius = 200 - mouse.dist;

  ball.forEach((val,i) => {
    let rad = radian(ang + (360 / ball.length) * i);
    const x = center.x + Math.sin(rad) * radius;
    const y = center.y + Math.cos(rad) * radius;

    // 枠の大きさと、全体の大きさが行ったり来たりするように
    
    // 大きさ
    rad = radian(ang * 15 + (360 / ball.length) * i);
    val.size = map(Math.sin(rad), -1, 1, 0, 50);

    // 枠
    val.el.style.border = map(Math.sin(rad), -1, 1, 25, 0) + 'px solid #000';

    val.x += (x - val.x) * 0.1;
    val.y += (y - val.y) * 0.1;

    setProp(val.el, val);
  })

  window.requestAnimationFrame(_update);
}


_init()


// -----------------------------------------------------
// 関数
// -----------------------------------------------------

// マウス位置更新
function updateMouse() {
  // 前回の位置との差を計算しておく
  mouse.dx = mouse.x - mouse.tgX;
  mouse.dy = mouse.y - mouse.tgY;
  mouse.dist = Math.sqrt(mouse.dx * mouse.dx + mouse.dy * mouse.dy);

  // だんだん目標値に近づくように
  mouse.x += (mouse.tgX - mouse.x) * 0.1;
  mouse.y += (mouse.tgY - mouse.y) * 0.1;
}

// ボール要素にプロパティを反映
function setProp(el, p) {
  el.style.left = (p.x - p.size * 0.5)+ 'px';
  el.style.top = (p.y - p.size * 0.5) + 'px';
  el.style.width = p.size + 'px';
  el.style.height = p.size + 'px';
}

// 線形補間
// @from  : 始点
// @to    : 終点
// @alpha : 位置
function lerp(from, to, alpha) {
  return (from * (1 - alpha)) + (to * alpha);
}

// 正規化
function norm(v, a, b) {
  return (v - a) / (b - a);
}

// マップ
function map(v, a, b, c, d) {
  return lerp(c, d, norm(v, a, b));
}

// ラジアンに変換
function radian(ang) {
  return ang * Math.PI / 180;
}

// ランダム
function random(min, max) {
  return Math.random() * (max - min) + min;
}