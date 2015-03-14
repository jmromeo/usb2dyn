// required modules
var dynamixel = require('../../usb2dyn');

// usb2dyn ffi library
var usb2dyn = dynamixel.usb2dyn;

// initializing communication wth usb dynamixel controller
usb2dyn.dxl_initialize(0, 1);

// writing angle to 2 motors at one time (value must be between 0-1023)
usb2dyn.dxl_init_sync_write();
usb2dyn.dxl_set_pos(1, 512, 0);
usb2dyn.dxl_set_pos(2, 512, 0);
usb2dyn.dxl_sync_write();


usb2dyn.dxl_terminate();
