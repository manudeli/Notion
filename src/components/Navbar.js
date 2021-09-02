import { DocumentList } from './DocumentList/index.js';
import LogoHomeButton from './LogoHomeButton.js';

import { push } from '../utils/router.js';
import Button from './Button.js';

export default function Navbar({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
}) {
  const $navBar = document.createElement('nav');
  $navBar.id = 'navigation';
  $navBar.style = `
  position: fixed;
  height: 100vh;
  `;

  const logo = new LogoHomeButton({
    $target: $navBar,
    onClick: () => push('/'),
  });

  const $topButtonGroup = document.createElement('div');
  $topButtonGroup.className = 'nav-top_button_group';

  new Button({
    $target: $topButtonGroup,
    initialState: { text: '🔍 빠른 검색' },
  });
  new Button({
    $target: $topButtonGroup,
    initialState: { text: '⏱ 모든 업데이트' },
  });
  new Button({
    $target: $topButtonGroup,
    initialState: { text: '⚙️ 설정과 멤버' },
  });

  const $bottomButtonGroup = document.createElement('div');
  $bottomButtonGroup.className = 'nav-bottom_button_group';

  new Button({
    $target: $bottomButtonGroup,
    initialState: { text: '+ 새 페이지' },
    onClick: onClickListItemAdd,
  });

  const documentList = new DocumentList({
    $target: $navBar,
    onClickListItemAdd,
    onClickListItemTitle,
  });

  this.setState = (next) => {
    documentList.setState();
    this.render();
  };

  this.render = () => {
    $navBar.prepend($topButtonGroup);
    $navBar.appendChild($bottomButtonGroup);
    logo.render();
    $target.appendChild($navBar);
  };

  this.documentListFetch = () => documentList.fetch();
}
