/**
 * @description 旋转星空
 * @author https://www.17sucai.com/pins/36359.html
 * @param eleSelector
 * @param cutSize
 */
export const skyCircle = (eleSelector,cutSize=false)=>{
    const canvas = document.querySelector(eleSelector);
    if (typeof canvas.getContext === 'undefined') {
        return;
    }
    const ctx = canvas.getContext("2d");


    // Canvas Resize
    function fitCanvasSize() {
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        if(cutSize){
            canvas.width -=10;
            canvas.height -=10;
        }
    }
    fitCanvasSize();
    window.onresize = fitCanvasSize;

    // RequestAnimationFrame
    (function () {
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    const colors = ['#000030', '#4d4398', '#4784bf', '#000030', '#4d4398', '#ffffff']

    //Utility Function
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function randomColor(colors) {
        return colors[Math.floor(Math.random() * colors.length)]
    }

    // Objects
    function Particle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.radians = Math.random() * Math.PI * 2;
        this.velocity = 0.001;
        this.distanceFormCenter = randomIntFromRange(10, canvas.width / 2 + 100);

        this.update = () => {

            // Move points over time
            this.radians += this.velocity;

            //Circular Motion
            this.x = Math.cos(this.radians) * this.distanceFormCenter + canvas.width / 2;
            this.y = Math.sin(this.radians) * this.distanceFormCenter + canvas.height / 2;
            this.draw();
        }

        this.draw = () => {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.globalAlpha = .8;
            ctx.fill();
        };
    }

    // Implementation
    let perticles;
    function init() {
        perticles = []

        for (let i = 0; i < 1200; i++) {
            const radius = (Math.random()) + .5;
            perticles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
        }
    }

    // Animation Loop
    function animate() {
        if(document.querySelector(eleSelector)){
            requestAnimationFrame(animate);
            var g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            g.addColorStop(0, 'rgba(19,27,35,.05)');
            g.addColorStop(1, 'rgba(10,20,67,.05)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            perticles.forEach(perticles => {
                perticles.update();
            });
        }else {
            console.log('#skyCircle|星空画布Dom已移除');
        }
    }

    init();
    animate();
}