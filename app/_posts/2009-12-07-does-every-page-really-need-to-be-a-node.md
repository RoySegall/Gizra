---
tags:
- Drupal-planet
permalink: /content/does-every-page-really-need-be-node/
title: Does every page really need to be a node?
created: 1260218791
layout: post
---
No.
Let's take the "usual" home page as an example:

<ul>
<li>It doesn't need to have an author</li>
<li>It doesn't have comments</li>
<li>It rarely changes (Maybe it has Views in it that change the content that is shown, but the layout and static text don't change)</li>
</ul>

So we can use <a href="http://drupal.org/project/panels">Panels</a> for that. It also makes deployment easier:

<!-- more -->

<ul>
<li>since the Panels are in code (same as having exported Views), it means we can prepare the Panels page on a development server and easily deploy it on a production server, without copying/ pasting nodes or do some db merge weirdness</li>
<li>Different layout and content for different roles or languages - checkout our own home page <a href="http://www.gizra.com/">English</a> Vs. <a href="http://www.gizra.com/he">Hebrew</a>. You can see we flip the image and change the text layout - those are just different Panels variants.</li>
<li>Reusing our tools. We have many websites that have a standard skeleton (home page, about us, services, etc'). Once we have the Panels in code as a module, we can place it in other websites and quickly do the needed adjustment. Hack, we can even do it directly from within the code</li>
</ul>

Ok, one may argue that the client might need to change the home page - "If it was a node my client could easily edit it. What then?"
But we argue back:
<ol>
<li>Meh. How often does your client _really change the home page?</li>
<li>If they do need to change it frequently, you can have the Panels page show an existing node - so the client will be able to change that node without changing the Panels itself</li>
<li>Like Views, that should live in code - if there's some crisis and they _must change the Panels, they can do it manually, and the next day you can deploy a new fixed version, and revert the Panels so it will be served back from code</li>
</ol>

Thanks <a href="http://drupal.org/user/26979">merlinofchaos</a> for yet another great module!
