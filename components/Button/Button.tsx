import { useEffect } from "react";
import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";
import ArrowIcon from './arrow.svg';
// or alternative for svg: https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js
import cn from "classnames";
import { motion, useMotionValue } from 'framer-motion';

export const Button = ({ appearance, className, arrow = 'none', children, ...props }: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1);

  useEffect(() => {
    scale.onChange(s => console.log(s));
  }, []);
  
  return (
    <motion.button
      whileHover={{ scale: 1.5 }}
      className={cn(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.ghost]: appearance == 'ghost'
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && <span className={cn(styles.arrow, {
        [styles.down]: arrow === 'down'
      })}>
          <ArrowIcon />
        </span>}
    </motion.button>
  );
};
