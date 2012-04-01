# Parse API Module Guide

_Please rate both the iOS and Android module in the marketplace if you find them useful :)_

[Click here to see version and release notes](./releasenotes.html)

____
____
## Extra Reference

This guide contains examples and everything you need to know to start using the parse api module. 

The following reference files list all the functions, arguments, and return values for the Parse Module.

[Parse Module Guide](./index.html)

[Parse Module Reference](./parsemodulereference.html)

[PFObject Reference](./pfobjectreference.html)

[PFQuery Reference](./pfqueryreference.html)

[PFUser Reference](./pfuserreference.html)

[PFFile Reference](./pffilereference.html)

[PFGeoPoint Reference](./pfgeopointreference.html)

[PFACL Reference](./pfaclreference.html)

____
____

##Table Of Contents

[TOC]

____
____
## Description

Titanium Mobile Module for Parse.com iOS and Android APIs. 
Uses native iOS & Android API code from parse.com. Does not use their simple REST API. You have access to Objects, Queries, Users, Files, Push Notifications and anything else Parse can imagine.

Please go to [www.parse.com](https://www.parse.com) and sign up for an account!

IMPORTANT: This module is unofficial and is not maintained by parse.com

____
____
# Parse API Module Guide

If you need more information, please visit the Parse API iOS guide here: [Parse API iOS Documentation](https://www.parse.com/docs/ios_guide) or the [Parse API Android Documentation](https://www.parse.com/docs/android_guide)


If you need more clarification on using the library, please look at the Parse iOS documentation and then find the function you're looking for here to use it in Javascript. This module follows the naming conventions of the iOS documentation.

____

### Accompanying Example / Kitchen Sink

The accompanying example included with the module ( located in the `./example` directory ) shows working code for all of the following examples. You just need to provide it with your own Parse API Application ID and Client Key and you should be able to test out every example for yourself. Also if you want to use the Facebook Functions on iOS, you must provide your Facebook API key as well. Just make sure you can see what the console is printing out because most messages are printed using `Ti.API.info()`.

### It's IMPORTANT to namespace your application properly!

I would suggest using proper namespacing for your application. You can only use `require("com.forge42.parseapi")` once inside your application or else you'll run into problems. I suggest doing this at the start of your program along with the parse init function. An example for namespacing would be to put your application variables in a global variable. Remember all variables declared outside of any function scope will be global and available to your entire application due to the way javascript works.

	Example:
	
	var myapp_globals = {};
	
	myapp_globals.parseapi = require("com.forge42.parseapi");
	
	myapp_globals.parseapi.parseInit( // init here );
	
	///// then in another file whenever you need to use the parseapi variable you can do the 	following to access the parseapi object:

	myapp_globals.parseapi.somefunctionhere() /// any function here.


Just make sure to use a unique name for `myapp_globals`. That's how namespacing works. If you want some more information please see: <http://developer.appcelerator.com/question/127559/are-titanium-modules-singletons-when-using-require> and for javascript namespacing: <http://javascriptweblog.wordpress.com/2010/12/07/namespacing-in-javascript/>

Another way to namespace your application is using the CommonJS standard. You can read more about that in the namespacing links above.


____
____
## Accessing the module	
To access this module from JavaScript, you would do the following:

	var parseapi = require('com.forge42.parseapi');

	parseapi.initParse( {
						applicationId: "put your parse api APPLICATION ID here",
						clientKey: "put your parse api CLIENT KEY here"
					});

The parseapi variable is a reference to the Module object. From this variable you can create PFObject, PFQuery, PFUser and access other functions from the Parse API.

____
____

## Saving Objects

To save an object to the Parse API database, you need to create a PFObject using the `parseapi.createPFObject()` function of the module. Once it's created you can initialize it with a class name. In this example we use the TestObject class. You can save all types of data by using the `pfObject.setObject( data, key )` function from the PFObject you created. You can store the following types _null, Boolean, Number, String, or Object_. You can basically save anything that can be JSON encoded.

There are two ways to save a PFObject. 

###Saving each PFObject Individually

__Synchronously:__

	// New PFObject
	var pfObject = parseapi.PFObjectCreateObjectWithClassName("TestObject");
	
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
		
		Ti.API.info("Created Object ID: " + pfObject.objectId);
	} else {
		
		Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

__Asynchronously:__ (In The Background with Callbacks)

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
			
			Ti.API.info("Created Object ID: " + pfObject.objectId);
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
		
			Ti.API.info("Error: " + JSON.stringify(e));
		}
	});

###Saving many PFObjects at once

__Synchronous:__

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

__Asynchronous:__

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
	
	
	// Save Asynchronously.
	// does not return or have any callbacks
	parseapi.PFObjectSaveAllInBackground( {
												objects: objectArray
												});
____
____
## Retrieving Data

You can retrieve data from the Parse database using a PFQuery. There are a couple of ways to do this. One way is to retrieve an object by it's id. Every PFObject that gets saved to the Parse database automatically obtains an `pfObject.objectId` string, a `pfObject.createdAt` timestamp, and a `pfObject.updatedAt` timestamp. To retrieve an object using a PFQuery by it's id, we use the `pfQuery.getObjectWithId( id )` function.

Aside from the `pfObject.objectId`, `pfObject.createdAt`, and `pfObject.updatedAt`, you can retrieve other data from the PFObject by using the `pfObject.objectForKey( key )` function.

Here is an example:

__Synchronous:__

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");

	var result = pfQuery.getObjectWithId("yaEuC5qrkF");
	
	// Synchronous.
	// returns (boolean)succeeded, (PFObject or null)object, (integer or null)errorCode, (string or null)error
	if( result.succeeded ) {
	
		Ti.API.info("Successfully queried object!");
		
		var pfObject = result.object;
		
		Ti.API.info("Start Query Result:");
		Ti.API.info("    objectId: " + pfObject.objectId );
		Ti.API.info("    updatedAt: " + pfObject.updatedAt );
		Ti.API.info("    createdAt: " + pfObject.createdAt );
		Ti.API.info("    product: " + pfObject.objectForKey("product") );
		Ti.API.info("    quantity: " + pfObject.objectForKey("quantity") );
		Ti.API.info("    productData: " + JSON.stringify( pfObject.objectForKey("productData") ) );
		Ti.API.info("End Query Result");
		
	} else {
		
		Ti.API.info("Could not query object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

__Asynchronous:__

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.getObjectInBackgroundWithId({
		id: "yaEuC5qrkF",
		
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

The output from the above example would be:

	[INFO] Successfully queried object!
	[INFO] Start Query Result:
	[INFO]     objectId: yaEuC5qrkF
	[INFO]     updatedAt: Wed Oct 12 2011 18:19:11 GMT-0400 (EDT)
	[INFO]     createdAt: Wed Oct 12 2011 18:19:11 GMT-0400 (EDT)
	[INFO]     product: Cereal Box
	[INFO]     quantity: 1500
	[INFO]     productData: {"name":"upc","upcData":123214353}
	[INFO] End Query Result

____

### Building a Query to retrieve data

Another way to retrieve data is to build a query. Similar to performing a query on a database, you can build up the query using the `pfQuery.whereKey( { key: , query_type: } )` where query_type is one of the following: __equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo__. You can call this function more than once to build more complicated queries. You can also limit, skip and order the results.

Here's an example:

__Synchronous:__

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	pfQuery.skip = 2; // skip the first two matching items
	pfQuery.limit = 5; // set the limit 
	pfQuery.orderByDescending("createdAt"); // can also be orderByAscending (takes a key as an argument)
	
	// Synchronous.
	// returns (boolean)succeeded, (Array or null)objects, (integer or null)errorCode, (string or null)error
	var result = pfQuery.findObjects();
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully queried objects!");
		
		var pfObjects = result.objects;
		
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
			Ti.API.info("  End PFObject");
			Ti.API.info("");
		}
		Ti.API.info("End Query Result -------------------------------- ");
		
	} else {
		
		Ti.API.info("Could not query objects. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

__Asynchronous:__

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	pfQuery.skip = 2; // skip the first two matching items
	pfQuery.limit = 5; // set the limit 
	pfQuery.orderByDescending("createdAt"); // can also be orderByAscending (takes a key as an argument)

	
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

The output from the above example would be: 

	[INFO] Successfully queried objects!
	[INFO] Query returned 4 PFObjects
	[INFO] Start Query Result --------------------------------
	[INFO]   PFObject 0
	[INFO]     objectId: yaEuC5qrkF
	[INFO]     updatedAt: Wed Oct 12 2011 18:19:11 GMT-0400 (EDT)
	[INFO]     createdAt: Wed Oct 12 2011 18:19:11 GMT-0400 (EDT)
	[INFO]     product: Cereal Box
	[INFO]   End PFObject
	[INFO]
	[INFO]   PFObject 1
	[INFO]     objectId: EtmRlGx4bC
	[INFO]     updatedAt: Wed Oct 12 2011 18:18:20 GMT-0400 (EDT)
	[INFO]     createdAt: Wed Oct 12 2011 18:18:20 GMT-0400 (EDT)
	[INFO]     product: Cereal Box
	[INFO]   End PFObject
	[INFO]
	[INFO]   PFObject 2
	[INFO]     objectId: ZYIMJazOEP
	[INFO]     updatedAt: Wed Oct 12 2011 18:18:19 GMT-0400 (EDT)
	[INFO]     createdAt: Wed Oct 12 2011 18:18:19 GMT-0400 (EDT)
	[INFO]     product: Cereal Box
	[INFO]   End PFObject
	[INFO]
	[INFO]   PFObject 3
	[INFO]     objectId: XKJLnCDhfo
	[INFO]     updatedAt: Wed Oct 12 2011 18:17:36 GMT-0400 (EDT)
	[INFO]     createdAt: Wed Oct 12 2011 18:17:36 GMT-0400 (EDT)
	[INFO]     product: Cereal Box
	[INFO]   End PFObject
	[INFO]
	[INFO] End Query Result --------------------------------

____

### More Advanced Queries

You can get more information on how to use some more advanced query functions in this [Parse.com Blog Article](http://blog.parse.com/2011/11/04/new-tricks-with-queries/).

They will teach you how to use `pfQuery.whereContainedIn` and more.

Remember that there is a one to one correspondence with this module and the API so just look in the module reference files and you can find any function you're looking for.

You can also look at the [PFQuery Reference for this Module](./pfqueryreference.html) to get more options that you can use in queries that aren't stated in this guide.

____

### Building a Query and Getting a Count of Objects

You can use the same procedure that you use with `findObjects` to get an object count for a query you have built.

Here's an example:

__Synchronous:__

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	// Synchronous.
	// returns (boolean)succeeded, (Number or null)count, (integer or null)errorCode, (string or null)error
	var result = pfQuery.countObjects();
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully counted " + result.count + " objects!");
		
	} else {
		
		Ti.API.info("Could not count objects. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

__Asynchronous:__

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	// Asynchronous
	pfQuery.countObjectsInBackground({
		success: function(e) {
			// event: (Number)count
			
			Ti.API.info("Successfully counted " + e.count + " objects!");
	
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			Ti.API.info("Error: " + JSON.stringify(e));
		}
		
	});

____

###Getting An Object By Class and Id Without a Query

Instead of using a PFQuery to get and object from the database, you can just call the `parseapi.PFQueryCreateObjectOfClassAndId` function.

Example:

	var result = parseapi.PFQueryCreateObjectOfClassAndId( {
										objectClass: "TestObject",
										objectId: "reWZuh9q9o"
									});
	
	if( result.succeeded ) {
		
		Ti.API.info("Successfully got object!");
		
		var pfObject = result.object;
			
		//do something with the object. Print an example.
		Ti.API.info( "Quantity: " + pfObject.objectForKey("quantity") );
			
	} else {
		
		Ti.API.info("Could not get object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

____

###Performing another query

To build another query without having to create a new pfQuery object, you can just call the `pfQuery.resetQuery()` function and you can begin building another query.

____

###PFQuery Caching

To use the caching capabilities of PFQuery. You just have to set the `cachePolicy` for the PFQuery you're using. More information can be found at parse's website here: [Parse.com Caching](https://www.parse.com/docs/ios_guide#objects-caching)

All the caching constants can be found in the [Parse Module Reference](./parsemodulereference.html)

Example:

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	pfQuery.cachePolicy = kParseCachePolicyNetworkElseCache;

	// Synchronous.
	// returns (boolean)succeeded, (Array or null)objects, (integer or null)errorCode, (string or null)error
	var result = pfQuery.findObjects();
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully queried objects!");
		
	} else {
		
		Ti.API.info("Could not query objects. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}


_IMPORTANT:_ You can only use the Asynchronous `pfQuery.findObjectsInBackground` when using the `kParseCachePolicyCacheThenNetwork` constant because it calls the success callback twice, first with the cached results, then with the network results.

Example:

	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("TestObject");
	
	pfQuery.whereKey( {
		key: "product",
		equalTo: "Cereal Box"	// can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
	});
	
	pfQuery.cachePolicy = kParseCachePolicyCacheThenNetwork;

	// Asynchronous
	pfQuery.findObjectsInBackground({
		success: function(e) {
			// event: (PFObject)object
			
			Ti.API.info("Success!");
			
			// gets called twice, first with the cached results, then with the network results.
	
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			Ti.API.info("Error: " + JSON.stringify(e));
		}
		
	});


____
____
## Removing Data

You can remove data easily by first retrieving a PFObject then calling its `pfObject.deleteObject()` function. Once you delete a PFObject using this function, object on the Parse database will be deleted but your copy of the PFObject will still be valid until you null out the variable.

The following example assumes you already queried the Parse database and retrieved a PFObject. 

__Synchronous:__

	var pfObject = //Retrieve a PFObject using PFQuery as in the example above

	// delete object synchronously
	var result = pfObject.deleteObject();
		
	if( result.succeeded )
	{
		Ti.API.info("Successfully deleted object with ID: " + pfObject.objectId);
	}
	else
	{
		Ti.API.info("Could not delete object with ID: " + pfObject.objectId + " ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

__Asynchronous:__


	var pfObject = //Retrieve a PFObject using PFQuery as in the example above

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

____
____
## Updating Objects and Users

To update the data stored in a PFObject or PFUser, just set/change the object fields using `pfObject.setObject()` or `pfUser.setObject()` and save them again with the new data. It's that simple. 

Update a User's password using the `pfUser.setPassword()` method. 
Update a User's username or email using the `pfUser.setObject(newEmail, "email")` or `pfUser.setObject(newUsername, "username")`.

Remember to call `save` or `saveInBackground` when you're done modifying the object's content so it can synchronize with Parse's servers.

PFFile's can't be updated.

____
____
## GeoPoints

Please read the Parse documentation here: [GeoPoint Documentation](https://parse.com/docs/ios_guide#geo)

And read the GeoPoint documentation for the Parse Module here: [GeoPoint Reference](./pfgeopointreference.html)

Example:

	var point = parseapi.PFGeoPointCreateGeoPointWithLatitudeAndLongitude( 40.0, -30.0 );
	placeObject.setObject( point, "location" );

____
____
## GeoQueries

Example:

	// User's location
	var userGeoPoint = userObject.objectForKey("location");
	
	// Create a query for places
	var query = parseapi.PFQueryCreateQueryWithClassName("PlaceObject");
	
	// Interested in locations near user.
	query.whereKey({
			key: "location",
			nearGeoPoint: userGeoPoint
	});
	
	// Limit what could be a lot of points.
	query.limit = 10;
	
	var result = query.findObjects();
	var placesObjects = [];

	if( result.succeeded === true ) {
		placesObjects = result.objects;
	}
____
____
## Users

Users are handled in a special way using the PFUser object. PFUser inherits all the functions from PFObject but also includes some extra functions to sign up and login/logout users. 

____

### During Login or Sign Up the username, email and password are CASE-SENSITIVE!

__IMPORTANT:__ The `username, email, password` when logging in or during sign up are now all CASE-SENSITIVE!! __IT IS YOUR RESPONSIBILITY__ to convert the username and password to lowercase if you want to prevent the autocorrect on most phones that capitalize the first letter in a text field from messing up the signup and login process.

____

### Sign Up a New User

To signup a new user you need to first initialize the sign up process using the `pfUser.signUp( {} )` function with a __username, password, and email__ argument. The `email` field is optional or you can pass `null` but the username and password are mandatory. After it's initialized you can add any other data just like a PFObject. In the example, we add that the user lives in _"New York"_ under the "city" key using the `setObject( data, key )` function. After you're done adding data, you run the `pfUser.finishSignUp()` function to create the user in the database. 

After a new user is created, they will automatically be logged in.

Example:

__Synchronous:__

	var email = "example@test.com"; 
	var password = "test";

	// PFUser objects inherit all the methods of PFObject
	var pfUser = parseapi.createPFUser();	// first create a pfUser object
	
	// initialize the signup process with credentials
	pfUser.initSignUp( {
						username: email,
						password: password,
						email: email //the email field is optional
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
		
	} else {
		
		Ti.API.info("Could not create new user. ErrorCode: " + result.errorCode + " Error: " + result.error);
		
	}

__Asynchronous:__

	var email = "example@test.com";
	var password = "test";

	// PFUser objects inherit all the methods of PFObject
	var pfUser = parseapi.createPFUser();	// first create a pfUser object
	
	// initialize the signup process with credentials
	pfUser.initSignUp( {
						username: email,
						password: password,
						email: email
					});
	
	// you can set objects just like PFObject before finishing the sign up process
	pfUser.setObject("New York", "city");

	// Asynchronous sign up function
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	pfUser.finishSignUpInBackground({
		success: function(e) {
			// event: nothing
			Ti.API.info("Successfully created a new user with id: " + pfUser.objectId);
			
			var user = parseapi.PFUserCurrentUser();
		
			Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
	
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			Ti.API.info("Could not create new user. ErrorCode: " + e.errorCode + " Error: " + e.error);

		}
		
	});

____

### Login/Logout an Existing User
 
To login a user you make a call to the `parseapi.PFUserLogin( { username: password: } )` function.

To logout a user call the `parseapi.PFUserLogout()` function. 

The current user will be kept in the application's cache when you exit your application. This way you don't have to have the user login/out every time they open your app. But __REMEMBER__ when you resume your application, the PFUser you obtain from `parseapi.PFUserCurrentUser()` is a cached version. So make sure to refresh it by calling `pfUser.refresh()` or `pfUser.refreshInBackground()`.

Example:

__Synchronous:__

	var user = "example@test.com";
	var pass = "test";

	//Synchronous User Login
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error, (PFUser or nil) user
	var result = parseapi.PFUserLogin( {
					username: user,
					password: pass
					});

	if( result.succeeded ) {
	
		Ti.API.info("Successfully logged in!");
		
		var user = result.user;
		
		Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
		
	} else {
		
		Ti.API.info("Could not login with credentials. ErrorCode: " + result.errorCode + " Error: " + result.error);
		
	}


__Asynchronous:__

	var user = "example@test.com";
	var pass = "test";

	//Asynchronous User Login
	parseapi.PFUserLoginInBackground( {
					username: user,
					password: pass,
					
					success: function(e) {
						// event: (PFObject) user
						
						Ti.API.info("Successfully logged in!");
						
						var user = e.user;
		
						Ti.API.info( "Logged In as: " + user.objectForKey("username") ); // show the logged in user
						
					},
					error: function(e) {
					
						Ti.API.info("Could not login with credentials. ErrorCode: " + e.errorCode + " Error: " + e.error);
								
					}
					
	});

____

### Obtaining the Current User or Checking If a User Is Logged In

To check if a user is logged in or to obtain the current PFUser object, make a call to the `parseapi.PFUserCurrentUser()` function.

If this function returns null, it means there's no user logged in.

Example:

	var user = parseapi.PFUserCurrentUser();
	
	if( user != null )
	{
		Ti.API.info( "Current Logged In User: \n" + user.objectForKey("username") ); 
	} else {
		Ti.API.info( "No user logged in" );	
	}

____

### Refreshing the current logged in PFUser when your application resumes for iPhone & Android

The current user will be kept in the application's cache when you exit your application. This way you don't have to have the user login/out every time they open your app. But __REMEMBER__ when you resume your application, the PFUser you obtain from `parseapi.PFUserCurrentUser()` is a cached version. So make sure to refresh it by calling `pfUser.refresh()` or `pfUser.refreshInBackground()`.

____

### Updating a User (or Changing Data)

__IMPORTANT:__ Remember to refresh the current user before saving or changing data. Just in case to prevent you from overwriting any data you might have saved using the REST API somewhere else.

#### Updating The Current User's Data
Since the PFUser object inherits all the functions from PFObject, you can treat it like updating any PFObject.

Example:

	//get the current user
	var currentUser = parseapi.PFUserCurrentUser();

	if( currentUser != null )
	{
		// Set the new data or change old data
		currentUser.setObject("Dave", "firstName"); // change my name from David to Dave
		currentUser.setObject("programmerdave", "nickname"); // add a nickname

		// Then Save.
		// Synchronous Save
		// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
		var result = currentUser.save();
		
		if( result.succeeded ) {
		
			Ti.API.info("Successfully saved data!");

		} else {
			
			Ti.API.info("Could not save data. ErrorCode: " + result.errorCode + " Error: " + result.error);
		}
	}

#### Security For User Objects/Updating Other User's Data (You Can't)

If you want to update data for a user that's currently not logged in, you can't. The parse api will let you read but not update a user that hasn't been authenticated by a login method. I'll let parse tell you more [Parse PFUser Security](https://www.parse.com/docs/ios_guide#users-security)

	The PFUser class provides a layer of security that prevents altering objects that haven't been authenticated on the device.
	The policy is that you are not able to invoke any of the save or delete type methods unless the object was obtained using an authenticated method, like logIn or signUp. 
	This ensures that only the device that has authenticated the user via a username and password has the ability to alter that user.

You can however read other user's data by using a PFUser Query but the save and delete methods will not work. You can check if a user is authenticated on the device (meaning that you can save or delete it) by checking the `pfUser.isAuthenticated` property.

____

### Security For Other Objects/Access Control Lists

For more information please see the [Parse iOS ACL Documentation](https://parse.com/docs/ios_guide#users-acls)

Please look at the ACL documentation for this module to see which methods to use: [PFACL Reference](./pfaclreference.html)

Examples:

	var privateNote = parseapi.PFObjectCreateObjectWithClassName("Note");
	privateNote.setObject( "This note is private!", "content" );
	privateNote.ACL = parseapi.PFACLCreateACLWithUser( user );
	privateNote.save();

Permissions can also be granted on a per-user basis:

	var groupMessage = parseapi.PFObjectCreateObjectWithClassName("Message");
	var groupACL = parseapi.PFACLCreateACL();
	
	for (var iter=0; iter < userList.length; iter++) {
	    groupACL.setReadAccess( {
			allowed: true,
			forUser: userList[iter]
		});
	
		groupACL.setWriteAccess( {
			allowed: true,
			forUser: userList[iter]
		});
	}
	
	groupMessage.ACL = groupACL;
	groupMessage.save();

You can also grant permissions to all users at once:

	var publicPost = parseapi.PFObjectCreateObjectWithClassName("Post");
	var postACL = parseapi.PFACLCreateACLWithUser( user );
	postACL.setPublicReadAccessAllowed( true );
	publicPost.ACL = postACL;
	publicPost.save();

____
### Querying a PFUser

__IMPORTANT:__ You can't save or delete any updates to a user that has not been authenticated on the device. See the `Updating Other User's Data` section of this guide.

To query for users, you need to use the special user query, `parseapi.PFQueryCreateQueryForUser()` that returns a query that can search for users. The objects returned from the query are PFObjects. 

	var userQuery = parseapi.PFQueryCreateQueryForUser();
	
	if( userQuery != null )
	{		
		// now it works just like a normal query
		userQuery.whereKey( {
		    key: "city",
		    equalTo: "New York"    // can be equalTo, greaterThan, greaterThanOrEqualTo, lessThan, lessThanOrEqualTo, notEqualTo
		});
		
		// Synchronous.
		// returns (boolean)succeeded, (Array or null)objects, (integer or null)errorCode, (string or null)error
		var result = userQuery.findObjects();
		
		if( result.succeeded ) {
		
		    Ti.API.info("Successfully queried objects!");
		
		    // remember you can only read these user objects
		    var pfObjectUsers = result.objects;
		
		    if( pfObjectUsers.length > 0 )
		    {
		        // The users here are PFObjects
		        var firstUser = pfObjectUsers[0];
		
		        // print username
		        Ti.API.info( "Username: " + firstUser.objectForKey("username") );
		    }
		
		} else {
		
		    Ti.API.info("Could not query user objects. ErrorCode: " + result.errorCode + " Error: " + result.error);
		}
	}

If you want to retrieve PFUser instead of PFObject, you can do so by calling `parseapi.PFQueryCreateUserObjectWithId( id )`.

Example:

	var result = parseapi.PFQueryCreateUserObjectWithId( "x1y2z345" );
	
	if( result.succeeded ) {
		
		Ti.API.info("Successfully got user object!");
		
		// remember you can only read these user objects
		var pfUser = result.user;
			
		//do something with the user. Print the username
		Ti.API.info( "Username: " + pfUser.objectForKey("username") );
			
		
	} else {
		
		Ti.API.info("Could not get user. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

	

__REMEMBER:__ These PFObjects and PFUsers are read only.

____

### Resetting and Changing Passwords

If the user forgets their password, you can call `parseapi.PFUserRequestPasswordResetForEmail( email )` or `parseapi.PFUserRequestPasswordResetForEmailInBackground`. More information for this is available here [Parse Resetting Passwords](https://www.parse.com/docs/ios_guide#users-resetting)

####Request Reset Password Example

__Synchronous:__

	var email = "test@testing.com"

	//Synchronous Password Reset
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error, (PFUser or null) user
	var result = parseapi.PFUserRequestPasswordResetForEmail( email );
	
	if( result.succeeded ) {
		
		Ti.API.info("Successfully Requested Password Reset. Check your email.");
		
	} else {
			
		Ti.API.info("Could not request password reset. ErrorCode: " + result.errorCode + " Error: " + result.error);

	}

__Asynchronous:__

	var email = "test@testing.com";

	//Asynchronous Password Reset
	parseapi.PFUserRequestPasswordResetForEmailInBackground( {
			email: email,
			
			success: function(e) {
				// event: null
				
				Ti.API.info("Successfully Requested Password Reset. Check your email.");
	
			},
			error: function(e) {
				// event: (integer or null)errorCode, (string or null)error
				Ti.API.info("Could not request password reset. ErrorCode: " + result.errorCode + " Error: " + result.error);
	
			}
					
	});

####Changing Passwords Example

If a user wants to change their password, first set the new password by calling `pfUser.setPassword` and then save the pfUser.

	var currentUser = parseapi.PFUserCurrentUser();
		
	// First set the new password
	currentUser.setPassword( newpassword );
	
	// Then Save.
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	var result = currentUser.save();
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully changed password!");

	} else {
		
		Ti.API.info("Could not save new password. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}
		
____
____
## Facebook Integration

####iOS Only

More information about Parse's integration with the Facebook API can be found here [Facebook Users](https://www.parse.com/docs/ios_guide#fbusers).

This module also has functions to access the Facebook API dialog and request functions. This is very similar to using the original facebook functions found in the Titanium SDK Facebook Module. 

If you use this library for your Facebook API there is no need to use Titanium's Facebook Module. 

More information about setting up your application to use the Facebook API can be found here [Facebook iOS Tutorial](https://developers.facebook.com/docs/mobile/ios/build)

__IMPORTANT:__ Facebook Integration is currently only available on iOS.

____

### Setup your Facebook API key

From the [Facebook Developer Pages](https://developers.facebook.com/apps), put your facebook application id in the `facebookApplicationId` property when calling `parseapi.initParse`.

Example:
	
	var parseapi = require('com.forge42.parseapi');

	parseapi.initParse( {
						applicationId: "put your parse api APPLICATION ID here",
						clientKey: "put your parse api CLIENT KEY here",
						facebookApplicationId: "put your facebook application APP ID here"
					});

__VERY IMPORTANT__: You have to setup a custom URL Scheme for your iOS App for this module to work. 

____

### Checking if your application has a Facebook Application Id

You might want to check if your application has registered a Facebook application id. This is an easy way to determine if your Facebook functions should run or not so you can easily disable and enable your Facebook implementation. This is useful for Android devices as the Parse API doesn't support Facebook on Android yet. So when it does support Android, you can just add the Facebook Application Id to your initParse method and you'll be set!

Example:

	// when we initialize, check if we are using Android or iOS
	var parseapi = require('com.forge42.parseapi');

	if (Titanium.Platform.name == 'android') 
	{
		// Parse doesn't support the Facebook API on Android yet.
			
		parseapi.initParse( {
								applicationId: "Place your Application Id Here",
								clientKey: "Place your Client Key Here"
							});	
	} else {
		// Parse Supports Facebook API on iOS
		parseapi.initParse( {
								applicationId: "Place your Application Id Here",
								clientKey: "Place your Client Key Here",
								facebookApplicationId: "Place your Facebook Application Id Here"
							});	
	}

Then when in your code, you can check if the Facebook application id was setup with the following property.

Example:

	if( parseapi.ParseHasFacebookApplicationId ) {
		// Do something with facebook here
	}

All the examples in the included app.js use this
____

### Setting Up Your Custom URL Scheme for Facebook Integration

Follow these steps to add your custom url scheme for your facebook integration:

- Step 1) Setup this Parse Module and Run your application once in the iphone simulator.  

- Step 2) Go into the newly created folder `(YOUR PROJECT DIRECTORY)/build/iphone` and copy your `Info.plist` file into your root project directory `(YOUR PROJECT DIRECTORY)`. This will let Titanium know you're using a custom `Info.plist` file. (Don't worry about updating the file. Titanium will do it's best to change what it needs in your custom.plist file without overwriting your changes.)  

- Step 3) Now open up Info.plist in a text editor of your choice.  

- Step 4) Do a search for the `CFBundleURLSchemes` key. Now do either of the following steps.

__I have the CFBundleURLSchemes key__

- Step 5) Add a new string property with your Facebook App ID prefixed by `fb`. Then go to step 6. Example: `<string>fb1234567890</string>`

__I don't have the CFBundleURLSchemes key__

- Step 5) Add the following lines in the `Info.plist`. Remember to replace `com.mycompany.myapplication` with your own. Then go to step 6. (Hint: Add these lines inside the `<dict></dict>` after `<plist version="1.0">`)
	

		<key>CFBundleURLTypes</key>
		<array>
			<dict>
				<key>CFBundleURLName</key>
				<string>com.mycompany.myapplication</string>
				<key>CFBundleURLSchemes</key>
				<array>
					<string>fb1234567890</string>
				</array>
			</dict>
		</array>

- Step 6) Save the file. Make sure it's in your Project Root Directory. This process makes titanium use a custom Info.plist file. Titanium will do it's best to try and update your keys but if you run into any problems, delete the custom Info.plist file, clean and build your project, and repeat these steps.

____

### Facebook Login / Sign Up

To login or sign up a user you can only call the Asynchronous function `parseapi.PFUserLogInWithFacebookInBackground`. It takes a permissions array of strings. These permissions can be found here: [Facebook API Permissions](https://developers.facebook.com/docs/reference/api/permissions/)

The user will be presented with a Facebook Login or Sign Up Screen to authorize your application.

The current user will be kept in the application's cache when you exit your application. This way you don't have to have the user login/out every time they open your app. But __REMEMBER__ when you resume your application, the PFUser you obtain from `parseapi.PFUserCurrentUser()` is a cached version. So make sure to refresh it by calling `pfUser.refresh()` or `pfUser.refreshInBackground()`.


Also the only way you can find out if the user is new is by checking the `pfUser.isNew` property like it shows in the example, otherwise the user isn't new and just logged in.


Example:

	var permissions = new Array("");
	
	// Asynchronous facebook sign up/login function
	parseapi.PFUserLogInWithFacebookInBackground({
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
				Ti.API.info("Logged in with facebook id: " + pfUser.facebookId);
			}
			
			test_button_array[9].title = "PFUser Logout";
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			if( e.errorCode == parseapi.kParseErrorFacebookLoginCancelled ) {
				Ti.API.info(e.error); // user cancelled error message
			}
			else {

				Ti.API.info("Could not create new user. ErrorCode: " + e.errorCode + " Error: " + e.error);
			}
		}
		
	});

____

### Facebook Link and Unlink to existing PFUser

To link a Facebook Account with an existing PFUser you can only call the Asynchronous function `pfUser.linkToFacebookInBackground`. 

It takes a permissions array of strings. These permissions can be found here: [Facebook API Permissions](https://developers.facebook.com/docs/reference/api/permissions/)

The user will be presented with a Facebook Login or Sign Up Screen to authorize your application and after it succeeds, the user can now use his Facebook account with the account he registered manually beforehand. The user can also now login through his Facebook account as well for the same user account.

####Link Example

	var permissions = new Array("");
	var user = parseapi.PFUserCurrentUser();
	
	if( user == null )
	{
		Ti.API.info("No User Currently Logged In");
		return;
	}
	
	if( user.hasFacebook )
	{
		Ti.API.info("User already has a linked facebook account");
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

####Unlink Example

__Asynchronous:__

	// Asynchronous Unlink
	user.unlinkFromFacebookInBackground({

		success: function(e) {
			// event: Null

			Ti.API.info("Success: The user is no longer associated with their Facebook account.");
			
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
			
			Ti.API.info("Could not unlink account! ErrorCode: " + e.errorCode + " Error: " + e.error);
		}
		
	});

__Synchronous:__

	// Synchronous Unlink
	var result = user.unlinkFromFacebook();
	
	// Synchronous.
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	if( result.succeeded ) {
	
		Ti.API.info("Success: The user is no longer associated with their Facebook account.");
		
	} else {
		
		Ti.API.info("Could not unlink account! ErrorCode: " + e.errorCode + " Error: " + e.error);
	}

____

### Facebook session expiration and how to avoid it

There is a finite time before the facebook session expires so you have to check if the facebook session expired before running any facebook calls. Also if you close your app and come back in later, you might still be logged in with a PFUser but the facebook session might have expired or not be valid. You can use the `parseapi.FacebookSessionIsValid` property to check if the session is expired. If it is expired, you can make the user login again through facebook or log the user out. When the facebook session expires, you will still be able to see the current logged in user when calling `PFUserCurrentUser` so checking if the user is logged in is not enough. So make sure to check if the session is valid.

A way around this is to use the `offline_access` permission in `parseapi.PFUserLogInWithFacebookInBackground`. This will give you an infinite expiry time and you won't have to authorize the user again. You can read more about this in the [Facebook Authentication Page](https://developers.facebook.com/docs/authentication/) or the [Facebook Permissions Page](https://developers.facebook.com/docs/reference/api/permissions/)

____

### Doing more with the Facebook API

Functions are available to access the [Facebook Graph API](https://developers.facebook.com/docs/reference/api/) or the deprecated [Facebook REST API](https://developers.facebook.com/docs/reference/rest/). More information available here [Facebook Request iOS Documentation](https://developers.facebook.com/docs/reference/iossdk/request/)

There are also functions for using [Facebook Dialogs](https://developers.facebook.com/docs/reference/dialogs/).

The following functions are extremely similar to the Titanium Facebook functions so you should be familiar with them if you've used the Facebook API. Also you should be able to port your existing code without a problem. (The following are examples used by the [Facebook Titanium Examples](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Facebook-module) with some slight modifications to be used with the parseapi).

__IMPORTANT:__ These functions assume that you're logged in, otherwise they will fail and return an error. Sorry but these functions do not return an errorCode. Since these functions do not return an error code, make sure to check if you're logged in with the `parseapi.PFUserCurrentUser()` and check that the user's Facebook session is still valid by checking `parseapi.FacebookSessionIsValid` before calling any of the following facebook functions. If the user is not logged in or the facebook session is not valid, you'll have to make the user login again by calling the `parseapi.PFUserLoginWithFacebookInBackground()`.


Examples:

####Simple Graph API Call
	parseapi.FacebookRequestWithGraphPath('me', {}, 'GET', function(e) {

		if (e.success) {
			Ti.API.info(e.result);

		} else if (e.error) {
			Ti.API.info(e.error);

		} else {
			Ti.API.info('Unknown response');
		}

	});

####Create an Event with GRAPH API

([More Facebook Info on Events](http://developers.facebook.com/docs/reference/api/event/))

	// First make sure this permission exists
	
	var permissions = new Array("create_event");
	
	parseapi.PFUserLogInWithFacebookInBackground({
		permissions: permissions,
		success: function(e) {},
		error: function(e) {}
	};
	
	// ...
	// ...
	
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
			Ti.API.info("Success! Returned from FB: " + e.result);
		} else {
			if (e.error) {
				Ti.API.info(e.error);
			} else {
				Ti.API.info("Unknown result");
			}
		}
	});

####Set user's Facebook status with Graph API

([More Facebook Info on User Status Message](https://developers.facebook.com/docs/reference/api/status/))

	// First make sure this permission exists
	
	var permissions = new Array("publish_stream");
	
	parseapi.PFUserLogInWithFacebookInBackground({
		permissions: permissions,
		success: function(e) {},
		error: function(e) {}
	};
	
	// ...
	// ...
	
	parseapi.FacebookRequestWithGraphPath('me/feed', {message: "Trying out FB Graph API and it's fun!"}, "POST", function(e) {
		if (e.success) {
			Ti.API.info("Success!  From FB: " + e.result);
		} else {
			if (e.error) {
				Ti.API.info(e.error);
			} else {
				Ti.API.info("Unkown result");
			}
		}
	});

####Post a photo using the Graph API

([More Facebook Info on Uploading Photos](https://developers.facebook.com/docs/reference/api/photo/))

	// First make sure this permission exists
	
	var permissions = new Array("publish_stream");
	
	parseapi.PFUserLogInWithFacebookInBackground({
		permissions: permissions,
		success: function(e) {},
		error: function(e) {}
	};
	
	// ...
	// ...
	
	var f = Ti.Filesystem.getFile('pumpkin.jpg');
	var blob = f.read();
	var data = {
		message: 'This is a pumpkin',
		picture: blob
	};
	
	parseapi.FacebookRequestWithGraphPath('me/photos', data, 'POST', function(e){
		if (e.success) {
			Ti.API.info("Success!  From FB: " + e.result);
		} else {
			if (e.error) {
				Ti.API.info(e.error);
			} else {
				Ti.API.info("Unkown result");
			}
		}
	});

####Post a photo using the deprecated REST API

([More Facebook Info on Uploading Photos](https://developers.facebook.com/docs/reference/api/photo/))

	// First make sure this permission exists
	
	var permissions = new Array("publish_stream");
	
	parseapi.PFUserLogInWithFacebookInBackground({
		permissions: permissions,
		success: function(e) {},
		error: function(e) {}
	};
	
	// ...
	// ...
	
	var f = Ti.Filesystem.getFile('pumpkin.jpg');
	var blob = f.read();
	var data = {
		caption: 'This is a pumpkin',
		picture: blob
	};
	
	parseapi.FacebookRequest('photos.upload', data, function(e){
		if (e.success) {
			Ti.API.info("Success!  From FB: " + e.result);
		} else {
			if (e.error) {
				Ti.API.info(e.error);
			} else {
				Ti.API.info("Unkown result");
			}
		}
	});

####Show the Facebook Feed Dialog

([More Facebook Info on the Feed Dialog](https://developers.facebook.com/docs/reference/dialogs/feed/))

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
			Ti.API.info("Success!  From FB: " + e.result);
		} else {
			if (e.error) {
				Ti.API.info(e.error);
			} else if (e.cancelled) {
				Ti.API.info('Cancelled');
			} else {
				Ti.API.info("Unkown result");
			}
		}
	});

____
____
## PFFile Guide

###Storing Files and Images

PFFile lets you store application files in the cloud that would otherwise be too large or cumbersome to fit into a regular PFObject. The most common use case is storing images but you can also use it for documents, videos, music, and any other binary data.

You can find more information about PFFiles here in the [Parse.com iOS PFFiles Section](https://www.parse.com/docs/ios_guide#files)

- You can only store Titanium Blobs in a PFFile. 

- You don't need to worry about filename collisions. Each upload gets a unique identifier so there's no problem with uploading multiple files named resume.txt.

- It's important that you give a name to the file that has a file extension. This lets Parse figure out the file type and handle it accordingly. So, if you're storing PNG images, make sure your filename ends with .png.

####Example for storing files:

__Synchronous:__

	// Load a file and convert it to a blob
	var file = Ti.Filesystem.getFile('resume.txt');
	var blob = file.read(); // you can also use f.toBlob();
	
	// New PFFile with name and data
	var pfFile = parseapi.PFFileCreateFileWithNameAndData( {
		name: "resume.txt",
		data: blob 
	});

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
	
	pfObject.setObject("resume.txt", "name");

	pfObject.setObject(pfFile, "savedFile");
	
	// save pfObject
	result = pfObject.save();
	
	if( result.succeeded ) {
	
		Ti.API.info("Successfully saved object!");

	} else {
		
		Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

__Asynchronous:__

	// Load a file and convert it to a blob
	var file = Ti.Filesystem.getFile('resume.txt');
	var blob = file.read(); // you can also use f.toBlob();
	
	// New PFFile with name and data
	var pfFile = parseapi.PFFileCreateFileWithNameAndData( {
		name: "resume.txt",
		data: blob 
	});

	// Save File Asynchronously.
	pfFile.saveInBackground( { 	
	
		success: function(e) {
			// event: nothing
			
			Ti.API.info("Successfully saved file: " + pfFile.name );
			
			Ti.API.info("Created Object URL: " + pfFile.url);
			
			// New PFObject
			var pfObject = parseapi.PFObjectCreateObjectWithClassName("TestObjectWithFile");
			
			// Text, numbers
			pfObject.setObject("resume.txt", "name");
			
			pfObject.setObject(pfFile, "savedFile");
			
			// save pfObject
			result = pfObject.save();
			
			if( result.succeeded ) {
			
				Ti.API.info("Successfully saved object!");
		
			} else {
				
				Ti.API.info("Could not save object. ErrorCode: " + result.errorCode + " Error: " + result.error);
			}
		},
		
		error: function(e) {
			// event: (integer or null)errorCode, (string or null)error
		
			Ti.API.info("Error: " + JSON.stringify(e));
		}
	});

####Example for storing images:

Storing images is basically the same as storing files except that there are some minor issues outlined in the next section below. You can find an example of storing images in the `example/app.js` file in this module.

____

###Issues with storing images and how you can resolve them.

There is a slight issue with the way Titanium stores it's TiBlob data type for images. On iOS, if an image is stored to a TiBlob, it will always return a JPEG representation of the image, even if the image was a png file. On Android, it will always return a PNG representation. This only affects us when we try to store an image to a Parse PFFile object. If the user chooses an image from the gallery or the camera, these limitations are imposed by the current release of the Titanium Mobile SDK. 

Therefore, to provide you with more choices, I have implemented the `parseapi.setDefaultTiBlobImageRepresentation( parseapi.kTiBlobImageDefaultPNG )` global function. Where you can either pass `parseapi.kTiBlobImageDefaultPNG ` or `parseapi.kTiBlobImageDefaultJPEG` as the argument to set the default way images are stored in a PFFile if the TiBlob was not loaded directly from a TiFile. __The default global setting for storing TiBlob Images in all PFFiles is `parseapi.kTiBlobImageDefaultPNG`, so just make sure you know this when uploading images that you didn't directly load from a TiFile.__

__REMEMBER:__ This isn't a problem if you use a TiFile and convert it to a TiBlob data type by using `myfile.toBlob()` or `myFile.read()` in your javascript. In this case, the data for your image will be stored correctly in whatever format the file is stored in.

__IMPORTANT:__ If you're not sure that a TiBlob image you're using will be saved with `parseapi.setDefaultTiBlobImageRepresentation()`, I have implemented the `parseapi.willTiBlobBeSavedWithDefaultImageRepresentation( TiBlob )` function which checks your TiBlob and returns a boolean value. You can also use `parseapi.getDefaultTiBlobImageRepresentation()` which will return either `parseapi.kTiBlobImageDefaultPNG` or `parseapi.kTiBlobImageDefaultJPEG`.

__IMPORTANT:__ If you try to save a TiFile, you will get the following error: `TiFile is not a supported data type. Please use myfile.toBlob() to provide a TiBlob data type. Storing as empty data.` and the PFFile will be saved as an empty file. So remember to use `myfile.toBlob()` or `myFile.read()` in your javascript before saving the data in a PFFile. We only accept the TiBlob datatype.

____

###Retrieving Files
	
To retrieve a file, you can query the object you saved the file in and then call `pfFile.getData()` or `pfFile.getDataInBackground()` which will download the file from the server and return a TiBlob.

Example:

	// Get a specific object with a query
	var result = parseapi.PFQueryCreateObjectOfClassAndId( {
			objectClass: "TestObjectWithFile",
			objectId: "0123456789" 
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

____
____
## Relational Data and User Associations

This module supports all the associations shown in the [Parse.com Relational Data Section](https://www.parse.com/docs/ios_guide#objects-pointers) and [Parse.com User Associations Section](https://www.parse.com/docs/ios_guide#users-associations) of their iOS Guide.

###PFObjects Associations Example:

	//PFObject Associations example
	var post = parseapi.PFObjectCreateObjectWithClassName("Post");
	
	post.setObject("This Parse Module is Great!", "name");
	
	var result = post.save(); // save the post, then change the title and let the comment save both of these objects
							
	var comment = parseapi.PFObjectCreateObjectWithClassName("Comment");
	
	comment.setObject("awesome!", "comment");

	comment.setObject(post, "post");
	
	post.setObject("I have comments now!", "name");
	post.setObject("I have content too!", "content");
	
	//asynchronous
	comment.saveInBackground( {
				
				 success: function(e) {
					Ti.API.info("Success: " + JSON.stringify(e));
				},
				error: function(e) {
					Ti.API.info("Error: " + JSON.stringify(e));
				}
			
			});

###PFUser Associations Example:

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

###Retrieve PFUser Associations Example:

You can apply this same idea to retrieving PFObjects.

	var user = parseapi.PFUserCurrentUser();
	
	if( user == null ) {
		alert("No User Logged In!");
		
		return;
	}
	
	// Find all posts by the current user
	var pfQuery = parseapi.PFQueryCreateQueryWithClassName("Post");
	
	pfQuery.whereKey( {
	    key: "user",
	    equalTo: user
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
____
____
## iOS Push Notifications

__REMEMBER:__ Receiving push notifications for iOS doesn't work in the simulator! But you can send push notifications in the simulator :)

### Setting up Certificates, Keys and Provisioning Profile

Please visit the [Parse iOS Guide for Push Notifications](https://www.parse.com/docs/ios_guide#push-certificates) to find out how to set this up.

____

### Integrating Parse iOS Push Notifications with Titanium

After you setup your iOS Certificates, Keys, and Provisioning Profile, you can add the following lines of code to your application to register for push notifications:

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
			
			// Let parse handle the in app push notifications
			// this function will show the user an alert dialog and make an alert sound
			parseapi.ParseiOSPushHandlePush(data);
		}
	});

____

### Using iOS Push Notifications

This module wraps the function calls that the Parse API makes available through it's SDK. So by looking at this [Parse Module Reference](./parsemodulereference.html) and Parse's Documentation on [Parse.com iOS Push Notifications](https://www.parse.com/docs/ios_guide#push), you should be able to use their documentation to do anything with push notifications. There are other methods such as subscribing, unsubscribing, retrieving different channels which you can find the the Parse Module Reference.

Here is a simple example where a device sends a message to the global push notification channel synchronously. It shouldn't be hard to use this example and the coding patterns in this guide to write other Push Notification code.

Example:

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

Here's another example of how to send data. You can send the following properties __alert, badge, and sound__ which are described in [Apple's documentation](http://developer.apple.com/library/ios/#documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/ApplePushService/ApplePushService.html#//apple_ref/doc/uid/TP40008194-CH100-SW1) but you can also send custom properties.

	var myData = {  
				alert: "Hello everyone!",
				badge: 3,
				sound: "default",
				customFlag: true
			  };
	// Synchronous
	// Send Push Data to Global Channel
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	var result = parseapi.ParseiOSPushSendPushDataToChannel( {

											channel: "", // global channel
											data: myData
																});
	
	if( result.succeeded ) {
	
		alert("Successfully sent Push Notification message.");
		
	} else {
		
		alert("Could not send Push Notification message. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

You can retrieve these messages in the `Ti.Network.registerForPushNotifications` callback function or just let Parse Handle it with `parseapi.ParseiOSPushHandlePush(data);`

Example:

	Ti.Network.registerForPushNotifications({
			

		//....other callbacks .... etc....
		
		callback: function(e) {
			var data = e.data;
			
			if( data.customFlag == true )
			{
				alert("You set the custom flag!!!!");
			}
			else
			{
				alert(data.alert);
			}

			// Or Let parse handle the in app push notifications
			// this function will show the user an alert dialog and make an alert sound
			//parseapi.ParseiOSPushHandlePush(data);
		}
	});

____
____
## Android Push Notifications

### Setting up Android Notifications

Please visit the [Parse Android Guide for Push Notifications](https://www.parse.com/docs/ios_guide#push-certificates) to find out how to set this up.

Here's a quick way to get setup. Just put this in your `tiapp.xml` inside <android></android>. So your file should look like this:

	<android xmlns:android="http://schemas.android.com/apk/res/android">
		<manifest>
			<application>
				<service android:name="com.parse.PushService" />
				<receiver android:name="com.parse.ParseBroadcastReceiver">
				  <intent-filter>
					<action android:name="android.intent.action.BOOT_COMPLETED" />
					<action android:name="android.intent.action.USER_PRESENT" />
				  </intent-filter>
				</receiver>
			</application>
			<uses-permission android:name="android.permission.INTERNET" />
			<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
			<uses-permission android:name="android.permission.VIBRATE" />
		</manifest>
    </android>

____

### Integrating Parse Android Push Notifications with Titanium

After you setup your tiapp.xml, you can add the following lines of code to your application to register for push notifications:

	// for this to work, you have to use the root activity. 
	// The windows you open cannot be heavyweight windows so that the root activity stays active.

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
			
			// clear all the other notifications in the status bar 
			// so that the user can't click on them anymore.
			parseapi.ParseAndroidPushClearAllNotifications();
		}
	});
	
	//this action is used to provide in app notifications 
	//The action should be your reverse domain and an action name: com.yourdomain.yourappname.youraction
	parseapi.ParseAndroidPushSetupDefaultActionReceiver("com.lithiumllama.parsefacebooktest.HANDLEP", function (e) {
		var intent = e.intent;
		if( intent.hasExtra("com.parse.Channel") && intent.hasExtra("com.parse.Data") ) {
			var channel = intent.getStringExtra("com.parse.Channel");
			var data = JSON.parse( intent.getStringExtra("com.parse.Data") );
			
			// process your android push notification here
			Ti.API.info("Got Push Notification In Default Action Receiver!");
			alert("Running App Notification:\n" + JSON.stringify(data));
			
			// clear all the other notifications in the status bar 
			// so that the user can't click on them anymore.
			parseapi.ParseAndroidPushClearAllNotifications();
		}
	});

You should also make sure to register and unregister the default action receiver if you want to use in app notifications:


	currentActivity.addEventListener('resume', function(e) {
		Ti.API.info("Resumed Android App");
		parseapi.ParseAndroidPushRegisterDefaultActionReceiver();
	});	
	
	currentActivity.addEventListener('pause', function(e) {
		Ti.API.info("Paused Android App");
		parseapi.ParseAndroidPushUnregisterDefaultActionReceiver();
	});

____

### Using Android Push Notifications

This module wraps the function calls that the Parse API makes available through it's SDK. So by looking at this [Parse Module Reference](./parsemodulereference.html) and Parse's Documentation on [Parse.com Android Push Notifications](https://parse.com/docs/android_guide#push), you should be able to use their documentation to do anything with push notifications. There are other methods such as subscribing, unsubscribing, retrieving different channels which you can find the the Parse Module Reference.

Here is a simple example where a device sends a message to the global push notification channel synchronously. It shouldn't be hard to use this example and the coding patterns in this guide to write other Push Notification code.

Example:

	// Synchronous
	// Send Push Message to Global Channel
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	var result = parseapi.ParseAndroidPushSendPushMessageToChannel( {
																	channel: "", // global channel
																	message: "Android Client Sent Everyone this Message!" 
																});
	
	if( result.succeeded ) {
	
		alert("Successfully sent Push Notification message.");
		
	} else {
		
		alert("Could not send Push Notification message. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

Here's another example of how to send data. You can send the following properties __alert, title, action__ which are described in Parse's Android Push Notifications but you can also send custom properties. If you send the `action` property and it has the same name as the default action receiver you setup earlier, you can have in-app notifications.

	var myData = {  
				alert: "Android Client Sent Everyone this Message!", 
				action: "com.lithiumllama.parsefacebooktest.HANDLEP",
				title: "Parse Push Notification"
			  };

	// Synchronous
	// Send Push Data to Global Channel
	// returns (boolean)succeeded, (integer or null)errorCode, (string or null)error
	var result = parseapi.ParseAndroidPushSendPushDataToChannel( {

											channel: "", // global channel
											data: myData
																});
	
	if( result.succeeded ) {
	
		alert("Successfully sent Push Notification message.");
		
	} else {
		
		alert("Could not send Push Notification message. ErrorCode: " + result.errorCode + " Error: " + result.error);
	}

__IMPORTANT:__ By default, if you send a push notification with android, iOS users cannot see it by default. This is explained in the Parse Docs in the ParsePush section. If you wish to send a push notification to iOS users you can set the `pushToIOS` argument to true every time you send a message or data. __Before using this, you must set up iOS push certificates!__

	parseapi.ParseAndroidPushSendPushMessageToChannel( {
		channel: "", // global channel
		message: "Android Client Sent Everyone this Message!",
		pushToIOS: true 
	});
or
	parseapi.ParseAndroidPushSendPushDataToChannel( {
		channel: "", // global channel
		data: myData,
		pushToIOS: true
	});

____
____
## Handling Errors

In all the examples above, if a function fails, it returns an `errorCode` and an `error` string. You can check the error code by comparing it against the error codes listed in the Error Code Properties of the [Parse Module Reference](./parsemodulereference.html) page of this documentation.

Example:

	//Asynchronous User Login
	parseapi.PFUserLoginInBackground( {
					
					username: user,
					password: pass,
					
					success: function(e) {
						
					},
					error: function(e) {
					
						// An error occured

						
						// Used the wrong credentials to login a user
						if( e.errorCode == parseapi.kParseErrorUserWrongCredentials )
						{
							Ti.API.info("Please try to login again! Error: " + e.error);
						}
								
					}
					
	});

____

### Showing Debug Info

__Important:__ All debugging info is turned off by default

You can call the `parseapi.enableParseModuleDebugLog( boolean )` function to show more debugging information from the Parse API Module. You can test this for yourself in the examples. All messages from this will be prefixed with `[PARSE MODULE]`.

The exact error message sent back from the Parse Servers will be prefixed with: `[Extra Error Information From Parse Server]`.


____
____
## Release Notes 

[Click here to see version and release notes](./releasenotes.html)

____
____
## Author

Programmer: David E. Rodriguez

Company: Forge42

Website: www.forge42.com

Twitter: @programmerdave

____
____
## Feedback and Support

If you find any bugs, please let me know.

Also when reporting a bug or problem, please send me your iOS `build.log` file in your e-mail if using the iOS version of the module.

Please direct questions, feedback, and concerns about this module to [support@forge42.com](support@forge42.com)

Please include __Parse API Module iOS Support__  
or __Parse API Module Android Support__ in the subject line.

I will get back to you in a timely manner.

Please if you want a new feature in Parse, Tell them! The more requests they get, the faster they implement certain features. Send them an email at [feedback@parse.com](feedback@parse.com)

____
____
## License

IMPORTANT: This module is unofficial and is not maintained by parse.com

Copyright(c) 2011 by Forge42. 

Please see the LICENSE file included in the distribution for further details.
