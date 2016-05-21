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
                console.log("Printing Player")
                console.log(we);
            }
        });
        var hc = we.hole_cards;
        console.log("Printing Whole Cards:");
        console.log(hc);
        console.log("Printing All Community Cards");
        console.log(cc);
        console.log("Printing CC in loop")
        cc.forEach(function (card) {
            console.log("Cards");
            console.log(card);
        });
        
        var max = 1000;
        var min = 300;
        bet(Math.floor(Math.random() * (max - min + 1) + min));

    },

    showdown: function (game_state) {

    }
};