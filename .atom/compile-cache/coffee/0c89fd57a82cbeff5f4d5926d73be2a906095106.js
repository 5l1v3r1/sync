(function() {
  var HeaderView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  module.exports = HeaderView = (function(_super) {
    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.content = function() {
      return this.div({
        "class": 'panel-heading padded heading header-view'
      }, (function(_this) {
        return function() {
          _this.span({
            "class": 'heading-title',
            outlet: 'title'
          });
          _this.span({
            "class": 'heading-status',
            outlet: 'status'
          });
          return _this.span({
            "class": 'heading-close icon-remove-close pull-right',
            outlet: 'closeButton',
            click: 'close'
          });
        };
      })(this));
    };

    HeaderView.prototype.close = function() {
      return atom.commands.dispatch(this.workspaceView(), 'script:close-view');
    };

    HeaderView.prototype.setStatus = function(status) {
      this.status.removeClass('icon-alert icon-check icon-hourglass icon-stop');
      switch (status) {
        case 'start':
          return this.status.addClass('icon-hourglass');
        case 'stop':
          return this.status.addClass('icon-check');
        case 'kill':
          return this.status.addClass('icon-stop');
        case 'err':
          return this.status.addClass('icon-alert');
      }
    };

    HeaderView.prototype.workspaceView = function() {
      return atom.views.getView(atom.workspace);
    };

    return HeaderView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9oZWFkZXItdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLGlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFVBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDBDQUFQO09BQUwsRUFBd0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN0RCxVQUFBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxZQUFBLE9BQUEsRUFBTyxlQUFQO0FBQUEsWUFBd0IsTUFBQSxFQUFRLE9BQWhDO1dBQU4sQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsWUFBQSxPQUFBLEVBQU8sZ0JBQVA7QUFBQSxZQUF5QixNQUFBLEVBQVEsUUFBakM7V0FBTixDQURBLENBQUE7aUJBRUEsS0FBQyxDQUFBLElBQUQsQ0FDRTtBQUFBLFlBQUEsT0FBQSxFQUFPLDRDQUFQO0FBQUEsWUFDQSxNQUFBLEVBQVEsYUFEUjtBQUFBLFlBRUEsS0FBQSxFQUFPLE9BRlA7V0FERixFQUhzRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhELEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEseUJBU0EsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixJQUFDLENBQUEsYUFBRCxDQUFBLENBQXZCLEVBQXlDLG1CQUF6QyxFQURLO0lBQUEsQ0FUUCxDQUFBOztBQUFBLHlCQVlBLFNBQUEsR0FBVyxTQUFDLE1BQUQsR0FBQTtBQUNULE1BQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxXQUFSLENBQW9CLGdEQUFwQixDQUFBLENBQUE7QUFDQSxjQUFPLE1BQVA7QUFBQSxhQUNPLE9BRFA7aUJBQ29CLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixnQkFBakIsRUFEcEI7QUFBQSxhQUVPLE1BRlA7aUJBRW1CLElBQUMsQ0FBQSxNQUFNLENBQUMsUUFBUixDQUFpQixZQUFqQixFQUZuQjtBQUFBLGFBR08sTUFIUDtpQkFHbUIsSUFBQyxDQUFBLE1BQU0sQ0FBQyxRQUFSLENBQWlCLFdBQWpCLEVBSG5CO0FBQUEsYUFJTyxLQUpQO2lCQUlrQixJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsWUFBakIsRUFKbEI7QUFBQSxPQUZTO0lBQUEsQ0FaWCxDQUFBOztBQUFBLHlCQW9CQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixFQURhO0lBQUEsQ0FwQmYsQ0FBQTs7c0JBQUE7O0tBRnVCLEtBSHpCLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/xy/.atom/packages/script/lib/header-view.coffee
