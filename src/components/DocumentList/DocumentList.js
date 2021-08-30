import { request } from '../../utils/api.js';

export default function DocumentList({
  $target,
  initialState,
  onClickListItemAdd,
  onClickListItemTitle,
}) {
  const $documentList = document.createElement('div');
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  this.getTreeItemMarkup = ({
    id,
    title,
    documents,
    isActive,
    isOpen,
  }) => /*html*/ `
    <li class='document_list_item' data-id='${id}'>
      <div class='document_list-open_button ${
        isOpen ? 'open' : ''
      }' data-id='${id}'>▲</div>
      <span data-id='${id}' class='${isActive ? 'active' : ''}'>${title}</span>
      <button class='document_list-add_button' data-id='${id}'>+</button>
    </li>
    ${isOpen ? this.getTreeMarkup(documents) : ''}
  `;

  this.getTreeMarkup = (documents) =>
    documents.length
      ? /*html*/ `
      <ul class='document_list'>${documents
        .map((item) => this.getTreeItemMarkup(item))
        .join('')}
      </ul>`
      : '';

  this.render = async () => {
    const documents = await request('/documents');

    const updateDocuments = (documents) =>
      documents.length &&
      documents.map(({ id, title, documents }) => ({
        id,
        title,
        documents: updateDocuments(documents),
        isActive: false,
        isOpen: true,
      }));

    this.setState(updateDocuments(documents));
    $documentList.innerHTML = /*html*/ `
    <div class='document_list-title'>
      <span>워크스페이스</span>
      <button class='document_list-add_button'>+</button>
    </div>
    ${this.getTreeMarkup(this.state)}`;
  };

  this.render();

  $documentList.addEventListener('click', ({ target }) => {
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
        const openTree = (documents, openId) =>
          documents.length
            ? documents.map(({ title, id, documents, isOpen, isActive }) => ({
                title,
                id,
                isOpen: +openId === id ? !isOpen : isOpen,
                documents: openTree(documents),
                isActive,
              }))
            : [];

        this.setState(openTree(this.state, id));
        break;

      default:
        break;
    }
  });
}
