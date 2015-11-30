(function() {
  var path;

  path = require('path');

  describe('Autocomplete Snippets', function() {
    var autocompleteMain, autocompleteManager, completionDelay, editor, editorView, pathsMain, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], completionDelay = _ref[1], editor = _ref[2], editorView = _ref[3], pathsMain = _ref[4], autocompleteMain = _ref[5], autocompleteManager = _ref[6];
    beforeEach(function() {
      runs(function() {
        atom.config.set('autocomplete-plus.enableAutoActivation', true);
        completionDelay = 100;
        atom.config.set('autocomplete-plus.autoActivationDelay', completionDelay);
        completionDelay += 100;
        workspaceElement = atom.views.getView(atom.workspace);
        jasmine.attachToDOM(workspaceElement);
        autocompleteMain = atom.packages.loadPackage('autocomplete-plus').mainModule;
        spyOn(autocompleteMain, 'consumeProvider').andCallThrough();
        pathsMain = atom.packages.loadPackage('autocomplete-paths').mainModule;
        return spyOn(pathsMain, 'provide').andCallThrough();
      });
      waitsForPromise(function() {
        return atom.workspace.open('sample.js').then(function(e) {
          editor = e;
          return editorView = atom.views.getView(editor);
        });
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage('language-javascript');
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage('autocomplete-plus');
      });
      waitsFor(function() {
        var _ref1;
        return (_ref1 = autocompleteMain.autocompleteManager) != null ? _ref1.ready : void 0;
      });
      runs(function() {
        autocompleteManager = autocompleteMain.autocompleteManager;
        spyOn(autocompleteManager, 'findSuggestions').andCallThrough();
        spyOn(autocompleteManager, 'displaySuggestions').andCallThrough();
        spyOn(autocompleteManager, 'showSuggestionList').andCallThrough();
        return spyOn(autocompleteManager, 'hideSuggestionList').andCallThrough();
      });
      waitsForPromise(function() {
        return atom.packages.activatePackage('autocomplete-paths');
      });
      waitsFor(function() {
        return pathsMain.provide.calls.length === 1;
      });
      return waitsFor(function() {
        return autocompleteMain.consumeProvider.calls.length === 1;
      });
    });
    afterEach(function() {
      jasmine.unspy(autocompleteMain, 'consumeProvider');
      jasmine.unspy(pathsMain, 'provide');
      jasmine.unspy(autocompleteManager, 'findSuggestions');
      jasmine.unspy(autocompleteManager, 'displaySuggestions');
      jasmine.unspy(autocompleteManager, 'showSuggestionList');
      return jasmine.unspy(autocompleteManager, 'hideSuggestionList');
    });
    return describe('when autocomplete-plus is enabled', function() {
      it('shows autocompletions when typing ./', function() {
        runs(function() {
          expect(editorView.querySelector('.autocomplete-plus')).not.toExist();
          editor.moveToBottom();
          editor.insertText('.');
          editor.insertText('/');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 1;
        });
        return runs(function() {
          expect(editorView.querySelector('.autocomplete-plus')).toExist();
          expect(editorView.querySelector('.autocomplete-plus span.word')).toHaveText('linkeddir/');
          return expect(editorView.querySelector('.autocomplete-plus span.completion-label')).toHaveText('Dir');
        });
      });
      it('does not crash when typing an invalid folder', function() {
        runs(function() {
          expect(editorView.querySelector('.autocomplete-plus')).not.toExist();
          editor.moveToBottom();
          editor.insertText('./sample.js');
          editor.insertText('/');
          return advanceClock(completionDelay);
        });
        return waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 1;
        });
      });
      it('does not crash when autocompleting symlinked paths', function() {
        runs(function() {
          var c, _i, _len, _ref1;
          expect(editorView.querySelector('.autocomplete-plus')).not.toExist();
          editor.moveToBottom();
          _ref1 = './linkedir';
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            c = _ref1[_i];
            editor.insertText(c);
          }
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 1;
        });
        runs(function() {
          atom.commands.dispatch(editorView, 'autocomplete-plus:confirm');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 2;
        });
        return runs(function() {
          atom.commands.dispatch(editorView, 'autocomplete-plus:confirm');
          return advanceClock(completionDelay + 1000);
        });
      });
      return it('allows relative path completion without ./', function() {
        runs(function() {
          expect(editorView.querySelector('.autocomplete-plus')).not.toExist();
          editor.moveToBottom();
          editor.insertText('linkeddir');
          editor.insertText('/');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 1;
        });
        return runs(function() {
          expect(editorView.querySelector('.autocomplete-plus')).toExist();
          expect(editorView.querySelector('.autocomplete-plus span.word')).toHaveText('.gitkeep');
          return expect(editorView.querySelector('.autocomplete-plus span.completion-label')).toHaveText('File');
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLXBhdGhzL3NwZWMvYXV0b2NvbXBsZXRlLXBhdGhzLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBRUEsUUFBQSxDQUFTLHVCQUFULEVBQWtDLFNBQUEsR0FBQTtBQUNoQyxRQUFBLDZHQUFBO0FBQUEsSUFBQSxPQUE0RyxFQUE1RyxFQUFDLDBCQUFELEVBQW1CLHlCQUFuQixFQUFvQyxnQkFBcEMsRUFBNEMsb0JBQTVDLEVBQXdELG1CQUF4RCxFQUFtRSwwQkFBbkUsRUFBcUYsNkJBQXJGLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxRQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix3Q0FBaEIsRUFBMEQsSUFBMUQsQ0FBQSxDQUFBO0FBQUEsUUFFQSxlQUFBLEdBQWtCLEdBRmxCLENBQUE7QUFBQSxRQUdBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1Q0FBaEIsRUFBeUQsZUFBekQsQ0FIQSxDQUFBO0FBQUEsUUFJQSxlQUFBLElBQW1CLEdBSm5CLENBQUE7QUFBQSxRQUtBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FMbkIsQ0FBQTtBQUFBLFFBTUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBTkEsQ0FBQTtBQUFBLFFBT0EsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFkLENBQTBCLG1CQUExQixDQUE4QyxDQUFDLFVBUGxFLENB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

//# sourceURL=/home/xy/.atom/packages/autocomplete-paths/spec/autocomplete-paths-spec.coffee
