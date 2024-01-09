
const size = 32;

class Ennemy {
    constructor (x,y,levelsize,...nameclass) {
        this.HTML = document.createElement("div");
        nameclass.forEach(element => {
            this.HTML.classList.add(element)
        });
        this.HTML.style.position = "absolute";
        // this.HTML.style.background="black";
        this.texture = document.createElement("img");
        this.texture.src = "./assets/alien.png";
        this.texture.width = size*levelsize;
        this.texture.height = size*levelsize;
        this.HTML.appendChild(this.texture);
        // this.HTML.style.backgroundImage = "../../image/spaceinvader/invader-white.png";
        this.posx = x;
        this.posy = y;
        this.HTML.style.top =  this.posy+"px";
        this.HTML.style.left = this.posx+"px";
        this.alive = true;
        this.damage = 1;
        this.size = size*levelsize;
    }

    tick(lx,ly){
        this.HTML.style.top =  ly + this.posy+"px";
        this.HTML.style.left = lx + this.posx+"px";
    }
}

export class Wave {
    constructor (nbline,nbinvader,boss){
        // this.length = nbinvader*size/2
        this.right = true;
        this.legion = new Array();
        this.HTML = document.createElement("div");
        this.HTML.classList.add("wave");
        this.posx = 0;
        this.posy = 0;
        this.HTML.style.top =  this.posy+"px";
        this.HTML.style.left = this.posx+"px";
        let index = 0;
        this.boss = boss;
        if (this.boss === true) {
            index = 4;
            nbline += 4;
            let boss = new Ennemy((nbinvader/2-2)*size,0*size,4,"invader","boss");
            this.legion.push(boss);
            this.HTML.appendChild(boss.HTML);
        }
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

    tick(){
        // console.log(this.length);
        if (this.posy + size >= 500 || this.boss && this.posy + size*4 >= 500){
            return
        }
        // if (this.posx+ this.length >= 250){
        if (this.posx+2*size >= window.innerWidth-8*size){
            this.right = false
            this.posy += 50
            this.HTML.style.top =  this.posy+"px";
        }else if (this.posx == 0){
            this.right = true
            this.posy += 50
            this.HTML.style.top =  this.posy+"px";
        }
        if (this.right){
            this.posx += 2;
            // this.posy += 10;
            this.HTML.style.left = this.posx+"px";
        }else {
            this.posx -= 2;
            // this.posy += 10;
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
