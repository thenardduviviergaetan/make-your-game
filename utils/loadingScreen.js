
let w = 0
let bool1 = false
let bool = false
const loadScreen = (Pause)=> {
    
    let loadAll = document.createElement('div')
    loadAll.classList.add('containerLoad')
    let load = document.createElement('div')
    load.id = 'load'
    load.style.width = `100%`
    load.style.height = `100%`
    let text = document.createElement('p')
    text.textContent = 'Reloading nuclear weapons' //déclassification des dossier de la Zone51 TODO: faire un fichier txt pour le lire
    text.style.fontWeight= 'bold'
    let bar = document.createElement('div')
    bar.id = 'bar'
    let loading = document.createElement('div')
    loading.id = 'loading'
    let play = document.createElement('button')
    play.id='play'
    play.textContent = 'Play !'
    play.style.display = 'none'
    let check = setInterval(() => {
        loading.style.width = `${w}px`
        loading.style.transition = '2500ms'
        w+=100
        if (loading.style.width == '800px') {
            play.style.display = ''
            bool1 = true
            clearInterval(check)
        }
    }, 600);
    bar.appendChild(loading)
    load.appendChild(text)
    load.appendChild(bar)
    load.appendChild(play)
    loadAll.appendChild(load)
    document.body.appendChild(loadAll)
    
    return !Pause
}

let i = setInterval(() => {
    if (bool1) {
        document.getElementById('play').addEventListener('click', ()=> {
            bool = true
            clearInterval(i)
        })
    }
}, 100);

export {loadScreen,bool}