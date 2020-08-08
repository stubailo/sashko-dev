---
title: "Bookmarklets for sending emails and adding todo items"
date: "2019-10-05"
description: "Adding functionality to your browser without using extensions"
imgUrl: "./typography.png"
published: false
---

A bookmarklet is a snippet of JavaScript code that you can add to your browser bookmarks. When you activate it, that code runs in the context of the current page. This approach lets you do simple operations without having to go to the lengths of writing a browser extension.

In my opinion the coolest thing is that this even works in environments that don’t support extensions, like mobile Safari. I’ve been using these pretty regularly, so I wanted to share how it works.

## The simplest bookmarklet

Let’s add a button to our browser that just pops up a dialog that says “Hello, world!”. To do this, create a bookmark called “Say hello”, but instead of putting a web address as the URL, put the following code:

```
javascript:alert('Hello, world')
```

(You can also test it by pasting that into your URL bar without creating a bookmark.)

Now, open the bookmark. You’ll note that instead of going to a page, it’ll open a dialog on the page that says “Hello, world!”

Now, let’s make it a little more interesting by pulling some information from the page. Edit the bookmark, and replace the code with:

```
javascript:alert("The page is called: " + document.title);
```

So that’s pretty cool! We can actually interact with the page. It turns out we can do much more than just open a dialog. Before we move on, a note:

> **Don’t paste and run code you don’t understand!**<br />
> Code that runs from a bookmarklet has access to all of the contents of the web page on which you run it, and can take any actions you would be able to take on that page. I’m going to try to explain in detail how the examples in this article work, but with great power comes great responsibility.

## Sending an email with a link to the current page

One common task that can sometimes take a few clicks is sending someone an email. Thankfully, Gmail provides a way to open a draft email with a pre-filled subject and body just by going to a particular URL. For example, if you click the following link, it’ll open a new email draft to this article with someone:

[Click me!](https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&su=Check%20out%20this%20site!&body=https://sashko.dev)

Here’s what the URL looks like:

```
https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&su=Check%20out%20this%20site!&body=https://sashko.dev
```

If we want to make this URL reusable, we can write code to generate it, and put that right in our bookmarks! Let’s take a look at the finished product, then go over how it works and how we could make our own:

```
javascript:window.location=%22https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&su=%22+encodeURIComponent(document.title)+%22&body=%22+encodeURIComponent(window.location.href)
```

Here’s a gif of this bookmark in action on an iPad:

TODO

First, we have to make sure the code is a valid URL. So we’ve added javascript: to the front to tell the browser this is JavaScript, and replaced special characters with escape sequences. For example, double quotes in URLs need to be replaced with %22.

The actual code, properly formatted, looks like this:

```js
window.location =
  "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&su=" +
  encodeURIComponent(document.title) +
  "&body=" +
  encodeURIComponent(window.location.href);
```

Here’s how it works:

- `window.location =` sets the current URL
- The Gmail URL is the same one we’ve used above, except we’re now setting the su and body parameters dynamically with code
- We’re using `document.title` and `window.location.href` to get the current page title and URL
- `encodeURIComponent` makes sure that the text we’re adding to the URL is properly interpreted as parameters. If we didn’t do this, a rogue `&` in a page title could mess things up!

So the main thing to watch out for is to make sure to encode any values that come from the page with encodeURIComponent.

Let’s look at another example that’s really similar, but with a fun twist...

## Create a todo item in Things with the current page

URLs can open web pages or run JavaScript code, but it turns out they can also point to other applications on your computer or phone! I use a todo list app called Things that doesn’t have a website, but does have native apps for desktop, iPad, and iPhone. Even though Things doesn’t run in a web browser, as of a recent update it supports adding a task via an app-specific URL.

Here’s a piece of code that’s similar to the Gmail example above, but (in my opinion) even cooler since it opens an entirely different app:

```
javascript:window.location=%22things:///add?title=%22+encodeURIComponent(document.title)+%22&notes=%22+encodeURIComponent(window.location.href)+%22&show-quick-entry=true%22
```

The link won’t do anything if you don’t have Things installed, so here’s a gif to show you what this looks like on an iPad:

TODO

You can read about all of the different URLs Things supports [in their docs](https://support.culturedcode.com/customer/en/portal/articles/2803573).

## Make your own!

These are some pretty simple examples—all they do is construct URLs and open them—but hopefully they showcase some of the potential of bookmarklets to simplify some workflows. I especially love that you don’t need to install any new applications or extensions, and that it even works on mobile.
