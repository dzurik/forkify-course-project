import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class BookmarksView extends View {
  constructor(data) {
    super();
    this._parentElement = document.querySelector('.bookmarks__list');
    this._data = data;
    this._errorMessage = `No bookmarks yet. Find a nice recipe and bookmark is :)`;
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map((bookmark) => previewView.render(bookmark, false)).join('');
  }
}

export default new BookmarksView();
