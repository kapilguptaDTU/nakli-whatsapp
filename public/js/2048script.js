var sc=document.querySelector('.score');
var hsc=document.querySelector('.highscore');
var score = 0;
var arrScore= new Array();
var iddd=document.querySelector('.iddd');
var kapil=0;
var boxer = document.querySelectorAll('.box');
var localStorageName = "crackalien";
var highScore=0;
var box = [],
    cols = 3;
for (let i = 0; i <= cols; i++) {
    box[i] = [];
}
var r = 0;
for (let t = 0; t <= cols; t++) {
    for (let l = 0; l <= cols; l++) {
        box[t][l] = boxer[r];
        box[t][l].innerHTML = null;
        r++;
    }
}




var x = Math.floor(Math.random() * 4);
var y = Math.floor(Math.random() * 4);

var notRandomNumbers = [2, 2, 2, 2, 2, 2, 2, 4, 4, 4];
var idx = Math.floor(Math.random() * notRandomNumbers.length);
var z = notRandomNumbers[idx];

if (!box[x][y].innerHTML) {
    console.log("abcdasdaasdsada");
    box[x][y].innerHTML = z;
    
}
// box[1][2].innerHTML = 10;
// box[1][1].innerHTML = 10;
        
var finallyy=eval(localStorage.getItem("highscore"));
console.log("initialfinally"+finallyy);


