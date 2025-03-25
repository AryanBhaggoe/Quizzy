let vragen = [
    { vraag: "Wat voor soort staatsvorm heeft België?", opties: ["Republiek", "Parlementaire monarchie", "Dictatuur", "Federatie"], correct: "Parlementaire monarchie", type: "meerkeuze" },
    { vraag: "Wie heeft de macht in België?", opties: ["De koning", "Het volk en verkozen vertegenwoordigers", "Het leger", "De kerk"], correct: "Het volk en verkozen vertegenwoordigers", type: "meerkeuze" },
    { vraag: "Hoeveel gewesten heeft België?", opties: ["Twee", "Drie", "Vier", "Vijf"], correct: "Drie", type: "meerkeuze" },
    { vraag: "Hoe vaak zijn er federale verkiezingen in België?", opties: ["Elke 4 jaar", "Elke 5 jaar", "Elke 6 jaar", "Elke 3 jaar"], correct: "Elke 5 jaar", type: "meerkeuze" },
    { vraag: "Hoeveel gemeenschappen heeft België?", opties: ["Twee", "Drie", "Vier", "Vijf"], correct: "Drie", type: "meerkeuze" },
    { vraag: "Welke rol heeft de koning in België?", opties: ["Alle macht", "Geen rol", "Ceremoniële en bemiddelende rol", "Regeert het land"], correct: "Ceremoniële en bemiddelende rol", type: "meerkeuze" },
    { vraag: "Wat voor politiek systeem heeft België?", opties: ["Eenpartijstelsel", "Meerpartijenstelsel", "Militaire dictatuur", "Absolute monarchie"], correct: "Meerpartijenstelsel", type: "meerkeuze" },
    { vraag: "Hoe vaak vinden gemeentelijke verkiezingen plaats?", opties: ["Elke 4 jaar", "Elke 5 jaar", "Elke 6 jaar", "Elke 3 jaar"], correct: "Elke 6 jaar", type: "meerkeuze" },
    { vraag: "Waarom duren onderhandelingen in België vaak lang?", opties: ["Door de koning", "Door de complexe structuur", "Door één sterke partij", "Door de rechtbank"], correct: "Door de complexe structuur", type: "meerkeuze" },
    { vraag: "Wat garandeert de rechten en vrijheden van burgers?", opties: ["De koning", "De politie", "De grondwet", "Het parlement"], correct: "De grondwet", type: "meerkeuze" },
    { vraag: "Noem een kenmerk van de Belgische democratie.", type: "open" },
    { vraag: "Wat is de rol van de koning bij de regeringsvorming?", type: "open" },
    { vraag: "Waarom heeft België een meerpartijenstelsel?", type: "open" },
    { vraag: "Welke macht is verantwoordelijk voor het maken van wetten in België?", type: "open" },
    { vraag: "Hoe wordt de scheiding der machten toegepast in België?", type: "open" }
];

let tijd = 0;
let timerElement = document.getElementById("sec1-timer");
let timerInterval;

// Start de timer

function startTimer() {
    clearInterval(timerInterval);
    tijd = 0;
    timerElement.textContent = `Tijd: ${tijd} sec`;
    timerInterval = setInterval(updateTimer, 1000); 
}

// Update de timer steeds

function updateTimer() {
    tijd++; 
    timerElement.textContent = `Tijd: ${tijd} sec`;
}

let huidigeVraag = 0;
let score = 0;
let antwoordGeselecteerd = false;

// Controleert het antwoord

function controleerAntwoord(antwoord) {

    let resultaat = document.getElementById('resultaat');
    
    if (vragen[huidigeVraag].type === "meerkeuze") {
        if (antwoord === vragen[huidigeVraag].correct) {
            score++;
            resultaat.textContent = "Correct!"
            resultaat.style.color = "lightgreen";
        } else {
            resultaat.textContent = "Fout!"
            resultaat.style.color = "red";
        }
        antwoordGeselecteerd = true;
    }
}

