---
title: RESTful module
tags:
  - RESTful
  - AngularJs
  - "Drupal-planet"
permalink: "/content/restful-server"
layout: post
published: true
---


[RESTful module](https://github.com/Gizra/restful#restful-best-practices-for-drupal) is a new approach to providing a REST server in Drupal. Its concepts and philosophy appears in the module's README so I won't repeat it, but I'd like to go over some of the key points.

```php
<?php
// Handler v1.0
$handler = restful_get_restful_handler('articles');
// GET method.
$result = $handler->get(1);

// Output:
array(
  'id' => 1,
  'label' => 'example title',
  'self' => 'https://example.com/node/1',
);

// Handler v1.1 extends v1.0, and removes the "self" property from the
// exposed properties.
$handler = restful_get_restful_handler('articles', 1, 1);
$result = $handler->get(1);

// Output:
array(
  'id' => 1,
  'label' => 'example title',
);
?>
```

In the past year almost every site we have is either completely decoupled from the server side where AngularJs serves the webapp, or AngularJS plays a smaller part, and we just embed web components inside a Drupal page to provide a slick UI.

Up until now our go to module was RestWs by the wonderful Klausi, which wraps around Entity API module's metadata wrapper. Basically, it hands over to the metadata wrapper the responsibility for the access and for the actual value it spits out.
It works fine, however the JSON it exposes has too much information.

<!-- more -->

Obviously, RestWs allows us to alter the JSON, but then we saw other problems. Drupalism. As the client - the one that consumes the JSON - you should know that an article is a node entity, and that tags are taxonomy terms. And all the fields are prefixed with ``field_``. And on top of that, once we expose an entity (e.g. node) - all the bundles are exposed by default.

After trying to impose Gizra's requirements to RestWs and Services Entity, we've realized that the concepts were different enough to start a new module - but of course we learned a lot from the other modules.
The goal of RESTful module is to allow us to expose a _versionable_ API which is as good as Github, or Flickr, or any other proper REST service (just imagine if Github would force you to enter the bundle of a node, or would expose the repository name under ``field_repository``).

Another important aspect of RESTful is that it does _not_ try to be a pure REST server. No. We're not writing a thesis, we are writing a web application, so we prefer to follow [best practices](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api) rather then reaching "restful glory".

Following our standard of bundling the module with an [example module](https://github.com/Gizra/restful/tree/7.x-1.x/modules/restful_example), you can enable it, and create a few article nodes.
Visit ``/api/v1/articles`` to see a list of articles, or ``/api/v1/articles/1`` to view article with ID 1.
The code that is responsible for this restful ``resource`` is a CTools plugin which should be pretty easy for developers to setup.
Another good resource for developers to see the capabilites that are present so far, is following the [test suite](https://github.com/Gizra/restful/tree/7.x-1.x/tests).