$(function() {
  $(".iddd").swipe( {
    //Generic swipe handler for all directions
    
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
 if(direction=='right'){
     for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j - k - 1) < 0) {
                        break;
                    }
                      if(!box[i][j].innerHTML && box[i][j-k-1].innerHTML)
                    {
                        box[i][j].innerHTML=box[i][j-k-1].innerHTML;
                        box[i][j-k-1].innerHTML=null;
                        
                    }
                    
                    if(box[i][j].innerHTML)
                        {
                    if(box[i][j-k-1].innerHTML && box[i][j-k-1].innerHTML!=box[i][j].innerHTML){break;}
                            if (box[i][j].innerHTML == box[i][j - k - 1].innerHTML) 
                    {
                        box[i][j].innerHTML *= 2;

                        score += '+' +box[i][j].innerHTML;
                        box[i][j - k - 1].innerHTML = null;
                        
                        if (box[i][j].innerHTML == 0) 
                        {
                            box[i][j].innerHTML = null;
                        }
                        break;
                        
                        }}
                  
                    
                }

            }
        };
        
        
 };
 if(direction=='left'){
//console.log(event);
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <=3; j++) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j + k + 1) > 3 || (j + k + 1) <0) {
                        break;
                    }
                      if(!box[i][j].innerHTML && box[i][j+k+1].innerHTML)
                    {
                        box[i][j].innerHTML=box[i][j+k+1].innerHTML;
                        box[i][j+k+1].innerHTML=null;
                        
                    }
                    
                    if(box[i][j].innerHTML)
                        {
                    if(box[i][j+k+1].innerHTML && box[i][j+k+1].innerHTML!=box[i][j].innerHTML){break;}
                            if (box[i][j].innerHTML == box[i][j + k + 1].innerHTML) 
                    {
                        box[i][j].innerHTML *= 2;

                        score += '+' +box[i][j].innerHTML;
                        box[i][j + k + 1].innerHTML = null;
                        if (box[i][j].innerHTML == 0) 
                        {
                            box[i][j].innerHTML = null;
                        }
                        
                        break;
                        
                        }}
                  
                    
                }

            }
        };
        

    };
 if(direction=='down'){

        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j - k - 1) < 0) {
                        break;
                    }
                      if(!box[j][i].innerHTML && box[j-k-1][i].innerHTML)
                    {
                        box[j][i].innerHTML=box[j-k-1][i].innerHTML;
                        box[j-k-1][i].innerHTML=null;
                        
                    }
                    
                    if(box[j][i].innerHTML)
                        {
                    if(box[j-k-1][i].innerHTML && box[j-k-1][i].innerHTML!=box[j][i].innerHTML){break;}
                            if (box[j][i].innerHTML == box[j-k-1][i].innerHTML) 
                    {
                        box[j][i].innerHTML *= 2;

                        score +='+' + box[j][i].innerHTML;
                        box[j-k-1][i].innerHTML= null;
                        if (box[j][i].innerHTML == 0) 
                        {
                            box[j][i].innerHTML = null;
                        }
                        break;
                        
                        
                        }}
                  
                    
                }

            }
        };
         
    };
 if(direction=='up'){

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 3; j++) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j + k + 1) < 0 || (j + k + 1) >3 ) {
                        break;
                    }
                      if(!box[j][i].innerHTML && box[j+k+1][i].innerHTML)
                    {
                        box[j][i].innerHTML=box[j + k + 1][i].innerHTML;
                        box[j + k + 1][i].innerHTML=null;
                        
                    }
                    
                    if(box[j][i].innerHTML)
                        {
                    if(box[j + k + 1][i].innerHTML && box[j + k + 1][i].innerHTML!=box[j][i].innerHTML){break;}
                            if (box[j][i].innerHTML == box[j + k + 1][i].innerHTML) 
                    {
                        box[j][i].innerHTML *= 2;

                        score +='+' + box[j][i].innerHTML;
                        box[j + k + 1][i].innerHTML= null;
                        if (box[j][i].innerHTML == 0) 
                        {
                            box[j][i].innerHTML = null;
                        }
                        break;
                        
                        
                        }}
                  
                    
                }

            }
        };
         
    };
 
    for (let ia=0; ia<16;ia++){
        var xa = Math.floor(Math.random() * 4);
        var ya = Math.floor(Math.random() * 4);
if (box[xa][ya].innerHTML) {continue;}
        var anotRandomNumbers = [2, 2, 2, 2, 2, 2, 2, 4, 4, 4];
        var aidx = Math.floor(Math.random() * anotRandomNumbers.length);
        var za = anotRandomNumbers[aidx];

        if (!box[xa][ya].innerHTML) {
            box[xa][ya].innerHTML = za;
            break;
        }}
    
     for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <=3; j++) {
              if(box[i][j].innerHTML==2){box[i][j].style.backgroundColor="#8180d8";} 
                if(box[i][j].innerHTML==4){box[i][j].style.backgroundColor="#a360d7";} 
                if(box[i][j].innerHTML==8){box[i][j].style.backgroundColor="#2669dd";} 
                if(box[i][j].innerHTML==16){box[i][j].style.backgroundColor="#38b9d6";} 
                if(box[i][j].innerHTML==32){box[i][j].style.backgroundColor="#57cb9b";} 
                if(box[i][j].innerHTML==64){box[i][j].style.backgroundColor="#66d02b";} 
                if(box[i][j].innerHTML==128){box[i][j].style.backgroundColor="#f7c135";} 
                if(box[i][j].innerHTML==256){box[i][j].style.backgroundColor="#f5812b";} 
                if(box[i][j].innerHTML==512){box[i][j].style.backgroundColor="#f3513c";} 
                if(box[i][j].innerHTML==1024){box[i][j].style.backgroundColor="#f15591";} 
                if(box[i][j].innerHTML==2048){box[i][j].style.backgroundColor="#f3453b";} 
                if(box[i][j].innerHTML==4046){box[i][j].style.backgroundColor="#f3453b";}
                if(box[i][j].innerHTML>4046){box[i][j].style.backgroundColor="black";}
                
                if(!box[i][j].innerHTML){box[i][j].style.backgroundColor="#312c4f";} 
            }}
    
    
    
    
    
    
    
//    if(localStorage.getItem(localStorageName) == null) {
//    highScore = 0;
//} else {
//    highScore = localStorage.getItem(localStorageName);
//}
    
    
   sc.innerHTML='SCORE <br>'+eval(score);    

    kapil=eval(score);
console.log("score"+kapil);
    console.log("initialhighscore"+highScore);
    if (kapil > finallyy) {
        finallyy=kapil;
        console.log("kapilhighscore"+highScore);
        localStorage.setItem("highscore", finallyy);      
    }

else{
    localStorage.setItem("highscore", finallyy);
}
    console.log(highScore);    
    
    
    }
    
  });

  //Set some options later
  $("#test").swipe( {fingers:2} );
});


