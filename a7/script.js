
const apiRootUrl = "http://ws.audioscrobbler.com/2.0/?";
const apiKey = "d244d5d20d225c1af32004dfc7216f00";
const queryResLimit = 5;

function displayArtistAlbums(){
    let form = document.querySelector('form');
    let data = new URLSearchParams(new FormData(form).entries());
    let artist = data.get('artist');
    let songName = data.get('songtitle');

    // let artistSearchQueryUrl = `${apiRootUrl}artist/?query=artist:${artist}&fmt=json`;
    let queryUrl = `${apiRootUrl}method=track.getsimilar&artist=${artist}&track=${songName}&limit=${queryResLimit}&api_key=${apiKey}&format=json`;
    console.log("QueryUrl: " + queryUrl);
    const request = new XMLHttpRequest();
    request.open('GET', queryUrl);
    request.responseType = 'json';
    request.onreadystatechange = function(){
        if (request.readyState == 4){
            let response = request.response;
            console.log(response);

            if (!'similartracks' in response || 'error' in response){
                document.getElementById("discography_table").innerHTML = `<br><br><b>Error:</b> ${response['message']}.<br>Please ensure your inputs are correct.`;
                console.log(response['message']);
                return;
            }

            let similarTracks = response['similartracks']['track'];

            if (similarTracks.length <= 0){
                document.getElementById("discography_table").innerHTML = "<br><p>Could not find any similar songs.</p>";
                console.log("Could not find artist");
                return;
            }

            let numResponses = 0;
            similarSongs = []

            for (i = 0; i < similarTracks.length; ++i){
                mbid = 'mbid' in similarTracks[i] ? similarTracks[i]['mbid'] : null;
                lookupName = similarTracks[i]['name'];
                lookupArtist = similarTracks[i]['artist']['name'];

                let getInfoQueryUrl = `${apiRootUrl}method=track.getInfo&artist=${lookupArtist}&track=${lookupName}&api_key=${apiKey}&format=json`;
                console.log("Query: " + getInfoQueryUrl);
                let newReq = new XMLHttpRequest();
                newReq.open('GET', getInfoQueryUrl);
                newReq.responseType = 'json';
                newReq.onreadystatechange = function(){
                    if (newReq.readyState == 4){
                        numResponses++;
                        track = newReq.response['track'];

                        songInfo = {}
                        songInfo['name'] = track['name'];
                        songInfo['artist'] = track['artist']['name'];
                        songInfo['url'] = track['url'];
                        songInfo['desc'] = "No description available.";
                        if ('wiki' in track){
                            if ('summary' in track['wiki']){
                                songInfo['desc'] = track['wiki']['summary'];
                            }
                        }
                        songInfo['picUrl'] = "defaultAlbumArt.png";
                        if ('album' in track){
                            if ('image' in track['album']){
                                songInfo['picUrl'] = track['album']['image'][2]['#text'];
                            }
                        }

                        // console.log("Song Info after lookup:")
                        // console.log(songInfo);
                        similarSongs.push(songInfo);

                        // Process entire list here
                        if (numResponses == similarTracks.length){
                            console.log("Got all responses");
                            console.log(similarSongs);
                            display_table(similarSongs);
                        }
                    }
                }
                newReq.send();
            }
        }
    }
    request.send();
}


function display_table(table_data2){
    document.getElementById("discography_table").innerHTML = "";    // clear the content

    let table = document.createElement('table');
    table.id = 'compTable'
    thead = document.createElement('thead');
    tr = document.createElement('tr');

    headers = ['Album Art', 'Song Information'];
    headers = ["", ""]
    headers.forEach((val, index) => {
        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = "<th scope='col'>" + val + "</th>";
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    tbody = document.createElement('tbody');
    for (i = 0; i < table_data2.length; i++) {
        let songInfo = table_data2[i];

        tr = document.createElement('tr');

        td = document.createElement('td');
        td.innerHTML = `<img src=\"${songInfo['picUrl']}\"></img>`;
        tr.appendChild(td);

        td = document.createElement('td');
        let innerHtml = `<a href=\"${songInfo['url']}\">"${songInfo['name']}" - ${songInfo['artist']}</a><br>${songInfo['desc']}`;
        td.innerHTML = innerHtml;
        tr.appendChild(td);

        // for (j = 0; j < table_data2[i].length; j++){
        //     td = document.createElement('td');
        //     td.innerHTML = table_data2[i][j];
        //     tr.appendChild(td);
        // }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
      document.getElementById("discography_table").appendChild(table);
}

window.onload = function foo(){
    $('#getArtist').submit(function () {
        displayArtistAlbums();
        return false;
    });
    // discography();
}