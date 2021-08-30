import Navbar from './components/Navbar.js';

import HomePage from './pages/HomePage.js';
import DocumentsPage from './pages/DocumentsPage.js';
import DocumentEditPage from './pages/DocumentEditPage.js';

import { initRouter } from './utils/router.js';

export default function App({ $target }) {
  const navBar = new Navbar({ $target });
  const homePage = new HomePage({ $target });
  const documentsPage = new DocumentsPage({ $target });
  const documentEditPage = new DocumentEditPage({ $target });

  this.route = () => {
    $target.innerHTML = '';
    const { pathname } = window.location;

    navBar.setState();

    // 페이지 렌더링
    if (pathname === '/') {
      homePage.setState();
    } else if (pathname.indexOf('/documents') === 0) {
      const [, , documentId] = pathname.split('/');
      documentId ? documentEditPage.setState() : documentsPage.setState();
    }
  };
  // 포크 커밋 테스트

  this.route();

  initRouter(() => this.route());
}
