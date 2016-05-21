module.exports = {

    VERSION: "Kiel #1 Team",

    bet_request: function (game_state, bet) {
        var small = game_state.small_blind;
        var we;
        game_state.players.forEach(function (player) {
            if (player.name == 'All In') {
                we = player;
                console.log(we);
            }
        });

        bet(Math.floor((Math.random() * 1000) + 300));

    },

    showdown: function (game_state) {

    }
};