meteor-breadcrumb-plugin(FlowRouter Edition)
========================

This package will provide a easy way to add a breadcrumb with enough flexibility to your project.

This FlowRouter version attempts to provide the same functionality found in the Iron Router version.

# Current Issues

* It current utilizes a private variable within FlowRouter which may cause it to break on FlowRouter updates.( I'll submit an issue about this once the other issues are resolved)

# Try the [demo](http://meteor-breadcrumb-plugin-basic-example.meteor.com) which can be found on [github](https://github.com/rfox90/meteor-breadcrumb-plugin/tree/master/examples/basic)

# Dependencies

* Flow-Router >=2.0
* Meteor >1.0

# Compatibility

* works out of the box with bootstrap3
* use the pre existing template or use your own

# Installation

Use `meteor add ahref:flow-router-breadcrumb` to add the package to your meteor app

# Usage

* You need to add two parameters to your flow routes which are `parent` and `title`

## 1. Example Flow Router with multiple levels

### In this example the Breadcrumb would look or the url `/dashboard/analytics/books` like: `Dashboard / Analytics / Category Books`

```
// Level 0
FlowRouter.route('/', {
  name: 'dashboard',
  title: 'Dashboard'
});

// Level 1
FlowRouter.route('/dashboard/analytics', {
  name: 'dashboard.analytics',
  parent: 'dashboard', // this should be the name variable of the parent route
  title: 'Analytics'
});

// Level 2
FlowRouter.route('/dashboard/analytics/books', {
  name: 'dashboard.analytics.books',
  parent: 'dashboard.analytics', // this should be the name variable of the parent route
  title: 'Category Books'
});
```

## 2. Example Dynamic Flow Route

### In this example the Breadcrumb would look for the url `/post/hello-world` like: `Home / Blogpost Hello-World`

```
FlowRouter.route('/', {
  name: 'home',
  template: 'home',
  title: 'Home'
});

FlowRouter.route('/post/:_name', {
  name: 'post',
  parent: 'home', // this should be the name variable of the parent route
  title: 'Blogpost :_name' // the variable :_name will be automatically replaced with the value from the url
});
```

### In this example the Breadcrumb would look for the url `/post/today-post` (`/post/yesterday-post`) like: `Today Posts / Today Post 15:50` (`Yesterday Posts / Yesterday Post 15:50`) 

```javascript
FlowRouter.route('/today', {
  name: 'post.today',
  template: 'todayPosts',
  title: 'Today posts'
});

FlowRouter.route('/yesterday', {
  name: 'post.yesterday',
  template: 'yesterdayPosts',
  title: 'Yesterday posts'
});

FlowRouter.route('/post/:_name', {
  name: 'post',
  parent: function(){// we can use  function to determine parent. "this" value will be FlowRouter.current()
    if (isTodayPost()){//some function to detect time of post
        return "post.today";
      }
      return "post.yesterday";
  }, 
  title: function(){// We can use function as 
     return ":_name" + getPostTime(this.); //some function to return formatted post time    
  } 
});
```

## 3. Example use of the de-slugify feature
```
It's a common thing to provide a slug of a title/name of document in route. This leads to breadcrumb in a form:

level 1 > My-awesome-title > level 3
What we usually want is for that to look like:

level 1 > My Awesome Title > level 3

If You specify the slug parameter in your route configuration like this:

title: ':param',
slug: '-'
```
Then all the '-' characters in the title will be changed into ' ' and the title will get capitalized as usual.

## Example custom template for navigation

### Please note, that you dont have to use a custom template with the name `breadcrumb`, you can use the existing one out of the box by simply using `{{> breadcrumb}}` to include the preexisting template (which looks exact like the following example) anywhere in your own templates.

```
<template name="breadcrumb">
    <ol class="breadcrumb">
        {{#each Breadcrumb}}
            <li class="{{cssClasses}}"><a href="{{url}}">{{title}}</a></li>
        {{/each}}
    </ol>
</template>
```

## Example access of the breadcrumb in Javascript

```
if (Meteor.is_client) {
  Template.analytics.rendered = function(){
    console.log(Breadcrumb.getAll()); // you can access the breadcrumb objects in a template helper as well
  }
}
```
