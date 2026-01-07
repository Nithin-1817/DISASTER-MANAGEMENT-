// ===============================
// READ DISASTER FROM URL
// ===============================
const params = new URLSearchParams(window.location.search);
const disaster = params.get("type");

const title = document.getElementById("disasterTitle");
const content = document.getElementById("tabContent");

// ===============================
// ALL DISASTER DATA + QUIZ
// ===============================
const data = {

    flood: {
        about: "Flood is a natural disaster caused by heavy rainfall leading to overflow of rivers and water bodies. It affects life, agriculture and infrastructure.",
        causes: "Heavy rainfall, river overflow, dam failure and poor drainage systems.",
        emergency: "Emergency: 112 | NDRF: 9711077372 | Ambulance: 108",
        before: "Prepare emergency kit, identify shelters and follow weather alerts.",
        during: "Move to higher ground and avoid flood water. Switch off electricity.",
        after: "Return only after clearance. Drink safe water and clean surroundings.",
        dos: ["Switch off electricity", "Carry emergency kit", "Follow alerts"],
        donts: ["Do not walk in flood water", "Do not touch wires", "Do not panic"],
        quiz: [
            {
                question: "Main cause of floods is?",
                options: ["Earthquake", "Heavy rainfall", "Volcano"],
                answer: 1
            },
            {
                question: "Which number is emergency helpline?",
                options: ["100", "112", "101"],
                answer: 1
            }
        ]
    },

    earthquake: {
        about: "Earthquake is sudden shaking of earth due to tectonic plate movement.",
        causes: "Tectonic movement, volcanic activity.",
        emergency: "Emergency: 112 | Ambulance: 108",
        before: "Identify safe places and prepare emergency kit.",
        during: "Drop, Cover and Hold On.",
        after: "Check injuries and avoid damaged buildings.",
        dos: ["Take cover", "Stay calm"],
        donts: ["Do not use lifts", "Do not run"],
        quiz: [
            {
                question: "Earthquake is caused by?",
                options: ["Rainfall", "Tectonic plates", "Fire"],
                answer: 1
            }
        ]
    },

    cyclone: {
        about: "Cyclone is a strong storm with heavy rain and winds.",
        causes: "Low pressure over warm oceans.",
        emergency: "Emergency: 112 | Cyclone Control: 1078",
        before: "Store food and water.",
        during: "Stay indoors.",
        after: "Avoid fallen wires.",
        dos: ["Follow alerts"],
        donts: ["Do not go near sea"],
        quiz: [
            {
                question: "Cyclones mainly affect?",
                options: ["Mountains", "Coastal areas", "Deserts"],
                answer: 1
            }
        ]
    },

    fire: {
        about: "Fire accidents occur due to uncontrolled flames.",
        causes: "Short circuit, gas leakage.",
        emergency: "Fire Service: 101",
        before: "Install fire extinguisher.",
        during: "Evacuate immediately.",
        after: "Do not re-enter building.",
        dos: ["Use stairs"],
        donts: ["Do not panic"],
        quiz: [
            {
                question: "Fire service number is?",
                options: ["108", "101", "112"],
                answer: 1
            }
        ]
    },

    landslide: {
        about: "Landslide is movement of soil and rocks down a slope.",
        causes: "Heavy rainfall, deforestation.",
        emergency: "Emergency: 112",
        before: "Avoid construction on slopes.",
        during: "Move to safe area.",
        after: "Report damage.",
        dos: ["Stay alert"],
        donts: ["Do not ignore warnings"],
        quiz: [
            {
                question: "Landslides occur mainly in?",
                options: ["Plains", "Hilly areas", "Oceans"],
                answer: 1
            }
        ]
    },

    heatwave: {
        about: "Heatwave is prolonged extreme hot weather.",
        causes: "High atmospheric pressure.",
        emergency: "Health Helpline: 108",
        before: "Store water.",
        during: "Stay indoors.",
        after: "Drink water.",
        dos: ["Stay hydrated"],
        donts: ["Do not over-exert"],
        quiz: [
            {
                question: "Heatwave affects which group most?",
                options: ["Elderly", "Fish", "Machines"],
                answer: 0
            }
        ]
    }
};

// ===============================
// PAGE LOAD CHECK
// ===============================
if (!disaster || !data[disaster]) {
    title.innerText = "No Disaster Selected";
    content.innerText = "Please go back and select a disaster.";
} else {
    title.innerText = disaster.toUpperCase() + " – Disaster Information";
    openTab("about");
}

// ===============================
// TAB HANDLER
// ===============================
function openTab(tab) {
    const d = data[disaster];
    let html = "";

    if (tab === "about") html = d.about;
    if (tab === "causes") html = d.causes;
    if (tab === "emergency") html = d.emergency;
    if (tab === "before") html = d.before;
    if (tab === "during") html = d.during;
    if (tab === "after") html = d.after;

    if (tab === "dosdonts") {
        html = "<h3>Do’s</h3><ul>" +
            d.dos.map(i => `<li>${i}</li>`).join("") +
            "</ul><h3>Don’ts</h3><ul>" +
            d.donts.map(i => `<li>${i}</li>`).join("") +
            "</ul>";
    }

    if (tab === "quiz") {
        html = "<h3>MCQ Quiz</h3>";
        d.quiz.forEach((q, i) => {
            html += `<p>${i + 1}. ${q.question}</p>`;
            q.options.forEach((op, idx) => {
                html += `
                <label>
                    <input type="radio" name="q${i}"
                    onclick="checkAnswer(${i}, ${idx})">
                    ${op}
                </label><br>`;
            });
        });
        html += `<p id="quizResult"></p>`;
    }

    content.innerHTML = html;
}

// ===============================
// QUIZ ANSWER CHECK
// ===============================
function checkAnswer(qIndex, selected) {
    const correct = data[disaster].quiz[qIndex].answer;
    const result = document.getElementById("quizResult");

    if (selected === correct) {
        result.innerHTML = "✅ Correct Answer!";
        result.style.color = "green";
    } else {
        result.innerHTML = "❌ Wrong Answer!";
        result.style.color = "red";
    }
}
