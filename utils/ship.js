const throttle = (f, delay, { leading = false, trailing = false } = {}) => {
    let flag = false
    return (...args) => {
        if (!flag) {
            if (leading) f(...args)
            flag = true
            setTimeout(() => {
                flag = false
                if (trailing && !(leading)) f(...args)
            }, delay)
        }
    }
}

const moveShip =  ()=> {
    ship.element =  document.getElementById('ship')
    if (ship.x>=10 && leftPressed) ship.x-=10
    if (ship.x <= window.innerWidth-56 && rightPressed) ship.x+=10
     ship.element.style.left = `${ship.x}px`
     requestAnimationFrame(moveShip)
}

class Ship {
    constructor(){
        this.x = window.innerWidth/2 -45/2,
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

//argument constructeur owner (qui tire ?)

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

export{throttle,Ship,Projectile}