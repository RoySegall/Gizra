---
tags:
- Message
- Drupal-planet
permalink: /content/what-message-module-and-its-new-features/
title: What is Message module, and its new features
created: 1342126619
layout: post
---
<a href="http://drupal.org/project/message">Message</a> module’s inclusion in the upcoming version of Commerce Kickstart, and it’s very likely inclusion in Drupal Commons 7 turns this not very known module into an important module to know about.
Message can help with many tasks from simple logs to complicated activity streams and even, with the use of  Message Notify module, multilingual digest emails.

<!-- more -->

<h3>What is a message</h3>
Messages are entities belonging to a specific “Message type”, defining the purpose of its messages. Think of the relation of a Message to a Message type the same as what a node is to a node type. A good resource for understating Message is the Message-Example module that ships with Message, and is well documented. Even Organic groups’ example module has integration with Message to show how it can be used for group notification.
<img src="/assets/images/legacy/message-1.jpg" />

<h3>Tokens</h3>
As it is possible to attach fields to messages, we can leverage the token system. In fact we have 3 different powerful ways for text “replacements”:
<ul>
<li>Regular tokens: ```[message:user:name]```, will be replaced on the fly when presenting the message, with the most updated data</li>
<li>One-use tokens: ```@{message:user:name}```, similar to the previous example the user’s name will be shown, but instead of calculating it _every time the message is shown, we calculate it once when the Message is saved, so next time we can get the saved value faster</li>
<li>Callbacks: sometimes we can’t use the token system, for example if we need to show different results based on the value of _two different fields. This is an advanced feature, which is meant for developers, and is documented in the module</li>
</ul>

<h3>Partials</h3>
The message text is of multiple cardinality (or combined of multiple “partials”), in order to allow presenting the message in a complex layout without adding too much markup to the message text.

<img src="/assets/images/legacy/message-2.jpg" />

Below is  a View using “Panel fields” settings (part of Panels) allowing to set which partial goes on which region of the message template.
Not only we didn’t have to add complicated HTML to the message itself, in fact in different Views we can have different layouts!

<img src="/assets/images/legacy/message-3.jpg" />

<h3>Auto delete & Purge</h3>
Two new features include purging of messages (e.g. delete all messages older than 30 days, or if reached a maximum of 1000), and deletion of Messages when the referenced entities are deleted - to keep your database nice and slim.
Don’t worry, Message has lots of tests to make sure we don’t accidentally delete wrong data...

Also, keep an eye on Message notify - Sanjay Rohila (<a href=”http://drupal.org/user/1274328”>crazyrohila</a>) a GSOC student, is wokring on making it pluggable, so you can send a message not only as email, but also as SMS, IM, etc’.
