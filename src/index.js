




document.addEventListener("DOMContentLoaded", () => {

fetch(`http://localhost:3000/quotes?_embed=likes`)
.then((response) => response.json())
.then((quotes) => { console.log(quotes)
    quotes.forEach(quote => {
        addQuote(quote)
    })
});



function addQuote(quote) {
    let ul = document.getElementById("quote-list")
    let li = document.createElement("li")
    li.className = "quote-card"
    li.innerHTML = `
    <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes ? quote.likes.length : 0}</span></button>
        <button class='btn-danger'>Delete</button>
    </blockquote>
    `
    let deletebtn = li.querySelector(".btn-danger")

    
    deletebtn.addEventListener("click", () => {
        fetch(`http://localhost:3000/quotes/${quote.id}`, {
            method: "DELETE"
        })
        .then(() => li.remove())
    })

    let likebtn = li.querySelector(".btn-success")
    likebtn.addEventListener("click", () => {
    fetch('http://localhost:3000/likes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            quoteId: quote.id, 
            createdAt: Date.now()  
        })
    })
    .then(res => res.json())
    .then(() => {
        let span = likebtn.querySelector("span")
        span.textContent = parseInt(span.textContent) + 1
    })
})
    
        
    
    ul.appendChild(li)
}

let form = document.getElementById("new-quote-form")
form.addEventListener("submit", (e) => {
    e.preventDefault()
    let quoteInput = document.getElementById("new-quote")
    let authorInput = document.getElementById("author")
    console.log(quoteInput.value, authorInput.value)
    fetch(`http://localhost:3000/quotes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            quote: quoteInput.value,
            author: authorInput.value
        })
        })
        .then(res => res.json())
    .then(newQuote => addQuote({ ...newQuote, likes: [] })) 
    

})






});

