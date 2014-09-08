---
tags:
  - "Project management"
  - "Drupal-planet"
  - "GitHub"
permalink: "/content/how-we-use-github-issues"
title: How We Achieve Faster Development and Happier Clients by Opening Our GitHub Issues
layout: post
author: niryariv
---


As we [mentioned](http://www.gizra.com/content/the-gizra-way/) before, in Gizra each project's GitHub repository - code, issues etc - is completely open & transparent to the client from the day we start working together. We've discovered this provides us with some unexpected benefits.

<!-- more -->

As I see it, the key to project management is communication. The key to communication is repetition. Almost always, you need to repeat an idea several times in different ways to really communicate it. This is why we have SCRUMs and Skype calls and issue trackers and stakeholder meetings: just saying something once rarely gets the message across.

While I generally enjoy the process, it requires time investment which can become challenging when working simultaneously on a lot of different projects for different clients.

This need for reducing communication time led us to try and get our clients to participate in task tracking process with us. We found that while there is some learning curve, it's not too steep, and the benefits are easily worth it.

Initially, I'd break down the tasks into GitHub Issues tickets, which the lead developer for the project will then assign to developers as we go. As the project gets into gear, the client gradually joins the process, opening issues, adding comments and so on. When a developer has a question regarding a task, they'd ask the client directly on the Issue thread.

Each issue has a related Git branch, and once the task is done, a pull request is created. If it affects the front end a screenshot is attached, so the client can see what the new feature looks like and, if needed, correct us before we move on. Otherwise, following a code review the code is merged to master and pushed to the site.

The entire process is open to all stakeholders. Since communication takes place on GitHub instead of emails, when a question leads to new knowledge it is instantly documented and shared. My own involvement as Project Manager diminishes as we establish the direct dev<->client communication line, but I do get email notifications on all new comments - so if a task seems to get stuck for some reasone, the lead dev or myself will jump in and arrange a call with the client to hash things out.

We find this works beautifully both for us and the clients. We cut the middleman and reduce friction from the process, making for a much faster development cycle and a more engaged & happier client. The common client/developer communication frustrations are reduced significantly.

As a bonus, this makes the Project Manager's life much easier, especially on a distributed team like ours. A constant stream of GitHub notifications in my email lets me know who's working on what and how it's going. The client gets the same feed, and with that a feel for the project's progress. If a particular task is stuck for some reason the client might decide to change the specification or just ask us to switch to a more important task if the expected functionality isn't worth the effort.

We don't have this working for all clients, yet. But our exprience is positive enough that we do our best to convince clients to take part in this process - for both sides' benefit.
