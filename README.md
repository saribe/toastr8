# toastr8
**toastr8** is a Javascript library for non-blocking notifications. jQuery is required. The goal is to create a simple core library that can be customized and extended.


## Current Version
1.0.3


## Demo
- Demo can be found at http://maispc.com/app/toastr8


## Wiki and Change Log
[Wiki including Change Log](http://maispc.com/app/toastr8/wiki)

###3 Easy Steps
For other API calls, see the [demo](http://maispc.com/app/toastr8).

1. Link to toastr8.css `<link href="toastr8.css" rel="stylesheet"/>`

2. Link to toastr8.js `<script src="toastr8.js"></script>`

3. use toastr8 to display a toast notifcation

		// Display an info notification with no title
		toastr8.info('This is your dog birthday!');
![Display an info notification with no title](info.PNG)

		// Display an info notification with title
		toastr8.info('This is your dog birthday!', "Remember");
![Display an info notification with no title](info_title.PNG)		

		// Alternative display an info notification with title and custom icon
		toastr8.info({
			message:'This is your dog birthday!', 
			title:"Remember",
			iconClass: "fa fa-calendar"
		});
![Display an info notification with no title](info_iconClass.PNG)

		// Alternative display an info notification with title and custom icon and image from css class
		toastr8.info({
			message:'This is your dog birthday!', 
			title:"Remember",
			iconClass: "fa fa-calendar",
			imgClass: "dog-foto-img"
		});
![Display an info notification with no title](info_imgClass.PNG)
		
		// Alternative display an info notification with title and custom icon and image from url
		toastr8.info({
			message:'This is your dog birthday!', 
			title:"Remember",
			iconClass: "fa fa-calendar",
			imgURI: ["http://domain/images/failoverDogFoto.jpg" "http://domain/images/niceFoto.png" ]
		});
![Display an info notification with no title](info_iconURI.PNG)

### Other Options
	// able toasts
	var toasts = ["info", "error", "warning", "success", "facebook", "twitter", "skype", "android", "linkedIn", "windows", "googlePlus", "gitHub"];
	
	for(var i =0, k = toasts.length; i < k; i++){
		//toastr8.toastElement("message", "title");
		toastr8[toasts[ i ] ]("message", "title");
	}
![Display an info notification with no title](error_custom.PNG)
		
	// Clears the current list of toasts
	toastr8.clear()

	
### Close Button
Optionally enable a close button

    toastr8.options.closeButton = true;

Optionally override the close button's HTML. 

    toastr8.options.closeHtml = '<b><i class="fa-times"></i></b>';

You can also override default icons
	// override info class icon
   toastr8.options.iconClasses.info = "fa fa-archive";

   
### Display Sequence
Show newest toast at bottom (top is default)

	toastr8.options.newestOnTop = false;

	
### Callbacks
	// Define a callback for when the toast is shown/hidden
	toastr8.options.onShown = function() { console.log('hello'); }
	toastr8.options.onHidden = function() { console.log('goodbye'); }

	
### Animation Options
toastr8 will supply default animations, so you do not have to provide any of these settings. However you have the option to override the animations if you like.


####Easings
Optionally override the animation easing to show or hide the toasts. Default is swing. swing and linear are built into jQuery.

	toastr8.options.showEasing = 'swing';
	toastr8.options.hideEasing = 'linear';

Using the jQuery Easing plugin (http://www.gsgd.co.uk/sandbox/jquery/easing/)

	toastr8.options.showEasing = 'easeOutBounce';
	toastr8.options.hideEasing = 'easeInBack';

	
####Animation Method
Use the jQuery show/hide method of your choice. These default to fadeIn/fadeOut. The methods fadeIn/fadeOut, slideDown/slideUp, and show/hide are built into jQuery.

	toastr8.options.showMethod = 'slideDown'; 
	toastr8.options.hideMethod = 'slideUp'; 

	
## Authors
**Samuel Ribeiro **


## Credits
Inspired by https://github.com/CodeSeven/toastr.


## Copyright
Copyright © 2013 [Samuel Ribeiro](http://twitter.com/_saribe)

## License 
toastr8 is under MIT license - http://www.opensource.org/licenses/mit-license.php
