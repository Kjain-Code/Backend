const mouseFollower = document.querySelector('.mouse-follower');

let x  =0
let y = 0

addEventListener('mousemove',(e)=>{
    // clientX and clientY gives the x and y coordinates of the mouse pointer relative to the viewport
    const {clientX,clientY} = e;
    x = clientX;
    y = clientY;
})

function far(){
    mouseFollower.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(far);

}
far();

// requestAnimationFrame() is a method that tells the browser to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback function as an argument, which will be called before the next repaint. This allows for smooth animations and efficient use of resources, as the browser can optimize the timing of the callback function based on the current frame rate and system performance.

// performce ko smooth krne ke liye requestAnimationFrame() ka use krte hai, jisse animation ke timing ko optimize kiya ja sakta hai. Isse browser ko pata hota hai ki kab next repaint hoga, aur uske accordingly callback function ko call karta hai, jisse animation smooth hoti hai aur resources ka efficient use hota hai.