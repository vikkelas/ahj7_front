import Request from './Request';
import renderPage from './renderPage';
import Modal from './Modal';

export default class SubmitPage {
  constructor() {
    this.cards = null;
    this.cardEle = null;
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
    this.cardEle.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target);
      });
    });
  }

  initCreatCard() {
    this.btnCreat.addEventListener('click', (e) => {
      e.preventDefault();
      this.modal.creationCardForm();
      const btns = document.querySelector('.modal-window__btns');
      const modalWindow = document.querySelector('.modal-window');
      btns.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('modal-window__btn--close')) {
          this.body.removeChild(modalWindow);
        }
        if (e.target.classList.contains('modal-window__btn--ok')) {
          this.request.newTicket().then((data) => {
            this.body.removeChild(modalWindow);
            this.cards = data;
            console.log(data);
            // this.renderPage(this.cards);
            // this.initEvBtnCard();
          });
        }
      });
    });
  }
}
