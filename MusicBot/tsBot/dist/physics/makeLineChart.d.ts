export { download, makePairs, sortPairs, makeLineChart };
declare function download(url: string, dest: string): Promise<void>;
declare function makePairs(messageArray: any): Promise<any[][]>;
declare function sortPairs(pairsIn: any): Promise<any>;
declare function makeLineChart(messageArray: any, serverID: string, messageID: string): Promise<string>;
