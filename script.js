/* =====================================================
   MACKBOBBY AUTOS
   VEHICLES + SEARCH + FILTER + GALLERY
   WHATSAPP + MOBILE MENU + SCROLL FEATURES
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const carsGrid =
    document.getElementById("carsGrid");

const carSearch =
    document.getElementById("carSearch");

const brandFilter =
    document.getElementById("brandFilter");

const modal =
    document.getElementById("modal");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalSmallTitle =
    document.getElementById("modalSmallTitle");

const modalDescription =
    document.getElementById("modalDescription");

const enquiryButton =
    document.getElementById("enquiryButton");

const closeModal =
    document.getElementById("closeModal");

const prevImage =
    document.getElementById("prevImage");

const nextImage =
    document.getElementById("nextImage");

const thumbnails =
    document.getElementById("thumbnails");

const imageCounter =
    document.getElementById("imageCounter");

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("mainNav");

const backToTop =
    document.getElementById("backToTop");


/* =====================================================
   WHATSAPP NUMBER
===================================================== */

const whatsappNumber =
    "2347038030664";


/* =====================================================
   VEHICLES
   EXISTING INFORMATION KEPT
===================================================== */

const cars = [

    {
        name: "LEXUS RX350",

        images: [

            "images/Lexus-RX-350-1.jpg",

            "images/Lexus-RX-350-2.jpg",

            "images/Lexus-RX-350-3.jpg",

            "images/Lexus-RX-350-4.jpg",

            "images/Lexus-RX-350-5.jpg",

            "images/Lexus-RX-350-6.jpg",

            "images/Lexus-RX-350-7.jpg"

        ],

        details: `
            DIRECT TOKS BEST DEAL IN LAGOS<br>
            {JULY 2026 ON CUSTOMS}<br><br>

            LEXUS RX350<br>
            YEAR - 2011<br><br>

            📌 BLACK INTERIOR<br>
            📌 ALL WHEEL DRIVE<br>
            📌 PARKING SENSORS<br>
            📌 CATALYST AND 02 SENSORS INTACT<br>
            📌 RARE AC VENTS<br><br>

            PRICE IS 17.2M GOOD DEAL 💦
        `
    },


    {
        name: "TOYOTA RAV4 LIMITED",

        images: [

            "images/Toyota-RAV4-Limited-1.jpg",

            "images/Toyota-RAV4-Limited-2.jpg",

            "images/Toyota-RAV4-Limited-3.jpg",

            "images/Toyota-RAV4-Limited-4.jpg",

            "images/Toyota-RAV4-Limited-5.jpg",

            "images/Toyota-RAV4-Limited-6.jpg",

            "images/Toyota-RAV4-Limited-7.jpg",

            "images/Toyota-RAV4-Limited-8.jpg"

        ],

        details: `
            FOREIGN USED 🇺🇸<br><br>

            Toyota Rav4 Limited<br>
            Year 2018<br>
            360 Degree Camera<br>
            Tan Interior<br>
            Accident Free<br>
            Request Full Pics Via DM<br><br>

            PRICE 25.5M NAIRA ONLY
        `
    },


    {
        name: "TOYOTA COROLLA",

        images: [

            "images/Corolla-1.jpg",

            "images/Corolla-2.jpg",

            "images/Corolla-3.jpg",

            "images/Corolla-4.jpg",

            "images/Corolla-5.jpg",

            "images/Corolla-6.jpg"

        ],

        details: ``
    }

];


/* =====================================================
   GALLERY STATE
===================================================== */

let currentCar = 0;

let currentImage = 0;


/* =====================================================
   DISPLAY CARS
===================================================== */

function displayCars() {

    const searchText =
        carSearch.value
            .toLowerCase()
            .trim();


    const selectedBrand =
        brandFilter.value;


    carsGrid.innerHTML = "";


    const filteredCars =
        cars.filter(
            car => {

                const matchesSearch =
                    car.name
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                const matchesBrand =
                    selectedBrand === "all" ||
                    car.name
                        .toLowerCase()
                        .includes(
                            selectedBrand
                        );


                return (
                    matchesSearch &&
                    matchesBrand
                );

            }
        );


    /* =================================================
       NO RESULTS
    ================================================== */

    if (
        filteredCars.length === 0
    ) {

        carsGrid.innerHTML = `

            <div class="no-results">

                <h3>
                    NO VEHICLE FOUND
                </h3>

                <p>
                    Try another vehicle name
                    or brand.
                </p>

            </div>

        `;

        return;
    }


    /* =================================================
       CREATE CAR CARDS
    ================================================== */

    filteredCars.forEach(
        car => {

            const originalIndex =
                cars.indexOf(car);


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "car-card";


            card.innerHTML = `

                <img
                    src="${car.images[0]}"
                    alt="${car.name}"
                    class="car-image"
                    loading="lazy"
                >


                <div class="car-info">

                    <h3>
                        ${car.name}
                    </h3>


                    <button
                        class="enquire-btn"
                        type="button"
                    >
                        VIEW VEHICLE →
                    </button>

                </div>

            `;


            const button =
                card.querySelector(
                    ".enquire-btn"
                );


            button.addEventListener(
                "click",
                function() {

                    openCar(
                        originalIndex
                    );

                }
            );


            carsGrid.appendChild(
                card
            );

        }
    );


    /* Re-enable reveal animation */

    setupRevealItems();

}


