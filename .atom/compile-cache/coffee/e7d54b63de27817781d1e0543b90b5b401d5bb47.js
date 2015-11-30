(function() {
  module.exports = {
    format_on_save: {
      description: 'JSFormat will format the file before it is saved',
      type: 'boolean',
      "default": true
    },
    indent_with_tabs: {
      type: 'boolean',
      "default": false
    },
    end_with_newline: {
      type: 'boolean',
      "default": true
    },
    max_preserve_newlines: {
      type: 'integer',
      "default": 4
    },
    preserve_newlines: {
      type: 'boolean',
      "default": true
    },
    space_in_paren: {
      title: 'Space in parentheses',
      type: 'boolean',
      "default": false
    },
    jslint_happy: {
      title: 'JSLint happy',
      type: 'boolean',
      "default": false
    },
    brace_style: {
      type: 'string',
      "default": 'collapse',
      "enum": ['collapse', 'expand', 'end-expand']
    },
    keep_array_indentation: {
      type: 'boolean',
      "default": false
    },
    keep_function_indentation: {
      type: 'boolean',
      "default": false
    },
    space_after_anon_function: {
      title: 'Space after anonymous functions',
      type: 'boolean',
      "default": false
    },
    space_before_conditional: {
      type: 'boolean',
      "default": true
    },
    eval_code: {
      title: 'Evaluate code',
      type: 'boolean',
      "default": false
    },
    unescape_strings: {
      type: 'boolean',
      "default": false
    },
    break_chained_methods: {
      type: 'boolean',
      "default": false
    },
    e4x: {
      title: 'e4x style',
      type: 'boolean',
      "default": false
    },
    comma_first: {
      title: 'comma first',
      type: 'boolean',
      "default": false
    },
    ignore_files: {
      type: 'array',
      "default": ['.jshintrc'],
      items: {
        type: 'string'
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvanNmb3JtYXQvbGliL2NvbmZpZy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFDQTtBQUFBLEVBQUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQWEsa0RBQWI7QUFBQSxNQUNBLElBQUEsRUFBTSxTQUROO0FBQUEsTUFFQSxTQUFBLEVBQVMsSUFGVDtLQURGO0FBQUEsSUFJQSxnQkFBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLE1BQ0EsU0FBQSxFQUFTLEtBRFQ7S0FMRjtBQUFBLElBT0EsZ0JBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxNQUNBLFNBQUEsRUFBUyxJQURUO0tBUkY7QUFBQSxJQVVBLHFCQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsQ0FEVDtLQVhGO0FBQUEsSUFhQSxpQkFBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLE1BQ0EsU0FBQSxFQUFTLElBRFQ7S0FkRjtBQUFBLElBZ0JBLGNBQUEsRUFDRTtBQUFBLE1BQUEsS0FBQSxFQUFPLHNCQUFQO0FBQUEsTUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLE1BRUEsU0FBQSxFQUFTLEtBRlQ7S0FqQkY7QUFBQSxJQW9CQSxZQUFBLEVBQ0U7QUFBQSxNQUFBLEtBQUEsRUFBTyxjQUFQO0FBQUEsTUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLE1BRUEsU0FBQSxFQUFTLEtBRlQ7S0FyQkY7QUFBQSxJQXdCQSxXQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsVUFEVDtBQUFBLE1BRUEsTUFBQSxFQUFNLENBQUMsVUFBRCxFQUFhLFFBQWIsRUFBdUIsWUFBdkIsQ0FGTjtLQXpCRjtBQUFBLElBNEJBLHNCQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsS0FEVDtLQTdCRjtBQUFBLElBK0JBLHlCQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsS0FEVDtLQWhDRjtBQUFBLElBa0NBLHlCQUFBLEVBQ0U7QUFBQSxNQUFBLEtBQUEsRUFBTyxpQ0FBUDtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxNQUVBLFNBQUEsRUFBUyxLQUZUO0tBbkNGO0FBQUEsSUFzQ0Esd0JBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxNQUNBLFNBQUEsRUFBUyxJQURUO0tBdkNGO0FBQUEsSUF5Q0EsU0FBQSxFQUNFO0FBQUEsTUFBQSxLQUFBLEVBQU8sZUFBUDtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxNQUVBLFNBQUEsRUFBUyxLQUZUO0tBMUNGO0FBQUEsSUE2Q0EsZ0JBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxNQUNBLFNBQUEsRUFBUyxLQURUO0tBOUNGO0FBQUEsSUFnREEscUJBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxNQUNBLFNBQUEsRUFBUyxLQURUO0tBakRGO0FBQUEsSUFtREEsR0FBQSxFQUNFO0FBQUEsTUFBQSxLQUFBLEVBQU8sV0FBUDtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxNQUVBLFNBQUEsRUFBUyxLQUZUO0tBcERGO0FBQUEsSUF1REEsV0FBQSxFQUNFO0FBQUEsTUFBQSxLQUFBLEVBQU8sYUFBUDtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBRE47QUFBQSxNQUVBLFNBQUEsRUFBUyxLQUZUO0tBeERGO0FBQUEsSUEyREEsWUFBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sT0FBTjtBQUFBLE1BQ0EsU0FBQSxFQUFTLENBQUMsV0FBRCxDQURUO0FBQUEsTUFFQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO09BSEY7S0E1REY7R0FERixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/jsformat/lib/config.coffee
