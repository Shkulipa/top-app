import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Button, Divider, Rating, Review, ReviewForm, Tag } from "..";
import { priceRu, decOfNum } from "../../helpers/helpers";
import cn from "classnames";
import { useRef, useState, forwardRef, ForwardedRef } from "react";
import { motion } from "framer-motion";

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
  const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const scrollToReview = () => {
    setIsReviewOpened(true);
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    reviewRef.current?.focus();
  };

  const variants = {
    visiable: { opacity: 1, height: 'auto', marginTop: 20 },
    hidden: { opacity: 0, height: 0, marginTop: 0 }
  };

  const src = process.env.NEXT_PUBLIC_DOMAIN + product.image;
  
  return (
    <div className={className} {...props} ref={ref}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <img 
            src={src}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span><span className="visualyHidden">цена</span>{priceRu(product.price)}</span>
          {product.oldPrice && 
            <Tag className={styles.oldPrice} color='green'>
              <span className="visualyHidden">скидка</span>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          }
        </div>
        <div className={styles.credit}>
          <span className="visualyHidden">кредит</span>
          {product.credit}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <span className="visualyHidden">рейтинг {product.reviewAvg ?? product.initialRating}</span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map(c => <Tag key={c} className={styles.category} color='ghost'>{c}</Tag>)}
        </div>
        <div className={styles.priceTitle} aria-hidden={true}>цена</div>
        <div className={styles.creditTitle} aria-hidden={true}>кредит</div>
        <div className={styles.ratingTitle}>
          <a href="#ref" onClick={scrollToReview}>
            {product.reviewCount} {decOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
          </a>
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map(c => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages &&<div className={styles.advantages}>
            <div className={styles.advTitle}>Преимущества</div>
            {product.advantages}
          </div>}
          {product.disadvantages && <div className={styles.disadvantages}>
            <div className={styles.advTitle}>Недостатки</div>
            {product.disadvantages}
          </div>}
        </div>
        <Divider className={cn(styles.hr, styles.hr2)} />
        <div className={styles.actions}>
          <Button appearance='primary'>Узнать подробнее</Button>
          <Button 
            appearance='ghost' 
            arrow={isReviewOpened ? 'down' : 'right'}
            className={styles.reviewBtn}
            onClick={() => setIsReviewOpened(s => !s)}
            aria-expanded={isReviewOpened}
          >Читать отзывы</Button>
        </div>
      </Card>
      <motion.div
         variants={variants}
         initial='hidden'
         animate={isReviewOpened ? 'visiable' : 'hidden'}
      >
        <Card 
          color="blue" 
          className={cn(styles.reviews)} 
          ref={reviewRef}
          tabIndex={isReviewOpened ? 0 : -1}
        >
          {product.reviews.map(r => (
            <div key={r._id}>
              <Review review={r}/>
              <Divider />
            </div>
          ))}
          <ReviewForm productId={product._id} isOpened={isReviewOpened}/>
        </Card>
      </motion.div>
    </div>
  );
}));
