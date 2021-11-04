// ~/plugins/i18n.js

export default function({ app }) {
  // beforeLanguageSwitch called right before setting a new locale
  app.head.htmlAttrs.lang = app.i18n.locale;
  if (app.i18n.locale === 'ar') {
    app.head.htmlAttrs.dir = 'rtl'
    app.vuetify.rtl = true
    app.vuetify.framework.rtl = true
  } else {
    app.head.htmlAttrs.dir = 'ltr'
    app.vuetify.rtl = false
    app.vuetify.framework.rtl = false
  }

  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    if (newLocale === 'ar') {
      app.vuetify.framework.rtl = true
      app.head.htmlAttrs.dir = 'rtl'
    } else {
      app.vuetify.framework.rtl = false
      app.head.htmlAttrs.dir = 'ltr'
    }
  }

  // app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale, isInitialSetup, context) => {
  //   console.log(oldLocale, newLocale, isInitialSetup)
  // }
  // onLanguageSwitched called right after a new locale has been set
  app.i18n.onLanguageSwitched = (oldLocale, newLocale) => {
    if (newLocale === 'ar') {
      app.vuetify.framework.rtl = true
      app.head.htmlAttrs.dir = 'rtl'
      app.head.htmlAttrs.lang = newLocale
    } else {
      app.vuetify.framework.rtl = false
      app.head.htmlAttrs.dir = 'ltr'
      app.head.htmlAttrs.lang = newLocale
    }
    app.vuetify.framework.lang.current = newLocale
    // console.log(oldLocale, newLocale)
  }

}
