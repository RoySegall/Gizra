---
title: Let’s talk about authentication
tags:
  - Restful
permalink: "/content/restful-access-token"
layout: post
published: true
author: RoySegall
---

{% include setup %}

When talking on a traditional Drupal site we don’t need to handle authentication
- Drupal got our back: a user submit the login form, get a cookie and start
using your awesome site. But what about decoupled sites? How can we authenticate
the user?

Before diving into that part we need to understand the authentication types
provided by restful:

  1. CSRF token - Used to make sure a cookie was not hijacked by XSS.
  2. Access token - Restful will generate an access token and bind it to the
  user.

<!-- more -->

Another important thing: in order to use access token authentication you’ll need
to enable the module `restful_token_auth`.

#Generating the access token#

I’ll display how to generate an access token using Angular JS. If the
authentication process will pass, the end point will return an object with 3
values:

  1. access_token - This is the token which represent the user in any request.
  2. expires_in - The amount of seconds in which the access token is valid.
  3. refresh_token - Once the the token is no longer valid you'll need to ask
  for a new one using the refresh token.

You can see below a small Angular JS code:

```javascript
$http.get('http://localhost/drupal/api/login-token', {
  headers: {
    'Authorization': 'Basic ' + Base64.encode(username + ':' + password)
  }
})
.success(function(data) {
  localStorageService.set('access_token', data.access_token);
});
```

And this is what you’ll get back:

```json
{
  "access_token": "Y3wQua-qFY-mukslgPaLqKdNmlGdBQK4dly-UhlJcYk",
  "type": "Bearer",
  "expires_in": 86400,
  "refresh_token": "xRP-nnKA05GGsN-jr80Z_hfPHqrkpyjAtevDSeTLbYU"
}
```

#Refreshing access token#
As mentioned above the access token only valid for specific amount of seconds,
usually 24 hours, and you’ll need to check it before the request:

```javascript
if (new Date().getTime() > localStorageService.get('expire_in')) {
  var refresh_token = localStorageService.get('refresh_token');
  $http.get('http://localhost/drupal/refresh-token/' + refresh_token)
  .success(function(data) {
    localStorageService.set('access_token', data.access_token);
    localStorageService.set('refresh_token', data.refresh_token);
    localStorageService.set('expire_in', new Date().getTime() + data.expires_in);
  });
}
```

#Using the access token#
OK. We got the access token and we can refresh it when it's no longer valid. The
next thing you need to know is how inject the access token to the header:

```javascript
$http.post('http://localhost/drupal/api/article', {
  headers: {
    'access-token': localStorageService.get('access_token')
  },
  data: {
    'label': 'foo'
  }
})
.success(function(data) {
  console.log('Cool! You posted a new article.');
});
```
