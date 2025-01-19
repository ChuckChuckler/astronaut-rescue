let minutesTillCrash;
let secondsTillCrash;
let countdownInterval;

let typingIndex;
let typingInterval;

let minigameMode;

let passwIdeas = ["SHAPE", "ANGLE", "GRAPH", "TIMES", "EQUAL", "GRAPH", "DIGIT", "CURVE", "SCALE", "PRIME", "RATIO", "WHOLE", "LINES" , "PLANE", "IMAGE"];
let chosenPass;

let minigameTriggered = false;
let enemyOnScreen = false;

let animFrame = window.requestAnimationFrame;

const alphabetUnedited = ["a", "b", "c", "d", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "u", "v", "w", "x", "y", "z"];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function proceed(){
    window.location.href = "settings.html";
}

function game(){
    let time = document.getElementById("timeLimit");

    if(time.value < 20){
        document.getElementById("errInfo").innerText = "Please set a time of at minimum 20 minutes.";
    }else if(time.value > 60){
        document.getElementById("errInfo").innerText = "Please set a time of at maximum 60 minutes."
    }else{
        window.location.href = `game.html?time=${time.value}&minigameMode=${document.getElementById("minigames").checked}`;
    }
}

function rulesDiv(){
    document.getElementById("rulesDiv").style.visibility = "visible";
}

function closeRules(){
    document.getElementById("rulesDiv").style.visibility = "hidden";
}

function randint(int){
    return Math.floor(Math.random()*int);
}

function findFactors(int){
    let factors = [];
    for(let i = 1; i <= int; i++){
        if(int%i == 0){
            factors.push([i, int/i]);
        }
    }
    return factors;
}

function findGCF(int1, int2){
    let gcf = 1;
    let greater;
    if(int1>int2){
        greater=int1;
    }else{
        greater=int2;
    }

    for(let i = 1; i <= greater; i++){
        if(int1%i == 0 && int2%i == 0 && i > gcf){
            gcf = i;
        }
    }
    return gcf;
}


function countdown(){
    secondsTillCrash-=1;
    if(secondsTillCrash == 0){
        if(minutesTillCrash == 0){
            gameOver();
        }else{
            minutesTillCrash-=1;
            secondsTillCrash = 59;
        }
    }
    if(secondsTillCrash < 10){
        document.getElementById("time").innerText = `${minutesTillCrash}:0${secondsTillCrash} UNTIL CRASH.`;
    }else{
        document.getElementById("time").innerText = `${minutesTillCrash}:${secondsTillCrash} UNTIL CRASH.`;
    }
}

function enemyIt(){
    if(enemyOnScreen == true){
        console.log("enemy not defeated fast enough");
        minutesTillCrash -= 2;
        document.getElementById("enemy").style.display = "none";
        document.getElementById("enemyWarning").style.display = "none";
        enemyOnScreen = false;
    }else{
        let enemy = randint(10);
        if(enemy == 9){
            enemyOnScreen = true;
            let enemyLeft = randint(51)+20;
            let enemyTop = randint(41)+10;
            document.getElementById("enemy").style.left = `${enemyLeft}%`;
            document.getElementById("enemy").style.top = `${enemyTop}%`;
            document.getElementById("enemy").style.display = "none";
            document.getElementById("enemy").animate([
                { top: CSS.percent(enemyTop)},
                { top: CSS.percent(enemyTop+5)}
            ], {duration: 500, 
                direction: "alternate", 
                iterations: Infinity
            });
            document.getElementById("enemy").style.display = "block";
            document.getElementById("enemyWarning").style.display = "block";
        }
    }
}

function defeatEnemy(){
    console.log("enemy defeated successfully");
    document.getElementById("enemy").style.display = "none";
    document.getElementById("enemyWarning").style.display = "none";
    enemyOnScreen = false;
}

