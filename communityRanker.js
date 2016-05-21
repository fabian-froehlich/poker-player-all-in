module.exports = {
    rank_cc_hand: function (hole_cards, community_cards) {
        var first_card = hole_cards[0];
        var second_card = hole_cards[1];

        var cc_size = getSize(community_cards);
        return something(cc_size, hole_cards, community_cards);
// mapping = [ royal flush = 1; vierling = 2; fullhouse = 3, flush = 4, straight = 5, drilling = 6, two pairs = 7]
    },

    is_suited: function (first_card, second_card) {
        return first_card.suit == second_card.suit;
    },

    getSize: function (community_cards) {
       var i = 0;
       community_cards.forEach( function (cards) {
         i++;
       });
       return i;
    },

    something: function (cc_size, hole_cards, community_cards) {
      if(is_something_of_a_kind_with_cc(4, hole_cards,community_cards)) {
        return 2;
      } else if(is_something_of_a_kind_with_cc(3, hole_cards,community_cards)) {
        if(is_something_of_a_kind_with_cc(3, hole_cards,community_cards)) {
          return 66;
        }
        return 6;
      }
    },

    is_something_of_a_kind_with_cc: function (something, hole_cards, community_cards) {
      var first_card = hole_cards[0];
      var second_card = hole_cards[1];


      var pairs = 0;
      if(is_two_of_a_kind(first_card, second_card)) {
        community_cards.forEach(function (cc_card) {
          if(is_two_of_a_kind(first_card, cc_card)) {
            pairs ++;
          }
          if(pairs >= something-2) {
            return 1;
          }
        });

      } else {
        //fall mit first_card
        community_cards.forEach(function (cc_card) {
            if(is_two_of_a_kind(first_card, cc_card)) {
              pairs++;
            }
        });

        if(pairs == something) {
          return 2;
        }

        pairs = 0;
        //fall mit second_card
        community_cards.forEach(function (cc_card) {
          if(is_two_of_a_kind(first_card, cc_card)) {
            pairs++;
          }
        });
        if(pairs == something) {
          return 2;
        }
      }

      return 0;
    },

    is_full_house: function (hole_cards, fullhouse) {
      var first_card = hole_cards[0];
      var second_card = hole_cards[1];

      if(is_two_of_a_kind(first_card, second_card)) {
        if(is_something_inside_cc (3, hole_cards, community_cards)) {
          //case hand 2, cc 3
          return 1;
        } else {
          if(is_something_inside_cc (2, hole_cards, community_cards)) {
            //case hand 2, cc 2 -> hand+cc 3?
            if(is_something_of_a_kind_with_cc (3, hole_cards, community_cards)) {
              return 1;
            }
          }
        }
      } else {
        if(is_something_inside_cc(2, hole_cards, community_cards)) {
          is_something_of_a_kind_with_cc (3, hole_cards, community_cards);
        }
      }
      is_something_of_a_kind_with_cc (3, hole_cards, community_cards);
      is_something_of_a_kind_with_cc (2, hole_cards, community_cards);

    },

    is_something_inside_cc: function (something, community_cards) {
      var map = new Map();
      community_cards.forEach(function(card){
        if(!map.has(card.rank)) {
          map.put(card.rank, 1);
        } else {
          map.put(card.rank, map.get(card.rank) +1);
        }
      });
      map.forEach(function (rank) {
        if(rank == something) {
          return 1;
        }
      });
    }

};
