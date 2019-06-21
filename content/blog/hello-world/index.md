---
title: Shave off some clicks by making your own bookmarklets
description: Yo what is up
date: "2019-06-05"
---

We all have a million little tasks to do: things to keep track of, information to process, news to follow up on. Small efforts that build up over time to a larger whole. Of course, sometimes the best thing to do with a task is to eliminate it entirely by not doing it or automating it away. But other times, we can use just a little bit of help to make something go faster.

Recently, I’ve started experimenting with a new tool to make repetitive tasks slightly smoother: The humble bookmarklet.

A bookmarklet is a snippet of JavaScript code that you can add to your bookmarks. When you activate it, that code runs in the context of the current page, allowing you to do all kinds of different things. I’m excited that this approach lets me do operations on web pages without having to go to the lengths of creating something really complex like a browser extension, and even works in environments that don’t support extensions, like mobile Safari!

In this post, I’ll:

1. Show a “hello, world” example
2. Go over two real examples: Recording a todo item and sending an email
3. Explain how to make your own bookmarklets to improve your personal workflows

## The simplest bookmarklet

Let’s add a button to our browser that just tells us "Hello, world!"

Create a bookmark called "Say hello", but instead of putting a web address as the URL, put the following code:

```js
javascript:alert('Hello, world')
```

Here are detailed instructions if you’re not familiar with how to do this:

<p>
<details>
 <summary>Chrome</summary>
 ...this is hidden, collapsable content...
</details>
<details>
 <summary>Desktop Safari</summary>
 ...this is hidden, collapsable content...
</details>
<details>
 <summary>Mobile Safari</summary>
 Tap the “Share” icon, then tap “Add Bookmark”. Edit the title to be “Say hello”. Then, open the Bookmark menu, tap “edit”, and update the URL of the bookmark to be the above code.
</details>
</p>

Now, open the bookmark. You’ll note that instead of going to a page, it’ll open a dialog on the page that says “Hello, world!” Now, let’s make it a little more interesting by pulling some information from the page. Edit the bookmark, and replace the code with:

```js
javascript:alert('The page is called: ' + document.title)
```

So that’s pretty cool, but it turns out we can do much more than just open a dialog. Before we move on, a note:

> ⚠️ Don’t paste and run code you don’t understand! Code that runs from a bookmarklet has access to all of the contents of the web page on which you run it, and can take any actions you would be able to take on that page.

> I’m going to try to explain in detail how each of the examples in this article work so that you can feel confident using them, but with great power comes great responsibility.

## Sending an email with a link to the current page

One common task that can sometimes take a few clicks is sending someone an email. Thankfully, Gmail provides a way to open a draft email with a pre-filled subject and body just by going to a particular URL. For example, if you click the following link, it’ll open a new email draft to this article with someone:

<a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=s.stubailo@gmail.com&su=Hello there!&body=BODY&bcc=someone.else@example.com"><code>https://mail.google.com/mail/?view=cm&fs=1&to=s.stubailo@gmail.com&su=Hello there!&body=BODY&bcc=someone.else@example.com</code></a>

We can write code to craft this URL and then go to it, and put that right in our bookmarks! Let’s take a look at the finished product, then all the parts one by one:

```
JavaScript:lalala
```

Note https://stackoverflow.com/questions/19281933/is-there-a-url-handler-for-gmail-for-ios-to-compose-a-message

Let’s look at another example that’s really similar, but with a fun twist...

## Creating a todo item in Things with a link to the current page

URLs can open web pages or run JavaScript code, but it turns out they can also point to other applications on your computer or phone! I use a todo list app called Things that doesn’t have a website, but does have native apps for desktop, iPad, and iPhone. Even though Things doesn’t run in a web browser, as of a recent update it supports adding a task via an app-specific URL.

Here’s a piece of code that’s similar to the Gmail example above, but (in my opinion) even cooler since it opens an entirely different app:

```
JavaScript: lalala
```

The link won’t do anything if you don’t have Things installed, so I put together a gif to show you what this looks like on an iPad:

gif here

You can read about all of the different URLs Things supports in their docs.

## Making your own bookmarklets

These are some pretty simple examples—all they do is construct URLs and open them—but hopefully they showcase some of the potential of this type of automation. I especially love that you don’t need to install any new applications or extensions, and that it even works on mobile.

Here are some tips:

1. Prototype in the browser’s developer tools. (TODO link)
2. Don’t forget to use the encodeURIComponent function to construct valid URLs
3. Share your ideas with others!

