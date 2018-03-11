//create new SpeechSynthesisUtterance object
const msg = new SpeechSynthesisUtterance();//what the voicebox will say
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

//add voices to dropdown menu
function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

//set the voice that will be used
function setVoice() {
  msg.voice = voices.find(voice => voice.name == this.value);
  toggle()
}

//ensure that the speech will start over when  a voice is changed
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

//change the rate and pitch of speed
function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

//event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
