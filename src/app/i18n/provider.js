import React from "react";
import { Fragment } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./locales";
import messages from "./messages";


export default function Provider({ children, locale = LOCALES.en, ...rest }) {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={messages[locale]}
      {...rest}
    >
      {children}
    </IntlProvider>
  );
}