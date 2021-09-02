import { DocumentList } from './DocumentList/index.js';
import LogoHomeButton from './LogoHomeButton.js';

import { push } from '../utils/router.js';
import Button from './Button.js';

export default function Navbar({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
  getIsOpenMap,
  onClickListItemFolderToggle,
  onClickViewAllFolderOpen,
}) {
  const $navBar = document.createElement('nav');
  $navBar.id = 'navigation';
  $navBar.className = 'open';
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
    initialState: { text: '🔍 빠른 문서 검색' },
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
    initialState: { text: '📂 모두 열고 보기' },
    onClick: onClickViewAllFolderOpen,
  });
  new Button({
    $target: $bottomButtonGroup,
    initialState: { text: '+ 새 문서 만들기' },
    onClick: onClickListItemAdd,
  });

  const documentList = new DocumentList({
    $target: $navBar,
    onClickListItemAdd,
    onClickListItemTitle,
    getIsOpenMap,
    onClickListItemFolderToggle,
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
  this.documentListRender = () => documentList.render();
}
