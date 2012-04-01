# Parse API Module PFUser Reference

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

# PFUser Reference

__IMPORTANT:__ PFUser inherits from PFObject so any function in PFObject can be called from a PFUser. Also when you resume your application, the PFUser you obtain from `parseapi.PFUserCurrentUser()` is a cached version. So make sure to refresh it by calling `pfUser.refresh()` or `pfUser.refreshInBackground()`.

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

###initSignUp( Map )

Username and Password are mandatory. Email is optional.

__Arguments:__

Map:
		
	{
		username: String
		password: String
		email: String or Null
	}

__Returns:__
	
void

_____

###finishSignUp()

__Arguments:__

void

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}

_____

###finishSignUpInBackground( Map )

__Arguments:__

Map:
	
	{
		success: Callback
		error: Callback
	}

__Callbacks:__

success:
	event: Null

error:
	event: Map
	
	{
		errorCode: Number
		error: String
	}

__Returns:__
	
void

_____

###linkToFacebookInBackground( Map )

####iOS Only

Go here to see all [Facebook Permissions.](https://developers.facebook.com/docs/reference/api/permissions/)

__Arguments:__

Map:
	
	{
		permissions: Array of String
		success: Callback
		error: Callback
	}
	

__Callbacks:__

success:
	event: Null
	

error:
	event: Map
	
	{
		errorCode: Number
		error: String
	}
	

__Returns:__
	
void

_____

###unlinkFromFacebook()

####iOS Only

__Arguments:__

void

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}

_____

###unlinkFromFacebookInBackground( Map )

####iOS Only

__Arguments:__

void
	

__Callbacks:__

success:
	event: Null
	

error:
	event: Map
	
	{
		errorCode: Number
		error: String
	}
	

__Returns:__
	
void

_____

###setPassword( password )

__Arguments:__

password: String

__Returns:__
	
void

____
____
##Properties

###isAuthenticated

__Getter:__
	
Boolean

_____

###isNew

__Getter:__
	
Boolean

_____

###facebookId

####iOS Only

__Getter:__
	
String

_____

###hasFacebook

####iOS Only

__Getter:__
	
Boolean

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
