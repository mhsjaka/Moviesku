const IMAGEBASEURL = "https://image.tmdb.org/t/p/w500";
const URLTranding = "https://api.themoviedb.org/3/trending/movie/week?api_key=c6a36b80cc4c15edf75aebb21bb21aa9";
const tutup = document.querySelector("nav .nav_list p")
const menu_icon = document.querySelector(".nav_container .menu_icon")
if(tutup || menu_icon){
    tutup.addEventListener("click", ()=>{
        const nav = document.querySelector("nav")
        nav.classList.remove("open")
    })
    menu_icon.addEventListener("click", ()=>{
        const nav = document.querySelector("nav")
        nav.classList.add("open")
    })

}
const Data = (movies) =>{
    let HTMLtext = ""
    const container_movies = document.querySelector(".movies .container_movies")
    for (let z = 0; z < 8; z++) {
        const data = movies[z]
        const year = new Date(data.release_date).getFullYear()
        HTMLtext += `
        <a onclick="detailMovie(${data.id})" class="card">
            <img class="card_img" src="${IMAGEBASEURL}/${data.poster_path}"/>
            <div class="card_content">
                <p class="card_judul">${data.title} (${year})</p>
            </div>
        </a>
        `
    }
    container_movies.innerHTML = HTMLtext

}
tampilTrending(URLTranding);

function tampilTrending(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        Tranding(data.results)
    })
}
const Tranding = (movies) =>{
    let HTMLtext = ""
    const container_movies = document.querySelector(".movies_tranding .container_movies")
    for (let z = 0; z < 8; z++) {
        const data = movies[z]
        const year = new Date(data.release_date).getFullYear()
        HTMLtext += `
        <a onclick="detailMovie(${data.id})" class="card">
            <img class="card_img" src="${IMAGEBASEURL}/${data.poster_path}"/>
            <div class="card_content">
                <p class="card_judul">${data.title} (${year})</p>
            </div>
        </a>
        `
    }
    container_movies.innerHTML = HTMLtext

}

const detailMovie = (id) => {
    let movie = ""
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c6a36b80cc4c15edf75aebb21bb21aa9&language=en-US`)
    .then( res => res.json() )
    .then( data => {
        let HTMLCard = ""
        const detail = document.getElementById("detail_movies")
        const body = document.querySelector("body")
        detail.classList.add("open")
        body.classList.add("close")
        // previewnya.classList.add("open")
        HTMLCard += `
        <div  class="card_detail">
            <div class="card_preview">
                <img class="card_image" src="${IMAGEBASEURL}/${data.poster_path}"/>
            </div>
            <div class="card_deskripsi">
            <img class="detail_kembali" src="./img/icon/back.png">
                <p class="card_judul">${data.title}</p>
                
                
                <p>${data.overview}</p>
                
                <p>&#128154; : ${data.popularity}</p>
                <p>&#x1F4C5; : ${data.release_date}</p>
                <p>&#11088; : ${data.vote_average}</p>
            </div>
            
            `
                detail.innerHTML = HTMLCard       
                const back = document.querySelector(".detail_movies .detail_kembali")

                back.addEventListener("click",()=>{
                    const detail = document.querySelector(".detail_movies")
                    const body = document.querySelector("body")
                    detail.classList.remove("open")
                    body.classList.remove("close")
                })
            })
        }

window.addEventListener("DOMContentLoaded", () => {
    
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
            const results = data.results
          Data(results)
        })
})
window.addEventListener("resize",()=>{
    
    if(window.matchMedia('(min-width: 768px)')){
        const nav = document.querySelector("nav")
        nav.classList.add("open")

    }
})

