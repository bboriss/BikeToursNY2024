import { NextRouter } from 'next/router';
import { i18n } from 'next-i18next';

export const changeLanguageAndRoute = (
  router: NextRouter,
  newLocale: string
) => {
  const { pathname, asPath, query } = router;
  
  i18n?.changeLanguage(newLocale).then(() => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
  });
};
