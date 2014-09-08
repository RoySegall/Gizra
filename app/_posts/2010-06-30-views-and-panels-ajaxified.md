---
tags:
- Panels
- CTools
- Drupal-planet
permalink: /content/views-and-panels-ajaxified/
title: Views and Panels Ajaxified
created: 1277919045
layout: post
---
If you haven't read Roger Lopez <a href="http://zroger.com/node/30">Ajax without Javascript</a> take a 5 minutes break and do it. If you are not a developer and all this code makes you frightened then you are excused. This post will also have a little code, but take a big breath and you'll see how easy it is to Ajaxify your Panels!

<ol>
<li>Download this <a href="https://drive.google.com/file/d/0B943t2AqZZxCNEFzcHhpRGFUWGM/edit?usp=sharing">feature</a> and the related modules <code>drush dl ctools panels views && drush en page_manager panels views_content views_ui story_list php -y</code></li>
<li>Add a few story nodes (title and body), or use Devel generate module to do it for you</li>
<li>Navigate to <code>/story-list</code> and you should see a list of the last 10 stories on the left and the body of the first story on the right</li>
<li>Click on any of the titles and notice how the body text changes, without any page load. Hooray!</li>
</ol>

<!-- more -->

<img src="/assets/images/legacy/snap1.png"/>

Lets go over the things we did to achieve this behavior:
<ol>
<li>We have created a View that has two different displays. The "Story list" shows a list of 10 stories. The fields of this display are the node ID which is "excluded from display" and the node title. In the node title configuration we disabled the "Link field to its node", and we craft our own link so it will link to the new Panels page we created. We also add ```ctool-use-ajax``` css class, which will ajaxify those links

<img src="/assets/images/legacy/snap2.png"/>

</li>
<li>In the story list view we add one line of PHP in the header - ```ctools_add_js('ajax-responder');``` This line will make sure that "somebody" is listening to our ajax links

<img src="/assets/images/legacy/snap3_0.png"/>

</li>
<li>In the panel page, we add to the right pane a generic css class ```ajax-result-pane```. When the ajax command will want to replace the existing text with the new text it will look for this class

<img src="/assets/images/legacy/snap5.png"/>

<img src="/assets/images/legacy/snap6.png"/>

</li>
<li>Next we have our custom code, which is in the ```.module``` file. I won't go over every line of code, since it is well documented. Even if you are not a developer it should be pretty clear from the comments what needs to be replaced in order to re-use the code for your own needs</li>
</ol>
