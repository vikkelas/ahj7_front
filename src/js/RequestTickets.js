export default class RequestTickets {
  constructor() {
    this.url = 'https://vikkelas-backend.herokuapp.com/?method=';
    this.id = '';
    this.status = '';
    this.form = '';
  }

  requestCard(req, method, id, status) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      if (req === 'POST') {
        this.form = new FormData(document.forms.createCard);
        if (id == null) {
          this.form.set('status', false);
          this.form.set('created', new Date().toLocaleString());
        } else {
          this.form.set('id', id);
        }
        xhr.open(req, `${this.url}${method}`);
      }
      if (req === 'GET') {
        if (id !== null) {
          this.id = `&id=${id}`;
        }
        if (id !== null && status !== null) {
          this.id = `&id=${id}`;
          this.status = `&status=${status}`;
        }
        xhr.open(req, `${this.url}${method}${this.id}${this.status}`);
      }

      xhr.addEventListener('loadstart', () => {
        document.querySelector('body').classList.add('preloader');
      });
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          document.querySelector('body').classList.remove('preloader');
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } catch (e) {
            console.error(e);
            reject(e);
          }
        }
      });
      xhr.send(this.form);
    });
  }
}
