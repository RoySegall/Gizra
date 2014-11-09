---
title: "Headless Drupal, One form at a time"
tags: 
  - Headless Drupal
  - RESTful
  - The Gizra Way
  - "Drupal-planet"
layout: post
permalink: "/content/restful-angular-forms"
published: true
---

{% include setup %}

* Form API is great, but Form API is hard when you try to do fancier stuff - like wizards and other things that clients often want.
* Angular forms are great, but Angular forms are hard too - you need to write your own custom endpoints and server side validation.

But now that [RESTful](https://github.com/Gizra/restful) integrates with Entity Validator, I would change the equation and simply say something rarely heard in the Drupal community: Forms are Fun!

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/restful-angular-forms/angular-form.gif" />
  <div class="caption">This form is not Form API, it's angular!</div>
</div>

Go ahead, [try it](https://github.com/Gizra/restful/blob/7.x-1.x/modules/restful_angular_example/README.md#test-on-simplytestme-recommended) yourself on simplyTest.me

<!-- more -->

The [example](https://github.com/Gizra/restful/tree/7.x-1.x/modules/restful_angular_example) module shows how all the HTML, CSS, and JS are bundled together in an Angular App, and Drupal simply ng-includes it.

The tricky part is the server side validation, which is now handled by Entity Validator module. And of course the endpoint itself is handled by RESTful which does a lot of the heavy lifting by taking care of authentication, permissions, CSRF tokens, exposing the RESTful resource etc.

Developers would appreciate the very little code needed to declare the [validation](https://github.com/Gizra/entity_validator/blob/7.x-1.x/modules/entity_validator_example/plugins/validator/node/article/EntityValidatorExampleArticleValidator.class.php) and the RESTful [resource](https://github.com/Gizra/restful/blob/7.x-1.x/modules/restful_example/plugins/restful/node/articles/1.5/RestfulExampleArticlesResource__1_5.class.php).

As a benefit, since RESTful spits out structured error messages, displaying error messages inline is really simple.

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/restful-angular-forms/image1.jpg" />
  <div class="caption">Detailed errors are part of the JSON response</div>
</div>

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/restful-angular-forms/image2.jpg" />
  <div class="caption">Inline errors, provide a better UX</div>
</div>

In Gizra we already have projects where we don't use any node form to create or edit content. Everything is implemented in a slick Angular based UI - one that users _enjoy_ using.

Headless Drupal isn't in the future. It's here, and you can start using it with test-covered and OOP modules like RESTful and [Zariz](https://github.com/Gizra/zariz).