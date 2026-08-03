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


const molespawns = [
    document.getElementById("molespawn1"),
    document.getElementById("molespawn2"),
    document.getElementById("molespawn3"),
    document.getElementById("molespawn4")
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
    if(!teasing) {
        grr();
        return;
    }

    molespawns.forEach((element) => {
        element.querySelector("img").style.opacity = ("1")
    })
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {

            
            const activemoles = [];

            if (mole1state == "ok") activemoles.push(molespawn1)
            if (mole2state == "ok") activemoles.push(molespawn2)
            if (mole3state == "ok") activemoles.push(molespawn3)
            if (mole4state == "ok") activemoles.push(molespawn4)
                
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

            let currentMole = molespawns[Math.floor(Math.random() * molespawns.length)];

            const growl = grrr.cloneNode(true);
            growl.playbackRate = Math.random() * 1.4 + 0.6;
            growl.preservesPitch = false;
            console.log(growl.playbackRate)
            growl.play();
            currentMole.querySelector("img").style.animation = ("none")
            currentMole.querySelector("img").offsetHeight;
            currentMole.querySelector("img").style.animation = ("wigglex 100ms ease")
            document.querySelectorAll(".moleimgdiv").forEach((moleimg) => {moleimg.style.animation = ("redfilter 500ms ease reverse forwards")})
        }, i * Math.random() * 350 + 99)
        setTimeout(() => {
            molespawns.forEach((element) => {
                element.querySelector("img").style.transform = ("scale(0.0001)")
                roundcountshow();
            })
        }, 2500)
        }
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

let mole1state = "ok";
let mole2state = "ok";
let mole3state = "ok";
let mole4state = "ok";


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
    let currentHit = Math.floor(Math.random() * hits.length)
    hits[currentHit].cloneNode(true).play();
    clickSound.play();

    if(clickCollision(molespawn1.querySelector("img"), cursorhb)) {
        redFilter(molespawn1);

        //debug only
        cursorhb.style.animation = ("none")
        cursorhb.offsetHeight;
        cursorhb.style.animation = ("debugflicker 400ms ease")
        if(teasing) {
            mole1state = "hit";
        }
    }
    if(clickCollision(molespawn2.querySelector("img"), cursorhb)) {
        redFilter(molespawn2);

        //debug only

        cursorhb.style.animation = ("none")
        cursorhb.offsetHeight;
        cursorhb.style.animation = ("debugflicker 400ms ease")
        if(teasing) {
            mole2state = "hit";
        }
    }
    if(clickCollision(molespawn3.querySelector("img"), cursorhb)) {
        redFilter(molespawn3);

        //debug only

        cursorhb.style.animation = ("none")
        cursorhb.offsetHeight;
        cursorhb.style.animation = ("debugflicker 400ms ease")
        if(teasing) {
            mole3state = "hit";
        }
    }
    if(clickCollision(molespawn4.querySelector("img"), cursorhb)) {
        redFilter(molespawn4);

        //debug only

        cursorhb.style.animation = ("none")
        cursorhb.offsetHeight;
        cursorhb.style.animation = ("debugflicker 400ms ease")
        if(teasing) {
            mole4state = "hit";
        }
    }
})

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

function roundcountshow() {
    roundCountText.textContent = (`ROUND ${round}`)
    moleTypeText.textContent = [enemyList]
    roundStartWrap.style.display = ("flex")
    roundStartWrap.style.animation = ("balloon-in 1.5s ease forwards")
    setTimeout(() => {
        roundStartWrap.style.animation = ("balloon-out 1.5s ease forwards")
        setTimeout(() => {
            roundStartWrap.style.display = ("none")
        }, 1500)
    }, 3500)
}