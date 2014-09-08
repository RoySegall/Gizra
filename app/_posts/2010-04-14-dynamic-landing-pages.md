---
tags:
- Drupal-planet
- tutorial
- Panels
permalink: /content/dynamic-landing-pages/
title: Dynamic landing pages
created: 1271233088
layout: post
---
The following post will cover how to create dynamic landing pages. First lets define our mission:

Allow easily creating landing pages, with different content. The layout should be a header and footer which are always the same, and the main-content should be three columns layout, with dynamic content.

<!-- more -->

<img src="/assets/images/legacy/Snap1_0.png">

Before we go too technical, let's translate the task into plain English in order to solve our task.

<blockquote>
The layout should be a header and footer which are always the same
</blockquote>

Or we can say it differently - don't show the sidebars. A quick and dirty way of doing it, will be overriding page.tpl and remove the printing of the sidebars.

<blockquote>
...three columns layout...
</blockquote>

That's easy with Panel's three column layout (or we can create our own layout using <a href="http://www.gizra.com/content/thinking-grid-960">960</a>).

<blockquote>
...with dynamic content.
</blockquote>

Dynamic content - that sounds like a job for Views. We can have a content type, that will have cck fields that describe the location of it (e.g. left, middle), and the page it should appear (e.g. /landing-page/foo). Views will get the right nodes for us.

Ok, now we know how we want to implement it, let's get our hands dirty (or download the <a href="http://www.gizra.com/sites/default/files/landing_pages_0.zip">example module</a>, and skip to 7).

<ol>
<li>Download and enable necessary modules:
```
drush dl cck views ctools panels
drush en optionwidgets text views_ui ctools _panels page_manager views_content
```
</li>
<li>Starting from the lowest level, we'll create a new content type called "Landing page element" with CCK fields - select list for the "Location" and a textfield for the "Page ID"</li>
<li>Create a View that shows the full nodes, filtered by node type, that gets two arguments - the "Location" and the "Page ID"</li>
<li>Add a new display of "Content pane" type. This display type is what ties Views to Panels in a way that allows us to define how the View is going to get its arguments</li>
<li>Set the Page ID argument to be taken from the panel argument - or in other words, if the url will be landing-page/foo then foo is our page ID. The Location argument, on the other hand, shouldn't be taken from the URL - it should be set in the Pane configuration
<img src="/assets/images/legacy/Snap3_0.png">
<img src="/assets/images/legacy/Snap4.png">
</li>
<li>Create a panel page in the path ```landing-page``` with a three column layout, and in the content add our view to each of the columns. Every time the "Location" argument will change according to the column the View is added to
<img src="/assets/images/legacy/Snap5_0.png">
<img src="/assets/images/legacy/Snap6_0.png">
<img src="/assets/images/legacy/Snap7_0.png">
</li>
<li>Next, in our theme to copy page.tpl.php to page-landing-page.tpl.php, and the printing of the sidebars</li>
<li>Optional; copy node.tpl.php to node-view-landing_page.tpl.php and delete the printing of the node title</li>
<li>Optional; In admin/build/themes/settings uncheck "Display post information" from our new content type</li>
<li>Now, all that is left to do, is to add three Landing page elements content, with the same page ID (e.g. ```gizra```), and with different locations</li>
<li>Navigate to landing-pages/gizra and see your landing page!</li>
</ol>

Another small note about using Panels, Views and nodes together. Although Panels allows us to add an existing content, I normally prefer to use a View that will return that node. Why? Because most of the sites I work on are multilangual, and if I hardcode the node ID then the users might see a node in the wrong language. View on the other hand can make sure the node the users see is in their language.
