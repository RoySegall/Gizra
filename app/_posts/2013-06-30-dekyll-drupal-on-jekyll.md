---
layout: post
title: 'Dekyll - Drupal on Jekyll'
permalink: /content/dekyll-drupal-on-jekyll/
tags:
    - Jekyll
    - Dekyll
    - Drupal-planet
---


Drupal is no doubt one of the best CMS out there; Jekyll is no doubt one of the best static site generators out there. See where I'm going? And it's no longer just a concept, it is a complete installation profile called [Dekyll](https://github.com/Gizra/dekyll).

### The DrupalCon Portland BoF

So we had this idea, of combining Drupal and Jekyll. It was a result of building [gizra.com](http://gizra.com) with Jekyll. When I came to Portland I already knew that apart of the usual business schmoozing, and presenting OG and the Message stack, I wanted to get other people's opinion on our idea.

I was pleasantly surprised to see more than 20 people in the BoF (Birds of Feather) session. I had a vision of what I wanted but I still didn't have the elevator pitch for it. The discussion we had helped sharpen the way I can explain that vision. To quote Steve Persch (@stevector)

> When I heard your idea I thought it's crazy. After the BoF I still thought it's crazy... but!

Before diving into Dekyll, let's understand what are the problems that it tries to solve.

<!-- more -->

### The Questions That Need To Be Asked

**Q**: Why?

**A**: Drupal is slow. Probably every CMS that needs to do so much calculations to spit out your HTML takes time. And Drupal is slow. I mean, get the best Drupal developers in the same room and let them work on tuning your site, we're still looking at around 700ms per page (don't catch me on the number, I'm trying to make a point here). But that's the thing - you _don't_ have the best Drupal developers in the room with you, so in reality every page load takes more than that.


**Q**: What's wrong with Varnish?

**A**: Varnish is a great tool. But it deals with anonymous users. Dealing with anonymous users is easy - setup Varnish, have a CDN and you're good to go. I want my _authenticated_ users to enjoy the same speed.


**Q**: But how can you serve dynamic content to authenticated users?

**A**: I don't. Kind of. I mean, there are so many sites where being logged in hardly changes anything. Maybe the top navbar will have "Hello &lt;user&gt;", or maybe a list of posts needs to be sorted differently. I can do it with Javascript, no need for the server to re-generate the same page over and over again.


**Q**: So what you describe doesn't fit _every_ scenario, does it?

**A**: No it doesn't. But at least for Gizra it fits many scenarios. I believe for others as well.


**Q**: So wait, you said you use Varnish. Why not use Varnish's ESI (Edge side include)?

**A**: Let's talk about the stack we now have Linux, Apache/ ngnix, PHP, MySql, Redis/ Memchace, APC, Varnish - and on top of that we now need to deal with ESI?! Jekyll serves HTML. That's it. Javascript will fill the gap.


**Q**: Ok, then why not use [Boost](https://drupal.org/project/boost) module. Why Jekyll?

**A**: We love Drupal, but it doesn't mean we have to use _only_ Drupal. In Drupal, whenever you want to theme your output, you are mostly _overriding_ Drupal's default output. Drupal theme layer is extremely powerful, but many times we just don't need it. By using Jekyll we lower the barrier, and we can use our HTML almost as is. No theme overrides, no deceleration of TPL's, no Devel-themer to try to figure out "who the heck is rendering this block?" on a complex page. Since Jekyll is so popular, and being supported by GitHub, we felt that's the right choice.

### Alright, Tell me more

[Jekyll](http://jekyllrb.com/) is a static site generator, and it's is also blog-aware. Basically, think about your blog site deployed using git, no database no nothing. A nice side benefit is that GitHub allows you to deploy your site free of charge, enjoying their CDN (this site for example is running on GitHub Pages).

Here's how this post looks in Jekyll.

<div class="thumbnail">
  <img src="/assets/images/legacy/dekyll-jekyll-file.jpg" />
</div>

On top you can see the ``YAML front header``, this is the part where you can add some metadata to your page. If you're not a developer, I probably lost you around ``YAML front header``. And that is one of the things Dekyll tries to solve: Imagine you tell your client, a content editor: "You can enter tags - only make sure to never do a typo when you enter an existing tag, or touch any of the other YAML properties otherwise your page won't appear where it should".

Wouldn't it be better if they can select those tags from a select list or an autocomplete widget?

Wouldn't it be better if we could _restrict_ the content editors and help them enter their content without errors?

**Q**: Oh you want a select list? So why not use [Prose.io](http://prose.io), as they now support custom form element?

**A**: Prose.io is awesome. But we want to use the _existing_ powerful tools that Drupal gives us. Tools like content access - who can edit what; field level access - I can edit the post but not those advanced values (e.g. we won't let a content editor edit the "layout" property); Smart defaults - If you create a post page, restrict me to only the ``_posts`` or ``_drafts`` folder, and use a date picker to construct the file name. You get the point. That's exactly Drupal's strength, access, content creation, sophisticated configuration (read as fields). And of course Entity reference, with all the power and modularity it gives us.

### Entity reference, Plugins, and Field configuration

In Jekyll there's no notion of reference. Every page is on its own. If you want to tie them together you are probably going to have some property in the yaml (e.g. ``tags``) and some template code in your page.
Drupal has a powerful entity reference system. A node can reference a product, referencing a field collection, referencing a taxonomy term - those reference can make sense for a content editor (even if they don't know exactly what's the name of each entity). So the first challenge is to pass this complexity to Jekyll. But the second challenge is to approach the first challenge with as little assumptions as possible.
Here are some ingredients of what we use to build Dekyll. Some are technical some are more conceptual/best practice:

* Plugins. Whenever you code something and think to yourself "I'm not sure if everybody would like to have it _exactly_ like this", you should probably use plugins. Dekyll plugins are classes, so for example the Product reference plugin simply extends the Entity reference plugin. Very little code, a lot of flexibility.
* Field configuration. We hook into the field settings and allow to select the plugin that should process the field. For example, when editing an image field, Dekyll will know to show the ``Image`` and ``Image style`` plugins. Each plugin can have its own settings.
<div class="thumbnail">
  <img src="/assets/images/legacy/dekyll-file-configuration.jpg" />
</div>
* Keep rewriting. Dekyll relatively short existence has already seen three or four rewrites. We are moving fast, and we try our best to avoid technical debts.
* The enemy of good is excellent. This one is the opposite of the above statement, but is required for some balance. We are not writing a theoretical concept, rather we are building a tool that can help us build websites _fast_ yet in a  _reliable_ manner.
* Have real life use cases. When we started Dekyll we just had the vision. Once we knew which sites we want to use it on, then the need dictated the solution.

### Disposable Vs Canonical

Disposable: An existing Jekyll site can be imported into Dekyll, and all the configuration and content is duplicated into Drupal. However this Drupal is completely disposable. We can drop the database, and rebuild it. In this case Jekyll is the Canonical entity. A typical use case would be a blog site, just like gizra.com. In fact, this blog post you are reading **was completely written using Dekyll!**

<div class="thumbnail">
  <img src="/assets/images/legacy/dekyll-import.jpg" />
  <div class="caption">Dekyll imports previous blog posts from Jekyll files</div>
</div>

<br />
<div class="thumbnail">
  <img src="/assets/images/legacy/dekyll-node-edit.jpg" />
  <div class="caption">After saving the node, Dekyll will export it to Jekyll format</div>
</div>

Canonical: In this case the Drupal database needs to be kept. More about this mode will be in the next blog post, where we explain how we are building a dynamic commerce site using Dekyll where the content editors add the products via Drupal, and Dekyll will export them to Jekyll (spoiler: AngularJs manages the cart). We will see how Dekyll handles complex data. Complex as in a node referencing commerce product(s), referencing field collections, referencing taxonomy terms. Oh my!
