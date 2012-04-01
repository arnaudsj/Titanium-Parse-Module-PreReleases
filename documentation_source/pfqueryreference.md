# Parse API Module PFQuery Reference

_Please rate both the iOS and Android module in the marketplace if you find them useful :)_

[Click here to see version and release notes](./releasenotes.html)

[<- Go Back to Parse Module Guide](./index.html)

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

# PFQuery Reference

____
____
## Types:

String - Javascript String Type

Boolean - Javascript Boolean Type Ex: `true false`

Number - Javascript Number Type

Date - Javascript Date Object Ex: `new Date()`

Map - Javascript object type with key-value pairs Ex: `{ name: "John", age: 45 }`

Array - Javascript array Ex: `new Array()`

Null - Javascript 	`null`

PFObject - Parse API PFObject Type

PFUser - Parse API PFObject Type

PFQuery - Parse API PFQuery Type

PFFile - Parse API PFFile Type

PFGeoPoint - Parse API PFGeoPoint Type

PFACL - Parse API PFACL Type

PFTypes - Parse API PFObject, PFUser, PFFile, PFACL, PFGeoPoint object

JSONTypes - String, Boolean, Number, Date, Map(of JSONTypes), Array(of JSONTypes), Null

Callback - a function with one argument Ex: `function(event) {  }`

TiBlob - Titanium Blob Type.

____
____
##Functions

###queryWithClassName( className )

__Arguments:__

className: String

__Returns:__
	
void

____

###whereKey( Map )

__Arguments:__

Map:
		
	{
		key: String
		equalTo: String or PFTypes
	}

OR

	{
		key: String
		greaterThan: String or PFTypes
	}

OR

	{
		key: String
		greaterThanOrEqualTo: String or PFTypes
	}

OR

	{
		key: String
		lessThan: String or PFTypes
	}

OR

	{
		key: String
		lessThanOrEqualTo: String or PFTypes
	}		

OR

	{
		key: String
		notEqualTo: String or PFTypes
	}	

OR

	{
		key: String
		nearGeoPoint: PFGeoPoint
	}

OR

	{
		key: String
		nearGeoPoint: PFGeoPoint
		withinMiles: Number
	}

OR

	{
		key: String
		nearGeoPoint: PFGeoPoint
		withinKilometers: Number
	}

OR

	{
		key: String
		nearGeoPoint: PFGeoPoint
		withinRadians: Number
	}

OR

	{
		key: String
		matchesRegex: String
	}

OR

	{
		key: String
		containsString: String
	}

OR

	{
		key: String
		hasPrefix: String
	}

OR

	{
		key: String
		hasSuffix: String
	}


__Returns:__
	
void

_____

###whereKeyContainedIn( Map )

__Arguments:__

Map:
		
	{
		key: String

		containedIn: Array of String
	}

__Returns:__
	
void

_____

###includeKey( key )

__Arguments:__

key: String

__Returns:__
	
void

_____

###orderByAscending()

__Arguments:__

key: String

__Returns:__
	
void

_____

###orderByDescending()

__Arguments:__

key: String

__Returns:__
	
void

_____

###resetQuery()

__Arguments:__

void

__Returns:__
	
Boolean 

// Only fails if the PFQuery doesn't have a class name

_____

###cancel( key )

Cancels the current network request (if any). Ensures that callbacks won't be called.

__Arguments:__

void

__Returns:__
	
void

_____

###findObjects()

__Arguments:__

void

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		objects: Array of PFObjects
		errorCode: Number
		error: String
	}

_____

###findObjectsInBackground( Map )

__Arguments:__

Map:
	
	{
		success: Callback
		error: Callback
	}

__Callbacks:__

success:
	event: Map
		
	{
		objects: Array of PFObjects
	}

error:
	event: Map
	
	{
		errorCode: Number
		error: String
	}

__Returns:__
	
void

_____

###countObjects()

__Arguments:__

void

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		count: Number
		errorCode: Number
		error: String
	}

_____

###countObjectsInBackground( Map )

__Arguments:__

Map:
	
	{
		success: Callback
		error: Callback
	}

__Callbacks:__

success:
	event: Map
		
	{
		count: Number
	}

error:
	event: Map
	
	{
		errorCode: Number
		error: String
	}

__Returns:__
	
void

_____

###getObjectWithId( id )

__Arguments:__

id: String

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		object: PFObject
		errorCode: Number
		error: String
	}

_____

###getObjectInBackgroundWithId( Map )

__Arguments:__

Map:
	
	{
		id: String
		success: Callback
		error: Callback
	}

__Callbacks:__

success:
	event: Map
	
	{
		object: PFObject
	}

error:
	event: Map
	
	{
		errorCode: Number
		error: String
	}

__Returns:__
	
void


____
____
##Properties


###limit

__Setter:__

Number

__Getter:__
	
Number

###skip

__Setter:__

Number

__Getter:__
	
Number

###className

__Getter:__
	
Number


###cachePolicy

Has to be set for every PFQuery Object you create. More information can be found here: [Parse.com Caching](https://www.parse.com/docs/ios_guide#objects-caching)

The ParseCachePolicy Constants are listed in the [Parse API Module Reference](./parsemodulereference.html).


__Setter:__

ParseCachePolicy Constant

Example: `pfQuery.cachePolicy = parseapi.kParseCachePolicyNetworkElseCache;`

__Getter:__
	
ParseCachePolicy Constant

Example: `if( pfQuery.cachePolicy == parseapi.kParseCachePolicyNetworkElseCache ) {}`

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

[<- Go Back to Parse Module Guide](./index.html)
