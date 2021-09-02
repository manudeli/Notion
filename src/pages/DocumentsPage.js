import DocumentList from '../components/DocumentList/DocumentList.js';
import Title from '../components/Title.js';

export default function DocumentsPage({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
  getIsOpenMap,
  onClickListItemFolderToggle,
}) {
  const $page = document.createElement('div');
  $page.id = 'page';

  const documentsTitle = new Title({
    $target: $page,
    text: '📂 모두 열고 보기',
  });

  const documentList = new DocumentList({
    $target: $page,
    onClickListItemAdd,
    onClickListItemTitle,
    getIsOpenMap,
    onClickListItemFolderToggle,
    isOpenAll: true,
  });

  this.setState = (nextState) => {
    this.render();
  };

  this.render = () => {
    documentsTitle.render();
    documentList.render();
    documentList.fetch();
    $target.appendChild($page);
  };
}
