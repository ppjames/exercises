document.addEventListener('DOMContentLoaded', () => {
  console.log('>>>> start')

  let fieldElement = document.getElementById('field');
  fieldElement.onclick = (event) => {
    let ball = document.getElementById('ball');
    console.log({x: event.clientX, y: event.clientY});
    // console.log(event.screenX, event.screenY)


    console.log(fieldElement.getBoundingClientRect());
   // if (event.clientY ) 

    console.log('ball',ball.getBoundingClientRect());
    // let {top, right, bottom, left} = fieldElement.getBoundingClientRect();
    let { width } = ball.getBoundingClientRect();

    // let computedStyle = getComputedStyle(document.getElementById('field'));
    // console.log(computedStyle.width);

    // ball.style.top = `${ event.clientY - width - 10}px`;
    // ball.style.top = `${top}px`;
    // ball.style.bottom = 
    ball.style.left = `${ event.clientX }px`;
  }
})
