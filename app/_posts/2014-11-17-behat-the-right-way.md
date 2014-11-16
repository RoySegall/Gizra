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

Behat is a wonderful tool for automatic testing. It allows you to write your user stories and the scenarios in
proper English, which will be recognized by Behat and transformed to a set of clicks or other operations that mimic a real user.

If you don't have a test on your project, I would argue that your are doing it wrong. (See my "The Gizra Way" presentation where I explain why). Even having a _single_ test would be much better than none.

With that said, it's super easy to abuse Behat. We are developers and we are thinking similar to machines (not really, but you get my point). If I would like to test login to my site I could easily do

```behat
Given I visit "/user/login"
When I
Then I should get a 200 response
```

Your test will return green, but it could be improved

<!-- more -->

```behat
Given I login with an "authenticated" user
When I go to the homepage
Then I should have access
```

As you see we are avoiding writing scripted tests, and try to describe what should happen -- not the clicks that got us there.

Meta steps are a great way to help you write your step defintion (i.e. each line that is translated to code).
So for example

```behat
Given a group "My bad hair day new group 1" with "Public" access is created with group manager "turing"``
When I visit "My bad hair day new group 1" of type "group"
```

```php
  /**
   * @Given /^a group "([^"]*)" with "([^"]*)" access is created with group manager "([^"]*)"$/
   */
  public function aGroupWithAccessIsCreatedWithGroupManager($title, $access, $username, $domains = NULL, $moderated = FALSE, $organizations = array()) {
    // Generate URL from title.
    $url = strtolower(str_replace(' ', '-', trim($title)));
    $steps = array();
    $steps[] = new Step\When('I am logged in as user "'. $username .'"');
    $steps[] = new Step\When('I visit "node/add/group"');
    $steps[] = new Step\When('I fill in "title" with "' . $title . '"');
    $steps[] = new Step\When('I fill in "edit-c4m-body-und-0-summary" with "This is default summary."');
    $steps[] = new Step\When('I fill in "edit-purl-value" with "' . $url .'"');
    $steps[] = new Step\When('I select the radio button "' . $access . '"');

    return $steps;

    }
```

Would be translated to

```php
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

<img src="/assets/images/posts/restful-discovery/image1.jpg" />
