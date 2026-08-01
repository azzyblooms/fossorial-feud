const startbutton = document.getElementById("startbutton")
const pagetitle = document.getElementById("pagetitle")
const molecontainer = document.getElementById("molecontainer")
const cursor = document.getElementById("cursor")

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
    bonk
]


const clickSound = new Audio('audio/click2.mp3')

const startpageelements = [
    document.getElementById("startbutton"),
    document.getElementById("pagetitle")
]


function tease() {
    molespawns.forEach((element) => {
        element.querySelector("img").style.opacity = ("1")
    })
    console.log(laughs)
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            let currentLaugh = Math.floor(Math.random() * laughs.length)
            let currentMole = Math.floor(Math.random() * molespawns.length)
            laughs[currentLaugh].cloneNode(true).play();
            molespawns[currentMole].querySelector("img").style.animation = ("none")
            molespawns[currentMole].querySelector("img").offsetHeight;
            molespawns[currentMole].querySelector("img").style.animation = ("wiggley 100ms ease")
            console.log(i)
        }, i * Math.random() * 350 + 99)
    }
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




document.addEventListener('mousemove', (event) => {
    cursor.style.left = (`${event.clientX}px`)
    cursor.style.top = (`${event.clientY}px`)
})

document.addEventListener('mousedown', () => {
    cursor.querySelector("img").style.animation = ("none")
    cursor.querySelector("img").offsetHeight;
    cursor.querySelector("img").style.animation = ("swing 200ms ease-out")
    let currentHit = Math.floor(Math.random() * hits.length)
    hits[currentHit].cloneNode(true).play();
    clickSound.play();

    if(clickCollision(molespawn1, cursor)) {
        molespawn1.querySelector("img").style.animation = ("none")
        molespawn1.querySelector("img").offsetHeight
        molespawn1.querySelector("img").style.animation = ("redfilter 400ms ease")
    }
})

function clickCollision(divA, divB) {
    const a = divA.getBoundingClientRect();
    const b = divB.getBoundingClientRect();

    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}