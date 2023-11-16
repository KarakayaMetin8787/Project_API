// counter to keep track of current page number
let currentPage = 1;
// setting active button css for initial loading of landing page
document.body.querySelector(".pageOne").classList.add("selected")

// =============================================================
// Initial loading of my landing page on ?page=1
// =============================================================

fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=30`)
    .then(response => {
        
        if (response.ok === false){
            throw new Error ("response error, ok is not true.")
        } else {
            return response.json()
        }
    })
    .then(data => {
        // counter for selecting the correct div container through nth-of-type in my loop below
        let counter = 1
        
        // creating the figure element that is going to contain my grid
        const newFigureEl = document.createElement("figure")
        document.body.querySelector("main").append(newFigureEl)
        
        data.forEach((singleObject) => {
            
            // creating div container that is going to contain image, author and button
            const newDivContainer = document.createElement("div")
            document.body.querySelector("main figure").append(newDivContainer)
            
            // creating image
            const newImgEl = document.createElement("img")
            newImgEl.setAttribute("src", `${singleObject.download_url}`)
            newImgEl.setAttribute("alt", `pics aus picsum`)
            document.body.querySelector(`main figure div:nth-of-type(${counter})`).append(newImgEl)
            
            // creating figcaption containing auhtor name
            const newFigcaption = document.createElement("figcaption")
            newFigcaption.textContent = `${singleObject.author}`
            document.body.querySelector(`main figure div:nth-of-type(${counter})`).append(newFigcaption)
            
            // creating a button through an a-tag to redirect to image source
            const newButton = document.createElement("a")
            newButton.setAttribute("href", `${singleObject.url}`)
            newButton.setAttribute("target", "_blank")
            newButton.textContent = "See more"
            document.body.querySelector(`main figure div:nth-of-type(${counter})`).append(newButton)
            
            counter++
        })
    })
    .catch(error => console.log(error))

// =============================================================
// Page navigation buttons
// =============================================================

document.body.querySelector(".pageOne").addEventListener("click", () => {
    currentPage = 1;
    changeFetch();
    document.body.querySelector(".pageOne").classList.add("selected")
    document.body.querySelector(".pageTwo").classList.remove("selected")
    document.body.querySelector(".pageThree").classList.remove("selected")
})

document.body.querySelector(".pageTwo").addEventListener("click", () => {
    currentPage = 2;
    changeFetch();
    document.body.querySelector(".pageOne").classList.remove("selected")
    document.body.querySelector(".pageTwo").classList.add("selected")
    document.body.querySelector(".pageThree").classList.remove("selected")
})

document.body.querySelector(".pageThree").addEventListener("click", () => {
    currentPage = 3;
    changeFetch();
    document.body.querySelector(".pageOne").classList.remove("selected")
    document.body.querySelector(".pageTwo").classList.remove("selected")
    document.body.querySelector(".pageThree").classList.add("selected")
})

document.body.querySelector(".pageBack").addEventListener("click", () => {
    if (currentPage > 1) { //preventing pages dropping below 1
        currentPage--;
        changeFetch();
        document.body.querySelector(".pageOne").classList.remove("selected")
        document.body.querySelector(".pageTwo").classList.remove("selected")
        document.body.querySelector(".pageThree").classList.remove("selected")
        if (currentPage === 1) {
            document.body.querySelector(".pageOne").classList.add("selected")
        } else if (currentPage === 2) {
            document.body.querySelector(".pageTwo").classList.add("selected")
        } else if (currentPage === 3) {
            document.body.querySelector(".pageThree").classList.add("selected")
        }
    }
})

document.body.querySelector(".pageNext").addEventListener("click", () => {
    if (currentPage < 3) { //preventing pages exceeding 3
        currentPage++;
        changeFetch();
        document.body.querySelector(".pageOne").classList.remove("selected")
        document.body.querySelector(".pageTwo").classList.remove("selected")
        document.body.querySelector(".pageThree").classList.remove("selected")
        if (currentPage === 1) {
            document.body.querySelector(".pageOne").classList.add("selected")
        } else if (currentPage === 2) {
            document.body.querySelector(".pageTwo").classList.add("selected")
        } else if (currentPage === 3) {
            document.body.querySelector(".pageThree").classList.add("selected")
        }
    }
})

// =============================================================
// Page data fetch function for button navigation
// =============================================================

function changeFetch(){
    document.body.querySelector("main").innerHTML = "";

    fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=30`)
    .then(response => {
        
        if (response.ok === false){
            throw new Error ("response error, ok is not true.")
        } else {
            return response.json()
        }
    })
    .then(data => {
        // counter for selecting the correct div container through nth-of-type in my loop below
        let counter = 1
        
        // creating the figure element that is going to contain my grid
        const newFigureEl = document.createElement("figure")
        document.body.querySelector("main").append(newFigureEl)
        
        data.forEach((singleObject) => {
            
            // creating div container that is going to contain image, author and button
            const newDivContainer = document.createElement("div")
            document.body.querySelector("main figure").append(newDivContainer)
            
            // creating image
            const newImgEl = document.createElement("img")
            newImgEl.setAttribute("src", `${singleObject.download_url}`)
            newImgEl.setAttribute("alt", `pics aus picsum`)
            document.body.querySelector(`main figure div:nth-of-type(${counter})`).append(newImgEl)
            
            // creating figcaption containing auhtor name
            const newFigcaption = document.createElement("figcaption")
            newFigcaption.textContent = `${singleObject.author}`
            document.body.querySelector(`main figure div:nth-of-type(${counter})`).append(newFigcaption)
            
            // creating a button through an a-tag to redirect to image source
            const newButton = document.createElement("a")
            newButton.setAttribute("href", `${singleObject.url}`)
            newButton.setAttribute("target", "_blank")
            newButton.textContent = "See more"
            document.body.querySelector(`main figure div:nth-of-type(${counter})`).append(newButton)
            
            counter++
        })
    })
    .catch(error => console.log(error))
}