// De afbeeldingen die we gaan veranderen
function veranderAfbeelding() {
    let afbeeldingElement = document.getElementById("sec1-foto");

    let afbeeldingen = [
        "../media/staatsvorm.jpg",
        "../media/macht.jpg",
        "../media/gewesten.png",
        "../media/verkiezingen.jpg",
        "../media/gemeenschappen.jpg",
        "../media/koning.jpg",
        "../media/politiek.webp",
        "../media/gemeente.jpeg",
        "../media/onderhandeling.jpg",
        "../media/rechten.avif",
        "../media/democratie.jpeg",
        "../media/regeringsvorming.webp",
        "../media/meerpartijenstelsel.webp",
        "../media/wetgevende.avif",
        "../media/triaspolitica.jpg"
    ];

    if (huidigeVraag < afbeeldingen.length) {
        afbeeldingElement.src = afbeeldingen[huidigeVraag];
    }
}

// De vragen die we later gaan inladen in html

function laadVraag() {
    if (huidigeVraag < vragen.length) {
        document.getElementById("sec1-titel").textContent = `Quizzy Vraag ${huidigeVraag + 1}:`;
        document.getElementById("sec1-vraag").textContent = vragen[huidigeVraag].vraag;

        let antwoordOpties = document.getElementById("antwoord-opties");
        antwoordOpties.innerHTML = "";
        antwoordGeselecteerd = false;

        if (vragen[huidigeVraag].type === "meerkeuze") {
            vragen[huidigeVraag].opties.forEach((optie, index) => {
                let antwoordDiv = document.createElement("div");
                antwoordDiv.classList.add("ant-opties");
                antwoordDiv.innerHTML = `
                    <input type="radio" name="answer" value="${optie}" id="radio-${index}">
                    <p class="sec1-text"> <span class="sec1-vraagnummer">${['A', 'B', 'C', 'D'][index]}</span> <span class="sec1-vraagtext">${optie}</span> </p>
                `;
                antwoordDiv.addEventListener("click", () => {
                    document.getElementById(`radio-${index}`).checked = true;
                    controleerAntwoord(optie);
                });
                antwoordOpties.appendChild(antwoordDiv);
            });
        } else {
            let openVraagInput = document.createElement("textarea");
            openVraagInput.setAttribute("id", "open-vraag-antwoord");
            openVraagInput.setAttribute("placeholder", "Typ hier je antwoord...");
            openVraagInput.classList.add("open-antwoord");
            antwoordOpties.appendChild(openVraagInput);
            openVraagInput.style.width = '500px';
            openVraagInput.style.height = '400px';

            openVraagInput.addEventListener("input", () => {
                antwoordGeselecteerd = openVraagInput.value.trim() !== ""; 
            });
        }
        veranderAfbeelding();
        startTimer();
    } else {
        let tekstVoltooid = "<h2>Quiz Voltooid!</h2>";
        let tekstScore = `<p>Je Score: ${score} / ${vragen.length}</p>`;
        let section = document.querySelector(".section-1"); 
        section.innerHTML = tekstVoltooid + tekstScore;
      
        section.style.display = "flex";
        section.style.flexDirection = "column";
        section.style.justifyContent = "center";
        section.style.alignItems = "center";
        section.style.textAlign = "center";
        section.style.height = "100vh";
        section.style.fontFamily = '"Alexandria", sans-serif';
        section.style.fontWeight = "bold";
        section.style.fontSize = "40px";
    }
}

// De knoppen

document.getElementById("sec1-volgende-knop").addEventListener("click", function() {
    if (antwoordGeselecteerd) {
        huidigeVraag++;
        document.getElementById("resultaat").textContent = "";
        laadVraag();
    } else {
        alert("Selecteer of typ eerst een antwoord voordat je doorgaat!");
    }
});

document.getElementById("sec1-vorige-knop").addEventListener("click", function() {
    if (huidigeVraag > 0) {
        huidigeVraag--;
        document.getElementById("resultaat").textContent = "";
        laadVraag();
    }
});

// Inladen in de html
laadVraag();