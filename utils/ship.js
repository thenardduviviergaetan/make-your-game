/**
 * Initialize the entire characteristics of the ship itself
 * @returns {HTMLImageElement} - The ship in a HTML Image Element format
 */
class Ship {
    constructor(){
        this.x = window.innerWidth/2-45/2,
        this.y = 0
        this.element 
        }
    
    initShip = async ()=> {
        let ship = document.createElement('img')
        ship.src = './assets/ship-space.png'
        ship.id = 'ship'
        ship.style.width = '45px'
        ship.style.position = 'absolute'
        ship.style.bottom= `${this.y}`
        ship.style.left = `${this.x}px`
        document.body.appendChild(ship)
       return ship
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
    }

    projectileInit =  async ()=> {
        let projectile = document.createElement('div')
        this.y = 10
        projectile.id ='projectile'
        projectile.style.backgroundColor = 'white'
        projectile.style.position = 'absolute'
        projectile.style.width = '3px'
        projectile.style.height = '14px'
        projectile.style.left = `${this.x}px`
        projectile.style.bottom = `${this.y}px`
        return projectile
    }
}

export{Ship,Projectile}