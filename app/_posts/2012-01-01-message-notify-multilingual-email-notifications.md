---
tags:
- Drupal-planet
- Message
permalink: /content/message-notify-multilingual-email-notifications/
title: Message notify - Multilingual email notifications
created: 1325427492
layout: post
---
Email notification is a convenient way to be updated about new content or comments. There are several modules in Drupal that already deal with this issue, and I would like to propose another solution, and highlight the advantages of using it. The new system relies on <a href="http://drupal.org/project/message_notify">Message-notify</a> module, which depends on the Message module -  a general logging system (think activity stream, but without a fancy query builder).

Message module itself is pretty simple. You can have different message types, and when you want to create a message, you actually create a new entity called Message.

<!-- more -->

What makes message so great is:
<ol>
<li> You can replace tokens either by hard-coding it, or by having a callback function. So if you want to have a message like “Good day @name” -- you can either replace the @name with the user’s name, and save it to the database, or you can have a callback function that will make sure we get the most up to date user name, in case it was changed.</li>
<li>Message module is using the "translatable" feature of Field API, which means we can translate the messages. Yap, you’ve heard me right, you can easily send messages in different languages!</li>
<li>Unlike other modules that only notify you via watchdog if there was an error, and the email is lost - since we are using an Entity, we can easily save those messages, and view the message _as it was sent to the user, and if needed re-send them!</li>
</ol>

Lets see it in action:
<ul>
<li>Get the -dev version of Message and Message-notify, and enable Message-notify example module</li>
<li>See the message type that was added in ```admin/structure/messages```</li>
<li>Create a few nodes, and as a different user, add comments</li>
<li>If your SMTP works, you will get an email, otherwise, you can view the sent messages using Views -- click on the “Message notify example” link on the navigation block</li>
<li>And now for the fancy stuff, enable Locale module, and add “French” language.
Again, as different users with different language, post comments, and see how the message is language aware!</li>
</ul>

<img src="/assets/images/legacy/Edit%20Comment%20insert%20%7C%20Site-Install.jpg" />


As you can see Message notify, doesn’t try to implement a subscription system. You can do that yourself according to your custom logic, and Flag module will probably play a big part in it.

Non-developers will need to wait a little longer for a Rules integration with Message notify (there is one already for Message itself), but developers can dive in, and start building a slim an efficient notifications system using Message.

I would also like to point that we implemented for out client in <a href="http://www.medico.com/">Medico.com</a> a really nice digest-email feature, that sends you all the recent activity. Remember, since tokens can be replaced by callbacks, nothing stops us from calling ```views_embed_view()``` and sending this nice email.

<img src="/assets/images/legacy/digest-Medico.jpg" />
