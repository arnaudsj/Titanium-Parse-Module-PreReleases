# Parse API Module Reference

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

# Parse Module Reference

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

###initParse( Map )

__Arguments:__

Map:
	
	{
		applicationId: String
		clientKey: String
	}
	
__Returns:__
	
void

----

###enableParseModuleDebugLog( enable )

// Debugging Logs are Turned Off By Default

__Arguments:__

enable: Boolean

__Returns:__
	
void

----

###createPFObject()

__Arguments:__

void

__Returns:__

PFObject

____

###createPFFile()

__Arguments:__

void

__Returns:__

PFFile

____

###createPFQuery()

__Arguments:__

void

__Returns:__

PFQuery

____

###createPFUser()

__Arguments:__

void

__Returns:__

PFUser

____

###PFUserCurrentUser()

__Arguments:__

void

__Returns:__
	
user: PFUser

----

###PFUserLogin( Map )

__Arguments:__

Map:
	
	{
		username: String
		password: String
	}
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		user: PFUser
		errorCode: Number
		error: String
	}
	

____

###PFUserLoginInBackground( Map )

__Arguments:__

Map:
	
	{
		username: String
		password: String
		success: Callback
		error: Callback
	}
	

__Callbacks:__

success:
	event: Map
	
	{
		user: PFUser
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

###PFUserLogout()

__Arguments:__

void

__Returns:__
	
void

_____

###PFUserRequestPasswordResetForEmail( email )

__Arguments:__

email: String
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}
	

____

###PFUserRequestPasswordResetForEmailInBackground( Map )

__Arguments:__

Map:
	
	{
		email: String
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

____

###PFUserLoginWithFacebookInBackground( Map )

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

____

###PFQueryCreateUserObjectWithId( id )

__Arguments:__

id: String
	
__Returns:__
	
Map:	
	
	{
		user: PFUser or Null
		succeeded: Boolean
		errorCode: Number
		error: String
	}

____

###PFQueryCreateQueryForUser()

__Arguments:__

void

__Returns:__
	
PFQuery or Null

____

###PFQueryCreateQueryWithClassName( className )

__Arguments:__

className: string

__Returns:__
	
PFQuery or Null

____

###PFQueryCreateObjectOfClassAndId( Map )

__Arguments:__

Map:
	
	{
		objectClass: String
		objectId: String
	}	

__Returns:__
	
Map:	
	
	{
		object: PFObject or Null
		succeeded: Boolean
		errorCode: Number
		error: String
	}

____

###PFObjectCreateObjectWithClassName( className )

__Arguments:__

className: String

__Returns:__
	
PFObject or Null

____

###PFObjectSaveAll( objects )

__Arguments:__

objects: Array of PFObjects

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}

____

###PFObjectSaveAllInBackground( Map )

__Arguments:__

Map:	
	
	{
		objects: Array of PFObjects
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

____

###PFFileCreateFileWithNameAndData( Map )

__Arguments:__

Map:	
	
	{
		name: String
		data: TiBlob
	}

__Returns:__
	
PFFile or null

____

###PFFileCreateFileWithData( data )

__Arguments:__

data: TiBlob

__Returns:__
	
PFFile or null

____

###PFACLCreateACL()

__Arguments:__

void

__Returns:__
	
PFACL or null

____

###PFACLCreateACLWithUser( user )

__Arguments:__

user: PFUser

__Returns:__
	
PFACL or null

____

###PFGeoPointCreateGeoPoint()

__Arguments:__

void

__Returns:__
	
PFGeoPoint or null

____

###PFGeoPointCreateGeoPointWithLatitudeAndLongitude( latitude, longitude )

__Arguments:__

latitude: Number  
longitude: Number

__Returns:__
	
PFGeoPoint or null

____

###setDefaultTiBlobImageRepresentation( default )

The default without setting this is: `parseapi.kTiBlobImageDefaultPNG`

__Arguments:__

default: `parseapi.kTiBlobImageDefaultPNG` or `parseapi.kTiBlobImageDefaultJPG`

__Returns:__
	
void

____

###getTiBlobDefaultImageRepresentation()

__Arguments:__

void

__Returns:__
	
`parseapi.kTiBlobImageDefaultPNG` or `parseapi.kTiBlobImageDefaultJPG`

____

###willTiBlobBeSavedWithDefaultImageRepresentation( blob )

__Arguments:__

blob: TiBlob

__Returns:__
	
Boolean

____

###ParseiOSPushStoreDeviceToken( deviceToken )

####iOS Only

__Arguments:__

deviceToken: String	

__Returns:__
	
void

_____

###ParseiOSPushHandlePush( pushData )

####iOS Only

__Arguments:__

pushData: Map	

__Returns:__
	
void

_____

###ParseiOSPushSubscribeToChannel( channel )

####iOS Only

__Arguments:__

channel: String
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}
	

