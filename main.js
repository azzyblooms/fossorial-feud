let yourItems = [
    {item: "antistun", owned: false, q:0},
    {item: "heart4", owned:false, q:0},
    {item: "combosave", owned:false, q:0},
    {item: "heart5", owned:false, q:0},
    {item: "anticooldown", owned:false, q:0},
    {item: "snakeflute", owned:false, q:0},
    {item: "hogsave", owned:false, q:0},
    {item: "gmoleexp", owned:false, q:0},
    {item: "rock", owned:false, q:0},
    {item: "rock2", owned:false, q:0},
    {item: "fruit", owned:false, q:0},
    {item: "donate", owned:false, q:0}
]
const savedItems = localStorage.getItem("yourItems")
if(savedItems !== null) {
    yourItems = JSON.parse(savedItems)
}
function saveItems() {
    localStorage.setItem("yourItems", JSON.stringify(yourItems))
}
saveItems();

//web audio api stuff
let audioCtx;
let audioBuffer;
let sourceNode;

async function setupAudio(audioPath) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gainNode.connect(audioCtx.destination);
    }

    const response = await fetch(audioPath);
    const arrayBuffer = await response.arrayBuffer();
    audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
}

function playLoopingMusic() {
    stopLoopingMusic();
    sourceNode = audioCtx.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;

    sourceNode.connect(gainNode);
    sourceNode.start();
}


function stopLoopingMusic() {
    if (sourceNode) {
        sourceNode.stop();
        sourceNode.disconnect();
        sourceNode = null;
    }
}

const hearts = document.querySelectorAll(".heart")
let healthPoints = 3;


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
    } else {
        settingsOpen = false;
        settingsMenu.style.display = "none";
    }
})

let molesHit = 0;
let groundhogsHit = 0;
let goldenMolesHit = 0;
let snakesHit = 0;
let armadillosHit = 0;
let totalHits = 0;
let streaksBroken = 0;
let maxStreak = 0;

const totalHitsText = document.getElementById("totalhits")
const molesHitText = document.getElementById("molehits")
const goldenMolesHitText = document.getElementById("goldenmolehits")
const snakesHitText = document.getElementById("snakehits")
const armadillosHitText = document.getElementById("armadillohits")
const groundhogsHitText = document.getElementById("groundhoghits")
const maxStreakText = document.getElementById("maxstreak")
const streaksBrokenText = document.getElementById("streaksbroken")
const finalScore = document.getElementById("finalscore")
const gmhnum = document.getElementById("gmh")





