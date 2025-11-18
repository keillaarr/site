// script.js (defer)
window.addEventListener("DOMContentLoaded", () => {

  // ---------- Particles ----------
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles:{ number:{value:40,density:{enable:true,value_area:800}}, color:{value:"#ffffff"}, shape:{type:"circle"}, opacity:{value:0.7}, size:{value:3,random:true}, line_linked:{enable:true,distance:140,color:"#ffffff",opacity:0.08,width:1}, move:{enable:true,speed:2,direction:"none",straight:false,out_mode:"out",bounce:false} },
      interactivity:{ detect_on:"canvas", events:{ onhover:{enable:true,mode:"grab"}, onclick:{enable:true,mode:"push"}, resize:true}, modes:{ grab:{distance:140,line_linked:{opacity:0.25}}, push:{particles_nb:4} } },
      retina_detect:true
    });
  }

  // ---------- Frases dinâmicas (typewriter loop com cursor) ----------
  const frases = [
  "Transformo ideias em experiências digitais: sites que encantam e sistemas que automatizam.",
  "Mais do que código, entrego propósito, performance e resultado.",
  "Códigos, ideias e uma xícara de chá é assim que soluções ganham vida."
  ];
  const fraseElemento = document.getElementById("frase-dinamica");
  let fIndex = 0, lIndex = 0, escrevendo = true;
  function animarFrase(){
    const atual = frases[fIndex];
    if(escrevendo){
      if(lIndex < atual.length){
        fraseElemento.textContent += atual.charAt(lIndex++);
        setTimeout(animarFrase, 35);
      } else {
        escrevendo = false;
        setTimeout(animarFrase, 1800);
      }
    } else {
      if(lIndex > 0){
        fraseElemento.textContent = atual.substring(0, --lIndex);
        setTimeout(animarFrase, 20);
      } else {
        escrevendo = true;
        fIndex = (fIndex + 1) % frases.length;
        setTimeout(animarFrase, 400);
      }
    }
  }
  animarFrase();

  // ---------- Código digitando no "terminal" (linha por linha) ----------
  const codigoLinhas = [
    "// Arquivo: keilla.js",
    "const keilla = {",
    '  nome: "Keilla Arruda",',
    '  profissao: "Desenvolvedora Web",',
    "  cha: true,",
    '  paixao: "Transformar projetos em experiências digitais com propósito.",',
    "};",
    'console.log("Olá! Sou a Keilla e estou pronta pra codar seu sucesso!");'
  ];
  const pre = document.getElementById("codigo-digitado");
  function digitarCodigo(linha=0){
    if(linha >= codigoLinhas.length) return;
    const texto = codigoLinhas[linha];
    let i = 0;
    const linhaEl = document.createElement("div");
    linhaEl.className = "mb-0";
    pre.appendChild(linhaEl);

    function digitaChar(){
      if(i < texto.length){
        linhaEl.textContent += texto.charAt(i++);
        pre.scrollTop = pre.scrollHeight;
        setTimeout(digitaChar, 18 + Math.random()*10);
      } else {
        // pequena pausa entre linhas
        setTimeout(()=> digitarCodigo(linha+1), 200);
      }
    }
    digitaChar();
  }
  digitarCodigo();

  // add cursor on the right-hand side last line
  const cursor = document.createElement("span");
  cursor.id = "cursor";
  cursor.textContent = " ";
  // append cursor to pre after a brief delay (when at least one node exists)
  setTimeout(()=> { pre.appendChild(cursor); }, 400);

  // ---------- EmailJS (init) ----------
  if (window.emailjs) {
    emailjs.init("FgJQsG9UMJEsw68-5"); // mantém a sua chave
  }

  const form = document.getElementById("form-contato");
  const msgSucesso = document.getElementById("mensagem-sucesso");
  if (form) {
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const dados = {
        nome: form.nome.value,
        email: form.email.value,
        mensagem: form.mensagem.value
      };
      // ajuste service/template conforme o seu EmailJS
      emailjs.send("service_oi08ztj","template_v1ieglv",dados)
        .then(()=> {
          msgSucesso.classList.remove("hidden");
          msgSucesso.style.opacity = "1";
          form.reset();
          setTimeout(()=> {
            msgSucesso.style.opacity = "0";
            setTimeout(()=> msgSucesso.classList.add("hidden"), 400);
          }, 5000);
        })
        .catch(()=> {
          alert("Erro ao enviar. Tente novamente mais tarde.");
        });
    });
  }

  // ---------- Scroll progress ----------
  const progress = document.getElementById("scroll-progress");
  function atualizarProgresso(){
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    if(progress) progress.style.width = scrolled + "%";
  }
  window.addEventListener("scroll", atualizarProgresso);
  atualizarProgresso();

  // ---------- Scroll reveal (IntersectionObserver) ----------
  const revealEls = document.querySelectorAll("section, .service-card, .tech-badge");
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) {
        entry.target.classList.add("opacity-100","translate-y-0");
        entry.target.classList.remove("opacity-0","-translate-y-6");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el=>{
    el.classList.add("opacity-0","-translate-y-6","transition","duration-700","ease-out");
    obs.observe(el);
  });




  // Efeito do header ao rolar
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Toggle do menu mobile
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("open");
    mobileMenu.classList.toggle("show");
  });

  // Fecha menu ao clicar em um link
  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      toggleBtn.classList.remove("open");
      mobileMenu.classList.remove("show");
    });
  });



});
