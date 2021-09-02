export default function Title({ $target, text = '제목', headingNumber = 1 }) {
  const $title = document.createElement(`h${headingNumber}`);
  $title.id = 'title';
  $title.textContent = text;

  this.render = () => {
    $target.prepend($title);
  };
}