function setCountdown(minutes, minigameBool){
    let indexOfPass = randint(passwIdeas.length);
    chosenPass = passwIdeas[indexOfPass];
    minutesTillCrash = minutes-1;
    secondsTillCrash = 60;
    countdownInterval = setInterval(countdown, 1000);
    minigameMode = minigameBool;
    if(minigameMode == "true"){
        enemyInterval = setInterval(enemyIt, 5000);
    }else{
        console.log("no enemies");
    }
}

function gameOver(){
    clearInterval(countdownInterval);
    window.location.href = "gameLost.html";
}

function createEquation(varLttr){
    let equation = "";
    let num1 = randint(10)+1;
    let num2 = randint(100)+1;
    let num3 = randint(100)+1;
    let nums = [num1, num2, num3];
    for(let i = 0; i < 3; i++){
        let sign = randint(2);
        if(sign == 1){//negative
            nums[i] = nums[i]*-1
        } 
    }

    let degree = randint(3);

    if(degree == 0){ //degree of 2
        equation = `${num1}${varLttr}² + ${num2}${varLttr} + ${num3}`;
    }else if(degree == 1){
        equation = `${num1}${varLttr}³ + ${num2}${varLttr}² + ${num3}${varLttr}`;
    }else{
        equation = `${num1}${varLttr}⁴ + ${num2}${varLttr}³ + ${num3}${varLttr}²`;
    }

    return [equation, num1, num2, num3, degree];
}

function radicalSimplify(int){
    let outside = 0;
    for(let i = 2; i*i < int; i++){
        if(int%(i*i) == 0){
            outside = i;
        }
    }

    return outside;
}

