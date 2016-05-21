var ranker = require("./ranker");
module.exports = {

    VERSION: "Objects in mirror are closer than they appear",

    bet_request: function (game_state, bet) {
        //max and min for random bet
        var max = 1000;
        var min = 300;
        try {
            var sb = game_state.small_blind;
            var orbits = game_state.orbits;
            var cc = game_state.community_cards;
            var cb = game_state.current_buy_in;
            var pot = game_state.pot;
            var we;

            game_state.players.forEach(function (player) {
                if (player.name == 'All In') {
                    we = player;
                    console.log("Printing Player");
                    console.log(we);
                }
            });
            var hc = we.hole_cards;
            console.log("Printing Whole Cards:");
            console.log(hc);
            console.log("Printing All Community Cards");
            console.log(cc);
            console.log("Printing CC in loop");
            cc.forEach(function (card) {
                console.log("Cards");
                console.log(card);
            });

            if(ranker.rank_hand(hc) <= 3){
                bet(we.stack);
            }
            if(ranker.rank_hand(hc) >= 7){
                bet(0);
            }
            else{
                // Bet min buy_in to cb + 200
                bet(Math.floor(Math.random() * (cb + 200 - cb + 1) + cb));
            }
            
            //bet(Math.floor(Math.random() * (max - min + 1) + min));
        } catch (e) {
            bet(Math.floor(Math.random() * (max - min + 1) + min));
            console.log(e);
        }

    },

    showdown: function (game_state) {

    }
};