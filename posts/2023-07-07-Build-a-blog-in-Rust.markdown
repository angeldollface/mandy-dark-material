---
layout: "layouts/page.liquid"
title: "Build a blog in Rust"
description: "How to build a blog in Rust using the Mandy static-site generator."
---

## INTRODUCTION

In this blog post, I will be explaining the different approaches towards building a static site, why static-site generator are the easiest and most efficient tool to do so and why you should use Mandy, a new static-site generator written in Rust, to do this. However, basics must first be explained!

## THE JAMSTACK

To understand the landscape of approaches and tools that exist towards building websites, we must understand the term "Jamstack". This term is often used when talking about tools like static-site generators.

The term "Jamstack" is thrown around a lot but it describes a very simple approach towards building web applications and websites. To explain the core idea of the fancy word "Jamstack" we need to understand the two approaches that exist for creating modern websites. 

The first approach is that of building websites that generate the content and pages that you see in your browser on the server on which the site is being served from. The data for building these sites can be drawn from a database that also lives on the same server. This can become very tedious and slow because the server has to re-render pages each time you make a request. This is often termed "server-side rendering" in the industry jargon.

The second approach is very different. The server itself does not render any pages and serve these to the client. Instead, an application's or a website's pages are built in advance and these finished page files are then uploaded to a server. This server then serves these files to the client. The problem with this approach is that every single time something changes, these page files have to be generated again.

Building websites and web applications using the Jamstack philosophy aims to solve the problems of both approaches by using certain tools that address these problems. One of these tools is called a static-site generator.

## STATIC-SITE GENERATORS

Static-site generators help solve the problem of the second approach described above. They automatically re-generate all page files each time the content of the site changes. What do they do exactly? They build HTML files from content written in some sort of Markup language. This Markup language is usually Markdown. After understanding to some extent the task of static-site generators in the grand scheme of web development, let us now dive into how they actually work.

