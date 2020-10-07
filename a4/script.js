
table_data2 = [
    {
        'title' : 'Time',
        'algo' : 'OGG',
        'quality' : [0, 3, 6, 10],
        'quality_suffix' : ' / 10',
        'oSize' : 10501,
        'cSize' : [ 414, 772, 1287, 3153 ],
        'filename_prefix' : 'time'
    },
    {
        'title' : 'Time',
        'algo' : 'MP3',
        'quality' : [96, 144, 192, 320],
        'quality_suffix' : ' kbps',
        'oSize' : 10501,
        'cSize' : [ 716, 1074, 1431, 2385 ],
        'filename_prefix' : 'time'
    },
    {
        'title' : 'Time',
        'algo' : 'M4A',
        'quality' : [10, 150, 350, 500],
        'quality_suffix' : ' / 500',
        'oSize' : 10501,
        'cSize' : [ 1469, 1469, 1469, 1469 ],
        'filename_prefix' : 'time'
    },
    {
        'title' : 'Time',
        'algo' : 'AC3',
        'quality' : [32, 96, 256, 640],
        'quality_suffix' : ' / 640',
        'oSize' : 10501,
        'cSize' : [ 239, 715, 1905, 4762 ],
        'filename_prefix' : 'time'
    },
    {
        'title' : 'Hot Pursuit',
        'algo' : 'OGG',
        'quality' : [0, 3, 6, 10],
        'quality_suffix' : ' / 10',
        'oSize' : 10501,
        'cSize' : [ 470, 838, 1448, 3608],
        'filename_prefix' : 'hp'
    },
    {
        'title' : 'Hot Pursuit',
        'algo' : 'MP3',
        'quality' : [96, 144, 192, 320],
        'quality_suffix' : ' kbps',
        'oSize' : 10501,
        'cSize' : [ 705, 1056, 1408, 2346 ],
        'filename_prefix' : 'hp'
    },
    {
        'title' : 'Hot Pursuit',
        'algo' : 'M4A',
        'quality' : [10, 150, 350, 500],
        'quality_suffix' : ' / 500',
        'oSize' : 10501,
        'cSize' : [ 1446, 1446, 1446, 1446 ],
        'filename_prefix' : 'hp'
    },
    {
        'title' : 'Hot Pursuit',
        'algo' : 'AC3',
        'quality' : [32, 96, 256, 640],
        'quality_suffix' : ' / 640',
        'oSize' : 10501,
        'cSize' : [ 235, 704, 1876, 4689 ],
        'filename_prefix' : 'hp'
    },
]

function discography(){
    let table = document.createElement('table');
    table.id = 'compTable'
    thead = document.createElement('thead');
    tr = document.createElement('tr');

    headers = ['Song', 'Algorithm', 'Quality/Bit-rate', 'Original size', 'Compressed size',
        'Compression ratio', 'Original audio', 'Compressed audio', 'Residual audio'];

    headers.forEach((val, index) => {
        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = "<th scope='col'>" + val + "</th>";
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    tbody = document.createElement('tbody');
    for (i = 0; i < table_data2.length; i++) {
        for (j = 0; j < table_data2[i]['quality'].length; j++){
            tr = document.createElement('tr');

            // Title
            td = document.createElement('td');
            td.innerHTML = table_data2[i]['title'];
            tr.appendChild(td);

            // Algorithm
            td = document.createElement('td');
            td.innerHTML = table_data2[i]['algo'];
            tr.appendChild(td);

            // Bit-rate/quality
            td = document.createElement('td');
            td.innerHTML = table_data2[i]['quality'][j] + table_data2[i]['quality_suffix'];
            tr.appendChild(td);

            // Original size
            td = document.createElement('td');
            td.innerHTML = table_data2[i]['oSize'];
            tr.appendChild(td);

            // Compressed size
            td = document.createElement('td');
            td.innerHTML = table_data2[i]['cSize'][j];
            tr.appendChild(td);

            // Compression ratio
            td = document.createElement('td');
            td.innerHTML = (table_data2[i]['cSize'][j] / table_data2[i]['oSize']).toFixed(4);
            tr.appendChild(td);

            // Link to original audio
            fName = table_data2[i]['filename_prefix'];
            algorithm = table_data2[i]['algo'].toLowerCase();
            quality = table_data2[i]['quality'][j];
            
            td = document.createElement('td');
            td.innerHTML = `<a href=aud/${fName}/${fName}_orig.wav>Link</a>`;
            tr.appendChild(td);

            // Link to compressed audio
            td = document.createElement('td');
            td.innerHTML = `<a href=aud/${fName}/${fName}_${algorithm}_${quality}.${algorithm}>Link</a>`;
            tr.appendChild(td);

            // Link to residual audio
            td = document.createElement('td');
            td.innerHTML = `<a href=aud/${fName}/${fName}_${algorithm}_${quality}_r.wav>Link</a>`;
            tr.appendChild(td);

            tbody.appendChild(tr);
        }
      }
      table.appendChild(tbody);
      document.getElementById("discography_table").appendChild(table);

}

window.onload = function foo(){
    discography();
}