



document.addEventListener('DOMContentLoaded', (event) => {
  console.log(">>>>");

  let list = ["Teclado", "Raton", "Universal Serial Bus", "Monitor", "audifonos"];
  let lengthBoard = list.join('').length;

  const content = document.createElement('div');
  content.className = 'content';
  content.style.display = 'grid';
  content.style.gridTemplateColumns = `repeat(${ lengthBoard }, 20px)`
  // content.style.gridTemplateRows = `repeat(40, 20px)`
  content.style.justifyContent = 'center';
  content.style.alignContent = 'center';
  content.style.gridGap = '3px';

  let { vertical, horizontal, pivot } = getVerticalHorizontalValues(list);

  let matrixValues = [];
  for (let i = 0; i < lengthBoard; i++) {
    matrixValues.push(new Array(lengthBoard).fill(0))
    for (let j = 0; j < lengthBoard; j++) {
      const box = document.createElement('div');
      box.className = 'box';
      // box.id = `_${id++}`;
      box.id = `${i}_${j}`
      /* box.addEventListener('click', () => {
        console.log('click');
        box.style.backgroundColor = 'blue';

        setTimeout(() => box.style.backgroundColor = "white", 2000)
      }) */
      box.contentEditable = true;
      content.append(box);
    }
  }
 

  document.body.append(content);


  // console.log(pivot);
  // console.table(matrixValues);

  let pivotInfo = getPivot(vertical, horizontal, pivot);
  console.log(pivotInfo);
  const middleMatrix = lengthBoard / 2;
  console.log(middleMatrix);
  if (pivotInfo.position === 'horizontal') {
    for (let i = 0; i < pivotInfo.value.length; i++) {
      matrixValues[middleMatrix][i] = pivotInfo.value[i];
      // console.log(middleMatrix + i);
      let box = document.getElementById(`${ middleMatrix }_${ i }`);
      box.style.backgroundColor = 'blue';
      box.style.color = 'white';
      box.innerHTML = pivotInfo.value[i];
      // box.contentEditable = true;
    }


    console.log(vertical[0]);
    for (let i = 0; i < vertical[0].length  - 1; i++) {
      let position = pivotInfo.value.indexOf(vertical[0][i]);
      if (position >= 0) {
        console.log('position', position);
        let letter = vertical[0][i];
        let positionLetter = vertical[0].indexOf(letter);
        console.log('positionLetter', positionLetter);
        // document.getElementById(`${middleMatrix}_${position}`).style.backgroundColor = 'pink'
        // document.getElementById(`${middleMatrix}_${position}`).innerHTML = `${position}${letter}`;
        let initWriteMatrix = middleMatrix - positionLetter;
        for (let j = 0; j < vertical[0].length; j++) {
          // matrixValues[initWriteMatrix + j][position]  = 2;
          matrixValues[initWriteMatrix + j][position]  = vertical[0][j];
          let box = document.getElementById(`${initWriteMatrix + j}_${position}`);
          box.style.backgroundColor = 'tomato';
          box.innerHTML = vertical[0][j];
        }
        break;

      }

    }

  } else {
    for (let i = 0; i < pivotInfo.value.length; i++) {
      matrixValues[i][middleMatrix] = 1;
      // console.log(middleMatrix + i);
      let box = document.getElementById(`${ i }_${ middleMatrix }`);
      box.style.backgroundColor = 'blue';
      // console.log(box);
    }
  }

  console.table(matrixValues);

})

const getPivot = (arrayVertical, arrayHorizontal, pivot) => {
  // console.log(arrayVertical, arrayHorizontal);
  let position = '';
  let value = arrayVertical.find(element => element.length === pivot);
  if (! value) {
    value = arrayHorizontal.find(element => element.length === pivot);
    position = 'horizontal';
  } else {
    position = "vertical";
  }
  return { value, position };
  
}


const getVerticalHorizontalValues = (list) => {
  let newList = shuffle(list);
  const vertical = [];
  const horizontal = [];
  let pivot = newList[0].length;
  newList.forEach((element, index) => {
    if (element.length > pivot) pivot = element.length;
    index % 2 === 0 ? vertical.push(element) : horizontal.push(element);
  })

  return { vertical, horizontal, pivot }
}


const shuffle = (array) => {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
