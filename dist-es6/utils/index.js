var _this = this;

var isArray = function isArray(array) {
   for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) return true;
   }
   return false;
};

var flatten = function flatten(arr) {
   return arr.reduce(function (flat, toFlatten) {
      return flat.concat(Array.isArray(toFlatten) ? _this.flatten(toFlatten) : toFlatten);
   }, []);
};

module.exports = {
   isArray: isArray,
   flatten: flatten
};