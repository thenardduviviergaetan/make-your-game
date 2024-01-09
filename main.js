import {Ship,Projectile} from "./utils/ship.js";
import { Wave } from "./utils/enemies.js";
let rightPressed,leftPressed,bulletShot,border
let score = 0
const ship = new Ship
let wave = new Wave(5,20,true)
let game = document.getElementById('game')
game.appendChild(wave.HTML)
await ship.initShip()

document.addEventListener('keydown',  (key)=> {
    if (key.key == 'd' )rightPressed = true
    if (key.key == 'q' )leftPressed = true
    if (key.key == 'Escape'){
        Pause = !Pause
        pauseMenu()
    }
})

document.addEventListener('keyup', (key)=> {
    if (key.key == 'd' ) rightPressed = false
    if (key.key == 'q' ) leftPressed = false
})

const moveShip =  ()=> {
    ship.element =  document.getElementById('ship')
    if (ship.x>=10 && leftPressed) ship.x-=10
    if (ship.x <= window.innerWidth-56 && rightPressed) ship.x+=10
     ship.element.style.left = `${ship.x}px`
}

let bullet = new Projectile(ship)

let projo = await bullet.projectileInit()

const shoot =  ()=> {
    
let invaders = document.querySelectorAll('.invader')
    document.body.appendChild(projo)
    bulletShot = document.getElementById('projectile')
    invaders.forEach(elem=> {
        if (elem != null){
            border = elem.getBoundingClientRect()
        }
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
    } else {
        bulletShot.remove()
        bullet.x=ship.x+21
        bullet.y = ship.y+25
        bulletShot.style.left = `${bullet.x}px`
    }
    bulletShot.style.bottom = `${bullet.y}px`
}





setInterval(() => {
    let scoreCount = document.getElementById('score')
    scoreCount.textContent = `Score : ${score}`
    
    // if (score == 5) {
    //     alert('bien joué !')
    //     score = 0
    // }
}, 100);

const pauseMenu = ()=> {
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
        resume.addEventListener('click', ()=> {
            document.getElementById('menu').remove()
            Pause = !Pause
        })
        let restart = document.createElement('button')
        restart.id = 'restart'
        restart.textContent = 'Restart'
        restart.addEventListener('click',()=> {
            location.reload()
        })

        menu.appendChild(title)
        menu.appendChild(resume)
        menu.appendChild(restart)
        document.body.appendChild(menu) 
    } else {
        if (document.getElementById('menu') !== null)document.getElementById('menu').remove()
    }
}

let Pause = false


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