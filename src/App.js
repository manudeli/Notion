import Navbar from './components/Navbar.js';

import HomePage from './pages/HomePage.js';

import { initRouter } from './router.js';

export default function App({ $target }) {
  const $appContainer = document.createElement('div');
  $appContainer.style.display = 'flex';
  $target.appendChild($appContainer);

  const navBar = new Navbar({ $target: $appContainer });
  const homePage = new HomePage({ $target: $appContainer });

  this.route = () => {
    $appContainer.innerHTML = '';
    const { pathname } = window.location;

    // 네비게이션 렌더링
    navBar.setState();

    // 콘텐츠 렌더링
    if (pathname === '/') {
      homePage.setState();
    } else if (pathname.indexOf('/posts') === 0) {
      const [, , postId] = pathname.split('/');
    }
  };

  this.route();

  initRouter(() => this.route());
}
