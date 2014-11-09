---
title: "Headless Drupal - Form API, Drupal 9"
tags: 
  - Headless Drupal
  - The Gizra Way
  - AngularJs
  - RESTful
  - "Drupal-planet"
permalink: "/content/headless-drupal-form-api-drupal9"
layout: post
published: true
---

{% include setup %}

## Defining moment

A few months ago my DrupalCon Austin session was rejected. I was a bit upset, since presenting plays a big part in my trip to the states, and also surprised, as I mistakenly assumed my presentation repertoire would almost guarantee my session would be accepted. But the committee decided differently.

This has been an important moment for me. Two days later I told myself I don't care. I mean, I cared about the *presentation*, I just stopped caring that it was not selected, since I decided I was going to do it anyway. As an "unplugged" BoF.

[The Gizra Way](https://www.getpantheon.com/blog/drupal-development-gizra-way). I think this is probably the best presentation I've given so far, and quite ironically my *rejected* session is second only to Dries's keynote in YouTube.

You see - I had a "[there is no spoon](https://www.youtube.com/watch?v=dzm8kTIj_0M)" moment. The second I realized it can be done differently, I was on my own track, perhaps even setting the path for others.

## Form API, Drupal 9

> I use Drupal because Form API is so great <div class="small">No one, ever</div>

<!-- more -->

Form API is the unbent spoon. Yes, I can appreciate its role, and how it improved security and extensibility. But nowadays I think we might have better alternatives, which are more inline with where the web is heading. 

Maybe we should stop thinking about forms as forms.  

Maybe Drupal should spit a JSON, that AngularJS (or another library) can leverage to build its dynamic input fields. Those forms don't need to be written manually, we could use something like [Angular Autofields](http://justmaier.github.io/angular-autoFields-bootstrap/#demo) (the concept, not necessarily the code).

Drupal's strength is in its entity and field API. It's so easy to create structured data. If we stopped thinking about forms as forms, and moved to thinking about them as a *RESTful interface* to the underlying entity, then suddenly it's easier to bend the spoon. In fact, the spoon might no longer be there.

## Best practices need to be practiced

Headless Drupal is a hot topic. We're trying to figure how it will be used for Drupal 8. Some even plan for Drupal 9. I'd like to suggest something else - Let's do it now.

I'll explain: The concept of Headless Drupal by itself is pretty simple. Send JSON from the server, and use that in the client side. So how come we're not seeing everybody move to fully/semi decoupled sites?  

I think the answer to that is that we're still lacking the best practices. Everybody can declare a ``hook_menu()`` and send a JSON response, but unless there are best practices and some sort of standardization few people will, as it will require re-inventing the wheel over and over again.

This is where the [RESTful](https://github.com/Gizra/restful) module, and our Headless Drupal post series comes in. We're trying to fill the gap of those missing best practices, and do that in real life scenarios, for websites developed and deployed today.

That's without neglecting the future, of course - we plan to upgrade RESTful to Drupal 8, since it has some different concepts than Drupal 8's REST module.

## Less Theory, More Code

Ok, so back to the fun geeky stuff, as the headless series [continues]({{BASE_PATH}}/content/headless-drupal-inline-edit/).

This time we'll see how RESTful deals with a common scenario - a node referencing taxonomy terms. The Select2 library provides us with a nice UI, which allows selecting existing terms as well as creating new ones: 

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/headless-drupal-form-api-9/image1.gif" />
  
  <div class="caption">
    AngularJS form with Select2 in action
  </div>
</div>

An interesting part of the example is that the creation of the multiple entities (i.e. the node and the taxonomy terms) is done in a *single* HTTP request. The sub resources (in our example the taxonomy terms), are POSTed or PATCHed / PUT as needed.

As always, you can play with the [live demo](http://test-gizra-headless-drupal-inline-edit.gotpantheon.com/restful-example/form).