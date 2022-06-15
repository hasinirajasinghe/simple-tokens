
function loadReviews() {
    let reviewContent = document.getElementById('review-content')
    reviewContent.replaceChildren()
    let reviewTable = document.createElement('table');
    reviewTable.className = 'all-reviews-container'

    // Append review title first before the rest of the table
    let reviewTitle = document.createElement('h3');
    reviewTitle.innerText = "Reviews";
    reviewContent.append(reviewTitle)

    reviewContent.append(reviewTable)

    
    // makes a request to the server to fetch all reviews. Essentially a GET request. 
    fetch('/reviews/', { method: 'GET'})
    // resolve the promise from fetch
    .then(res => res.json())
    // resolve the promise from res.json()
    .then(jsonData => {
        jsonData.forEach(review => {
            let reviewRow = document.createElement('tr');
            reviewRow.className = 'review-row'
            let reviewName = document.createElement('td')
            reviewName.innerText = review.name
            let reviewRating = document.createElement('td')
            reviewRating.innerText = review.rating
            let reviewText = document.createElement('td')
            reviewText.innerText = '"' + review.reviewText + '"'

            reviewRow.append(reviewName, reviewRating, reviewText);
            reviewTable.append(reviewRow)
        })
    })
    .catch(e => {alert('Failed to fetch reviews. Please try again!')})
}

let reviewButton = document.getElementById('loadReviewsButton')
reviewButton.addEventListener('click', loadReviews)

// Resource: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch