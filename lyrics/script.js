if(!(window.File && window.FileReader && window.FileList && window.Blob)) {
  document.querySelector("#FileDrop #Text").textContent = "Reading files not supported by this browser";
} else {
  const fileDrop = document.querySelector("#FileDrop")
  fileDrop.addEventListener("dragenter", () => fileDrop.classList.add("Hover"))
  fileDrop.addEventListener("dragleave", () => fileDrop.classList.remove("Hover"))
  fileDrop.addEventListener("drop", () => fileDrop.classList.remove("Hover"))
  document.querySelector("#FileDrop input").addEventListener("change", e => {
    //get the files
    const files = e.target.files
    if(files.length > 0) {
      const file = files[0]
      document.querySelector("#FileDrop #Text").textContent = file.name
      parseFile(file)
    }
  })
}

let currentDoc;

function parseFile(file) {
  //read the file
  const reader = new FileReader()
  reader.onload = function(e) {
    parser = new DOMParser();
    currentDoc = parser.parseFromString(e.target.result, "text/xml");
    extractLyrics();
  }
  reader.readAsText(file);
}

let resolution = 480;
let leadingMeasures = 1;

function extractLyrics() {
  if(!currentDoc) {
    document.getElementById('ans').value = `Provide a MusicXML file above`;
    return;
  }
  doc = currentDoc;

  let parts = doc.getElementsByTagName('part');

  let code = [];
  let needsStart = true;

  for(let part of parts) {
    let measures = part.getElementsByTagName('measure');
    let at = 0;

    let timeSignature = [4, 4];
    let beatsPerMeasure = 4;

    lastStart = 0;

    for(let measure of measures) {
      let times = measure.getElementsByTagName('time');
      for(let time of times) {
        let beats = measure.getElementsByTagName('beats');
        for(let beat of beats) {
          timeSignature[0] = parseFloat(beat.innerHTML);
          beatsPerMeasure = timeSignature[0] * (4 / timeSignature[1]);
        }
        let beatTypes = measure.getElementsByTagName('beat-type');
        for(let beatType of beatTypes) {
          timeSignature[1] = parseFloat(beatType.innerHTML);
          beatsPerMeasure = timeSignature[0] * (4 / timeSignature[1]);
        }
      }

      let fr = at;
      let notes = measure.getElementsByTagName('note');

      let measureTotal = 0;
      for(let note of notes) {
        let dur = note.getElementsByTagName('duration');
        if(dur.length > 0 && note.getElementsByTagName('chord').length === 0) {
          measureTotal += parseFloat(dur[0].innerHTML);
        }
      }

      for(let note of notes) {
        let lyrics = note.getElementsByTagName('lyric');
        let txt = '';
        let syllabic = false;
        let space = 0;
        let endLine = false;
        lyricsLoop:
        for(let lyric of lyrics) {
          if(lyric.hasAttribute('number') && lyric.attributes.number.value !== '1'){
            continue lyricsLoop;
          }
          let children = lyric.children;
          for(let child of children) {
            switch (child.tagName) {
              case 'syllabic':
                switch (child.innerHTML) {
                  case 'begin':
                  case 'middle':
                    syllabic = true;
                    break;
                  case 'single':
                  case 'end':
                    syllabic = false;
                    space = 1;
                    break;
                }
                break;
              case 'text':
                if(space === 2) {
                  txt += ' ';
                  space = 0;
                }
                txt += child.innerHTML.replace(/\-/g, '=');
                break;
              case 'elision':
                syllabic = false;
                if(space === 1) {
                  space = 2;
                }
                break;
            }
          }
        }

        if(txt.length > 0) {
          if(syllabic) {
            txt += '-';
          }
          let lastLyric = code[code.length - 1];
          if(!needsStart && at-lastStart > 2 && (
              at - lastLyric[0] > 2 ||
              txt[0].match(/[A-Z]/) ||
              (
                code.length > 1 &&
                (
                  at - lastLyric[0] >= 4 ||
                  (lastLyric[2] && lastLyric[2].length > 0 && (
                    lastLyric[2][lastLyric[2].length - 1] === ',' ||
                    lastLyric[2][lastLyric[2].length - 1] === '.' ||
                    lastLyric[2][lastLyric[2].length - 1] === ':' ||
                    lastLyric[2][lastLyric[2].length - 1] === ';' ||
                    lastLyric[2][lastLyric[2].length - 1] === '!' ||
                    lastLyric[2][lastLyric[2].length - 1] === '?' ||
                    lastLyric[2][lastLyric[2].length - 1] === '‽'
                  ))
                )
              )
            )) {
            lastLyric[2] = lastLyric[2].slice(0, lastLyric[2].length - 1) + lastLyric[2][lastLyric[2].length - 1].replace(/\,/, '');
            needsStart = true;
            code.push([lastLyric[0] + 0.001, 'phrase_end']);
          }
          if(needsStart) {
            lastStart = at;
            code.push([at - 0.001, 'phrase_start']);
            needsStart = false;
            txt = txt[0].toUpperCase() + txt.slice(1);
          }
          code.push([at, 'lyric', txt.replace(/\n.*/,'')]);
        }

        let dur = note.getElementsByTagName('duration');
        if(dur.length > 0 && note.getElementsByTagName('chord').length === 0) {
          at += parseFloat(dur[0].innerHTML) / measureTotal * beatsPerMeasure;
        }
      }
    }
  }

  code.sort((a, b) => {
    return a[0] - b[0];
  });
  code.push([code[code.length-1][0] + 0.001, 'phrase_end']);

  let ans = '';

  lastThing = 0;

  for(i = 0; i < code.length; i++) {
    let c = code[i];
    let at = c[0];
    if(c[1] === 'phrase_start') {
      if(at - 0.5 > lastThing) {
        at -= 0.5;
      } else if(at - 0.25 > lastThing) {
        at -= 0.25;
      } else if(at - 0.125 > lastThing) {
        at -= 0.125;
      } else if(at - 1/24 > lastThing) {
        at -= 1/24;
      } else if(at - 1/48 > lastThing) {
        at -= 1/48;
      } else {
        at = (at + lastThing) / 2;
      }
    }
    if(c[1] === 'phrase_end') {
      if(i === code.length - 1) {
        at += 4;
      } else {
        let nextThing = code[i + 1][0];
        if(at + 6 < nextThing) {
          at += 4;
        } else if(at + 3 < nextThing) {
          at += 2;
        } else if(at + 2 < nextThing) {
          at += 1;
        } else if(at + 1 < nextThing) {
          at += 0.5;
        } else if(at + 0.5 < nextThing) {
          at += 0.25;
        } else if(at + 0.25 < nextThing) {
          at += 0.125;
        } else if(at + 1/12 < nextThing) {
          at += 1/24;
        } else if(at + 1/24 < nextThing) {
          at += 1/48;
        } else {
          at += (nextThing - at) / 3;
        }
      }
    }
    lastThing = at;
    ans += `  ${Math.round((at + 4 * leadingMeasures) * resolution)} = E "${c[1]}${c[2]?' '+c[2]:''}"\n`;
  }

  if(ans.length === 0) {
    if(doc.children[0].innerHTML.indexOf('parsererror') > 0) {
      ans = `Failed to read file, try changing the file extension to .zip, extracting and using the .xml file found in the extracted folder.`;
    } else {
      ans = `That file appears to contain no lyrics information.`;
    }
  }

  document.getElementById('ans').value = ans;
}

function copyToClipboard() {
  let text = document.getElementById('ans').value;
  if(window.clipboardData && window.clipboardData.setData) {
    // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData("Text", text);

  } else if(document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in Microsoft Edge.
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy"); // Security exception may be thrown by some browsers.
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return prompt("Copy to clipboard: Ctrl+C, Enter", text);
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

let resHTML = document.getElementById('res');
resHTML.addEventListener('change', _ => {
  resolution = resHTML.value;
  extractLyrics();
});

let silHTML = document.getElementById('sil');
silHTML.addEventListener('change', _ => {
  leadingMeasures = silHTML.value;
  extractLyrics();
});
