export default class Request {
  constructor() {
    this.url = 'https://vikkelas-backend.herokuapp.com';
  }

  allTickets() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.url}?method=allTickets`);
      xhr.addEventListener('loadstart', () => {
        document.querySelector('body').classList.add('preloader');
      });
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          document.querySelector('body').classList.remove('preloader');
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            console.error(e);
            reject(e);
          }
        }
      });
      xhr.send();
    });
  }

  deletTicket(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.url}?method=deletTicket&id=${id}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          document.querySelector('body').classList.remove('preloader');
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            console.error(e);
            reject(e);
          }
        }
      });
      xhr.send();
    });
  }

  changeCheck(id, status) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.url}?method=changeCheck&id=${id}&status=${status}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          document.querySelector('body').classList.remove('preloader');
          try {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          } catch (e) {
            console.error(e);
            reject(e);
          }
        }
      });
      xhr.send();
    });
  }

  newTicket() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const form = new FormData(document.forms.createCard);
      form.set('status', false);
      form.set('created', new Date().toLocaleString());
      xhr.open('POST', `${this.url}?method=createTicket`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } catch (e) {
            console.error(e);
            reject(e);
          }
        }
      });
      xhr.send(form);
    });
  }

  editTicket(id) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const form = new FormData(document.forms.createCard);
      form.set('id', id);
      xhr.open('POST', `${this.url}?method=editTicket`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } catch (e) {
            console.error(e);
            reject(e);
          }
        }
      });
      xhr.send(form);
    });
  }
}
