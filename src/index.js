import React from 'react'
import { render } from 'react-dom'
import App from './App'

// work-around com setTimeout
window.animationFrame = (function(){
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

const root = document.getElementById('root')
if (root) render(<App />, root)
