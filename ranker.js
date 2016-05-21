module.exports = {
  rank_hand: function(hole_cards) {
    var first_card = hole_cards[0]
    var second_card = hole_cards[1]
    if (this.is_first_rank(first_card, second_card)) return 1;
    if (this.is_second_rank(first_card, second_card)) return 2;
    if (this.is_third_rank(first_card, second_card)) return 3;
    if (this.is_fourth_rank(first_card, second_card)) return 4;
    if (this.is_fifth_rank(first_card, second_card)) return 5;
    if (this.is_sixth_rank(first_card, second_card)) return 6;
    if (this.is_seventh_rank(first_card, second_card)) return 7;
    return 8;
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
      return (first_rank == second_rank && this.contains(["A", "Q", "J" , "K"], first_rank))
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

  is_fourth_rank: function(first_card, second_card) {

    var first_rank = first_card.rank
    var second_rank = second_card.rank
    if(!this.is_suited(first_card, second_card)) {
        return this.contains(["88", "AJ", "JA", "KQ", "QK"], first_rank+second_rank)
    } else {
      return (this.contains(["K10", "10K", "Q10" , "10Q" , "J9" , "9J", "109" , "109", "89", "98"], first_rank+second_rank))
    }
  },

  is_fifth_rank: function(first_card, second_card) {

    var first_rank = first_card.rank
    var second_rank = second_card.rank
    var suited_array = ["A9", "A8", "A7", "A6", "A5", "A4", "A3", "A2", "Q9", "108", "97", "87", "76"]
    if(!this.is_suited(first_card, second_card)) {
        return this.contains(["77", "KJ" , "JK" , "QJ", "JQ", "J10", "10J"], first_rank+second_rank)
    } else {
      return this.contains(suited_array, first_rank+second_rank) || this.contains(suited_array, second_rank+first_rank)
    }
  },

  is_sixth_rank: function(first_card, second_card) {

    var first_rank = first_card.rank
    var second_rank = second_card.rank
    var suited_array = ["K9", "J8", "86", "75", "54"]
    var unsuited_array = ["66" , "55", "A10", "K10", "Q10"]
    if(!this.is_suited(first_card, second_card)) {
      return this.contains(unsuited_array, first_rank+second_rank) || this.contains(unsuited_array, second_rank+first_rank)
    } else {
      return this.contains(suited_array, first_rank+second_rank) || this.contains(suited_array, second_rank+first_rank)
    }
  },

  is_seventh_rank: function(first_card, second_card) {

    var first_rank = first_card.rank
    var second_rank = second_card.rank
    var suited_array = ["K8", "K7", "K6", "K5", "K4", "K3", "K2", "Q8", "107", "64", "53", "43"]
    var unsuited_array = ["44","33","22", "J9", "109", "98"]
    if(!this.is_suited(first_card, second_card)) {
      return this.contains(unsuited_array, first_rank+second_rank) || this.contains(unsuited_array, second_rank+first_rank)
    } else {
      return this.contains(suited_array, first_rank+second_rank) || this.contains(suited_array, second_rank+first_rank)
    }
  },

  contains: function(array, value) {
    return array.indexOf(value) > -1
  }
};
