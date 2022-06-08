function loadReviews(productId) {
    console.log(productId)
    let reviewContent = document.getElementById('review-content')
    // Replace to get rid of the button that is within it for now
    reviewContent.replaceChildren()

    fetch(`/reviews/${productId}`, { method: 'GET'})
    .then(res => res.json())
    .then(jsonData => {
        jsonData.forEach(review => {
            let reviewDiv = document.createElement('div')
            reviewDiv.className = 'user-review'
            reviewDiv.innerHTML = review.reviewText
            reviewContent.append(reviewDiv)
        })
    })
    .catch(e => {alert('Failed to fetch reviews. Please try again!')})
}