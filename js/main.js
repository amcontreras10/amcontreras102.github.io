// API Key from giphy.com
let APIKEY = "o6qLzjsOJyGVBd083ZbXLhtuvftVgGPF";
// webpage loaded
document.addEventListener("DOMContentLoaded", init);
// click event to get content
function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
        // url info from GIPHY Search Endpoint 
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        console.log(url);
        // get response and process data
        fetch(url)
            .then(response => response.json())
            .then(content => {
                //data, pagination, meta
                console.log(content.data);
                console.log("META", content.meta);
                // creating elements from data
                let n = 9;
                for (let i = 1; i <= n; i++) {
                    console.log(i);
                    let fig = document.createElement("figure");
                    let img = document.createElement("img");
                    let fc = document.createElement("figcaption");
                    img.src = content.data[i].images.downsized.url;
                    img.alt = content.data[i].title;
                    img.setAttribute('class', 'image');
                    fig.setAttribute('class', 'figure');
                    fc.setAttribute('class', 'figcaption');
                    fc.textContent = content.data[i].title;
                    fig.appendChild(img);
                    fig.appendChild(fc);
                    let out = document.querySelector("#out");
                    //newest search goes to the top
                    out.insertAdjacentElement("afterbegin", fig);
                    //clear up the form in the console
                    document.querySelector("#search").value = "";
                }
})
            // handle any errors
                .catch (err => {
                console.error(err);
            });
    });
}
