/**
 * Allows to obtain the estimated Hz of the primary monitor in the system.
 * 
 * @param {Function} callback The function triggered after obtaining the estimated Hz of the monitor.
 * @param {Boolean} runIndefinitely If set to true, the callback will be triggered indefinitely (for live counter).
 */
function getScreenRefreshRate(callback, runIndefinitely){
    let requestId = null;
    let callbackTriggered = false;
    runIndefinitely = runIndefinitely || false;

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
    }
    
    let DOMHighResTimeStampCollection = [];

    let triggerAnimation = function(DOMHighResTimeStamp){
        DOMHighResTimeStampCollection.unshift(DOMHighResTimeStamp);
        
        if (DOMHighResTimeStampCollection.length > 10) {
            let t0 = DOMHighResTimeStampCollection.pop();
            let fps = Math.floor(1000 * 10 / (DOMHighResTimeStamp - t0));

            if(!callbackTriggered){
                callback.call(undefined, fps, DOMHighResTimeStampCollection);
            }

            if(runIndefinitely){
                callbackTriggered = false;
            }else{
                callbackTriggered = true;
                return DOMHighResTimeStamp
            }
        }
    
        requestId = window.requestAnimationFrame(triggerAnimation);
    };
    
    window.requestAnimationFrame(triggerAnimation);

    // Stop after half second if it shouldn't run indefinitely
    if(!runIndefinitely){
        window.setTimeout(function(){
            window.cancelAnimationFrame(requestId);
            requestId = null;
        }, 500);
    }
}

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
    }

export {getScreenRefreshRate,menuInit}