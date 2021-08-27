import LinkButton from '../LinkButton.js';

export default function Navbar({ $target, initialState }) {
  const $navBar = document.createElement('nav');
  $navBar.style.height = '100vh';
  $navBar.style.width = '200px';
  $navBar.style.background = '#000';

  this.state = initialState;

  new LinkButton({
    $target: $navBar,
    initialState: {
      text: 'Notion',
      link: '/',
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($navBar);
  };
}
