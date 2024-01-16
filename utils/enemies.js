import { movements } from "../main.js";
import { randomize } from "./utilsFunc.js";
const size = 32;
let nbLine 
let hp = 3
let tabProjectil = new Array()
/**
 * Class Ennemy is all the infos about each invader and boss
 * @param {number} x - X coordinates of each invader
 * @param {number} y - Y coordinates of each invader
 * @param {number} levelsize - The size of the item (1 for the invader and 4 for the boss)
 * @param {string} nameclass - All classes taht you want to add to your HTML element (invader or boss here)
 */
class Ennemy {
    constructor (x,y,levelsize,...nameclass) {
        this.HTML = document.createElement("div");
        nameclass.forEach(element => {
            this.HTML.classList.add(element);
        });
        this.HTML.style.position = "absolute";
        this.texture = document.createElement("img");
        this.texture.src = randomize();
    
        this.texture.width = size*levelsize;
        this.texture.height = size*levelsize;
        this.HTML.appendChild(this.texture);
        this.posx = x;
        this.posy = y;
        this.x = x;
        this.y = y;
        this.HTML.style.top =  this.posy+"px";
        this.HTML.style.left = this.posx+"px";
        this.alive = true;
        this.damage = 1;
        this.size = size*levelsize;
    }
}

/**
 * Wave is the entire wave-to-destroy roaming on the screen
 * @param {number} nbline - The number of lines that the legion has
 * @param {number} nbinvader - The number of unique invader in each line
 * @param {boolean} boss - Whether or not there is a boss in the current wave
 * @returns {Class} - All information about the wave gathered in a class
 */
export class Wave {
    constructor (nbline,nbinvader,boss){
        this.nbline = nbline
        nbLine = nbline
        this.nbinvader = nbinvader
        this.right = true;
        this.legion = new Array();
        this.HTML = document.createElement("div");
        this.HTML.classList.add("wave");
        this.posx = document.getElementById('score').getBoundingClientRect().right;
        this.posy = 0;
        this.HTML.style.position = "absolute"
        this.HTML.style.top =  this.posy+"px";
        this.HTML.style.transform = `translateX(${this.posx}px)`
        let index = 0;
        this.boss = boss;
        this.move = true

        /** set bosses information if the @param {boolean} boss is set to true  */  
        if (this.boss === true) {
            
            index = 4;
            nbline += 4;
            let boss = new Ennemy((nbinvader/2-2)*size,0*size,4,"invader","boss");
            this.legion.push(boss);
            this.HTML.appendChild(boss.HTML);
        }
        // handles the storage of each line of invaders in an array named legion
        for (index;index < nbline;index++) {
            let line = new(Array);
            let htmlline = document.createElement("div");
            htmlline.classList.add("line");
            for (let invader = 0; invader < nbinvader;invader++){
                let ennemy = new Ennemy(size*invader,index*size,1,"invader");
                htmlline.appendChild(ennemy.HTML);
                line.push(ennemy);

            }
            this.legion.push(line);
            this.HTML.appendChild(htmlline);
        }
    }

    /**
     * Handles the 'tick' of the entire legion across the screen, once it has reached the border of the screen,
     * it goes down a certain number of pixels and continue its route until it reaches the dead line, then its Game Over
    */

    overinit(){
        let over = document.createElement('img')
            over.src = './assets/game-over.png'
            over.id = 'over'
            over.style.opacity = '0%'
            document.body.appendChild(over)
    }
    
   //TODO: faire un valeur de descente et de déplacement dynamique
   tick(){
        if (!this.move) {
            return
        }
        document.getElementById('hp').textContent = `Hp : ${hp}`
        if (this.posy + size >= 500 || this.boss && this.posy + size*4 >= 500 || hp == 0){
            document.getElementById('over')
            setInterval(() => {
                over.style.transform = 'scale(0.8)'
                over.style.transition = '500ms'
                setTimeout(()=> {
                    over.style.transform = 'scale(1)'
                    over.style.backgroundColor = 'red'
                    over.style.transitionProperty ='transform,background-color'
                    over.style.transitionDuration = '500ms,'
                },250)
                setTimeout(()=> {
                    over.style.transform = 'scale(0.8)'
                    over.style.backgroundColor = ''
                    over.style.transitionProperty ='transform,background-color'
                    over.style.transitionDuration = '500ms,200ms'
                },500)
            }, 500);
            return true
        }
        if (this.posx+2*size >= window.innerWidth-(this.nbinvader-2)*size || this.posx < document.getElementById('score').getBoundingClientRect().right){
            this.right = !this.right
            this.posy += 10
        }
        this.posx += this.right ? movements[1] : -movements[1]
        this.HTML.style.transform = `translate(${this.posx}px,${this.posy}px)`
        let invaders = document.querySelectorAll('.invader')
        if (tabProjectil.length < 5 && tabProjectil.length < invaders.length ){
            let random = Math.random() * 100
            while (random > invaders.length){
                random -= invaders.length
            }
            random = random.toFixed(0)
                let element = invaders[random]
                if (element !== undefined && !element.classList.contains("boss")){
                    let projectile = new InvaderProjectile(element.getBoundingClientRect().x,element.getBoundingClientRect().y)
                    tabProjectil.push(projectile)
                    document.body.appendChild(projectile.HTML)
                }
        }
        tabProjectil.forEach(element => {
            if(element.tick()){
                tabProjectil.splice(tabProjectil.indexOf(element),1);
            }
        });

    }
}

/**
 * Initialize the location from where the projectile will be shot
 * @param {Class} posx - The shooter, where the projectile will be shot 
 * @param {Class} posy - The shooter, where the projectile will be shot 
 * @returns {HTMLDivElement} - The projectile foramtted as a div
 */
class InvaderProjectile {
    constructor(posx,posy){
        this.x = posx+size/2
        this.y = posy - (size/2)*nbLine
        this.HTML = document.createElement('div')
        this.HTML.classList.add("invader-projectile")
        this.HTML.style.backgroundColor = 'red'
        this.HTML.style.position = 'absolute'
        this.HTML.style.width = '3px'
        this.HTML.style.height = '14px'
        this.HTML.style.transform = `translateX(${this.x}px)`
    }

    tick() {
        this.y += movements[2]
        this.HTML.style.transform = `translate(${this.x}px,${this.y}px)`
        let ship = document.getElementById('ship')
        let border = ship.getBoundingClientRect()
        if (this.y >= window.innerHeight){
            this.HTML.remove()
            return true
        } else if (border.y +10 >= this.y && border.y-110<= this.y && border.x+50 >= this.x && this.x >= border.x -5 && !ship.classList.contains('god') ) {
            ship.classList.toggle('god')
            hp--
            this.HTML.remove()
            ship.style.opacity = '0%'
            setTimeout(() => {
                ship.style.opacity = '100%'
                    setTimeout(() => {
                        ship.style.opacity = '0%'
                            setTimeout(() => {
                            ship.style.opacity = '100%'
                            ship.classList.toggle('god')
                        }, 250);
                    }, 250);
            }, 200);
            return true
        }
    }
}