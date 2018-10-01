

var App = (function(){
    "use strict";
    var _gabarit, _gabarit2, _noyau, _derniereRecherche = {};
    /*
      Gestion de l'affichage   
    */    
    function _Afficher(data){
        console.log(data);
        if(_gabarit && _noyau){ //Si le gabarit et le noyau sont définis
            _noyau.innerHTML = "";  // Vider le HTML
            
            data.forEach(function(element){       // Pour chaque bier
                var elementBiere = _gabarit.cloneNode(true);    // cloner le gabarit
                
                // Traitement du gabarit
                for(var key in element){     
                    elementBiere.innerHTML = elementBiere.innerHTML.replace("\{\{"+key+"\}\}", element[key]);   
                }
                _noyau.appendChild(document.importNode(elementBiere.content, true));        // Ajout du gabarit dans le HTML
            
            });
        }
    }
    
    /* Fonction qui gère les résultats de la recherche*/
    function _Rechercher(type, valeur){
       
       
        if(!(_derniereRecherche.type == type && _derniereRecherche.valeur == valeur))   // Si la nouvelle recherche est différente de la précédente
        {
            var aBiersTrie = Catalogue.recherche({type:type, valeur:valeur});    // Lancer la recherche avec l'objet bieres.
            _Afficher(aBiersTrie); // Afficher les résultats
        }
        _derniereRecherche = {type:type, valeur:valeur};// Enregistrer la dernière recherche
    }
    
    function _AfficherDescription(aBieres){
        
        console.log(aBieres);
        if(_gabarit2 && _noyau){ //Si le gabarit et le noyau sont définis
            _noyau.innerHTML = "";  // Vider le HTML
            
            aBieres.forEach(function(element){// Pour chaque bier
                var elementBiere = _gabarit2.cloneNode(true);// cloner le gabarit
                
                // Traitement du gabarit
                for(var key in element){     
                    elementBiere.innerHTML = elementBiere.innerHTML.replace("\{\{"+key+"\}\}", element[key]);   
                }
                _noyau.appendChild(document.importNode(elementBiere.content, true));        // Ajout du gabarit dans le HTML
            
            });
        }
    }
    
    /* Fonction d'initialisation. Elle doit être appelée en premier pour définir le noyau d'insertion du HTML et le gabarit */
    function _init(noyau, gabarit, gabarit2){
        _noyau = noyau;
        _gabarit = gabarit;
        _gabarit2 = gabarit2;
        Catalogue.list();
        
    }
    
    //fonction pour lister toutes les bieres
    function _lister(){
        var listeBieres = Catalogue.list();
        
        _Afficher(listeBieres);
    }
    
    function _description(index){
       
         var listeBieres = Catalogue.description(index);//connection a base de donees 
         
        _AfficherDescription(listeBieres);
        
    }
    
    //function pour local storage pour reappliquer les classes recuperer de localStorage
    //supposee a travailler on load de page mais donne error a la ligne 92
    function _reapply(itemStored){
        console.log(itemStored);
        
        var favourites = document.querySelectorAll(".description > i"); 
        console.log(favourites);
        
        for(var i = 0; i<=itemStored.length; i++){
            
           //favourites[i].classList.add(itemStored[i]); 
        }
        

    }

    return {
        Rechercher:_Rechercher,
        Init: _init,
        Lister: _lister,
        Description: _description,
        reApply: _reapply
        
    };
})();

(function(){
    "use strict";
    
    window.addEventListener("load", function(){
        var donnees = listeBieres;
        var noyau = document.querySelector(".catalogue");//class de div ou les bieres seront places
        var template = document.getElementById("cardsList");//ID de template de liste de biers
        var template2 =document.getElementById("oneCard");//ID de template2 avec description
        console.log(template);
        console.log(template2);
        console.log(noyau);
        
        
        App.Init(noyau, template, template2);// Initialise l'App
        
        ///////functions pour lister les biers tries///////////////////////
        var btn = document.querySelector(".actionRecherche");
        btn.addEventListener("click", function(){ // Sur le click du bouton "recherche"
            var typeRecherche = document.querySelector("input[name='type']:checked");
            var chaineRecherche = document.querySelector("input[name='valeur']");
            
            if(typeRecherche && chaineRecherche){
                App.Rechercher(typeRecherche.value, chaineRecherche.value);    // Exécute la recherche en passage de parametres (quel radio cochee, text input rentree par utilisateur)
            }
        });//FIN FUNCTION pour lister les biers trie
        
        /////////function pour lister toutes les bieres//////////
        var btnNosBiers = document.querySelector(".listNosBiers");
        btnNosBiers.addEventListener("click", function(){

            App.Lister();

            // Récupère les boutons d'une carte. Je cherche ici toutes les <i> qui se trouvent dans classe description a partir de document
            var favourites = document.querySelectorAll(".description > i");
           

            favourites.forEach(function(btn, index) {
                btn.addEventListener("click", function(evt) {
                console.log(index);
                evt.target.classList.toggle("action" + index);//appliquer le classe action
                var attribute = "i.fa.fa-heart-o.fa-2x.action"+index;//sovgarder les donnees pour localStorage sous forme de string
                Preferes.store(index, attribute);//index - key, attribute - value pour localStorage

                });

            });//FIN FUNCTION pour recouperer les ceurs


            // Récupère les boutons d'une carte. Je cherche ici toutes les <a> qui se trouvent dans classe description a partir de document
            var btnDescription = document.querySelectorAll(".description > a");
            
            btnDescription.forEach(function(btn, index) {
                btn.addEventListener("click", function(evt) {
                //sur chaque click je recouper le index de bouton cliquee   
                App.Description(index);//envoier index pour afficher description
                
                });
            });//FIN FUNCTION pour recouperer les boutons

        });//FIN FUNCTION pour lister les catalogue des bieres
    //Ici les donnees qui ete dans localStorage on passe comme tableau a notre fonction affichage. Supposee travaille "on load"    
    var itemStored = Preferes.get();
    if (itemStored){
       
        App.reApply(itemStored);
    }    
     
        
    });//FIN FUNCTION LOAD! 
})();//FIN IIFE

