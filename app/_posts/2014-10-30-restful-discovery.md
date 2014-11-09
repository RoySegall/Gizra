---
title: "RESTful Discovery - Who knows about your API?"
tags:
  - Headless Drupal
  - RESTful
  - "Drupal-planet"
permalink: "/content/restful-discovery"
layout: post
published: true
---

{% include setup %}

As extremely pedantic developers we take documenting our APIs very seriously. It's not rare to see a good patch rejected in code review just because the PHPdocs weren't clear enough, or a ``@param`` wasn't declared properly.

In fact, I often explain to junior devs that the most important part of a function is its signature, and the PHPdocs. The body of the function is just "implementation details". How it communicates its meaning to the person reading it is the vital part.

But where does this whole pedantic mindset got when we open up our web-services?  
I would argue that at least 95% of the developers who expose their web-service simply enable RESTws without any modifications. And here's what a developer implementing your web-service will see when visiting ``/node.json``:

<!-- more -->

<img src="/assets/images/posts/restful-discovery/image1.jpg" />

Even if the reader knows that nodes are in ``node.json`` (and what "node" means in Drupal-world in general) they are ultimately presented with some resource they have very little knowledge about, nor necessarily know where to learn more.

So all the effort we put into our internal API, trying our best to make it readable to outside developers, is completely missing from the public REST API.

[RESTful](https://github.com/Gizra/restful) has recently taken some important steps towards improving. When you visit ``/api`` all the resources accessible to you would be listed:

<img src="/assets/images/posts/restful-discovery/image2.jpg" />

Clicking on one of the resources will lead you to the resource itself. To get some insight into the resource you can call it with the ``OPTIONS`` HTTP method and get all the allowed HTTP operations along with the schema of the properties.

It's now possible to start imagining an Angular client that will be able to "crawl" your API and create CRUD pages for you.

<img src="/assets/images/posts/restful-discovery/image3.jpg" />

The neat part about this discovery functionality is that it's actually a regular RESTful resource in itself! By creating a CTools plugins data provider, we are now able to list all our plugins (and as a bonus get to do some stuff like query all the RESTful plugins with minor version above 5).

Another change in RESTful is that you have multiple options to call a _versioned_ resource.

Set version via URL: ``https://example.com/api/v1.1/articles``  
Set version via HTTP headers: ``curl https://example.com/api/articles/1 -H "X-API-Version: v1.1"``  

In fact, you can omit the version altogether, use ``https://example.com/api/articles``  and the latest resource would be used. RESTful is kind enough to return the version used in the response header, so you will still know exactly which resource responded.

Next on our agenda is making RESTful truly [HAL](http://stateless.co/hal_specification.html). There's an interesting conversation in RESTful about whether HAL the right choice. I'd like to highlight two points I find important in the conversation:

1. Since RESTful is challenging quite a few "this is how its always been done", it was no surprise we were asking if HAL is the right choice
1. A great answer to why HAL _is_ the right choice was given by Michal Minecki (@mirzu). I'd like to quote the part that has sealed the deal for me:

> My biggest reason for pushing for HAL is that it's somewhat popular and is going to be the basis for D8, not because it's beautiful. It's not. It's just good enough, and popular. If it sucked and was popular I'd say ditch it.

As always, I'd like to encourage you to give [RESTful](https://github.com/Gizra/restful) a go, and share your findings with us, so we can all learn from each other's experience.
