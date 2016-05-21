var ranker = require("./ranker");
var communityRanker = require("./communityRanker");
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
            var ourBet = 0;
            var cc_rank = 0;
            try {
                if (communityRanker.getSize(cc) >= 3) {
                    cc_rank = communityRanker.rank_cc_hand(hole_cards, community_cards);
                    console.log("Community Rank: " + cc_rank);
                    switch (cc_rank) {
                    case 2:
                        ourBet = call + 250;
                        break;
                    case 3:
                        ourBet = call + 200;
                        break;
                    case 6:
                        ourBet = call + 100;
                        break;
                    case 9:
                        ourBet = call;
                        break;
                    case 66:
                        ourBet = call + 50;
                        break;
                    case 99:
                        ourBet = call;
                        break;
                    }
                    bet(ourBet | 0);
                }
            } catch (e) {
                bet(call);
                console.log("cce");
                console.log(e);
            }


            var rank = ranker.rank_hand(hc);
            if (rank <= 3) {
                //if we are forced to all-in, then
                if (call >= we.stack) {
                    switch (rank) {
                    case 1:
                        ourBet = call;
                        break;
                    case 2:
                        if (Math.random() < 0.75 ? 1 : 0) {
                            ourBet = call;
                        }
                        break;
                    case 3:
                        if (Math.random() < 0.6 ? 1 : 0) {
                            ourBet = call;
                        }
                        break;
                    }
                    ourBet = 0;
                } else {
                    //raise 200
                    ourBet = call + 50;
                }
            } else if (rank >= 4 && rank <= 6) {
                ourBet = call;
            } else if (rank >= 7) {
                ourBet = 0;
            }

            bet(ourBet | 0);
            //bet(Math.floor(Math.random() * (max - min + 1) + min));
        } catch (e) {
            bet(4000);
            console.log("ccg");
            console.log(e);
        }

    },

    showdown: function (game_state) {
        //console.log(game_state);
    }
};