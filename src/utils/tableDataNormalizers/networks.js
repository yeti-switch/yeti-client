export const formatNetworks = (networks = []) => networks.map((network, index) => ({ ...network, 'network-type': network['network-type'].name, key: index }));

