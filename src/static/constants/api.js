export const RESOURCES = {
  RATE: 'rate',
  CDR: 'cdr',
  AUTH_ORIGIN_TRANSPORT_PROTOCOL: 'authOrigTransportProtocol',
  ACCOUNT: 'account'
}

export const RELATIONSHIPS = {
  [RESOURCES.RATE]: {
    prefix: '',
    initialRate: '',
    initialInterval: '',
    nextRate: '',
    nextInterval: '',
    connectFee: '',
    rejectCalls: '',
    validFrom: '',
    validTill: '',
    networkPrefixId: ''
  },
  [RESOURCES.CDR]: {
    timeStart: '',
    timeConnect: '',
    timeEnd: '',
    duration: '',
    success: '',
    destinationInitialInterval: '',
    destinationInitialRate: '',
    destinationNextInterval: '',
    destinationNextRate: '',
    destinationFee: '',
    customerPrice: '',
    srcNameIn: '',
    srcPrefixIn: '',
    fromDomain: '',
    dstPrefixIn: '',
    toDomain: '',
    ruriDomain: '',
    diversionIn: '',
    localTag: '',
    legaDisconnectCode: '',
    legaDisconnectReason: '',
    legaRxPayloads: '',
    legaTxPayloads: '',
    authOrigTransportProtocolId: '',
    authOrigIp: '',
    authOrigPort: '',
    legaRxBytes: '',
    legaTxBytes: '',
    legaRxDecodeErrs: '',
    legaRxNoBufErrs: '',
    legaRxParseErrs: '',
    srcPrefixRouting: '',
    dstPrefixRouting: '',
    destinationPrefix: '',
    authOrigTransportProtocol: {
      jsonApi: 'hasMany',
      type: 'comments'
    }
  },
  [RESOURCES.AUTH_ORIGIN_TRANSPORT_PROTOCOL]: {
    authOrigTransportProtocol: 'authOrigTransportProtocol'
  },
  [RESOURCES.ACCOUNT]: {
    name: '',
    balance: '',
    minBalance: '',
    maxBalance: '',
    destinationRateLimit: '',
    originationCapacity: '',
    terminationCapacity: '',
    totalCapacity: ''
  }
}