(function() {
  module.exports = {
    isDarwin: function() {
      return this.platform() === 'darwin';
    },
    isWindows: function() {
      return this.platform() === 'win32';
    },
    isLinux: function() {
      return this.platform() === 'linux';
    },
    platform: function() {
      return process.platform;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc2NyaXB0L2xpYi9ncmFtbWFyLXV0aWxzL29wZXJhdGluZy1zeXN0ZW0uY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBRUE7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsUUFBRCxDQUFBLENBQUEsS0FBZSxTQURQO0lBQUEsQ0FBVjtBQUFBLElBR0EsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNULElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBQSxLQUFlLFFBRE47SUFBQSxDQUhYO0FBQUEsSUFNQSxPQUFBLEVBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLFFBQUQsQ0FBQSxDQUFBLEtBQWUsUUFEUjtJQUFBLENBTlQ7QUFBQSxJQVNBLFFBQUEsRUFBVSxTQUFBLEdBQUE7YUFDUixPQUFPLENBQUMsU0FEQTtJQUFBLENBVFY7R0FERixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/script/lib/grammar-utils/operating-system.coffee
