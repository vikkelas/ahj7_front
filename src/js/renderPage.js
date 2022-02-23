export default function renderPage(data) {
  const cardConteiner = document.querySelector('.card-conteiner');
  cardConteiner.innerHTML = '';
  data.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `${item.id}`);
    card.setAttribute('status', `${item.status}`);
    let checkCard = '';
    if (item.status === 'true') {
      checkCard = 'card__check-mark--true';
    }
    card.insertAdjacentHTML('beforeend', `<div class="card__check-mark ${checkCard}"></div>
    <div class="card__body">
        <div class="card__title">${item.name}</div>
        <div class="card__description">${item.description}</div>
    </div>
    <div class="card__create-time">${item.created}</div>
    <div class="card__buttons">
       <button class="card__btn card__btn-change"></button>
       <button class="card__btn card__btn-delet"></button>
    </div> `);

    cardConteiner.insertAdjacentElement('beforeend', card);
  });
}