window.addEventListener('keydown', function (e) {
     
    console.log("kapil"+event.key);
    if (event.key == 'd' || event.key == "ArrowRight") {


        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j - k - 1) < 0) {
                        break;
                    }
                      if(!box[i][j].innerHTML && box[i][j-k-1].innerHTML)
                    {
                        box[i][j].innerHTML=box[i][j-k-1].innerHTML;
                        box[i][j-k-1].innerHTML=null;
                        
                    }
                    
                    if(box[i][j].innerHTML)
                        {
                    if(box[i][j-k-1].innerHTML && box[i][j-k-1].innerHTML!=box[i][j].innerHTML){break;}
                            if (box[i][j].innerHTML == box[i][j - k - 1].innerHTML) 
                    {
                        box[i][j].innerHTML *= 2;

                        score += '+' +box[i][j].innerHTML;
                        box[i][j - k - 1].innerHTML = null;
                        
                        if (box[i][j].innerHTML == 0) 
                        {
                            box[i][j].innerHTML = null;
                        }
                        break;
                        
                        }}
                  
                    
                }

            }
        };
        
        
        
        
        
        

    }
    
    if (event.key == 'a' || event.key == "ArrowLeft") {
//console.log(event);
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <=3; j++) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j + k + 1) > 3 || (j + k + 1) <0) {
                        break;
                    }
                      if(!box[i][j].innerHTML && box[i][j+k+1].innerHTML)
                    {
                        box[i][j].innerHTML=box[i][j+k+1].innerHTML;
                        box[i][j+k+1].innerHTML=null;
                        
                    }
                    
                    if(box[i][j].innerHTML)
                        {
                    if(box[i][j+k+1].innerHTML && box[i][j+k+1].innerHTML!=box[i][j].innerHTML){break;}
                            if (box[i][j].innerHTML == box[i][j + k + 1].innerHTML) 
                    {
                        box[i][j].innerHTML *= 2;

                        score += '+' +box[i][j].innerHTML;
                        box[i][j + k + 1].innerHTML = null;
                        if (box[i][j].innerHTML == 0) 
                        {
                            box[i][j].innerHTML = null;
                        }
                        
                        break;
                        
                        }}
                  
                    
                }

            }
        };
        

    }
    
    
    if (event.key == 's' || event.key == "ArrowDown") {

        for (let i = 3; i >= 0; i--) {
            for (let j = 3; j >= 0; j--) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j - k - 1) < 0) {
                        break;
                    }
                      if(!box[j][i].innerHTML && box[j-k-1][i].innerHTML)
                    {
                        box[j][i].innerHTML=box[j-k-1][i].innerHTML;
                        box[j-k-1][i].innerHTML=null;
                        
                    }
                    
                    if(box[j][i].innerHTML)
                        {
                    if(box[j-k-1][i].innerHTML && box[j-k-1][i].innerHTML!=box[j][i].innerHTML){break;}
                            if (box[j][i].innerHTML == box[j-k-1][i].innerHTML) 
                    {
                        box[j][i].innerHTML *= 2;

                        score +='+' + box[j][i].innerHTML;
                        box[j-k-1][i].innerHTML= null;
                        if (box[j][i].innerHTML == 0) 
                        {
                            box[j][i].innerHTML = null;
                        }
                        break;
                        
                        
                        }}
                  
                    
                }

            }
        };
         
    }
    
    
    if (event.key == 'w' || event.key == "ArrowUp") {

        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 3; j++) {
                for (let k = 0; k <= 3; k++) {
                    
                    if ((j + k + 1) < 0 || (j + k + 1) >3 ) {
                        break;
                    }
                      if(!box[j][i].innerHTML && box[j+k+1][i].innerHTML)
                    {
                        box[j][i].innerHTML=box[j + k + 1][i].innerHTML;
                        box[j + k + 1][i].innerHTML=null;
                        
                    }
                    
                    if(box[j][i].innerHTML)
                        {
                    if(box[j + k + 1][i].innerHTML && box[j + k + 1][i].innerHTML!=box[j][i].innerHTML){break;}
                            if (box[j][i].innerHTML == box[j + k + 1][i].innerHTML) 
                    {
                        box[j][i].innerHTML *= 2;

                        score +='+' + box[j][i].innerHTML;
                        box[j + k + 1][i].innerHTML= null;
                        if (box[j][i].innerHTML == 0) 
                        {
                            box[j][i].innerHTML = null;
                        }
                        break;
                        
                        
                        }}
                  
                    
                }

            }
        };
         
    }
    
    for (let ia=0; ia<16;ia++){
        var xa = Math.floor(Math.random() * 4);
        var ya = Math.floor(Math.random() * 4);
if (box[xa][ya].innerHTML) {continue;}
        var anotRandomNumbers = [2, 2, 2, 2, 2, 2, 2, 4, 4, 4];
        var aidx = Math.floor(Math.random() * anotRandomNumbers.length);
        var za = anotRandomNumbers[aidx];

        if (!box[xa][ya].innerHTML) {
            box[xa][ya].innerHTML = za;
            break;
        }}
    
     for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <=3; j++) {
              if(box[i][j].innerHTML==2){box[i][j].style.backgroundColor="rgb(152, 2, 246)";} 
                if(box[i][j].innerHTML==4){box[i][j].style.backgroundColor="rgb(210, 0, 194)";} 
                if(box[i][j].innerHTML==8){box[i][j].style.backgroundColor="rgb(254, 199, 43)";} 
                if(box[i][j].innerHTML==16){box[i][j].style.backgroundColor="rgb(0, 197, 27)";} 
                if(box[i][j].innerHTML==32){box[i][j].style.backgroundColor="rgb(9, 149, 208)";} 
                if(box[i][j].innerHTML==64){box[i][j].style.backgroundColor="rgb(20, 223, 130)";} 
                if(box[i][j].innerHTML==128){box[i][j].style.backgroundColor="rgb(255, 82, 15)";} 
                if(box[i][j].innerHTML==256){box[i][j].style.backgroundColor="rgb(236, 80, 255);";} 
                if(box[i][j].innerHTML==512){box[i][j].style.backgroundColor="#f3513c";} 
                if(box[i][j].innerHTML==1024){box[i][j].style.backgroundColor="#f15591";} 
                if(box[i][j].innerHTML==2048){box[i][j].style.backgroundColor="rgb(64, 6, 107)";} 
                if(box[i][j].innerHTML==4046){box[i][j].style.backgroundColor="rgb(19, 16, 71)";}
                if(box[i][j].innerHTML>4046){box[i][j].style.backgroundColor="black";}
                
                if(!box[i][j].innerHTML){box[i][j].style.backgroundColor="#312c4f";} 
            }}
    
    
    
    
    
    
    
