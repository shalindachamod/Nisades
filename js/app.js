// ==========================================
// 1. පිටුව ලෝඩ් වූ පසු මූලික වැඩකටයුතු ආරම්භ කිරීම
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme(); // Dark mode සැකසුම් ක්‍රියාත්මක කිරීම
    
    // poems-data.js එකෙන් myPoems Array එක ලැබී ඇත්දැයි බැලීම
    if (typeof myPoems !== 'undefined') {
        renderPoems(myPoems); // සියලුම කවි තිරය මත පෙන්වීම
    } else {
        console.error("Error: poems-data.js ෆයිල් එක නිවැරදිව ලෝඩ් වී නැත.");
    }
});

// ==========================================
// 2. කවි තිරය මත Render කිරීමේ ප්‍රධාන Function එක
// ==========================================
function renderPoems(poemsToDisplay) {
    const displayContainer = document.getElementById("poem-display") || document.getElementById("all-poems-display");
    
    if (!displayContainer) return;

    displayContainer.innerHTML = ""; 

    if (poemsToDisplay.length === 0) {
        displayContainer.innerHTML = `<div class="no-poems">සොයන වර්ගයේ කවි කිසිවක් හමු නොවීය...</div>`;
        return;
    }

    poemsToDisplay.forEach(poem => {
        const isLiked = localStorage.getItem(`poem_liked_${poem.id}`) === "true";
        
        // Social Share සඳහා කවියේ ලින්ක් එක සකසා ගැනීම (සයිට් එක live දැමූ පසු මෙය වෙනස් කල හැක)
        const shareText = encodeURIComponent(`📝 *${poem.title}* \n\n${poem.content}\n\nතවත් කවි කියවන්න පිවිසෙන්න: `);
        const shareUrl = encodeURIComponent(window.location.href);

        const poemCard = document.createElement("div");
        poemCard.className = "poem-card";
        poemCard.innerHTML = `
            <span class="poem-tag">${getCategoryName(poem.category)}</span>
            <h3>${poem.title}</h3>
            
            <div class="poem-content-wrapper">
                <p class="poem-content">${poem.content}</p>
            </div>
            
            <button class="read-more-btn" onclick="toggleReadMore(this)">Read more</button>
            
            <div class="like-section">
                <button class="action-btn like-btn ${isLiked ? 'liked' : ''}" onclick="toggleLike(${poem.id}, this)" title="මනාපය පළ කරන්න">
                    <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i>
                </button>
                
                <button class="action-btn copy-btn" onclick="copyPoem(this)" title="කවිය පිටපත් කරන්න">
                    <i class="far fa-copy"></i>
                </button>
                
                <div class="share-menu-container">
                    <button class="action-btn share-btn" title="බෙදාහරින්න">
                        <i class="fas fa-share-alt"></i>
                    </button>
                    <div class="share-options">
                        <a href="https://api.whatsapp.com/send?text=${shareText}${shareUrl}" target="_blank" class="share-whatsapp" title="WhatsApp හරහා"><i class="fab fa-whatsapp"></i></a>
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" class="share-facebook" title="Facebook හරහා"><i class="fab fa-facebook-f"></i></a>
                    </div>
                </div>
            </div>
        `;
        displayContainer.appendChild(poemCard);
    });
}

// 🪄 Read More Toggle කිරීම සඳහා අලුතින්ම එකතු කරන Function එක
function toggleReadMore(button) {
    const card = button.closest('.poem-card');
    const wrapper = card.querySelector('.poem-content-wrapper');
    
    if (card.classList.contains('expanded')) {
        card.classList.remove('expanded');
        button.innerHTML = "See More";
    } else {
        card.classList.add('expanded');
        button.innerHTML = "See Less";
    }
}

// ==========================================
// 3. Category අනුව කවි Filter කිරීම (index.html සඳහා)
// ==========================================
function filterPoems(category) {
    // සියලුම වර්ගීකරණ බටන් වල active ක්ලාස් එක ඉවත් කිරීම
    const buttons = document.querySelectorAll(".cat-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
    
    // ක්ලික් කල බටන් එක සොයාගෙන ඒකට active ක්ලාස් එක දීම (Logical Fix)
    buttons.forEach(btn => {
        if (category === 'all' && btn.textContent.trim() === 'All') btn.classList.add("active");
        if (category === 'love' && btn.textContent.trim() === 'Love') btn.classList.add("active");
        if (category === 'life' && btn.textContent.trim() === 'Life') btn.classList.add("active");
    });

    // දත්ත පෙරීම
    if (category === "all") {
        renderPoems(myPoems);
    } else {
        const filtered = myPoems.filter(p => p.category === category);
        renderPoems(filtered);
    }
}

// ==========================================
// 4. කවි සෙවීම (poemS.html හි Search Bar එක සඳහා)
// ==========================================
function searchPoems() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    
    // මාතෘකාව හෝ කවියේ අන්තර්ගතය අනුව සෙවීම
    const filtered = myPoems.filter(poem => {
        return poem.title.toLowerCase().includes(searchInput) || 
               poem.content.toLowerCase().includes(searchInput);
    });
    
    renderPoems(filtered);
}

