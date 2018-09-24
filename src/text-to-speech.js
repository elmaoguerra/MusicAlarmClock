const fs = require('fs');
const mplayer = require('./mplayer');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');


const api = {
    convert(audioName, text) {
        // Creates a client
        const client = new textToSpeech.TextToSpeechClient();

        // The text to synthesize
        // const text = 'Hello, world!';

        // Construct the request
        const request = {
            input: { text: text },
            // Select the language and SSML Voice Gender (optional)
            voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
            // Select the type of audio encoding
            audioConfig: { audioEncoding: 'MP3' },
        };

        // Performs the Text-to-Speech request
        client.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error('ERROR:', err);
                return;
            }

            // Write the binary audio content to a local file
            const audioFile = `audios/${audioName}.mp3`;
            fs.writeFile(audioFile, response.audioContent, 'binary', err => {
                if (err) {
                    console.error('ERROR:', err);
                    return;
                }
                const path = __dirname +`/${audioFile}`;
                console.log(path);
                
                mplayer.playSound(path);
            });
        });
    }
}

module.exports = api;