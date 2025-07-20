// Initialize Lenis
const lenis = new Lenis({
    autoRaf: true,
});

// Register plugins first
gsap.registerPlugin(ScrollTrigger, SplitText);

// Marquee Animation - Window Load
window.addEventListener("load", function () {
    const marquee = gsap.to(".marquee-item", {
        xPercent: -100,
        repeat: -1,
        duration: 10,
        ease: "none"
    });
});

// Case Study Animation
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Get only the images in the right column
        const caseImages = document.querySelectorAll('.col-md-7 img[data-case]');
        console.log('Case images found:', caseImages.length);

        caseImages.forEach((img, index) => {
            const caseNumber = img.getAttribute('data-case');
            const correspondingDash = document.querySelector(`.case-head_${caseNumber} .dash`);

            if (correspondingDash) {
                // Set initial state
                gsap.set(correspondingDash, { width: '10px' });

                ScrollTrigger.create({
                    trigger: img,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    onEnter: () => {
                        gsap.to(correspondingDash, {
                            width: '50px',
                            duration: 0.1,
                            ease: 'power2.out'
                        });
                    },
                    onLeave: () => {
                        gsap.to(correspondingDash, {
                            width: '10px',
                            duration: 0.1,
                            ease: 'power2.out'
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(correspondingDash, {
                            width: '50px',
                            duration: 0.1,
                            ease: 'power2.out'
                        });
                    },
                    onLeaveBack: () => {
                        gsap.to(correspondingDash, {
                            width: '10px',
                            duration: 0.1,
                            ease: 'power2.out'
                        });
                    },
                });
            }
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();
    }, 1000);
});

// Services Section
window.addEventListener('load', () => {
    setTimeout(() => {
        // Service Module Hover Animations
        const serviceModules = document.querySelectorAll('.service-module');
        serviceModules.forEach(module => {
            module.addEventListener('mouseenter', () => {
                gsap.to(module.querySelector('.arrow'), {
                    x: '0%',
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                });

                gsap.to(module.querySelector('.heading'), {
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                });

                gsap.to(module.querySelector('.service-img'), {
                    opacity: 1,
                    duration: 0.1,
                    ease: 'power3.out'
                });
            });

            module.addEventListener('mouseleave', () => {
                gsap.to(module.querySelector('.arrow'), {
                    x: '-100%',
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });

                gsap.to(module.querySelector('.heading'), {
                    opacity: 0.35,
                    duration: 0.8,
                    ease: 'power3.out'
                });

                gsap.to(module.querySelector('.service-img'), {
                    opacity: 0,
                    duration: 0.1,
                    ease: 'power3.out'
                });
            });
        });

        // Color change function for services
        function changeColors(bgColor, textColor) {
            gsap.to('.services', {
                backgroundColor: bgColor,
                duration: 0.8,
                ease: 'power3.inOut'
            });

            const textElements = document.querySelectorAll('[data-change-text-color]');
            gsap.to(textElements, {
                color: textColor,
                duration: 0.8,
                ease: 'power3.inOut'
            });
        }

        // Services ScrollTrigger for color changes
        ScrollTrigger.create({
            trigger: '.services',
            start: 'top 50%',
            onEnter: () => changeColors('#0f0f0f', '#FFFFFF'),
            onLeaveBack: () => changeColors('#FFFFFF', '#0f0f0f'),
            scrub: false
        });

        ScrollTrigger.create({
            trigger: '.text',
            start: 'top top',
            onEnter: () => changeColors('#FFFFFF', '#0f0f0f'),
            onLeaveBack: () => changeColors('#0f0f0f', '#FFFFFF'),
            scrub: false
        });

        // Services Text Reveal Animation
        const revealText = document.querySelector('.content-text');
        if (revealText) {
            const splitText = new SplitText(revealText, { type: 'chars,words' });

            gsap.set(splitText.chars, {
                opacity: 0.2,
                color: 'rgba(255,255,255,0.3)'
            });

            gsap.timeline({
                scrollTrigger: {
                    trigger: '.content-text',
                    start: 'top 80%',
                    end: 'bottom 30%',
                    scrub: 1,
                    onStart: () => {
                        // Ensure the section is dark when text animation starts
                        changeColors('#0f0f0f', '#FFFFFF');
                    }
                }
            }).to(splitText.chars, {
                opacity: 1,
                color: 'rgba(255,255,255,1)',
                stagger: 0.02,
                duration: 1,
                ease: 'power2.out'
            });
        }

        // Refresh ScrollTrigger for services
        ScrollTrigger.refresh();
    }, 800);
});

function initProcessTimelineAnimations() {
    const processSection = document.querySelector(".services-process");
    if (!processSection) return;

    const processTimeline = processSection.querySelector(".process-timeline");
    const processSteps = processSection.querySelectorAll(".process-step");

    if (!processTimeline || processSteps.length === 0) return;

    // Set initial states
    gsap.set(processSteps, {
        opacity: 0,
        y: 50
    });

    // Create timeline progress animation
    const timelineProgress =
        processTimeline.querySelector("::after") || processTimeline;

    // Main scroll trigger for the entire timeline section
    ScrollTrigger.create({
        trigger: processSection,
        start: "top 50%",
        end: "bottom bottom",
        onUpdate: (self) => {
            const progress = self.progress;
            // Direct style update for better performance
            processTimeline.style.setProperty(
                "--timeline-progress",
                `${progress * 100}%`
            );
        }
    });

    // Animate individual process steps
    processSteps.forEach((step, index) => {
        ScrollTrigger.create({
            trigger: step,
            start: "top 85%",
            onEnter: () => {
                gsap.to(step, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "power2.out"
                });

                // Add animate-in class for CSS transitions
                step.classList.add("animate-in");
            },
            onEnterBack: () => {
                // Re-animate when scrolling back up
                step.classList.add("animate-in");
            }
        });

        // Add hover animations for enhanced interactivity
        const processContent = step.querySelector(".process-content");

        if (processContent) {
            processContent.addEventListener("mouseenter", () => {
                gsap.to(processContent, {
                    y: -4,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            processContent.addEventListener("mouseleave", () => {
                gsap.to(processContent, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        }
    });

    // Create dynamic timeline progress line using CSS
    const style = document.createElement("style");
    style.textContent = `
        .process-timeline::after {
            height: var(--timeline-progress, 0%) !important;
            transition: height 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
}

initProcessTimelineAnimations();