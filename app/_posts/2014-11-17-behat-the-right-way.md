---
title: "Behat - The Right Way"
tags:
  - Headless Drupal
  - Behat
  - "Drupal-planet"
permalink: "/content/restful-discovery"
layout: post
published: true
---

{% include setup %}

[Behat](http://docs.behat.org/en/v2.5/) is a wonderful tool for automatic testing. It allows you to write your user stories and scenarios in proper English, which will be recognized by Behat and transformed to a set of clicks or other operations that mimic a real user.

If you don't have a test on your project, I would argue that your are doing it wrong. (See my [The Gizra Way](https://www.getpantheon.com/blog/drupal-development-gizra-way) presentation where I explain why). Even having a _single_ test would be much better than none.

With that said, it's super easy to abuse Behat. We are developers and we are thinking similar to machines (not really, but you get my point). If you would like to test login to your site you could easily do

```cucumber
Given I visit "/user/login"
# fill the username and password input fields, and click submit
 When I fill "username" with "foo"
  And I fill "password" with "bar"
  And I press "Login"
 Then I should get a "200" HTTP response
```

Your test will return green, but it could be improved:

<!-- more -->

```cucumber
Given I login with an "authenticated" user
 When I go to the homepage
 Then I should have access
```

As you see we are avoiding writing _scripted_ tests, and try to describe what should happen -- not the clicks that got us there.

Meta steps are a great way to help you write your step definition (i.e. each line that is translated to code) with reusable code. So for example

```cucumber
Given a group "Public Group 1" with "Public" access is created with group manager "group1-admin"
```

Would be defined as:

```php
<?php

/**
 * @Given /^a group "([^"]*)" with "([^"]*)" access is created with group manager "([^"]*)"$/
 */
public function aGroupWithAccessIsCreatedWithGroupManager($title, $access, $username, $domains = NULL, $moderated = FALSE, $organizations = array()) {
  // Generate URL from title.
  $url = strtolower(str_replace(' ', '-', trim($title)));
  $steps = array();

  // Login with existing users.
  $steps[] = new Step\When('I am logged in as user "'. $username .'"');
  $steps[] = new Step\When('I visit "node/add/group"');

  // Set the title and body fields.
  $steps[] = new Step\When('I fill in "title" with "' . $title . '"');
  $steps[] = new Step\When('I fill in "edit-body-und-0-summary" with "Some text"');

  // ... Do any logic needed.

  return $steps;

  }
```

Also, we avoid harcoding any URL, so instead of writing ``When I visit node/1``
we could write ``When I visit "Public Group 1" of type "group"`` and write some
code to find the node by the title and redirect us there.

```php
<?php

/**
 * @When /^I visit "([^"]*)" node of type "([^"]*)"$/
 */
public function iVisitNodePageOfType($title, $type) {
  $query = new entityFieldQuery();
  $result = $query
    ->entityCondition('entity_type', 'node')
    ->entityCondition('bundle', strtolower($type))
    ->propertyCondition('title', $title)
    ->propertyCondition('status', NODE_PUBLISHED)
    ->range(0, 1)
    ->execute();

  if (empty($result['node'])) {
    $params = array(
      '@title' => $title,
      '@type' => $type,
    );
    throw new Exception(format_string("Node @title of @type not found.", $params));
  }

  $nid = key($result['node']);
  // Use Drupal Context 'I am at'.
  return new Given("I go to \"node/$nid\"");
}
```

Behat allows you to create a __clean interface__ to your system, without having your internal implementation leak out. Just like RESTful is doing, but this time it's done from the testing side instead of the API side.

## CasperJs Vs Behat

Testing of Javascript code requires using PhantomsJs ([here's](Testing of Javascript code is done with PhantomJS) a quick wiki on how to install it).
@juampy from Lullabot has recommended in his [blog post](https://www.lullabot.com/blog/article/testing-front-end-casperjs) to use CasperJs to test JS. I think Behat would be better for this simple reason:

In Casper the tests are written by developers, and read by developers.
In Behat, on the other hand, the tests MAY be read by your client as-well (I won't try to claim a client will write ones, as I don't believe it's the usually the case).

No (typical) client will enjoy reading

```javascript
casper.test.begin('Tests homepage structure', 7, function suite(test) {

  casper.start('http://www.msnbc.com', function() {
    // Verify that the main menu links are present.
    test.assertExists('a.j-signin-label', '"Sign in" link is found.');
    test.assertExists('a.j-register-label', '"Sign up" link is found.');
    test.assertExists('li.main-nav__link--explore a', '"Explore" link is found.');
    test.assertExists('li.main-nav__link--watch a', '"Watch" link is found.');
    test.assertExists('li.main-nav__link--join-in a', '"Join In" link is found.');
    test.assertExists('li.main-nav__link--speak-out a', '"Speak Out" link is found.');
    // 10 articles should be listed.
    test.assertElementCount('article', 10, '10 articles are listed.');
  });

  casper.run(function() {
    test.done();
  });
});
```

But they might be able to appreciate this in Behat

```cucumber
@javascript
Scenario: Validate an anonymous user can see all links, and a list of articles.
  Given I am an anonymous user
   When I visit the homepage
   Then I should see anonymous related links
    And I should see a teaser of recent articles
```

Behat's underlying code in the end will be very close to the one in CasperJS - however it better defined _what_ is needed, not only how it should appear.


## Headless Drupal

As we are working on decoupled backend and frontend, we still want to have our code properly tested.
A nice technique we've been using is installing the backend (Drupal) and frontend (Angular webapp) on the same Travis instance and running Behat tests on the frontend. By having the backend present we don't need to mock any data just for the frontend, as we already have some dummy migrated data as part of every installation profile.

For the brave, see our [.travis](https://github.com/Gizra/negawatt-server/blob/master/.travis.yml) configuration that runs both API and Javascript tests on our fully decoupled app. Note that the linked project is no where to be considered ready, but it can still be valuable to people who want to see how we got Travis to run our tests.
