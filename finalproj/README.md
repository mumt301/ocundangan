# Customizable PolySynth Visualizer 
PolySynth Visualizer is a simple static webpage application that takes mouse and keyboard input from user and generates synthesized sounds from a PolySynth using Tone.js while displaying pleasant and relaxing visuals. The voice of the PolySynth is customizable in that the ADSR Envelope and Oscillator can be modified to experiment with synthesizing sounds. 

Every point on the screen space maps to a note and an octave and every keyboard input maps to a point on the screen. Thus, the notes are deterministically generated and the same coordinates will always produce the same note. 

## Libraries & Frameworks
This webpage application makes use of 
* Tone.js (for synthesizing sounds, the core of the app)
* Bootstrap (for easy and basic CSS layouts & visuals)
* JQuery (for easy DOM manipulation)
* FontAwesome (for easy icons)

## Code
The code for the application is quite simple. The webpage is a fullscreen canvas that has multiple event listeners. When input occurs the event is fired and an appropriate function is called. The bulk of the application resides in the triggerSynthSound() and the pop() function.

triggerSynthSound simply takes an x,y coordinate and selects a note + octave based on the x,y. The notes are selected from the same scale to reduce auditory collisions.

pop() calls drawParticle() and takes in an x,y and generates multiple particles with the origin of (x,y).

Most other functions are simply there to interface with the user and update the Tone.js PolySynth settings. All functions have a description above their definition.

## References
[Creating Particle Animations using the Web Animations API](https://css-tricks.com/playing-with-particles-using-the-web-animations-api/)