export const formatNetworks = (networks = []) => networks.map((network) => ({ ...network, 'network-type': network['network-type'].name }));

