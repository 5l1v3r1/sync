(function() {
  var BufferedProcess, Emitter, Runner, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ref = require('atom'), Emitter = _ref.Emitter, BufferedProcess = _ref.BufferedProcess;

  module.exports = Runner = (function() {
    Runner.prototype.bufferedProcess = null;

    function Runner(scriptOptions, emitter) {
      this.scriptOptions = scriptOptions;
      this.emitter = emitter != null ? emitter : new Emitter;
      this.createOnErrorFunc = __bind(this.createOnErrorFunc, this);
      this.onExit = __bind(this.onExit, this);
      this.stderrFunc = __bind(this.stderrFunc, this);
      this.stdoutFunc = __bind(this.stdoutFunc, this);
    }

    Runner.prototype.run = function(command, extraArgs, codeContext, inputString) {
      var args, exit, options, stderr, stdout;
      if (inputString == null) {
        inputString = null;
      }
      this.startTime = new Date();
      args = this.args(codeContext, extraArgs);
      options = this.options();
      stdout = this.stdoutFunc;
      stderr = this.stderrFunc;
      exit = this.onExit;
      this.bufferedProcess = new BufferedProcess({
        command: command,
        args: args,
        options: options,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
      if (inputString) {
        this.bufferedProcess.process.stdin.write(inputString);
        this.bufferedProcess.process.stdin.end();
      }
      return this.bufferedProcess.onWillThrowError(this.createOnErrorFunc(command));
    };

    Runner.prototype.stdoutFunc = function(output) {
      return this.emitter.emit('did-write-to-stdout', {
        message: output
      });
    };

    Runner.prototype.onDidWriteToStdout = function(callback) {
      return this.emitter.on('did-write-to-stdout', callback);
    };

    Runner.prototype.stderrFunc = function(output) {
      return this.emitter.emit('did-write-to-stderr', {
        message: output
      });
    };

    Runner.prototype.onDidWriteToStderr = function(callback) {
      return this.emitter.on('did-write-to-stderr', callback);
    };

    Runner.prototype.destroy = function() {
      return this.emitter.dispose();
    };

    Runner.prototype.getCwd = function() {
      var cwd, paths, workingDirectoryProvided;
      cwd = this.scriptOptions.workingDirectory;
      workingDirectoryProvided = (cwd != null) && cwd !== '';
      paths = atom.project.getPaths();
      if (!workingDirectoryProvided && (paths != null ? paths.length : void 0) > 0) {
        cwd = paths[0];
      }
      return cwd;
    };

    Runner.prototype.stop = function() {
      if (this.bufferedProcess != null) {
        this.bufferedProcess.kill();
        return this.bufferedProcess = null;
      }
    };

    Runner.prototype.onExit = function(returnCode) {
      var executionTime;
      this.bufferedProcess = null;
      if ((atom.config.get('script.enableExecTime')) === true && this.startTime) {
        executionTime = (new Date().getTime() - this.startTime.getTime()) / 1000;
      }
      return this.emitter.emit('did-exit', {
        executionTime: executionTime,
        returnCode: returnCode
      });
    };

    Runner.prototype.onDidExit = function(callback) {
      return this.emitter.on('did-exit', callback);
    };

    Runner.prototype.createOnErrorFunc = function(command) {
      return (function(_this) {
        return function(nodeError) {
          _this.bufferedProcess = null;
          _this.emitter.emit('did-not-run', {
            command: command
          });
          return nodeError.handle();
        };
      })(this);
    };

    Runner.prototype.onDidNotRun = function(callback) {
      return this.emitter.on('did-not-run', callback);
    };

    Runner.prototype.options = function() {
      return {
        cwd: this.getCwd(),
        env: this.scriptOptions.mergedEnv(process.env)
      };
    };

    Runner.prototype.args = function(codeContext, extraArgs) {
      var args;
      args = (this.scriptOptions.cmdArgs.concat(extraArgs)).concat(this.scriptOptions.scriptArgs);
      if ((this.scriptOptions.cmd == null) || this.scriptOptions.cmd === '') {
        args = codeContext.shebangCommandArgs().concat(args);
      }
      return args;
    };

    return Runner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ydW5uZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNDQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQSxPQUE2QixPQUFBLENBQVEsTUFBUixDQUE3QixFQUFDLGVBQUEsT0FBRCxFQUFVLHVCQUFBLGVBQVYsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixxQkFBQSxlQUFBLEdBQWlCLElBQWpCLENBQUE7O0FBTWEsSUFBQSxnQkFBRSxhQUFGLEVBQWtCLE9BQWxCLEdBQUE7QUFBMEMsTUFBekMsSUFBQyxDQUFBLGdCQUFBLGFBQXdDLENBQUE7QUFBQSxNQUF6QixJQUFDLENBQUEsNEJBQUEsVUFBVSxHQUFBLENBQUEsT0FBYyxDQUFBO0FBQUEsbUVBQUEsQ0FBQTtBQUFBLDZDQUFBLENBQUE7QUFBQSxxREFBQSxDQUFBO0FBQUEscURBQUEsQ0FBMUM7SUFBQSxDQU5iOztBQUFBLHFCQVFBLEdBQUEsR0FBSyxTQUFDLE9BQUQsRUFBVSxTQUFWLEVBQXFCLFdBQXJCLEVBQWtDLFdBQWxDLEdBQUE7QUFDSCxVQUFBLG1DQUFBOztRQURxQyxjQUFjO09BQ25EO0FBQUEsTUFBQSxJQUFDLENBQUEsU0FBRCxHQUFpQixJQUFBLElBQUEsQ0FBQSxDQUFqQixDQUFBO0FBQUEsTUFFQSxJQUFBLEdBQU8sSUFBQyxDQUFBLElBQUQsQ0FBTSxXQUFOLEVBQW1CLFNBQW5CLENBRlAsQ0FBQTtBQUFBLE1BR0EsT0FBQSxHQUFVLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FIVixDQUFBO0FBQUEsTUFJQSxNQUFBLEdBQVMsSUFBQyxDQUFBLFVBSlYsQ0FBQTtBQUFBLE1BS0EsTUFBQSxHQUFTLElBQUMsQ0FBQSxVQUxWLENBQUE7QUFBQSxNQU1B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

//# sourceURL=/home/xy/.atom/packages/script/lib/runner.coffee
