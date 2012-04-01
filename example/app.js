// Parse API Module Kitchen Sink
// www.forge42.com

Titanium.UI.setBackgroundColor('white');
// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white',
	//Don't use heavyweight window, because on android, there are problems with openPhotoGallery and Push Notifications. Instead set the navbar-hidden property in your tiapp.xml file to true.
	//You don't need to start another heavyweight window(basically an android activity), because the root activity that launches your app is already an android activity!
	//Heavy weight windows are windows that have (can be true or false, it doesn't matter) the following properties:
	//fullscreen: true or false or
	//navBarHidden: true or false or
	//modal: true or false or
	//windowSoftInputMode: any value
});

win.open();

//globally define parseapi. Don't do this! This is only done for this demo. Namespace your application!!!! See the guide for more info.
var parseapi = require('com.forge42.parseapi');

Ti.API.info("module is => " + parseapi);


var parse_module_debug_log = true;

// Toggle Parse API Module Debugging Log Output
parseapi.enableParseModuleDebugLog(parse_module_debug_log);

var currentActivity = null;

if (Titanium.Platform.name == 'android') 
{
	// Parse doesn't support the Facebook API on Android yet.
		
	parseapi.initParse( {
							applicationId: "Place your Application Id Here",
	 						clientKey: "Place your Client Key Here"
						});	
						
	// for this to work, you have to use the root activity. The windows you open cannot be heavyweight windows so that the root activity stays active.
	currentActivity = Ti.Android.currentActivity;

	
	parseapi.ParseAndroidPushSubscribeWithActivity("", currentActivity);
	
	// Check if the user touched a notification in the status bar when launching this activity
	currentActivity.addEventListener('create', function(e) {
		// check when it's created
		var intent = currentActivity.getIntent();
	
		if( intent.hasExtra("com.parse.Channel") && intent.hasExtra("com.parse.Data") ) {
			var channel = intent.getStringExtra("com.parse.Channel");
			var data = JSON.parse( intent.getStringExtra("com.parse.Data") );
			
			// process your android push notification here
			
			Ti.API.info("User touched push notification!");
			alert("Status Bar Notification Touched:\n" + JSON.stringify(data));
			
			// clear all the other notifications in the status bar so that the user can't click on them anymore.
			parseapi.ParseAndroidPushClearAllNotifications();
		}
	});
	
	parseapi.ParseAndroidPushSetupDefaultActionReceiver("com.lithiumllama.parsefacebooktest.HANDLEP", function (e) {
			var intent = e.intent;
			if( intent.hasExtra("com.parse.Channel") && intent.hasExtra("com.parse.Data") ) {
				var channel = intent.getStringExtra("com.parse.Channel");
				var data = JSON.parse( intent.getStringExtra("com.parse.Data") );
				
				// process your android push notification here
				Ti.API.info("Got Push Notification In Default Action Receiver!");
				alert("Running App Notification:\n" + JSON.stringify(data));
				
				// clear all the other notifications in the status bar so that the user can't click on them anymore.
				parseapi.ParseAndroidPushClearAllNotifications();
			}
		});
	
} else {
	// Parse Supports Facebook API on iOS
	parseapi.initParse( {
							applicationId: "Place your Application Id Here",
	 						clientKey: "Place your Client Key Here",
							facebookApplicationId: "Place your Facebook Application Id Here (Optional)"
						});	
						
	// iOS Push Notifications
	Ti.Network.registerForPushNotifications({
		types:[
			Ti.Network.NOTIFICATION_TYPE_BADGE,
			Ti.Network.NOTIFICATION_TYPE_ALERT,
			Ti.Network.NOTIFICATION_TYPE_SOUND
		],
		success: function(e) {
			var token = e.deviceToken;
			
			// register the parse api to receive notifications
			parseapi.ParseiOSPushStoreDeviceToken( token );
			
			// Synchronous
			// subscribe to global channel
			var result = parseapi.ParseiOSPushSubscribeToChannel("");
			
			if( result.succeeded == false )
			{
				alert("Could not subscribe to global push notifications channel");
			}
		},
		error: function(e) {
			alert("iOS Register For Push Notifications Error: " + e.error);
		},
		callback: function(e) {
			var data = e.data;
			
			 // remove this line if you want to handle the push notification yourself and don't want the alert dialog to popup
			parseapi.ParseiOSPushHandlePush(data);
		}
	});
}

if (Titanium.Platform.name == 'android') 
{
	// Refresh the Current User on Resume on Android
	currentActivity.addEventListener('resume', function(e) {
		Ti.API.info("Resumed Android App");
		
		// This operation PFUserCurrentUser uses the network and might be expensive to use without showing a loading screen
		// I suggest refreshing your User object when you need it and not on resume
		/*var user = parseapi.PFUserCurrentUser(); 		
		if( user != null ) {
			user.refresh();
		}*/
		
		parseapi.ParseAndroidPushRegisterDefaultActionReceiver();
	});	
	
	currentActivity.addEventListener('pause', function(e) {
		Ti.API.info("Paused Android App");
		
		parseapi.ParseAndroidPushUnregisterDefaultActionReceiver();
		
	});		
} else {
	// Refresh the Current User on Resume on iPhone			
	Ti.App.addEventListener('resume', function(){
		Ti.API.info("Resumed iPhone App");
		
		// This operation PFUserCurrentUser uses the network and might be expensive to use without showing a loading screen
		// I suggest refreshing your User object when you need it and not on resume
		/*var user = parseapi.PFUserCurrentUser();
		if( user != null ) {
			user.refresh();
			
		}*/
	});
	
}	

// Choose the default Image Representation for TiBlob when saving PFFiles. Check Guide for more information.
parseapi.setDefaultTiBlobImageRepresentation( parseapi.kTiBlobImageDefaultPNG ); // can also be parseapi.kTiBlobImageDefaultJPEG

var topLabel = Titanium.UI.createLabel({
	text:"PARSE API MODULE TESTS",
	height:'30',
	width:'auto',
	top: 4,
	color:'black',
	font:{fontSize:18, fontWeight: 'bold' },
	textAlign:'center'
});

win.add(topLabel);
	
// Parse API Tests

var test_name_array = new Array();

test_name_array[0] = "PFObject save (Sync)";
test_name_array[1] = "PFObject save (Async)";
test_name_array[2] = "PFQuery getObjectWithId (Sync)";
test_name_array[3] = "PFQuery getObjectWithId (Async)";
test_name_array[4] = "PFQuery findObjects (Sync, limit 5, skip 2)";
test_name_array[5] = "PFQuery findObjects (Async)";
test_name_array[6] = "PFObject deleteObject (Sync)";
test_name_array[7] = "PFObject deleteObject (Async)";
test_name_array[8] = "PFUser Sign Up";
test_name_array[9] = "PFUser Login";
test_name_array[10] = "PFUser Current User";
test_name_array[11] = "Facebook Login/Sign Up";
test_name_array[12] = "FB Simple Graph API Call";
test_name_array[13] = "FB Create Event";
test_name_array[14] = "FB Set Status Msg";
test_name_array[15] = "FB Upload Photo (Graph API)";
test_name_array[16] = "FB Upload Photo (REST deprecated)";
test_name_array[17] = "FB Feed Dialog"; 
test_name_array[18] = "Link Facebook To Existing User";
test_name_array[19] = "Unlink Facebook Account";
test_name_array[20] = "Refresh Current PFUser";
test_name_array[21] = "Request Password Reset For Email";
test_name_array[22] = "Change Password";
test_name_array[23] = "Association Ex. (PFObject)";
test_name_array[24] = "Association Ex. (PFUser)";
test_name_array[25] = "Retrieve User Associations";
test_name_array[26] = "PFObject Save All";
test_name_array[27] = "ParseiOSPush Send Message";
test_name_array[28] = "PFFile Save Image";
test_name_array[29] = "PFFile Get Image";

