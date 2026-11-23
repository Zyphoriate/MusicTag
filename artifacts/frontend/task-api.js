import {GET, POST, PUT, DELETE, reUrl} from '../../axiosconfig/axiosconfig'

export default {
    login: function (params) {
        return POST(reUrl + '/apimt/token/', params)
    },
    loginInfo: function (params) {
        return GET(reUrl + '/user/info/', params)
    },
    activeCode: function (params) {
        return POST(reUrl + '/user/active/', params)
    },
    roleList: function (params) {
        return GET(reUrl + '/user/role_list/', params)
    },
    updateRoleUsers: function (params) {
        return POST(reUrl + '/user/update_role_users/', params)
    },
    createRoleUser: function (params) {
        return POST(reUrl + '/user/create_role_user/', params)
    },
    updateRoleUser: function (params) {
        return POST(reUrl + '/user/update_role_user/', params)
    },
    subsonicPassword: function (params) {
        return GET(reUrl + '/user/subsonic_password/', params)
    },
    updateSubsonicPassword: function (params) {
        return POST(reUrl + '/user/update_subsonic_password/', params)
    },
    lastfmProfile: function (params) {
        return GET(reUrl + '/user/lastfm_profile/', params)
    },
    updateLastfmProfile: function (params) {
        return POST(reUrl + '/user/update_lastfm_profile/', params)
    },
    logout: function (params) {
        return POST(reUrl + '/logout/', params)
    },
    fileList: function (params) {
        return POST(reUrl + '/apimt/file_list/', params)
    },
    fileID3List: function (params) {
        return POST(reUrl + '/apimt/file_id3_list/', params)
    },
    musicId3: function (params) {
        return POST(reUrl + '/apimt/music_id3/', params)
    },
    getOriginalArtwork: function (params) {
        return POST(reUrl + '/apimt/get_original_artwork/', params)
    },
    updateId3: function (params) {
        return POST(reUrl + '/apimt/update_id3/', params)
    },
    batchUpdateId3: function (params) {
        return POST(reUrl + '/apimt/batch_update_id3/', params)
    },
    renameFiles: function (params) {
        return POST(reUrl + '/apimt/rename_files/', params)
    },
    importMusicIn: function (params) {
        return POST(reUrl + '/apimt/import_music/', params)
    },
    batchAutoUpdateId3: function (params) {
        return POST(reUrl + '/apimt/batch_auto_update_id3/', params)
    },
    batchBackgroundScrape: function (params) {
        return POST(reUrl + '/apimt/batch_background_scrape/', params)
    },
    scrapeFailureWorkbench: function (params) {
        return GET(reUrl + '/apimt/scrape_failure_workbench/', params)
    },
    scrapeFailureWorkbenchLabel: function (params) {
        return POST(reUrl + '/apimt/scrape_failure_workbench_label/', params)
    },
    scrapeFailureWorkbenchReplay: function (params) {
        return POST(reUrl + '/apimt/scrape_failure_workbench_replay/', params)
    },
    scrapeFailureWorkbenchBatchReplay: function (params) {
        return POST(reUrl + '/apimt/scrape_failure_workbench_batch_replay/', params)
    },
    aiParseMetadata: function (params) {
        return POST(reUrl + '/apimt/ai_parse_metadata/', params)
    },
    tidyFolder: function (params) {
        return POST(reUrl + '/apimt/tidy_folder/', params)
    },
    copyFiles: function (params) {
        return POST(reUrl + '/apimt/copy_files/', params)
    },
    removeNullFolder: function (params) {
        return POST(reUrl + '/apimt/remove_null_folder/', params)
    },
    deleteFiles: function (params) {
        return POST(reUrl + '/apimt/delete_files/', params)
    },
    finishFiles: function (params) {
        return POST(reUrl + '/apimt/finish_files/', params)
    },
    deleteTrack: function (params) {
        return POST(reUrl + '/apimt/delete_track/', params)
    },
    fetchId3Title: function (params) {
        return POST(reUrl + '/apimt/fetch_id3_by_title/', params)
    },
    fetchArtists: function (params) {
        return POST(reUrl + '/apimt/fetch_artist_by_keyword/', params)
    },
    getArtistAliases: function (params) {
        return GET(reUrl + '/music/artist/aliases/', params)
    },
    getArtistDirectorySources: function (params) {
        return GET(reUrl + '/music/artist/directory_sources/', params)
    },
    searchDirectoryArtists: function (params) {
        return GET(reUrl + '/music/artist/search_directory_artists/', params)
    },
    getPlaylistDirectorySources: function (params) {
        return GET(reUrl + '/music/artist/playlist_sources/', params)
    },
    searchDirectoryPlaylists: function (params) {
        return GET(reUrl + '/music/artist/search_directory_playlists/', params)
    },
    getArtistDirectory: function (id, params) {
        return GET(reUrl + `/music/artist/${id}/directory/`, params)
    },
    getArtistDirectoryTracks: function (id, params) {
        return GET(reUrl + `/music/artist/${id}/directory_tracks/`, params)
    },
    setArtistDirectory: function (id, params) {
        return POST(reUrl + `/music/artist/${id}/directory/`, params)
    },
    deleteArtistDirectory: function (id) {
        return DELETE(reUrl + `/music/artist/${id}/directory/`)
    },
    getMissingCatalog: function (params) {
        return GET(reUrl + '/music/artist/missing_catalog/', params)
    },
    postArtist: function (params) {
        const id = params.id
        return PUT(reUrl + `/music/artist/${id}/`, params)
    },
    deleteArtist: function (params) {
        const id = params.id
        return DELETE(reUrl + `/music/artist/${id}/`, params)
    },
    postAlbum: function (params) {
        const id = params.id
        return PUT(reUrl + `/music/album/${id}/`, params)
    },
    deleteAlbum: function (params) {
        const id = params.id
        return DELETE(reUrl + `/music/album/${id}/`, params)
    },
    deleteGenre: function (params) {
        const id = params.id
        return DELETE(reUrl + `/music/genre/${id}/`, params)
    },
    postGenre: function (params) {
        const id = params.id
        return PUT(reUrl + `/music/genre/${id}/`, params)
    },
    genrePlaylistCover: function (params) {
        const id = params.id
        return POST(reUrl + `/music/playlist/${id}/contact_image/`, params)
    },
    putPlayList: function (params) {
        const id = params.id
        return PUT(reUrl + `/music/playlist/${id}/`, params)
    },
    fetchLyric: function (params) {
        return POST(reUrl + '/apimt/fetch_lyric/', params)
    },
    downloadResource: function (params) {
        return POST(reUrl + '/apimt/download_resource/', params)
    },
    extractLyric: function (params) {
        return POST(reUrl + '/apimt/extract_lyric/', params)
    },
    translationLyc: function (params) {
        return POST(reUrl + '/apimt/translation_lyc/', params)
    },
    simplifiedFields: function (params) {
        return POST(reUrl + '/apimt/simplified_fields/', params)
    },
    splitFilename: function (params) {
        return POST(reUrl + '/apimt/split_filename/', params)
    },
    replaceText: function (params) {
        return POST(reUrl + '/apimt/replace_text/', params)
    },
    fixEncoding: function (params) {
        return POST(reUrl + '/apimt/fix_encoding/', params)
    },
    previewFixEncoding: function (params) {
        return POST(reUrl + '/apimt/preview_fix_encoding/', params)
    },
    checkDuplicate: function (params) {
        return POST(reUrl + '/apimt/check_file_duplicates/', params)
    },
    formatMusic: function (params) {
        return POST(reUrl + '/apimt/format_music_type/', params)
    },
    splitCueMusic: function (params) {
        return POST(reUrl + '/apimt/split_cue/', params)
    },
    getRecord: function (params) {
        return GET(reUrl + '/apimt/record/', params)
    },
    postRecord: function (params) {
        return POST(reUrl + '/apimt/record/', params)
    },
    getSys: function (params) {
        return GET(reUrl + '/apimt/sys/', params)
    },
    getSysDict: function (params) {
        return GET(reUrl + '/apimt/sys/dict/', params)
    },
    uploadBrandLogo: function (params) {
        return POST(reUrl + '/apimt/sys/brand_logo/', params)
    },
    clearBrandLogo: function (params) {
        return POST(reUrl + '/apimt/sys/brand_logo_clear/', params)
    },
    getBackgroundScrapeConfigs: function (params) {
        return GET(reUrl + '/apimt/sys/background_scrape_configs/', params)
    },
    saveBackgroundScrapeConfigs: function (params) {
        return POST(reUrl + '/apimt/sys/background_scrape_configs/', params)
    },
    clearBackgroundScrapeState: function (params) {
        return POST(reUrl + '/apimt/sys/background_scrape_clear_state/', params)
    },
    markBackgroundScrapeDone: function (params) {
        return POST(reUrl + '/apimt/sys/background_scrape_mark_done/', params)
    },
    getSysInfo: function (params) {
        return GET(reUrl + '/apimt/sys/info/', params)
    },
    downloadFfmpeg: function (params) {
        return POST(reUrl + '/apimt/sys/download_ffmpeg/', params)
    },
    getSysExist: function (params) {
        return GET(reUrl + '/apimt/sys_exist/', params)
    },
    UpdateSys: function (params) {
        return POST(reUrl + '/apimt/sys/', params)
    },
    miServiceTest: function (params) {
        return GET(reUrl + '/apimt/mi_service/test/', params)
    },
    miServiceSearch: function (params) {
        return GET(reUrl + '/apimt/mi_service/search_device/', params)
    },
    miServiceOtp: function (params) {
        return GET(reUrl + '/apimt/mi_service/otp/', params)
    },
    miServiceSubmitOtp: function (params) {
        return POST(reUrl + '/apimt/mi_service/otp/', params)
    },
    miServicePlay: function (params) {
        return GET(reUrl + '/apimt/mi_service/play/', params)
    },
    miServicePlayList: function (params) {
        return POST(reUrl + '/apimt/mi_service/play_list/', params)
    },
    miServicePlaying: function (params) {
        return GET(reUrl + '/apimt/mi_service/playing/', params)
    },
    miServicePlayQueue: function (params) {
        return GET(reUrl + '/apimt/mi_service/play_queue/', params)
    },
    miServiceStopQueue: function (params) {
        return GET(reUrl + '/apimt/mi_service/stop_queue/', params)
    },
    miServiceUpdatePlaylistOrder: function (params) {
        return POST(reUrl + '/apimt/mi_service/update_playlist_order/', params)
    },
    miServiceShuffle: function (params) {
        return GET(reUrl + '/apimt/mi_service/shuffle/', params)
    },
    miServiceRandom: function (params) {
        return GET(reUrl + '/apimt/mi_service/random/', params)
    },
    miServicePause: function (params) {
        return GET(reUrl + '/apimt/mi_service/pause/', params)
    },
    supervisorControl: function (params) {
        return POST(reUrl + '/apimt/supervisor/control/', params)
    },
    getMusicCount: function (params) {
        return GET(reUrl + '/music/music_collection/', params)
    },
    getProgressRate: function (params) {
        return POST(reUrl + '/music/music_collection/progress/', params)
    },
    getMissArtist: function (params) {
        return GET(reUrl + '/music/music_collection/miss_artist/', params)
    },
    getProgressStatic: function (params) {
        return GET(reUrl + '/music/music_collection/static/', params)
    },
    getListeningRecord: function (params) {
        return GET(reUrl + '/music/listening/record/', params)
    },
    getHotGenres: function (params) {
        return GET(reUrl + '/music/record/hot_genres/', params)
    },
    getHotDecades: function (params) {
        return GET(reUrl + '/music/record/hot_decades/', params)
    },
    getPlatformStats: function (params) {
        return GET(reUrl + '/music/record/platform_stats/', params)
    },
    getListeningStats: function (params) {
        return GET(reUrl + '/music/record/listening_stats/', params)
    },
    getListeningClock: function (params) {
        return GET(reUrl + '/music/record/listening_clock/', params)
    },
    getAuditLog: function (params) {
        return GET(reUrl + '/apimt/audit_log/', params)
    },
    getAuditLogDetail: function (params) {
        const id = params.id

        return GET(reUrl + `/apimt/audit_log/${id}/detail_log/`, params)
    },
    getAuditLogProgress: function (params) {
        const id = params.id

        return GET(reUrl + `/apimt/audit_log/${id}/progress/`, params)
    },
    getAuditLogDetailGroup: function (params) {
        const id = params.id

        return GET(reUrl + `/apimt/audit_log/${id}/detail_group/`, params)
    },
    getAuditLogDetailItem: function (params) {
        const id = params.id

        return GET(reUrl + `/apimt/audit_log/${id}/detail_item/`, params)
    },
    stopAuditLogDetail: function (params) {
        const id = params.id

        return POST(reUrl + `/apimt/audit_log/${id}/stop/`, params)
    },
    stopAuditLogDetailRun: function (params) {
        const id = params.id

        return POST(reUrl + `/apimt/audit_log/${id}/stop_detail/`, params)
    },
    changeStatusAuditLogDetailRun: function (params) {
        const id = params.id

        return POST(reUrl + `/apimt/audit_log/${id}/change_status/`, params)
    },
    resumeAuditLog: function (params) {
        const id = params.id

        return POST(reUrl + `/apimt/audit_log/${id}/resume/`, params)
    },
    getRuntimeLog: function (params) {
        return GET(reUrl + '/apimt/runtime_log/', params)
    },
    getRuntimeMiLog: function (params) {
        return GET(reUrl + '/apimt/runtime_log/mi_log/', params)
    },
    getResourceScript: function (params) {
        return GET(reUrl + '/script/plugins/', params)
    },
    getActionScript: function (params) {
        return GET(reUrl + '/script/action_script/', params)
    },
    debugTask1: function (params) {
        return GET(reUrl + '/apimt/task1/', params)
    },
    task1: function (params) {
        return POST(reUrl + '/apimt/task1/', params)
    },
    debugTask2: function (params) {
        return GET(reUrl + '/apimt/task2/', params)
    },
    task2: function (params) {
        return GET(reUrl + '/apimt/task2/', params)
    },
    createPeriodicTask: function (params) {
        return POST(reUrl + '/apimt/task2/', params)
    },
    similarAlbums: function (params) {
        return POST(reUrl + '/apimt/similar_albums/', params)
    },
    dockerUpdate: function (params) {
        return POST(reUrl + '/apimt/docker_update/', params)
    },
    periodicTaskStatus: function (params) {
        return GET(reUrl + '/apimt/periodic_task_status/', params)
    },
    markFolderState: function (params) {
        return POST(reUrl + '/apimt/update_folder_state/', params)
    },
    WeekRecord: function (params) {
        return POST(reUrl + '/music/record/week_record/', params)
    },
    getPerfectMusic: function (params) {
        return POST(reUrl + '/music/record/perfect_music/', params)
    },
    getHotArtists: function (params) {
        return GET(reUrl + '/music/record/hot_artists/', params)
    },
    saveDiscoverHotTrack: function (params) {
        return POST(reUrl + '/music/record/set_discover_hot_track/', params)
    },
    importPlaylist: function (params) {
        return POST(reUrl + '/music/playlist/import_playlist/', params)
    },
    exportConfig: function (params) {
        return POST(reUrl + '/apimt/sys/export_config/', params)
    },
    importConfig: function (params) {
        return POST(reUrl + '/apimt/sys/import_config/', params)
    },
    uploadLog: function (params) {
        return POST(reUrl + '/apimt/sys/upload_log/', params)
    },
    openApi: function (params) {
        return GET(reUrl + '/apimt/open_api/', params)
    },
    missingMusicTask: function (params) {
        return POST(reUrl + '/apimt/missing_music_task/', params)
    },
    ruleTagTask: function (params) {
        return POST(reUrl + '/apimt/rule_tag/', params)
    },
    celeryTaskLastTime: function (params) {
        return GET(reUrl + '/apimt/celery_task/last_time/', params)
    },
    getScrapeSchedule: function (params) {
        return GET(reUrl + '/apimt/celery_task/get_schedule/', params)
    },
    updateScrapeSchedule: function (params) {
        return POST(reUrl + '/apimt/celery_task/update_schedule/', params)
    },
    generateStrm: function (params) {
        return POST(reUrl + '/apimt/generate_strm/', params)
    },
    getImage: function (params) {
        return POST(reUrl + '/apimt/get_image/', params)
    },
    previewRegex: function (params) {
        return POST(reUrl + '/apimt/preview_regex/', params)
    },
    uploadImageAndSave: function (params) {
        return POST(reUrl + '/apimt/upload_logo_and_save/', params)
    },
    restoreLogo: function (params) {
        return POST(reUrl + '/apimt/restore_logo/', params)
    },
    fileIndex: function (params) {
        return POST(reUrl + '/apimt/file_index/', params)
    },
    searchIndex: function (params) {
        return POST(reUrl + '/apimt/search_index/', params)
    },
    directoryQuery: function (params) {
        return POST(reUrl + '/apimt/directory_query/', params)
    },
    playlistDetail: function (params) {
        return GET(reUrl + '/music/playlist/playlist_detail/', params)
    },
    updatePlaylist: function (params) {
        return POST(reUrl + '/music/playlist/update_playlist/', params)
    },
    testExecutePlugin: function (params) {
        const id = params.id
        return POST(reUrl + `/script/plugins/${id}/test_execute/`, params)
    },
    activeQueue: function (params) {
        return GET(reUrl + '/apimt/active_queue/', params)
    },
    mergeArtists: function (params) {
        return POST(reUrl + '/apimt/merge_artists/', params)
    },
    getArtistMergeLogDetail: function (params) {
        const id = params.id
        return GET(reUrl + `/apimt/audit_log/${id}/artist_merge_detail/`, params)
    },
    // 元数据版本控制API
    getMetadataVersionHistory: function (params) {
        return GET(reUrl + '/apimt/metadata_version/track' + '/history/', params)
    },
    getMetadataVersionList: function (params) {
        return GET(reUrl + '/apimt/metadata_version/', params)
    },
    getMetadataVersionDetail: function (params) {
        const id = params.id
        return GET(reUrl + `/apimt/metadata_version/${id}/`, params)
    },
    compareMetadataVersions: function (params) {
        return GET(reUrl + '/apimt/metadata_version/compare/', params)
    },
    getMetadataVersionDiff: function (params) {
        const id = params.id
        return GET(reUrl + `/apimt/metadata_version/${id}/diff/`, params)
    },
    restoreMetadataVersion: function (params) {
        const id = params.id
        return POST(reUrl + `/apimt/metadata_version/${id}/restore/`, params)
    },
    deleteMetadataVersion: function (params) {
        const id = params.id
        return DELETE(reUrl + `/apimt/metadata_version/${id}/`, params)
    },
    // 根据 log_id 和 status 查询 AuditLogDetail
    queryDetailsByStatus: function (params) {
        return POST(reUrl + '/apimt/query_details_by_status/', params)
    },
    syncRoomCreate: function (params) {
        return POST(reUrl + '/apimt/sync_room/create/', params)
    },
    syncRoomJoin: function (params) {
        return POST(reUrl + '/apimt/sync_room/join/', params)
    },
    syncRoomLeave: function (params) {
        return POST(reUrl + '/apimt/sync_room/leave/', params)
    },
    syncRoomState: function (params) {
        return POST(reUrl + '/apimt/sync_room/state/', params)
    },
    syncRoomControl: function (params) {
        return POST(reUrl + '/apimt/sync_room/control/', params)
    },
    syncRoomHeartbeat: function (params) {
        return POST(reUrl + '/apimt/sync_room/heartbeat/', params)
    },
    syncRoomChat: function (params) {
        return POST(reUrl + '/apimt/sync_room/chat/', params)
    },
    // 获取小爱音箱 token
    getMiToken: function (params) {
        return GET(reUrl + '/apimt/task2/', { mode: 'get_mi_token', ...params })
    },
    // 更新小爱音箱 token
    updateMiToken: function (params) {
        return GET(reUrl + '/apimt/task2/', { mode: 'update_mi_token', token: params.token })
    }
}
