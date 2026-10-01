import { useEffect, useState } from "react";
import banner1 from "../images/banner1.avif";
import banner2 from "../images/banner2.avif";
import banner3 from "../images/banner3.webp";
import banner4 from "../images/banner4.webp";
import "./Content.css";

const banners = [banner1, banner2, banner3, banner4];

export default function Content() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + banners.length) % banners.length);
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % banners.length);
  };

  return (
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
      <div className="banner-carousel__indicators" aria-label="Choose a banner">
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
    </main>
  )
}