var test_order_array = new Array(0, 1, 27, 6, 7, 2, 3, 4, 5, 10, 20, 9, 8, 21, 22, 11, 18, 19, 12, 13, 14, 15, 16, 17, 23, 24, 25, 26, 28, 29);

if (Titanium.Platform.name == 'android') 
{
	// if using android, don't show iOS Push and Facebook functions
	test_order_array = new Array(0, 1, 6, 7, 2, 3, 4, 5, 10, 20, 9, 8, 21, 22, 23, 24, 25, 26, 28, 29);
}

var scrollView = Titanium.UI.createScrollView({
    contentWidth:'auto',
    contentHeight:'auto',
	height: "100%",
	width: "100%",
    top:30,
    showVerticalScrollIndicator:true,
    showHorizontalScrollIndicator:false
});
var view = Ti.UI.createView({
	width: '100%', 
    height:(42 + (42*test_order_array.length) + 10),
    layout: 'vertical'
});

scrollView.add(view);

win.add(scrollView);

var debugButtonArgs = {
			title: "Toggle Module Debug Log " + ((parse_module_debug_log)?"[ON]":"[OFF]"),
			color: "white",
			font:{size:"10px", fontWeight:'bold'},
			height:30,
			width:"95%",
			top: 10,
			backgroundColor: "#5778FF",
			backgroundFocusedColor: "#7A95FF",
			backgroundSelectedColor: "#7A95FF",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	};

if (Titanium.Platform.name != 'android')  {
	debugButtonArgs.backgroundImage = 'none';
}
var debugButton = Titanium.UI.createButton(debugButtonArgs);
		
debugButton.addEventListener('click', function() {
	
	if( parse_module_debug_log )
	{
		parse_module_debug_log = false;
	}
	else
	{
		parse_module_debug_log = true;
	}
	
	debugButton.title = "Toggle Module Debug Log " + ((parse_module_debug_log)?"[ON]":"[OFF]");
	
	// Toggle Parse API Module Debugging Log Output
	parseapi.enableParseModuleDebugLog(parse_module_debug_log);
});

view.add(debugButton);
		
// Create the buttons	
var test_button_array = new Array();

for (var i=0; i < test_name_array.length; i++) {
	
	var buttonArgs = {
		title: test_name_array[i],
		color: "white",
		font:{size:"10px", fontWeight:'bold'},
		height:30,
		width:"90%",
		top: 10,
		//backgroundImage: "none",
		backgroundColor: "#5778FF",
		backgroundFocusedColor: "#7A95FF",
		backgroundSelectedColor: "#7A95FF",
		borderWidth:1,
		borderRadius:10,
		borderColor:'#000'
	}; 
	
	if (Titanium.Platform.name != 'android')  {
		buttonArgs.backgroundImage = 'none';
	}
	var button = Titanium.UI.createButton(buttonArgs);
	
	test_button_array.push(button);
};

// organize the buttons
for (var i=0; i < test_order_array.length; i++) {
	view.add(test_button_array[test_order_array[i]]);
}

// test variables
var created_object_id = null;

//PFObject Save (Sync)
test_button_array[0].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFObject save (Sync)");
	
	// New PFObject
	var pfObject = parseapi.PFObjectCreateObjectWithClassName( "TestObject" );
	
	// Text, numbers
	pfObject.setObject("Cereal Box", "product");
	pfObject.setObject(1500, "quantity");
	
	// Can pass an object that will get stored using JSON
	pfObject.setObject({ name:"upc", upcData: 123214353 }, "productData");
	
	// Save Synchronously.
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	var result = pfObject.save();
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully saved object!");
		
		created_object_id = pfObject.objectId;
		Ti.API.info("Created Object ID: " + created_object_id);
	} else {
		
		Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

});

//PFObject Save (Async)
test_button_array[1].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFObject save (Async)");
	
	// New PFObject
	var pfObject = parseapi.PFObjectCreateObjectWithClassName("TestObject");
	
	// Text, numbers
	pfObject.setObject("Cereal Box", "product");
	pfObject.setObject(1500, "quantity");
	
	// Can pass an object that will get stored using JSON
	pfObject.setObject({ name:"upc", upcData: 123214353 }, "productData");
	
	// Save Asynchronously.
	pfObject.saveInBackground( { 	
	
		success: function(e) {
			// event: nothing
			
			Ti.API.info("Success!");
			
			created_object_id = pfObject.objectId;
			Ti.API.info("Created Object ID: " + created_object_id);
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
		
			Ti.API.info("Error: " + JSON.stringify(e));
		}
	});

});

//PFQuery getObjectWithId (Sync)
test_button_array[2].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFQuery getObjectWithId (Sync)");

	if( created_object_id == null )
	{
		Ti.API.info("Please Create Object First. \nRun Test: \"" + 'PFObject save (Sync)' + "\" or \"" + 'PFObject save (Async)' + "\"");
		//return;
	}
	
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	var result = pfQuery.getObjectWithId(created_object_id);
	
	// Synchronous.
	// returns (boolean)succeeded, (PFObject or null)object, (integer or null)errorCode, (string or null)error
	if( result.succeeded ) {
	
		Ti.API.info("Successfully queried object!");
		
		var pfObject = result.object;
		
		Ti.API.info("Start Query Result:");
		Ti.API.info("    objectId: " + pfObject.objectId );
		Ti.API.info("    updatedAt: " + pfObject.updatedAt );
		Ti.API.info("    createdAt: " + typeof(pfObject.createdAt) );
		Ti.API.info("    product: " + pfObject.objectForKey("product") );
		Ti.API.info("    quantity: " + pfObject.objectForKey("quantity") );
		Ti.API.info("    productData: " + JSON.stringify( pfObject.objectForKey("productData") ) );
		Ti.API.info("End Query Result");
		
	} else {
		
		Ti.API.info("Could not query object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}
	
});

//PFQuery getObjectWithId (Async)
test_button_array[3].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFQuery getObjectWithId (Async)");

	if( created_object_id == null )
	{
		Ti.API.info("Please Create Object First. \nRun Test: \"" + 'PFObject save (Sync)' + "\" or \"" + 'PFObject save (Sync)' + "\"");
		//return;
	}
	
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.getObjectInBackgroundWithId({
		id: created_object_id,
		
		success: function(e) {
			// event: (PFObject)object
			
			Ti.API.info("Success!");
			
			var pfObject = e.object;
	
			Ti.API.info("Start Query Result:");
			Ti.API.info("    objectId: " + pfObject.objectId );
			Ti.API.info("    updatedAt: " + pfObject.updatedAt );
			Ti.API.info("    createdAt: " + pfObject.createdAt );
			Ti.API.info("    product: " + pfObject.objectForKey("product") );
			Ti.API.info("    quantity: " + pfObject.objectForKey("quantity") );
			Ti.API.info("    productData: " + JSON.stringify( pfObject.objectForKey("productData") ) );
			Ti.API.info("End Query Result");
	
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			Ti.API.info("Error: " + JSON.stringify(e));
		}
		
	});

});

