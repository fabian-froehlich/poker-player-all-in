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
      } else if(is_full_house(hole_cards, community_cards)) {
        return 3;
      } else if(is_something_of_a_kind_with_cc(3, hole_cards,community_cards)) {
        if(is_something_of_a_kind_with_cc(3, hole_cards,community_cards)) {
          return 66;
        }
        return 6;
      } else if(is_two_of_a_kind(hole_cards[0], hole_cards[1])) {
        return 9;
      } else if(is_something_of_a_kind_with_cc(2, hole_cards,community_cards)) {
        return 99;
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
        //hand 1/1
        if(is_something_inside_cc(2, hole_cards, community_cards)) {
          //hand 1/1, cc 2
          is_something_of_a_kind_with_cc (3, hole_cards, community_cards);
          //hand 1/1, cc 2/1
          var map = new Map();
          var all_cards = community_cards.concat(hole_cards);
          all_cards.forEach(function(card){
            if(!map.has(card.rank)) {
              map.put(card.rank, 1);
            } else {
              map.put(card.rank, map.get(card.rank) +1);
            }
          });
          var threesome = 0;
          var twosome = 0;
          map.forEach(function (rank) {
            if(rank == 2) {
              twosome = 1;
            }
            if(rank == 3) {
              threesome = 1;
            }
          });
          if(twosome & threesome) {
            return 1;
          }
        }
      }
      return 0;
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
    },

    is_flush: function (hole_cards, community_cards) {
      var map = new Map();
      if (hole_cards[0].suit == hole_cards[1].suit) {
        map.put(hole_cards[0].suit, 2)
      } else {
        map.put(hole_cards[1].suit, 1)
        map.put(hole_cards[0].suit, 1)
      }
      community_cards.forEach(function(card){
        if(map.has(card.suit)){
          var temp = map.get(card.suit)
          map.put(card.suit, temp+1)
        }
      })
      map.forEach(function (rank) {
        if(rank >= 5) {
          return true;
        }
      });
      return false
    },

    is_straight: function (hole_cards, community_cards) {
      var arr = []
      arr = hole_cards.reduce(function(p,current){
        return p.concat(current.rank)
      }, [])
      arr = community_cards.reduce(function(p,current){
        return p.concat(current.rank)
      }, arr)
      arr.sort(function(a,b){
        if (isNaN(a) && !isNaN(b)) return 1
        if (!isNaN(a) && !isNaN(b)) {
          if (a > b) return 1
          if (b > a) return -1
          return 0
        }
        if (a == b) return 0
        if (a+b == "AK" || a+b == "KQ" || a+b == "QJ") return 1
        return -1
      })
      var newArr = arr.map(function(a){
        if (a = "A") return 14
        if (a = "K") return 13
        if (a = "Q") return 12
        if (a = "J") return 11
        return Number(a)
      })
      var temp = newArr.reduce(function(p, current, index){
        if (index == 0) return 0
        if (current + 1 == newArr[index-1]) return p+1
        return 0
      },0)
      if (temp >= 5) return true
      return false
    },

    is_straight_flush: function(hole_cards, community_cards){
      return is_straight(hole_cards, community_cards) && is_flush(hole_cards, community_cards)
    }

};
