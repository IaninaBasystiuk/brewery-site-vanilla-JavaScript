var Preferes = (function(){
    "use strict"; 
    function _storeItem(index,attribute){
        
        //localStorage recoit key et value comme chaines de caracteres
        localStorage.setItem(index.toString(),attribute);
        

    }  
    
    function _getItem(){
        var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

       while ( i-- ) {
         values.push( localStorage.getItem(keys[i]) );
       }
       return values; //on retourne ici tableau avec tout le contenue de localStorage 
    }
    
    function _removeItem(index){
        
        localStorage.removeItem(index.toString());//supposee de suprime item de loalStorage
    }
 
    
    
return {
        "store": _storeItem,
        "get": _getItem,
        "remove" : _removeItem,
        
    };  
    
})();