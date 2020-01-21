(function () {
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")

    // const margin = 10;
    // let x = margin;
    // let y = margin;
    

    // console.log(canvas.style.width)
    // function drawBricks(width, height) {
    //     // console.log(x)
    //     ctx.beginPath();
    //     ctx.rect(x, y, width, height);
    //     ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    //     ctx.fill();
    //     ctx.closePath();
    // }

    // function makeRow(width, height) {
    //     while (x + margin + width <= 470 ) {
    //         drawBricks( width, height)
    //         x += width + margin
    //     }
    //     console.log(y)
    //     x = margin
    //     y += height + margin;
    //     console.log(y)
    // }

    // makeRow(30, 20)
    // makeRow(70, 20)
    // makeRow(30, 20)
    // makeRow(70, 20)

    let x = canvas.width/2;
    let y = canvas.height-30;
    let dx = 2;
    let dy = -2;
    const ballRadius = 10

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        
        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
            dy = -dy;
        }
        
        x += dx;
        y += dy;
    }
    
    setInterval(draw, 10);

})();