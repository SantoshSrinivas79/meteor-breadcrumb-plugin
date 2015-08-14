/* Package-scope variables */
var privateVar;

String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


var getRouteByName = function(name) {
	//XXX: We use a private variable here, FlowRouter may change and bork this variable as much as they like which might break the entire package
	//TODO: Request a public variable way of getting this map?
	return FlowRouter._routesMap[name];
};
var enrichRouteObject = function(routeName, isCurrent) {
  // replace all parameters in the title
  var routeOptions = getRouteByName(routeName) && getRouteByName(routeName).options;
  var title = (routeOptions && routeOptions.hasOwnProperty('title')) ? routeOptions.title : FlowRouter.options.title;
  if ('function' === typeof title)
    title = _.bind(title, FlowRouter.current())();
  var params = FlowRouter.current().params;
  if (title) {
    for (var i in params) {
      title = title && title.replace(
        new RegExp((':'+i).replace(/\+/g, "\\+"), "g"), params[i]);
    }
    if (!getRouteByName(routeName).options.noCaps)
      title = title && title.capitalize();
  } else {
    title = null;

  }

  if(isCurrent) {
    cssClasses = 'active';
  } else {
    cssClasses = '';
  }

  if (title) return {
    'routeName': routeName,
    'params': params,
    'title': title,
    'cssClasses': cssClasses,
    'url': FlowRouter.path(routeName,FlowRouter.current().params,FlowRouter.current().queryParams),
    'route': getRouteByName(routeName)
  }
}

var getAllParents = function() {
	console.log('running breadcrumbs');
  if(FlowRouter.current().route) {
    var current = FlowRouter.current().route.name;
    var parent = getRouteByName(FlowRouter.current().route.name).options.parent;
    if ('function' === typeof parent)
      parent = _.bind(parent, FlowRouter.current())()

    if(parent) {
      return getParentParent([enrichRouteObject(current,true),enrichRouteObject(parent)]);
    } else {
      return [enrichRouteObject(current)];
    }
  } else {
    // no routes have been specified
    return [];
  }

}

// parents must be always an array
var getParentParent = function(parents) {
  var lastParent = parents[parents.length-1];
  if(newParent = (lastParent && getRouteByName(lastParent.routeName).options.parent)) {
    if ('function' === typeof newParent) {
		newParent = _.bind(newParent, FlowRouter.current())()
    }
    parents.push(enrichRouteObject(newParent))
    return getParentParent(parents);
  } else {
    return parents;
  }
}



Breadcrumb = {
  getAll: function() {
  	console.log('getAll');
    return _.compact(getAllParents()).reverse();
  }
};

UI.registerHelper('Breadcrumb', function(template) {
  return Breadcrumb.getAll();
});
//I can't get the breadcrumb template to re-run on a path change. 
Meteor.startup(function(){
	Template.breadcrumb.onRendered(function(){
		var self = this;
		self.autorun(function(){
			FlowRouter.watchPathChange();
			console.log('Path Change in breadcrumb template');
			console.log(Breadcrumb.getAll());
		})
	});
});
