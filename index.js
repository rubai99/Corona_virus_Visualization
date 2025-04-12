const overlay = document.getElementById('styleOverlay');
    const toggleButton = document.getElementById('toggleStyle');
    const icon = document.getElementById('themeIcon');

    toggleButton.addEventListener('click', () => {
      icon.classList.add('spin');
      overlay.classList.add('fade-in');

      setTimeout(() => {
        currentStyle = currentStyle === 'mapbox://styles/mapbox/streets-v11'
          ? 'mapbox://styles/mapbox/dark-v10'
          : 'mapbox://styles/mapbox/streets-v11';

        map.setStyle(currentStyle);

        icon.textContent = currentStyle.includes('dark') ? '☀️' : '🌙';

        map.on('style.load', updateMap);

        setTimeout(() => {
          overlay.classList.remove('fade-in');
        }, 800);
      }, 400);

      setTimeout(() => {
        icon.classList.remove('spin');
      }, 600);
    });

    function updateMap() {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(countries => {
          countries.forEach(country => {
            const { lat, long } = country.countryInfo;
            const { cases, deaths, recovered } = country;
            const countryName = country.country;

            let color;
            if (deaths >= 2000) {
              color = "rgb(255, 0, 0)";
            } else if (deaths <= 100) {
              color = "rgb(33, 178, 12)";
            } else {
              color = rgb(${deaths}, 0, 0);
            }

            const marker = new mapboxgl.Marker({
              color: color,
              draggable: false,
            }).setLngLat([long, lat])
              .addTo(map);

            const popup = new mapboxgl.Popup({
              offset: 25,
              closeButton: false,
              closeOnClick: false,
            }).setHTML(
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
            );

            marker.getElement().addEventListener('mouseenter', () => popup.addTo(map).setLngLat([long, lat]));
            marker.getElement().addEventListener('mouseleave', () => popup.remove());
          });
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }

    let interval = 10000;
    setInterval(updateMap, interval);
    updateMap(); // initial call
