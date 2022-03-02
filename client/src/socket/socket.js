// const HOST = window.location.origin.replace(/^http/, 'ws');
// HOST = HOST.replace(/:\d{3,5}/gi, '');
const socket = new WebSocket('wss://bulls-and-cows-apii.herokuapp.com');
console.log('socket');
export default socket;
