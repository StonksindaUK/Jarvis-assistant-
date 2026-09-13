const button = document.getElementById("listenButton");
const output = document.getElementById("output");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    output.textContent =
        "Sorry, speech recognition is not supported in this browser.";
} else {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    button.addEventListener("click", () => {

        output.textContent = "Listening...";

        recognition.start();

    });

    recognition.onresult = (event) => {

        const speech =
            event.results[0][0].transcript;

        output.textContent =
            "You said: " + speech;

        console.log("User:", speech);

        jarvisSpeak(
            "I heard you say " + speech
        );
    };

    recognition.onerror = (event) => {

        output.textContent =
            "I couldn't hear you.";

        console.log(event.error);
    };
}


function jarvisSpeak(text) {

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 0.95;

    speech.pitch = 0.8;

    window.speechSynthesis.speak(speech);
}
