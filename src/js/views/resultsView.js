import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  constructor(data) {
    super();
    this._parentElement = document.querySelector('.results');
    this._data = data;
    this._errorMessage = `No recipes found for your query! Please try again!`;
  }

  _generateMarkup() {
    return this._data.map((result) => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
