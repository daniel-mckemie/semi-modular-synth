# Tape Delay Feedback System

https://tape-delay-feedback-system.firebaseapp.com/

A browser housed waveform generator/noise source and tape delay feedback system, written in JavaScript and utilizing the Web Audio API/Tone.js, Web MIDI API, and NexusUI.

The delay system is a digital replica of one constructed by Pauline Oliveros, with the left channel cross coupling back on itself, and the right channel feeding back to the left, with a four second delay.  The model is outlined in more detail in the article below:

[Tape Delay Techniques for Electronic Music Composers](https://www.scribd.com/document/256462168/Oliveros-Pauline-Tape-Delay-Techniques)
 
**Instructions for use:**
- You have two choices of sound source: 
	 1. The first being the built-in Waveform Generator, which holds a set of four oscillators, one side demonstarating Amplitude Modulation synthesis, the other side Frequency Modulation synthesis.  There is also an available white noise source with a filtering effect set to a sine wave.
	 2. The second being the user's own input, be it the hardware microphone, an audio/instrument interface, etc.  The browser works automatically with your computer's global audio settings, any changes to audio I/O are all made in said settings.
	 3. These two inputs can be used in tandem.
 
- The Tape Delay Feedback control sliders allow you to control the amplitude of each respective feedback element at play in the system (these mimic the line amplifiers used by Pauline in the original system); they control the depth of the cross coupled delay, and the depth of the right channel (from tape machine #2) back to tape machine #1.  __It is **HIGHLY ADVISED** that you be careful with these sliders!!!  This is a feedback environment, things can (and will) get loud very quickly if you are not careful!__  It is also advised that you consult the article mentioned above to gain a better picture of what the system is doing.

 *Things to be aware of:*
- The system is sensitive!  You are dealing with a lot of looped and delayed feedback!  If you find that the system has 'bottomed out' (ie. stopped making all sound, making unbelievably loud and continuous sound), it is likely because the feedback was overwhelming and it collapsed on itself.  To clear the system, simply lower the **Tape Delay Feedback Sliders** and it should be corrected.
- It is also suggested that you have a listen to music that utilize this type of system.  Pauline Oliveros' [Mnemonics I-V](https://youtu.be/QhOEY-mwIyg) and [I of IV](https://youtu.be/DpdwMcdBGwg) are great examples (as are several of her other works in this period).  You may also refer to pieces such as [Saxony by James Tenney](https://youtu.be/Ucqb9zGWNHc); and though it employs somewhat different techniques, [Poppy Nogood and the Phantom Band by Terry Riley](https://youtu.be/mgIT5xh1nJE) (the B-Side to *A Rainbow in Curved Air*).
- Lastly, it is suggested to let the system be itself.  Experimentation is key, but sometimes stepping away and letting things unfold is when magic can happen.  Remember, in feedback systems, not every action has an effect, and even the slightest action can have massive impacts.


**MIDI Instructions/Maps**
This instrument is MIDI compatabile via the Web MIDI API (currently only available in Chrome).  It is a plan to enable MIDI assignments, but it is currently not available.  If you would like to attach a MIDI controller, these are the following CC values if you would like to edit your controller accordingly.  (Pitch and note on/off are standard)

Values: 
- CC 2 - Input Volume (User Input)
- CC 3 - AM Harmonicity (blue label)
- CC 5 - FM Harmonicity (red label)
- CC 6 - Cutoff (Noise Source)
- CC 8 - Depth (Noise Source)
- CC 9 - Cross Coupling Depth (T-D Feedback)
- CC 12 - R to L Depth (T-D Feedback)
- CC 14 - AM Frequency (blue label)
- CC 15 - AM Fine Tune 
- CC 16 - FM Frequency (red label) 
- CC 17 - FM Depth
- CC 18 - Attack (not available)
- CC 19 - Decay (not available)
- CC 20 - Sustain (not available)
- CC 21 - Release (not available)
- CC 24 - AM Squ ---- Saw (blue label)
- CC 25 - AM ---- FM
- CC 26 - FM Squ ---- Saw (red label)
- CC 27 - OFF/ON (Noise Source)
- CC 33 - OFF/ON (User Input)


**Mobile Device Information**
This currently does not work (or at least well) with mobile devices.  The goal of this was to explore the use of Chromebooks as musical environments, however I am seeing to implement a mobile friendly version in the future.

