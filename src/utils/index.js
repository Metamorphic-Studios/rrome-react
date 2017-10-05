var isArray = (array) => {
   for(var i=0; i<array.length; i++){
      if(Array.isArray(array[i])) return true;
   }
   return false;
}

var flatten = (arr) => {
   return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
   }, []);
}

module.exports = {
   isArray: isArray,
   flatten: flatten
}
