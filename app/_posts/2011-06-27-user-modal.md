---
tags:
- Drupal-planet
- CTools
- Overlay
- Subform
permalink: /content/user-modal/
title: User modal
created: 1309155924
layout: post
---
The <a href="http://drupal.org/project/user_modal">user modal</a> is an interesting module we’ve been working lately in gizra for <a href="http://medico.com">Medico.com</a>, and I’d like to share our experience.

<img src="http://drupal.org/files/images/user-modal.jpg" alt="User modal example from Medico.com" title="User modal example from Medico.com" width="560" height="382">
From the README:

<blockquote>
User modal module allows opening the Register/ Login/ Reset password menu items
as tabs. Since the tabs are shown via JS and not AJAX, this may lead to a better
user experience, as there is no time waiting for the selected tab to load.
Furthermore, the user modal form can be used by other implementing modules, and
for example allow a user to submit a node and register in the same time.
</blockquote>

<!-- more -->

The idea is that we want to lower the barrier for a new user to participate in the site -- and the barrier is assumed to be too many clicks to just create a node or write a comment.

The final implementation is different from where we started:
1) We thought about creating our own custom forms and call the right validate and submit handlers, and suppress errors of non-submitted forms (e.g. the user has decided to login, instead of register so we don’t need to validate the register fields) using D7’s #limit_vaidation_errors property. The idea was to avoid form API complexity. It’s a no go. There are many advantages to _re-using the current form. So we went on to the next step
2) Using subform module. Easier said then done, as by the time of writing user-modal subform was pretty broken. With a few patches from our side and a lot of help from the knowledgable casey, Subform maintainer, that provided lots if fix and support, we were able to re-use the forms.
3) So now it was just a matter of sticking it in the modal. Which modal? At first we used CTools modal (if you’ve been following my blog posts you know I’m a big fan of CTools), however in this case, we’ve replaced CTools modal with the overlay module that comes with core. Why? For several reasons (non of them is CTools modal fault).

CTools modal opens a modal dialog via ajax in the same page as the parent. The overlay opens the dialog in an IFrame, so you have "parent" and "child" pages. Silly things we love to hate, like IE, don’t allow (without hacks) to add new CSS to the page via AJAX. Another case was that Janrain (a module to connect to 3rd party providers like facebook) currently use JS to bind the click event to a link, but only to links it “sees” on page load. Links that are added via ajax are not binded. One final example, and again IE -- in our case we saw (and provided a <a href="http://drupal.org/node/1158928">patch</a>) that when we post the form in the modal, $_POST returns empty. Thanks IE!
The advantage of using Overlay, is that the new content is in an IFrame, which means it’s actually loading the same way it would have in a separate window. Also, it should be mentioned that Overlay is a great piece of code, and I learned a lot from its JS (and a lot has went over my head).

We found that Overlay was easier to theme. CTools modal seems to have fixed width & height and requires a class to be added to the link that opens the modal with the name of the modal type that is required. With overlay it’s easier, as it’s a full page refresh , only inside the IFrame.

The disadvantage, or maybe better -- challenge is that unlike CTools modal, Overlay’s modal being in an IFrame means one has to do some “tricks” to pass information from the child to the parent window.

Another minor advantage is that overlay is a core module, so it’s considered a better practice to use it. It should be noted, that the Overlay gives an impression it can/ should be used only for admins - we think it’s just a matter of showing it could be used for other stuff as well.

Instead of going in details in the blog post, you should grab the module and enable the example module that comes with it. There’s some info in the README, and a lot of comments in the example module. The example shows a simple case of creating an article node and logging-in with a singe click!