//PFQuery findObjects (Sync)
test_button_array[4].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFQuery findObjects (Sync, limit 5, skip 2)");
	
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	pfQuery.skip = 2; // skip the first two 
	pfQuery.limit = 5; // set the limit 
	pfQuery.orderByDescending("createdAt"); // can also be orderByAscending (takes a key as an argument)
	
	// you can reset the query with the same class name using the following line:
	// pfQuery.resetQuery();
	
	
	// Synchronous.
	// returns (boolean)succeeded, (Array or null)objects, (integer or null)errorCode, (string or null)error
	var result = pfQuery.findObjects();
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully queried objects!");
		
		var pfObjects = result.objects;
		
		Ti.API.info("Query skip " + pfQuery.skip + ", limit " + pfQuery.limit + " and returned " + pfObjects.length + " PFObjects"); 
		Ti.API.info("Start Query Result -------------------------------- ");
		
		for( var i = 0; i < pfObjects.length; i++ )
		{
			var pfObject = pfObjects[i];
			Ti.API.info("  PFObject " + i);
			Ti.API.info("    objectId: " + pfObject.objectId );
			Ti.API.info("    updatedAt: " + pfObject.updatedAt );
			Ti.API.info("    createdAt: " + pfObject.createdAt );
			Ti.API.info("    product: " + pfObject.objectForKey("product") );
			//Ti.API.info("    quantity: " + pfObject.objectForKey("quantity") );
			//Ti.API.info("    productData: " + JSON.stringify( pfObject.objectForKey("productData") ) );
			Ti.API.info("  End PFObject");
			Ti.API.info("");
		}
		Ti.API.info("End Query Result -------------------------------- ");
		
	} else {
		
		Ti.API.info("Could not query objects. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}
	
});

//PFQuery findObjects (Async)
test_button_array[5].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFQuery findObjects (Async)");

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	//pfQuery.limit = 5; // set the limit 
	pfQuery.orderByDescending("createdAt"); // can also be orderByAscending (takes a key as an argument)
	
	// you can reset the query with the same class name using the following line:
	// pfQuery.resetQuery();

	// you can set the parse cache policy like this. All values are in the documentation 
	pfQuery.cachePolicy = parseapi.kParseCachePolicyNetworkElseCache;
	
	// Asynchronous
	pfQuery.findObjectsInBackground({
		success: function(e) {
			// event: (PFObject)object
			
			Ti.API.info("Success!");
			
			var pfObjects = e.objects;
			
			Ti.API.info("Query returned " + pfObjects.length + " PFObjects"); 
			Ti.API.info("Start Query Result -------------------------------- ");
		
			for( var i = 0; i < pfObjects.length; i++ )
			{
				var pfObject = pfObjects[i];
				Ti.API.info("  PFObject " + i);
				Ti.API.info("    objectId: " + pfObject.objectId );
				Ti.API.info("    updatedAt: " + pfObject.updatedAt );
				Ti.API.info("    createdAt: " + pfObject.createdAt );
				Ti.API.info("    product: " + pfObject.objectForKey("product") );
				//Ti.API.info("    quantity: " + pfObject.objectForKey("quantity") );
				//Ti.API.info("    productData: " + JSON.stringify( pfObject.objectForKey("productData") ) );
				Ti.API.info("  End PFObject");
				Ti.API.info("");
			}
			Ti.API.info("End Query Result -------------------------------- ");
	
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			Ti.API.info("Error: " + JSON.stringify(e));
		}
		
	});

});

//PFQuery deleteObject (Sync)
test_button_array[6].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFObject deleteObject (Sync)");
	
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	// get the last added object to delete
	
	pfQuery.whereKey( { key: "product", equalTo: "Cereal Box" });
	pfQuery.limit = 1; // set the limit 
	pfQuery.orderByDescending("updatedAt"); // can also be orderByAscending (takes a key as an argument)
	var result = pfQuery.findObjects();
	
	if( result.succeeded ) {
	
		Ti.API.info("Object To Delete: ");
		
		var pfObject = result.objects[0];
		
		Ti.API.info("  PFObject: ");
		Ti.API.info("    objectId: " + pfObject.objectId );
		Ti.API.info("    updatedAt: " + pfObject.updatedAt );
		Ti.API.info("    createdAt: " + pfObject.createdAt );
		Ti.API.info("    product: " + pfObject.objectForKey("product") );
		//Ti.API.info("    quantity: " + pfObject.objectForKey("quantity") );
		//Ti.API.info("    productData: " + JSON.stringify( pfObject.objectForKey("productData") ) );
		Ti.API.info("  End PFObject");
		Ti.API.info("");
		
		// delete object synchronously
		result = pfObject.deleteObject();
		
		if( result.succeeded )
		{
			Ti.API.info("Successfully deleted object with ID: " + pfObject.objectId);
		}
		else
		{
			Ti.API.info("Could not delete object with ID: " + pfObject.objectId + " ErrorCode: " + result.errorCode + " Error: " + result.error);
		}
		
	} else {
		
		Ti.API.info("Could not query object to delete. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}
	
});

//PFQuery deleteObject (Async)
test_button_array[7].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFObject deleteObject (Async)");
	
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	// get the last added object to delete
	
	pfQuery.whereKey( { key: "product", equalTo: "Cereal Box" });
	pfQuery.limit = 1; // set the limit 
	pfQuery.orderByDescending("updatedAt"); // can also be orderByAscending (takes a key as an argument)
	var result = pfQuery.findObjects();
	
	if( result.succeeded ) {
	
		Ti.API.info("Object To Delete: ");
		
		var pfObject = result.objects[0];
		
		Ti.API.info("  PFObject: ");
		Ti.API.info("    objectId: " + pfObject.objectId );
		Ti.API.info("    updatedAt: " + pfObject.updatedAt );
		Ti.API.info("    createdAt: " + pfObject.createdAt );
		Ti.API.info("    product: " + pfObject.objectForKey("product") );
		//Ti.API.info("    quantity: " + pfObject.objectForKey("quantity") );
		//Ti.API.info("    productData: " + JSON.stringify( pfObject.objectForKey("productData") ) );
		Ti.API.info("  End PFObject");
		Ti.API.info("");
		
		// delete object Asynchronously
		pfObject.deleteObjectInBackground({
			success: function(e) {
				// event: nothing
				Ti.API.info("Successfully deleted object with ID: " + pfObject.objectId);
			},
			
			error: function(e) {
				// event: (integer or null)errorCode, (string or null)error
				
				Ti.API.info("Could not delete object with ID: " + pfObject.objectId + " ErrorCode: " + e.errorCode + " Error: " + e.error);
			}
			
		});
		
	} else {
		
		Ti.API.info("Could not query object to delete. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

});

