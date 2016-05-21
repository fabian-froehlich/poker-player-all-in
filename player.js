module.exports = {

    VERSION: "Kiel #1 Team",

    bet_request: function (game_state, bet) {
        var sb = game_state.small_blind;
        var orbits = game_state.orbits;
        var cc = game_state.community_cards;
        var cb = game_state.current_buy_in;
        var pot = game_state.pot;
        var we;
        game_state.players.forEach(function (player) {
            if (player.name == 'All In') {
                we = player;
                console.log(we);
            }
        });

        var max = 1000;
        var min = 300;
        bet(Math.floor(Math.random()*(max-min+1)+min));

        console.log("Printing Community Cards");
        console.log(cc);
        cc.forEach(function(card){
                   console.log("Cards"+card);
                   });

    },

    showdown: function (game_state) {

    }
};