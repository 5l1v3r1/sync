(function() {
  var packagesToTest;

  packagesToTest = {
    Python: {
      name: 'language-python',
      file: 'test.py'
    }
  };

  describe('Python autocompletions', function() {
    var editor, getCompletions, provider, _ref;
    _ref = [], editor = _ref[0], provider = _ref[1];
    getCompletions = function() {
      var cursor, end, prefix, request, start;
      cursor = editor.getLastCursor();
      start = cursor.getBeginningOfCurrentWordBufferPosition();
      end = cursor.getBufferPosition();
      prefix = editor.getTextInRange([start, end]);
      request = {
        editor: editor,
        bufferPosition: end,
        scopeDescriptor: cursor.getScopeDescriptor(),
        prefix: prefix
      };
      return provider.getSuggestions(request);
    };
    beforeEach(function() {
      waitsForPromise(function() {
        return atom.packages.activatePackage('autocomplete-python');
      });
      return runs(function() {
        return provider = atom.packages.getActivePackage('autocomplete-python').mainModule.getProvider();
      });
    });
    return Object.keys(packagesToTest).forEach(function(packageLabel) {
      return describe("" + packageLabel + " files", function() {
        beforeEach(function() {
          waitsForPromise(function() {
            return atom.packages.activatePackage(packagesToTest[packageLabel].name);
          });
          waitsForPromise(function() {
            return atom.workspace.open(packagesToTest[packageLabel].file);
          });
          return runs(function() {
            return editor = atom.workspace.getActiveTextEditor();
          });
        });
        it('autocompletes builtins', function() {
          var completions;
          editor.setText('isinstanc');
          editor.setCursorBufferPosition([1, 0]);
          completions = getCompletions();
          return waitsForPromise(function() {
            return getCompletions().then(function(completions) {
              var completion, _i, _len;
              for (_i = 0, _len = completions.length; _i < _len; _i++) {
                completion = completions[_i];
                expect(completion.snippet.length).toBeGreaterThan(0);
                expect(completion.snippet).toBe('isinstance$0');
              }
              return expect(completions.length).toBe(1);
            });
          });
        });
        it('autocompletes python keywords', function() {
          var completions;
          editor.setText('impo');
          editor.setCursorBufferPosition([1, 0]);
          completions = getCompletions();
          return waitsForPromise(function() {
            return getCompletions().then(function(completions) {
              var completion, _i, _len;
              for (_i = 0, _len = completions.length; _i < _len; _i++) {
                completion = completions[_i];
                if (completion.type === 'keyword') {
                  expect(completion.snippet).toBe('import$0');
                }
                expect(completion.snippet.length).toBeGreaterThan(0);
              }
              console.log(completions);
              return expect(completions.length).toBe(3);
            });
          });
        });
        return it('autocompletes defined functions', function() {
          var completions;
          editor.setText("def hello_world():\n  return True\nhell");
          editor.setCursorBufferPosition([3, 0]);
          completions = getCompletions();
          return waitsForPromise(function() {
            return getCompletions().then(function(completions) {
              expect(completions[0].snippet).toBe('hello_world$0');
              return expect(completions.length).toBe(1);
            });
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLXB5dGhvbi9zcGVjL3Byb3ZpZGVyLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGNBQUE7O0FBQUEsRUFBQSxjQUFBLEdBQ0U7QUFBQSxJQUFBLE1BQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLGlCQUFOO0FBQUEsTUFDQSxJQUFBLEVBQU0sU0FETjtLQURGO0dBREYsQ0FBQTs7QUFBQSxFQUtBLFFBQUEsQ0FBUyx3QkFBVCxFQUFtQyxTQUFBLEdBQUE7QUFDakMsUUFBQSxzQ0FBQTtBQUFBLElBQUEsT0FBcUIsRUFBckIsRUFBQyxnQkFBRCxFQUFTLGtCQUFULENBQUE7QUFBQSxJQUVBLGNBQUEsR0FBaUIsU0FBQSxHQUFBO0FBQ2YsVUFBQSxtQ0FBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLE1BQU0sQ0FBQyxhQUFQLENBQUEsQ0FBVCxDQUFBO0FBQUEsTUFDQSxLQUFBLEdBQVEsTUFBTSxDQUFDLHVDQUFQLENBQUEsQ0FEUixDQUFBO0FBQUEsTUFFQSxHQUFBLEdBQU0sTUFBTSxDQUFDLGlCQUFQLENBQUEsQ0FGTixDQUFBO0FBQUEsTUFHQSxNQUFBLEdBQVMsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsQ0FBQyxLQUFELEVBQVEsR0FBUixDQUF0QixDQUhULENBQUE7QUFBQSxNQUlBLE9BQUEsR0FDRTtBQUFBLFFBQUEsTUFBQSxFQUFRLE1BQVI7QUFBQSxRQUNBLGNBQUEsRUFBZ0IsR0FEaEI7QUFBQSxRQUVBLGVBQUEsRUFBaUIsTUFBTSxDQUFDLGtCQUFQLENBQUEsQ0FGakI7QUFBQSxRQUdBLE1BQUEsRUFBUSxNQUhSO09BTEYsQ0FBQTthQVNBLFFBQVEsQ0FBQyxjQUFULENBQXdCLE9BQXhCLEVBVmU7SUFBQSxDQUZqQixDQUFBO0FB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

//# sourceURL=/home/xy/.atom/packages/autocomplete-python/spec/provider-spec.coffee
