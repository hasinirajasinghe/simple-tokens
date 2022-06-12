
function loadReviews() {
    let reviewContent = document.getElementById('review-content')
    reviewContent.replaceChildren()
    let reviewTable = document.createElement('table');
    reviewContent.append(reviewTable)
    // makes a request to the server to fetch all reviews. Essentially GET request. 
    fetch('/reviews/', { method: 'GET'})
    .then(res => res.json())
    .then(jsonData => {
        jsonData.forEach(review => {
            let reviewRow = document.createElement('tr');
            let reviewName = document.createElement('td')
            reviewName.innerText = review.name
            let reviewRating = document.createElement('td')
            reviewRating.innerText = review.rating
            let reviewText = document.createElement('td')
            reviewText.innerText = '"' + review.reviewText + '"'

            reviewRow.append(reviewName, reviewRating, reviewText);
            reviewTable.append(reviewRow)
            // let reviewDiv = document.createElement('div')
            
            // reviewDiv.className = 'user-review';
            // reviewDiv.innerHTML = review.reviewText;
            // reviewContent.append(reviewDiv);
        })
    })
    .catch(e => {alert('Failed to fetch reviews. Please try again!')})
}

let reviewButton = document.getElementById('loadReviewsButton')
reviewButton.addEventListener('click', loadReviews)

// Resource: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch