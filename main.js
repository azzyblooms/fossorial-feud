//web audio api stuff
let audioCtx;
let audioBuffer;
let sourceNode;

async function setupAudio(audioPath) {
    if (audioCtx) return; 
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const response = await fetch(audioPath);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    gainNode = audioCtx.createGain();
  
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime)
}

function playLoopingMusic() {
  sourceNode = audioCtx.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  sourceNode.start(0);
}


const startbutton = document.getElementById("startbutton")
const pagetitle = document.getElementById("pagetitle")
const molecontainer = document.getElementById("molecontainer")
const cursor = document.getElementById("cursor")
const cursorhb = document.getElementById("cursorhb")
const difficultyButton = document.getElementById("difficulty")
const settingsButton = document.getElementById("settingsbutton")

const molespawn1 = document.getElementById("molespawn1")
const molespawn2 = document.getElementById("molespawn2")
const molespawn3 = document.getElementById("molespawn3")
const molespawn4 = document.getElementById("molespawn4")
const molespawn5 = document.getElementById("molespawn5")
const molespawn6 = document.getElementById("molespawn6")
const molespawn7 = document.getElementById("molespawn7")
const molespawn8 = document.getElementById("molespawn8")
const molespawn9 = document.getElementById("molespawn9")
const molespawn10 = document.getElementById("molespawn10")
const molespawn11 = document.getElementById("molespawn11")
const molespawn12 = document.getElementById("molespawn12")
const molespawn13 = document.getElementById("molespawn13")
const molespawn14 = document.getElementById("molespawn14")
const molespawn15 = document.getElementById("molespawn15")
const molespawn16 = document.getElementById("molespawn16")


const tutorialmolecontainer = document.getElementById("tutorialmolecontainer")
const tutorialmolegrid = document.getElementById("tutorialmolegrid")

const tutorialspawn1 = document.getElementById("tmolespawn1")
const tmoleimg = document.getElementById("tmoleimg")

const laugh1 = new Audio("audio/laughs/laugh1.mp3")
const laugh2 = new Audio("audio/laughs/laugh2.mp3")
const laugh3 = new Audio("audio/laughs/laugh3.mp3")
const laugh4 = new Audio("audio/laughs/laugh4.mp3")
const heheheha = new Audio("audio/laughs/heheheha.mp3")
const bonk = new Audio("audio/hits/bonk.mp3")
const punch = new Audio("audio/hits/punch.mp3")
const growlSound = new Audio("audio/grrr.mp3")


let intro = true;
let difficulty = "easy";
let skipIntro = false;
if(localStorage.getItem("skipIntroState") === null) {
    localStorage.setItem("skipIntroState", false)
}
if(localStorage.getItem("brightFlashesState") === null) {
    localStorage.setItem("brightFlashesState", true)
}
if(localStorage.getItem("showMouseHitboxState") === null) {
    localStorage.setItem("showMouseHitboxState", true)
}

skipIntroState = localStorage.getItem("skipIntroState") === "true"
brightFlashesState = localStorage.getItem("brightFlashesState") === "true"
showMouseHitboxState = localStorage.getItem("showMouseHitboxState") === "true"
if(showMouseHitboxState == true) {cursorhb.style.opacity = "0"} else {cursorhb.style.opacity = "1"}

let moles = [
    {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
    {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
    {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
    {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null}
]

const laughs = [
    laugh1,
    laugh2,
    laugh3,
    laugh4,
    heheheha
]
const hits = [
    punch,
    //bonk
]

const enemyTypes = [
    {name: "mole", image: "images/mole.png", item: null},
    {name: "groundhog", image: "images/groundhog.png", item: null},
    {name: "armadillo", image: "images/armadillo.png", item: "bomb"},
    {name: "snake", image: "images/snake.png", item: null}
]

const toggleBrightFlashes = document.getElementById("epilepsybutton")
const toggleSkipIntro = document.getElementById("introbutton")
const toggleMouseHitbox = document.getElementById("mousehitboxbutton")

const settings = [
    {setting: "brightFlashes", isOn: brightFlashesState, button: toggleBrightFlashes},
    {setting: "skipIntro", isOn: skipIntroState, button: toggleSkipIntro},
    {setting: "showMouseHitbox", isOn: showMouseHitboxState, button: toggleMouseHitbox}
]

settings.forEach((button) => {
    if(button.isOn) {button.button.style.backgroundColor = "green"; button.button.textContent = "ON"}
    if(!button.isOn) {button.button.style.backgroundColor = "red"; button.button.textContent = "OFF"}
})

toggleBrightFlashes.addEventListener('mousedown', () => {
    settings[0].isOn = !settings[0].isOn;
    localStorage.setItem("brightFlashesState", settings[0].isOn)
    settings.forEach((button) => {
        if(button.isOn) {button.button.style.backgroundColor = "green"; button.button.textContent = "ON"}
        if(!button.isOn) {button.button.style.backgroundColor = "red"; button.button.textContent = "OFF"}
    })
    if(localStorage.getItem("brightFlashesState") === "true") {
        epilepsyFriendly = false;
    } else {
        epilepsyFriendly = true;
    }
})

toggleSkipIntro.addEventListener('mousedown', () => {
    settings[1].isOn = !settings[1].isOn;
    localStorage.setItem("skipIntroState", settings[1].isOn)
    settings.forEach((button) => {
        if(button.isOn) {button.button.style.backgroundColor = "green"; button.button.textContent = "ON"}
        if(!button.isOn) {button.button.style.backgroundColor = "red"; button.button.textContent = "OFF"}
    })
    skipIntro = !skipIntro
})

toggleMouseHitbox.addEventListener('mousedown', () => {
    settings[2].isOn = !settings[2].isOn;
    localStorage.setItem("showMouseHitboxState", settings[2].isOn)
    settings.forEach((button) => {
        if(button.isOn) {button.button.style.backgroundColor = "green"; button.button.textContent = "ON"}
        if(!button.isOn) {button.button.style.backgroundColor = "red"; button.button.textContent = "OFF"}
    })
    if(settings[2].isOn) {cursorhb.style.opacity = "0"} else {cursorhb.style.opacity = "1"}
})

const tutorialButton = document.getElementById("tutorial")



const moleGrid = document.getElementById("molegrid")
molespawn5.style.display = "none";
molespawn6.style.display = "none";
molespawn7.style.display = "none";
molespawn8.style.display = "none";
molespawn9.style.display = "none";
molespawn10.style.display = "none";
molespawn11.style.display = "none";
molespawn12.style.display = "none";
molespawn13.style.display = "none";
molespawn14.style.display = "none";
molespawn15.style.display = "none";
molespawn16.style.display = "none";

let epilepsyFriendly = null;
if(localStorage.getItem("brightFlashesState") === "true") {
    epilepsyFriendly = false;
} else {
    epilepsyFriendly = true;
}
const epilepsyWrap = document.getElementById("epilepsywrap")
const epilepsyContainer = document.getElementById("epilepsy")
const epilepsyProceed = document.getElementById("epilepsyproceed")
const epilepsyWarningToggle = document.getElementById("epilepsywarningtoggle")

const flashbang = document.getElementById("flashbang")

let settingsOpen = false;
const settingsMenu = document.getElementById("settingsmenu")
settingsButton.addEventListener('mousedown', () => {
    if(!settingsOpen) {
        settingsOpen = true;
        settingsMenu.style.display = "flex";
    }
})




function triggerFlashbang() {
    flashbang.style.animation = ("none")
    flashbang.style.display = "none"
    flashbang.offsetHeight;
    if(epilepsyFriendly == true) {
        flashbang.style.backgroundColor = "black"
    } else {
        flashbang.style.backgroundColor = "white"
    }
    flashbang.style.animation = "flashbang 2s ease forwards"
    flashbang.style.display = "inline";
}
epilepsyWarningToggle.addEventListener("mousedown", () => {
    epilepsyFriendly = !epilepsyFriendly;
})


function difficultyChange() {
    if(difficulty == "easy") {
        moles = [
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null}
        ]
        molecontainer.style.scale = ("1")
        molespawn5.style.display = "none";
        molespawn6.style.display = "none";
        molespawn7.style.display = "none";
        molespawn8.style.display = "none";
        molespawn9.style.display = "none";
        molespawn10.style.display = "none";
        molespawn11.style.display = "none";
        molespawn12.style.display = "none";
        molespawn13.style.display = "none";
        molespawn14.style.display = "none";
        molespawn15.style.display = "none";
        molespawn16.style.display = "none";
        moleGrid.style.gridTemplateColumns = ("repeat(2, 1fr)")
    }
    if(difficulty == "normal") {
        molecontainer.style.scale = ("0.75")
        moles = [
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn5, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn6, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn7, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn8, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn9, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null}
        ]
        molespawn5.style.display = "flex";
        molespawn6.style.display = "flex";
        molespawn7.style.display = "flex";
        molespawn8.style.display = "flex";
        molespawn9.style.display = "flex";
        molespawn10.style.display = "none";
        molespawn11.style.display = "none";
        molespawn12.style.display = "none";
        molespawn13.style.display = "none";
        molespawn14.style.display = "none";
        molespawn15.style.display = "none";
        molespawn16.style.display = "none";
        moleGrid.style.gridTemplateColumns = ("repeat(3, 1fr)")
    }
    if(difficulty == "hard") {
        molecontainer.style.scale = ("0.5")
        moles = [
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn5, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn6, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn7, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn8, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn9, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn10, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn11, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn12, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn13, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn14, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn15, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null},
            {element: molespawn16, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null}
        ]
        molespawn5.style.display = "flex";
        molespawn6.style.display = "flex";
        molespawn7.style.display = "flex";
        molespawn8.style.display = "flex";
        molespawn9.style.display = "flex";
        molespawn10.style.display = "flex";
        molespawn11.style.display = "flex";
        molespawn12.style.display = "flex";
        molespawn13.style.display = "flex";
        molespawn14.style.display = "flex";
        molespawn15.style.display = "flex";
        molespawn16.style.display = "flex";
        moleGrid.style.gridTemplateColumns = ("repeat(4, 1fr)")
    }
}


const clickSound = new Audio('audio/click2.mp3')

const startpageelements = [
    document.getElementById("startbutton"),
    document.getElementById("pagetitle"),
    document.getElementById("difficulty"),
    document.getElementById("settings"),
    document.getElementById("tutorial"),
    document.getElementById("evilbutton"),
    document.getElementById("shop")
]

