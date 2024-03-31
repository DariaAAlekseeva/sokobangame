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
    document.getElementById('newRecordMsg').style.visibility = "hidden";
    let currentLevelResult = localStorage.getItem(String(currentLevel));
    
    if (currentLevelResult > 0 && currentLevelResult > steps || !currentLevelResult) {
        localStorage.setItem(String(currentLevel), steps);
    }

    let resultSpan = document.getElementById("resultSpan");
    resultSpan.innerHTML = steps + " " + getNumWord(steps, 'ШАГ', 'ШАГА', 'ШАГОВ');
    let levelSpan = document.getElementById("levelSpan");
    levelSpan.innerHTML = currentLevel + 1;
    sessionStorage.setItem('currentLevel', currentLevel);
    restoreInfo();
}

function nextLevel() {
    currentLevel++;
    sessionStorage.setItem('currentLevel', currentLevel);
    SwitchToGame();
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
        let currentLevel = sessionStorage.getItem('currentLevel');
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
        let currentLevel = sessionStorage.getItem('currentLevel');
        const levelRecordSpan = document.getElementById("levelRecordSpan");
        levelRecordSpan.innerHTML = currentRecord.levelsRecord[currentLevel];

        if (currentRecord.levelsRecord[currentLevel] > steps || (!currentRecord.levelsRecord[currentLevel])) {

            document.getElementById('newRecordMsg').style.visibility = "visible";
            storeInfo();
            
        }
    }

}

function errorHandler(jqXHR, statusStr, errorStr) {
    alert(statusStr + ' ' + errorStr);
}

