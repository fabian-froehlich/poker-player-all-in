
module.exports = {

  VERSION: "Kiel #1 Team",

  bet_request: function(game_state, bet) {
    var small = game_state.small_blind;
    var we;
    gemes_state.players.forEach(function(player){
      if (player.name == 'All in'){
        we = player;
      }
    });
    bet(Math.floor((Math.random() * 1000) + 300));
      
  },

  showdown: function(game_state) {

  }
};
