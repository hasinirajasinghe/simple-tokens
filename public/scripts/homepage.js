
function loadReviews() {
    let reviewContent = document.getElementById('review-content')
    reviewContent.replaceChildren()
    let reviewTable = document.createElement('table');
    reviewTable.className = 'all-reviews-container'

    // Append review title first before the rest of the table
    let reviewTitle = document.createElement('h3');
    reviewTitle.innerText = "Reviews";
    reviewContent.append(reviewTitle)
   
    // makes a request to the server to fetch all reviews. Essentially a GET request. 
    fetch('/reviews/', { method: 'GET'})
    // resolve the promise from fetch
    .then(res => res.json())
    // resolve the promise from res.json()
    .then(jsonData => {

        // If there are no reviews then show a default message
        if (jsonData.length === 0) {
            reviewContent.append("No reviews yet! Be the first to leave one!")
        } else {
            reviewContent.append(reviewTable)
        }

        jsonData.forEach(review => {
            let reviewRow = document.createElement('tr');
            reviewRow.className = 'review-row'
            let reviewName = document.createElement('td')
            reviewName.innerText = review.name
            let reviewRating = document.createElement('td')
            reviewRating.innerText = review.rating
            let star = document.createElement('img')
            star.src = "/images/star-icon.png"
            star.className = 'star-icon'
            reviewRating.append(star)
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