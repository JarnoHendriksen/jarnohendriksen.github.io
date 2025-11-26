

function loadArticles() {
    fetch('./content/articles.json')
        .then(response => response.json())
        .then(articles => {
            console.log(articles);
        })
        .catch(error => console.error('Error loading articles:', error));
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}