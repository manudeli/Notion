import { request } from '../../utils/api.js';

export default function DocumentList({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
  onClickListItemFolderToggle,
  getIsOpenMap,
  isOpenAll = false,
}) {
  const $documentList = document.createElement('div');
  $documentList.id = 'document_list';
  $target.appendChild($documentList);

  this.state = [];

  let isInit = true;

  this.setState = async (nextState) => {
    if (isInit) {
      await this.fetch();
      isInit = false;
    } else if (nextState) {
      this.state = nextState;
    }

    this.render();
  };

  const setIsOpenDocuments = (documents) => {
    return (
      documents.length &&
      documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: setIsOpenDocuments(documents),
        isOpen: isOpenAll ? true : getIsOpenMap()[id] ? true : false,
      }))
    );
  };

  this.render = () => {
    const documentsWithStatus = setIsOpenDocuments(this.state);

    $documentList.innerHTML = /*html*/ `
    <div class='document_list-title'>
      <span>워크스페이스</span>
      <button class='document_list-add_button'>+</button>
    </div>
    ${getTreeMarkup(documentsWithStatus)}`;
  };

  const getTreeMarkup = (documents = []) => {
    return documents.length
      ? /*html*/ `
      <ul
      class='document_list_ul'>
      ${documents
        .map(
          ({ id, title, documents, isActive, isOpen }) => /*html*/ `
        <li class='document_list_item' data-id='${id}'>
          <div class='document_list-open_button' data-id='${id}'>
          ${documents.length ? (isOpen ? '📂' : '📁') : '🗒'}
          </div>
          <span data-id='${id}' class='${isActive ? 'active' : ''}'>
          ${title}
          </span>
          <button class='document_list-add_button' data-id='${id}'>
          +
          </button>
        </li>
        ${isOpen ? getTreeMarkup(documents) : ''}`
        )
        .join('')}
      </ul>`
      : '';
  };

  this.fetch = async () => {
    const documents = await request('/documents');

    this.setState(documents);
  };

  $documentList.addEventListener('click', async ({ target }) => {
    const { id } = target.dataset;
    switch (target.tagName) {
      case 'BUTTON':
        onClickListItemAdd(id);
        break;

      case 'LI':
        onClickListItemTitle(id);
        break;

      case 'SPAN':
        onClickListItemTitle(id);
        break;

      case 'DIV':
        onClickListItemFolderToggle(id);
        break;
      default:
        break;
    }
  });
}
