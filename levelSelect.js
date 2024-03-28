var levelList = document.getElementById("levelList");

for (let i=0; i<totalMap.length; i++) {
    let newBtn = document.createElement('button');
    levelList.appendChild(newBtn);
    newBtn.textContent = i+1;
}

var currentLevel = 0;

levelList.addEventListener('click', function(event) {
	currentLevel = event.target.textContent-1 ;
    sessionStorage.setItem('currentLevel', currentLevel);
    SwitchToGame();
});