difficultyButton.addEventListener('mousedown', () => {
    if(difficulty == "easy") {
        difficulty = "normal";
    } else if(difficulty == "normal") {
        difficulty = "hard";
    } else {
        difficulty = "easy"
    }
    difficultyChange();
    difficultyButton.textContent = (`DIFFICULTY: ${difficulty.toUpperCase()}`)
})

let health = 100;
let teasing = true;

function tease() {
    intro = true;
    if(!teasing) {
        grr();
        return;
    }
    if(skipIntro || skipIntroState) {
        moles.forEach((mole) => {
            mole.element.querySelector("img").style.opacity = ("1")
        })
        roundcountshow();
        return;
    }

    moles.forEach((mole) => {
        mole.element.querySelector("img").style.opacity = ("1")
    })
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {

            
            const activemoles = [];

            moles.forEach((thing) => {
                if (thing.state == "ok") activemoles.push(thing.element)
            })
                
            if (activemoles.length == 0) {
                teasing = false;
                grr();
                return;
            }

            let currentMole = activemoles[Math.floor(Math.random() * activemoles.length)];


            let currentLaugh = Math.floor(Math.random() * laughs.length)
            
            laughs[currentLaugh].cloneNode(true).play();
            currentMole.querySelector("img").style.animation = ("none")
            currentMole.querySelector("img").offsetHeight;
            currentMole.querySelector("img").style.animation = ("wiggley 100ms ease")
        }, i * Math.random() * 350 + 99)
    }

    setTimeout(tease, 3000)
}

function grr() {

    if(!skipIntro || !skipIntroState) {
        setTimeout(() => {
            for(let i = 0; i < 5; i++) {
            setTimeout(() => {
                let currentMole = moles[Math.floor(Math.random() * moles.length)];
                const growl = growlSound.cloneNode(true);
                growl.playbackRate = Math.random() * 1.4 + 0.6;
                growl.preservesPitch = false;
                growl.play();
                currentMole.element.querySelector("img").style.animation = ("none")
                currentMole.element.querySelector("img").offsetHeight;
                currentMole.element.querySelector("img").style.animation = ("wigglex 100ms ease")
                document.querySelectorAll(".moleimgdiv").forEach((moleimg) => {moleimg.style.animation = ("redfilter 500ms ease reverse forwards")})
                }, i * Math.random() * 350 + 99)
            }
            setTimeout(() => {
                moles.forEach((mole) => {
                    mole.element.querySelector("img").style.transform = ("scale(0)")
                })
                roundcountshow();
            }, 2500)
        }, 1000)
    } else {
        teasing = false;
        intro = false;
        moles.forEach((mole) => {
            mole.element.querySelector("img").style.transform = ("scale(0)")
        })
        roundcountshow();
    }

}

const tutorialTexts = [
    "Hello! Welcome to Fossorial Feud. This game is similar to Whack-A-Mole, but has a few quirks. Here's how the game works!",
    "This is a MOLE. Click on it to hit it. Be careful not to click on things outside of the mole's hitbox; you'll be stunned for a moment.",
    "Great work! Try hitting some more moles, and make sure to keep up that streak!",
    "This is a GROUNDHOG. Groundhogs are mischevious, and will steal 50 points if you hit them. Stay far away!",
    "This is a SNAKE. Please hit them! They will spit venom at you if you keep them around for too long!",
    "This is an ARMADILLO. Armadillos like to pick up items they find in the dirt. Watch before you hit; you may be in for a nasty surprise!",
    "Amazing work! You're absolutely ready for the real deal now!"
]
const justText = [0, 2, 3, 5, 6]

const tutorialTextBox = document.getElementById("tutorialtextbox")
const tutorialBox = document.getElementById("tutorialbox")
const shading = document.getElementById("shader")



let typeTimeout = null;
let typeCancelled = false;

function prepText(text) {
    current = 0;
    globalDelay = 35;
    tmoleimg.style.transform = "scale(0)"
    tmoletype = null;
    tutorialTextBox.innerHTML = ""
    for(const char of text) {
      const span = document.createElement("span")
      span.textContent = char;
      tutorialTextBox.appendChild(span)
    }
    if(!justText.includes(whereAreWe)) {
        canContinue = false;
    }
    type();
}

function spawnTutorialMole(mole) {

}



let current = 0;
let punctuation = [".", "?", "!"]
let whereAreWe = 0;
let typingDone = null;
let canContinue = true;
let globalDelay = 35;

function type() {
    typingDone = false;
    continueButton.classList.remove("flashing")
    const chars = tutorialTextBox.children;
    if(current >= chars.length) {
        if(canContinue) {
            continueButton.classList.add("flashing")
        }
        if(whereAreWe == 1) {
            spawnTutorialMole()
        }
        if(whereAreWe == 3) {
            spawnTutorialGroundhog()
        }
        if(whereAreWe == 4) {
            spawnTutorialSnake()
        }
        if(whereAreWe == 5) {
            spawnTutorialArmadillo()
        }
        typingDone = true;
        return;
    }
    const char = chars[current].textContent;
    chars[current].classList.add("visible")
    current++;
    if(/[a-zA-z]/.test(char)) {
        const speakSound = (new Audio(`audio/speech/${(char.toUpperCase())}.wav`)).cloneNode(true);
        speakSound.playbackRate = Math.random() * 0.2 + 1.3;
        speakSound.preservesPitch = false;
        speakSound.volume = 0.7;
        speakSound.play();
    }
    let delay = 35;
    if(globalDelay == 35) {
        if (char === ",") delay = 180;
        if (punctuation.includes(char)) delay = 300;
    } else {
        delay = globalDelay;
    }
    setTimeout(type, delay)
}