//PFUser Sign Up
test_button_array[8].addEventListener('click', function() {

	var titleLabel = Titanium.UI.createLabel({
	    text:"Sign Up ",
	    height:'auto',
	    width:'auto',
	    top: -25,
	    left: 20,
	    color:'black',
	    font:{fontSize:18, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	// create a popup window to let you sign up
	var popupView = Ti.UI.createView({
		top: 20,
		width: 300, 
		height:350,
		backgroundColor: "white",
		borderWidth:3,
		borderRadius:10,
		borderColor:'black',
		layout:'vertical'
	});
	
	if (Titanium.Platform.name != 'android')  {
		popupView.height = 240;
	}
	
	var closeButton = Titanium.UI.createButton({
			title: "X",
			color: "black",
			font:{size:"12pt", fontWeight:'bold'},
			height:30,
			width:30,
			top: 5,
			right: 5,
			backgroundColor: "white",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	});
	
	var label1 = Titanium.UI.createLabel({
	    text:"E-Mail: ",
	    height:'auto',
	    width:'auto',
	    top: 5,
	   // left: 20,
	    color:'black',
	    font:{fontSize:14, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	var emailTextField = Titanium.UI.createTextField({
		color:'#336699',
		height: 'auto',
		//height:35,
		//backgroundImage:'none',
		//backgroundColor:'transparent',
		width:'95%',
		//right: 5,
		top:10,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		// borderWidth:1,
		// borderColor:"#336699",
		// borderRadius: 5
		// keyboardToolbar:[flexSpace,done],
		// keyboardToolbarColor: '#999',   
		// keyboardToolbarHeight: 40,
	});
	
	if (Titanium.Platform.name != 'android')  {
		emailTextField.height = 35;
	}
	
	var label2 = Titanium.UI.createLabel({
			text:"Password: ",
			height:'auto',
			width:'auto',
			top: 10,
			//left: 20,
			color:'black',
			font:{fontSize:14, fontWeight: 'bold' },
			textAlign:'center'
		});
		
	var passwordTextField = Titanium.UI.createTextField({
		color:'#336699',
		height: 'auto',
		width:'95%',
		//right: 5,
		top:10,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		passwordMask:true,
		// keyboardToolbar:[flexSpace,done],
		// keyboardToolbarColor: '#999',   
		// keyboardToolbarHeight: 40,
	});
	
	if (Titanium.Platform.name != 'android')  {
		passwordTextField.height = 35;
	}
	
	closeButton.addEventListener('click', function() {
	
		emailTextField.blur();
		passwordTextField.blur();
		
		win.remove(popupView);
	});
	
	var signUpButtonArgs = {
			title: "Sign Up",
			color: "white",
			font:{size:"12pt", fontWeight:'bold'},
			height:40,
			width:"90%",
			top: 10,
			//backgroundImage: "none",
			backgroundColor: "#5778FF",
			backgroundFocusedColor: "#7A95FF",
			backgroundSelectedColor: "#7A95FF",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	};
	
	if (Titanium.Platform.name != 'android')  {
		signUpButtonArgs.backgroundImage = 'none';
	}
	var signUpButton = Titanium.UI.createButton(signUpButtonArgs);
		
	signUpButton.addEventListener('click', function() {
		
		emailTextField.blur();
		passwordTextField.blur();
		
		if( emailTextField.value === "" || passwordTextField.value === "" )
		{
			alert("Please fill in a username & password");
			return; 
		}
		
		var loading = Titanium.UI.createLabel({
			text:"Signing Up, Please wait...",
			width:'auto',
			height:40,
			width:"90%",
			top: -35,
			color:'black',
			font:{fontSize:14, fontWeight: 'bold' },
			textAlign:'center'
		});
		
		signUpButton.hide();
		popupView.add(loading);
		
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("Running Test: PFUser Sign Up" );
		
		// PFUser objects inherit all the methods of PFObject
		var pfUser = parseapi.createPFUser();	// first create a pfUser object
		
		// initialize the signup process with credentials
		pfUser.initSignUp( {
							username: emailTextField.value,
							password: passwordTextField.value,
							email: emailTextField.value
						});
		
		// you can set objects just like PFObject before finishing the sign up process
		pfUser.setObject("New York", "city");
		
		
		// Synchronous sign up function, logs you in after it finishes
		// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
		var result = pfUser.finishSignUp();
		
		if( result.succeeded ) {
		
			Ti.API.info("Successfully created a new user with id: " + pfUser.objectId);
			
			var user = parseapi.PFUserCurrentUser();
			
			Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
			
			test_button_array[9].title = "PFUser Logout";
			
			win.remove(popupView);
		
		} else {
			
			Ti.API.info("Could not create new user. ErrorCode: " + result.errorCode + " Error: " + result.error);
			
			win.remove(popupView);
		}
		
		/*// Asynchronous sign up function
		// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
		pfUser.finishSignUpInBackground({
			success: function(e) {
				// event: nothing
				Ti.API.info("Successfully created a new user with id: " + pfUser.objectId);
				
				var user = parseapi.PFUserCurrentUser();
			
				Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
				
				test_button_array[9].title = "PFUser Logout";
				
				win.remove(popupView);
		
			},
			
			error: function(e) {
				// event: (integer or null)errorCode, (string or null)error
				
				Ti.API.info("Could not create new user. ErrorCode: " + e.errorCode + " Error: " + e.error);

				win.remove(popupView);
			}
			
		});*/
		
	});
	
	popupView.add(closeButton);
	
	popupView.add(titleLabel);
	popupView.add(label1);
	popupView.add(emailTextField);
	popupView.add(label2);
	popupView.add(passwordTextField);
	popupView.add(signUpButton);
	
	win.add(popupView);

});

// check if a user is logged in and show the logout button
if( parseapi.PFUserCurrentUser() != null )
{
	// logout if there's a user
	test_button_array[9].title = "PFUser Logout";
}

//PFUser Login
test_button_array[9].addEventListener('click', function() {

	// check if a user is logged in and logout if they click logout
	if( parseapi.PFUserCurrentUser() != null )
	{
		Ti.API.info("Logging out from current user");
		// logout if there's a user
		test_button_array[9].title = 'PFUser Login';
		
		parseapi.PFUserLogout();
		return;
	}
	
	// Login

	var titleLabel = Titanium.UI.createLabel({
	    text:"Login",
	    height:'auto',
	    width:'auto',
	    top: -25,
	    left: 20,
	    color:'black',
	    font:{fontSize:18, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	// create a popup window to let you sign up
	var popupView = Ti.UI.createView({
		top: 10,
		width: 300, 
		height:350,
		backgroundColor: "white",
		borderWidth:3,
		borderRadius:10,
		borderColor:'black',
		layout:'vertical'
	});
	
	if (Titanium.Platform.name != 'android')  {
		popupView.height = 240;
	}
	
	var closeButton = Titanium.UI.createButton({
			title: "X",
			color: "black",
			font:{size:"12pt", fontWeight:'bold'},
			height:30,
			width:30,
			top: 5,
			right: 5,
			backgroundColor: "white",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	});
	
	var label1 = Titanium.UI.createLabel({
	    text:"E-Mail: ",
	    height:'auto',
	    width:'auto',
	    top: 5,
	    color:'black',
	    font:{fontSize:14, fontWeight: 'bold' },
	    textAlign:'center'
	});
		
	var emailTextField = Titanium.UI.createTextField({
		color:'#336699',
		height:'auto',
		width:'95%',
		top:10,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		// keyboardToolbar:[flexSpace,done],
		// keyboardToolbarColor: '#999',   
		// keyboardToolbarHeight: 40,
	});
	
	if (Titanium.Platform.name != 'android')  {
		emailTextField.height = 35;
	}
	
	var label2 = Titanium.UI.createLabel({
			text:"Password: ",
			height:'auto',
			width:'auto',
			top: 10,
			color:'black',
			font:{fontSize:14, fontWeight: 'bold' },
			textAlign:'center'
		});
		
	var passwordTextField = Titanium.UI.createTextField({
		color:'#336699',
		height:'auto',
		width:'95%',
		top:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		passwordMask:true,
		// keyboardToolbar:[flexSpace,done],
		// keyboardToolbarColor: '#999',   
		// keyboardToolbarHeight: 40,
	});
	
	if (Titanium.Platform.name != 'android')  {
		passwordTextField.height = 35;
	}
	
	closeButton.addEventListener('click', function() {
	
		emailTextField.blur();
		passwordTextField.blur();
		
		win.remove(popupView);
	});
	
	var loginButtonArgs = {
			title: "Log In",
			color: "white",
			font:{size:"12pt", fontWeight:'bold'},
			height:40,
			width:"90%",
			top:'10',
			backgroundColor: "#5778FF",
			backgroundFocusedColor: "#7A95FF",
			backgroundSelectedColor: "#7A95FF",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	};
	
	if (Titanium.Platform.name != 'android')  {
		loginButtonArgs.backgroundImage = 'none';
	}
	var loginButton = Titanium.UI.createButton(loginButtonArgs);
		
	loginButton.addEventListener('click', function() {
		
		emailTextField.blur();
		passwordTextField.blur();
		
		if( emailTextField.value === "" || passwordTextField.value === "" )
		{
			alert("Please fill in a username & password");
			//return; 
		}
		
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("Running Test: PFUser Login");
		
		var loading = Titanium.UI.createLabel({
			text:"Logging In, Please wait...",
			width:'auto',
			height:40,
			width:"90%",
			top: -35,
			color:'black',
			font:{fontSize:14, fontWeight: 'bold' },
			textAlign:'center'
		});
		
		loginButton.hide();
		popupView.add(loading);
		
		//Synchronous User Login
		// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error, (PFUser or null) user
		var result = parseapi.PFUserLogin( {
						username: emailTextField.value,
						password: passwordTextField.value
						});

		if( result.succeeded ) {
		
			Ti.API.info("Successfully logged in!");
			
			var user = result.user;
			
			Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
			
			
			test_button_array[9].title = "PFUser Logout";
			
			win.remove(popupView);
		} else {
			
			Ti.API.info("Could not login with credentials. ErrorCode: " + result.errorCode + " Error: " + result.error);
			
			win.remove(popupView);
		}
		
		/*//Asynchronous User Login
		parseapi.PFUserLoginInBackground( {
						username: emailTextField.value,
						password: passwordTextField.value,
						
						success: function(e) {
							// event: (PFObject) user
							
							Ti.API.info("Successfully logged in!");
							
							var user = e.user;
			
							Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
							
							test_button_array[9].title = "PFUser Logout";
							
									
							win.remove(popupView);
						},
						error: function(e) {
						
							Ti.API.info("Could not login with credentials. ErrorCode: " + e.errorCode + " Error: " + e.error);
									
							win.remove(popupView);
						}
						
		});*/
		
	});
	
	popupView.add(closeButton);
	
	popupView.add(titleLabel);
	popupView.add(label1);
	popupView.add(emailTextField);
	popupView.add(label2);
	popupView.add(passwordTextField);
	popupView.add(loginButton);
	
	win.add(popupView);

});

// 10
//PFUser Current User
test_button_array[10].addEventListener('click', function() {
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFUser Current User");
	
	var user = parseapi.PFUserCurrentUser();
	
	if( user != null )
	{
		alert(  "User is Logged In" + 
				"\n\nUsername: \n" + user.objectForKey("username") +
				( (user.hasFacebook && parseapi.ParseHasFacebookApplicationId)?("\n\nFacebook User Id: \n" + user.facebookId + 
									"\n\nFacebook Session Valid: " + parseapi.FacebookSessionIsValid +
									"\n\nFacebook Session Expires:\n" + parseapi.FacebookSessionExpirationDate ):"") ); 
	} else {
		alert( "No user logged in" );	
	}
});

// 11
//Facebook Login/Sign Up
test_button_array[11].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: Facebook Login/Sign Up");
		
	// create_event permission to post events
	// publish_stream permission to publish status messages and photos
	// offline_access permission so that the facebook session doesn't expire for this user
	var permissions = new Array("create_event", "publish_stream", "offline_access");
	
	// Asynchronous facebook sign up/login function
	parseapi.PFUserLoginWithFacebookInBackground({
		permissions: permissions,
		success: function(e) {
			// event: (PFUser)user
			
			var pfUser = e.user;
			
			if( pfUser.isNew )
			{
				Ti.API.info("Successfully created a new user with facebook id: " + pfUser.facebookId);
			}
			else
			{
				Ti.API.info("Logged In with facebook id: " + pfUser.facebookId);
			}
			
			test_button_array[9].title = "PFUser Logout";
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			if( e.errorCode == parseapi.kParseErrorFacebookLoginCancelled ) {
				Ti.API.info(e.error);
			}
			else {

				Ti.API.info("Could not create new user. ErrorCode: " + e.errorCode + " Error: " + e.error);
			}
		}
		
	});

});

// 12
//Facebook Simple Graph API Call
test_button_array[12].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: FB Simple Graph API Call");
	
	if( parseapi.PFUserCurrentUser() == null || parseapi.PFUserCurrentUser().hasFacebook == false )
	{
		alert("Facebook User Not Logged In!");
		return;
	}
	
	if( parseapi.FacebookSessionIsValid == false )
	{
		alert("Facebook Session Is Not Valid!");
		return;
	}
	
	parseapi.FacebookRequestWithGraphPath('me', {}, 'GET', function(e) {

		if (e.success) {
			alert(e.result);
	
		} else if (e.error) {
			alert(e.error);
	
		} else {
			alert('Unknown response');
		}
	
	});

});

// 13
//Facebook Create an Event with GRAPH API
test_button_array[13].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: FB Create Event");
		
	if( parseapi.PFUserCurrentUser() == null || parseapi.PFUserCurrentUser().hasFacebook == false )
	{
		alert("Facebook User Not Logged In!");
		return;
	}
	
	if( parseapi.FacebookSessionIsValid == false )
	{
		alert("Facebook Session Is Not Valid!");
		return;
	}
	
	// Now create the event after you've confirmed authorize() was successful.
	var starttime = new Date(2012, 4, 31, 17, 0);
	var endtime = new Date(2012, 4, 31, 19, 0);
	var title = "Parse Module for Titanium Testing";
	var description = "What a great module!";
	var data = {
		start_time: JSON.stringify(starttime), // API expects a JSON stringified date
		end_time: JSON.stringify(endtime),
		description: description,
		name: title
	};
	
	parseapi.FacebookRequestWithGraphPath('me/events', data, 'POST', function(e) {
		if (e.success) {
			alert("Success! Returned from FB: " + e.result);
		} else {
			if (e.error) {
				alert(e.error);
			} else {
				alert("Unknown result");
			}
		}
	});

});

// 14
//Facebook Set Status Message
test_button_array[14].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: FB Set Status Msg");
	
	if( parseapi.PFUserCurrentUser() == null || parseapi.PFUserCurrentUser().hasFacebook == false )
	{
		alert("Facebook User Not Logged In!");
		return;
	}
	
	if( parseapi.FacebookSessionIsValid == false )
	{
		alert("Facebook Session Is Not Valid!");
		return;
	}
	
	parseapi.FacebookRequestWithGraphPath('me/feed', {message: "Trying out FB Graph API!"}, "POST", function(e) {
		if (e.cancelled) {
			alert("Cancelled!");
		} else if (e.success) {
			alert("Success!  From FB: " + e.result);
		} else {
			if (e.error) {
				alert(e.error);
			} else {
				alert("Unkown result");
			}
		}
	});

});

// 15
//Facebook Post a photo using the Graph API
test_button_array[15].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: FB Upload Photo (Graph API)");
	
	if( parseapi.PFUserCurrentUser() == null || parseapi.PFUserCurrentUser().hasFacebook == false )
	{
		alert("Facebook User Not Logged In!");
		return;
	}
	
	if( parseapi.FacebookSessionIsValid == false )
	{
		alert("Facebook Session Is Not Valid!");
		return;
	}
	
	// open the user's gallery, and let the user choose a photo to upload
	Titanium.Media.openPhotoGallery({
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
		//allowEditing:true,
		success:function(event)
		{	
			var image = event.media;
			
			var data = {
				message: 'This is a test image',
				picture: image
			};
			
			parseapi.FacebookRequestWithGraphPath('me/photos', data, 'POST', function(e){
				if (e.success) {
					alert("Success!  From FB: " + e.result);
				} else {
					if (e.error) {
						alert(e.error);
					} else {
						alert("Unkown result");
					}
				}
			});
	
		}

	});

});

