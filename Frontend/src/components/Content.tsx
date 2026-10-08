import { useEffect, useState } from "react";
import banner1 from "../images/banner1.avif";
import banner2 from "../images/banner2.avif";
import banner3 from "../images/banner3.webp";
import banner4 from "../images/banner4.webp";
import "./Content.css";
import { getProductsByType } from "../services/cat_subcat_service";

const banners = [banner1, banner2, banner3, banner4];
// 

interface Product {
  _id: string;
  pname: string;
  pimg: string;
  price: number;
  qty: string;
  color: string;
  rating: string;
  subCatId: string;
  type: string;
}

const PRODUCTS_TO_SHOW = 4;

export default function Content() {
  const [activeIndex, setActiveIndex] = useState(0);

  const [fastSellingProducts, setFastSellingProducts] = useState<Product[]>([]);
  const [upcomingProducts, setUpcomingProducts] = useState<Product[]>([]);

  const [fastSellingIndex, setFastSellingIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const loadingProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const fastSellingProductResp = await getProductsByType("fastselling");
        //console.log("fastSellingProductResp: ", fastSellingProductResp.data);
        setFastSellingProducts(fastSellingProductResp.data);

        const upcomingProductsResp = await getProductsByType("upcoming");
        console.log("upComingProductsResp:", upcomingProductsResp.data);
        setUpcomingProducts(upcomingProductsResp.data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadingProducts();
  }, []);

  const showPrevious = () => {
    setActiveIndex(
      (currentIndex) => (currentIndex - 1 + banners.length) % banners.length,
    );
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
  };

  const showPreviousFastSelling = () => {
    setFastSellingIndex((currentIndex) => {
      // If already at beginning,
      // go to the last possible position

      if (currentIndex === 0) {
        return Math.max(0, fastSellingProducts.length - PRODUCTS_TO_SHOW);
      }

      return currentIndex - 1;
    });
  };

  // =====================================================
  // FAST SELLING - NEXT
  // =====================================================

  const showNextFastSelling = () => {
    setFastSellingIndex((currentIndex) => {
      const maxIndex = Math.max(
        0,
        fastSellingProducts.length - PRODUCTS_TO_SHOW,
      );

      return Math.min(currentIndex + 1, maxIndex);
    });
  };

  // =====================================================
  // UPCOMING - PREVIOUS
  // =====================================================

  const showPreviousUpcoming = () => {
    setUpcomingIndex((currentIndex) => {
      if (currentIndex === 0) {
        return Math.max(0, upcomingProducts.length - PRODUCTS_TO_SHOW);
      }

      return currentIndex - 1;
    });
  };

  // =====================================================
  // UPCOMING - NEXT
  // =====================================================

  const showNextUpcoming = () => {
    setUpcomingIndex((currentIndex) => {
      const maxIndex = Math.max(0, upcomingProducts.length - PRODUCTS_TO_SHOW);

      return Math.min(currentIndex + 1, maxIndex);
    });
  };

  // =====================================================
  // GET ONLY 4 FAST SELLING PRODUCTS
  // =====================================================

  const visibleFastSellingProducts = fastSellingProducts.slice(
    fastSellingIndex,
    fastSellingIndex + PRODUCTS_TO_SHOW,
  );

  // =====================================================
  // GET ONLY 4 UPCOMING PRODUCTS
  // =====================================================

  const visibleUpcomingProducts = upcomingProducts.slice(
    upcomingIndex,
    upcomingIndex + PRODUCTS_TO_SHOW,
  );

  return (
    <div>
      <main className="banner-carousel h-70 " aria-label="Featured banners">
        <img
          className="banner-carousel__image"
          src={banners[activeIndex]}
          alt={`Promotional banner ${activeIndex + 1}`}
        />
        <button
          className="banner-carousel__control banner-carousel__control--previous"
          type="button"
          aria-label="Previous banner"
          onClick={showPrevious}
        >
          <span aria-hidden="true">&#8249;</span>
        </button>
        <button
          className="banner-carousel__control banner-carousel__control--next"
          type="button"
          aria-label="Next banner"
          onClick={showNext}
        >
          <span aria-hidden="true">&#8250;</span>
        </button>
      </main>
      <div
        className="banner-carousel__indicators d-block"
        aria-label="Choose a banner"
      >
        {banners.map((_, index) => (
          <button
            className={`banner-carousel__indicator${index === activeIndex ? " is-active" : ""}`}
            key={index}
            type="button"
            aria-label={`Show banner ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <section className="products-container">
        <div className="product-section">
          Test
          <div className="product-section__header">
            <h2>Fast Selling</h2>
            <div className="product-section__arrows">
              <button
                type="button"
                className="product-arrow"
                onClick={showPreviousFastSelling}
                disabled={fastSellingProducts.length <= PRODUCTS_TO_SHOW}
              >
                &#8249;
              </button>
              <button
                type="button"
                className="product-arrow"
                onClick={showNextFastSelling}
                disabled={fastSellingProducts.length <= PRODUCTS_TO_SHOW}
              >
                &#8250;
              </button>
            </div>
          </div>
          {loading && (
            <p className="product-message">Loading fast selling products...</p>
          )}
          {!loading && fastSellingProducts.length === 0 && (
            <p className="product-message">No fast selling products found.</p>
          )}
          {!loading && (
            <div className="products-grid">
              {visibleFastSellingProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-card__image-container">
                    <img
                      src={`src/images/productImages/${product.pimg}`}
                      alt={product.pname}
                      className="product-card__image"
                    />
                  </div>
                  <h3>{product.pname}</h3>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-rating">⭐ {product.rating}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="product-section">
          <div className="product-section__header">
            <h2>Upcoming Products</h2>
            <div className="product-section__arrows">
              <button
                type="button"
                className="product-arrow"
                onClick={showPreviousUpcoming}
                disabled={upcomingProducts.length <= PRODUCTS_TO_SHOW}
              >
                &#8249;
              </button>

              <button
                type="button"
                className="product-arrow"
                onClick={showNextUpcoming}
                disabled={upcomingProducts.length <= PRODUCTS_TO_SHOW}
              >
                &#8250;
              </button>
            </div>
          </div>
          {loading && (
            <p className="product-message">Loading upcoming products...</p>
          )}
          {!loading && upcomingProducts.length === 0 && (
            <p className="product-message">No upcoming products found.</p>
          )}
          {!loading && (
            <div className="products-grid">
              {visibleUpcomingProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-card__image-container">
                    <img
                      src={getProductImage(product.pimg)}
                      alt={product.pname}
                      className="product-card__image"
                    />
                  </div>
                  <h3>{product.pname}</h3>
                  <p className="product-price">₹{product.price}</p>

                  <p className="product-rating">⭐ {product.rating}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {error && <p className="product-error">{error}</p>}
      </section>
    </div>
    
  );
}
