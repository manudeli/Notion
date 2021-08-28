import LinkButton from '../components/LinkButton.js';

export default function DocumentsPage({ $target, initialState }) {
  const $page = document.createElement('div');
  $page.id = 'page';
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $page.innerHTML = /*html*/ `
    <h1>DocumentsPage</h1>
    `;

    const linkButton = new LinkButton({
      $target: $page,
      initialState: {
        text: 'dkjd',
        link: '/documents/dlkjs',
      },
    });

    $target.appendChild($page);
  };
}
