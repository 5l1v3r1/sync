(function() {
  var BufferedProcess, Emitter, PackageManager, Q, semver, url, _;

  _ = require('underscore-plus');

  BufferedProcess = require('atom').BufferedProcess;

  Emitter = require('emissary').Emitter;

  Q = require('q');

  semver = require('semver');

  url = require('url');

  Q.stopUnhandledRejectionTracking();

  module.exports = PackageManager = (function() {
    Emitter.includeInto(PackageManager);

    function PackageManager() {
      this.packagePromises = [];
    }

    PackageManager.prototype.runCommand = function(args, callback) {
      var command, errorLines, exit, outputLines, stderr, stdout;
      command = atom.packages.getApmPath();
      outputLines = [];
      stdout = function(lines) {
        return outputLines.push(lines);
      };
      errorLines = [];
      stderr = function(lines) {
        return errorLines.push(lines);
      };
      exit = function(code) {
        return callback(code, outputLines.join('\n'), errorLines.join('\n'));
      };
      args.push('--no-color');
      return new BufferedProcess({
        command: command,
        args: args,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
    };

    PackageManager.prototype.loadFeatured = function(callback) {
      var args, version;
      args = ['featured', '--json'];
      version = atom.getVersion();
      if (semver.valid(version)) {
        args.push('--compatible', version);
      }
      return this.runCommand(args, function(code, stdout, stderr) {
        var error, packages, _ref;
        if (code === 0) {
          try {
            packages = (_ref = JSON.parse(stdout)) != null ? _ref : [];
          } catch (_error) {
            error = _error;
            callback(error);
            return;
          }
          return callback(null, packages);
        } else {
          error = new Error('Fetching featured packages and themes failed.');
          error.stdout = stdout;
          error.stderr = stderr;
          return callback(error);
        }
      });
    };

    PackageManager.prototype.loadOutdated = function(callback) {
      var args, version;
      args = ['outdated', '--json'];
      version = atom.getVersion();
      if (semver.valid(version)) {
        args.push('--compatible', version);
      }
      return this.runCommand(args, function(code, stdout, stderr) {
        var error, packages, _ref;
        if (code === 0) {
          try {
            packages = (_ref = JSON.parse(stdout)) != null ? _ref : [];
          } catch (_error) {
            error = _error;
            callback(error);
            return;
          }
          return callback(null, packages);
        } else {
          error = new Error('Fetching outdated packages and themes failed.');
          error.stdout = stdout;
          error.stderr = stderr;
          return callback(error);
        }
      });
    };

    PackageManager.prototype.loadPackage = function(packageName, callback) {
      var args;
      args = ['view', packageName, '--json'];
      return this.runCommand(args, function(code, stdout, stderr) {
        var error, packages, _ref;
        if (code === 0) {
          try {
            packages = (_ref = JSON.parse(stdout)) != null ? _ref : [];
          } catch (_error) {
            error = _error;
            callback(error);
            return;
          }
          return callback(null, packages);
        } else {
          error = new Error("Fetching package '" + packageName + "' failed.");
          error.stdout = stdout;
          error.stderr = stderr;
          return callback(error);
        }
      });
    };

    PackageManager.prototype.getFeatured = function() {
      return this.featuredPromise != null ? this.featuredPromise : this.featuredPromise = Q.nbind(this.loadFeatured, this)();
    };

    PackageManager.prototype.getOutdated = function() {
      return this.outdatedPromise != null ? this.outdatedPromise : this.outdatedPromise = Q.nbind(this.loadOutdated, this)();
    };

    PackageManager.prototype.getPackage = function(packageName) {
      var _base;
      return (_base = this.packagePromises)[packageName] != null ? _base[packageName] : _base[packageName] = Q.nbind(this.loadPackage, this, packageName)();
    };

    PackageManager.prototype.search = function(query, options) {
      var args, deferred;
      if (options == null) {
        options = {};
      }
      deferred = Q.defer();
      args = ['search', query, '--json'];
      if (options.themes) {
        args.push('--themes');
      } else if (options.packages) {
        args.push('--packages');
      }
      this.runCommand(args, function(code, stdout, stderr) {
        var error, packages, _ref;
        if (code === 0) {
          try {
            packages = (_ref = JSON.parse(stdout)) != null ? _ref : [];
            return deferred.resolve(packages);
          } catch (_error) {
            error = _error;
            return deferred.reject(error);
          }
        } else {
          error = new Error("Searching for \u201C" + query + "\u201D failed.");
          error.stdout = stdout;
          error.stderr = stderr;
          return deferred.reject(error);
        }
      });
      return deferred.promise;
    };

    PackageManager.prototype.update = function(pack, newVersion, callback) {
      var activateOnFailure, activateOnSuccess, args, exit, name, theme;
      name = pack.name, theme = pack.theme;
      activateOnSuccess = !theme && !atom.packages.isPackageDisabled(name);
      activateOnFailure = atom.packages.isPackageActive(name);
      if (atom.packages.isPackageActive(name)) {
        atom.packages.deactivatePackage(name);
      }
      if (atom.packages.isPackageLoaded(name)) {
        atom.packages.unloadPackage(name);
      }
      args = ['install', "" + name + "@" + newVersion];
      exit = (function(_this) {
        return function(code, stdout, stderr) {
          var error;
          if (code === 0) {
            if (activateOnSuccess) {
              atom.packages.activatePackage(name);
            } else {
              atom.packages.loadPackage(name);
            }
            if (typeof callback === "function") {
              callback();
            }
            return _this.emitPackageEvent('updated', pack);
          } else {
            if (activateOnFailure) {
              atom.packages.activatePackage(name);
            }
            error = new Error("Updating to \u201C" + name + "@" + newVersion + "\u201D failed.");
            error.stdout = stdout;
            error.stderr = stderr;
            error.packageInstallError = !theme;
            _this.emitPackageEvent('update-failed', pack, error);
            return callback(error);
          }
        };
      })(this);
      this.emit('package-updating', pack);
      return this.runCommand(args, exit);
    };

    PackageManager.prototype.install = function(pack, callback) {
      var activateOnFailure, activateOnSuccess, args, exit, name, theme, version;
      name = pack.name, version = pack.version, theme = pack.theme;
      activateOnSuccess = !theme && !atom.packages.isPackageDisabled(name);
      activateOnFailure = atom.packages.isPackageActive(name);
      if (atom.packages.isPackageActive(name)) {
        atom.packages.deactivatePackage(name);
      }
      if (atom.packages.isPackageLoaded(name)) {
        atom.packages.unloadPackage(name);
      }
      args = ['install', "" + name + "@" + version];
      exit = (function(_this) {
        return function(code, stdout, stderr) {
          var error;
          if (code === 0) {
            if (activateOnSuccess) {
              atom.packages.activatePackage(name);
            } else {
              atom.packages.loadPackage(name);
            }
            if (typeof callback === "function") {
              callback();
            }
            return _this.emitPackageEvent('installed', pack);
          } else {
            if (activateOnFailure) {
              atom.packages.activatePackage(name);
            }
            error = new Error("Installing \u201C" + name + "@" + version + "\u201D failed.");
            error.stdout = stdout;
            error.stderr = stderr;
            error.packageInstallError = !theme;
            _this.emitPackageEvent('install-failed', pack, error);
            return callback(error);
          }
        };
      })(this);
      return this.runCommand(args, exit);
    };

    PackageManager.prototype.uninstall = function(pack, callback) {
      var name;
      name = pack.name;
      if (atom.packages.isPackageActive(name)) {
        atom.packages.deactivatePackage(name);
      }
      return this.runCommand(['uninstall', '--hard', name], (function(_this) {
        return function(code, stdout, stderr) {
          var error;
          if (code === 0) {
            if (atom.packages.isPackageLoaded(name)) {
              atom.packages.unloadPackage(name);
            }
            if (typeof callback === "function") {
              callback();
            }
            return _this.emitPackageEvent('uninstalled', pack);
          } else {
            error = new Error("Uninstalling \u201C" + name + "\u201D failed.");
            error.stdout = stdout;
            error.stderr = stderr;
            _this.emitPackageEvent('uninstall-failed', pack, error);
            return callback(error);
          }
        };
      })(this));
    };

    PackageManager.prototype.canUpgrade = function(installedPackage, availableVersion) {
      var installedVersion;
      if (installedPackage == null) {
        return false;
      }
      installedVersion = installedPackage.metadata.version;
      if (!semver.valid(installedVersion)) {
        return false;
      }
      if (!semver.valid(availableVersion)) {
        return false;
      }
      return semver.gt(availableVersion, installedVersion);
    };

    PackageManager.prototype.getPackageTitle = function(_arg) {
      var name;
      name = _arg.name;
      return _.undasherize(_.uncamelcase(name));
    };

    PackageManager.prototype.getRepositoryUrl = function(_arg) {
      var metadata, repoUrl, repository, _ref, _ref1;
      metadata = _arg.metadata;
      repository = metadata.repository;
      repoUrl = (_ref = (_ref1 = repository != null ? repository.url : void 0) != null ? _ref1 : repository) != null ? _ref : '';
      return repoUrl.replace(/\.git$/, '').replace(/\/+$/, '');
    };

    PackageManager.prototype.getAuthorUserName = function(pack) {
      var chunks, repoName, repoUrl;
      if (!(repoUrl = this.getRepositoryUrl(pack))) {
        return null;
      }
      repoName = url.parse(repoUrl).pathname;
      chunks = repoName.match('/(.+?)/');
      return chunks != null ? chunks[1] : void 0;
    };

    PackageManager.prototype.checkNativeBuildTools = function() {
      var deferred;
      deferred = Q.defer();
      this.runCommand(['install', '--check'], function(code, stdout, stderr) {
        if (code === 0) {
          return deferred.resolve();
        } else {
          return deferred.reject(new Error());
        }
      });
      return deferred.promise;
    };

    PackageManager.prototype.emitPackageEvent = function(eventName, pack, error) {
      var theme, _ref, _ref1;
      theme = (_ref = pack.theme) != null ? _ref : (_ref1 = pack.metadata) != null ? _ref1.theme : void 0;
      eventName = theme ? "theme-" + eventName : "package-" + eventName;
      return this.emit(eventName, pack, error);
    };

    return PackageManager;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc3luYy1zZXR0aW5ncy9saWIvcGFja2FnZS1tYW5hZ2VyLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUdBO0FBQUEsTUFBQSwyREFBQTs7QUFBQSxFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0Msa0JBQW1CLE9BQUEsQ0FBUSxNQUFSLEVBQW5CLGVBREQsQ0FBQTs7QUFBQSxFQUVDLFVBQVcsT0FBQSxDQUFRLFVBQVIsRUFBWCxPQUZELENBQUE7O0FBQUEsRUFHQSxDQUFBLEdBQUksT0FBQSxDQUFRLEdBQVIsQ0FISixDQUFBOztBQUFBLEVBSUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSlQsQ0FBQTs7QUFBQSxFQUtBLEdBQUEsR0FBTSxPQUFBLENBQVEsS0FBUixDQUxOLENBQUE7O0FBQUEsRUFPQSxDQUFDLENBQUMsOEJBQUYsQ0FBQSxDQVBBLENBQUE7O0FBQUEsRUFTQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osSUFBQSxPQUFPLENBQUMsV0FBUixDQUFvQixjQUFwQixDQUFBLENBQUE7O0FBRWEsSUFBQSx3QkFBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsZUFBRCxHQUFtQixFQUFuQixDQURXO0lBQUEsQ0FGYjs7QUFBQSw2QkFLQSxVQUFBLEdBQVksU0FBQyxJQUFELEVBQU8sUUFBUCxHQUFBO0FBQ1YsVUFBQSxzREFBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBZCxDQUFBLENBQVYsQ0FBQTtBQUFBLE1BQ0EsV0FBQSxHQUFjLEVBRGQsQ0FBQTtBQUFBLE1BRUEsTUFBQSxHQUFTLFNBQUMsS0FBRCxHQUFBO2VBQVcsV0FBVyxDQUFDLElBQVosQ0FBaUIsS0FBakIsRUFBWDtNQUFBLENBRlQsQ0FBQTtBQUFBLE1BR0EsVUFBQSxHQUFhLEVBSGIsQ0FBQTtBQUFBLE1BSUEsTUFBQSxHQUFTLFNBQUMsS0FBRCxHQUFBO2VBQVcsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsS0FBaEIsRUFBWDtNQUFBLENBSlQsQ0FBQTtBQUFBLE1BS0EsSUFBQSxHQUFPLFNBQUMsSUFBRCxHQUFBO2VBQ0wsUUFBQSxDQUFTLElBQVQsRUFBZSxXQUFXLENBQUMsSUFBWixDQUFpQixJQUFqQixDQUFmLEVBQXVDLFVBQVUsQ0FBQyxJQUFYLENBQWdCLElBQWhCLENBQXZDLEVBREs7TUFBQSxDQUxQLENBQUE7QUFBQSxNQVFBLElBQUksQ0FBQyxJQUFMLENBQVUsWUFBVixDQVJBLENBQUE7YUFTSSxJQUFBLGVBQUEsQ0FBZ0I7QUFBQSxRQUFDLFNBQUEsT0FBRDtBQUFBLFFBQVUsTUFBQSxJQUFWO0FBQUEsUUFBZ0IsUUFBQSxNQUFoQjtBQUFBLFFBQXdCLFFBQUEsTUFBeEI7QUFBQSxRQUFnQyxNQUFBLElBQWhDO09BQWhCLEVBVk07SUFBQSxDQUxaLENBQUE7O0FBQUEsNkJBaUJBLFlBQUEsR0FBYyxTQUFDLFFBQUQsR0FBQTtBQUNaLFVBQUEsYUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLENBQUMsVUFBRCxFQUFhLFFBQWIsQ0FBUCxDQUFBO0FBQUEsTUFDQSxPQUFBLEdBQVUsSUFBSSxDQUFDLFVBQUwsQ0FBQSxDQURWLENBQUE7QUFFQSxNQUFBLElBQXNDLE1BQU0sQ0FBQyxLQUFQLENBQWEsT0FBYixDQUF0QztBQUFBLFFBQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxjQUFWLEVBQTBCLE9BQTFCLENBQUEsQ0FBQTtPQUZBO2FBSUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFaLEVBQWtCLFNBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEdBQUE7QUFDaEIsWUFBQSxxQkFBQTtBQUFBLFFBQUEsSUFBRyxJQUFBLEtBQVEsQ0FBWDtBQUNFO0FBQ0UsWUFBQSxRQUFBLGdEQUFnQyxFQUFoQyxDQURGO1dBQUEsY0FBQTtBQUdFLFlBREksY0FDSixDQUFBO0FBQUEsWUFBQSxRQUFBLENBQVMsS0FBVCxDQUFBLENBQUE7QUFDQSxrQkFBQSxDQUpGO1dBQUE7aUJBTUEsUUFBQSxDQUFTLElBQVQsRUFBZSxRQUFmLEVBUEY7U0FBQSxNQUFBO0FBU0UsVUFBQSxLQUFBLEdBQVksSUFBQSxLQUFBLENBQU0sK0NBQU4sQ0FBWixDQUFBO0FBQUEsVUFDQSxLQUFLLENBQUMsTUFBTixHQUFlLE1BRGYsQ0FBQTtBQUFBLFVBRUEsS0FBSyxDQUFDLE1BQU4sR0FBZSxNQUZmLENBQUE7aUJBR0EsUUFBQSxDQUFTLEtBQVQsRUFaRjtTQURnQjtNQUFBLENBQWxCLEVBTFk7SUFBQSxDQWpCZCxDQUFBOztBQUFBLDZCQXFDQSxZQUFBLEdBQWMsU0FBQyxRQUFELEdBQUE7QUFDWixVQUFBLGFBQUE7QUFBQSxNQUFBLElBQUEsR0FBTyxDQUFDLFVBQUQsRUFBYSxRQUFiLENBQVAsQ0FBQTtBQUFBLE1BQ0EsT0FBQSxHQUFVLElBQUksQ0FBQyxVQUFMLENBQUEsQ0FEVixDQUFBO0FBRUEsTUFBQSxJQUFzQyxNQUFNLENBQUMsS0FBUCxDQUFhLE9BQWIsQ0FBdEM7QUFBQSxRQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsY0FBVixFQUEwQixPQUExQixDQUFBLENBQUE7T0FGQTthQUlBLElBQUMsQ0FBQSxVQUFELENBQVksSUFBWixFQUFrQixTQUFDLElBQUQsRUFBTyxNQUFQLEVBQWUsTUFBZixHQUFBO0FBQ2hCLFlBQUEscUJBQUE7QUFBQSxRQUFBLElBQUcsSUFBQSxLQUFRLENBQVg7QUFDRTtBQUNFLFlBQUEsUUFBQSxnREFBZ0MsRUFBaEMsQ0FERjtXQUFBLGNBQUE7QUFHRSxZQURJLGNBQ0osQ0FBQTtBQUFBLFlBQUEsUUFBQSxDQUFTLEtBQVQsQ0FBQSxDQUFBO0FBQ0Esa0JBQUEsQ0FKRjtXQUFBO2lCQU1BLFFBQUEsQ0FBUyxJQUFULEVBQWUsUUFBZixFQVBGO1NBQUEsTUFBQTtBQVNFLFVBQUEsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUFNLCtDQUFOLENBQVosQ0FBQTtBQUFBLFVBQ0EsS0FBSyxDQUFDLE1BQU4sR0FBZSxNQURmLENBQUE7QUFBQSxVQUVBLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFGZixDQUFBO2lCQUdBLFFBQUEsQ0FBUyxLQUFULEVBWkY7U0FEZ0I7TUFBQSxDQUFsQixFQUxZO0lBQUEsQ0FyQ2QsQ0FBQTs7QUFBQSw2QkF5REEsV0FBQSxHQUFhLFNBQUMsV0FBRCxFQUFjLFFBQWQsR0FBQTtBQUNYLFVBQUEsSUFBQTtBQUFBLE1BQUEsSUFBQSxHQUFPLENBQUMsTUFBRCxFQUFTLFdBQVQsRUFBc0IsUUFBdEIsQ0FBUCxDQUFBO2FBRUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFaLEVBQWtCLFNBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEdBQUE7QUFDaEIsWUFBQSxxQkFBQTtBQUFBLFFBQUEsSUFBRyxJQUFBLEtBQVEsQ0FBWDtBQUNFO0FBQ0UsWUFBQSxRQUFBLGdEQUFnQyxFQUFoQyxDQURGO1dBQUEsY0FBQTtBQUdFLFlBREksY0FDSixDQUFBO0FBQUEsWUFBQSxRQUFBLENBQVMsS0FBVCxDQUFBLENBQUE7QUFDQSxrQkFBQSxDQUpGO1dBQUE7aUJBTUEsUUFBQSxDQUFTLElBQVQsRUFBZSxRQUFmLEVBUEY7U0FBQSxNQUFBO0FBU0UsVUFBQSxLQUFBLEdBQVksSUFBQSxLQUFBLENBQU8sb0JBQUEsR0FBb0IsV0FBcEIsR0FBZ0MsV0FBdkMsQ0FBWixDQUFBO0FBQUEsVUFDQSxLQUFLLENBQUMsTUFBTixHQUFlLE1BRGYsQ0FBQTtBQUFBLFVBRUEsS0FBSyxDQUFDLE1BQU4sR0FBZSxNQUZmLENBQUE7aUJBR0EsUUFBQSxDQUFTLEtBQVQsRUFaRjtTQURnQjtNQUFBLENBQWxCLEVBSFc7SUFBQSxDQXpEYixDQUFBOztBQUFBLDZCQTJFQSxXQUFBLEdBQWEsU0FBQSxHQUFBOzRDQUNYLElBQUMsQ0FBQSxrQkFBRCxJQUFDLENBQUEsa0JBQW1CLENBQUMsQ0FBQyxLQUFGLENBQVEsSUFBQyxDQUFBLFlBQVQsRUFBdUIsSUFBdkIsQ0FBQSxDQUFBLEVBRFQ7SUFBQSxDQTNFYixDQUFBOztBQUFBLDZCQThFQSxXQUFBLEdBQWEsU0FBQSxHQUFBOzRDQUNYLElBQUMsQ0FBQSxrQkFBRCxJQUFDLENBQUEsa0JBQW1CLENBQUMsQ0FBQyxLQUFGLENBQVEsSUFBQyxDQUFBLFlBQVQsRUFBdUIsSUFBdkIsQ0FBQSxDQUFBLEVBRFQ7SUFBQSxDQTlFYixDQUFBOztBQUFBLDZCQWlGQSxVQUFBLEdBQVksU0FBQyxXQUFELEdBQUE7QUFDVixVQUFBLEtBQUE7d0VBQWlCLENBQUEsV0FBQSxTQUFBLENBQUEsV0FBQSxJQUFnQixDQUFDLENBQUMsS0FBRixDQUFRLElBQUMsQ0FBQSxXQUFULEVBQXNCLElBQXRCLEVBQTRCLFdBQTVCLENBQUEsQ0FBQSxFQUR2QjtJQUFBLENBakZaLENBQUE7O0FBQUEsNkJBb0ZBLE1BQUEsR0FBUSxTQUFDLEtBQUQsRUFBUSxPQUFSLEdBQUE7QUFDTixVQUFBLGNBQUE7O1FBRGMsVUFBVTtPQUN4QjtBQUFBLE1BQUEsUUFBQSxHQUFXLENBQUMsQ0FBQyxLQUFGLENBQUEsQ0FBWCxDQUFBO0FBQUEsTUFFQSxJQUFBLEdBQU8sQ0FBQyxRQUFELEVBQVcsS0FBWCxFQUFrQixRQUFsQixDQUZQLENBQUE7QUFHQSxNQUFBLElBQUcsT0FBTyxDQUFDLE1BQVg7QUFDRSxRQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsVUFBVixDQUFBLENBREY7T0FBQSxNQUVLLElBQUcsT0FBTyxDQUFDLFFBQVg7QUFDSCxRQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsWUFBVixDQUFBLENBREc7T0FMTDtBQUFBLE1BUUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFaLEVBQWtCLFNBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEdBQUE7QUFDaEIsWUFBQSxxQkFBQTtBQUFBLFFBQUEsSUFBRyxJQUFBLEtBQVEsQ0FBWDtBQUNFO0FBQ0UsWUFBQSxRQUFBLGdEQUFnQyxFQUFoQyxDQUFBO21CQUNBLFFBQVEsQ0FBQyxPQUFULENBQWlCLFFBQWpCLEVBRkY7V0FBQSxjQUFBO0FBSUUsWUFESSxjQUNKLENBQUE7bUJBQUEsUUFBUSxDQUFDLE1BQVQsQ0FBZ0IsS0FBaEIsRUFKRjtXQURGO1NBQUEsTUFBQTtBQU9FLFVBQUEsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUFPLHNCQUFBLEdBQXNCLEtBQXRCLEdBQTRCLGdCQUFuQyxDQUFaLENBQUE7QUFBQSxVQUNBLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFEZixDQUFBO0FBQUEsVUFFQSxLQUFLLENBQUMsTUFBTixHQUFlLE1BRmYsQ0FBQTtpQkFHQSxRQUFRLENBQUMsTUFBVCxDQUFnQixLQUFoQixFQVZGO1NBRGdCO01BQUEsQ0FBbEIsQ0FSQSxDQUFBO2FBcUJBLFFBQVEsQ0FBQyxRQXRCSDtJQUFBLENBcEZSLENBQUE7O0FBQUEsNkJBNEdBLE1BQUEsR0FBUSxTQUFDLElBQUQsRUFBTyxVQUFQLEVBQW1CLFFBQW5CLEdBQUE7QUFDTixVQUFBLDZEQUFBO0FBQUEsTUFBQyxZQUFBLElBQUQsRUFBTyxhQUFBLEtBQVAsQ0FBQTtBQUFBLE1BRUEsaUJBQUEsR0FBb0IsQ0FBQSxLQUFBLElBQWMsQ0FBQSxJQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFkLENBQWdDLElBQWhDLENBRnRDLENBQUE7QUFBQSxNQUdBLGlCQUFBLEdBQW9CLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixJQUE5QixDQUhwQixDQUFBO0FBSUEsTUFBQSxJQUF5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsSUFBOUIsQ0FBekM7QUFBQSxRQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWQsQ0FBZ0MsSUFBaEMsQ0FBQSxDQUFBO09BSkE7QUFLQSxNQUFBLElBQXFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixJQUE5QixDQUFyQztBQUFBLFFBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFkLENBQTRCLElBQTVCLENBQUEsQ0FBQTtPQUxBO0FBQUEsTUFPQSxJQUFBLEdBQU8sQ0FBQyxTQUFELEVBQVksRUFBQSxHQUFHLElBQUgsR0FBUSxHQUFSLEdBQVcsVUFBdkIsQ0FQUCxDQUFBO0FBQUEsTUFRQSxJQUFBLEdBQU8sQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEdBQUE7QUFDTCxjQUFBLEtBQUE7QUFBQSxVQUFBLElBQUcsSUFBQSxLQUFRLENBQVg7QUFDRSxZQUFBLElBQUcsaUJBQUg7QUFDRSxjQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixJQUE5QixDQUFBLENBREY7YUFBQSxNQUFBO0FBR0UsY0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQWQsQ0FBMEIsSUFBMUIsQ0FBQSxDQUhGO2FBQUE7O2NBS0E7YUFMQTttQkFNQSxLQUFDLENBQUEsZ0JBQUQsQ0FBa0IsU0FBbEIsRUFBNkIsSUFBN0IsRUFQRjtXQUFBLE1BQUE7QUFTRSxZQUFBLElBQXVDLGlCQUF2QztBQUFBLGNBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLElBQTlCLENBQUEsQ0FBQTthQUFBO0FBQUEsWUFDQSxLQUFBLEdBQVksSUFBQSxLQUFBLENBQU8sb0JBQUEsR0FBb0IsSUFBcEIsR0FBeUIsR0FBekIsR0FBNEIsVUFBNUIsR0FBdUMsZ0JBQTlDLENBRFosQ0FBQTtBQUFBLFlBRUEsS0FBSyxDQUFDLE1BQU4sR0FBZSxNQUZmLENBQUE7QUFBQSxZQUdBLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFIZixDQUFBO0FBQUEsWUFJQSxLQUFLLENBQUMsbUJBQU4sR0FBNEIsQ0FBQSxLQUo1QixDQUFBO0FBQUEsWUFLQSxLQUFDLENBQUEsZ0JBQUQsQ0FBa0IsZUFBbEIsRUFBbUMsSUFBbkMsRUFBeUMsS0FBekMsQ0FMQSxDQUFBO21CQU1BLFFBQUEsQ0FBUyxLQUFULEVBZkY7V0FESztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBUlAsQ0FBQTtBQUFBLE1BMEJBLElBQUMsQ0FBQSxJQUFELENBQU0sa0JBQU4sRUFBMEIsSUFBMUIsQ0ExQkEsQ0FBQTthQTJCQSxJQUFDLENBQUEsVUFBRCxDQUFZLElBQVosRUFBa0IsSUFBbEIsRUE1Qk07SUFBQSxDQTVHUixDQUFBOztBQUFBLDZCQTBJQSxPQUFBLEdBQVMsU0FBQyxJQUFELEVBQU8sUUFBUCxHQUFBO0FBQ1AsVUFBQSxzRUFBQTtBQUFBLE1BQUMsWUFBQSxJQUFELEVBQU8sZUFBQSxPQUFQLEVBQWdCLGFBQUEsS0FBaEIsQ0FBQTtBQUFBLE1BQ0EsaUJBQUEsR0FBb0IsQ0FBQSxLQUFBLElBQWMsQ0FBQSxJQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFkLENBQWdDLElBQWhDLENBRHRDLENBQUE7QUFBQSxNQUVBLGlCQUFBLEdBQW9CLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixJQUE5QixDQUZwQixDQUFBO0FBR0EsTUFBQSxJQUF5QyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsSUFBOUIsQ0FBekM7QUFBQSxRQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWQsQ0FBZ0MsSUFBaEMsQ0FBQSxDQUFBO09BSEE7QUFJQSxNQUFBLElBQXFDLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixJQUE5QixDQUFyQztBQUFBLFFBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFkLENBQTRCLElBQTVCLENBQUEsQ0FBQTtPQUpBO0FBQUEsTUFNQSxJQUFBLEdBQU8sQ0FBQyxTQUFELEVBQVksRUFBQSxHQUFHLElBQUgsR0FBUSxHQUFSLEdBQVcsT0FBdkIsQ0FOUCxDQUFBO0FBQUEsTUFPQSxJQUFBLEdBQU8sQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEdBQUE7QUFDTCxjQUFBLEtBQUE7QUFBQSxVQUFBLElBQUcsSUFBQSxLQUFRLENBQVg7QUFDRSxZQUFBLElBQUcsaUJBQUg7QUFDRSxjQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZCxDQUE4QixJQUE5QixDQUFBLENBREY7YUFBQSxNQUFBO0FBR0UsY0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQWQsQ0FBMEIsSUFBMUIsQ0FBQSxDQUhGO2FBQUE7O2NBS0E7YUFMQTttQkFNQSxLQUFDLENBQUEsZ0JBQUQsQ0FBa0IsV0FBbEIsRUFBK0IsSUFBL0IsRUFQRjtXQUFBLE1BQUE7QUFTRSxZQUFBLElBQXVDLGlCQUF2QztBQUFBLGNBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLElBQTlCLENBQUEsQ0FBQTthQUFBO0FBQUEsWUFDQSxLQUFBLEdBQVksSUFBQSxLQUFBLENBQU8sbUJBQUEsR0FBbUIsSUFBbkIsR0FBd0IsR0FBeEIsR0FBMkIsT0FBM0IsR0FBbUMsZ0JBQTFDLENBRFosQ0FBQTtBQUFBLFlBRUEsS0FBSyxDQUFDLE1BQU4sR0FBZSxNQUZmLENBQUE7QUFBQSxZQUdBLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFIZixDQUFBO0FBQUEsWUFJQSxLQUFLLENBQUMsbUJBQU4sR0FBNEIsQ0FBQSxLQUo1QixDQUFBO0FBQUEsWUFLQSxLQUFDLENBQUEsZ0JBQUQsQ0FBa0IsZ0JBQWxCLEVBQW9DLElBQXBDLEVBQTBDLEtBQTFDLENBTEEsQ0FBQTttQkFNQSxRQUFBLENBQVMsS0FBVCxFQWZGO1dBREs7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQVBQLENBQUE7YUF5QkEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLEVBMUJPO0lBQUEsQ0ExSVQsQ0FBQTs7QUFBQSw2QkFzS0EsU0FBQSxHQUFXLFNBQUMsSUFBRCxFQUFPLFFBQVAsR0FBQTtBQUNULFVBQUEsSUFBQTtBQUFBLE1BQUMsT0FBUSxLQUFSLElBQUQsQ0FBQTtBQUVBLE1BQUEsSUFBeUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLElBQTlCLENBQXpDO0FBQUEsUUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFkLENBQWdDLElBQWhDLENBQUEsQ0FBQTtPQUZBO2FBSUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxDQUFDLFdBQUQsRUFBYyxRQUFkLEVBQXdCLElBQXhCLENBQVosRUFBMkMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEdBQUE7QUFDekMsY0FBQSxLQUFBO0FBQUEsVUFBQSxJQUFHLElBQUEsS0FBUSxDQUFYO0FBQ0UsWUFBQSxJQUFxQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsSUFBOUIsQ0FBckM7QUFBQSxjQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBZCxDQUE0QixJQUE1QixDQUFBLENBQUE7YUFBQTs7Y0FDQTthQURBO21CQUVBLEtBQUMsQ0FBQSxnQkFBRCxDQUFrQixhQUFsQixFQUFpQyxJQUFqQyxFQUhGO1dBQUEsTUFBQTtBQUtFLFlBQUEsS0FBQSxHQUFZLElBQUEsS0FBQSxDQUFPLHFCQUFBLEdBQXFCLElBQXJCLEdBQTBCLGdCQUFqQyxDQUFaLENBQUE7QUFBQSxZQUNBLEtBQUssQ0FBQyxNQUFOLEdBQWUsTUFEZixDQUFBO0FBQUEsWUFFQSxLQUFLLENBQUMsTUFBTixHQUFlLE1BRmYsQ0FBQTtBQUFBLFlBR0EsS0FBQyxDQUFBLGdCQUFELENBQWtCLGtCQUFsQixFQUFzQyxJQUF0QyxFQUE0QyxLQUE1QyxDQUhBLENBQUE7bUJBSUEsUUFBQSxDQUFTLEtBQVQsRUFURjtXQUR5QztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTNDLEVBTFM7SUFBQSxDQXRLWCxDQUFBOztBQUFBLDZCQXVMQSxVQUFBLEdBQVksU0FBQyxnQkFBRCxFQUFtQixnQkFBbkIsR0FBQTtBQUNWLFVBQUEsZ0JBQUE7QUFBQSxNQUFBLElBQW9CLHdCQUFwQjtBQUFBLGVBQU8sS0FBUCxDQUFBO09BQUE7QUFBQSxNQUVBLGdCQUFBLEdBQW1CLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUY3QyxDQUFBO0FBR0EsTUFBQSxJQUFBLENBQUEsTUFBMEIsQ0FBQyxLQUFQLENBQWEsZ0JBQWIsQ0FBcEI7QUFBQSxlQUFPLEtBQVAsQ0FBQTtPQUhBO0FBSUEsTUFBQSxJQUFBLENBQUEsTUFBMEIsQ0FBQyxLQUFQLENBQWEsZ0JBQWIsQ0FBcEI7QUFBQSxlQUFPLEtBQVAsQ0FBQTtPQUpBO2FBTUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxnQkFBVixFQUE0QixnQkFBNUIsRUFQVTtJQUFBLENBdkxaLENBQUE7O0FBQUEsNkJBZ01BLGVBQUEsR0FBaUIsU0FBQyxJQUFELEdBQUE7QUFDZixVQUFBLElBQUE7QUFBQSxNQURpQixPQUFELEtBQUMsSUFDakIsQ0FBQTthQUFBLENBQUMsQ0FBQyxXQUFGLENBQWMsQ0FBQyxDQUFDLFdBQUYsQ0FBYyxJQUFkLENBQWQsRUFEZTtJQUFBLENBaE1qQixDQUFBOztBQUFBLDZCQW1NQSxnQkFBQSxHQUFrQixTQUFDLElBQUQsR0FBQTtBQUNoQixVQUFBLDBDQUFBO0FBQUEsTUFEa0IsV0FBRCxLQUFDLFFBQ2xCLENBQUE7QUFBQSxNQUFDLGFBQWMsU0FBZCxVQUFELENBQUE7QUFBQSxNQUNBLE9BQUEsaUhBQXlDLEVBRHpDLENBQUE7YUFFQSxPQUFPLENBQUMsT0FBUixDQUFnQixRQUFoQixFQUEwQixFQUExQixDQUE2QixDQUFDLE9BQTlCLENBQXNDLE1BQXRDLEVBQThDLEVBQTlDLEVBSGdCO0lBQUEsQ0FuTWxCLENBQUE7O0FBQUEsNkJBd01BLGlCQUFBLEdBQW1CLFNBQUMsSUFBRCxHQUFBO0FBQ2pCLFVBQUEseUJBQUE7QUFBQSxNQUFBLElBQUEsQ0FBQSxDQUFtQixPQUFBLEdBQVUsSUFBQyxDQUFBLGdCQUFELENBQWtCLElBQWxCLENBQVYsQ0FBbkI7QUFBQSxlQUFPLElBQVAsQ0FBQTtPQUFBO0FBQUEsTUFDQSxRQUFBLEdBQVcsR0FBRyxDQUFDLEtBQUosQ0FBVSxPQUFWLENBQWtCLENBQUMsUUFEOUIsQ0FBQTtBQUFBLE1BRUEsTUFBQSxHQUFTLFFBQVEsQ0FBQyxLQUFULENBQWUsU0FBZixDQUZULENBQUE7OEJBR0EsTUFBUSxDQUFBLENBQUEsV0FKUztJQUFBLENBeE1uQixDQUFBOztBQUFBLDZCQThNQSxxQkFBQSxHQUF1QixTQUFBLEdBQUE7QUFDckIsVUFBQSxRQUFBO0FBQUEsTUFBQSxRQUFBLEdBQVcsQ0FBQyxDQUFDLEtBQUYsQ0FBQSxDQUFYLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxVQUFELENBQVksQ0FBQyxTQUFELEVBQVksU0FBWixDQUFaLEVBQW9DLFNBQUMsSUFBRCxFQUFPLE1BQVAsRUFBZSxNQUFmLEdBQUE7QUFDbEMsUUFBQSxJQUFHLElBQUEsS0FBUSxDQUFYO2lCQUNFLFFBQVEsQ0FBQyxPQUFULENBQUEsRUFERjtTQUFBLE1BQUE7aUJBR0UsUUFBUSxDQUFDLE1BQVQsQ0FBb0IsSUFBQSxLQUFBLENBQUEsQ0FBcEIsRUFIRjtTQURrQztNQUFBLENBQXBDLENBRkEsQ0FBQTthQVFBLFFBQVEsQ0FBQyxRQVRZO0lBQUEsQ0E5TXZCLENBQUE7O0FBQUEsNkJBbU9BLGdCQUFBLEdBQWtCLFNBQUMsU0FBRCxFQUFZLElBQVosRUFBa0IsS0FBbEIsR0FBQTtBQUNoQixVQUFBLGtCQUFBO0FBQUEsTUFBQSxLQUFBLCtFQUFrQyxDQUFFLGNBQXBDLENBQUE7QUFBQSxNQUNBLFNBQUEsR0FBZSxLQUFILEdBQWUsUUFBQSxHQUFRLFNBQXZCLEdBQXlDLFVBQUEsR0FBVSxTQUQvRCxDQUFBO2FBRUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOLEVBQWlCLElBQWpCLEVBQXVCLEtBQXZCLEVBSGdCO0lBQUEsQ0FuT2xCLENBQUE7OzBCQUFBOztNQVhGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/xy/.atom/packages/sync-settings/lib/package-manager.coffee
