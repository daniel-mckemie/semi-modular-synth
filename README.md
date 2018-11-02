#Semi-Modular-Synth
# Tape Delay Feedback System
 A browser housed semi-modular synthesizer, built using Flocking, NexusUI, 
A browser housed tape delay feedback system, written in JavaScript and utilizing the Web Audio API/Tone.js, Web MIDI API, and NexusUI.

 The system is a digital replica of the one outlined and used by Pauline Oliveros for her *Mnemonics* series, and is outlined in more detail in the article below.

 [Tape Delay Techniques for Electronic Music Composers](https://www.scribd.com/document/256462168/Oliveros-Pauline-Tape-Delay-Techniques)
 
 **Instructions for use:**
- First, push the button to switch the system **ON**
- There are two oscillators that are the soundsources for the system, both operating in the superaudio range (22000Hz - 96000Hz depending on sample rate).
- The sliders allow you to control the amplitude of each respective oscillator, the level of feedback being brought back into the system (this mimics the line amplifier used by Pauline in the original system), the depth of the delay, and the depth of the Right Channel in the system.  More information on these can be found by toggling the **HELP** switch.
- You can turn the oscillators off and choose to have your own input into the system by toggling the **INPUT** switch.  The browser should detect your local hardware specs and sync automatically based on your settings, though this has not been fully tested beyond OSX and Chromebook.

 *Things to be aware of:*
- The system is sensitive!  You are dealing with a lot of looped and delayed feedback!  If you find that the system has 'bottomed out' (ie. stopped making all sound), it is likely because the feedback was overwhelming and it muted itself.  To clear the system, simply lower the **DELAY FEEDBACK** amplitude, and perhaps the other depth sliders.
- It is highly suggested that you read the article above, and give a listen to Pauline's early electronic works that utilize this system.  Again, [Mnemonics I-V by Pauline Oliveros](https://youtu.be/QhOEY-mwIyg) are the pieces that use this system, and could be a good reference to how it is acting.  You may also refer to pieces such as [Saxony by James Tenney](https://youtu.be/Ucqb9zGWNHc); and though it employs somewhat different techniques, [Poppy Nogood and the Phantom Band by Terry Riley](https://youtu.be/mgIT5xh1nJE).
- Lastly, it is suggested to let the system be itself.  Experimentation is key, but sometimes stepping away and letting things unfold is when magic can happen.  Remember, in feedback systems, not every action has an effect, and even the slightest action can have massive impacts.