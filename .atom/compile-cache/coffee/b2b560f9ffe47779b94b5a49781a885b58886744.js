(function() {
  module.exports = {
    createTempFileWithCode: (function(_this) {
      return function(code) {
        if (!/^[\s]*<\?php/.test(code)) {
          code = "<?php " + code;
        }
        return module.parent.exports.createTempFileWithCode(code);
      };
    })(this)
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL3BocC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFFQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FNRTtBQUFBLElBQUEsc0JBQUEsRUFBd0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTthQUFBLFNBQUMsSUFBRCxHQUFBO0FBQ3RCLFFBQUEsSUFBQSxDQUFBLGNBQTRDLENBQUMsSUFBZixDQUFvQixJQUFwQixDQUE5QjtBQUFBLFVBQUEsSUFBQSxHQUFRLFFBQUEsR0FBUSxJQUFoQixDQUFBO1NBQUE7ZUFDQSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxzQkFBdEIsQ0FBNkMsSUFBN0MsRUFGc0I7TUFBQSxFQUFBO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QjtHQU5GLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/xy/.atom/packages/script/lib/grammar-utils/php.coffee
