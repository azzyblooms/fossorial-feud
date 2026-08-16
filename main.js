let yourItems = [
    {item: "antistun", owned: false, q:0},
    {item: "heart4", owned:false, q:0},
    {item: "combosave", owned:false, q:0},
    {item: "heart5", owned:false, q:0},
    {item: "anticooldown", owned:false, q:0},
    {item: "gmoleexp", owned:false, q:0},
    {item: "hogsave", owned:false, q:0},
    {item: "estrogen", owned:false, q:0},
    {item: "rock", owned:false, q:0},
    {item: "rock2", owned:false, q:0},
    {item: "fruit", owned:false, q:0},
    {item: "donate", owned:false, q:0}
]

const show = new Audio("audio/In.ogg")
const hide = new Audio("audio/Out.ogg")

let inGame = false;
let achievementCounter = 0;
const achievementCount = document.getElementById("achievementstat")
const achievementButton = document.getElementById("achievements")
const achievementMenu = document.getElementById("achievementbox")
const achievementWrap = document.getElementById("achievementwrap")

let achievements = [
    {name: "Class Dismissed", requires: 1, desc: "Complete the tutorial.", challenge:false, owned:false, img:"classDismissed"},
    {name: "First Steps", requires:1, desc:"Play one game of classic mode.", challenge:false, owned:false, img:"firstSteps"},
    {name: "Giant Steps", requires:10, desc:"Play ten games of classic mode.", challenge:false, owned:false, img:"giantSteps"},
    {name: "Is this the best use of your time?", requires: 50, desc: "Play 50 games of classic mode.", challenge:true, owned:false, img:"50classic"},

    {name: "Let's-a-go! Keep it up, baby!", requires: 20000, desc: "Have a score over 20,000 in classic mode.", challenge:true, owned:false, img:"score1"},
    {name: "The Idea", requires: 50000, desc: "Have a score over 50,000.", challenge:true, owned:false, img:"score2"},
    {name: "The Man", requires: 250000, desc: "Have a score over 250,000.", challenge:true, owned:false, img:"score3"},

    {name: "It Begins", requires: 1, desc: "Play one game of endless mode.", challenge:false, owned:false, img:"endless1"},
    {name: "Round After Round", requires: 10, desc: "Play ten games of endless mode.", challenge:false, owned:false, img:"endless10"},
    {name: "Well, that's one way to do it.", requires: 50, desc: "Play 50 games of endless mode.", challenge:true, owned:false, img:"endless50"},
    {name: "Still Alive", requires: 600, desc: "Last 10 minutes in one game of endless mode.", challenge:true, owned:false, img:"stillAlive"},

    {name: "Beginning Batter", requires: 50, desc:"Hit 50 enemies.", challenge:false, owned:false, img:"hits1"},
    {name: "Novice Knocker", requires: 500, desc: "Hit 500 enemies.", challenge:false, owned:false, img:"hits2"},
    {name: "Skilled Smasher", requires: 5000, desc: "Hit 5,000 enemies.", challenge:false, owned:false, img:"hits3"},
    {name: "Master Masher", requires: 50000, desc: "Hit 50,000 enemies. What is wrong with you.", challenge:true, owned:false, img:"hits4"},

    {name: "Smorgasbord", requires: 5, desc: "Hit one of each enemy consecutively (including a golden mole)", challenge:true, owned:false, img:"smorgasbord"},
    {name: "Trigger Happy", requires: 3, desc: "Hit the same enemy three times before it disappears.", challenge:false, owned:false, img:"triggerhappy"},
    {name: "Intentional", requires: 1, desc: "Hit an enemy within 300ms of it appearing.", challenge:true, owned:false, img:"intentional"},
    {name: "Clutched", requires: 1, desc: "Hit a mole or snake within 100ms of it disappearing.", challenge:false, owned:false, img:"clutched"},
    {name: "Quick Draw", requires: 10, desc: "Hit 30 enemies within 10 seconds.", challenge:false, owned:false, img:"quickdraw"},

    {name: "HAH!", requires: 1, desc: "YOU MISSED!", challenge:false, owned:false, img:"hah"},
    {name: "HAH! HAH! HAH!", requires: 100, desc: "Lose 100 streaks.", challenge:false, owned:false, img:"hah2"},

    {name: "Begone!", requires: 10, desc: "Hit 10 enemies in a row.", challenge:false, owned:false, img:"streak1"},
    {name: "Flow State", requires: 100, desc: "Hit 100 enemies in a row.", challenge:false, owned:false, img:"streak2"},
    {name: "Generational Run", requires: 250, desc: "Hit 250 enemies in a row.", challenge:true, owned:false, img:"streak3"},
    {name: "Flawless", requires: 0, desc: "Complete a game of classic mode without breaking your streak.", challenge:true, owned:false, img:"flawless"},

    {name: "Mountain out of a Molehill", requires: 10000, desc: "Hit 10,000 moles.", challenge:true, owned:false, img:"molehill"},

    {name: "Gotcha!", requires: 1, desc: "Hit a golden mole.", challenge:false, owned:false, img:"gmole1"},
    {name: "My Beautiful Collection", requires: 500, desc: "Hit 500 golden moles.", challenge:true, owned:false, img:"beautifulcollection"},
    {name: "Gold Rush", requires: 10, desc: "Hit 10 golden moles in one round.", challenge:false, owned:false, img:"gmole2"},
    {name: "Set For Life", requires: 50, desc: "Hit 50 golden moles in one round.", challenge:true, owned:false, img:"gmole3"},
    {name: "Serendipity", requires: 3, desc: "Hit three golden moles in a row.", challenge:true, owned:false, img:"serem"},
    {name: "Wow! That was so Gold!", requires: "100%", desc: "Have a high enough streak for all moles to be golden.", challenge:true, owned:false, img:"sogold"},
    {name: "Butterfingers", requires: 1, desc: "The one that got away...", challenge:false, owned:false, img:"gotaway"},

    {name: "Shell Shocked", requires: 50, desc: "Hit 50 armadillos.", challenge:false, owned:false, img:"armadillo"},
    {name: "Medic!", requires: 1, desc: "Get healed by an armadillo.", challenge:false, owned:false, img:"medic"}, 
    {name: "MY EYES!!!", requires: 1, desc: "Get flashbanged by an armadillo.", challenge:false, owned:false, img:"flashbang"},
    {name: "360 No-Scope", requires: 1, desc: "Hit an enemy while fully blinded.", challenge:false, owned:false, img:"flashbanghit"},
    {name: "Good Returns", requires: 1, desc: "Step 2: Profit.", challenge:false, owned:false, img:"return"},

    {name: "Antivenom", requires: 50, desc: "Hit 50 snakes.", challenge:false, owned:false, img:"snake"},
    {name: "Spit Take", requires: 1, desc: "Get spat at.", challenge:false, owned:false, img:"spit"},
    {name: "Joke's on you, I'm into this.", requires: 100, desc: "Get spat at 100 times.", challenge:true, owned:false, img:"spit2"},

    {name: "Hogs and Robbers", requires: 1, desc: "Hit a groundhog.", challenge:false, owned:false, img:"groundhog"},
    {name: "Highway Robbery", requires: 50, desc: "Hit 50 groundhogs. Not like they steal much anyways.", challenge:true, owned:false, img:"groundhog2"},
    
    {name: "Hello!!!", requires: 1 /*i'm not sure*/, desc: "Spend some quality time chatting with Meerkat.", challenge:true, owned:false, img:"talk"},
    {name: "SHUT UP AND TAKE MY MONEY!", requires: 12, desc: "Buy everything in the shop.", challenge:true, owned:false, img:"buyeverything"},
    {name: "Sharing Is Caring", requires: 1, desc: "Step 1: Stimulate the economy.", challenge:false, owned:false, img:"economy"},
    {name: "Stop, Criminell!", requires: 1, desc: "Hit Meerkat. Jerk.", challenge:false, owned:false, img:"hittalk"},
    {name: "We will, we will", requires: 1, desc: "Buy Rock.", challenge:false, owned:false, img:"rock"},
    {name: "Rock 2", requires: 1, desc: "Buy Rock 2.", challenge:false, owned:false, img:"rock2"},
    {name: "Macondo", requires: 100, desc: "Maybe the real hackathon was the friends we made along the way.", challenge:true, owned:false, img:"macondo"},
    {name: "Charitable", requires: 1, desc: "Donate to Meerkat", challenge:true, owned:false, img:"donate"},
    {name: "Highly Charitable", requires: 2, desc: "Do it again.", challenge:true, owned:false, img:"donate2"},

    {name: "Azzy hates this one simple trick", requires: 5, desc: "Try to exploit easy difficulty for easy money.", challenge:false, owned:false, img:"azzy"},
]

