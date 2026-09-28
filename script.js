const menuItems = [
  {
    name: "House flat white",
    description: "Our seasonal espresso, a little silky milk, and a moment to yourself.",
    price: "$5.50",
    category: "coffee",
    tag: "A daily favourite",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    alt: "Flat white coffee in a ceramic cup"
  },
  {
    name: "Cold brew & tonic",
    description: "Slow-steeped coffee, bright citrus tonic, a sprig of rosemary.",
    price: "$7.00",
    category: "coffee",
    tag: "Bright & refreshing",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=80",
    alt: "A refreshing iced coffee drink"
  },
  {
    name: "Green garden toast",
    description: "Whipped ricotta, market greens, lemon oil on thick-cut sourdough.",
    price: "$18.00",
    category: "brunch",
    tag: "Seasonal & lovely",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
    alt: "Fresh brunch toast with greens and seasonal ingredients"
  },
  {
    name: "The long-table eggs",
    description: "Two free-range eggs, brown butter greens, sourdough for the yolk.",
    price: "$21.00",
    category: "brunch",
    tag: "A proper breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
    alt: "A hearty breakfast plate with eggs and greens"
  },
  {
    name: "Citrus & olive oil cake",
    description: "Soft, fragrant, and best with a little dollop of crème fraîche.",
    price: "$9.00",
    category: "sweet",
    tag: "Baked here today",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=700&q=80",
    alt: "A slice of freshly baked cake served with cream"
  },
  {
    name: "Brown butter cookie",
    description: "A crisp edge, a soft middle, and a very generous amount of chocolate.",
    price: "$6.00",
    category: "sweet",
    tag: "Little afternoon treat",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
    alt: "Freshly baked chocolate chip cookies"
  }
];

const menuGrid = document.querySelector("#menu-grid");
const menuTabs = document.querySelectorAll(".menu-tab");

function renderMenu(category = "all") {
  const items = category === "all"
    ? menuItems
    : menuItems.filter((item) => item.category === category);

  menuGrid.innerHTML = items.map((item) => `
    <article class="menu-card">
      <div class="menu-card-image"><img src="${item.image}" alt="${item.alt}" loading="lazy"></div>
      <div class="menu-card-content">
        <div class="menu-card-top"><h3>${item.name}</h3><span class="menu-price">${item.price}</span></div>
        <p>${item.description}</p>
        <span class="menu-tag">${item.tag}</span>
      </div>
    </article>
  `).join("");
}

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    menuTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderMenu(tab.dataset.category);
  });
});

renderMenu();

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

const reservationDate = document.querySelector('input[name="date"]');
const today = new Date();
const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
  .toISOString()
  .slice(0, 10);
reservationDate.min = localToday;

const enquiryForm = document.querySelector("#enquiry-form");
const formSuccess = document.querySelector("#form-success");

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) return;

  const formData = new FormData(enquiryForm);
  document.querySelector("#success-name").textContent = formData.get("name");
  formSuccess.hidden = false;
  formSuccess.focus();
  enquiryForm.reset();
  reservationDate.min = localToday;
});
