const size = 32;
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
            this.HTML.classList.add(element)
        });
        this.HTML.style.position = "absolute";
        this.texture = document.createElement("img");
        this.texture.src = "./assets/alien.png";
        this.texture.width = size*levelsize;
        this.texture.height = size*levelsize;
        this.HTML.appendChild(this.texture);
        this.posx = x;
        this.posy = y;
        this.HTML.style.top =  this.posy+"px";
        this.HTML.style.left = this.posx+"px";
        this.alive = true;
        this.damage = 1;
        this.size = size*levelsize;
    }

    
    // Handles the dynamics coordinates of each invaders
    tick(lx,ly){
        this.HTML.style.top =  ly + this.posy+"px";
        this.HTML.style.left = lx + this.posx+"px";
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
        this.nbinvader = nbinvader
        this.right = true;
        this.legion = new Array();
        this.HTML = document.createElement("div");
        this.HTML.classList.add("wave");
        this.posx = document.getElementById('score').getBoundingClientRect().right;
        this.posy = 0;
        this.HTML.style.top =  this.posy+"px";
        this.HTML.style.left = this.posx+"px";
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

   //TODO: faire un valeur de descente et de déplacement dynamique
   //TODO: faire une bprder confinée pour laisser une place à notre scoreboard
   tick(){
    if (!this.move) {
        return
    }
        if (this.posy + size >= 500 || this.boss && this.posy + size*4 >= 500){
            let over = document.createElement('img')
            over.src = './assets/game-over.png'
            over.id = 'over'
            document.body.appendChild(over)
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
        if (this.posx+2*size >= window.innerWidth-(this.nbinvader-2)*size){
            this.right = false
            this.posy += 10
            this.HTML.style.top =  this.posy+"px";
        }else if (this.posx <= document.getElementById('score').getBoundingClientRect().right){
            this.right = true
            this.posy += 10
            this.HTML.style.top =  this.posy+"px";
        }
        if (this.right){
            this.posx += 0.5; //LE MAX DE VITESSE C 20 SINON C INJOUABLE
            this.HTML.style.left = this.posx+"px";
        }else {
            this.posx -= 0.5; 
            this.HTML.style.left = this.posx+"px";
        }
        this.legion.forEach((element) => {
            if (Array.isArray(element)){
                element.forEach((lineelement) => {
                    lineelement.tick(this.posx,this.posy)
                })
            }else{
                element.tick(this.posx,this.posy)
            }
        });
    }
}
