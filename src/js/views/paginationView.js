import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  constructor(data) {
    super();
    this._parentElement = document.querySelector('.pagination');
    this._data = data;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page 1, and there are other pages that
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('prev', curPage);
    }

    // Other page
    if (curPage < numPages) {
      return this._generateMarkupButton('prev', curPage) + this._generateMarkupButton('next', curPage);
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(side, curPage) {
    if (side === 'prev')
      return `
        <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
    `;

    if (side === 'next') {
      return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
    `;
    }
  }
}

export default new PaginationView();
