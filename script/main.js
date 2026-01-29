
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

function ShowImgModal(imgElement) {
    let imgSrc = imgElement.getAttribute("src");

    let img = document.getElementById("img-viewer-img");
    img.setAttribute("src", imgSrc);

    let imgModal = document.getElementById("image-viewer-parent");
    imgModal.style.display = 'flex';
}

function HideImgModal() {
    let imgModal = document.getElementById("image-viewer-parent");
    imgModal.style.display = 'none';
}