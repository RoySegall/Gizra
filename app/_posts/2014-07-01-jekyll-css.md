---
title: No more CSS in your Drupal Theme!
tags:
  - CSS
  - Jekyll
  - "The Gizra Way"
  - Drupal-planet
layout: post
permalink: "/content/custom-css-as-contrib-with-jekyll"
---
{% include setup %}

## Treat your custom CSS as contrib

Getting your Drupal to be pixel perfect is hard. In fact, it's probably four times faster to write the logic
of a page, in comparison to the time it takes to get it's markup right. Not to talk about making it responsive.

If you've seen my presentation about [The Gizra Way](http://goo.gl/hJhZb8) you noticed we take pixel perfect very seriously.

One of the tools that helps us getting the markup fast, correct and in a way that would allow us to communicate with the client is Jekyll - the static site generator. Here's the idea in a nutshell:

* Using Jekyll we can concentrate on a clean markup
* Using Grunt we compile the SASS, and are able to push the the HTML into Github pages - where the client can easily see and interact with the final markup
* The CSS produced by Jekyll is treated by our Drupal application as contrib. This means we have zero custom CSS in our theme. Seriously, __absolutely no custom CSS in your Drupal theme!__
* Any change to the CSS can be done only in a _single_ place, which is Jekyll

<!-- more -->

## Implementation details
We use a great [yo generator](https://github.com/robwierzbowski/generator-jekyllrb) to build a Jekyll directory in our installation profile (obviously each project in Gizra is built as an installation profile).
Here's an example of our [Gruntfile.js](https://gist.github.com/amitaibu/fed622186b4e5c4a9036#file-gruntfile-js). Note that if you are gonig to use Bootstrap, it still does't come out of the box, so you'll need to do some [manual](https://github.com/robwierzbowski/generator-jekyllrb/issues/85#issuecomment-45706173) work to set it up.

Our team can now work on the markup. Once the markup changes we can ``grunt deploy`` -- and the markup will be pushed to Github pages, to facilitate  all the stake holders to validate the design and responsiveness of the site.

Next, when the team will work on the Drupal site, instead of coping the CSS into the Drupal theme itself, we copy
it into ``libraries/custom`` (where "custom" could be your site's name). This means your CSS is edited only in a single place, which is the Jekyll app. Since this is a repetitive task we have automated it with a simple [bash](https://gist.github.com/amitaibu/fed622186b4e5c4a9036#file-buildcss-sh) script.

Last step - given our custom theme is under ``profiles/[profile-name]/themes/custom/subtheme`` - is to load the "contrib" CSS via the theme's info file:

```
stylesheets[all][] = '../../../libraries/custom/css/main.css'
```

Finally, the developers can now enjoy working on a pixel perfect template where they only need to yank out the static parts and replace it with the
dynamic content, so visually the site never looks broken, and logic is added to it incrementally.
