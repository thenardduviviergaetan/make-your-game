import { wave,Port } from "../main.js"
let border
let score = 0
let explodeSound = new Audio('./assets/explosion.mp3')
explodeSound.volume = 0.2
/**
 * Initialize the entire characteristics of the ship itself
 * @returns {HTMLImageElement} - The ship in a HTML Image Element format
 */
class Ship {
    constructor(){
        this.x = window.innerWidth/2-45/2,
        this.y = 0
        this.HTML = document.createElement('img')
        this.HTML.src = './assets/ship-space.png'
        this.HTML.id = 'ship'
        this.HTML.style.width = '45px'
        this.HTML.style.position = 'absolute'
        this.HTML.style.bottom= `${this.y}px`
        this.HTML.style.transform = `translateX(${this.x}px)`
        }
    
    initShip = async ()=> {
        document.body.appendChild(this.HTML)
    }
}

/**
 * Initialize the location from where the projectile will be shot
 * Initialization of the bullet shot by the ship 
 * @param {Class} owner - The shooter, where the projectile will be shot 
 * @returns {HTMLDivElement} - The projectile foramtted as a div
 */
class Projectile {

    constructor(x,y){
        this.x = x+21
        this.y = y+26
        this.posx = x+21
        this.posy = y+26
        this.HTML =document.createElement('div')
        this.HTML.id ='projectile'
        this.HTML.style.backgroundColor = 'white'
        this.HTML.style.position = 'absolute'
        this.HTML.style.width = '3px'
        this.HTML.style.height = '14px'
        this.HTML.style.transform = `translateX(${this.x}px)`
        this.HTML.style.bottom = `${this.y}px`
    }

/**
 * Handling of the shooting functionnality and of the bullet reaching the target and 'exploding' (removing) it 
 */
    shoot =  ()=> {
         document.body.appendChild(this.HTML)
        //TODO: mettre des sons à boss qui meurt,tir et game over
        let invaders = document.querySelectorAll('.invader')
        if (wave.move) {
            invaders.forEach(elem=> {
                if (elem != null){
                    border = elem.getBoundingClientRect()
                }
                //if the bullet reaches one of the invaders, it removes the bullet and the invader
                if (window.innerHeight-border.bottom <= this.posy && border.right >= this.posx && border.left <= this.posx && window.innerHeight-border.top>=this.posy && elem != null){
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
                    this.posx=this.x+21
                    this.posy = this.y
                }
                this.HTML.style.transform = `translate(${this.posx}px,-${this.posy}px)`
            })
            if (this.posy <= window.innerHeight){
            this.posy+=2.5
            //if the bullet misses and reach the top of the screen 
            }else {
            this.posx=this.x+21
            this.posy =this.y
        }
        this.HTML.style.transform = `translate(${this.posx}px,-${this.posy}px)`
        }
    }
}

export{Ship,Projectile,score}