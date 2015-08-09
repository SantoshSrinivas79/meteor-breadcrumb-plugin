
// Level 0
FlowRouter.route('/', {
  name: 'dashboard',
  template: 'dashboard',
  title: 'Dashboard',
  data: {name: 'Gandalf'},
  action: function() {
  	BlazeLayout.render("main", {content: "dashboard"});
  }
});

// when you navigate to "/one" automatically render the template named "One".
FlowRouter.route('/analytics', {
  name: 'analytics',
  parent: 'dashboard',
  template: 'analytics',
  title: 'Analytics',
  action: function() {
  	BlazeLayout.render("main", {content: "analytics"});
  }
});

// when you navigate to "/one" automatically render the template named "One".
FlowRouter.route('/analytics/books', {
  name: 'analytics.books',
  parent: 'analytics',
  template: 'analyticsBooks',
  title: 'Category Books',
  action: function() {
  	BlazeLayout.render("main", {content: "analyticsBooks"});
  }
});

// when you navigate to "/two" automatically render the template named "Two".
FlowRouter.route('/tags', {
  name: 'tags',
  parent: 'dashboard',
  template: 'tags',
  title: 'Taglist',
  action: function() {
  	BlazeLayout.render("main", {content: "tags"});
  }
});

// when you navigate to "/one" automatically render the template named "One".
FlowRouter.route('/tag/:_name', {
  name: 'tag',
  parent: 'tags',
  template: 'tagDetail',
  title: 'Detailpage for :_name',
  data: function () {
    return this.params;
  },
  action: function() {
  	BlazeLayout.render("main", {content: "tagDetail"});
  }
});
