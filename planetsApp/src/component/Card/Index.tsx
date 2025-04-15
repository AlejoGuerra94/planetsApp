import { ReactNode } from "react";
import styles from "./Card.module.scss";

interface IImage {
  src: string;
  alt?: string;
  classNameImg?: string;
}

export interface ICard {
  title: String;
  description?: ReactNode;
  image?: IImage;
  className?: string;
}
export const Card = ({ title, description, image, className }: ICard) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {image?.src && (
        <img
          className={`${styles.img} ${image?.classNameImg}`}
          src={image?.src}
          alt={image?.alt || ""}
        />
      )}
      <div className={styles.content}>
        {<h3 className={styles.title}>{title}</h3>}
        {description && <div className={styles.description}>{description}</div>}
      </div>
    </div>
  );
};

export default Card;
