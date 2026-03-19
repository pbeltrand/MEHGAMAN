const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const PLAYER_SPEED = 240;
const JUMP_SPEED = 445;
const BULLET_SPEED = 460;
const PLAYER_MAX_HEALTH = 5;
const PLAYER_TEXTURE_KEYS = {
  idle: "player-idle",
  runA: "player-run-a",
  runB: "player-run-b",
  jump: "player-jump",
  shoot: "player-shoot",
};

const levelPlatforms = [
  { x: 480, y: 520, width: 960, height: 40 },
  { x: 190, y: 420, width: 150, height: 22 },
  { x: 400, y: 340, width: 180, height: 22 },
  { x: 670, y: 275, width: 150, height: 22 },
  { x: 840, y: 195, width: 140, height: 22 },
  { x: 525, y: 160, width: 100, height: 18 },
  { x: 275, y: 215, width: 120, height: 18 },
];

const enemySpawns = [
  { x: 415, y: 300, minX: 330, maxX: 470 },
  { x: 680, y: 235, minX: 610, maxX: 745 },
  { x: 250, y: 175, minX: 215, maxX: 330 },
];

class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("platformer-scene");
    this.facing = 1;
    this.canShootAt = 0;
    this.invulnerableUntil = 0;
    this.playerHealth = PLAYER_MAX_HEALTH;
  }

  preload() {}

  create() {
    this.createTextures();
    this.createBackground();
    this.createGroups();
    this.createLevel();
    this.createPlayer();
    this.createGoal();
    this.createUI();
    this.createCollisions();
    this.createInput();
  }

  createTextures() {
    if (this.textures.exists(PLAYER_TEXTURE_KEYS.idle)) {
      return;
    }

    this.drawPlayerFrame(PLAYER_TEXTURE_KEYS.idle, {
      frontArmEnd: { x: 56, y: 36 },
      backArmEnd: { x: 36, y: 48 },
      frontLegEnd: { x: 32, y: 76 },
      backLegEnd: { x: 10, y: 74 },
      cannonWidth: 20,
      cannonHeight: 10,
      bodyLean: 0,
    });
    this.drawPlayerFrame(PLAYER_TEXTURE_KEYS.runA, {
      frontArmEnd: { x: 52, y: 34 },
      backArmEnd: { x: 35, y: 49 },
      frontLegEnd: { x: 38, y: 78 },
      backLegEnd: { x: 14, y: 67 },
      cannonWidth: 18,
      cannonHeight: 10,
      bodyLean: 1,
    });
    this.drawPlayerFrame(PLAYER_TEXTURE_KEYS.runB, {
      frontArmEnd: { x: 58, y: 39 },
      backArmEnd: { x: 34, y: 44 },
      frontLegEnd: { x: 28, y: 69 },
      backLegEnd: { x: 6, y: 79 },
      cannonWidth: 21,
      cannonHeight: 11,
      bodyLean: -1,
    });
    this.drawPlayerFrame(PLAYER_TEXTURE_KEYS.jump, {
      frontArmEnd: { x: 54, y: 30 },
      backArmEnd: { x: 35, y: 43 },
      frontLegEnd: { x: 35, y: 68 },
      backLegEnd: { x: 13, y: 66 },
      cannonWidth: 20,
      cannonHeight: 10,
      bodyLean: 0,
    });
    this.drawPlayerFrame(PLAYER_TEXTURE_KEYS.shoot, {
      frontArmEnd: { x: 59, y: 35 },
      backArmEnd: { x: 35, y: 47 },
      frontLegEnd: { x: 32, y: 76 },
      backLegEnd: { x: 10, y: 74 },
      cannonWidth: 24,
      cannonHeight: 12,
      bodyLean: 0,
    });

    const enemy = this.make.graphics({ x: 0, y: 0, add: false });
    enemy.fillStyle(0xff8b5e, 1);
    enemy.fillRect(0, 0, 28, 28);
    enemy.fillStyle(0x3a1322, 1);
    enemy.fillRect(5, 6, 18, 8);
    enemy.fillStyle(0xffffff, 1);
    enemy.fillRect(7, 18, 14, 4);
    enemy.generateTexture("enemy", 28, 28);
    enemy.destroy();

    const bullet = this.make.graphics({ x: 0, y: 0, add: false });
    bullet.fillStyle(0xffffff, 1);
    bullet.fillCircle(6, 6, 6);
    bullet.generateTexture("bullet", 12, 12);
    bullet.destroy();

    const platform = this.make.graphics({ x: 0, y: 0, add: false });
    platform.fillStyle(0x486b9c, 1);
    platform.fillRect(0, 0, 64, 20);
    platform.fillStyle(0x82d8ff, 1);
    platform.fillRect(0, 0, 64, 5);
    platform.generateTexture("platform", 64, 20);
    platform.destroy();

    const goal = this.make.graphics({ x: 0, y: 0, add: false });
    goal.fillStyle(0xffe066, 1);
    goal.fillRect(0, 0, 24, 72);
    goal.fillStyle(0x66d7ff, 1);
    goal.fillRect(5, 6, 14, 14);
    goal.generateTexture("goal", 24, 72);
    goal.destroy();
  }

  drawPlayerFrame(textureKey, pose) {
    const player = this.make.graphics({ x: 0, y: 0, add: false });
    const bodyX = 22 + (pose.bodyLean || 0);

    player.lineStyle(6, 0x05070b, 1);
    player.strokeCircle(22, 16, 12);
    player.fillStyle(0x1565ff, 1);

    const helmetPoints = [];
    const helmetCenterX = 22;
    const helmetCenterY = 16;
    const helmetRadiusX = 19;
    const helmetRadiusY = 15;

    helmetPoints.push(new Phaser.Geom.Point(helmetCenterX - helmetRadiusX, helmetCenterY));
    for (let step = 0; step <= 16; step += 1) {
      const angle = Math.PI + (Math.PI * step) / 16;
      helmetPoints.push(
        new Phaser.Geom.Point(
          helmetCenterX + Math.cos(angle) * helmetRadiusX,
          helmetCenterY + Math.sin(angle) * helmetRadiusY,
        ),
      );
    }
    helmetPoints.push(new Phaser.Geom.Point(helmetCenterX + helmetRadiusX, helmetCenterY));
    player.fillPoints(helmetPoints, true);

    player.lineStyle(5, 0x05070b, 1);
    player.beginPath();
    player.moveTo(bodyX, 28);
    player.lineTo(bodyX, 52);
    player.moveTo(bodyX, 38);
    player.lineTo(44, 38);
    player.moveTo(44, 38);
    player.lineTo(pose.frontArmEnd.x, pose.frontArmEnd.y);
    player.moveTo(bodyX, 40);
    player.lineTo(pose.backArmEnd.x, pose.backArmEnd.y);
    player.moveTo(bodyX, 52);
    player.lineTo(pose.backLegEnd.x, pose.backLegEnd.y);
    player.moveTo(bodyX, 52);
    player.lineTo(pose.frontLegEnd.x, pose.frontLegEnd.y);
    player.strokePath();

    player.fillStyle(0x1565ff, 1);
    player.fillEllipse(60, 36, pose.cannonWidth, pose.cannonHeight);
    player.generateTexture(textureKey, 72, 84);
    player.destroy();
  }

  createBackground() {
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xeaf7ff);
    this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 100, GAME_WIDTH, 220, 0xcfeaff);

    for (let i = 0; i < 14; i += 1) {
      this.add
        .rectangle(60 + i * 72, 110 + (i % 3) * 18, 26, 26 + (i % 4) * 20, 0xb5d7f5, 0.9)
        .setOrigin(0.5, 1);
    }

    for (let i = 0; i < 35; i += 1) {
      this.add.circle(
        Phaser.Math.Between(0, GAME_WIDTH),
        Phaser.Math.Between(0, 180),
        Phaser.Math.Between(1, 2),
        0x7cb7ff,
        Phaser.Math.FloatBetween(0.2, 0.45),
      );
    }
  }

  createGroups() {
    this.platforms = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group({ allowGravity: true, immovable: false });
    this.playerBullets = this.physics.add.group({ allowGravity: false, maxSize: 8 });
  }

  createLevel() {
    levelPlatforms.forEach((platformConfig) => {
      const platform = this.platforms.create(platformConfig.x, platformConfig.y, "platform");
      platform.displayWidth = platformConfig.width;
      platform.displayHeight = platformConfig.height;
      platform.refreshBody();
    });

    enemySpawns.forEach((spawn) => {
      const enemy = this.enemies.create(spawn.x, spawn.y, "enemy");
      enemy.setCollideWorldBounds(true);
      enemy.setBounce(0);
      enemy.setVelocityX(55);
      enemy.minX = spawn.minX;
      enemy.maxX = spawn.maxX;
      enemy.body.setSize(24, 24).setOffset(2, 4);
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(80, 450, PLAYER_TEXTURE_KEYS.idle);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(28, 72).setOffset(8, 6);
    this.player.setDragX(900);
    this.player.setMaxVelocity(280, 600);
    this.playerShootUntil = 0;
  }

  createGoal() {
    this.goal = this.physics.add.staticSprite(900, 440, "goal");
  }

  createUI() {
    this.statusText = this.add
      .text(16, 16, "", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "20px",
        color: "#163250",
        stroke: "#ffffff",
        strokeThickness: 5,
      })
      .setScrollFactor(0);

    this.messageText = this.add
      .text(GAME_WIDTH / 2, 70, "", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "28px",
        align: "center",
        color: "#0d4ea6",
        stroke: "#ffffff",
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0.5);

    this.updateStatus();
  }

  createCollisions() {
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.playerBullets, this.platforms, this.destroyBullet, null, this);

    this.physics.add.overlap(this.playerBullets, this.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hitPlayer, null, this);
    this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      up: Phaser.Input.Keyboard.KeyCodes.W,
      shoot: Phaser.Input.Keyboard.KeyCodes.J,
      restart: Phaser.Input.Keyboard.KeyCodes.R,
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
      this.scene.restart();
      return;
    }

    if (!this.player.active) {
      return;
    }

    this.handlePlayerMovement();
    this.handleShooting();
    this.updatePlayerAnimation();
    this.handleEnemies();
    this.handleFallDeath();
    this.updatePlayerFlash();
  }

  handlePlayerMovement() {
    const moveLeft = this.cursors.left.isDown || this.keys.left.isDown;
    const moveRight = this.cursors.right.isDown || this.keys.right.isDown;
    const wantsJump =
      Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
      Phaser.Input.Keyboard.JustDown(this.cursors.space) ||
      Phaser.Input.Keyboard.JustDown(this.keys.up);

    if (moveLeft) {
      this.player.setVelocityX(-PLAYER_SPEED);
      this.player.setFlipX(true);
      this.facing = -1;
    } else if (moveRight) {
      this.player.setVelocityX(PLAYER_SPEED);
      this.player.setFlipX(false);
      this.facing = 1;
    }

    if (wantsJump && this.player.body.blocked.down) {
      this.player.setVelocityY(-JUMP_SPEED);
    }
  }

  handleShooting() {
    const wantsShoot = Phaser.Input.Keyboard.JustDown(this.keys.shoot);

    if (!wantsShoot || this.time.now < this.canShootAt) {
      return;
    }

    const bullet = this.playerBullets.get(this.player.x + this.facing * 18, this.player.y - 4, "bullet");

    if (!bullet) {
      return;
    }

    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.enableBody(true, this.player.x + this.facing * 18, this.player.y - 4, true, true);
    bullet.setVelocity(this.facing * BULLET_SPEED, 0);
    bullet.setCollideWorldBounds(false);

    this.canShootAt = this.time.now + 220;
    this.playerShootUntil = this.time.now + 140;
  }

  handleEnemies() {
    this.enemies.children.iterate((enemy) => {
      if (!enemy || !enemy.active) {
        return;
      }

      if (enemy.x <= enemy.minX) {
        enemy.setVelocityX(55);
        enemy.setFlipX(false);
      } else if (enemy.x >= enemy.maxX) {
        enemy.setVelocityX(-55);
        enemy.setFlipX(true);
      }
    });
  }

  handleFallDeath() {
    if (this.player.y > GAME_HEIGHT + 40) {
      this.killPlayer("Caíste del escenario.\nPresiona R para reintentar.");
    }
  }

  updatePlayerFlash() {
    if (this.time.now < this.invulnerableUntil) {
      this.player.setAlpha(this.player.alpha === 1 ? 0.45 : 1);
    } else {
      this.player.setAlpha(1);
    }
  }

  updatePlayerAnimation() {
    const onGround = this.player.body.blocked.down;
    const isShooting = this.time.now < this.playerShootUntil;
    const horizontalSpeed = Math.abs(this.player.body.velocity.x);

    if (!onGround) {
      this.player.setTexture(PLAYER_TEXTURE_KEYS.jump);
      return;
    }

    if (isShooting) {
      this.player.setTexture(PLAYER_TEXTURE_KEYS.shoot);
      return;
    }

    if (horizontalSpeed > 20) {
      const runFrame = Math.floor(this.time.now / 120) % 2 === 0 ? PLAYER_TEXTURE_KEYS.runA : PLAYER_TEXTURE_KEYS.runB;
      this.player.setTexture(runFrame);
      return;
    }

    this.player.setTexture(PLAYER_TEXTURE_KEYS.idle);
  }

  hitEnemy(bullet, enemy) {
    this.destroyBullet(bullet);
    enemy.disableBody(true, true);

    if (this.enemies.countActive(true) === 0) {
      this.messageText.setText("Camino despejado.\nLlega al portal.");
    }
  }

  hitPlayer(player, enemy) {
    if (this.time.now < this.invulnerableUntil) {
      return;
    }

    const pushDirection = player.x < enemy.x ? -1 : 1;
    this.playerHealth -= 1;
    this.invulnerableUntil = this.time.now + 1200;
    player.setVelocity(pushDirection * 180, -180);
    this.updateStatus();

    if (this.playerHealth <= 0) {
      this.killPlayer("Te quedaste sin energía.\nPresiona R para reintentar.");
    }
  }

  reachGoal() {
    this.player.disableBody(true, true);
    this.messageText.setText("Nivel completado.\nPresiona R para jugar otra vez.");
    this.statusText.setText("Victoria");
  }

  killPlayer(message) {
    this.player.disableBody(true, true);
    this.messageText.setText(message);
    this.statusText.setText("Derrota");
  }

  destroyBullet(bullet) {
    if (!bullet || !bullet.body) {
      return;
    }

    bullet.disableBody(true, true);
  }

  updateStatus() {
    this.statusText.setText(`Energia: ${this.playerHealth}/${PLAYER_MAX_HEALTH}`);
  }
}

const config = {
  type: Phaser.AUTO,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 980 },
      debug: false,
    },
  },
  scene: [PlatformerScene],
};

new Phaser.Game(config);
