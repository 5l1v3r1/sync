(function() {
  var CodeContextBuilder;

  CodeContextBuilder = require('../lib/code-context-builder');

  describe('CodeContextBuilder', function() {
    beforeEach(function() {
      this.editorMock = {
        getTitle: function() {},
        getPath: function() {},
        getText: function() {},
        getLastSelection: function() {
          return {
            isEmpty: function() {
              return false;
            }
          };
        },
        getGrammar: function() {
          return {
            name: 'JavaScript'
          };
        },
        getLastCursor: function() {},
        save: function() {}
      };
      spyOn(this.editorMock, 'getTitle').andReturn('file.js');
      spyOn(this.editorMock, 'getPath').andReturn('path/to/file.js');
      spyOn(this.editorMock, 'getText').andReturn('console.log("hello")\n');
      return this.codeContextBuilder = new CodeContextBuilder;
    });
    describe('initCodeContext', function() {
      it('sets correct text source for empty selection', function() {
        var codeContext, selection;
        selection = {
          isEmpty: function() {
            return true;
          }
        };
        spyOn(this.editorMock, 'getLastSelection').andReturn(selection);
        codeContext = this.codeContextBuilder.initCodeContext(this.editorMock);
        expect(codeContext.textSource).toEqual(this.editorMock);
        expect(codeContext.filename).toEqual('file.js');
        return expect(codeContext.filepath).toEqual('path/to/file.js');
      });
      it('sets correct text source for non-empty selection', function() {
        var codeContext, selection;
        selection = {
          isEmpty: function() {
            return false;
          }
        };
        spyOn(this.editorMock, 'getLastSelection').andReturn(selection);
        codeContext = this.codeContextBuilder.initCodeContext(this.editorMock);
        expect(codeContext.textSource).toEqual(selection);
        return expect(codeContext.selection).toEqual(selection);
      });
      return it('sets correct lang', function() {
        var codeContext;
        codeContext = this.codeContextBuilder.initCodeContext(this.editorMock);
        return expect(codeContext.lang).toEqual('JavaScript');
      });
    });
    return describe('buildCodeContext', function() {
      var argType, _i, _len, _ref, _results;
      _ref = ['Selection Based', 'Line Number Based'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        argType = _ref[_i];
        _results.push(it("sets lineNumber with screenRow + 1 when " + argType, function() {
          var codeContext, cursor;
          cursor = {
            getScreenRow: function() {
              return 1;
            }
          };
          spyOn(this.editorMock, 'getLastCursor').andReturn(cursor);
          codeContext = this.codeContextBuilder.buildCodeContext(this.editorMock, argType);
          expect(codeContext.argType).toEqual(argType);
          return expect(codeContext.lineNumber).toEqual(2);
        }));
      }
      return _results;
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L3NwZWMvY29kZS1jb250ZXh0LWJ1aWxkZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsa0JBQUE7O0FBQUEsRUFBQSxrQkFBQSxHQUFxQixPQUFBLENBQVEsNkJBQVIsQ0FBckIsQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxvQkFBVCxFQUErQixTQUFBLEdBQUE7QUFDN0IsSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxJQUFDLENBQUEsVUFBRCxHQUNFO0FBQUEsUUFBQSxRQUFBLEVBQVUsU0FBQSxHQUFBLENBQVY7QUFBQSxRQUNBLE9BQUEsRUFBUyxTQUFBLEdBQUEsQ0FEVDtBQUFBLFFBRUEsT0FBQSxFQUFTLFNBQUEsR0FBQSxDQUZUO0FBQUEsUUFHQSxnQkFBQSxFQUFrQixTQUFBLEdBQUE7aUJBQ2hCO0FBQUEsWUFBQSxPQUFBLEVBQVMsU0FBQSxHQUFBO3FCQUNQLE1BRE87WUFBQSxDQUFUO1lBRGdCO1FBQUEsQ0FIbEI7QUFBQSxRQU1BLFVBQUEsRUFBWSxTQUFBLEdBQUE7aUJBQ1Y7QUFBQSxZQUFBLElBQUEsRUFBTSxZQUFOO1lBRFU7UUFBQSxDQU5aO0FBQUEsUUFRQSxhQUFBLEVBQWUsU0FBQSxHQUFBLENBUmY7QUFBQSxRQVNBLElBQUEsRUFBTSxTQUFBLEdBQUEsQ0FUTjtPQURGLENBQUE7QUFBQSxNQVlBLEtBQUEsQ0FBTSxJQUFDLENBQUEsVUFBUCxFQUFtQixVQUFuQixDQUE4QixDQUFDLFNBQS9CLENBQXlDLFNBQXpDLENBWkEsQ0FBQTtBQUFBLE1BYUEsS0FBQSxDQUFNLElBQUMsQ0FBQSxVQUFQLEVBQW1CLFNBQW5CLENBQTZCLENBQUMsU0FBOUIsQ0FBd0MsaUJBQXhDLENBYkEsQ0FBQTtBQUFBLE1B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

//# sourceURL=/home/xy/.atom/packages/script/spec/code-context-builder-spec.coffee
