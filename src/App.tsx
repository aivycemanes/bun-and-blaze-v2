import { use, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};


function App() {
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedBurger , setSelectedBurger] =
  useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const addToCart = (name: string, price: number) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.name === name);

      if (existingItem) {
        return items.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...items, { name, price, quantity: 1 }];
    });

    setCartCount((count) => count + 1);
  };

  const changeQuantity = (name: string, amount: number) => {
    const item = cartItems.find((item) => item.name === name);

    if (!item) return;

    if (item.quantity + amount <= 0) {
      setCartItems((items) =>
        items.filter((item) => item.name !== name)
      );
    } else {
      setCartItems((items) =>
        items.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
      );
    }

    setCartCount((count) => count + amount);
  };
  
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
  <img src="/bun-blaze-logo.png" alt="Bun & Blaze logo" />
  <span>Bun & Blaze</span>
</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about"
  onClick={(e) => {
    e.preventDefault();
    setShowAbout(true);
  }}
>About
</a>
          <a href="#contact"
          onClick={(e) => {
    e.preventDefault();
    setShowContact(true);
  }}
          >Contact</a>
        </nav>

        <button className="cart"
         onClick={() => setShowCart(true)}>
  🛒 Cart ({cartCount})
</button>

      </header>

      {/* Main Section */}
      <main>
        <section className="hero" id="home">
  <div className="hero-content">
    <p className="tagline">🔥 FRESH FROM THE GRILL</p>

    <h1>
      BITE INTO THE
      <br />
      <span>BLAZE</span>
    </h1>

    <p className="hero-text">
      Juicy burgers, toasted buns, and bold flavors made
      for your biggest cravings.
    </p>