const tone = new Audio("audio/tone.wav")
const lockin = new Audio("audio/lockin.wav")
function displayStatistics() {
    let th = 0;
    let mh = 0;
    let gmh = 0;
    let gh = 0;
    let sh = 0;
    let ah = 0;
    let ms = 0;
    let sb = 0;
    let fs = 0;
    function playTone(abcde) {
        const sound = tone.cloneNode(true);
        sound.preservesPitch = false;
        sound.volume = 0.3;
        let rate = 1 + (abcde * 0.01);
        if(rate > 12) {
            rate = 12;
        }
        sound.playbackRate = rate;
        sound.play();
    }
    let waiting = false;
    const calcMolesHit = setInterval(() => {
        if(waiting) {
            return;
        }
        if(totalHitsText.textContent !== `TOTAL HITS: ${totalHits}`) {
            th++;
            totalHitsText.textContent = `TOTAL HITS: ${th}`
            playTone(th);
            if(th == totalHits) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(molesHitText.textContent !== `MOLES HIT: ${molesHit}`) {
            mh++;
            molesHitText.textContent = `MOLES HIT: ${mh}`
            playTone(mh);
            if(mh == molesHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(gmhnum.textContent !== `${goldenMolesHit}`) {
            gmh++;
            gmhnum.textContent = `${gmh}`
            playTone(gmh);
            if(gmh == goldenMolesHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(snakesHitText.textContent !== `SNAKES HIT: ${snakesHit}`) {
            sh++;
            playTone(sh);
            snakesHitText.textContent = `SNAKES HIT: ${sh}`
            if(sh == snakesHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(groundhogsHitText.textContent !== `GROUNDHOGS HIT: ${groundhogsHit}`) {
            gh++;
            playTone(gh);
            groundhogsHitText.textContent = `GROUNDHOGS HIT: ${gh}`
            if(gh == groundhogsHit) {
                waiting = true;
                lockin.cloneNode(true).play();
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(armadillosHitText.textContent !== `ARMADILLOS HIT: ${armadillosHit}`) {
            ah++;
            playTone(ah);
            armadillosHitText.textContent = `ARMADILLOS HIT: ${ah}`
            if(ah == armadillosHit) {
                waiting = true;
                lockin.cloneNode(true).play();
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(maxStreakText.textContent !== `HIGHEST STREAK: ${maxStreak}`) {
            ms++;
            playTone(ms);
            maxStreakText.textContent = `HIGHEST STREAK: ${ms}`
            if(ms == maxStreak) {
                waiting = true;
                lockin.cloneNode(true).play();
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(streaksBrokenText.textContent !== `STREAKS BROKEN: ${streaksBroken}`) {
            sb++;
            playTone(sb);
            streaksBrokenText.textContent = `STREAKS BROKEN: ${sb}`
            if(sb == streaksBroken) {
                waiting = true;
                lockin.cloneNode(true).play();
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(finalScore.textContent !== `FINAL SCORE: ${score}`) {
            const amount = score / 500;
            fs += amount;
            const progress = fs / score
            playTone(progress * 300);
            finalScore.textContent = `FINAL SCORE: ${Math.floor(fs)}`
            if(fs >= score) {
                fs = score;
                waiting = true;
                finalScore.textContent = `FINAL SCORE: ${fs}`
                lockin.cloneNode(true).play();
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else {
            applause.play();
            clearInterval(calcMolesHit)
        }
    }, 20)
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
    document.getElementById("achievements"),
    document.getElementById("tutorial"),
    document.getElementById("evilbutton"),
    document.getElementById("shop"),
    document.getElementById("endlessbutton")
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
    if(/[a-zA-z0-9]/.test(char)) {
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
        spit(mole);
        whereAreWe = 5;
        setTimeout(() => {
            prepText(tutorialTexts[whereAreWe])
        }, 500)
    }, 6000)
}
let tarmadilloTimer = null;
function spawnTutorialArmadillo() {
    tmoletype = "armadillo"
    tmoleimg.src = "images/armedadillo.png"
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
            ATutorialComplete = true;
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
const hpWrap = document.getElementById("hpwrap")
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

endlessbutton.addEventListener('mousedown', () => {
    startpageelements.forEach((element) => {
        element.style.animation = ("wipeleft 1s ease-in-out forwards")
    })
    setTimeout(() => {
        molecontainer.style.display = ("flex")
        molecontainer.style.animation = ("fadein 1.2s ease forwards")
        scoreWrap.style.display = "flex"
        scoreWrap.style.animation = ("fadein 1.2s ease forwards")
        hpWrap.style.display = "flex"
        hpWrap.style.animation = ("fadein 1.2s ease forwards")
        if(yourItems[3].owned == false) {
            hearts[4].style.display = "none"
        } else {hearts[4].style.display = "inline"}
        if(yourItems[1].owned == false) {
            hearts[3].style.display = "none"
        } else {hearts[3].style.display = "inline"}
        updateHealth();
        cashWrap.style.display = "flex"
        cashWrap.style.animation = ("fadein 1.2s ease forwards")
        timerWrap.style.display = "flex"
        timerWrap.style.animation = ("fadein 1.2s ease forwards")
        setTimeout(() => {
            moles.forEach((mole) => {
                mole.element.querySelector("img").style.transform = "scale(1)"
                mole.element.querySelector("img").style.opacity = "1"
            })
             endlessPrep();
        }, 1300)
    }, 1000)
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
const streakSaved = new Audio("audio/streaksaved.wav")
const congrats = new Audio("audio/congrats.wav")
function endStreak() {
    if(!timeUp) {
        if(yourItems[2].owned == true && streaksBroken == 0) {
            streaksBroken++;
            streakSaved.cloneNode(true).play();
            return;
        } else {
            streakEndSfx.cloneNode(true).play();
            streak = 0;
            AStreakBreaks++;
            streaksBroken++;
            goldenMoleChance = 0;
            streakText.textContent = (`STREAK: ${streak}`)
        }
    }
}

const scoreText = document.getElementById("score")
const debugSound = new Audio("audio/hover.mp3")
const streakText = document.getElementById("streak")
const scoreWrap = document.getElementById("scorewrap")
let flashOpac;
function triggerFlashbang() {
    clearTimeout(flashOpac)
    flashOpac = setTimeout(() => {
        flashbang.style.opacity = 0.99;
    }, 999)
    flashbang.style.animation = ("none")
    flashbang.style.display = "none"
    flashbang.offsetHeight;
    if(epilepsyFriendly == true) {
        flashbang.style.backgroundColor = "black"
    } else {
        flashbang.style.backgroundColor = "white"
    }
    flashbang.style.opacity = 1;
    flashbang.style.animation = "flashbang 2s ease forwards"
    flashbang.style.display = "inline";
    
}




const ping = new Audio("audio/ding.wav")
const healSound = new Audio("audio/heal.wav")
function moleHit(mole) {
    if(mole.state !== "up") {return;}
    if(mole.state == "dying") {ASameEnemyHits++;}
    if(mole.state !== "dying") {checkQuickDraw();}
    if(mole.spawningTimer <= 300) {AIntentional = true}
    clearTimeout(mole.spawningTimer)
    if(flashbang.style.display == "inline" && flashbang.style.opacity == "1") {AHitWhileFlashbang = true;}
    mole.state = "dying";
    if(mole.type == "mole") {
        if(mole.saveStreak >= 100) {AClutched = true}
        clearTimeout(mole.saveStreak)
        score += 50;
        molesHit++;
        AMoleHits++;
        ASerendipity = 0;
        streak++;
        streakIncrease();
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "scoreBubbleUp 400ms ease"
        if(!ASmorgasbord.includes("mole")) {
            ASmorgasbord.push("mole")
        } else {
            if(ASmorgasbord.length !== 5) {
                ASmorgasbord = [];
            }
        }
    } else if(mole.type == "goldmole") {
        if(mole.saveStreak >= 100) {AClutched = true}
        clearTimeout(mole.saveStreak)
        score += 750;
        AGoldenMoles++;
        ASerendipity++;
        if(!ASmorgasbord.includes("goldmole")) {
            ASmorgasbord.push("goldmole")
        } else {
            if(ASmorgasbord.length !== 5) {
                ASmorgasbord = [];
            }
        }
        goldenMolesHit++;
        shinyHitSound.cloneNode(true).play();
        streak++;
        streakIncrease();
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "scoreBubbleUp 400ms ease"
    } else if(mole.type == "snake") {
        if(mole.saveStreak >= 100) {AClutched = true}
        clearTimeout(mole.saveStreak)
        score += 100;
        snakesHit++;
        streak++;
        if(!ASmorgasbord.includes("snake")) {
            ASmorgasbord.push("snake")
        } else {
            if(ASmorgasbord.length !== 5) {
                ASmorgasbord = [];
            }
        }
        ASerendipity = 0;
        ASnakes++;
        streakIncrease();
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "scoreBubbleUp 400ms ease"
    } else if (mole.type == "groundhog") {
        score -= 50;
        AGroundhogs++;
        groundhogsHit++;
        ASerendipity = 0;
        if(!ASmorgasbord.includes("groundhog")) {
            ASmorgasbord.push("groundhog")
        } else {
            if(ASmorgasbord.length !== 5) {
                ASmorgasbord = [];
            }
        }
        if(streak > 0) {
            endStreak();
        }
        if(endless && !timeUp) {
            spit(mole)
        }
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        scoreText.style.animation = "loseScore 400ms ease"
        bonk.cloneNode(true).play();
    } else if (mole.type == "armadillo") {
        armadillosHit++;
        AArmadillos++;
        ASerendipity = 0;
        if(!ASmorgasbord.includes("armadillo")) {
            ASmorgasbord.push("armadillo")
        } else {
            if(ASmorgasbord.length !== 5) {
                ASmorgasbord = [];
            }
        }
        if(mole.item == "bomb") {
            if(streak > 0) {
                endStreak();
            }
            AFlashbang = true;
            if(endless && !timeUp) {
                spit(mole)
            }
            ping.cloneNode(true).play();
            bonk.cloneNode(true).play();
            triggerFlashbang();
        } else if(mole.item == "heal") {
            score += 50;
            AMedic = true;
            if(healthPoints < 5) {
                if(healthPoints == 4 && yourItems[3].owned == true) {
                    healthPoints = 5;
                } else if(healthPoints == 3 && yourItems[1].owned == true) {
                    healthPoints = 4;
                } else {
                    healthPoints++;
                }
            }
            updateHealth();
            streak++;
            healSound.cloneNode(true).play();
            streakIncrease();
            scoreText.style.animation = "none"
            scoreText.offsetHeight;
            scoreText.style.animation = "scoreBubbleUp 400ms ease"
        } else if(mole.item == "cash") {
            score += 100;
            cash += 1000;
            ADolladillo = true;
            streak++;
            lockin.cloneNode(true).play();
            streakIncrease();
            scoreText.style.animation = "none"
            scoreText.offsetHeight;
            scoreText.style.animation = "scoreBubbleUp 400ms ease"
            cashText.style.animation = "none"
            cashText.offsetHeight;
            cashText.textContent = `CASH: \$${cash.toLocaleString()}`
            cashText.style.animation = "scoreBubbleUp 400ms ease"
        } else {
            score += 50;
            streak++;
            streakIncrease();
            scoreText.style.animation = "none"
            scoreText.offsetHeight;
            scoreText.style.animation = "scoreBubbleUp 400ms ease"
        }
    }
    totalHits++;
    ATotalHits++;
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
    let rate = 1 + Math.floor((streak - 1) / 8) * 0.2;
    if(rate > 12) {
        rate = 12
    }
    streakSfx.playbackRate = rate;
    streakSfx.play();
    if(streak > maxStreak) {
        maxStreak = streak;
    }
    if(streak > 8) {
        if(yourItems[7].owned == true) {
            goldenMoleChance = Math.pow((streak / 12), 1.25) / 100;
        } else {
            goldenMoleChance = (streak / 12) / 100;
        }
        console.log(goldenMoleChance)
    }
}



const shinySound = new Audio("audio/shiny.mp3")
const shinyHitSound = new Audio("audio/hits/crackhit.mp3")
goldenMoleChance = 0;

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
updateHealth();
function roundcountshow() {
    gameOn = false;
    endless = false;
    timeLeft = 120;
    if(yourItems[3].owned == true) {
        healthPoints = 5;
    } else if(yourItems[1].owned == true) {
        healthPoints = 4;
    } else {
        healthPoints = 3;
    }
    molesHit = 0;
    groundhogsHit = 0;
    goldenMolesHit = 0;
    snakesHit = 0;
    armadillosHit = 0;
    totalHits = 0;
    maxStreak = 0;
    streaksBroken = 0;
    updateHealth();
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

function endlessPrep() {
    gameOn = false;
    endless = true;
    timeLeft = 0;
    if(yourItems[3].owned == true) {
        healthPoints = 5;
    } else if(yourItems[1].owned == true) {
        healthPoints = 4;
    } else {
        healthPoints = 3;
    }
    molesHit = 0;
    groundhogsHit = 0;
    goldenMolesHit = 0;
    snakesHit = 0;
    armadillosHit = 0;
    totalHits = 0;
    maxStreak = 0;
    streaksBroken = 0;
    updateHealth();
    timeUp = false;
    moleTypeText.textContent = enemyList;
    setTimeout(() => {
        moles.forEach((mole) => {
                mole.element.querySelector("img").style.transform = "scale(0)"
        })
        setTimeout(() => {
            moles.forEach((mole) => {
                mole.state = "bury";
            })
            document.querySelectorAll(".moleimgdiv").forEach((moleimg) => {moleimg.style.animation = ("none")})
            endlessStart();
        }, 900)
    }, 2000)
}

let cash = Number(localStorage.getItem("cash")) || 0;
let cashWrap = document.getElementById("cashwrap")
let cashText = document.getElementById("cash")
let tallyScoreMath;
let scoreToCash = false;

const orchHit = new Audio("audio/orchhit.ogg")
function finishGame() {
    if(endless) {
        AEndlessRoundsPlayed++;
        if(difficulty == "easy") {AEasyFarmed}
    } else {
        AClassicRoundsPlayed++;
        if(streaksBroken == 0 && score > 0) {AFlawless = true}
    }
    orchHit.play();
    setTimeout(() => {
        tallyScore();
        drumroll.play();
    }, 2000)
}
let currentDialogue = null;
const statisticsBox = document.getElementById("statisticsbox")

function tallyScore() {
    let loops = 0;
    let displayedScore = score;
    function playTone(abcde) {
        const sound = tone.cloneNode(true);
        sound.preservesPitch = false;
        sound.volume = 0.3;
        let rate = 1 + (abcde * 0.005);
        if(rate > 12) {
            rate = 12;
        }
        sound.playbackRate = rate;
        sound.play();
    }
    const amount = score / 700
    tallyScoreMath = setInterval(() => {
        if(displayedScore > 0 ) {
            if (!Number.isFinite(cash)) {
                console.warn("Invalid cash value:", storedCash);
                cash = 0;
                localStorage.setItem("cash", 0);
            }
            if(displayedScore >= amount) {
                displayedScore -= amount;
                loops++;
                cash += 2 * amount;
            } else {
                cash += displayedScore * 2
                loops++;
                displayedScore = 0;
            }
            cashText.style.animation = "none"
            cashText.offsetHeight;
            playTone(loops)
            cashText.textContent = `CASH: \$${Math.floor(cash).toLocaleString()}`
            scoreText.textContent = `SCORE: ${Math.floor(displayedScore)}`
            cashText.style.animation = "scoreBubbleUp 400ms ease"
        }
        if(displayedScore <= 0) {
            clearInterval(tallyScoreMath)
            localStorage.setItem("cash", cash)
            displayedScore = 0;
            scoreToCash = true;
            applause.play();
            setTimeout(() => {
                molecontainer.style.animation = ("fadeout 1.2s ease forwards")
                molecontainer.addEventListener('animationend', () => {
                    molecontainer.style.display = ("none")
                    statisticsBox.style.display = ("flex")
                    statisticsBox.style.animation = ("fadein 1.2s ease forwards")
                    setTimeout(() => {
                        displayStatistics();
                    }, 1500)
                }, {once:true})
            }, 2500)
        }
    }, 8)
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

let endless = false;

function endlessStart() {
    intro = false;
    gameOn = true;
    endless = true;
    timeUp = false;
    moles.forEach((mole) => {
        mole.state = "bury";
    })
    countdown = setInterval(() => {
        timeLeft++;
        timer.textContent = `TIME: ${timeLeft}`

        if(gameOn == false) {
            clearInterval(countdown)
            timer.classList.add("flashing")
        }
    }, 1000)
    function spawnLoop() {
        if(hp <= 0 || gameOn == false || timeUp == true) {
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
    if(Math.random() > goldenMoleChance) {
        moleImg.src = "images/mole.png"
        mole.type = "mole"
    } else {
        moleImg.src = "images/goldmole.png"
        shinySound.cloneNode(true).play();
        mole.type = "goldmole"
    }
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
                    if(mole.type == "goldmole") {AGoldenMiss = true;}
                    if(endless && !timeUp) {
                        spit(mole)
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
    clearTimeout(mole.hideTimer)
    clearTimeout(mole.spawningTimer)
    mole.type = "armadillo"
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.src = "images/armadillo.png"
    moleImg.style.transition = "transform 350ms ease"
    moleImg.style.transform = "scale(1)"
    let determineItem = Math.floor(Math.random() * 8 );
    if(determineItem < 4) {
        mole.item = "bomb"
        moleImg.src = "images/armedadillo.png"
    } else if (determineItem > 6) {
        if(endless) {
            mole.item = "heal"
            moleImg.src = "images/immahealyou.png"
        } else {
            mole.item = "null"
            moleImg.src = "images/armadillo.png"
        }
    } else if(determineItem == 5) {
        mole.item = "null"
        moleImg.src = "images/armadillo.png"
    } else if(determineItem == 6) {
        mole.item = "cash"
        moleImg.src = "images/dolladillo.png"
        /*if(stimulateEconomy) {
            mole.item = "cash"
            moleImg.src = "images/dolladillo.png"
        } else {
            mole.item = "null"
            moleImg.src = "images/armadillo.png"
        }*/
    }
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
    }, Math.random() * 2500 + 500)
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
    
    if(streaksBroken == 1 && yourItems[2].owned == true) {
        return;      
    } else {
        clearTimeout(redScreenTimeout)
        shading.style.backgroundColor = "red"
        shading.style.display = "inline"
        shading.style.animation = "none"
        shading.offsetHeight;
        if(mole.type == "snake") {
            ASpit++;
        }
        if(endless) {
            hurtPlayer();
        } else {
            timeLeft -= 15;
            ping.cloneNode(true).play();
        }
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
}

let timeLeft = null;
let countdown;
const timer = document.getElementById("timer")
let shopOpen = false;
const shopButton = document.getElementById("shop")
const opendoor = new Audio("audio/opendoor.wav")
const background = document.getElementById("background")
const shopBackground = document.getElementById("shopbackground")
const shopCash = document.getElementById("yourcash")
shopButton.addEventListener("mousedown", () => {
    if(!shopOpen) {
        shopOpen = true;
        shopCash.textContent = `\$${cash.toLocaleString()}`
        shading.style.display = "flex"
        shading.style.animation = "epicflash 2.8s ease forwards"
        setTimeout(() => {
            startpageelements.forEach((element) => {
                element.style.display = "none"
            })
            background.style.display = "none"
            shopBackground.style.display = "inline"
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
            shopPrepText(shopDialogue[Math.floor(Math.random() * 4)])
        }, {once:true})
    }
})

const shopElements = [
    document.getElementById("shopkeeper"),
    document.getElementById("shopinterface")
]
const shopTextBox = document.getElementById("shoptextgoeshere")

function shopPrepText(text) {
    current = 0;
    globalDelay = 35;
    shopTextBox.innerHTML = ""
    for(const char of text) {
      const span = document.createElement("span")
      span.textContent = char;
      shopTextBox.appendChild(span)
    }
    shopType();
}

function shopType() {
    typingDone = false;
    const chars = shopTextBox.children;
    if(current >= chars.length) {
        typingDone = true;
        return;
    }
    const char = chars[current].textContent;
    chars[current].classList.add("visible")
    current++;
    if(/[a-zA-z0-9]/.test(char)) {
        const speakSound = (new Audio(`audio/speech/${(char.toUpperCase())}.wav`)).cloneNode(true);
        speakSound.playbackRate = Math.random() * 0.2 + 0.9;
        speakSound.preservesPitch = false;
        speakSound.volume = 0.7;
        speakSound.play();
    }
    let delay = 35;
    if (char === ",") delay = 180;
    if (punctuation.includes(char)) delay = 300;
    
    setTimeout(shopType, delay)
}
let price = 0;
const shopItems = [
    document.getElementById("shopitem1"),
    document.getElementById("shopitem2"),
    document.getElementById("shopitem3"),
    document.getElementById("shopitem4"),
    document.getElementById("shopitem5"),
    document.getElementById("shopitem6")
]
const topics = [
    document.getElementById("topic1"),
    document.getElementById("topic2"),
    document.getElementById("topic3"),
    document.getElementById("topic4"),
    document.getElementById("topic5"),
    document.getElementById("topic6")
]

const shopDialogue = [
    //greetings
    "* Hello! Welcome to my shop!",
    "* Hey, aren't you a sight for sore eyes!",
    "* Back for more?",
    "* My favourite customer! What'll it be for ya?",
    //leaving
    "* See ya.",
    "* Same time tomorrow?",
    "* Come back when you're a little more, mmmmmmmmmmmmmmmmmmmmmmmmmmm, richer!",

    //open shop
    "* Yeah! Buy my stuff!",
    "* Oh, hell yeah!",
    "* Anything catch yer eye?",
    //talk
    "* You wanna talk? Yeah, we can talk. Just buy something afterwards.",
    "* 'Sup?",
    //stimulate the economy 12
    "* Well, I'm the only one around here who runs a shop, I suppose it wouldn't hurt to share the wealth.",
    "* I heard those armadillos like to pick up cash. Check them out now. They might be carrying some fat stacks.",
    //who are you 14
    "* I'm the Meerkat. I collect cash.",
    "* I also collect wares, in case you were interested in buying anything today.",
    "* And for the record, I don't like the moles either. I'm just here 'cause the money's good.",
    //golden moles 17
    "* Golden moles are elusive creatures. I've only ever seen one, and he ran out of my store before I could tie him up.",
    "* Legend has it that they're attracted to the most skilled of mole hunters. For some reason.",
    "* Ain't it a little suicidal that they only show up for the people who want them dead the most?",
    "* Anywho, if ya like golden moles, I got a little trinket in my shop for ya, if ya want.",
    //the moles 21
    "* It's been about two years, give or take. Two years since I moved in.",
    "* The moles got here last month. Heh, at least life ain't so mundane anymore. But still...",
    "* To be honest, I wanted to move out. Everything seemed to get worse. Couldn't even last a day without one digging into my shop.",
    "* But then, hunters showed up. Hunters like you. That helped a lot.",
    "* Now, the moles tend to keep to their burrows. Things flared up once they recruited the snakes and armadillos, but not much has come out of it.",
    

    //SHOP ITEMS
    "* Heh, thanks.",
    "* Pleasure doing business with ya.",
    //stun remover (28)
    "* Check out my Stun Remover. With this guy, when ya miss a mole, sure, you'll still lose yer streak, but ya won't be stunned! All yours for $30,000!",
    //heart 4
    "* Ya need a heart? I can tell from those soulless eyes. Increase yer maximum health! Only $100,000!",
    //combo insurance
    "* Yer first combo break of the round? Nope, didn't see it. Insure yer streaks for $150,000!",
    //heart 5
    "* First one wasn't enough? God, you're greedy. Give me more money. $500,000. Take it or leave it.",
    //burrow heater
    "* Don'tcha just hate cooldowns? This'll shrink 'em. $50,000. Good luck.",
    // snake charmer's flute
    "* Attracts snakes. Use at yer own risk. Masterfully crafted for $200,000.",
    //groundhog insurance
    "* This wallet lining makes it so groundhogs only steal 49 points. Sick, right? It's gold plated, so it's pricey at $300,000. Worth it!!!",
    //exponential gold
    "* This little trinket makes golden moles become exponentially more common! Lower streak means WAY lower, higher streak means WAY higher. They're golden moles, so it's $250,000.",
    // rock 1 (useless)
    "* It's a rock. $1,000.",
    // rock 2 (useless)
    "* It's also a rock. $2,000.",
    // fruit (useless)
    "* Fruit From Colombia. $5,000 for you.",
    // ridiculously expensive thing (useless)
    "* Spare change? Donate to the poor? I'm an orphan!!! Please... $1,000,000...",
    // can't afford (40)
    "* Sorry, Link, I can't give credit!",
    `* That doesn't look like \$${price.toLocaleString()}...`,
    "* Ya think I'm stupid or something?",
    `* You only got \$${cash.toLocaleString()}.`,
    "* Don't play games with me.",
    //can't buy? (45)
    "* Ya don't need any more.",
    "* That was my last one.",
    "* Sorry, all out.",
    //more than one (48)
    "* Happy customer, eh?.",
    "* Yes... Good...",
    "* Stocking up?",

    //moretalk (51)
    "* Achievements? I don't know what you're talking about. You some kind of completionist?",
    "* ...But, a little birdie told me there's an achievement for playing easy-mode endless 5 times.",
    "* Something about \"awful game design\" and \"an easy way to farm cash.\"",
    "* I don't know why I told you that. Maybe I should get better at keeping my secrets...",
    //55
    "* The medic armadillos are my favourite. Kind souls. They even helped out my son when he was sick.",
    "* Some shame the moles recuited them. I think we could've been great friends.",
    "* Now they make them carry bombs and stuff. Little cruel if you ask me, but what do I know.",
    //58
    "* Shop ain't open, idiot!",
    "* Buy what?",
    //60
    "* I never said anything.",
    "* huh ?",
    "* Continue what?",
    "* Nothin' else to say.",
    "* I'm done.",
    //hit him (65)
    "* Fuck you.",
    "* The hell was that for?",
    "* Prices have been raised 500%.",
    "* Is that all you got?",
    "* Heh, my mom hits me harder than you!"
]
const talkButton = document.getElementById("talkbutton")
const buyButton = document.getElementById("buybutton")
const leaveButton = document.getElementById("leavebutton")
let leavingShop = false;

leaveButton.addEventListener('mousedown', () => {
    if(!leavingShop) {
        shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 4)])
        setTimeout(() => {
            shopOpen = false;
            leavingShop = true;
            shading.style.display = "flex"
            shading.style.animation = "epicflash 2.8s ease forwards"
            opendoor.cloneNode(true).play();
            setTimeout(() => {
                shopElements.forEach((element) => {
                    element.style.display = "none"
                })
                background.style.display = "inline"
                stopLoopingMusic();
                leavingShop = false;
                shopBackground.style.display = "none"
                startpageelements.forEach((element) => {
                    element.style.display = "flex"
                })
                streakText.style.display = "flex"
            }, 1000)
            shading.addEventListener('animationend', async () => {
                shading.style.display = "none"
            }, {once:true})
        }, 3000)
    }
})
topics[0].addEventListener('mousedown', () => {
    shopPrepText(shopDialogue[14])
    if(!AOptionsTalked.includes("1")) {
        AOptionsTalked.push("1")
    }
    currentDialogue = 1;
    dialogueStep = 1;
})
topics[1].addEventListener('mousedown', () => {
    shopPrepText(shopDialogue[12])
    economyStimulated = true;
    if(!AOptionsTalked.includes("2")) {
        AOptionsTalked.push("2")
    }
    currentDialogue = 2;
    dialogueStep = 1;
})
topics[2].addEventListener('mousedown', () => {
    shopPrepText(shopDialogue[17])
    if(!AOptionsTalked.includes("3")) {
        AOptionsTalked.push("3")
    }
    currentDialogue = 3;
    dialogueStep = 1;
})
topics[3].addEventListener('mousedown', () => {
    shopPrepText(shopDialogue[21])
    if(!AOptionsTalked.includes("4")) {
        AOptionsTalked.push("4")
    }
    currentDialogue = 4;
    dialogueStep = 1;
})
topics[4].addEventListener('mousedown', () => {
    shopPrepText(shopDialogue[51])
    if(!AOptionsTalked.includes("5")) {
        AOptionsTalked.push("5")
    }
    currentDialogue = 5;
    dialogueStep = 1;
})
topics[5].addEventListener('mousedown', () => {
    shopPrepText(shopDialogue[55])
    if(!AOptionsTalked.includes("6")) {
        AOptionsTalked.push("6")
    }
    currentDialogue = 6;
    dialogueStep = 1;
})
currentDialogue = null;
const talkContinueButton = document.getElementById("closepurchase")
talkContinueButton.addEventListener('mousedown', () => {
    if(currentDialogue == null) {
        shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 60)])
        cantSelect.cloneNode(true).play();
    }
    if(currentDialogue == 1) {
        if(dialogueStep == 1) {
            shopPrepText(shopDialogue[15])
        }
        if(dialogueStep == 2) {
            shopPrepText(shopDialogue[16])
        }
        if(dialogueStep > 2) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 62)])
        }
        dialogueStep++;
    } 
    if(currentDialogue == 2) {
        if(dialogueStep == 1) {
            shopPrepText(shopDialogue[13])
        }
        if(dialogueStep > 1) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 62)])
        }
        dialogueStep++;
    }
    if(currentDialogue == 3) {
        if(dialogueStep == 1) {
            shopPrepText(shopDialogue[18])
        }
        if(dialogueStep == 2) {
            shopPrepText(shopDialogue[19])
        }
        if(dialogueStep == 3) {
            shopPrepText(shopDialogue[20])
        }
        if(dialogueStep > 3) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 62)])
        }
        dialogueStep++;
    }
    if(currentDialogue == 4) {
        if(dialogueStep == 1) {
            shopPrepText(shopDialogue[22])
        }
        if(dialogueStep == 2) {
            shopPrepText(shopDialogue[23])
        }
        if(dialogueStep == 3) {
            shopPrepText(shopDialogue[24])
        }
        if(dialogueStep == 4) {
            shopPrepText(shopDialogue[25])
        }
        if(dialogueStep > 4) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 62)])
        }
        dialogueStep++;
    }
    if(currentDialogue == 5) {
        if(dialogueStep == 1) {
            shopPrepText(shopDialogue[52])
        }
        if(dialogueStep == 2) {
            shopPrepText(shopDialogue[53])
        }
        if(dialogueStep == 3) {
            shopPrepText(shopDialogue[54])
        }
        if(dialogueStep > 3) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 62)])
        }
        dialogueStep++;
    }
    if(currentDialogue == 6) {
        if(dialogueStep == 1) {
            shopPrepText(shopDialogue[56])
        }
        if(dialogueStep == 2) {
            shopPrepText(shopDialogue[57])
        }
        if(dialogueStep > 2) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 62)])
        }
        dialogueStep++;
    }
})



