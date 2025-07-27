(() => {

 const loadJQueryAndInit = () => {
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.onload = () => {
      init();
    };
    document.head.appendChild(script);
  };

  

     const init = async() => {
        buildCSS();
        await getProductDetail();
        setEvents();
    };

    const buildHTML = (data) => {
        let $productDetail = $('.product-detail');
            
            if (!data || data.length === 0) {
                console.error('ürün verisi bulunamadı');
                return;
            }

    const html = `
    <div class="container">
      <div class="carousel-header">
          <h2>Bunlar da hoşunuza gidebilir</h2>
        </div>
        <div class="carousel-wrapper">
        <button class="carousel-button-left">&#8249;</button>
        <div class="carousel-track">
            ${
            data.map(product => `
                <div class="product-item" data-id="${product.id}">
                <a href="${product.url}" target="_blank" data-id="${product.id}">
                <img src="${product.img}" alt="${product.name}" class="product-image">
                </a>
                <p class="product-name">${product.name}</p>
                <p class="product-price">${product.price} TRY</p>
                
                <svg class="add-favorite-btn" data-id="${product.id}" width="28" height="28" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                </svg>
                </div>
            `).join('')
            }
        </div>
        <button class="carousel-button-right">&#8250;</button>
        </div>
    </div>
    `;

         $productDetail.after(html);

    };


    const buildCSS = () => {
        const css = `
            body {
                background-color: #f4f4f4;
                }


            .container {
                display: flex;
                flex-direction: column;
                width: 100%;
                padding: 10px;
                color: white;
              justify-content: center;
              align-items: center;
              text-align: center;
      
              
            }


    .carousel-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        width: 100%;
        max-width: 1100px; 
        margin: 0 auto;
        }

    .carousel-track {
        display: flex;
        transition: transform 0.3s ease;
        gap: 8px; 
        padding: 10px;
        scroll-behavior: smooth;
        overflow-x: auto;
        white-space: nowrap;

    }
    .carousel-track::-webkit-scrollbar {
        display: none; 
        }
    .carousel-button-left {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        border: none;
        padding: 10px 12px;
        cursor: pointer;
        z-index: 1;
        color: rgba(77, 73, 73, 0.8);
        font-size: 45px;
        background-color: transparent;
        }
    .carousel-button-left:hover{
            color: rgba(77, 73, 73, 0.2);
            border-radius: 0;
        }
    .carousel-button-right{
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        border: none;
        cursor: pointer;
        color: rgba(77, 73, 73, 0.8);
        font-size: 45px;
        padding: 10px;
        background-color: transparent;

        }
    .carousel-button-right:hover{
             color: rgba(77, 73, 73, 0.2);
              border-radius: 0;
        }

     .product-item {
            position: relative;
            width: 200px; 
            flex-shrink: 0;   
            background-color: white;
            text-align: start;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            height: 340px;

        }

    .product-image {
        width: 100%;
        height: 240px;
        object-fit:cover;
        object-position: center; 
    }

    .product-name {
        margin-top: 0;
        width: 180px;
        padding: 5px;
        margin-left: 5px;
        font-size: 12px;
        color: #4a4a4a;
        flex-grow: 1;
        line-height: 1.1;
        white-space: normal;      
        overflow: hidden;       
        text-overflow: ellipsis;
        width: 100%;  
    }

    .product-price {
        margin-left: 5px;
        padding:5px !important;
        font-weight: bold;
        font-size: 16px;
        color: #1976d2;;
        text-align: start;
        white-space: nowrap;
         
    }
        .product-item a {
            text-decoration: none;
            color: inherit;
        }
  .add-favorite-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 28px;
    height: 28px;
    color: gray;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: white;
    border-radius: 6px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-favorite-btn:hover {
    color: #0d61dfff;
    background-color: rgba(70, 137, 238, 0.1);
}

.add-favorite-btn.active {
    color: #074eb9ff;
}

.add-favorite-btn svg {
    width: 100%;
    height: 100%;
}

        
    .carousel-header {
        max-width: 1100px;
        width: 100%;
        padding-left: 10px;
    }
    .container h2 {
        text-align: left; 
        font-size: 3rem;
        color: #4a4a4a;
    }
        @media (max-width: 480px) {
            .product-item {
                width: 150px;
                height: 280px;
            }
            .product-image {
                height: 180px;
                object-fit: cover;
                object-position: center;
            }
            .product-name {
                font-size: 10px;
            }
            .product-price {
                font-size: 12px;
            }
                 .container h2 {
        text-align: left; 
        font-size: 2.5rem;
        color: #4a4a4a;
    }
        }
       
         @media (min-width: 481px) and (max-width: 767px) {
    .product-item {
        width: 150px;
        height: 300px;
    }
    .product-image {
        height: 200px;
        object-fit: cover;
        object-position: center;
    }
    .product-name {
        font-size: 12px;
    }
    .product-price {
        font-size: 14px;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .product-item {
        width: 180px;
        height: 340px;
    }
    .product-image {
        height: 240px;
        object-fit: cover;
        object-position: center;
    }
    .product-name {
        font-size: 12px;
    }
    .product-price {
        font-size: 16px;
    }
}


            @media (min-width: 1024px) {
    .product-image {
        height: 280px;
    }
    .product-item {
        width: 200px;
        height: 380px;
    }
}


            
        `;
        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };


    const getProductDetail = async () => {
            let myStorage = JSON.parse(localStorage.getItem('productDetail'));
        try {
            if (!myStorage) {
            const res = await fetch("https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json");
            const data = await res.json();
            localStorage.setItem('productDetail', JSON.stringify(data));
            myStorage = data;
            }

            buildHTML(myStorage);   
            getFavorites();

        } catch (error) {
            console.error('Error: ', error);
        }
    };
   

    const getFavorites = () => {
       const favorites = JSON.parse(localStorage.getItem("product")) || [];
        favorites.forEach(id => {
        const $favoriteBtn = $(`.add-favorite-btn[data-id='${id}']`);
         $favoriteBtn.addClass("active");
        $favoriteBtn.find("path").attr("fill", "#074eb9ff");
        });
    };

    const setEvents = () => {

      $(".carousel-button-left").click(function () {
        $(".carousel-track")[0].scrollLeft -= 200;
      });
      $(".carousel-button-right").click(function () {
        $(".carousel-track")[0].scrollLeft += 200;
      });

            
        $(".add-favorite-btn").click(function () {
        $(this).toggleClass("active");

        const isActive = $(this).hasClass("active");
        $(this).find("path").attr("fill", isActive ? "#074eb9ff" : "none");

        const productId = $(this).data("id");

        let favorites = [];
        favorites = JSON.parse(localStorage.getItem("product")) || [];

        if (isActive) {
         if (!favorites.includes(productId)) {
            favorites.push(productId);
            }
        } else {
            favorites = favorites.filter((id) => id !== productId);
        }

        localStorage.setItem("product", JSON.stringify(favorites));
        });


};
    if (window.jQuery) {
    init();
   } else {
    loadJQueryAndInit();
   }

})();