function findSolutions(a, b, c, degree){     //use quadratic formula on all of these
    let solutions = [];
    let discriminant = (b*b)-(4*a*c);

    if(Number.isInteger(Math.sqrt(discriminant))){
        let sqrtDiscrim = Math.sqrt(discriminant);
        if((b*-1 + sqrtDiscrim)%(2*a) == 0){
            solutions.push((b*-1 + sqrtDiscrim)/(2*a));
        }else{
            let gcf = findGCF((b*-1)+sqrtDiscrim, 2*a);
            if(gcf > 1){
                solutions.push(`${((b*-1)+sqrtDiscrim)/gcf}/${(2*a)/gcf}`);
            }else{
                solutions.push(`${(b*-1)+sqrtDiscrim}/${2*a}`);
            }
        }

        if((b*-1 - sqrtDiscrim)%(2*a) == 0){
            solutions.push((b*-1 - sqrtDiscrim)/(2*a));
        }else{
            let gcf = findGCF((b*-1)-sqrtDiscrim, 2*a);
            if(gcf > 1){
                solutions.push(`${((b*-1)-sqrtDiscrim)/gcf}/${(2*a)/gcf}`);
            }else{
                solutions.push(`${(b*-1)-sqrtDiscrim}/${2*a}`);
            }
        }
    }else{
        let absDiscrm = Math.abs(discriminant);
        let outsideParenth = radicalSimplify(absDiscrm);
        if(outsideParenth > 0){
            if((b*-1)%(2*a) == 0 && outsideParenth%(2*a) == 0){
                if(discriminant < 0){
                    solutions.push(`${(b*-1)/(2*a)} + i√${absDiscrm/(outsideParenth*outsideParenth)}`);
                    solutions.push(`${(b*-1)/(2*a)} - i√${absDiscrm/(outsideParenth*outsideParenth)}`);
                }else{
                    solutions.push(`${(b*-1)/(2*a)} + √${absDiscrm/(outsideParenth*outsideParenth)}`);
                    solutions.push(`${(b*-1)/(2*a)} - √${absDiscrm/(outsideParenth*outsideParenth)}`);
                }
            }else{
                let gcfOf1;
                let gcfOf2;
                let third;
                
                if(b*-1 > outsideParenth){
                    gcfOf1 = outsideParenth;
                    if(b*-1 > 2*a){
                        gcfOf2 = 2*a;
                        third = b*-1;
                    }else{
                        gcfOf2 = b*-1;
                        third = 2*a;
                    }
                }else{
                    gcfOf1 = b*-1;
                    if(outsideParenth > 2*a){
                        gcfOf2 = 2*a;
                        third = outsideParenth;
                    }else{
                        gcfOf2 = outsideParenth;
                        third = 2*a;
                    }
                }
    
                let reduction = findGCF(gcfOf1, gcfOf2);
    
                if(third%reduction == 0){
                    if(discriminant < 0){ //imaginary number
                        solutions.push(`(${(b*-1)/reduction} + ${outsideParenth/reduction}i√${absDiscrm/(outsideParenth*outsideParenth)})/${(2*a)/reduction}`.replace("1i", "i"));
                        solutions.push(`(${(b*-1)/reduction} - ${outsideParenth/reduction}i√${absDiscrm/(outsideParenth*outsideParenth)})/${(2*a)/reduction}`.replace("1i", "i"));
                    }else{ //not imaginary
                        solutions.push(`(${(b*-1)/reduction} + ${outsideParenth/reduction}√${absDiscrm/(outsideParenth*outsideParenth)})/${(2*a)/reduction}`.replace("1√", "√"));
                        solutions.push(`(${(b*-1)/reduction} - ${outsideParenth/reduction}√${absDiscrm/(outsideParenth*outsideParenth)})/${(2*a)/reduction}`.replace("1√", "√"));
                    }
                }else{
                    if(discriminant < 0){ //imaginary number
                        solutions.push(`(${b*-1} + ${outsideParenth}i√${absDiscrm/(outsideParenth*outsideParenth)})/${2*a}`.replace("1i", "i"));
                        solutions.push(`(${b*-1} - ${outsideParenth}i√${absDiscrm/(outsideParenth*outsideParenth)})/${2*a}`.replace("1i", "i"));
                    }else{ //not imaginary
                        solutions.push(`(${b*-1} + ${outsideParenth}√${discriminant/(outsideParenth*outsideParenth)})/${2*a}`.replace("1√", "√"));
                        solutions.push(`(${b*-1} - ${outsideParenth}√${discriminant/(outsideParenth*outsideParenth)})/${2*a}`.replace("1√", "√"));
                    }
                }
            }
        }else{
            if(discriminant < 0){ //imaginary number
                solutions.push(`(${b*-1} + i√${absDiscrm})/${2*a}`.replace("1i", "i"));
                solutions.push(`(${b*-1} - i√${absDiscrm})/${2*a}`.replace("1i", "i"));
            }else{ //not imaginary
                solutions.push(`(${b*-1} + √${absDiscrm})/${2*a}`.replace("1√", "√"));
                solutions.push(`(${b*-1} - √${absDiscrm})/${2*a}`.replace("1√", "√"));
            }
        }
    }

    if(degree == 1){
        solutions.unshift("0");
    }else if(degree == 2){
        solutions.unshift("0dr");
    }
    
    let solutionStatement = "{";
    for(let i = 0; i < solutions.length; i++){
        solutionStatement += solutions[i] + ", ";
    }
    solutionStatement += "}";
    solutionStatement.replace(", }", "}");

    return solutionStatement;
}

function typing(str, elm){
    if(str[typingIndex] == " "){
        elm.appendChild(document.createTextNode("\u00A0"));
    }else{
        elm.innerText += str[typingIndex];
    }
    typingIndex ++;
    if(typingIndex == str.length){
        clearType();
    }
}

function clearType(){
    clearInterval(typingInterval);
}

let vars = [];
let equations = [];
let solutions = [];
let alphabet = ["a", "b", "c", "d", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "u", "v", "w", "x", "y", "z"];


let chosen1;
let chosen2;
let chosen3;
let chosen4;
let chosen5;
let chosen6;

let safetyCode = "";

let dbNavigationIndex = 0;

