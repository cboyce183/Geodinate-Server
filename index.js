const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const rocky = { id: '0',
  picture: 'http://crowningmusic.com/storage/GSUleOgxWDa4CDe16836.jpg',
  username: 'A$AP Rocky',
  location:
   { timestamp: 1510563180472.471,
     coords:
      { speed: -1,
        latitude: 41.386796,
        altitude: 4.324500560760498,
        longitude: 2.190356,
        heading: -1,
        accuracy: 65,
        altitudeAccuracy: 10 } } };

const zendaya = { id: '1',
  picture: 'https://assets.vogue.com/photos/593ef9f29d94cb14039a9e42/16:9/pass/09-zendaya-coleman-vogue-july-2017.jpg',
  username: 'Zendaya',
  location:
   { timestamp: 1510563180472.471,
     coords:
      { speed: -1,
        latitude: 41.397737,
        altitude: 4.324500560760498,
        longitude: 2.191086,
        heading: -1,
        accuracy: 65,
        altitudeAccuracy: 10 } } };

const harry = { id: '2',
  picture: 'https://media1.popsugar-assets.com/files/thumbor/i2Tty4gwN3jo3J_kEHOZDbX1EE4/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2017/09/06/913/n/1922398/f947445159b060bea8c9d0.77667295_edit_img_image_43983044_1504729782/i/Best-Pictures-Prince-Harry-2017.jpg',
  username: 'Harry Windsor',
  location:
   { timestamp: 1510563180472.471,
     coords:
      { speed: -1,
        latitude: 51.501364,
        altitude: 4.324500560760498,
        longitude: -0.141890,
        heading: -1,
        accuracy: 65,
        altitudeAccuracy: 10 } } };

//{ 'key':zendaya.id, 'data':zendaya },{ 'key':rocky.id, 'data':rocky },{ 'key':harry.id, 'data':harry }

let messages = [];

let storage = [];

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('A user connected!');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('error', function(){
    console.log('An error has occured');
  });

  socket.on('bounce', function(data){
    io.emit('bounceBack', data);
  });

  socket.on('sendMessage', function(msg){
    // socket.emit('receiveMessages', msg);
    io.emit('receiveMessages', msg);
  });

  socket.on('pragma', function(data){
    let flag = true;
    storage.forEach( (el, i) => {
      if (data.id === el.key) {
        flag = false;
        storage.splice(i,1);
        storage.push({ 'key':data.id, 'data':data });
      }
    })
    if (flag) {
      storage.push({ 'key':data.id, 'data':data });
    }
    socket.emit('receive', storage);
  })
});


http.listen(3000, function(){
  console.log('listening on port:3000');
});
