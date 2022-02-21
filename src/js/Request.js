export default class Request {
  constructor() {
    this.url = 'https://vikkelas-backend.herokuapp.com';
  }

  allTickets() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.url}?method=allTikets`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
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
      xhr.open('POST', `${this.url}?method=createTicket`);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(xhr.response);
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
