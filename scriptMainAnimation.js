let manH = {
    posX: 100,
    posY: 70,
    speedX: 0.2,
    step: true,
    tick_count: 0,

    update: function () {
        const manElem =
            document.getElementById('man');
        manElem.style.left = this.posX + "vw";
        manElem.style.top = this.posY + "vh";
    }
}

function startAnimation() {
    requestAnimationFrame(tick);
}

function tick() {
    manH.posX -= manH.speedX;
    if (manH.tick_count >= 15) {
        if (manH.step) {
            document.getElementById('man').style.backgroundPosition = "right";
            manH.step = false;
        } else {
            document.getElementById('man').style.backgroundPosition = "left";
            manH.step = true;
        }
        manH.tick_count = 0;
      }
      manH.tick_count++;
      
    if (manH.posX < -30) {
        manH.speedX = - manH.speedX;
        document.getElementById('man').style.backgroundImage = "url('/pic/manspriteright.jpg')";
    }

    if (manH.posX > 100) {
        manH.speedX = - manH.speedX;
        document.getElementById('man').style.backgroundImage = "url('/pic/manspriteleft.jpg')";
       
    }

    manH.update();
    requestAnimationFrame(tick);
}

manH.update();