let tmoletype = null;

function spawnTutorialMole() {
    tmoletype = "mole"
    tmoleimg.src = "images/mole.png"
    tmoleimg.style.transition = "transform 350ms ease"
    tmoleimg.style.transform = "scale(1)"
}
let tgroundhogTimer = null;
function spawnTutorialGroundhog() {
    tmoletype = "groundhog"
    tmoleimg.src = "images/groundhog.png"
    tmoleimg.style.transition = "transform 350ms ease"
    tmoleimg.style.transform = "scale(1)"
    tgroundhogTimer = setTimeout(() => {
        tmoleimg.style.transform = "scale(0)"
        whereAreWe = 4;
        setTimeout(() => {
            prepText(tutorialTexts[whereAreWe])
        }, 500)
    }, 6000)
}
let tsnakeTimer = null;
function spawnTutorialSnake() {
    tmoletype = "snake"
    tmoleimg.src = "images/snake.png"
    tmoleimg.style.transition = "transform 350ms ease"
    tmoleimg.style.transform = "scale(1)"
    tsnakeTimer = setTimeout(() => {
        tmoleimg.style.transition = "transform 350ms ease"
        tmoleimg.style.transform = "scale(0)"
        spit();
        whereAreWe = 5;
        setTimeout(() => {
            prepText(tutorialTexts[whereAreWe])
        }, 500)
    }, 6000)
}
let tarmadilloTimer = null;
function spawnTutorialArmadillo() {
    tmoletype = "armadillo"
    tmoleimg.src = "images/armadillo.png"
    tmoleimg.style.transition = "transform 350ms ease"
    tmoleimg.style.transform = "scale(1)"
    tarmadilloTimer = setTimeout(() => {
        tmoleimg.style.transform = "scale(0)"
        whereAreWe = 6;
        setTimeout(() => {
            prepText(tutorialTexts[whereAreWe])
        }, 500)
    }, 6000)
}

tmoleimg.addEventListener('mousedown', () => {
    clearTimeout(tsnakeTimer)
    cursor.querySelector("img").style.animation = ("none")
    cursor.querySelector("img").offsetHeight;
    cursor.querySelector("img").style.animation = ("swing 200ms ease-out")
    if(clickCollision(tmoleimg, cursorhb)) {
        redFilter(tmoleimg);
        tmoleHit();
        tmoleimg.style.transform = "scale(0)"
        clickfx();
    }
    if(tmoletype !== null) {
        whereAreWe++;
        prepText(tutorialTexts[whereAreWe])
    }
})

function tmoleHit(mole) {
    if(tmoletype == "mole") {
        score += 50;
        streak++;
        streakIncrease();
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "scoreBubbleUp 400ms ease"
    } else if(tmoletype == "snake") {
        score += 50;
        streak++;
        streakIncrease();
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "scoreBubbleUp 400ms ease"
    } else if (tmoletype == "groundhog") {
        score -= 50;
        if(streak > 0) {
            endStreak();
        }
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "loseScore 400ms ease"
        bonk.cloneNode(true).play();
    } else if (tmoletype == "armadillo") {
        if(streak > 0) {
            endStreak();
        }
        triggerFlashbang();
        bonk.cloneNode(true).play();
    }
    streakText.textContent = (`STREAK: ${streak}`)
    scoreText.textContent = (`SCORE: ${score}`)
}

const cantSelect = new Audio("audio/cantselect.wav")
const continueButton = document.getElementById("continuebutton")
continueButton.addEventListener('click', () => {
    if(canContinue == false) {
        cantSelect.cloneNode(true).play()
        if(typingDone == false) {
            globalDelay = 15;
        }
    }
    if(justText.includes(whereAreWe)) {
        if(whereAreWe > tutorialTexts.length - 2) {
            window.location.reload();
        } else {
            whereAreWe++;
            prepText(tutorialTexts[whereAreWe]);
        }
    } else {
        cantSelect.cloneNode(true).play()
        continueButton.animate(shakeKeyFrames, {
            duration:400, easing:"linear", composite: "add"
        })
    }
})

tutorialState = false;

tutorialButton.addEventListener('mousedown', async () => {
    startpageelements.forEach((element) => {
        element.style.animation = ("wipeleft 1s ease-in-out forwards")
        tutorialState = true;
    })
    setTimeout(() => {
        startpageelements.forEach((element) => {
            element.style.display = ("none")
        })
    }, 1000)
    await setupAudio('audio/practice.mp3');
    playLoopingMusic();
    tmoleimg.style.transform = "scale(0)"
    tutorialBox.style.display = ("flex")
    tutorialBox.style.animation = ("slideleft 1s ease-in-out forwards")
    setTimeout(() => {
        tutorialmolecontainer.style.display = ("flex")
        tutorialmolecontainer.style.animation = ("fadein 1.2s ease forwards")
        scoreWrap.style.display = "flex"
        scoreWrap.style.animation = ("fadein 1.2s ease forwards")
        cashWrap.style.display = "flex"
        cashWrap.style.animation = ("fadein 1.2s ease forwards")
        timerWrap.style.display = "flex"
        timerWrap.style.animation = ("fadein 1.2s ease forwards")
        setTimeout(() => {
            prepText(tutorialTexts[whereAreWe]);
        }, 1300)
    }, 1000)
})

