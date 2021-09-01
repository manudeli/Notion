import Navbar from './components/Navbar.js';

import HomePage from './pages/HomePage.js';
import DocumentsPage from './pages/DocumentsPage.js';
import DocumentEditPage from './pages/DocumentEditPage.js';

import { initRouter, replace } from './utils/router.js';
import { request } from './utils/api.js';

export default function App({ $target }) {
  $target.style = 'max-height:100vh; overflow: auto;';
  const navBar = new Navbar({ $target });
  const homePage = new HomePage({ $target });
  const documentsPage = new DocumentsPage({ $target });
  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: { id: '' },
    onClickRemoveDoc: async (id) => {
      console.log('id', id);
      const deleteRes = await request(`/documents/${id}`, { method: 'DELETE' });
      deleteRes && replace('/');
      navBar.documentListFetch();
    },
    onTitleUpdated: async () => {
      await navBar.documentListFetch();
    },
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
