import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Link from 'components/common/Link';
// import Icon from 'components/common/Icon';
import LanguageButton from 'components/settings/LanguageButton';
import ThemeButton from 'components/settings/ThemeButton';
import HamburgerButton from 'components/common/HamburgerButton';
import UpdateNotice from 'components/common/UpdateNotice';
import UserButton from 'components/settings/UserButton';
import { HOMEPAGE_URL } from 'lib/constants';
import useConfig from '/hooks/useConfig';
import useUser from 'hooks/useUser';
// import Logo from 'assets/logo.svg';
import styles from './Header.module.css';

export default function Header() {
  const { user } = useUser();
  const { pathname } = useRouter();
  const { updatesDisabled } = useConfig();
  const isSharePage = pathname.includes('/share/');
  const allowUpdate = user?.is_admin && !updatesDisabled && !isSharePage;

  return (
    <>
      {allowUpdate && <UpdateNotice />}
      <header className={classNames(styles.header, 'row')}>
        <div className={styles.title}>
          <Link href={isSharePage ? HOMEPAGE_URL : '/'}>
            <b>DCL-Metrics</b>
          </Link>
        </div>
        <HamburgerButton />
        {user && (
          <div className={styles.links}>
            <Link href="/dashboard">
              <FormattedMessage id="label.dashboard" defaultMessage="Dashboard" />
            </Link>
            <Link href="/realtime">
              <FormattedMessage id="label.realtime" defaultMessage="Realtime" />
            </Link>
            <a
              className={styles.textLink}
              href="https://dashboard.usefixie.com/#/logs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="label.vital" defaultMessage="Fixie Log" />
            </a>
            <a
              className={styles.textLink}
              href="https://sentry.io/organizations/dcl-metrics/projects/dcl-metrics-fe/?project=6660841"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="label.vital" defaultMessage="Sentry FE" />
            </a>
            <a
              className={styles.textLink}
              href="https://sentry.io/organizations/dcl-metrics/projects/dcl-metrics-be/?project=6668384"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FormattedMessage id="label.vital" defaultMessage="Sentry BE" />
            </a>
            <Link href="/settings">
              <FormattedMessage id="label.settings" defaultMessage="Settings" />
            </Link>
          </div>
        )}
        <div className={styles.buttons}>
          <ThemeButton />
          <LanguageButton menuAlign="right" />
          {user && <UserButton />}
        </div>
      </header>
    </>
  );
}
