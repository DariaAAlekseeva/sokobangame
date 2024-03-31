let manSprite = {
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
    manSprite.posX -= manSprite.speedX;
    if (manSprite.tick_count >= 15) {
        if (manSprite.step) {
            document.getElementById('man').style.backgroundPosition = "right";
            manSprite.step = false;
        } else {
            document.getElementById('man').style.backgroundPosition = "left";
            manSprite.step = true;
        }
        manSprite.tick_count = 0;
      }
      manSprite.tick_count++;
      
    if (manSprite.posX < -30) {
        manSprite.speedX = - manSprite.speedX;
        manSprite.posY -= 10;
        document.getElementById('man').style.backgroundImage = "url('/pic/manspriteright.jpg')";
    }

    if (manSprite.posX > 100) {
        manSprite.speedX = - manSprite.speedX;
        manSprite.posY += 10;
        document.getElementById('man').style.backgroundImage = "url('/pic/manspriteleft.jpg')";
       
    }

    manSprite.update();
    requestAnimationFrame(tick);
}

manSprite.update();

