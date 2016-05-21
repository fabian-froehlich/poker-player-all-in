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

            //Assign variable for our player
            game_state.players.forEach(function (player) {
                if (player.name == 'All In') {
                    we = player;
                    //console.log(we);
                }
            });

            var hc = we.hole_cards;
            var call = cb - we.bet; //buyin - our bet

            //Print community cards in loop
            /*
            cc.forEach(function (card) {
                console.log("Cards");
                console.log(card);
            });
*/
            var rank = ranker.rank_hand(hc);
            if (rank <= 3) {
                bet(we.stack);
            }
            else if(rank >= 4 && rank <= 6){
                bet(call);
            }
            else if (rank >= 7) {
                bet(0);
            }
            else {
                // Bet min buy_in to cb + 200
                bet(Math.floor(Math.random() * (call + 200 - call + 1) + call));
            }

            //bet(Math.floor(Math.random() * (max - min + 1) + min));
        } catch (e) {
            bet(4000);
            console.log(e);
        }

    },

    showdown: function (game_state) {

    }
};