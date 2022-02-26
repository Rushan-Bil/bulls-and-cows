// const HOST = window.location.origin.replace(/^http/, 'ws');
// HOST = HOST.replace(/:\d{3,5}/gi, '');
console.log(window.location);
const socket = new WebSocket('ws://localhost:3001');

export default socket;
