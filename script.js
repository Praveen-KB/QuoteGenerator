const quoteCont = document.getElementById("quoteCont");
const quoteText = document.getElementById("quote");
const author = document.getElementById("aut");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");

let apiQuotes = []

function loading() {
    loader.hidden = false;
    quoteCont.hidden = true;
}

//  hide loading

function complete() {
    loader.hidden = true
    quoteCont.hidden = false
}

function nerQuote() {
    // random quate from api quotes aray
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    // if author feild is blank
    if (!quote.author) {
        author.textContent = "Unknown";
    }
    else {
        author.textContent = quote.author;
    }

    // check quote lenght to determine styling

    if (quote.text.length > 100) {
        quoteText.classList.add("longQuote")
    }
    else {
        quoteText.classList.remove("longQuote")
    }
    quoteText.textContent = quote.text;
    complete()
}
// get quots from api

async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    loading()
    try {
        const res = await fetch(apiUrl);
        apiQuotes = await res.json();
        nerQuote()
    }
    catch {
        // catch error
    }
    complete()

}
//  tweet quote 

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`
    window.open(twitterUrl, "_blank")
}

newQuoteBtn.addEventListener("click", nerQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes()
// loading()
