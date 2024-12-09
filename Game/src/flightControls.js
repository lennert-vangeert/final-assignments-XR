import useGame from "./stores/useGame";

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

let maxVelocity = 0.02; // Reduced max velocity for slower turns
let jawVelocity = 0;
let pitchVelocity = 0;
let planeSpeed = 0.2;
let counter = 0;
export let turbo = 0;

export function updatePlaneAxis(x, y, z, planePosition, camera, reset) {
  if (reset) {
    console.log("reset");
    counter = 0;
  }
  if (counter === 0) {
    counter++;
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }
  // Increase damping for smoother and slower turns
  jawVelocity *= 0.98;
  pitchVelocity *= 0.98;

  if (Math.abs(jawVelocity) > maxVelocity)
    jawVelocity = Math.sign(jawVelocity) * maxVelocity;

  if (Math.abs(pitchVelocity) > maxVelocity)
    pitchVelocity = Math.sign(pitchVelocity) * maxVelocity;

  // Reduced velocity increment for slower rotation
  if (controls["a"] || controls["q"]) {
    jawVelocity += 0.001; // Slower turn left
  }

  if (controls["d"]) {
    jawVelocity -= 0.001; // Slower turn right
  }

  if (controls["w"] || controls["z"]) {
    pitchVelocity -= 0.001; // Slower pitch up
  }

  if (controls["s"]) {
    pitchVelocity += 0.001; // Slower pitch down
  }

  if (controls["r"]) {
    jawVelocity = 0;
    pitchVelocity = 0;
    turbo = 0;
    x.set(1, 0, 0);
    y.set(0, 1, 0);
    z.set(0, 0, 1);
    planePosition.set(0, 3, 7);
  }

  // Apply rotation based on the velocities
  x.applyAxisAngle(z, jawVelocity);
  y.applyAxisAngle(z, jawVelocity);

  y.applyAxisAngle(x, pitchVelocity);
  z.applyAxisAngle(x, pitchVelocity);

  x.normalize();
  y.normalize();
  z.normalize();

  // plane position & velocity (turbo commented out)
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