const backArrow = document.getElementById("pageback")
const talkBackArrow = document.getElementById("talkpageback")
const nextArrow = document.getElementById("pagenext")
const shopButtonBox = document.getElementById("shopbuttonbox")
const storePage = document.getElementById("buystuff")
const purchaseButton = document.getElementById("purchase")


purchaseButton.addEventListener('mousedown', () => {
    if(cash < price) {
        shopPrepText(shopDialogue[Math.floor(Math.random() * 5 + 40)])
        cantSelect.cloneNode(true).play();
    } else {
        cash -= price;
        localStorage.setItem("cash", cash)
        shopCash.textContent = `\$${cash.toLocaleString()}`
        //fix cash
        if(focusedItem == 0) {
            if(yourItems[0].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[0].owned = true;
                yourItems[0].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 1) {
            if(yourItems[1].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[1].owned = true;
                yourItems[1].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 2) {
            if(yourItems[2].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[2].owned = true;
                yourItems[2].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 3) {
            if(yourItems[3].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[3].owned = true;
                yourItems[3].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 4) {
            if(yourItems[4].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[4].owned = true;
                yourItems[4].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 5) {
            if(yourItems[5].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[5].owned = true;
                yourItems[5].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 6) {
            if(yourItems[6].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[6].owned = true;
                yourItems[6].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 7) {
            if(yourItems[7].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[7].owned = true;
                yourItems[7].q++;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 8) {
            if(yourItems[8].owned == true) {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 48)])
            } else {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
            yourItems[8].owned = true;
            yourItems[8].q++;
            saveItems();
            lockin.cloneNode(true).play();
        }
        if(focusedItem == 9) {
            if(yourItems[9].owned == true) {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 48)])
            } else {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
            yourItems[9].owned = true;
            yourItems[9].q++;
            saveItems();
            lockin.cloneNode(true).play();
        }
        if(focusedItem == 10) {
            if(yourItems[10].owned == true) {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 48)])
            } else {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
            yourItems[10].owned = true;
            yourItems[10].q++;
            saveItems();
            lockin.cloneNode(true).play();
        }
        if(focusedItem == 11) {
            if(yourItems[11].owned == true) {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 48)])
            } else {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
            yourItems[11].owned = true;
            yourItems[11].q++;
            saveItems();
            lockin.cloneNode(true).play();
        }
        if(focusedItem == null) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 58)])
            cantSelect.cloneNode(true).play();
        }
    }
})