// 16
//Facebook Post a photo using the REST API (deprecated)
test_button_array[16].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: FB Upload Photo (REST deprecated)");
	
	if( parseapi.PFUserCurrentUser() == null || parseapi.PFUserCurrentUser().hasFacebook == false )
	{
		alert("Facebook User Not Logged In!");
		return;
	}
	
	if( parseapi.FacebookSessionIsValid == false )
	{
		alert("Facebook Session Is Not Valid!");
		return;
	}
	
	// open the user's gallery, and let the user choose a photo to upload
	Titanium.Media.openPhotoGallery({
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
		//allowEditing:true,
		success:function(event)
		{	
			var image = event.media;
	
			var data = {
				message: 'This is a test image',
				picture: image
			};
			
			parseapi.FacebookRequest('photos.upload', data, function(e){
				if (e.success) {
					alert("Success!  From FB: " + e.result);
				} else {
					if (e.error) {
						alert(e.error);
					} else {
						alert("Unkown result");
					}
				}
			});
	
		}

	});

});

// 17
//Facebook Show the Facebook Feed Dialog
test_button_array[17].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: FB Feed Dialog");
	
	if( parseapi.PFUserCurrentUser() == null || parseapi.PFUserCurrentUser().hasFacebook == false )
	{
		alert("Facebook User Not Logged In!");
		return;
	}
	
	if( parseapi.FacebookSessionIsValid == false )
	{
		alert("Facebook Session Is Not Valid!");
		return;
	}
	
	var data = {
		link: "http://www.appcelerator.com",
		name: "Appcelerator Titanium Mobile",
		message: "Checkout this cool open source project for creating mobile apps",
		caption: "Appcelerator Titanium Mobile",
		picture: "http://developer.appcelerator.com/assets/img/DEV_titmobile_image.png",
		description: "You've got the ideas, now you've got the power. Titanium translates your hard won web skills into native applications..."
	};
	
	parseapi.FacebookDialog("feed", data, function(e) {
		if (e.success) {
			alert("Success!  From FB: " + e.result);
		} else {
			if (e.error) {
				alert(e.error);
			} else if (e.cancelled) {
				alert('Cancelled');
			} else {
				alert("Unkown result");
			}
		}
	});

});