function main(){
    let tempAlph = [...alphabet];
    document.getElementById("prev").style.visibility = "hidden";

    for(let i = 0; i < 21; i++){
        let varLttr = tempAlph[0];
        vars.push(varLttr);
        tempAlph.splice(0, 1);
        let equation = createEquation(varLttr);
        equations.push(equation[0]);
        let solution = findSolutions(equation[1], equation[2], equation[3], equation[4]);
        solutions.push(solution);
    }

    let tempvar = [...vars];
    let tempsolutions = [...solutions];

    let arrOfChosens = [chosen1, chosen2, chosen3, chosen4, chosen5, chosen6];
    let keyPrefx = ["First Digit:", "Second Digit:", "Third Digit:", "Fourth Digit:", "Fifth Digit:", "Sixth Digit:"];

    for(let i = 0; i < 6; i++){
        let index = randint(tempvar.length);
        safetyCode+=tempvar[index];
        arrOfChosens[i] = [tempvar[index], tempsolutions[index]];
        document.getElementById(i+1).innerText = `${keyPrefx[i]} ${tempsolutions[index]}`;
        tempvar.splice(index, 1);
        tempsolutions.splice(index, 1);
    }

    document.getElementById("varName").innerText = vars[dbNavigationIndex];
    document.getElementById("problemDisplay").innerText = equations[dbNavigationIndex];
}

function next(){
    document.getElementById("prev").style.visibility = "visible";
    dbNavigationIndex+=1;
    document.getElementById("varName").innerText = vars[dbNavigationIndex];
    document.getElementById("problemDisplay").innerText = equations[dbNavigationIndex];
    if(dbNavigationIndex == 20){
        document.getElementById("next").style.visibility = "hidden";
    }
}

function prev(){
    document.getElementById("next").style.visibility = "visible";
    dbNavigationIndex-=1;
    document.getElementById("varName").innerText = vars[dbNavigationIndex];
    document.getElementById("problemDisplay").innerText = equations[dbNavigationIndex];
    if(dbNavigationIndex == 0){
        document.getElementById("prev").style.visibility = "hidden";
    }
}

function checkAnswer(){
    let passcode = document.getElementById("passcode");
    if(passcode.value.toLowerCase() != safetyCode){
        document.getElementById("passwVerif").innerText = "Incorrect.";
        sleep(1000).then(()=>{
            document.getElementById("passwVerif").innerText = "";
        })
    }else{
        document.getElementById("passwVerif").innerText = "Success!";
        document.getElementById("passwVerif").style.color = "green";
        sleep(1000).then(()=>{
            window.location.href = "gameWon.html";
        })
    }
}

let attempts = [document.getElementById("passAttempt1"), document.getElementById("passAttempt2"), document.getElementById("passAttempt3"), document.getElementById("passAttempt4"), document.getElementById("passAttempt5")];

function accessDb(){
    document.getElementById("database").style.display = "block";
    document.getElementById("database").style.animationName = "dbFlyIn";
    document.getElementById("database").style.animationDuration = "0.5s";
    document.getElementById("innerDb").style.display = "none";
    document.getElementById("authenthDb").style.display = "block";
    document.getElementById("authen1").innerText = "";
    document.getElementById("dbPassw").value = "";
    document.getElementById("authen2").innerText = "";
    document.getElementById("loginDiv").style.display = "none";

    document.getElementById("dbTitle").innerText = "";
    document.getElementById("dbMsg1").innerText = "";
    document.getElementById("dbMsg2").innerText = "";
    document.getElementById("attemptsLeft").style.display = "none";

    for(let i = 0; i < 5; i++){
        attempts[i].style.display = "none";
    }

    if(minigameMode == "true"){
        typingIndex = 0;
        typingInterval = setInterval(function() {
            typing("Quadra Code I.D. Database", document.getElementById("dbTitle"))
        }, 40);
        sleep(1300).then(()=>{
            typingIndex = 0;
            typingInterval = setInterval(function() {
                typing("User authentication required.", document.getElementById("dbMsg1"));
            }, 40);
            sleep(1460).then(()=>{
                typingIndex = 0;
                typingInterval = setInterval(function() {
                    typing("Please LOGIN to continue.", document.getElementById("dbMsg2"));
                }, 40);
                sleep(1300).then(()=>{
                    document.getElementById("loginDiv").style.display = "block";
                    for(let i = 0; i < 5; i++){
                        attempts[i].style.display = "block";
                    }
                    document.getElementById("attemptsLeft").style.display = "block";
                })
            })
        })
    }else{
        document.getElementById("authenthDb").style.display = "none";
        document.getElementById("innerDb").style.display = "block";
    }
}

