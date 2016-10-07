$(document).ready(function(){
    
    $('nav ul li a').click(function(){
        
        let name = $(this).attr("name"),
        
            yPos = $(name).offset().top;
            
        $("html, body").animate({ scrollTop: yPos }, 500);
        
        //console.log(name+":"+yPos);
        
    });
    
});