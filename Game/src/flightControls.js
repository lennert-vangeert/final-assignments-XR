
function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export let controls = {};

window.addEventListener("keydown", (e) => {
  controls[e.key.toLowerCase()] = true;
});
window.addEventListener("keyup", (e) => {
  controls[e.key.toLowerCase()] = false;
});

let maxVelocity = 0.02;
let jawVelocity = 0;
let pitchVelocity = 0;
let yawVelocity = 0;
let planeSpeed = 0.2;
let counter = 0;
export let turbo = 0;

export function updatePlaneAxis(x, y, z, planePosition, camera, reset) {
  if (reset) {
    console.log("reset");
  }

  jawVelocity *= 0.98;
  pitchVelocity *= 0.98;
  yawVelocity *= 0.98;

  if (Math.abs(jawVelocity) > maxVelocity)
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity)
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  if (Math.abs(yawVelocity) > maxVelocity)
    yawVelocity = Math.sign(yawVelocity) * maxVelocity;

  if (controls["a"] || controls["q"]) {
    jawVelocity += 0.001;
  }

  if (controls["d"]) {
    jawVelocity -= 0.001;
  }

  if (controls["w"] || controls["z"] || controls["arrowup"]) {
    pitchVelocity -= 0.001;
  }

  if (controls["s"] || controls["arrowdown"]) {
    pitchVelocity += 0.001;
  }

  if (controls["arrowleft"]) {
    yawVelocity += 0.001;
  }

  if (controls["arrowright"]) {
    yawVelocity -= 0.001;
  }

  if (controls["r"] || reset) {
    jawVelocity = 0;
    pitchVelocity = 0;
    yawVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }

  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.applyAxisAngle(y, yawVelocity);
  z.applyAxisAngle(y, yawVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  if (controls.shift) {
    turbo += 0.025;
  } else {
    turbo *= 0.95;
  }
  turbo = Math.min(Math.max(turbo, 0), 1);

  let turboSpeed = easeOutQuad(turbo) * 0.02;

  camera.fov = 45 + turboSpeed * 900;
  camera.updateProjectionMatrix();

  planePosition.add(z.clone().multiplyScalar(-planeSpeed - turboSpeed));
}
