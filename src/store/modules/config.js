const getters = {
  blockedPages: () => YETI_CONFIG.yeti.blockedPages,
  apiBaseUrl: () => YETI_CONFIG.yeti.apiBaseUrl,
  linkOnLogo: () => YETI_CONFIG.yeti.linkOnLogo,
};

export default {
  getters,
};
