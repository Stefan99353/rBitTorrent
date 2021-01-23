/* tslint:disable:variable-name no-inferrable-types */
export class GlobalTransferInfo {
  [key: string]: any

  alltime_dl: number = 0;
  alltime_ul: number = 0;
  average_time_queue: number = 0;
  connection_status: 'connected' | 'firewalled' | 'disconnected' = 'connected';
  dht_nodes: number = 0;
  dl_info_data: number = 0;
  dl_info_speed: number = 0;
  dl_rate_limit: number = 0;
  free_space_on_disk: number = 0;
  global_ratio: string = '';
  queued_io_jobs: number = 0;
  queueing: boolean = false;
  read_cache_hits: string = '';
  read_cache_overload: string = '';
  refresh_interval: number = 0;
  total_buffers_size: number = 0;
  total_peer_connections: number = 0;
  total_queued_size: number = 0;
  total_wasted_session: number = 0;
  up_info_data: number = 0;
  up_info_speed: number = 0;
  up_rate_limit: number = 0;
  use_alt_speed_limits: boolean = false;
  write_cache_overload: string = '';
}
