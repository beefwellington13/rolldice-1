(function(global){
  var modules = {};

  function require(moduleName){
    if(moduleName){
      var lcmn = moduleName.toLowerCase();
      if(modules.hasOwnProperty(lcmn)){
        var m = modules[lcmn];
        if(!m.exports){
          var modulePrep = {exports:{}};
          m.delegate(modulePrep);
          m.exports = modulePrep.exports;
        }
        return m.exports;
      } else {
        throw new Error('Module not found: ' + moduleName);
      }
    }
    throw new Error('No module requested');
  }

  require.wrapFile = function(moduleName, delegate){
    var lcmn = moduleName.toLowerCase();
    if(modules.hasOwnProperty(lcmn)){
      throw new Error('Module has already been registered');
    }
    var m = (modules[lcmn] = { exports: null, delegate: delegate });
    return m;
  };
  global.require = require;
})(window);

