# .midi to Clone Hero
.midi to [Clone Hero](https://clonehero.net/) converter

link: https://efhiii.github.io/midi-ch/drums/

If you have questions, feel free to ask me on Discord: https://discord.gg/jepY2DkJkZ

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
## Max BPS
Any note that's is more than the maximum Beats per second threshold relative to the previous note gets ignored and isn't charted.

## Scale
How many seconds can be seen in the preview on the right.

## Leading Silence
Number of seconds of silence at the start of the chart.

Must also be applied to the audio file in order to sync properly, this does not generate an audio file. Any DAW *should* work, although some might create inacurate tempo-maps. FL Studio is a good choice.

## Percussion Selectors
Each percussion piece used in the Midi will get it's own selector. By default, some of them will already be assigned to one of the 7 pads or 2 peddals which are colored accordingly. You can change these and assign the other percussion pieces using the checkboxes. The rightmost two checkboxes are accent each (WIP) & log each respectively. Loging each will put in a custom event each time that percusion piece is played, which can be useful when manually editing a chart. Deleting notes will remove them from their instrument, not just the chart and will persist after reloading the chart.

## Song Playback
Plays the notes that the chart is showing

## Chart Preview Map
All the notes of the chart are displayed in miniature on the left of the chart preview with a white line showing where you currently are in the chart.

## Chart Scrubbing
Click (or drag) anywhere in the chart preview to jump to that part of the song shown in the chart preview map

## Kit Visual Aid
Bellow the check for each kit on the left, there's a preview of that kit's notes throughout the song, x-axis is time, y-axis is midi ID. The red line represents where the chart playback is.

## Custom Events
Each time the percussion instrument used on a pad/peddal changes, there will be a custom event with the name of the new instrument on the side. This can help in knowing what parts of the chart might need attention, for example, spots where you need to re-chart a roll or cymbal hits.