Since the dawn of the internet, there have been multiple popular static-site generators. Some of the most popular ones are: [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), and [Eleventy](https://gohugo.io/). All of these static-site generators (SSGs) usually have three core components: Layouts, Styling, and the content in form of some Markup language. 

Layouts are templates for specifying how the HTML should be generated from the content. This is usually handled via a HTML templating language like [Liquid](https://shopify.github.io/liquid/), [Handlebars](https://handlebarsjs.com/) or [Nunjucks](https://mozilla.github.io/nunjucks/). 

Styling is a bit more tricky. Styling websites is done via CSS. However, large websites need large CSS style sheets. This can quickly become very tedious and taxing to maintain. For this reason, things like [SASS](https://sass-lang.com/) exist. SASS allows users the freedom to still write their CSS code in the way they are used to, but do so in a way that makes it more maintainable. Some examples of how SASS achieves this would be that SASS allows you to use variables, if-conditions, and a large number of other constructs you might be used to from a "proper" programming language. 

The final component, writing the content, is usually done using Markdown. Markdown is almost like simple text with the exception of very few special symbols to mark the structure of a document. 

Because there are so many static-site generators and most of them are getting quite old at this point, I decided to write a new player for this space in Rust. This new player is called "Mandy".

## MANDY, THE NEW GIRL ON THE BLOCK!

Mandy is a static-site generator just like Hugo or Jekyll. The difference between her and others is that Mandy has lots of features out of the box that the others only gradually got over time. Some of these features are: Stellar integration with deployment services like Deno Deploy, GitHub Pages, and Netlify. Another feature is that Mandy is very simple to use and abstracts away a lot of the complexity of other static-site generators. Furthermore, because she is written in Rust, Mandy really is *blazingly fast*. I will now attempt to walk you through working with Mandy by creating, compiling, and deploying a Mandy-powered site.

## INSTALLING MANDY

Installing Mandy is quite simple. There are installation scripts and downloadable binaries for every big platform. These platforms are Mac OSX, Windows, Linux, and other Unix-based systems. Visit [this link](https://angeldollface.art/mandys-house/documentation/installation/) to find out how to install Mandy.

## CREATING A NEW MANDY SITE

I'm assuming you have installed Mandy successfully and running the command `mandy -v` produced a version message. Mandy takes a very open approach to compiling sites into static sites that have been made by other people. There is no central package repository of third-party sites or themes. Mandy allows you to just clone a repository and if a certain set of files exist in that repository, then she will compile your project into a static site. These third-party sites are called site templates. To distribute these site templates, the template simply needs to be in a GitHub repository. To start a new site, Mandy needs two pieces of information: i) Where do you want to start a new Mandy site and ii) Which site template would you like to use? Mandy has a default site template that can get you up and running in no time. To start a new Mandy-powered site, simply type one of these commands:

```bash
mandy -i mysite -w angeldollface/mandy-template-site
# OR
mandy inits mysite wtmpl angeldollface/mandy-template-site
# OR
mandy --inits mysite --wtmpl angeldollface/mandy-template-site
```

This will create the directory `mysite` and put the following files inside it:

```text
mysite
├── LICENSE
├── README.md
├── assets
│   ├── banner
│   │   └── banner.png
│   ├── javascript
│   │   └── nav.js
│   └── logo
│       └── logo.png
├── config.json
├── content
│   ├── about.markdown
│   ├── blog.markdown
│   └── contact.markdown
├── data
│   └── nav.json
├── index.markdown
├── layouts
│   ├── blog.liquid
│   └── page.liquid
├── partials
│   ├── breaker.liquid
│   ├── footer.liquid
│   ├── header.liquid
│   ├── heading.liquid
│   ├── menu.liquid
│   ├── nav.liquid
│   └── scripts.liquid
├── posts
│   ├── 2023-05-26-My-first-post.markdown
│   └── 2023-06-26-Hello-World.markdown
└── sass
    ├── index.scss
    └── modules
        ├── _desktop.scss
        ├── _general.scss
        ├── _responsive.scss
        └── _vars.scss
```

These files are all files and directories that the template site at "[github.com/angeldollface/mandy-template-site](https://github.com/angeldollface/mandy-template-site)" contains.

## A BREAKDOWN OF THESE FILES

The most important files and directories in the tree view of the `mysite` directory are: `config.json`, `sass`, `data`, `partials`, `layouts`, and `posts`.

`config.json` contains some important configuration options for any Mandy-powered site. There a few configuration options that *have* to be present for Mandy-powered projects to build properly. You can find out more about how all that works [here](https://angeldollface.art/mandys-house/documentation/configuration/).

`sass` is the directory that contains the styling for your site's pages. This does not *have* to be there but it is a much more efficient way of managing your styling. [This page](https://angeldollface.art/mandys-house/documentation/styling/) explains things in more depth.

The `data` directory contains non-essential data for your Mandy-powered site. This data could be navigation links or social media links, any sort of data that is a list. You can read more about how to handle site data in Mandy-powered sites [here](https://angeldollface.art/mandys-house/documentation/data/).

`partials` contains partial templates. Since Mandy uses Liquid templates to make layouts for different types of pages, you may have to repeat certain bits of HTML. To avoid this, you can put these repetitive snippets into a partial Liquid template. These partial templates are stored in the `partials` directory. The same page that talks about how to use partials in Mandy sites, is also the page that talks about how to use Liquid in general in Mandy-powered sites.

Since the whole point of a static-site generator is for users to focus on their content, they need a way to know how to arrange that content on a web page. This is where Liquid layouts come in. Mandy stores and calls her layouts from the `layouts` directory. You can read more about how Mandy uses Liquid [here](https://angeldollface.art/mandys-house/documentation/layouts/).

The final directory to talk about is the `posts` directory. Most static-site generators allow users to loop through some form of content that follows a pattern. This could be posts on a blog, photographs in a photo album or some other form of patterned content. The pattern for posts on a blog would be for example that these posts follow a certain subject or are named in a certain format. In a Mandy-powered site's `config.json`, Mandy gives you the option to specify whether your site has, what she calls, "loop content". This is specified via the `hasLoopContent` configuration option. If this is set to `true`, Mandy will look for the option that specifies which directories in your project contain this patterned content. This is done via the `loopContentDirs` option. In this site template we've only specified one directory to make available as patterned content: The `posts` directory. This is for people who might want to build a blog. The `posts` directory contains all the posts for a blog in Markdown format. Please note that any "loop content" *must* be written in Markdown.

I hope I've given you a good overview of what files and folders a Mandy-powered site project can have and what they all do. Now it is time to talk about the most part of any site: content!

## WRITING SOME CONTENT

The content of this Mandy project is stored in the `content` and `posts` directory. The Markdown files in the `content` are not iterative or patterned which is why this directory wasn't specified in the `loopContenDirs` configuration option. You could add it but it wouldn't make much sense. 

As previously stated, content for Mandy sites is written in Markdown format. These documents have a very specific structure. There are two sections in every Markdown document. 

The first section is the "front matter" section. This section starts and ends with three dashes. In it, you specifiy different variables that belong to that specific document. In Mandy's case, you *need* to specify a layout to use for rendering this document as a web page. Any other variables inside this section are not strictly neccessary but may be required by the Liquid layouts of that particular Mandy template site. In our case right now, you should leave the front matter as it is. 

The second section is the actual text of your Markdown document. This is just text with special characters like hash signs or dashes indicating structural elements like headings or unordered lists.

[Here's a link](https://www.markdownguide.org/getting-started/) to how to write Markdown content using the "CommonMark" specification. Feel free to tinker with any of the content in the Markdown files in the Mandy site we just created. 

Before you deploy and show your shiny new site to the world at large, there are two final steps: Compiling your site and deploying your site on GitHub Pages. Please note that Deno Deploy and Netlfiy are also supported but this tutorial only explains how to deploy your site on GitHub Pages.

## SETTING THE "BASEURL"

Before we compile your site we have to first tell Mandy which environment we're working in. Are you testing your site locally on your own machine? In this case the environment would be `development`. Are you compiling your Mandy site in a production environment, i.e. an environment from which you will deploy the compiled site? You can tell Mandy which environment you're currently working in by setting the `MANDY_ENV` environment variable. This variable can be set to either `development` or `production`. Mandy needs to know the environment so that she can decide which "baseurl" to build your site with. The "baseurl" is a variable that tells the browser from which basic URL your pages, assets, and stylesheets are being loaded from. This is done via the `prod_url` and `dev_url` options in your project's configuration file. The former is for a production environment and the latter is for local testing. If the environment variable isn't set, your site will not build. It will not fail, Mandy will refuse to even analyze your site and print an error message telling you as much.

## COMPILING A MANDY SITE

I'm assuming you're happy with any changes you've made and would now like to compile your Mandy site into a set of HTML files that can be deployed. To do this, simply run one of the commands below:

```bash
mandy -c mysite
# OR
mandy comps mysite
# OR
mandy --comps mysite
```

This should produce a directory within `mysite` called `dist`. This directory contains your static site! Congratulations! You've just built your first statically-generated website! If you would like to test your changes, you can serve the built site on `localhost` by running one of these commands:

```bash
mandy -s mysite
# OR
mandy servs mysite
# OR
mandy --servs mysite
```

There's one step left: Deployment and showing your shiny new site to the world!

## DEPLOYMENT ON GITHUB

To get your site live on the internet, you need to have a GitHub account. For this blog post/tutorial, I'm assuming you already have this. To deploy your site, you need to push your Mandy project to a GitHub repository and then create a GitHub Action that builds and deploys your Mandy site. 

I'm assuming that you have pushed your Mandy project to a GitHub repository. If you haven't, please do this now. The GitHub Action we will create to build and deploy your Mandy project will first build your site into the `dist` folder and then push this folder to your repository's `gh-pages` branch. 

To do all this, first go to your repository's settings. Once there, go the "Actions" menu. Once there, go the "General" menu point and scroll down to "Workflow permissions". Click "Read and write permissions" and then click "Save". This enables GitHub Actions to push and pull to different branches in your repository. 

Once that is done, we need to create the configuration file for GitHub Actions. This file tells GitHub Actions which steps to execute every time you push to your repository. In your repo, create a folder called `.github`. Inside this folder, create a folder `workflows`. Inside the `workflows` folder, create a file called `main.yml`. Put the following into `main.yml`.

```YML
on: [push]
env:
  MANDY_ENV: production
name: Mandy CI
jobs:
  build_and_test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: angeldollface/mandy-github-action@v.0.3.2
      - name: "Build the Mandy site"
        run: mandy -c .
      - name: "Deploy"
        uses: JamesIves/github-pages-deploy-action@v4.2.5
        with:
          branch: gh-pages
          folder: dist
```

Mandy has her own GitHub Action to make the `mandy` command available for Mandy projects working with GitHub Actions. The structure of this file is very simple. First, we compile your Mandy-powered project. Then, we push the built site to the `gh-pages` branch. I'm assuming you have just done this, so go to your repository's "Actions" tab and wait for this workflow run to complete.

The final step is very simple. Head to your repository's settings once again. Once there, go to the "Pages" section. Under the heading "Build and deployment" set the "Source" to "Deploy from branch". Under the "Branch", set this to "gh-pages". Wait for the "pages build and deployment" action in your repository's Actions tab to complete. That's it! Your site should now be live under `yourusername.github.io/your-repo-name`, where `yourusername` is your GitHub username and `your-repo-name` is the name of the GitHub repository where you saved your Mandy project.

## CONCLUSION

I hope this post helped you get up and running with Mandy and that you've learned some new and interesting things. If you have questions or problems, you can always contact me on Mandy's Discord server or tweet at me under the [@angeldollface666](https://twitter.com/angeldollface66) handle. You can also DM me but I cannot promise that I will answer immediately. I'm quite a busy doll.

## FURTHER LINKS

Here are some important links that are part of the Mandy project:

- The repository containing the Rust source code: [angeldollface/mandy](https://github.com/angeldollface/mandy)
- Mandy's official website with documentation and other helpful resources: [Mandy's Site](https://angeldollface.art/mandys-house/)
- The official Mandy project Discord server: [Join](https://discord.gg/VR7eZFrf)