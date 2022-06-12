function loadReviews(productId, userId) {
    let reviewContent = document.getElementById('review-content')
    // Replace to get rid of the button that is within it for now
    reviewContent.replaceChildren()

    fetch(`/reviews/${productId}`, { method: 'GET'})
    .then(res => res.json())
    .then(jsonData => {
        jsonData.forEach(review => {
            let reviewDiv = document.createElement('div')
            reviewDiv.className = 'user-review'
            reviewDiv.append(review.reviewText)
            reviewDiv.append('Rating: ' + review.rating)
            reviewContent.append(reviewDiv)
            // If the user is logged in
            // Show the edit and delete buttons only for the review the user wrote
            if (userId === review.userId) {
                let editLink = document.createElement('a')
                editLink.href = `/reviews/${review._id}/edit`
                let editButton = document.createElement('button')
                editButton.innerHTML = 'Edit'
                editLink.append(editButton)
                reviewDiv.append(editLink)

                let deleteForm = document.createElement('form')
                deleteForm.action = `/reviews/${review._id}?_method=DELETE`
                deleteForm.method = 'POST'
                let deleteButton = document.createElement('input')
                deleteButton.type = 'submit'
                deleteButton.value = 'Delete'
                deleteForm.append(deleteButton)
                reviewDiv.append(deleteForm)
            }
        })
    })
    .catch(e => {alert('Failed to fetch reviews. Please try again!')})
}