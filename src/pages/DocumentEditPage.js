import Button from '../components/Button.js';
import Editor from '../components/Editor.js';
import NestedDocuments from '../components/NestedDocuments.js';
import { request } from '../utils/api.js';

export default function DocumentEditPage({
  $target,
  initialState,
  onClickRemoveDoc,
  onEditing,
  onClickListItemAdd,
  onClickListItemTitle,
}) {
  const $page = document.createElement('div');
  $page.id = 'page';
  const $buttonGroup = document.createElement('div');
  $buttonGroup.id = 'button_group';

  this.state = initialState;

  const button = new Button({
    $target: $buttonGroup,
    initialState: {
      text: '🗑 문서 없애기',
    },
    onClick: () => onClickRemoveDoc(this.state.id),
  });

  const editor = new Editor({
    $target: $page,
    initialState: {
      id: 1,
      title: '노션을 만들자',
      content: '즐거운 자바스크립트의 세계!',
      documents: [
        {
          id: 2,
          title: '',
          createdAt: '',
          updatedAt: '',
        },
      ],
      createdAt: '',
      updatedAt: '',
    },
    onEditing,
  });

  const nestedDocuments = new NestedDocuments({
    $target: $page,
    onClickListItemAdd,
    onClickListItemTitle,
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
    editor.setState(this.state);
  };

  this.render = () => {
    $page.prepend($buttonGroup);
    $target.appendChild($page);
  };

  this.fetch = async () => {
    const documentData = await request(`/documents/${this.state.id}`);
    this.setState(documentData);

    button.setState({
      ...button.state,
      documentId: this.state.id,
    });

    nestedDocuments.setState(this.state.documents);
  };
}
