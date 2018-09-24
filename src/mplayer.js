const shell = require('shelljs');

const mplayer = {
    playSound(audio){
        shell.exec(`mplayer ${audio}` );
    },

    playList(playlist){
        shell.exec(`mplayer -playlist ${playlist}`);
    }
}

module.exports = mplayer;