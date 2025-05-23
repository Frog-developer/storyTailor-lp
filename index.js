// initialization

const RESPONSIVE_WIDTH = 1024;

let headerWhiteBg = false;
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH;
const collapseBtn = document.getElementById("collapse-btn");
const collapseHeaderItems = document.getElementById("collapsed-header-items");

function onHeaderClickOutside(e) {
  if (!collapseHeaderItems.contains(e.target)) {
    toggleHeader();
  }
}

function toggleHeader() {
  if (isHeaderCollapsed) {
    // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
    collapseHeaderItems.classList.add("opacity-100");
    collapseHeaderItems.style.width = "60vw";
    collapseBtn.classList.remove("bi-list");
    collapseBtn.classList.add("bi-x", "max-lg:tw-fixed");
    isHeaderCollapsed = false;

    setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1);
  } else {
    collapseHeaderItems.classList.remove("opacity-100");
    collapseHeaderItems.style.width = "0vw";
    collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed");
    collapseBtn.classList.add("bi-list");
    isHeaderCollapsed = true;
    window.removeEventListener("click", onHeaderClickOutside);
  }
}

function responsive() {
  if (window.innerWidth > RESPONSIVE_WIDTH) {
    collapseHeaderItems.style.width = "";
  } else {
    isHeaderCollapsed = true;
  }
}

window.addEventListener("resize", responsive);

// スムーズスクロールの処理を改善
document.querySelectorAll(".header-links").forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    
    // 別ページへのリンクの場合は対象外にする (# で始まらないもの、または #だけのもの)
    if (!targetId.startsWith('#') || targetId === '#') {
      return; // 通常のリンク動作を継続
    }
    
    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // モバイルメニューが開いている場合は閉じる
      if (window.innerWidth < RESPONSIVE_WIDTH && !isHeaderCollapsed) {
        toggleHeader();
      }

      // スクロール位置を計算
      const headerHeight = 80;
      const targetPosition = targetElement.offsetTop - headerHeight;

      // スムーズスクロールを実行
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // URLのハッシュを更新（オプション）
      history.pushState(null, "", targetId);
    }
  });
});

// ページロード時のハッシュリンクに対応
window.addEventListener("load", () => {
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      const headerHeight = 80;
      const targetPosition = targetElement.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
});

/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger);

gsap.to(".reveal-up", {
  opacity: 0,
  y: "100%",
});

const slideShowContainer = document.querySelector("#slideshow");

gsap.fromTo(
  ".slide-in",
  {
    y: "100%",
  },
  {
    y: "0%",
    duration: 1,
  }
);


const countries = [
  "冒険",
  "ファンタジー",
  "サスペンス",
  "ホラー",
  "恋愛",
  "歴史",
  "ミステリー",
  "コメディ",
  "ドラマ",
  "SF",
];

const places = [
  //   "アメリカ",
  //   "フランス",
];

const countriesContainer = document.querySelector(".countries-container");
const placeContainer = document.querySelector(".places-container");

function addSlidingPlace(place, container) {
  const imageContainer = `
            <div class="tw-min-w-fit tw-p-2 tw-px-3 tw-w-max tw-h-[50px]
                        tw-border-solid tw-border-[1px] tw-flex 
                        tw-rounded-md tw-border-black
                        tw-place-items-center tw-place-content-center
                        tw-overflow-clip sliding-image">
                ${place}
            </div>
    `;

  container.innerHTML += imageContainer;
}

countries.forEach((img) => addSlidingPlace(img, countriesContainer));
countries.forEach((img) => addSlidingPlace(img, countriesContainer));

places.forEach((img) => addSlidingPlace(img, placeContainer));
places.forEach((img) => addSlidingPlace(img, placeContainer));
places.forEach((img) => addSlidingPlace(img, placeContainer));

const swiper = new Swiper(".slideshow-container", {
  effect: "creative",
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: 20,
  creativeEffect: {
    prev: {
      shadow: true,
      translate: ["-20%", 0, -200],
      rotate: [0, 15, 0],
    },
    next: {
      translate: ["20%", 0, -200],
      rotate: [0, -15, 0],
    },
  },
  navigation: {
    nextEl: ".next",
    prevEl: ".prev",
  },
  autoplay: {
    delay: 3000,
  },
});

const faqAccordion = document.querySelectorAll(".faq-accordion");

faqAccordion.forEach(function (btn) {
  btn.addEventListener("click", function () {
    this.classList.toggle("active");

    // Toggle 'rotate' class to rotate the arrow
    let content = this.nextElementSibling;

    // content.classList.toggle('!tw-hidden')
    if (content.style.maxHeight === "200px") {
      content.style.maxHeight = "0px";
      content.style.padding = "0px 18px";
    } else {
      content.style.maxHeight = "200px";
      content.style.padding = "20px 18px";
    }
  });
});

// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section");

sections.forEach((sec) => {
  const revealUptimeline = gsap.timeline({
    paused: true,
    scrollTrigger: {
      trigger: sec,
      start: "10% 80%", // top of trigger hits the top of viewport
      end: "20% 90%",
      // markers: true,
      // scrub: 1,
    },
  });

  revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
    opacity: 1,
    duration: 0.8,
    y: "0%",
    stagger: 0.2,
  });
});
