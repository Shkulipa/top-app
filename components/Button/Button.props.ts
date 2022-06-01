import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

/* export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
  appearance: 'primary' | 'ghost';
  arrow?: 'right' | 'down' | 'none';
} */

export interface ButtonProps extends 
  Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
> {
  children: ReactNode;
  appearance: 'primary' | 'ghost';
  arrow?: 'right' | 'down' | 'none';
}