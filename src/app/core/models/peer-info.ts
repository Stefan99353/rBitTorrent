/* tslint:disable:variable-name no-inferrable-types */
export class PeerInfo {
  [key: string]: any

  client: string = '';
  connection: string = '';
  country: string = '';
  country_code: string = '';
  dl_speed: number = 0;
  downloaded: number = 0;
  files: string = '';
  flags: string = '';
  flags_desc: string = '';
  ip: string = '';
  port: number = 0;
  progress: number = 0;
  relevance: number = 0;
  up_speed: number = 0;
  uploaded: number = 0;
}
