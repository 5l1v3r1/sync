(function() {
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
    return describe('when opening a large file', function() {
      return it('provides suggestions in a timely way', function() {
        runs(function() {
          expect(editorView.querySelector('.autocomplete-plus')).not.toExist();
          editor.moveToBottom();
          editor.insertText('h');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 1;
        });
        runs(function() {
          editor.insertText('t');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 2;
        });
        runs(function() {
          editor.insertText('t');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 3;
        });
        runs(function() {
          editor.insertText('p');
          return advanceClock(completionDelay);
        });
        waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 4;
        });
        runs(function() {
          editor.insertText('s');
          return advanceClock(completionDelay);
        });
        return waitsFor(function() {
          return autocompleteManager.displaySuggestions.calls.length === 5;
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLXBhdGhzL3NwZWMvbGFyZ2UtZmlsZS1zcGVjLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxRQUFBLENBQVMsdUJBQVQsRUFBa0MsU0FBQSxHQUFBO0FBQ2hDLFFBQUEsNkdBQUE7QUFBQSxJQUFBLE9BQTRHLEVBQTVHLEVBQUMsMEJBQUQsRUFBbUIseUJBQW5CLEVBQW9DLGdCQUFwQyxFQUE0QyxvQkFBNUMsRUFBd0QsbUJBQXhELEVBQW1FLDBCQUFuRSxFQUFxRiw2QkFBckYsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUVILFFBQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHdDQUFoQixFQUEwRCxJQUExRCxDQUFBLENBQUE7QUFBQSxRQUVBLGVBQUEsR0FBa0IsR0FGbEIsQ0FBQTtBQUFBLFFBR0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLHVDQUFoQixFQUF5RCxlQUF6RCxDQUhBLENBQUE7QUFBQSxRQUlBLGVBQUEsSUFBbUIsR0FKbkIsQ0FBQTtBQUFBLFFBS0EsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUxuQixDQUFBO0FBQUEsUUFNQSxPQUFPLENBQUMsV0FBUixDQUFvQixnQkFBcEIsQ0FOQSxDQUFBO0FBQUEsUUFPQSxnQkFBQSxHQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQWQsQ0FBMEIsbUJBQTFCLENBQThDLENBQUMsVUFQbEUsQ0FBQTtBQUFBLFFBUUEsS0FBQSxDQUFNLGdCQUFOLEVBQXdCLGlCQUF4QixDQUEwQyxDQUFDLGNBQTNDLENBQUEsQ0FSQSxDQUFBO0FBQUEsUUFTQSxTQUFBLEdBQVksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFkLENBQTBCLG9CQUExQixDQUErQyxDQUFDLFVBVDVELENBQUE7ZUFVQSxLQUFBLENBQU0sU0FBTixFQUFpQixTQUFqQixDQUEyQixDQUFDLGNBQTVCLENBQUEsRUFaRztNQUFBLENBQUwsQ0FBQSxDQUFBO0FBQUEsTUFjQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtlQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixFQUFwQixDQUF1QixDQUFDLElBQXhCLENBQTZCLFNBQUMsQ0FBRCxHQUFBO0FBQzNCLFVBQUEsTUFBQSxHQUFTLENBQVQsQ0FBQTtpQkFDQSxVQUFBLEdBQWEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLE1BQW5CLEVBRmM7UUFBQSxDQUE3QixFQURjO01BQUEsQ0FBaEIsQ0FkQSxDQUFBO0FBQUEsTUFtQkEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIscUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQW5CQSxDQUFBO0FBQUEsTUFzQkEsZUFBQSxDQUFnQixTQUFBLEdBQUE7ZUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWQsQ0FBOEIsbUJBQTlCLEVBRGM7TUFBQSxDQUFoQixDQXRCQSxDQUFBO0FBQUEsTUF5QkEsUUFBQSxDQUFTLFNBQUEsR0FBQTtBQUNQLFlBQUEsS0FBQTs2RUFBb0MsQ0FBRSxlQUQvQjtNQUFBLENBQVQsQ0F6QkEsQ0FBQTtBQUFBLE1BNEJBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxRQUFBLG1CQUFBLEdBQXNCLGdCQUFnQixDQUFDLG1CQUF2QyxDQUFBO0FBQUEsUUFDQSxLQUFBLENBQU0sbUJBQU4sRUFBMkIsaUJBQTNCLENBQTZDLENBQUMsY0FBOUMsQ0FBQSxDQURBLENBQUE7QUFBQSxRQUVBLEtBQUEsQ0FBTSxtQkFBTixFQUEyQixvQkFBM0IsQ0FBZ0QsQ0FBQyxjQUFqRCxDQUFBLENBRkEsQ0FBQTtBQUFBLFFBR0EsS0FBQSxDQUFNLG1CQUFOLEVBQTJCLG9CQUEzQixDQUFnRCxDQUFDLGNBQWpELENBQUEsQ0FIQSxDQUFBO2VBSUEsS0FBQSxDQUFNLG1CQUFOLEVBQTJCLG9CQUEzQixDQUFnRCxDQUFDLGNBQWpELENBQUEsRUFMRztNQUFBLENBQUwsQ0E1QkEsQ0FBQTtBQUFBLE1BbUNBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2VBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG9CQUE5QixFQURjO01BQUEsQ0FBaEIsQ0FuQ0EsQ0FBQTtBQUFBLE1Bc0NBLFFBQUEsQ0FBUyxTQUFBLEdBQUE7ZUFDUCxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUF4QixLQUFrQyxFQUQzQjtNQUFBLENBQVQsQ0F0Q0EsQ0FBQTthQXlDQSxRQUFBLENBQVMsU0FBQSxHQUFBO2VBQ1AsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxNQUF2QyxLQUFpRCxFQUQxQztNQUFBLENBQVQsRUExQ1M7SUFBQSxDQUFYLENBRkEsQ0FBQTtBQUFBLElBK0NBLFNBQUEsQ0FBVSxTQUFBLEdBQUE7QUFDUixNQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsZ0JBQWQsRUFBZ0MsaUJBQWhDLENBQUEsQ0FBQTtBQUFBLE1BQ0EsT0FBTyxDQUFDLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLFNBQXpCLENBREEsQ0FBQTtBQUFBLE1BRUEsT0FBTyxDQUFDLEtBQVIsQ0FBYyxtQkFBZCxFQUFtQyxpQkFBbkMsQ0FGQSxDQUFBO0FBQUEsTUFHQSxPQUFPLENBQUMsS0FBUixDQUFjLG1CQUFkLEVBQW1DLG9CQUFuQyxDQUhBLENBQUE7QUFBQSxNQUlBLE9BQU8sQ0FBQyxLQUFSLENBQWMsbUJBQWQsRUFBbUMsb0JBQW5DLENBSkEsQ0FBQTthQUtBLE9BQU8sQ0FBQyxLQUFSLENBQWMsbUJBQWQsRUFBbUMsb0JBQW5DLEVBTlE7SUFBQSxDQUFWLENBL0NBLENBQUE7V0F1REEsUUFBQSxDQUFTLDJCQUFULEVBQXNDLFNBQUEsR0FBQTthQUNwQyxFQUFBLENBQUcsc0NBQUgsRUFBMkMsU0FBQSxHQUFBO0FBQ3pDLFFBQUEsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsTUFBQSxDQUFPLFVBQVUsQ0FBQyxhQUFYLENBQXlCLG9CQUF6QixDQUFQLENBQXNELENBQUMsR0FBRyxDQUFDLE9BQTNELENBQUEsQ0FBQSxDQUFBO0FBQUEsVUFFQSxNQUFNLENBQUMsWUFBUCxDQUFBLENBRkEsQ0FBQTtBQUFBLFVBR0EsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsR0FBbEIsQ0FIQSxDQUFBO2lCQUlBLFlBQUEsQ0FBYSxlQUFiLEVBTEc7UUFBQSxDQUFMLENBQUEsQ0FBQTtBQUFBLFFBT0EsUUFBQSxDQUFTLFNBQUEsR0FBQTtpQkFDUCxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBN0MsS0FBdUQsRUFEaEQ7UUFBQSxDQUFULENBUEEsQ0FBQTtBQUFBLFFBVUEsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsR0FBbEIsQ0FBQSxDQUFBO2lCQUNBLFlBQUEsQ0FBYSxlQUFiLEVBRkc7UUFBQSxDQUFMLENBVkEsQ0FBQTtBQUFBLFFBY0EsUUFBQSxDQUFTLFNBQUEsR0FBQTtpQkFDUCxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBN0MsS0FBdUQsRUFEaEQ7UUFBQSxDQUFULENBZEEsQ0FBQTtBQUFBLFFBaUJBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxVQUFBLE1BQU0sQ0FBQyxVQUFQLENBQWtCLEdBQWxCLENBQUEsQ0FBQTtpQkFDQSxZQUFBLENBQWEsZUFBYixFQUZHO1FBQUEsQ0FBTCxDQWpCQSxDQUFBO0FBQUEsUUFxQkEsUUFBQSxDQUFTLFNBQUEsR0FBQTtpQkFDUCxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBN0MsS0FBdUQsRUFEaEQ7UUFBQSxDQUFULENBckJBLENBQUE7QUFBQSxRQXdCQSxJQUFBLENBQUssU0FBQSxHQUFBO0FBQ0gsVUFBQSxNQUFNLENBQUMsVUFBUCxDQUFrQixHQUFsQixDQUFBLENBQUE7aUJBQ0EsWUFBQSxDQUFhLGVBQWIsRUFGRztRQUFBLENBQUwsQ0F4QkEsQ0FBQTtBQUFBLFFBNEJBLFFBQUEsQ0FBUyxTQUFBLEdBQUE7aUJBQ1AsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE1BQTdDLEtBQXVELEVBRGhEO1FBQUEsQ0FBVCxDQTVCQSxDQUFBO0FBQUEsUUErQkEsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsR0FBbEIsQ0FBQSxDQUFBO2lCQUNBLFlBQUEsQ0FBYSxlQUFiLEVBRkc7UUFBQSxDQUFMLENBL0JBLENBQUE7ZUFtQ0EsUUFBQSxDQUFTLFNBQUEsR0FBQTtpQkFDUCxtQkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsTUFBN0MsS0FBdUQsRUFEaEQ7UUFBQSxDQUFULEVBcEN5QztNQUFBLENBQTNDLEVBRG9DO0lBQUEsQ0FBdEMsRUF4RGdDO0VBQUEsQ0FBbEMsQ0FBQSxDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/autocomplete-paths/spec/large-file-spec.coffee
