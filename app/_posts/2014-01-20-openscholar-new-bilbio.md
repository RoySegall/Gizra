---
title: OpenScholar and the new Biblio
layout: post
tags:
  - OpenScholar
  - Biblio
  - "Drupal-planet"
permalink: "/content/openscholar-new-bilbio"
published: true
---


OpenScholar is the de facto go to solution for academic sites. Over the past year we saw it being adopted in many Harvard departments and higher ed institutions worldwide.

![]({{BASE_PATH}}/assets/images/posts/os-biblio/6.jpg)

I'm proud that our work is not just based on open source, but also contributes to it - big time. Case in point, the [Biblio](https://github.com/Gizra/biblio) module which is responsible for bibliographies and citations since back in Drupal 4.6, and has provided a great solution. It was becoming clear the 4.6 architecture is showing its age, and could use an overhaul.

<!-- more -->

We approached the task with the entire knowledge and tools we've used to rewrite Organic groups, and create the Message stack. In short:

* Leveraging Drupal's existing tools and modules
* "Thinking" API and following TDD (test driven development). Only after getting the API right did we add a UI module to consume the API
* Using plugins for extendibility, so each bibliographic style can be easily extended

If you are familiar with the older versions of Biblio, you will appreciate the simplicity of the API:

Importing new data

```php
<?php
// The data you wish to import.
// In this example, a book.
$data = '
	@Book{
    	washington+franklin,
  		author    = "George {Washington} and Benjamin {Franklin}",
	  	title     = "Book About the USA",
	  	publisher = "ABC",
		year      =  1980,
		address   = "Los Angeles",
  		edition   = "ninth ABC printing, tenth DEF printing"
	}';

// Get the relevant biblio style class to handle the information.
$biblio_style = biblio_get_class_from_style('bibtex')

// Import the Biblios.
$biblios = $biblio_style->import($data);
```

Showing the imported data using CiteProc is as simple as ``$biblio->getText('citeproc');``

On the UI level we are leveraging inline entity form, so adding contributors is done in a very concise way and removes the previous guesswork that Biblio did for converting a string (the contributor's name) into structured data (the Biblio Contributor entity).

![]({{BASE_PATH}}/assets/images/posts/os-biblio/7.jpg)

![]({{BASE_PATH}}/assets/images/posts/os-biblio/8.jpg)

Extending it and integrating it into OpenScholar requires some work - but the new API makes for a much smoother experience.

![]({{BASE_PATH}}/assets/images/posts/os-biblio/9.jpg)
