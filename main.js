function playAnimation() {
    const gridContainer = document.querySelector('.heart-grid-container');
    gridContainer.innerHTML = '';

    const heartGrid = [
        "  XX  XX  ",
        " XXXX XXXX ",
        "XXXXXXXXXXX",
        "XXXXXXXXXXX",
        " XXXXXXXXX ",
        "  XXXXXXX  ",
        "   XXXXX   ",
        "    XXX    ",
        "     X     "
    ];
    let animationDelay = 0;
    const heartSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--heart-size'));
    const heartGap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--heart-gap'));
    const step = heartSize + heartGap;
    let topOffset = 20;

    heartGrid.forEach(row => {
        let leftOffset = (gridContainer.clientWidth - (row.length * step)) / 2;
        for (let i = 0; i < row.length; i++) {
            if (row[i] === 'X') {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.style.top = `${topOffset}px`;
                heart.style.left = `${leftOffset}px`;
                heart.style.animationDelay = `${animationDelay}s`;
                gridContainer.appendChild(heart);
                animationDelay += 0.03;
            }
            leftOffset += step;
        }
        topOffset += step;
    });
    
    const character = document.querySelector('.character');
    const biuText = document.querySelector('.biu-text');
    const flyingHeart = document.querySelector('.flying-heart-from-hand');
    const greetingText = document.querySelector('.greeting-text');
    
    // Reset animations
    const elements = [character, biuText, flyingHeart, greetingText];
    elements.forEach(el => el.style.animation = 'none');
    
    // Trigger reflow to restart animation
    void character.offsetWidth;

    // Re-apply animations
    elements.forEach(el => el.style.animation = '');
}

// Get references to elements
const playButton = document.getElementById('playButton');
const scene = document.querySelector('.scene');
const curtainContainer = document.getElementById('curtain-container');
let animationInterval; // To store the interval ID

// Initial curtain state
curtainContainer.classList.add('closed');

playButton.addEventListener('click', () => {
    document.body.classList.add('animation-started');

    playButton.style.display = 'none';
    
    scene.classList.remove('hidden');
    
    // Open curtains
    curtainContainer.classList.remove('closed');
    
    setTimeout(() => {
        // Run animation for the first time
        playAnimation();
        
        // Clear any existing interval before setting a new one
        if (animationInterval) {
            clearInterval(animationInterval);
        }

        // Set interval to repeat animation every 6 seconds
        animationInterval = setInterval(playAnimation, 6000); 

    }, 500); // Start animation shortly after curtains begin to open
});
