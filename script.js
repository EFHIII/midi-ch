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


  after another note:
  tick = N 5 0 //hopo
  tick = N 6 0 //tap

  independent:
  tick = N 7 0 //open
*/
{
var albumpng='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';
}
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
var htmlContent=document.getElementById('htmlContent');
var unChartedNotes=[];
var chartedNotes=[];
var measureShift=true;
var stripSustain=0;
var patternLength=0;
var openNotes=1;
var quality=[0,0,0];

function toggleTrack(track){
  settings.tracks[track] = !settings.tracks[track];
}
function toggleMeasureShift(){
  measureShift = !measureShift;
}

function loadSettings(){
  openNotes = document.getElementById("openNotes").checked?1:0;
  patternLength = document.getElementById("patternLength").value;
  var old_element = document.getElementById("blob");
  var new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);

  //sync track events
  var syncTrackString='';
  var syncEvents=[];
  for(var i=0;i<currentMidi.header.timeSignatures.length;i++){
    syncEvents.push([currentMidi.header.timeSignatures[i].ticks,'  '+currentMidi.header.timeSignatures[i].ticks+' = TS '+(currentMidi.header.timeSignatures[i].timeSignature[0]*4/currentMidi.header.timeSignatures[i].timeSignature[1])+'\n']);
  }
  for(var i=0;i<currentMidi.header.tempos.length;i++){
    syncEvents.push([currentMidi.header.tempos[i].ticks,'  '+currentMidi.header.tempos[i].ticks+' = B '+(currentMidi.header.tempos[i].bpm*1000>>0)+'\n']);
  }
  //sort in cronological order
  syncEvents.sort((a,b)=>a[0]-b[0]);
  //add all to string
  for(var i=0;i<syncEvents.length;i++){
    syncTrackString+=syncEvents[i][1];
  }

  var distinctNotes=[];
  var songLength=0;
  for(var i=0;i<currentMidi.tracks.length;i++){
    if(settings.tracks[i]){
      for(var note=0;note<currentMidi.tracks[i].notes.length;note++){
        if(distinctNotes.indexOf(currentMidi.tracks[i].notes[note].midi)<0){
          distinctNotes.push(currentMidi.tracks[i].notes[note].midi);
        }
        if(currentMidi.tracks[i].notes[note].ticks>songLength){
          songLength=currentMidi.tracks[i].notes[note].ticks;
        }
      }
    }
  }
  distinctNotes.sort();

  unChartedNotes=[];

  var notesString='';
  for(var i=0;i<currentMidi.tracks.length;i++){
    if(settings.tracks[i]){
      for(var note=0;note<currentMidi.tracks[i].notes.length;note++){
        unChartedNotes.push([currentMidi.tracks[i].notes[note].ticks,distinctNotes.indexOf(currentMidi.tracks[i].notes[note].midi),currentMidi.tracks[i].notes[note].durationTicks<preview.ppq?0:max(0,currentMidi.tracks[i].notes[note].durationTicks-stripSustain)]);
        if(currentMidi.tracks[i].notes[note].ticks>songLength){
          songLength=currentMidi.tracks[i].notes[note].ticks;
        }
      }
    }
  }

  unChartedNotes.sort((a,b)=>a[0]-b[0]);
  chartedNotes=[];

  var measure=[];
  var onMeasure=-1;
  var shiftMeasure=0;
  quality=[0,0,0,0];
  for(var i=0;i<unChartedNotes.length;i++){
    if(measureShift){
      if(i>0&&unChartedNotes[i-1][1]===unChartedNotes[i][1]){
        chartedNotes[i]=chartedNotes[i-1];
      }
      else{
        if((unChartedNotes[i][0]/(preview.ppq*patternLength))>>0!=onMeasure){
          var lastMeasure=measure.slice();
          measure=[];
          onMeasure=(unChartedNotes[i][0]/(preview.ppq*patternLength))>>0;
          var j=0;
          while(i+j<unChartedNotes.length&&(unChartedNotes[i+j][0]/(preview.ppq*patternLength))>>0==onMeasure){
            if(measure.indexOf(unChartedNotes[i+j][1])<0){
              measure.push(unChartedNotes[i+j][1]);
            }
            j++;
          }
          measure.sort((a,b)=>a-b);
          console.log(measure);
          if(measure.length<5+openNotes&&onMeasure>0){
            if(lastMeasure[0]<measure[0]){
              shiftMeasure++;
              if(measure.length<4+openNotes&&lastMeasure[1]<measure[0]){
                shiftMeasure++;
              }
            }
            else if(lastMeasure[min(lastMeasure.length-1,measure.length-1)]>measure[min(lastMeasure.length-1,measure.length-1)]){
              shiftMeasure--;
              if(measure.length<4+openNotes&&lastMeasure[min(lastMeasure.length-1,measure.length-1)]>measure[min(lastMeasure.length-1,measure.length-1)]){
                shiftMeasure--;
              }
            }
          }
          else{
            shiftMeasure=0;
          }
          while(shiftMeasure+measure.length>4+openNotes){
            shiftMeasure--;
          }
          if(shiftMeasure<0){
            shiftMeasure=0;
          }
          quality[0]++;
          if(measure.length>5+openNotes){
            quality[1]++;
          }
          else if (measure.length<3) {
            quality[2]++;
          }
          else {
            quality[3]++;
          }
          console.log('shift: '+shiftMeasure);
        }
        if(!openNotes||((i==0||unChartedNotes[i-1][0]<unChartedNotes[i][0])&&(i+1>=unChartedNotes.length||unChartedNotes[i+1][0]>unChartedNotes[i][0]))){
          chartedNotes[i]=(measure.indexOf(unChartedNotes[i][1])+shiftMeasure)%(5+openNotes);
        }
        else{
          chartedNotes[i]=-1;
        }
      }
    }
    else{
      chartedNotes[i]=unChartedNotes[i][1]%(5+openNotes);
    }
  }

  for(var i=0;i<chartedNotes.length;i++){
    if(chartedNotes[i]>=0){
      notesString+='  '+unChartedNotes[i][0]+' = N '+(openNotes && chartedNotes[i] - openNotes === -1 ? 7 : chartedNotes[i] - openNotes )+' '+unChartedNotes[i][2]+'\n';
    }
  }

  var zip = new JSZip();
  zip.file("album.png", albumpng, {base64: true});
  zip.file("song.ini", `[Song]
name = `+currentMidi.name+`
artist = `+(currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="artist").length?currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="artist")[0].text:'Unknown')+`
album = `+(currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="album").length?currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="album")[0].text:'Unknown')+`
genre = `+(currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="genre").length?currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="genre")[0].text:'rock')+`
year = `+(currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="year").length?currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="year")[0].text:'Unknown')+`
song_length = `+songLength+`
count = 0
diff_band = -1
diff_guitar = -1
diff_bass = -1
diff_drums = -1
diff_keys = -1
diff_guitarghl = -1
diff_bassghl = -1
preview_start_time = 0
frets = 0
charter = Edward Haas
icon = efhiii

`);
  zip.file("notes.chart", `[Song]
{
  Name = "`+currentMidi.name+`"
  Charter = "Edward Haas"
  Year = "`+(currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="year").length?currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="year")[0].text:'Unknown')+`"
  Offset = 0
  Resolution = `+preview.ppq+`
  Player2 = bass
  Difficulty = 4
  PreviewStart = 0
  PreviewEnd = 0
  Genre = "`+(currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="genre").length?currentMidi.header.meta.filter(e=>e.type.toLowerCase()==="genre")[0].text:'rock')+`"
  MediaType = "cd"
  MusicStream = "song.mp3"
}
[SyncTrack]
{
`+syncTrackString+`}
[ExpertSingle]
{
`+notesString+`}
`);

  document.getElementById("blob").addEventListener("click", function () {
      zip.generateAsync({type:"blob"}).then(function (blob) { // 1) generate the zip file
          saveAs(blob, currentMidi.name+".zip");                          // 2) trigger the download
      }, function (err) {
          jQuery("#blob").text(err);
      });
  });
}

