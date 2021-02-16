export class AppConfig {
  [key: string]: any

  displayedColumns: string[];
  decimals: number;
  pageSizes: number[];
  syncInterval: number;
  propertiesSyncInterval: number;

  constructor() {
    this.displayedColumns = ALL_COLUMNS;
    this.decimals = 2;
    this.pageSizes = [10, 25, 50, 100];
    this.syncInterval = 1000;
    this.propertiesSyncInterval = 5000;
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
  'num_complete',
  'num_incomplete',
  'num_leechs',
  'num_seeds',
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
