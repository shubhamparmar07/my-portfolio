document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("mainNav");
  const backTop = document.getElementById("backTop");
  const toast = document.getElementById("toastMessage");
  const form = document.getElementById("contactForm");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  function onScroll(){
    nav.classList.toggle("scrolled", window.scrollY > 30);
    backTop.classList.toggle("show", window.scrollY > 500);

    let current = "home";
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 150) current = section.id;
    });
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  document.querySelectorAll(".navbar-collapse .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const menu = document.getElementById("navMenu");
      if (menu.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(menu).hide();
    });
  });

  backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  if (window.matchMedia("(pointer:fine)").matches) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+"px"; dot.style.top=my+"px"; });
    function cursorLoop(){
      rx += (mx-rx)*.15; ry += (my-ry)*.15;
      ring.style.left=rx+"px"; ring.style.top=ry+"px";
      requestAnimationFrame(cursorLoop);
    }
    cursorLoop();
    document.querySelectorAll("a,button,.tilt-card,input,textarea").forEach(el=>{
      el.addEventListener("mouseenter",()=>ring.classList.add("active"));
      el.addEventListener("mouseleave",()=>ring.classList.remove("active"));
    });
  }

  document.querySelectorAll(".tilt-card").forEach(card=>{
    card.addEventListener("mousemove", e=>{
      if(!window.matchMedia("(pointer:fine)").matches) return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${(-y*4).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg) translateY(-3px)`;
    });
    card.addEventListener("mouseleave",()=>card.style.transform="");
  });

  document.querySelectorAll(".magnetic").forEach(btn=>{
    btn.addEventListener("mousemove",e=>{
      const r=btn.getBoundingClientRect();
      const x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
      btn.style.transform=`translate(${x*.12}px,${y*.12}px)`;
    });
    btn.addEventListener("mouseleave",()=>btn.style.transform="");
  });

  form.addEventListener("submit", e=>{
    e.preventDefault();
    toast.classList.add("show");
    setTimeout(()=>toast.classList.remove("show"),3500);
  });
});
