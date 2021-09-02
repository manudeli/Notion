export default function Button({
  $target,
  initialState = {
    documentId: null,
    icon: null,
    text: '',
  },
  onClick = () => {},
}) {
  const $buttonContainer = document.createElement('span');
  $buttonContainer.style = 'display:flex';
  $buttonContainer.id = 'button';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const { icon, text } = this.state;
    $buttonContainer.innerHTML = /*html*/ `
    <button style="flex: 1">
    <span >
    <span>${icon ? '' : ''}</span>
    ${text}
    </span>
    </button>
 `;
    $target.appendChild($buttonContainer);
  };

  $buttonContainer.addEventListener('click', (e) => {
    const $button = e.target.closest('button');
    if ($button) {
      onClick();
    }
  });

  this.render();
}
