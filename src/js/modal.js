import Request from './Request';

export default class Modal {
  constructor() {
    this.btnFormCreat = null;
    this.request = new Request();
    this.body = document.querySelector('.body__conteiner');
  }

  creationCardForm() {
    const newForm = document.createElement('div');
    this.body.insertAdjacentElement('beforeend', newForm);
    newForm.classList.add('modal-window');
    newForm.insertAdjacentHTML('beforeend', `<div class="modal-window__title">Добавить текст</div>
  <form id="createCard" name="createCard" class="modal-window__form">
     <label class="modal-window__label">
        <span class="modal-window__title">Краткое описание</span>
        <input name="name" type="text" class="modal-window__input">
     </label>
     <label class="modal-window__label">
        <span class="modal-window__title">Подробное описание</span>
        <textarea name="description" class="modal-window__subscribe" id="" cols="42" rows="6" wrap="soft"></textarea>
     </label>
     <div class="modal-window__btns">
        <button class="modal-window__btn modal-window__btn--close">Отмена</button>
        <button class="modal-window__btn modal-window__btn--ok">Ok</button>
     </div>
  </form>`);
  }
}
