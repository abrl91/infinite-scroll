const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'MY_API_KEY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attribute) {
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos () {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (err) {
        console.log(err, 'err');
    }
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
