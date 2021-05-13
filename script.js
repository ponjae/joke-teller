const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const text = document.getElementById('joke')
const myKey = config.ApiKey;

// Disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Get jokes from Joke API
async function getJokes() {
    let joke = '';
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data = await response.json();
        if (data.setup) { // Check if it is a two part joke
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        talkToMe(joke);
        toggleButton();
    } catch (error) {
        console.log('Whoops', error)
    }
}

// Passing joke to VoiceAPI
function talkToMe(joke) {
    console.log('Tell me: ', joke);
    text.innerHTML = joke;
    VoiceRSS.speech({
        key: myKey,
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);