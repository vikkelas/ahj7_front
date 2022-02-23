import Request from './Request';
import renderPage from './renderPage';
import Modal from './Modal';

export default class SubmitPage {
  constructor() {
    this.cards = null;
    this.cardEle = null;
    this.modalBtn = null;
    this.checkBtn = null;
    this.request = new Request();
    this.modal = new Modal();
    this.btnCreat = document.querySelector('.create-newcard');
    this.renderPage = renderPage;
    this.body = document.querySelector('.body__conteiner');
  }

  init() {
    this.initPage();
    this.initCreatCard();
  }

  initPage() {
    this.request.allTickets().then((data) => {
      this.cards = data;
      if (this.cards.length !== 0 && this.cards !== null) {
        this.renderPage(this.cards);
        this.initEvBtnCard();
      }
    });
  }

  initEvBtnCard() {
    this.cardEle = document.querySelectorAll('.card');
    this.modalBtn = document.querySelectorAll('.card__buttons');
    this.checkBtn = document.querySelectorAll('.card__check-mark');
    this.cardEle.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.currentTarget.querySelector('.card__description').classList.toggle('card__description--active');
      });
    });
    this.modalBtn.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cardEdit = e.target.closest('div.card');
        const id = cardEdit.getAttribute('id');
        if (e.target.classList.contains('card__btn-change')) {
          const titleCard = cardEdit.querySelector('.card__title');
          const description = cardEdit.querySelector('.card__description');
          this.initModal('Изментить тикет', 'edit', id);
          const input = document.getElementsByTagName('input');
          const textarea = document.getElementsByTagName('textarea');
          textarea[0].value = description.innerText;
          input[0].value = titleCard.innerText;
        }
        if (e.target.classList.contains('card__btn-delet')) {
          this.modal.deletCard();
          const btns = document.querySelector('.modal-window__btns');
          const deletWindow = document.querySelector('.delet-window');
          btns.addEventListener('click', (ev) => {
            ev.preventDefault(ev);
            if (e.target.classList.contains('modal-window__btn--close')) {
              this.body.removeChild(deletWindow);
            }
            if (e.target.classList.contains('modal-window__btn--ok')) {
              this.request.deletTicket(id).then((data) => {
                this.zeroing(deletWindow, data);
              });
            }
          });
        }
      });
    });
    this.checkBtn.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cardEdit = e.target.closest('div.card');
        const status = cardEdit.getAttribute('status');
        const id = cardEdit.getAttribute('id');
        this.request.changeCheck(id, status).then((data) => {
          this.cards = data;
          this.cardEle = null;
          this.modalBtn = null;
          this.checkBtn = null;
          this.renderPage(this.cards);
          this.initEvBtnCard();
        });
      });
    });
  }

  initCreatCard() {
    this.btnCreat.addEventListener('click', (e) => {
      e.preventDefault();
      this.initModal('Добавить тикет', 'new');
    });
  }

  initModal(title, req, id) {
    this.modal.creationCardForm(title);
    const btns = document.querySelector('.modal-window__btns');
    const modalWindow = document.querySelector('.modal-window');
    btns.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('modal-window__btn--close')) {
        this.body.removeChild(modalWindow);
      }
      if (e.target.classList.contains('modal-window__btn--ok')) {
        const input = document.getElementsByTagName('input');
        if (/\S/.test(input[0].value)) {
          if (req === 'new') {
            this.creatReqNewTick(modalWindow);
          }
          if (req === 'edit') {
            this.editTicket(modalWindow, id);
          }
        } else {
          const err = document.querySelector('.modal-window__error');
          err.classList.add('modal-window__error--active');
          setTimeout(() => {
            err.classList.remove('modal-window__error--active');
          }, 1500);
        }
      }
    });
  }

  creatReqNewTick(modalWindow) {
    this.request.newTicket().then((data) => {
      this.zeroing(modalWindow, data);
    });
  }

  editTicket(modalWindow, id) {
    this.request.editTicket(id).then((data) => {
      this.zeroing(modalWindow, data);
    });
  }

  zeroing(modalWindow, data) {
    this.body.removeChild(modalWindow);
    this.cards = data;
    this.cardEle = null;
    this.modalBtn = null;
    this.checkBtn = null;
    this.renderPage(this.cards);
    this.initEvBtnCard();
  }
}
