const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let aDown = false;
let dDown = false;
let spaceDown = false;

const gravity = 0.1;

let level = 1;

let buttonClicked = false;

let player = { 
  x: 440,
  y: 320,
  xvel: 0,
  yvel: 0,
  width: 20,
  height: 20,
  spawnx: 0,
  spawny: 0
};
const portal = {
  width: 15,
  height: 40,
  x: 5,
  y: 15
};
const rope = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
};
const lava1 = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
};
const lava2 = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
};
const ground1 = {
  width: 480,
  height: 10,
  x: 0,
  y: 350
};
const ground2 = {
  width: 240,
  height: 20,
  x: 0,
  y: 340
};
const ground3 = {
  width: 35,
  height: 15,
  x: 250,
  y: 270
};
const ground4 = {
  width: 35,
  height: 15,
  x: 400,
  y: 200
};
const ground5 = {
  width: 35,
  height: 15,
  x: 310,
  y: 130
};
const ground6 = {
  width: 35,
  height: 15,
  x: 130,
  y: 100
};
const ground7 = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
};
const ground8 = {
  width: 0,
  height: 0,
  x: 0,
  y: 0
};

//input detection
document.onkeydown = function(event) {
  if (event.key === 'd') {
    dDown = true;
  }
  if (event.key === 'a') {
    aDown = true;
  }
  if (event.key === ' ') {
    spaceDown = true;
  }
};
document.onkeyup = function(event) {
  if (event.key === 'd') {
    dDown = false;
  }
  if (event.key === 'a') {
    aDown = false;
  }
  if (event.key === ' ') {
    spaceDown = false;
  }
};

let lastTime = performance.now();

