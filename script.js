const pianoKeys = document.querySelectorAll('.piano-key'); 
const piano = document.querySelector('.piano');
const buttons = document.querySelectorAll('.btn'); 

const startSound = (event) => {
    event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
    const note = event.target.dataset.note;
    const audio = document.querySelector(`audio[data-note="${note}"]`);
    audio.currentTime = 0;
    audio.play();
};

const removeActiveKey = (event) => {
    event.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
}

const startCorrespondOver = (event) => {
    if (event.target.classList.contains("piano-key")) {
        event.target.classList.add("piano-key-active", "piano-key-active-pseudo");
    }

    pianoKeys.forEach((elem) => {
        elem.addEventListener("mouseover", startSound)
        elem.addEventListener("mouseout", removeActiveKey)
    });
}

const stopCorrespondOver = () => {
    pianoKeys.forEach((elem) => {
        elem.classList.remove("piano-key-active", "piano-key-active-pseudo");
        elem.removeEventListener("mouseover", startSound);
        elem.removeEventListener("mouseout", removeActiveKey);
    });
}

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver);
piano.addEventListener("mousedown", startSound);

window.addEventListener("keydown", (event) => {
    console.log(event);
    const audioKey = document.querySelector(`audio[data-key="${event.code}"]`);
    const pianoKey = document.querySelector(`.piano-key[data-key="${event.code}"]`);
    audioKey.currentTime = 0;
    audioKey.play(); 
    pianoKey.classList.add("piano-key-active");

    window.addEventListener("keyup", () => {
        pianoKey.classList.remove("piano-key-active");
    })
});

buttons.forEach(button => button.addEventListener('click', function() {
    if(this.classList.contains('btn-active')) return; 

    buttons.forEach(elems => elems.classList.remove('btn-active'));

    this.classList.add('btn-active');
    
    piano.classList.toggle('change-style')
}));