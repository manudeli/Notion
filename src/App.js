import Navbar from './components/Navbar.js';

import HomePage from './pages/HomePage.js';
import DocumentsPage from './pages/DocumentsPage.js';
import DocumentEditPage from './pages/DocumentEditPage.js';

import { initRouter, push, replace, replaceBack } from './utils/router.js';
import { request } from './utils/api.js';
import { getItem, removeItem, setItem } from './utils/storage.js';

const KEY_IS_OPEN_DOCUMENT_MAP = 'is_open_document_map';

export default function App({ $target }) {
  $target.style = 'max-height:100vh; overflow: auto;';

  const getIsOpenMap = () => getItem(KEY_IS_OPEN_DOCUMENT_MAP, {});

  const toggleIsOpenMap = (documentId) => {
    const nextIsOpenMap = getIsOpenMap();

    nextIsOpenMap[documentId]
      ? delete nextIsOpenMap[documentId]
      : (nextIsOpenMap[documentId] = true);

    setItem(KEY_IS_OPEN_DOCUMENT_MAP, nextIsOpenMap);
    navBar.documentListRender();
  };

  const onClickListItemAdd = async (parentId = null) => {
    const { id } = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({
        title: '제목을 적어주세요',
        parent: parentId,
      }),
    });

    navBar.documentListFetch();
    push(`/documents/${id}`);

    if (!getIsOpenMap()[id]) toggleIsOpenMap(id);
  };

  const onClickListItemTitle = (documentId) => {
    push(`/documents/${documentId}`);
    toggleIsOpenMap(documentId);
  };

  const onClickRemoveDoc = async (id) => {
    await request(`/documents/${id}`, { method: 'DELETE' });
    navBar.documentListFetch();
    replaceBack();
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

  const onClickViewAllFolderOpen = () => push('/documents');

  const onTitleUpdated = async () => await navBar.documentListFetch();

  const navBar = new Navbar({
    $target,
    onClickListItemAdd,
    onClickListItemTitle,
    getIsOpenMap,
    onClickListItemFolderToggle: toggleIsOpenMap,
    onClickViewAllFolderOpen,
  });

  const homePage = new HomePage({
    $target,
    onClickListItemAdd,
    onClickViewAllFolderOpen,
  });

  const documentsPage = new DocumentsPage({
    $target,
    onClickListItemAdd,
    onClickListItemTitle,
    getIsOpenMap,
    onClickListItemFolderToggle: toggleIsOpenMap,
  });

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