const timerWrap = document.getElementById("timerwrap")


const tutorialMusic = new Audio("audio/practice.mp3")
tutorialMusic.loop = true;
tutorialMusic.volume = 0.6;

startbutton.addEventListener('mousedown', () => {
    startpageelements.forEach((element) => {
        element.style.animation = ("wipeleft 1s ease-in-out forwards")
    })
    if(!epilepsyFriendly) {
        epilepsyWrap.style.display = "flex"
        epilepsyContainer.style.animation = "slideleft 1s ease-in-out forwards"
    } else {
        setTimeout(() => {
            molecontainer.style.display = ("flex")
            molecontainer.style.animation = ("fadein 1.2s ease forwards")
            scoreWrap.style.display = "flex"
            scoreWrap.style.animation = ("fadein 1.2s ease forwards")
            cashWrap.style.display = "flex"
        cashWrap.style.animation = ("fadein 1.2s ease forwards")
            timerWrap.style.display = "flex"
            timerWrap.style.animation = ("fadein 1.2s ease forwards")
            setTimeout(() => {
                tease();
            }, 1300)
        }, 1000)
    }
    setTimeout(() => {
        startpageelements.forEach((element) => {
            element.style.display = ("none")
        })
    }, 1000)
})

epilepsyProceed.addEventListener('mousedown', () => {
    epilepsyContainer.style.animation = ("wipeleft 1s ease-in-out forwards")
    setTimeout(() => {
        epilepsyWrap.style.display = ("none")
        molecontainer.style.display = ("flex")
        molecontainer.style.animation = ("fadein 1.2s ease forwards")
        scoreWrap.style.display = "flex"
        scoreWrap.style.animation = ("fadein 1.2s ease forwards") 
        cashWrap.style.display = "flex"
        cashWrap.style.animation = ("fadein 1.2s ease forwards")
        timerWrap.style.display = "flex"
        timerWrap.style.animation = ("fadein 1.2s ease forwards")
        setTimeout(() => {
            tease();
        }, 1300)
    }, 1000)
}) 

function clickfx() {
    cursorhb.style.animation = ("none")
    cursorhb.offsetHeight;
    cursorhb.style.animation = ("debugflicker 400ms ease")
    let currentHit = Math.floor(Math.random() * hits.length)
    hits[currentHit].cloneNode(true).play();
}

document.addEventListener('mousemove', (event) => {
    cursor.style.left = (`${event.clientX}px`)
    cursor.style.top = (`${event.clientY}px`)
})

document.addEventListener('mousemove', (event) => {
    cursorhb.style.left = (`${event.clientX}px`)
    cursorhb.style.top = (`${event.clientY}px`)
})

let stun = 0;
let tap1 = new Audio("audio/dstap1.mp3")
let tap2 = new Audio("audio/dstap2.mp3")


document.addEventListener('mouseup', async () => {
    if(tutorialState) {
        tap2.cloneNode(true).play();
    }
})

document.addEventListener('mousedown', async () => {
    if(!timeUp) {
        if(stun > 0) {
            const stunSound = new Audio('audio/hover.mp3')
            stunSound.cloneNode(true).play();
            cursor.querySelector("img").style.animation = "redfilter 100ms ease";
        } else {
            cursor.querySelector("img").style.animation = ("none")
            cursor.querySelector("img").offsetHeight;
            cursor.querySelector("img").style.animation = ("swing 200ms ease-out")
            if(tutorialState) {
                tap1.cloneNode(true).play();
            } else {
                clickSound.cloneNode(true).play();
            }

            let hitMole = false;

            moles.forEach((mole) => {
                if(mole.state == "dying") return;
                if(clickCollision(mole.element.querySelector("img"), cursorhb)) {
                    if(mole.state == "bury") {
                        stun = 300;
                        scoreText.style.animation = "none"
                        scoreText.offsetHeight;
                        scoreText.style.animation = "loseScore 300ms ease"
                        cursor.querySelector("img").style.animation = "none"
                        cursor.querySelector("img").offsetHeight;
                        cursor.querySelector("img").style.animation = "redfilter 200ms ease"
                        score -= 10;
                        if(streak > 0) {
                            endStreak();
                        }
                        scoreText.textContent = (`SCORE: ${score}`)
                    } else {
                        redFilter(mole.element);
                        hitMole = true;
                        if(mole.state == "up") {
                            if(!intro) {moleHit(mole)}
                        }
                        if(teasing || !skipIntro || !skipIntroState) {
                            mole.state = "hit";
                        }
                        if(skipIntro || skipIntroState) {
                            if(!gameOn) {
                                mole.element.querySelector("img").style.transform = "scale(0)"
                            }
                        }
                        clickfx();
                    }
                }
            })

            if(hitMole == false && !intro) {
                stun = 300;
                cursor.querySelector("img").style.animation = "none";
                cursor.querySelector("img").offsetHeight;
                cursor.querySelector("img").style.animation = "redfilter 200ms ease";
                scoreText.style.animation = "none"
                scoreText.offsetHeight;
                scoreText.style.animation = "loseScore 300ms ease"
                score -= 10;
                if(streak > 0) {
                    endStreak();
                }
                scoreText.textContent = (`SCORE: ${score}`)
            }
        }
    } else {
        cantSelect.cloneNode(true).play();
        cursor.animate(shakeKeyFrames, {
            duration:400, easing:"linear", composite: "add"
        })
    }
})

