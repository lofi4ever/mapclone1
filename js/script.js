$( function(){
  // var active_fill = ["076"];
  // var active_fill = ["031","040","056","100","112","124","156","203","208","250","276","356","380","398","408","428","434","440","442","528","554","578","591","616","620","705","724","756","792","804","826","840"];
  var active_fill = {
    "031":"Азербайджан",
    "040":"Австрия",
    "056":"Бельгия (4)",
    "100":"Болгария",
    "112":"Беларусь (2)",
    "124":"Канада",
    "156":"Китай",
    "203":"Чехия",
    "208":"Дания",
    "250":"Франция",
    "276":"Германия",
    "356":"Индия",
    "380":"Италия",
    "398":"Казахстан",
    "408":"Северная Корея",
    "428":"Латвия",
    "434":"Ливия",
    "440":"Литва",
    "442":"Люксембург",
    "528":"Нидерланды",
    "554":"Новая Зеландия",
    "578":"Норвегия",
    "591":"Панама",
    "616":"Польша",
    "620":"Португалия",
    "705":"Словения",
    "724":"Испания",
    "756":"Швейцария",
    "792":"Турция",
    "804":"Украина",
    "826":"Великобритания",
    "840":"США"
  };

  var countriesArray = [];
  var svgdom;


  function loadSvg( filename, cloneCountry ){
    var loadXML = new XMLHttpRequest;
    
    loadXML.onload = callback;
    loadXML.open( 'GET', filename, true );
    loadXML.send();

    function callback(){
      var parser     = new DOMParser();
      var loadSvgDom = parser.parseFromString( loadXML.responseText, 'text/xml' ).documentElement;

      // var element    = loadSvgDom.getElementById( 'image' );
      var element    = loadSvgDom.getElementById( 'flags' );
            
      // $( element )
      //   .attr( 'data-pointer-country', cloneCountry.attr( 'id' ) );
      var countyVerticalCenter = ( Math.abs( cloneCountry.coordsObjest.top - cloneCountry.coordsObjest.bottom ) ) / 2;

      // -23 half of width of the pointer; -64 height of the pointer;
      element.setAttribute( 'transform', 'translate(' + ( ( cloneCountry.coordsObjest.width / 2)) + ',' + ( countyVerticalCenter - 18) + ')' );
      // element.addEventListener( 'click', handleClick );
      cloneCountry.children().remove();
      cloneCountry
        .addClass( 'active__copy' )
        .attr( 'data-pointer-country', cloneCountry.attr( 'id' ) )
        .addClass( 'js-tooltips' )
        .append( element )
        .appendTo( '#map-wrap' )
        ;
    }

  }

  $( '.interactive_map' ).load( 'img/map_new.svg', function( response ){       
      if ($( this ).find( 'svg' ).length != 0) {
        $( this ).find( 'svg' ).width( '100%' ).height( '651px' );
        svgdom = $( this ).contentDocument;
        $( this ).addClass( 'svgLoaded' );
      }
      // Temp-1
      var tempI = 0;

      //for( var i = 0; i < active_fill.length; i++ ){
        var i =0;
      for(key in active_fill){
        // Get country coordinates
        // console.log(key);
        var countryCoords = $( this )
          .find( 'svg' )
          //.find( 'g[county_id=' + active_fill[ i ] + ']' )
          .find( 'g[county_id=' + key + ']' )
          .get( 0 )
          .getBoundingClientRect();
          // 
        // Get country coordinates

        // Get country clone
        var countryClone = $( this )
          .find( 'svg' )
          //.find( 'g[county_id=' + active_fill[ i ] + ']' )
          .find( 'g[county_id=' + key + ']' )
          .addClass( 'active' )
          .attr( 'data-from', '' )
          .clone()
          .attr( 'title', active_fill[key] );

        // Get country clone

        // Push country clone to array
        countriesArray.push( countryClone );
        
        // Get transform: translate-y
        // Temp-1
        // var offsetY = countriesArray[ tempI ]

        var offsetY = $( countriesArray[ i ] )
          .attr( 'transform' )
          .replace( /translate\((\d+\.\d+)\,\s+(\d+\.\d+)\)/i, '$2' );

        // Temp-1
        // tempI++;
        // Get transform: translate-y

        // Add new property

        countryClone.offsetY      = parseInt( offsetY, 10 );
        countryClone.coordsObjest = countryCoords;

        // Add new property

        // Add preloader

        // $( this )
        //   .siblings( '.preload' )
        //   .remove();

        // Add preloader

        i++;
      }

      // Sort an object's properties by the offsetY field
      function compareNumeric( a, b ){
        return a.offsetY - b.offsetY;
      }
        
      countriesArray.sort( compareNumeric );

      // Sort an object's properties by the offsetY field

      // Add a pointers to countries
           
      for( var i = 0; i < countriesArray.length; i++ ){
        // var link_pointer = 'img/flags_for_map/'+countriesArray[ i ].attr('county_id')+'.svg';
        var link_pointer = 'img/red_flags.svg';
        countriesArray[ i ]
          .append( loadSvg( link_pointer, countriesArray[ i ] ) );
      }

      console.log($('.js-tooltips').length);

      
      
      // Add a pointers to countries

      if( !response ){/*Ошибка при загрузке SVG!*/}
  });

  

  $('.j-tool').tooltipster();
  setTimeout(function() {
    // $('.interactive_map g.active image').tooltipster({
    //   content: "content from flag",
    // });
    // $('.interactive_map g.active').find('>:first-child').tooltipster({
    //   content: "text from child"
    // });
    $('.interactive_map g.active').tooltipster({
      content: "content from country",
    });
    for(var i=0; i<countriesArray.length; i++) {
      countriesArray[i].tooltipster({
        content: "country from flag",
      });
    }
  }, 3000);
} );