const achievementPopup = document.getElementById("achievementpopup")
const achievementPopupImg = document.getElementById("popupimg")
const achievementPopupTitle = document.getElementById("popuptitle")
const achievementPopupDesc = document.getElementById("popupsubtitle")

let popupShowing = false;
let popupQueue = [];


function showPopup(achievement) {
    popupQueue.push(achievement)
    if(!popupShowing) {
        processPopupQueue();
    }
}

function processPopupQueue() {
    if(popupQueue.length === 0) {
        popupShowing = false;
        return;
    }
    popupShowing = true;
    const achievementQ = popupQueue.shift();
    achievementPopupImg.src = `images/icons/${achievementQ.img}.png`
    achievementPopupTitle.textContent = achievementQ.name;
    achievementPopupDesc.textContent = achievementQ.desc;
    achievementPopup.style.animation = "none"
    achievementPopup.offsetHeight;
    show.cloneNode(true).play();
    achievementPopup.style.animation = "poppingup 1s ease-in-out forwards"
    setTimeout(() => {
        achievementPopup.style.animation = "popupaway 1s ease-in-out forwards"
        hide.cloneNode(true).play();
    }, 4000)
    setTimeout(() => {
        processPopupQueue();
    }, 6000)
}

const savedAchievements = JSON.parse(localStorage.getItem("achievements"))

if(savedAchievements) {
    achievements.forEach((achievement) => {
        if(savedAchievements[achievement.name] !== undefined) {
            achievement.owned = savedAchievements[achievement.name];
        }
    })
}
function saveAchievements() {
    const savedAchievements = {};
    achievements.forEach((achievement) => {
        savedAchievements[achievement.name] = achievement.owned;
    })
    localStorage.setItem("achievements", JSON.stringify(savedAchievements))
}

let ATutorialComplete = 0;
let ASameEnemyHits = false;
let AIntentional = false;
let AClutched = false;
let AQuickDraw = false;
let AFlawless = false;
let ASerendipity = false;
let AGoldenMiss = false;
let ASmorgasbord = [];
let AMedic = false;
let AFlashbang = false;
let AHitWhileFlashbang = false;
let ADolladillo = false;
let economyStimulated = false;
let AHitMeerkat = false;
let AArmadillos = Number(localStorage.getItem("AArmadillos") || 0)
let AEndlessTime = Number(localStorage.getItem("AEndlessTime") || 0)
let AStreak = Number(localStorage.getItem("AStreak") || 0)
let AGoldenGame = Number(localStorage.getItem("AGoldenGame") || 0)
let AGoldenChance = Number(localStorage.getItem("AGoldenChance") || 0)
let AClassicRoundsPlayed = Number(localStorage.getItem("AClassicRoundsPlayed") || 0)
let AClassicScore = Number(localStorage.getItem("AClassicScore") || 0)
let AEasyFarmed = Number(localStorage.getItem("AEasyFarmed") || 0)
let AEndlessRoundsPlayed = Number(localStorage.getItem("AEndlessRoundsPlayed") || 0)
let AGoldenMoles = Number(localStorage.getItem("AGoldenMoles") || 0)
let AGroundhogs = Number(localStorage.getItem("AGroundhogs") || 0)
let AMoleHits = Number(localStorage.getItem("AMoleHits") || 0)
let ATotalHits = Number(localStorage.getItem("ATotalHits") || 0)
let AOptionsTalked = [];
let AScore = Number(localStorage.getItem("AScore") || 0)
let ASnakes = Number(localStorage.getItem("ASnakes") || 0)
let ASpit = Number(localStorage.getItem("ASpit") || 0)
let AStreakBreaks = Number(localStorage.getItem("AStreakBreaks") || 0)

function saveGlobalStats() {
    localStorage.setItem("AArmadillos", AArmadillos)
    localStorage.setItem("AClassicRoundsPlayed", AClassicRoundsPlayed)
    localStorage.setItem("AClassicScore", AClassicScore)
    localStorage.setItem("AEasyFarmed", AEasyFarmed)
    localStorage.setItem("AEndlessRoundsPlayed", AEndlessRoundsPlayed)
    localStorage.setItem("AGoldenMoles", AGoldenMoles)
    localStorage.setItem("AGroundhogs", AGroundhogs)
    localStorage.setItem("AMoleHits", AMoleHits)
    localStorage.setItem("ATotalHits", ATotalHits)
    localStorage.setItem("AScore", AScore)
    localStorage.setItem("ASnakes", ASnakes)
    localStorage.setItem("ASpit", ASpit)
    localStorage.setItem("AStreakBreaks", AStreakBreaks)
    localStorage.setItem("AStreak", AStreak)
    localStorage.setItem("AEndlessTime", AEndlessTime)
    localStorage.setItem("AGoldenGame", AGoldenGame)
    localStorage.setItem("AGoldenChance", AGoldenChance)
}
function loadGlobalStats() {
    AArmadillos = Number(localStorage.getItem("AArmadillos"))
    AClassicRoundsPlayed = Number(localStorage.getItem("AClassicRoundsPlayed"))
    AClassicScore = Number(localStorage.getItem("AClassicScore"))
    AEasyFarmed = Number(localStorage.getItem("AEasyFarmed"))
    AEndlessRoundsPlayed = Number(localStorage.getItem("AEndlessRoundsPlayed"))
    AGoldenMoles = Number(localStorage.getItem("AGoldenMoles"))
    AGroundhogs = Number(localStorage.getItem("AGroundhogs"))
    AMoleHits = Number(localStorage.getItem("AMoleHits"))
    ATotalHits = Number(localStorage.getItem("ATotalHits"))
    AScore = Number(localStorage.getItem("AScore"))
    ASnakes = Number(localStorage.getItem("ASnakes"))
    ASpit = Number(localStorage.getItem("ASpit"))
    AStreakBreaks = Number(localStorage.getItem("AStreakBreaks"))
    AEndlessTime = Number(localStorage.getItem("AEndlessTime"))
    AStreak = Number(localStorage.getItem("AStreak"))
    AGoldenGame = Number(localStorage.getItem("AGoldenGame"))
    AGoldenChance = Number(localStorage.getItem("AGoldenChance"))
}
loadGlobalStats();
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
if(localStorage.getItem("musicState") === null) {
    localStorage.setItem("musicState", true)
}

