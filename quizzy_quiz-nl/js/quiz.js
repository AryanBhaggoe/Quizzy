document.addEventListener("DOMContentLoaded", () => {
    let quizVraag = document.getElementById("quiz-vraag");
    let antwoordContainer = document.getElementById("antwoord-container");
    let resultaat = document.getElementById("resultaat");
    let timerElement = document.getElementById("sec1-timer");

    let quiz = [
        { vraag: "Wat voor soort democratie heeft Nederland?", opties: ["Directe democratie", "Indirecte democratie", "Absolute monarchie", "Dictatuur"], correct: 1 },
        { vraag: "Wie is het staatshoofd van Nederland?", opties: ["De minister-president", "De Koning", "De voorzitter van de Tweede Kamer", "De burgemeester van Den Haag"], correct: 1 },
        { vraag: "Hoe vaak zijn er Tweede Kamerverkiezingen in Nederland?", opties: ["Elke 2 jaar", "Elke 4 jaar", "Elke 5 jaar", "Elke 6 jaar"], correct: 1 },
        { vraag: "Welke macht controleert de regering in een democratie?", opties: ["De uitvoerende macht", "De rechterlijke macht", "De wetgevende macht", "De media"], correct: 1 },
        { vraag: "Wat is de kiesgerechtigde leeftijd in Nederland?", opties: ["16 jaar", "18 jaar", "21 jaar", "25 jaar"], correct: 1 },
        { vraag: "Wat is de rol van de Eerste Kamer in Nederland?", opties: ["Wetten maken", "Wetten goedkeuren of verwerpen", "De regering controleren", "Rechtspreken"], correct: 1 },
        { vraag: "Hoeveel zetels heeft de Tweede Kamer?", opties: ["100", "120", "150", "200"], correct: 1 },
        { vraag: "Wie benoemt de ministers in Nederland?", opties: ["De Koning", "De Tweede Kamer", "De minister-president", "De Eerste Kamer"], correct: 1 },
        { vraag: "Wat is de taak van de Raad van State?", opties: ["Wetten controleren", "Advies geven over wetgeving", "Rechtspreken", "De begroting goedkeuren"], correct: 1 },
        { vraag: "Wat is een coalitie in de Nederlandse politiek?", opties: ["Een groep burgers die protesteert", "Een samenwerking tussen politieke partijen", "Een wetgevende macht", "Een rechterlijke macht"], correct: 1 },
        { vraag: "Hoe heet de grondwet van Nederland?", opties: null, correctAntwoord: "grondwet" },
        { vraag: "Wat is de naam van het parlement van Nederland?", opties: null, correctAntwoord: "Staten-generaal" },
        { vraag: "Wie ondertekent wetten in Nederland?", opties: null, correctAntwoord: "Koning" },
        { vraag: "Wat is de hoofdstad van Nederland?", opties: null, correctAntwoord: "Amsterdam" },
        { vraag: "Welke partij won de Tweede Kamerverkiezingen van 2023?", opties: null, correctAntwoord: "PVV" },

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

        if (vraag.opties) {
            vraag.opties.forEach((optie, index) => {
                const button = document.createElement("button");
                button.classList.add("antwoord-knop");
                button.innerText = optie;
                button.dataset.index = index;
                button.addEventListener("click", () => controleerAntwoord(index));
                antwoordContainer.appendChild(button);
            });
        } else {
            const textarea = document.createElement("textarea");
            textarea.placeholder = "Typ hier je antwoord...";
            textarea.classList.add("open-vraag");
            antwoordContainer.appendChild(textarea);
            const submitButton = document.createElement("button");
            submitButton.innerText = "Verstuur";
            submitButton.classList.add("verzend-knop");
            submitButton.addEventListener("click", () => controleerAntwoordOpenVraag(textarea.value, vraag.correctAntwoord));
            antwoordContainer.appendChild(submitButton);
        }
        // Verander de afbeelding bij elke vraag
        veranderAfbeelding();
    }

    function veranderAfbeelding() {
        let afbeeldingElement = document.getElementById("quiz-afbeelding");
    
        let afbeeldingen = [
            "../foto's/Wat-is-een-democratie-03-03.png",
            "../foto's/550x838.jpg",
            "../foto's/Red+pencil.jpg",
            "../foto's/Wat-is-een-democratie-03-03.png",
            "../foto's/leeftijdsbord-43593.png",
            "../foto's/plenaire_zaal_th_230821009.jpg",
            "../foto's/Red+pencil.jpg",
            "../foto's/pvv-er-emiel-van-dijk-tijdens-een-debat-in-de-tweede-kamer-webp",
            "../foto's/3840x2160a.jpg",
            "../foto's/https_www.webp",
            "../foto's/nederlandse-vlag-online-bestellen.gif",
            "../foto's/plenaire_zaal_th_230821009.jpg",
            "../foto's/webwetten-en-regels-jpg",
            "../foto's/698.jpg",
            "../foto's/https__www.webp"
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

    function controleerAntwoordOpenVraag(antwoord, correctAntwoord) {
        if (antwoord.trim().toLowerCase() === correctAntwoord) {
            score++;
            resultaat.innerText = "✅ Correct!";
            resultaat.style.color = "green";
        } else {
            resultaat.innerText = "❌ Fout!";
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
