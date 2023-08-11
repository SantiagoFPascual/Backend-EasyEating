//import RestauranteService from './BaseDeDatos/src/services/restaurantes-services.js';

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

/*
for (var i = 0; i < 6; i++)
{
  
}
*/

const parser = new DOMParser();

async function initMap() {
    
    /*const coords = await RestauranteService.getCoordsById(5);

    console.log(coords);*/
  
  //Estas coordenadas son donde empieza el mapa
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -34.61172463990566, lng: -58.422167399999985 },
        zoom: 14,
        mapId: '4504f8b37365c3d0',
        
    });

    //Cambios de diseño


    /*const pinView2 = new google.maps.marker.PinView({
        background: '#00B65C',
        borderColor: '#000000',
        glyphColor: 'white',
    });*/

    /*
    Array de ejemplo
    let num = [7, 8, 9];
    num.forEach(function (value) {
    });
    */
    const coords = [{ lat: -34.60853837294786, lng: -58.4306551602909 },
                    { lat: -34.61335019300495, lng: -58.43798387809736 },
                    { lat: -34.61172463990566, lng: -58.422167399999985 },
                    { lat: -34.611538672314765, lng: -58.4303597451144 },
                    ]
    
    coords.forEach(function (item) {  
        let ll = { lat: item.lat, lng: item.lng};
        console.log(ll);

        const pinViewStyled = new google.maps.marker.PinView({
            background: '#00B65C',
            borderColor: '#FFFFFF',
            glyphColor: 'white',
            scale: 1.2
        });

        const markerViewBackground = new google.maps.marker.AdvancedMarkerView({
            map,
            position: ll,
            content: pinViewStyled.element,
        }); 

        
    });

    // Ajusta la escala
    /*const pinViewScaled = new google.maps.marker.PinView({
        scale: 1.5,
    });*/

}

declare global {
    interface Window {
        initMap: () => void;
    }
}

window.initMap = initMap;
export { };