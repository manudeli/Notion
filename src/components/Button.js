export default function Button({
  $target,
  initialState = {
    documentId: null,
    icon: null,
    text: '',
  },
  onClickRemoveDoc = () => {},
}) {
  const $buttonContainer = document.createElement('span');
  $buttonContainer.id = 'button';

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $buttonContainer.addEventListener('click', (e) => {
      const $button = e.target.closest('button');
      if ($button) {
        const { id } = $button.dataset;
        onClickRemoveDoc(id);
      }
    });

    this.render();
  };

  this.render = () => {
    const { icon, text, documentId } = this.state;
    $buttonContainer.innerHTML = /*html*/ `
    <button data-id=${documentId}>
    <span >
    <span>${icon ? '' : ''}</span>
    ${text}
    </span>
    </button>
 `;
    $target.appendChild($buttonContainer);
  };
}
