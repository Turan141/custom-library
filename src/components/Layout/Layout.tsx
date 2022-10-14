// Core
import * as React from 'react';

// Components
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import { H1 } from '@components/Typography';

// Helpers
import { useRouter } from '@helpers/useRouter';

// Styles
import styles from './Layout.module.scss';

export type LinkProps = {
  id: string;
  icon?: React.ReactNode;
  title: string;
  to: string;
}

export interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
  sidebar: LinkProps[];
  navigation: LinkProps[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title: titleProp = '',
  sidebar,
  navigation
}) => {
  const [title, setTitle] = React.useState(titleProp);

  const { pathname } = useRouter();

  const changeTitle = React.useCallback(() => {
    const matchedTitle = sidebar.find((item) => {
      return pathname.includes(item.to);
    })?.title;

    if (matchedTitle) {
      setTitle(matchedTitle);
    } else {
      setTitle(titleProp);
    }
  }, [titleProp, sidebar, pathname]);

  React.useEffect(changeTitle, [changeTitle]);

  return (
    <div className={styles.root}>
      <Header className={styles.header} navigation={navigation} />

      <div className={styles.wrapper}>
        <Sidebar className={styles.sidebar}>
          {sidebar.map((item) => (
            <Sidebar.Item key={item.id} to={item.to} icon={item.icon}>
              {item.title}
            </Sidebar.Item>
          ))}
        </Sidebar>

        <main className={styles.main}>
          <H1 className={styles.title}>{title}</H1>
          <div className={styles.block}>{children}</div>
        </main>
      </div>
    </div>
  );
};

// Exports
export default Layout;
