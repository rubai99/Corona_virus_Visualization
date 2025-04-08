function updateMap() {
    fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                const latitude = country.countryInfo.lat;
                const longitude = country.countryInfo.long;
                const cases = country.cases;
                const countryName = country.country;
                const deaths = country.deaths;
                const recovered = country.recovered;

                let color;
                if (deaths >= 2000) {
                    color = "rgb(255, 0, 0)";
                } else if (deaths <= 100) {
                    color = "rgb(33, 178, 12)";
                } else {
                    color = `rgb(${deaths}, 0, 0)`;
                }

                const marker = new mapboxgl.Marker({
                    color: color,
                    draggable: false,
                }).setLngLat([longitude, latitude])
                  .addTo(map);

                const popup = new mapboxgl.Popup({
                offset: 25,
                closeButton: false,
                closeOnClick: false,
                }).setHTML(`
                    <div style="
                        background: rgba(255, 255, 255, 0.95);
                        border-radius: 10px;
                        padding: 10px 15px;
                        font-family: 'Segoe UI', sans-serif;
                        color: #333;
                        font-size: 14px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    ">
                        <strong style="font-size: 16px;">${countryName}</strong><br/>
                        <span>🦠 Cases: <strong>${cases.toLocaleString()}</strong></span><br/>
                        <span>💀 Deaths: <strong>${deaths.toLocaleString()}</strong></span><br/>
                        <span>💚 Recovered: <strong>${recovered.toLocaleString()}</strong></span>
                    </div>
                `);

                marker.getElement().addEventListener('mouseenter', () => popup.addTo(map).setLngLat([longitude, latitude]));
                marker.getElement().addEventListener('mouseleave', () => popup.remove());
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

let interval = 10000; // 10 seconds is more polite to the API
setInterval(updateMap, interval);
