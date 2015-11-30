(function() {
  var CodeContext, OperatingSystem, grammarMap;

  CodeContext = require('../lib/code-context');

  OperatingSystem = require('../lib/grammar-utils/operating-system');

  grammarMap = require('../lib/grammars');

  describe('grammarMap', function() {
    beforeEach(function() {
      this.codeContext = new CodeContext('test.txt', '/tmp/test.txt', null);
      this.dummyTextSource = {};
      return this.dummyTextSource.getText = function() {
        return "";
      };
    });
    it("has a command and an args function set for each grammar's mode", function() {
      var argList, commandContext, lang, mode, modes, _results;
      this.codeContext.textSource = this.dummyTextSource;
      _results = [];
      for (lang in grammarMap) {
        modes = grammarMap[lang];
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (mode in modes) {
            commandContext = modes[mode];
            expect(commandContext.command).toBeDefined();
            argList = commandContext.args(this.codeContext);
            _results1.push(expect(argList).toBeDefined());
          }
          return _results1;
        }).call(this));
      }
      return _results;
    });
    return describe('Operating system specific runners', function() {
      beforeEach(function() {
        this._originalPlatform = OperatingSystem.platform;
        return this.reloadGrammar = function() {
          delete require.cache[require.resolve('../lib/grammars.coffee')];
          return grammarMap = require('../lib/grammars.coffee');
        };
      });
      afterEach(function() {
        OperatingSystem.platform = this._originalPlatform;
        return this.reloadGrammar();
      });
      describe('C', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['C'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['C'];
          return expect(grammar).toBe(void 0);
        });
      });
      describe('C++', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['C++'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang\+\+/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['C++'];
          return expect(grammar).toBe(void 0);
        });
      });
      describe('F#', function() {
        it('returns "fsi" as command for File Based runner on Windows', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['F#'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('fsi');
          expect(args[0]).toEqual('--exec');
          return expect(args[1]).toEqual(this.codeContext.filepath);
        });
        return it('returns "fsharpi" as command for File Based runner when platform is not Windows', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['F#'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('fsharpi');
          expect(args[0]).toEqual('--exec');
          return expect(args[1]).toEqual(this.codeContext.filepath);
        });
      });
      describe('Objective-C', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C'];
          return expect(grammar).toBe(void 0);
        });
      });
      return describe('Objective-C++', function() {
        it('returns the appropriate File Based runner on Mac OS X', function() {
          var args, fileBasedRunner, grammar;
          OperatingSystem.platform = function() {
            return 'darwin';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C++'];
          fileBasedRunner = grammar['File Based'];
          args = fileBasedRunner.args(this.codeContext);
          expect(fileBasedRunner.command).toEqual('bash');
          expect(args[0]).toEqual('-c');
          return expect(args[1]).toMatch(/^xcrun clang\+\+/);
        });
        return it('is not defined on other operating systems', function() {
          var grammar;
          OperatingSystem.platform = function() {
            return 'win32';
          };
          this.reloadGrammar();
          grammar = grammarMap['Objective-C++'];
          return expect(grammar).toBe(void 0);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L3NwZWMvZ3JhbW1hcnMtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0NBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLHFCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUNBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHVDQUFSLENBRGxCLENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGlCQUFSLENBRmIsQ0FBQTs7QUFBQSxFQUlBLFFBQUEsQ0FBUyxZQUFULEVBQXVCLFNBQUEsR0FBQTtBQUNyQixJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLFVBQVosRUFBd0IsZUFBeEIsRUFBeUMsSUFBekMsQ0FBbkIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGVBQUQsR0FBbUIsRUFGbkIsQ0FBQTthQUdBLElBQUMsQ0FBQSxlQUFlLENBQUMsT0FBakIsR0FBMkIsU0FBQSxHQUFBO2VBQUcsR0FBSDtNQUFBLEVBSmxCO0lBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxJQU1BLEVBQUEsQ0FBRyxnRUFBSCxFQUFxRSxTQUFBLEdBQUE7QUFDbkUsVUFBQSxvREFBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxVQUFiLEdBQTBCLElBQUMsQ0FBQSxlQUEzQixDQUFBO0FBQ0E7V0FBQSxrQkFBQTtpQ0FBQTtBQUNFOztBQUFBO2VBQUEsYUFBQTt5Q0FBQTtBQUNFLFlBQUEsTUFBQSxDQUFPLGNBQWMsQ0FBQyxPQUF0QixDQUE4QixDQUFDLFdBQS9CLENBQUEsQ0FBQSxDQUFBO0FBQUEsWUFDQSxPQUFBLEdBQVUsY0FBYyxDQUFDLElBQWYsQ0FBb0IsSUFB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

//# sourceURL=/home/xy/.atom/packages/script/spec/grammars-spec.coffee