const talkPage = document.getElementById("talking")

talkBackArrow.addEventListener('mousedown', () => {
    talkPage.style.display = "none"
    shopPrepText(shopDialogue[Math.floor(Math.random() * 4)])
    talkButton.style.display = "flex"
    buyButton.style.display = "flex"
    leaveButton.style.display = "flex"
    currentDialogue = null;
})

let focusedItem = null;
let shopPage = 0
backArrow.addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        currentDialogue = null;
        storePage.style.display = "none"
        talkButton.style.display = "flex"
        shopPrepText(shopDialogue[Math.floor(Math.random() * 4)])
        buyButton.style.display = "flex"
        leaveButton.style.display = "flex"
    } else {
        shopPage--;
        updateShopItems();
    }
})
nextArrow.addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        shopPage++;
        updateShopItems();
    } else {
        cantSelect.cloneNode(true).play();
    }
})

function updateShopItems() {
    if(shopPage <= 0) {
        shopItems[0].textContent = "StunRemover"
        shopItems[1].textContent = "ExtraHeart"
        shopItems[2].textContent = "ComboInsure"
        shopItems[3].textContent = "HeartPlusUp"
        shopItems[4].textContent = "BurrowHeater"
        shopItems[5].textContent = "SnakeFlute"
    } else {
        shopItems[0].textContent = "WalletLining"
        shopItems[1].textContent = "GoldenGoose"
        shopItems[2].textContent = "Rock"
        shopItems[3].textContent = "Rock2"
        shopItems[4].textContent = "Fruit"
        shopItems[5].textContent = "DonationBox"
    }
}

