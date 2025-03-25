document.addEventListener("DOMContentLoaded", () => {
    let quizVraag = document.getElementById("quiz-vraag");
    let antwoordContainer = document.getElementById("antwoord-container");
    let resultaat = document.getElementById("resultaat");
    let timerElement = document.createElement("p");
    timerElement.id = "sec1-timer";
    document.body.prepend(timerElement);

    let quiz = [
        { vraag: "In een democratie kiezen burgers hun vertegenwoordigers via verkiezingen.", opties: ["Juist", "Onjuist"], correct: 0 },
        { vraag: "Wat is de meest voorkomende vorm van democratie wereldwijd?", opties: ["Directe democratie", "Representatieve democratie", "Absolute monarchie", "Dictatuur"], correct: 1 },
        { vraag: "In welk land is de oudste nog bestaande democratie ontstaan?", opties: ["Verenigde Staten", "Athene, Griekenland", "Romeinse Rijk", "Verenigd Koninkrijk"], correct: 1 },
        { vraag: "Welke instelling zorgt in een democratie voor het naleven van de wet?", opties: ["De uitvoerende macht", "De wetgevende macht", "De rechterlijke macht", "De media"], correct: 2 },
        { vraag: "Wat is een grondrecht in een democratie?", opties: ["Vrijheid van meningsuiting", "Alle macht bij de koning", "Censuur", "Verbod op verkiezingen"], correct: 0 },
        { vraag: "Welke macht stelt de wetten op in een democratie?", opties: ["Uitvoerende macht", "Rechterlijke macht", "Wetgevende macht", "Media"], correct: 2 },
        { vraag: "Wie kiest de leden van het parlement in een democratie?", opties: ["De koning", "De burgers", "De minister-president", "De rechterlijke macht"], correct: 1 },
        { vraag: "Welke politieke stroming past het best bij een democratie?", opties: ["Totalitarisme", "Autocratie", "Liberalisme", "Dictatuur"], correct: 2 },
        { vraag: "Wat gebeurt er als een wet in strijd is met de grondwet?", opties: ["De wet blijft geldig", "De rechter kan de wet ongeldig verklaren", "De koning beslist", "De minister-president past de wet aan"], correct: 1 },
        
        // Open vragen
        { vraag: "Wat is het belangrijkste kenmerk van een democratie?", type: "open", correct: "vrijheid" },
        { vraag: "Welke groep mensen mag stemmen in een democratie?", type: "open", correct: "burgers" },
        { vraag: "Hoe heet het recht om te stemmen in verkiezingen?", type: "open", correct: "kiesrecht" },
        { vraag: "Wat is de naam van het document waarin de basisrechten van burgers zijn vastgelegd?", type: "open", correct: "grondwet" },
        { vraag: "Wat gebeurt er als een regering niet meer gesteund wordt door een meerderheid in het parlement?", type: "open", correct: "aftreden" }
    ];

    let huidigeVraag = 0;
    let score = 0;
    let tijd = 0;
    let timerInterval;

    function startTimer() {
        timerInterval = setInterval(() => {
            tijd++;
            timerElement.textContent = `Tijd: ${tijd} sec`;
        }, 1000);
    }

    function laadVraag() {
        const vraag = quiz[huidigeVraag];
        quizVraag.innerText = vraag.vraag;
        antwoordContainer.innerHTML = "";

        if (vraag.type === "open") {
            const input = document.createElement("input");
            input.type = "text";
            input.id = "open-antwoord";
            const button = document.createElement("button");
            button.innerText = "Verstuur";
            button.addEventListener("click", () => controleerOpenAntwoord(input.value));
            antwoordContainer.appendChild(input);
            antwoordContainer.appendChild(button);
        } else {
            vraag.opties.forEach((optie, index) => {
                const button = document.createElement("button");
                button.classList.add("antwoord-knop");
                button.innerText = optie;
                button.dataset.index = index;
                button.addEventListener("click", () => controleerAntwoord(index));
                antwoordContainer.appendChild(button);
            });
        }

        // Verander de afbeelding bij elke vraag
        veranderAfbeelding();
    }

    function veranderAfbeelding() {
        let afbeeldingElement = document.getElementById("quiz-afbeelding");
    
        let afbeeldingen = [
            "../foto's 2/images.jpeg",
            "../foto's 2/Wat-is-een-democratie-03-03.png",
            "../foto's 2/Red+pencil.jpg",
            "../foto's 2/webwetten-en-regels.jpg",
            "../foto's 2/webwetten-en-regels.jpg",
            "../foto's 2/Wat-is-een-democratie-03-03.png",
            "../foto's 2/Red+pencil.jpg",
            "../foto's 2/pvv-er-emiel-van-dijk-tijdens-een-debat-in-de-tweede-kamer-webp",
            "../foto's 2/webwetten-en-regels.jpg",
            "../foto's 2/webwetten-en-regels.jpg",
            "../foto's 2/college-1-site.jpg",
            "../foto's 2/images.jpeg",
            "../foto's 2/Red+pencil.jpg",
            "../foto's 2/webwetten-en-regels.jpg",
            "../foto's 2/ANP-512409029.webp"
        ];
    
        if (huidigeVraag < afbeeldingen.length) {
            afbeeldingElement.src = afbeeldingen[huidigeVraag];
        }
    }

    function controleerAntwoord(index) {
        const juisteAntwoord = quiz[huidigeVraag].correct;
        if (index === juisteAntwoord) {
            score++;
            resultaat.innerText = "✅ Correct!";
            resultaat.style.color = "green";
        } else {
            resultaat.innerText = "❌ Fout!";
            resultaat.style.color = "red";
        }
        setTimeout(volgendeVraag, 1000);
    }

    function controleerOpenAntwoord(antwoord) {
        const juisteAntwoord = quiz[huidigeVraag].correct.toLowerCase();
        if (antwoord.toLowerCase() === juisteAntwoord) {
            score++;
            resultaat.innerText = "✅ Correct!";
            resultaat.style.color = "green";
        } else {
            resultaat.innerText = "❌ Fout! Het juiste antwoord is: " + juisteAntwoord;
            resultaat.style.color = "red";
        }
        setTimeout(volgendeVraag, 1000);
    }

    function volgendeVraag() {
        huidigeVraag++;
        if (huidigeVraag < quiz.length) {
            laadVraag();
            resultaat.innerText = "";
        } else {
            clearInterval(timerInterval);
            quizVraag.innerText = "Quiz afgerond!";
            antwoordContainer.innerHTML = "";

            let minuten = Math.floor(tijd / 60);
            let seconden = tijd % 60;

            let scoreString = `Je score is ${score} van de ${quiz.length} vragen.`;
            let tijdString = `Je hebt de quiz in ${minuten} minuten en ${seconden} seconden voltooid.`;

            let eindeResultaat = document.createElement("div");
            eindeResultaat.innerHTML = `<p>${scoreString}</p><p>${tijdString}</p>`;
            antwoordContainer.appendChild(eindeResultaat);
        }
    }

    startTimer();
    laadVraag();
});
