export default function Modal({ $target }) {
  const $modal = document.createElement('div');

  this.state = { isOpen: true, autoDocuments: [] };
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  $modal.innerHTML = /*html*/ `
    <input type="text" placeholder="여기에 찾을 문서를 입력하세요" style="width:100%; background:rgba(255,255,255,0.1); padding:8px; border-radius:8px; border:0; outline:none; color: white" />
    <ul>
        ${this.state.autoDocuments.map(
          ({ title }) => /*html*/ `<li>
        ${title}
        </li>`
        )}
    </ul>
  `;

  this.render = () => {
    $modal.style = `${
      this.state.isOpen ? '' : 'display:none;'
    } position:absolute; top:100px; left:250px; width: 300px; min-height: 100px; background:rgb(55, 60, 63); padding:16px; border-radius:16px`;

    $target.appendChild($modal);
  };
  this.render();

  this.toggleOpenModal = () =>
    this.setState({ ...this.state, isOpen: !this.state.isOpen });
}
