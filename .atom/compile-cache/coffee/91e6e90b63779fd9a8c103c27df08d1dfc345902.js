(function() {
  var hyperclickProvider, provider;

  provider = require('./provider');

  hyperclickProvider = require('./hyperclickProvider');

  module.exports = {
    config: {
      caseInsensitiveCompletion: {
        type: 'boolean',
        "default": true,
        title: 'Case Insensitive Completion',
        description: 'The completion is by default case insensitive.'
      },
      showDescriptions: {
        type: 'boolean',
        "default": true,
        title: 'Show descriptions',
        description: 'Show doc strings from functions, classes, etc.'
      },
      outputProviderErrors: {
        type: 'boolean',
        "default": false,
        title: 'Output Provider Errors',
        description: 'Select if you would like to see the provider errors when they happen. By default they are hidden. Note that critical errors are always shown.'
      },
      outputDebug: {
        type: 'boolean',
        "default": false,
        title: 'Output Debug Logs',
        description: 'Select if you would like to see debug information in developer tools logs. May slow down your editor.'
      },
      useSnippets: {
        type: 'string',
        "default": 'none',
        "enum": ['none', 'all', 'required'],
        title: 'Autocomplete Function Parameters',
        description: 'Automatically complete function arguments after typing left parenthesis character. Use completion key to jump between arguments.'
      },
      pythonPath: {
        type: 'string',
        "default": '',
        title: 'Path to python directory',
        description: 'Optional. Set it if default values are not working for you or you want to use specific python version. For example: `/usr/local/Cellar/python/2.7.3/bin` or `E:\\Python2.7`'
      },
      pythonExecutable: {
        type: 'string',
        "default": 'python',
        "enum": ['python', 'python2', 'python3'],
        title: 'Python executable name',
        description: 'Set it if default values are not working for you or you want to use specific python version.'
      },
      extraPaths: {
        type: 'string',
        "default": '',
        title: 'Extra PATH',
        description: 'Semicolon separated list of modules to additionally include for autocomplete.\nYou can use $PROJECT variable here to include project specific folders like virtual environment.\nNote that it still should be valid python package.\nFor example: $PROJECT/env/lib/python2.7/site-packages.'
      },
      fuzzyMatcher: {
        type: 'boolean',
        "default": false,
        title: 'Use fuzzy matcher for completions',
        description: 'Typing `stdr` will match `stderr`. May significantly slow down completions on slow machines.'
      }
    },
    activate: function(state) {
      return provider.constructor();
    },
    deactivate: function() {
      return provider.dispose();
    },
    getProvider: function() {
      return provider;
    },
    getHyperclickProvider: function() {
      return hyperclickProvider;
    },
    consumeSnippets: function(snippetsManager) {
      return provider.setSnippetsManager(snippetsManager);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLXB5dGhvbi9saWIvbWFpbi5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsNEJBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFlBQVIsQ0FBWCxDQUFBOztBQUFBLEVBQ0Esa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHNCQUFSLENBRHJCLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLHlCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLFFBRUEsS0FBQSxFQUFPLDZCQUZQO0FBQUEsUUFHQSxXQUFBLEVBQWEsZ0RBSGI7T0FERjtBQUFBLE1BS0EsZ0JBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO0FBQUEsUUFFQSxLQUFBLEVBQU8sbUJBRlA7QUFBQSxRQUdBLFdBQUEsRUFBYSxnREFIYjtPQU5GO0FBQUEsTUFVQSxvQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7QUFBQSxRQUVBLEtBQUEsRUFBTyx3QkFGUDtBQUFBLFFBR0EsV0FBQSxFQUFhLCtJQUhiO09BWEY7QUFBQSxNQWVBLFdBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO0FBQUEsUUFFQSxLQUFBLEVBQU8sbUJBRlA7QUFBQSxRQUdBLFdBQUEsRUFBYSx1R0FIYjtPQWhCRjtBQUFBLE1Bb0JBLFdBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxNQURUO0FBQUEsUUFFQSxNQUFBLEVBQU0sQ0FBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixVQUFoQixDQUZOO0FBQUEsUUFHQSxLQUFBLEVBQU8sa0NBSFA7QUFBQSxRQUlBLFdBQUEsRUFBYSxrSUFKYjtPQXJCRjtBQUFBLE1BMEJBLFVBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxFQURUO0FBQUEsUUFFQSxLQUFBLEVBQU8sMEJBRlA7QUFBQSxRQUdBLFdBQUEsRUFBYSw2S0FIYjtPQTNCRjtBQUFBLE1BK0JBLGdCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsUUFEVDtBQUFBLFFBRUEsTUFBQSxFQUFNLENBQUMsUUFBRCxFQUFXLFNBQVgsRUFBc0IsU0FBdEIsQ0FGTjtBQUFBLFFBR0EsS0FBQSxFQUFPLHdCQUhQO0FBQUEsUUFJQSxXQUFBLEVBQWEsOEZBSmI7T0FoQ0Y7QUFBQSxNQXFDQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsRUFEVDtBQUFBLFFBRUEsS0FBQSxFQUFPLFlBRlA7QUFBQSxRQUdBLFdBQUEsRUFBYSw2UkFIYjtPQXRDRjtBQUFBLE1BOENBLFlBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO0FBQUEsUUFFQSxLQUFBLEVBQU8sbUNBRlA7QUFBQSxRQUdBLFdBQUEsRUFBYSw4RkFIYjtPQS9DRjtLQURGO0FBQUEsSUFxREEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQVcsUUFBUSxDQUFDLFdBQVQsQ0FBQSxFQUFYO0lBQUEsQ0FyRFY7QUFBQSxJQXVEQSxVQUFBLEVBQVksU0FBQSxHQUFBO2FBQUcsUUFBUSxDQUFDLE9BQVQsQ0FBQSxFQUFIO0lBQUEsQ0F2RFo7QUFBQSxJQXlEQSxXQUFBLEVBQWEsU0FBQSxHQUFBO2FBQUcsU0FBSDtJQUFBLENBekRiO0FBQUEsSUEyREEscUJBQUEsRUFBdUIsU0FBQSxHQUFBO2FBQUcsbUJBQUg7SUFBQSxDQTNEdkI7QUFBQSxJQTZEQSxlQUFBLEVBQWlCLFNBQUMsZUFBRCxHQUFBO2FBQ2YsUUFBUSxDQUFDLGtCQUFULENBQTRCLGVBQTVCLEVBRGU7SUFBQSxDQTdEakI7R0FKRixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/autocomplete-python/lib/main.coffee
