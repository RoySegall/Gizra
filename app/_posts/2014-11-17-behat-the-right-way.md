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

<img src="/assets/images/posts/restful-discovery/image1.jpg" />
