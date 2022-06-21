// Used script because only want to show the reviews upon user's click. 
function loadReviews(productId, userId) {
    let reviewContent = document.getElementById('review-content')
    reviewContent.replaceChildren()

    let reviewTitle = document.createElement('h3');
    reviewTitle.innerText = "Reviews";
    reviewContent.append(reviewTitle)

    let reviewTable = document.createElement('table');
    reviewTable.className = 'all-reviews-container'

    fetch(`/reviews/${productId}`, { method: 'GET'})
    .then(res => res.json())
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
            let reviewTimestamp = document.createElement('td')
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
            let timestamp = new Date(review.timestamp)
            // Increment month by 1 because it starts at 0
            reviewTimestamp.innerText = `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear()}`
            
            reviewRow.append(reviewName, reviewRating, reviewText, reviewTimestamp);

            // If the user is logged in
            // Show the edit and delete buttons only for the review the user wrote
            if (userId === review.userId) {
                let editTd = document.createElement('td');
                let editLink = document.createElement('a')
                editLink.href = `/reviews/${review._id}/edit`
                let editButton = document.createElement('button')
                editButton.className = 'edit-button'
                editButton.innerHTML = 'Edit'
                editLink.append(editButton)
                editTd.append(editLink)

                let deleteTd = document.createElement('td');
                let deleteForm = document.createElement('form')
                deleteForm.action = `/reviews/${review._id}?_method=DELETE`
                deleteForm.method = 'POST'
                let deleteButton = document.createElement('input')
                deleteButton.className = 'delete-button'
                deleteButton.type = 'submit'
                deleteButton.value = 'Delete'
                deleteForm.append(deleteButton)
                deleteTd.append(deleteForm)

                reviewRow.append(editTd, deleteTd);
            }
            
            reviewTable.append(reviewRow)
        })
    })
    .catch(e => {alert('Failed to fetch reviews. Please try again!')})
}