export default function LogoHome({ $target, onClick }) {
  const $logoHome = document.createElement('img');
  const $heading = document.createElement('h1');
  $logoHome.style = 'margin: 12px 12px 0 12px; width: 50px; cursor: pointer;';
  $logoHome.src = 'src/assets/logo.svg';
  $heading.textContent = 'Notion';

  this.render = () => {
    $logoHome.appendChild($heading);
    $target.prepend($logoHome);
  };

  $logoHome.addEventListener('click', onClick);
}
