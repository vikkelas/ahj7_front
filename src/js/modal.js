export function createdTicked() {
  const newCard = document.querySelector('.create-newcard');
  const body = document.querySelector('.body__conteiner');

  newCard.addEventListener('click', (e) => {
    e.preventDefault();
    const newForm = document.createElement('div');
    body.insertAdjacentElement('beforeend', newForm);
    newForm.classList.add('modal-window');
    newForm.insertAdjacentHTML('beforeend', `<div class="modal-window__title">Добавить текст</div>
    <form action="" class="modal-window__form">
       <label class="modal-window__label">
          <span class="modal-window__title">Краткое описание</span>
          <input type="text" class="modal-window__input">
       </label>
       <label class="modal-window__label">
          <span class="modal-window__title">Подробное описание</span>
          <textarea class="modal-window__subscribe" id="" cols="42" rows="6" wrap="soft"></textarea>
       </label>
       <div class="modal-window__btns">
          <button class="modal-window__btn modal-window__btn--close">Отмена</button>
          <button class="modal-window__btn modal-window__btn--ok">Ok</button>
       </div>
    </form>`);
  });
}
export function changeCard() {

}
