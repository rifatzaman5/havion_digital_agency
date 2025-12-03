(function () {
  /**
   * Featured Projects Carousel
   * This script adapts the carousel for different device sizes:
   * - Mobile: 1 card per slide (1*1*1*1*1*1*1*1*1)
   * - Tablet: 2 cards per slide (2*2*2*2)
   * - Large devices: 3 cards per slide (3*3*3)
   */

  // Projects data
  const projectData = [
    {
      image: "/assets/images/gallery1.svg",
      title: "Use data analytics to improve shipping times.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non enim lacus. Nulla...",
      tags: ["Shipping", "Analytics", "Logistics"],
    },
    {
      image: "/assets/images/gallery2.svg",
      title: "Optimize supply chain with machine learning.",
      description:
        "Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus maecenas tempus...",
      tags: ["Supply Chain", "AI", "Optimization"],
    },
    {
      image: "/assets/images/gallery3.svg",
      title: "Automate warehouse inventory management.",
      description:
        "Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero...",
      tags: ["Warehouse", "Automation", "Inventory"],
    },
    {
      image: "/assets/images/gallery1.svg",
      title: "Implement sustainable packaging solutions.",
      description:
        "Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem nulla consequat...",
      tags: ["Sustainability", "Packaging", "Green"],
    },
    {
      image: "/assets/images/gallery2.svg",
      title: "Smart route planning for delivery fleets.",
      description:
        "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim aliquam lorem...",
      tags: ["Routes", "Fleet", "Optimization"],
    },
    {
      image: "/assets/images/gallery3.svg",
      title: "Customer-centric last mile delivery.",
      description:
        "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo nullam dictum felis...",
      tags: ["Last Mile", "Customer", "Delivery"],
    },
    {
      image: "/assets/images/gallery1.svg",
      title: "Blockchain for transparent supply chains.",
      description:
        "Phasellus viverra nulla ut metus varius laoreet quisque rutrum aenean imperdiet...",
      tags: ["Blockchain", "Transparency", "Supply Chain"],
    },
    {
      image: "/assets/images/gallery2.svg",
      title: "Cross-border logistics optimization.",
      description:
        "Etiam sit amet orci eget eros faucibus tincidunt duis leo sed fringilla mauris...",
      tags: ["International", "Logistics", "Customs"],
    },
    {
      image: "/assets/images/gallery3.svg",
      title: "IoT sensors for cargo monitoring.",
      description:
        "Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem maecenas nec...",
      tags: ["IoT", "Monitoring", "Cargo"],
    },
  ];

  // Helper function to create a project card HTML
  function createProjectCard(project) {
    return `
      <div class="gallery-testimonial-card effect-slide-up">
        <div class="gallery-testimonial-image">
          <img src="${project.image}" alt="${project.title}">
        </div>
        <div class="gallery-testimonial-content-wrapper px-3 pb-3">
          <div class="gallery-testimonial-badge">
            ${project.tags
              .map(
                (tag) =>
                  `<span class="gallery-testimonial-badge-tag">${tag}</span>`
              )
              .join("")}
          </div>
          <div class="gallery-testimonial-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
          <a href="#" class="gallery-testimonial-button">Learn More</a>
        </div>
      </div>
    `;
  }

  // Function to generate carousel items based on screen size
  function generateCarouselItems() {
    const carouselInner = document.querySelector(
      "#galleryTestimonialCarousel .carousel-inner"
    );
    if (!carouselInner) return;

    carouselInner.innerHTML = "";
    let cardsPerSlide =
      window.innerWidth < 768 ? 1 : window.innerWidth < 992 ? 2 : 3;

    for (let i = 0; i < projectData.length; i += cardsPerSlide) {
      const slide = document.createElement("div");
      slide.className = "carousel-item" + (i === 0 ? " active" : "");

      const row = document.createElement("div");
      row.className = "row";

      for (let j = 0; j < cardsPerSlide; j++) {
        if (i + j < projectData.length) {
          const project = projectData[i + j];
          const col = document.createElement("div");
          const colClass =
            cardsPerSlide === 1
              ? "col-12"
              : cardsPerSlide === 2
              ? "col-md-6"
              : "col-lg-4";
          col.className = colClass + " mb-4";
          col.innerHTML = createProjectCard(project);
          row.appendChild(col);
        }
      }

      slide.appendChild(row);
      carouselInner.appendChild(slide);
    }

    const carouselElement = document.getElementById(
      "galleryTestimonialCarousel"
    );
    if (carouselElement) {
      const bsCarousel = bootstrap.Carousel.getInstance(carouselElement);
      if (bsCarousel) bsCarousel.to(0);
      else new bootstrap.Carousel(carouselElement);
    }
  }

  // Auto scroll for havica industries carousel
  let isDown = false,
    startX,
    scrollLeft,
    scrollInterval;
  function startAutoScroll() {
    scrollInterval = setInterval(() => {
      const container = document.querySelector(
        ".havica-industries-carousel-container"
      );
      const inner = document.querySelector(".havica-industries-carousel-inner");
      container.scrollLeft += 1;
      if (container.scrollLeft >= inner.scrollWidth - container.clientWidth)
        container.scrollLeft = 0;
    }, 20);
  }
  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  // Intersection Observer animation triggers
  function triggerAnimations() {
    const $elements = $(
      ".effect-slide-up, .effect-fade-zoom, .effect-pop-bottom, .effect-card-fade, " +
        ".effect-fade-delay, .effect-slide-right, .effect-slide-left, .animate-stagger-children"
    );
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              $(entry.target).addClass("animate-active");
              if ($(entry.target).hasClass("animate-stagger-children")) {
                $(entry.target)
                  .children()
                  .each((idx, child) => {
                    setTimeout(
                      () =>
                        $(child).css({
                          opacity: "1",
                          transform: "translateY(0)",
                        }),
                      idx * 100
                    );
                  });
              }
            } else {
              $(entry.target).removeClass("animate-active");
              if ($(entry.target).hasClass("animate-stagger-children")) {
                $(entry.target)
                  .children()
                  .css({ opacity: "0", transform: "translateY(20px)" });
              }
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
      );
      $elements.each(function () {
        observer.observe(this);
      });
    } else {
      $elements.addClass("animate-active");
    }
  }

  // Dropdown chevron handlers
  let isDesktop = $(window).width() >= 992;
  function handleDropdownChevron() {
    $(".dropdown-toggle")
      .off("click")
      .on("click", function () {
        if (!isDesktop) $(this).find(".fa-chevron-down").toggleClass("rotate");
      });
    $(".dropdown")
      .off("hidden.bs.dropdown")
      .on("hidden.bs.dropdown", function () {
        if (!isDesktop) $(this).find(".fa-chevron-down").removeClass("rotate");
      });
  }
  function setupDesktopHover() {
    if (isDesktop) {
      $(".dropdown")
        .off("mouseenter mouseleave")
        .hover(
          function () {
            $(this).addClass("show").find(".dropdown-menu").addClass("show");
            $(this).find(".fa-chevron-down").addClass("rotate");
          },
          function () {
            $(this)
              .removeClass("show")
              .find(".dropdown-menu")
              .removeClass("show");
            $(this).find(".fa-chevron-down").removeClass("rotate");
          }
        );
      $(".dropdown-toggle")
        .off("click")
        .on("click", function (e) {
          if (isDesktop) {
            e.preventDefault();
            window.location.href = $(this).attr("href");
          }
        });
    } else {
      $(".dropdown").off("mouseenter mouseleave");
    }
  }

  // Back to top button
  function setupBackToTop() {
    const $backToTop = $("#back-to-top");
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) $backToTop.addClass("visible");
      else $backToTop.removeClass("visible");
    });
    $backToTop.on("click", (e) => {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 800);
    });
  }

  // Desktop carousel indicators fix
  function setupDesktopCarouselIndicators() {
    const $carouselDesktop = $("#testimonialCarouselDesktop");
    const $indicators = $(".main-page-card-slider-indicator");
    if ($carouselDesktop.length) {
      $carouselDesktop.on("slide.bs.carousel", (event) => {
        $indicators.removeClass("active");
        $indicators.eq(event.to).addClass("active");
      });
      $indicators.each((i, el) =>
        $(el).on("click", () => {
          $indicators.removeClass("active");
          $(el).addClass("active");
          $carouselDesktop.carousel(i);
        })
      );
    }
  }

  // Card slider (main page) logic
  function setupCardSlider() {
    const slider = $("#cardSlider"),
      cards = $(".main-page-card"),
      totalCards = cards.length;
    let currentIndex = 0,
      isAnimating = false;

    function updateSlider(animate) {
      cards.removeClass(
        "main-page-card-active main-page-card-center main-page-card-side main-page-card-left main-page-card-right"
      );

      const isMobile = window.innerWidth <= 576;

      // Reset all cards first
      cards.css({
        opacity: 0,
        transform: "scale(0.7)",
        left: "50%",
        display: "none",
        "pointer-events": "none",
      });

      if (isMobile) {
        // Show only the current card on mobile
        $(cards[currentIndex])
          .css({
            opacity: 1,
            transform: "translateX(-50%) scale(1)",
            left: "50%",
            display: "block",
            "pointer-events": "auto",
          })
          .addClass("main-page-card-center main-page-card-active");
      } else {
        // Desktop/tablet view with 3 cards
        cards.css("display", "block");

        const prev = (currentIndex - 1 + totalCards) % totalCards,
          next = (currentIndex + 1) % totalCards;

        // Setup previous card
        $(cards[prev]).addClass("main-page-card-side main-page-card-left").css({
          opacity: 0.6,
          transform: "translateX(-90%) scale(0.85)",
          left: "30%",
          "pointer-events": "auto",
        });

        // Setup current/active card
        $(cards[currentIndex])
          .addClass("main-page-card-center main-page-card-active")
          .css({
            opacity: 1,
            transform: "translateX(-50%) scale(1)",
            left: "50%",
            "pointer-events": "auto",
          });

        // Setup next card
        $(cards[next])
          .addClass("main-page-card-side main-page-card-right")
          .css({
            opacity: 0.6,
            transform: "translateX(0%) scale(0.85)",
            left: "70%",
            "pointer-events": "auto",
          });
      }
    }

    function slide(direction) {
      if (isAnimating) return;
      isAnimating = true;

      currentIndex =
        direction === "next"
          ? (currentIndex + 1) % totalCards
          : (currentIndex - 1 + totalCards) % totalCards;

      updateSlider(true);

      setTimeout(() => (isAnimating = false), 600);
    }

    // Initialize the slider
    updateSlider(false);

    // Button navigation
    $("#prevBtn").on("click", () => slide("prev"));
    $("#nextBtn").on("click", () => slide("next"));

    // Keyboard navigation
    $(document).on("keydown", (e) => {
      if (!isAnimating) {
        if (e.keyCode === 37) slide("prev");
        else if (e.keyCode === 39) slide("next");
      }
    });

    // Click on card to make it active
    cards.on("click", function () {
      if (isAnimating) return;

      const idx = $(this).index();
      if (idx !== currentIndex) {
        currentIndex = idx;
        updateSlider(true);
      }
    });

    // Update on window resize
    $(window).on("resize", () => updateSlider(false));

    // Touch swipe functionality
    let touchStartX = 0,
      touchEndX = 0;

    $(".main-page-carousel-wrapper")
      .on("touchstart", function (e) {
        if (isAnimating) return;
        touchStartX = e.originalEvent.touches[0].clientX;
      })
      .on("touchend", function (e) {
        if (isAnimating) return;
        touchEndX = e.originalEvent.changedTouches[0].clientX;

        if (touchEndX < touchStartX - 50) slide("next");
        else if (touchEndX > touchStartX + 50) slide("prev");
      });
  }

  // Make sure to call this function after the DOM is fully loaded
  $(document).ready(function () {
    setupCardSlider();
  });

  // Featured Projects custom carousel
  function setupFeatProjectsCarousel() {
    let currentIndex = 1,
      autoPlayInterval,
      touchStartX = 0,
      touchEndX = 0,
      touchStartY = 0,
      touchEndY = 0;
    const totalItems = $(".feat-projects-col").length,
      $prevBtn = $('<button class="feat-projects-prev"></button>')
        .css("display", "none")
        .appendTo("body"),
      $nextBtn = $('<button class="feat-projects-next"></button>')
        .css("display", "none")
        .appendTo("body");
    function positionCards() {
      const isMobile = $(window).width() < 768,
        $cols = $(".feat-projects-col"),
        $row = $(".feat-projects-row");
      if (isMobile) {
        $cols.each(function () {
          $(this)
            .removeClass("active")
            .css({ transform: "scale(1)", opacity: "1" });
        });
        $(`.feat-projects-col[data-index="${currentIndex}"]`).addClass(
          "active"
        );
      } else {
        const rowWidth = $row.width(),
          cardWidth = $(".feat-projects-col").width();
        $row.css(
          "transform",
          `translateX(${-(currentIndex * cardWidth - rowWidth / 4)}px)`
        );
        $cols.each(function () {
          $(this)
            .removeClass("active")
            .css({ opacity: "0.6", transform: "scale(0.85)" });
        });
        const $active = $(`.feat-projects-col[data-index="${currentIndex}"]`);
        $active.addClass("active").css({ opacity: "1", transform: "scale(1)" });
      }
      $(".feat-projects-indicator").removeClass("active");
      $(`.feat-projects-indicator[data-index="${currentIndex}"]`).addClass(
        "active"
      );
    }
    function startAutoPlay() {
      stopAutoPlay();
      autoPlayInterval = setInterval(() => {
        currentIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
        positionCards();
      }, 5000);
    }
    function stopAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    }
    positionCards();
    startAutoPlay();
    $(window).on("resize", positionCards);
    $prevBtn.on("click", () => {
      stopAutoPlay();
      currentIndex = currentIndex > 0 ? currentIndex - 1 : totalItems - 1;
      positionCards();
      startAutoPlay();
    });
    $nextBtn.on("click", () => {
      stopAutoPlay();
      currentIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : 0;
      positionCards();
      startAutoPlay();
    });
    $(".feat-projects-indicator").on("click", function () {
      stopAutoPlay();
      currentIndex = +$(this).attr("data-index");
      positionCards();
      startAutoPlay();
    });
    $(".feat-projects-carousel")
      .on("touchstart", function (e) {
        stopAutoPlay();
        touchStartX = e.originalEvent.touches[0].clientX;
        touchStartY = e.originalEvent.touches[0].clientY;
      })
      .on(
        "touchmove",
        function (e) {
          if (
            Math.abs(e.originalEvent.touches[0].clientX - touchStartX) >
            Math.abs(e.originalEvent.touches[0].clientY - touchStartY)
          )
            e.preventDefault();
        },
        { passive: false }
      )
      .on("touchend", function (e) {
        touchEndX = e.originalEvent.changedTouches[0].clientX;
        touchEndY = e.originalEvent.changedTouches[0].clientY;
        const horizontalDist = Math.abs(touchEndX - touchStartX),
          verticalDist = Math.abs(touchEndY - touchStartY);
        if (horizontalDist > verticalDist) {
          if (touchEndX < touchStartX - 50) $nextBtn.trigger("click");
          if (touchEndX > touchStartX + 50) $prevBtn.trigger("click");
        }
        startAutoPlay();
      })
      .hover(stopAutoPlay, startAutoPlay);
    window.featProjectsCarouselPrev = () => $prevBtn.trigger("click");
    window.featProjectsCarouselNext = () => $nextBtn.trigger("click");
    window.featProjectsCarouselGoTo = (idx) => {
      if (idx >= 0 && idx < totalItems) {
        stopAutoPlay();
        currentIndex = idx;
        positionCards();
        startAutoPlay();
      }
    };
  }

  // Contact-us footer toggle icons
  function setupFooterToggle() {
    const items = document.querySelectorAll(
      ".havica-contact-us-footer .list-unstyled li"
    );
    items.forEach((item) => {
      item.style.cursor = "pointer";
      item.addEventListener("click", function () {
        const icon = this.querySelector("i");
        if (icon.classList.contains("fa-check")) {
          icon.classList.replace("fa-check", "fa-times");
          icon.classList.replace(
            "havica-contact-us-icon-active",
            "havica-contact-us-icon-inactive"
          );
        } else {
          icon.classList.replace("fa-times", "fa-check");
          icon.classList.replace(
            "havica-contact-us-icon-inactive",
            "havica-contact-us-icon-active"
          );
        }
      });
    });
    const style = document.createElement("style");
    style.textContent = `
      .havica-contact-us-footer .list-unstyled li i { transition: all 0.2s ease-in-out; }
      .havica-contact-us-footer .list-unstyled li:hover { background-color: rgba(255, 109, 44, 0.05); border-radius: 8px; }
    `;
    document.head.appendChild(style);
  }

  // Pagination for introduction tab
  function setupIntroPagination() {
    document
      .querySelectorAll("#main-blog-intro-pagination .page-link")
      .forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const page = this.getAttribute("data-page");
          if (!page) return;
          document
            .querySelectorAll('[id^="main-blog-intro-page-"]')
            .forEach((el) => el.classList.add("d-none"));
          document
            .getElementById(`main-blog-intro-page-${page}`)
            .classList.remove("d-none");
          document
            .querySelectorAll("#main-blog-intro-pagination .page-item")
            .forEach((it) => it.classList.remove("active"));
          this.parentElement.classList.add("active");
        });
      });
  }

  // FAQ accordion and tabs
  function setupFaqTabs() {
    const tabButtons = document.querySelectorAll(".main-faqs-page-tab-button");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        tabButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        document
          .querySelectorAll(".main-faqs-page-tab-content")
          .forEach((c) => c.classList.remove("active"));
        document
          .getElementById(this.getAttribute("data-target"))
          .classList.add("active");
      });
    });

    const faqQs = document.querySelectorAll(".main-faqs-page-faq-question");
    faqQs.forEach((q) => {
      q.addEventListener("click", function () {
        this.classList.toggle("active");
        const ans = this.nextElementSibling;
        if (this.classList.contains("active"))
          ans.style.maxHeight = ans.scrollHeight + "px";
        else ans.style.maxHeight = "0";
      });
    });
    if (faqQs.length) faqQs[0].click();
  }

  // Search/filter for services
  function setupServiceFilter() {
    const filterToggle = document.getElementById("filter-toggle");
    const filterDropdown = document.getElementById("filter-dropdown");
    const searchInput = document.getElementById("services-search");
    const serviceItems = document.querySelectorAll(".service-item");
    if (
      !filterToggle ||
      !filterDropdown ||
      !searchInput ||
      !serviceItems.length
    )
      return;
    const filterOptions = document.querySelectorAll(".filter-checkbox");
    const filterAll = document.getElementById("filter-all");
    if (!filterAll || !filterOptions.length) return;

    filterToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      filterDropdown.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
      if (
        !filterToggle.contains(e.target) &&
        !filterDropdown.contains(e.target)
      )
        filterDropdown.classList.remove("active");
    });

    filterOptions.forEach((opt) =>
      opt.addEventListener("change", filterServices)
    );
    filterAll.addEventListener("change", function () {
      if (this.checked)
        filterOptions.forEach((o) => {
          if (o !== this) o.checked = false;
        });
      filterServices();
    });
    filterOptions.forEach((opt) => {
      if (opt.id !== "filter-all")
        opt.addEventListener("change", function () {
          if (this.checked) filterAll.checked = false;
          if (
            ![...filterOptions].some((o) => o.id !== "filter-all" && o.checked)
          )
            filterAll.checked = true;
          filterServices();
        });
    });

    let searchTimeout;
    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filterServices, 300);
    });

    function filterServices() {
      const term = searchInput.value.trim().toLowerCase();
      const selected = [...filterOptions]
        .filter((o) => o.checked && o.id !== "filter-all")
        .map((o) => o.id.replace("filter-", ""));
      const showAll = filterAll.checked || !selected.length;
      let found = false;
      serviceItems.forEach((item) => {
        const title =
          item
            .querySelector(".havion-services-card-title")
            ?.textContent.toLowerCase() || "";
        const desc =
          item
            .querySelector(".havion-services-card-description")
            ?.textContent.toLowerCase() || "";
        const cat = item.dataset.category;
        const match =
          (!term || title.includes(term) || desc.includes(term)) &&
          (showAll || selected.includes(cat));
        item.classList.toggle("hidden", !match);
        if (match) found = true;
      });
      const noRes = document.getElementById("no-search-results");
      if (noRes)
        noRes.classList.toggle(
          "hidden",
          found || (!searchInput.value.trim() && selected.length === 0)
        );
    }
  }

  // Privacy policy search & collapse arrows
  function setupPolicySearch() {
    const input = document.getElementById("policy-search");
    const tabs = document.querySelectorAll(".privacy-policy-tab");
    const sections = document.querySelectorAll(".tab-pane");
    input.addEventListener("input", function () {
      const term = this.value.toLowerCase();
      if (!term) {
        document.getElementById("introduction-tab").click();
        return;
      }
      let first = true;
      sections.forEach((sec, i) => {
        if (sec.textContent.toLowerCase().includes(term)) {
          if (first) {
            tabs[i].click();
            first = false;
          }
        }
      });
    });
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach((btn) => {
      btn.addEventListener("click", function () {
        this.classList.toggle("collapsed");
        this.querySelector(".privacy-policy-arrow").style.transform =
          this.classList.contains("collapsed")
            ? "rotate(0deg)"
            : "rotate(90deg)";
      });
    });
  }

  // Main blog tabs
  function setupBlogTabs() {
    document.querySelectorAll("#main-blog-tabs .nav-link").forEach((tab) => {
      tab.addEventListener("click", function () {
        document
          .querySelectorAll("#main-blog-tabs .nav-link")
          .forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        document
          .querySelectorAll(".tab-pane")
          .forEach((p) => p.classList.remove("show", "active"));
        document
          .querySelector(this.getAttribute("href"))
          .classList.add("show", "active");
      });
    });
  }

  // Main blog card search
  function setupBlogSearch() {
    document
      .getElementById("main-blog-search-input")
      .addEventListener("input", function () {
        const term = this.value.toLowerCase();
        document.querySelectorAll(".main-blog-card").forEach((card) => {
          const title = card
            .querySelector(".main-blog-card-title a")
            .textContent.toLowerCase();
          card.parentElement.classList.toggle("d-none", !title.includes(term));
        });
      });
  }

  // Havica FAQ tabs & accordion
  // Havica FAQ tabs & accordion
  function setupHavicaFaqs() {
    // Tab functionality
    const tabs = document.querySelectorAll(".havica-faqs-tab");
    const panels = document.querySelectorAll(".havica-faqs-panel");

    // Set default active tab if none is selected
    if (!document.querySelector(".havica-faqs-tab.active") && tabs.length > 0) {
      tabs[0].classList.add("active");
      const firstPanelId = tabs[0].getAttribute("data-tab") + "-panel";
      const firstPanel = document.getElementById(firstPanelId);
      if (firstPanel) {
        firstPanel.classList.remove("d-none");
      }
    }

    // Add click event to tabs
    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        tabs.forEach((t) => t.classList.remove("active"));
        // Add active class to clicked tab
        this.classList.add("active");

        // Hide all panels
        panels.forEach((p) => p.classList.add("d-none"));
        // Show panel corresponding to clicked tab
        const panelId = this.getAttribute("data-tab") + "-panel";
        const panel = document.getElementById(panelId);
        if (panel) {
          panel.classList.remove("d-none");
        }
      });
    });

    // Accordion functionality
    document
      .querySelectorAll(".havica-faqs-accordion-button")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const targetSelector = this.getAttribute("data-bs-target");
          const target = document.querySelector(targetSelector);
          const icon = this.querySelector("i");

          if (!target) return; // Exit if target not found

          const isCurrentlyOpen = target.classList.contains("show");

          // Close all accordions first
          document
            .querySelectorAll(".havica-faqs-accordion-content")
            .forEach((c) => {
              c.classList.remove("show");
            });

          document
            .querySelectorAll(".havica-faqs-accordion-button")
            .forEach((b) => {
              b.setAttribute("aria-expanded", "false");
              const btnIcon = b.querySelector("i");
              if (btnIcon && btnIcon.classList.contains("fa-chevron-up")) {
                btnIcon.classList.replace("fa-chevron-up", "fa-chevron-down");
              }
            });

          // Toggle current accordion
          if (!isCurrentlyOpen) {
            // Open this accordion if it was closed
            target.classList.add("show");
            this.setAttribute("aria-expanded", "true");
            if (icon) {
              icon.classList.replace("fa-chevron-down", "fa-chevron-up");
            }
          }
          // If it was open, it's now closed (we closed all above)
        });
      });

    // Initialize accordion icons to show correct state on page load
    document
      .querySelectorAll(".havica-faqs-accordion-content")
      .forEach((content) => {
        const isOpen = content.classList.contains("show");
        const buttonSelector = `[data-bs-target="${getTargetSelector(
          content
        )}"]`;
        const button = document.querySelector(buttonSelector);

        if (button) {
          const icon = button.querySelector("i");
          if (icon) {
            if (isOpen) {
              icon.classList.replace("fa-chevron-down", "fa-chevron-up");
              button.setAttribute("aria-expanded", "true");
            } else {
              icon.classList.replace("fa-chevron-up", "fa-chevron-down");
              button.setAttribute("aria-expanded", "false");
            }
          }
        }
      });

    // Helper function to get proper selector from element
    function getTargetSelector(element) {
      if (element.id) {
        return `#${element.id}`;
      } else {
        // If no ID, try to create a valid selector (this is a simplified approach)
        return `.${Array.from(element.classList).join(".")}`;
      }
    }
  }

  // Make sure to call this function after the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", setupHavicaFaqs);

  // Video play/pause toggle
  // function setupVideoToggle() {
  //   const video = document.querySelector(".hivica-video-main-video");
  //   const overlay = document.querySelector(
  //     ".hivica-video-main-play-button-overlay"
  //   );
  //   const icon = document.querySelector(".hivica-video-main-play-icon");
  //   function togglePlayPause() {
  //     if (video.paused) {
  //       video.play();
  //       icon.classList.replace("fa-play", "fa-pause");
  //     } else {
  //       video.pause();
  //       icon.classList.replace("fa-pause", "fa-play");
  //     }
  //   }
  //   overlay.addEventListener("click", togglePlayPause);
  //   video.addEventListener("ended", () => {
  //     icon.classList.replace("fa-pause", "fa-play");
  //   });
  //   video.addEventListener("click", togglePlayPause);
  // }

  // Adjust carousel layout on resize
  function adjustLayout() {
    const desktop = document.getElementById("testimonialCarouselDesktop");
    const mobile = document.getElementById("testimonialCarouselMobile");
    if (window.innerWidth < 768) {
      if (desktop) bootstrap.Carousel.getInstance(desktop)?.pause();
    } else {
      if (mobile) bootstrap.Carousel.getInstance(mobile)?.pause();
    }
  }

  // Pricing checkbox console log
  function setupPricingCheckboxes() {
    document
      .querySelectorAll(
        '.havion-service-pricing-checkbox input[type="checkbox"]'
      )
      .forEach((cb) => {
        cb.addEventListener("change", () =>
          console.log("Checkbox state changed:", cb.checked)
        );
      });
  }

  // Run everything after DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    generateCarouselItems();
    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(generateCarouselItems, 250);
      adjustLayout();
    });

    // Havica industries carousel mouse/touch
    const container = document.querySelector(
      ".havica-industries-carousel-container"
    );
    if (container) {
      container.addEventListener("mousedown", (e) => {
        isDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        stopAutoScroll();
      });
      container.addEventListener("mouseleave", () => {
        isDown = false;
        startAutoScroll();
      });
      container.addEventListener("mouseup", () => {
        isDown = false;
        startAutoScroll();
      });
      container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });
      container.addEventListener("touchstart", (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        stopAutoScroll();
      });
      container.addEventListener("touchend", () => {
        isDown = false;
        startAutoScroll();
      });
      container.addEventListener("touchmove", (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });
      startAutoScroll();
    }

    // jQuery doc ready parts
    $(function () {
      triggerAnimations();
      handleDropdownChevron();
      setupDesktopHover();
      setupBackToTop();
      setupDesktopCarouselIndicators();
    });

    // All other setups
    setupCardSlider();
    setupFeatProjectsCarousel();
    setupFooterToggle();
    setupIntroPagination();
    setupFaqTabs();
    setupServiceFilter();
    setupPolicySearch();
    setupBlogTabs();
    setupBlogSearch();
    setupHavicaFaqs();
    setupVideoToggle();
    setupPricingCheckboxes();
  });

  // After defining, also set up mobiles carousel instance
  document.addEventListener("DOMContentLoaded", () => {
    const mobileCarousel = document.getElementById("testimonialCarouselMobile");
    if (mobileCarousel)
      new bootstrap.Carousel(mobileCarousel, {
        interval: 5000,
        wrap: true,
        touch: true,
      });
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelector(".navbar-toggler");
  const nav = document.getElementById("navbarContent");

  nav.addEventListener("shown.bs.collapse", () => {
    btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  });

  nav.addEventListener("hidden.bs.collapse", () => {
    btn.innerHTML = '<span class="navbar-toggler-icon"></span>';
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".hivica-video-main-video");
  const overlay = document.querySelector(
    ".hivica-video-main-play-button-overlay"
  );
  const icon = document.querySelector(".hivica-video-main-play-icon");

  function togglePlayPause() {
    if (video.paused) {
      video.play();
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
      overlay.style.opacity = 1;
    } else {
      video.pause();
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
      overlay.style.opacity = 1;
    }
  }

  overlay.addEventListener("click", togglePlayPause);
  video.addEventListener("click", togglePlayPause);
  video.addEventListener("ended", function () {
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    overlay.style.opacity = 1;
  });
});
