(function() {
  var CommandContext, Emitter, Runtime, _;

  CommandContext = require('./command-context');

  _ = require('underscore');

  Emitter = require('atom').Emitter;

  module.exports = Runtime = (function() {
    Runtime.prototype.observers = [];

    function Runtime(runner, codeContextBuilder, observers, emitter) {
      this.runner = runner;
      this.codeContextBuilder = codeContextBuilder;
      this.observers = observers != null ? observers : [];
      this.emitter = emitter != null ? emitter : new Emitter;
      this.scriptOptions = this.runner.scriptOptions;
      _.each(this.observers, (function(_this) {
        return function(observer) {
          return observer.observe(_this);
        };
      })(this));
    }

    Runtime.prototype.addObserver = function(observer) {
      this.observers.push(observer);
      return observer.observe(this);
    };

    Runtime.prototype.destroy = function() {
      this.stop();
      this.runner.destroy();
      _.each(this.observers, (function(_this) {
        return function(observer) {
          return observer.destroy();
        };
      })(this));
      this.emitter.dispose();
      return this.codeContextBuilder.destroy();
    };

    Runtime.prototype.execute = function(argType, input) {
      var codeContext, commandContext;
      if (argType == null) {
        argType = "Selection Based";
      }
      if (input == null) {
        input = null;
      }
      this.emitter.emit('did-execute-start');
      codeContext = this.codeContextBuilder.buildCodeContext(atom.workspace.getActiveTextEditor(), argType);
      if (codeContext.lang == null) {
        return;
      }
      commandContext = CommandContext.build(this, this.scriptOptions, codeContext);
      if (!commandContext) {
        return;
      }
      this.emitter.emit('did-context-create', {
        lang: codeContext.lang,
        filename: codeContext.filename,
        lineNumber: codeContext.lineNumber
      });
      return this.runner.run(commandContext.command, commandContext.args, codeContext, input);
    };

    Runtime.prototype.stop = function() {
      return this.runner.stop();
    };

    Runtime.prototype.onDidExecuteStart = function(callback) {
      return this.emitter.on('did-execute-start', callback);
    };

    Runtime.prototype.onDidNotSpecifyLanguage = function(callback) {
      return this.codeContextBuilder.onDidNotSpecifyLanguage(callback);
    };

    Runtime.prototype.onDidNotSupportLanguage = function(callback) {
      return this.codeContextBuilder.onDidNotSupportLanguage(callback);
    };

    Runtime.prototype.onDidNotSupportMode = function(callback) {
      return this.emitter.on('did-not-support-mode', callback);
    };

    Runtime.prototype.onDidNotBuildArgs = function(callback) {
      return this.emitter.on('did-not-build-args', callback);
    };

    Runtime.prototype.onDidContextCreate = function(callback) {
      return this.emitter.on('did-context-create', callback);
    };

    Runtime.prototype.onDidWriteToStdout = function(callback) {
      return this.runner.onDidWriteToStdout(callback);
    };

    Runtime.prototype.onDidWriteToStderr = function(callback) {
      return this.runner.onDidWriteToStderr(callback);
    };

    Runtime.prototype.onDidExit = function(callback) {
      return this.runner.onDidExit(callback);
    };

    Runtime.prototype.onDidNotRun = function(callback) {
      return this.runner.onDidNotRun(callback);
    };

    Runtime.prototype.modeNotSupported = function(argType, lang) {
      return this.emitter.emit('did-not-support-mode', {
        argType: argType,
        lang: lang
      });
    };

    Runtime.prototype.didNotBuildArgs = function(error) {
      return this.emitter.emit('did-not-build-args', {
        error: error
      });
    };

    return Runtime;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW50aW1lLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxtQ0FBQTs7QUFBQSxFQUFBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG1CQUFSLENBQWpCLENBQUE7O0FBQUEsRUFFQSxDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVIsQ0FGSixDQUFBOztBQUFBLEVBSUMsVUFBVyxPQUFBLENBQVEsTUFBUixFQUFYLE9BSkQsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixzQkFBQSxTQUFBLEdBQVcsRUFBWCxDQUFBOztBQUthLElBQUEsaUJBQUUsTUFBRixFQUFXLGtCQUFYLEVBQWdDLFNBQWhDLEVBQWlELE9BQWpELEdBQUE7QUFDWCxNQURZLElBQUMsQ0FBQSxTQUFBLE1BQ2IsQ0FBQTtBQUFBLE1BRHFCLElBQUMsQ0FBQSxxQkFBQSxrQkFDdEIsQ0FBQTtBQUFBLE1BRDBDLElBQUMsQ0FBQSxnQ0FBQSxZQUFZLEVBQ3ZELENBQUE7QUFBQSxNQUQyRCxJQUFDLENBQUEsNEJBQUEsVUFBVSxHQUFBLENBQUEsT0FDdEUsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxhQUF6QixDQUFBO0FBQUEsTUFDQSxDQUFDLENBQUMsSUFBRixDQUFPLElBQUMsQ0FBQSxTQUFSLEVBQW1CLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLFFBQUQsR0FBQTtpQkFBYyxRQUFRLENBQUMsT0FBVCxDQUFpQixLQUFqQixFQUFkO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkIsQ0FEQSxDQURXO0lBQUEsQ0FMYjs7QUFBQSxzQkFlQSxXQUFBLEdBQWEsU0FBQyxRQUFELEdB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

//# sourceURL=/home/xy/.atom/packages/script/lib/runtime.coffee
