export default class Section {
  constructor({items, renderer}, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  //функция подготовит разметку элементов, используя данные items, тем способом, который будет описан в renderer
  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item));
  }

  //функция выведет элемент в конец контейнера с селектором selector
  setItemEnd(element) {
    this._container.append(element);
  }

  //функция выведет элемент в начало контейнера с селектором selector
  setItemStart(element) {
    this._container.prepend(element);
  }
}