function loadHTMLcontent(){
  measureShift=true;
  htmlContent.innerHTML=
  `<button id="blob" class="btn btn-primary">click to download</button><br>
  <button class="btn btn-primary" onclick="loadSettings()">Load New Settings</button><br>
    <div>
      <input type="number" value=8 class="input" id="patternLength">
      <label for="patternLength"><span  data-toggle="tooltip" title="within the specified unit range, (if Shift notes enabled) it will try and keep the note pattern preserved, and every period it will shift to try and recenter so as to avoid wrapping too much.">Pattern Length (in quarter notes)</span></label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" checked="true" class="custom-control-input" id="openNotes">
      <label class="custom-control-label" for="openNotes"><span  data-toggle="tooltip" title="When enabled, include open notes">Open notes</span></label>
    </div>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" checked="true" class="custom-control-input" onClick="toggleMeasureShift()" id="measureToggle">
      <label class="custom-control-label" for="measureToggle"><span  data-toggle="tooltip" title="When enabled, the program will try and keep the the patterns within the 5 lanes rather than wraping">Shift notes</span></label>
    </div>`;
  settings = {
    tracks:[]
  };
  for(var i=0;i<currentMidi.tracks.length;i++){
    settings.tracks[i]=true;
    htmlContent.innerHTML+=`<div class="custom-control custom-checkbox">
      <input type="checkbox" checked="true" class="custom-control-input" onClick="toggleTrack(`+i+`)" id='customCheck`+i+`'>
      <label class="custom-control-label" for="customCheck`+i+`">`+currentMidi.tracks[i].name+' - '+currentMidi.tracks[i].instrument.family+': '+currentMidi.tracks[i].instrument.name+`</label>
    </div>`;
    //htmlContent.innerHTML+='<input type="checkbox" checked="true" onClick="toggleTrack('+i+')"><label>track '+currentMidi.tracks[i].name+'<br>'+currentMidi.tracks[i].instrument.family+': '+currentMidi.tracks[i].instrument.name+'</label><br>';
  }

  preview.ppq=currentMidi.header.ppq;
  preview.speed=((4/60)*currentMidi.header.ppq)>>0;
  stripSustain=preview.ppq/4;

  loadSettings();
}

