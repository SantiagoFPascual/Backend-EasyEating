import axios from 'axios'

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const parser = new DOMParser();

function initMap() {
    let url='http://localhost:5000/api/restaurantes/';
    axios
        .get(url)
        .then((result)=>{

            console.log("h");
             
        })
    
    .catch((error)=>{
        console.log(error);
    });
  
  //Estas coordenadas son donde empieza el mapa
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -34.61172463990566, lng: -58.422167399999985 },
        zoom: 14,
        mapId: '4504f8b37365c3d0',
        
    });

    //Cambios de diseño
    const pinViewStyled = new google.maps.marker.PinView({
        background: '#00B65C',
        borderColor: '#FFFFFF',
        glyphColor: 'white',
    });

    //Array de ejemplo
    let num = [7, 8, 9];
    num.forEach(function (value) {
    }); 

    //Aplicamos los cambios
    const markerViewBackground = new google.maps.marker.AdvancedMarkerView({
        map,
        position: { lat: -34.61172463990566, lng: -58.422167399999985 },
        content: pinViewStyled.element,
    });

    
    /*
    const markerViewBorder = new google.maps.marker.AdvancedMarkerView({
        map,
        position: { lat: 37.415, lng: -122.03 },
        content: pinViewBorder.element,
    });*/

    /*
    // Change the glyph color.
    const pinViewGlyph = new google.maps.marker.PinView({
        glyphColor: 'white',
    });*/
    /*
    const markerViewGlyph = new google.maps.marker.AdvancedMarkerView({
        map,
        position: { lat: 37.415, lng: -122.02 },
        content: pinViewGlyph.element,
    });*/

    // Hide the glyph.
    /*
    const pinViewNoGlyph = new google.maps.marker.PinView({
        glyph: '',
    });
    */
   
    /*const markerViewNoGlyph = new google.maps.marker.AdvancedMarkerView({
        map,
        position: { lat: 37.415, lng: -122.01 },
        content: pinViewNoGlyph.element,
    });*/

        // Each PinView is paired with a MarkerView to demonstrate setting each parameter.

    // Default marker with title text (no PinView).
    /*
    const markerViewWithText = new google.maps.marker.AdvancedMarkerView({
        map,
        position: { lat: 37.419, lng: -122.03 },
        title: 'Title text for the marker at lat: 37.419, lng: -122.03',
    });*/

    // Ajusta la escala
    const pinViewScaled = new google.maps.marker.PinView({
        scale: 1.5,
    });
    /*
    const markerViewScaled = new google.maps.marker.AdvancedMarkerView({
        map,
        position: { lat: 37.419, lng: -122.02 },
        content: pinViewScaled.element,
    });*/

}

declare global {
    interface Window {
        initMap: () => void;
    }
}

window.initMap = initMap;
export { };