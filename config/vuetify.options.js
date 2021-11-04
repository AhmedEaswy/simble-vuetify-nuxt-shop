import en from 'assets/locales/en/vuetify';
import ar from 'assets/locales/ar/vuetify';



export default function({app}) {
  return {
    dark: false,
    theme: {
      options: {
        customProperties: true
      }
    },
    lang: {
      locales: { ar, en },
      current: "ar",
    },
    config: {
      silent: true
    }
  }

}
