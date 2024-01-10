import {Ship,Projectile} from "./utils/ship.js";
import { Wave } from "./utils/enemies.js";

//** Initialization of all the global variables */
let rightPressed,leftPressed,bulletShot,border
let score = 0
let Pause = false
const ship = new Ship
let wave = new Wave(5,10,true)


let game = document.getElementById('game')
game.appendChild(wave.HTML)

/**The initialization of the moving ship */
await ship.initShip()

//** Listener for the key pressed */
document.addEventListener('keydown',  (key)=> {
    if (key.key == 'd' )rightPressed = true
    if (key.key == 'q' )leftPressed = true
    if (key.key == 'Escape'){
        Pause = !Pause
        pauseMenu()
    }
})

//** Listener for the key released */
document.addEventListener('keyup', (key)=> {
    if (key.key == 'd' ) rightPressed = false
    if (key.key == 'q' ) leftPressed = false
})


/**
 * A function that handles X coordinates of the ship
 */
const moveShip =  ()=> {
    ship.element =  document.getElementById('ship')
    if (ship.x>=10 && leftPressed) ship.x-=10
    if (ship.x <= window.innerWidth-56 && rightPressed) ship.x+=10
     ship.element.style.left = `${ship.x}px`
}

/** Initialization of the bullet shot by the ship */
let bullet = new Projectile(ship)
let projo = await bullet.projectileInit()


/**
 * Handling of the shooting functionnality and of the bullet reaching the target and 'exploding' (removing) it 
 */
const shoot =  ()=> {
    
let invaders = document.querySelectorAll('.invader')
    document.body.appendChild(projo)
    bulletShot = document.getElementById('projectile')
    invaders.forEach(elem=> {
        if (elem != null){
            border = elem.getBoundingClientRect()
        }
        //if the bullet reaches one of the invaders, it removes the bullet and the invader
        if (window.innerHeight-border.bottom <= bullet.y && border.right >= bullet.x && border.left <= bullet.x && window.innerHeight-border.top>=bullet.y && elem != null){
            elem.remove()
            bulletShot.remove()
            bullet.x=ship.x+21
            bulletShot.style.left = `${bullet.x}px`
            bullet.y = ship.y+25
            if (elem.classList.contains('boss')) score+=5
            else score++
        }
    })
    if (bulletShot.style.bottom.slice(0,-2) <= window.innerHeight){
        bullet.y+=10
        //if the bullet misses and reach the top of the screen 
    } else {
        bulletShot.remove()
        bullet.x=ship.x+21
        bullet.y = ship.y+25
        bulletShot.style.left = `${bullet.x}px`
    }
    bulletShot.style.bottom = `${bullet.y}px`
}




/** Handles the automatic refresh of the score */
setInterval(() => {
    let scoreCount = document.getElementById('score')
    scoreCount.textContent = `Score : ${score}`
    
    if (score == (wave.nbinvader*wave.nbline)+5) {
        prompt('Bien joué ! Entrez votre pseudo')
        score = 0
        location.reload()
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
        }
    }, 10);
}
timer()

/**
 * Handles the 'Pause' functionnality where there is a 'Resume' and 'Restart' choices
 */
const pauseMenu = ()=> {
    // it "asks" to the listener above if the escape key has been pressed, if it pressed then it enters in this condition block 
    if (Pause) {
        let menu = document.createElement('div')
        menu.id = 'menu'
        menu.style.left = `${(window.innerWidth/2)-250}px`
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
        })
        let restart = document.createElement('button')
        restart.id = 'restart'
        restart.textContent = 'Restart'

        // listener for the clickable button Restart, it reloads the page, and start a fresh new game
        restart.addEventListener('click',()=> {
            location.reload()
        })

        menu.appendChild(title)
        menu.appendChild(resume)
        menu.appendChild(restart)
        document.body.appendChild(menu) 
        // if we were already on pause, it delete the menu to resume the current game 
    } else {
        if (document.getElementById('menu') !== null)document.getElementById('menu').remove()
    }
}

/** 
 * Handles the launch of the entire program, with the 60 fps functionnality without any framerate dropping 
 * */
function Game(){
    if (!Pause) {
        // console.log(window.innerHeight,window.innerWidth)
        wave.tick()
        shoot()
        moveShip()
    }
    requestAnimationFrame(Game)
}
Game()