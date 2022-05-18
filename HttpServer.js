const Express = require('express');
const app = Express();

// Declare a route
app.get('/favicon.ico', (request, reply) => {
  reply.header('Content-Type', 'image/x-icon')
    .send('');
});

app.get('/', (request, reply) => reply.send('{"code":0}'));
app.get('*', (request, reply) => reply.send('{"code":0}'));

module.exports = {
  execute(port) {
    // Run the server!
    app.listen(port, () => {
      console.log(`HTTP Server | Listening on PORT ${port}`);
    });
  }
}
