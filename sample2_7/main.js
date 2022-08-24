
// 動かすボール
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

// ----------------------
// 初期化
// ----------------------
function _init() {
  // ボール入れておく
  document.querySelectorAll('.js-ball').forEach((val) => {
    ball.push({
      x:0,
      y:0,
      size:1, // update内で決定するので適当に
      el:val,

      // ランダムなカラーを2個作成
      colorA:'rgba(' + ~~(random(0, 255)) + ', ' + ~~(random(0, 255)) + ', ' + ~~(random(0, 255)) + ', ' + random(0.2, 1) + ')',
      colorB:'rgba(' + ~~(random(0, 255)) + ', ' + ~~(random(0, 255)) + ', ' + ~~(random(0, 255)) + ', ' + random(0.2, 1) + ')',
    });
  })

  // マウス座標を取得するイベント
  window.addEventListener('mousemove', _eMouseMove);

  _update();
}

// ----------------------
// イベント マウス位置取得
// ----------------------
function _eMouseMove(e) {
  mouse.tgX = e.clientX;
  mouse.tgY = e.clientY;
}

// ----------------------
// 毎フレーム実行
// ----------------------
function _update() {
  // マウス位置更新
  updateMouse();

  // 中心からのマウス距離
  const dx = window.innerWidth * 0.5 - mouse.x;
  const dy = window.innerHeight * 0.5 - mouse.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  // アニメーション速度
  const ang = new Date().getTime() * 0.075;

  // 中心からの距離で半径変わる
  const radius = d * 0.5; 

  ball.forEach((val,i) => {
    const rad = radian(ang + (360 / ball.length) * i); // ラジアンに変換
    const radiusOffset = 0;
    const x = mouse.x + Math.sin(rad) * (radius + radiusOffset);
    const y = mouse.y + Math.cos(rad) * (radius + radiusOffset);

    // 位置、サイズ決定
    val.x = x;
    val.y = y;
    val.size = window.innerWidth * 1.5 + d * 0.5 // 中心からのマウス位置でサイズ変わる

    // radial-gradientの中身作成して、backgroundに反映
    const r = (i + new Date().getTime() * 0.1) * Math.PI / 180;
    const a = (Math.sin(r) + 1) * 0.5; // 0-1の範囲に変換
    const g = 'radial-gradient(circle closest-side, ' + val.colorA + ' ' + lerp(0, 20, a) + '%, ' + val.colorB + ' ' + lerp(20, 60, a) + '%, rgba(255,255,255,0) 100%)'; // 最後はアルファ0にして溶けるように
    val.el.style.backgroundImage = g;

    // ボールにプロパティを反映
    setProp(val.el, val);
  });

  window.requestAnimationFrame(_update);
}


_init()







// -----------------------------------------------------
// 関数
// -----------------------------------------------------

// マウス位置、だんだん目標値に近づくように
function updateMouse() {
  mouse.dx = mouse.x - mouse.tgX;
  mouse.dy = mouse.y - mouse.tgY;
  mouse.dist = Math.sqrt(mouse.dx * mouse.dx + mouse.dy * mouse.dy);

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