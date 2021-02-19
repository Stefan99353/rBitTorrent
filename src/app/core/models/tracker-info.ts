/* tslint:disable:variable-name no-inferrable-types */
export class TrackerInfo {
  [key: string]: any

  url: string = '';
  status: number = 0;
  tier: number = 0;
  num_peers: number = 0;
  num_seeds: number = 0;
  num_leeches: number = 0;
  num_downloaded: number = 0;
  msg: string = '';
}