// 18
// Link Facebook To Existing User
test_button_array[18].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: Link Facebook To Existing User");
		
	// create_event permission to post events
	// publish_stream permission to publish status messages and photos
	// offline_access permission so that the facebook session doesn't expire for this user
	var permissions = new Array("create_event", "publish_stream", "offline_access");
	
	var user = parseapi.PFUserCurrentUser();
	
	if( user == null )
	{
		alert("No User Currently Logged In");
		return;
	}
	
	if( user.hasFacebook )
	{
		alert("User already has a linked facebook account");
		return;
	}
	
	// Only Asynchronous
	user.linkToFacebookInBackground({
		permissions: permissions,
		success: function(e) {
			// event: null
			
			var pfUser = parseapi.PFUserCurrentUser();
			
			Ti.API.info("Successfully Linked Account! User Facebook Id: " + pfUser.facebookId);

		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			if( e.errorCode == parseapi.kParseErrorFacebookLoginCancelled ) {
				Ti.API.info(e.error);
			}
			else {

				Ti.API.info("Could not link with Facebook Account! ErrorCode: " + e.errorCode + " Error: " + e.error);
			}
		}
	});

});

// 19
// Unlink Facebook Account
test_button_array[19].addEventListener('click', function() {
	
	if( parseapi.ParseHasFacebookApplicationId == false )
	{
		alert("Facebook Application Id is not set!");
		return;
	}
	
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: Unlink Facebook Account");
		
	var user = parseapi.PFUserCurrentUser();
	
	if( user == null )
	{
		alert("No User Currently Logged In");
		return;
	}
	
	if( user.hasFacebook == false )
	{
		alert("User does not have a linked Facebook account");
		return;
	}
	
	/*// Asynchronous Unlink
	user.unlinkFromFacebookInBackground({

		success: function(e) {
			// event: Null

			alert("Success: The user is no longer associated with their Facebook account.");
			
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			alert("Could not unlink account! ErrorCode: " + e.errorCode + " Error: " + e.error);
		}
		
	});*/
	
	// Synchronous Unlink
	var result = user.unlinkFromFacebook();
	
	// Synchronous.
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	if( result.succeeded ) {
	
		alert("Success: The user is no longer associated with their Facebook account.");
		
	} else {
		
		alert("Could not unlink account! ErrorCode: " + e.errorCode + " Error: " + e.error);
	}

});

// 20
//Refresh current user
test_button_array[20].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: Refresh Current PFUser");
	
	var user = parseapi.PFUserCurrentUser();
	
	if( user != null ) {
		user.refresh();
		Ti.API.info("Refreshed User!");
	}
	else
	{
		Ti.API.info("No User Logged In!");	
	}

});

