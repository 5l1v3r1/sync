(function() {
  var ActivatePowerMode, CompositeDisposable, throttle;

  throttle = require("lodash.throttle");

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = ActivatePowerMode = {
    activatePowerModeView: null,
    modalPanel: null,
    subscriptions: null,
    activate: function(state) {
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add("atom-workspace", {
        "activate-power-mode:toggle": (function(_this) {
          return function() {
            return _this.toggle();
          };
        })(this)
      }));
      this.throttledShake = throttle(this.shake.bind(this), 100, {
        trailing: false
      });
      this.throttledSpawnParticles = throttle(this.spawnParticles.bind(this), 25, {
        trailing: false
      });
      this.editor = atom.workspace.getActiveTextEditor();
      this.editorElement = atom.views.getView(this.editor);
      this.editorElement.classList.add("power-mode");
      this.subscriptions.add(this.editor.getBuffer().onDidChange(this.onChange.bind(this)));
      return this.setupCanvas();
    },
    setupCanvas: function() {
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
      this.canvas.classList.add("power-mode-canvas");
      this.canvas.width = this.editorElement.offsetWidth;
      this.canvas.height = this.editorElement.offsetHeight;
      return this.editorElement.parentNode.appendChild(this.canvas);
    },
    calculateCursorOffset: function() {
      var editorRect, scrollViewRect;
      editorRect = this.editorElement.getBoundingClientRect();
      scrollViewRect = this.editorElement.shadowRoot.querySelector(".scroll-view").getBoundingClientRect();
      return {
        top: scrollViewRect.top - editorRect.top + this.editor.getLineHeightInPixels() / 2,
        left: scrollViewRect.left - editorRect.left
      };
    },
    onChange: function(e) {
      var range, spawnParticles;
      spawnParticles = true;
      if (e.newText) {
        spawnParticles = e.newText !== "\n";
        range = e.newRange.end;
      } else {
        range = e.newRange.start;
      }
      if (spawnParticles) {
        this.throttledSpawnParticles(range);
      }
      return this.throttledShake();
    },
    shake: function() {
      var intensity, x, y;
      intensity = 1 + 2 * Math.random();
      x = intensity * (Math.random() > 0.5 ? -1 : 1);
      y = intensity * (Math.random() > 0.5 ? -1 : 1);
      this.editorElement.style.top = "" + y + "px";
      this.editorElement.style.left = "" + x + "px";
      return setTimeout((function(_this) {
        return function() {
          _this.editorElement.style.top = "";
          return _this.editorElement.style.left = "";
        };
      })(this), 75);
    },
    spawnParticles: function(range) {
      var color, cursorOffset, left, numParticles, part, top, _ref, _results;
      cursorOffset = this.calculateCursorOffset();
      _ref = this.editor.pixelPositionForScreenPosition(range), left = _ref.left, top = _ref.top;
      left += cursorOffset.left - this.editor.getScrollLeft();
      top += cursorOffset.top - this.editor.getScrollTop();
      color = this.getColorAtPosition(left, top);
      numParticles = 5 + Math.round(Math.random() * 10);
      _results = [];
      while (numParticles--) {
        part = this.createParticle(left, top, color);
        this.particles[this.particlePointer] = part;
        _results.push(this.particlePointer = (this.particlePointer + 1) % 500);
      }
      return _results;
    },
    getColorAtPosition: function(left, top) {
      var el, offset;
      offset = this.editorElement.getBoundingClientRect();
      el = atom.views.getView(this.editor).shadowRoot.elementFromPoint(left + offset.left, top + offset.top);
      if (el) {
        return getComputedStyle(el).color;
      } else {
        return "rgb(255, 255, 255)";
      }
    },
    createParticle: function(x, y, color) {
      return {
        x: x,
        y: y,
        alpha: 1,
        color: color,
        velocity: {
          x: -1 + Math.random() * 2,
          y: -3.5 + Math.random() * 2
        }
      };
    },
    drawParticles: function() {
      var particle, _i, _len, _ref, _results;
      requestAnimationFrame(this.drawParticles.bind(this));
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      _ref = this.particles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        particle = _ref[_i];
        if (particle.alpha <= 0.1) {
          continue;
        }
        particle.velocity.y += 0.075;
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.alpha *= 0.96;
        this.context.fillStyle = "rgba(" + particle.color.slice(4, -1) + ", " + particle.alpha + ")";
        _results.push(this.context.fillRect(Math.round(particle.x - 1.5), Math.round(particle.y - 1.5), 3, 3));
      }
      return _results;
    },
    toggle: function() {
      console.log('ActivatePowerMode was toggled!');
      this.particlePointer = 0;
      this.particles = [];
      return requestAnimationFrame(this.drawParticles.bind(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYWN0aXZhdGUtcG93ZXItbW9kZS9saWIvYWN0aXZhdGUtcG93ZXItbW9kZS5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0RBQUE7O0FBQUEsRUFBQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGlCQUFSLENBQVgsQ0FBQTs7QUFBQSxFQUNDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFERCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsaUJBQUEsR0FDZjtBQUFBLElBQUEscUJBQUEsRUFBdUIsSUFBdkI7QUFBQSxJQUNBLFVBQUEsRUFBWSxJQURaO0FBQUEsSUFFQSxhQUFBLEVBQWUsSUFGZjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQWQsQ0FBa0IsZ0JBQWxCLEVBQ2pCO0FBQUEsUUFBQSw0QkFBQSxFQUE4QixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTttQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBQUg7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE5QjtPQURpQixDQUFuQixDQUZBLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxjQUFELEdBQWtCLFFBQUEsQ0FBUyxJQUFDLENBQUEsS0FBSyxDQUFDLElBQVAsQ0FBWSxJQUFaLENBQVQsRUFBNEIsR0FBNUIsRUFBaUM7QUFBQSxRQUFBLFFBQUEsRUFBVSxLQUFWO09BQWpDLENBTGxCLENBQUE7QUFBQSxNQU1BLElB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

//# sourceURL=/home/xy/.atom/packages/activate-power-mode/lib/activate-power-mode.coffee
