import styles from "./Menu.module.css";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion } from 'framer-motion';

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
  const router = useRouter();

  const variants = {
    visiable: {
      marginBottom: 20,
      height: 'auto',
      transition: {

        staggerChildren: 0.07
      }
    },
    hidden: { marginBottom: 0, height: 0 }
  };

  const variantsChildren = {
    visiable: {
      opacity: 1,
    },
    hidden: { 
      opacity: 0,
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu && setMenu(menu.map(m => {
      if(m._id.secondCategory == secondCategory) {
        setAnnounce(m.isOpened ? 'closed' : 'opened');
        m.isOpened = !m.isOpened;
      }
      return m;
    }));
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCaregory: string) => {
    key.preventDefault();
    key.code == 'Space' || key.code =='Enter' && openSecondLevel(secondCaregory);
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map(m => (
          <li key={m.route} aria-expended={m.id == firstCategory}>
            <Link href={`/${m.route}`}>
              <a>
                <div className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id == firstCategory
                })}>
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            
            {m.id == firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };
  
  const buildSecondLevel = (menuItem: FirstLevelMenuItem): JSX.Element => {    
    return (
      <ul className={styles.secondBlock}>
        {menu.map(m => {
          if(m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true;
          }

          return (
            <li key={m._id.secondCategory}>
              <button 
                tabIndex={0} 
                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} 
                className={styles.secondLevel} 
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? 'visiable' : 'hidden'}
                animate={m.isOpened ? 'visiable' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return (
      pages.map(p => {
        const path = `/${route}/${p.alias}`;
        return (
          <motion.li 
            key={p._id}
            variants={variantsChildren}
          >
            <Link href={path}>
              <a 
                tabIndex={isOpened ? 0 : -1} 
                className={cn(styles.thirdLevel, {
                  [styles.thirdLevelActive]: path == router.asPath 
                })}
                aria-current={path == router.asPath ? 'page' : false}
              >
                {p.category}
              </a>
            </Link>
          </motion.li>
        );
      })
    );
  };

  return (
    <nav className={styles.menu} role='navigation'>
      {announce && <span role='log' className="visualyHidden">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
      {buildFirstLevel()}
    </nav>
  );
};
