let w = 0
let bool = false
const loadScreen = (Pause)=> {
    let load = document.createElement('div')
    load.id = 'load'
    load.style.width = `${window.innerWidth}px`
    load.style.height = `${window.innerHeight}px`
    let text = document.createElement('p')
    text.textContent = 'Reloading nuclear weapons'
    let bar = document.createElement('div')
    bar.id = 'bar'
    let loading = document.createElement('div')
    loading.id = 'loading'
    let check = setInterval(() => {
        loading.style.width = `${w}px`
        w+=100
        if (loading.style.width == '600px') {
            bool = true
            clearInterval(check)
        }
    }, 600);
    bar.appendChild(loading)
    load.appendChild(bar)
    document.body.appendChild(load)
    return !Pause
}



export {loadScreen,bool}