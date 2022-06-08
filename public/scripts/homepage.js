
function loadReviews() {
    let reviewContent = document.getElementById('review-content')
    reviewContent.replaceChildren()
    // makes a request to the server to fetch all reviews. Essentially GET request. 
    fetch('/reviews/', { method: 'GET'})
    .then(res => res.json())
    .then(jsonData => {
        jsonData.forEach(review => {
            let reviewDiv = document.createElement('div')
            reviewDiv.className = 'user-review';
            reviewDiv.innerHTML = review.reviewText;
            reviewContent.append(reviewDiv);
        })
    })
    .catch(e => {alert('Failed to fetch reviews. Please try again!')})
}

let reviewButton = document.getElementById('loadReviewsButton')
reviewButton.addEventListener('click', loadReviews)

// Resource: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch