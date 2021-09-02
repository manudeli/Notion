import Navbar from './components/Navbar.js';

import HomePage from './pages/HomePage.js';
import DocumentsPage from './pages/DocumentsPage.js';
import DocumentEditPage from './pages/DocumentEditPage.js';

import { initRouter, push, replace } from './utils/router.js';
import { request } from './utils/api.js';
import { removeItem, setItem } from './utils/storage.js';

export default function App({ $target }) {
  $target.style = 'max-height:100vh; overflow: auto;';

  const onClickListItemAdd = async (parentId = null) => {
    console.log('hi');
    const { id } = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({
        title: '문서 제목',
        parent: parentId,
      }),
    });
    console.log('hi2');
    navBar.documentListFetch();
    push(`/documents/${id}`);
  };

  const onClickListItemTitle = (documentId) => push(`/documents/${documentId}`);

  const onClickRemoveDoc = async (id) => {
    await request(`/documents/${id}`, { method: 'DELETE' });
    navBar.documentListFetch();
    replace('/');
  };

  let timer = null;

  const onEditing = (document, isTitleEdited) => {
    const tempKey = `temp-doc-${document.id}`;

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
  };

  const onTitleUpdated = async () => await navBar.documentListFetch();

  const navBar = new Navbar({
    $target,
    onClickListItemAdd,
    onClickListItemTitle,
  });
  const homePage = new HomePage({
    $target,
    onClickListItemAdd,
  });
  const documentsPage = new DocumentsPage({ $target });
  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: { id: '' },
    onClickRemoveDoc,
    onEditing,
  });

  this.route = () => {
    $target.innerHTML = '';
    const { pathname } = window.location;

    navBar.setState();

    // 페이지 렌더링
    if (pathname === '/') {
      homePage.setState();
    } else if (pathname.indexOf('/documents') === 0) {
      const [, , documentId] = pathname.split('/');
      documentId
        ? (() => {
            documentEditPage.setState({
              id: documentId,
              title: '',
              content: '',
              documents: [
                {
                  id: null,
                  title: '',
                  createdAt: '',
                  updatedAt: '',
                },
              ],
              createdAt: '',
              updatedAt: '',
            });
            documentEditPage.fetch();
          })()
        : documentsPage.setState();
    }
  };

  this.route();

  initRouter(this.route);
}
