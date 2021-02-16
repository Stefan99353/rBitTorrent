/* tslint:disable:variable-name no-inferrable-types */
export class TorrentGenericProperties {
  [key: string]: any

  save_path: string = '';
  creation_date: number = 0;
  piece_size: number = 0;
  comment: string = '';
  total_wasted: number = 0;
  total_uploaded: number = 0;
  total_uploaded_session: number = 0;
  total_downloaded: number = 0;
  total_downloaded_session: number = 0;
  up_limit: number = 0;
  dl_limit: number = 0;
  time_elapsed: number = 0;
  seeding_time: number = 0;
  nb_connections: number = 0;
  nb_connections_limit: number = 0;
  share_ratio: number = 0;
  addition_date: number = 0;
  completion_date: number = 0;
  created_by: string = '';
  dl_speed_avg: number = 0;
  dl_speed: number = 0;
  eta: number = 0;
  last_seen: number = 0;
  peers: number = 0;
  peers_total: number = 0;
  pieces_have: number = 0;
  pieces_num: number = 0;
  reannounce: number = 0;
  seeds: number = 0;
  seeds_total: number = 0;
  total_size: number = 0;
  up_speed_avg: number = 0;
  up_speed: number = 0;
}
