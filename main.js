import {Ship,Projectile} from "./utils/utils.js";
import { Wave } from "./utils/enemies.js";
let rightPressed,leftPressed,bulletShot,border
let score = 0
const ship = new Ship
let wave = new Wave(5,10,true)
let game = document.getElementById('game')
game.appendChild(wave.HTML)
await ship.initShip()

document.addEventListener('keydown',  (key)=> {
    if (key.key == 'd' )rightPressed = true
    if (key.key == 'q' )leftPressed = true
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
     requestAnimationFrame(moveShip)
}

moveShip()

let bullet = new Projectile(ship)
//FIXME: this.x ne marche pas ????

let projo = await bullet.projectileInit()

const shoot =  ()=> {
    
let invaders = document.querySelectorAll('.invader')
    document.body.appendChild(projo)
    bulletShot = document.getElementById('projectile')
    //FIXME: TOUT SYNCHRO CAR PB DE HITBOX
   
    if (invaders.length == 0){
        let W = document.createElement('h1')
            W.style.width='500px'
            W.style.fontSize = '50px'
            W.style.color = 'white'
            W.textContent= 'YOU WON !'
            document.body.appendChild(W)
            return
    }
    invaders.forEach(elem=> {
        if (elem != null){
            border = elem.getBoundingClientRect()
        }

        if (window.innerHeight-border.bottom <= bullet.y && border.right >= bullet.x && border.left <= bullet.x && elem != null){
            console.log(bullet.x)
            console.log('shooté')
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
        //FIXME: PROBLEME DE HITBOX ICI
    }
    bulletShot.style.bottom = `${bullet.y}px`
    requestAnimationFrame(shoot)
}

setInterval(() => {
    if (!bulletShot) shoot()
}, 200);





setInterval(() => {
    let scoreCount = document.getElementById('score')
    scoreCount.textContent = `score : ${score}`
    
    // if (score == 5) {
    //     alert('bien joué !')
    //     score = 0
    // }
}, 100);





function Game(){
    // if (!Pause) {
        // console.log(window.innerHeight,window.innerWidth)
        wave.tick()
    // }
    requestAnimationFrame(Game)
}
Game()