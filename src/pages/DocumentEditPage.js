import Button from '../components/Button.js';
import Editor from '../components/Editor.js';
import { request } from '../utils/api.js';
import { replace } from '../utils/router.js';
import { getItem, removeItem, setItem } from '../utils/storage.js';

export default function DocumentEditPage({
  $target,
  initialState,
  onClickRemoveDoc,
  onTitleUpdated,
}) {
  const $page = document.createElement('div');
  $page.id = 'page';
  const $buttonGroup = document.createElement('div');
  $buttonGroup.id = 'button_group';

  this.state = initialState;

  const button = new Button({
    $target: $buttonGroup,
    onClickRemoveDoc,
  });

  let timer = null;

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
    onEditing: (document, isTitleEdited) => {
      const tempKey = `temp-doc-${document.id}`;

      console.log(tempKey);

      if (timer !== null) {
        // debounce 코드 타이핑 중 이벤트 지연 코드
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(tempKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        await request(`/documents/${document.id}`, {
          method: 'PUT',
          body: JSON.stringify(document),
        });
        removeItem(tempKey);

        if (isTitleEdited) {
          onTitleUpdated();
        }
      }, 2000);
    },
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

    button.setState({ documentId: this.state.id, text: '도큐먼트 없애기' });
  };
}
