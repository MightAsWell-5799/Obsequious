export { download, makePolarLine };
declare function download(url: any, dest: any): Promise<void>;
declare function makePolarLine(theta: number, speed: number, changeInY2: number, gravityOrAcceleration2: number, serverID: string, messageID: string): Promise<string>;
