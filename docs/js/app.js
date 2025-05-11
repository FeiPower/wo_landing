/* -----------------------------------------------
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */

/* To load a config file (particles.json) you need to host this demo (MAMP/WAMP/local)... */
/*
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded - callback');
});
*/

/* Otherwise just put the config content (json): */

// Function to get a random number between min and max
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to get a random color with 80% opacity
function getRandomColor() {
  const colors = ["#00FFFF", "#FF00FF", "#fff900"]; // white, red, blue, yellow
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor; // 80% opacity
}

// Store the base configuration
const baseConfig = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#fff"
    },
    "shape": {
      "type": ["circle", "triangle", "polygon", "star"],
      "stroke": {
        "width": 4,
        "color": "#fff90080"
      },
      "polygon": {
        "nb_sides": 32
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": true
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 25,
        "size_min": 0.1,
        "sync": true
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#fff900",
      "opacity": 0.8,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 20,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "attract": {
        "enable": true,
        "rotateX": 200,
        "rotateY": 2400
      },
      "bounce": true
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 100,
        "size": 10,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

// Function to get a new random configuration
function getRandomConfig() {
  const newConfig = JSON.parse(JSON.stringify(baseConfig)); // Deep clone
  
  // Randomize values
  newConfig.particles.line_linked.distance = getRandomNumber(100, 500);
  newConfig.particles.move.speed = getRandomNumber(5, 25);
  const newColor = getRandomColor();
  newConfig.particles.shape.stroke.color = newColor;
  newConfig.particles.line_linked.color = newColor;
  newConfig.particles.color.value = newColor;
  newConfig.particles.move.attract.rotateX = getRandomNumber(200, 1500);
  newConfig.particles.move.attract.rotateY = getRandomNumber(200, 3000);
  
  return newConfig;
}

// Initialize particles
particlesJS('particles-js', baseConfig);

// Add click handler that destroys and recreates particles with new config
document.addEventListener('DOMContentLoaded', function() {
  // Initial random values after a short delay
  setTimeout(function() {
    particlesJS('particles-js', getRandomConfig());
    console.log('Initial randomization applied');
  }, 1000);
  
  // Add click handler to canvas
  document.getElementById('particles-js').addEventListener('click', function() {
    console.log('Canvas clicked, randomizing...');
    const newConfig = getRandomConfig();
    console.log('New config:', JSON.stringify({
      distance: newConfig.particles.line_linked.distance,
      speed: newConfig.particles.move.speed,
      color: newConfig.particles.shape.stroke.color,
      rotateX: newConfig.particles.move.attract.rotateX,
      rotateY: newConfig.particles.move.attract.rotateY
    }));
    
    // Destroy and recreate
    particlesJS('particles-js', newConfig);
  });
});