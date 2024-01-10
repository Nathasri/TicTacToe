// TIC TAC TOE
const tic_tac_toe = {
  // ATTRIBUTES
  board: ["", "", "", "", "", "", "", "", ""],
  symbols: {
    options: ["O", "X"],
    turn_index: 0,
    size: 0,
    x_point: localStorage.getItem("X"),
    o_point: localStorage.getItem("O"),
    change() {
      this.turn_index = this.turn_index === 0 ? 1 : 0;
    },
  },
  container_element: null,
  gameover: false,
  winning_sequences: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  // FUNCTIONS
  init(container) {
    this.container_element = container;
  },

  make_play(position) {
    if (this.gameover || this.board[position] !== "") return false;

    const currentSymbol = this.symbols.options[this.symbols.turn_index];
    this.board[position] = currentSymbol;
    this.draw();

    const winning_sequences_index = this.check_winning_sequences(currentSymbol);
    console.log(winning_sequences_index);
    // console.log(this.symbols.size + "----");
    if (this.is_game_over()) {
      this.game_is_over();
    }
    if (winning_sequences_index >= 0) {
      this.game_is_over();
      this.stylize_winner_sequence(
        this.winning_sequences[winning_sequences_index]
      );
    } else {
      this.symbols.change();
    }

    return true;
  },

  stylize_winner_sequence(winner_sequence) {
    winner_sequence.forEach((position) => {
      this.container_element
        .querySelector(`div:nth-child(${position + 1})`)
        .classList.add("winner");
    });
  },

  check_winning_sequences(symbol) {
    for (i in this.winning_sequences) {
      if (
        this.board[this.winning_sequences[i][0]] == symbol &&
        this.board[this.winning_sequences[i][1]] == symbol &&
        this.board[this.winning_sequences[i][2]] == symbol
      ) {
        console.log("winning sequences INDEX:" + i);
        return i;
      }
    }

    return -1;
  },

  game_is_over() {
    this.gameover = true;
    this.tie_length();
    if (this.symbols.size == 9 && this.symbols.turn_index != 0) {
      console.log("draw");
      alert("draw");
    } else if (this.symbols.turn_index) {
      localStorage.setItem("X", ++this.symbols.x_point);
      console.log(this.symbols.x_point + "--xpoint");
      console.log("x wins");
      alert("x wins");
    } else if (this.symbols.turn_index == 0) {
      localStorage.setItem("O", ++this.symbols.o_point);
      console.log(this.symbols.o_point + "--opoint");
      console.log("o wins");
      alert("o wins");
    }
    // document.getElementById("x_score").innerHTML = this.symbols.x_point;
    // document.getElementById("o_score").innerHTML = this.symbols.o_point;

    console.log("GAME OVER");
  },
  tie_length() {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == "X" || this.board[i] == "O") {
        this.symbols.size++;
        console.log(this.symbols.size + "--");
      }
    }
    return -1;
  },

  is_game_over() {
    return !this.board.includes("");
  },

  start() {
    document.getElementById("x_score").innerHTML = this.symbols.x_point;
    document.getElementById("o_score").innerHTML = this.symbols.o_point;
    this.board.fill("");
    this.draw();
    this.gameover = false;
  },

  restart() {
    if (this.is_game_over() || this.gameover) {
      this.start();
      console.log("this game has been restarted!");
    } else if (confirm("Are you sure you want to restart this game?")) {
      this.start();
      console.log("this game has been restarted!");
    }
  },

  draw() {
    this.container_element.innerHTML = this.board
      .map(
        (element, index) =>
          `<div onclick="tic_tac_toe.make_play('${index}')"> ${element} </div>`
      )
      .reduce((content, current) => content + current);
  },
};
