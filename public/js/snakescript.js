//    console.log('script loadedddd');
var indicator = document.querySelector('.indicator');
var flex=document.querySelector('.flexer-yaha-ayega');
var play = document.querySelector('.pa');
play.innerHTML = "";
indicator.innerHTML = "Red's turn";
var pawn = document.querySelector('.pawn');
var pawnb = document.querySelector('.pawnb');
//console.log(pawn)
// dragbox
var pawnRect = pawn.getBoundingClientRect();
var imp = 0;

var screen = document.querySelector('.screen');
var redscreen = document.querySelector('.screen-red');
var bluescreen = document.querySelector('.screen-blue');

//console.log("abv");



var boxer = document.querySelectorAll('.box');
//console.log(boxer[35]);
for (let i = 5; i >= 0; i--) {
    boxer[i].style.order = i + 30;
}
for (let i = 5; i >= 0; i--) {
    boxer[i + 6].style.order = 29 - i;
}
for (let i = 5; i >= 0; i--) {
    boxer[i + 12].style.order = i + 18;
}
for (let i = 5; i >= 0; i--) {
    boxer[i + 18].style.order = 17 - i;
}

for (let i = 5; i >= 0; i--) {
    boxer[i + 24].style.order = i + 6;
}
for (let i = 5; i >= 0; i--) {
    boxer[i + 30].style.order = 5 - i;
}
var rect = [];
for (let e = 0; e <= 35; e++) {
    rect[e] = boxer[e].getBoundingClientRect();
}
var Rect = boxer[0].getBoundingClientRect();
var Rect17 = boxer[17].getBoundingClientRect();
var Rect28 = boxer[28].getBoundingClientRect();
pawn.style.left = Rect.x + 28;
pawn.style.top = Rect.y + 28;
pawnb.style.left = Rect.x + 28;
pawnb.style.top = Rect.y + 28;

//console.log(pawn.style.left, boxer[0].offsetLeft);
var pb = 1;
var pbb = 1;

