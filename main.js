const startbutton = document.getElementById("startbutton")
const pagetitle = document.getElementById("pagetitle")
const molecontainer = document.getElementById("molecontainer")
const cursor = document.getElementById("cursor")
const cursorhb = document.getElementById("cursorhb")

const molespawn1 = document.getElementById("molespawn1")
const molespawn2 = document.getElementById("molespawn2")
const molespawn3 = document.getElementById("molespawn3")
const molespawn4 = document.getElementById("molespawn4")

const laugh1 = new Audio("audio/laughs/laugh1.mp3")
const laugh2 = new Audio("audio/laughs/laugh2.mp3")
const laugh3 = new Audio("audio/laughs/laugh3.mp3")
const laugh4 = new Audio("audio/laughs/laugh4.mp3")
const heheheha = new Audio("audio/laughs/heheheha.mp3")
const bonk = new Audio("audio/hits/bonk.mp3")
const punch = new Audio("audio/hits/punch.mp3")
const grrr = new Audio("audio/grrr.mp3")

let intro = true;

const moles = [
    {element: molespawn1, busy:false, state:"ok"},
    {element: molespawn2, busy:false, state:"ok"},
    {element: molespawn3, busy:false, state:"ok"},
    {element: molespawn4, busy:false, state:"ok"}
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


const clickSound = new Audio('audio/click2.mp3')

const startpageelements = [
    document.getElementById("startbutton"),
    document.getElementById("pagetitle")
]

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

            const growl = grrr.cloneNode(true);
            growl.playbackRate = Math.random() * 1.4 + 0.6;
            growl.preservesPitch = false;
            console.log(growl.playbackRate)
            growl.play();
            currentMole.element.querySelector("img").style.animation = ("none")
            currentMole.element.querySelector("img").offsetHeight;
            currentMole.element.querySelector("img").style.animation = ("wigglex 100ms ease")
            document.querySelectorAll(".moleimgdiv").forEach((moleimg) => {moleimg.style.animation = ("redfilter 500ms ease reverse forwards")})
            }, i * Math.random() * 350 + 99)
        }
        setTimeout(() => {
            moles.forEach((mole) => {
                mole.element.querySelector("img").style.transform = ("scale(0.0001)")
                roundcountshow();
            })
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

document.addEventListener('mousedown', () => {
    cursor.querySelector("img").style.animation = ("none")
    cursor.querySelector("img").offsetHeight;
    cursor.querySelector("img").style.animation = ("swing 200ms ease-out")
    clickSound.cloneNode(true).play();

    moles.forEach((mole) => {
        if(clickCollision(mole.element.querySelector("img"), cursorhb)) {
            redFilter(mole.element);

            if(mole.state !== "dying" && mole.state !== "bury") {
                clickfx();
                if(!intro) {moleHit(mole)}
            }
            if(teasing) {
                mole.state = "hit";
            }
        }
    })
})

const debugSound = new Audio("audio/hover.mp3")

function moleHit(mole) {
    if(mole.state == "bury" || mole.busy == false) {return;}
    mole.state = "dying";
    debugSound.cloneNode(true).play();
    const moleImg = mole.element.querySelector("img")
    if(moleImg.style.transform !== "scale(0.0001)" && !intro) {
        moleImg.style.transform = ("scale(0.0001)")
        moleImg.addEventListener("transitionend", () => {
            mole.state = "bury";
            mole.busy = false;
        })
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
    " Test Enemy",
    " Anteater"
]
let round = 1;
let score = 0;
function roundcountshow() {
    roundCountText.textContent = (`ROUND ${round}`)
    moleTypeText.textContent = enemyList;
    roundStartWrap.style.display = ("flex")
    roundStartWrap.style.animation = ("balloon-in 1.5s ease forwards")
    setTimeout(() => {
        roundStartWrap.style.animation = ("balloon-out 1.5s ease forwards")
        setTimeout(() => {
            roundStartWrap.style.display = ("none")
            score = 0;
            moles.forEach((mole) => {
                mole.state = "bury";
                mole.busy = false;
            })
            document.querySelectorAll(".moleimgdiv").forEach((moleimg) => {moleimg.style.animation = ("none")})

            gameStart();
        }, 1500)
    }, 3500)
}

let randomMole;

function gameStart() {
    intro = false;
    const interval = setInterval(() => {
        if(score >= 10000) {
            clearInterval(interval)
            return;
        }

        const available = moles.filter(m => !m.busy)
        if(available.length == 0) {return;}
            
        let randomMole = available[Math.floor(Math.random() * available.length)];
        spawnMole(randomMole);
    }, 1800) 
}

function spawnMole(mole) {
    mole.state = "up";
    mole.busy = true;
    const moleImg = mole.element.querySelector("img")
    moleImg.style.transition = "transform 350ms ease"
    moleImg.style.transform = "scale(1)"
    setTimeout(() => {
        moleImg.style.transform = "scale(0.0001)"
        setTimeout(() => {
            mole.busy = false;
            mole.state = "bury";
        }, 350)
    }, Math.random() * 1251 + 700)
}