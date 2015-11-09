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

When talking on traditional Drupal site we don’t need to handle authentication -
Drupal got our back. We know the process - a user submit the login form, get’s a
cookie and start using your awesome site. But what about decoupled sites? How
can we authenticate the user?

Before diving into that part we need to understand the authentication types
provided by restful:

  1. CSRF token - CSRF token used to make sure a cookie was not stolen by XSS
  hacking.
  2. Access token - Restful will generate an access token and bind it to the
  user.

The tokens will be passed in the request header. Another important thing: In
order to use access token authentication you’ll need to enable the module
`restful_token_auth`.

<!-- more -->

Generating the access token

I’ll display how to generate an access token using Angular js. The access token will be in the end point api/login-token. If the authentication process will pas the end point will return an object with 3 important values:

  1. access_token - This is the token which represent the user in any rest request.
  2. expires_in - Amount of seconds in which the access token is valid.
  3. refresh_token - Once the the amount of seconds reached to maximum the refresh token isn't not valid any more. You'll need to ask for a new one using the refresh token

You can see below a small Angular JS code:

```javascript
$http.get('http://localhost/drupal/api/login-token', {
  headers: {'Authorization': 'Basic ' + Base64.encode($scope.user.name + ':' + $scope.user.pass)}
}).success(function(data) {
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

Refreshing access token
As mentioned above the access token only valid for specific amount of seconds, usually a day, and you’ll need to check in each page refresh:

```javascript
if (new Date().getTime() > localStorageService.get('expire_in')) {
  $http.get('http://localhost/drupal/refresh-token/' + localStorageService.get('refresh_token')).success(function(data) {
    localStorageService.set('access_token', data.access_token);
    localStorageService.set('refresh_token', data.refresh_token);
    localStorageService.set('expire_in', new Date().getTime() + data.expires_in);
  });
}
```
