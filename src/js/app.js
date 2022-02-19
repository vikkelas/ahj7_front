import Request from './Request';

const req = new Request();

req.allTickets().then((data) => console.log(data)).catch((error) => console.error(error));
