document.addEventListener('DOMContentLoaded', function() {
    const sureBtn = document.getElementById('sure-btn');
    const laterBtn = document.getElementById('later-btn');
    const dialogueBox = document.getElementById('dialogue-box');
    const container = document.getElementById('container');
    
    // Set start date (2021)
    const startDate = new Date(2021, 0, 1); // January 1, 2021
    
    // Maybe later button
    laterBtn.addEventListener('click', function() {
        dialogueBox.innerHTML = '<h2>Times Together</h2><p>I\'ll wait!</p>';
    });
    
    // Sure button
    sureBtn.addEventListener('click', function() {
        dialogueBox.classList.add('hidden');
        showLoadingBar();
    });
    
    function showLoadingBar() {
        const loadingContainer = document.createElement('div');
        loadingContainer.id = 'loading-container';
        loadingContainer.innerHTML = `
            <div>Calculating...</div>
            <div id="loading-bar">
                <div id="loading-progress"></div>
            </div>
            <div>Please wait while we calculate your time together</div>
        `;
        document.body.appendChild(loadingContainer);
        
        // Simulate loading bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            document.getElementById('loading-progress').style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                loadingContainer.remove();
                showTimeTogether();
            }
        }, 30);
    }
    
    function showTimeTogether() {
        const timeResult = document.createElement('div');
        timeResult.id = 'time-result';
        document.body.appendChild(timeResult);
        
        let timeInterval = setInterval(updateTime, 1000);
        updateTime();
        
        function updateTime() {
            const currentDate = new Date();
            let years = currentDate.getFullYear() - startDate.getFullYear();
            let months = currentDate.getMonth() - startDate.getMonth();
            let days = currentDate.getDate() - startDate.getDate();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();
            
            if (months < 0) {
                years--;
                months += 12;
            }
            
            if (days < 0) {
                months--;
                const tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                days += tempDate.getDate();
            }
            
            timeResult.innerHTML = `
                <div>${years} Years</div>
                <div>${months} Months</div>
                <div>${days} Days</div>
                <div>${hours} Hours</div>
                <div>${minutes} Minutes</div>
                <div>${seconds} Seconds</div>
                <div class="counting">and counting...</div>
            `;
        }
        
        // After 20 seconds, show dialogue bubbles
        setTimeout(() => {
            clearInterval(timeInterval);
            timeResult.remove();
            showDialogueBubbles();
        }, 20000);
    }
    
    function showDialogueBubbles() {
        const messages = [
            "Remember when we first met?",
            "So many memories",
            "Thanks for being here",
            "Here is to more time together",
            "Forever and always",
            "Counting every moment",
            "You make my heart smile",
            "Our time is priceless",
            "Cherishing every moment",
            "Happy birthday",
            "My best friend"
        ];
        
        messages.forEach((message, index) => {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.className = 'dialogue-bubble';
                bubble.textContent = message;
                
                // Position with overlap prevention
                let x, y;
                let overlapping;
                const maxAttempts = 100;
                let attempts = 0;
                
                do {
                    overlapping = false;
                    x = Math.random() * (window.innerWidth - 200);
                    y = Math.random() * (window.innerHeight - 100);
                    
                    document.querySelectorAll('.dialogue-bubble').forEach(b => {
                        const rect = b.getBoundingClientRect();
                        if (Math.abs(rect.left - x) < 200 && Math.abs(rect.top - y) < 100) {
                            overlapping = true;
                        }
                    });
                    
                    attempts++;
                    if (attempts >= maxAttempts) break;
                } while (overlapping);
                
                bubble.style.left = `${x}px`;
                bubble.style.top = `${y}px`;
                document.body.appendChild(bubble);
                
                // Show forever button after last message
                if (index === messages.length - 1) {
                    setTimeout(showForeverButton, 1000);
                }
            }, index * 800);
        });
    }
    
    function showForeverButton() {
        const foreverContainer = document.createElement('div');
        foreverContainer.id = 'forever-container';
        
        const foreverBtn = document.createElement('button');
        foreverBtn.textContent = 'Forever to Go';
        foreverBtn.addEventListener('click', showFinalMessage);
        
        foreverContainer.appendChild(foreverBtn);
        document.body.appendChild(foreverContainer);
    }
    
    function showFinalMessage() {
        document.querySelectorAll('.dialogue-bubble').forEach(b => b.remove());
        document.getElementById('forever-container').remove();
        
        const finalMessage = document.createElement('div');
        finalMessage.id = 'final-message';
        finalMessage.innerHTML = `
            <h2>Our Time Continues...</h2>
            <p>From the very first moment we met, my life became brighter.</p>
            <p>You've brought so much laughter, support, and meaning into every single day.</p>
            <p>Here's to all the beautiful memories we've made—and all the ones still waiting for us.</p>
            <p>I'll keep cherishing every moment, because time with you is a gift.</p>
            <p>Happy birthday!</p>
        `;
        document.body.appendChild(finalMessage);
    }
});