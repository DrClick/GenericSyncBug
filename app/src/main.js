/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var ImageSurface = require('famous/surfaces/ImageSurface');
    var Surface = require('famous/core/surface');


    var GenericSync     = require('famous/inputs/GenericSync');
    var ScrollSync      = require('famous/inputs/ScrollSync');

    GenericSync.register({scroll : ScrollSync});


    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var message = new Surface({
        size:[250,20],
        content: "Try using the scroll in the x direction"
    });
    mainContext.add(new Modifier({origin: [.5,0], align: [.5,0]})).add(message);

    

    //create the sync
    var position = 0;
    var sync = new GenericSync(['scroll'], {direction: 0});
    sync.on('update', _updatePosition);
    Engine.pipe(sync);

    var logo = new ImageSurface({
        size: [200, 200],
        content: '/content/images/famous_logo.png',
        classes: ['backfaceVisibility']
    });

    var initialTime = Date.now();
    var centerSpinModifier = new Modifier({
        origin: [0.5, 0.5],
        transform : function() {
            var translate = Transform.translate(position, 0, 0);
            var rotate = Transform.rotateY(.002 * (Date.now() - initialTime));
            return Transform.multiply(translate, rotate);
        }
    });

    mainContext.add(centerSpinModifier).add(logo);

    function _updatePosition(data){
        console.log(data.position);
        position = data.position;
    }
});
