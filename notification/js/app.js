const showNotification = ({ top = 0, right = 0, html = '', event = 'default', className = '' }) => {
  const container = document.createElement('div');
  container.className = 'notification';
  container.style.width = '400px';
  container.innerHTML = html;
  container.style.top = `${ top }px`;
  container.style.right = `${ right }px`;
  container.classList.add(className);

  if(event !== 'error') {
    container.style.backgroundColor = 'tomato';
    container.style.borderColor = '1px solid red';
    container.style.color = 'white';
  }
  document.body.append(container);
  setTimeout(() => container.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  showNotification({
    html: 'wooow este es un mensaje de <strong>prueba</strong>',
    top: 100,
    right: 50,
    className: 'notif',
    event: 'succes'
  })

showNotification({
    html: 'wooow este es un mensaje de <strong>prueba</strong>',
    top: 200,
    right: 50,
    className: 'notif',
    event: 'error'
  })
})