shopItems[0].addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        shopPrepText(shopDialogue[28])
        price = 30000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 0;
    } else {
        shopPrepText(shopDialogue[34])
        price = 300000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 6;
    }
})
shopItems[1].addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        shopPrepText(shopDialogue[29])
        price = 100000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 1;
    } else {
        shopPrepText(shopDialogue[35])
        price = 250000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 7;
    }
})
shopItems[2].addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        shopPrepText(shopDialogue[30])
        price = 150000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 2;
    } else {
        shopPrepText(shopDialogue[36])
        price = 1000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 8;
    }
})
shopItems[3].addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        shopPrepText(shopDialogue[31])
        price = 500000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 3;
    } else {
        shopPrepText(shopDialogue[37])
        price = 2000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 9;
    }
})
shopItems[4].addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        shopPrepText(shopDialogue[32])
        price = 50000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 4;
    } else {
        shopPrepText(shopDialogue[38])
        price = 5000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 10;
    }
})
shopItems[5].addEventListener('mousedown', () => {
    if(shopPage <= 0) {
        shopPrepText(shopDialogue[33])
        price = 200000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 5;
    } else {
        shopPrepText(shopDialogue[39])
        price = 1000000;
        shopDialogue[41] = `* That doesn't look like \$${price.toLocaleString()}...`
        focusedItem = 11;
    }
})