function endStreak() {
    if(!timeUp) {
        streakEndSfx.cloneNode(true).play();
        streak = 0;
        streakText.textContent = (`STREAK: ${streak}`)
    }
}

const scoreText = document.getElementById("score")
const debugSound = new Audio("audio/hover.mp3")
const streakText = document.getElementById("streak")
const scoreWrap = document.getElementById("scorewrap")

const ping = new Audio("audio/ding.wav")
const healSound = new Audio("audio/heal.wav")
function moleHit(mole) {
    if(mole.state !== "up") {return;}
    clearTimeout(mole.spawningTimer)
    mole.state = "dying";
    if(mole.type == "mole") {
        clearTimeout(mole.saveStreak)
        score += 50;
        streak++;
        streakIncrease();
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "scoreBubbleUp 400ms ease"
    } else if(mole.type == "snake") {
        clearTimeout(mole.saveStreak)
        score += 50;
        streak++;
        streakIncrease();
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "scoreBubbleUp 400ms ease"
    } else if (mole.type == "groundhog") {
        score -= 50;
        if(streak > 0) {
            endStreak();
        }
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "loseScore 400ms ease"
        bonk.cloneNode(true).play();
    } else if (mole.type == "armadillo") {
        if(mole.item == "bomb") {
            if(streak > 0) {
                endStreak();
            }
            ping.cloneNode(true).play();
            bonk.cloneNode(true).play();
            triggerFlashbang();
        } else if(mole.item == "heal") {
            score += 50;
            streak++;
            healSound.cloneNode(true).play();
            streakIncrease();
            scoreText.style.animation = "none"
            scoreText.offsetHeight;
            scoreText.style.animation = "scoreBubbleUp 400ms ease"
        }
    }
    streakText.textContent = (`STREAK: ${streak}`)
    scoreText.textContent = (`SCORE: ${score}`)
    const moleImg = mole.element.querySelector("img")
    if(moleImg.style.transform !== "scale(0)" && !intro) {
        moleImg.style.transform = ("scale(0)")
        setTimeout(() => {
            mole.state = "bury";
        }, 350)
        mole.cooldown = Math.floor(Math.random() * 1500 + 350);
    }
}

function clickCollision(divA, divB) {
    const a = divA.getBoundingClientRect();
    const b = divB.getBoundingClientRect();

    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}
let streakCycles = 0;

const drumroll = new Audio("audio/drumroll.wav")

function streakIncrease() {
    let streakSound = ((streak - 1) % 8) + 1;
    let streakSfx = (new Audio(`audio/streak/${streakSound}.mp3`)).cloneNode(true)
    streakSfx.preservesPitch = false;
    /*if((streak - 1) % 8 == 0 && streak > 8) {
        streakSfx.playbackRate += Math.floor((streak - 1) / 8) * 0.2;
    }*/
    streakSfx.playbackRate = 1 + Math.floor((streak - 1) / 8) * 0.2;
    streakSfx.play();
}

function redFilter(molespawn) {
    if(!tutorialState) {
        molespawn.querySelector("img").style.animation = ("none")
        molespawn.querySelector("img").offsetHeight;
        molespawn.querySelector("img").style.animation = ("redfilter 400ms ease")
    } else {
        molespawn.style.animation = ("none")
        molespawn.offsetHeight;
        molespawn.style.animation = ("redfilter 400ms ease")
    }
}

const roundCountText = document.getElementById("roundcount")
const moleTypeText = document.getElementById("molecount")
const roundStartWrap = document.getElementById("gamestartwrap")

let enemyList = [
    "Mole",
    " Groundhog",
    " Armadillo"
]
let round = 1;
let score = 0;
let streak = 0;
scoreText.textContent = (`SCORE: ${score}`)
streakText.textContent = (`STREAK: ${streak}`)

function roundcountshow() {
    gameOn = false;
    timeLeft = 60;
    timeUp = false;
    timer.textContent = `TIME: ${timeLeft}`
    roundCountText.textContent = (`ROUND ${round}`)
    moleTypeText.textContent = enemyList;
    roundStartWrap.style.display = ("flex")
    roundStartWrap.style.animation = ("balloon-in 1.5s ease forwards")
    setTimeout(() => {
        moles.forEach((mole) => {
            if(mole.element.querySelector("img").style.transform !== "scale(0)") {
                mole.element.querySelector("img").style.transform = "scale(0)"
            }
        })
        roundStartWrap.style.animation = ("balloon-out 1.5s ease forwards")
        setTimeout(() => {
            roundStartWrap.style.display = ("none")
            moles.forEach((mole) => {
                mole.state = "bury";
            })
            document.querySelectorAll(".moleimgdiv").forEach((moleimg) => {moleimg.style.animation = ("none")})
            gameStart();
        }, 1500)
    }, 3500)
}

let cash = Number(localStorage.getItem("cash")) || 0;
let cashWrap = document.getElementById("cashwrap")
let cashText = document.getElementById("cash")
let tallyScoreMath;
let scoreToCash = false;

