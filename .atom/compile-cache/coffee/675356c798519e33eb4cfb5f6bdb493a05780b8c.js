(function() {
  var addClass, removeClass;

  addClass = function(el, klass) {
    if (!el) {
      return;
    }
    return el.className = "" + el.className + " " + klass;
  };

  removeClass = function(el, klass) {
    var classes, index;
    if (!el) {
      return;
    }
    classes = el.className.split(' ');
    index = classes.indexOf(klass);
    if (index >= 0) {
      classes.splice(index, 1);
    }
    return el.className = classes.join(' ');
  };

  module.exports = {
    config: {
      showIcons: {
        type: 'boolean',
        "default": false
      },
      colorStatusIndicatorsInTreeView: {
        type: 'boolean',
        "default": false
      }
    },
    activate: function(state) {
      atom.config.observe('unity-ui.showIcons', function() {
        var body;
        body = document.body;
        if (atom.config.get('unity-ui.showIcons')) {
          return addClass(body, 'unity-ui-show-icons');
        } else {
          return removeClass(body, 'unity-ui-show-icons');
        }
      });
      return atom.config.observe('unity-ui.colorStatusIndicatorsInTreeView', function() {
        var treeView;
        treeView = document.querySelector('.tree-view');
        if (atom.config.get('unity-ui.colorStatusIndicatorsInTreeView')) {
          return removeClass(treeView, 'unity-ui-fade-status');
        } else {
          return addClass(treeView, 'unity-ui-fade-status');
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvdW5pdHktdWkvbGliL3VuaXR5LXVpLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxxQkFBQTs7QUFBQSxFQUFBLFFBQUEsR0FBVyxTQUFDLEVBQUQsRUFBSyxLQUFMLEdBQUE7QUFDVCxJQUFBLElBQUEsQ0FBQSxFQUFBO0FBQUEsWUFBQSxDQUFBO0tBQUE7V0FDQSxFQUFFLENBQUMsU0FBSCxHQUFlLEVBQUEsR0FBRyxFQUFFLENBQUMsU0FBTixHQUFnQixHQUFoQixHQUFtQixNQUZ6QjtFQUFBLENBQVgsQ0FBQTs7QUFBQSxFQUlBLFdBQUEsR0FBYyxTQUFDLEVBQUQsRUFBSyxLQUFMLEdBQUE7QUFDWixRQUFBLGNBQUE7QUFBQSxJQUFBLElBQUEsQ0FBQSxFQUFBO0FBQUEsWUFBQSxDQUFBO0tBQUE7QUFBQSxJQUNBLE9BQUEsR0FBVSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQWIsQ0FBbUIsR0FBbkIsQ0FEVixDQUFBO0FBQUEsSUFFQSxLQUFBLEdBQVEsT0FBTyxDQUFDLE9BQVIsQ0FBZ0IsS0FBaEIsQ0FGUixDQUFBO0FBR0EsSUFBQSxJQUE0QixLQUFBLElBQVMsQ0FBckM7QUFBQSxNQUFBLE9BQU8sQ0FBQyxNQUFSLENBQWUsS0FBZixFQUFzQixDQUF0QixDQUFBLENBQUE7S0FIQTtXQUlBLEVBQUUsQ0FBQyxTQUFILEdBQWUsT0FBTyxDQUFDLElBQVIsQ0FBYSxHQUFiLEVBTEg7RUFBQSxDQUpkLENBQUE7O0FBQUEsRUFXQSxNQUFNLENBQUMsT0FBUCxHQUNFO0FBQUEsSUFBQSxNQUFBLEVBQ0U7QUFBQSxNQUFBLFNBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxLQURUO09BREY7QUFBQSxNQUdBLCtCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtPQUpGO0tBREY7QUFBQSxJQVFBLFFBQUEsRUFBVSxTQUFDLEtBQUQsR0FBQTtBQUNSLE1BQUEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLG9CQUFwQixFQUEwQyxTQUFBLEdBQUE7QUFDeEMsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFBLEdBQU8sUUFBUSxDQUFDLElBQWhCLENBQUE7QUFDQSxRQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG9CQUFoQixDQUFIO2lCQUNFLFFBQUEsQ0FBUyxJQUFULEVBQWUscUJBQWYsRUFERjtTQUFBLE1BQUE7aUJBR0UsV0FBQSxDQUFZLElBQVosRUFBa0IscUJBQWxCLEVBSEY7U0FGd0M7TUFBQSxDQUExQyxDQUFBLENBQUE7YUFNQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsMENBQXBCLEVBQWdFLFNBQUEsR0FBQTtBQUM5RCxZQUFBLFFBQUE7QUFBQSxRQUFBLFFBQUEsR0FBVyxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixDQUFYLENBQUE7QUFDQSxRQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDBDQUFoQixDQUFIO2lCQUNFLFdBQUEsQ0FBWSxRQUFaLEVBQXNCLHNCQUF0QixFQURGO1NBQUEsTUFBQTtpQkFHRSxRQUFBLENBQVMsUUFBVCxFQUFtQixzQkFBbkIsRUFIRjtTQUY4RDtNQUFBLENBQWhFLEVBUFE7SUFBQSxDQVJWO0dBWkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/xy/.atom/packages/unity-ui/lib/unity-ui.coffee
