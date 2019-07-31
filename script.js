/*

TODO:
- import .midi
- process .midi to json
  - https://github.com/Tonejs/Midi
- process json to a chart

- process chart to notes.chart & song.ini
- convert .midi to .ogg

- export notes.chart,song.ini,song.ogg as .zip
  - https://stuk.github.io/jszip/

*/
if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  document.querySelector("#FileDrop #Text").textContent = "Reading files not supported by this browser";
}
else {
  const fileDrop = document.querySelector("#FileDrop")
  fileDrop.addEventListener("dragenter", () => fileDrop.classList.add("Hover"))
  fileDrop.addEventListener("dragleave", () => fileDrop.classList.remove("Hover"))
  fileDrop.addEventListener("drop", () => fileDrop.classList.remove("Hover"))
  document.querySelector("#FileDrop input").addEventListener("change", e => {
    //get the files
    const files = e.target.files
    if (files.length > 0){
      const file = files[0]
      document.querySelector("#FileDrop #Text").textContent = file.name
      parseFile(file)
    }
  })
}
var currentMidi = null;
var settings;
function parseFile(file){
  //read the file
  const reader = new FileReader()
  reader.onload = function(e){
    const midi = new Midi(e.target.result)
    currentMidi = midi
    console.log(currentMidi)
    loadHTMLcontent();
  }
  reader.readAsArrayBuffer(file)
}
var htmlContent=document.getElementById('htmlContent')
function toggleTrack(track){
  settings.tracks[track] = !settings.tracks[track];
}
function loadHTMLcontent(){
  htmlContent.innerHTML='';
  settings = {
    tracks:[]
  };
  for(var i=0;i<currentMidi.tracks.length;i++){
    settings.tracks[i]=true;
    htmlContent.innerHTML+='<input type="checkbox" checked="true" onClick="toggleTrack('+i+')"><label>track '+currentMidi.tracks[i].name+'<br>'+currentMidi.tracks[i].instrument.family+': '+currentMidi.tracks[i].instrument.name+'</label><br>';
  }
}

var colors;

function setup() {
  createCanvas(windowWidth/4, windowHeight);
  colors=[color(0,200,0),color(255,0,0),color(255,255,0),color(0,50,200),color(255,128,0)];
}

function drawNote(note,y,type){
  switch(type){
    case('hopo'):
      noStroke();
      strokeWeight(width/32);
      fill(colors[note]);
      ellipse(note*width/6+width/6,y,width/8,width/8);
      stroke(255,150);
      fill(255);
      ellipse(note*width/6+width/6,y,width/16,width/16);
      break;
    case('tap'):
      noStroke();
      strokeWeight(width/32);
      fill(colors[note]);
      ellipse(note*width/6+width/6,y,width/8,width/8);
      fill(0,150);
      noStroke();
      arc(note*width/6+width/6,y,width/8,width/8,Math.PI/6,Math.PI*5/6);
      arc(note*width/6+width/6,y,width/8,width/8,Math.PI*7/6,Math.PI*11/6);
     fill(0,200);
      ellipse(note*width/6+width/6,y,width/12,width/12);
      break;
    default:
      noStroke();
      fill(colors[note]);
      ellipse(note*width/6+width/6,y,width/8,width/8);
      strokeWeight(width/128);
      stroke(0);
      fill(255,150);
      ellipse(note*width/6+width/6,y,width/14,width/14);
  }
}

var preview={
  scale:4000,
  time:0,
  speed:50
};

function findNotes(track,from,to){
  var interval=Math.ceil(track.notes.length/4);
  var at=interval*2;
  var pls=2;
  while(interval>=1&&pls&&track.notes[at].ticks!=from){
    if(interval == 1){pls--;}
    if(track.notes[at].ticks>=from){
      at-=interval;
      if(at<0){at=0;}
    }
    else{
      at+=interval;
      if(at>track.notes.length-1){at=track.notes.length-1;}
    }
    interval=Math.ceil(interval/2);
  }
  var bottom=at;
  while(bottom>0&&track.notes[bottom-1].ticks>=from){
    bottom--;
  }
  return bottom;
};

function draw() {
  background(0);
  stroke(200);
  strokeWeight(2);
  for(var i=0;i<5;i++){
    line(i*width/6+width/6,0,i*width/6+width/6,height);
  }
  if(!currentMidi){
    return;
  }
  preview.time+=preview.speed;
  if(preview.time>currentMidi.durationTicks){
    preview.time=0;
  }
  var last=preview.time;
  var lastNote=[];
  for(var i=0;i<currentMidi.tracks.length;i++){
    if(settings.tracks[i]){
      var note=findNotes(currentMidi.tracks[i],last,last+preview.scale);
  while(note<currentMidi.tracks[i].notes.length-1&&currentMidi.tracks[i].notes[note].ticks<=last+preview.scale){
        if(!lastNote[i]||note>lastNote[i]){
          drawNote(currentMidi.tracks[i].notes[note].midi%5,height-(currentMidi.tracks[i].notes[note].ticks-preview.time)/preview.scale*height);
          lastNote[i]=note;
        }
        note++;
      }
   }
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth/4, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};