// 21
// Request Password For Email
test_button_array[21].addEventListener('click', function() {

	// check if a user is logged in
	if( parseapi.PFUserCurrentUser() != null )
	{
		alert("You're already logged in, why would you need to request your password?");
		return;
	}
	
	// Get e-mail to request password

	var titleLabel = Titanium.UI.createLabel({
	    text:"Request Password Reset",
	    height:'auto',
	    width:'auto',
	    top: -25,
	    left: 20,
	    color:'black',
	    font:{fontSize:18, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	// create a popup window to let you enter your e-mail
	var popupView = Ti.UI.createView({
		top: 10,
		width: 300, 
		height:200,
		backgroundColor: "white",
		borderWidth:3,
		borderRadius:10,
		borderColor:'black',
		layout:'vertical'
	});
	
	if (Titanium.Platform.name != 'android')  {
		popupView.height = 150;
	}
	
	var closeButton = Titanium.UI.createButton({
			title: "X",
			color: "black",
			font:{size:"12pt", fontWeight:'bold'},
			height:30,
			width:30,
			top: 5,
			right: 5,
			backgroundColor: "white",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	});
	
	var label1 = Titanium.UI.createLabel({
	    text:"E-Mail: ",
	    height:'auto',
	    width:'auto',
	    top: 5,
	    color:'black',
	    font:{fontSize:14, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	var emailTextField = Titanium.UI.createTextField({
		color:'#336699',
		height:'auto',
		width:"95%",
		top:10,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		// keyboardToolbar:[flexSpace,done],
		// keyboardToolbarColor: '#999',   
		// keyboardToolbarHeight: 40,
	});
	
	if (Titanium.Platform.name != 'android')  {
		emailTextField.height = 35;
	}
	
	closeButton.addEventListener('click', function() {
	
		emailTextField.blur();
		
		win.remove(popupView);
	});
	
	var requestButtonArgs = {
			title: "Request Password Reset",
			color: "white",
			font:{size:"12pt", fontWeight:'bold'},
			height:40,
			width:"90%",
			top: 5,
			backgroundColor: "#5778FF",
			backgroundFocusedColor: "#7A95FF",
			backgroundSelectedColor: "#7A95FF",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	};
	
	if (Titanium.Platform.name != 'android')  {
		requestButtonArgs.backgroundImage = 'none';
	}
	
	var requestButton = Titanium.UI.createButton(requestButtonArgs);
		
	requestButton.addEventListener('click', function() {
		
		emailTextField.blur();
		
		if( emailTextField.value === "" )
		{
			alert("Please fill in your email");
			return; 
		}
		
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("Running Test: Request Password Reset For Email");
		
		var loading = Titanium.UI.createLabel({
			text:"Requesting Password Reset, Please wait...",
			width:'auto', 
			height:40,
			width:"90%",
			top: -40,
			color:'black',
			font:{fontSize:12, fontWeight: 'bold' },
			textAlign:'center'
		});
		
		requestButton.hide();
		popupView.add(loading);
		
		//Synchronous Password Reset
		// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error, (PFUser or null) user
		var result = parseapi.PFUserRequestPasswordResetForEmail( emailTextField.value );

		if( result.succeeded ) {
		
			alert("Successfully Requested Password Reset. Check your email.");
			
			win.remove(popupView);
		} else {
			
			alert("Could not request password reset. ErrorCode: " + result.errorCode + " Error: " + result.error);
			
			win.remove(popupView);
		}
		
		/*//Asynchronous Password Reset
		parseapi.PFUserRequestPasswordResetForEmailInBackground( {
						email: emailTextField.value,
						
						success: function(e) {
							// event: null
							
							alert("Successfully Requested Password Reset. Check your email.");
			
							win.remove(popupView);
						},
						error: function(e) {
							// event: (integer or null)errorCode, (string or null)error
						
							alert("Could not request password reset. ErrorCode: " + result.errorCode + " Error: " + result.error);
			
							win.remove(popupView);
						}
						
		});*/
		
	});
		
	popupView.add(closeButton);
	
	popupView.add(titleLabel);
	popupView.add(label1);
	popupView.add(emailTextField);
	popupView.add(requestButton);

	win.add(popupView);

});

// 22
// Change Password
test_button_array[22].addEventListener('click', function() {

	// check if a user is logged in
	if( parseapi.PFUserCurrentUser() == null )
	{
		alert("No one is logged in.");
		return;
	}
	
	// Get e-mail to request password

	var titleLabel = Titanium.UI.createLabel({
	    text:"Change Password",
	    height:'auto',
	    width:'auto',
	    top: -25,
	    left: 20,
	    color:'black',
	    font:{fontSize:18, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	// create a popup window to let you enter your e-mail
	var popupView = Ti.UI.createView({
		top: 10,
		width: 300, 
		height:200,
		backgroundColor: "white",
		borderWidth:3,
		borderRadius:10,
		borderColor:'black',
		layout:'vertical'
	});
	
	if (Titanium.Platform.name != 'android')  {
		popupView.height = 155;
	}
	
	var closeButton = Titanium.UI.createButton({
			title: "X",
			color: "black",
			font:{size:"12pt", fontWeight:'bold'},
			height:30,
			width:30,
			top: 5,
			right: 5,
			backgroundColor: "white",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	});
	
	var label1 = Titanium.UI.createLabel({
	    text:"New Password: ",
	    height:'auto',
	    width:'auto',
	    top: 10,
	    color:'black',
	    font:{fontSize:14, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	var passTextField = Titanium.UI.createTextField({
		color:'#336699',
		height:'auto',
		width:"95%",
		top:10,
		font:{fontSize:14 },
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
		passwordMask:true,
		// keyboardToolbar:[flexSpace,done],
		// keyboardToolbarColor: '#999',   
		// keyboardToolbarHeight: 40,
	});
	
	if (Titanium.Platform.name != 'android')  {
		passTextField.height = 35;
	}
	
	closeButton.addEventListener('click', function() {
	
		passTextField.blur();
		
		win.remove(popupView);
	});
	
	var requestButtonArgs = {
			title: "Save New Password",
			color: "white",
			font:{size:"12pt", fontWeight:'bold'},
			height:40,
			width:"90%",
			top: 5,
			backgroundColor: "#5778FF",
			backgroundFocusedColor: "#7A95FF",
			backgroundSelectedColor: "#7A95FF",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	};
	
	if (Titanium.Platform.name != 'android')  {
		requestButtonArgs.backgroundImage = 'none';
	}
	var requestButton = Titanium.UI.createButton(requestButtonArgs);
		
	requestButton.addEventListener('click', function() {
		
		passTextField.blur();
		
		if( passTextField.value === "" )
		{
			alert("Please fill in a new password");
			return; 
		}
		
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("");
		Ti.API.info("Running Test: Change Password");
		
		var loading = Titanium.UI.createLabel({
			text:"Saving New Password, Please wait...",
			width:'auto', 
			height:40,
			width:"90%",
			top: -40,
			color:'black',
			font:{fontSize:14, fontWeight: 'bold' },
			textAlign:'center'
		});
		
		requestButton.hide();
		popupView.add(loading);
		
		var currentUser = parseapi.PFUserCurrentUser();
		
		// First set the new password
		currentUser.setPassword( passTextField.value );
		
		// Then Save.
		// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
		var result = currentUser.save();
		
		if( result.succeeded ) {
		
			Ti.API.info("Successfully changed password!");

		} else {
			
			Ti.API.info("Could not save new password. ErrorCode: " + result.errorCode + " Error: " + result.error);
		}
		
		win.remove(popupView);
	});

	
	popupView.add(closeButton);
		
	popupView.add(titleLabel);
	popupView.add(label1);
	popupView.add(passTextField);
	popupView.add(requestButton);

	win.add(popupView);

});

// 23
//Association Ex. (PFObject)
test_button_array[23].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: Association Ex. (PFObject)");
	
	//PFObject Associations example
	var post = parseapi.PFObjectCreateObjectWithClassName("Post");
	
	post.setObject("This Parse Module is Great!", "name");
	
	var result = post.save(); // save the post, then change the title and let the comment save both of these objects
							
	var comment = parseapi.PFObjectCreateObjectWithClassName("Comment");
	
	comment.setObject("awesome!", "comment");

	comment.setObject(post, "post");
	
	post.setObject("I have comments now!", "name");
	post.setObject("I have content too!", "content");
	
	//synchronous
	/*result = comment.save();
	
	if( result.succeeded ) {

	    Ti.API.info("Successfully saved object!");

	} else {
	
	    Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}*/
	
	//asynchronous
	comment.saveInBackground( {
				
				 success: function(e) {
					Ti.API.info("Success! ");
				},
				error: function(e) {
					Ti.API.info("Error: " + JSON.stringify(e));
				}
			
			});


});

// 24
//Association Ex. (PFUser)
test_button_array[24].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: Association Ex. (PFUser)");
	
	var user = parseapi.PFUserCurrentUser();
	
	if( user == null ) {
		alert("No User Logged In!");
		
		return;
	}
	
	//User Associations example
	var post = parseapi.PFObjectCreateObjectWithClassName("Post");
	
	post.setObject("How are you " + user.objectForKey("username") + "!", "name");
	post.setObject(user, "user");
	
	//synchronous
	var result = post.save();
	
	if( result.succeeded ) {

	    Ti.API.info("Successfully saved object!");

	} else {
	
	    Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}
	
	// asynchronous
	/*post.saveInBackground( {
				
				 success: function(e) {
					Ti.API.info("Success!");
				},
				error: function(e) {
					Ti.API.info("Error: " + JSON.stringify(e));
				}
			
			});*/


});

// 26
//Retrieve User Associations
test_button_array[25].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: Retrieve User Associations");
	
	var user = parseapi.PFUserCurrentUser();
	
	if( user == null ) {
		alert("No User Logged In!");
		
		return;
	}
	
	// Find all posts by the current user
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("Post");
	
	pfQuery.whereKey( {
	    key: "user",
	    equalTo: user   // can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	// Synchronous.
	// returns (boolean)succeeded, (Array or null)objects, (integer or null)errorCode, (string or null)error
	var result = pfQuery.findObjects();
	
	if( result.succeeded ) {
	
	    Ti.API.info("Successfully queried objects!");
	
	    var pfObjects = result.objects;
	
	    Ti.API.info("Query returned " + pfObjects.length + " PFObjects"); 
	
	} else {
	
	    Ti.API.info("Could not query objects. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}


});

//PFObject Save All (Sync)
test_button_array[26].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFObject Save All (Sync)");
	
	var pfObject = null;
	var objectArray = new Array();
	
	for( var i = 1; i < 5; i++ )
	{
		// New PFObject
		pfObject = parseapi.PFObjectCreateObjectWithClassName("TestObject");
		
		// Text, numbers
		pfObject.setObject("Candy Bars", "product");
		pfObject.setObject(i*10, "quantity");
		
		objectArray.push( pfObject );
	}
	
	
	// Save Synchronously.
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	var result = parseapi.PFObjectSaveAll( objectArray );
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully saved all " + objectArray.length + " objects!");
		
	} else {
		
		Ti.API.info("Could not save all objects. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

});

//ParseiOSPush Send Message Sync
test_button_array[27].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: ParseiOSPush Send Message");
	
	// Synchronous
	// Send Push Message to Global Channel
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	var result = parseapi.ParseiOSPushSendPushMessageToChannel( {
																	channel: "", // global channel
																	message: "Client Sent Everyone this Message!" 
																});
	
	if( result.succeeded ) {
	
		alert("Successfully sent Push Notification message.");
		
	} else {
		
		alert("Could not send Push Notification message. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

});

var created_object_with_file_id = null;

//PFFile Save Image
test_button_array[28].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFFile Save Image");
	
	// open the user's gallery, and let the user choose a photo to upload
	Titanium.Media.openPhotoGallery({
		mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],
		//allowEditing:true,
		cancel:function(event) {
			alert("cancel!");
		},
		error:function(event) {
			alert("error!");
		},
		success:function(event)
		{	
			alert("success!");
			var image = event.media;
			
			// Since this is an image we didn't load from a TiFile, we save it with the default image representation	
			if( parseapi.willTiBlobBeSavedWithDefaultImageRepresentation( image ) == true )
			{
				Ti.API.info("Image will be saved to PFFile with the following default image representation: " + parseapi.getTiBlobDefaultImageRepresentation() );
			}
			
			// New PFFile with name and data
			var pfFile = parseapi.PFFileCreateFileWithNameAndData( {
				name: "savedImage." + parseapi.getTiBlobDefaultImageRepresentation(),
				data: image 
			});
	
			// New PFFile with only data
			//var pfFile = parseapi.PFFileCreateFileWithData( image );
			
			// Save File Synchronously.
			// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
			var result = pfFile.save();
			
			if( result.succeeded ) {
			
				Ti.API.info("Successfully saved file: " + pfFile.name );
				
				Ti.API.info("Created Object URL: " + pfFile.url);
			} else {
				
				Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
			}
			
			// Now save this file in a PFObject
			
			// New PFObject
			var pfObject = parseapi.PFObjectCreateObjectWithClassName("TestObjectWithFile");
			
			pfObject.setObject("savedImage", "name");
		
			pfObject.setObject(pfFile, "savedFile");
			
			// save pfObject
			result = pfObject.save();
			
			if( result.succeeded ) {
			
				Ti.API.info("Successfully saved object!");
				
				created_object_with_file_id = pfObject.objectId;
				Ti.API.info("Created Object ID: " + created_object_with_file_id);
		
			} else {
				
				Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
			}
			
			
			
			/*
			 
			// Save File Asynchronously.
			pfFile.saveInBackground( { 	
			
				success: function(e) {
					// event: nothing
					
					Ti.API.info("Successfully saved file: " + pfFile.name );
					
					Ti.API.info("Created Object URL: " + pfFile.url);
					
					// Now save this file in a PFObject
					
					// New PFObject
					var pfObject = parseapi.PFObjectCreateObjectWithClassName("TestObjectWithFile");
					
					pfObject.setObject("savedImage", "name");
					
					pfObject.setObject(pfFile, "savedFile");
					
					// save pfObject
					result = pfObject.save();
					
					if( result.succeeded ) {
					
						Ti.API.info("Successfully saved object!");
						
						created_object_with_file_id = pfObject.objectId;
						Ti.API.info("Created Object ID: " + created_object_with_file_id);
				
					} else {
						
						Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
					}
				},
				
				error: function(e) {
					// event: (integer or null)errorCode, (string or null)error
				
					Ti.API.info("Error: " + JSON.stringify(e));
				}
			});*/
				 
			
		}

	});

});

function _showImage( image ) {
	
	var titleLabel = Titanium.UI.createLabel({
	    text:"Change Password",
	    height:'auto',
	    width:'auto',
	    top: 20,
	    left: 20,
	    color:'black',
	    font:{fontSize:18, fontWeight: 'bold' },
	    textAlign:'center'
	});
	
	// create a popup window to let you enter your e-mail
	var popupView = Ti.UI.createView({
		width: 300, 
		height:300,
		backgroundColor: "white",
		borderWidth:3,
		borderRadius:10,
		borderColor:'black'
	});
	
	var closeButton = Titanium.UI.createButton({
			title: "X",
			color: "black",
			font:{size:"12pt", fontWeight:'bold'},
			height:30,
			width:30,
			top: 5,
			right: 5,
			backgroundColor: "white",
			borderWidth:1,
			borderRadius:10,
			borderColor:'#000'
	});
		
	closeButton.addEventListener('click', function() {
		win.remove(popupView);
	});
	
	var imageView = Ti.UI.createImageView({
		image: image,
		width: 280,
		height: 280,
		borderColor: 'black',
		borderWidth: 2
	});
	
	popupView.add(imageView);
	popupView.add(closeButton);
	
	win.add(popupView);
	
}

//PFFile Get Image
test_button_array[29].addEventListener('click', function() {
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("");
	Ti.API.info("Running Test: PFFile Get Image");
	
	var result = parseapi.PFQueryCreateObjectOfClassAndId( {
			objectClass: "TestObjectWithFile",
			objectId: created_object_with_file_id 
	});
	
	if( result.succeeded )
	{
		var pfObject = result.object;
		
		var pfFile = pfObject.objectForKey("savedFile");
		
		if( pfFile != null )
		{
			var result = pfFile.getData();
			
			if( result.succeeded ) {
				Ti.API.info("Got data for file: " + pfFile.name);
				
				_showImage(result.data);
			}
			else {
				Ti.API.info("Could not get data for File. ErrorCode: " + result.errorCode + " Error: " + result.error);
				
			}
		}
		else
		{
			Ti.API.info("Object has no saved file");
		}
	} else {
		Ti.API.info("Could not find object");
		
	}
});

