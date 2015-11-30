(function() {
  var WorkspaceView, format;

  WorkspaceView = require('atom').WorkspaceView;

  require('fs');

  format = require('../lib/format');

  describe("JSFormat package tests", function() {
    beforeEach(function() {
      atom.workspaceView = new WorkspaceView();
      return atom.workspace = atom.workspaceView.getModel();
    });
    return describe("when the textbuffer is being formatted", function() {
      beforeEach(function() {
        return atom.workspaceView.attachToDom();
      });
      it("can format the whole buffer with the use of the command", function() {
        waitsForPromise(function() {
          return atom.workspace.open('specfiles/index.js');
        });
        runs(function() {
          this.fileText = atom.workspace.getActiveTextEditor().getText();
          return atom.workspaceView.getActiveView().trigger('jsformat:format');
        });
        return runs(function() {
          return expect(atom.workspace.getActiveTextEditor().getText()).not.toMatch(this.fileText);
        });
      });
      it("can format a selection of the whole buffer with the use of the command", function() {
        waitsForPromise(function() {
          return atom.workspace.open('specfiles/index.js');
        });
        runs(function() {
          atom.workspace.getActiveTextEditor().setSelectedBufferRange([[0, 0], [14, 7]]);
          this.fileText = atom.workspace.getActiveTextEditor().getSelectedText();
          this.restOfFileText = atom.workspace.getActiveTextEditor().getTextInBufferRange([[15, 0], [31, 0]]);
          return atom.workspaceView.getActiveView().trigger('jsformat:format');
        });
        return runs(function() {
          expect(atom.workspace.getActiveTextEditor().getSelectedText()).not.toMatch(this.fileText);
          return expect(atom.workspace.getActiveTextEditor().getTextInBufferRange([[15, 0], [31, 0]])).not.toMatch(this.restOfFileText);
        });
      });
      it("can format the whole buffer if Format on save is turned on", function() {
        waitsForPromise(function() {
          return atom.workspace.open('specfiles/index.js');
        });
        return runs(function() {
          var fileText;
          fileText = atom.workspace.getActiveTextEditor().getText();
          atom.config.set('jsformat.format_on_save', true);
          atom.workspace.getActiveTextEditor().save();
          expect(atom.workspace.getActiveTextEditor().getText()).not.toMatch(fileText);
          return atom.config.set('jsformat.format_on_save', false);
        });
      });
      it("can subscribe and unsubscribe to editors when format_on_save is enabled and editors are opened and closed", function() {
        waitsForPromise(function() {
          spyOn(format, 'subscribeToEvents').andCallThrough();
          return atom.workspace.open('specfiles/index.js');
        });
        waitsForPromise(function() {
          return atom.packages.activatePackage('jsformat');
        });
        return runs(function() {
          atom.config.set('jsformat.format_on_save', true);
          console.log(format.editorSaveSubscriptions);
          console.log(format.editorCloseSubscriptions);
          atom.workspace.getActiveTextEditor().destroy();
          atom.workspace.open('file.js');
          console.log(format.editorSaveSubscriptions);
          return console.log(format.editorCloseSubscriptions);
        });
      });
      it("can subscribe and unsubscribe to events when format_on_save is changed", function() {
        waitsForPromise(function() {
          spyOn(format, 'subscribeToEvents').andCallThrough();
          return atom.workspace.open('specfiles/index.js');
        });
        waitsForPromise(function() {
          return atom.packages.activatePackage('jsformat');
        });
        return runs(function() {
          expect(format.subscribeToEvents.callCount).toEqual(1);
          atom.config.set('jsformat.format_on_save', false);
          expect(format.subscribeToEvents.callCount).toEqual(2);
          atom.config.set('jsformat.format_on_save', true);
          return expect(format.subscribeToEvents.callCount).toEqual(3);
        });
      });
      return it("displays a notification for unsupported languages", function() {
        waitsForPromise(function() {
          return atom.packages.activatePackage('jsformat');
        });
        waitsForPromise(function() {
          spyOn(format, 'displayUnsupportedLanguageNotification').andCallThrough();
          return atom.workspace.open('xyz.coffee');
        });
        return runs(function() {
          atom.workspaceView.getActiveView().trigger('jsformat:format');
          expect(format.displayUnsupportedLanguageNotification).toHaveBeenCalled();
          return expect(format.displayUnsupportedLanguageNotification.callCount).toEqual(1);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvanNmb3JtYXQvc3BlYy9mb3JtYXQtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEscUJBQUE7O0FBQUEsRUFBQyxnQkFBaUIsT0FBQSxDQUFRLE1BQVIsRUFBakIsYUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBQSxDQUFRLElBQVIsQ0FEQSxDQUFBOztBQUFBLEVBR0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxlQUFSLENBSFQsQ0FBQTs7QUFBQSxFQUtBLFFBQUEsQ0FBUyx3QkFBVCxFQUFtQyxTQUFBLEdBQUE7QUFDakMsSUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO0FBQ1QsTUFBQSxJQUFJLENBQUMsYUFBTCxHQUF5QixJQUFBLGFBQUEsQ0FBQSxDQUF6QixDQUFBO2FBQ0EsSUFBSSxDQUFDLFNBQUwsR0FBaUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFuQixDQUFBLEVBRlI7SUFBQSxDQUFYLENBQUEsQ0FBQTtXQU1BLFFBQUEsQ0FBUyx3Q0FBVCxFQUFtRCxTQUFBLEdBQUE7QUFDakQsTUFBQSxVQUFBLENBQVcsU0FBQSxHQUFBO2VBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFuQixDQUFBLEVBRFM7TUFBQSxDQUFYLENBQUEsQ0FBQTtBQUFBLE1BR0EsRUFBQSxDQUFHLHlEQUFILEVBQThELFNBQUEsR0FBQTtBQUc1RCxRQUFBLGVBQUEsQ0FBZ0IsU0FBQSxHQUFBO2lCQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixvQkFBcEIsRUFEYztRQUFBLENBQWhCLENBQUEsQ0FBQTtBQUFBLFFBR0EsSUFBQSxDQUFLLFNBQUEsR0FBQTtBQUNILFVBQUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFmLENBQUEsQ0FBb0Ms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

//# sourceURL=/home/xy/.atom/packages/jsformat/spec/format-spec.coffee
