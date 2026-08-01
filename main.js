const startbutton = document.getElementById("startbutton")
const pagetitle = document.getElementById("pagetitle")
const molecontainer = document.getElementById("molecontainer")

const molespawn1 = document.getElementById("molespawn1")
const molespawn2 = document.getElementById("molespawn2")
const molespawn3 = document.getElementById("molespawn3")
const molespawn4 = document.getElementById("molespawn4")

const laugh1 = new Audio("audio/laughs/laugh1.mp3")
const laugh2 = new Audio("audio/laughs/laugh2.mp3")
const laugh3 = new Audio("audio/laughs/laugh3.mp3")
const laugh4 = new Audio("audio/laughs/laugh4.mp3")
const heheheha = new Audio("audio/laughs/heheheha.mp3")


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


const clickSound = new Audio('audio/click2.mp3')

const startpageelements = [
    document.getElementById("startbutton"),
    document.getElementById("pagetitle")
]


function tease() {
    molespawns.forEach((element) => {
        element.style.backgroundImage = ("url(images/mole.png)")
    })
    console.log(laughs)
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            let currentLaugh = Math.floor(Math.random() * laughs.length)
            let currentMole = Math.floor(Math.random() * molespawns.length)
            laughs[currentLaugh].cloneNode(true).play();
            molespawns[currentMole].style.animation = ("wiggley 100ms ease")
            console.log(i)
        }, i * Math.random() * 350 + 99)
    }
}

startbutton.addEventListener('mousedown', () => {
    clickSound.cloneNode(true).play();
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
