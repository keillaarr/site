window.addEventListener("DOMContentLoaded", () => {

  // ---------- EmailJS Init ----------
  emailjs.init("FgJQsG9UMJEsw68-5");

  // ---------- Digitação estilo console ----------
  const codigo = [
    "// Arquivo: keilla.js",
    "const keilla = {",
    '  nome: "Keilla Arruda",',
    '  profissão: "Desenvolvedora Web",',
    "  cha: true,",
    '  paixao: "Transformar projetos em experiências digitais com propósito.",',
    "};",
    'console.log("Olá! Sou a Keilla e estou pronta pra codar seu sucesso.");'
  ];

  const pre = document.getElementById("codigo-digitado");
  const cursor = document.createElement("span");
  cursor.id = "cursor";
  cursor.textContent = "|";
  pre.appendChild(cursor);

  let linha = 0;
  function digitarLinha() {
    if(linha >= codigo.length) return;
    const texto = codigo[linha];
    let i=0;
    const linhaHTML = document.createElement("div");
    function digitarChar(){
      if(i<texto.length){
        linhaHTML.innerHTML += texto.charAt(i);
        if(!pre.contains(linhaHTML)) pre.insertBefore(linhaHTML, cursor);
        i++;
        setTimeout(digitarChar,20);
      } else { linha++; setTimeout(digitarLinha,120);}
    }
    digitarChar();
  }
  digitarLinha();

  // ---------- Frases dinâmicas ----------
  const frases = [
    "Um bom site começa com uma boa conversa. Bora tirar seu projeto do papel?",
    "Sites feitos com design, propósito e muitos chás energéticos.",
    "Código com propósito. Resultado com alma. Seu site exclusivo, feito com paixão."
  ];

  const fraseElemento = document.getElementById("frase-dinamica");
  let fraseIndex=0, letraIndex=0, escrevendo=true;
  fraseElemento.textContent="";
  function digitarFrase(){
    const fraseAtual = frases[fraseIndex];
    if(escrevendo){
      if(letraIndex<fraseAtual.length){ fraseElemento.textContent += fraseAtual.charAt(letraIndex); letraIndex++; setTimeout(digitarFrase,45); }
      else { escrevendo=false; setTimeout(digitarFrase,2000);}
    } else {
      if(letraIndex>0){ fraseElemento.textContent = fraseAtual.substring(0,letraIndex-1); letraIndex--; setTimeout(digitarFrase,25);}
      else { escrevendo=true; fraseIndex=(fraseIndex+1)%frases.length; setTimeout(digitarFrase,600);}
    }
  }
  digitarFrase();

  // ---------- Partículas ----------
  particlesJS("particles-js", {
    particles:{ number:{value:50,density:{enable:true,value_area:800}}, color:{value:"#ffffff"}, shape:{type:"circle"}, opacity:{value:0.5}, size:{value:3,random:true}, line_linked:{enable:true,distance:150,color:"#ffffff",opacity:0.3,width:1}, move:{enable:true,speed:2,direction:"none",straight:false,out_mode:"out",bounce:false} },
    interactivity:{ detect_on:"canvas", events:{ onhover:{enable:true,mode:"grab"}, onclick:{enable:true,mode:"push"}, resize:true}, modes:{ grab:{distance:140,line_linked:{opacity:0.5}}, push:{particles_nb:4} } },
    retina_detect:true
  });

  // ---------- Formulário ----------
  const form = document.getElementById("form-contato");
  const msgSucesso = document.getElementById("mensagem-sucesso");
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const dados = { nome: form.nome.value, email: form.email.value, mensagem: form.mensagem.value };
    emailjs.send("service_oi08ztj","template_v1ieglv",dados)
      .then(res=>{ msgSucesso.style.display="block"; setTimeout(()=>msgSucesso.style.display="none",5000); form.reset(); })
      .catch(err=>alert("Erro ao enviar. Tente novamente."));
  });

  // ---------- Scroll Progress ----------
  const progress = document.getElementById("scroll-progress");
  window.addEventListener("scroll",()=>{
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progress.style.width = scrolled+"%";
  });

});
