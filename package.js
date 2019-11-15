Package.describe({
  name: 'krishaamer:flow-router-breadcrumb',
  summary: 'Provide a easy and flexible way to add breadcrumb trail support for Ostrio FlowRouter.',
  version: '1.2.2',
  git: 'https://github.com/krishaamer/flow-router-breadcrumb.git'
});

function configurePackage(api) {

  // Core Dependencies
  api.use(
    [
      'blaze@2.0.0',
      'templating@1.0.5',
      'underscore@1.0.4',
      'meteor@1.1.10'
    ]
  );

  api.use('ostrio:flow-router-extra@3.4.3');
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
