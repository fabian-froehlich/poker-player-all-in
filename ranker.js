module.exports = {
  rank_hand: function(hole_cards) {
    var first_card = hole_cards[0]
    var second_card = hole_cards[1]
    //if ()
  },

  is_suited: function(first_card, second_card) {
    return first_card.suit == second_card.suit
  },

  is_first_rank: function(first_card, second_card) {

    var first_rank = first_card.rank
    var second_rank = second_card.rank
    if(this.is_suited(first_card, second_card)) {
        return ((first_rank == "A" || second_rank == "A") && (first_rank == "K" || second_rank == "K"))
    } else {
      return (first_rank == second_rank && first_rank in ["A", "Q", "J" , "K"])
    }
  },

  is_second_rank: function(first_card, second_card) {

    var first_rank = first_card.rank
    var second_rank = second_card.rank
    if(!this.is_suited(first_card, second_card)) {
        return ((first_rank == "A" || second_rank == "A") && (first_rank == "K" || second_rank == "K")) || (first_rank == "10" || second_rank == "10")
    } else {
      return (this.contains(["AQ", "QA", "AJ" , "JA" , "KQ" , "QK"], first_rank+second_rank))
    }
  },

  is_third_rank: function(first_card, second_card) {

    var first_rank = first_card.rank
    var second_rank = second_card.rank
    if(!this.is_suited(first_card, second_card)) {
        return ((first_rank == "A" || second_rank == "A") && (first_rank == "Q" || second_rank == "Q")) || (first_rank == "9" || second_rank == "9")
    } else {
      return (this.contains(["A10", "10A", "KJ" , "JK" , "JQ" , "QJ", "J10" , "10J"], first_rank+second_rank))
    }
  },

  contains: function(array, value) {
    return array.indexOf(value) > -1
  }
};