function closeDb(){
    document.getElementById("database").style.animationName = "dbFlyOut";
    document.getElementById("database").style.animationDuration = "0.5s";
    sleep(495).then(() => {
        document.getElementById("database").style.display = "none";
    });
}

let attemptNumber = 0;

function checkAuthen(){
    if(document.getElementById("dbPassw").value.toUpperCase() == chosenPass){
        document.getElementById("attemptsLeft").innerText = "";
        document.getElementById("authen1").innerText = "Success!";
        sleep(1000).then(() => {
            document.getElementById("authen2").innerText = "Proceeding.";
            let ddotInterval = setInterval(function(){
                sleep(150).then(()=>{
                    document.getElementById("authen2").innerText = "Proceeding..";
                    sleep(150).then(()=>{
                        document.getElementById("authen2").innerText = "Proceeding...";
                        sleep(150).then(()=>{
                            document.getElementById("authen2").innerText = "Proceeding...";
                        })
                    })
                })
            }, 450);
            sleep(2000).then(()=>{
                clearInterval(ddotInterval);
                document.getElementById("innerDb").style.display = "block";
                document.getElementById("authenthDb").style.display = "none";
                for(let i = 0; i < 5; i++){
                    attempts[i].innerText = "";
                }
            })
        });   
    }else{
        if(document.getElementById("dbPassw").value.length != 5){
            document.getElementById("authen1").innerText = "The password must be five letters long.";
        }else{
            document.getElementById("authen1").innerText = "";
            document.getElementById("attemptsLeft").innerText = `Incorrect. ${5-(attemptNumber+1)} attempts remaining.`;

            let tempPass = chosenPass;
            tempPass = tempPass.toLowerCase();
            let attemptedPass = document.getElementById("dbPassw").value;
            attemptedPass = attemptedPass.toLowerCase();
    
            for(let i = 0; i < 5; i++){
                let span = document.createElement("span");
                if(attemptedPass[i] == tempPass[i]){
                    span.style.color = "green";
                }else if(tempPass.includes(attemptedPass[i])){
                    span.style.color = "yellow";
                }else{
                    span.style.color = "red";
                }
                tempPass = tempPass.replace(attemptedPass[i], "x");
                span.innerText = attemptedPass[i];
                attempts[attemptNumber].appendChild(span);
            }
    
            attemptNumber++;
    
            document.getElementById("dbPassw").value = "";
            if(attemptNumber == 5){
                document.getElementById("authen1").innerText = "Error: Password incorrect";
                sleep(1000).then(()=>{
                    document.getElementById("authen2").innerText = "Resetting password as safety measure.";
                    let ddotInterval = setInterval(function() {
                        sleep(150).then(()=>{
                            document.getElementById("authen2").innerText = "Resetting password as safety measure..";
                            sleep(150).then(()=>{
                                document.getElementById("authen2").innerText = "Resetting password as safety measure...";
                                sleep(150).then(()=>{
                                    document.getElementById("authen2").innerText = "Resetting password as safety measure.";
                                })
                            })
                        })
                    }, 450)
                    let indexOfPass = randint(passwIdeas.length);
                    chosenPass = passwIdeas[indexOfPass];
                    sleep(2000).then(()=>{
                        clearInterval(ddotInterval);
                        document.getElementById("authen3").innerText = "Password reset.";
                        sleep(1000).then(()=>{
                            attemptNumber = 0;
                            document.getElementById("passAttempt1").innerText = "";
                            document.getElementById("passAttempt2").innerText = "";
                            document.getElementById("passAttempt3").innerText = "";
                            document.getElementById("passAttempt4").innerText = "";
                            document.getElementById("passAttempt5").innerText = "";
                            document.getElementById("database").style.display = "none";
                            document.getElementById("authen1").innerText = "";
                            document.getElementById("authen2").innerText = "";
                            document.getElementById("authen3").innerText = "";
                        })
                    })
                })
            }
        }
    }
}

