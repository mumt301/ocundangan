let mouseDown = false;
let delta = 50;
let x = 0;
let y = 0;

var notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
var notesColours = [0, 40, 80, 120, 160, 200, 240, 300];
var octaves = ['3', '4', '5', '6', '7'];
var synth = null;
var animates = true;
var numParticles = 15;
var settingsOpen = true;

var keys = '1234567890 abcdefghijklmnopqrstuvwxyz`-=[]\\;\',./';

// Initialize and set on page loadd
window.onload = function foo(){
    if (!document.body.animate){    // If browser does not support animations do not try to animate anything
        alert("Your browser does not support animations. Cannot display any visuals.");
        animates = false;
    }

    synth = new Tone.PolySynth().toDestination();
    synth.volume.value = -20;
    console.log(synth.get());
    
    // Add listeners for every key on keyboard
    document.addEventListener("keydown", (e) =>{
        if (keys.includes(e.key)&& !e.repeat){
            executeEvent(e.key);
        }
    })

    console.log(synth);
}

// Updates the settings of the ADSR envelope for the PolySynth 
// Based on the settings in the settings pane
function updateEnvelopeSettings(){
    let a = $( "input[type=number][name=attack]" ).val();
    let aC = document.getElementById("attackCurve").value;
    let d = $( "input[type=number][name=decay]" ).val();
    let dC = document.getElementById("decayCurve").value;
    let s = $( "input[type=number][name=sustain]" ).val();
    let sC = document.getElementById("sustainCurve").value;
    let r = $( "input[type=number][name=release]" ).val();
    console.log(a,aC,d,dC,s,sC,r);

    synth.set(
        {
            envelope: {
                attack: a,
                attackCurve: aC,
                decay: d,
                decayCurve: dC,
                sustain: s,
                sustainCurve: sC,
                release: r,
            }
    });
}

// Updates the settings of the Oscillator envelope for the PolySynth
// Based on the settings in the settings pane
function updateOscSettings(){
    let t = document.getElementById("oscType").value;
    let p = $( "input[type=number][name=oscPhase]" ).val();
    let nP = $( "input[type=number][name=oscNumPart]" ).val();
    let dt = $( "input[type=number][name=oscDetune]" ).val();
    console.log(t,p,nP,dt);

    synth.set(
        {
            oscillator: {
                type: t,
                phase: p,
                partialCount: nP,
                detune: dt,
            }
    });
}

// Updates volume
function updateVolume(){
    let v = $( "input[type=number][name=volume]" ).val();
    synth.volume.value = v;
}

// Updates number of particles to generate
function updateParticles(item){
    console.log(item);
    if (!Number.isInteger(item.value)){
        item.value = Math.floor(item.value);
    }
    numParticles = item.value;
}

// Updates the background colour for the site
function updateBgColour(item){
    console.log(item.value);
    let div = document.getElementById('canvasDiv');
    div.style.background = item.value;
}

// Toggle the settings panel
function toggleSettings(item){
    if (item.id == "toggleSettingsBtn"){
        if (settingsOpen){
            // Hide settings visible
            $('#toggleSettingsBtn').css("left", '1%');
            $('#settingsPanel').hide(100);
        }
        else{
            // Show settings
            $('#toggleSettingsBtn').css("left", 'calc(1% + 380px)');
            $('#settingsPanel').show(100);
        }

        $('#sBtnIcon').toggleClass('fas fa-cogs fas fa-window-close')
        settingsOpen = !settingsOpen;
    }
}

// clamps values for the item based on max and min
function clampValue(item, min, max){
    if (max != null && item.value > max){
        item.value = max;
    }
    else if (min != null && item.value < min){
        item.value = min;
    }
}


// Maps a letter to an (x,y) in screen space and executes the synth sound and pop with this (x,y) 
function executeEvent(letter){
    let idx = keys.indexOf(letter);
    let frac = idx/keys.length;

    let width = window.innerWidth * 0.95;
    let height = window.innerHeight * 0.90;
    let sqr = Math.floor(Math.sqrt(keys.length));
    let y = Math.floor(height * frac) + Math.floor((height/sqr)*0.5);
    let x = Math.floor(width / sqr) * (idx % sqr) + Math.floor((width/sqr)*0.5) + Math.floor(y * 0.05);

    triggerSynthSound(x, y);
    pop(x,y, numParticles);
}

// On mouse Down event. If the mouse is clicked trigger a synth sound and visual
function onMouseDown(e){
    mouseDown = true;
    x = e.clientX;
    y = e.clientY;
    triggerSynthSound(x,y);
    pop(x, y, numParticles);
}

// Inform the app that the user is no longer pressing down
function onMouseUp(e){
    mouseDown = false;
}

// If the mouse is being held and is moved a certain delta trigger another synth sound
function onMouseMove(e){
    if (mouseDown === true){
        let x1 = e.clientX;
        let y1 = e.clientY;
        if (Math.abs(x1-x) >= delta || Math.abs(y1-y) >= delta){
            x = x1;
            y = y1;
            triggerSynthSound(x,y);
            pop(x, y, numParticles);
        }
    }
}

// Maps every (x,y) in the screen space to a note and octae. Then triggers an attack release on that note.
function triggerSynthSound(x, y){
    // Deterministically generate a note and its octave based on the (x,y) of mouse position
    var note = notes[x % notes.length];
    var octave = octaves[y % octaves.length];
    var fullNote = note + octave;
    console.log(fullNote + " " + x + " " + y);
    synth.triggerAttackRelease(fullNote, "16n");
}

// Randomly draws numParticles particles with their origin at (x,y)
function pop (x, y, numParticles) {
    if (!animates){
        return;
    }
    
    // Pass origin of particle generation as x,y to createParticle function
    for (let i = 0; i < numParticles; i++) {
        createParticle(x, y);
    }
}
  
// Draws a randomly shifted particle with the origin of x,y and a deterministic colour based off the x,y
function createParticle (x, y) {
    const particle = document.createElement('particle');
    document.body.appendChild(particle);
    
    // Calculate a random size from 5px to 25px
    const size = Math.floor(Math.random() * 20 + 5);
    var color = `hsl(${Math.random() * 90 + 90}, 70%, 50%)`;
    particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    width = height = Math.random() * 5 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    // Generate a random color in a blue/purple palette
    particle.style.background = `hsl(${Math.random() * 90 + notesColours[x%notesColours.length]}, 70%, 60%)`;
    
    // Generate a random x & y destination within a distance of 75px from the mouse
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y + (Math.random() - 0.5) * 2 * 75;
  
    // Store the animation in a variable as we will need it later
    const animation = particle.animate([
      {
        // Set the origin position of the particle
        // We offset the particle with half its size to center it around the mouse
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        opacity: 1
      },
      {
        // We define the final coordinates as the second keyframe
        transform: `translate(${destinationX}px, ${destinationY}px)`,
        opacity: 0
      }
    ], {
      // Set a random duration from 500 to 1500ms
      duration: Math.random() * 1000 + 500,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      // Delay every particle with a random value of 200ms
      delay: Math.random() * 200
    });
    
    // When the animation is complete, remove the element from the DOM
    animation.onfinish = () => {
      particle.remove();
    };
}