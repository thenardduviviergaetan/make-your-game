import {Ship,Projectile,score} from "./utils/ship.js";
import { Wave } from "./utils/enemies.js";
import { getScreenRefreshRate,menuInit, randomize } from "./utils/utilsFunc.js";
//TODO: FAIRE DES BONUS DE RAPID FIRE (on rajoute des shoot()) et rapid movement on rajoute des moveship() ET UN KONAMI CODE
//TODO: mettre 3 vies
//** Initialization of all the global variables */
let Pause = false
let rightPressed,leftPressed
// let movements = []
let waveNb = 1
let ship = new Ship
let wave = new Wave(5,14,true)
const Port = "5500"
let audio = new Audio('./assets/music.mp3')
audio.volume =0.5
audio.play()
let shotSound = new Audio('./assets/shot.mp3')

// const hertzChecker =  ()=> {
//     let movementShip,movementWave
//     getScreenRefreshRate(function(Hz){
//         if (Hz >= 50 && Hz <= 60) {
//             setTimeout(() => {
//                 movementShip = 10
//                 movementWave = 2
//             }, 250);
//         }
//         if (Hz >= 110 && Hz <= 165) {
//             setTimeout(() => {
//                 movementShip = 7
//                 movementWave = 1
//             }, 250);
//         }
//         if (Hz >= 230 && Hz <= 240) {
//             setTimeout(() => {
//                 movementShip = 2.5
//                 movementWave = 0.5
//             }, 250);
//         }
//     },false)
//     let int = setInterval(() => {
//         if (movementShip !== undefined && movementWave !== undefined) {
//             movements.push(movementShip)
//             movements.push(movementWave)
//             audio.loop = true
//         audio.volume =0.5
//         audio.play()
    
//         Pause = !Pause
//         if (document.getElementById('load') != null) document.getElementById('load').remove()
//             Game()
//             clearInterval(int)
//         }
//     }, 1);
// }

// Pause = loadScreen(Pause)

/**
 * @returns {Array}
 */

let game = document.getElementById('game')
game.appendChild(wave.HTML)

/**The initialization of the moving ship */
await ship.initShip()

//** Listener for the key pressed */
document.addEventListener('keydown',  (key)=> {
    if (key.key == 'd' )rightPressed = true
    if (key.key == 'q' )leftPressed = true
    if (key.key == 'D' )rightPressed = true
    if (key.key == 'Q' )leftPressed = true
    if (key.key == 'Escape'){
        Pause = !Pause
        pauseMenu()
    }
})

//** Listener for the key released */
document.addEventListener('keyup', (key)=> {
    if (key.key == 'd' ) rightPressed = false
    if (key.key == 'q' ) leftPressed = false
    if (key.key == 'D' ) rightPressed = false
    if (key.key == 'Q' ) leftPressed = false
})


/**
 * A function that handles X coordinates of the ship
 */

let bullet = new Projectile(ship.x,ship.y)
const moveShip =  ()=> {
    if (!wave.move) return
    ship.HTML =  document.getElementById('ship')
    if (ship.x>=document.getElementById('score').getBoundingClientRect().right && leftPressed) ship.x-=1.5
    if (ship.x <= window.innerWidth-56 && rightPressed) ship.x+=1.5
    bullet.x = ship.x
     ship.HTML.style.transform = `translateX(${ship.x}px)`
}

/** Handles the automatic refresh of the score */
setInterval(() => {
    let scoreCount = document.getElementById('score')
    scoreCount.textContent = `Score : ${score}`
    let waveCount = document.getElementById('wavenb')
    waveCount.textContent = `Wave : ${waveNb}`
    if (Pause){
        wave.move = false
    } else {
        wave.move = true
    }
}, 100);


/** Handles the timer with a precision of 10 milliseconds */

let min=0,sec=0,milli=0
const timer = ()=> {
    setInterval(() => {
        if (!Pause) {
        milli +=10
        if (milli == 1000) {
            sec++
            milli = 0
        }
        if (sec == 60){
            min++
            sec = 0
        }

            let timerStamp = document.getElementById('timer')
            timerStamp.textContent = `Time played : ${min}'${sec}"${milli}`
            if (window.innerWidth < 1000) {
                timerStamp.style.fontSize = 'small'
                document.getElementById('score').style.fontSize = 'small'
                document.getElementById('wavenb').style.fontSize = 'small'
            } else {
                timerStamp.style.fontSize = 'large'
                document.getElementById('score').style.fontSize = 'large'
                document.getElementById('wavenb').style.fontSize = 'large'
            }
        }
    }, 10);
}
timer()
//TODO: POUR LIMITER RENDERING ET PAINTING document.createDocumentFragment()
/**
 * Handles the 'Pause' functionnality where there is a 'Resume' and 'Restart' choices
 */

menuInit()
const pauseMenu = ()=> {
    // it "asks" to the listener above if the escape key has been pressed, if it pressed then it enters in this condition block 
    if (Pause) {
        document.getElementById('menu').style.opacity = '100%'
        audio.pause()
        // listener for the clickable button Resume, it inverts the value of Pause boolean, works like a 'toggle' for the pause menu to showup
        document.getElementById('resume').addEventListener('click', ()=> {
            document.getElementById('menu').style.opacity = '0%'
            Pause = !Pause
            audio.play()
        })

        // listener for the clickable button Restart, it refresh the wave to a freshly new, and reset all timers and score
        document.getElementById('restart').addEventListener('click',()=> {
            document.getElementById('menu').style.opacity = '0%'
            if (document.getElementById('over') != null)document.getElementById('over').style.opacity = '0%'
            wave = new Wave(5,14,true)
            game.removeChild(game.firstChild)
            game.appendChild(wave.HTML)
            min=0,sec=0,milli=0
            score = 0
            waveNb = 1
            Pause = !Pause
            audio.load()
            audio.play()
        })
        return menu
        // if we were already on pause, it delete the menu to resume the current game 
    } else {
        audio.play()
        if (document.getElementById('menu') !== null)document.getElementById('menu').style.opacity = '0%'
    }
}

/** 
 * Handles the launch of the entire program, with the 60 fps functionnality without any framerate dropping 
*/
function Game(){
    // if this is a game over
    if (wave.tick()){
        Pause = !Pause
        pauseMenu().removeChild(document.getElementById('resume'))
    }
    
    let invaders = document.querySelectorAll('.invader')
    if (invaders.length == 0){
        waveNb++
        wave = new Wave(5,14,true)
        game.removeChild(game.firstChild)
        game.appendChild(wave.HTML)
    }
    //for testing only
    for (let rep = 0; rep < 1; rep++) bullet.shoot();
    for (let rep = 0; rep < 1; rep++) moveShip()
    requestAnimationFrame(Game)
}
Game()
// let loaded = setInterval(() => {
//     if (bool){
//         // hertzChecker()
//         audio.loop = true
//                 audio.volume =0.5
//                 audio.play()
//                 Pause = !Pause
//                 if (document.getElementById('load') != null) document.getElementById('load').remove()
//                 Game()
//         clearInterval(loaded)}
// }, 100);

// setInterval(() => {
//     console.log(ship.x)
// },500);

// export {movements}
export {wave,Port}