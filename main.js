import {Ship,Projectile} from "./utils/ship.js";
import { Wave } from "./utils/enemies.js";
import {loadScreen,bool} from "./utils/loadingScreen.js";
import { getScreenRefreshRate } from "./utils/requestHz.js";
//TODO: FAIRE DES BONUS DE RAPID FIRE (on rajoute des shoot()) et rapid movement on rajoute des moveship() ET UN KONAMI CODE
//TODO: mettre 3 vies
//** Initialization of all the global variables */
let Pause = false
let rightPressed,leftPressed,bulletShot,border
let movements = []
let score = 0
let waveNb = 1
let ship = new Ship
let wave = new Wave(5,14,true)
const Port = "5500"
let audio = new Audio('./assets/music.mp3')
let explodeSound = new Audio('./assets/explosion.mp3')
let shotSound = new Audio('./assets/shot.mp3')
explodeSound.volume = 0.2

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
const moveShip =  ()=> {
    if (!wave.move) return
    ship.HTML =  document.getElementById('ship')
    if (ship.x>=document.getElementById('score').getBoundingClientRect().right && leftPressed) ship.x-=1.5
    if (ship.x <= window.innerWidth-56 && rightPressed) ship.x+=1.5
     ship.HTML.style.transform = `translateX(${ship.x}px)`
}

/** Initialization of the bullet shot by the ship */
let bullet = new Projectile(ship)
await bullet.projectileInit()
/**
 * Handling of the shooting functionnality and of the bullet reaching the target and 'exploding' (removing) it 
 */
// let sound = new Audio('./assets/shot.mp3')
// explodeSound.load()
// explodeSound.play()
const shoot =  ()=> {
    //TODO: mettre des sons à boss qui meurt,tir et game over
    let invaders = document.querySelectorAll('.invader')
    bulletShot = document.getElementById('projectile')
    if (wave.move) {
        invaders.forEach(elem=> {
            if (elem != null){
                border = elem.getBoundingClientRect()
            }
            //if the bullet reaches one of the invaders, it removes the bullet and the invader
            if (window.innerHeight-border.bottom <= bullet.y && border.right >= bullet.x && border.left <= bullet.x && window.innerHeight-border.top>=bullet.y && elem != null){
                if (elem.classList.contains('boss')){
                    if (elem.querySelector('img').src == `http://127.0.0.1:${Port}/assets/alien.png`){
                        score+=5 
                        explodeSound.load()
                        explodeSound.play()
                        }
                    elem.querySelector('img').src = './assets/Explosion.png'
                    setTimeout(() => {
                        elem.remove()
                    }, 250);
                }else {
                    if (elem.querySelector('img').src == `http://127.0.0.1:${Port}/assets/alien.png`){
                        score++ 
                         explodeSound.load()
                         explodeSound.play()
                       }
                    elem.querySelector('img').src = './assets/Explosion.png'
                    setTimeout(() => {
                        elem.remove()
                    }, 250);
                } 
                bullet.x=ship.x+21
                // bulletShot.style.transform = `translateX(${bullet.x}px)`
                bullet.y = ship.y+25
            }
            bulletShot.style.transform = `translate(${bullet.x}px,-${bullet.y}px)`
        })
        if (bullet.y <= window.innerHeight){
        bullet.y+=2.5
        //if the bullet misses and reach the top of the screen 
        }else {
        bullet.x=ship.x+21
        bullet.y =ship.y+25
    }
    bulletShot.style.transform = `translate(${bullet.x}px,-${bullet.y}px)`
    }
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
// tout mettre en dans les constructors
/**
 * Handles the 'Pause' functionnality where there is a 'Resume' and 'Restart' choices
 */
const pauseMenu = ()=> {
    // it "asks" to the listener above if the escape key has been pressed, if it pressed then it enters in this condition block 
    if (Pause) {
        audio.pause()
        let menu = document.createElement('div')
        menu.id = 'menu'
        menu.style.top = `${(window.innerHeight/2)-150}px`
        let title = document.createElement('h1')
        title.id = 'title'
        title.textContent = 'Menu'

        let resume = document.createElement('button')
        resume.id = 'resume'
        resume.textContent = 'Resume'
        // listener for the clickable button Resume, it inverts the value of Pause boolean, works like a 'toggle' for the pause menu to showup
        resume.addEventListener('click', ()=> {
            document.getElementById('menu').remove()
            Pause = !Pause
            audio.play()
        })
        let restart = document.createElement('button')
        restart.id = 'restart'
        restart.textContent = 'Restart'

        // listener for the clickable button Restart, it refresh the wave to a freshly new, and reset all timers and score
        restart.addEventListener('click',()=> {
            document.getElementById('menu').remove()
            if (document.getElementById('over') != null)document.getElementById('over').remove()
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

        menu.appendChild(title)
        menu.appendChild(resume)
        menu.appendChild(restart)
        document.body.appendChild(menu) 
        return menu
        // if we were already on pause, it delete the menu to resume the current game 
    } else {
        audio.play()
        if (document.getElementById('menu') !== null)document.getElementById('menu').remove()
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
    for (let rep = 0; rep < 1; rep++) shoot();
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