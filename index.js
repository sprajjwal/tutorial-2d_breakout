(function () {
    const canvas = document.getElementById("myCanvas")
    const ctx = canvas.getContext("2d")

    const margin = 10;
    let x = margin;
    let y = margin;
    

    console.log(canvas.style.width)
    function drawBricks(width, height) {
        // console.log(x)
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fillStyle = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
        ctx.fill();
        ctx.closePath();

        if ((x + width + margin) >= 480) {
            x = margin
            y +=  height + margin
        } else {
            x += width + margin
        }

    }

    let refreshID = setInterval(function() {
        drawBricks(70, 20)
        // drawBricks(140, 20)
        if (y >= 150) {
            clearInterval(refreshID)
        }
    }, 50)

    // ctx.beginPath();
    // ctx.rect(20, 40, 50, 50);
    // ctx.fillStyle = "#FF0000";
    // ctx.fill();
    // ctx.closePath();

    // ctx.beginPath();
    // ctx.arc(240, 160, 20, 0, Math.PI*2, false);
    // ctx.fillStyle = "green";
    // ctx.fill();
    // ctx.closePath();

    // ctx.beginPath();
    // ctx.rect(160, 10, 100, 40);
    // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    // ctx.stroke();
    // ctx.closePath();
})();