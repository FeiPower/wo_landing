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
  const colors = ["#FFFF00", "#00FF00", "#0000FF", "#FF00FF", "#FF0000", "#00FFFF"]; // yellow, green, blue, magenta, red, cyan
  return colors[Math.floor(Math.random() * colors.length)];
}

// Store the base configuration
const baseConfig = {
  "particles": {
    "number": {
      "value": 50,
      "density": {
        "enable": false,
        "value_area": 800
      }
    },
    "color": {
      "value": "#fff"
    },
    "shape": {
      "type": ["circle", "triangle", "polygon", "star"],
      "stroke": {
        "width": 0,
        "color": "#fff90080"
      },
      "polygon": {
        "nb_sides": 6
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
        "enable": true,
        "speed": 1,
        "size_min": 0.1,
        "sync": true
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#fff900",
      "opacity": 0.95,
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
  newConfig.particles.line_linked.distance = getRandomNumber(50, 500);
  newConfig.particles.move.speed = getRandomNumber(1, 20);
  const newColor = getRandomColor();
  newConfig.particles.shape.stroke.color = newColor;
  newConfig.particles.line_linked.color = newColor;
  newConfig.particles.line_linked.width = getRandomNumber(.1, 3);
  newConfig.particles.color.value = newColor;
  newConfig.particles.move.attract.rotateX = getRandomNumber(200, 1500);
  newConfig.particles.move.attract.rotateY = getRandomNumber(1500, 3000);
  
  return newConfig;
}

// Track active particle systems
const particleSystems = {
  1: true,
  2: true,
  3: true
};

// Create three distinctly different configs
const systemConfigs = [
  // System 1 - Yellow theme
  (() => {
    const config = JSON.parse(JSON.stringify(baseConfig));
    config.particles.color.value = "#FFFF00";
    config.particles.line_linked.color = "#FFFF00";
    config.particles.shape.stroke.color = "#FFFF00";
    config.particles.move.speed = 8;
    config.particles.line_linked.distance = 200;
    return config;
  })(),
  
  // System 2 - Blue theme
  (() => {
    const config = JSON.parse(JSON.stringify(baseConfig));
    config.particles.color.value = "#0000FF";
    config.particles.line_linked.color = "#0000FF";
    config.particles.shape.stroke.color = "#0000FF";
    config.particles.move.speed = 12;
    config.particles.line_linked.distance = 300;
    return config;
  })(),
  
  // System 3 - Green theme
  (() => {
    const config = JSON.parse(JSON.stringify(baseConfig));
    config.particles.color.value = "#00FF00";
    config.particles.line_linked.color = "#00FF00";
    config.particles.shape.stroke.color = "#00FF00";
    config.particles.move.speed = 15;
    config.particles.line_linked.distance = 250;
    return config;
  })()
];

// Function to toggle particle system
function toggleParticleSystem(systemId, state) {
  particleSystems[systemId] = state;
  
  if (state) {
    // Activate system with random config
    const newConfig = getRandomConfig();
    particlesJS(`particles-js-${systemId}`, newConfig);
    document.getElementById(`particles-js-${systemId}`).style.display = 'block';
    console.log(`System ${systemId} activated with color: ${newConfig.particles.color.value}`);
  } else {
    // Deactivate the system
    document.getElementById(`particles-js-${systemId}`).style.display = 'none';
    console.log(`System ${systemId} deactivated`);
  }
}

// Function to randomize which systems are active
function randomizeActiveSystems() {
  // Determine number of active systems (1-3) randomly
  const activeCount = Math.floor(Math.random() * 3) + 1; // 1, 2, or 3
  console.log(`Randomizing to have ${activeCount} active systems`);
  
  // Create all possible combinations of systems
  const combinations = [];
  
  if (activeCount === 1) {
    combinations.push([1, 0, 0], [0, 1, 0], [0, 0, 1]);
  } else if (activeCount === 2) {
    combinations.push([1, 1, 0], [1, 0, 1], [0, 1, 1]);
  } else { // activeCount === 3
    combinations.push([1, 1, 1]);
  }
  
  // Pick a random combination
  const randomIndex = Math.floor(Math.random() * combinations.length);
  const selectedCombination = combinations[randomIndex];
  
  // Apply the combination
  for (let i = 1; i <= 3; i++) {
    const shouldBeActive = selectedCombination[i-1] === 1;
    
    // Only toggle if the state is changing
    if (particleSystems[i] !== shouldBeActive) {
      toggleParticleSystem(i, shouldBeActive);
    } else if (shouldBeActive) {
      // If already active, randomize its config
      const newConfig = getRandomConfig();
      particlesJS(`particles-js-${i}`, newConfig);
      console.log(`System ${i} was already active, randomizing with color: ${newConfig.particles.color.value}`);
    }
  }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', function() {
  // Initialize active systems with distinct configs
  for (let i = 1; i <= 3; i++) {
    if (particleSystems[i]) {
      particlesJS(`particles-js-${i}`, systemConfigs[i-1]);
      document.getElementById(`particles-js-${i}`).style.display = 'block';
      console.log(`System ${i} initialized with distinct config`);
    } else {
      document.getElementById(`particles-js-${i}`).style.display = 'none';
    }
  }
  
  // Add click handler to each canvas
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`particles-js-${i}`).addEventListener('click', function(e) {
      console.log(`Canvas ${i} clicked`);
      e.stopPropagation(); // Prevent bubbling to body
      
      // Randomize this system if it's active
      if (particleSystems[i]) {
        const newConfig = getRandomConfig();
        particlesJS(`particles-js-${i}`, newConfig);
        console.log(`Randomized system ${i} with color: ${newConfig.particles.color.value}`);
      }
    });
  }
  
  // Add body click handler to randomize which systems are active
  document.body.addEventListener('click', function() {
    randomizeActiveSystems();
  });
});