buyButton.addEventListener('mousedown', () => {
    shopPage = 0;
    shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 7)])
    talkButton.style.display = "none"
    buyButton.style.display = "none"
    currentDialogue = null;
    leaveButton.style.display = "none"
    storePage.style.display = "flex"
    focusedItem = null;
})
talkButton.addEventListener('mousedown', () => {
    shopPage = 0;
    currentDialogue = null;
    focusedItem = null;
    shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 10)])
    talkButton.style.display = "none"
    buyButton.style.display = "none"
    leaveButton.style.display = "none"
    talkPage.style.display = "flex"
})

const meerkat = document.getElementById("shopkeeper") 
meerkat.querySelector("img").addEventListener('mousedown', () => {
    clickfx();
    let meerkatimg = meerkat.querySelector("img")
    meerkatimg.style.animation = "none"
    meerkatimg.offsetHeight;
    meerkatimg.style.animation = "redfilter 400ms ease, hitMeerkat 400ms ease forwards"
    AHitMeerkat = true;
    shopPrepText(shopDialogue[Math.floor(Math.random() * 5 + 65)])
})

function hurtPlayer() {
    hurtSound.cloneNode(true).play();
    healthPoints--;
    updateHealth();
}

function updateHealth() {
    if(yourItems[3].owned == false) {
            hearts[4].style.display = "none"
        } else {hearts[4].style.display = "inline"}
        if(yourItems[1].owned == false) {
            hearts[3].style.display = "none"
        } else {hearts[3].style.display = "inline"}
    if(healthPoints == 5) {
        hearts.forEach((heart) => heart.style.filter = "brightness(1)")
    }
    if(healthPoints == 4) {
        hearts[0].style.filter = "brightness(1)"
        hearts[1].style.filter = "brightness(1)"
        hearts[2].style.filter = "brightness(1)"
        hearts[3].style.filter = "brightness(1)"
        hearts[4].style.filter = "brightness(0)"
    }
    if(healthPoints == 3) {
        hearts[0].style.filter = "brightness(1)"
        hearts[1].style.filter = "brightness(1)"
        hearts[2].style.filter = "brightness(1)"
        hearts[3].style.filter = "brightness(0)"
        hearts[4].style.filter = "brightness(0)"
    }
    if(healthPoints == 2) {
        hearts[0].style.filter = "brightness(1)"
        hearts[1].style.filter = "brightness(1)"
        hearts[2].style.filter = "brightness(0)"
        hearts[3].style.filter = "brightness(0)"
        hearts[4].style.filter = "brightness(0)"
    }
    if(healthPoints == 1) {
        hearts[0].style.filter = "brightness(1)"
        hearts[1].style.filter = "brightness(0)"
        hearts[2].style.filter = "brightness(0)"
        hearts[3].style.filter = "brightness(0)"
        hearts[4].style.filter = "brightness(0)"
    }
    if(healthPoints == 0) {
        hearts.forEach((heart) => heart.style.filter = "brightness(0)")
        if(!endless) {
            triggerFlashbang();
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } else {
            finishGame();
            gameOn = false;
            timeUp = true;
        }
    }
}

if(yourItems[3].owned == false) {
    hearts[4].style.display = "none"
}
if(yourItems[1].owned == false) {
    hearts[3].style.display = "none"
}


document.addEventListener('keydown', (event) => {
    if(event.key = "l") {
        yourItems = [
        {item: "antistun", owned: true, q:1},
        {item: "heart4", owned:true, q:1},
        {item: "combosave", owned:true, q:1},
        {item: "heart5", owned:true, q:1},
        {item: "anticooldown", owned:true, q:1},
        {item: "snakeflute", owned:true, q:1},
        {item: "hogsave", owned:true, q:1},
        {item: "gmoleexp", owned:true, q:1},
        {item: "rock", owned:true, q:1},
        {item: "rock2", owned:true, q:1},
        {item: "fruit", owned:true, q:1},
        {item: "donate", owned:true, q:1}
        ]
        saveItems();
        ping.cloneNode(true).play();
    }
})

let ATutorialComplete = 0;
let AClassicRoundsPlayed = 0;
let AEndlessRoundsPlayed = 0;
let ATotalHits = 0;
let ASmorgasbord = [];
let ASameEnemyHits = 0;
let AIntentional = false;
let AClutched = false;
let AQuickDraw = false;
let AStreakBreaks = 0;
let AFlawless = false;
let AMoleHits = 0;
let AGoldenMoles = 0;
let ASerendipity = false;
let AGoldenMiss = false;
let AArmadillos = 0;
let AMedic = false;
let AFlashbang = false;
let AHitWhileFlashbang = false;
let ADolladillo = false;
let ASnakes = 0;
let ASpit = 0;
let AGroundhogs = 0;
let AOptionsTalked = [];
let economyStimulated = false;
let AHitMeerkat = false;
let AEasyFarmed = false;


let quickDrawStart = null;
let quickDrawCount = 0;
function checkQuickDraw() {
    const now = Date.now;
    if(quickDrawStart === null || now - quickDrawCount > 5000) {
        quickDrawCount = 0;
        quickDrawStart = now;
    }
    quickDrawCount++;
    if(quickDrawCount >= 10) {AQuickDraw = true;}
}