//    if(localStorage.getItem(localStorageName) == null) {
//    highScore = 0;
//} else {
//    highScore = localStorage.getItem(localStorageName);
//}
    
    
   sc.innerHTML='SCORE <br><a class="scorenum" style="    display: contents;font-size: -webkit-xxx-large;">'+eval(score)+'</a>';
//    localStorage.setItem("highscore", score);

//    console.log(eval(score));
//    console.log(eval(localStorage.getItem("highscore")));
//  
//    if(eval(score)>eval(localStorage.getItem("highscore"))){
//        console.log("kapil");
//        
//  hsc.innerHTML='HIGHSCORE='+eval(localStorage.getItem("highscore"));
//    }
//    
////    console.log(eval(score));
//    highScore = Math.max(score, highScore);
//    localStorage.setItem(localStorageName, highScore);
//console.log(eval(localStorage.getItem("highscore")));
//    
//    
    kapil=eval(score);
console.log("score"+kapil);
    console.log("initialhighscore"+highScore);
    if (kapil > finallyy) {
        finallyy=kapil;
        console.log("kapilhighscore"+highScore);
        localStorage.setItem("highscore", finallyy);      
    }

else{
    localStorage.setItem("highscore", finallyy);
}
    console.log(highScore);    
    
})

console.log("finally"+eval(localStorage.getItem("highscore")));
var highscore = localStorage.getItem("highscore");



  hsc.innerHTML='HIGHSCORE<br><a class="scorenum" style="    display: contents;font-size: -webkit-xxx-large;">'+eval(localStorage.getItem("highscore"))+'</a>';
  'SCORE <br><a class="scorenum" style="    display: contents;font-size: -webkit-xxx-large;">'+eval(score)+'</a>';
console.log("sadsasdaasadsadasdasdsadsaa"+ eval(localStorage.getItem("highscore")));
