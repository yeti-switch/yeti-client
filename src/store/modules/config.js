const getters = {
  blockedPages: () => YETI_CONFIG.yeti.blockedPages,
  apiBaseUrl: () => YETI_CONFIG.yeti.apiBaseUrl,
  linkOnLogo: () => YETI_CONFIG.yeti.linkOnLogo,
  locale: () => YETI_CONFIG.yeti.locale,
};

export default {
  getters,
};