function updateAchievements() {
    if(ATutorialComplete) {grantAchievement(achievements[0])}
    if(AClassicRoundsPlayed >= 1) {grantAchievement(achievements[1])}
    if(AClassicRoundsPlayed >= 10) {grantAchievement(achievements[2])}
    if(AClassicRoundsPlayed >= 50) {grantAchievement(achievements[3])}

    if(score >= 20000 && !endless) {grantAchievement(achievements[4])}
    if(score >= 50000) {grantAchievement(achievements[5])}
    if(score >= 250000) {grantAchievement(achievements[6])}

    if(AEndlessRoundsPlayed >= 1) {grantAchievement(achievements[7])}
    if(AEndlessRoundsPlayed >= 10) {grantAchievement(achievements[8])}
    if(AEndlessRoundsPlayed >= 50) {grantAchievement(achievements[9])}
    if(timeLeft >= 600 && endless) {grantAchievement(achievements[10])}

    if(ATotalHits >= 50) {grantAchievement(achievements[11])}
    if(ATotalHits >= 500) {grantAchievement(achievements[12])}
    if(ATotalHits >= 5000) {grantAchievement(achievements[13])}
    if(ATotalHits >= 50000) {grantAchievement(achievements[14])}

    if(ASmorgasbord.length == 5) {grantAchievement(achievements[15])}
    if(ASameEnemyHits >= 3) {grantAchievement(achievements[16])}
    if(AIntentional) {grantAchievement(achievements[17])}
    if(AClutched) {grantAchievement(achievements[18])}
    if(AQuickDraw) {grantAchievement(achievements[19])}

    if(AStreakBreaks >= 1) {grantAchievement(achievements[20])}
    if(AStreakBreaks >= 100) {grantAchievement(achievements[21])}

    if(streak >= 10) {grantAchievement(achievements[22])}
    if(streak >= 100) {grantAchievement(achievements[23])}
    if(streak >= 250) {grantAchievement(achievements[24])}
    if(AFlawless) {grantAchievement(achievements[25])}

    if(AMoleHits >= 10000) {grantAchievement(achievements[26])}

    if(AGoldenMoles >= 1) {grantAchievement(achievements[27])}
    if(AGoldenMoles >= 500) {grantAchievement(achievements[28])}
    if(goldenMolesHit >= 10) {grantAchievement(achievements[29])}
    if(goldenMolesHit >= 50) {grantAchievement(achievements[30])}
    if(ASerendipity >= 3) {grantAchievement(achievements[31])}
    if(goldenMoleChance >= 1) {grantAchievement(achievements[32])}
    if(AGoldenMiss) {grantAchievement(achievements[33])}

    if(AArmadillos >= 50) {grantAchievement(achievements[34])}
    if(AMedic) {grantAchievement(achievements[35])}
    if(AFlashbang) {grantAchievement(achievements[36])}
    if(AHitWhileFlashbang) {grantAchievement(achievements[37])}
    if(ADolladillo) {grantAchievement(achievements[38])}

    if(ASnakes >= 50) {grantAchievement(achievements[39])}
    if(ASpit >= 1) {grantAchievement(achievements[40])}
    if(ASpit >= 50) {grantAchievement(achievements[41])}

    if(AGroundhogs >= 1) {grantAchievement(achievements[42])}
    if(AGroundhogs >= 50) {grantAchievement(achievements[43])}

    if(AOptionsTalked.length == 6) {grantAchievement(achievements[44])}
    if(yourItems.forEach((item) => item.owned)) {grantAchievement(achievements[45])}
    if(yourItems[6].owned) {grantAchievement(achievements[46])}
    if(economyStimulated) {grantAchievement(achievements[47])}
    if(AHitMeerkat) {grantAchievement(achievements[48])}
    if(yourItems[8].owned) {grantAchievement(achievements[49])}
    if(yourItems[9].owned) {grantAchievement(achievements[50])}
    if(yourItems[10].q >= 100) {grantAchievement(achievements[51])}
    if(yourItems[11].owned) {grantAchievement(achievements[52])}
    if(yourItems[11].q >= 2) {grantAchievement(achievements[53])}

    if(AEasyFarmed >= 5) {grantAchievement(achievements[54])}
}
function grantAchievement(achievement) {
    console.log(`granted ${achievement.name}`)
}










let achievements = [
    {name: "Class Dismissed", requires: 1, desc: "Complete the tutorial.", challenge:false},
    {name: "First Steps", requires:1, desc:"Play one game of classic mode.", challenge:false},
    {name: "Giant Steps", requires:10, desc:"Play ten games of classic mode.", challenge:false},
    {name: "Is this the best use of your time?", requires: 50, desc: "Play 50 games of classic mode.", challenge:true},

    {name: "Let's-a-go! Keep it up, baby!", requires: 20000, desc: "Have a score over 20,000 in classic mode.", challenge:true},
    {name: "The Idea", requires: 50000, desc: "Have a score over 50,000.", challenge:true},
    {name: "The Man", requires: 250000, desc: "Have a score over 250,000.", challenge:true},

    {name: "It Begins", requires: 1, desc: "Play one game of endless mode.", challenge:false},
    {name: "Round After Round", requires: 10, desc: "Play ten games of endless mode.", challenge:false},
    {name: "Well, that's one way to do it.", requires: 50, desc: "Play 50 games of endless mode.", challenge:true},
    {name: "Still Alive", requires: 600, desc: "Last 10 minutes in one game of endless mode.", challenge:true},

    {name: "Beginning Batter", requires: 50, desc:"Hit 50 enemies.", challenge:false},
    {name: "Novice Knocker", requires: 500, desc: "Hit 500 enemies.", challenge:false},
    {name: "Proficient Puncher", requires: 5000, desc: "Hit 5,000 enemies.", challenge:false},
    {name: "Master Masher", requires: 50000, desc: "Hit 50,000 enemies. What is wrong with you.", challenge:true},

    {name: "Smorgasbord", requires: 5, desc: "Hit one of each enemy consecutively (including a golden mole)", challenge:true},
    {name: "Trigger Happy", requires: 3, desc: "Hit the same enemy three times before it disappears.", challenge:false},
    {name: "Intentional", requires: 1, desc: "Hit an enemy within 300ms of it appearing.", challenge:true},
    {name: "Clutched", requires: 1, desc: "Hit a mole or snake within 100ms of it disappearing.", challenge:false},
    {name: "Quick Draw", requires: 10, desc: "Hit 10 enemies within 5 seconds.", challenge:false},

    {name: "HAH!", requires: 1, desc: "YOU MISSED!", challenge:false},
    {name: "HAH! HAH! HAH!", requires: 100, desc: "Lose 100 streaks.", challenge:false},

    {name: "Begone!", requires: 10, desc: "Hit 10 enemies in a row.", challenge:false},
    {name: "Flow State", requires: 100, desc: "Hit 100 enemies in a row.", challenge:false},
    {name: "Generational Run", requires: 250, desc: "Hit 250 enemies in a row.", challenge:true},
    {name: "Flawless", requires: 0, desc: "Complete a game of classic mode without losing your streak.", challenge:true},

    {name: "Mountain out of a Molehill", requires: 10000, desc: "Hit 10,000 moles.", challenge:true},

    {name: "Gotcha!", requires: 1, desc: "Hit a golden mole.", challenge:false},
    {name: "My Beautiful Collection", requires: 500, desc: "Hit 500 golden moles.", challenge:true},
    {name: "Gold Rush", requires: 10, desc: "Hit 10 golden moles in one round.", challenge:false},
    {name: "Set For Life", requires: 50, desc: "Hit 50 golden moles in one round.", challenge:true},
    {name: "Serendipity", requires: 3, desc: "Hit 3 consecutive golden moles.", challenge:true},
    {name: "Wow! That was so Gold!", requires: 1, desc: "Have a high enough streak for all moles to be golden.", challenge:true},
    {name: "Butterfingers", requires: 1, desc: "The one that got away...", challenge:false},

    {name: "Shell Shocked", requires: 50, desc: "Hit 50 armadillos.", challenge:false},
    {name: "Medic!", requires: 1, desc: "Be healed by an armadillo.", challenge:false}, 
    {name: "MY EYES!!!", requires: 1, desc: "Get flashbanged by an armadillo.", challenge:false},
    {name: "360 No-Scope", requires: 1, desc: "Hit an enemy while fully blinded.", challenge:false},
    {name: "Good Returns", requires: 1, desc: "Step 2: Profit.", challenge:false},

    {name: "Antivenom", requires: 50, desc: "Hit 50 snakes.", challenge:false},
    {name: "Spit Take", requires: 1, desc: "Get spat at.", challenge:false},
    {name: "Joke's on you, I'm into this.", requires: 100, desc: "Get spat at 100 times.", challenge:true},

    {name: "Hogs and Robbers", requires: 1, desc: "Hit a groundhog.", challenge:false},
    {name: "Highway Robbery", requires: 50, desc: "Hit 50 groundhogs. Not like they steal much anyways.", challenge:true},
    
    {name: "Hello!!!", requires: 1 /*i'm not sure*/, desc: "Spend some quality time chatting with Meerkat.", challenge:true},
    {name: "SHUT UP AND TAKE MY MONEY!", requires: 12, desc: "Buy one of every item in Meerkat's shop.", challenge:true},
    {name: "Not So Fast!", requires: 1, desc: "Protect your wallet from thieves.", challenge:false},
    {name: "Sharing Is Caring", requires: 1, desc: "Step 1: Stimulate the economy.", challenge:false},
    {name: "Stop, Criminell!", requires: 1, desc: "Hit Meerkat. Sicko.", challenge:false},
    {name: "We will, we will", requires: 1, desc: "Buy Rock.", challenge:false},
    {name: "Rock 2", requires: 1, desc: "Buy Rock 2.", challenge:false},
    {name: "Macondo", requires: 100, desc: "Maybe the real hackathon was the friends we made along the way.", challenge:true},
    {name: "Charitable", requires: 1, desc: "Donate to Meerkat", challenge:true},
    {name: "Highly Charitable", requires: 2, desc: "Do it again.", challenge:true},

    {name: "Azzy hates this one simple trick", requires: 5, desc: "Exploit easy difficulty for money.", challenge:false},
]

