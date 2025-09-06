const toggle  = document.getElementById('toggle');
const clouds  = document.querySelectorAll('.cloud-wrapper');
const content = document.getElementById('content');
const noteSection = document.querySelector('.note-section');
const noteContents = document.querySelectorAll('.note-content');
const body = document.body;

function animateOpen(){
  toggle.classList.add('active');

  body.classList.add('show-bg');

  if(window.gsap){
    gsap.to(clouds, {
      opacity:1,
      duration:1,
      stagger:0.18,
      onComplete: () => {
        clouds.forEach(c => c.classList.add('float'));
        toggle.classList.add('mini');
        noteSection.classList.add('show'); 
      }
    });
    gsap.to(content, {
      opacity:1,
      y:0,
      duration:0.9,
      delay:0.6,
      ease:"power3.out"
    });
  } else {
    clouds.forEach(c => c.classList.add('show','float'));
    content.classList.add('show');
    toggle.classList.add('mini');
    noteSection.classList.add('show');
  }
}

function animateClose(){
  toggle.classList.remove('active');
  clouds.forEach(c => c.classList.remove('float'));

  if(window.gsap){
    gsap.to(clouds, { opacity:0, duration:0.8, ease:"power3.in" });
    gsap.to(content, { opacity:0, y:40, duration:0.6, ease:"power3.in" });
  } else {
    clouds.forEach(c => c.classList.remove('show','float'));
    content.classList.remove('show');
  }

  body.classList.remove('show-bg');
  noteSection.classList.remove('show');
}

toggle.addEventListener('click', () => {
  toggle.classList.contains('active') ? animateClose() : animateOpen();
});

toggle.addEventListener('keydown', (e) => {
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    toggle.click();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      noteContents.forEach(el => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        });
      });
    } else {
      noteContents.forEach(el => {
        gsap.to(el, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power3.in"
        });
      });
    }
  });
}, { threshold: 0.2 });

toggle.addEventListener('click', () => {
  if(toggle.classList.contains('active')){
    noteContents.forEach(el => observer.observe(el));
  }
});
