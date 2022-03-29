const robot = require("robotjs");

class Actions {
  static currentlyPressedKeys = {};

  static holdKey(key) {
    if (this.currentlyPressedKeys[key]) return false;

    this.currentlyPressedKeys[key] = true;
    robot.keyToggle(key, "down");

    return true;
  }

  static pressKey(key) {
    robot.keyTap(key);
    return true;
  }

  static ff() {
    robot.keyTap("escape");
    robot.keyTap("down");
    robot.keyTap("down");
    robot.keyTap("down");
    robot.keyTap("enter");
    robot.keyTap("left");
    robot.keyTap("enter");
    return true;
  }

  static releaseKey(key) {
    if (!this.currentlyPressedKeys[key]) return false;

    this.currentlyPressedKeys[key] = false;
    robot.keyToggle(key, "up");

    return true;
  }

  static releaseAllKeys() {
    for (const [key, value] of Object.entries(this.currentlyPressedKeys)) {
      if (!value) continue;
      this.releaseKey(key);
    }

    return true;
  }
}

module.exports = Actions;
