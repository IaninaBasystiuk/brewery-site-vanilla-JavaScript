window.addEventListener("load",init);

function init(){
    
    //changement de pages quand on click sur menu NOUVEAUTÉS et NOS BIERS
    var link= document.getElementsByClassName("pager"); 
    for (i=0 ; i<link.length;i++){
        link[i].addEventListener("click",ouvrir);
    }
    
    
    function ouvrir(){
        
        
    var pageOne=document.getElementById("pageOne");
    var pageTwo=document.getElementById("pageTwo");
        console.log(pageOne);
        console.log(pageTwo);
        
        if (pageOne.style.display =="none"){
            
            pageOne.style.display = "";
            pageTwo.style.display= "none";
            
              
        }else{
        
            pageOne.style.display = "none";
            pageTwo.style.display= "block";
        }
    
    
    }
    
    
   
    //animation!
    var background = document.getElementById("pageOne");
    // commencer les repetitions avec interval de 2 sec
    var timerId = setInterval(function() {
      background.style.boxShadow = " inset -15px -23px 219px 13px ";
    }, 2000);

    // dans 5 sec terminer les repetitions 
    //timerId -indificateur de tamp retouré par setInterval on utilise ici pour annulation de action
    setTimeout(function() {
      clearInterval(timerId);
      background.style.boxShadow = "";
    }, 5000);
    
}