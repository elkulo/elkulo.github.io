import React from 'react'
import HomeIcon from '@mui/icons-material/Home'
import AboutIcon from '@mui/icons-material/Person'
import ProductIcon from '@mui/icons-material/Grain'
import ContactIcon from '@mui/icons-material/Send'
import thumbnail from '@/assets/videos/landscape/landscape.jpg?url'
import styles from './main-navigation.module.scss'
import { baseUrl } from '@/lib/url'

/**
 * ナビゲーション
 *
 * @return {JSX.Element}
 */
export default function MainNavigation() {
  const base = baseUrl()

  const naviList = [
    {
      ident: encodeURI('home'),
      name: 'HOME',
      url: base,
      icon: () => <HomeIcon />,
    },
    {
      ident: encodeURI('about'),
      name: 'ABOUT',
      url: `${base}about`,
      icon: () => <AboutIcon />,
    },
    {
      ident: encodeURI('product'),
      name: 'PRODUCT',
      url: `${base}product`,
      icon: () => <ProductIcon />,
    },
    {
      ident: encodeURI('contact'),
      name: 'CONTACT',
      url: `${base}contact`,
      icon: () => <ContactIcon />,
    },
  ]

  return (
    <nav className="main-navigation">
      <div className={styles.avatar}>
        <div className={styles.avatar__item}>
          <img src={thumbnail} alt="" />
        </div>
      </div>
      <ul className={styles.list}>
        {naviList.map(navi => (
          <li key={navi.ident} className={styles.list__item}>
            <a href={navi.url}>
              <navi.icon className={styles.list__item__icon} />
              {navi.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
