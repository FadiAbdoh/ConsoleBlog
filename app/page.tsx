
import Image from "next/image";
import styles from './page.module.css'
import Button from "./components/Buttons/Button";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-[20px] md:gap-[100px] min-h-[calc(100vh-150px)]">
      <div className="flex-1 flex flex-col gap-[30px] text-center md:text-left">
        <h1 className="text-[30px] md:text-[45px] font-bold bg-gradient-to-b from-[#2e8b57] to-[#bbb] bg-clip-text text-transparent leading-tight capitalize">
          better design for your digital products.
        </h1>
        <p className="text-[20px] md:text-[24px] font-light text-muted">
          Turning your Idea into Reality. We bring together the teams from the global tech industry.
        </p>
        <Button text="see your work" url="/portfolio" padding={10}/>
      </div>
      <div className="flex-8 md:flex-1 relative w-full h-[300px]">
        <Image 
          src='/hero.png' 
          fill 
          alt="Hero image" 
          className="object-contain animate-move"
          id={styles.img}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>
    </div>

    
  );
}