// Category Id එක සිංහලෙන් පෙන්වීමට උදව් වන Helper Function එකක්
function getCategoryName(cat) {
    const names = {
        'love': 'Love',
        'life': 'Life',
    };
    return names[cat] || 'Other';
}

// ==========================================
// 5. Like (මනාප) Toggle කිරීම සහ LocalStorage හි සුරැකීම
// ==========================================
function toggleLike(poemId, button) {
    const key = `poem_liked_${poemId}`;
    const isLiked = localStorage.getItem(key) === "true";

    if (isLiked) {
        localStorage.setItem(key, "false");
        button.classList.remove("liked");
        button.innerHTML = "🤍 Like";
    } else {
        localStorage.setItem(key, "true");
        button.classList.add("liked");
        button.innerHTML = "❤️ Liked";
    }
}

// ==========================================
// 6. Dark / Light Mode තේමාව පාලනය කිරීම
// ==========================================
function initTheme() {
    const themeToggleBtn = document.getElementById("theme-toggle");
    if (!themeToggleBtn) return;

    // කලින් පරිශීලකයා තෝරාගත් තේමාව LocalStorage හි තිබේදැයි බැලීම
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeToggleBtn.innerHTML = "☀️";
    } else {
        document.body.classList.remove("dark-theme");
        themeToggleBtn.innerHTML = "🌙";
    }

    // බටන් එක ක්ලික් කල විට ක්‍රියාත්මක වන කොටස
    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        
        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = "🌙";
        }
    });
}

// කවිය පිටපත් කිරීම සඳහා වන නව ක්‍රියාකාරීත්වය
function copyPoem(button) {
    const card = button.closest('.poem-card');
    const title = card.querySelector('h3').innerText;
    const content = card.querySelector('.poem-content').innerText;
    
    const fullText = `📝 ${title}\n\n${content}`;
    
    navigator.clipboard.writeText(fullText).then(() => {
        // Micro-interaction: බටන් එක ✅ ලෙස තාවකාලිකව මාරු කිරීම
        const icon = button.querySelector('i');
        icon.className = "fas fa-check";
        button.style.color = "#2ecc71"; // කොළ පාට වීම
        
        setTimeout(() => {
            icon.className = "far fa-copy";
            button.style.color = ""; // පරණ පාටට හැරීම
        }, 2000);
    }).catch(err => {
        console.error("Could not copy: ", err);
    });
}

// ==========================================
// 7. දිනපතා වැකිය (Daily Quote) පද්ධතිය - A ක්‍රමය
// ==========================================
// =========================================================================
// 7. දිනපතා වැකිය Markdown (.md) ෆයිල් එකකින් ලබාගැනීමේ පද්ධතිය
// =========================================================================
async function displayDailyQuote() {
    const quoteElement = document.getElementById("daily-quote");
    if (!quoteElement) return; // index.html නොවන වෙනත් පිටුවක නම් ක්‍රියාත්මක නොවේ

    try {
        // 🌐 1. quotes.md ෆයිල් එක fetch කර දත්ත ලබා ගැනීම
        const response = await fetch('quotes.md');
        if (!response.ok) throw new Error('Quotes ෆයිල් එක කියවීමට නොහැකි විය');
        
        const textData = await response.text();
        
        // 📝 2. මුළු Text එකම පේළියෙන් පේළියට කඩලා Array එකකට ගැනීම
        // filter(line => line.trim() !== "") මඟින් හිස් පේළි තිබුනොත් ඒවා ඉවත් කරයි
        const quotesArray = textData.split('\n').map(line => line.trim()).filter(line => line !== "");
        
        if (quotesArray.length === 0) return;

        // 📅 3. අද දිනය (Date of the month) ලබා ගැනීම (1 - 31)
        const today = new Date().getDate();
        
        // දිනය අනුව ලිස්ට් එකෙන් වැකියක් තෝරා ගැනීම
        const quoteIndex = today % quotesArray.length;
        const todayQuote = quotesArray[quoteIndex];
        
        // 🔮 4. වෙබ් අඩවියේ ලස්සනට ප්‍රදර්ශනය කිරීම
        quoteElement.innerHTML = `“ ${todayQuote} ”`;
        
    } catch (error) {
        console.error('Error fetching quote:', error);
        // යම් හෙයකින් ෆයිල් එක ලෝඩ් නොවුනොත් පෙන්වන්න Default වැකියක්
        quoteElement.innerHTML = `“ තාක්ෂණයේ රිද්මය සහ හදවතේ සංවේදනා අකුරු කල අවකාශය. ”`;
    }
}

// පිටුව ලෝඩ් වූ විගස වැකිය පෙන්වීමට ක්‍රියාත්මක කිරීම
document.addEventListener("DOMContentLoaded", () => {
    displayDailyQuote();
});
