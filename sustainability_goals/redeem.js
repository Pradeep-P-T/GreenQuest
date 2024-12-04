document.addEventListener('DOMContentLoaded', () => {
    const redeemButtons = document.querySelectorAll('.redeem-btn');
    const modal = document.getElementById('modal');
    const confirmBtn = document.getElementById('confirm-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    let selectedCard = null;

    let userPoints = parseInt(sessionStorage.getItem('points')) || 0;
    updateTotalPoints(userPoints);
    console.log("REE", userPoints);

    function updateTotalPoints(points) {
        document.getElementById("totalPoints").textContent = points;
    }
    let pointsRequired;
    redeemButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.card');
            pointsRequired = parseInt(card.dataset.points, 10);
            // updateTotalPoints(userPoints);
            console.log("REE", userPoints, pointsRequired);
            if (userPoints >= pointsRequired) {
                selectedCard = card;
                modal.classList.remove('hidden');
            } else {
                alert("You don't have enough points to redeem this product.");
            }
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (selectedCard) {
            const redeemBtn = selectedCard.querySelector('.redeem-btn');
            redeemBtn.textContent = 'Redeemed';
            redeemBtn.classList.add('redeemed');
            redeemBtn.disabled = true;
            modal.classList.add('hidden');
            updateTotalPoints(userPoints-pointsRequired)
            sessionStorage.setItem("points", userPoints-pointsRequired);
            userPoints=sessionStorage.getItem('points');

        }
    });

    cancelBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    
});