<button
  className="order-button"
  onClick={() => 
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>

  ORDER NOW
</button>
    
  </div>

  <div className="hero-burger">
  <img src="/src/bun-blaze-logo.png" alt="Bun & Blaze logo" />
</div>
</section>

        {/* Menu */}
        <section className="menu" id="menu">
          <h2>Our Blaze Burgers</h2>

          <div className="burger-grid">

            <div className="burger-card"
            onClick={() => setSelectedBurger ("Blaze Crunch")}>

              <div className="burger-image">
  <img
  src="https://halaljoints.s3.eu-west-2.amazonaws.com/v0-restaurant-thumbs/1czbol3yxj46d.jpg"
  alt="Blaze Crunch chicken burger"
/>
</div>
<div className="rating">★★★★★</div>
              <h3>Blaze Crunch</h3>
              <strong>₱159</strong>
              <button onClick={(e) => {
    e.stopPropagation();
    addToCart("Blaze Crunch", 159);
  }}>
  Add to Cart
</button>
            </div>

            <div className="burger-card"
            onClick={() => setSelectedBurger ("Smoky Stack")}
            >
              <div className="burger-image">
  <img
    src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
    alt="Smoky Stack burger"
  />
</div>
<div className="rating">★★★★★</div>
              <h3>Smoky Stack</h3>
              <strong>₱179</strong>
              <button onClick={(e) => {
    e.stopPropagation();
    addToCart("Smoky Stack", 179);
  }}>
  Add to Cart
</button>
            </div>

            <div className="burger-card"
            onClick={() => setSelectedBurger ("Golden Melt")}
            >
              <div className="burger-image">
  <img
    src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80"
    alt="Golden Melt burger"
  />
</div>
<div className="rating">★★★★☆</div>
              <h3>Golden Melt</h3>
              <strong>₱199</strong>
              <button onClick={(e) => {
    e.stopPropagation();
    addToCart("Golden Melt", 199);
  }}>
  Add to Cart
</button>
            </div>

            <div className="burger-card"
            onClick={() => setSelectedBurger ("Firecracker Beef")}
            >
              <div className="burger-image">
  <img
    src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80"
    alt="Firecracker Beef burger"
  />
</div>
<div className="rating">★★★★★</div>
              <h3>Firecracker Beef</h3>
              <strong>₱189</strong>
              <button onClick={(e) => {
    e.stopPropagation();
    addToCart("Firecracker Beef", 189);
  }}>
  Add to Cart
</button>
            </div>
          </div>
        </section>

      </main>
      
      {selectedBurger &&
  createPortal(
    <div
      onClick={() => setSelectedBurger(null)}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#30252B",
          color: "white",
          padding: "24px",
          borderRadius: "18px",
          boxSizing: "border-box",
          textAlign: "justify",
        }}
      >
        <button
          onClick={() => setSelectedBurger(null)}
          style={{
            position: "absolute",
            top: "8px",
            right: "12px",
            fontSize: "28px",
            background: "transparent",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h2>{selectedBurger}</h2>

        {selectedBurger === "Blaze Crunch" && (
          <>
            <img
              src="https://halaljoints.s3.eu-west-2.amazonaws.com/v0-restaurant-thumbs/1czbol3yxj46d.jpg"
              alt="Blaze Crunch burger"
              style={{
                display: "block",
                width: "100%",
                maxWidth: "260px",
                height: "160px",
                objectFit: "cover",
                borderRadius: "12px",
                margin: "12px auto",
              }}
            />
            <p>
  Crispy chicken with spicy sauce and fresh lettuce.
  A delicious burger with a crunchy bite and bold flavor.
</p>

<h4 style={{
  textAlign: "left",
  marginBottom: "4px",
  fontSize: "16px",
}}>
  What's Inside
</h4>
<p>
  Crispy chicken fillet, caramelized onions, fresh lettuce, spicy signature sauce,
  and a soft toasted burger bun.
</p>

<h4 style={{
  textAlign: "left",
  marginBottom: "4px",
  fontSize: "16px",
}}>
  Flavor Profile
</h4>
<p>Crunchy • Savory • Spicy</p>

<h4 style={{
  textAlign: "left",
  marginBottom: "4px",
  fontSize: "16px",
}}>
  Perfect For
</h4>
<p>Chicken lovers who enjoy a little heat!</p>

<h3>₱159</h3>
          </>
        )}
        {selectedBurger === "Smoky Stack" && (
  <>
    <img
      src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
      alt="Golden Melt burger"
      style={{
        display: "block",
        width: "100%",
        maxWidth: "260px",
        height: "160px",
        objectFit: "cover",
        borderRadius: "12px",
        margin: "12px auto",
      }}
    />

    <p style={{
      textAlign: "justify",
      lineHeight: "1.5",
      margin: "4px 0 12px",
    }}>
      Enjoy the Smoky Stack, featuring two juicy beef patties
      covered in rich, melted cheese for a satisfying,
      savory burger experience.
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      What's Inside
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Beef patty, smoky cheese, onions, BBQ sauce and a soft burger bun.
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      Flavor Profile
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Smoky • Savory • Tangy
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      Perfect For
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Those who enjoy a rich, smoky BBQ burger.
    </p>

    <h3>₱179</h3>
  </>
        )}

        {selectedBurger === "Golden Melt" && (
  <>
    <img
      src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80"
      alt="Golden Melt double beef burger"
      style={{
        display: "block",
        width: "100%",
        maxWidth: "260px",
        height: "160px",
        objectFit: "cover",
        borderRadius: "12px",
        margin: "12px auto",
      }}
    />

    <p style={{
      textAlign: "justify",
      lineHeight: "1.5",
      margin: "4px 0 12px",
    }}>
      Meet the Golden Melt — a satisfying double beef burger
      topped with rich, melted cheese for a deliciously savory
      and cheesy bite.
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      What's Inside
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Double beef patty, melted cheese, and a soft burger bun.
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      Flavor Profile
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Savory • Rich • Cheesy
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      Perfect For
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Beef lovers who enjoy a rich, cheesy burger.
    </p>

    <h3>₱199</h3>
  </>
        )}
        {selectedBurger === "Firecracker Beef" && (
  <>
    <img
      src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80"
      alt="Firecracker Beef burger"
      style={{
        display: "block",
        width: "100%",
        maxWidth: "260px",
        height: "160px",
        objectFit: "cover",
        borderRadius: "12px",
        margin: "12px auto",
      }}
    />

    <p style={{
      textAlign: "justify",
      lineHeight: "1.5",
      margin: "4px 0 12px",
    }}>
      Turn up the flavor with Firecracker Beef, a juicy beef
      burger with jalapeños, onions, and hot sauce for a bold,
      spicy kick.
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      What's Inside
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Beef patty, jalapeños, onions, hot sauce, and a soft burger bun.
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      Flavor Profile
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Spicy • Savory • Bold
    </p>

    <h4 style={{ textAlign: "left", marginBottom: "4px" }}>
      Perfect For
    </h4>
    <p style={{ textAlign: "justify", lineHeight: "1.5" }}>
      Those who enjoy a bold, spicy beef burger.
    </p>

    <h3>₱189</h3>
  </>
)}
</div>
    </div>,
    document.body
  )}

{showAbout &&
  createPortal(
    <div
      onClick={() => setShowAbout(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000000,
        padding: "16px",
        boxSizing: "border-box",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "500px",
          background: "#1c1c1c",
          color: "white",
          padding: "32px",
          borderRadius: "18px",
          boxSizing: "border-box",
          textAlign: "justify",
          lineHeight: "1.7",
        }}
      >
        <button
          onClick={() => setShowAbout(false)}
          style={{
            position: "absolute",
            top: "8px",
            right: "12px",
            fontSize: "28px",
            background: "transparent",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h2>Good Burgers. Bold Flavor.</h2>

        <p style={{ textAlign: "justify" }}>
          At Bun and Blaze, great burgers start with bold flavors
          and quality ingredients. From crispy chicken to savory
          beef creations, every burger is made to satisfy your
          cravings and make every bite memorable.
        </p>
      
      </div>
    </div>,
    document.body
  )}

  {showContact &&
  createPortal(
    <div
      onClick={() => setShowContact(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10000,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#30252B",
          color: "white",
          padding: "30px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "450px",
          position: "relative",
          textAlign: "center",
        }}
      >
        <button
          onClick={() => setShowContact(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h2>Contact Bun &amp; Blaze</h2>
        <p>We'd love to hear from you!</p>

        <div style={{ textAlign: "left", lineHeight: "2" }}>
          <p>📍 Visit us for your burger cravings.</p>
          <p>🍔 Fresh burgers. Bold flavors.</p>
          <p>💬 Have a question? Talk to our team.</p>
        </div>

        <button
          onClick={() => setShowContact(false)}
          style={{
            marginTop: "15px",
            padding: "10px 24px",
            border: "none",
            borderRadius: "8px",
            background: "#E85D75",
            color: "white",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  )}
  {showCart &&
  createPortal(
    <div
      onClick={() => setShowCart(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10001,
        padding: "20px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#30252B",
          color: "white",
          padding: "30px",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={() => setShowCart(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: "28px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h2>Your Order</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty. Add a burger to get started!</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  borderBottom: "1px solid #66545D",
                  padding: "12px 0",
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
  <button
    onClick={() => changeQuantity(item.name, -1)}
    style={{ padding: "4px 12px", cursor: "pointer" }}
  >
    −
  </button>

  <span>{item.quantity}</span>

  <button
    onClick={() => changeQuantity(item.name, 1)}
    style={{ padding: "4px 12px", cursor: "pointer" }}
  >
    +
  </button>
</div>
<p style={{ margin: "5px 0" }}>
  ₱{item.price} each
</p>
                </div>

                <strong>
                  ₱{item.price * item.quantity}
                </strong>
              </div>
            ))}

            
          </>
        )}
        

        <button
          onClick={() => setShowCart(false)}
          style={{
            marginTop: "15px",
            padding: "10px 24px",
            border: "none",
            borderRadius: "8px",
            background: "#E85D75",
            color: "white",
            cursor: "pointer",
          }}
        >
           Order More
        </button>

      <button
  onClick={() => {
    setShowCart(false);
    setShowCheckout(true);
  }}
  style={{
    marginTop: "10px",
    padding: "10px 24px",
    border: "none",
    borderRadius: "8px",
    background: "#E85D75",
    color: "white",
    cursor: "pointer",
    width: "100%",
  }}
>
  Checkout
</button>

      </div>
    </div>,
    document.body
  )}

  {showCheckout && (
  <section
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 10002,
      background: "#1c1c1c",
      color: "white",
      padding: "30px 20px",
      overflowY: "auto",
      boxSizing: "border-box",
    }}
  >
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>{orderConfirmed ? "Order Confirmed!" : "Checkout"}</h1>
      <p>
  {orderConfirmed
    ? "Thank you for ordering from Bun & Blaze!"
    : "Review your Bun & Blaze order."}
</p>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Please add a burger first.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "12px",
                padding: "14px 0",
                borderBottom: "1px solid #66545D",
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>
                ₱{item.price * item.quantity}
              </strong>
            </div>
          ))}

          <h2 style={{ textAlign: "right", marginTop: "24px" }}>
            Total: ₱
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </h2>
          <button
  onClick={() => setOrderConfirmed(true)}
  disabled={cartItems.length === 0}
  style={{
    marginTop: "10px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#E85D75",
    color: "white",
    cursor: "pointer",
    width: "100%",
    opacity: cartItems.length === 0 ? 0.5 : 1,
  }}
>
  Place Order
</button>
        </>
      )}

      <button
  onClick={() => {
    if (orderConfirmed) {
      setCartItems([]);
      setCartCount(0);
      setOrderConfirmed(false);
      setShowCheckout(false);
    } else {
      setShowCheckout(false);
    }
  }}
  style={{
    marginTop: "10px",
    padding: "12px 20px",
    border: "1px solid #E85D75",
    borderRadius: "8px",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    width: "100%",
  }}
>
  {orderConfirmed ? "Finish" : "Back"}
</button>
    </div>
  </section>
)}

  
    </div>
  );
}

export default App;
