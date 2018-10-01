//Fichier Catalogue.js

var Catalogue = (function(){
    "use strict";
    var _listeBieres = listeBieres;
    
    
    function _recherchePar(valeur){
        var resultat = [];
        for(var i=0; i< _listeBieres.length;i++){
            if(valeur.toUpperCase() == _listeBieres[i].Nom.toUpperCase()|| valeur.toUpperCase() == _listeBieres[i].Type.toUpperCase()|| valeur.toUpperCase() == _listeBieres[i].Brasserie.toUpperCase()){
               
                resultat.push(_listeBieres[i]);
            }
        }
        
        return resultat;
    }
    
    function _recherche(param){
        var resultat = [];
        if(param.type == "Brasserie"){//si le bouton radio "Brasserie" choche 
            resultat = _recherchePar(param.valeur)
        }
        else if(param.type == "Nom"){//si le bouton radio "Nom" choche 
            resultat = _recherchePar(param.valeur);
        }
        else if(param.type == "Type"){//si le bouton radio "type" choche 
            resultat = _recherchePar(param.valeur);
        }
        return resultat;
    }
    
    function _list(){
      
        return _listeBieres; 
    }
    
    function _description(index){
        var tab = new Array();
        tab.push(_listeBieres[index]);//on recupere seulment cette biere qui correspond a index de bouton clicquee
        return tab;
        
    }
   
    
    return {
        "recherche": _recherche,
        "list" : _list,
        "description": _description,
    };
    
})();