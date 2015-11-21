var MapModel = Backbone.Model.extend({
  url: '/warnings',
  parse: function(data) {
    var warnings = {}
    data.forEach(function(country) {
      var paren = country.name.indexOf('(');
      if (paren !== -1) {
        var name = country.name.substring(0, paren - 1);
      } else {
        var name = country.name;
      }
      warnings[name] = country.advisoryState;
    });

    //These are hardcoded because they're listed as Korea, North...
    warnings['North Korea'] = 3;
    warnings['South Korea'] = 0;
    warnings['Somaliland'] = 3;
    return warnings;
  },
  initialize: function() {
    var context = this;
    this.fetch({
      success: function(model, response, options) {
        context.trigger('warningsLoaded', context);
      },
      error: function(model, response, options) {
        console.log("Error fetching warnings");
      }
    });
  }
});