(function() {
  var ActivatePowerMode;

  ActivatePowerMode = require('../lib/activate-power-mode');

  describe("ActivatePowerMode", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('activate-power-mode');
    });
    return describe("when the activate-power-mode:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.activate-power-mode')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'activate-power-mode:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var activatePowerModeElement, activatePowerModePanel;
          expect(workspaceElement.querySelector('.activate-power-mode')).toExist();
          activatePowerModeElement = workspaceElement.querySelector('.activate-power-mode');
          expect(activatePowerModeElement).toExist();
          activatePowerModePanel = atom.workspace.panelForItem(activatePowerModeElement);
          expect(activatePowerModePanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'activate-power-mode:toggle');
          return expect(activatePowerModePanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.activate-power-mode')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'activate-power-mode:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var activatePowerModeElement;
          activatePowerModeElement = workspaceElement.querySelector('.activate-power-mode');
          expect(activatePowerModeElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'activate-power-mode:toggle');
          return expect(activatePowerModeElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYWN0aXZhdGUtcG93ZXItbW9kZS9zcGVjL2FjdGl2YXRlLXBvd2VyLW1vZGUtc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsaUJBQUE7O0FBQUEsRUFBQSxpQkFBQSxHQUFvQixPQUFBLENBQVEsNEJBQVIsQ0FBcEIsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyxtQkFBVCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLHFCQUE5QixFQUZYO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsd0RBQVQsRUFBbUUsU0FBQSxHQUFBO0FBQ2pFLE1BQUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUdwQyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixzQkFBL0IsQ0FBUCxDQUE4RCxDQUFDLEdBQUcsQ0FBQyxPQUFuRSxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyw0QkFBekMsQ0FKQSxDQUFBO0FBQUEsUUFNQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBTkEsQ0FBQTtlQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLGdEQUFBO0FBQUEsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0Isc0JBQS9CLENBQVAsQ0FBOEQsQ0FBQyxPQUEvRCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBRUEsd0JBQUEsR0FBMkIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0Isc0JBQS9CLENBRjNCLENBQUE7QUFBQSxVQUdBLE1BQUEsQ0FBTyx3QkFBUCxDQUFnQyxDQUFDLE9BQWpDLENBQUEsQ0FIQSxDQUFBO0FBQUEsVUFLQSxzQkFBQSxHQUF5QixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsd0JBQTVCLENBTHpCLENBQUE7QUFBQSxVQU1BLE1BQUEsQ0FBTyxzQkFBc0IsQ0FBQyxTQUF2QixDQUFBLENBQVAsQ0FBMEMsQ0FBQyxJQUEzQyxDQUFnRCxJQUFoRCxDQU5BLENBQUE7QUFBQSxVQU9BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsNEJBQXpDLENBUEEsQ0FBQTtpQkFRQSxNQUFBLENBQU8sc0JBQXNCLENBQUMsU0FBdkIsQ0FBQSxDQUFQLENBQTBDLENBQUMsSUFBM0MsQ0FBZ0QsS0FBaEQsRUFURztRQUFBLENBQUwsRUFab0M7TUFBQSxDQUF0QyxDQUFBLENBQUE7YUF1QkEsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQU83QixRQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixzQkFBL0IsQ0FBUCxDQUE4RCxDQUFDLEdBQUcsQ0FBQyxPQUFuRSxDQUFBLENBRkEsQ0FBQTtBQUFBLFFBTUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5Qyw0QkFBekMsQ0FOQSxDQUFBO0FBQUEsUUFRQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBUkEsQ0FBQTtlQVdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxjQUFBLHdCQUFBO0FBQUEsVUFBQSx3QkFBQSxHQUEyQixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixzQkFBL0IsQ0FBM0IsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLHdCQUFQLENBQWdDLENBQUMsV0FBakMsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsNEJBQXpDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sd0JBQVAsQ0FBZ0MsQ0FBQyxHQUFHLENBQUMsV0FBckMsQ0FBQSxFQUxHO1FBQUEsQ0FBTCxFQWxCNkI7TUFBQSxDQUEvQixFQXhCaUU7SUFBQSxDQUFuRSxFQVA0QjtFQUFBLENBQTlCLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/activate-power-mode/spec/activate-power-mode-spec.coffee
