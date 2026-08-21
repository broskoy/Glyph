
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div style={{ 
        minHeight: "calc(100vh - 80px)", 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "4rem 2rem", 
        textAlign: "center" 
      }}>
        
        {/* Placeholder Logo Ring */}
        <div className="animate-shrink-fade" style={{ marginBottom: "4rem" }}>
          <div style={{
            width: "clamp(12rem, 25vw, 16rem)",
            height: "clamp(12rem, 25vw, 16rem)",
            border: "8px solid white",
            borderRadius: "50%",
            margin: "0 auto",
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)"
          }}></div>
        </div>

        {/* Brand Text - Staggered Letters */}
        <div style={{ margin: 0, padding: 0 }}>
          <h1 style={{ 
            fontSize: "clamp(3rem, 8vw, 5rem)", 
            lineHeight: 1,
            margin: 0,
            letterSpacing: "0.2em",
            color: "white",
            fontWeight: "900",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "center"
          }}>
            {['G', 'L', 'Y', 'P', 'H'].map((letter, index) => (
              <span 
                key={index} 
                className="animate-pop-in" 
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

    </>
  );
}
