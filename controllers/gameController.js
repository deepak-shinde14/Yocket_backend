const cities = [
  { name: "Yapkashnagar", distance: 60, description: "Neon Oasis with glowing alleys and rooftop races, powered by solar energy." },
  { name: "Lihaspur", distance: 50, description: "Misty Labyrinth with ancient temples shrouded in fog, whispers of forgotten tech." },
  { name: "Narmis City", distance: 40, description: "Steel Jungle with towering skyscrapers and hidden underground networks." },
  { name: "Shekharvati", distance: 30, description: "Sun-Kissed Valley with rolling hills and forgotten mining tunnels." },
  { name: "Nuravgram", distance: 20, description: "Quirky Village with talking robots and malfunctioning AI guardians." }
];

const vehicles = [
  { type: "bike", range: 60, count: 2 },
  { type: "car", range: 100, count: 1 },
  { type: "suv", range: 120, count: 1 }
];

let fugitiveLocation = null;
let availableVehicles = [...vehicles];

exports.getCities = (req, res) => {
  res.json(cities);
};

exports.getVehicles = (req, res) => {
  res.json(availableVehicles);
};

exports.startGame = (req, res) => {
  // Reset game state
  availableVehicles = [...vehicles];
  
  // Randomly select fugitive location
  const randomIndex = Math.floor(Math.random() * cities.length);
  fugitiveLocation = cities[randomIndex].name;
  
  res.json({ message: "Game started", fugitiveLocation });
};

exports.checkCapture = (req, res) => {
  const { copChoices } = req.body;
  
  // Check if any cop made a successful capture
  const successfulCop = copChoices.find(cop => {
    const city = cities.find(c => c.name === cop.city);
    const vehicle = vehicles.find(v => v.type === cop.vehicle);
    
    return cop.city === fugitiveLocation && 
           vehicle.range >= city.distance * 2;
  });
  
  if (successfulCop) {
    res.json({ 
      success: true, 
      capturingCop: successfulCop.copName,
      fugitiveLocation 
    });
  } else {
    res.json({ 
      success: false, 
      message: "Fugitive escaped!",
      fugitiveLocation 
    });
  }
};