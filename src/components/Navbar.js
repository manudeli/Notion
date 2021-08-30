import { DocumentList } from './DocumentList/index.js';
import LinkButton from './LinkButton.js';

import { push } from '../utils/router.js';
import { request } from '../utils/api.js';

export default function Navbar({ $target, initialState }) {
  const $navBar = document.createElement('nav');
  $navBar.id = 'navigation';

  this.state = initialState;

  new LinkButton({
    $target: $navBar,
    initialState: {
      text: 'Notion',
      link: '/',
    },
  });

  const documentList = new DocumentList({
    $target: $navBar,
    initialState: [
      {
        id: 1,
        title: 'hi',
        documents: [
          {
            id: 1,
            title: 'hi',
            documents: [
              {
                id: 1,
                title: 'hi',
                documents: [{ id: 1, title: 'hi', documents: [] }],
              },
              { id: 1, title: 'hi', documents: [] },
            ],
          },
          { id: 1, title: 'hi', documents: [] },
        ],
      },
    ],

    onClickListItemAdd: async (parentId = null) => {
      console.log('parentId', parentId);
      const { id } = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '문서 제목',
          parent: parentId,
        }),
      });

      push(`/documents/${id}`);
      documentList.render();
    },

    onClickListItemTitle: (id) => {
      console.log(id);
      push(`/documents/${id}`);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $target.appendChild($navBar);
  };
}
