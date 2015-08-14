Package.describe({
  name: 'ahref:flow-router-breadcrumb',
  summary: 'This package will provide a easy way to add a breadcrumb to Iron.Router with enough flexibility.',
  version: '1.0.16',
  git: 'https://github.com/rfox90/meteor-breadcrumb-plugin/'
});

function configurePackage(api) {

  if(api.versionsFrom) {
    api.versionsFrom('METEOR@0.9.0');
  }

  // Core Dependencies
  api.use(
    [
      'blaze@2.0.0',
      'templating@1.0.5',
      'underscore',
      'ui',
      'meteor',
      'reactive-var'
    ]
  );

  api.use('kadira:flow-router@2.1.1', 'client');
  api.use('kadira:blaze-layout@2.0.0', 'client');
  api.addFiles('lib/breadcrumb.html',['client']);
  api.addFiles('lib/breadcrumb.js',['client']);
  

  api.export('Breadcrumb');
}

Package.onUse(function(api) {
  configurePackage(api);
});

Package.onTest(function(api) {
  configurePackage(api);

  api.use('tinytest');
  api.addFiles('tests/breadcrumb-tests.js');
});
