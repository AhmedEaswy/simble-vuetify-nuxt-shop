export default {
  app: {
    appName: "myProject", // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    // appLogoImage: require('@/assets/images/logo/logo.svg'), // Will update logo in navigation menu (Branding)
    theme: "light",
    themeColors: {
      primary: "#e7b74f",
      success: "#24e1b5",
      danger: "#EA5455",
      warning: "#FF9F43",
      dark: "#1E1E1E",
    },
    layout: {
      langs: ["en", "ar"],
      lang: "en",
      dir: "ltr",
      isRTL: false,
      theme: "light", // light, dark, bordered, semi-dark
      routerTransition: "slide-fade", // zoom-fade, slide-fade, fade-bottom, fade, zoom-out, none
      type: "vertical", // vertical, horizontal
      contentWidth: "full", // full, boxed
      menu: {
        hidden: false,
        isCollapsed: false,
      },
      navbar: {
        // ? For horizontal menu, navbar type will work for navMenu type
        type: "floating", // static , sticky , floating, hidden
        backgroundColor: "", // BS color options [primary, success, etc]
      },
      footer: {
        type: "static", // static, sticky, hidden
      },
      customizer: true,
      enableScrollToTop: true,
    },
  },
};
