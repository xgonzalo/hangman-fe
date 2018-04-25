import {applySquareChalkStyle, drawInChalk} from "./chalkHelper";
import {getAngle} from 'helpers/angleHelper';

export function renderHead(ctx, x, y, diameter, brushSize = 7, duration = 2000) {
  let start = null;
  let lastStepTimestamp = null;
  let endAngle = 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    if (!lastStepTimestamp) lastStepTimestamp = timestamp;
    const progress = (timestamp - start) / duration * 100;
    const sinceLastStep = timestamp - lastStepTimestamp;
    const progressLastStep = sinceLastStep / duration * 100;
    endAngle = (360 * progressLastStep / 100) + endAngle;
    ctx.beginPath();
    ctx.arc(x, y, diameter, getAngle(0), getAngle(endAngle), false);
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    applySquareChalkStyle(
      ctx,
      {
        x: x - diameter,
        y: y - diameter
      },
      {
        x: x + diameter + diameter / 2,
        y: y + diameter + diameter
      }, brushSize
    );
    if (endAngle < 360) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

export function renderNeck(ctx, startPosition, brushSize, duration = 500) {
  drawInChalk(ctx, startPosition.x, startPosition.y, startPosition.x, startPosition.y + 20, brushSize, duration);
}

export function renderArmOrLeg(ctx, startPosition, right = true, brushSize = 7, duration = 500) {
  const distance = 50;
  const variation = right ? distance : distance * -1;
  drawInChalk(ctx, startPosition.x, startPosition.y, startPosition.x + variation, startPosition.y + distance, brushSize, duration);
}

export function renderBody(ctx, startPosition, brushSize = 7, duration = 500) {
  drawInChalk(ctx, startPosition.x, startPosition.y, startPosition.x, startPosition.y + 80, brushSize, duration);
}

export function renderFoot(ctx, startPosition, right = true, brushSize = 7, duration = 500) {
  const distance = 10;
  const variation = right ? distance : distance * -1;
  drawInChalk(ctx, startPosition.x, startPosition.y, startPosition.x + variation, startPosition.y - distance, brushSize, duration);
}

export function kill(ctx, startPosition, brushSize = 7, duration = 500) {
  const red = '255,0,0';
  return drawInChalk(ctx, startPosition.x - 50, startPosition.y + 50, startPosition.x + 50, startPosition.y - 50, brushSize, duration, red)
    .then(() => drawInChalk(ctx, startPosition.x + 50, startPosition.y + 50, startPosition.x - 50, startPosition.y - 50, brushSize, duration, red));
}