

function loadArticles() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.setAttribute("class", "dark-mode");
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        setDarkMode(event.matches);
    });

    fetch('./content/articles.json')
        .then(response => response.json())
        .then(response => {
            let articles = response.articles;
            createLinks(articles);

            for (let art of articles) {
                createArticle(art.id, art.title, art.images, art.content, art.source_link);
            }
        })
        .catch(error => console.error('Error loading articles:', error));

    // let articles = JSON.parse(jsonArticles).articles;
    // createLinks(articles);

    // for (let art of articles) {
    //     createArticle(art.id, art.title, art.images, art.content, art.source_link);
    // }

    // Open the page with the topmost article
    let sidebar = document.getElementsByClassName("sidebar")[0];
    let topLink = sidebar.getElementsByTagName("a")[0];
    switchArticles(topLink);
}

function setDarkMode(makeDark) {
    if (makeDark)
        document.body.setAttribute("class", "dark-mode");
    else if (makeDark === null) {
        if (document.body.getAttribute("class") == "") document.body.setAttribute("class", "dark-mode");
        else document.body.setAttribute("class", "");
    }
    else
        document.body.setAttribute("class", "");
}

function createArticle(id, title, images, content, source) {
    let heading = document.createElement("h2");
    heading.appendChild(document.createTextNode(title));

    let paragraph = document.createElement("p");
    paragraph.appendChild(document.createTextNode(content));

    let figureSection = document.createElement("div");
    figureSection.setAttribute("class", "figure-section");

    for (let i of images) {
        let fig = document.createElement("figure");
        let img = document.createElement("img");
        img.setAttribute("src", "./content/images/" + i.src);
        img.setAttribute("alt", i.alt);

        let hr = document.createElement("hr");

        let cap = document.createElement("figcaption");
        cap.appendChild(document.createTextNode(i.caption));

        fig.appendChild(img);
        fig.appendChild(hr);
        fig.appendChild(cap);

        figureSection.appendChild(fig);
    }

    let sourceBtn = undefined;

    if (source !== ""){
        sourceBtn = document.createElement("a");
        sourceBtn.setAttribute("class", "button");
        sourceBtn.setAttribute("href", source);
        sourceBtn.setAttribute("target", "_blank");
        sourceBtn.appendChild(document.createTextNode("GitHub"));
    }

    let article = document.createElement("div");
    article.setAttribute("id", id);
    article.setAttribute("class", "article-main");

    article.appendChild(heading);
    article.appendChild(figureSection);
    article.appendChild(paragraph);
    if (source !== "") article.appendChild(sourceBtn);

    let section = document.getElementsByTagName("section")[0];
    section.appendChild(article);
}

function switchArticles(e) {
    let link = undefined;

    if (e.currentTarget === undefined)
        link = e;
    else
        link = e.currentTarget;

    console.log(link);
    let id = link.getAttribute("data-assoc-art-id");

    console.log(id);
    if (id === null) return;

    let articles = document.getElementsByTagName("section")[0].getElementsByClassName("article-main");
    console.log(articles);

    for (let art of articles) {
        console.log(id);
        console.log(art.getAttribute("id"));
        if (art.getAttribute("id") === id) {
            art.style.display = "block";
        }
        else {
            art.style.display = "none";
        }
    }
}

function createLinks(articles) {
    let links = []

    for (let a of articles) {
        let date = new Date(a.date);
        let linkData = {
            id: a.id,
            title: a.title,
            date: date
        };

        links.push(linkData);
    }

    // Sort links by recency
    links.sort(function(a,b) {
        return b.date - a.date;
    });

    let currentYear = 3000;

    let sidebar = document.getElementsByClassName("sidebar")[0];

    for (let l of links) {
        if (l.date.getFullYear() < currentYear) {
            currentYear = l.date.getFullYear();
            let yearHeading = document.createElement("h3");
            yearHeading.appendChild(document.createTextNode(currentYear));
            sidebar.appendChild(yearHeading);
        }

        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("data-assoc-art-id", l.id);
        link.appendChild(document.createTextNode(l.title));
        link.addEventListener("click", (e) => switchArticles(e));

        sidebar.appendChild(link);
    }
}