const orchHit = new Audio("audio/orchhit.ogg")
function finishGame() {
    orchHit.play();
    setTimeout(() => {
        tallyScore();
        drumroll.play();
    }, 2000)
}
function tallyScore() {
    tallyScoreMath = setInterval(() => {
        if(score > 0 ) {
            if (!Number.isFinite(cash)) {
                console.warn("Invalid cash value:", storedCash);
                cash = 0;
                localStorage.setItem("cash", 0);
            }
            if(score >= 10) {
                score -= 10;
                cash += 20;
            } else {
                cash += score * 2
                score = 0;
            }
            cashText.style.animation = "none"
            cashText.offsetHeight;
            cashText.textContent = `CASH: \$${cash.toLocaleString()}`
            scoreText.textContent = `SCORE: ${score}`
            cashText.style.animation = "scoreBubbleUp 15ms ease"
        }
        if(score <= 0) {
            clearInterval(tallyScoreMath)
            localStorage.setItem("cash", cash)
            scoreToCash = true;
            applause.play();
        }
    }, 10)
}
let deleteFileCountdown;
const evilbutton = document.getElementById("evilbutton")
const weirdSound = new Audio("audio/weirdsound.wav")
evilbutton.addEventListener("click", () => {
    if(evilbutton.textContent == "evil button that deletes your save file") {
        evilbutton.textContent = "you sure?"
        clearTimeout(deleteFileCountdown)
        deleteFileCountdown = setTimeout(() => {
            evilbutton.textContent = "evil button that deletes your save file"
            cantSelect.cloneNode(true).play();
        }, 5000)
    } else {
        clearTimeout(deleteFileCountdown)
        evilbutton.textContent = "evil button that deletes your save file"
        weirdSound.cloneNode(true).play();
        localStorage.setItem("cash", 0)
        cashText.textContent = `CASH: \$${cash.toLocaleString()}`
        triggerFlashbang();
    }
})

cashText.textContent = `CASH: \$${cash.toLocaleString()}`
if (!Number.isFinite(cash)) {
    console.warn("Invalid cash value:", localStorage.getItem("cash"));
    cash = 0;
    localStorage.setItem("cash", 0);
}


if(localStorage.getItem("cash") === null) {
    localStorage.setItem("cash", 0)
}

const applause = new Audio("audio/applause.wav")

let randomMole;
let gameOn = false;
let globalCooldown = 0;
let timeUp = false;
function gameStart() {
    intro = false;
    gameOn = true;
    moles.forEach((mole) => {
        mole.state = "bury";
    })
    countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = `TIME: ${timeLeft}`

        if(timeLeft <= 0) {
            clearInterval(countdown)
            timer.classList.add("flashing")
            timeUp = true;
        }
    }, 1000)
    function spawnLoop() {
        if(timeUp) {
            finishGame();
            return;
        }
        const available = moles.filter(mole => mole.state == "bury" && mole.cooldown <= 0 && globalCooldown <= 0);
        if (available.length > 0) {
            const randomMole = available[Math.floor(Math.random() * available.length)];
            //spawnMole(randomMole)
            const moleType = Math.floor(Math.random() * 23)
            if(moleType >= 0 && moleType <= 14) {
                spawnMole(randomMole)
            }
            if(moleType >= 15 && moleType <= 18) {
                spawnGroundhog(randomMole)
            }
            if(moleType >= 19 && moleType <= 20) {
                spawnArmadillo(randomMole)
            }
            if(moleType >= 21 && moleType <= 22) {
                spawnSnake(randomMole)
            }
            globalCooldown = Math.random() * 100 + 50;
        }

        const delay = Math.random() * 600 + 100;
        setTimeout(spawnLoop, delay)
    }
    spawnLoop();

}

const streakEndSfx = new Audio("audio/perfectfail.wav")

setInterval(() => {
    moles.forEach((mole) => {
        if(mole.cooldown > 0 && mole.state !== "up") {
            mole.cooldown -= 10;
        }
    })
    if(stun > 0) {
        stun -= 10;
    }
    if(globalCooldown > 0) {
        globalCooldown -= 10;
    }
}, 10)

function spawnMole(mole) {
    if(mole.state !== "bury" || mole.cooldown > 0 || globalCooldown > 0) {return;}
    clearTimeout(mole.hideTimer)
    mole.item = null;
    clearTimeout(mole.spawningTimer)
    clearTimeout(mole.saveStreak)
    mole.type = "mole";
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.src = "images/mole.png"
    moleImg.style.transition = "transform 350ms ease"
    moleImg.style.transform = "scale(1)"
    mole.spawningTimer = setTimeout(() => {
        mole.state = "up";
        moleImg.style.transform = "scale(1)"
        mole.spawningTimer = null;
    }, 350)
    mole.hideTimer = setTimeout(() => {
        if(mole.state == "up") {
            moleImg.style.transform = "scale(0)"
            setTimeout(() => {
                mole.state = "bury";
                mole.cooldown = Math.floor(Math.random() * 1500 + 350);
            }, 350)
            mole.saveStreak = setTimeout(() => {
                if(mole.state !== "dying") {
                    if(streak > 0) {
                        endStreak();
                    }
                    streakText.textContent = (`STREAK: ${streak}`)      
                }
            }, 350)
        }
    }, Math.random() * 2000 + 500)
}

