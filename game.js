const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const PLAYER_SPEED = 240;
const JUMP_SPEED = 445;
const BULLET_SPEED = 460;
const PLAYER_MAX_HEALTH = 5;
const BOSS_MAX_HEALTH = 18;
const BOSS_PHASE_2_TRIGGER_RATIO = 0.35;
const BOSS_TELEPORT_INTERVAL_PHASE_1 = 1600;
const BOSS_TELEPORT_INTERVAL_PHASE_2 = 700;
const BOSS_MAX_BOUNCING_SPHERES_PHASE_1 = 6;
const BOSS_MAX_BOUNCING_SPHERES_PHASE_2 = 12;
const BOSS_SPRITE_PATH = "assets/boss.png";
const BOSS_PHASE_2_SPRITE_PATH = "assets/boss_lvl2.png";
const BOSS_TEXTURE_KEY = "boss-phase";
const BOSS_PHASE_2_TEXTURE_KEY = "boss-phase-2";
const BOSS_FALLBACK_TEXTURE_KEY = "boss-phase-fallback";
const BOSS_SCALE = 0.48;
const MUSIC_TRACKS = {
  title: { key: "music-title", path: "assets/music/title.mp3" },
  level1: { key: "music-level1", path: "assets/music/level1.mp3" },
  bossPhase1: { key: "music-boss-phase1", path: "assets/music/boss_phase1.mp3" },
  bossPhase2: { key: "music-boss-phase2", path: "assets/music/boss_phase2.mp3" },
  ending: { key: "music-ending", path: "assets/music/ending.mp3" },
};
const SFX_TRACKS = {
  bossPhaseChange: { key: "sfx-boss-phase-change", path: "assets/sfx/boss_phase_change.mp3" },
  bossDeath: { key: "sfx-boss-death", path: "assets/sfx/boss_death.mp3" },
  bossLaugh: { key: "sfx-boss-laugh", path: "assets/sfx/laugh.mp3" },
};

const DEBUG_OPTIONS = {
  enabled: false,
  infiniteHealth: false,
  autoFire: true,
  autoFireInterval: 120,
  portalAlwaysActive: true,
  startAtBossFight: true,
};

const PLAYER_TEXTURE_KEYS = {
  idle: "player-idle",
  runA: "player-run-a",
  runB: "player-run-b",
  jump: "player-jump",
  shoot: "player-shoot",
};

const LEVEL_ONE_PLATFORMS = [
  { x: 480, y: 520, width: 960, height: 40 },
  { x: 190, y: 420, width: 150, height: 22 },
  { x: 400, y: 340, width: 180, height: 22 },
  { x: 670, y: 275, width: 150, height: 22 },
  { x: 840, y: 195, width: 140, height: 22 },
  { x: 525, y: 160, width: 100, height: 18 },
  { x: 275, y: 215, width: 120, height: 18 },
];

const LEVEL_ONE_ENEMIES = [
  { x: 415, y: 300, minX: 330, maxX: 470 },
  { x: 680, y: 235, minX: 610, maxX: 745 },
  { x: 250, y: 175, minX: 215, maxX: 330 },
];

const BOSS_LEVEL_PLATFORMS = [
  { x: 240, y: 520, width: 480, height: 40, role: "ground" },
  { x: 760, y: 520, width: 400, height: 40, role: "ground" },
  { x: 330, y: 448, width: 68, height: 18, role: "climb" },
  { x: 455, y: 382, width: 68, height: 18, role: "climb" },
  { x: 285, y: 316, width: 68, height: 18, role: "climb" },
  { x: 505, y: 250, width: 68, height: 18, role: "climb" },
  { x: 790, y: 430, width: 120, height: 20, role: "boss" },
  { x: 845, y: 295, width: 120, height: 20, role: "boss" },
  { x: 790, y: 160, width: 120, height: 20, role: "boss" },
];

