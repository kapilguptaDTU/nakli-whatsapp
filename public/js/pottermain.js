var spellAnimation = bodymovin.loadAnimation({
    container: document.getElementById('potter-animation'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'https://raw.githubusercontent.com/abrahamrkj/facebook-spell/master/data.json'
  })
  
  $("body").click(function() { 
      console.log("clicked");
    spellAnimation.stop();
    spellAnimation.play();
  });
  
  $(document).ready(function(){
    spellAnimation.play();
  })