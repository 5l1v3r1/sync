(function() {
  var BibtexProvider, XRegExp, bibtexParse, fs, fuzzaldrin, titlecaps,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  fs = require("fs");

  bibtexParse = require("zotero-bibtex-parse");

  fuzzaldrin = require("fuzzaldrin");

  XRegExp = require('xregexp').XRegExp;

  titlecaps = require("./titlecaps");

  module.exports = BibtexProvider = (function() {

    /*
    For a while, I intended to continue using XRegExp with this `wordRegex`:
    
    ```
    wordRegex: XRegExp('(?:^|\\p{WhiteSpace})@[\\p{Letter}\\p{Number}\._-]*')
    ```
    
    But I found that the regular expression given here seems to work well. If
    there are problems with Unicode characters, I can switch back to the other.
    
    This regular expression is also more lenient about what punctuation it will
    accept. Whereas the alternate only allows the punctuation which might be
    expected in a BibTeX key, this will accept all sorts. It does not accept a
    second `@`, as this would become confusing.
     */
    var bibtex;

    BibtexProvider.prototype.wordRegex = XRegExp('(?:^|[\\p{WhiteSpace}\\p{Punctuation}])@[\\p{Letter}\\p{Number}\._-]*');

    bibtex = [];

    atom.deserializers.add(BibtexProvider);

    BibtexProvider.deserialize = function(_arg) {
      var data;
      data = _arg.data;
      return new BibtexProvider(data);
    };

    function BibtexProvider(state) {
      this.prefixForCursor = __bind(this.prefixForCursor, this);
      this.readBibtexFiles = __bind(this.readBibtexFiles, this);
      this.buildWordListFromFiles = __bind(this.buildWordListFromFiles, this);
      this.buildWordList = __bind(this.buildWordList, this);
      var resultTemplate;
      if (state && Object.keys(state).length !== 0) {
        this.bibtex = state.bibtex;
        this.possibleWords = state.possibleWords;
      } else {
        this.buildWordListFromFiles(atom.config.get("autocomplete-bibtex.bibtex"));
      }
      if (this.bibtex.length === 0) {
        this.buildWordListFromFiles(atom.config.get("autocomplete-bibtex.bibtex"));
      }
      atom.config.onDidChange("autocomplete-bibtex.bibtex", (function(_this) {
        return function(bibtexFiles) {
          return _this.buildWordListFromFiles(bibtexFiles);
        };
      })(this));
      resultTemplate = atom.config.get("autocomplete-bibtex.resultTemplate");
      atom.config.observe("autocomplete-bibtex.resultTemplate", (function(_this) {
        return function(resultTemplate) {
          return _this.resultTemplate = resultTemplate;
        };
      })(this));
      this.provider = {
        id: 'autocomplete-bibtex-bibtexprovider',
        selector: atom.config.get("autocomplete-bibtex.scope"),
        blacklist: '',
        providerblacklist: '',
        requestHandler: (function(_this) {
          return function(options) {
            var normalizedPrefix, prefix, suggestions, word, words;
            prefix = _this.prefixForCursor(options.cursor, options.buffer);

            /*
            Because the regular expression may a single whitespace or punctuation
            character before the part in which we're interested. Since this is the
            only case in which an `@` could be the second character, that's a simple
            way to test for it.
            
            (I put this here, and not in the `prefixForCursor` method because I want
            to keep that method as similar to the `AutocompleteManager` method of
            the same name as I can.)
             */
            if (prefix[1] === '@') {
              prefix = prefix.slice(1);
            }
            if (!prefix.length || prefix[0] === !'@') {
              return;
            }
            normalizedPrefix = prefix.normalize().replace(/^@/, '');
            words = fuzzaldrin.filter(_this.possibleWords, normalizedPrefix, {
              key: 'author'
            });
            return suggestions = (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = words.length; _i < _len; _i++) {
                word = words[_i];
                _results.push({
                  word: this.resultTemplate.replace('[key]', word.key),
                  prefix: '@' + normalizedPrefix,
                  label: word.label,
                  renderLabelAsHtml: false,
                  className: '',
                  onWillConfirm: function() {},
                  onDidConfirm: function() {}
                });
              }
              return _results;
            }).call(_this);
          };
        })(this),
        dispose: function() {}
      };
    }

    BibtexProvider.prototype.serialize = function() {
      return {
        deserializer: 'BibtexProvider',
        data: {
          bibtex: this.bibtex,
          possibleWords: this.possibleWords
        }
      };
    };

    BibtexProvider.prototype.buildWordList = function() {
      var author, citation, possibleWords, _i, _j, _len, _len1, _ref, _ref1;
      possibleWords = [];
      _ref = this.bibtex;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        citation = _ref[_i];
        if (citation.entryTags && citation.entryTags.title && (citation.entryTags.author || citation.entryTags.editor)) {
          citation.entryTags.prettyTitle = this.prettifyTitle(citation.entryTags.title);
          citation.entryTags.authors = [];
          if (citation.entryTags.author != null) {
            citation.entryTags.authors = citation.entryTags.authors.concat(this.cleanAuthors(citation.entryTags.author.split(' and ')));
          }
          if (citation.entryTags.editor != null) {
            citation.entryTags.authors = citation.entryTags.authors.concat(this.cleanAuthors(citation.entryTags.editor.split(' and ')));
          }
          citation.entryTags.prettyAuthors = this.prettifyAuthors(citation.entryTags.authors);
          _ref1 = citation.entryTags.authors;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            author = _ref1[_j];
            possibleWords.push({
              author: this.prettifyName(author, true),
              key: citation.citationKey,
              label: "" + citation.entryTags.prettyTitle + " by " + citation.entryTags.prettyAuthors
            });
          }
        }
      }
      return this.possibleWords = possibleWords;
    };

    BibtexProvider.prototype.buildWordListFromFiles = function(bibtexFiles) {
      this.readBibtexFiles(bibtexFiles);
      return this.buildWordList();
    };

    BibtexProvider.prototype.readBibtexFiles = function(bibtexFiles) {
      var error, file, parser, _i, _len;
      if (!Array.isArray(bibtexFiles)) {
        bibtexFiles = [bibtexFiles];
      }
      try {
        bibtex = [];
        for (_i = 0, _len = bibtexFiles.length; _i < _len; _i++) {
          file = bibtexFiles[_i];
          if (fs.statSync(file).isFile()) {
            parser = new bibtexParse(fs.readFileSync(file, 'utf-8'));
            bibtex = bibtex.concat(parser.parse());
          } else {
            console.warn("'" + file + "' does not appear to be a file, so autocomplete-bibtex will not try to parse it.");
          }
        }
        return this.bibtex = bibtex;
      } catch (_error) {
        error = _error;
        return console.error(error);
      }
    };


    /*
    This is a lightly modified version of AutocompleteManager.prefixForCursor
    which allows autocomplete-bibtex to define its own wordRegex.
    
    N.B. Setting `allowPrevious` to `false` is absolutely essential in order to
    make this perform as expected.
     */

    BibtexProvider.prototype.prefixForCursor = function(cursor, buffer) {
      var end, start;
      if (!((buffer != null) && (cursor != null))) {
        return '';
      }
      start = cursor.getBeginningOfCurrentWordBufferPosition({
        wordRegex: this.wordRegex,
        allowPrevious: false
      });
      end = cursor.getBufferPosition();
      if (!((start != null) && (end != null))) {
        return '';
      }
      return buffer.getTextInRange([start, end]);
    };

    BibtexProvider.prototype.prettifyTitle = function(title) {
      var colon, l, n;
      if (!title) {
        return;
      }
      if ((colon = title.indexOf(':')) !== -1 && title.split(" ").length > 5) {
        title = title.substring(0, colon);
      }
      title = titlecaps(title);
      l = title.length > 30 ? 30 : title.length;
      title = title.slice(0, l);
      n = title.lastIndexOf(" ");
      return title = title.slice(0, n) + "...";
    };

    BibtexProvider.prototype.cleanAuthors = function(authors) {
      var author, familyName, personalName, _i, _len, _ref, _results;
      if (authors == null) {
        return [
          {
            familyName: 'Unknown'
          }
        ];
      }
      _results = [];
      for (_i = 0, _len = authors.length; _i < _len; _i++) {
        author = authors[_i];
        _ref = author.indexOf(', ') !== -1 ? author.split(', ') : [author], familyName = _ref[0], personalName = _ref[1];
        _results.push({
          personalName: personalName,
          familyName: familyName
        });
      }
      return _results;
    };

    BibtexProvider.prototype.prettifyAuthors = function(authors) {
      var name;
      name = this.prettifyName(authors[0]);
      if (authors.length > 1) {
        return "" + name + " et al.";
      } else {
        return "" + name;
      }
    };

    BibtexProvider.prototype.prettifyName = function(person, inverted, separator) {
      if (inverted == null) {
        inverted = false;
      }
      if (separator == null) {
        separator = ' ';
      }
      if (inverted) {
        return this.prettifyName({
          personalName: person.familyName,
          familyName: person.personalName
        }, false, ', ');
      } else {
        return (person.personalName != null ? person.personalName : '') + ((person.personalName != null) && (person.familyName != null) ? separator : '') + (person.familyName != null ? person.familyName : '');
      }
    };

    return BibtexProvider;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvYXV0b2NvbXBsZXRlLWJpYnRleC9saWIvcHJvdmlkZXIuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtEQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsV0FBQSxHQUFjLE9BQUEsQ0FBUSxxQkFBUixDQURkLENBQUE7O0FBQUEsRUFFQSxVQUFBLEdBQWEsT0FBQSxDQUFRLFlBQVIsQ0FGYixDQUFBOztBQUFBLEVBR0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQWtCLENBQUMsT0FIN0IsQ0FBQTs7QUFBQSxFQUlBLFNBQUEsR0FBWSxPQUFBLENBQVEsYUFBUixDQUpaLENBQUE7O0FBQUEsRUFPQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0o7QUFBQTs7Ozs7Ozs7Ozs7Ozs7T0FBQTtBQUFBLFFBQUEsTUFBQTs7QUFBQSw2QkFlQSxTQUFBLEdBQVcsT0FBQSxDQUFRLHVFQUFSLENBZlgsQ0FBQTs7QUFBQSxJQWdCQSxNQUFBLEdBQVMsRUFoQlQsQ0FBQTs7QUFBQSxJQWtCQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQXVCLGNBQXZCLENBbEJBLENBQUE7O0FBQUEsSUFtQkEsY0FBQyxDQUFBLFdBQUQsR0FBYyxTQUFDLElBQUQsR0FBQTtBQUFZLFVBQUEsSUFBQTtBQUFBLE1BQVYsT0FBRCxLQUFDLElBQVUsQ0FBQTthQUFJLElBQUEsY0FBQSxDQUFlLElBQWYsRUFBaEI7SUFBQSxDQW5CZCxDQUFBOztBQXFCYSxJQUFBLHdCQUFDLEtBQUQsR0FBQTtBQUNYLCtEQUFBLENBQUE7QUFBQSwrREFBQSxDQUFBO0FBQUEsNkVBQUEsQ0FBQTtBQUFBLDJEQUFBLENBQUE7QUFBQSxV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

//# sourceURL=/home/xy/.atom/packages/autocomplete-bibtex/lib/provider.coffee
