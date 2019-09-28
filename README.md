# .midi to Clone Hero
.midi to [Clone Hero](https://clonehero.net/) converter

link: https://efhiii.github.io/midi-ch/

# Keyboard shortcuts
- SPACE
  - Pause/Resume
- UP-ARROW
  - Step forward
- DOWN-ARROW
  - Step back
- \+
  - Increase step size ( * 1.2 )
- \-
  - Decrease step size ( / 1.2 )
- hold D
  - Delete the note the bottom fret represents that passes the middle red line
- hold BACKSPACE
  - Delete the note the top fret represents that passes the middle red line
- hold DELETE
  - Delete all notes that passes the middle red line
- Z
  - Undo last note deletion
- Y
  - Redo last note deletion
- L
  - Load changes (necessary for making note deletions affect the chart properly, but slow so, especially on longer charts, avoid using frequently)
- S
  - Save (export to chart)

# Other features
## Open Notes
When on, the chart will treat open notes as a 6th fret, bellow green. (I recommended not using this and instead add open notes in Moon Scraper or EoF after exporting.)

## Max Simultaneous Notes
This is the maximum number of notes that the chart will include as a chord. It's worth noting that if a sustain goes past the next note, it's still possible to go above this limit.

## Scale
How many seconds can be seen in the preview on the right.

## Skip Open Notes Limit
When Open Notes is on, strips 1/this beats from open notes

## Strip Sustain
When Open Notes is on, strips this% beats from sustain notes. (recommended: set 0 and strip sustains in MoonScraper or EoF)

## Leading Silence
Number of seconds of silence at the start of the chart.

Must also be applied to the audio file in order to sync properly, this does not generate an audio file. https://solmire.com/midi-to-mp3 is a good midi to mp3 converter.

## Instrument toggles
When an instrument is toggled on, (after loading new settings) the chart will incorporate that instrument. Having multiple instruments on will have the chart use all toggled instruments with a preference for higher notes. Deleting notes will remove them from their instrument, not just the chart and will persist after reloading the chart.

## Song playback
Only plays the notes that the chart is showing

## Chart preview map
All the notes of the chart are displayed in miniature on the left of the chat preview with a white line showing where you currently are in the chart.

## Chart scrubbing
Click (or drag) anywhere in the chart preview to jump to that part of the song shown in the chart preview map

## Pitch visual aid
White line that follows the fret it represents, further left being low notes, right being high notes in the range of the 88 keys of a keyboard.

## Instrument visual aid
Bellow the check for each instrument on the left, there's a preview of that instruments' notes throughout the song, x-axis is time, y-axis is pitch. The red line represents where the chart playback is.

Each instrument that is checked, upon loading the settings, that instrument will be applied to the chart (provided it doesn't exceed the max simultaneous notes threshold)
