console.clear()
console.clear()


class State {
  constructor(x, y , d, direction, word) {
    this.x = x;
    this.y = y;
    this.d = d; // distance
    this.direction = direction;
  }
}


const writeOnBoard = (board, valid, word) => {
  let positionWrite = Math.floor(Math.random() * valid.length);
  // console.log(positionWrite);
  valid[positionWrite].coordinates_value = valid[positionWrite].coordinates_value.reverse();
  // console.log(valid[positionWrite]);

  let { coordinates_value } = valid[positionWrite];
  for (let i = 0; i < word.length; i++) {
    let [x, y] = coordinates_value[i];
    // console.log(`x: ${x}, y: ${y}`);
    board[x][y] = word[i];
  }

  console.table(board);

}

const getMatch = (board, word) => {
  const SIZE = board.length;
  let dx = [1, -1, 0, 0];
  let dy = [0, 0, 1, -1];
  let match = [];
  let Queue = [ new State(0, 0, 0) ];
  let visit = createMatrix(SIZE, [], false);

  while (Queue.length > 0) {
    let current = Queue.pop();

    if (board[current.x][current.y] !== 0 && !visit[current.x][current.y]) {
      let c = board[current.x][current.y];
      let position = word.indexOf(c)
      if (position !== -1) {
        match.push({
          char: c,
          position,
          coordinates: new State(current.x, current.y, 0, 1),
          word: word
        })
      }
    }

    visit[current.x][current.y] = true;
    for (let i = 0; i < 4; i++) {
      let nx = dx[i] + current.x;
      let ny = dy[i] + current.y;

      if ( nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE && !visit[nx][ny]) {
        let adyacente = new State(nx, ny, current.d + 1);
        Queue.push(adyacente)
      }
    }
  }

  return match;
}

const getValidMatch = (board, match, word) => {
  let valid = [];

  for (let i = 0; i < match.length; i++) {
    // console.log(match[i]);
    let charFound = match[i];
    let { coordinates, position } = charFound;
    // console.log(coordinates);
    if (coordinates.direction === 1) {
      // console.log("> 1 --- vertical");
      // console.log(match[i].char);
      // console.log(word);
      let pos = word.indexOf(match[i].char);
      // console.log(`[${pos}]`);
      let wpos = (word.length - 1 )- (pos);
      // console.log(wpos);
      let band_cr = true;
      match[i].coordinates_value = [];
      for (let j = 0; j < word.length; j++) {
        if (wpos === 0) {
          // console.log([coordinates.x - j, coordinates.y, board[coordinates.x - j][coordinates.y]]);
          if (j !== 0 && board[coordinates.x - j][coordinates.y] !== 0) {
            // console.log('>>>>> Se enecontro coicidencia');
            band_cr = false;
            break;
          } else {
            match[i].coordinates_value.push([coordinates.x - j, coordinates.y])
          }
        } else if (wpos === word.length - 1) {
          // console.log([coordinates.x + j, coordinates.y, board[coordinates.x + j][coordinates.y]]);
          if (j !== 0 && board[coordinates.x + j][coordinates.y] !== 0) {
            // console.log("%%%% Se enecontro coicidencia");
            band_cr = false;
            break;
          } else {
            match[i].coordinates_value.unshift([coordinates.x + j, coordinates.y])
          }
        }
      }
      if (band_cr)
        valid.push(match[i]);
    }
  }
  
  return valid;
}

const createMatrix = (length, board, character) => {
  for (let i = 0; i < length; i++) {
    board.push(new Array(length).fill(character));
  }

  return board;
}

;(() => {
  const SIZE = 25;
  let board = createMatrix(SIZE, [], 0);
  // let visit = createMatrix(SIZE, [], false);
  // let Queue = [ new State(0, 0, 0) ];


 let words = ['teclado', 'raton'];

  // let word2 = 'teclado';
  let word = 'monitor';
  for (let i = 0; i < word.length; i++) {
    board[10][i + 5] = word[i];
  }


  for (let i = 0; i < words.length; i++) {


    let match = getMatch(board, words[i]);


    // console.log(match)
    console.log(">>>>>>>>>>>>>>>>>>>");
    console.log(words[i], i);
    console.log(">>>>>>>>>>>>>>>>>>>");

    // board[7][6] = 'i'
    // board[11][5] = 'kji'
    // board[5][6] = '*'

    let valid = getValidMatch(board, match, words[i]);

    writeOnBoard(board, valid, words[i]);
  }
 
 

})();