if(localStorage.getItem("difficulty") === null) {
    localStorage.setItem("difficulty", "easy")
}
let difficulty = localStorage.getItem("difficulty");

skipIntroState = localStorage.getItem("skipIntroState") === "true"
brightFlashesState = localStorage.getItem("brightFlashesState") === "true"
showMouseHitboxState = localStorage.getItem("showMouseHitboxState") === "true"
musicState = localStorage.getItem("musicState") === "true"
if(showMouseHitboxState == true) {cursorhb.style.opacity = "1"} else {cursorhb.style.opacity = "0"}

let moles = [
    {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
    {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
    {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
    {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0}
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
const toggleMusic = document.getElementById("musicbutton")

const settings = [
    {setting: "brightFlashes", isOn: brightFlashesState, button: toggleBrightFlashes},
    {setting: "skipIntro", isOn: skipIntroState, button: toggleSkipIntro},
    {setting: "showMouseHitbox", isOn: showMouseHitboxState, button: toggleMouseHitbox},
    {setting: "music", isOn: musicState, button: toggleMusic}
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
    if(settings[2].isOn) {cursorhb.style.opacity = "1"} else {cursorhb.style.opacity = "0"}
})
toggleMusic.addEventListener('mousedown', () => {
    settings[3].isOn = !settings[3].isOn;
    localStorage.setItem("musicState", settings[3].isOn)
    settings.forEach((button) => {
        if(button.isOn) {button.button.style.backgroundColor = "green"; button.button.textContent = "ON"}
        if(!button.isOn) {button.button.style.backgroundColor = "red"; button.button.textContent = "OFF"}
    })
    
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
    totalHitsText.textContent = "TOTAL HITS: 0"
    molesHitText.textContent = "MOLES HIT: 0"
    gmhnum.textContent = "0"
    snakesHitText.textContent = "SNAKES HIT: 0"
    groundhogsHitText.textContent = "GROUNDHOGS HIT: 0"
    armadillosHitText.textContent = "ARMADILLOS HIT: 0"
    maxStreakText.textContent = "HIGHEST STREAK: 0"
    streaksBrokenText.textContent = "STREAKS BROKEN: 0"
    finalScore.textContent = "FINAL SCORE: 0"
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
            if(totalHits > 200) {
                const amount = totalHits / 200;
                th += amount;
                const progress = th / totalHits
                playTone(progress * 200);
            } else {
                th++;
                playTone(th);
            }
            if (th > totalHits) {th = totalHits}
            totalHitsText.textContent = `TOTAL HITS: ${Math.floor(th)}`
            if(th == totalHits) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(molesHitText.textContent !== `MOLES HIT: ${molesHit}`) {
            if(molesHit > 200) {
                const amount = molesHit / 200;
                mh += amount;
                const progress = mh / molesHit
                playTone(progress * 200);
            } else {
                mh++;
                playTone(mh);
            }
            if (mh > molesHit) {mh = molesHit}
            molesHitText.textContent = `MOLES HIT: ${Math.floor(mh)}`
            if(mh == molesHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(gmhnum.textContent !== `${goldenMolesHit}`) {
            if(goldenMolesHit > 200) {
                const amount = goldenMolesHit / 200;
                gmh += amount;
                const progress = gmh / goldenMolesHit
                playTone(progress * 200);
            } else {
                gmh++;
                playTone(gmh);
            }
            if (gmh > goldenMolesHit) {gmh = goldenMolesHit}
            gmhnum.textContent = `${Math.floor(gmh)}`
            if(gmh == goldenMolesHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(snakesHitText.textContent !== `SNAKES HIT: ${snakesHit}`) {
            if(snakesHit > 200) {
                const amount = snakesHit / 200;
                sh += amount;
                const progress = sh / snakesHit
                playTone(progress * 200);
            } else {
                sh++;
                playTone(sh);
            }
            if (sh > snakesHit) {sh = snakesHit}
            snakesHitText.textContent = `SNAKES HIT: ${Math.floor(sh)}`
            if(sh == snakesHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(groundhogsHitText.textContent !== `GROUNDHOGS HIT: ${groundhogsHit}`) {
            if(groundhogsHit > 200) {
                const amount = groundhogsHit / 200;
                gh += amount;
                const progress = gh / groundhogsHit
                playTone(progress * 200);
            } else {
                gh++;
                playTone(gh);
            }
            if (gh > groundhogsHit) {gh = groundhogsHit}
            groundhogsHitText.textContent = `GROUNDHOGS HIT: ${Math.floor(gh)}`
            if(gh == groundhogsHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(armadillosHitText.textContent !== `ARMADILLOS HIT: ${armadillosHit}`) {
            if(armadillosHit > 200) {
                const amount = armadillosHit / 200;
                ah += amount;
                const progress = ah / armadillosHit
                playTone(progress * 200);
            } else {
                ah++;
                playTone(ah);
            }
            if (ah > armadillosHit) {ah = armadillosHit}
            armadillosHitText.textContent = `ARMADILLOS HIT: ${Math.floor(ah)}`
            if(ah == armadillosHit) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(maxStreakText.textContent !== `HIGHEST STREAK: ${maxStreak}`) {
            if(maxStreak > 200) {
                const amount = maxStreak / 200;
                ms += amount;
                const progress = ms / maxStreak
                playTone(progress * 200);
            } else {
                ms++;
                playTone(ms);
            }
            if (ms > maxStreak) {ms = maxStreak}
            maxStreakText.textContent = `HIGHEST STREAK: ${Math.floor(ms)}`
            if(ms == maxStreak) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(streaksBrokenText.textContent !== `STREAKS BROKEN: ${streaksBroken}`) {
            if(streaksBroken > 200) {
                const amount = streaksBroken / 200;
                sb += amount;
                const progress = sb / streaksBroken
                playTone(progress * 200);
            } else {
                sb++;
                playTone(sb);
            }
            if (sb > streaksBroken) {sb = streaksBroken}
            streaksBrokenText.textContent = `STREAKS BROKEN: ${Math.floor(sb)}`
            if(sb == streaksBroken) {
                lockin.cloneNode(true).play();
                waiting = true;
                setTimeout(() => {
                    waiting = false;
                }, 300)
            }
        } else if(finalScore.textContent !== `FINAL SCORE: ${score}`) {
            const amount = score / 250;
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
            setTimeout(() => {
                statisticsBox.style.animation = "fadeout 1s ease forwards"
                scoreWrap.style.animation = "fadeout 1s ease forwards"
                cashWrap.style.animation = "fadeout 1s ease forwards"
                streakWrap.style.animation = "fadeout 1s ease forwards"
                statisticsBox.style.animation = "fadeout 1s ease forwards"
                timerWrap.style.animation = "fadeout 1s ease forwards"
                hpWrap.style.animation = "fadeout 1s ease forwards"
                molecontainer.style.display = "none"
                healthPoints = 3;
                setTimeout(() => {
                    statisticsBox.style.display = "none"
                    scoreWrap.style.display = "none"
                    cashWrap.style.display = "none"
                    streakWrap.style.display = "none"
                    timerWrap.style.display = "none"
                    hpWrap.style.display = "none"
                    flashbang.style.display = "none"
                    shading.style.display = "none"
                    totalHitsText.textContent = "TOTAL HITS: 0"
                    molesHitText.textContent = "MOLES HIT: 0"
                    gmhnum.textContent = "0"
                    snakesHitText.textContent = "SNAKES HIT: 0"
                    groundhogsHitText.textContent = "GROUNDHOGS HIT: 0"
                    armadillosHitText.textContent = "ARMADILLOS HIT: 0"
                    maxStreakText.textContent = "HIGHEST STREAK: 0"
                    streaksBrokenText.textContent = "STREAKS BROKEN: 0"
                    finalScore.textContent = "FINAL SCORE: 0"
                    timeLeft = null;
                    gameOn = false;
                    timeUp = null;
                    score = 0;
                    inGame = false;
                    roundCountFailSafe = false;
                    timeLeft = 0;
                    scoreText.textContent = (`SCORE: ${score}`)
                    timer.textContent = `TIME: ${timeLeft}`
                    moles.forEach((mole) => {
                        mole.element.querySelector("img").src = "images/mole.png"
                    })
                    startpageelements.forEach((element) => {
                        element.style = ("")
                    })
                    genderChange();
                    startpageelements.forEach((element) => {
                        element.style.animation = ("slideleft 1s ease-in-out forwards")
                    })
                }, 1000)
            }, 3000)
        }
    }, 20)
}

difficultyChange();

epilepsyWarningToggle.addEventListener("mousedown", () => {
    epilepsyFriendly = !epilepsyFriendly;
})


function difficultyChange() {
    if(difficulty == "easy") {
        moles = [
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0}
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
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn5, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn6, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn7, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn8, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn9, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0}
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
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn5, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn6, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn7, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn8, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn9, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn10, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn11, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn12, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn13, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn14, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn15, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0},
            {element: molespawn16, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null, saveStreak:null, timeAlive:null, sameHits:0}
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
    difficultyButton.textContent = (`DIFFICULTY: ${difficulty.toUpperCase()}`)
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
        localStorage.setItem("difficulty", "normal")
    } else if(difficulty == "normal") {
        difficulty = "hard";
        localStorage.setItem("difficulty", "hard")
    } else {
        difficulty = "easy"
        localStorage.setItem("difficulty", "easy")
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
roundCountFailSafe = false;
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
                if(!roundCountFailSafe) {
                    roundcountshow();
                    roundCountFailSafe = true;
                }
            }, 2500)
        }, 1000)
    } else {
        teasing = false;
        intro = false;
        moles.forEach((mole) => {
            mole.element.querySelector("img").style.transform = ("scale(0)")
        })
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
        if(yourItems[6].owned) {
            score -= 49;
        } else {
            score -= 50;
        }
        if(streak > 0) {
            endStreak();
        }
        scoreText.style.animation = "none"
        scoreText.offsetHeight;
        if(yourItems[7].owned) {
            scoreText.style.animation = "estroScore 300ms ease"
        } else {
            scoreText.style.animation = "loseScore 300ms ease"
        }
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
            updateAchievements();
            setTimeout(() => {
                statisticsBox.style.animation = "fadeout 1s ease forwards"
                scoreWrap.style.animation = "fadeout 1s ease forwards"
                cashWrap.style.animation = "fadeout 1s ease forwards"
                tutorialmolecontainer.style.animation = "fadeout 1s ease forwards"
                streakWrap.style.animation = "fadeout 1s ease forwards"
                statisticsBox.style.animation = "fadeout 1s ease forwards"
                timerWrap.style.animation = "fadeout 1s ease forwards"
                hpWrap.style.animation = "fadeout 1s ease forwards"
                tutorialBox.style.animation = "fadeout 1s ease forwards"
                tutorialTextBox.style.animation = "fadeout 1s ease forwards"
                molecontainer.style.display = "none"
                healthPoints = 3;
                tutorialState = false;
                setTimeout(() => {
                    statisticsBox.style.display = "none"
                    tutorialBox.style.display = "none"
                    tutorialTextBox.style.display = "none"
                    tutorialmolecontainer.style.display = "none"
                    scoreWrap.style.display = "none"
                    stopLoopingMusic();
                    cashWrap.style.display = "none"
                    streakWrap.style.display = "none"
                    timerWrap.style.display = "none"
                    hpWrap.style.display = "none"
                    flashbang.style.display = "none"
                    shading.style.display = "none"
                    totalHitsText.textContent = "TOTAL HITS: 0"
                    molesHitText.textContent = "MOLES HIT: 0"
                    gmhnum.textContent = "0"
                    snakesHitText.textContent = "SNAKES HIT: 0"
                    groundhogsHitText.textContent = "GROUNDHOGS HIT: 0"
                    armadillosHitText.textContent = "ARMADILLOS HIT: 0"
                    maxStreakText.textContent = "HIGHEST STREAK: 0"
                    streaksBrokenText.textContent = "STREAKS BROKEN: 0"
                    finalScore.textContent = "FINAL SCORE: 0"
                    timeLeft = null;
                    gameOn = false;
                    timeUp = null;
                    score = 0;
                    inGame = false;
                    timeLeft = 0;
                    scoreText.textContent = (`SCORE: ${score}`)
                    timer.textContent = `TIME: ${timeLeft}`
                    moles.forEach((mole) => {
                        mole.element.querySelector("img").src = "images/mole.png"
                    })
                    startpageelements.forEach((element) => {
                        element.style.animation = ("slideleft 1s ease-in-out forwards")
                    })
                    genderChange();
                    startpageelements.forEach((element) => {
                        element.style.animation = ("slideleft 1s ease-in-out forwards")
                    })
                }, 1000)
            }, 3000)
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
    if(settings[3].isOn) {
        await setupAudio('audio/practice.mp3');
        playLoopingMusic();
    }
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
        streakWrap.style.display = "flex"
        streakWrap.style.animation = ("fadein 1.2s ease forwards")
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
    score = 0;
    inGame = false;
    scoreText.textContent = (`SCORE: ${score}`)
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
            streakWrap.style.display = "flex"
            streakWrap.style.animation = ("fadein 1.2s ease forwards")
            timerWrap.style.display = "flex"
            timerWrap.style.animation = ("fadein 1.2s ease forwards")
            setTimeout(() => {
                if(skipIntro || skipIntroState) {
                    moles.forEach((mole) => {
                        mole.element.querySelector("img").style.opacity = 1;
                        mole.element.querySelector("img").style.transform = "scale(1)"
                    })
                    roundcountshow();
                } else {
                    tease();
                }
            }, 1300)
        }, 1000)
    }
    setTimeout(() => {
        startpageelements.forEach((element) => {
            element.style.display = ("none")
        })
    }, 1000)
})

const achievementBack = document.getElementById("achievementback")
achievementBack.addEventListener('mousedown', () => {
    achievementMenu.style.animation = ("wipeleft 1s ease-in-out forwards")
    startpageelements.forEach((element) => {
        element.style.animation = ("slideleft 1s ease-in-out forwards")
    })
    setTimeout(() => {
        achievementWrap.style.display = "none"
    }, 1000)
})

endlessbutton.addEventListener('mousedown', () => {
    score = 0;
    scoreText.textContent = (`SCORE: ${score}`)
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
        streakWrap.style.display = "flex"
        streakWrap.style.animation = ("fadein 1.2s ease forwards")
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
        streakWrap.style.display = "flex"
        streakWrap.style.animation = ("fadein 1.2s ease forwards")
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
                if(mole.state == "dying") {
                    return;
                }
                if(clickCollision(mole.element.querySelector("img"), cursorhb)) {
                    if(teasing && !skipIntro && !skipIntroState) {
                        mole.state = "hit";
                        redFilter(mole.element);
                        hitMole = true;
                        clickfx();
                    }
                    if(inGame) {
                        if(mole.state == "bury") {
                            if(!yourItems[0].owned) {
                                stun = 500;
                            }
                            scoreText.style.animation = "none"
                            scoreText.offsetHeight;
                            if(yourItems[7].owned) {
                                scoreText.style.animation = "estroScore 300ms ease"
                            } else {
                                scoreText.style.animation = "loseScore 300ms ease"
                            }
                            cursor.querySelector("img").style.animation = "none"
                            cursor.querySelector("img").offsetHeight;
                            cursor.querySelector("img").style.animation = "redfilter 200ms ease"
                            score -= 10;
                            if(streak > 0) {
                                endStreak();
                            }
                            scoreText.textContent = (`SCORE: ${score}`)
                        } else {
                            mole.sameHits++;
                            if(mole.sameHits >= 3) {ASameEnemyHits = true; updateAchievements();}
                            redFilter(mole.element);
                            hitMole = true;
                            if(mole.state == "up") {
                                if(!intro) {moleHit(mole)}
                            }
                            if(skipIntro || skipIntroState) {
                                if(!gameOn) {
                                    mole.element.querySelector("img").style.transform = "scale(0)"
                                }
                            }
                            clickfx();
                        }
                    }
                }
            })

            if(inGame) {
                if(hitMole == false && !intro) {     
                    if(!yourItems[0].owned) {
                        stun = 500;
                    }
                    cursor.querySelector("img").style.animation = "none";
                    cursor.querySelector("img").offsetHeight;
                    cursor.querySelector("img").style.animation = "redfilter 200ms ease";
                    scoreText.style.animation = "none"
                    scoreText.offsetHeight;
                    if(yourItems[7].owned) {
                        scoreText.style.animation = "estroScore 300ms ease"
                    } else {
                        scoreText.style.animation = "loseScore 300ms ease"
                    }
                    score -= 10;
                    if(streak > 0) {
                        endStreak();
                    }
                    scoreText.textContent = (`SCORE: ${score}`)
                }
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
        saveGlobalStats();
        updateAchievements();
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
    checkQuickDraw();
    if(mole.spawningTimer !== null) {AIntentional = true}
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
        if(yourItems[6].owned) {
            score -= 49;
        } else {
            score -= 50;
        }
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
        if(yourItems[7].owned) {
            scoreText.style.animation = "estroScore 300ms ease"
        } else {
            scoreText.style.animation = "loseScore 300ms ease"
        }
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
            if(healthPoints == 4 && yourItems[3].owned) {healthPoints++;}
            if(healthPoints == 3 && yourItems[1].owned) {healthPoints++;}
            if(healthPoints == 2) {healthPoints++;}
            if(healthPoints == 1) {healthPoints++;}
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
            cashText.textContent = `CASH: \$${Math.floor(cash).toLocaleString()}`
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
    updateAchievements();
    saveGlobalStats();
    streakText.textContent = (`STREAK: ${streak}`)
    scoreText.textContent = (`SCORE: ${score}`)
    const moleImg = mole.element.querySelector("img")
    if(moleImg.style.transform !== "scale(0)" && !intro) {
        moleImg.style.transform = ("scale(0)")
        setTimeout(() => {
            mole.state = "bury";
        }, 350)
        if(yourItems[4].owned) {
            mole.cooldown = Math.floor(Math.random() * 500 + 150);
        } else {
            mole.cooldown = Math.floor(Math.random() * 1500 + 350);
        }
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
    if(streak > AStreak) {AStreak = streak}
    if(streak > maxStreak) {
        maxStreak = streak;
    }
    if(streak > 8) {
        if(yourItems[7].owned == true) {
            goldenMoleChance = Math.pow((streak / 12), 1.25) / 100;
        } else {
            goldenMoleChance = (streak / 12) / 100;
        }
        if(Math.floor(goldenMoleChance * 100) > AGoldenChance) {AGoldenChance = Math.floor(goldenMoleChance * 100)}
    }
    saveGlobalStats();
    updateAchievements();
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
async function roundcountshow() {
    if(settings[3].isOn) {
        await setupAudio('audio/molefight.mp3');
        playLoopingMusic();
    }
    gameOn = false;
    timer.classList.remove("flashing")
    endless = false;
    timeLeft = 120;
    inGame = true;
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
    score = 0;
    streak = 0;
    scoreText.textContent = (`SCORE: ${score}`)
    armadillosHit = 0;
    totalHits = 0;
    maxStreak = 0;
    moles.forEach((mole) => {
        const moleImg = mole.element.querySelector("img")
        moleImg.style.filter = "contrast(1)"
    })
    streaksBroken = 0;
    updateHealth();
    timeUp = false;
    timer.textContent = `TIME: ${timeLeft}`
    roundCountText.textContent = (`ROUND ${AClassicRoundsPlayed + 1}`)
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

async function endlessPrep() {
    if(settings[3].isOn) {
        await setupAudio('audio/molefight.mp3');
        playLoopingMusic();
    }
    gameOn = false;
    timer.classList.remove("flashing")
    endless = true;
    timeLeft = 0;
    inGame = true;
    moles.forEach((mole) => {
        const moleImg = mole.element.querySelector("img")
        moleImg.style.filter = "contrast(1)"
    })
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
    streak = 0;
    score = 0;
    scoreText.textContent = (`SCORE: ${score}`)
    armadillosHit = 0;
    totalHits = 0;
    maxStreak = 0;
    streaksBroken = 0;
    updateHealth();
    timeUp = false;
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
const streakWrap = document.getElementById("streakwrap")
let tallyScoreMath;
let scoreToCash = false;

const orchHit = new Audio("audio/orchhit.ogg")
function finishGame() {
    stopLoopingMusic();
    if(endless) {
        AEndlessRoundsPlayed++;
        if(AEndlessTime < timeLeft) {AEndlessTime = timeLeft}
        if(difficulty == "easy") {AEasyFarmed++;}
    } else {
        AClassicRoundsPlayed++;
        if(streaksBroken == 0 && score > 0) {AFlawless = true}
    }
    if(AGoldenGame > goldenMolesHit) {AGoldenGame = goldenMolesHit}
    orchHit.play();
    inGame = false;
    updateAchievements();
    saveGlobalStats();
    setTimeout(() => {
        tallyScore();
        drumroll.play();
        if(!endless || AClassicScore < score) {AClassicScore = score}
        if(AScore < score) {AScore = score}
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
            if(difficulty == "easy") {
                if(displayedScore >= amount) {
                    displayedScore -= amount;
                    loops++;
                    cash += 0.5 * amount;
                } else {
                    cash += displayedScore * 0.5
                    loops++;
                    displayedScore = 0;
                }
            }
            if(difficulty == "normal") {
                if(displayedScore >= amount) {
                    displayedScore -= amount;
                    loops++;
                    cash += amount;
                } else {
                    cash += displayedScore
                    loops++;
                    displayedScore = 0;
                }
            }
            if(difficulty == "hard") {
                if(displayedScore >= amount) {
                    displayedScore -= amount;
                    loops++;
                    cash += 2 * amount;
                } else {
                    cash += displayedScore * 2
                    loops++;
                    displayedScore = 0;
                }
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
        cashText.textContent = `CASH: \$${Math.floor(cash).toLocaleString()}`
        ATutorialComplete = 0;
        AClassicRoundsPlayed = 0;
        AEndlessRoundsPlayed = 0;
        timer.classList.remove("flashing")
        ATotalHits = 0;
        ASmorgasbord = [];
        ASameEnemyHits = false;
        AIntentional = false;
        AClutched = false;
        AEndlessTime = 0;
        AClassicScore = 0;
        AScore = 0;
        AGoldenChance = 0;
        AGoldenGame = 0;
        AStreak = 0;
        AQuickDraw = false;
        AStreakBreaks = 0;
        AFlawless = false;
        AMoleHits = 0;
        AGoldenMoles = 0;
        ASerendipity = false;
        AGoldenMiss = false;
        AArmadillos = 0;
        AMedic = false;
        AFlashbang = false;
        AHitWhileFlashbang = false;
        ADolladillo = false;
        ASnakes = 0;
        ASpit = 0;
        AGroundhogs = 0;
        AOptionsTalked = [];
        economyStimulated = false;
        AHitMeerkat = false;
        AEasyFarmed = 0;
        achievements.forEach((achievement) => {
            achievement.owned = false;
        })
        yourItems.forEach((item) => {
            item.owned = false;
            item.q = 0;
        })
        saveAchievements();
        fixGrayscale();
        saveItems();
        saveGlobalStats();
        genderChange();
        triggerFlashbang();
    }
})

cashText.textContent = `CASH: \$${Math.floor(cash).toLocaleString()}`
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
async function gameStart() {
    intro = false;
    inGame = true;
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

async function endlessStart() {
    intro = false;
    gameOn = true;
    inGame = true;
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
    mole.sameHits = 0;
    clearTimeout(mole.spawningTimer)
    clearTimeout(mole.saveStreak)
    mole.type = "mole";
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.style.filter = "contrast(1)"
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
                if(yourItems[4].owned) {
                    mole.cooldown = Math.floor(Math.random() * 500 + 150);
                } else {
                    mole.cooldown = Math.floor(Math.random() * 1500 + 350);
                }
                
            }, 350)
            mole.saveStreak = setTimeout(() => {
                if(mole.state !== "dying") {
                    if(streak > 0) {
                        endStreak();
                    }
                    if(mole.type == "goldmole") {AGoldenMiss = true; updateAchievements();}
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
    mole.sameHits = 0;
    mole.item = null;
    clearTimeout(mole.spawningTimer)
    mole.type = "groundhog"
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.style.filter = "contrast(1)"
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
                if(yourItems[4].owned) {
                    mole.cooldown = Math.floor(Math.random() * 500 + 150);
                } else {
                    mole.cooldown = Math.floor(Math.random() * 1500 + 350);
                }
                
            }, 350)
        }
    }, Math.random() * 1500 + 300)
}

function spawnArmadillo(mole) {
    if(mole.state !== "bury" || mole.cooldown > 0 || globalCooldown > 0) {return;}
    clearTimeout(mole.hideTimer)
    mole.sameHits = 0;
    clearTimeout(mole.spawningTimer)
    mole.type = "armadillo"
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    mole.item = null;
    moleImg.style.filter = "contrast(1)"
    moleImg.src = "images/armadillo.png"
    moleImg.style.transition = "transform 350ms ease"
    moleImg.style.transform = "scale(1)"
    let determineItem = Math.floor(Math.random() * 8 );
    if(determineItem < 4) {
        mole.item = "bomb"
        moleImg.src = "images/armedadillo.png"
        moleImg.style.filter = "contrast(5)"
    } else if (determineItem > 6) {
        if(endless) {
            mole.item = "heal"
            moleImg.src = "images/immahealyou.png"
        } else {
            mole.item = null;
            moleImg.src = "images/armadillo.png"
        }
    } else if(determineItem == 5) {
        mole.item = null;
        moleImg.src = "images/armadillo.png"
    } else if(determineItem == 6) {
        /*mole.item = "cash"
        moleImg.src = "images/dolladillo.png"*/
        if(economyStimulated) {
            mole.item = "cash"
            moleImg.src = "images/dolladillo.png"
        } else {
            mole.item = null;;
            moleImg.src = "images/armadillo.png"
        }
    }
    mole.spawningTimer = setTimeout(() => {
        mole.state = "up";
        moleImg.style.transform = "scale(1)"
        mole.spawningTimer = null;
            if(determineItem < 4) {
                mole.item = "bomb"
                moleImg.src = "images/armedadillo.png"
                moleImg.style.filter = "contrast(5)"
            } else if (determineItem > 6) {
                if(endless) {
                    mole.item = "heal"
                    moleImg.src = "images/immahealyou.png"
                } else {
                    mole.item = null;
                    moleImg.src = "images/armadillo.png"
                }
            } else if(determineItem == 5) {
                mole.item = null;
                moleImg.src = "images/armadillo.png"
            } else if(determineItem == 6) {
                /*mole.item = "cash"
                moleImg.src = "images/dolladillo.png"*/
                if(economyStimulated) {
                    mole.item = "cash"
                    moleImg.src = "images/dolladillo.png"
                } else {
                    mole.item = null;
                    moleImg.src = "images/armadillo.png"
                }
            }
    }, 350)
    mole.hideTimer = setTimeout(() => {
        if(mole.state == "up") {
            moleImg.style.transform = "scale(0)"
            setTimeout(() => {
                mole.state = "bury";
                moleImg.style.filter = "contrast(1)"
                if(yourItems[4].owned) {
                    mole.cooldown = Math.floor(Math.random() * 500 + 150);
                } else {
                    mole.cooldown = Math.floor(Math.random() * 1500 + 350);
                }
            }, 350)
        }
    }, Math.random() * 1000 + 400)
}

function spawnSnake(mole) {
    if(mole.state !== "bury" || mole.cooldown > 0 || globalCooldown > 0) {return;}
    clearTimeout(mole.hideTimer)
    mole.sameHits = 0;
    mole.item = null;
    clearTimeout(mole.spawningTimer)
    clearTimeout(mole.saveStreak)
    mole.type = "snake";
    mole.state = "up";
    const moleImg = mole.element.querySelector("img")
    moleImg.style.filter = "contrast(1)"
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
                if(yourItems[4].owned) {
                    mole.cooldown = Math.floor(Math.random() * 500 + 150);
                } else {
                    mole.cooldown = Math.floor(Math.random() * 1500 + 350);
                }
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
            shading.style.backgroundColor = "purple"
            updateAchievements();
            saveGlobalStats();
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
        shopPrepText("")
        shopCash.textContent = `\$${Math.floor(cash).toLocaleString()}`
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
            if(settings[3].isOn) {
                await setupAudio('audio/shop.mp3');
                playLoopingMusic();
            }
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
    // exponential gold
    "* This little trinket makes golden moles become exponentially more common! Lower streak means WAY lower, higher streak means WAY higher. They're golden moles, so it's $250,000.",
    //groundhog insurance
    "* This wallet lining makes it so groundhogs only steal 49 points. Sick, right? It's gold plated, so it's pricey at $300,000. Worth it!!!",
    // estrogen
    "* \"She was helping MINORS to get HRT!! (its free btw :3)\"",
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
    "* ...But, a little birdie told me there's an achievement for buying 100 fruits from my shop.",
    "* Something about a \"hackathon\" and \"keeping things fruity.\"",
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
        leavingShop = true;
        setTimeout(() => {
            shopOpen = false;
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
                    element.style = ""
                })
                streakText.style.display = "flex"
                genderChange();
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
    saveGlobalStats();
    updateAchievements();
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
        
        //fix cash
        if(focusedItem == 0) {
            if(yourItems[0].owned == true) {
                cantSelect.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 45)])
            } else {
                yourItems[0].owned = true;
                yourItems[0].q++;
                cash -= price;
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
                cash -= price;
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
                cash -= price;
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
                cash -= price;
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
                cash -= price;
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
                cash -= price;
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
                cash -= price;
                saveItems();
                lockin.cloneNode(true).play();
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
        }
        if(focusedItem == 7) {
            if(yourItems[7].owned == true) {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 48)])
            } else {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
            yourItems[7].owned = true;
            yourItems[7].q++;
            saveItems();
            genderChange();
            lockin.cloneNode(true).play();
        }
        if(focusedItem == 8) {
            if(yourItems[8].owned == true) {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 3 + 48)])
            } else {
                shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 26)])
            }
            yourItems[8].owned = true;
            yourItems[8].q++;
            cash -= price;
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
            cash -= price;
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
            cash -= price;
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
            cash -= price;
            lockin.cloneNode(true).play();
        }
        if(focusedItem == null) {
            shopPrepText(shopDialogue[Math.floor(Math.random() * 2 + 58)])
            cantSelect.cloneNode(true).play();
        }
        localStorage.setItem("cash", cash)
        shopCash.textContent = `\$${Math.floor(cash).toLocaleString()}`
    }
    updateAchievements();
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
        shopItems[5].textContent = "GoldenGoose"
    } else {
        shopItems[0].textContent = "WalletLining"
        shopItems[1].textContent = "Estrogen"
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
        price = 0;
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
        price = 250000;
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
    updateAchievements();
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
    if(event.key === "l") {
        yourItems = [
        {item: "antistun", owned: true, q:1},
        {item: "heart4", owned:true, q:1},
        {item: "combosave", owned:true, q:1},
        {item: "heart5", owned:true, q:1},
        {item: "anticooldown", owned:true, q:1},
        {item: "gmoleexp", owned:true, q:1},
        {item: "hogsave", owned:true, q:1},
        {item: "estrogen", owned:true, q:1},
        {item: "rock", owned:true, q:1},
        {item: "rock2", owned:true, q:1},
        {item: "fruit", owned:true, q:1},
        {item: "donate", owned:true, q:1}
        ]
        genderChange();
        updateAchievements();
        saveAchievements();
        saveItems();
        ping.cloneNode(true).play();
    }
})




