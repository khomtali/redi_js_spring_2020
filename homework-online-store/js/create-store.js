const jsonData = {
  title: "My Snowboard Store",
  description: "We sell the best boards",
  products: [
    {
      title: 'Burton REWIND',
      price: 350,
      sku: 'DE-001',
      stock: 5,
      extra_data: {
        type: 'Snowboard',
        brand: 'burton',
        image: './img/burton_rewind.jpg',
        specification: {
          terrain: ['Freestyle', 'All-Mountain'],
          rockerType: 'Camber',
          flexRating: 'soft'
        }
      },
    },
    {
      title: 'Jones AIRHEART',
      price: 526,
      sku: 'IT-002',
      stock: 5,
      extra_data: {
        type: 'Snowboard',
        brand: 'jones',
        image: './img/jones_airheart.png',
        specification: {
          terrain: ['Freestyle', 'All-Mountain'],
          rockerType: 'Rocker/Camber/Rocker',
          flexRating: 'stiff'
        }
      }
    },
    {
      title: 'GNU KLASSY C2X',
      price: 406,
      sku: 'CH-003',
      stock: 15,
      extra_data: {
        type: 'Snowboard',
        brand: 'gnu',
        image: './img/gnu.jpg',
        specification: {
          terrain: ['Freeride', 'All-Mountain'],
          rockerType: 'Camber/Rocker/Camber',
          flexRating: 'medium'
        }
      }
    },
    {
      title: 'Roxy TORAH C2',
      price: 444,
      sku: 'DE-004',
      stock: 1,
      extra_data: {
        brand: 'roxy',
        type: 'Snowboard',
        image: './img/roxy.jpg',
        specification: {
          terrain: ['Freestyle', 'All-Mountain'],
          rockerType: 'Camber/Rocker/Camber',
          flexRating: 'medium'
        }
      }
    },
    {
      title: 'Jones AVIATOR',
      price: 496,
      sku: 'DE-005',
      stock: 1,
      extra_data: {
        type: 'Snowboard',
        brand: 'jones',
        image: './img/jones_aviator.png',
        specification: {
          terrain: ['Carving', 'All-Mountain'],
          rockerType: 'Power Camber',
          flexRating: 'stiff'
        }
      }
    }
  ]
};

async function createStore(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

if (!window.localStorage.getItem('token')) {
  createStore('https://student-store.travisshears.xyz/store', jsonData)
    .then((data) => {
      console.log(data);
      window.localStorage.setItem('token', data.store_id);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
} else console.log('token is already stored');