(function() {
  var NotSupportedNotificationView, View, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom-space-pen-views').View;

  path = require('path');

  module.exports = NotSupportedNotificationView = (function(_super) {
    __extends(NotSupportedNotificationView, _super);

    function NotSupportedNotificationView(fileType) {
      this.fileType = fileType;
      this.fileType = this.fileType;
      NotSupportedNotificationView.__super__.constructor.call(this);
    }

    NotSupportedNotificationView.content = function() {
      var editor, ext, message, title, _ref;
      editor = atom.workspace.getActivePaneItem();
      title = editor.getTitle();
      ext = path.extname(title);
      message = (_ref = ext.length > 0) != null ? _ref : {
        ext: title
      };
      return this.div({
        "class": 'test overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.div("Formatting '" + message + "' files is not yet supported.", {
            "class": "message"
          });
        };
      })(this));
    };

    return NotSupportedNotificationView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvanNmb3JtYXQvbGliL25vdC1zdXBwb3J0ZWQtdmlldy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsd0NBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUFDLE9BQVEsT0FBQSxDQUFRLHNCQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixtREFBQSxDQUFBOztBQUFhLElBQUEsc0NBQUUsUUFBRixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsV0FBQSxRQUNiLENBQUE7QUFBQSxNQUFBLElBQUksQ0FBQyxRQUFMLEdBQWdCLElBQUMsQ0FBQSxRQUFqQixDQUFBO0FBQUEsTUFDQSw0REFBQSxDQURBLENBRFc7SUFBQSxDQUFiOztBQUFBLElBSUEsNEJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSxpQ0FBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWYsQ0FBQSxDQUFULENBQUE7QUFBQSxNQUNBLEtBQUEsR0FBUSxNQUFNLENBQUMsUUFBUCxDQUFBLENBRFIsQ0FBQTtBQUFBLE1BRUEsR0FBQSxHQUFNLElBQUksQ0FBQyxPQUFMLENBQWEsS0FBYixDQUZOLENBQUE7QUFBQSxNQUdBLE9BQUEsNENBQTJCO0FBQUEsUUFBQSxHQUFBLEVBQU0sS0FBTjtPQUgzQixDQUFBO2FBS0EsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHVCQUFQO09BQUwsRUFBcUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDbkMsS0FBQyxDQUFBLEdBQUQsQ0FBTSxjQUFBLEdBQWMsT0FBZCxHQUFzQiwrQkFBNUIsRUFBNEQ7QUFBQSxZQUFBLE9BQUEsRUFBTyxTQUFQO1dBQTVELEVBRG1DO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckMsRUFOUTtJQUFBLENBSlYsQ0FBQTs7d0NBQUE7O0tBRHlDLEtBSjNDLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/xy/.atom/packages/jsformat/lib/not-supported-view.coffee