function accessMsC(){
    document.getElementById("passcodeHolder").style.animationName = "dbFlyIn";
    document.getElementById("passcodeHolder").style.animationDuration = "0.5s";
    document.getElementById("passcodeHolder").style.visibility = "visible";
    document.getElementById("feedback").innerText = "";
    document.getElementById("passwVerif").innerText = "";
}

function closeMsC(){
    minigameTriggered = false;
    document.getElementById("passcodeHolder").style.animationName = "dbFlyOut";
    document.getElementById("passcodeHolder").style.animationDuration = "0.5s";
    sleep(495).then(()=>{
        document.getElementById("passcodeHolder").style.visibility = "hidden";
    });
}

let varsUsed = [];
let prevLen = 0;

document.onkeyup = function(e){
    if(minigameTriggered == true && e.key == "ArrowDown"){
        let letterPos = getComputedStyle(document.getElementById("letter")).marginLeft;
        document.getElementById("letter").style.marginLeft = letterPos;
        document.getElementById("letter").style.animation = "letterDown";
        document.getElementById("letter").style.animationDuration = "0.5s";
        document.getElementById("letter").style.marginTop = "12%";

        sleep(600).then(() => {
            let letterRect = document.getElementById("letter").getBoundingClientRect();
            let openRect = document.getElementById("opening").getBoundingClientRect();
    
            if(letterRect.right >= openRect.left && letterRect.left <= openRect.right && letterRect.top <= openRect.bottom && letterRect.bottom >= openRect.top){
                document.getElementById("passcode").value += document.getElementById("letter").innerText;
                document.getElementById("feedback").innerText = "Success!";
                document.getElementById("letter").style.display = "none";
                document.getElementById("slider").style.display = "none";
                varsUsed.push(document.getElementById("letter").innerText);
                prevLen++;
                minigameTriggered = false;
                sleep(1000).then(() => {
                    document.getElementById("feedback").innerText = "";
                });
            }else{
                document.getElementById("feedback").innerText = "Failed; try again.";
                sleep(3000).then(()=>{
                    document.getElementById("feedback").innerText = "";
                    document.getElementById("letter").style.animation = "leftright";
                    document.getElementById("letter").style.animationDuration = "2s";
                    document.getElementById("letter").style.animationPlayState = "running";
                    document.getElementById("letter").style.animationIterationCount = "infinite";
                    document.getElementById("letter").style.animationDirection = "alternate-reverse";
                })
            }
        })
    }
}

function minigameTrigger(){
    if(minigameMode == "true"){
        minigameTriggered = true;

        let letterElm = document.getElementById("passcode");
        
        letter = letterElm.value[letterElm.value.length-1];
    
        if(alphabet.includes(letter) && letterElm.value.length > prevLen){
            letterElm.value = letterElm.value.substring(0, letterElm.value.length-1);
            document.getElementById("letter").style.display = "block";
            document.getElementById("slider").style.display = "block";
            document.getElementById("letter").innerText = letter;
            document.getElementById("opening").style.marginLeft = `${randint(75)}%`;
            document.getElementById("letter").style.animationName = "leftright";
            document.getElementById("letter").style.animationDuration = "2s";
            document.getElementById("letter").style.animationPlayState = "running";
            document.getElementById("letter").style.animationIterationCount = "infinite";
            document.getElementById("letter").style.animationDirection = "alternate-reverse";
        }else if(letterElm.value.length < prevLen){
            prevLen--;
        }else if(alphabet.includes(letter) == false){
            letterElm.value = letterElm.value.substring(0, letterElm.value.length-1);
        }
    }
}