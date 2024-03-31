
var levelList = document.getElementById("levelList");


for (let i = 0; i < totalMap.length; i++) {
    let newBtn = document.createElement('div');
    newBtn.setAttribute('class', 'btnLevel');

    let levelNum = document.createElement('div');
    levelNum.setAttribute('class', 'levelNum');
    newBtn.appendChild(levelNum);

    let currentUserLevelRes = document.createElement('div');
    currentUserLevelRes.setAttribute('class', 'currentUserLevelRes');
    newBtn.appendChild(currentUserLevelRes);

    levelList.appendChild(newBtn);
    levelNum.textContent = i + 1;

    changeLevelRes();
}

var currentLevel = 0;



levelList.addEventListener('click', function (event) {
    let currentLevelBtn = event.target;
    currentLevel = currentLevelBtn.firstElementChild.textContent - 1;
    sessionStorage.setItem('currentLevel', currentLevel);
    SwitchToGame();
});


function getNumWord(num, word1, word2, word5) {
    const dd = num % 100;
    if ((dd >= 11) && (dd <= 19))
        return word5;
    const d = num % 10;
    if (d == 1)
        return word1;
    if ((d >= 2) && (d <= 4))
        return word2;
    return word5;
}

function changeLevelRes() {
    let btnLevelArray = document.getElementsByClassName('btnLevel');
    for (let i = 0; i < btnLevelArray.length; i++) {
        if (localStorage.getItem(i)) {
            btnLevelArray[i].style.backgroundImage = "url('/pic/star.jpg')";
            btnLevelArray[i].style.backgroundRepeat = "no-repeat"; 
            btnLevelArray[i].style.backgroundPosition = "center";  
            btnLevelArray[i].style.backgroundSize = "cover";  
            btnLevelArray[i].firstChild.style.color="white";
            btnLevelArray[i].lastChild.textContent = localStorage.getItem(i) + ' ' + getNumWord(localStorage.getItem(i), 'ШАГ', 'ШАГА', 'ШАГОВ');
        }
    }
}