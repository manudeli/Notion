import { request } from '../../utils/api.js';
import { getItem, setItem } from '../../utils/storage.js';

const KEY_IS_OPEN_DOCUMENT_MAP = 'is_open_document_map';

export default function DocumentList({
  $target,
  onClickListItemAdd,
  onClickListItemTitle,
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

  this.isOpenMap = getItem(KEY_IS_OPEN_DOCUMENT_MAP, {});

  this.toggleIsOpenMap = (documentId) => {
    const nextIsOpenMap = { ...this.isOpenMap };

    nextIsOpenMap[documentId]
      ? delete nextIsOpenMap[documentId]
      : (nextIsOpenMap[documentId] = true);

    this.isOpenMap = nextIsOpenMap;
    this.render();
    setItem(KEY_IS_OPEN_DOCUMENT_MAP, nextIsOpenMap);
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

  const setIsOpenDocuments = (documents) => {
    return (
      documents.length &&
      documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: setIsOpenDocuments(documents),
        isOpen: this.isOpenMap[id],
      }))
    );
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
        if (!this.isOpenMap[id]) this.toggleIsOpenMap(id);
        break;

      case 'LI':
        onClickListItemTitle(id);
        break;

      case 'SPAN':
        onClickListItemTitle(id);
        break;

      case 'DIV':
        this.toggleIsOpenMap(id);
        break;

      default:
        break;
    }
  });
}
