(function() {
  var CodeContext;

  CodeContext = require('../lib/code-context');

  describe('CodeContext', function() {
    beforeEach(function() {
      this.codeContext = new CodeContext('test.txt', '/tmp/test.txt', null);
      this.dummyTextSource = {};
      return this.dummyTextSource.getText = function() {
        return "print 'hello world!'";
      };
    });
    describe('fileColonLine when lineNumber is not set', function() {
      it('returns the full filepath when fullPath is truthy', function() {
        expect(this.codeContext.fileColonLine()).toMatch("/tmp/test.txt");
        return expect(this.codeContext.fileColonLine(true)).toMatch("/tmp/test.txt");
      });
      return it('returns only the filename and line number when fullPath is falsy', function() {
        return expect(this.codeContext.fileColonLine(false)).toMatch("test.txt");
      });
    });
    describe('fileColonLine when lineNumber is set', function() {
      it('returns the full filepath when fullPath is truthy', function() {
        this.codeContext.lineNumber = 42;
        expect(this.codeContext.fileColonLine()).toMatch("/tmp/test.txt");
        return expect(this.codeContext.fileColonLine(true)).toMatch("/tmp/test.txt");
      });
      return it('returns only the filename and line number when fullPath is falsy', function() {
        this.codeContext.lineNumber = 42;
        return expect(this.codeContext.fileColonLine(false)).toMatch("test.txt");
      });
    });
    describe('getCode', function() {
      it('returns undefined if no textSource is available', function() {
        return expect(this.codeContext.getCode()).toBe(void 0);
      });
      it('returns a string prepended with newlines when prependNewlines is truthy', function() {
        var code;
        this.codeContext.textSource = this.dummyTextSource;
        this.codeContext.lineNumber = 3;
        code = this.codeContext.getCode(true);
        expect(typeof code).toEqual('string');
        return expect(code).toMatch("\n\nprint 'hello world!'");
      });
      return it('returns the text from the textSource when available', function() {
        var code;
        this.codeContext.textSource = this.dummyTextSource;
        code = this.codeContext.getCode();
        expect(typeof code).toEqual('string');
        return expect(code).toMatch("print 'hello world!'");
      });
    });
    describe('shebangCommand when no shebang was found', function() {
      return it('returns undefined when no shebang is found', function() {
        var firstLine, lines;
        lines = this.dummyTextSource.getText();
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        return expect(this.codeContext.shebangCommand()).toBe(void 0);
      });
    });
    describe('shebangCommand when a shebang was found', function() {
      it('returns the command from the shebang', function() {
        var firstLine, lines;
        lines = "#!/bin/bash\necho 'hello from bash!'";
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        return expect(this.codeContext.shebangCommand()).toMatch('bash');
      });
      it('returns /usr/bin/env as the command if applicable', function() {
        var firstLine, lines;
        lines = "#!/usr/bin/env ruby -w\nputs 'hello from ruby!'";
        firstLine = lines.split("\n")[0];
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        return expect(this.codeContext.shebangCommand()).toMatch('env');
      });
      return it('returns a command with non-alphabet characters', function() {
        var firstLine, lines;
        lines = "#!/usr/bin/python2.7\nprint 'hello from python!'";
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        return expect(this.codeContext.shebangCommand()).toMatch('python2.7');
      });
    });
    describe('shebangCommandArgs when no shebang was found', function() {
      return it('returns [] when no shebang is found', function() {
        var firstLine, lines;
        lines = this.dummyTextSource.getText();
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        return expect(this.codeContext.shebangCommandArgs()).toMatch([]);
      });
    });
    return describe('shebangCommandArgs when a shebang was found', function() {
      it('returns the command from the shebang', function() {
        var firstLine, lines;
        lines = "#!/bin/bash\necho 'hello from bash!'";
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        return expect(this.codeContext.shebangCommandArgs()).toMatch([]);
      });
      it('returns the true command as the first argument when /usr/bin/env is used', function() {
        var args, firstLine, lines;
        lines = "#!/usr/bin/env ruby -w\nputs 'hello from ruby!'";
        firstLine = lines.split("\n")[0];
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        args = this.codeContext.shebangCommandArgs();
        expect(args[0]).toMatch('ruby');
        return expect(args).toMatch(['ruby', '-w']);
      });
      return it('returns the command args when the command had non-alphabet characters', function() {
        var firstLine, lines;
        lines = "#!/usr/bin/python2.7\nprint 'hello from python!'";
        firstLine = lines.split("\n")[0];
        if (firstLine.match(/^#!/)) {
          this.codeContext.shebang = firstLine;
        }
        return expect(this.codeContext.shebangCommandArgs()).toMatch([]);
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L3NwZWMvY29kZS1jb250ZXh0LXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFdBQUE7O0FBQUEsRUFBQSxXQUFBLEdBQWMsT0FBQSxDQUFRLHFCQUFSLENBQWQsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxhQUFULEVBQXdCLFNBQUEsR0FBQTtBQUN0QixJQUFBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsV0FBQSxDQUFZLFVBQVosRUFBd0IsZUFBeEIsRUFBeUMsSUFBekMsQ0FBbkIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGVBQUQsR0FBbUIsRUFGbkIsQ0FBQTthQUdBLElBQUMsQ0FBQSxlQUFlLENBQUMsT0FBakIsR0FBMkIsU0FBQSxHQUFBO2VBQ3pCLHVCQUR5QjtNQUFBLEVBSmxCO0lBQUEsQ0FBWCxDQUFBLENBQUE7QUFBQSxJQU9BLFFBQUEsQ0FBUywwQ0FBVCxFQUFxRCxTQUFBLEdBQUE7QUFDbkQsTUFBQSxFQUFBLENBQUcsbURBQUgsRUFBd0QsU0FBQSxHQUFBO0FBQ3RELFFBQUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxXQUFXLENBQUMsYUFBYixDQUFBLENBQVAsQ0FBb0MsQ0FBQyxPQUFyQyxDQUE2QyxlQUE3QyxDQUFBLENBQUE7ZUFDQSxNQUFBLENBQU8sSUFBQyxDQUFBLFdBQVcsQ0FBQyxhQUFiLENBQTJCLElBQTNCLENBQVAsQ0FBd0MsQ0FBQyxPQUF6QyxDQUFpRCxlQUFqRCxFQUZzRDtNQUFBLENBQXhELENBQUEsQ0FBQTthQUlBLEVBQUEsQ0FBRyxrRUFBSCxFQUF1RSxTQUFBLEdBQUE7ZUFDckUsTUFBQSxDQUFPLElBQUMsQ0FBQSxXQUFXLENBQUMsYUFBYixD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

//# sourceURL=/home/xy/.atom/packages/script/spec/code-context-spec.coffee
