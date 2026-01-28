
function Init() {
    ShowSection("section_home");
}

function ShowSection(id) {
    let sections = document.getElementsByTagName("section");

    for (let s of sections) {
        if (s.getAttribute("id") == id)
            s.style.display = "block";
        else
            s.style.display = "none";
    }
}