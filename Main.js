// 1. Inicializar Lenis (Smooth Scroll)
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// 2. Registrar plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 3. Animación del Preloader
// Simulación de carga
let counter = 0;
const counterElement = document.querySelector(".counter");
const preloader = document.querySelector(".preloader");

const interval = setInterval(() => {
    counter += Math.floor(Math.random() * 10) + 1;
    if (counter > 100) counter = 100;
    counterElement.textContent = counter + "%";

    if (counter === 100) {
        clearInterval(interval);
        revealSite();
    }
}, 30);

function revealSite() {
    const tl = gsap.timeline();

    tl.to(preloader, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut"
    })
    .from(".hero-img", {
        scale: 1.5,
        duration: 1.5,
        ease: "power2.out"
    }, "-=0.5")
    .from(".line", {
        y: 150,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
    }, "-=1")
    .to(".hero-sub", {
        opacity: 1,
        duration: 1
    }, "-=0.5");
}

// 4. Marquee Animation (Texto infinito)
gsap.to(".marquee-inner", {
    xPercent: -50,
    repeat: -1,
    duration: 10,
    ease: "linear"
});

// 5. Animación de Scroll Horizontal (La joya de Awwwards)
const gallery = document.getElementById("gallery");
const wrapper = document.querySelector(".horizontal-wrapper");

// Calculamos cuánto debe desplazarse: ancho total del wrapper - ancho de la ventana
function getScrollAmount() {
    let wrapperWidth = wrapper.scrollWidth;
    return -(wrapperWidth - window.innerWidth);
}

const tween = gsap.to(wrapper, {
    x: getScrollAmount,
    duration: 3,
    ease: "none"
});

ScrollTrigger.create({
    trigger: ".gallery-section",
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`, // Duración basada en el ancho del contenido
    pin: true, // "Congela" la sección verticalmente mientras hace scroll horizontal
    animation: tween,
    scrub: 1, // Vincula la animación al scroll del usuario
    invalidateOnRefresh: true // Recalcula si cambia el tamaño de ventana
});
