(function() {
  var BufferedProcess, DESCRIPTION, GitHubApi, PackageManager, REMOVE_KEYS, SyncSettings, Tracker, fs, _, _ref,
    __hasProp = {}.hasOwnProperty;

  BufferedProcess = require('atom').BufferedProcess;

  fs = require('fs');

  _ = require('underscore-plus');

  _ref = [], GitHubApi = _ref[0], PackageManager = _ref[1], Tracker = _ref[2];

  DESCRIPTION = 'Atom configuration storage operated by http://atom.io/packages/sync-settings';

  REMOVE_KEYS = ["sync-settings"];

  SyncSettings = {
    config: require('./config.coffee'),
    activate: function() {
      return setImmediate((function(_this) {
        return function() {
          if (GitHubApi == null) {
            GitHubApi = require('github');
          }
          if (PackageManager == null) {
            PackageManager = require('./package-manager');
          }
          if (Tracker == null) {
            Tracker = require('./tracker');
          }
          atom.commands.add('atom-workspace', "sync-settings:backup", function() {
            _this.backup();
            return _this.tracker.track('Backup');
          });
          atom.commands.add('atom-workspace', "sync-settings:restore", function() {
            _this.restore();
            return _this.tracker.track('Restore');
          });
          atom.commands.add('atom-workspace', "sync-settings:view-backup", function() {
            _this.viewBackup();
            return _this.tracker.track('View backup');
          });
          if (atom.config.get('sync-settings.checkForUpdatedBackup')) {
            _this.checkForUpdate();
          }
          _this.tracker = new Tracker('sync-settings._analyticsUserId', 'sync-settings.analytics');
          return _this.tracker.trackActivate();
        };
      })(this));
    },
    deactivate: function() {
      return this.tracker.trackDeactivate();
    },
    serialize: function() {},
    checkForUpdate: function(cb) {
      if (cb == null) {
        cb = null;
      }
      if (atom.config.get('sync-settings.gistId')) {
        console.debug('checking latest backup...');
        return this.createClient().gists.get({
          id: atom.config.get('sync-settings.gistId')
        }, (function(_this) {
          return function(err, res) {
            var SyntaxError, message;
            console.debug(err, res);
            if (err) {
              console.error("error while retrieving the gist. does it exists?", err);
              try {
                message = JSON.parse(err.message).message;
                if (message === 'Not Found') {
                  message = 'Gist ID Not Found';
                }
              } catch (_error) {
                SyntaxError = _error;
                message = err.message;
              }
              atom.notifications.addError("sync-settings: Error retrieving your settings. (" + message + ")");
              return typeof cb === "function" ? cb() : void 0;
            }
            console.debug("latest backup version " + res.history[0].version);
            if (res.history[0].version !== atom.config.get('sync-settings._lastBackupHash')) {
              _this.notifyNewerBackup();
            } else {
              _this.notifyBackupUptodate();
            }
            return typeof cb === "function" ? cb() : void 0;
          };
        })(this));
      } else {
        return this.notifyMissingGistId();
      }
    },
    notifyNewerBackup: function() {
      var notification, workspaceElement;
      workspaceElement = atom.views.getView(atom.workspace);
      return notification = atom.notifications.addWarning("sync-settings: Your settings are out of date.", {
        dismissable: true,
        buttons: [
          {
            text: "Backup",
            onDidClick: function() {
              atom.commands.dispatch(workspaceElement, "sync-settings:backup");
              return notification.dismiss();
            }
          }, {
            text: "View backup",
            onDidClick: function() {
              return atom.commands.dispatch(workspaceElement, "sync-settings:view-backup");
            }
          }, {
            text: "Restore",
            onDidClick: function() {
              atom.commands.dispatch(workspaceElement, "sync-settings:restore");
              return notification.dismiss();
            }
          }, {
            text: "Dismiss",
            onDidClick: function() {
              return notification.dismiss();
            }
          }
        ]
      });
    },
    notifyBackupUptodate: function() {
      return atom.notifications.addSuccess("sync-settings: Latest backup is already applied.");
    },
    notifyMissingGistId: function() {
      return atom.notifications.addError("sync-settings: Missing gist ID");
    },
    backup: function(cb) {
      var cmtend, cmtstart, ext, file, files, _i, _len, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
      if (cb == null) {
        cb = null;
      }
      files = {};
      if (atom.config.get('sync-settings.syncSettings')) {
        files["settings.json"] = {
          content: JSON.stringify(atom.config.settings, this.filterSettings, '\t')
        };
      }
      if (atom.config.get('sync-settings.syncPackages')) {
        files["packages.json"] = {
          content: JSON.stringify(this.getPackages(), null, '\t')
        };
      }
      if (atom.config.get('sync-settings.syncKeymap')) {
        files["keymap.cson"] = {
          content: (_ref1 = this.fileContent(atom.keymaps.getUserKeymapPath())) != null ? _ref1 : "# keymap file (not found)"
        };
      }
      if (atom.config.get('sync-settings.syncStyles')) {
        files["styles.less"] = {
          content: (_ref2 = this.fileContent(atom.styles.getUserStyleSheetPath())) != null ? _ref2 : "// styles file (not found)"
        };
      }
      if (atom.config.get('sync-settings.syncInit')) {
        files["init.coffee"] = {
          content: (_ref3 = this.fileContent(atom.config.configDirPath + "/init.coffee")) != null ? _ref3 : "# initialization file (not found)"
        };
      }
      if (atom.config.get('sync-settings.syncSnippets')) {
        files["snippets.cson"] = {
          content: (_ref4 = this.fileContent(atom.config.configDirPath + "/snippets.cson")) != null ? _ref4 : "# snippets file (not found)"
        };
      }
      _ref6 = (_ref5 = atom.config.get('sync-settings.extraFiles')) != null ? _ref5 : [];
      for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
        file = _ref6[_i];
        ext = file.slice(file.lastIndexOf(".")).toLowerCase();
        cmtstart = "#";
        if (ext === ".less" || ext === ".scss" || ext === ".js") {
          cmtstart = "//";
        }
        if (ext === ".css") {
          cmtstart = "/*";
        }
        cmtend = "";
        if (ext === ".css") {
          cmtend = "*/";
        }
        files[file] = {
          content: (_ref7 = this.fileContent(atom.config.configDirPath + ("/" + file))) != null ? _ref7 : "" + cmtstart + " " + file + " (not found) " + cmtend
        };
      }
      return this.createClient().gists.edit({
        id: atom.config.get('sync-settings.gistId'),
        description: "automatic update by http://atom.io/packages/sync-settings",
        files: files
      }, function(err, res) {
        var message;
        if (err) {
          console.error("error backing up data: " + err.message, err);
          message = JSON.parse(err.message).message;
          if (message === 'Not Found') {
            message = 'Gist ID Not Found';
          }
          atom.notifications.addError("sync-settings: Error backing up your settings. (" + message + ")");
        } else {
          atom.config.set('sync-settings._lastBackupHash', res.history[0].version);
          atom.notifications.addSuccess("sync-settings: Your settings were successfully backed up. <br/><a href='" + res.html_url + "'>Click here to open your Gist.</a>");
        }
        return typeof cb === "function" ? cb(err, res) : void 0;
      });
    },
    viewBackup: function() {
      var Shell, gistId;
      Shell = require('shell');
      gistId = atom.config.get('sync-settings.gistId');
      return Shell.openExternal("https://gist.github.com/" + gistId);
    },
    getPackages: function() {
      var info, name, theme, version, _ref1, _ref2, _results;
      _ref1 = atom.packages.getLoadedPackages();
      _results = [];
      for (name in _ref1) {
        if (!__hasProp.call(_ref1, name)) continue;
        info = _ref1[name];
        _ref2 = info.metadata, name = _ref2.name, version = _ref2.version, theme = _ref2.theme;
        _results.push({
          name: name,
          version: version,
          theme: theme
        });
      }
      return _results;
    },
    restore: function(cb) {
      if (cb == null) {
        cb = null;
      }
      return this.createClient().gists.get({
        id: atom.config.get('sync-settings.gistId')
      }, (function(_this) {
        return function(err, res) {
          var callbackAsync, file, filename, message, _ref1;
          if (err) {
            console.error("error while retrieving the gist. does it exists?", err);
            message = JSON.parse(err.message).message;
            if (message === 'Not Found') {
              message = 'Gist ID Not Found';
            }
            atom.notifications.addError("sync-settings: Error retrieving your settings. (" + message + ")");
            return;
          }
          callbackAsync = false;
          _ref1 = res.files;
          for (filename in _ref1) {
            if (!__hasProp.call(_ref1, filename)) continue;
            file = _ref1[filename];
            switch (filename) {
              case 'settings.json':
                if (atom.config.get('sync-settings.syncSettings')) {
                  _this.applySettings('', JSON.parse(file.content));
                }
                break;
              case 'packages.json':
                if (atom.config.get('sync-settings.syncPackages')) {
                  callbackAsync = true;
                  _this.installMissingPackages(JSON.parse(file.content), cb);
                }
                break;
              case 'keymap.cson':
                if (atom.config.get('sync-settings.syncKeymap')) {
                  fs.writeFileSync(atom.keymaps.getUserKeymapPath(), file.content);
                }
                break;
              case 'styles.less':
                if (atom.config.get('sync-settings.syncStyles')) {
                  fs.writeFileSync(atom.styles.getUserStyleSheetPath(), file.content);
                }
                break;
              case 'init.coffee':
                if (atom.config.get('sync-settings.syncInit')) {
                  fs.writeFileSync(atom.config.configDirPath + "/init.coffee", file.content);
                }
                break;
              case 'snippets.cson':
                if (atom.config.get('sync-settings.syncSnippets')) {
                  fs.writeFileSync(atom.config.configDirPath + "/snippets.cson", file.content);
                }
                break;
              default:
                fs.writeFileSync("" + atom.config.configDirPath + "/" + filename, file.content);
            }
          }
          atom.config.set('sync-settings._lastBackupHash', res.history[0].version);
          atom.notifications.addSuccess("sync-settings: Your settings were successfully synchronized.");
          if (!callbackAsync) {
            return cb();
          }
        };
      })(this));
    },
    createClient: function() {
      var github, token;
      token = atom.config.get('sync-settings.personalAccessToken');
      console.debug("Creating GitHubApi client with token = " + token);
      github = new GitHubApi({
        version: '3.0.0',
        protocol: 'https'
      });
      github.authenticate({
        type: 'oauth',
        token: token
      });
      return github;
    },
    filterSettings: function(key, value) {
      if (key === "") {
        return value;
      }
      if (~REMOVE_KEYS.indexOf(key)) {
        return void 0;
      }
      return value;
    },
    applySettings: function(pref, settings) {
      var key, keyPath, value, _results;
      _results = [];
      for (key in settings) {
        value = settings[key];
        keyPath = "" + pref + "." + key;
        if (_.isObject(value) && !_.isArray(value)) {
          _results.push(this.applySettings(keyPath, value));
        } else {
          console.debug("config.set " + keyPath.slice(1) + "=" + value);
          _results.push(atom.config.set(keyPath.slice(1), value));
        }
      }
      return _results;
    },
    installMissingPackages: function(packages, cb) {
      var pending, pkg, _i, _len;
      pending = 0;
      for (_i = 0, _len = packages.length; _i < _len; _i++) {
        pkg = packages[_i];
        if (atom.packages.isPackageLoaded(pkg.name)) {
          continue;
        }
        pending++;
        this.installPackage(pkg, function() {
          pending--;
          if (pending === 0) {
            return typeof cb === "function" ? cb() : void 0;
          }
        });
      }
      if (pending === 0) {
        return typeof cb === "function" ? cb() : void 0;
      }
    },
    installPackage: function(pack, cb) {
      var packageManager, type;
      type = pack.theme ? 'theme' : 'package';
      console.info("Installing " + type + " " + pack.name + "...");
      packageManager = new PackageManager();
      return packageManager.install(pack, function(error) {
        var _ref1;
        if (error != null) {
          console.error("Installing " + type + " " + pack.name + " failed", (_ref1 = error.stack) != null ? _ref1 : error, error.stderr);
        } else {
          console.info("Installed " + type + " " + pack.name);
        }
        return typeof cb === "function" ? cb(error) : void 0;
      });
    },
    fileContent: function(filePath) {
      var e;
      try {
        return fs.readFileSync(filePath, {
          encoding: 'utf8'
        }) || null;
      } catch (_error) {
        e = _error;
        console.error("Error reading file " + filePath + ". Probably doesn't exist.", e);
        return null;
      }
    }
  };

  module.exports = SyncSettings;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc3luYy1zZXR0aW5ncy9saWIvc3luYy1zZXR0aW5ncy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLE1BQUEsd0dBQUE7SUFBQSw2QkFBQTs7QUFBQSxFQUFDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQUFELENBQUE7O0FBQUEsRUFDQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQUZKLENBQUE7O0FBQUEsRUFHQSxPQUF1QyxFQUF2QyxFQUFDLG1CQUFELEVBQVksd0JBQVosRUFBNEIsaUJBSDVCLENBQUE7O0FBQUEsRUFNQSxXQUFBLEdBQWMsOEVBTmQsQ0FBQTs7QUFBQSxFQU9BLFdBQUEsR0FBYyxDQUFDLGVBQUQsQ0FQZCxDQUFBOztBQUFBLEVBU0EsWUFBQSxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQVEsT0FBQSxDQUFRLGlCQUFSLENBQVI7QUFBQSxJQUVBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFFUixZQUFBLENBQWEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTs7WUFFWCxZQUFhLE9BQUEsQ0FBUSxRQUFSO1dBQWI7O1lBQ0EsaUJBQWtCLE9BQUEsQ0FBUSxtQkFBUjtXQURsQjs7WUFFQSxVQUFXLE9BQUEsQ0FBUSxXQUFSO1dBRlg7QUFBQSxVQUlBLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFBb0Msc0JBQXBDLEVBQTRELFNBQUEsR0FBQTtBQUMxRCxZQUFBLEtBQUMsQ0FBQSxNQUFELENBQUEsQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxPQUFPLENBQUMsS0FBVCxDQUFlLFFBQWYsRUFGMEQ7VUFBQSxDQUE1RCxDQUpB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

//# sourceURL=/home/xy/.atom/packages/sync-settings/lib/sync-settings.coffee
