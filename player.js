
module.exports = {

  VERSION: "Kiel #1 Team",

  bet_request: function(game_state, bet) {
    //bet(1000);
    bet(Math.floor((Math.random() * 1000) + 300));
      
  },

  showdown: function(game_state) {

  }
};
