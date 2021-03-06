import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { MODAL_CLOSE_SEC } from '../config.js';

class AddRecipeView extends View {
  constructor(data) {
    super();
    this._parentElement = document.querySelector('.upload');
    this._window = document.querySelector('.add-recipe-window');
    this._overlay = document.querySelector('.overlay');
    this._btnOpen = document.querySelector('.nav__btn--add-recipe');
    this._btnClose = document.querySelector('.btn--close-modal');
    this._data = data;
    this._message = 'Recipe was sucessfully uploaded :)';

    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  wait(seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
  }

  closeUpload() {
    let hidden = document.querySelector('.add-recipe-window').classList.contains('hidden');

    if (hidden) {
      this.wait(1).then(() => {
        this.renderMarkupBack();
      });
    }

    if (!hidden) {
      this.wait(MODAL_CLOSE_SEC)
        .then(() => {
          this.toggleWindow();
          return this.wait(1);
        })
        .then(() => {
          this.renderMarkupBack();
        });
    }
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataArr = [...new FormData(this)];

      const data = Object.fromEntries(dataArr); // convert an array to an object
      handler(data);
    });
  }

  renderMarkupBack() {
    const markup = `
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="Pizza" required name="title" type="text" />
          <label>URL</label>
          <input
            value="http://allrecipes.com/Recipe/Hot-Pizza-Dip/Detail.aspx"
            required
            name="sourceUrl"
            type="text"
          />
          <label>Image URL</label>
          <input value=http://forkify-api.herokuapp.com/images/580542e3ec.jpg" required name="image"
          type="text" />
          <label>Publisher</label>
          <input value="Random" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="30" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="4" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }
}

export default new AddRecipeView();
