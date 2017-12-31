var undertest,
  logger = fakeLog,
  context = fakeContext,
  color = "#FFAABB",
  xPosition = 8,
  yPosition = 9,
  radius = 100,
  xspeed = 3,
  yspeed = 7,
  twoxpi = Math.PI * 2,
  drawAntiClockwise = true;

QUnit.module("asteroid");

QUnit.test("init", function(assert) {
  undertest = asteroid(logger, context, color, xPosition, yPosition, radius, xspeed, yspeed);
  assert.ok(undertest, "Object initialized.");
  assert.equal(undertest.getX(), xPosition, "x position set");
  assert.equal(undertest.getY(), yPosition, "y position set");
});

QUnit.test("init no logger", function(assert) {
  assert.throws(function() {
      undertest = asteroid();
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidLogger' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no context", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidContext' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no color", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidColor' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no xPosition", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color);
    },
    function(err) {
      return err.toString() === "Parameter: 'xPosition' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no yPosition", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color, xPosition);
    },
    function(err) {
      return err.toString() === "Parameter: 'yPosition' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no radius", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color, xPosition, yPosition);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidRadius' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no xspeed", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color, xPosition, yPosition, radius);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidSpeedX' is undefined."
    },
    "Error thrown");
});

QUnit.test("init no yspeed", function(assert) {
  assert.throws(function() {
      undertest = asteroid(logger, context, color, xPosition, yPosition, radius, xspeed);
    },
    function(err) {
      return err.toString() === "Parameter: 'asteroidSpeedY' is undefined."
    },
    "Error thrown");
});

QUnit.test("draw", function(assert) {
  var spyContextBeginPath = sinon.spy(context, "beginPath");
  var spyContextArc = sinon.spy(context, "arc");
  var spyContextClosePath = sinon.spy(context, "closePath");
  var spyContextFill = sinon.spy(context, "fill");

  undertest = asteroid(logger, context, color, xPosition, yPosition, radius, xspeed, yspeed);

  undertest.draw();

  assert.equal(context.fillStyle, color, "fillColor set");
  assert.ok(spyContextBeginPath.calledOnce, "beginPath calledOnce");
  assert.ok(spyContextBeginPath.calledBefore(spyContextArc), "beginPath before arg");
  assert.ok(spyContextArc
    .withArgs(xPosition, yPosition, radius, startAngle, twoxpi, drawAntiClockwise)
    .calledOnce, "arc calledOnce");
  assert.ok(spyContextArc.calledBefore(spyContextClosePath), "arc before closePath");
  assert.ok(spyContextClosePath.calledOnce, "closePath calledOnce");
  assert.ok(spyContextClosePath.calledBefore(spyContextFill), "closePath before fill");
  assert.ok(spyContextFill.calledOnce, "fill calledOnce");

  context.beginPath.restore();
  context.arc.restore();
  context.closePath.restore();
  context.fill.restore();
});

QUnit.test("move", function(assert) {

  undertest = asteroid(logger, context, color, xPosition, yPosition, radius, xspeed, yspeed);

  undertest.move();

  assert.equal(undertest.getX(), xPosition - xspeed, "x position changed.")
  assert.equal(undertest.getY(), yPosition - yspeed, "y position changed.")
});