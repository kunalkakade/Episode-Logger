const fs = require('fs')
const path = require('path')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')
const db = low('db.json', {
    storage: {
        write: fileAsync.write,
        read: fileAsync.read
    }
})

let list = document.getElementsByClassName("container-fluid")
let div_name, div_episode, div_season
let row
row = document.createElement("div")
row.className = "row";

div_name = document.createElement("div")
div_name.className = "col-sm-6";
div_name.style = "background-color:cornflowerblue;";
//div_name.innerHTML = "ABC"
// div_name.onclick = () => {
//     alert(div_name.innerHTML);
// };
function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

fs.readFile(path.join(__dirname, 'db.json'), 'utf8', (err, data) => {
    if (err) {
        alert('Could not read file.\n\nDetails:\n' + err.message)
        return
    } else {
        let json = JSON.parse(data)
        for (let i in json.series) {
            row = document.createElement("div")
            row.className = "row";
            row.id = json.series[i].id;
            row.onclick = "markActiveLink(this);"
            div_name = document.createElement("div")
            div_name.className = "col-sm-6";
            div_name.style = "background-color:cornflowerblue;";
            div_season = document.createElement("div")
            div_season.className = "col-sm-2";
            div_season.style = "background-color:lavender;";
            div_episode = document.createElement("div")
            div_episode.className = "col-sm-2";
            div_episode.style = "background-color:lavenderblush;";

            div_name.innerHTML = json.series[i].id + " " + json.series[i].name;
            div_season.innerHTML = json.series[i].season;
            div_episode.innerHTML = json.series[i].episode;
            row.appendChild(div_name);
            row.appendChild(div_season)
            row.appendChild(div_episode)
            list[0].appendChild(row);
            console.log(json.series[i].name)

        }
    }
})

function markActiveLink(el) {
    alert($(el).attr("id"));
}



var form;

function formload() {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const url = require('url')
    form = new BrowserWindow({ width: 400, height: 600 })
    form.loadURL(url.format({
        pathname: path.join(__dirname, 'form.html'),
        protocol: 'file:',
        slashes: true
    }))

}

function getdata() {
    var id = db.get('series')
        .size()
        .value()
    var name = document.getElementById("inputname").value;
    var season = document.getElementById("inputseason").value;
    var episode = document.getElementById("inputepisode").value;
    var d = new Date();
    var n = d.getTime();
    db.get("series").push({ id: id + 1, name: name, season: season, episode: episode, time: n }).write()
    db.saveSync('db.json');
    //alert(id + name + season + episode + n);
    form.close();

}