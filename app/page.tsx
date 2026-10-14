"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

const mapsUrl =
  "https://www.google.com/maps/place/Shree+Dhanlaxmi+Novelties/@18.5635209,73.830411,17z/data=!4m6!3m5!1s0x3bc2bf86a52fb8d5:0xad11f7d3895ad1f9!8m2!3d18.5635209!4d73.830411!16s%2Fg%2F11h0mc8v81";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  swatch: string;
};

type CartItem = Product & {
  quantity: number;
};

type IconName =
  | "bag"
  | "brush"
  | "cart"
  | "check"
  | "gift"
  | "map"
  | "minus"
  | "notebook"
  | "plus"
  | "search"
  | "spark"
  | "x";

const products: Product[] = [
  {
    id: 1,
    name: "Notebook Set",
    category: "School",
    price: 180,
    unit: "pack of 6",
    image: "/business/dhanlaxmi-stationery.png",
    swatch: "#0e8c99",
  },
  {
    id: 2,
    name: "Pen & Marker Kit",
    category: "Writing",
    price: 140,
    unit: "12 pieces",
    image: "/business/dhanlaxmi-stationery.png",
    swatch: "#ff6f61",
  },
  {
    id: 3,
    name: "Craft Paper Bundle",
    category: "Craft",
    price: 220,
    unit: "mixed sheets",
    image: "/business/dhanlaxmi-order.png",
    swatch: "#ffc845",
  },
  {
    id: 4,
    name: "Gift Wrap Rolls",
    category: "Gifts",
    price: 95,
    unit: "per roll",
    image: "/business/dhanlaxmi-novelties.png",
    swatch: "#845ec2",
  },
  {
    id: 5,
    name: "Soft Toy Gift",
    category: "Gifts",
    price: 360,
    unit: "small size",
    image: "/business/dhanlaxmi-novelties.png",
    swatch: "#ff9671",
  },
  {
    id: 6,
    name: "Party Decor Pack",
    category: "Party",
    price: 275,
    unit: "starter pack",
    image: "/business/dhanlaxmi-novelties.png",
    swatch: "#00b8a9",
  },
  {
    id: 7,
    name: "Office File Set",
    category: "Office",
    price: 210,
    unit: "5 files",
    image: "/business/dhanlaxmi-stationery.png",
    swatch: "#243b6b",
  },
  {
    id: 8,
    name: "Custom Pickup Bag",
    category: "Combo",
    price: 499,
    unit: "request pack",
    image: "/business/dhanlaxmi-order.png",
    swatch: "#f05d5e",
  },
];

const categories = ["All", ...Array.from(new Set(products.map((product) => product.category)))];