let quickDrawStart = null;
let quickDrawCount = 0;
function checkQuickDraw() {
    const now = Date.now;
    if(quickDrawStart === null || now - quickDrawCount > 10000) {
        quickDrawCount = 0;
        quickDrawStart = now;
    }
    quickDrawCount++;
    if(quickDrawCount >= 30) {AQuickDraw = true; updateAchievements();}
}


updateAchievements();

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
    if(ASameEnemyHits) {grantAchievement(achievements[16])}
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
    if(ASpit >= 100) {grantAchievement(achievements[41])}

    if(AGroundhogs >= 1) {grantAchievement(achievements[42])}
    if(AGroundhogs >= 50) {grantAchievement(achievements[43])}

    if(AOptionsTalked.length == 6) {grantAchievement(achievements[44])}
    if(yourItems.filter(item => item.owned).length == 12) {grantAchievement(achievements[45])}
    if(economyStimulated) {grantAchievement(achievements[46])}
    if(AHitMeerkat) {grantAchievement(achievements[47])}
    if(yourItems[8].owned) {grantAchievement(achievements[48])}
    if(yourItems[9].owned) {grantAchievement(achievements[49])}
    if(yourItems[10].q >= 100) {grantAchievement(achievements[50])}
    if(yourItems[11].owned) {grantAchievement(achievements[51])}
    if(yourItems[11].q >= 2) {grantAchievement(achievements[52])}

    if(AEasyFarmed >= 5) {grantAchievement(achievements[53])}
}

