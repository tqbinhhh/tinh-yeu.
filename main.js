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
    
    // Lấy tất cả các phần tử cần lặp lại hiệu ứng
    const character = document.querySelector('.character');
    const biuText = document.querySelector('.biu-text');
    const flyingHeart = document.querySelector('.flying-heart-from-hand');
    const greetingText = document.querySelector('.greeting-text');
    
    // Reset animation của tất cả các phần tử
    character.style.animation = 'none';
    biuText.style.animation = 'none';
    flyingHeart.style.animation = 'none';
    greetingText.style.animation = 'none';
    
    // Kích hoạt reflow để trình duyệt nhận biết sự thay đổi
    void character.offsetWidth;
    
    // Bật lại animation
    character.style.animation = '';
    biuText.style.animation = '';
    flyingHeart.style.animation = '';
    greetingText.style.animation = '';
}

// Chạy animation lần đầu khi trang được tải
playAnimation();

// Lặp lại toàn bộ hiệu ứng sau mỗi 6 giây
setInterval(playAnimation, 6000);