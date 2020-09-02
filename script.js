let cvs = document.getElementById("canvas")
let ctx = cvs.getContext("2d")

let ball = new Image()
let bg = new Image()
let danger = new Image()

ball.src = "img/ball.png"
bg.src = "img/bg.png"
danger.src = "img/danger.png"

let pipe = []

pipe[0] = {
    x : 190,
    y : 0
}

let score = 0
let xPos = 50
let yPos = 250
let gr = 0.5

document.addEventListener("keydown", event => {
    if (event.keyCode === 38) {
        yPos -= 25
    }
    if (event.keyCode === 40) {
        yPos += 25
    }
    if (event.keyCode === 39 && xPos < cvs.width - 5 - ball.width) {
        xPos += 5
    }
    if (event.keyCode === 37 && xPos > 5) {
        xPos -= 5
    }
})

function gameOver() {
    location.reload()
    alert("You lose")
}

function draw() {
    ctx.drawImage(bg, 0, 0)

    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(danger, pipe[i].x, pipe[i].y)

        if(pipe[i].x === 150) {
            pipe.push({
                x : 650,
                y : Math.floor(Math.random() * cvs.height)
            });
        }
        if(xPos + ball.width >= pipe[i].x && xPos <= pipe[i].x + danger.width && (yPos + ball.height >= pipe[i].y && yPos <= pipe[i].y + danger.height)
            || yPos + ball.height >= cvs.height || yPos  < 0) {
            gameOver()
        }
        pipe[i].x -= 5
        if(pipe[i].x === 5) {
            score++
        }
    }

    ctx.drawImage(ball, xPos, yPos)
    yPos += gr

    ctx.fillStyle = "#000"
    ctx.font = "24px Verdana"
    ctx.fillText("Счет: " + score,cvs.width - 110,30)

    requestAnimationFrame(draw)
}
draw()
