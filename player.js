
module.exports = {

  VERSION: "Default JavaScript folding player",

  bet_request: function(game_state, bet) {
    //bet(1000);
    bet(Math.floor((Math.random() * 1000) + 300));
      
  },

  showdown: function(game_state) {

  }
};
