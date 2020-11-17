
const apiRootUrl = "https://musicbrainz.org/ws/2/"

function displayArtistAlbums(){
    let form = document.querySelector('form');
    let data = new URLSearchParams(new FormData(form).entries());
    let artist = data.get('artist');

    let artistSearchQueryUrl = `${apiRootUrl}artist/?query=artist:${artist}&fmt=json`;
    const request = new XMLHttpRequest();
    request.open('GET', artistSearchQueryUrl);
    request.responseType = 'json';
    request.onreadystatechange = function(){
        if (request.readyState == 4){
            let response = request.response;
            let allArtists = response['artists']

            // do a lookup for each artist? Or just get the first one?
            // for (i = 0; i < allArtists.length; i++){
            //     let id = allArtists[i]['id']
            // }

            if (allArtists.length <= 0){
                document.getElementById("discography_table").innerHTML = "<br><p>Could not find artist with that name. Try again.</p>";
                console.log("Could not find artist");
                return;
            }
            let id = allArtists[0]['id'];   // get first artist found when doing search
            console.log(`Found ${id} for "${artist}"`);

            let artistQueryUrl = `${apiRootUrl}artist/${id}?inc=release-groups&fmt=json`;
            request.open('GET', artistQueryUrl);
            request.onreadystatechange = function(){
                if (request.readyState == 4){
                    response = request.response;

                    console.log(response);

                    let albums = [];

                    if (response['release-groups'].length == 0){
                        document.getElementById("discography_table").innerHTML = "<br><p>No album releases under that artist.</p>";
                        return;
                    }

                    for (i = 0; i < response['release-groups'].length; i++){
                        let release = response['release-groups'][i];
                        if (release['primary-type'] == 'Album'){
                            let albumName = release['title'];
                            let albumDate = release['first-release-date'];
                            albums.push([albumName, albumDate]);
                        }
                    }

                    // Sorts list by release date
                    albums.sort((a,b) => a[1].localeCompare(b[1]));
                    display_table(albums);
                }
            }
            request.send();
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

    headers = ['Album Name', 'First Release Date'];

    headers.forEach((val, index) => {
        th = document.createElement('th');
        tr.appendChild(th);
        th.innerHTML = "<th scope='col'>" + val + "</th>";
    });
    thead.appendChild(tr);
    table.appendChild(thead);

    tbody = document.createElement('tbody');
    for (i = 0; i < table_data2.length; i++) {
        tr = document.createElement('tr');

        for (j = 0; j < table_data2[i].length; j++){
            td = document.createElement('td');
            td.innerHTML = table_data2[i][j];
            tr.appendChild(td);
        }
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