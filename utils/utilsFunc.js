
const menuInit = ()=> {
    let menu = document.createElement('div')
    menu.style.opacity = '0%'
    menu.id = 'menu'
    menu.style.top = `${(window.innerHeight/2)-150}px`
    let title = document.createElement('h1')
    title.id = 'title'
    title.textContent = 'Menu'
    let resume = document.createElement('button')
    resume.id = 'resume'
    resume.textContent = 'Resume'
    let restart = document.createElement('button')
    restart.id = 'restart'
    restart.textContent = 'Restart'
    menu.appendChild(title)
    menu.appendChild(resume)
    menu.appendChild(restart)
    document.body.appendChild(menu)
    return menu
    }


const randomize = () => {
    let tab = ["./assets/sprite/saucer1b.ico","./assets/sprite/saucer2b.ico","./assets/sprite/saucer3b.ico"]
    let indexRandom = Math.floor(Math.random()*3)
    return tab[indexRandom]
}


export {menuInit,randomize}