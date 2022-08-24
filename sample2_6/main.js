
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

function _init() {
  // ボール入れておく
  document.querySelectorAll('.js-ball').forEach((val) => {
    ball.push({
      x:0,
      y:0,
      size:30,
      el:val,
    });
  })

  // マウス座標を取得するイベント
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

  // 中心からの距離
  const dx = window.innerWidth * 0.5 - mouse.x;
  const dy = window.innerHeight * 0.5 - mouse.y;
  const d = Math.sqrt(dx * dx + dy * dy);

  const ang = new Date().getTime() * 0.075;

  ball.forEach((val,i) => {
    const rad = radian(ang + (360 / ball.length) * i);
    const radius = d * 0.5;
    const x = mouse.x + Math.sin(rad) * radius;
    const y = mouse.y + Math.cos(rad) * radius;

    // 前フレームとの位置の差
    const dx = x - val.x;
    const dy = y - val.y;

    val.x = x;
    val.y = y;
    val.size = map(Math.sin(rad * -10), -1, 1, 30, 100); // サイズ

    // ドロップシャドウのプロパティ
    const tgDropX = dx * -5;
    const tgDropY = dy * -5;

    // ドロップシャドウの内容を連続で指定
    let drop = ''
    const num = 20;
    for(let i = 0; i < num; i++) {
      const dropX = lerp(tgDropX, 0, i / (num - 1));
      const dropY = lerp(tgDropY, 0, i / (num - 1));
      drop += dropX + 'px ' + dropY + 'px 0px 1px rgba(0, 0, 0, 1)';
      if(i != num - 1) {
        drop += ',';
      }
    }

    // ドロップシャドウ反映
    val.el.style.boxShadow = drop;

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