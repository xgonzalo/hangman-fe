export function drawInChalk(ctx, startX, startY, endX, endY, brushSize = 7, duration = 500, color = '255,255,255') {
  return new Promise(resolve => {
    let start = null;
    let lastStepTimestamp = null;
    const oldPosition = {
      x: startX,
      y: startY
    };
    const newPosition = {
      x: null,
      y: null
    };
    const lineXSize = endX - startX;
    const lineYSize = endY - startY;

    function step(timestamp) {
      if (!start) start = timestamp;
      if (!lastStepTimestamp) lastStepTimestamp = timestamp;
      const progress = (timestamp - start) / duration * 100;
      const sinceLastStep = timestamp - lastStepTimestamp;
      const progressLastStep = sinceLastStep / duration * 100;
      lastStepTimestamp = timestamp;
      const moveX = lineXSize * progressLastStep / 100;
      const moveY = lineYSize * progressLastStep / 100;

      newPosition.x = oldPosition.x + moveX;
      newPosition.y = oldPosition.y + moveY;
      ctx.beginPath();
      ctx.lineWidth = brushSize;
      ctx.fillStyle = `rgba(${color},0.5)`;
      ctx.strokeStyle = `rgba(${color},0.5)`;

      ctx.lineCap = 'round';
      ctx.moveTo(oldPosition.x, oldPosition.y);
      ctx.lineTo(newPosition.x, newPosition.y);
      ctx.stroke();

      applyChalkStyle(ctx, oldPosition, newPosition, brushSize);

      oldPosition.x = newPosition.x;
      oldPosition.y = newPosition.y;

      if (progress < 100) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

export function applyChalkStyle(ctx, startPosition, endPosition, brushSize) {
  const length = Math.round(Math.sqrt(Math.pow(endPosition.x - startPosition.x, 2) + Math.pow(startPosition.y - endPosition.y,2)) / (5 / brushSize));
  const xUnit = (endPosition.x - startPosition.x) / length;
  const yUnit = (endPosition.y - startPosition.y) / length;
  for(let i = 0; i < length; i++){
    const xCurrent = startPosition.x+(i*xUnit);
    const yCurrent = startPosition.y+(i*yUnit);
    const xRandom = xCurrent + (Math.random() - 0.5) * brushSize * 1.2;
    const yRandom = yCurrent + (Math.random() - 0.5) * brushSize * 1.2;
    ctx.clearRect(xRandom, yRandom, Math.random() * 2 + 2, Math.random() + 1);
  }
}

export function applySquareChalkStyle2(ctx, startPosition, endPosition, brushSize) {
  const width = endPosition.x - startPosition.x;
  const lines = Math.ceil(width / brushSize);

  for (let i = 0; i < lines; i++) {
    applyChalkStyle(
      ctx,
      {
        x: startPosition.x + brushSize * i,
        y: startPosition.y
      },
      {
        x: startPosition.x + brushSize * i,
        y: endPosition.y
      }, brushSize
    );
  }
}

export function applySquareChalkStyle(ctx, startPosition, endPosition, brushSize) {
  applyChalkStyle(
    ctx,
    {
      x: startPosition.x,
      y: startPosition.y + endPosition.y - startPosition.y
    },
    {
      x: endPosition.x,
      y: startPosition.y + endPosition.y - startPosition.y
    }, 1000
  );
}