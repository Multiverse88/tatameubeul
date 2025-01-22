document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Gallery data
    const galleryData = [
        {
            type: 'image',
            src: 'public/gallery1.jpg',
            category: 'custom',
            title: 'Sofa Custom Model 1'
        },
        {
            type: 'image',
            src: 'public/gallery2.jpg',
            category: 'reparasi',
            title: 'Proyek Reparasi 1'
        },
        {
            type: 'image',
            src: 'public/gallery3.jpg',
            category: 'ganti-kain',
            title: 'Ganti Kain Model 1'
        },
        {
            type: 'image',
            src: 'public/gallery4.jpg',
            category: 'custom',
            title: 'Sofa Custom Model 2'
        },
        {
            type: 'image',
            src: 'public/gallery5.jpg',
            category: 'reparasi',
            title: 'Proyek Reparasi 2'
        },
        {
            type: 'image',
            src: 'public/gallery6.jpg',
            category: 'ganti-kain',
            title: 'Ganti Kain Model 2'
        },
        {
            type: 'video',
            src: 'public/video1.mp4',
            thumbnail: 'public/gallery7.jpg',
            category: 'custom',
            title: 'Proses Custom Sofa'
        },
        {
            type: 'video',
            src: 'public/video2.mp4',
            thumbnail: 'public/gallery8.jpg',
            category: 'reparasi',
            title: 'Proses Reparasi Sofa'
        },
        {
            type: 'video',
            src: 'public/video3.mp4',
            thumbnail: 'public/gallery9.jpg',
            category: 'ganti-kain',
            title: 'Proses Ganti Kain'
        }
    ];

    // Initialize gallery
    const galleryGrid = document.getElementById('galleryGrid');
    
    function createGalleryItem(item) {
        const div = document.createElement('div');
        div.className = 'gallery-item group cursor-pointer';
        div.dataset.category = item.category;
        
        const isVideo = item.type === 'video';
        const thumbnailSrc = isVideo ? item.thumbnail : item.src;
        
        div.innerHTML = `
            <div class="relative overflow-hidden rounded-xl shadow-lg aspect-4/5">
                <img src="${thumbnailSrc}" alt="${item.title}" class="w-full h-full object-cover transition-all duration-500 group-hover:scale-110">
                ${isVideo ? `
                    <div class="absolute inset-0 flex items-center justify-center">
                        <svg class="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                ` : ''}
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div class="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 class="text-xl font-light text-white mb-2">${item.title}</h3>
                    </div>
                </div>
            </div>
        `;
        
        div.addEventListener('click', () => openLightbox(item));
        return div;
    }

    // Populate gallery
    galleryData.forEach(item => {
        galleryGrid.appendChild(createGalleryItem(item));
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-gray-800', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            });
            button.classList.remove('bg-gray-200', 'text-gray-700');
            button.classList.add('bg-gray-800', 'text-white');

            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    let currentIndex = 0;

    function openLightbox(item) {
        currentIndex = galleryData.findIndex(i => i.src === item.src);
        updateLightboxContent(currentIndex);
        lightboxModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function updateLightboxContent(index) {
        const item = galleryData[index];
        
        // Reset media elements
        lightboxImage.classList.add('hidden');
        lightboxVideo.classList.add('hidden');
        lightboxVideo.pause();
        
        if (item.type === 'video') {
            lightboxVideo.querySelector('source').src = item.src;
            lightboxVideo.classList.remove('hidden');
            lightboxVideo.load();
            // Add margin to bottom to prevent controls from being hidden
            lightboxVideo.style.marginBottom = '50px';
            // Autoplay video when loaded
            lightboxVideo.addEventListener('loadedmetadata', () => {
                lightboxVideo.play().catch(e => {
                    console.log('Autoplay prevented:', e);
                    // Show play button or handle error
                });
            }, { once: true });
        } else {
            lightboxImage.src = item.src;
            lightboxImage.alt = item.title;
            lightboxImage.classList.remove('hidden');
            lightboxImage.style.marginBottom = '0';
        }
        
        lightboxCaption.querySelector('h3').textContent = item.title;
        
        // Update navigation buttons
        prevImage.style.display = index === 0 ? 'none' : '';
        nextImage.style.display = index === galleryData.length - 1 ? 'none' : '';
    }

    function closeLightboxModal() {
        lightboxModal.classList.add('hidden');
        document.body.style.overflow = '';
        // Pause video when closing lightbox
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0; // Reset video position
    }

    // Lightbox event listeners
    closeLightbox.addEventListener('click', closeLightboxModal);
    prevImage.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateLightboxContent(--currentIndex);
        }
    });
    nextImage.addEventListener('click', () => {
        if (currentIndex < galleryData.length - 1) {
            updateLightboxContent(++currentIndex);
        }
    });
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightboxModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxModal.classList.contains('hidden')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightboxModal();
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) {
                    updateLightboxContent(--currentIndex);
                }
                break;
            case 'ArrowRight':
                if (currentIndex < galleryData.length - 1) {
                    updateLightboxContent(++currentIndex);
                }
                break;
        }
    });
});
