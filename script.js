
// Select button and content area
const btn = document.querySelector("#btn");
const content = document.querySelector("#content");

// Speak function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
}

// Greet user
function wishme() {
    const hr = new Date().getHours();
    if (hr < 12) speak("Good Morning!");
    else if (hr < 16) speak("Good Afternoon!");
    else speak("Good Evening!");
}
window.addEventListener("load", wishme);

// Setup recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.continuous = true;   // ✅ keeps listening
recognition.interimResults = false;

// Recognition events
recognition.onstart = () => content.innerText = "🎤 Always listening...";
recognition.onerror = (e) => content.innerText = "Error: " + e.error;

// Restart automatically if it stops
recognition.onend = () => {
    content.innerText = "Restarting listening...";
    recognition.start(); // ✅ auto-restart
};

// When speech is recognized
recognition.onresult = (e) => {
    const message = e.results[e.results.length - 1][0].transcript.toLowerCase();
    content.innerText = "You said: " + message;
    takeCommand(message);
};

// Command handler (keyword-based)
function takeCommand(message) {
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
        speak("Hello! How can I help you?");
    }
    else if (message.includes("who are you")) {
        speak("I am Orion, created by Shreya Bhatt .");
    }
    else if (message.includes("youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com", "_blank");
    }
    else if (message.includes("github")) {
        speak("Opening GitHub");
        window.open("https://github.com/shreyabhatt025", "_blank");
    }
    else if (message.includes("gemini")) {
        speak("Opening Gemini AI");
        window.open("https://gemini.google.com", "_blank");
    }
    else if (message.includes("time")) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        speak("The current time is " + time);
    }
    else {
        speak("Sorry, I did not understand that.");
    }
}

// Start recognition when mic button is clicked (one-time trigger)
btn.addEventListener("click", () => {
    recognition.start();
    speak("I am online and always listening now!");
});
