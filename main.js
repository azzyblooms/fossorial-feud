const startbutton = document.getElementById("startbutton")
const pagetitle = document.getElementById("pagetitle")
const molecontainer = document.getElementById("molecontainer")
const cursor = document.getElementById("cursor")
const cursorhb = document.getElementById("cursorhb")
const difficultyButton = document.getElementById("difficulty")

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

let moles = [
    {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
    {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
    {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
    {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null}
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
    {name: "mole", image: "images/mole.png"},
    {name: "groundhog", image: "images/groundhog.png"},
    {name: "armadillo", image: "images/armadillo.png"}
]
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

const testButton = document.getElementById("testbutton")
const flashbang = document.getElementById("flashbang")
testButton.addEventListener('mousedown', () => {
    triggerFlashbang();
})

function triggerFlashbang() {
    flashbang.style.animation = ("none")
    flashbang.style.display = "none"
    flashbang.offsetHeight;
    flashbang.style.animation = "flashbang 2s ease forwards"
    flashbang.style.display = "inline";
}



function difficultyChange() {
    if(difficulty == "easy") {
        moles = [
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null}
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
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn5, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn6, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn7, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn8, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn9, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null}
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
            {element: molespawn1, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn2, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn3, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn4, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn5, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn6, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn7, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn8, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn9, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn10, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn11, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn12, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn13, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn14, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn15, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null},
            {element: molespawn16, busy:false, state:"ok", hideTimer:null, cooldown:0, type:null, spawningTimer:null}
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
    document.getElementById("difficulty")
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


let teasing = true;

function tease() {
    intro = true;
    if(!teasing) {
        grr();
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

}

startbutton.addEventListener('mousedown', () => {
    startpageelements.forEach((element) => {
        element.style.animation = ("wipeleft 1s ease-in-out forwards")
    })
    setTimeout(() => {
        startpageelements.forEach((element) => {
            element.style.display = ("none")
        })
        molecontainer.style.display = ("flex")
        molecontainer.style.animation = ("fadein 1.2s ease forwards")
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


document.addEventListener('mousedown', () => {
    if(stun > 0) {
        const stunSound = new Audio('audio/hover.mp3')
        stunSound.cloneNode(true).play();
        cursor.querySelector("img").style.animation = "redfilter 100ms ease";
    } else {
        cursor.querySelector("img").style.animation = ("none")
        cursor.querySelector("img").offsetHeight;
        cursor.querySelector("img").style.animation = ("swing 200ms ease-out")
        clickSound.cloneNode(true).play();

        let hitMole = false;

        moles.forEach((mole) => {
            if(mole.state == "dying") return;
            if(clickCollision(mole.element.querySelector("img"), cursorhb)) {
                if(mole.state == "bury") {
                    stun = 300;
                    cursor.querySelector("img").style.animation = "redfilter 200ms ease"
                    growlSound.cloneNode(true).play();
                    console.log("dawg u missed")
                    score -= 10;
                    streak = 0;
                    streakText.textContent = (`STREAK: ${streak}`)
                    scoreText.textContent = (`SCORE: ${score}`)
                } else {
                    redFilter(mole.element);
                    hitMole = true;
                    if(mole.state == "up") {
                        clickfx();
                        if(!intro) {moleHit(mole)}
                    }
                    if(teasing) {
                        mole.state = "hit";
                        clickfx();
                    }
                    console.log("hit")
                }
            }
        })

        if(hitMole == false && !intro) {
            stun = 300;
            cursor.querySelector("img").style.animation = "redfilter 200ms ease";
            growlSound.cloneNode(true).play();
            console.log("dawg u missed")
            score -= 10;
            streak = 0;
            streakText.textContent = (`STREAK: ${streak}`)
            scoreText.textContent = (`SCORE: ${score}`)
        }
    }
})

const scoreText = document.getElementById("score")
const debugSound = new Audio("audio/hover.mp3")
const streakText = document.getElementById("streak")

function moleHit(mole) {
    if(mole.state !== "up") {return;}
    clearTimeout(mole.spawningTimer)
    mole.state = "dying";
    if(mole.type == "mole") {
        score += 50;
        streak++;
    } else if (mole.type == "groundhog") {
        score -= 50;
        streak = 0;
        bonk.cloneNode(true).play();
    } else if (mole.type == "armadillo") {
        streak = 0;
        triggerFlashbang();
        bonk.cloneNode(true).play();
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

function redFilter(molespawn) {
    molespawn.querySelector("img").style.animation = ("none")
    molespawn.querySelector("img").offsetHeight;
    molespawn.querySelector("img").style.animation = ("redfilter 400ms ease")
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
    roundCountText.textContent = (`ROUND ${round}`)
    moleTypeText.textContent = enemyList;
    roundStartWrap.style.display = ("flex")
    roundStartWrap.style.animation = ("balloon-in 1.5s ease forwards")
    setTimeout(() => {
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

let randomMole;
let globalCooldown = 0;

function gameStart() {
    intro = false;
    moles.forEach((mole) => {
        mole.state = "bury";
    })
    function spawnLoop() {
        if(score >= 7500) {
            heheheha.play();
            return;
        }
        const available = moles.filter(mole => mole.state == "bury" && mole.cooldown <= 0 && globalCooldown <= 0);
        if (available.length > 0) {
            const randomMole = available[Math.floor(Math.random() * available.length)];
            //spawnMole(randomMole)
            const moleType = Math.floor(Math.random() * 21)
            if(moleType >= 0 && moleType <= 14) {
                spawnMole(randomMole)
            }
            if(moleType >= 15 && moleType <= 18) {
                spawnGroundhog(randomMole)
            }
            if(moleType >= 19 && moleType <= 20) {
                spawnArmadillo(randomMole)
            }
            //globalCooldown = Math.random() * 100 + 50;
        }

        const delay = Math.random() * 1800 + 400;
        setTimeout(spawnLoop, delay)
    }
    spawnLoop();

}

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
    clearTimeout(mole.spawningTimer)
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

                if(mole.state !== "dying") {
                    streak = 0; //is this fair?
                    streakText.textContent = (`STREAK: ${streak}`)
                }
                mole.state = "bury";
                mole.cooldown = Math.floor(Math.random() * 1500 + 350);
            }, 350)
        }
    }, Math.random() * 2000 + 500)
}

function spawnGroundhog(mole) {
    if(mole.state !== "bury" || mole.cooldown > 0 || globalCooldown > 0) {return;}
    clearTimeout(mole.hideTimer)
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

                /*if(mole.state !== "dying") {
                    streak = 0; //is this fair?
                    streakText.textContent = (`STREAK: ${streak}`)
                }*/
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
    mole.spawningTimer = setTimeout(() => {
        mole.state = "up";
        moleImg.style.transform = "scale(1)"
        mole.spawningTimer = null;
    }, 350)
    mole.hideTimer = setTimeout(() => {
        if(mole.state == "up") {
            moleImg.style.transform = "scale(0)"
            setTimeout(() => {

                /*if(mole.state !== "dying") {
                    streak = 0; //is this fair?
                    streakText.textContent = (`STREAK: ${streak}`)
                }*/
                mole.state = "bury";
                mole.cooldown = Math.floor(Math.random() * 1500 + 350);
            }, 350)
        }
    }, Math.random() * 1000 + 400)
}