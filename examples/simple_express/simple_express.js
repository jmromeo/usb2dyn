// required modules
var http       = require('http');
var express    = require('express');
var bodyParser = require('body-parser');
var dynamixel  = require('../../usb2dyn');

// usb2dyn ffi library
var usb2dyn = dynamixel.usb2dyn;

// create our app
var app = express();

usb2dyn.dxl_initialize(0, 1);

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// A browsers default method is 'GET', so this is the route that
// express uses when we visit our site initially
app.get('/', function(req, res) {

  // The form's action is '/' and its method is 'POST', so the app.post('/', ...` 
  // will receive the result of our form
  var html = '<form action="/" method="post">' + 
               'Pan Angle: ' + 
               '<input type="text" name="panAngle" placeholder="..." />' +
               '<br>' + 
               'Tilt Angle: ' + 
               '<input type="text" name="tiltAngle" placeholder="..." />' +
               '<button type="submit">Submit</button>' +
             '</form>';

  res.send(html);
});

// This route receives the posted form. Form data is stored in req.body
app.post('/', function(req, res) {
  var panAngle = req.body.panAngle;
  var tiltAngle = req.body.tiltAngle;

  usb2dyn.dxl_init_sync_write();
  usb2dyn.dxl_set_pos(1, panAngle, 0);
  usb2dyn.dxl_set_pos(2, tiltAngle, 0);
  usb2dyn.dxl_sync_write();

  var html = '<form action="/" method="post">' + 
               'Pan Angle: ' + 
               '<input type="text" name="panAngle" placeholder="..." />' +
               '<br>' + 
               'Tilt Angle: ' + 
               '<input type="text" name="tiltAngle" placeholder="..." />' +
               '<button type="submit">Submit</button>' +
             '</form>';

  res.send(html);
});
app.listen(8080);

console.log("Listening on port 8080, to control servos, navigate " +
            "to http://localhost:8080 from your favorite broswer.");

