let currentsong = new Audio();


async function getsongs() {

    let a = await fetch("Resources/Songs")
    let response = await a.text();
    console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")

    let songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];

        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/Songs/")[1])
        }
    }

    return (songs)

}

const playmusic = (track) => {

    currentsong.src = "Resources/Songs/" + track
    currentsong.play();
}

async function main() {

    let songs = await getsongs();
    console.log(songs)

    let songUl = document.querySelector(".Songs-list").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUl.innerHTML += `                <li>

        <img src="Resources/Images/banner.png" alt="banner">

        <p class="mus">${song.replaceAll("%20"," ")}</p>

    </li>`;
    }

    Array.from(document.querySelector(".Songs-list").getElementsByTagName("li")).forEach(e=> {
        e.addEventListener("click" , element => {
            console.log(e.querySelector(".mus").innerHTML)
            playmusic(e.querySelector(".mus").innerHTML.trim())
        })
    });
 

}

main()
