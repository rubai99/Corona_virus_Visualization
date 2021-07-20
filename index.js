function updateMap() {
    //console.log("Updating map with realtime data")
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.infected;
                if (cases>=255){
                    color = "rgb(255, 0, 0)";
                }

                else{
                    color = `rgb(${cases}, 0, 0)`;
                }

                new mapboxgl.Marker({
                    color: color,
                    draggable: false,
                }).setLngLat([longitude, latitude])
                .addTo(map); 
            });
        })
}


let interval = 5000;
setInterval( updateMap, interval); 