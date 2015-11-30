(function() {
  describe('Issue 11', function() {
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
        return atom.workspace.open('').then(function(e) {
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
    return describe('when an editor with no path is opened', function() {
      return it('does not have issues', function() {
        runs(function() {
          expect(editorView.querySelector('.autocomplete-plus')).not.toExist();
          editor.moveToBottom();
          editor.insertText('/');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 1;
        });
        return runs(function() {
          return expect(editorView.querySelector('.autocomplete-plus')).not.toExist();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLXBhdGhzL3NwZWMvaXNzdWVzLzExLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxFQUFBLFFBQUEsQ0FBUyxVQUFULEVBQXFCLFNBQUEsR0FBQTtBQUNuQixRQUFBLDZHQUFBO0FBQUEsSUFBQSxPQUE0RyxFQUE1RyxFQUFDLDBCQUFELEVBQW1CLHlCQUFuQixFQUFvQyxnQkFBcEMsRUFBNEMsb0JBQTVDLEVBQXdELG1CQUF4RCxFQUFtRSwwQkFBbkUsRUFBcUYsNkJBQXJGLENBQUE7QUFBQSxJQUVBLFVBQUEsQ0FBVyxTQUFBLEdBQUE7QUFDVCxNQUFBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxRQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix3Q0FBaEIsRUFBMEQsSUFBMUQsQ0FBQSxDQUFBO0FBQUEsUUFFQSxlQUFBLEdBQWtCLEdBRmxCLENBQUE7QUFBQSxRQUdBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix1Q0FBaEIsRUFBeUQsZUFBekQsQ0FIQSxDQUFBO0FBQUEsUUFJQSxlQUFBLElBQW1CLEdBSm5CLENBQUE7QUFBQSxRQUtBLGdCQUFBLEdBQW1CLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBWCxDQUFtQixJQUFJLENBQUMsU0FBeEIsQ0FMbkIsQ0FBQTtBQUFBLFFBTUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsZ0JBQXBCLENBTkEsQ0FBQTtBQUFBLFFBT0EsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFkLENBQTBCLG1CQUExQixDQUE4QyxDQUFDLFVBUGxFLENBQUE7QUFBQSxRQVFBLEtBQUEsQ0FBTSxnQkFBTixFQUF3QixpQkFBeEIsQ0FBMEMsQ0FBQyxjQUEzQyxDQUFBLENBUkEsQ0FB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

//# sourceURL=/home/xy/.atom/packages/autocomplete-paths/spec/issues/11-spec.coffee
