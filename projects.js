// ==================== パーティクルアニメーション ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // パーティクルのフロートアニメーションを追加
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.7;
                }
                25% {
                    transform: translate(20px, -30px) scale(1.1);
                    opacity: 1;
                }
                50% {
                    transform: translate(-15px, -60px) scale(0.9);
                    opacity: 0.5;
                }
                75% {
                    transform: translate(25px, -40px) scale(1.05);
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ==================== ナビゲーションのスクロール効果 ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== スムーススクロール ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== タイピングエフェクト ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== スクロールアニメーション ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を設定
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
        .card,
        .project-card,
        .skill-category,
        .timeline-item,
        .stat-card,
        .contact-card
    `);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==================== スキルバーのアニメーション ====================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
}

// ==================== カウントアップアニメーション ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (isNumber) {
            const updateCounter = () => {
                const current = parseInt(counter.textContent);
                const targetNum = parseInt(target);
                const increment = targetNum / 50;
                
                if (current < targetNum) {
                    counter.textContent = Math.ceil(current + increment);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.textContent = target;
                }
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        counter.textContent = '0';
                        updateCounter();
                        counterObserver.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        }
    });
}

// ==================== マウスカーソルエフェクト ====================
function createCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    // カーソルスタイルを追加
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 40px;
            height: 40px;
            border: 2px solid rgba(102, 126, 234, 0.5);
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.2s ease, border-color 0.2s ease;
            transform: translate(-50%, -50%);
        }
        
        .cursor-dot {
            width: 8px;
            height: 8px;
            background: #667eea;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        }
        
        .custom-cursor.clicked {
            transform: translate(-50%, -50%) scale(0.8);
        }
        
        body * {
            cursor: none !important;
        }
    `;
    document.head.appendChild(style);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // カーソルをスムーズに追従
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // クリックエフェクト
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicked');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicked');
    });
    
    // ホバーエフェクト
    document.querySelectorAll('a, button, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'rgba(102, 126, 234, 0.8)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'rgba(102, 126, 234, 0.5)';
        });
    });
}

// ==================== 初期化 ====================
document.addEventListener('DOMContentLoaded', () => {
    // パーティクルの生成
    createParticles();
    
    // タイピングエフェクト
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typeWriter(typingText, text, 80);
    }
    
    // スクロールアニメーションのセットアップ
    setupScrollAnimations();
    
    // スキルバーのアニメーション
    animateSkillBars();
    
    // カウンターのアニメーション
    animateCounters();
    
    // カスタムカーソル（デスクトップのみ）
    if (window.innerWidth > 768) {
        createCursorEffect();
    }
    
    // ページロードアニメーション
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== ウィンドウリサイズ対応 ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // リサイズ時の処理
        console.log('Window resized');
    }, 250);
});