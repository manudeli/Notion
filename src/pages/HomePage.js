import LinkButton from '../components/LinkButton.js';

export default function HomePage({ $target }) {
  const $page = document.createElement('div');

  new LinkButton({
    $target: $page,
    initialState: {
      text: 'New Post',
      link: '/documents',
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
