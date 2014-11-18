---
permalink: "/content/tipali-a-tool-for-easily-finding-polio-vaccination-clinics"
layout: post
title: Tipa.li – a Tool for Easily Finding Polio Vaccination Clinics
author: niryariv
tags:
  - "Open source"
  - "Drupal-planet"
---


No one is sure what caused the Polio virus, eradicated from Israel since the 1990s, to reappear. The virus was detected in sewage samples in the south of the country in early summer and began spreading northwards, prompting Ministry of Health to start a [massive vaccination drive](http://www.npr.org/blogs/health/2013/09/02/217194998/to-keep-polio-at-bay-israel-revaccinates-a-million-kids).

Parents of children under the age of 9 were asked to bring them to the nearest Tipat Halav clinic for vaccination. Country-run Tipat Halav (in Hebrew, “drop of milk”) childcare clinics are a household name in Israel. Spread throughout the country, they helped it reach some of the [world’s lowest infant mortality rates](http://www.indexmundi.com/facts/indicators/SP.DYN.IMRT.IN/compare?country=il#country=au:xd:xr:xs:il:gb:us).

The Ministry of Health decided to create a mobile application to help parents find the nearest clinic. It commissioned one of the country’s largest development shops to create it. They decided to create a native app. [This is the Android version](https://play.google.com/store/apps/details?id=com.matrix.tipathalav):

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/tipa/image1.jpg" />
  <div class="caption">It’s in Hebrew, but you get the idea</div>
</div>

I assume the iOS version is still undergoing the App Store approval process.

We discussed the app during lunch at Gizra. We’re no doctors, but we thought we could do something about the software. Going with a native app didn’t seem ideal for a single-use application which needs to be deployed on as many platforms ASAP. As for the UI, I’ll leave the image above as an exercise to the reader.

<!-- more -->

Lunch concluded with a particularly good Malabi. It’s one of the few deserts I ever bother with, so I’m pretty sure the extra sugar is the reason I shot off a message to the [Public Knowledge Workshop](http://www.hasadna.org.il/en/) mailing list as I got back to my laptop, asking who’s with me – help me scrape the clinic data and I’ll take care of the front end.

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/tipa/image2.jpg" />
  <div class="caption">Malabi, by <a href="http://www.flickr.com/photos/7826272@N06/4818656579/in/photolist-8kNSHR-6c2Z8H-rzrQQ-5AsnHV-rzrTY-Dv5gr-avrhAk-5Zu4Hp">naamanus</a>. This is good.</div>
</div>

Within a few hours, a person I’ve never met [sent me a link](https://twitter.com/sharonmoravi/status/371632490147880960) to a JSON file with all the clinics. I still have no idea who this is and how s/he had this file. I geo-encoded a few, put the data on map using GitHub’s geoJSON support, and sent a link back to the mailing list. At 1am that night, [Alon Nisser](http://degeladom.wordpress.com/) (whom I’ve also never met before) sent some patches that fixed the major missing parts in my code.

By morning we had a working prototype. Meanwhile, [Udi Oron](http://about.me/udioron) and [Erez Segall](http://www.linkedin.com/profile/view?id=163884606) – yet another two people I’ve never met – announced they were working on a more robust [scraping code](https://github.com/segalle/milkscrapper) to get all the data from the MoH’s website and encode it reliably.

With the data in Alon, Udi and Erez’s capable hands, I focused on the front end with the goal of keeping it server-free – only HTML/JS code – thus allowing us to develop a quick, simple solution that’s easy to deploy and scale.

The final app is extremely simple. When opening [tipa.li](http://tipa.li/) (Hebrew wordplay meaning “My drop” or “Tiny drop”) the user is presented with a map, zoomed to the city level and centered on her current location, showing nearby stations. Touching a marker (design donated by [Ilan Dray](http://www.inkod-hypera.com/), who I’ve also yet to meet) reveals its street address, opening hours and a phone number.

<div class="thumbnail">
  <img src="{{BASE_PATH}}/assets/images/posts/tipa/image3.jpg" />
  <div class="caption">Tipa.li UI. This is all of it.</div>
</div>


That’s all. No search or distance filtering features to clutter the UI. The user knows better – a more distant station might have better parking, for example. All the stations in the country are the one geoJSON file, so users can find clinics in other locations by just zooming and panning around.

The code is as simple as the UI. The app is one geoJSON file rendered on a [MapBox](http://mapbox.com/) map with the excellent [Leaflet.js API](http://leafletjs.com/). No searching, no AJAX calls to a backend server. Everything is client-side, served from the ultra scalable (and only occasionally down) [GitHub Pages](http://pages.github.com/).

I’m pretty happy with [tipa.li](http://tipa.li/). It’s one of these rare cases where things just work right, from the start – the code, the UI, the development process. The media in Israel liked it too, giving it some nice coverage on [Haaretz](http://www.haaretz.co.il/captain/room404/1.2111744), [Calcalist](http://www.calcalist.co.il/local/articles/0,7340,L-3611389,00.html) and some national radio/TV shows, helping us further the cause of opening government data. As for users – within 12 hours of posting the site on Facebook, we’ve passed MapBox’s free quota of 3000 requests. It was a good week.

_Cross-post from [plaintext](http://niryariv.wordpress.com/2013/09/03/tipa-li-a-tool-for-easily-finding-polio-vaccination-clinics/)._
