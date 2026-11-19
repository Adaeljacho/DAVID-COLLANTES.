gsap.registerPlugin(ScrollTrigger);

/* ======== PRELOADER ======== */
let pct = 0;
const pInt = setInterval(() => {
    pct = Math.min(pct + Math.random() * 6 + 2, 100);
    document.getElementById('preN').innerHTML = Math.floor(pct) + '<em>%</em>';
    document.getElementById('preBar').style.width = pct + '%';
    if (pct >= 100) {
        clearInterval(pInt);
        setTimeout(() => {
            gsap.to('#pre', {
                yPercent: -102,
                duration: 1.1,
                ease: 'power4.inOut',
                onComplete: () => {
                    document.getElementById('pre').remove();
                    launchHero();
                }
            });
        }, 280);
    }
}, 34);

/* ======== HERO LAUNCH ======== */
function launchHero() {
    const el = document.getElementById('hName');
    const txt = el.textContent;
    el.innerHTML = txt.split('').map(c =>
        `<span class="ch" style="opacity:0;transform:translateY(110%) rotate(5deg);display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`
    ).join('');

    const tl = gsap.timeline({
        defaults: {
            ease: 'power4.out'
        }
    });
    tl
        .to('#hName .ch', {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: .82,
            stagger: .045
        })
        .from('#hRole', {
            y: 28,
            opacity: 0,
            duration: .75
        }, '-=.5')
        .from('#hDesc', {
            y: 22,
            opacity: 0,
            duration: .75
        }, '-=.58')
        .from('#hBtns', {
            y: 20,
            opacity: 0,
            duration: .7
        }, '-=.55')
        .from('#hSocs', {
            y: 18,
            opacity: 0,
            duration: .65
        }, '-=.5')
        .fromTo('#hBlob', {
            clipPath: 'inset(0 100% 0 0)'
        }, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.3,
            ease: 'power4.inOut'
        }, '-=.95')
        .from(['#hC1', '#hC2'], {
            opacity: 0,
            y: 18,
            duration: .6,
            stagger: .14
        }, '-=.38');

    setTimeout(runFloatCounters, 1500);
}

function runFloatCounters() {
    document.querySelectorAll('.hcv[data-count]').forEach(el => {
        const to = +el.dataset.count;
        gsap.to({
            v: 0
        }, {
            v: to,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function() {
                el.textContent = Math.floor(this.targets()[0].v);
            },
            onComplete: function() {
                el.textContent = to;
            }
        });
    });
}

/* ======== CURSOR ======== */
const cO = document.getElementById('cO'),
    cI = document.getElementById('cI');
let mX = 0,
    mY = 0,
    oX = 0,
    oY = 0;
document.addEventListener('mousemove', e => {
    mX = e.clientX;
    mY = e.clientY;
    cI.style.left = mX + 'px';
    cI.style.top = mY + 'px';
});
(function animCur() {
    oX += (mX - oX) * .1;
    oY += (mY - oY) * .1;
    cO.style.left = oX + 'px';
    cO.style.top = oY + 'px';
    requestAnimationFrame(animCur);
})();
document.addEventListener('mousedown', () => cO.classList.add('clk'));
document.addEventListener('mouseup', () => cO.classList.remove('clk'));
document.querySelectorAll('a,button,.pfcard,.svcard,.tlit,.educard,.chip').forEach(el => {
    el.addEventListener('mouseenter', () => cO.classList.add('hov'));
    el.addEventListener('mouseleave', () => cO.classList.remove('hov'));
});

/* ======== MOUSE PARALLAX (HERO) ======== */
document.addEventListener('mousemove', e => {
    const xr = (e.clientX / window.innerWidth - .5) * 46;
    const yr = (e.clientY / window.innerHeight - .5) * 46;
    gsap.to('#o1', {
        x: xr * .52,
        y: yr * .52,
        duration: 1.8,
        ease: 'power2.out'
    });
    gsap.to('#o2', {
        x: -xr * .33,
        y: -yr * .33,
        duration: 2.2,
        ease: 'power2.out'
    });
    gsap.to('#o3', {
        x: xr * .88,
        y: yr * .88,
        duration: 1.4,
        ease: 'power2.out'
    });
    gsap.to('#hwm', {
        x: xr * .11,
        y: yr * .11,
        duration: 2.5,
        ease: 'power2.out'
    });
});

/* ======== NAVBAR ======== */
$(window).on('scroll', function() {
    const st = $(this).scrollTop();
    st > 60 ? $('#nav').addClass('stuck') : $('#nav').removeClass('stuck');
    st > 300 ? $('#btt').addClass('on') : $('#btt').removeClass('on');
    $('section[id]').each(function() {
        if (st >= $(this).offset().top - 140) {
            $('.nlinks a').removeClass('act');
            $(`.nlinks a[href="#${$(this).attr('id')}"]`).addClass('act');
        }
    });
});
$('#btt').on('click', () => $('html,body').animate({
    scrollTop: 0
}, 600));

/* ======== SMOOTH SCROLL ======== */
$('a[href^="#"]').not('[data-bs-toggle]').on('click', function(e) {
    const t = $(this.getAttribute('href'));
    if (t.length) {
        e.preventDefault();
        $('html,body').stop().animate({
            scrollTop: t.offset().top - 76
        }, 680);
        $('#mob').removeClass('on');
    }
});

/* ======== MOBILE NAV ======== */
$('#hamBtn').on('click', () => $('#mob').addClass('on'));
$('#mobX, #mob a').on('click', () => $('#mob').removeClass('on'));

/* ======== THEME ======== */
let theme = localStorage.getItem('arTh') || 'light';
setTheme(theme);