const ENDING_CREDITS = `
MEH-GAMAN

Gracias por jugar esta demo absurda y gloriosa.

Un proyecto imposible que, de alguna manera, si fue posible.

Direccion General
Paul Beltrand

Dibujo Irrisorio de Meh-Gaman
Claudio Vazquez

Diseño de Plataformas
Mirna Brinco
Salto Villalobos
Teo Cornisa
Pipa Resorte

Ingenieria de Cascos
Helma Tronic
Bruno Remache
Silvia Cupula
Axel Tornillo

Arquitectura del Brazo Cañon
Rayo Mendoza
Nora Pulsar
Leo Cartucho
Beta Descarga

Programacion de Stickman
Otto Linea
Pia Trazos
Mauro Palito
Rene Segmento

Programacion del Boss
Octavio Gigante
Mila Reactor
Dina Vector
Nico Torque

Sistema de Puntos Debiles
Iris Destello
Tomas Parpadeo
Lina Alterna
Kevin Parche

Balistica Experimental
Blanca Municion
Rita Rebote
Julio Impacto
Sonia Particula

Supervision de Plataformas Flotantes
Nadia Andamio
Rulo Escalon
Tere Voladizo
Paco Firme

Coreografia de Disparos Injustos
Gina Peligro
Mati Esquiva
Olga Tecla
Kiko Reflejo

Testeo de Saltos Ridiculos
Ines Intento
Pepo Caida
Mara Repite
Tina Checkpoint

Escuela de Jefes Enormes
Brutus Pantallazo
Mora Titan
Enzo Overkill
Lola Amenaza

Coordinacion de Creditos Excesivos
Amanda Scroll
Ramon Larguisimo
Clara Epilogo
Joel Interminable

Departamento de Dramaticidad
Aura Niebla
Noe Horizonte
Elisa Trueno
Fabio Eco


Pintura del Cielo
Celeste Bruma
Nube Renteria
Luz Celadon
Mica Aurora

Diseño de UI
Paula Pixel
Brisa Barra
Ivan Overlay
Luca Tipografia

Comite de Nombres Memorables
Rafa Nominal
Seba Alias
Karen Titular
Milo Firma

Unidad de Emergencia por Bugs Inexplicables
Sandra Fix
Gabo Hotpatch
Nina Reboot
Teo Consolelog

Area de Sonidos que Nadie Escucho
Bombo Fader
Lia Reverb
Nano Delay
Toti Master

Asociacion de Enemigos Menores
Pico Rabioso
Meca Cuadrado
Susto Patrol
Lenteja Malvada

Equipo de Refrigeracion del Boss
Fio Radiador
Bruno Ventisca
Tadeo Turbina
Mili Vapor

Comando de Seguridad del Portal
Vera Llave
Dario Umbral
Mina Destino
Rolo Entrada

Soporte Emocional del Heroe
Luna Animo
Cata Respira
Guille Confia
Dani Persistencia

Sindicato de Colisiones
Edgar Hitbox
Pilar Hurtbox
Nestor Trigger
Ivania Overlap

Academia de Jumpscares Mecanicos
Tavo Pistones
Rina Sirena
Nico Chispa
Lina Alarma

Documentacion Del Proyecto
Memo Acta
Carla Manual
Sole Comentario
Beto Versionado

Departamento de Finales Demasiado Largos
Olivia Continua
Tomas Nuncaacaba
Pilar Todavia
Rene Unpocomas

Ending Inspiration
Quest for the Crown

Ending theme
Peter Cetera

Participacion Especial
Doctor Byte
Señora Frame
Profesor Respawn
Capitana Latencia
General Debug
Comodoro Loop
Ingeniera Runtime
Agente Collider
Sargento Timing
Operadora Cache

Agradecimientos Adicionales
A todos los heroes stickman
A todos los jefes desproporcionados
A todas las plataformas sospechosamente flotantes
A cada salto salvado en el ultimo pixel

Y a ti, por llegar hasta el final.





pico pal que lee.....





FIN
`;

class PlatformerScene extends Phaser.Scene {
  constructor() {
    super("platformer-scene");
    this.hasExternalBossSprite = false;
    this.hasExternalBossPhase2Sprite = false;
    this.loadedMusicKeys = new Set();
    this.loadedSfxKeys = new Set();
    this.currentMusicKey = null;
  }

  preload() {
    this.load.image(BOSS_TEXTURE_KEY, BOSS_SPRITE_PATH);
    this.load.image(BOSS_PHASE_2_TEXTURE_KEY, BOSS_PHASE_2_SPRITE_PATH);
    Object.values(MUSIC_TRACKS).forEach((track) => {
      this.load.audio(track.key, track.path);
      this.load.once(`filecomplete-audio-${track.key}`, () => {
        this.loadedMusicKeys.add(track.key);
      });
    });
    Object.values(SFX_TRACKS).forEach((track) => {
      this.load.audio(track.key, track.path);
      this.load.once(`filecomplete-audio-${track.key}`, () => {
        this.loadedSfxKeys.add(track.key);
      });
    });
    this.load.once(`filecomplete-image-${BOSS_TEXTURE_KEY}`, () => {
      this.hasExternalBossSprite = true;
    });
    this.load.once(`filecomplete-image-${BOSS_PHASE_2_TEXTURE_KEY}`, () => {
      this.hasExternalBossPhase2Sprite = true;
    });
    this.load.once("loaderror", (file) => {
      if (file?.key === BOSS_TEXTURE_KEY) {
        this.hasExternalBossSprite = false;
      } else if (file?.key === BOSS_PHASE_2_TEXTURE_KEY) {
        this.hasExternalBossPhase2Sprite = false;
      }
    });
  }

  create() {
    this.resetRunState();
    this.createTextures();
    this.createStaticWorld();
    this.createGroups();
    this.createPlayer();
    this.createUI();
    this.createInput();
    this.createCollisions();
    this.physics.world.timeScale = 1;
    this.sound.stopAll();
    this.currentMusicKey = null;
    this.startTitleScreen();
  }

  resetRunState() {
    this.facing = 1;
    this.canShootAt = 0;
    this.invulnerableUntil = 0;
    this.playerHealth = PLAYER_MAX_HEALTH;
    this.playerShootUntil = 0;
    this.stage = "title";
    this.transitioning = false;
    this.bossHealth = BOSS_MAX_HEALTH;
    this.bossPhase = 1;
    this.bossTeleportAt = 0;
    this.bossPositions = [];
    this.currentBossPositionIndex = 0;
    this.bossDefeated = false;
    this.endingStarted = false;
    this.debugAutoFireAt = 0;
    this.portalUnlocked = false;
    this.bossInPhaseTransition = false;
    this.playerDeathInProgress = false;
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

    const bossBullet = this.make.graphics({ x: 0, y: 0, add: false });
    bossBullet.fillStyle(0xff5a5a, 1);
    bossBullet.fillCircle(12, 12, 12);
    bossBullet.lineStyle(3, 0xffd6d6, 1);
    bossBullet.strokeCircle(12, 12, 9);
    bossBullet.generateTexture("boss-bullet", 24, 24);
    bossBullet.destroy();

    const boss = this.make.graphics({ x: 0, y: 0, add: false });
    boss.fillStyle(0x263d89, 1);
    boss.fillRoundedRect(12, 10, 76, 196, 26);
    boss.fillStyle(0x6f8dff, 1);
    boss.fillRoundedRect(22, 22, 56, 46, 16);
    boss.fillStyle(0xeef4ff, 1);
    boss.fillRect(30, 38, 40, 10);
    boss.fillStyle(0x162557, 1);
    boss.fillRect(24, 86, 52, 16);
    boss.fillRect(24, 132, 52, 16);
    boss.fillRect(24, 176, 52, 16);
    boss.lineStyle(6, 0x101631, 1);
    boss.strokeRoundedRect(12, 10, 76, 196, 26);
    boss.generateTexture(BOSS_FALLBACK_TEXTURE_KEY, 100, 220);
    boss.destroy();

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

  createStaticWorld() {
    this.bgSky = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xeaf7ff);
    this.bgHorizon = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 100, GAME_WIDTH, 220, 0xcfeaff);
    this.bgShapes = this.add.group();
    this.bgDots = this.add.group();
    this.bossArt = this.add.container(0, 0);
    this.titleContainer = this.add.container(0, 0).setVisible(false);
    this.endingContainer = this.add.container(0, 0).setVisible(false);