function fixGrayscale() {
    const achievementElements = document.querySelectorAll("#achievementboxes .achievement")

    achievementElements.forEach((ach, index) => {
        const achievement = achievements[index]
        if(yourItems[7].owned) {
            if(achievement.owned) {
            ach.style.filter = "grayscale(0%)";
            ach.style.borderColor = "rgb(206, 77, 163)"
            ach.style.backgroundColor = "rgb(134, 44, 104)"
            ach.querySelector("img").style.borderColor = "rgb(206, 77, 163)"
            if(achievement.challenge) {
                ach.style.borderColor = "rgb(126, 53, 175)"
                ach.style.backgroundColor = "rgb(85, 24, 100)"
                ach.querySelector("img").style.borderColor = "rgb(165, 92, 233)"
            }
            } else {
                ach.style.filter = "grayscale(100%)"
            }
        } else {
            if(achievement.owned) {
                ach.style.filter = "grayscale(0%)";
                if(achievement.challenge) {
                    ach.style.borderColor = "rgb(126, 53, 175)"
                    ach.style.backgroundColor = "rgb(85, 24, 100)"
                    ach.querySelector("img").style.borderColor = "rgb(165, 92, 233)"
                }
            } else {
                ach.style.filter = "grayscale(100%)"
            }
        }
        const numerator = ach.querySelector(".numerator")
        const denominator = ach.querySelector(".denominator")
        if(denominator) {
            denominator.textContent = achievement.requires.toLocaleString();
        }
        if(numerator) {
            if(index === 2) {
                numerator.textContent = AClassicRoundsPlayed.toLocaleString();
            }
            if(index === 3) {
                numerator.textContent = AClassicRoundsPlayed.toLocaleString();
            }
            if(index === 4) {
                numerator.textContent = AClassicScore.toLocaleString();
            }
            if(index === 5) {
                numerator.textContent = AScore.toLocaleString();
            }
            if(index === 6) {
                numerator.textContent = AScore.toLocaleString();
            }
            if(index === 8) {
                numerator.textContent = AEndlessRoundsPlayed.toLocaleString();
            }
            if(index === 9) {
                numerator.textContent = AEndlessRoundsPlayed.toLocaleString();
            }
            if(index === 10) {
                numerator.textContent = AEndlessTime.toLocaleString();
            }
            if(index === 11) {
                numerator.textContent = ATotalHits.toLocaleString();
            }
            if(index === 12) {
                numerator.textContent = ATotalHits.toLocaleString();
            }
            if(index === 13) {
                numerator.textContent = ATotalHits.toLocaleString();
            }
            if(index === 14) {
                numerator.textContent = ATotalHits.toLocaleString();
            }
            if(index === 21) {
                numerator.textContent = AStreakBreaks.toLocaleString();
            }
            if(index === 22) {
                numerator.textContent = AStreak.toLocaleString();
            }
            if(index === 23) {
                numerator.textContent = AStreak.toLocaleString();
            }
            if(index === 24) {
                numerator.textContent = AStreak.toLocaleString();
            }
            if(index === 26) {
                numerator.textContent = AMoleHits.toLocaleString();
            }
            if(index === 28) {
                numerator.textContent = AGoldenMoles.toLocaleString();
            }
            if(index === 29) {
                numerator.textContent = AGoldenGame.toLocaleString();
            }
            if(index === 30) {
                numerator.textContent = AGoldenGame.toLocaleString();
            }
            if(index === 32) {
                numerator.textContent = `${AGoldenChance.toLocaleString()}%`;
            }
            if(index === 34) {
                numerator.textContent = AArmadillos.toLocaleString();
            }
            if(index === 39) {
                numerator.textContent = ASnakes.toLocaleString();
            }
            if(index === 41) {
                numerator.textContent = ASpit.toLocaleString();
            }
            if(index === 43) {
                numerator.textContent = AGroundhogs.toLocaleString();
            }
            if(index === 45) {
                numerator.textContent = yourItems.filter(item => item.owned).length;
            }
            if(index === 52) {
                numerator.textContent = yourItems[11].q;
            }
            if(index === 53) {
                numerator.textContent = AEasyFarmed;
            }
        }
    });

}

