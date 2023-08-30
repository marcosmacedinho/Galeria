const uploadButton = document.getElementById('uploadButton');
const removalModeButton = document.getElementById('removalModeButton');
const gallery = document.querySelector('.gallery');
const storedImages = JSON.parse(localStorage.getItem('images')) || [];
let isRemovalMode = false;
let selectedImages = [];

function toggleRemovalMode() {
  isRemovalMode = !isRemovalMode;
  if (isRemovalMode) {
    removalModeButton.classList.add('active');
  } else {
    removalModeButton.classList.remove('active');
    selectedImages = [];
  }
  const images = document.querySelectorAll('.gallery img');
  images.forEach(image => {
    if (isRemovalMode) {
      image.classList.add('selectable');
    } else {
      image.classList.remove('selectable', 'selected');
      removeIcon.remove();
    }
  });
}

removalModeButton.addEventListener('click', toggleRemovalMode);

function saveImagesToLocalStorage() {
  localStorage.setItem('images', JSON.stringify(storedImages));
}

function createImageContainer(imageSrc) {
  const imgContainer = document.createElement('div');
  imgContainer.classList.add('image-container');

  const img = document.createElement('img');
  img.src = imageSrc;
  img.alt = 'Foto';

  imgContainer.appendChild(img);

  img.addEventListener('click', () => {
    if (isRemovalMode) {
      const index = storedImages.indexOf(imageSrc);
      if (index > -1) {
        storedImages.splice(index, 1);
        localStorage.setItem('images', JSON.stringify(storedImages));
        imgContainer.remove();
      }
    }
  });

  return imgContainer;
}

storedImages.forEach(imageSrc => {
  const imgContainer = createImageContainer(imageSrc);
  gallery.appendChild(imgContainer);
});

uploadButton.addEventListener('click', () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.multiple = true;

  input.addEventListener('change', () => {
    const files = Array.from(input.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = event => {
        const imgContainer = createImageContainer(event.target.result);
        gallery.appendChild(imgContainer);
        storedImages.push(event.target.result);
        saveImagesToLocalStorage(); // Salva as imagens após fazer upload
      };
      reader.readAsDataURL(file);
    });
  });

  input.click();
});
