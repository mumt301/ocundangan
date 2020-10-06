

let table_data = [
    {
        'filename': 'Time',
        'algo': 'MP3',
        'bitrate': '96kbps',
        'oSize': '10501',
        'cSize': '716',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_96.mp3',
        'rAudio': 'aud/time_mp3_96.wav',
    },
    {
        'filename': 'Time',
        'algo': 'MP3',
        'bitrate': '144kbps',
        'oSize': '10501',
        'cSize': '1074',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_144',
        'rAudio': 'aud/time_mp3_144.wav',
    },
    {
        'filename': 'Time',
        'algo': 'MP3',
        'bitrate': '192kbps',
        'oSize': '10501',
        'cSize': '1431',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_192.mp3',
        'rAudio': 'aud/time_mp3_192.wav',
    },
    {
        'filename': 'Time',
        'algo': 'MP3',
        'bitrate': '320kbps',
        'oSize': '10501',
        'cSize': '2385',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_320.mp3',
        'rAudio': 'aud/time_mp3_320.wav',
    },
    {
        'filename': 'Time',
        'algo': 'AC3',
        'bitrate': '32/640',
        'oSize': '10501',
        'cSize': '239',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_32.ac3',
        'rAudio': 'aud/time_ac3_32.wav',
    },
    {
        'filename': 'Time',
        'algo': 'AC3',
        'bitrate': '96/640',
        'oSize': '10501',
        'cSize': '715',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_96.ac3',
        'rAudio': 'aud/time_ac3_96.wav',
    },
    {
        'filename': 'Time',
        'algo': 'AC3',
        'bitrate': '256/640',
        'oSize': '10501',
        'cSize': '1905',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_256.ac3',
        'rAudio': 'aud/time_ac3_256.wav',
    },
    {
        'filename': 'Time',
        'algo': 'AC3',
        'bitrate': '640/640',
        'oSize': '10501',
        'cSize': '4762',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_640.ac3',
        'rAudio': 'aud/time_ac3_640.wav',
    },
    {
        'filename': 'Time',
        'algo': 'M4A',
        'bitrate': '10/500',
        'oSize': '10501',
        'cSize': '1469',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_10.m4a',
        'rAudio': 'aud/time_m4a_10.wav',
    },
    {
        'filename': 'Time',
        'algo': 'M4A',
        'bitrate': '150/500',
        'oSize': '10501',
        'cSize': '1469',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_150.m4a',
        'rAudio': 'aud/time_m4a_150.wav',
    },
    {
        'filename': 'Time',
        'algo': 'M4A',
        'bitrate': '350/500',
        'oSize': '10501',
        'cSize': '1469',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_350.m4a',
        'rAudio': 'aud/time_m4a_350.wav',
    },
    {
        'filename': 'Time',
        'algo': 'M4A',
        'bitrate': '500/500',
        'oSize': '10501',
        'cSize': '1469',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_500.m4a',
        'rAudio': 'aud/time_m4a_500.wav',
    },
    {
        'filename': 'Time',
        'algo': 'OGG',
        'bitrate': '0/10',
        'oSize': '10501',
        'cSize': '414',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_0.ogg',
        'rAudio': 'aud/time_ogg_0.wav',
    },
    {
        'filename': 'Time',
        'algo': 'OGG',
        'bitrate': '3/10',
        'oSize': '10501',
        'cSize': '772',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_3.ogg',
        'rAudio': 'aud/time_ogg_3.wav',
    },
    {
        'filename': 'Time',
        'algo': 'OGG',
        'bitrate': '6/10',
        'oSize': '10501',
        'cSize': '1287',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_6.ogg',
        'rAudio': 'aud/time_ogg_6.wav',
    },
    {
        'filename': 'Time',
        'algo': 'OGG',
        'bitrate': '10/10',
        'oSize': '10501',
        'cSize': '3153',
        'cRatio': '5',
        'oAudio': 'aud/time_orig.wav',
        'cAudio': 'aud/time_10.ogg',
        'rAudio': 'aud/time_ogg_10.wav',
    },
]

function discography(){
    let table = document.createElement('table');
    table.id = 'compTable'
    thead = document.createElement('thead');
    tr = document.createElement('tr');

    headers = ['Song', 'Compression algorithm', 'Quality/Bit-rate', 'Original size', 'Compressed size',
        'Compression ratio', 'Original audio', 'Compressed audio', 'Residual audio'];

    headers.forEach((val, index) => {
        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = "<th scope='col'>" + val + "</th>";
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    tbody = document.createElement('tbody');
    for (row = 0; row < table_data.length; row++) {
        tr = document.createElement('tr');
        let columns = Object.keys(table_data[row]);
        for (col = 0; col < Object.keys(table_data[row]).length; col++) {
          td = document.createElement('td');
          tr.appendChild(td);
            if (col == 5){
                oSize = parseFloat(table_data[row][columns[col-2]]);
                cSize = parseFloat(table_data[row][columns[col-1]]);
                cRatio = (cSize/oSize).toFixed(4);
                td.innerHTML = cRatio;
            }
            else if (col >= 6){
                td.innerHTML = "<a href=" + table_data[row][columns[col]] +">Link</a>"
            }
            else{
                td.innerHTML = table_data[row][columns[col]];
            }
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      document.getElementById("discography_table").appendChild(table);

}

window.onload = function foo(){
    discography();
}