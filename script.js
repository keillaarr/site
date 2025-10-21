window.addEventListener("DOMContentLoaded", () => {
  function aguardarEmailjs(timeout = 3000, interval = 50) {
    return new Promise((resolve, reject) => {
      const start = Date.now();
      (function check() {
        if (window.emailjs) {
          resolve(window.emailjs);
        } else if (Date.now() - start > timeout) {
          reject(new Error("EmailJS não carregado após espera."));
        } else {
          setTimeout(check, interval);
        }
      })();
    });
  }

  aguardarEmailjs().then((emailjs) => {
    // Inicializa EmailJS com a Public Key
    emailjs.init("FgJQsG9UMJEsw68-5");

    // ----- Efeito digitação estilo console -----
    const codigo = [
      "// Arquivo: keilla.js",
      "",
      "const keilla = {",
      '  nome: "Keilla Arruda",',
      '  profissão: "Desenvolvedora Web",',
      "  cafe: false,",
      "  cha: true,",
      '  energia: ["chá de limão", "ideias criativas", "feedbacks sinceros"],',
      '  paixao: "Transformar projetos em experiências digitais com propósito.",',
      '  ferramentas: ["HTML", "CSS", "JavaScript", "Tailwind", "JAVA", "Vue.js", "SpringBoot"],',
      '  status: "Aceitando novos desafios!",',
      "};",
      "",
      'console.log("Olá! Sou a Keilla e estou pronta pra codar seu sucesso.");'
    ];

    const pre = document.getElementById("codigo-digitado");
    if (pre) {
      const cursor = document.createElement("span");
      cursor.id = "cursor";
      cursor.textContent = "|";
      pre.appendChild(cursor);

      let linha = 0;
      function digitarLinha() {
        if (linha >= codigo.length) return;

        const texto = codigo[linha];
        let i = 0;
        const linhaHTML = document.createElement("div");

        function digitarCaracter() {
          if (i < texto.length) {
            linhaHTML.innerHTML += texto.charAt(i);
            if (!pre.contains(linhaHTML)) pre.insertBefore(linhaHTML, cursor);
            i++;
            setTimeout(digitarCaracter, 20);
          } else {
            if (!pre.contains(linhaHTML)) pre.insertBefore(linhaHTML, cursor);
            linha++;
            setTimeout(digitarLinha, 120);
          }
        }

        digitarCaracter();
      }

      digitarLinha();
    } else {
      console.error("Elemento #codigo-digitado não encontrado.");
    }

    // ----- Frases dinâmicas no Hero -----
    const frases = [
      "Um bom site começa com uma boa conversa. Bora tirar seu projeto do papel?",
      "Sites feitos com design, propósito e muitos chás energéticos.",
      "Código com propósito. Resultado com alma. Seu site exclusivo, feito com paixão."
    ];

    const fraseElemento = document.getElementById("frase-dinamica");
    if (fraseElemento) {
      let fraseIndex = 0;
      let letraIndex = 0;
      let escrevendo = true;
      fraseElemento.textContent = "";

      function digitarFrase() {
        const fraseAtual = frases[fraseIndex];
        if (escrevendo) {
          if (letraIndex < fraseAtual.length) {
            fraseElemento.textContent += fraseAtual.charAt(letraIndex);
            letraIndex++;
            setTimeout(digitarFrase, 45);
          } else {
            escrevendo = false;
            setTimeout(digitarFrase, 2000);
          }
        } else {
          if (letraIndex > 0) {
            fraseElemento.textContent = fraseAtual.substring(0, letraIndex - 1);
            letraIndex--;
            setTimeout(digitarFrase, 25);
          } else {
            escrevendo = true;
            fraseIndex = (fraseIndex + 1) % frases.length;
            setTimeout(digitarFrase, 600);
          }
        }
      }

      digitarFrase();
    } else {
      console.error("Elemento #frase-dinamica não encontrado.");
    }

    // ----- Partículas de fundo -----
    if (window.particlesJS) {
      particlesJS("particles-js", {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.3,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    } else {
      console.error("particlesJS não encontrado.");
    }

    // ----- Envio do formulário com EmailJS -----
    const form = document.getElementById("form-contato");
    const mensagemSucesso = document.getElementById("mensagem-sucesso");

    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const dados = {
          nome: formData.get("nome"),
          email: formData.get("email"),
          mensagem: formData.get("mensagem")
        };

        emailjs.send("service_oi08ztj", "template_v1ieglv", dados)
          .then((response) => {
            console.log("E-mail enviado com sucesso!", response.status, response.text);
            mensagemSucesso?.classList.remove("hidden");
            setTimeout(() => {
              mensagemSucesso?.classList.add("hidden");
            }, 5000);
            form.reset();
          })
          .catch((error) => {
            console.error("Erro ao enviar e-mail:", error);
            alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
          });
      });
    } else {
      console.error("Formulário #form-contato não encontrado.");
    }
  }).catch((err) => {
    console.error(err.message);
  });
});
