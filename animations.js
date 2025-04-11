// Initialize animations when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate the floating heart logo
    const heartAnimation = anime({
        targets: '.floating-heart',
        scale: [0.9, 1.1],
        opacity: [0.8, 1],
        easing: 'easeInOutSine',
        duration: 1500,
        loop: true,
        direction: 'alternate'
    });

    // Animate the main title and subtitle with a stagger effect
    const textAnimation = anime.timeline({
        easing: 'easeOutExpo'
    });

    textAnimation
        .add({
            targets: '.main-title',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1200
        })
        .add({
            targets: '.subtitle',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000
        }, '-=800')
        .add({
            targets: '.input-container',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000
        }, '-=800')
        .add({
            targets: '.preview-window',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000
        }, '-=800')
        .add({
            targets: '.suggestion-tags',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000
        }, '-=800')
        .add({
            targets: '.stats',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1000
        }, '-=800');

    // Add hover animation to tags
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            anime({
                targets: tag,
                scale: 1.1,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });

        tag.addEventListener('mouseleave', () => {
            anime({
                targets: tag,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .5)'
            });
        });
    });

    // Add cursor follow animation to the heart logo
    const heart = document.querySelector('.floating-heart');
    let mouseX = 0;
    let mouseY = 0;
    let heartX = 0;
    let heartY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const heartRect = heart.getBoundingClientRect();
        const targetX = (mouseX - window.innerWidth / 2) * 0.1;
        const targetY = (mouseY - window.innerHeight / 2) * 0.1;

        heartX += (targetX - heartX) * 0.1;
        heartY += (targetY - heartY) * 0.1;

        heart.style.transform = `translate(${heartX}px, ${heartY}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            button.appendChild(ripple);

            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            anime({
                targets: ripple,
                left: x,
                top: y,
                scale: [0, 3],
                opacity: [1, 0],
                easing: 'easeOutExpo',
                duration: 900,
                complete: () => {
                    ripple.remove();
                }
            });
        });
    });

    // Add typing animation to input placeholder
    const input = document.querySelector('.design-input');
    const placeholders = [
        'Create a minimalist logo design...',
        'Design a social media post template...',
        'Generate a website mockup...',
        'Create an app icon...'
    ];

    let currentPlaceholder = 0;

    function animatePlaceholder() {
        const placeholder = placeholders[currentPlaceholder];
        
        anime({
            targets: input,
            duration: 2000,
            easing: 'easeInOutQuad',
            update: function(anim) {
                const progress = Math.floor((placeholder.length * anim.progress) / 100);
                input.setAttribute('placeholder', placeholder.slice(0, progress));
            },
            complete: function() {
                setTimeout(() => {
                    currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
                    animatePlaceholder();
                }, 2000);
            }
        });
    }

    animatePlaceholder();

    // Preview window functionality
    const previewCanvas = document.querySelector('.preview-canvas');
    const playButton = document.querySelector('.play-btn');
    const resetButton = document.querySelector('.reset-btn');
    let currentAnimation = null;

    function createPreviewAnimation(text) {
        // Clear previous animation
        if (currentAnimation) {
            currentAnimation.pause();
        }
        
        // Clear canvas
        previewCanvas.innerHTML = '';
        
        const textLower = text.toLowerCase();
        
        // Size commands
        if (textLower.includes('big') || textLower.includes('large')) {
            createSizeAnimation('big');
        } else if (textLower.includes('small') || textLower.includes('tiny')) {
            createSizeAnimation('small');
        }
        // Motion commands
        else if (textLower.includes('shake')) {
            createShakeAnimation();
        } else if (textLower.includes('rotate') || textLower.includes('spin')) {
            createRotateAnimation();
        } else if (textLower.includes('bounce')) {
            createBounceAnimation();
        }
        // Color commands
        else if (textLower.includes('rainbow') || textLower.includes('colorful')) {
            createRainbowAnimation();
        } else if (textLower.includes('pulse')) {
            createPulseAnimation();
        }
        // Special effects
        else if (textLower.includes('explode') || textLower.includes('burst')) {
            createExplodeAnimation();
        } else if (textLower.includes('wave')) {
            createWaveAnimation();
        }
        // Default animations based on previous categories
        else if (textLower.includes('firefly') || textLower.includes('particle')) {
            createFireflyAnimation();
        } else if (textLower.includes('grid') || textLower.includes('pattern')) {
            createGridAnimation();
        } else if (textLower.includes('text') || textLower.includes('type')) {
            createTextAnimation(text);
        } else {
            createDefaultAnimation();
        }
    }

    function createSizeAnimation(size) {
        const shape = document.createElement('div');
        shape.classList.add('preview-shape');
        previewCanvas.appendChild(shape);

        const scaleValues = size === 'big' ? [0.5, 2.5] : [1, 0.2];
        
        currentAnimation = anime({
            targets: '.preview-shape',
            scale: scaleValues,
            duration: 1500,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutElastic(1, .5)'
        });
    }

    function createShakeAnimation() {
        const shape = document.createElement('div');
        shape.classList.add('preview-shape');
        previewCanvas.appendChild(shape);

        currentAnimation = anime({
            targets: '.preview-shape',
            translateX: [
                { value: -20, duration: 100, delay: 0 },
                { value: 20, duration: 100, delay: 0 },
                { value: -15, duration: 100, delay: 0 },
                { value: 15, duration: 100, delay: 0 },
                { value: -10, duration: 100, delay: 0 },
                { value: 10, duration: 100, delay: 0 },
                { value: 0, duration: 100, delay: 0 }
            ],
            loop: true,
            delay: 1000,
            easing: 'easeInOutSine'
        });
    }

    function createRotateAnimation() {
        const shape = document.createElement('div');
        shape.classList.add('preview-shape');
        previewCanvas.appendChild(shape);

        currentAnimation = anime({
            targets: '.preview-shape',
            rotate: [0, 360],
            scale: [0.5, 1],
            duration: 1500,
            loop: true,
            easing: 'easeInOutQuad'
        });
    }

    function createBounceAnimation() {
        const shape = document.createElement('div');
        shape.classList.add('preview-shape');
        previewCanvas.appendChild(shape);

        currentAnimation = anime({
            targets: '.preview-shape',
            translateY: [-150, 150],
            scale: [1, 0.8],
            duration: 1500,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutBounce'
        });
    }

    function createRainbowAnimation() {
        const shape = document.createElement('div');
        shape.classList.add('preview-shape', 'rainbow-shape');
        previewCanvas.appendChild(shape);

        currentAnimation = anime({
            targets: '.rainbow-shape',
            backgroundColor: [
                '#FF0000',
                '#FF7F00',
                '#FFFF00',
                '#00FF00',
                '#0000FF',
                '#4B0082',
                '#9400D3',
                '#FF0000'
            ],
            scale: [0.8, 1.2],
            duration: 3000,
            loop: true,
            easing: 'linear'
        });
    }

    function createPulseAnimation() {
        const shape = document.createElement('div');
        shape.classList.add('preview-shape');
        previewCanvas.appendChild(shape);

        currentAnimation = anime({
            targets: '.preview-shape',
            scale: [1, 1.5],
            opacity: [1, 0.5],
            duration: 1000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    }

    function createExplodeAnimation() {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            previewCanvas.appendChild(particle);
        }

        currentAnimation = anime({
            targets: '.particle',
            translateX: () => anime.random(-150, 150),
            translateY: () => anime.random(-150, 150),
            scale: [1, 0],
            opacity: [1, 0],
            duration: 2000,
            delay: anime.stagger(100),
            loop: true,
            easing: 'easeOutExpo'
        });
    }

    function createWaveAnimation() {
        for (let i = 0; i < 10; i++) {
            const dot = document.createElement('div');
            dot.classList.add('wave-dot');
            previewCanvas.appendChild(dot);
        }

        currentAnimation = anime({
            targets: '.wave-dot',
            translateY: [-50, 50],
            delay: anime.stagger(100),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    }

    function createFireflyAnimation() {
        for (let i = 0; i < 50; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            previewCanvas.appendChild(firefly);
            
            const x = anime.random(0, previewCanvas.offsetWidth);
            const y = anime.random(0, previewCanvas.offsetHeight);
            
            firefly.style.left = x + 'px';
            firefly.style.top = y + 'px';
        }

        currentAnimation = anime({
            targets: '.firefly',
            translateX: () => anime.random(-50, 50),
            translateY: () => anime.random(-50, 50),
            scale: [0.5, 1],
            opacity: [0.5, 1],
            duration: () => anime.random(1000, 3000),
            delay: () => anime.random(0, 1000),
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    }

    function createGridAnimation() {
        const grid = document.createElement('div');
        grid.classList.add('preview-grid');
        previewCanvas.appendChild(grid);

        for (let i = 0; i < 36; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            grid.appendChild(cell);
        }

        currentAnimation = anime({
            targets: '.grid-cell',
            scale: [
                {value: 0.1, duration: 500, easing: 'easeOutSine'},
                {value: 1, duration: 800, easing: 'easeInOutQuad'}
            ],
            delay: anime.stagger(200, {grid: [6, 6], from: 'center'}),
            loop: true
        });
    }

    function createTextAnimation(text) {
        const textWrapper = document.createElement('div');
        textWrapper.classList.add('preview-text-wrapper');
        textWrapper.textContent = text;
        previewCanvas.appendChild(textWrapper);

        currentAnimation = anime({
            targets: '.preview-text-wrapper',
            translateY: [-30, 0],
            opacity: [0, 1],
            duration: 800,
            endDelay: 1000,
            direction: 'alternate',
            loop: true,
            easing: 'easeOutElastic(1, .6)'
        });
    }

    function createDefaultAnimation() {
        // Clear any existing content
        previewCanvas.innerHTML = '';
        
        // Create and add the website mockup
        const mockup = document.createElement('div');
        mockup.classList.add('website-mockup');
        
        // Create header with navigation items
        const header = document.createElement('div');
        header.classList.add('mockup-header');
        const nav = document.createElement('div');
        nav.classList.add('mockup-nav');
        for (let i = 0; i < 3; i++) {
            const navItem = document.createElement('div');
            navItem.classList.add('nav-item');
            nav.appendChild(navItem);
        }
        header.appendChild(nav);
        
        // Create content area with sections
        const content = document.createElement('div');
        content.classList.add('mockup-content');
        const sections = document.createElement('div');
        sections.classList.add('content-sections');
        for (let i = 0; i < 3; i++) {
            const section = document.createElement('div');
            section.classList.add('content-section');
            sections.appendChild(section);
        }
        content.appendChild(sections);
        
        // Create sidebar with menu items
        const sidebar = document.createElement('div');
        sidebar.classList.add('mockup-sidebar');
        for (let i = 0; i < 4; i++) {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            sidebar.appendChild(menuItem);
        }
        
        mockup.appendChild(header);
        mockup.appendChild(sidebar);
        mockup.appendChild(content);
        previewCanvas.appendChild(mockup);

        // New enhanced instruction sets with more dynamic animations
        const defaultInstructionSets = [
            {
                instruction: "🔄 Rotating website layout...",
                animation: () => {
                    anime({
                        targets: '.website-mockup',
                        rotate: [0, 360],
                        duration: 2000,
                        easing: 'easeInOutQuad'
                    });
                }
            },
            {
                instruction: "📱 Mobile view transformation...",
                animation: () => {
                    anime({
                        targets: '.website-mockup',
                        scale: [1, 0.6],
                        translateY: [-50, 50],
                        duration: 1500,
                        direction: 'alternate',
                        easing: 'easeInOutExpo'
                    });
                }
            },
            {
                instruction: "💫 Shake it up!",
                animation: () => {
                    anime({
                        targets: '.website-mockup',
                        translateX: [
                            { value: -20, duration: 100 },
                            { value: 20, duration: 100 },
                            { value: -15, duration: 100 },
                            { value: 15, duration: 100 },
                            { value: -10, duration: 100 },
                            { value: 10, duration: 100 },
                            { value: 0, duration: 100 }
                        ],
                        easing: 'easeInOutSine'
                    });
                }
            },
            {
                instruction: "🌈 Color transformation...",
                animation: () => {
                    anime({
                        targets: ['.nav-item', '.menu-item', '.content-section'],
                        backgroundColor: [
                            'rgba(255,71,71,0.2)',
                            'rgba(71,255,71,0.2)',
                            'rgba(71,71,255,0.2)',
                            'rgba(255,255,255,0.1)'
                        ],
                        duration: 2000,
                        delay: anime.stagger(100),
                        easing: 'easeInOutQuad'
                    });
                }
            },
            {
                instruction: "🔍 Zoom effect...",
                animation: () => {
                    anime({
                        targets: '.website-mockup',
                        scale: [1, 1.5, 1],
                        duration: 2000,
                        easing: 'easeInOutElastic(1, .5)'
                    });
                }
            },
            {
                instruction: "✨ Bounce animation...",
                animation: () => {
                    anime({
                        targets: '.website-mockup',
                        translateY: [-30, 0],
                        direction: 'alternate',
                        duration: 1500,
                        easing: 'easeOutBounce'
                    });
                }
            },
            {
                instruction: "🌓 Dark mode transition...",
                animation: () => {
                    anime({
                        targets: '.website-mockup',
                        backgroundColor: ['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.9)', 'rgba(255,255,255,0.05)'],
                        duration: 2000,
                        easing: 'easeInOutSine'
                    });
                }
            },
            {
                instruction: "💫 3D flip effect...",
                animation: () => {
                    anime({
                        targets: '.website-mockup',
                        rotateY: [0, 180, 360],
                        duration: 2000,
                        easing: 'easeInOutQuad',
                        update: function(anim) {
                            const scale = Math.abs(Math.sin(anim.progress * Math.PI / 180));
                            document.querySelector('.website-mockup').style.transform += ` scale(${0.8 + scale * 0.2})`;
                        }
                    });
                }
            }
        ];

        // Function to run the default animation sequence
        function runDefaultSequence() {
            let currentIndex = 0;

            function runNextAnimation() {
                if (currentIndex >= defaultInstructionSets.length) {
                    currentIndex = 0;
                }

                const currentSet = defaultInstructionSets[currentIndex];
                
                // Update instruction text with typing effect
                updateInstructionWithTyping(currentSet.instruction);
                
                // Run the animation
                currentSet.animation();

                currentIndex++;

                // Schedule next animation
                setTimeout(runNextAnimation, 3000);
            }

            // Start the sequence
            runNextAnimation();
        }

        // Start the automatic sequence
        setTimeout(runDefaultSequence, 500);
    }

    // Add input event listener
    let inputTimeout;
    input.addEventListener('input', (e) => {
        clearTimeout(inputTimeout);
        inputTimeout = setTimeout(() => {
            if (e.target.value.trim()) {
                createPreviewAnimation(e.target.value);
            } else {
                previewCanvas.innerHTML = `
                    <div class="preview-placeholder">
                        <span class="preview-text">Your animation will appear here...</span>
                        <div class="preview-dots"></div>
                    </div>
                `;
            }
        }, 500);
    });

    // Add control button listeners
    playButton.addEventListener('click', () => {
        if (currentAnimation) {
            if (currentAnimation.paused) {
                currentAnimation.play();
                playButton.textContent = '⏸';
            } else {
                currentAnimation.pause();
                playButton.textContent = '▶';
            }
        }
    });

    resetButton.addEventListener('click', () => {
        if (currentAnimation) {
            currentAnimation.restart();
        }
    });

    // Add these styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .firefly {
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--gradient-heart);
            border-radius: 50%;
        }
        
        .preview-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 8px;
            padding: 20px;
        }
        
        .grid-cell {
            width: 30px;
            height: 30px;
            background: var(--gradient-heart);
            border-radius: 4px;
        }
        
        .preview-text-wrapper {
            font-size: 2rem;
            font-weight: bold;
            background: var(--gradient-heart);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .preview-shape {
            width: 100px;
            height: 100px;
            background: var(--gradient-heart);
        }
        
        .particle {
            width: 20px;
            height: 20px;
            background: var(--gradient-heart);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
        }
        
        .wave-dot {
            width: 20px;
            height: 20px;
            background: var(--gradient-heart);
            border-radius: 50%;
            position: absolute;
            top: 50%;
            margin: 0 10px;
        }
        
        .rainbow-shape {
            transition: background-color 0.5s;
        }

        .website-mockup {
            width: 80%;
            height: 300px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .mockup-header {
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            position: relative;
        }

        .mockup-header::before {
            content: '';
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 40%;
            height: 8px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }

        .mockup-header::after {
            content: '';
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            width: 80px;
            height: 20px;
            background: var(--gradient-heart);
            border-radius: 4px;
            opacity: 0.5;
        }

        .mockup-sidebar {
            width: 60px;
            height: calc(100% - 40px);
            background: rgba(255, 255, 255, 0.05);
            position: absolute;
            left: 0;
            top: 40px;
            border-right: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mockup-content {
            position: absolute;
            left: 76px;
            top: 56px;
            right: 16px;
            bottom: 16px;
        }

        .mockup-content::before {
            content: '';
            position: absolute;
            width: 60%;
            height: 12px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
        }

        .mockup-content::after {
            content: '';
            position: absolute;
            width: 80%;
            height: 70%;
            top: 28px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
        }

        .animation-suggestion {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
            text-align: center;
            white-space: nowrap;
        }

        .website-mockup.rainbow {
            background: linear-gradient(45deg, 
                rgba(255,0,0,0.1),
                rgba(255,165,0,0.1),
                rgba(255,255,0,0.1),
                rgba(0,255,0,0.1),
                rgba(0,0,255,0.1),
                rgba(75,0,130,0.1),
                rgba(238,130,238,0.1)
            );
            background-size: 400% 400%;
            animation: rainbow 15s ease infinite;
        }

        @keyframes rainbow {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
        }

        .nav-item {
            height: 8px;
            width: 20%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin: 16px;
            display: inline-block;
        }

        .menu-item {
            height: 20px;
            width: 70%;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
            margin: 10px auto;
        }

        .content-section {
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 6px;
            margin: 20px 0;
        }

        .content-sections {
            padding: 20px;
        }

        .mockup-nav {
            padding: 0 16px;
            display: flex;
            align-items: center;
            height: 100%;
        }
    `;
    document.head.appendChild(style);

    // Define instruction sets with their corresponding animations
    const instructionSets = [
        {
            instruction: "Creating a responsive header...",
            animation: () => {
                const mockup = document.querySelector('.website-mockup');
                anime({
                    targets: '.mockup-header',
                    width: ['70%', '100%'],
                    duration: 1500,
                    easing: 'easeInOutElastic(1, .6)',
                    complete: () => {
                        anime({
                            targets: '.mockup-header',
                            width: '100%',
                            duration: 800
                        });
                    }
                });
            }
        },
        {
            instruction: "Adding a dynamic sidebar menu...",
            animation: () => {
                anime({
                    targets: '.mockup-sidebar',
                    width: [0, 60],
                    duration: 1000,
                    easing: 'easeOutExpo'
                });
            }
        },
        {
            instruction: "Implementing smooth scroll effects...",
            animation: () => {
                anime({
                    targets: '.website-mockup',
                    translateY: [-20, 0],
                    opacity: [0.5, 1],
                    duration: 1500,
                    easing: 'easeInOutQuad'
                });
            }
        },
        {
            instruction: "Adding colorful gradient transitions...",
            animation: () => {
                const mockup = document.querySelector('.website-mockup');
                mockup.classList.add('rainbow');
                setTimeout(() => mockup.classList.remove('rainbow'), 3000);
            }
        },
        {
            instruction: "Optimizing mobile responsiveness...",
            animation: () => {
                anime({
                    targets: '.website-mockup',
                    scale: [1, 0.8, 1],
                    duration: 2000,
                    easing: 'easeInOutSine'
                });
            }
        },
        {
            instruction: "Enhancing user interaction feedback...",
            animation: () => {
                anime({
                    targets: '.mockup-content',
                    keyframes: [
                        {scale: 1.05, duration: 400},
                        {scale: 1, duration: 400},
                        {translateX: 10, duration: 200},
                        {translateX: -10, duration: 200},
                        {translateX: 0, duration: 200}
                    ],
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        },
        {
            instruction: "Implementing dark mode toggle...",
            animation: () => {
                anime({
                    targets: '.website-mockup',
                    backgroundColor: ['rgba(255,255,255,0.05)', 'rgba(0,0,0,0.8)', 'rgba(255,255,255,0.05)'],
                    duration: 2000,
                    easing: 'easeInOutQuad'
                });
            }
        },
        {
            instruction: "Adding micro-interactions...",
            animation: () => {
                anime({
                    targets: '.mockup-header::before, .mockup-content::before',
                    width: ['0%', '60%'],
                    duration: 1000,
                    easing: 'easeOutExpo'
                });
            }
        }
    ];

    // Function to update instruction text with typing effect
    function updateInstructionWithTyping(text) {
        const suggestion = document.querySelector('.animation-suggestion');
        let currentText = '';
        const duration = 50; // Duration per character
        
        // Clear existing text
        suggestion.textContent = '';
        
        // Type out the text
        for (let i = 0; i < text.length; i++) {
            setTimeout(() => {
                currentText += text[i];
                suggestion.textContent = currentText;
            }, duration * i);
        }
    }

    // Function to run instruction sets in sequence
    function runInstructionSequence() {
        let currentIndex = 0;

        function runNextInstruction() {
            if (currentIndex >= instructionSets.length) {
                currentIndex = 0;
            }

            const currentSet = instructionSets[currentIndex];
            
            // Update instruction text with typing effect
            updateInstructionWithTyping(currentSet.instruction);
            
            // Run the animation
            currentSet.animation();

            currentIndex++;

            // Schedule next instruction
            setTimeout(runNextInstruction, 4000); // Run next instruction after 4 seconds
        }

        // Start the sequence
        runNextInstruction();
    }

    // Start the automatic sequence after initial load
    setTimeout(runInstructionSequence, 1000);
}); 