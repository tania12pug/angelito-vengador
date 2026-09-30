/* =====================================================
   ANGELITO VENGADOR.exe
   JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       SONIDOS DEL SISTEMA
    ========================================= */

    let audioContext;


    function initAudio() {

        if (!audioContext) {

            audioContext =
                new (window.AudioContext ||
                window.webkitAudioContext)();

        }

        if (audioContext.state === "suspended") {

            audioContext.resume();

        }

    }


    /* =========================================
       SONIDOS DE BOTONES Y GEMAS
    ========================================= */

    function playSound(type) {

        initAudio();

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();


        oscillator.connect(gain);

        gain.connect(
            audioContext.destination
        );


        /* SONIDO DE BOTÓN */

        if (type === "click") {

            oscillator.type = "square";

            oscillator.frequency.setValueAtTime(
                650,
                audioContext.currentTime
            );

            gain.gain.setValueAtTime(
                0.035,
                audioContext.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.08
            );

            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.08
            );

        }


        /* SONIDO DE GEMA */

        if (type === "gem") {

            oscillator.type = "sine";

            oscillator.frequency.setValueAtTime(
                450,
                audioContext.currentTime
            );

            oscillator.frequency.exponentialRampToValueAtTime(
                900,
                audioContext.currentTime + 0.25
            );

            gain.gain.setValueAtTime(
                0.05,
                audioContext.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.35
            );

            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.35
            );

        }

    }


    /* =========================================
       MÚSICA DE FONDO
       USA EL AUDIO DEL HTML
    ========================================= */

    const backgroundMusic =
        document.getElementById("backgroundMusic");


    if (backgroundMusic) {

        backgroundMusic.volume = 0.18;

        backgroundMusic.loop = true;

    }


    /* =========================================
       SONIDO AL PRESIONAR BOTONES
    ========================================= */

    document
        .querySelectorAll("button")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    playSound("click");

                }
            );

        });


    /* =========================================
       CAMBIO DE PANTALLAS
    ========================================= */

    function showScreen(id) {

        const screens =
            document.querySelectorAll(".screen");


        screens.forEach(function (screen) {

            screen.classList.add("hidden");

        });


        const nextScreen =
            document.getElementById(id);


        if (nextScreen) {

            nextScreen.classList.remove(
                "hidden"
            );


            nextScreen.style.display =
                "flex";


            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    }


    /* =========================================
       BOTÓN INICIAR
    ========================================= */

    const startButton =
        document.getElementById("startButton");


    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {


                /* INICIAR MÚSICA */

                if (backgroundMusic) {

                    backgroundMusic
                        .play()
                        .catch(function (error) {

                            console.log(
                                "No se pudo iniciar la música:",
                                error
                            );

                        });

                }


                /* CAMBIAR TEXTO */

                startButton.innerText =
                    "INICIANDO...";


                /* DESACTIVAR BOTÓN */

                startButton.disabled =
                    true;


                /* CAMBIAR DE PANTALLA */

                setTimeout(function () {

                    showScreen("profile");

                }, 700);

            }
        );

    }


    /* =========================================
       BOTONES CONTINUAR
    ========================================= */

    const nextButtons =
        document.querySelectorAll(
            "[data-next]"
        );


    nextButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const destination =
                    this.getAttribute(
                        "data-next"
                    );


                showScreen(destination);

            }
        );

    });


    /* =========================================
       GEMAS
    ========================================= */

    const gems =
        document.querySelectorAll(".gem");


    const modal =
        document.getElementById(
            "gemModal"
        );


    const closeModal =
        document.getElementById(
            "closeModal"
        );


    const modalTitle =
        document.getElementById(
            "modalTitle"
        );


    const modalText =
        document.getElementById(
            "modalText"
        );


    const modalIcon =
        document.getElementById(
            "modalGemIcon"
        );


    const counter =
        document.getElementById(
            "gemCounter"
        );


    const memoryButton =
        document.getElementById(
            "memoryButton"
        );


    let unlocked = 0;


    const gemData = [

        {
            title: "GEMA DEL PODER",
            color: "red",
            text: "Mi amor, esta gema representa la fuerza que has demostrado incluso en los momentos difíciles. Desde que te conozco he podido ver esa parte de ti que nunca se rinde, que sigue adelante y que siempre busca la manera de superar cualquier obstáculo. Pero también representa la fuerza que hemos encontrado juntos, porque incluso cuando las cosas no salen como queremos, siempre terminamos encontrando una razón para seguir adelante y crear nuevos recuerdos."
        },


        {
            title: "GEMA DE LA CONFIANZA",
            color: "blue",
            text: "Mi vida, esta gema representa algo que para mí vale muchísimo: la confianza que hemos construido entre nosotros. Poder contarte mis cosas, saber que puedo ser yo misma contigo y sentir que puedo apoyarme en ti hace que nuestra relación sea todavía más especial. Espero que siempre podamos seguir teniendo esa confianza para hablar, reírnos, escucharnos y acompañarnos en todo lo que venga."
        },


        {
            title: "GEMA DEL TIEMPO",
            color: "green",
            text: "Mi cielo, esta gema representa todo el tiempo que hemos compartido y todos esos pequeños momentos que quizá parecen normales, pero que para mí significan muchísimo. Cada conversación, cada salida, cada risa, cada abrazo y hasta esos momentos en los que simplemente estamos juntos se han convertido en recuerdos que quiero guardar. Y si pudiera pedir algo, sería tener muchísimo más tiempo para seguir viviendo aventuras contigo."
        },


        {
            title: "GEMA DE LA ALEGRÍA",
            color: "yellow",
            text: "Mi niñito hermoso, esta gema representa todas las veces que has conseguido sacarme una sonrisa, incluso cuando no lo estabas intentando. Me encanta la cantidad de momentos en los que terminamos riéndonos por cualquier tontería y cómo contigo puedo sentirme feliz siendo simplemente yo. Hay recuerdos que quizá para otras personas no significarían mucho, pero que para mí se quedan guardados porque tienen algo en común: tú estabas ahí."
        },


        {
            title: "GEMA DEL AMOR",
            color: "purple",
            text: "Mi corazoncito de melocotón, esta es probablemente la gema más importante de todas. Representa todo ese cariño que ha ido creciendo con cada momento que hemos compartido. No se trata solamente de los momentos bonitos, sino también de elegirnos, escucharnos, apoyarnos y seguir construyendo algo juntos. Si esta misión tuviera una recompensa definitiva, sería poder seguir compartiendo contigo muchos cumpleaños, aventuras, risas y momentos que todavía ni siquiera hemos vivido."
        },


        {
            title: "GEMA DEL FUTURO",
            color: "orange",
            text: "Y por último pero no menos importante, esta gema representa todo lo que todavía nos queda por vivir. Todas las aventuras que aún no conocemos, los lugares que todavía no hemos visitado, las fotos que todavía no hemos tomado y los recuerdos que todavía no existen. No sé exactamente qué nos espera en el futuro, pero sí sé que me emociona pensar en todas las cosas que podremos vivir juntos. Esta misión todavía no termina; apenas estamos comenzando una nueva etapa."
        }

    ];


    gems.forEach(function (gem, index) {

        gem.addEventListener(
            "click",
            function () {


                /* SONIDO DE GEMA */

                playSound("gem");


                if (
                    gem.classList.contains(
                        "unlocked"
                    )
                ) {

                    return;

                }


                gem.classList.add(
                    "unlocked"
                );


                unlocked++;


                const data =
                    gemData[index];


                modalTitle.textContent =
                    data.title;


                modalText.textContent =
                    data.text;


                modalIcon.className =
                    "gem-icon " +
                    data.color;


                modal.classList.remove(
                    "hidden"
                );


                counter.textContent =
                    "GEMAS RECUPERADAS: " +
                    unlocked +
                    " / 6";


                if (unlocked === 6) {

                    memoryButton.classList.remove(
                        "hidden"
                    );

                }

            }
        );

    });


    /* =========================================
       CERRAR MODAL
    ========================================= */

    if (closeModal) {

        closeModal.addEventListener(
            "click",
            function () {

                modal.classList.add(
                    "hidden"
                );

            }
        );

    }


    /* =========================================
       CERRAR MODAL HACIENDO CLICK FUERA
    ========================================= */

    if (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }


    /* =========================================
       ARCHIVO DE RECUERDOS
    ========================================= */

    if (memoryButton) {

        memoryButton.addEventListener(
            "click",
            function () {

                showScreen("memories");

            }
        );

    }

});


/* =========================================
   PARTÍCULAS
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        for (let i = 0; i < 80; i++) {

            const particle =
                document.createElement(
                    "div"
                );


            particle.className =
                "particle";


            particle.style.left =
                Math.random() * 100 + "vw";


            particle.style.top =
                Math.random() * 100 + "vh";


            particle.style.animationDuration =
                (6 + Math.random() * 7) +
                "s";


            particle.style.animationDelay =
                -(Math.random() * 8) +
                "s";


            document.body.appendChild(
                particle
            );

        }

    }
);