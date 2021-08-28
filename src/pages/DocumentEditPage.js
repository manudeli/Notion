export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement('div');
  $page.id = 'page';
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $page.innerHTML = /*html*/ `
      <h1>DocumentEditPage</h1>
      `;

    $target.appendChild($page);
  };
}
