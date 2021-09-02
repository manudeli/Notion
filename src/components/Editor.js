export default function Editor({
  $target,
  initialState = {
    id: null,
    title: '',
    content: '',
    documents: [],
    createdAt: '',
    updatedAt: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.style = 'display:flex; flex-direction:column; min-height: 110vh;';

  $editor.innerHTML = /*html*/ `
    <input class='editor_title' name="title" type="text" />
    <div class='editor_content' name="content" contentEditable="true" data-placeholder="여기에 내용을 입력해주세요" style=""></div>
   `;

  this.state = initialState;

  $target.appendChild($editor);

  let isInit = true;

  this.setState = (nextState) => {
    this.state = nextState;

    if (isInit) {
      this.render();
    }
    isInit = this.state.id !== +location.pathname.split('/')[2];
  };

  this.render = () => {
    const richContent =
      this.state.content &&
      this.state.content
        .split('<br>')
        .map((line, index, { length }) => {
          if (line.indexOf('# ') === 0) {
            return /*html*/ `<h1>${line.substr(2)}</h1>`;
          } else if (line.indexOf('## ') === 0) {
            return /*html*/ `<h2>${line.substr(3)}</h2>`;
          } else if (line.indexOf('### ') === 0) {
            return /*html*/ `<h3>${line.substr(4)}</h3>`;
          } else if (line.indexOf('#### ') === 0) {
            return /*html*/ `<h4>${line.substr(5)}</h4>`;
          } else if (line.indexOf('##### ') === 0) {
            return /*html*/ `<h5>${line.substr(6)}</h5>`;
          } else if (line.indexOf('###### ') === 0) {
            return /*html*/ `<h6>${line.substr(7)}</h6>`;
          } else {
            return /*html*/ `${line}${
              index === length - 1 ? /*html*/ `<br>` : ''
            }`;
          }
        })
        .join('');

    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').innerHTML = richContent;
  };

  this.render();

  $editor.querySelector('[name=title]').addEventListener('keyup', (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };

    this.setState(nextState);
    onEditing(this.state, true);
  });

  const div = $editor.querySelector('.editor_content');

  div.onkeyup = (e) => {
    const a = document.activeElement;
    if (e.keyCode == 13) {
      if (a.lastChild && a.lastChild.nodeName != 'BR') {
        const br = document.createElement('br');
        br.id = 'br_next';
        a.appendChild(br);
      }
    }

    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };

    this.setState(nextState);
    onEditing(this.state);
  };
  div.onkeydown = (e) => {
    if (e.keyCode == 13) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const br = document.createElement('br');
      range.deleteContents();
      range.insertNode(br);
      range.setStartAfter(br);
      range.setEndAfter(br);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
      return false;
    }
  };
}