const moments = [
  ["School ready", "Notebooks, writing kits, geometry tools and everyday study supplies."],
  ["Gift friendly", "Gift bags, cards, wraps, toys and celebration add-ons in one stop."],
  ["Quick pickup", "Prepare a custom list online and confirm availability at the shop."],
];

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    bag: (
      <>
        <path d="M6 8h12l-1 13H7L6 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </>
    ),
    brush: (
      <>
        <path d="M4 20c3 0 5-2 5-5" />
        <path d="m8 15 9-9 2 2-9 9" />
      </>
    ),
    cart: (
      <>
        <path d="M4 5h2l2 11h9l2-7H8" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    gift: (
      <>
        <path d="M4 10h16v10H4z" />
        <path d="M12 10v10" />
        <path d="M3 6h18v4H3z" />
        <path d="M12 6c-2.5 0-4-1-4-2.3C8 2.8 8.8 2 9.8 2 11.4 2 12 6 12 6Z" />
        <path d="M12 6c2.5 0 4-1 4-2.3 0-.9-.8-1.7-1.8-1.7C12.6 2 12 6 12 6Z" />
      </>
    ),
    map: (
      <>
        <path d="M12 21s7-4.6 7-11a7 7 0 1 0-14 0c0 6.4 7 11 7 11Z" />
        <path d="M12 10.5h.01" />
      </>
    ),
    minus: <path d="M6 12h12" />,
    notebook: (
      <>
        <path d="M7 3h11v18H7z" />
        <path d="M4 6h3M4 10h3M4 14h3M4 18h3" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
      </>
    ),
    spark: <path d="M12 3 9.5 9.5 3 12l6.5 2.5L12 21l2.5-6.5L21 12l-6.5-2.5L12 3Z" />,
    x: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [needBy, setNeedBy] = useState("Today");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("Add items and prepare a shop pickup request.");

  const visibleProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = activeCategory === "All" || product.category === activeCategory;
      const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product: Product) {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        return items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...items, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
    setMessage(`${product.name} added to the request basket.`);
  }

  function updateQuantity(id: number, change: number) {
    setCart((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item))
        .filter((item) => item.quantity > 0),
    );
  }

  function submitRequest() {
    if (cart.length === 0) {
      setMessage("Please add at least one item before preparing the request.");
      setCartOpen(true);
      return;
    }

    if (!name.trim() || !phone.trim()) {
      setMessage("Please add your name and phone number first.");
      return;
    }

    setMessage(`Pickup request prepared for ${name.trim()}. Confirm final stock and pricing with the shop.`);
    setCart([]);
    setNote("");
    setCartOpen(false);
  }

  return (
    <main>
      <header className="topbar">
        <Link className="brand" href="#top">
          <span>SDN</span>
          <strong>Shree Dhanlaxmi Novelties</strong>
        </Link>
        <nav>
          <Link href="#catalog">Catalog</Link>
          <Link href="#request">Request</Link>
          <Link href="#gallery">Gallery</Link>
          <Link href="#location">Location</Link>
        </nav>
        <button className="cart-button" onClick={() => setCartOpen(true)} type="button">
          <Icon name="cart" />
          <span>{cartCount}</span>
        </button>
      </header>

      <section className="hero" id="top">
        <video className="hero-video" autoPlay loop muted playsInline poster="/business/dhanlaxmi-storefront.png">
          <source src="/business/dhanlaxmi-loop.mp4" type="video/mp4" />
        </video>
        <div className="pattern-layer" />
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker">
              <Icon name="spark" /> Stationery, gifts and novelties
            </p>
            <h1>Shree Dhanlaxmi Novelties</h1>
            <p>
              A colorful stop for school supplies, craft materials, gifting,
              party decor and everyday stationery near the linked Pune location.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" href="#catalog">
                <Icon name="notebook" />
                Shop catalog
              </Link>
              <a className="ghost-button" href={mapsUrl} target="_blank" rel="noreferrer">
                <Icon name="map" />
                Open map
              </a>
            </div>
          </div>
          <aside className="hero-card">
            <Icon name="gift" />
            <strong>Make a list, visit prepared.</strong>
            <span>Use the request basket for notebooks, gifts, craft items and custom needs.</span>
          </aside>
        </div>
      </section>

      <section className="moments">
        {moments.map(([title, copy]) => (
          <article key={title}>
            <Icon name={title.includes("School") ? "notebook" : title.includes("Gift") ? "gift" : "check"} />
            <strong>{title}</strong>
            <span>{copy}</span>
          </article>
        ))}
      </section>

      <section className="catalog-section" id="catalog">
        <div className="section-head">
          <div>
            <p className="kicker">
              <Icon name="brush" /> Browse by need
            </p>
            <h2>Stationery with a playful novelty-shop shelf.</h2>
          </div>
          <label className="search-box">
            <Icon name="search" />
            <input
              aria-label="Search products"
              placeholder="Search notebooks, gifts, craft..."
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>

        <div className="category-tabs">
          {categories.map((category) => (
            <button
              className={category === activeCategory ? "active" : ""}
              key={category}
              onClick={() => setActiveCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id} style={{ "--swatch": product.swatch } as CSSProperties}>
              <div className="product-media">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 900px) 100vw, 33vw" />
              </div>
              <div className="product-body">
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.unit}</p>
                <div className="price-row">
                  <strong>₹{product.price}</strong>
                  <button onClick={() => addToCart(product)} type="button">
                    <Icon name="plus" />
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="request-section" id="request">
        <div>
          <p className="kicker">
            <Icon name="bag" /> Custom pickup
          </p>
          <h2>Build a basket for school, office or celebration needs.</h2>
          <p>
            Add items, mention any preferred colors or sizes, and use the map to
            visit the shop. Final stock and pricing should be confirmed directly
            at the counter.
          </p>
          <div className="request-total">
            <span>Basket total</span>
            <strong>₹{cartTotal}</strong>
            <small>{cartCount} item{cartCount === 1 ? "" : "s"}</small>
          </div>
        </div>
        <form className="request-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Name
            <input placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <label>
            Phone
            <input placeholder="Contact number" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} />
          </label>
          <label>
            Need by
            <select value={needBy} onChange={(event) => setNeedBy(event.target.value)}>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>This weekend</option>
              <option>Call me first</option>
            </select>
          </label>
          <label>
            Notes
            <textarea
              placeholder="Notebook size, gift color, party theme, brand preference..."
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </label>
          <button onClick={submitRequest} type="button">
            <Icon name="check" />
            Prepare request
          </button>
          <p className="message">{message}</p>
        </form>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-head">
          <div>
            <p className="kicker">
              <Icon name="spark" /> Photos and video
            </p>
            <h2>A bright shop preview before visiting.</h2>
          </div>
        </div>
        <div className="gallery-grid">
          <div className="gallery-card wide">
            <Image src="/business/dhanlaxmi-storefront.png" alt="Shree Dhanlaxmi Novelties storefront" fill sizes="100vw" />
          </div>
          <div className="gallery-card">
            <Image src="/business/dhanlaxmi-stationery.png" alt="Stationery shelf display" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <div className="gallery-card">
            <Image src="/business/dhanlaxmi-novelties.png" alt="Novelty gifts display" fill sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <video className="gallery-video" controls muted loop playsInline poster="/business/dhanlaxmi-order.png">
            <source src="/business/dhanlaxmi-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <section className="location-section" id="location">
        <div>
          <p className="kicker">
            <Icon name="map" /> Location
          </p>
          <h2>Find Shree Dhanlaxmi Novelties.</h2>
          <p>
            Open the map for directions to the linked store location. Visit for
            current items, seasonal stock, school lists and gift options.
          </p>
          <a className="primary-button dark" href={mapsUrl} target="_blank" rel="noreferrer">
            <Icon name="map" />
            Navigate now
          </a>
        </div>
        <div className="map-frame">
          <iframe
            title="Map showing Shree Dhanlaxmi Novelties"
            src="https://www.google.com/maps?q=18.5635209,73.830411&z=17&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <footer>
        <strong>Shree Dhanlaxmi Novelties</strong>
        <span>Stationery, gifts, school supplies and novelty requests</span>
      </footer>

      {cartOpen ? (
        <div className="cart-layer" role="dialog" aria-modal="true" aria-label="Request basket">
          <button className="cart-backdrop" aria-label="Close basket" onClick={() => setCartOpen(false)} type="button" />
          <aside className="cart-panel">
            <div className="cart-head">
              <div>
                <p className="kicker">
                  <Icon name="cart" /> Basket
                </p>
                <h2>Request list</h2>
              </div>
              <button className="icon-button" onClick={() => setCartOpen(false)} type="button" aria-label="Close basket">
                <Icon name="x" />
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <Icon name="bag" />
                  <strong>No items added</strong>
                  <span>Add stationery, gifts or craft items from the catalog.</span>
                </div>
              ) : (
                cart.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <Image src={item.image} alt={item.name} width={82} height={72} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>₹{item.price} · {item.unit}</span>
                      <div className="qty">
                        <button onClick={() => updateQuantity(item.id, -1)} type="button" aria-label={`Remove one ${item.name}`}>
                          <Icon name="minus" />
                        </button>
                        <b>{item.quantity}</b>
                        <button onClick={() => updateQuantity(item.id, 1)} type="button" aria-label={`Add one ${item.name}`}>
                          <Icon name="plus" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div>
                <span>Estimated total</span>
                <strong>₹{cartTotal}</strong>
              </div>
              <a className="primary-button" href="#request" onClick={() => setCartOpen(false)}>
                Continue request
              </a>
            </div>
          </aside>
        </div>
      ) : null}
    </main>
  );
}