fixGrayscale();
achievementCounter = achievements.filter(achievement => achievement.owned).length
achievementCount.textContent = `${achievementCounter}/54`


function grantAchievement(achievement) {
    if(!achievement.owned) {
        console.log(`granted ${achievement.name}`)
        achievementCounter = achievements.filter(achievement => achievement.owned).length
        achievement.owned = true;
        saveAchievements();
        fixGrayscale();
        showPopup(achievement);
        achievementCount.textContent = `${achievementCounter}/54`
        if(achievement.challenge) {
            shinyHitSound.cloneNode(true).play();
        } else {
            lockin.cloneNode(true).play();
        }
    }
}

const achievementBoxes = document.getElementById("achievementboxes")
document.querySelectorAll("#achievementboxes .achievement").forEach((ach) => {
    ach.style.filter = "grayscale(100%)";
});

achievementButton.addEventListener('mousedown', () => {
    fixGrayscale();
    achievementCounter = achievements.filter(achievement => achievement.owned).length
    achievementCount.textContent = `${achievementCounter}/54`
    startpageelements.forEach((element) => {
        element.style.animation = ("wipeleft 1s ease-in-out forwards")
    })
    achievementMenu.style.animation = ("slideleft 1s ease-in-out forwards")
    achievementMenu.style.display = "flex";
    achievementWrap.style.display = "flex"
})
if(yourItems[7].owned) {
    genderChange();
}
function genderChange() {
    const girlfilter = document.getElementById("girlfilter")
    const achievementTitle = document.getElementById("achievementtitle")
    if(yourItems[7].owned) {
        girlfilter.style.display = "flex"
        startpageelements.forEach((element) => {
            element.style.backgroundColor = "rgb(114, 27, 63)"
            element.style.borderColor = "rgb(80, 17, 43)"  
        })
        settingsButton.style.borderColor = "rgb(80, 17, 43)"
        settingsMenu.style.borderColor = "rgb(80, 17, 43)"
        settingsButton.style.backgroundColor = "rgb(114, 27, 63)"
        settingsMenu.style.backgroundColor = "rgb(114, 27, 63)"
        scoreText.style.color = "black"
        scoreText.style.backgroundColor = "white"
        scoreText.style.borderColor = "black"
        timer.style.backgroundColor = "rgb(140, 235, 238)"
        streakText.style.backgroundColor = "rgb(218, 80, 126)"
        cashText.style.backgroundColor = "rgb(230, 167, 238)"
        achievementMenu.style.backgroundColor = "rgb(114, 27, 63)"
        achievementMenu.style.borderColor = "rgb(80, 17, 43)"
        achievementPopup.style.borderColor = "rgb(80, 17, 43)"
        achievementPopup.style.backgroundColor = "rgb(114, 27, 63)"
        achievementBack.style.borderColor = "rgb(63, 13, 34)"
        achievementBack.style.backgroundColor = "rgb(80, 19, 44)"
        achievementCount.style.backgroundColor = "rgb(114, 27, 63)"
        achievementCount.style.borderColor = "rgb(80, 17, 43)"
        achievementTitle.style.backgroundColor = "rgb(114, 27, 63)"
        achievementTitle.style.borderColor = "rgb(80, 17, 43)"
    } else {
        girlfilter.style = ""
        startpageelements.forEach((element) => {
            element.style = ""
            element.style = ""  
        })
        settingsMenu.style = ""
        achievementPopup.style = ""
        settingsButton.style = ""
        scoreText.style = ""
        timer.style = ""
        streakText.style = ""
        cashText.style = ""
        achievementMenu.style = ""
        achievementBack.style = ""
        achievementCount.style = ""
        achievementTitle.style = ""
    }
}