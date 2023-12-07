const cars = {
    new: [
      {
        image: 'new cars/ca1.jpg',
        title: '$30,000 Tesla Model 3',
        description: 'The Best Thing That Elon Has Ever Created! '
      },
      {
        image: 'new cars/newcar2.jpeg',
        title: '$20,000 2023 Toyota Prius',
        description: 'Finally a Prius That Does Not Question Your Life Choices!'
      },
      {
        image: 'new cars/car3.jpeg',
        title: '$80,000 2023 Dodge Charger Hellcat',
        description: 'Terrorizing The Streets Never Sounded So Fun!'
      },
    ],
    old: [
      {
        image: 'old cars/clunker .jpeg',
        title: ' $400 Volkswagen Beetle',
        description: 'A classic Herby with the horsepower of a stallion'
      },
      {
        image: 'old cars/old car 3.jpeg',
        title: '$1,000 Grandpa\'s Ride',
        description: 'Keep Grandpa\'s Dream alive by purchasing and restoring this relic!'
      },
      {
        image: 'old cars/car 6.jpeg',
        title: '$4,000 Suzuki Every 660',
        description: 'Great for camping that will have your neighbors wishing they were you '
      },
    ]
  };
  
  let currentCarIndex = 0;
  
  const carImage = document.getElementById('car-image');
  const carTitle = document.getElementById('car-title');
  const carDescription = document.getElementById('car-description');
  const nextBtn = document.getElementById('next-btn');
  const backBtn = document.getElementById('back-btn');
  
  const carCategoryDropdown = document.getElementById('car-category');
  
  function displayCar(index, category) {
    const car = cars[category][index];
    carImage.src = car.image;
    carTitle.textContent = car.title;
    carDescription.textContent = car.description;
  }
  
  displayCar(currentCarIndex, carCategoryDropdown.value);
  
  nextBtn.addEventListener('click', () => {
    currentCarIndex = (currentCarIndex + 1) % cars[carCategoryDropdown.value].length;
    displayCar(currentCarIndex, carCategoryDropdown.value);
  });
  
  backBtn.addEventListener('click', () => {
    currentCarIndex = (currentCarIndex - 1 + cars[carCategoryDropdown.value].length) % cars[carCategoryDropdown.value].length;
    displayCar(currentCarIndex, carCategoryDropdown.value);
  });
  
  carCategoryDropdown.addEventListener('change', () => {
    currentCarIndex = 0;
    displayCar(currentCarIndex, carCategoryDropdown.value);
  });

function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 10,
    });

    const input = document.getElementById('map-search');
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    searchBox.addListener('places_changed', function () {
        const places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        const bounds = new google.maps.LatLngBounds();

        places.forEach(function (place) {
            if (!place.geometry) {
                console.log('Returned place contains no geometry');
                return;
            }

            markers.push(
                new google.maps.Marker({
                    map: map,
                    title: place.name,
                    position: place.geometry.location,
                })
            );

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });

        map.fitBounds(bounds);
    });
}

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCsL4iOX-zV6ZKgjPuhi4JJ5mLxUPORHQg&libraries=places&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
}

window.onload = loadGoogleMapsScript;
