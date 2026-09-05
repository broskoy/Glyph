import Image from "next/image";

export default function Home() {
  return (
    <div className="paper-page-container">
      <div className="logo-center">
        <Image
          src="/glyphPaperLogo.png"
          alt="Glyph"
          width={500}
          height={500}
          priority
          className="logo"
        />
        <Image
          src="/glyphPaperName.png"
          alt="Glyph"
          width={500}
          height={150}
          priority
          className="text-logo"
        />
      </div>
    </div>
  );
}