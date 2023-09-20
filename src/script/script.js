const ham_pressed = document.querySelector(".hamburgur_menu");
const mob_menu = document.querySelector(".mob_menu");
ham_pressed.addEventListener('click', ()=>{
    const pressed = ham_pressed.getAttribute('aria-pressed');
    const visible = mob_menu.getAttribute('data-visible');
    if(pressed === "false" & visible === "false"){
        ham_pressed.setAttribute('aria-pressed',true);
        mob_menu.setAttribute('data-visible',true);
    }
    else if(pressed === "true"){
        ham_pressed.setAttribute('aria-pressed',false);
        mob_menu.setAttribute('data-visible',false);
    }
})


// const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = [document.getElementById("right")]
// const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

// Get the number of cards that can fit in the carousel at once
// let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const autoPlay = () => {
    if(window.innerWidth < 800) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();



carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


