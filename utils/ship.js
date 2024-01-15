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
 * @param {Class} owner - The shooter, where the projectile will be shot 
 * @returns {HTMLDivElement} - The projectile foramtted as a div
 */
class Projectile {
    constructor(owner){
        this.x = owner.x+21
        this.y = owner.y+26
        this.HTML =document.createElement('div')
        this.y = 10
        this.HTML.id ='projectile'
        this.HTML.style.backgroundColor = 'white'
        this.HTML.style.position = 'absolute'
        this.HTML.style.width = '3px'
        this.HTML.style.height = '14px'
        this.HTML.style.transform = `translateX(${this.x}px)`
        this.HTML.style.bottom = `${this.y}px`
    }

    projectileInit =  async ()=> {
        document.body.appendChild(this.HTML)
    }
}

export{Ship,Projectile}