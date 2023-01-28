// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {
            // Movement
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false,
            Space: false,
            Escape: false,
        };

        // Information on gamepad controller input
        this.controllerButtonLeft = false;
        this.controllerButtonRight = false;
        this.controllerButtonUp = false;
        this.controllerButtonDown = false;
        this.controllerButtonA = false;
        this.controllerButtonB = false;
        this.controllerButtonX = false;
        this.controllerButtonY = false;
        this.gamepad = null;

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        this.PAUSED = false;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        const getXandY = e => ({
            x: e.clientX - this.ctx.canvas.getBoundingClientRect().left,
            y: e.clientY - this.ctx.canvas.getBoundingClientRect().top
        });
        
        this.ctx.canvas.addEventListener("mousemove", e => {
            if (this.options.debugging) {
                console.log("MOUSE_MOVE", getXandY(e));
            }
            this.mouse = getXandY(e);
        });

        this.ctx.canvas.addEventListener("click", e => {
            if (this.options.debugging) {
                console.log("CLICK", getXandY(e));
            }
            this.click = getXandY(e);
        });

        this.ctx.canvas.addEventListener("wheel", e => {
            if (this.options.debugging) {
                console.log("WHEEL", getXandY(e), e.wheelDelta);
            }
            e.preventDefault(); // Prevent Scrolling
            this.wheel = e;
        });

        this.ctx.canvas.addEventListener("contextmenu", e => {
            if (this.options.debugging) {
                console.log("RIGHT_CLICK", getXandY(e));
            }
            e.preventDefault(); // Prevent Context Menu
            this.rightclick = getXandY(e);
        });

        this.ctx.canvas.addEventListener("keydown", event => this.keys[event.code] = true);
        
        this.ctx.canvas.addEventListener("keyup", event => this.keys[event.code] = false);
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }

    };

    gamepadUpdate() {
        this.gamepad = navigator.getGamepads()[0];
        let gamepad = this.gamepad;
        if (gamepad != null) {

            this.controllerButtonA = gamepad.buttons[0].pressed;
            this.controllerButtonB = gamepad.buttons[1].pressed;
            this.controllerButtonX = gamepad.buttons[2].pressed;
            this.controllerButtonY = gamepad.buttons[3].pressed;

            this.controllerButtonUp = gamepad.buttons[12].pressed || gamepad.axes[0] < -0.3;
            this.controllerButtonDown = gamepad.buttons[13].pressed || gamepad.axes[0] > 0.3;
            this.controllerButtonLeft = gamepad.buttons[14].pressed || gamepad.axes[0] < -0.3;
            this.controllerButtonRight = gamepad.buttons[15].pressed || gamepad.axes[0] > 0.3;
        }
    }

    update() {
        let entitiesCount = this.entities.length;
        this.gamepadUpdate();

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };
    
    loop() {
        if(!this.PAUSED) {
            this.clockTick = this.timer.tick();
            this.update();
            this.draw();
        } else {
            this.clockTick = null;
            this.update();
            // this.draw();
        }
        
        // this.update();
        // this.draw();
    };

};

// KV Le was here :)