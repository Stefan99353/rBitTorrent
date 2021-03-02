export class AppConfig {
  [key: string]: any

  displayedColumns: string[];
  decimals: number;
  pageSizes: number[];
  syncInterval: number;
  propertiesSyncInterval: number;
  displayedTrackerColumns: string[];
  displayedPeerColumns: string[];

  constructor() {
    this.displayedColumns = DEFAULT_COLUMNS;
    this.decimals = 2;
    this.pageSizes = [10, 25, 50, 100];
    this.syncInterval = 1000;
    this.propertiesSyncInterval = 5000;
    this.displayedTrackerColumns = ALL_TRACKER_COLUMNS;
    this.displayedPeerColumns = ALL_PEER_COLUMNS;
  }
}

export const ALL_COLUMNS = [
  'select',
  'added_on',
  'amount_left',
  'auto_tmm',
  'availability',
  'category',
  'completed',
  'completion_on',
  'content_path',
  'dl_limit',
  'dlspeed',
  'downloaded',
  'downloaded_session',
  'eta',
  'f_l_piece_prio',
  'force_start',
  'hash',
  'last_activity',
  'magnet_uri',
  'max_ratio',
  'max_seeding_time',
  'name',
  'priority',
  'progress',
  'ratio',
  'ratio_limit',
  'save_path',
  'seeding_time_limit',
  'seen_complete',
  'seq_dl',
  'size',
  'state',
  'super_seeding',
  'tags',
  'time_active',
  'total_size',
  'tracker',
  'up_limit',
  'uploaded',
  'uploaded_session',
  'upspeed'
];
export const DEFAULT_COLUMNS = [
  'select',
  'name',
  'size',
  'progress',
  'state',
  'seeds',
  'peers',
  'dlspeed',
  'upspeed',
  'eta',
  'ratio',
  'category',
  'tags',
  'availability'
];

export const ALL_TRACKER_COLUMNS = [
  'tier',
  'url',
  'status',
  'num_peers',
  'num_seeds',
  'num_leeches',
  'num_downloaded',
  'msg'
];

export const ALL_PEER_COLUMNS = [
  'country',
  'ip',
  'port',
  'connection',
  'flags',
  'client',
  'progress',
  'dl_speed',
  'up_speed',
  'downloaded',
  'uploaded',
  'relevance',
  'files',

  // 'flags_desc',
];
