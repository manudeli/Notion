import Button from '../components/Button.js';

export default function HomePage({ $target, onClickListItemAdd }) {
  const $page = document.createElement('div');
  $page.id = 'page';
  $page.style = 'display:flex; justify-content:center; align-items: center;';

  const $button = new Button({
    $target: $page,
    initialState: { text: '+ 새 문서 만들기' },
    onClick: onClickListItemAdd,
  });

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $button.render();
    $target.appendChild($page);
  };
}