const achievementButton = document.getElementById("achievements")
const achievementMenu = document.getElementById("achievementbox")
const achievementWrap = document.getElementById("achievementwrap")
achievementButton.addEventListener('mousedown', () => {
    startpageelements.forEach((element) => {
        element.style.animation = ("wipeleft 1s ease-in-out forwards")
    })
    achievementMenu.style.animation = ("slideleft 1s ease-in-out forwards")
    achievementMenu.style.display = "flex";
    achievementWrap.style.display = "flex"
})


/*
Class Dismissed,  desc: "Complete the tutorial.", challenge:false,
First Steps,  desc:"Play one game of classic mode.", challenge:false,
Giant Steps, desc:"Play ten games of classic mode.", challenge:false,
Is this the best use of your time?,  50, desc: "Play 50 games of classic mode.", challenge:true,

Let's-a-go! Keep it up, baby!,  20000, desc: "Have a score over 20,000 in classic mode.", challenge:true,
The Idea,  desc: "Have a score over 50,000.", challenge:true,
The Man,  desc: "Have a score over 250,000.", challenge:true,

It Begins, desc: "Play one game of endless mode.", challenge:false,
Round After Round,  desc: "Play ten games of endless mode.", challenge:false,
Well, that's one way to do it., desc: "Play 50 games of endless mode.", challenge:true,
Still Alive, desc: "Last 10 minutes in one game of endless mode.", challenge:true,

Beginning Batter, desc:"Hit 50 enemies.", challenge:false,
Novice Knocker, desc: "Hit 500 enemies.", challenge:false,
Proficient Puncher, desc: "Hit 5,000 enemies.", challenge:false,
Master Masher, desc: "Hit 50,000 enemies. What is wrong with you.", challenge:true,

Smorgasbord, desc: "Hit one of each enemy consecutively (including a golden mole)", challenge:true,
Trigger Happy, desc: "Hit the same enemy three times before it disappears.", challenge:false,
Intentional, desc: "Hit an enemy within 300ms of it appearing.", challenge:true,
Clutched, desc: "Hit an enemy within 100ms of it disappearing.", challenge:false,
Quick Draw, desc: "Hit 10 enemies within 5 seconds.", challenge:false,

HAH!, desc: "YOU MISSED!", challenge:false,
HAH! HAH! HAH!, desc: "Lose 100 streaks.", challenge:false,

Begone!, desc: "Hit 10 enemies in a row.", challenge:false,
Flow State, desc: "Hit 100 enemies in a row.", challenge:false,
Generational Run, desc: "Hit 250 enemies in a row.", challenge:true,
Flawless, desc: "Complete a game of classic mode without losing your streak.", challenge:true,

Mountain out of a Molehill, desc: "Hit 10,000 moles.", challenge:true,

Gotcha!, desc: "Hit a golden mole.", challenge:false,
My Beautiful Collection, desc: "Hit 500 golden moles.", challenge:true,
Gold Rush, desc: "Hit 10 golden moles in one round.", challenge:false,
Set For Life, desc: "Hit 50 golden moles in one round.", challenge:true,
Serendipity, desc: "Hit 3 consecutive golden moles.", challenge:true,
Wow! That was so Gold!, desc: "Have a high enough streak for all moles to be golden.", challenge:true,
Butterfingers, desc: "The one that got away...", challenge:false,

Shell Shocked, desc: "Hit 50 armadillos.", challenge:false,
Medic!, desc: "Be healed by an armadillo.", challenge:false, 
MY EYES!!!, desc: "Get flashbanged by an armadillo.", challenge:false,
360 No-Scope, desc: "Hit an enemy while fully blinded.", challenge:false,
Good Returns, desc: "Step 2: Profit.", challenge:false,

Antivenom, desc: "Hit 50 snakes.", challenge:false,
Spit Take, desc: "Get spat at.", challenge:false,
Joke's on you, I'm into this., desc: "Get spat at 100 times.", challenge:true,

Hogs and Robbers, desc: "Hit a groundhog.", challenge:false,
Highway Robbery, desc: "Hit 50 groundhogs. Not like they steal much anyways.", challenge:true,
    
Hello!!!, desc: "Spend some quality time chatting with Meerkat.", challenge:true,
SHUT UP AND TAKE MY MONEY!, desc: "Buy one of every item in Meerkat's shop.", challenge:true,
Not So Fast!, desc: "Protect your wallet from thieves.", challenge:false,
Sharing Is Caring, desc: "Step 1: Stimulate the economy.", challenge:false,
Stop, Criminell!, desc: "Hit Meerkat. Sicko.", challenge:false,
We will, we will, desc: "Buy Rock.", challenge:false,
Rock 2, desc: "Buy Rock 2.", challenge:false,
Macondo, desc: "Maybe the real hackathon was the friends we made along the way.", challenge:true,
Charitable, desc: "Donate to Meerkat", challenge:true,
Highly Charitable, desc: "Do it again.", challenge:true,

Azzy hates this one simple trick, desc: "Exploit easy difficulty for money.", challenge:false,*/