var colors;

function setup() {
  createCanvas(windowWidth/4, windowHeight);
  colors=[color(0,200,0),color(255,0,0),color(255,255,0),color(0,50,200),color(255,128,0)];
}

function drawNote(note,y,type,duration){
  noStroke();
  if(openNotes && note === -1){
    fill(150,0,200,200);
    rect(0,y-duration-4,width,duration+8);
    return;
  }
  else if (note<0) {
    return;
  }

  //console.log('note- '+note);

  colors[note].setAlpha(150);
  fill(colors[note]);
  if(duration){
    rect(note*width/6+width/6-width/40,y-duration,width/20,duration,width/40);
  }
  colors[note].setAlpha(255);
  fill(colors[note]);
  switch(type){
    case('hopo'):
      strokeWeight(width/32);
      ellipse(note*width/6+width/6,y,width/8,width/8);
      stroke(255,150);
      fill(255);
      ellipse(note*width/6+width/6,y,width/16,width/16);
      break;
    case('tap'):
      strokeWeight(width/32);
      ellipse(note*width/6+width/6,y,width/8,width/8);
      fill(0,150);
      noStroke();
      arc(note*width/6+width/6,y,width/8,width/8,Math.PI/6,Math.PI*5/6);
      arc(note*width/6+width/6,y,width/8,width/8,Math.PI*7/6,Math.PI*11/6);
     fill(0,200);
      ellipse(note*width/6+width/6,y,width/12,width/12);
      break;
    default:
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
  speed:30,
  ppq:100
};

function findNotes(from,to){
  var interval=Math.ceil(chartedNotes.length/4);
  var at=interval*2;
  var pls=2;
  while(interval>=1&&pls&&unChartedNotes[at][0]!=from){
    if(interval == 1){pls--;}
    if(unChartedNotes[at][0]>=from){
      at-=interval;
      if(at<0){at=0;}
    }
    else{
      at+=interval;
      if(at>chartedNotes.length-1){at=chartedNotes.length-1;}
    }
    interval=Math.ceil(interval/2);
  }
  var bottom=at-10;
  while(bottom>0&&unChartedNotes[bottom-1][0]>=from){
    bottom--;
  }
  return bottom;
};

var lastFrameTime=Date.now();
var currentFrameTime=Date.now();

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
  lastFrameTime=currentFrameTime;
  currentFrameTime=Date.now();
  preview.time+=preview.speed*((currentFrameTime-lastFrameTime)/(1000/30));
  if(preview.time>currentMidi.durationTicks){
    preview.time=0;
  }
  var last=preview.time;

  var Y=height+last*(height/preview.scale);
  strokeWeight(2);
  stroke(255);//   7/12
  var notesPerMeasuer=currentMidi.header.timeSignatures[0].timeSignature[0];
  var ticksPerNote=preview.ppq*currentMidi.header.tempos[0].bpm*currentMidi.header.timeSignatures[0].timeSignature[0]/currentMidi.header.timeSignatures[0].timeSignature[1];
  var tempo=0;
  var timeSignature=0;
  var t=0;
  while(Y>0){
    //while(tempo<currentMidi.header.tempos.length-1&&)
    Y-=preview.ppq*(height/preview.scale);
    if(t%4===0){
      strokeWeight(2);
    }
    else{
      strokeWeight(0.5);
    }
    t++;
    if(Y<height){
      line(0,Y,width,Y);
    }
  }

  var lastNote=0;

  var note=findNotes(last,last+preview.scale);
  if(note<0){note=0;}
  while(note<chartedNotes.length&&unChartedNotes[i][0]<=last+preview.scale){
    if(!lastNote[i]||note>lastNote[i]){
      drawNote(chartedNotes[note]-openNotes,height-(unChartedNotes[note][0]-preview.time)/preview.scale*height,'',unChartedNotes[note][2]/preview.scale*height);
      lastNote[i]=note;
    }
    note++;
  }

  if(quality[0]){
    noStroke();
    fill(255,0,0);
    rect(0,0,width,10);
    fill(0,200,0);
    rect(0,0,width*quality[3]/quality[0],10);
    fill(255,255,0);
    rect(width*quality[3]/quality[0],0,width*quality[2]/quality[0],10);
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