/* =====================================================
   OPEN VEHICLE
===================================================== */

function openCar(
    carIndex
) {

    currentCar =
        carIndex;


    currentImage =
        0;


    const car =
        cars[currentCar];


    modalTitle.textContent =
        car.name;


    modalSmallTitle.textContent =
        `${car.images.length} PHOTOS`;


    modalDescription.innerHTML =
        car.details;


    updateGallery();


    /* =================================================
       WHATSAPP ENQUIRY
    ================================================== */

    const message =
        `Hello MACKBOBBY AUTOS, I am interested in ${car.name}. Please provide more information.`;


    enquiryButton.href =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


    modal.classList.add(
        "show"
    );


    document.body.classList.add(
        "no-scroll"
    );

}


/* =====================================================
   UPDATE GALLERY
===================================================== */

function updateGallery() {

    const car =
        cars[currentCar];


    modalImage.src =
        car.images[currentImage];


    modalImage.alt =
        car.name;


    imageCounter.textContent =
        `${currentImage + 1} / ${car.images.length}`;


    thumbnails.innerHTML = "";


    car.images.forEach(
        (
            image,
            index
        ) => {

            const thumb =
                document.createElement(
                    "img"
                );


            thumb.src =
                image;


            thumb.alt =
                `${car.name} photo ${index + 1}`;


            thumb.className =
                "thumbnail";


            if (
                index === currentImage
            ) {

                thumb.classList.add(
                    "active"
                );

            }


            thumb.addEventListener(
                "click",
                function() {

                    currentImage =
                        index;


                    updateGallery();

                }
            );


            thumbnails.appendChild(
                thumb
            );

        }
    );

}


/* =====================================================
   NEXT IMAGE
===================================================== */

nextImage.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();


        const car =
            cars[currentCar];


        currentImage++;


        if (
            currentImage >=
            car.images.length
        ) {

            currentImage = 0;

        }


        updateGallery();

    }
);


/* =====================================================
   PREVIOUS IMAGE
===================================================== */

prevImage.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();


        const car =
            cars[currentCar];


        currentImage--;


        if (
            currentImage < 0
        ) {

            currentImage =
                car.images.length - 1;

        }


        updateGallery();

    }
);


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeCarModal() {

    modal.classList.remove(
        "show"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


closeModal.addEventListener(
    "click",
    closeCarModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeCarModal();

        }

    }
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            !modal.classList.contains(
                "show"
            )
        ) {

            return;

        }


        if (
            event.key === "Escape"
        ) {

            closeCarModal();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextImage.click();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            prevImage.click();

        }

    }
);


/* =====================================================
   SEARCH
===================================================== */

carSearch.addEventListener(
    "input",
    displayCars
);


/* =====================================================
   BRAND FILTER
===================================================== */

brandFilter.addEventListener(
    "change",
    displayCars
);


/* =====================================================
   MOBILE MENU
===================================================== */

menuBtn.addEventListener(
    "click",
    function() {

        nav.classList.toggle(
            "open"
        );

    }
);


/* =====================================================
   CLOSE MOBILE MENU
===================================================== */

document
    .querySelectorAll(
        ".nav a"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                function() {

                    nav.classList.remove(
                        "open"
                    );

                }
            );

        }
    );


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav a"
    );


window.addEventListener(
    "scroll",
    function() {

        let current =
            "home";


        sections.forEach(
            section => {

                const sectionTop =
                    section.offsetTop - 180;


                if (
                    window.scrollY >=
                    sectionTop
                ) {

                    current =
                        section.id;

                }

            }
        );


        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute(
                        "href"
                    ) ===
                    `#${current}`
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener(
    "scroll",
    function() {

        if (
            window.scrollY > 500
        ) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    function() {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

let revealObserver;


function setupRevealItems() {

    const revealItems =
        document.querySelectorAll(
            ".section-top, .car-card, .trust-card, .about-grid, .contact-card, .intro-item"
        );


    if (
        revealObserver
    ) {

        revealObserver.disconnect();

    }


    revealObserver =
        new IntersectionObserver(
            function(entries) {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealItems.forEach(
        item => {

            if (
                !item.classList.contains(
                    "reveal-item"
                )
            ) {

                item.classList.add(
                    "reveal-item"
                );

            }


            revealObserver.observe(
                item
            );

        }
    );

}


/* =====================================================
   START WEBSITE
===================================================== */

displayCars();

setupRevealItems();