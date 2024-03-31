window.onhashchange = SwitchToStateFromURLHash;

var SPAStateH = {};

function UpdateToState(NewStateH) {
    SPAStateH = NewStateH;
    switch (SPAStateH.pagename) {

        case "Main":  //главная
            document.getElementById("rules").style.display = "none";
            document.getElementById("levelSelect").style.display = "none";
            document.getElementById("game").style.display = "none";
            document.getElementById("main").style.display = "flex";
            document.getElementById("win").style.display = "none";
            break;

        case "LevelSelect":  //главная
            document.getElementById("rules").style.display = "none";
            document.getElementById("levelSelect").style.display = "block";
            document.getElementById("game").style.display = "none";
            document.getElementById("main").style.display = "none";
            document.getElementById("win").style.display = "none";
            break;

        case "Game":  //игра 
            document.getElementById("rules").style.display = "none";
            document.getElementById("levelSelect").style.display = "none";
            document.getElementById("game").style.display = "block";
            document.getElementById("main").style.display = "none";
            document.getElementById("win").style.display = "none";
            onloadImages(startGame);
            break;

        case "Rules": // правила
            document.getElementById("rules").style.display = "block";
            document.getElementById("levelSelect").style.display = "none";
            document.getElementById("game").style.display = "none";
            document.getElementById("main").style.display = "none";
            document.getElementById("win").style.display = "none";
            break;

        case "Win":
            document.getElementById("rules").style.display = "none";
            document.getElementById("levelSelect").style.display = "none";
            document.getElementById("game").style.display = "none";
            document.getElementById("main").style.display = "none";
            document.getElementById("win").style.display = "flex";
    }
}

function SwitchToStateFromURLHash() {
    var URLHash = window.location.hash;
    var StateStr = URLHash.substring(1);

    if (StateStr != "") {
        var PartsA = StateStr.split("_")

        var NewStateH = { pagename: PartsA[0] };

        UpdateToState(NewStateH);
    }
    else
        UpdateToState({ pagename: 'Main' });
}

function SwitchToState(NewStateH) {
    var StateStr = NewStateH.pagename;
    location.hash = StateStr;
}

function SwitchToMainPage() {
    SwitchToState({ pagename: 'Main' });
}

function SwitchToLevelSelect() {
    SwitchToState({ pagename: 'LevelSelect' });
    changeLevelRes();   
}

function SwitchToRulesPage() {
    SwitchToState({ pagename: 'Rules' });
}

function SwitchToGame() {
    SwitchToState({ pagename: 'Game' });
}

function SwitchToWinPage() {
    SwitchToState({ pagename: 'Win' });
}

SwitchToStateFromURLHash();


function win() {
    setTimeout(() => SwitchToWinPage(), 1000);
    console.log ("we are here");
    let currentLevelResult = localStorage.getItem(currentLevel);
    console.log (currentLevelResult);
    if (currentLevelResult>0 && currentLevelResult>steps || !currentLevelResult){
        localStorage.setItem(String(currentLevel), steps);
    }    
    let resultSpan = document.getElementById("resultSpan");

    resultSpan.innerHTML = steps+" " + getNumWord(steps,'ШАГ','ШАГА','ШАГОВ');
    let levelSpan = document.getElementById("levelSpan");
    levelSpan.innerHTML = currentLevel + 1;
    sessionStorage.setItem('currentLevel', currentLevel+1 );
}

function nextLevel() {
    currentLevel++;
    SwitchToGame();
    history.length = 0;
}