____

###ParseiOSPushSubscribeToChannelInBackground( Map )

####iOS Only

__Arguments:__

Map:
	
	{
		channel: String
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

###ParseiOSPushUnsubscribeFromChannel( channel )

####iOS Only

__Arguments:__

channel: String
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}
	

____

###ParseiOSPushUnsubscribeFromChannelInBackground( Map )

####iOS Only

__Arguments:__

Map:
	
	{
		channel: String
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

###ParseiOSPushSendPushMessageToChannel( Map )

####iOS Only

__Arguments:__

Map:	
	
	{
		channel: String
		message: String
	}
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}
	

____

###ParseiOSPushSendPushMessageToChannelInBackground( Map )

####iOS Only

__Arguments:__

Map:
	
	{
		channel: String
		message: String
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

###ParseiOSPushSendPushDataToChannel( Map )

####iOS Only

__Arguments:__

Map:	
	
	{
		channel: String
		data: Map of JSONType
	}
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}
	

____

###ParseiOSPushSendPushDataToChannelInBackground( Map )

####iOS Only

__Arguments:__

Map:
	
	{
		channel: String
		data: Map of JSONType
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

###ParseiOSPushGetSubscribedChannels()

####iOS Only

__Arguments:__

void	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		channels: Array of Strings
		errorCode: Number
		error: String
	}
	

____

###ParseiOSPushGetSubscribedChannelsInBackground( Map )

####iOS Only

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
		channels: Array of Strings
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

###FacebookRequestWithGraphPath ( path, params, httpMethod, callback )

####iOS Only

