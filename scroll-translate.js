// Wheel to vertical scroll
window.addEventListener("wheel", function (e) {
  const speedMultiplier = 1;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    e.preventDefault();
    window.scrollBy(0, e.deltaX * speedMultiplier);
  }
}, { passive: false });

// Touch-based momentum scroll
let touchStartX = 0;
let touchStartY = 0;
let lastTouchX = 0;
let lastTouchTime = 0;
let velocityX = 0;
let isInsideTarget = false;

const speedMultiplier = 1.7;
const friction = 0.92;
const minVelocity = 0.5;

const targetSelector = '.track_flex';

window.addEventListener("touchstart", function (e) {
  const touch = e.touches[0];
  const target = touch.target;
  isInsideTarget = target.closest(targetSelector) !== null;

  if (!isInsideTarget) return;

  touchStartX = lastTouchX = touch.clientX;
  touchStartY = touch.clientY;
  lastTouchTime = Date.now();
  velocityX = 0;
}, { passive: true });

window.addEventListener("touchmove", function (e) {
  if (!isInsideTarget) return;

  const touch = e.touches[0];
  const currentX = touch.clientX;
  const currentY = touch.clientY;
  const now = Date.now();

  const deltaX = currentX - lastTouchX;
  const deltaY = currentY - touchStartY;

  if (Math.abs(currentX - touchStartX) > Math.abs(deltaY)) {
    e.preventDefault();
    const timeDelta = now - lastTouchTime || 1;
    velocityX = deltaX / timeDelta * 12;
    window.scrollBy(0, -deltaX * speedMultiplier);
    lastTouchX = currentX;
    lastTouchTime = now;
  }
}, { passive: false });

window.addEventListener("touchend", function () {
  if (!isInsideTarget) return;

  function momentumScroll() {
    if (Math.abs(velocityX) > minVelocity) {
      window.scrollBy(0, -velocityX * speedMultiplier);
      velocityX *= friction;
      requestAnimationFrame(momentumScroll);
    }
  }

  momentumScroll();
}, { passive: true });