function setTheme(t) {
    $('html').attr('data-theme', t);
    theme = t;
    localStorage.setItem('arTh', t);
    t === 'dark' ? $('#thIco').removeClass('fa-sun').addClass('fa-moon') :
        $('#thIco').removeClass('fa-moon').addClass('fa-sun');
}
$('#thBtn').on('click', () => setTheme(theme === 'light' ? 'dark' : 'light'));

/* ======== GSAP SCROLL ANIMATIONS ======== */

// About image clip-path reveal
gsap.fromTo('#abImg', {
    clipPath: 'inset(0 0 100% 0)'
}, {
    clipPath: 'inset(0 0 0% 0)',
    duration: 1.4,
    ease: 'power4.inOut',
    scrollTrigger: {
        trigger: '#about',
        start: 'top 76%',
        once: true
    }
});

// About title
gsap.from('#about .stitle', {
    y: 55,
    opacity: 0,
    duration: 1,
    ease: 'power4.out',
    scrollTrigger: {
        trigger: '#about',
        start: 'top 72%',
        once: true
    }
});

// About bio paragraphs
gsap.utils.toArray('#about .abbio').forEach((el, i) => {
    gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: .9,
        ease: 'power3.out',
        delay: i * .1,
        scrollTrigger: {
            trigger: '#about',
            start: 'top 65%',
            once: true
        }
    });
});

// Counters (about + hero float)
let ctrDone = false;
ScrollTrigger.create({
    trigger: '#about',
    start: 'top 62%',
    once: true,
    onEnter: () => {
        if (!ctrDone) {
            ctrDone = true;
            runMainCounters();
        }
    }
});

function runMainCounters() {
    document.querySelectorAll('.counter[data-count]').forEach(el => {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        const to = +el.dataset.count;
        gsap.to({
            v: 0
        }, {
            v: to,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: function() {
                el.textContent = Math.floor(this.targets()[0].v);
            },
            onComplete: function() {
                el.textContent = to;
            }
        });
    });
}

// Skill bars animation
function animBars() {
    document.querySelectorAll('.skpanel.on .skfill').forEach(el => {
        gsap.to(el, {
            width: el.dataset.w + '%',
            duration: 1.5,
            ease: 'power3.out'
        });
    });
}
ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 64%',
    once: true,
    onEnter: animBars
});

// Timeline items
gsap.utils.toArray('.tlit').forEach((el, i) => {
    gsap.from(el, {
        x: -35,
        opacity: 0,
        duration: .85,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 84%',
            once: true
        },
        delay: i * .08
    });
});

// Education cards
gsap.utils.toArray('.educard').forEach((el, i) => {
    gsap.from(el, {
        y: 22,
        opacity: 0,
        duration: .75,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
        },
        delay: i * .07
    });
});

// Portfolio cards
gsap.utils.toArray('.pfcard').forEach((el, i) => {
    gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: .85,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
        },
        delay: i * .08
    });
});

// Service cards
gsap.utils.toArray('.svcard').forEach((el, i) => {
    gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: .8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
        },
        delay: i * .06
    });
});

// Generic section titles & badges
gsap.utils.toArray('.stitle').forEach(el => {
    gsap.from(el, {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            once: true
        }
    });
});
gsap.utils.toArray('.stag').forEach(el => {
    gsap.from(el, {
        y: 18,
        opacity: 0,
        duration: .6,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            once: true
        }
    });
});

// Background big numbers floating parallax
gsap.utils.toArray('.bgn').forEach(el => {
    gsap.fromTo(el, {
        y: 50
    }, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: el.closest('section'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
        }
    });
});

/* ======== SKILLS TABS ======== */
document.querySelectorAll('.sktab').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.sktab').forEach(b => b.classList.remove('on'));
        document.querySelectorAll('.skpanel').forEach(p => p.classList.remove('on'));
        this.classList.add('on');
        const panel = document.getElementById(`panel-${this.dataset.tab}`);
        panel.classList.add('on');
        // Reset and animate bars
        panel.querySelectorAll('.skfill').forEach(f => f.style.width = '0%');
        setTimeout(() => {
            panel.querySelectorAll('.skfill').forEach(f => {
                gsap.to(f, {
                    width: f.dataset.w + '%',
                    duration: 1.5,
                    ease: 'power3.out'
                });
            });
        }, 50);
    });
});

/* ======== PORTFOLIO FILTER ======== */
document.querySelectorAll('.pfbtn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.pfbtn').forEach(b => b.classList.remove('on'));
        this.classList.add('on');
        const f = this.dataset.pf;
        document.querySelectorAll('.pfi').forEach((el, i) => {
            if (f === 'all' || el.dataset.cat === f) {
                el.style.display = '';
                gsap.to(el, {
                    opacity: 1,
                    scale: 1,
                    duration: .4,
                    delay: i * .04
                });
            } else {
                gsap.to(el, {
                    opacity: .3,
                    scale: .97,
                    duration: .3
                });
            }
        });
    });
});

/* ======== SWIPER ======== */
new Swiper('.tSwiper', {
    slidesPerView: 1,
    spaceBetween: 22,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        1024: {
            slidesPerView: 2
        }
    }
});

/* ======== CONTACT FORM ======== */
document.getElementById('fSub').addEventListener('click', function(e) {
    e.preventDefault();
    const btn = this;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.style.background = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            btn.style.background = '';
            btn.disabled = false;
        }, 4000);
    }, 2000);
});

/* ======== MODAL: fix cursor ======== */
document.querySelectorAll('.modal').forEach(m => {
    m.addEventListener('show.bs.modal', () => document.body.style.cursor = 'auto');
    m.addEventListener('hidden.bs.modal', () => document.body.style.cursor = 'none');
});