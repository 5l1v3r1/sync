(function() {
  module.exports = {
    personalAccessToken: {
      description: 'Your personal GitHub access token',
      type: 'string',
      "default": '',
      order: 1
    },
    gistId: {
      description: 'ID of gist to use for configuration storage',
      type: 'string',
      "default": '',
      order: 2
    },
    syncSettings: {
      type: 'boolean',
      "default": true,
      order: 3
    },
    syncPackages: {
      type: 'boolean',
      "default": true,
      order: 4
    },
    syncKeymap: {
      type: 'boolean',
      "default": true,
      order: 5
    },
    syncStyles: {
      type: 'boolean',
      "default": true,
      order: 6
    },
    syncInit: {
      type: 'boolean',
      "default": true,
      order: 7
    },
    syncSnippets: {
      type: 'boolean',
      "default": true,
      order: 8
    },
    extraFiles: {
      description: 'Comma-seperated list of files other than Atom\'s default config files in ~/.atom',
      type: 'array',
      "default": [],
      items: {
        type: 'string'
      },
      order: 9
    },
    analytics: {
      type: 'boolean',
      "default": true,
      description: "There is Segment.io which forwards data to Google Analytics to track what versions and platforms are used. Everything is anonymized and no personal information, such as source code, is sent. See the README.md for more details.",
      order: 10
    },
    _analyticsUserId: {
      type: 'string',
      "default": "",
      description: "Unique identifier for this user for tracking usage analytics",
      order: 11
    },
    checkForUpdatedBackup: {
      description: 'Check for newer backup on Atom start',
      type: 'boolean',
      "default": true,
      order: 12
    },
    _lastBackupHash: {
      type: 'string',
      "default": '',
      description: 'Hash of the last backup restored or created',
      order: 13
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUveHkvLmF0b20vcGFja2FnZXMvc3luYy1zZXR0aW5ncy9saWIvY29uZmlnLmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQjtBQUFBLElBQ2YsbUJBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUFhLG1DQUFiO0FBQUEsTUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLE1BRUEsU0FBQSxFQUFTLEVBRlQ7QUFBQSxNQUdBLEtBQUEsRUFBTyxDQUhQO0tBRmE7QUFBQSxJQU1mLE1BQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUFhLDZDQUFiO0FBQUEsTUFDQSxJQUFBLEVBQU0sUUFETjtBQUFBLE1BRUEsU0FBQSxFQUFTLEVBRlQ7QUFBQSxNQUdBLEtBQUEsRUFBTyxDQUhQO0tBUGE7QUFBQSxJQVdmLFlBQUEsRUFDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxNQUNBLFNBQUEsRUFBUyxJQURUO0FBQUEsTUFFQSxLQUFBLEVBQU8sQ0FGUDtLQVphO0FBQUEsSUFlZixZQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLE1BRUEsS0FBQSxFQUFPLENBRlA7S0FoQmE7QUFBQSxJQW1CZixVQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLE1BRUEsS0FBQSxFQUFPLENBRlA7S0FwQmE7QUFBQSxJQXVCZixVQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLE1BRUEsS0FBQSxFQUFPLENBRlA7S0F4QmE7QUFBQSxJQTJCZixRQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLE1BRUEsS0FBQSxFQUFPLENBRlA7S0E1QmE7QUFBQSxJQStCZixZQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLE1BRUEsS0FBQSxFQUFPLENBRlA7S0FoQ2E7QUFBQSxJQW1DZixVQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFBYSxrRkFBYjtBQUFBLE1BQ0EsSUFBQSxFQUFNLE9BRE47QUFBQSxNQUVBLFNBQUEsRUFBUyxFQUZUO0FBQUEsTUFHQSxLQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO09BSkY7QUFBQSxNQUtBLEtBQUEsRUFBTyxDQUxQO0tBcENhO0FBQUEsSUEwQ2YsU0FBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLE1BQ0EsU0FBQSxFQUFTLElBRFQ7QUFBQSxNQUVBLFdBQUEsRUFBYSxvT0FGYjtBQUFBLE1BTUEsS0FBQSxFQUFPLEVBTlA7S0EzQ2E7QUFBQSxJQWtEZixnQkFBQSxFQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLE1BQ0EsU0FBQSxFQUFTLEVBRFQ7QUFBQSxNQUVBLFdBQUEsRUFBYSw4REFGYjtBQUFBLE1BR0EsS0FBQSxFQUFPLEVBSFA7S0FuRGE7QUFBQSxJQXVEZixxQkFBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQWEsc0NBQWI7QUFBQSxNQUNBLElBQUEsRUFBTSxTQUROO0FBQUEsTUFFQSxTQUFBLEVBQVMsSUFGVDtBQUFBLE1BR0EsS0FBQSxFQUFPLEVBSFA7S0F4RGE7QUFBQSxJQTREZixlQUFBLEVBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVMsRUFEVDtBQUFBLE1BRUEsV0FBQSxFQUFhLDZDQUZiO0FBQUEsTUFHQSxLQUFBLEVBQU8sRUFIUDtLQTdEYTtHQUFqQixDQUFBO0FBQUEiCn0=

//# sourceURL=/home/xy/.atom/packages/sync-settings/lib/config.coffee