    for (let i = 0; i < 14; i += 1) {
      this.bgShapes.add(
        this.add
          .rectangle(60 + i * 72, 110 + (i % 3) * 18, 26, 26 + (i % 4) * 20, 0xb5d7f5, 0.9)
          .setOrigin(0.5, 1),
      );
    }

    for (let i = 0; i < 35; i += 1) {
      this.bgDots.add(
        this.add.circle(
          Phaser.Math.Between(0, GAME_WIDTH),
          Phaser.Math.Between(0, 180),
          Phaser.Math.Between(1, 2),
          0x7cb7ff,
          Phaser.Math.FloatBetween(0.2, 0.45),
        ),
      );
    }
  }

  createGroups() {
    this.platforms = this.physics.add.staticGroup();
    this.bossWalls = this.physics.add.staticGroup();
    this.enemies = this.physics.add.group({ allowGravity: true, immovable: false });
    this.playerBullets = this.physics.add.group({ allowGravity: false, maxSize: 16 });
    this.bossBullets = this.physics.add.group({
      allowGravity: false,
      maxSize: Math.max(BOSS_MAX_BOUNCING_SPHERES_PHASE_1, BOSS_MAX_BOUNCING_SPHERES_PHASE_2),
    });
  }

  createPlayer() {
    this.player = this.physics.add.sprite(80, 450, PLAYER_TEXTURE_KEYS.idle);
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(28, 72).setOffset(8, 6);
    this.player.setDragX(900);
    this.player.setMaxVelocity(280, 600);
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

    this.stageText = this.add
      .text(GAME_WIDTH - 16, 16, "", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "18px",
        color: "#163250",
        stroke: "#ffffff",
        strokeThickness: 5,
      })
      .setOrigin(1, 0)
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

    this.bossBarFrame = this.add.rectangle(GAME_WIDTH / 2, 30, 286, 22, 0x224466, 0.18).setVisible(false);
    this.bossBarFill = this.add.rectangle(338, 30, 278, 14, 0xff6b6b).setOrigin(0, 0.5).setVisible(false);
    this.bossBarLabel = this.add
      .text(GAME_WIDTH / 2, 30, "BOSS", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "14px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    this.debugPanel = this.add
      .rectangle(180, 54, 328, 34, 0xffffff, 0.9)
      .setStrokeStyle(2, 0x7a1730, 0.35)
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0);

    this.debugText = this.add
      .text(24, 54, "", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "15px",
        color: "#7a1730",
        stroke: "#ffffff",
        strokeThickness: 2,
      })
      .setOrigin(0, 0.5)
      .setScrollFactor(0);

    this.updateHud();
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

  createCollisions() {
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.bossWalls);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.playerBullets, this.platforms, this.destroyBullet, null, this);
    this.physics.add.collider(this.bossBullets, this.platforms);
    this.physics.add.collider(this.bossBullets, this.bossWalls);

    this.physics.add.overlap(this.playerBullets, this.enemies, this.hitEnemy, null, this);
    this.physics.add.overlap(this.player, this.enemies, this.hitPlayer, null, this);
    this.physics.add.overlap(this.player, this.bossBullets, this.hitPlayerByBossBullet, null, this);
  }

  clearStage() {
    this.platforms.clear(true, true);
    this.bossWalls.clear(true, true);
    this.enemies.clear(true, true);
    this.playerBullets.clear(true, true);
    this.bossBullets.clear(true, true);
    this.bossArt.removeAll(true);
    this.titleContainer.removeAll(true);
    this.titleContainer.setVisible(false);
    this.endingContainer.removeAll(true);
    this.endingContainer.setVisible(false);
    this.endingContainer.setY(0);

    if (this.goal) {
      this.goal.destroy();
      this.goal = null;
    }

    if (this.goalOverlap) {
      this.goalOverlap.destroy();
      this.goalOverlap = null;
    }

    if (this.bossBlocker) {
      this.bossBlocker.destroy();
      this.bossBlocker = null;
    }

    if (this.bossSprite) {
      this.bossSprite.destroy();
      this.bossSprite = null;
    }

    this.messageText.setText("");
    this.bossBarFrame.setVisible(false);
    this.bossBarFill.setVisible(false);
    this.bossBarLabel.setVisible(false);
  }

  startTitleScreen() {
    this.clearStage();
    this.resetRunState();
    this.stage = "title";
    this.physics.world.timeScale = 1;
    this.sound.stopAll();
    this.currentMusicKey = null;
    this.bgSky.setFillStyle(0xeaf7ff, 1);
    this.bgHorizon.setFillStyle(0xcfeaff, 1);
    this.playMusicTrack("title");
    this.player.disableBody(true, true);
    this.statusText.setText("");
    this.stageText.setText("");
    this.messageText.setText("");
    this.debugPanel.setVisible(false);
    this.debugText.setVisible(false);

    const veil = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xffffff, 0.14);
    const title = this.add
      .text(GAME_WIDTH / 2, 180, "Meh-Gaman", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "82px",
        color: "#0d4ea6",
        stroke: "#ffffff",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5);
    const prompt = this.add
      .text(GAME_WIDTH / 2, 265, "Presione alguna tecla para activar audio", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "28px",
        color: "#163250",
        stroke: "#ffffff",
        strokeThickness: 6,
      })
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: prompt,
      alpha: { from: 0.35, to: 1 },
      yoyo: true,
      repeat: -1,
      duration: 760,
      ease: "Sine.easeInOut",
    });

    this.titleContainer.add([veil, title, prompt]);
    this.titleContainer.setVisible(true);

    const startGameFromTitle = () => {
      if (this.stage !== "title") {
        return;
      }

      this.titleContainer.setVisible(false);
      this.debugPanel.setVisible(DEBUG_OPTIONS.enabled);
      this.debugText.setVisible(DEBUG_OPTIONS.enabled);

      if (DEBUG_OPTIONS.enabled && DEBUG_OPTIONS.startAtBossFight) {
        this.startBossLevel();
      } else {
        this.startLevelOne();
      }
    };

    this.input.keyboard.once("keydown", () => {
      if (this.stage !== "title") {
        return;
      }

      this.playMusicTrack("title");
      prompt.setText("Presione alguna tecla para comenzar");
      this.input.keyboard.once("keydown", startGameFromTitle);
    });
  }

  startLevelOne() {
    this.clearStage();
    this.stage = "level1";
    this.transitioning = false;
    this.bgSky.setFillStyle(0xeaf7ff, 1);
    this.bgHorizon.setFillStyle(0xcfeaff, 1);

    LEVEL_ONE_PLATFORMS.forEach((platformConfig) => {
      const platform = this.platforms.create(platformConfig.x, platformConfig.y, "platform");
      platform.displayWidth = platformConfig.width;
      platform.displayHeight = platformConfig.height;
      platform.refreshBody();
    });

    LEVEL_ONE_ENEMIES.forEach((spawn) => {
      const enemy = this.enemies.create(spawn.x, spawn.y, "enemy");
      enemy.setCollideWorldBounds(true);
      enemy.setVelocityX(55);
      enemy.minX = spawn.minX;
      enemy.maxX = spawn.maxX;
      enemy.body.setSize(24, 24).setOffset(2, 4);
    });

    this.goal = this.physics.add.staticSprite(900, 440, "goal");
    this.goalOverlap = this.physics.add.overlap(this.player, this.goal, this.reachGoal, null, this);
    this.setPortalState(DEBUG_OPTIONS.enabled && DEBUG_OPTIONS.portalAlwaysActive);
    this.player.enableBody(true, 80, 450, true, true);
    this.player.setVelocity(0, 0);
    this.player.setFlipX(false);
    this.facing = 1;
    this.playMusicTrack("level1");
    this.updateHud();
  }

  startBossLevel() {
    this.clearStage();
    this.stage = "boss";
    this.transitioning = false;
    this.bossHealth = BOSS_MAX_HEALTH;
    this.bossPhase = 1;
    this.bossDefeated = false;
    this.bgSky.setFillStyle(0xf6f6ff, 1);
    this.bgHorizon.setFillStyle(0xd8dcff, 1);
    this.bossPositions = [];

    BOSS_LEVEL_PLATFORMS.forEach((platformConfig) => {
      const platform = this.platforms.create(platformConfig.x, platformConfig.y, "platform");
      platform.displayWidth = platformConfig.width;
      platform.displayHeight = platformConfig.height;
      platform.refreshBody();

       if (platformConfig.role === "boss") {
        this.bossPositions.push({
          x: platformConfig.x,
          y: platformConfig.y - 134 * BOSS_SCALE,
        });
      }
    });

    this.bossBlocker = this.bossWalls.create(930, 270, "platform");
    this.bossBlocker.displayWidth = 24;
    this.bossBlocker.displayHeight = 540;
    this.bossBlocker.refreshBody();
    this.bossBlocker.setVisible(false);

    this.createBossSprite();

    this.player.enableBody(true, 90, 450, true, true);
    this.player.setVelocity(0, 0);
    this.player.setFlipX(false);
    this.facing = 1;
    this.messageText.setText("Nivel 2: Jefe Teleportador\nSube por el centro, esquiva las esferas y dispara.");
    this.bossBarFrame.setVisible(true);
    this.bossBarFill.setVisible(true);
    this.bossBarFill.displayWidth = 278;
    this.bossBarLabel.setVisible(true);
    this.placeBossAt(Phaser.Math.Between(0, this.bossPositions.length - 1), true);
    this.launchBossSphere();
    this.bossTeleportAt = this.time.now + 1800;
    this.playMusicTrack("bossPhase1");
    this.updateHud();
  }

  setPortalState(isUnlocked) {
    this.portalUnlocked = isUnlocked;

    if (!this.goal) {
      return;
    }

    this.goal.setAlpha(isUnlocked ? 1 : 0.35);
    this.goal.setTint(isUnlocked ? 0xffffff : 0x6f7f99);
  }

  createBossSprite() {
    const bossTextureKey = this.getBossTextureKey();
    this.bossSprite = this.physics.add.sprite(0, 0, bossTextureKey);
    this.bossSprite.body.setAllowGravity(false);
    this.bossSprite.setImmovable(true);
    this.bossSprite.setCollideWorldBounds(true);
    this.bossSprite.body.moves = false;
    this.applyBossVisuals(bossTextureKey);
    this.physics.add.overlap(this.playerBullets, this.bossSprite, this.hitBoss, null, this);
    this.physics.add.overlap(this.player, this.bossSprite, this.hitPlayer, null, this);
  }

  getBossTextureKey() {
    if (this.bossPhase >= 2 && this.hasExternalBossPhase2Sprite && this.textures.exists(BOSS_PHASE_2_TEXTURE_KEY)) {
      return BOSS_PHASE_2_TEXTURE_KEY;
    }

    if (this.hasExternalBossSprite && this.textures.exists(BOSS_TEXTURE_KEY)) {
      return BOSS_TEXTURE_KEY;
    }

    return BOSS_FALLBACK_TEXTURE_KEY;
  }

  applyBossVisuals(bossTextureKey) {
    if (bossTextureKey === BOSS_TEXTURE_KEY) {
      this.bossSprite.setScale(BOSS_SCALE);
      this.bossSprite.body.setSize(
        Math.max(40, this.bossSprite.width * 0.7 * BOSS_SCALE),
        Math.max(90, this.bossSprite.height * 0.88 * BOSS_SCALE),
      );
      this.bossSprite.body.setOffset(this.bossSprite.width * 0.15, this.bossSprite.height * 0.08);
    } else {
      this.bossSprite.setScale(BOSS_SCALE);
      this.bossSprite.body
        .setSize(Math.max(36, 74 * BOSS_SCALE), Math.max(96, 188 * BOSS_SCALE))
        .setOffset(13, 16);
    }
  }

  playMusicTrack(trackName) {
    const track = MUSIC_TRACKS[trackName];
    if (!track || this.currentMusicKey === track.key || !this.loadedMusicKeys.has(track.key)) {
      return;
    }

    this.sound.stopAll();
    this.sound.play(track.key, {
      loop: true,
      volume: 0.45,
    });
    this.currentMusicKey = track.key;
  }

  playSfx(trackName, config = {}) {
    const track = SFX_TRACKS[trackName];
    if (!track || !this.loadedSfxKeys.has(track.key)) {
      return;
    }

    this.sound.play(track.key, {
      loop: false,
      volume: 0.7,
      ...config,
    });
  }

  startEnding() {
    this.clearStage();
    this.stage = "ending";
    this.endingStarted = true;
    this.playMusicTrack("ending");
    this.player.disableBody(true, true);
    this.bgSky.setFillStyle(0x050814, 1);
    this.bgHorizon.setFillStyle(0x101b3f, 1);
    this.bgShapes.children.iterate((shape) => shape.setFillStyle(0x23325a, 0.8));
    this.bgDots.children.iterate((dot) => dot.setFillStyle(0xffffff, 0.7));
    this.stageText.setText("ENDING");
    this.statusText.setText("");
    this.messageText.setText("Coloso derrotado\nGracias por jugar");

    const title = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT + 30, "MEHGAMAN", {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "34px",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5, 0);

    const credits = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT + 100, ENDING_CREDITS, {
        fontFamily: "Trebuchet MS, sans-serif",
        fontSize: "22px",
        color: "#dfe8ff",
        align: "center",
        lineSpacing: 8,
      })
      .setOrigin(0.5, 0);

    this.endingContainer.add([title, credits]);
    this.endingContainer.setVisible(true);
    this.tweens.add({
      targets: this.endingContainer,
      y: -credits.height - GAME_HEIGHT - 200,
      duration: 260000,
      ease: "Linear",
      onComplete: () => this.startTitleScreen(),
    });
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.keys.restart)) {
      this.scene.restart();
      return;
    }

    if (this.stage === "title") {
      return;
    }

    if (this.stage === "ending") {
      return;
    }

    if (this.playerDeathInProgress) {
      return;
    }

    if (!this.player.active) {
      return;
    }

    if (this.bossInPhaseTransition) {
      this.player.setVelocity(0, 0);
      this.player.setTexture(PLAYER_TEXTURE_KEYS.idle);
      this.updatePlayerFlash();
      return;
    }

    this.handlePlayerMovement();
    this.handleShooting();
    this.cleanupPlayerBullets();
    this.updatePlayerAnimation();
    this.handleEnemies();
    this.handleBoss();
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
    const wantsShoot =
      Phaser.Input.Keyboard.JustDown(this.keys.shoot) ||
      (DEBUG_OPTIONS.enabled &&
        DEBUG_OPTIONS.autoFire &&
        this.time.now >= this.debugAutoFireAt);

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

    this.canShootAt = this.time.now + 220;
    this.playerShootUntil = this.time.now + 140;

    if (DEBUG_OPTIONS.enabled && DEBUG_OPTIONS.autoFire) {
      this.debugAutoFireAt = this.time.now + DEBUG_OPTIONS.autoFireInterval;
    }
  }

  handleEnemies() {
    if (this.stage !== "level1") {
      return;
    }

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

  handleBoss() {
    if (this.stage !== "boss" || this.bossDefeated || this.bossInPhaseTransition) {
      return;
    }

    if (this.time.now >= this.bossTeleportAt) {
      this.teleportBoss();
    }

    this.bossBullets.children.iterate((bullet) => {
      if (!bullet || !bullet.active) {
        return;
      }

      if (bullet.x < -40 || bullet.x > GAME_WIDTH + 40 || bullet.y < -40 || bullet.y > GAME_HEIGHT + 40) {
        this.destroyBossBullet(bullet);
      }
    });
  }

  cleanupPlayerBullets() {
    this.playerBullets.children.iterate((bullet) => {
      if (!bullet || !bullet.active) {
        return;
      }

      if (bullet.x < -40 || bullet.x > GAME_WIDTH + 40) {
        this.destroyBullet(bullet);
      }
    });
  }

  placeBossAt(index, immediate = false) {
    if (!this.bossSprite || this.bossPositions.length === 0) {
      return;
    }

    this.currentBossPositionIndex = index;
    const target = this.bossPositions[index];
    this.bossSprite.setPosition(target.x, target.y);
    this.bossSprite.clearTint();

    if (!immediate) {
      this.tweens.add({
        targets: this.bossSprite,
        alpha: { from: 0.35, to: 1 },
        duration: 140,
      });
    }
  }

  teleportBoss() {
    if (!this.bossSprite || this.bossPositions.length === 0) {
      return;
    }

    let nextIndex = Phaser.Math.Between(0, this.bossPositions.length - 1);
    if (this.bossPositions.length > 1) {
      while (nextIndex === this.currentBossPositionIndex) {
        nextIndex = Phaser.Math.Between(0, this.bossPositions.length - 1);
      }
    }

    this.bossSprite.setAlpha(0.3);
    this.placeBossAt(nextIndex);
    this.launchBossSphere();

    const phaseInterval = this.bossPhase === 1 ? BOSS_TELEPORT_INTERVAL_PHASE_1 : BOSS_TELEPORT_INTERVAL_PHASE_2;
    this.bossTeleportAt = this.time.now + phaseInterval;
  }

  launchBossSphere() {
    const maxSpheres =
      this.bossPhase === 1 ? BOSS_MAX_BOUNCING_SPHERES_PHASE_1 : BOSS_MAX_BOUNCING_SPHERES_PHASE_2;

    if (this.bossBullets.countActive(true) >= maxSpheres || !this.bossSprite) {
      return;
    }

    const bullet = this.bossBullets.get(this.bossSprite.x - 44, this.bossSprite.y - 12, "boss-bullet");
    if (!bullet) {
      return;
    }

    const horizontalSpeed = this.bossPhase === 1 ? -250 : -320;
    const verticalSpeed = Phaser.Math.Between(140, 210) * (Phaser.Math.Between(0, 1) === 0 ? -1 : 1);
    bullet.setActive(true);
    bullet.setVisible(true);
    bullet.enableBody(true, this.bossSprite.x - 44, this.bossSprite.y - 12, true, true);
    bullet.body.setAllowGravity(false);
    bullet.body.setSize(20, 20).setOffset(2, 2);
    bullet.setCollideWorldBounds(true);
    bullet.setBounce(1, 1);
    bullet.setVelocity(horizontalSpeed, verticalSpeed);
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

    if (this.enemies.countActive(true) === 0 && this.goal) {
      this.setPortalState(true);
      this.messageText.setText("Camino despejado.\nLlega al portal para el nivel 2.");
    }
  }

  hitBoss(firstObject, secondObject) {
    const bullet = firstObject.texture?.key === "bullet" ? firstObject : secondObject;
    const bossSprite = bullet === firstObject ? secondObject : firstObject;

    this.destroyBullet(bullet);

    if (this.stage !== "boss" || this.bossDefeated || this.bossInPhaseTransition) {
      return;
    }

    this.bossHealth -= 1;
    this.bossBarFill.displayWidth = (278 * Math.max(this.bossHealth, 0)) / BOSS_MAX_HEALTH;
    bossSprite.setTint(this.bossPhase === 1 ? 0xfff1a8 : 0xff9b9b);
    this.time.delayedCall(120, () => {
      if (this.bossSprite && this.bossSprite.active) {
        this.bossSprite.clearTint();
      }
    });

    if (this.bossHealth <= Math.ceil(BOSS_MAX_HEALTH * BOSS_PHASE_2_TRIGGER_RATIO) && this.bossPhase === 1) {
      this.startBossPhaseTransition();
    } else {
      this.messageText.setText(`Impacto directo.\nEnergia del boss: ${this.bossHealth}`);
    }

    if (this.bossHealth <= 0) {
      this.defeatBoss();
    }
  }

  hitPlayer(player, enemy) {
    if (DEBUG_OPTIONS.enabled && DEBUG_OPTIONS.infiniteHealth) {
      this.statusText.setText(`Energia: INF/${PLAYER_MAX_HEALTH} DEBUG`);
      return;
    }

    if (this.time.now < this.invulnerableUntil) {
      return;
    }

    const pushDirection = player.x < enemy.x ? -1 : 1;
    this.playerHealth -= 1;
    this.invulnerableUntil = this.time.now + 1200;
    player.setVelocity(pushDirection * 180, -180);
    this.updateHud();

    if (this.playerHealth <= 0) {
      this.killPlayer("Te quedaste sin energía.\nPresiona R para reintentar.");
    }
  }

  startBossPhaseTransition() {
    if (!this.bossSprite) {
      return;
    }

    this.bossInPhaseTransition = true;
    this.bossPhase = 2;
    this.bossBullets.clear(true, true);
    this.playerBullets.clear(true, true);
    this.canShootAt = this.time.now + 1200;
    this.playerShootUntil = 0;
    this.player.setVelocity(0, 0);
    this.playSfx("bossPhaseChange", { volume: 0.8 });
    this.messageText.setText("Transicion de fase\nEl boss esta cambiando...");

    const flash = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xffffff, 0);
    const blackout = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x081020, 0);
    const energyRing = this.add.circle(this.bossSprite.x, this.bossSprite.y, 24, 0xff6677, 0.18).setScale(0.2);
    energyRing.setStrokeStyle(8, 0xffffff, 0.9);

    const burstParticles = [];
    for (let i = 0; i < 14; i += 1) {
      const particle = this.add.circle(
        this.bossSprite.x,
        this.bossSprite.y,
        Phaser.Math.Between(4, 8),
        i % 2 === 0 ? 0xff5f5f : 0x7cb7ff,
        0.95,
      );
      burstParticles.push(particle);

      this.tweens.add({
        targets: particle,
        x: this.bossSprite.x + Phaser.Math.Between(-140, 140),
        y: this.bossSprite.y + Phaser.Math.Between(-170, 170),
        alpha: 0,
        scale: 0.25,
        duration: Phaser.Math.Between(380, 620),
        ease: "Cubic.easeOut",
        onComplete: () => particle.destroy(),
      });
    }

    this.tweens.add({
      targets: blackout,
      alpha: { from: 0, to: 0.45 },
      yoyo: true,
      duration: 420,
      ease: "Sine.easeInOut",
    });

    this.tweens.add({
      targets: energyRing,
      scale: { from: 0.2, to: 4.6 },
      alpha: { from: 0.7, to: 0 },
      duration: 720,
      ease: "Cubic.easeOut",
      onComplete: () => energyRing.destroy(),
    });

    this.tweens.add({
      targets: flash,
      alpha: { from: 0, to: 0.75 },
      yoyo: true,
      repeat: 4,
      duration: 90,
      onUpdate: () => {
        if (this.bossSprite && this.bossSprite.active) {
          this.bossSprite.setTint(Phaser.Math.Between(0, 1) === 0 ? 0xffffff : 0xff6b6b);
        }
      },
      onComplete: () => {
        flash.destroy();
        blackout.destroy();
        if (this.bossSprite && this.bossSprite.active) {
          this.bossSprite.clearTint();
          this.bossSprite.setTexture(this.getBossTextureKey());
          this.applyBossVisuals(this.bossSprite.texture.key);
        }
        this.cameras.main.shake(420, 0.018);
        this.cameras.main.flash(250, 255, 120, 120, false);
      },
    });

    this.time.delayedCall(900, () => {
      this.messageText.setText("Fase 2\nNuevo sprite y patron mas agresivo.");
      this.bossTeleportAt = this.time.now + BOSS_TELEPORT_INTERVAL_PHASE_2;
      this.bossInPhaseTransition = false;
      this.playMusicTrack("bossPhase2");
      this.launchBossSphere();
    });
  }

  hitPlayerByBossBullet(player, bullet) {
    this.destroyBossBullet(bullet);
    this.hitPlayer(player, { x: bullet.x });
  }

  reachGoal() {
    if (!this.portalUnlocked && !(DEBUG_OPTIONS.enabled && DEBUG_OPTIONS.portalAlwaysActive)) {
      this.messageText.setText("El portal sigue cerrado.\nPrimero derrota a todos los enemigos.");
      return;
    }

    if (this.stage !== "level1" || this.transitioning) {
      return;
    }

    this.transitioning = true;
    this.player.setVelocity(0, 0);
    this.messageText.setText("Nivel 1 completado.\nPreparando batalla contra el jefe...");
    this.time.delayedCall(1400, () => this.startBossLevel());
  }

  defeatBoss() {
    this.bossDefeated = true;
    this.playSfx("bossDeath", { volume: 0.95 });
    this.messageText.setText("Boss destruido.\nSobrecarga total...");
    this.bossBullets.clear(true, true);
    if (!this.bossSprite) {
      this.time.delayedCall(7000, () => this.startEnding());
      return;
    }

    const doomOverlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xfff3d6, 0);
    const shockwave = this.add.circle(this.bossSprite.x, this.bossSprite.y, 30, 0xffffff, 0.12).setScale(0.3);
    shockwave.setStrokeStyle(10, 0xffd966, 0.95);

    this.tweens.add({
      targets: doomOverlay,
      alpha: { from: 0, to: 0.5 },
      yoyo: true,
      repeat: 8,
      duration: 160,
      ease: "Sine.easeInOut",
    });

    this.tweens.add({
      targets: shockwave,
      scale: { from: 0.3, to: 7.5 },
      alpha: { from: 0.95, to: 0 },
      duration: 1800,
      ease: "Cubic.easeOut",
      onComplete: () => shockwave.destroy(),
    });

    this.tweens.add({
      targets: this.bossSprite,
      angle: 18,
      scaleX: this.bossSprite.scaleX * 1.08,
      scaleY: this.bossSprite.scaleY * 1.08,
      yoyo: true,
      repeat: 10,
      duration: 120,
      ease: "Sine.easeInOut",
    });

    for (let wave = 0; wave < 7; wave += 1) {
      this.time.delayedCall(wave * 260, () => {
        if (!this.bossSprite || !this.bossSprite.active) {
          return;
        }

        this.cameras.main.shake(220 + wave * 70, 0.012 + wave * 0.003);

        for (let i = 0; i < 10; i += 1) {
          const particle = this.add.circle(
            this.bossSprite.x + Phaser.Math.Between(-60, 60),
            this.bossSprite.y + Phaser.Math.Between(-90, 90),
            Phaser.Math.Between(6, 14),
            i % 3 === 0 ? 0xffffff : i % 2 === 0 ? 0xffc14d : 0xff5a5a,
            0.92,
          );

          this.tweens.add({
            targets: particle,
            x: particle.x + Phaser.Math.Between(-180, 180),
            y: particle.y + Phaser.Math.Between(-180, 180),
            alpha: 0,
            scale: { from: 1, to: 0.18 },
            duration: Phaser.Math.Between(650, 1100),
            ease: "Cubic.easeOut",
            onComplete: () => particle.destroy(),
          });
        }
      });
    }

    this.time.delayedCall(2800, () => {
      if (this.bossSprite && this.bossSprite.active) {
        this.bossSprite.setTint(0xffffff);
      }
      this.cameras.main.flash(420, 255, 240, 180, false);
    });

    this.time.delayedCall(4300, () => {
      if (this.bossSprite && this.bossSprite.active) {
        this.tweens.add({
          targets: this.bossSprite,
          alpha: 0,
          scaleX: this.bossSprite.scaleX * 1.45,
          scaleY: this.bossSprite.scaleY * 0.2,
          angle: 40,
          duration: 1900,
          ease: "Cubic.easeIn",
          onComplete: () => this.bossSprite.disableBody(true, true),
        });
      }
    });

    this.time.delayedCall(7000, () => {
      doomOverlay.destroy();
      this.messageText.setText("Amenaza neutralizada.\nComienza el ending.");
      this.startEnding();
    });
  }

  killPlayer(message) {
    if (this.playerDeathInProgress) {
      return;
    }

    this.playerDeathInProgress = true;
    this.playerHealth = 0;
    this.updateHud();

    const deathX = this.player.x;
    const deathY = this.player.y;
    this.player.disableBody(true, true);
    this.playerBullets.clear(true, true);
    this.bossBullets.clear(true, true);
    this.canShootAt = Number.MAX_SAFE_INTEGER;
    this.playerShootUntil = 0;

    if (this.stage === "boss" && this.bossSprite && this.bossSprite.active) {
      this.playSfx("bossLaugh", { volume: 0.9 });
      const bossDeathScale = (GAME_HEIGHT * 0.8) / this.bossSprite.height;
      this.bossSprite.setPosition(GAME_WIDTH / 2, GAME_HEIGHT / 2);
      this.bossSprite.setVelocity?.(0, 0);
      this.bossSprite.clearTint();
      this.bossSprite.setAlpha(1);
      this.bossSprite.setDepth(20);
      this.bossSprite.setScale(bossDeathScale);
      this.bossSprite.body.setAllowGravity(false);
      this.bossSprite.body.moves = false;
    }

    for (let i = 0; i < 8; i += 1) {
      const angle = (Math.PI * 2 * i) / 8;
      const orb = this.add.circle(deathX, deathY, Phaser.Math.Between(8, 13), 0xffffff, 0.5);

      this.tweens.add({
        targets: orb,
        x: deathX + Math.cos(angle) * Phaser.Math.Between(70, 140),
        y: deathY + Math.sin(angle) * Phaser.Math.Between(70, 140),
        alpha: 0,
        scale: { from: 1, to: 0.22 },
        duration: 1500,
        ease: "Sine.easeOut",
        onComplete: () => orb.destroy(),
      });
    }

    this.tweens.add({
      targets: this.physics.world,
      timeScale: 0.03,
      duration: 1800,
      ease: "Sine.easeOut",
    });

    this.cameras.main.shake(420, 0.012);
    this.cameras.main.flash(240, 255, 255, 255, false);
    this.messageText.setText(message);
    this.stageText.setText("DERROTA");
  }

  destroyBullet(bullet) {
    if (bullet && bullet.body) {
      bullet.disableBody(true, true);
    }
  }

  destroyBossBullet(bullet) {
    if (bullet && bullet.body) {
      bullet.disableBody(true, true);
    }
  }

  updateHud() {
    if (DEBUG_OPTIONS.enabled && DEBUG_OPTIONS.infiniteHealth) {
      this.statusText.setText(`Energia: INF/${PLAYER_MAX_HEALTH} DEBUG`);
    } else {
      this.statusText.setText(`Energia: ${this.playerHealth}/${PLAYER_MAX_HEALTH}`);
    }

    if (this.stage === "level1") {
      this.stageText.setText("NIVEL 1");
    } else if (this.stage === "boss") {
      this.stageText.setText("NIVEL 2: BOSS");
    } else if (this.stage === "ending") {
      this.stageText.setText("ENDING");
    }

    if (this.debugText && DEBUG_OPTIONS.enabled) {
      const bossSource =
        this.bossPhase >= 2
          ? this.hasExternalBossPhase2Sprite && this.textures.exists(BOSS_PHASE_2_TEXTURE_KEY)
            ? "FASE2 PNG"
            : "FASE2 FALLBACK"
          : this.hasExternalBossSprite && this.textures.exists(BOSS_TEXTURE_KEY)
            ? "FASE1 PNG"
            : "FASE1 FALLBACK";
      this.debugText.setText(`DEBUG BOSS: ${bossSource}`);
    }

    if (this.debugPanel) {
      this.debugPanel.setVisible(DEBUG_OPTIONS.enabled);
    }

    if (this.debugText) {
      this.debugText.setVisible(DEBUG_OPTIONS.enabled);
    }
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
