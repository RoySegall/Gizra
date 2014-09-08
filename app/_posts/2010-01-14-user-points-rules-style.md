---
tags:
- Drupal-planet
permalink: /content/user-points-rules-style/
title: User points - Rules style
created: 1263465898
layout: post
---
<a href="http://www.nicklewis.org/40-essential-drupal-6-modules">Nick Lewis</a> wrote about his 40+ essential modules, and I really missed two modules there - Rules and Flag.
I commented that
<blockquote>
My top 5 are: Views, CCK, Flag, Rules, Panels. I think that the Flag & Rules combo is less known in the community, but there are so many use cases they can cover. Because they are a bit abstracted it's hard for newbies to realize their potential.
</blockquote>

I think there's no better way to show my point, than a tutorial. Lazy people can even download the feature from <a href="http://www.gizra.com/sites/default/files/user_points_rules.tar_.gz">here</a>. This tutorial will be about having "User points" functionality without using the user points module. I'm not saying that module is bad, but sometimes I need multiple user points per user. Also, re-using existing modules always feels me with great joy. GREAT joy! Also, thinking about Drupal 7 with fields API, suddenly _user points can become _any-fieldable-entity points...
The tutorial will cover the "Rule sets" concept in Rules module, which is also considered by many as a great mystery. Let's define our mission:

<!-- more -->

<ol>
<li>Every time a user creates a story content type, one point is deducted</li>
<li>When no points are left, user should not be able to create more stories</li>
<li>Upon content profile creation, the user receives three points</li>
<li>Site admin should be able to "reset" the points of users back to three points</li>
</ol>

If your eyes no longer see the above list as words, but as Drupal modules, then you probably think CCK, Content profile, Rules and Flag.
We will add a content profile to each user. That profile will have a CCK field that will hold the user points. When user points reach zero, a "story editor" role will be removed from the user - denying access to creating new story content.
For "reseting" the user points, we will use a flag on the user, that a site admin can click on.
First preparations:
<ol>
<li>Download and enable modules (is there still anybody not using Drush?)
```
drush dl cck content_profile rules flag-6.x-2.x-dev features ctools strongarm-6.x-2.0-beta3
drush en -y content number content_permissions content_profile rules rules_admin flag features php ctools strongarm
```
</li>
<li>Make the new "Profile" content type a user profile through _admin/content/node-type/profile >> Content Profile >> Use this content type as a content profile for users</li>
<li>Add a new Integer type field called _field_user_points to the profile content type</li>
<li>In _admin/user/roles add a new role called "story editor".</li>
<li>We should carefully take care of the permissions. In _admin/user/permissions - allow "authenticated user" role to _view  field_user_points and _create profile content; and allow "story editor" role to _create story content</li>
</ol>

Before we set up our logic using Rules Let's go over a bit about the concept of "Rule sets".
You should think of a rule sets as an API function. That function gets arguments and processes them. It's up to an implementing module to use the API function properly. Like API functions rule sets are there in order to prevent duplication and to centralize actions. Let's make the idea clear by thinking about points 1 and 2 in our mission. We have here two rules - one will deduct points from the user's profile, and the other should remove the "story editor" role.

We could create two triggered rules both with the event "After saving new content", and check in both rules that the content type is story. As you can see, there's a duplication in the event and in the conditions. If our logic will change and be more complex the duplication might increase.

So, for such a case we will use the rule sets. We'll define two arguments that are mandatory one is a node, in which we'll pass the content profile. The other is the user. If you are a developer then think of it as _function user_points_logic($profile_content, $account).

In this rule sets we will add our two rules without even bothering to check if the new created content is indeed "story". For that we'll have a third rule, that will not be a rule inside a rule sets, but a triggered rule. This rule will be executed "After saving new content", will check the condition of the content type is story, and then willload the user's profile content and invoke our rule sets.

In terms of code, think of it as calling _user_points_logic() from _hook_nodeapi() upon node insert. Now that the concept should be clear, let's see how we do it:

<ol>
<li>Make sure you enabled the "PHP filter" core module, as we'll need few lines of PHP</li>
<li>Add a new rule sets (_admin/rules/rule_sets) labeled "User points" with _content and _user arguments.</li>
<li>Add a new rule in the "User points" rule sets labeled "Deduct points on story creation" and add the action _Populate a field, select the field _field_user_points and continue</li>
<li>Under "Advanced: Specify the fields value with PHP code" enter the following code (without the ```<?php ?>``` delimiters):

```php
<?php
// Current user points.
$current_points = $profile_node->field_user_points[0]['value'];

// Remove one point.
return array(
  // Rules will make sure the content profile is saved
  // after all rules have finished executing.
  0 => array('value' => ($current_points - 1)),
);
?>
```
</li>
<li>Create the second rule in the rule sets labeled "Remove role when no user points left" with the condition _Field has value, and again select _field_user_points. In the field value enter 0</li>
<li>Add action _Remove user role and select "story editor" role</li>
<li>Points 1 and 2 in our mission are almost complete, we only need to call the rule sets when appropriate. Create a triggered rule (_admin/rules/trigger) labeled "Invoke user points" with the event _After saving new content (we don't want to deduct point when user is just updating an existing content). Add condition _Content has type to check it's a story. Add action _Load content profile and make sure the argument _User, whose profile should be loaded is set to _content's author - we do that as the _acting user might be an admin manually creating a new user. Second action is _User points which is our rule sets. Also here make sure you pass the correct arguments (i.e. _content profile for the content argument and _content's author for the user argument).</li>
</ol>

The implementation of "reset" points and grant points on user registration is similar in concept to our previous mission. We create a rule sets labeled "User points grant" which will set the field value to 3 and grant "story editor" role. This rule sets will be called from two different triggered rules - once upon content profile creation, and second when a site admin will "reset" the user points. How will the site admin "reset"? Easily - we'll create a new user type flag called "Reset user points", and in Rules create a triggered rule that is invoked on the event _A user has been flagged, under "Reset user points".

That's it. Download the <A href="http://www.gizra.com/sites/default/files/user_points_rules.tar_.gz">feature</a>, and add your own logic.

--
Notice if you download the modules manually to use Flag module with version 6.x-2.x or higher and strongarm version 6.x-2.x or higher.
