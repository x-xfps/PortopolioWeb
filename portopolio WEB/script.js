document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsToTranslate = document.querySelectorAll('[data-id], [data-en]');
    
    function detectUserLanguage() {
        const userLang = navigator.language || navigator.userLanguage;
        if (userLang.toLowerCase().includes('id') || userLang.toLowerCase().includes('in')) {
            return 'id';
        } else {
            return 'en';
        }
    }
    
    let currentLang = detectUserLanguage();
    
    function changeLanguage(lang) {
        currentLang = lang;
        
        langButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            }
        });
        
        elementsToTranslate.forEach(element => {
            if (lang === 'id') {
                const idText = element.getAttribute('data-id-text');
                if (idText) {
                    element.innerHTML = idText;
                }
            } else if (lang === 'en') {
                const enText = element.getAttribute('data-en');
                if (enText) {
                    element.innerHTML = enText;
                }
            }
        });
        
        document.documentElement.setAttribute('lang', lang);
        sessionStorage.setItem('preferredLanguage', lang);
    }
    
    const savedLang = sessionStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
    }
    
    changeLanguage(currentLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
});

function toggleDescription(id) {
    const description = document.getElementById(id);
    const button = description.previousElementSibling;
    
    description.classList.toggle('show');
    
    if (description.classList.contains('show')) {
        const currentLang = document.documentElement.getAttribute('lang') || 'id';
        if (currentLang === 'id') {
            button.textContent = 'Sembunyikan';
        } else {
            button.textContent = 'Hide';
        }
        button.classList.add('active');
    } else {
        const currentLang = document.documentElement.getAttribute('lang') || 'id';
        if (currentLang === 'id') {
            button.textContent = 'Baca Selengkapnya';
        } else {
            button.textContent = 'Read More';
        }
        button.classList.remove('active');
    }
}