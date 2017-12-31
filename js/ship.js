var ship = function(shipLogger, shipContext, shipColor, xPosition, yPosition, shipRadius) {

  if (!shipLogger)
    throw "Parameter: 'shipLogger' is undefined.";
  if (!shipContext)
    throw "Parameter: 'shipContext' is undefined.";
  if (!shipColor)
    throw "Parameter: 'shipColor' is undefined.";
  if (!xPosition)
    throw "Parameter: 'xPosition' is undefined.";
  if (!yPosition)
    throw "Parameter: 'yPosition' is undefined.";
  if (!shipRadius)
    throw "Parameter: 'shipRadius' is undefined.";

  var logger = shipLogger,
    context = shipContext,
    color = shipColor,
    radius = shipRadius,
    x = xPosition,
    y = yPosition,
    xspeed = 0,
    yspeed = 0,
    xmin = 0,
    xmax = 0
  ymin = 0,
    ymax = 0;

  function draw() {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    logger.trace("ship draw");
  }

  function getX() {
    return x;
  };

  function getY() {
    return y;
  }

  function handleKeyEvent(event) {
    var newXSpeed = xspeed,
      newYSpeed = yspeed;
    switch (event.keyCode) {
      case 37:
        newXSpeed += 1;
        break;
      case 38:
        newYSpeed += 1;
        break;
      case 39:
        newXSpeed -= 1;
        break;
      case 40:
        newYSpeed -= 1;
        break;
      default:
        // Unregistered key code. Do nothing.
        break;
    }
    if (newXSpeed != xspeed || newYSpeed != yspeed) {
      setSpeed(newXSpeed, newYSpeed);
    }
  }

  function move() {
    if (!xmin || !xmax || !ymin || !ymax)
      throw 'ship.move() called without set bounds.';

    x = x - xspeed;
    if (x < xmin + radius) {
      x = xmin + radius;
    } else if (x > xmax - radius) {
      x = xmax - radius;
    }

    y = y - yspeed;
    if (y < ymin + radius) {
      y = ymin + radius;
    } else if (y > ymax - radius) {
      y = ymax - radius;
    }
  }

  function setBounds(minX, minY, maxX, maxY) {
    xmin = minX;
    ymin = minY;
    xmax = maxX;
    ymax = maxY;
  }

  function setSpeed(speedX, speedY) {
    xspeed = speedX;
    yspeed = speedY;
    logger.debug(`ship speed updated => xspeed:${xspeed};yspeed:${yspeed}`);
  }

  logger.debug(`ship created => radius:${radius};x:${x};y:${y}`)

  return {
    draw: draw,
    getX: getX,
    getY: getY,
    handleKeyEvent: handleKeyEvent,
    move: move,
    setBounds: setBounds,
    setSpeed: setSpeed
  };
}
