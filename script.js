
window.onhashchange = switchToStateFromURLHash;

var SPAStateH = {};

function updateToState(newStateH) {
    SPAStateH = newStateH;
    switch (SPAStateH.pagename) {

        case "Main":  //главная
            document.getElementById("rules").style.display = "none";
            document.getElementById("levelSelect").style.display = "none";
            document.getElementById("game").style.display = "none";
            document.getElementById("main").style.display = "flex";
            document.getElementById("win").style.display = "none";
            break;

        case "LevelSelect": //выбор уровня
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


function switchToStateFromURLHash() {

    var URLHash = window.location.hash;
    var stateStr = URLHash.substring(1);
    
    if (stateStr != "") {
        var partsA = stateStr.split("_")

        var newStateH = { pagename: partsA[0] };

        updateToState(newStateH);
    }
    else
        updateToState({ pagename: 'Main' });
}

function switchToState(newStateH) {
    var stateStr = newStateH.pagename;
    location.hash = stateStr;
}

function switchToMainPage() {
    switchToState({ pagename: 'Main' });
}

function switchToLevelSelect() {
    switchToState({ pagename: 'LevelSelect' });
    changeLevelRes();
}

function switchToRulesPage() {
    switchToState({ pagename: 'Rules' });
}

function switchToGame() {
    switchToState({ pagename: 'Game' });
}

function switchToWinPage() {
    switchToState({ pagename: 'Win' });
}

switchToStateFromURLHash();




function win() {
    setTimeout(() => switchToWinPage(), 2000);
    document.getElementById('newRecordMsg').style.visibility = "hidden";
    let currentLevelResult = localStorage.getItem(String(currentLevel));
    
    if (currentLevelResult > 0 && currentLevelResult > steps || !currentLevelResult) {
        localStorage.setItem(String(currentLevel), steps);
    }

    let resultSpan = document.getElementById("resultSpan");
    resultSpan.innerHTML = steps + " " + getNumWord(steps, 'ШАГ', 'ШАГА', 'ШАГОВ');
    let levelSpan = document.getElementById("levelSpan");
 
    levelSpan.innerHTML = `ВЫ ПРОШЛИ УРОВЕНЬ ${currentLevel+1} ЗА `;
    restoreInfo();
}

function nextLevel() {
    currentLevel++;
    localStorage.setItem('currentLevel', currentLevel);
    switchToGame();
    history.length = 0;
}

const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword;
const stringName = 'ALEKSEEVA_SOKOBAN';

function storeInfo() {
    updatePassword = Math.random();
    $.ajax({
        url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
        data: { f: 'LOCKGET', n: stringName, p: updatePassword },
        success: lockGetReady, error: errorHandler
    }
    );
}

function lockGetReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
    else {
        //const record = {levelsRecord: [null, null, null, null, null, null, null, null, null, null]}
        const record = JSON.parse(callresult.result);
        let currentLevel = localStorage.getItem('currentLevel');
        record.levelsRecord[currentLevel] = steps;


        $.ajax({
            url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
            data: {
                f: 'UPDATE', n: stringName,
                v: JSON.stringify(record), p: updatePassword
            },
            success: updateReady, error: errorHandler
        }
        );
    }
}

function updateReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
}

function restoreInfo() {
    $.ajax(
        {
            url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
            data: { f: 'READ', n: stringName },
            success: readReady, error: errorHandler
        }
    );
}


function readReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
    else if (callresult.result != "") {
        const currentRecord = JSON.parse(callresult.result);
        let currentLevel = localStorage.getItem('currentLevel');
        const levelRecordSpan = document.getElementById("levelRecordSpan");
        levelRecordSpan.innerHTML = "ТЕКУЩИЙ РЕКОРД УРОВНЯ - " + currentRecord.levelsRecord[currentLevel];

        if (currentRecord.levelsRecord[currentLevel] > steps || (!currentRecord.levelsRecord[currentLevel])) {

            document.getElementById('newRecordMsg').style.visibility = "visible";
            storeInfo();
            
        }
    }

}

function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
}