function catchMe() {
    //        console.log("abcd");
    var movement;
    var movementY;

    let pawnX = pawn.getBoundingClientRect().x;
    let pawnY = pawn.getBoundingClientRect().y;
    //console.log(pawn.style.left);
    var movementB;
    //    var movementY;

    let pawnbX = pawnb.getBoundingClientRect().x;
    let pawnbY = pawnb.getBoundingClientRect().y;
    //var z=1;
    if (play) {
        play.addEventListener('click', function () {
            flex.classList.toggle("flexer");
            play.classList.toggle("play-again");
            play.innerHTML = "";
        })
    }

    window.addEventListener('keypress', function () {
        if (imp % 2 == 0) {
            indicator.classList.toggle("mystyle");
            //    screen.innerHTML = '<div class="a">red</div>';
            indicator.innerHTML = "Blue's turn";
            var notRandomNumbers = [1, 2, 3, 4, 5, 6];
            var idx = Math.floor(Math.random() * notRandomNumbers.length);
            var z = notRandomNumbers[idx];
            redscreen.innerHTML = '<div class="redd">red</div>' + '<div class="redd">' + z + '</div>';
            //'<div class="blue">blue</div>'+'<div class="blue">'+zb+'</div>'
            clearInterval(movement);
            clearInterval(movementY);

            if ((pb + z) >= 37) {
                console.log("error in red");
                imp++;
                return;
            }

            let newX = rect[z + pb - 1].x + 28;
            let newY = rect[z + pb - 1].y + 28;
            pb = z + pb;

            if ((pb) == 3) {
                newX = rect[21].x + 28;
                newY = rect[21].y + 28;
                pb = 22;
            }

            if ((pb) == 18) {
                newX = rect[28].x + 28;
                newY = rect[28].y + 28;
                pb = 29;
            }

            if ((pb) == 21) {
                newX = rect[5].x + 28;
                newY = rect[5].y + 28;
                pb = 6;
            }

            if ((pb) == 35) {
                newX = rect[10].x + 28;
                newY = rect[10].y + 28;
                pb = 11;
            }
            if ((pb) == 36) {
                newX = rect[0].x + 28;
                newY = rect[0].y + 28;
                pb = 1;
                pbb = 1;
                pawnbX = newX;
                pawnbY = newY;
                pawnb.style.left = pawnbX + 'px';
                pawnb.style.top = pawnbY + 'px';

                pawnX = newX;
                pawnY = newY;
                pawn.style.left = pawnX + 'px';
                pawn.style.top = pawnY + 'px';

                redscreen.innerHTML = 'RED WON:)';
                 flex.classList.toggle("flexer");
                play.classList.toggle("play-again");
                // play.innerHTML = "<p>GAME OVER <br></p>RED WON<br><div><button type=\"button\" class=\"btn btn-success\">Play again</button><button type=\"button\" class=\"btn btn-success\">Try Something Else!!</button></div>";
                play.innerHTML = "<p>GAME OVER <br></p>RED WON<br><a><a type=\"button\" class=\"btn btn-success\">Play again</a><a type=\"button\" class=\"btn btn-primary\"href=\"https://kapilguptadtu.github.io/Web-Store/\">Try Something Else!!</a></a>";
                redscreen.innerHTML="";bluescreen.innerHTML="";
            
            }

            pawnX = newX;
            pawnY = newY;
            pawn.style.left = pawnX + 'px';
            pawn.style.top = pawnY + 'px';


            console.log("pred= " + pb);


            setTimeout(function () {
                if (pawnX == (rect[35].x + 28) && pawnY == (rect[35].y + 28)) {
                    console.log("wowww");
                    redscreen.innerHTML = 'RED WON:)';
                }
            }, 100);

        } else {
            indicator.classList.toggle("mystyle");
            indicator.innerHTML = "Red's turn";
            var notRandomNumbersb = [1, 2, 3, 4, 5, 6];
            var idxb = Math.floor(Math.random() * notRandomNumbersb.length);
            var zb = notRandomNumbersb[idxb];
            bluescreen.innerHTML = '<div class="blued">blue</div>' + '<div class="blued">' + zb + '</div>';

            console.log("bluedice=" + zb)
            clearInterval(movementB);

            if ((pbb + zb) >= 37) {
                console.log("error in blue");
                imp++;
                return;
            }

            let newX = rect[zb + pbb - 1].x + 28;
            let newY = rect[zb + pbb - 1].y + 28;

            pbb = zb + pbb;
            console.log("pblue= " + pbb);

            if ((pbb) == 3) {
                newX = rect[21].x + 28;
                newY = rect[21].y + 28;
                pbb = 22;
            }

            if ((pbb) == 18) {
                newX = rect[28].x + 28;
                newY = rect[28].y + 28;
                pbb = 29;
            }

            if ((pbb) == 21) {
                newX = rect[5].x + 28;
                newY = rect[5].y + 28;
                pbb = 6;
            }

            if ((pbb) == 35) {
                newX = rect[10].x + 28;
                newY = rect[10].y + 28;
                pbb = 11;
            }
            if ((pbb) == 36) {
                newX = rect[0].x + 28;
                newY = rect[0].y + 28;
                pbb = 1;
                pb = 1;

                pawnX = newX;
                pawnY = newY;
                pawn.style.left = pawnX + 'px';

                pawn.style.top = pawnY + 'px';
                pawnbX = newX;
                pawnbY = newY;
                pawnb.style.left = pawnbX + 'px';
                pawnb.style.top = pawnbY + 'px';
                bluescreen.innerHTML = 'BLUE WON:)';
                 flex.classList.toggle("flexer");
                play.classList.toggle("play-again");
                // play.innerHTML = "<p>GAME OVER <br></p>BLUE WON.<br><div><a>Play again</a><a>Try Something Else</a></div>";
                play.innerHTML = "<p>GAME OVER <br></p>BLUE WON<br><a><a type=\"button\" class=\"btn btn-success\">Play again</a><a type=\"button\" class=\"btn btn-primary\"href=\"https://kapilguptadtu.github.io/Web-Store/\">Try Something Else!!</a></a>";
                redscreen.innerHTML="";bluescreen.innerHTML="";
            }

            //if ((pbb) >= 37) {console.log("err");return;}

            pawnbX = newX;
            pawnbY = newY;
            pawnb.style.left = pawnbX + 'px';
            pawnb.style.top = pawnbY + 'px';




            //   console.log(pawnY);

            //                if (newY == pawnbY) {
            //                    //          console.log("asdadsasadas");
            //                    movementB = setInterval(function () {
            //                        if (pawnbX == newX) {
            //                            //        console.log("asdadsasadas");
            //                            pawnbX = newX;
            //                            //         pawnY=newdY;
            //
            //                            clearInterval(movementB);
            //
            //                            return;
            //                        }
            //                        pawnbX += moveX;
            //
            //                        pawnb.style.left = pawnbX + 'px';
            //                        //           pawnY = newY; 
            //                        //           pawn.style.top = pawnY + 'px';
            //
            //                    }, 5);
            //                    pawnbY = newY;
            //                    pawnb.style.top = pawnbY + 'px';
            //
            //                }
            //                if (pawnbY != newY) {

            //                }
            setTimeout(function () {
                if (pawnbX == (rect[35].x + 28) && pawnbY == (rect[35].y + 28)) {
                    console.log("wow blue");
                    bluescreen.innerHTML = 'BLUE WON:)';
                }
            }, 100);


        }
        imp++;
    })

    indicator.addEventListener('click', function () {
        console.log("Event");
        if (imp % 2 == 0) {
            indicator.classList.toggle("mystyle");
            //    screen.innerHTML = '<div class="a">red</div>';
            indicator.innerHTML = "Blue's turn";
            var notRandomNumbers = [1, 2, 3, 4, 5, 6];
            var idx = Math.floor(Math.random() * notRandomNumbers.length);
            var z = notRandomNumbers[idx];
            redscreen.innerHTML = '<div class="redd">red</div>' + '<div class="redd">' + z + '</div>';
            //'<div class="blue">blue</div>'+'<div class="blue">'+zb+'</div>'
            clearInterval(movement);
            clearInterval(movementY);

            if ((pb + z) >= 37) {
                console.log("error in red");
                imp++;
                return;
            }

            let newX = rect[z + pb - 1].x + 28;
            let newY = rect[z + pb - 1].y + 28;
            pb = z + pb;

            if ((pb) == 3) {
                newX = rect[21].x + 28;
                newY = rect[21].y + 28;
                pb = 22;
            }

            if ((pb) == 18) {
                newX = rect[28].x + 28;
                newY = rect[28].y + 28;
                pb = 29;
            }

            if ((pb) == 21) {
                newX = rect[5].x + 28;
                newY = rect[5].y + 28;
                pb = 6;
            }

            if ((pb) == 35) {
                newX = rect[10].x + 28;
                newY = rect[10].y + 28;
                pb = 11;
            }
            if ((pb) == 36) {
                newX = rect[0].x + 28;
                newY = rect[0].y + 28;
                pb = 1;
                pbb = 1;
                pawnbX = newX;
                pawnbY = newY;
                pawnb.style.left = pawnbX + 'px';
                pawnb.style.top = pawnbY + 'px';

                pawnX = newX;
                pawnY = newY;
                pawn.style.left = pawnX + 'px';
                pawn.style.top = pawnY + 'px';

                redscreen.innerHTML = 'RED WON:)';
                 flex.classList.toggle("flexer");
                play.classList.toggle("play-again");
                play.innerHTML = "<p>GAME OVER <br></p>RED WON<br><a><a type=\"button\" class=\"btn btn-success\">Play again</a><a type=\"button\" class=\"btn btn-primary\"href=\"https://kapilguptadtu.github.io/Web-Store/\">Try Something Else!!</a></a>";
                redscreen.innerHTML="";bluescreen.innerHTML="";
            
            }

            pawnX = newX;
            pawnY = newY;
            pawn.style.left = pawnX + 'px';
            pawn.style.top = pawnY + 'px';


            console.log("pred= " + pb);


            setTimeout(function () {
                if (pawnX == (rect[35].x + 28) && pawnY == (rect[35].y + 28)) {
                    console.log("wowww");
                    redscreen.innerHTML = 'RED WON:)';
                }
            }, 100);

        } else {
            indicator.classList.toggle("mystyle");
            indicator.innerHTML = "Red's turn";
            var notRandomNumbersb = [1, 2, 3, 4, 5, 6];
            var idxb = Math.floor(Math.random() * notRandomNumbersb.length);
            var zb = notRandomNumbersb[idxb];
            bluescreen.innerHTML = '<div class="blued">blue</div>' + '<div class="blued">' + zb + '</div>';

            console.log("bluedice=" + zb)
            clearInterval(movementB);

            if ((pbb + zb) >= 37) {
                console.log("error in blue");
                imp++;
                return;
            }

            let newX = rect[zb + pbb - 1].x + 28;
            let newY = rect[zb + pbb - 1].y + 28;

            pbb = zb + pbb;
            console.log("pblue= " + pbb);

            if ((pbb) == 3) {
                newX = rect[21].x + 28;
                newY = rect[21].y + 28;
                pbb = 22;
            }

            if ((pbb) == 18) {
                newX = rect[28].x + 28;
                newY = rect[28].y + 28;
                pbb = 29;
            }

            if ((pbb) == 21) {
                newX = rect[5].x + 28;
                newY = rect[5].y + 28;
                pbb = 6;
            }

            if ((pbb) == 35) {
                newX = rect[10].x + 28;
                newY = rect[10].y + 28;
                pbb = 11;
            }
            if ((pbb) == 36) {
                newX = rect[0].x + 28;
                newY = rect[0].y + 28;
                pbb = 1;
                pb = 1;

                pawnX = newX;
                pawnY = newY;
                pawn.style.left = pawnX + 'px';

                pawn.style.top = pawnY + 'px';
                pawnbX = newX;
                pawnbY = newY;
                pawnb.style.left = pawnbX + 'px';
                pawnb.style.top = pawnbY + 'px';
                bluescreen.innerHTML = 'BLUE WON:)';
                 flex.classList.toggle("flexer");
                play.classList.toggle("play-again");
                play.innerHTML = "<p>GAME OVER <br></p>BLUE WON<br><a><a type=\"button\" class=\"btn btn-success\">Play again</a><a type=\"button\" class=\"btn btn-primary\" href=\"https://kapilguptadtu.github.io/Web-Store/\">Try Something Else!!</a></a>";
                redscreen.innerHTML="";bluescreen.innerHTML="";
            }

            //if ((pbb) >= 37) {console.log("err");return;}

            pawnbX = newX;
            pawnbY = newY;
            pawnb.style.left = pawnbX + 'px';
            pawnb.style.top = pawnbY + 'px';




            //   console.log(pawnY);

            //                if (newY == pawnbY) {
            //                    //          console.log("asdadsasadas");
            //                    movementB = setInterval(function () {
            //                        if (pawnbX == newX) {
            //                            //        console.log("asdadsasadas");
            //                            pawnbX = newX;
            //                            //         pawnY=newdY;
            //
            //                            clearInterval(movementB);
            //
            //                            return;
            //                        }
            //                        pawnbX += moveX;
            //
            //                        pawnb.style.left = pawnbX + 'px';
            //                        //           pawnY = newY; 
            //                        //           pawn.style.top = pawnY + 'px';
            //
            //                    }, 5);
            //                    pawnbY = newY;
            //                    pawnb.style.top = pawnbY + 'px';
            //
            //                }
            //                if (pawnbY != newY) {

            //                }
            setTimeout(function () {
                if (pawnbX == (rect[35].x + 28) && pawnbY == (rect[35].y + 28)) {
                    console.log("wow blue");
                    bluescreen.innerHTML = 'BLUE WON:)';
                }
            }, 100);


        }
        imp++;
    })








}

catchMe();
