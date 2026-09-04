import CardCarousel from './CardCarousel';
import styles from './Info.module.css';

export default function Info() {
  return (
    <div className="paper-page-container">
      <h1 className={`title-gradient ${styles.aboutTitle}`} style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)", textAlign: "center" }}>
        About Us
      </h1>

      <CardCarousel />
      <div style={{ marginTop: "clamp(3rem, 6vw, 4rem)", maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>Who are we?</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "clamp(1.5rem, 5vw, 3.5rem)", fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>
          Glyph is Scala's art companion. Regardless of your experience with art or the medium you like, if you are passionate about painting, drawing, sketching, and creating in general, Glyph welcomes you into this community. We have weekly free-to-join themed art evenings and regular workshops, challenges, and more.        </p>

        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>Do I need to pay anything to join?</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "clamp(1.5rem, 5vw, 3.5rem)", fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>
          Nope. You can come to our workshops for free, you don't need to pay to be part of the community. We have a pretty big reserve of tools, items and materials that can be used for free during a special workshop. The only time we would ask for money is if we want to organize a more bigger and fancier workshop where we don't have specific materials or tools in our reserve.        </p>

        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>Can I come and draw unrelated to the workshop?</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "clamp(2rem, 5vw, 4rem)", fontSize: "clamp(1rem, 3vw, 1.2rem)" }}>
          YES! You can just come to just sketch your own things and yap your mind away to others while they are making their own zine, portrait of a friend or whatever else that day's workshop might be running.        </p>
      
        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>Here is a link to our...</h2>
        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>
        <a href="https://instagram.com/glyph_eindhoven" target="_blank" rel="noopener noreferrer">
        Instagram
        </a>
        </h2>
        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>
        <a href="https://instagram.com/glyph_eindhoven" target="_blank" rel="noopener noreferrer">
        Whatsapp
        </a>
        </h2>
        <h2 style={{ fontSize: "clamp(1.2rem, 4vw, 1.6rem)", marginBottom: "0.2rem", opacity: 0.9 }}>
        <a href="https://instagram.com/glyph_eindhoven" target="_blank" rel="noopener noreferrer">
        Discord
        </a>
        </h2>
        </div>
    </div>
  );
}
