/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
export default class Request {
  constructor() {
    this.url = 'https://vikkelas-backend.herokuapp.com/';
  }

  allTickets() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.url}?method=allTickets`);
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
}