function spawnGroundhog(mole) {
    if(mole.state !== "bury" || mole.cooldown > 0 || globalCooldown > 0) {return;}
    clearTimeout(mole.hideTimer)
    mole.item = null;
    clearTimeout(mole.spawningTimer)
    mole.type = "groundhog"
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.src = "images/groundhog.png"
    moleImg.style.transition = "transform 350ms ease"
    moleImg.style.transform = "scale(1)"
    mole.spawningTimer = setTimeout(() => {
        mole.state = "up";
        moleImg.style.transform = "scale(1)"
        mole.spawningTimer = null;
    }, 350)
    mole.hideTimer = setTimeout(() => {
        if(mole.state == "up") {
            moleImg.style.transform = "scale(0)"
            setTimeout(() => {
                mole.state = "bury";
                mole.cooldown = Math.floor(Math.random() * 1500 + 350);
            }, 350)
        }
    }, Math.random() * 1500 + 300)
}

function spawnArmadillo(mole) {
    if(mole.state !== "bury" || mole.cooldown > 0 || globalCooldown > 0) {return;}
    mole.item = "bomb";
    if(Math.round(Math.random() + 1) == 1) {
        mole.item = "bomb"
    } else {
        mole.item = "heal"
    }
    clearTimeout(mole.hideTimer)
    clearTimeout(mole.spawningTimer)
    mole.type = "armadillo"
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.src = "images/armadillo.png"
    moleImg.style.transition = "transform 350ms ease"
    moleImg.style.transform = "scale(1)"
    mole.spawningTimer = setTimeout(() => {
        mole.state = "up";
        moleImg.style.transform = "scale(1)"
        mole.spawningTimer = null;
    }, 350)
    mole.hideTimer = setTimeout(() => {
        if(mole.state == "up") {
            moleImg.style.transform = "scale(0)"
            setTimeout(() => {
                mole.state = "bury";
                mole.cooldown = Math.floor(Math.random() * 1500 + 350);
            }, 350)
        }
    }, Math.random() * 1000 + 400)
}

function spawnSnake(mole) {
    if(mole.state !== "bury" || mole.cooldown > 0 || globalCooldown > 0) {return;}
    clearTimeout(mole.hideTimer)
    mole.item = null;
    clearTimeout(mole.spawningTimer)
    clearTimeout(mole.saveStreak)
    mole.type = "snake";
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.src = "images/snake.png"
    moleImg.style.transition = "transform 350ms ease"
    moleImg.style.transform = "scale(1)"
    mole.spawningTimer = setTimeout(() => {
        mole.state = "up";
        moleImg.style.transform = "scale(1)"
        mole.spawningTimer = null;
    }, 350)
    mole.hideTimer = setTimeout(() => {
        if(mole.state == "up") {
            moleImg.style.transform = "scale(0)"
            setTimeout(() => {
                mole.state = "bury";
                mole.cooldown = Math.floor(Math.random() * 1500 + 350);
            }, 350)
            mole.saveStreak = setTimeout(() => {
                if(mole.state !== "dying") {
                    if(streak > 0) {
                        endStreak();
                    }
                    streakText.textContent = (`STREAK: ${streak}`)
                    if(!timeUp) {
                        spit(mole);
                    }
                }
            }, 350)
        }
    }, Math.random() * 2500 + 800)
}
redScreenTimeout = null;

const shakeKeyFrames = [
    {transform: "translate(0, 0)"},
    {transform: "translate(-5px, 4px)", offset:0.1},
    {transform: "translate(6px, -3.33px)", offset:0.2},
    {transform: "translate(-4px, -6px)", offset:0.3},
    {transform: "translate(5.33px, 3px)", offset:0.4},
    {transform: "translate(-6px, 2px)", offset:0.5},
    {transform: "translate(4px, -5.33px)", offset:0.6},
    {transform: "translate(-2.33px, 6px)", offset:0.7},
    {transform: "translate(5px, -2.33px)", offset:0.8},
    {transform: "translate(-4px, 3.33px)", offset:0.9},
    {transform: "translate(0, 0)", offset:1},
]
const hurtSound = new Audio("audio/hurt.wav")

function spit(mole) {
    clearTimeout(redScreenTimeout)
    shading.style.backgroundColor = "red"
    shading.style.display = "inline"
    shading.style.animation = "none"
    shading.offsetHeight;
    hurtSound.cloneNode(true).play();
    shading.style.animation = "shaderFade 500ms ease forwards"
    shakingElements = Array.from(document.body.querySelectorAll("*"));
    shakingElements.forEach((element) => {
        element.animate(shakeKeyFrames, {
            duration:400, easing:"linear", composite: "add"
        })
    })
    redScreenTimeout = setTimeout(() => {
        shading.style.backgroundColor = "black"
        shading.style.display = "none"
    }, 500)
}

let timeLeft = null;
let countdown;
const timer = document.getElementById("timer")
let shopOpen = false;
const shopButton = document.getElementById("shop")
const opendoor = new Audio("audio/opendoor.wav")
shopButton.addEventListener("mousedown", () => {
    if(!shopOpen) {
        shopOpen = true;
        shading.style.display = "flex"
        shading.style.animation = "epicflash 2.8s ease forwards"
        setTimeout(() => {
            startpageelements.forEach((element) => {
                element.style.display = "none"
            })
            shopElements.forEach((element) => {
                element.style.display = "flex"
            })
            streakText.style.display = "none"
        }, 1000)
        opendoor.cloneNode(true).play();
        shading.addEventListener('animationend', async () => {
            shading.style.display = "none"
            await setupAudio('audio/shop.mp3');
            playLoopingMusic();
        }, {once:true})
    }
})

const shopElements = [
    document.getElementById("shopkeeper")
]

