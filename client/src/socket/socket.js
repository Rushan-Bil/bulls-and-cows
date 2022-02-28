// const HOST = window.location.origin.replace(/^http/, 'ws');
// HOST = HOST.replace(/:\d{3,5}/gi, '');
const socket = new WebSocket('ws://localhost:3001');

export default socket;