function draw(currentTime) {
  const dt = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movement(dt);
  drawMap();
  ctx.fillStyle = "#000000";
  ctx.fillRect(player.x, player.y, player.width, player.height);
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

function drawMap() {
  ctx.fillStyle = "#7a7a7a";
  ctx.fillRect(ground1.x, ground1.y, ground1.width, ground1.height);
  ctx.fillRect(ground2.x, ground2.y, ground2.width, ground2.height);
  ctx.fillRect(ground3.x, ground3.y, ground3.width, ground3.height);
  ctx.fillRect(ground4.x, ground4.y, ground4.width, ground4.height);
  ctx.fillRect(ground5.x, ground5.y, ground5.width, ground5.height);
  ctx.fillRect(ground6.x, ground6.y, ground6.width, ground6.height);
  ctx.fillRect(ground7.x, ground7.y, ground7.width, ground7.height);
  ctx.fillRect(ground8.x, ground8.y, ground8.width, ground8.height);
  ctx.fillStyle = "#15d1c8";
  ctx.fillRect(portal.x, portal.y, portal.width, portal.height);
  ctx.fillStyle = "#f2f0ae";
  ctx.fillRect(rope.x, rope.y, rope.width, rope.height);
  ctx.fillStyle = "#eb3926";
  ctx.fillRect(lava1.x, lava1.y, lava1.width, lava1.height);
  ctx.fillRect(lava2.x, lava2.y, lava2.width, lava2.height);
  drawLevels();
}

function movement(dt) {
  //movement
  if (dDown) {
    if (player.x < 460) {
      if (player.xvel < 2.6) {
        player.xvel += 0.12 * dt * 60;
        if (player.xvel > 2.6) {
          player.xvel = 2.6;
        }
      }
    }
  }
  if (aDown) {
    if (player.x > 0) {
      if (player.xvel > -2.6) {
        player.xvel -= 0.12 * dt * 60;
        if (player.xvel < -2.6) {
          player.xvel = -2.6;
        }
      }
    }
  }
  if (spaceDown) {
    if (isOnGround() && player.yvel === 0) {
      player.yvel = -4;
    }
  }
  
  if (!dDown && !aDown) {
    if (player.xvel > 0) player.xvel = Math.max(0, player.xvel - 0.06);
    if (player.xvel < 0) player.xvel = Math.min(0, player.xvel + 0.06);
  }

  //horizontal updates
  player.x += player.xvel * dt * 60;
  debug4.innerHTML = player.xvel;

  //ground1 horizontal collision
  if (rectIntersect(player, ground1)) {
    if (player.xvel > 0) { //right
      player.x = ground1.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground1.x + ground1.width;
    }
    player.xvel = 0;
  }
  //ground2 horizontal collision
  if (rectIntersect(player, ground2)) {
    if (player.xvel > 0) { //right
      player.x = ground2.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground2.x + ground2.width;
    }
    player.xvel = 0;
  }
  //ground3 horizontal collision
  if (rectIntersect(player, ground3)) {
    if (player.xvel > 0) { //right
      player.x = ground3.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground3.x + ground3.width;
    }
    player.xvel = 0;
  }
  //ground4 horizontal collision
  if (rectIntersect(player, ground4)) {
    if (player.xvel > 0) { //right
      player.x = ground4.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground4.x + ground4.width;
    }
    player.xvel = 0;
  }
  //ground5 horizontal collision
  if (rectIntersect(player, ground5)) {
    if (player.xvel > 0) { //right
      player.x = ground5.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground5.x + ground5.width;
    }
    player.xvel = 0;
  }
  //ground6 horizontal collision
  if (rectIntersect(player, ground6)) {
    if (player.xvel > 0) { //right
      player.x = ground6.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground6.x + ground6.width;
    }
    player.xvel = 0;
  }
  //ground7 horizontal collision
  if (rectIntersect(player, ground7)) {
    if (player.xvel > 0) { //right
      player.x = ground7.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground7.x + ground7.width;
    }
    player.xvel = 0;
  }
  //ground8 horizontal collision
  if (rectIntersect(player, ground8)) {
    if (player.xvel > 0) { //right
      player.x = ground8.x - player.width;
    } else if (player.xvel < 0) { //left
      player.x = ground8.x + ground8.width;
    }
    player.xvel = 0;
  }
  
  //portal collision
  if (rectIntersect(player, portal)) {
    level += 1;
    player.xvel = 0;
    player.yvel = 0;
    if (level === 2) {
      player.spawnx = 300;
      player.spawny = 300;
      player.x = player.spawnx;
      player.y = player.spawny;
    } else if (level === 3) {
      player.spawnx = 20;
      player.spawny = 310;
      player.x = player.spawnx;
      player.y = player.spawny;
    } else if (level === 4) {
      player.spawnx = 90;
      player.spawny = 330;
      player.x = player.spawnx;
      player.y = player.spawny;
    }
  }
  
  //rope collision
  if (rectIntersect(player, rope)) {
    if (spaceDown) {
      player.y -= 1.8 * dt * 60;
      player.yvel = 0;
      player.xvel = 0;
    }
  }
  
  //danger collisions
  if (rectIntersect(player, lava1) || rectIntersect(player, lava2)) {
    player.xvel = 0;
    player.yvel = 0;
    player.x = player.spawnx;
    player.y = player.spawny;
  }

  //canvas collision
  if (player.x < 0) { 
    player.x = 0;
    if (player.xvel < -2) {
    player.xvel = -player.xvel;
    player.yvel = -2;
    }
  }
  if (player.x > 460) {
    player.x = 460;
    if (player.xvel > 2) {
      player.xvel = -player.xvel;
      player.yvel = -2;
    }
  }
  if (player.y < 0) { 
    player.y = 0; 
    player.yvel = 0; 
  }
  if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
    player.yvel = -player.yvel;
  }

  //vertical updates
  player.yvel += gravity * dt * 60;
  player.y += player.yvel * dt * 60;
  debug1.innerHTML = Math.round(player.x) + " " + Math.round(player.y)
  debug2.innerHTML = isOnGround();
  debug3.innerHTML = player.yvel;
  
  //ground8 vertical collisions
  if (rectIntersect(player, ground8)) {
    if (player.yvel > 0) { //falling
      player.y = ground8.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground8.y + ground8.height;
    }
  }
  //ground7 vertical collisions
  if (rectIntersect(player, ground7)) {
    if (player.yvel > 0) { //falling
      player.y = ground7.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground7.y + ground7.height;
    }
  }
  //ground6 vertical collisions
  if (rectIntersect(player, ground6)) {
    if (player.yvel > 0) { //falling
      player.y = ground6.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground6.y + ground6.height;
    }
  }
  //ground5 vertical collisions
  if (rectIntersect(player, ground5)) {
    if (player.yvel > 0) { //falling
      player.y = ground5.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground5.y + ground5.height;
    }
  }
  //ground4 vertical collisions
  if (rectIntersect(player, ground4)) {
    if (player.yvel > 0) { //falling
      player.y = ground4.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground4.y + ground4.height;
    }
  }
  //ground3 vertical collisions
  if (rectIntersect(player, ground3)) {
    if (player.yvel > 0) { //falling
      player.y = ground3.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground3.y + ground3.height;
    }
  }
  //ground2 vertical collisions
  if (rectIntersect(player, ground2)) {
    if (player.yvel > 0) { //falling
      player.y = ground2.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground2.y + ground2.height;
    }
  }
  //ground1 vertical collisions
  if (rectIntersect(player, ground1)) {
    if (player.yvel > 0) { //falling
      player.y = ground1.y - player.height;
      player.yvel = 0;
    } else if (player.yvel < 0) { //hitting ceiling
      player.yvel = 0;
      player.y = ground1.y + ground1.height;
    }
  }
}
//aabb collision
function rectIntersect(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
//ground check
function isOnGround() {
  return (
    (player.y + player.height >= ground2.y && player.y + player.height <= ground2.y + ground2.height && player.x + player.width > ground2.x && player.x < ground2.x + ground2.width) ||
    (player.y + player.height >= ground1.y && player.y + player.height <= ground1.y + ground1.height && player.x + player.width > ground1.x && player.x < ground1.x + ground1.width) ||
    (player.y + player.height >= ground3.y && player.y + player.height <= ground3.y + ground3.height && player.x + player.width > ground3.x && player.x < ground3.x + ground3.width) ||
    (player.y + player.height >= ground4.y && player.y + player.height <= ground4.y + ground4.height && player.x + player.width > ground4.x && player.x < ground4.x + ground4.width) ||
    (player.y + player.height >= ground5.y && player.y + player.height <= ground5.y + ground5.height && player.x + player.width > ground5.x && player.x < ground5.x + ground5.width) ||
    (player.y + player.height >= ground6.y && player.y + player.height <= ground6.y + ground6.height && player.x + player.width > ground6.x && player.x < ground6.x + ground6.width) ||
    (player.y + player.height >= ground7.y && player.y + player.height <= ground7.y + ground7.height && player.x + player.width > ground7.x && player.x < ground7.x + ground7.width) ||
    (player.y + player.height >= ground8.y && player.y + player.height <= ground8.y + ground8.height && player.x + player.width > ground8.x && player.x < ground8.x + ground8.width)
  );
}
function drawLevels() {
  if (level === 1){
    
  } else if (level === 2) {
    ground1.width = 480;
    ground1.height = 10;
    ground1.x = 0;
    ground1.y = 350;
    
    ground2.width = 35;
    ground2.height = 15;
    ground2.x = 50;
    ground2.y = 300;
    
    ground3.width = 150;
    ground3.height = 15;
    ground3.x = 200;
    ground3.y = 250;
    
    ground4.width = 50;
    ground4.height = 15;
    ground4.x = 300;
    ground4.y = 100;
    
    ground5.width = 35;
    ground5.height = 15;
    ground5.x = 200;
    ground5.y = 35;
    
    ground6.width = 35;
    ground6.height = 15;
    ground6.x = 50;
    ground6.y = 130;
    
    rope.width = 10;
    rope.height = 200;
    rope.x = 370;
    rope.y = 50;
    
  } else if (level === 3) {
    button.x = 3;
    button.y = 202;
    button.width = 10;
    button.height = 10; 
    if (msgLoaded) {
      ctx.font = "12px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(secretmsg.text, 240, 280, 100);
    }
    rope.width = 0;
    rope.height = 0;
    rope.x = 0;
    rope.y = 0;
    
    lava1.width = 360;
    lava1.height = 10;
    lava1.x = 120;
    lava1.y = 350;
    
    lava2.width = 300;
    lava2.height = 10;
    lava2.x = 0;
    lava2.y = 190;
    
    ground1.width = 120;
    ground1.height = 20;
    ground1.x = 0;
    ground1.y = 340;
    
    ground2.width = 25;
    ground2.height = 15;
    ground2.x = 150;
    ground2.y = 265;
    
    ground3.width = 25;
    ground3.height = 15;
    ground3.x = 280;
    ground3.y = 300;
    
    ground4.width = 25;
    ground4.height = 15;
    ground4.x = 400;
    ground4.y = 230;
    
    ground5.width = 300;
    ground5.height = 15;
    ground5.x = 0;
    ground5.y = 200;
    
    ground6.width = 25;
    ground6.height = 15;
    ground6.x = 350;
    ground6.y = 160;
    
    ground7.width = 25;
    ground7.height = 15;
    ground7.x = 220;
    ground7.y = 110;
    
    ground8.width = 25;
    ground8.height = 15;
    ground8.x = 90;
    ground8.y = 50;
  } else if (level === 4) {
    ground1.width = 120;
    ground1.height = 10;
    ground1.x = 0;
    ground1.y = 350;
    
    ground2.width = 40;
    ground2.height = 15;
    ground2.x = 70;
    ground2.y = 260;
    
    ground3.width = 25;
    ground3.height = 15;
    ground3.x = 240;
    ground3.y = 220;
    
    ground4.width = 25;
    ground4.height = 15;
    ground4.x = 390;
    ground4.y = 200;
    
    ground5.width = 25;
    ground5.height = 15;
    ground5.x = 390;
    ground5.y = 108;
    
    ground6.width = 25;
    ground6.height = 15;
    ground6.x = 200;
    ground6.y = 100;
    
    ground7.width = 0;
    ground7.height = 0;
    ground7.x = 0;
    ground7.y = 0;
    
    ground8.width = 0;
    ground8.height = 0;
    ground8.x = 0;
    ground8.y = 0;
    
    lava1.width = 460-120+20;
    lava1.height = 8;
    lava1.x = 120;
    lava1.y = 360-8;
    
    lava2.width = 0;
    lava2.height = 0;
    lava2.x = 0;
    lava2.y = 0;
  }
}