See this [Module's Guide](index.html) for more information

Graph API

__Arguments:__

path: String  
params: Map of JSONTypes or TiBlob  
httpMethod: String  
callback: Callback  
	

__Callbacks:__

callback:
	event: Map
	
	{
		success: Boolean
		result: Map of JSONTypes (The JSON Object Facebook returns)
		error: String
	}


__Returns:__
	
void

____

###FacebookRequest ( method, params, callback )

####iOS Only

See this [Module's Guide](index.html) for more information

OLD REST API request (deprecated)

__Arguments:__

method: String  
params: Map of JSONTypes or TiBlob  
httpMethod: String  
callback: Callback  
	

__Callbacks:__

callback:
	event: Map
	
	{
		success: Boolean
		result: Map of JSONTypes (The JSON Object Facebook returns)
		error: String
	}


__Returns:__
	
void

____

###FacebookDialog ( action, params, callback )

####iOS Only

See this [Module's Guide](index.html) for more information

__Arguments:__

action: String  
params: Map of JSONTypes or TiBlob  
callback: Callback
	

__Callbacks:__

callback:
	event: Map
	
	{
		success: Boolean
		cancelled: Boolean
		result: String (Query part of url)
		error: String
	}


__Returns:__
	
void

_____

###ParseAndroidPushSubscribeWithURL( channel, url )

####Android Only

__Arguments:__

channel: String  
url: String
	

__Returns:__
	
Boolean

_____

###ParseAndroidPushSubscribeWithClassName( channel, className )

####Android Only

__Arguments:__

channel: String  
className: String
	

__Returns:__
	
Boolean

_____

###ParseAndroidPushSubscribeWithActivity( channel, activity )

####Android Only

Activity is usually `Ti.Android.currentActivity`

__Arguments:__

channel: String  
activity: Titanium.Android.Activity 

__Returns:__
	
Boolean

_____

###ParseAndroidPushSubscribe( channel )

####Android Only

This is usually the same as calling: `ParseAndroidPushSubscribeWithActivity( channel, Ti.Android.currentActivity )`

__Arguments:__

channel: String	

__Returns:__
	
Boolean

_____

###ParseAndroidPushUnsubscribe( channel )

####Android Only

__Arguments:__

channel: String	

__Returns:__
	
Boolean

_____

###ParseAndroidPushGetSubscriptions( )

####Android Only

__Arguments:__

void

__Returns:__
	
Array of Strings

_____

###ParseAndroidPushClearAllNotifications( )

####Android Only

This is a helper function which will clear all the notifications from the status bar.

__Arguments:__

void

__Returns:__
	
void

_____

###ParseAndroidPushSetupDefaultActionReceiver( action, defaultCallback )

####Android Only

This helps you setup in-app notifications. The event in the callback is an android intent.  [More Info on Intents](http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.Android.Intent-object)

__Arguments:__

action: String  
defaultCallback: Callback

__Callbacks:__

defaultCallback:
	event: Map
	
	{
		intent: Titanium.Android.Intent
	}

__Returns:__
	
void

_____

###ParseAndroidPushRegisterDefaultActionReceiver( )

####Android Only

This is a helper function to enable in app notifications when the android activity resumes.

__Arguments:__

void

__Returns:__
	
void

_____

###ParseAndroidPushUnregisterDefaultActionReceiver( )

####Android Only

This is a helper function to disable in app notifications when the android activity is paused.

__Arguments:__

void

__Returns:__
	
void


_____

###ParseAndroidPushSendPushMessageToChannel( Map )

####Android Only

__Arguments:__

Map:	
	
	{
		channel: String
		message: String
		pushToAndroid: Boolean //defaults to true
		pushToIOS: Boolean //defaults to false
	}
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}
	

____

###ParseAndroidPushSendPushMessageToChannelInBackground( Map )

####Android Only

__Arguments:__

Map:
	
	{
		channel: String
		message: String
		success: Callback
		error: Callback
		pushToAndroid: Boolean //defaults to true
		pushToIOS: Boolean //defaults to false
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

###ParseAndroidPushSendPushDataToChannel( Map )

####Android Only

__Arguments:__

Map:	
	
	{
		channel: String
		data: Map of JSONType
		pushToAndroid: Boolean //defaults to true
		pushToIOS: Boolean //defaults to false
	}
	

__Returns:__
	
Map:	
	
	{
		succeeded: Boolean
		errorCode: Number
		error: String
	}
	

____

###ParseAndroidPushSendPushDataToChannelInBackground( Map )

####Android Only

__Arguments:__

Map:
	
	{
		channel: String
		data: Map of JSONType
		success: Callback
		error: Callback
		pushToAndroid: Boolean //defaults to true
		pushToIOS: Boolean //defaults to false
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


____
____
##Properties


###FacebookSessionIsValid

####iOS Only

__Getter:__
	
Boolean

###FacebookSessionExpirationDate

####iOS Only

__Getter:__
	
Date

###ParseHasFacebookApplicationId

__Getter:__
	
Boolean

____
____
##TiBlob Default Image Representations

###kTiBlobImageDefaultPNG

###kTiBlobImageDefaultJPEG
____
____
##Error Code Properties

These can be used to compare against the `errorCode` returned in all the Module functions.

Code: Description

###kParseErrorInternalServer

1: Internal server error. No information available. 

###kParseErrorConnectionFailed

100: The connection to the Parse servers failed. 

###kParseErrorObjectNotFound

101: Object doesn't exist, or has an incorrect password. 

###kParseErrorInvalidQuery

102: You tried to find values matching a datatype that doesn't support exact database matching, like an array or a dictionary.

###kParseErrorInvalidClassName

103: Missing or invalid classname. Classnames are case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the only valid characters. 

###kParseErrorMissingObjectId

104: Missing object id. 

###kParseErrorInvalidKeyName

105: Invalid key name. Keys are case-sensitive. They must start with a letter, and a-zA-Z0-9_ are the only valid characters.  

###kParseErrorInvalidPointer

106: Malformed pointer. Pointers must be arrays of a classname and an object id.

###kParseErrorInvalidJSON

107: Malformed json object. A json dictionary is expected.  

###kParseErrorCommandUnavailable

108: Tried to access a feature only available internally.  

###kParseErrorIncorrectType

111: Field set to incorrect type.

###kParseErrorInvalidChannelName

112: Invalid channel name. A channel name is either an empty string (the broadcast channel) or contains only a-zA-Z0-9_ characters and starts with a letter. 

###kParseErrorInvalidDeviceToken

114: Invalid device token. 

###kParseErrorPushMisconfigured

115: Push is misconfigured. See details to find out how.

###kParseErrorObjectTooLarge

116: The object is too large. 

###kParseErrorOperationForbidden

119: That operation isn't allowed for clients.

###kParseErrorCacheMiss

120: The results were not found in the cache. 

###kParseErrorInvalidNestedKey

121: Keys may not include '$' or '.'.

###kParseErrorInvalidFileName

122: Invalid file name. A file name contains only a-zA-Z0-9_. characters and is between 1 and 36 characters.

###kParseErrorInvalidACL

123: Invalid ACL. An ACL with an invalid format was saved. This should not happen if you use PFACL.

###kParseErrorTimeout

124: The request timed out on the server. Typically this indicates the request is too expensive.

###kParseErrorInvalidEmailAddress

125: The email address was invalid.


____

###kParseErrorUsernameMissingError

200: Username is missing or empty 

###kParseErrorUserPasswordMissingError

201: Password is missing or empty 

###kParseErrorUsernameTakenError

202: Username has already been taken 

###kParseErrorUserEmailTakenError

203: Email has already been taken

###kParseErrorUserEmailMissing

204: The email is missing, and must be specified

###kParseErrorUserWithEmailNotFound

205: A user with the specified email was not found 

###kParseErrorUserCannotBeAlteredWithoutSession

206: The user cannot be altered by a client without the session. 

###kParseErrorUserCanOnlyBeCreatedThroughSignUp

207: Users can only be created through sign up

###kParseErrorFacebookAccountAlreadyLinked

208: An existing Facebook account already linked to another user.

###kParseErrorUserIdMismatch

209: User ID mismatch

###kParseErrorFacebookIdMissing

250: Facebook id missing from request 

###kParseErrorFacebookInvalidSession

251: Invalid Facebook session 

____
##Custom Error Constants (Not From Parse API)

###kParseErrorUserWrongCredentials

7000: Wrong Username & Password combination

###kParseErrorQueryNoObjectsFound

7001: No Objects Found with Query

###kParseErrorFacebookLoginCancelled

7002: User Cancelled Facebook Login/SignUp

###kParseErrorMissingOrInvalidArguments

8000: Missing or Invalid Arguments

###kParseErrorFunctionDidNotSucceed

8001: Function Did Not Succeed

____
____
##ParseCachePolicy Constants

These constants can be passed to the `PFQuery.cachePolicy` getter and setter. [PFQuery Reference](./pfqueryreference.html)


###kParseCachePolicyIgnoreCache

The query does not load from the cache or save results to the cache.
kParseCachePolicyIgnoreCache is the default cache policy. 

###kParseCachePolicyCacheOnly

The query only loads from the cache, ignoring the network.   
If there are no cached results, that causes an error.


###kParseCachePolicyNetworkOnly

The query does not load from the cache, but it will save results to the cache.  

###kParseCachePolicyCacheElseNetwork

The query first tries to load from the cache, but if that fails, it loads results from the network.   
If neither cache nor network succeed there is an error.

###kParseCachePolicyNetworkElseCache

The query first tries to load from the network, but if that fails, it loads results from the cache.   
If neither network nor cache succeed, there is an error. 

###kParseCachePolicyCacheThenNetwork

The query first loads from the cache, then loads from the network.   
In this case, the callback will actually be called twice - first with the cached results, then with the network results.   
Since it returns two results at different times, this cache policy cannot be used synchronously with findObjects.

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
