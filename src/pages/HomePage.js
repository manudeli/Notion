import LinkButton from '../LinkButton.js';

export default function HomePage({ $target }) {
  const $page = document.createElement('div');

  new LinkButton({
    $target: $page,
    initialState: {
      text: 'New Post',
      link: '/posts/new',
    },
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };
}
