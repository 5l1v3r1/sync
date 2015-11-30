(function() {
  var CommandContext, grammarMap;

  grammarMap = require('./grammars');

  module.exports = CommandContext = (function() {
    function CommandContext() {}

    CommandContext.prototype.command = null;

    CommandContext.prototype.args = [];

    CommandContext.build = function(runtime, runOptions, codeContext) {
      var buildArgsArray, commandContext, error, errorSendByArgs;
      commandContext = new CommandContext;
      try {
        if ((runOptions.cmd == null) || runOptions.cmd === '') {
          commandContext.command = codeContext.shebangCommand() || grammarMap[codeContext.lang][codeContext.argType].command;
        } else {
          commandContext.command = runOptions.cmd;
        }
        buildArgsArray = grammarMap[codeContext.lang][codeContext.argType].args;
      } catch (_error) {
        error = _error;
        runtime.modeNotSupported(codeContext.argType, codeContext.lang);
        return false;
      }
      try {
        commandContext.args = buildArgsArray(codeContext);
      } catch (_error) {
        errorSendByArgs = _error;
        runtime.didNotBuildArgs(errorSendByArgs);
        return false;
      }
      return commandContext;
    };

    return CommandContext;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9jb21tYW5kLWNvbnRleHQuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBCQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxZQUFSLENBQWIsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007Z0NBQ0o7O0FBQUEsNkJBQUEsT0FBQSxHQUFTLElBQVQsQ0FBQTs7QUFBQSw2QkFDQSxJQUFBLEdBQU0sRUFETixDQUFBOztBQUFBLElBR0EsY0FBQyxDQUFBLEtBQUQsR0FBUSxTQUFDLE9BQUQsRUFBVSxVQUFWLEVBQXNCLFdBQXRCLEdBQUE7QUFDTixVQUFBLHNEQUFBO0FBQUEsTUFBQSxjQUFBLEdBQWlCLEdBQUEsQ0FBQSxjQUFqQixDQUFBO0FBRUE7QUFDRSxRQUFBLElBQU8sd0JBQUosSUFBdUIsVUFBVSxDQUFDLEdBQVgsS0FBa0IsRUFBNUM7QUFFRSxVQUFBLGNBQWMsQ0FBQyxPQUFmLEdBQXlCLFdBQVcsQ0FBQyxjQUFaLENBQUEsQ0FBQSxJQUFnQyxVQUFXLENBQUEsV0FBVyxDQUFDLElBQVosQ0FBa0IsQ0FBQSxXQUFXLENBQUMsT0FBWixDQUFvQixDQUFDLE9BQTNHLENBRkY7U0FBQSxNQUFBO0FBSUUsVUFBQSxjQUFjLENBQUMsT0FBZixHQUF5QixVQUFVLENBQUMsR0FBcEMsQ0FKRjtTQUFBO0FBQUEsUUFNQSxjQUFBLEdBQWlCLFVBQVcsQ0FBQSxXQUFXLENBQUMsSUFBWixDQUFrQixDQUFBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLENBQUMsSUFObkUsQ0FERjtPQUFBLGNBQUE7QUFVRSxRQURJLGNBQ0osQ0FBQTtBQUFBLFFBQUEsT0FBTyxDQUFDLGdCQUFSLENBQXlCLFdBQVcsQ0FBQyxPQUFyQyxFQUE4QyxXQUFXLENBQUMsSUFBMUQsQ0FBQSxDQUFBO0FBQ0EsZUFBTyxLQUFQLENBWEY7T0FGQTtBQWVBO0FBQ0UsUUFBQSxjQUFjLENBQUMsSUFBZixHQUFzQixjQUFBLENBQWUsV0FBZixDQUF0QixDQURGO09BQUEsY0FBQTtBQUdFLFFBREksd0JBQ0osQ0FBQTtBQUFBLFFBQUEsT0FBTyxDQUFDLGVBQVIsQ0FBd0IsZUFBeEIsQ0FBQSxDQUFBO0FBQ0EsZUFBTyxLQUFQLENBSkY7T0FmQTthQXNCQSxlQXZCTTtJQUFBLENBSFIsQ0FBQTs7MEJBQUE7O01BSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/script/lib/command-context.coffee
