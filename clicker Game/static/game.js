if($.cookie("bg") != undefined){
    $("body").css("background-color",$.cookie("bg"))
    $("#game").css("background-color",$.cookie("inner"))
    console.log(typeof $.cookie("image"))
   
    
    if($.cookie("image") == undefined){
        $("#object")[0].src = "https://corporate.target.com/_media/TargetCorp/Press/B-roll%20and%20Press%20Materials/Logos/Target_Bullseye-Logo_Red_transparent.png?preset=640w"
            
    }
    else{
        $("#object")[0].src = $.cookie("image")
        console.log($("#object"))
        
    }

//    function img_pathUrl(input){
//            $('#img_url')[0].src = (window.URL ? URL : webkitURL).createObjectURL($.cookie("image");
//        }
 //stackoverflowc.com/questions/18457340/how-to-preview-selected-image-in-input-type-file-in-popup-using-jquery
   

    $("body").css("color", "red")
}

var width = $("#game").width()
var score = document.getElementById("scoreh")
var height = $("#game").height()
var seconds = 0
var deadline = 5
var GameOver = false
var xh = new XMLHttpRequest
xh.open("POST","/end")

xh.onreadystatechange = function(){
    if(xh.readyState == 4){
        $("#scoreh").html("Score: " + xh.response)
        
    }
   
}
xh.send()
var startPosition = $("#game").position()
$("#object").click(function(){
    if(!GameOver){
        var xhr = new XMLHttpRequest
        seconds = 0
        
        xhr.open("POST","/score")
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                $("#scoreh").html("Score: " + xhr.response)
                
            }
           
        }
        xhr.send()
    }
})
$(window).resize(function(){
    var width = $("#game").width()
    var height = $("#game").height()
})
    var rect = document.getElementById("game").getBoundingClientRect()

var interval = setInterval(function(){
    var newTop = (Math.random() * height) + startPosition.top
    var newLeft =  (Math.random() * width) + (rect.left / 2 + $("#object").width())
    
    
    $("#object").offset({top: newTop, left: newLeft})
},850)

setInterval(function(){
    seconds += 1
    if(seconds >= deadline ){
        clearInterval(interval)
        GameOver = true
        var xr = new XMLHttpRequest
        xr.open("POST","/high")
        xr.onreadystatechange = function(){
            if(xr.readyState == 4){
                $("#high").html("Highscore: " + xr.response)
            }
         
        }
       xr.send()
        
    }
    
},1000)



var hehe = setInterval(function(){
    deadline -= .5
    if(!GameOver){
        $("#dead").html("Time to click: " + deadline + "seconds")
    }
    if (deadline <= .5){
        clearInterval(hehe)
    }
},5000)



console.log(rect.left)





