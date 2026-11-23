import Vue from 'vue'

const LOCALE_STORAGE_KEY = 'mtw_app_locale'
const DEFAULT_LOCALE = 'zh-CN'
const SUPPORTED_LOCALES = ['zh-CN', 'zh-TW', 'en-US']

const MESSAGES = {
    'language.setting.title': {
        default: '语言设置',
        'zh-TW': '語言設定',
        'en-US': 'Language',
    },
    'language.setting.label': {
        default: '界面语言',
        'zh-TW': '介面語言',
        'en-US': 'UI Language',
    },
    'language.setting.help': {
        default: '切换后立即生效，并会保存为默认语言',
        'zh-TW': '切換後立即生效，並會儲存為預設語言',
        'en-US': 'Applies immediately and is saved as default',
    },
    'language.option.zhCN': {
        default: '简体中文',
        'zh-TW': '簡體中文',
        'en-US': 'Simplified Chinese',
    },
    'language.option.zhTW': {
        default: '繁体中文',
        'zh-TW': '繁體中文',
        'en-US': 'Traditional Chinese',
    },
    'language.option.enUS': {
        default: 'English',
    },
    'language.change.successTitle': {
        default: '切换成功',
        'zh-TW': '切換成功',
        'en-US': 'Updated',
    },
    'language.change.successContent': {
        default: '界面语言已切换为 {name}',
        'zh-TW': '介面語言已切換為 {name}',
        'en-US': 'Language switched to {name}',
    },
    'system.update.successTitle': {
        default: '修改成功！',
        'en-US': 'Saved',
    },
    '侧边栏菜单': {
        default: '侧边栏菜单',
        'zh-TW': '側邊欄選單',
        'en-US': 'Sidebar Menu',
    },
    '电台': {
        default: '电台',
        'zh-TW': '電台',
        'en-US': 'Radio',
    },
    '有声书': {
        default: '有声书',
        'zh-TW': '有聲書',
        'en-US': 'Audiobooks',
    },
    '音乐视频': {
        default: '音乐视频',
        'zh-TW': '音樂影片',
        'en-US': 'Music Videos',
    },
    '多艺术家分隔符': {
        default: '多艺术家分隔符',
        'en-US': 'Artist Splitters',
    },
    '管理艺术家字段的拆分规则，可禁用内置分隔符并新增自定义分隔符': {
        default: '管理艺术家字段的拆分规则，可禁用内置分隔符并新增自定义分隔符',
        'en-US': 'Manage artist split rules, disable built-ins, and add custom delimiters',
    },
    '恢复默认分隔符': {
        default: '恢复默认分隔符',
        'en-US': 'Reset Default Splitters',
    },
    '内置分隔符': {
        default: '内置分隔符',
        'en-US': 'Built-in',
    },
    '自定义分隔符': {
        default: '自定义分隔符',
        'en-US': 'Custom',
    },
    '输入新的分隔符，例如 / 或 feat ': {
        default: '输入新的分隔符，例如 / 或 feat ',
        'en-US': 'Enter a delimiter, for example / or feat ',
    },
    '新增分隔符': {
        default: '新增分隔符',
        'en-US': 'Add Delimiter',
    },
    '修改后会影响后续扫描、匹配和编辑时的艺术家拆分，历史数据不会自动重建': {
        default: '修改后会影响后续扫描、匹配和编辑时的艺术家拆分，历史数据不会自动重建',
        'en-US': 'Changes affect future scan, match, and edit splitting only; existing data is not rebuilt automatically',
    },
    'nav.home': {
        default: '首页',
        'zh-TW': '首頁',
        'en-US': 'Home',
    },
    'nav.workspace': {
        default: '操作台',
        'en-US': 'Workspace',
    },
    '文件管理': {
        'zh-TW': '檔案管理',
        'en-US': 'File Manager',
    },
    'nav.logs': {
        default: '操作记录',
        'zh-TW': '操作記錄',
        'en-US': 'Operation Logs',
    },
    'nav.plugin': {
        default: '插件管理',
        'zh-TW': '外掛管理',
        'en-US': 'Plugins',
    },
    'nav.library': {
        default: '音乐收藏',
        'zh-TW': '音樂收藏',
        'en-US': 'Music Library',
    },
    'nav.system': {
        default: '系统设置',
        'zh-TW': '系統設定',
        'en-US': 'System Settings',
    },
    'system.menu.basic': {
        default: '基础设置',
        'zh-TW': '基礎設定',
        'en-US': 'Basic Settings',
    },
    'system.menu.scraping': {
        default: '后台刮削',
        'zh-TW': '後台刮削',
        'en-US': 'Background Scraping',
    },
    'system.menu.tasks': {
        default: '后台任务',
        'zh-TW': '後台任務',
        'en-US': 'Background Tasks',
    },
    'system.menu.xiaoai': {
        default: '小爱音响',
        'zh-TW': '小愛音箱',
        'en-US': 'Xiaoai Speaker',
    },
    'system.menu.webdav': {
        default: '网盘音乐',
        'zh-TW': '網盤音樂',
        'en-US': 'WebDAV Music',
    },
    'system.menu.openapi': {
        default: 'API 管理',
        'en-US': 'API Management',
    },
    'system.menu.permission': {
        default: '角色权限',
        'zh-TW': '角色權限',
        'en-US': 'Role Permissions',
    },
    '共 {count} 位用户': {
        default: '共 {count} 位用户',
        'zh-TW': '共 {count} 位使用者',
        'en-US': '{count} users in total',
    },
    '{count} 位收藏家': {
        default: '{count} 位收藏家',
        'zh-TW': '{count} 位收藏家',
        'en-US': '{count} curators',
    },
    '{count} 位听众': {
        default: '{count} 位听众',
        'zh-TW': '{count} 位聽眾',
        'en-US': '{count} listeners',
    },
    '编辑用户': {
        default: '编辑用户',
        'zh-TW': '編輯使用者',
        'en-US': 'Edit User',
    },
    '编辑 {name}': {
        default: '编辑 {name}',
        'zh-TW': '編輯 {name}',
        'en-US': 'Edit {name}',
    },
    '修改账号资料、角色与登录状态': {
        default: '修改账号资料、角色与登录状态',
        'zh-TW': '修改帳號資料、角色與登入狀態',
        'en-US': 'Update profile, role, and sign-in status',
    },
    '重置密码': {
        default: '重置密码',
        'zh-TW': '重設密碼',
        'en-US': 'Reset Password',
    },
    '留空则不修改密码': {
        default: '留空则不修改密码',
        'zh-TW': '留空則不修改密碼',
        'en-US': 'Leave blank to keep the current password',
    },
    '保存中': {
        default: '保存中',
        'zh-TW': '儲存中',
        'en-US': 'Saving',
    },
    '保存修改': {
        default: '保存修改',
        'zh-TW': '儲存修改',
        'en-US': 'Save Changes',
    },
    '用户信息已更新': {
        default: '用户信息已更新',
        'zh-TW': '使用者資訊已更新',
        'en-US': 'User updated',
    },
    '更新失败，请检查输入内容': {
        default: '更新失败，请检查输入内容',
        'zh-TW': '更新失敗，請檢查輸入內容',
        'en-US': 'Update failed. Check the entered values.',
    },
    'system.menu.personalization': {
        default: '个性设置',
        'zh-TW': '個性設定',
        'en-US': 'Personalization',
    },
    'system.menu.info': {
        default: '系统信息',
        'zh-TW': '系統資訊',
        'en-US': 'System Info',
    },
    'personalization.site.titleSection': {
        default: '网站标题设置',
        'zh-TW': '網站標題設定',
        'en-US': 'Site Title',
    },
    'personalization.site.titleLabel': {
        default: '网站标题',
        'zh-TW': '網站標題',
        'en-US': 'Site Title',
    },
    'personalization.site.titlePlaceholder': {
        default: '请输入网站标题',
        'zh-TW': '請輸入網站標題',
        'en-US': 'Enter site title',
    },
    'personalization.site.titleHelp': {
        default: '自定义网站标题，将显示在页面顶部导航栏',
        'zh-TW': '自訂網站標題，將顯示於頁面頂部導覽列',
        'en-US': 'Custom title shown in the top navigation bar',
    },
    'personalization.site.brandLabel': {
        default: '顶部品牌图例',
        'zh-TW': '頂部品牌圖例',
        'en-US': 'Header Brand Mark',
    },
    'personalization.site.brandLetter': {
        default: '使用字母',
        'zh-TW': '使用字母',
        'en-US': 'Use Letters',
    },
    'personalization.site.brandImage': {
        default: '使用 Logo 图片',
        'zh-TW': '使用 Logo 圖片',
        'en-US': 'Use Logo Image',
    },
    'personalization.site.brandPlaceholder': {
        default: '输入 1-3 个字符',
        'zh-TW': '輸入 1-3 個字元',
        'en-US': 'Enter 1-3 characters',
    },
    'personalization.site.brandClear': {
        default: '移除 Logo',
        'zh-TW': '移除 Logo',
        'en-US': 'Remove Logo',
    },
    'personalization.site.brandHelp': {
        default: '字母最多 3 个字符；Logo 支持 PNG、JPEG、WebP，最大 2 MB',
        'zh-TW': '字母最多 3 個字元；Logo 支援 PNG、JPEG、WebP，最大 2 MB',
        'en-US': 'Up to 3 characters, or a PNG, JPEG, or WebP logo up to 2 MB',
    },
    'personalization.site.showRoleBadge': {
        default: '显示版本标识',
        'zh-TW': '顯示版本標識',
        'en-US': 'Show Version Badge',
    },
    'personalization.site.showRoleBadgeHelp': {
        default: '控制是否在页面顶部显示版本标识（V1/V2）',
        'zh-TW': '控制是否在頁面頂部顯示版本標識（V1/V2）',
        'en-US': 'Control whether version badges (V1/V2) are shown at the top',
    },
    'personalization.theme.title': {
        default: '主题配色',
        'zh-TW': '主題配色',
        'en-US': 'Theme',
    },
    'personalization.theme.current': {
        default: '当前主题：{theme}',
        'zh-TW': '目前主題：{theme}',
        'en-US': 'Current theme: {theme}',
    },
    'personalization.background.title': {
        default: '背景设置',
        'zh-TW': '背景設定',
        'en-US': 'Background',
    },
    'personalization.background.hide': {
        default: '隐藏背景图',
        'zh-TW': '隱藏背景圖',
        'en-US': 'Hide Background',
    },
    'personalization.background.custom': {
        default: '自定义背景图',
        'zh-TW': '自訂背景圖',
        'en-US': 'Custom Background',
    },
    'personalization.background.clear': {
        default: '清除',
        'en-US': 'Clear',
    },
    'personalization.upload.successTitle': {
        default: '上传成功！',
        'zh-TW': '上傳成功！',
        'en-US': 'Upload succeeded',
    },
    'personalization.upload.successContent': {
        default: '图片已保存到本地',
        'zh-TW': '圖片已儲存到本機',
        'en-US': 'Image saved locally',
    },
    'personalization.upload.failTitle': {
        default: '上传失败！',
        'zh-TW': '上傳失敗！',
        'en-US': 'Upload failed',
    },
    'personalization.restore.successTitle': {
        default: '恢复成功！',
        'zh-TW': '還原成功！',
        'en-US': 'Restored',
    },
    'personalization.restore.successContent': {
        default: '背景已恢复为默认',
        'zh-TW': '背景已還原為預設',
        'en-US': 'Background restored to default',
    },
    'header.notify.unread': {
        default: '您有 {count} 条未读消息',
        'zh-TW': '您有 {count} 則未讀訊息',
        'en-US': 'You have {count} unread messages',
    },
    'header.notify.total': {
        default: '共 {count} 条消息',
        'zh-TW': '共 {count} 則訊息',
        'en-US': '{count} messages in total',
    },
    '共 {count}': {
        default: '共 {count}',
        'zh-TW': '共 {count}',
        'en-US': '{count} in total',
    },
    '总数 {count}': {
        default: '总数 {count}',
        'zh-TW': '總數 {count}',
        'en-US': 'Total {count}',
    },
    '已完成 {count}': {
        default: '已完成 {count}',
        'zh-TW': '已完成 {count}',
        'en-US': 'Completed {count}',
    },
    '进度 {rate}%': {
        default: '进度 {rate}%',
        'zh-TW': '進度 {rate}%',
        'en-US': 'Progress {rate}%',
    },
    '已完成 {done} / {total}': {
        default: '已完成 {done} / {total}',
        'zh-TW': '已完成 {done} / {total}',
        'en-US': 'Completed {done} / {total}',
    },
    '任务进度': {
        default: '任务进度',
        'zh-TW': '任務進度',
        'en-US': 'Task Progress',
    },
    '加载候选详情失败': {
        default: '加载候选详情失败',
        'zh-TW': '載入候選詳情失敗',
        'en-US': 'Failed to load candidate details',
    },
    '加载详情失败': {
        default: '加载详情失败',
        'zh-TW': '載入詳情失敗',
        'en-US': 'Failed to load details',
    },
    '聚焦任务状态与执行进度，分类结果在下方单独处理，避免信息重复。': {
        default: '聚焦任务状态与执行进度，分类结果在下方单独处理，避免信息重复。',
        'zh-TW': '聚焦任務狀態與執行進度，分類結果在下方單獨處理，避免資訊重複。',
        'en-US': 'Focus on task status and execution progress; category results are handled separately below to avoid duplication.',
    },
    '刮削分类概览': {
        default: '刮削分类概览',
        'zh-TW': '刮削分類概覽',
        'en-US': 'Scrape Categories Overview',
    },
    '使用左侧分类快速切换结果上下文，右侧只呈现当前分类的处理内容。': {
        default: '使用左侧分类快速切换结果上下文，右侧只呈现当前分类的处理内容。',
        'zh-TW': '使用左側分類快速切換結果上下文，右側只呈現當前分類的處理內容。',
        'en-US': 'Use the left sidebar to quickly switch result context; the right panel shows only the current category.',
    },
    '共 {count} 类': {
        default: '共 {count} 类',
        'zh-TW': '共 {count} 類',
        'en-US': '{count} categories',
    },
    '当前: {name}': {
        default: '当前: {name}',
        'zh-TW': '目前: {name}',
        'en-US': 'Current: {name}',
    },
    '批量 AI 候选': {
        default: '批量 AI 候选',
        'zh-TW': '批次 AI 候選',
        'en-US': 'Batch AI Candidate',
    },
    '批量删除失败文件': {
        default: '批量删除失败文件',
        'zh-TW': '批次刪除失敗檔案',
        'en-US': 'Batch Delete Failed Files',
    },
    '取消选中': {
        default: '取消选中',
        'zh-TW': '取消選取',
        'en-US': 'Deselect',
    },
    '正在加载分类明细...': {
        default: '正在加载分类明细...',
        'zh-TW': '正在載入分類明細...',
        'en-US': 'Loading category details...',
    },
    '当前分类暂无数据': {
        default: '当前分类暂无数据',
        'zh-TW': '目前分類暫無資料',
        'en-US': 'No data in this category',
    },
    '标题 / 艺术家 / 专辑': {
        default: '标题 / 艺术家 / 专辑',
        'zh-TW': '標題 / 藝術家 / 專輯',
        'en-US': 'Title / Artist / Album',
    },
    '共 {count} 条': {
        default: '共 {count} 条',
        'zh-TW': '共 {count} 筆',
        'en-US': '{count} records',
    },
    '第 {page} / {pages} 页': {
        default: '第 {page} / {pages} 页',
        'zh-TW': '第 {page} / {pages} 頁',
        'en-US': 'Page {page} / {pages}',
    },
    '点击列表中的文件可查看详细元数据': {
        default: '点击列表中的文件可查看详细元数据',
        'zh-TW': '點擊列表中的檔案可查看詳細元資料',
        'en-US': 'Click a file in the list to view detailed metadata',
    },
    '选择一个分类查看明细': {
        default: '选择一个分类查看明细',
        'zh-TW': '選擇一個分類查看明細',
        'en-US': 'Select a category to view details',
    },
    '左侧保留全部分类结果，右侧只打开当前上下文，减少来回滚动和视觉干扰。': {
        default: '左侧保留全部分类结果，右侧只打开当前上下文，减少来回滚动和视觉干扰。',
        'zh-TW': '左側保留全部分類結果，右側只開啟當前上下文，減少來回捲動和視覺干擾。',
        'en-US': 'The left sidebar keeps all category results; the right panel shows only the current context to reduce scrolling and visual clutter.',
    },
    'Detail Payload': {
        default: 'Detail Payload',
        'zh-TW': 'Detail Payload',
        'en-US': 'Detail Payload',
    },
    '文件详情': {
        default: '文件详情',
        'zh-TW': '檔案詳情',
        'en-US': 'File Details',
    },
    '选择一首音乐，开始整理': {
        default: '选择一首音乐，开始整理',
        'zh-TW': '選擇一首音樂，開始整理',
        'en-US': 'Choose a track to start organizing',
    },
    '从左侧文件夹中选择音频文件，封面、标签和文件信息会显示在这里。': {
        default: '从左侧文件夹中选择音频文件，封面、标签和文件信息会显示在这里。',
        'zh-TW': '從左側資料夾中選擇音訊檔案，封面、標籤和檔案資訊會顯示在這裡。',
        'en-US': 'Select an audio file from the folders on the left to view its artwork, tags, and file details here.',
    },
    '选择要处理的文件后，批量元数据会显示在这里。': {
        default: '选择要处理的文件后，批量元数据会显示在这里。',
        'zh-TW': '選擇要處理的檔案後，批量元資料會顯示在這裡。',
        'en-US': 'Select files to process and their batch metadata will appear here.',
    },
    '查看封面信息': {
        default: '查看封面信息',
        'zh-TW': '查看封面資訊',
        'en-US': 'View artwork details',
    },
    '编辑音乐标签': {
        default: '编辑音乐标签',
        'zh-TW': '編輯音樂標籤',
        'en-US': 'Edit music tags',
    },
    '整理文件详情': {
        default: '整理文件详情',
        'zh-TW': '整理檔案詳情',
        'en-US': 'Organize file details',
    },
    '正在加载详情...': {
        default: '正在加载详情...',
        'zh-TW': '正在載入詳情...',
        'en-US': 'Loading details...',
    },
    '元数据结果': {
        default: '元数据结果',
        'zh-TW': '元資料結果',
        'en-US': 'Metadata Result',
    },
    '原始识别信息': {
        default: '原始识别信息',
        'zh-TW': '原始識別資訊',
        'en-US': 'Raw Identification Info',
    },
    '候选列表': {
        default: '候选列表',
        'zh-TW': '候選列表',
        'en-US': 'Candidate List',
    },
    '标准匹配成功，结果通常可以直接入库。': {
        default: '标准匹配成功，结果通常可以直接入库。',
        'zh-TW': '標準匹配成功，結果通常可以直接入庫。',
        'en-US': 'Standard match successful; results can usually be saved directly.',
    },
    '在宽松模式下完成匹配，建议抽样确认准确性。': {
        default: '在宽松模式下完成匹配，建议抽样确认准确性。',
        'zh-TW': '在寬鬆模式下完成匹配，建議抽樣確認準確性。',
        'en-US': 'Matched in flexible mode; sample verification is recommended.',
    },
    '存在多个可能结果，需要人工或 AI 辅助确认。': {
        default: '存在多个可能结果，需要人工或 AI 辅助确认。',
        'zh-TW': '存在多個可能結果，需要人工或 AI 輔助確認。',
        'en-US': 'Multiple possible results; manual or AI review is required.',
    },
    '文件异常、网络异常或处理链路中断，需要优先排查。': {
        default: '文件异常、网络异常或处理链路中断，需要优先排查。',
        'zh-TW': '檔案異常、網路異常或處理鏈路中斷，需要優先排查。',
        'en-US': 'File error, network issue, or pipeline interrupted; priority troubleshooting needed.',
    },
    '当前仍在处理中，数据会随任务轮询持续更新。': {
        default: '当前仍在处理中，数据会随任务轮询持续更新。',
        'zh-TW': '目前仍在處理中，資料會隨任務輪詢持續更新。',
        'en-US': 'Still processing; data will update as the task polls.',
    },
    '无法从现有信息中完成匹配，通常需要回到操作台处理。': {
        default: '无法从现有信息中完成匹配，通常需要回到操作台处理。',
        'zh-TW': '無法從現有資訊中完成匹配，通常需要回到操作台處理。',
        'en-US': 'Cannot match with available info; usually requires handling in the workspace.',
    },
    '缺少艺术家与专辑信息，匹配上下文不足。': {
        default: '缺少艺术家与专辑信息，匹配上下文不足。',
        'zh-TW': '缺少藝術家與專輯資訊，匹配上下文不足。',
        'en-US': 'Missing artist and album info; insufficient context for matching.',
    },
    '缺少艺术家信息，建议补齐后再尝试匹配。': {
        default: '缺少艺术家信息，建议补齐后再尝试匹配。',
        'zh-TW': '缺少藝術家資訊，建議補齊後再嘗試匹配。',
        'en-US': 'Missing artist info; please fill in before retrying.',
    },
    '缺少专辑信息，影响检索准确性。': {
        default: '缺少专辑信息，影响检索准确性。',
        'zh-TW': '缺少專輯資訊，影響檢索準確性。',
        'en-US': 'Missing album info; affects search accuracy.',
    },
    '已跳过处理，不会继续自动流转。': {
        default: '已跳过处理，不会继续自动流转。',
        'zh-TW': '已跳過處理，不會繼續自動流轉。',
        'en-US': 'Skipped; will not proceed automatically.',
    },
    '当前分类包含需要进一步关注的任务项。': {
        default: '当前分类包含需要进一步关注的任务项。',
        'zh-TW': '目前分類包含需要進一步關注的任務項目。',
        'en-US': 'This category contains items that need further attention.',
    },
    '请输入或生成访问令牌': {
        'zh-TW': '請輸入或產生存取 Token',
        'en-US': 'Enter or generate an access token',
    },
    '请输入完整的对话接口, 结尾包含chat/completions': {
        'zh-TW': '請輸入完整對話介面，結尾需包含 chat/completions',
        'en-US': 'Enter the full chat endpoint, ending with chat/completions',
    },
    '软提醒：这里通常需要填写完整的 http(s) 地址': {
        'zh-TW': '軟提醒：這裡通常需要填寫完整的 http(s) 地址',
        'en-US': 'Reminder: this should usually be a full http(s) URL',
    },
    '软提醒：你输入的路径看起来像少了结尾的 s，常见写法是 /v1/chat/completions': {
        'zh-TW': '軟提醒：你輸入的路径看起來像是少了結尾的 s，常見寫法是 /v1/chat/completions',
        'en-US': 'Reminder: the path looks like it is missing the trailing s; a common format is /v1/chat/completions',
    },
    '软提醒：常见对话接口路径为 /v1/chat/completions，请检查是否缺少 /v1/ 或 chat/completions 拼写有误': {
        'zh-TW': '軟提醒：常見對話介面路径為 /v1/chat/completions，請檢查是否缺少 /v1/ 或 chat/completions 拼寫有誤',
        'en-US': 'Reminder: a common chat endpoint path is /v1/chat/completions; check whether /v1/ is missing or chat/completions is misspelled',
    },
    '软提醒：如果你使用的是 OpenAI 兼容接口，常见路径会包含 /v1/chat/completions': {
        'zh-TW': '軟提醒：如果你使用的是 OpenAI 相容介面，常見路径會包含 /v1/chat/completions',
        'en-US': 'Reminder: if you are using an OpenAI-compatible endpoint, the common path includes /v1/chat/completions',
    },
    '例如：sk-1234567890': {
        'en-US': 'Example: sk-1234567890',
    },
    '输入你的激活码': {
        'zh-TW': '輸入你的啟用碼',
        'en-US': 'Enter your activation code',
    },
    '搜索艺术家、专辑或歌曲...': {
        'zh-TW': '搜索藝術家、專輯或歌曲...',
        'en-US': 'Search artists, albums, or songs...',
    },
    '艺术家': {
        'zh-TW': '藝術家',
        'en-US': 'Artists',
    },
    '专辑': {
        'zh-TW': '專輯',
        'en-US': 'Albums',
    },
    '歌曲': {
        'en-US': 'Tracks',
    },
    '未找到相关结果': {
        'zh-TW': '未找到相關需果',
        'en-US': 'No matching results found',
    },
    '尝试使用不同的关键词': {
        'zh-TW': '尝試使用不同對關键詞',
        'en-US': 'Try different keywords',
    },
    '搜索': {
        'en-US': 'Search',
    },
    '通知中心': {
        'en-US': 'Notification Center',
    },
    '暂无新消息': {
        'zh-TW': '暫無新消息',
        'en-US': 'No new messages',
    },
    '暂无通知': {
        'zh-TW': '暫無通知',
        'en-US': 'No notifications',
    },
    '系统消息和执行状态将在这里显示': {
        'zh-TW': '系統消息和執行狀態将在这里顯示',
        'en-US': 'System messages and execution status will appear here',
    },
    '查看全部': {
        'en-US': 'View All',
    },
    '后台管理': {
        'zh-TW': '後台管理',
        'en-US': 'Admin Panel',
    },
    '使用手册': {
        'en-US': 'User Guide',
    },
    '关于作者': {
        'zh-TW': '關于作者',
        'en-US': 'About the Author',
    },
    '激活V2版本': {
        'zh-TW': '啟用V2版本',
        'en-US': 'Activate V2 Version',
    },
    '去激活': {
        'zh-TW': '去啟用',
        'en-US': 'Activate',
    },
    '退出登录': {
        'zh-TW': '退出登錄',
        'en-US': 'Log Out',
    },
    '当前用户': {
        'zh-TW': '目前用户',
        'en-US': 'Current User',
    },
    '版本时间': {
        'zh-TW': '版本時間',
        'en-US': 'Version Time',
    },
    '当前版本': {
        'zh-TW': '目前版本',
        'en-US': 'Current Version',
    },
    '永久': {
        'en-US': 'Lifetime',
    },
    '切换主题': {
        'zh-TW': '切換主題',
        'en-US': 'Switch Theme',
    },
    '隐藏背景图': {
        'en-US': 'Hide Background',
    },
    '自定义背景图': {
        'en-US': 'Custom Background',
    },
    '清除': {
        'en-US': 'Clear',
    },
    '升级 V2 永久版本': {
        'en-US': 'Upgrade to V2 Lifetime',
    },
    '注意：V2 版本部署时候容器内的端口为 8002, 如果你部署时添加 command: /start 命令，您需要去掉该行命令。': {
        'zh-TW': '注意：V2 版本部署時候容器内對端口为 8002, 如果你部署時添加 command: /start 命令，您需要去掉该行命令。',
        'en-US': 'Note: When deploying the V2 version, the port inside the container is 8002. If you add the command: /start during deployment, you need to remove this line of command.',
    },
    '输入你的激活码：': {
        'zh-TW': '輸入你的啟用码：',
        'en-US': 'Enter your activation code:',
    },
    '获取激活码？': {
        'zh-TW': '获取啟用码？',
        'en-US': 'Get activation code?',
    },
    '激活': {
        'zh-TW': '啟用',
        'en-US': 'Activate',
    },
    '关闭': {
        'zh-TW': '關閉',
        'en-US': 'Close',
    },
    '您已经是永久激活用户！': {
        'zh-TW': '您已经是永久啟用用户！',
        'en-US': 'You are already permanently activated',
    },
    '激活失败！': {
        'zh-TW': '啟用失敗！',
        'en-US': 'Activation failed',
    },
    '上传成功！': {
        'zh-TW': '上傳成功！',
        'en-US': 'Upload succeeded',
    },
    '图片已保存到本地': {
        'en-US': 'Image has been saved locally',
    },
    '上传失败！': {
        'zh-TW': '上傳失敗！',
        'en-US': 'Upload failed',
    },
    '恢复成功！': {
        'zh-TW': '還原成功！',
        'en-US': 'Restore succeeded',
    },
    '背景已恢复为默认': {
        'zh-TW': '背景已還原为預設',
        'en-US': 'Background has been restored to default',
    },
    '音乐标签Web版': {
        'zh-TW': '音樂標籤Web版',
        'en-US': 'Music Tag Web',
    },
    '详情显示设置': {
        'zh-TW': '详情顯示設定',
        'en-US': 'Detail Display Settings',
    },
    '音乐库显示配置和字段管理': {
        'zh-TW': '音樂库顯示設定和字段管理',
        'en-US': 'Music Library Display Configuration and Field Management',
    },
    '详情设置': {
        'zh-TW': '详情設定',
        'en-US': 'Detail Settings',
    },
    '确认': {
        'zh-TW': '确設',
        'en-US': 'Confirm',
    },
    '取消': {
        'zh-TW': '取消',
        'en-US': 'Cancel',
    },
    'Media 目录': {
        'zh-TW': 'Media 目錄',
        'en-US': 'Media Directory',
    },
    '本地存储': {
        'en-US': 'Local Storage',
    },
    '启用详情页面': {
        'zh-TW': '启用详情頁面',
        'en-US': 'Enable Detail Page',
    },
    '显示音乐文件的详细信息和元数据': {
        'zh-TW': '顯示音樂文件的详细信息和元数据',
        'en-US': 'Show detailed music file information and metadata',
    },
    '深度遍历子目录': {
        'zh-TW': '深度遍历子目錄',
        'en-US': 'Deep traversal of subdirectories',
    },
    '扫描并显示子文件夹内的音乐文件': {
        'zh-TW': '扫描并顯示子文件夹内的音樂文件',
        'en-US': 'Scan and display music files in subfolders',
    },
    'WebDAV 目录': {
        'zh-TW': 'WebDAV 目錄',
        'en-US': 'WebDAV Directory',
    },
    '网络存储': {
        'zh-TW': '網路存储',
        'en-US': 'Network Storage',
    },
    '显示 WebDAV 远程文件的详细信息': {
        'zh-TW': '顯示 WebDAV 远程文件的详细信息',
        'en-US': 'Show detailed information for remote WebDAV files',
    },
    '谨慎启用，会频繁访问网盘服务': {
        'zh-TW': '谨慎啟用，会频繁访问網盘服務',
        'en-US': 'Enable with caution; it will frequently access cloud storage services',
    },
    '性能控制': {
        'zh-TW': '性能控製',
        'en-US': 'Performance Control',
    },
    '显示条目限制': {
        'zh-TW': '顯示條目限制',
        'en-US': 'Display Item Limit',
    },
    '条目': {
        'zh-TW': '條目',
        'en-US': 'Items',
    },
    '限制列表显示数量以确保页面响应性能': {
        'zh-TW': '限制列表顯示数量以确保頁面响应性能',
        'en-US': 'Limit the number of displayed items to ensure page responsiveness',
    },
    '显示字段': {
        'zh-TW': '顯示字段',
        'en-US': 'Displayed Fields',
    },
    '选择要显示的元数据字段': {
        'zh-TW': '選擇要顯示的元数据字段',
        'en-US': 'Select metadata fields to display',
    },
    '自定义音乐库详情页面显示的字段内容': {
        'zh-TW': '自定义音樂库详情頁面顯示的字段内容',
        'en-US': 'Customize fields shown on the Music Library detail page',
    },
    '文件索引': {
        'en-US': 'File Indexing',
    },
    '增量或重建音乐索引': {
        'zh-TW': '增量或重建音樂索引',
        'en-US': 'Incremental or full rebuild of music indexes',
    },
    '文件索引管理': {
        'en-US': 'File Index Management',
    },
    '开始索引(V2功能)': {
        'zh-TW': '開始索引(V2功能)',
        'en-US': 'Start Indexing (V2 Feature)',
    },
    '关于文件索引': {
        'zh-TW': '關于文件索引',
        'en-US': 'About File Indexing',
    },
    '数据构建': {
        'zh-TW': '數据构立',
        'en-US': 'Data Build',
    },
    '增量索引：': {
        'en-US': 'incremental index:',
    },
    '只扫描新增或修改的文件': {
        'zh-TW': '只扫描新增或修改對文件',
        'en-US': 'Scan only newly added or modified files',
    },
    '重建索引：': {
        'zh-TW': '重立索引：',
        'en-US': 'rebuild index:',
    },
    '完全重新扫描所有文件': {
        'en-US': 'Fully rescan all files',
    },
    '• 索引完成后可在音乐库中查看和管理文件': {
        'zh-TW': '• 索引完成后可在音樂库中查看和管理文件',
        'en-US': '• After indexing, you can view and manage files in Music Library',
    },
    '索引类型': {
        'en-US': 'Index Type',
    },
    '选择模式': {
        'zh-TW': '選擇模式',
        'en-US': 'Select Mode',
    },
    '增量索引': {
        'en-US': 'Incremental Index',
    },
    '快速扫描新增和修改的文件，适合日常维护': {
        'zh-TW': '快速扫描新增和修改對文件，适合日常维护',
        'en-US': 'Quickly scan newly added and modified files, suitable for daily maintenance',
    },
    '重建索引': {
        'zh-TW': '重立索引',
        'en-US': 'Rebuild Index',
    },
    '完整重新扫描所有文件，耗时较长但数据完整': {
        'zh-TW': '完整重新扫描所有文件，耗時较长但數据完整',
        'en-US': 'Fully rescan all files; takes longer but ensures complete data',
    },
    '执行说明': {
        'zh-TW': '執行說明',
        'en-US': 'Execution Notes',
    },
    '处理流程': {
        'en-US': 'Processing Flow',
    },
    '重建索引会重新处理所有文件，请根据文件数量预留充足时间': {
        'zh-TW': '重建索引会重新处理所有文件，请根据文件数量预留充足時間',
        'en-US': 'Rebuilding index will reprocess all files; reserve enough time based on file count',
    },
    '索引任务已启动': {
        'zh-TW': '索引任務已啟動',
        'en-US': 'Indexing task started',
    },
    '任务在后台努力运行中，请查看任务进度': {
        'zh-TW': '任務在後台努力运行中，请查看任務进度',
        'en-US': 'Task is running in the background, please check task progress',
    },
    '启动索引任务失败': {
        'zh-TW': '啟動索引任務失敗',
        'en-US': 'Failed to start indexing task',
    },
    '整理文件': {
        'en-US': 'Organize Files',
    },
    '按目录分类整理音乐文件': {
        'zh-TW': '按目錄分类整理音樂文件',
        'en-US': 'Organize music files by directory categories',
    },
    '删除文件夹': {
        'zh-TW': '刪除文件夹',
        'en-US': 'Delete Folder',
    },
    '删除空文件夹或无音乐文件夹': {
        'zh-TW': '刪除空文件夹或無音樂文件夹',
        'en-US': 'Delete empty folders or folders without music files',
    },
    '整理后的根目录': {
        'zh-TW': '整理后的根目錄',
        'en-US': 'Root Directory After Organization',
    },
    '整理到该目录': {
        'zh-TW': '整理到此目錄',
        'en-US': 'Organize into this directory',
    },
    '请输入根目录路径': {
        'zh-TW': '请輸入根目錄路径',
        'en-US': 'Please enter the root directory path',
    },
    '目录层级设置': {
        'zh-TW': '目錄层级設定',
        'en-US': 'Directory Level Settings',
    },
    '自定义变量': {
        'en-US': 'Custom Variables',
    },
    '请输入自定义变量，例如：${artist}-${album}': {
        'zh-TW': '请輸入自定义变量，例如：${artist}-${album}',
        'en-US': 'Please enter custom variables, e.g. ${artist}-${album}',
    },
    '启用音乐洗版': {
        'zh-TW': '启用音樂洗版',
        'en-US': 'Enable Music Remaster Workflow',
    },
    '洗版规则配置': {
        'zh-TW': '洗版规则設定',
        'en-US': 'Remaster Rule Configuration',
    },
    '格式优先级': {
        'en-US': 'Format Priority',
    },
    '文件大小规则': {
        'en-US': 'File Size Rules',
    },
    '比特率规则': {
        'en-US': 'Bitrate Rules',
    },
    '采样率/位深规则': {
        'en-US': 'Sample Rate/Bit Depth Rules',
    },
    '文件名规则': {
        'en-US': 'Filename Rules',
    },
    '删除策略': {
        'zh-TW': '刪除策略',
        'en-US': 'Deletion Strategy',
    },
    '关闭对话框': {
        'zh-TW': '關閉對話框',
        'en-US': 'Close Dialog',
    },
    '操作提醒': {
        'en-US': 'Operation Reminder',
    },
    '此操作将会删除选中的文件夹，请谨慎选择删除模式': {
        'zh-TW': '此操作将会刪除选中的文件夹，请谨慎選擇刪除模式',
        'en-US': 'This operation will delete selected folders. Please choose the deletion mode carefully.',
    },
    '删除模式': {
        'zh-TW': '刪除模式',
        'en-US': 'Deletion Mode',
    },
    '3 种模式': {
        'en-US': '3 modes',
    },
    '删除空文件夹': {
        'zh-TW': '刪除空文件夹',
        'en-US': 'Delete Empty Folders',
    },
    '仅删除完全空的文件夹': {
        'zh-TW': '僅刪除完全空的文件夹',
        'en-US': 'Delete only completely empty folders',
    },
    '删除无音乐文件夹': {
        'zh-TW': '刪除無音樂文件夹',
        'en-US': 'Delete folders without music files',
    },
    '删除不包含音乐文件的文件夹': {
        'zh-TW': '刪除不包含音樂文件的文件夹',
        'en-US': 'Delete folders that do not contain music files',
    },
    '删除勾选所有文件夹和文件': {
        'zh-TW': '刪除勾选所有文件夹和文件',
        'en-US': 'Delete all selected folders and files',
    },
    '⚠️ 危险操作：': {
        'en-US': '⚠️ Dangerous Operation: ',
    },
    '⚠️ 危险操作：此操作无法撤销，请谨慎使用': {
        'zh-TW': '⚠️ 危險操作：此操作無法撤銷，請謹慎使用',
        'en-US': '⚠️ Dangerous action: this cannot be undone. Please use with caution.',
    },
    '第{index}层目录': {
        default: '第{index}层目录',
        'zh-TW': '第{index}層目錄',
        'en-US': 'Level {index} directory',
    },
    '发生提示': {
        'zh-TW': '發生提示',
        'en-US': 'Notice',
    },
    '创建成功！': {
        'zh-TW': '建立成功！',
        'en-US': 'Create succeeded',
    },
    '创建失败！': {
        'zh-TW': '建立失敗！',
        'en-US': 'Create failed',
    },
    '创建失败': {
        'zh-TW': '建立失敗',
        'en-US': 'Create failed',
    },
    '格式转换': {
        'zh-TW': '格式轉換',
        'en-US': 'Format Conversion',
    },
    '转换音频格式和比特率': {
        'zh-TW': '轉換音频格式和比特率',
        'en-US': 'Convert audio format and bitrate',
    },
    '分割音轨': {
        'en-US': 'Split Tracks',
    },
    '使用CUE文件分割音轨': {
        'en-US': 'Split tracks using CUE files',
    },
    '导入收藏': {
        'zh-TW': '匯入收藏',
        'en-US': 'Import to Library',
    },
    '将本地音乐导入到音乐收藏库中': {
        'zh-TW': '将本地音樂匯入到音樂收藏库中',
        'en-US': 'Import local music into Music Library',
    },
    '重复文件检查': {
        'zh-TW': '重複文件检查',
        'en-US': 'Duplicate File Check',
    },
    '快速检查出重复文件进行删除': {
        'zh-TW': '快速检查出重复文件进行刪除',
        'en-US': 'Quickly detect duplicate files for deletion',
    },
    '回放增益': {
        'zh-TW': '傳放增益',
        'en-US': 'ReplayGain',
    },
    '预先计算的增益值自动调整音量': {
        'zh-TW': '預先计算對增益值自動调整音量',
        'en-US': 'Precomputed gain values automatically normalize volume',
    },
    '生成strm文件': {
        'en-US': 'Generate STRM Files',
    },
    '生成音乐流文件': {
        'zh-TW': '生成音樂流文件',
        'en-US': 'Generate music stream files',
    },
    '生成 strm 文件': {
        'en-US': 'Generate STRM files',
    },
    '确认(V2功能)': {
        'zh-TW': '确設(V2功能)',
        'en-US': 'Confirm (V2 Feature)',
    },
    '功能说明': {
        'zh-TW': '功能說明',
        'en-US': 'Feature Description',
    },
    '流媒体': {
        'en-US': 'Streaming',
    },
    '• 将音乐文件转换为 STRM 流媒体文件': {
        'zh-TW': '• 将音樂文件轉換为 STRM 流媒体文件',
        'en-US': '• Convert music files into STRM streaming files',
    },
    '• 适用于媒体服务器和播放器集成': {
        'zh-TW': '• 适用于媒体服務器和播放器集成',
        'en-US': '• Suitable for media server and player integration',
    },
    '• 支持签名验证，提高安全性': {
        'zh-TW': '• 支持签名驗證，提高安全性',
        'en-US': '• Supports signature verification to improve security',
    },
    '• 可自定义保存位置': {
        'zh-TW': '• 可自定义保存位定',
        'en-US': '• Custom save location supported',
    },
    '输出设置': {
        'zh-TW': '輸出設定',
        'en-US': 'Output Settings',
    },
    '文件配置': {
        'zh-TW': '文件設定',
        'en-US': 'File Configuration',
    },
    '保存目录': {
        'zh-TW': '保存目錄',
        'en-US': 'Save Directory',
    },
    '指定STRM文件的保存位置': {
        'zh-TW': '指定STRM文件對保存位定',
        'en-US': 'Specify where STRM files are saved',
    },
    '默认保存到当前目录': {
        'zh-TW': '預設保存到目前目錄',
        'en-US': 'By default, files are saved to the current directory',
    },
    '留空则保存到当前目录': {
        'zh-TW': '留空则保存到目前目錄',
        'en-US': 'Leave empty to save to the current directory',
    },
    '启用签名验证': {
        'zh-TW': '启用签名驗證',
        'en-US': 'Enable Signature Verification',
    },
    '为OpenList提供签名验证支持': {
        'zh-TW': '为OpenList提供签名驗證支持',
        'en-US': 'Enable signature verification for OpenList',
    },
    '开启签名后扫描速度会有所降低': {
        'zh-TW': '開啟签名后扫描速度会有所降低',
        'en-US': 'Enabling signatures may reduce scanning speed',
    },
    '音量平衡': {
        'en-US': 'Volume Balance',
    },
    '• 通过扫描各个文件的音量大小，计算回放增益值': {
        'zh-TW': '• 通过扫描各个文件對音量大小，计算傳放增益值',
        'en-US': '• Calculate ReplayGain values by scanning file loudness',
    },
    '• 将回放增益信息写入文件的属性标签中': {
        'zh-TW': '• 将回放增益信息写入文件的属性標籤中',
        'en-US': '• Write ReplayGain info to file tags',
    },
    '• 播放时通过回放增益统一音量大小': {
        'zh-TW': '• 播放时通过回放增益統一音量大小',
        'en-US': '• Normalize playback volume using ReplayGain',
    },
    '• 提供更一致的听音体验': {
        'zh-TW': '• 提供更一致對听音体驗',
        'en-US': '• Deliver a more consistent listening experience',
    },
    '环境要求': {
        'en-US': 'Environment Requirements',
    },
    '依赖组件': {
        'en-US': 'Dependencies',
    },
    '需要 FFmpeg 支持': {
        'en-US': 'FFmpeg support required',
    },
    '• 下载': {
        'zh-TW': '• 下載',
        'en-US': '• Download',
    },
    'FFmpeg 可执行文件': {
        'zh-TW': 'FFmpeg 可執行文件',
        'en-US': 'FFmpeg Executable',
    },
    '• 放置在挂载的': {
        'zh-TW': '• 放定在挂載對',
        'en-US': '• Place it in the mounted',
    },
    '目录下': {
        'zh-TW': '目錄下',
        'en-US': 'directory',
    },
    '• 确保文件具有执行权限': {
        'zh-TW': '• 确保文件具有執行权限',
        'en-US': '• Ensure files have executable permissions',
    },
    '注意事项': {
        'en-US': 'Notes',
    },
    '重要提示': {
        'en-US': 'Important Tip',
    },
    '处理过程可能需要较长时间，请耐心等待': {
        'zh-TW': '处理过程可能需要较长時間，请耐心等待',
        'en-US': 'Processing may take a while. Please wait patiently.',
    },
    '可在操作记录中查看处理进度和结果': {
        'zh-TW': '可在操作記錄中查看处理进度和结果',
        'en-US': 'You can view progress and results in Operation Logs.',
    },
    '重复检测': {
        'zh-TW': '重複检測',
        'en-US': 'Duplicate Detection',
    },
    '• 智能查找重复的音乐文件，支持多种检测方式': {
        'zh-TW': '• 智能查找重复的音樂文件，支持多种检测方式',
        'en-US': '• Smart duplicate music detection with multiple methods',
    },
    '• 不会自动删除文件，安全可靠': {
        'zh-TW': '• 不会自动刪除文件，安全可靠',
        'en-US': '• Files will not be deleted automatically; safe and reliable',
    },
    '• 可在操作记录中查看详细结果并进行后续处理': {
        'zh-TW': '• 可在操作記錄中查看详细结果并进行後續处理',
        'en-US': '• View detailed results in Operation Logs and perform follow-up actions',
    },
    '• 支持 Hash 校验和文件名相似度检测': {
        'zh-TW': '• 支持 Hash 校驗和文件名相似度检測',
        'en-US': '• Supports hash checks and filename similarity detection',
    },
    '检测方式': {
        'zh-TW': '检測方式',
        'en-US': 'Detection Method',
    },
    '多重校验': {
        'zh-TW': '多重校驗',
        'en-US': 'Multiple Validation',
    },
    'Hash 校验': {
        'zh-TW': 'Hash 校驗',
        'en-US': 'Hash Validation',
    },
    '基于文件内容哈希值检测完全相同的文件': {
        'zh-TW': '基于文件内容哈希值检測完全相同對文件',
        'en-US': 'Detect identical files by file-content hash',
    },
    '文件名校验': {
        'zh-TW': '文件名校驗',
        'en-US': 'Filename Validation',
    },
    '基于文件名相似度检测可能重复的文件': {
        'zh-TW': '基于文件名相似度检測可能重複對文件',
        'en-US': 'Detect possible duplicates by filename similarity',
    },
    '高级选项': {
        'zh-TW': '高级選项',
        'en-US': 'Advanced Options',
    },
    '精准识别': {
        'en-US': 'Precise Detection',
    },
    '启用声纹重复校验': {
        'zh-TW': '啟用声纹重複校驗',
        'en-US': 'Enable audio-fingerprint duplicate check',
    },
    '通过音频特征识别重复文件，精度更高但速度相对较慢': {
        'zh-TW': '通过音频特征识别重複文件，精度更高但速度相對较慢',
        'en-US': 'Detect duplicates by audio fingerprint, higher accuracy but slower',
    },
    '启用声纹识别后检测速度会显著降低，请耐心等待': {
        'zh-TW': '啟用声纹识别後检測速度会顯著降低，請耐心等待',
        'en-US': 'Enabling audio fingerprint detection will significantly reduce speed, Please wait patiently',
    },
    '启用音乐元数据对比': {
        'zh-TW': '启用音樂元数据对比',
        'en-US': 'Enable metadata comparison',
    },
    '基于音乐收藏中标题、艺术家、专辑等元数据识别重复文件': {
        'zh-TW': '基于音樂收藏中標題、藝術家、專輯等元数据识别重复文件',
        'en-US': 'Detect duplicate files based on title, artist, album, and other metadata in Music Library',
    },
    '系统只会检测重复文件，不会自动删除任何内容': {
        'zh-TW': '系統只会检测重复文件，不会自动刪除任何内容',
        'en-US': 'System only detects duplicates and will not delete anything automatically',
    },
    '检测结果将显示在操作记录中，可根据需要手动处理': {
        'zh-TW': '检测结果将顯示在操作記錄中，可根据需要手动处理',
        'en-US': 'Detection results will appear in Operation Logs and can be handled manually',
    },
    '音乐导入': {
        'zh-TW': '音樂匯入',
        'en-US': 'Music Import',
    },
    '• 将勾选的音乐文件导入音乐收藏库': {
        'zh-TW': '• 将勾选的音樂文件匯入音樂收藏库',
        'en-US': '• Import selected music files into Music Library',
    },
    '• 支持批量导入和智能去重': {
        'zh-TW': '• 支持批量匯入和智能去重',
        'en-US': '• Supports batch import and smart deduplication',
    },
    '• 导入速率可调节，适应不同性能的机器': {
        'zh-TW': '• 匯入速率可调节，适应不同性能的机器',
        'en-US': '• Import speed is adjustable for different hardware performance',
    },
    '导入设置': {
        'zh-TW': '匯入設定',
        'en-US': 'Import Settings',
    },
    '参数配置': {
        'zh-TW': '參數設定',
        'en-US': 'Parameter Configuration',
    },
    '跳过已入库文件': {
        'en-US': 'Skip files already in Music Library',
    },
    '自动跳过已经存在于收藏库中的音乐文件': {
        'zh-TW': '自动跳过已经存在于收藏库中的音樂文件',
        'en-US': 'Automatically skip files already in Music Library',
    },
    '导入速率': {
        'zh-TW': '匯入速率',
        'en-US': 'Import Rate',
    },
    '每秒导入的音乐文件数量': {
        'zh-TW': '每秒匯入的音樂文件数量',
        'en-US': 'Number of files imported per second',
    },
    '文件/秒': {
        'en-US': 'files/sec',
    },
    '建议根据机器性能调节，数值过大可能影响系统稳定性': {
        'zh-TW': '建议根据机器性能调节，数值过大可能影响系統稳定性',
        'en-US': 'Adjust this based on system performance. Values that are too high may affect stability.',
    },
    '音频处理': {
        'en-US': 'Audio Processing',
    },
    '• 将音频转换成其他格式，保存在同目录下': {
        'zh-TW': '• 将音频轉換成其他格式，保存在同目錄下',
        'en-US': '• Convert audio to other formats and save in the same directory',
    },
    '• 不会删除源文件，安全可靠': {
        'zh-TW': '• 不会刪除源文件，安全可靠',
        'en-US': '• Source files will not be deleted; safe and reliable',
    },
    '• 需要下载': {
        'zh-TW': '• 需要下載',
        'en-US': '• Download the required',
    },
    '可执行文件': {
        'zh-TW': '可執行文件',
        'en-US': 'Executable File',
    },
    '• 放置在挂载的 /app/data/bin/ 目录下': {
        'zh-TW': '• 放置在挂载的 /app/data/bin/ 目錄下',
        'en-US': '• Place it in the mounted /app/data/bin/ directory',
    },
    '输入设置': {
        'zh-TW': '輸入設定',
        'en-US': 'Input Settings',
    },
    '源文件': {
        'en-US': 'Source File',
    },
    '输入格式': {
        'zh-TW': '輸入格式',
        'en-US': 'Input Format',
    },
    '选择需要转换的音频格式': {
        'zh-TW': '選擇需要轉換的音频格式',
        'en-US': 'Select audio formats to convert',
    },
    '留空则转换所有格式': {
        'zh-TW': '留空则轉換所有格式',
        'en-US': 'Leave empty to convert all formats',
    },
    '留空则对所有格式进行转换': {
        'zh-TW': '留空则对所有格式进行轉換',
        'en-US': 'Leave empty to apply to all formats',
    },
    '格式设置': {
        'zh-TW': '格式設定',
        'en-US': 'Format Settings',
    },
    '输出配置': {
        'zh-TW': '輸出設定',
        'en-US': 'Output Configuration',
    },
    '目标格式': {
        'zh-TW': '目標格式',
        'en-US': 'Target Format',
    },
    '选择音频输出格式': {
        'zh-TW': '選擇音频輸出格式',
        'en-US': 'Select output audio format',
    },
    '比特率': {
        'en-US': 'Bitrate',
    },
    '音频质量设置': {
        'zh-TW': '音频质量設定',
        'en-US': 'Audio quality settings',
    },
    '采样率': {
        'en-US': 'Sample Rate',
    },
    '音频采样频率': {
        'en-US': 'Audio sample frequency',
    },
    '必须是目标格式支持的有效采样率值，否则将转换失败': {
        'zh-TW': '必须是目标格式支持的有效采样率值，否则将轉換失敗',
        'en-US': 'Must be a valid sample rate supported by the target format, otherwise conversion will fail',
    },
    '音频切割': {
        'en-US': 'Audio Splitting',
    },
    '• 使用 CUE 标记文件无损切割整轨 CD 音轨': {
        'zh-TW': '• 使用 CUE 标记文件無损切割整轨 CD 音轨',
        'en-US': '• Use CUE markers for lossless splitting of full CD tracks',
    },
    '• 不会删除源文件（除非手动选择）': {
        'zh-TW': '• 不会刪除源文件（除非手动選擇）',
        'en-US': '• Source files will not be deleted (unless selected manually)',
    },
    '文件格式': {
        'en-US': 'File Format',
    },
    '选择切割后的音频格式': {
        'zh-TW': '選擇切割后的音频格式',
        'en-US': 'Select output format after split',
    },
    '删除源文件': {
        'zh-TW': '刪除源文件',
        'en-US': 'Delete Source Files',
    },
    '切割完成后是否删除原始文件': {
        'zh-TW': '切割完成后是否刪除原始文件',
        'en-US': 'Delete original files after splitting',
    },
    '手动刮削': {
        'zh-TW': '手動刮削',
        'en-US': 'Manual Scraping',
    },
    '手动编辑音乐标签信息': {
        'zh-TW': '手动编辑音樂標籤信息',
        'en-US': 'Manually edit music tag metadata',
    },
    '自动刮削': {
        'zh-TW': '自動刮削',
        'en-US': 'Automatic Scraping',
    },
    '自动匹配音乐标签信息': {
        'zh-TW': '自动匹配音樂標籤信息',
        'en-US': 'Automatically match music tag metadata',
    },
    '后台刮削': {
        'zh-TW': '後台刮削',
        'en-US': 'Background Scraping',
    },
    '查看后台刮削配置信息': {
        'zh-TW': '查看後台刮削設定信息',
        'en-US': 'View Background Scraping configuration',
    },
    '手动修改标签': {
        'zh-TW': '手动修改標籤',
        'en-US': 'Manual Tag Editing',
    },
    '自动修改标签': {
        'zh-TW': '自动修改標籤',
        'en-US': 'Automatic Tag Editing',
    },
    '根据元数据中的标题、艺术家、专辑和文件名、文件完整路径进行匹配。': {
        'zh-TW': '根据元数据中的標題、藝術家、專輯和文件名、文件完整路径进行匹配。',
        'en-US': 'Match using metadata title/artist/album, filename, and full file path.',
    },
    '标题、艺术家、专辑每一项匹配等级指标：完全一致，包含，不匹配': {
        'zh-TW': '標題、藝術家、專輯每一项匹配等级指标：完全一致，包含，不匹配',
        'en-US': 'Match levels for title, artist, and album: exact match, contains, not matched',
    },
    '匹配设置': {
        'zh-TW': '匹配設定',
        'en-US': 'Matching Settings',
    },
    '核心配置': {
        'zh-TW': '核心設定',
        'en-US': 'Core Configuration',
    },
    '匹配模式': {
        'zh-TW': '匹設模式',
        'en-US': 'Matching Mode',
    },
    '宽松模式': {
        'en-US': 'Loose Mode',
    },
    '满足标题包含即可，但也优先选完全一致': {
        'zh-TW': '满足標題包含即可，但也优先选完全一致',
        'en-US': 'Title contains is sufficient, but exact match is preferred',
    },
    '标准模式': {
        'zh-TW': '標准模式',
        'en-US': 'Standard Mode',
    },
    '三个指标必须为包含或完全一致，但也优先选完全一致': {
        'zh-TW': '三个指標必须为含含或完全一致，但也优先選完全一致',
        'en-US': 'All three metrics must be contains or exact match, with exact match preferred',
    },
    '严格模式': {
        'en-US': 'Strict Mode',
    },
    '三个指标必须都为完全一致': {
        'zh-TW': '三个指標必须都为完全一致',
        'en-US': 'All three metrics must match exactly',
    },
    '刮削速率': {
        'en-US': 'Scraping Rate',
    },
    '数据源': {
        'zh-TW': '數据源',
        'en-US': 'Data Source',
    },
    '标签源': {
        'zh-TW': '標籤源',
        'en-US': 'Tag Source',
    },
    '标签源选择': {
        'zh-TW': '標籤源選擇',
        'en-US': 'Tag Source Selection',
    },
    '修改范围': {
        'en-US': 'Modification Scope',
    },
    '字段选择': {
        'zh-TW': '字段選擇',
        'en-US': 'Field Selection',
    },
    '可选配置': {
        'zh-TW': '可选設定',
        'en-US': 'Optional Configuration',
    },
    '跳过匹配': {
        'zh-TW': '跳过匹設',
        'en-US': 'Skip Matching',
    },
    '如修改范围中元数据都存在，则跳过匹配，原有音乐标签将被保留，不会被修改或覆盖': {
        'zh-TW': '如修改范围中元数据都存在，则跳过匹配，原有音樂標籤将被保留，不会被修改或覆盖',
        'en-US': 'If metadata in the selected modification scope already exists, matching is skipped; existing tags are kept and not overwritten',
    },
    '同目录解释为同个专辑': {
        'zh-TW': '同目錄解释为同个專輯',
        'en-US': '"Same directory" means the same album',
    },
    '当元数据中不存在专辑信息，用于补充专辑信息，提高匹配度': {
        'zh-TW': '当元数据中不存在專輯信息，用于补充專輯信息，提高匹配度',
        'en-US': 'When album metadata is missing, use this to supplement album information and improve matching',
    },
    '模型类型': {
        'zh-TW': '模型類型',
        'en-US': 'Model Type',
    },
    '通用大模型': {
        'zh-TW': '通用大模型',
        'en-US': 'General LLM',
    },
    'Jev 模型': {
        'en-US': 'Jev Model',
    },
    '正在检查模型配置...': {
        'zh-TW': '正在檢查模型設定...',
        'en-US': 'Checking model configuration...',
    },
    '模型配置检查失败，请重试。': {
        'zh-TW': '模型設定檢查失敗，請重試。',
        'en-US': 'Could not check model configuration. Please retry.',
    },
    '尚未配置 Jev 模型。': {
        'zh-TW': '尚未設定 Jev 模型。',
        'en-US': 'Jev is not configured.',
    },
    '尚未配置通用大模型。': {
        'zh-TW': '尚未設定通用大模型。',
        'en-US': 'The general LLM is not configured.',
    },
    '前往 API 设置': {
        'zh-TW': '前往 API 設定',
        'en-US': 'Open API Settings',
    },
    '请联系管理员配置模型。': {
        'zh-TW': '請聯絡管理員設定模型。',
        'en-US': 'Ask an administrator to configure the model.',
    },
    'Jev 根据当前文件元数据和决策文档回答问题，评分结果会写入指定标签字段并记录在任务日志中。': {
        'zh-TW': 'Jev 根據目前檔案的元資料和決策文件回答問題，評分結果會寫入指定標籤欄位並記錄於任務日誌。',
        'en-US': 'Jev answers questions using the file metadata and decision document, writes the score result to the selected tag field, and records it in the task log.',
    },
    '提示词模板': {
        'zh-TW': '提示詞範本',
        'en-US': 'Prompt Templates',
    },
    '修正标签': {
        'zh-TW': '修正標籤',
        'en-US': 'Fix Tags',
    },
    '补全信息': {
        'zh-TW': '補全資訊',
        'en-US': 'Fill Missing Info',
    },
    '识别风格': {
        'zh-TW': '辨識曲風',
        'en-US': 'Identify Genre',
    },
    '请检查标题、艺术家和专辑中的错别字、乱码及多余的文件名信息。仅返回需要修改的元数据字段 JSON 对象；无法确定时返回 {}。': {
        'zh-TW': '請檢查標題、藝術家和專輯中的錯字、亂碼及多餘的檔名資訊。僅回傳需要修改的元資料欄位 JSON 物件；無法確定時回傳 {}。',
        'en-US': 'Check the title, artist, and album for typos, garbled text, and extra filename text. Return only a JSON object with metadata fields that need changes; return {} when uncertain.',
    },
    '请根据现有元数据补全缺失的 genre、year 和 language。不要猜测无法确认的信息，仅返回需要补全的字段 JSON 对象；无可靠结果时返回 {}。': {
        'zh-TW': '請根據現有元資料補全缺少的 genre、year 和 language。不要猜測無法確認的資訊，僅回傳需要補全的欄位 JSON 物件；沒有可靠結果時回傳 {}。',
        'en-US': 'Use existing metadata to fill missing genre, year, and language. Do not guess uncertain information. Return only a JSON object with fields to fill; return {} if no reliable result exists.',
    },
    '请根据标题、艺术家、专辑和歌词判断歌曲风格。仅返回包含 genre 字段的 JSON 对象；无法判断时返回 {}。': {
        'zh-TW': '請根據標題、藝術家、專輯和歌詞判斷歌曲曲風。僅回傳包含 genre 欄位的 JSON 物件；無法判斷時回傳 {}。',
        'en-US': 'Determine the song genre from its title, artist, album, and lyrics. Return only a JSON object containing genre; return {} when uncertain.',
    },
    '后台刮削配置': {
        'zh-TW': '後台刮削設定',
        'en-US': 'Background Scraping Configuration',
    },
    '后台刮削配置说明': {
        'zh-TW': '後台刮削設定說明',
        'en-US': 'Background Scraping Configuration Notes',
    },
    '后台刮削功能的表单配置与系统设置中的后台刮削配置完全一致。': {
        'zh-TW': '後台刮削功能的表单設定与系統設定中的後台刮削設定完全一致。',
        'en-US': 'Form settings in Background Scraping are fully consistent with the system settings for Background Scraping.',
    },
    '如需修改配置,请前往:': {
        'zh-TW': '如需修改設定,请前往:',
        'en-US': 'To change settings, go to:',
    },
    '前往系统设置': {
        'zh-TW': '前往系統設定',
        'en-US': 'Go to System Settings',
    },
    '后台刮削功能': {
        'zh-TW': '後台刮削功能',
        'en-US': 'Background Scraping',
    },
    '音乐预处理': {
        'zh-TW': '音樂预处理',
        'en-US': 'Music Preprocessing',
    },
    '音乐自动刮削': {
        'zh-TW': '音樂自动刮削',
        'en-US': 'Automatic Music Scraping',
    },
    '音乐文件整理': {
        'zh-TW': '音樂文件整理',
        'en-US': 'Music File Organization',
    },
    '包括复制文件、声纹识别、乱码修复、繁体转简体等预处理操作': {
        'zh-TW': '包括複製檔案、聲紋識別、亂碼修復、繁體轉簡體等預處理操作',
        'en-US': 'Includes preprocessing such as file copy, fingerprint recognition, mojibake fix, and Traditional-to-Simplified conversion',
    },
    '自动从音乐流媒体平台搜索元数据并进行刮削,支持自动模式和手动模式': {
        'zh-TW': '自動從音樂串流平台搜尋元數據並進行刮削，支援自動模式和手動模式',
        'en-US': 'Automatically searches metadata from music streaming platforms and scrapes it, supporting both automatic and manual modes',
    },
    '按照设定的规则整理音乐文件目录结构,支持洗版功能': {
        'zh-TW': '按照設定規則整理音樂檔案目錄結構，支援洗版功能',
        'en-US': 'Organizes music file directory structure by configured rules, with remaster replacement support',
    },
    '操作台的后台刮削只对勾选的文件进行刮削': {
        'zh-TW': '操作台的後台刮削只对勾选的文件进行刮削',
        'en-US': 'In Workspace, Background Scraping runs only on selected files',
    },
    '文件类型错误': {
        'en-US': 'Invalid file type',
    },
    '请选择图片文件': {
        'zh-TW': '请選擇图片文件',
        'en-US': 'Please select an image file',
    },
    '文件过大': {
        'en-US': 'File is too large',
    },
    '图片大小不能超过5MB': {
        'en-US': 'Image size must not exceed 5MB',
    },
    '上传成功': {
        'zh-TW': '上傳成功',
        'en-US': 'Upload succeeded',
    },
    '上传失败': {
        'zh-TW': '上傳失敗',
        'en-US': 'Upload failed',
    },
    '服务器响应格式错误': {
        'zh-TW': '服務器响应格式错误',
        'en-US': 'Invalid server response format',
    },
    '网络错误': {
        'zh-TW': '網路错误',
        'en-US': 'Network Error',
    },
    '语言转换': {
        'zh-TW': '语言轉換',
        'en-US': 'Language Conversion',
    },
    '拆分元数据': {
        'zh-TW': '拆分元數据',
        'en-US': 'Split Metadata',
    },
    '从文件名提取音乐信息': {
        'zh-TW': '从文件名提取音樂信息',
        'en-US': 'Extract music metadata from filename',
    },
    '替换文本': {
        'zh-TW': '替換文本',
        'en-US': 'Replace Text',
    },
    '批量替换无关文本信息': {
        'zh-TW': '批量替换無关文本信息',
        'en-US': 'Batch replace irrelevant text',
    },
    '乱码修复': {
        'zh-TW': '乱碼修複',
        'en-US': 'Encoding Repair',
    },
    '编码智能检测 · UTF-8转换': {
        'zh-TW': '编码智能检测 · UTF-8轉換',
        'en-US': 'Smart encoding detection · UTF-8 conversion',
    },
    '智能转换': {
        'zh-TW': '智能轉換',
        'en-US': 'Smart Conversion',
    },
    '智能识别': {
        'en-US': 'Smart Recognition',
    },
    '智能语言转换': {
        'zh-TW': '智能语言轉換',
        'en-US': 'Smart Language Conversion',
    },
    '转换方向': {
        'zh-TW': '轉換方向',
        'en-US': 'Conversion Direction',
    },
    '双向转换': {
        'zh-TW': '双向轉換',
        'en-US': 'Bidirectional Conversion',
    },
    '简体转繁体': {
        'zh-TW': '简体轉繁体',
        'en-US': 'Simplified to Traditional',
    },
    '将简体中文转换为繁体中文': {
        'zh-TW': '将简体中文轉換为繁体中文',
        'en-US': 'Convert Simplified Chinese to Traditional Chinese',
    },
    '繁体转简体': {
        'zh-TW': '繁体轉简体',
        'en-US': 'Traditional to Simplified',
    },
    '将繁体中文转换为简体中文': {
        'zh-TW': '将繁体中文轉換为简体中文',
        'en-US': 'Convert Traditional Chinese to Simplified Chinese',
    },
    '转换预览': {
        'zh-TW': '轉換預覽',
        'en-US': 'Conversion Preview',
    },
    '实时预览': {
        'zh-TW': '实时預覽',
        'en-US': 'Live Preview',
    },
    '转换前': {
        'zh-TW': '轉換前',
        'en-US': 'Before Conversion',
    },
    '转换后': {
        'zh-TW': '轉換后',
        'en-US': 'After Conversion',
    },
    '智能检测': {
        'zh-TW': '智能检測',
        'en-US': 'Smart Detection',
    },
    '自动修复': {
        'zh-TW': '自動修複',
        'en-US': 'Auto Repair',
    },
    '编码乱码修复': {
        'zh-TW': '编碼乱碼修複',
        'en-US': 'Encoding Corruption Repair',
    },
    '检测范围': {
        'zh-TW': '检測范围',
        'en-US': 'Detection Scope',
    },
    '常见问题': {
        'zh-TW': '常见问題',
        'en-US': 'FAQ',
    },
    '参考示例': {
        'zh-TW': '參考示例',
        'en-US': 'Reference Examples',
    },
    '乱码类型示例': {
        'zh-TW': '乱碼类型示例',
        'en-US': 'Examples of Encoding Corruption',
    },
    '中文': {
        'en-US': 'Chinese',
    },
    '汉字': {
        'en-US': 'Chinese Characters',
    },
    '选择要从哪个字段提取元数据信息': {
        'zh-TW': '選擇要从哪个字段提取元数据信息',
        'en-US': 'Select the source field for metadata extraction',
    },
    '使用正则表达式匹配模式，支持命名捕获组：(?P&lt;title&gt;...)': {
        'zh-TW': '使用正则表达式匹設模式，支持命名捕获组：(?P&lt;title&gt;...)',
        'en-US': 'Use regex matching mode. Named capture groups are supported: (?P&lt;title&gt;...)',
    },
    '清空所有规则': {
        'en-US': 'Clear All Rules',
    },
    '智能清理无关信息': {
        'zh-TW': '智能清理無关信息',
        'en-US': 'Smart cleanup of irrelevant information',
    },
    '选择文本替换或正则表达式替换': {
        'zh-TW': '選擇文本替换或正则表达式替换',
        'en-US': 'Choose text replacement or regex replacement',
    },
    '选择要修改的元数据字段': {
        'zh-TW': '選擇要修改的元数据字段',
        'en-US': 'Select metadata fields to modify',
    },
    '替换前': {
        'zh-TW': '替換前',
        'en-US': 'Before Replace',
    },
    '要替换的内容': {
        'zh-TW': '要替換對内容',
        'en-US': 'Content to replace',
    },
    '替换后': {
        'zh-TW': '替換後',
        'en-US': 'After Replace',
    },
    '替换后内容（可为空）': {
        'zh-TW': '替換後内容（可为空）',
        'en-US': 'Replacement content (optional)',
    },
    '移除方括号内容': {
        'zh-TW': '移除方括號内容',
        'en-US': 'Remove square-bracket content',
    },
    '移除圆括号内容': {
        'zh-TW': '移除圆括號内容',
        'en-US': 'Remove parenthetical content',
    },
    '移除合作标识': {
        'zh-TW': '移除合作標识',
        'en-US': 'Remove collaboration markers',
    },
    '预览结果': {
        'zh-TW': '預覽结果',
        'en-US': 'Preview Result',
    },
    '实时预览处理效果': {
        'zh-TW': '实时預覽处理效果',
        'en-US': 'Live preview of processing results',
    },
    'AI 智能生成': {
        'en-US': 'AI Smart Generate',
    },
    '使用教程': {
        'en-US': 'User Guide',
    },
    '1. 请将下面样例文本中的': {
        'zh-TW': '1. 請将下面样例文本中對',
        'en-US': '1. Please replace the content in the sample text below',
    },
    '替换为你需要拆分的文件名': {
        'zh-TW': '替換为你需要拆分對文件名',
        'en-US': 'Replace with the filename you want to split',
    },
    '2. 拆分后的元数据范围：': {
        'zh-TW': '2. 拆分後對元數据范围：',
        'en-US': '2. Metadata fields to extract after splitting:',
    },
    '音轨号(tracknumber)和歌曲名(title)': {
        'zh-TW': '音轨號(tracknumber)和歌曲名(title)',
        'en-US': 'Track number (tracknumber) and song title (title)',
    },
    '改为你想要提取的元数据': {
        'zh-TW': '改为你想要提取對元數据',
        'en-US': 'Change to the metadata you want to extract',
    },
    'AI 提示词': {
        'zh-TW': 'AI 提示詞',
        'en-US': 'AI Prompt',
    },
    '描述你的拆分需求...': {
        'zh-TW': '描述你對拆分需求...',
        'en-US': 'Describe your split requirements...',
    },
    '正则表达式': {
        'en-US': 'Regular Expression',
    },
    'AI生成的正则表达式...': {
        'zh-TW': 'AI生成對正则表达式...',
        'en-US': 'AI-generated regular expression...',
    },
    '预览测试': {
        'zh-TW': '預覽測試',
        'en-US': 'Preview Test',
    },
    '示例文本': {
        'en-US': 'Sample Text',
    },
    '请输入测试文本...': {
        'zh-TW': '请輸入測試文本...',
        'en-US': 'Please enter test text...',
    },
    '执行结果': {
        'zh-TW': '執行结果',
        'en-US': 'Execution Result',
    },
    '请将下面样例文本中的': {
        'zh-TW': '請将下面样例文本中對',
        'en-US': 'In the sample text below, please replace',
    },
    '替换为你需要操作的文件名': {
        'zh-TW': '替換为你需要操作對文件名',
        'en-US': 'Replace with the filename you want to process',
    },
    '描述你的替换需求...': {
        'zh-TW': '描述你對替換需求...',
        'en-US': 'Describe your replacement requirements...',
    },
    '预览成功！': {
        'zh-TW': '預覽成功！',
        'en-US': 'Preview succeeded',
    },
    '预览失败！': {
        'zh-TW': '預覽失敗！',
        'en-US': 'Preview failed',
    },
    '生成失败！': {
        'zh-TW': '生成失敗！',
        'en-US': 'Generation failed',
    },
    '复制成功！': {
        'zh-TW': '複製成功！',
        'en-US': 'Copy succeeded',
    },
    '已复制到剪贴板': {
        'zh-TW': '已複製到剪贴板',
        'en-US': 'Copied to clipboard',
    },
    '复制失败！': {
        'zh-TW': '複製失敗！',
        'en-US': 'Copy failed',
    },
    '请手动复制': {
        'zh-TW': '请手动複製',
        'en-US': 'Please copy manually',
    },
    '本机播放': {
        'en-US': 'Local Playback',
    },
    '手动添加的设备': {
        'zh-TW': '手动添加的裝置',
        'en-US': 'Manually Added Devices',
    },
    '手动添加DLNA设备': {
        'zh-TW': '手动添加DLNA裝置',
        'en-US': 'Manually Add DLNA Device',
    },
    '填写DLNA设备的基本信息来手动添加设备': {
        'zh-TW': '填写DLNA裝置的基本信息来手动添加裝置',
        'en-US': 'Fill in basic DLNA device information to add a device manually',
    },
    '设备UDN': {
        'zh-TW': '裝置UDN',
        'en-US': 'Device UDN',
    },
    '例如: uuid:12345678-1234-1234-1234-123456789012': {
        'en-US': 'Example: uuid:12345678-1234-1234-1234-123456789012',
    },
    '描述URL': {
        'en-US': 'Description URL',
    },
    '例如: http://192.168.1.100:8200/description.xml': {
        'en-US': 'Example: http://192.168.1.100:8200/description.xml',
    },
    '设备名称': {
        'zh-TW': '裝置名稱',
        'en-US': 'Device Name',
    },
    '例如: 客厅音响': {
        'en-US': 'Example: Living Room Speaker',
    },
    '设备型号': {
        'zh-TW': '裝置型号',
        'en-US': 'Device Model',
    },
    '例如: Smart Speaker Pro': {
        'en-US': 'Example: Smart Speaker Pro',
    },
    '制造商': {
        'zh-TW': '製造商',
        'en-US': 'Manufacturer',
    },
    '例如: Samsung Electronics': {
        'en-US': 'Example: Samsung Electronics',
    },
    '添加设备': {
        'zh-TW': '添加裝置',
        'en-US': 'Add Device',
    },
    '添加中...': {
        'en-US': 'Adding...',
    },
    '刷新设备失败！': {
        'zh-TW': '刷新裝置失敗！',
        'en-US': 'Refresh devices failed',
    },
    '添加成功！': {
        'en-US': 'Add succeeded',
    },
    '添加设备失败！': {
        'zh-TW': '添加裝置失敗！',
        'en-US': 'Add device failed',
    },
    '标签来源': {
        'zh-TW': '標籤來源',
        'en-US': 'Tag Source',
    },
    '基础配置': {
        'zh-TW': '基础設定',
        'en-US': 'Basic Configuration',
    },
    '选择元数据来源': {
        'zh-TW': '選擇元数据來源',
        'en-US': 'Select Metadata Source',
    },
    '默认：网易云音乐': {
        'zh-TW': '預設：网易云音樂',
        'en-US': 'Default: NetEase Cloud Music',
    },
    '选择音乐元数据来源': {
        'zh-TW': '選擇音樂元数据來源',
        'en-US': 'Select music metadata source',
    },
    '字段分组管理': {
        'en-US': 'Field Group Management',
    },
    '高级配置': {
        'zh-TW': '高级設定',
        'en-US': 'Advanced Settings',
    },
    '分组名称': {
        'zh-TW': '分组名稱',
        'en-US': 'Group Name',
    },
    '自定义': {
        'en-US': 'Custom',
    },
    '字段列表': {
        'en-US': 'Field List',
    },
    '导出配置': {
        'zh-TW': '匯出設定',
        'en-US': 'Export Configuration',
    },
    '导入配置': {
        'zh-TW': '匯入設定',
        'en-US': 'Import Configuration',
    },
    '重置默认': {
        'zh-TW': '重置預設',
        'en-US': 'Reset to Default',
    },
    '选择字段': {
        'zh-TW': '選擇字段',
        'en-US': 'Select Fields',
    },
    '搜索字段...': {
        'en-US': 'Search fields...',
    },
    '保存成功！': {
        'en-US': 'Save succeeded',
    },
    '刮削配置已保存': {
        'zh-TW': '刮削設定已保存',
        'en-US': 'Scraping configuration saved',
    },
    '保存失败！': {
        'zh-TW': '保存失敗！',
        'en-US': 'Save failed',
    },
    '导出成功！': {
        'zh-TW': '匯出成功！',
        'en-US': 'Export succeeded',
    },
    '配置文件已下载': {
        'zh-TW': '設定文件已下載',
        'en-US': 'Configuration file downloaded',
    },
    '导出失败！': {
        'zh-TW': '匯出失敗！',
        'en-US': 'Export failed',
    },
    '导入成功！': {
        'zh-TW': '匯入成功！',
        'en-US': 'Import succeeded',
    },
    '配置已导入，请检查并保存': {
        'zh-TW': '設定已匯入，请检查并保存',
        'en-US': 'Configuration imported. Please review and save.',
    },
    '导入失败！': {
        'zh-TW': '匯入失敗！',
        'en-US': 'Import failed',
    },
    '重置成功！': {
        'zh-TW': '重定成功！',
        'en-US': 'Reset succeeded',
    },
    '已恢复为默认配置，请保存': {
        'zh-TW': '已還原为預設設定，请保存',
        'en-US': 'Restored to default configuration. Please save.',
    },
    '全选': {
        'zh-TW': '全選',
        'en-US': 'Select All',
    },
    '分享播放列表': {
        'en-US': 'Share Playlist',
    },
    '分享方式': {
        'en-US': 'Share Method',
    },
    '公开链接': {
        'zh-TW': '公開链線',
        'en-US': 'Public Link',
    },
    '指定用户': {
        'en-US': 'Specified Users',
    },
    '选择用户': {
        'zh-TW': '選擇用户',
        'en-US': 'Select User',
    },
    '搜索用户名...': {
        'en-US': 'Search users...',
    },
    '添加': {
        'en-US': 'Add',
    },
    '权限级别': {
        'en-US': 'Permission Level',
    },
    '仅查看': {
        'zh-TW': '僅查看',
        'en-US': 'Read Only',
    },
    '可复制': {
        'zh-TW': '可複製',
        'en-US': 'Copyable',
    },
    '可编辑': {
        'zh-TW': '可编輯',
        'en-US': 'Editable',
    },
    '有效期': {
        'en-US': 'Validity Period',
    },
    '永久有效': {
        'en-US': 'Permanent',
    },
    '7天': {
        'en-US': '7 days',
    },
    '30天': {
        'en-US': '30 days',
    },
    '90天': {
        'en-US': '90 days',
    },
    '访问密码（可选）': {
        'zh-TW': '访问密碼（可选）',
        'en-US': 'Access password (optional)',
    },
    '留空表示不设置密码': {
        'zh-TW': '留空表示不設定密碼',
        'en-US': 'Leave empty to disable password',
    },
    '分享链接已生成：': {
        'zh-TW': '分享链線已生成：',
        'en-US': 'Share link generated:',
    },
    '类型': {
        'en-US': 'Type',
    },
    '分享对象': {
        'zh-TW': '分享對象',
        'en-US': 'Share Target',
    },
    '权限': {
        'en-US': 'Permission',
    },
    '访问次数': {
        'zh-TW': '访问次數',
        'en-US': 'Access Count',
    },
    '创建时间': {
        'zh-TW': '建立時間',
        'en-US': 'Created Time',
    },
    '过期时间': {
        'zh-TW': '过期時間',
        'en-US': 'Expiration Time',
    },
    '状态': {
        'zh-TW': '狀態',
        'en-US': 'Status',
    },
    '操作': {
        'en-US': 'Actions',
    },
    '分享链接创建成功！': {
        'zh-TW': '分享链接建立成功！',
        'en-US': 'Share link created',
    },
    '撤销成功！': {
        'en-US': 'Revoke succeeded',
    },
    '撤销失败': {
        'zh-TW': '撤销失敗',
        'en-US': 'Revoke failed',
    },
    '已复制到剪贴板！': {
        'zh-TW': '已複製到剪贴板！',
        'en-US': 'Copied to clipboard',
    },
    '复制失败': {
        'zh-TW': '複製失敗',
        'en-US': 'Copy failed',
    },
    '首页': {
        'zh-TW': '首頁',
        'en-US': 'Home',
    },
    '风格': {
        'zh-TW': '風格',
        'en-US': 'Genres',
    },
    '喜爱': {
        'en-US': 'Favorites',
    },
    '插件开发工具': {
        'zh-TW': '插件開發工具',
        'en-US': 'Plugin Development Tool',
    },
    '轻松创建自定义插件，无需深入了解复杂的技术细节': {
        'zh-TW': '轻松建立自定义插件，無需深入了解复杂的技术细节',
        'en-US': 'Easily create custom plugins without diving into complex technical details',
    },
    '选择类型': {
        'zh-TW': '選擇类型',
        'en-US': 'Select Type',
    },
    '基本信息': {
        'en-US': 'Basic Information',
    },
    '配置项': {
        'zh-TW': '設定项',
        'en-US': 'Configuration Items',
    },
    '生成预览': {
        'zh-TW': '生成預覽',
        'en-US': 'Generate Preview',
    },
    '选择插件类型': {
        'zh-TW': '選擇插件类型',
        'en-US': 'Select Plugin Type',
    },
    '从模板创建': {
        'zh-TW': '从模板建立',
        'en-US': 'Create from Template',
    },
    '自定义创建': {
        'zh-TW': '自定义建立',
        'en-US': 'Custom Create',
    },
    '插件基本信息': {
        'en-US': 'Plugin Basic Information',
    },
    '插件名称 *': {
        'zh-TW': '插件名稱 *',
        'en-US': 'Plugin Name *',
    },
    '例如: my_music_plugin': {
        'en-US': 'Example: my_music_plugin',
    },
    '插件的内部标识名称，只能包含字母、数字和下划线': {
        'zh-TW': '插件的内部标识名稱，只能包含字母、数字和下划线',
        'en-US': 'Internal plugin identifier. Only letters, numbers, and underscores are allowed',
    },
    '显示名称 *': {
        'zh-TW': '顯示名稱 *',
        'en-US': 'Display Name *',
    },
    '例如: 我的音乐插件': {
        'zh-TW': '例如: 我的音樂插件',
        'en-US': 'Example: My Music Plugin',
    },
    '用户界面中显示的插件名称': {
        'zh-TW': '用户界面中顯示的插件名稱',
        'en-US': 'Plugin display name shown in UI',
    },
    '插件描述 *': {
        'en-US': 'Plugin Description *',
    },
    '请描述插件的功能和用途...': {
        'zh-TW': '請描述插件對功能和用途...',
        'en-US': 'Please describe plugin functionality and purpose...',
    },
    '版本号': {
        'zh-TW': '版本號',
        'en-US': 'Version Number',
    },
    '作者': {
        'en-US': 'Author',
    },
    '您的名称': {
        'zh-TW': '您的名稱',
        'en-US': 'Your Name',
    },
    '作者邮箱': {
        'en-US': 'Author Email',
    },
    '分类': {
        'en-US': 'Category',
    },
    '例如: 音乐标签': {
        'zh-TW': '例如: 音樂標籤',
        'en-US': 'Example: Music Tags',
    },
    '插件配置项': {
        'zh-TW': '插件設定项',
        'en-US': 'Plugin Configuration Items',
    },
    '定义插件运行时需要的配置参数': {
        'zh-TW': '定义插件运行时需要的設定參數',
        'en-US': 'Define runtime configuration parameters for the plugin',
    },
    '删除': {
        'zh-TW': '刪除',
        'en-US': 'Delete',
    },
    '配置名称 *': {
        'zh-TW': '設定名稱 *',
        'en-US': 'Config Name *',
    },
    '例如: api_key': {
        'en-US': 'Example: api_key',
    },
    '例如: API密钥': {
        'en-US': 'Example: API Key',
    },
    '类型 *': {
        'en-US': 'Type *',
    },
    '描述': {
        'en-US': 'Description',
    },
    '配置项的说明...': {
        'zh-TW': '設定项的說明...',
        'en-US': 'Configuration item description...',
    },
    '默认值': {
        'zh-TW': '預設值',
        'en-US': 'Default Value',
    },
    '是': {
        'en-US': 'Yes',
    },
    '否': {
        'en-US': 'No',
    },
    '选择选项': {
        'zh-TW': '選擇选项',
        'en-US': 'Select Option',
    },
    '添加选项': {
        'zh-TW': '添加選项',
        'en-US': 'Add Option',
    },
    '最小值': {
        'en-US': 'Minimum',
    },
    '最大值': {
        'en-US': 'Maximum',
    },
    '插件代码预览': {
        'zh-TW': '插件代码預覽',
        'en-US': 'Plugin Code Preview',
    },
    '代码验证结果': {
        'zh-TW': '代码驗證结果',
        'en-US': 'Code Validation Result',
    },
    '错误：': {
        'en-US': 'Error:',
    },
    '警告：': {
        'en-US': 'Warning:',
    },
    '实现示例': {
        'zh-TW': '实現示例',
        'en-US': 'Implementation Example',
    },
    '插件信息': {
        'en-US': 'Plugin Info',
    },
    '版本': {
        'en-US': 'Version',
    },
    '标识': {
        'zh-TW': '標识',
        'en-US': 'Identifier',
    },
    '匹配超时时间': {
        'zh-TW': '匹配超时時間',
        'en-US': 'Match Timeout',
    },
    '秒': {
        'en-US': 'sec',
    },
    '重试次数': {
        'zh-TW': '重試次數',
        'en-US': 'Retry Count',
    },
    '缓存结果': {
        'zh-TW': '缓存需果',
        'en-US': 'Cache Results',
    },
    '批量操作模式': {
        'en-US': 'Batch Operation Mode',
    },
    '最大并发数': {
        'zh-TW': '最大并發數',
        'en-US': 'Max Concurrency',
    },
    '自动备份': {
        'zh-TW': '自動置份',
        'en-US': 'Auto Backup',
    },
    '自定义配置': {
        'zh-TW': '自定义設定',
        'en-US': 'Custom Configuration',
    },
    '加载插件列表中...': {
        'zh-TW': '加載插件列表中...',
        'en-US': 'Loading plugin list...',
    },
    '测试插件中...': {
        'zh-TW': '測試插件中...',
        'en-US': 'Testing plugin...',
    },
    '插件测试成功': {
        'zh-TW': '插件測試成功',
        'en-US': 'Plugin test succeeded',
    },
    '插件测试失败': {
        'zh-TW': '插件測試失敗',
        'en-US': 'Plugin test failed',
    },
    '保存失败': {
        'zh-TW': '保存失敗',
        'en-US': 'Save failed',
    },
    '创建成功': {
        'zh-TW': '建立成功',
        'en-US': 'Create succeeded',
    },
    '暂无版本历史': {
        'zh-TW': '暫無版本历史',
        'en-US': 'No version history',
    },
    '版本:': {
        'en-US': 'Version:',
    },
    '类型:': {
        'en-US': 'Type:',
    },
    '时间:': {
        'zh-TW': '時間:',
        'en-US': 'Time:',
    },
    '用户:': {
        'en-US': 'User:',
    },
    '(上一版本)': {
        'en-US': '(Previous Version)',
    },
    '回退到对比版本': {
        'zh-TW': '傳退到對比版本',
        'en-US': 'Roll back to compared version',
    },
    '新增字段': {
        'en-US': 'New Field',
    },
    '修改字段': {
        'en-US': 'Modified Field',
    },
    '删除字段': {
        'zh-TW': '刪除字段',
        'en-US': 'Deleted Field',
    },
    '已修改': {
        'en-US': 'Modified',
    },
    '旧值': {
        'en-US': 'Old Value',
    },
    '旧封面': {
        'en-US': 'Old Cover',
    },
    '新值': {
        'en-US': 'New Value',
    },
    '新封面': {
        'en-US': 'New Cover',
    },
    '该版本与对比版本无差异': {
        'zh-TW': '该版本与对比版本無差异',
        'en-US': 'No differences between this version and the compared version',
    },
    '版本回退成功': {
        'zh-TW': '版本傳退成功',
        'en-US': 'Version rollback succeeded',
    },
    '版本回退失败': {
        'zh-TW': '版本回退失敗',
        'en-US': 'Version rollback failed',
    },
    '版本详情对比': {
        'zh-TW': '版本详情對比',
        'en-US': 'Version Detail Comparison',
    },
    '批量处理': {
        'en-US': 'Batch Processing',
    },
    '元数据详情x': {
        'zh-TW': '元數据详情x',
        'en-US': 'Metadata Details',
    },
    '修改失败！': {
        'zh-TW': '修改失敗！',
        'en-US': 'Update failed',
    },
    '未找到歌词！': {
        'zh-TW': '未找到歌詞！',
        'en-US': 'Lyrics not found',
    },
    '查询失败': {
        'zh-TW': '查询失敗',
        'en-US': 'Query failed',
    },
    '加载失败': {
        'zh-TW': '加载失敗',
        'en-US': 'Loading failed',
    },
    '标题不能为空！': {
        'zh-TW': '標題不能为空！',
        'en-US': 'Title cannot be empty',
    },
    '歌词不能为空！': {
        'zh-TW': '歌詞不能为空！',
        'en-US': 'Lyrics cannot be empty',
    },
    '请输入文件夹路径：': {
        'zh-TW': '请輸入文件夹路径：',
        'en-US': 'Please enter folder path:',
    },
    '搜索文件、文件夹或使用过滤条件...': {
        'zh-TW': '搜索文件、文件夹或使用过滤條件...',
        'en-US': 'Search files, folders, or use filters...',
    },
    '按条件过滤文件': {
        'zh-TW': '按條件过滤文件',
        'en-US': 'Filter files by conditions',
    },
    '已选择 {count} 项': {
        'zh-TW': '已選擇 {count} 項',
        'en-US': '{count} selected',
    },
    '文件夹 {count}': {
        'zh-TW': '資料夾 {count}',
        'en-US': '{count} folders',
    },
    '文件 {count}': {
        'zh-TW': '檔案 {count}',
        'en-US': '{count} files',
    },
    '跳转到指定路径': {
        'zh-TW': '跳轉到指定路径',
        'en-US': 'Go to Path',
    },
    '尝试使用不同的关键词或过滤条件': {
        'zh-TW': '尝试使用不同的关键词或过滤條件',
        'en-US': 'Try different keywords or filter conditions',
    },
    '名称': {
        'zh-TW': '名稱',
        'en-US': 'Name',
    },
    '修改时间': {
        'zh-TW': '修改時間',
        'en-US': 'Modified Time',
    },
    '大小': {
        'en-US': 'Size',
    },
    '目录': {
        'zh-TW': '目錄',
        'en-US': 'Directory',
    },
    '图片预览': {
        'zh-TW': '图片預覽',
        'en-US': 'Image Preview',
    },
    '图片加载失败': {
        'zh-TW': '图片加载失敗',
        'en-US': 'Image loading failed',
    },
    '查询失败！': {
        'zh-TW': '查询失敗！',
        'en-US': 'Query failed',
    },
    '标记成功！': {
        'zh-TW': '標記成功！',
        'en-US': 'Mark succeeded',
    },
    '无法加载图片': {
        'zh-TW': '無法加载图片',
        'en-US': 'Unable to load image',
    },
    '元数据详情': {
        'zh-TW': '元數据详情',
        'en-US': 'Metadata Details',
    },
    '元数据版本历史': {
        'zh-TW': '元數据版本历史',
        'en-US': 'Metadata Version History',
    },
    '歌词时间轴编辑器': {
        'zh-TW': '歌詞時間轴编辑器',
        'en-US': 'Lyrics Timeline Editor',
    },
    '歌词文本': {
        'zh-TW': '歌詞文本',
        'en-US': 'Lyrics Text',
    },
    '清空': {
        'en-US': 'Clear',
    },
    '请输入歌词文本，每行一句歌词...&#10;支持LRC格式: [00:12.34]歌词内容': {
        'zh-TW': '请輸入歌詞文本，每行一句歌詞...&#10;支持LRC格式: [00:12.34]歌詞内容',
        'en-US': 'Please enter lyrics text, one line per lyric...&#10;LRC format is supported: [00:12.34]lyric content',
    },
    '播放/暂停 |': {
        'zh-TW': '播放/暫停 |',
        'en-US': 'Play/Pause |',
    },
    '为当前行打轴 |': {
        'zh-TW': '为目前行打轴 |',
        'en-US': 'Set timing for current line |',
    },
    '切换歌词行': {
        'zh-TW': '切换歌詞行',
        'en-US': 'Switch Lyric Line',
    },
    '时间轴编辑': {
        'zh-TW': '時間轴编辑',
        'en-US': 'Timeline Editing',
    },
    '平均分配时间': {
        'zh-TW': '平均分配時間',
        'en-US': 'Distribute Time Evenly',
    },
    '重置时轴': {
        'zh-TW': '重定時轴',
        'en-US': 'Reset timeline',
    },
    '手动输入时间 (支持 mm:ss 或秒数格式)': {
        'zh-TW': '手动輸入時間 (支持 mm:ss 或秒数格式)',
        'en-US': 'Manually enter time (supports mm:ss or seconds)',
    },
    '设置当前时间': {
        'zh-TW': '設定目前時間',
        'en-US': 'Set Current Time',
    },
    '清除时间': {
        'zh-TW': '清除時間',
        'en-US': 'Clear Time',
    },
    '💡 支持手动编辑时间：mm:ss 格式 (如 1:23) 或秒数 (如 83)': {
        'zh-TW': '💡 支持手动编辑時間：mm:ss 格式 (如 1:23) 或秒数 (如 83)',
        'en-US': '💡 Supports manual time editing: mm:ss format (e.g. 1:23) or seconds (e.g. 83)',
    },
    '📌 在时间框中按': {
        'zh-TW': '📌 在時間框中按',
        'en-US': '📌 In the time input, press',
    },
    '自动跳到下一行，': {
        'zh-TW': '自動跳到下一行，',
        'en-US': 'to automatically jump to the next line,',
    },
    '取消编辑': {
        'zh-TW': '取消编輯',
        'en-US': 'Cancel Editing',
    },
    '暂无信息': {
        'zh-TW': '暫無信息',
        'en-US': 'No information',
    },
    '每页:': {
        'zh-TW': '每頁:',
        'en-US': 'Per page:',
    },
    '封面': {
        'en-US': 'Cover',
    },
    '默认': {
        'zh-TW': '預設',
        'en-US': 'Default',
    },
    '沉浸': {
        'zh-TW': '沉浸',
        'en-US': 'Immersive',
    },
    '歌词显示样式': {
        'zh-TW': '歌詞顯示樣式',
        'en-US': 'Lyric display style',
    },
    '标题': {
        'zh-TW': '標題',
        'en-US': 'Title',
    },
    '文件名': {
        'en-US': 'File Name',
    },
    '歌词': {
        'zh-TW': '歌詞',
        'en-US': 'Lyrics',
    },
    '音轨号': {
        'zh-TW': '音轨號',
        'en-US': 'Track No.',
    },
    'CD号': {
        'zh-TW': 'CD號',
        'en-US': 'CD No.',
    },
    '年份': {
        'en-US': 'Year',
    },
    '专辑艺术家': {
        'zh-TW': '專輯藝術家',
        'en-US': 'Album Artist',
    },
    '专辑类型': {
        'zh-TW': '專輯类型',
        'en-US': 'Album Type',
    },
    '简介': {
        'en-US': 'Summary',
    },
    '总音轨数': {
        'zh-TW': '总音轨數',
        'en-US': 'Total Tracks',
    },
    '总CD数': {
        'zh-TW': '总CD數',
        'en-US': 'Total CDs',
    },
    '时长': {
        'zh-TW': '時长',
        'en-US': 'Duration',
    },
    '文件大小': {
        'en-US': 'File Size',
    },
    '声道': {
        'en-US': 'Channels',
    },
    '位深': {
        'en-US': 'Bit Depth',
    },
    '语言': {
        'en-US': 'Language',
    },
    '作曲家': {
        'en-US': 'Composer',
    },
    '作词家': {
        'zh-TW': '作詞家',
        'en-US': 'Lyricist',
    },
    '有': {
        'en-US': 'Yes',
    },
    '无': {
        'zh-TW': '無',
        'en-US': 'No',
    },
    '正在加载...': {
        'zh-TW': '正在加載...',
        'en-US': 'Loading...',
    },
    '已加载全部数据': {
        'zh-TW': '已加載全部數据',
        'en-US': 'All data loaded',
    },
    '正在加载原始封面...': {
        'zh-TW': '正在加載原始封面...',
        'en-US': 'Loading original cover...',
    },
    '封面预览': {
        'zh-TW': '封面預覽',
        'en-US': 'Cover Preview',
    },
    '版本历史': {
        'en-US': 'Version History',
    },
    '刮削配置': {
        'zh-TW': '刮削設定',
        'en-US': 'Scraping Configuration',
    },
    '副标题': {
        'zh-TW': '副標題',
        'en-US': 'Subtitle',
    },
    '日期': {
        'en-US': 'Date',
    },
    'AI识别风格': {
        'zh-TW': 'AI识别風格',
        'en-US': 'AI Style Recognition',
    },
    '标签': {
        'zh-TW': '標籤',
        'en-US': 'Tags',
    },
    '厂牌': {
        'zh-TW': '廠牌',
        'en-US': 'Label',
    },
    '编辑：': {
        'zh-TW': '编輯：',
        'en-US': 'Edit:',
    },
    '裁剪时间标记': {
        'zh-TW': '裁剪時間标记',
        'en-US': 'Trim Time Markers',
    },
    '格式化时间': {
        'zh-TW': '格式化時間',
        'en-US': 'Normalize Time Format',
    },
    '格式化歌词时间': {
        'zh-TW': '格式化歌詞時間',
        'en-US': 'Normalize Lyric Timestamps',
    },
    '将歌词时间标签中的三位小数统一截断为两位': {
        'zh-TW': '將歌詞時間標籤中的三位小數統一截斷為兩位',
        'en-US': 'Truncate three-digit lyric timestamp fractions to two digits',
    },
    '提取作曲作词': {
        'zh-TW': '提取作曲作詞',
        'en-US': 'Extract composer/lyricist',
    },
    '翻译：': {
        'en-US': 'Translation:',
    },
    'AI翻译歌词': {
        'zh-TW': 'AI翻译歌詞',
        'en-US': 'AI Translate Lyrics',
    },
    '机器翻译': {
        'en-US': 'Machine Translation',
    },
    '时间轴：': {
        'zh-TW': '時間轴：',
        'en-US': 'Timeline:',
    },
    '时间轴编辑器': {
        'zh-TW': '時間轴编辑器',
        'en-US': 'Timeline Editor',
    },
    '时间+0.1秒': {
        'zh-TW': '時間+0.1秒',
        'en-US': 'Time +0.1s',
    },
    '时间-0.1秒': {
        'zh-TW': '時間-0.1秒',
        'en-US': 'Time -0.1s',
    },
    '请填入歌词': {
        'zh-TW': '请填入歌詞',
        'en-US': 'Please enter lyrics',
    },
    '导出 lrc': {
        'zh-TW': '匯出 lrc',
        'en-US': 'Export lrc',
    },
    '将元数据中的歌词导出为 .lrc 文件': {
        'zh-TW': '将元数据中的歌詞匯出为 .lrc 文件',
        'en-US': 'Export lyrics from metadata to a .lrc file',
    },
    '导入 lrc': {
        'zh-TW': '匯入 lrc',
        'en-US': 'Import lrc',
    },
    '将 .lrc 文件导入元数据中': {
        'zh-TW': '将 .lrc 文件匯入元数据中',
        'en-US': 'Import .lrc files into metadata',
    },
    '歌词文件': {
        'zh-TW': '歌詞文件',
        'en-US': 'Lyric File',
    },
    '同名的LRC歌词文件': {
        'zh-TW': '同名的LRC歌詞文件',
        'en-US': 'LRC file with the same name',
    },
    '请填入简介': {
        'zh-TW': '請填入简介',
        'en-US': 'Please enter a summary',
    },
    '请填入描述': {
        'zh-TW': '請填入描述',
        'en-US': 'Please enter a description',
    },
    '专辑封面': {
        'zh-TW': '專輯封面',
        'en-US': 'Album Cover',
    },
    '替换图片': {
        'zh-TW': '替換图片',
        'en-US': 'Replace Image',
    },
    '点击上传或拖拽图片到此处': {
        'zh-TW': '点击上傳或拖拽图片到此处',
        'en-US': 'Click to upload or drag image here',
    },
    '支持 JPG, PNG, GIF (最大 5MB)': {
        'en-US': 'Supports JPG, PNG, GIF (max 5MB)',
    },
    '上传中...': {
        'zh-TW': '上傳中...',
        'en-US': 'Uploading...',
    },
    '选择专辑封面': {
        'zh-TW': '選擇專輯封面',
        'en-US': 'Select Album Cover',
    },
    '导出图片': {
        'zh-TW': '匯出图片',
        'en-US': 'Export Image',
    },
    '将专辑封面导出为单独图片文件': {
        'zh-TW': '将專輯封面匯出为单独图片文件',
        'en-US': 'Export album cover as a standalone image file',
    },
    '导入图片': {
        'zh-TW': '匯入图片',
        'en-US': 'Import Image',
    },
    '从同目录图片文件导入封面': {
        'zh-TW': '从同目錄图片文件匯入封面',
        'en-US': 'Import cover from an image file in the same directory',
    },
    '试听': {
        'zh-TW': '試听',
        'en-US': 'Preview',
    },
    '光盘编号': {
        'zh-TW': '光盘编號',
        'en-US': 'Disc Number',
    },
    '总光盘数': {
        'zh-TW': '总光盘數',
        'en-US': 'Total Discs',
    },
    '位深度': {
        'en-US': 'Bit Depth',
    },
    '声道数': {
        'zh-TW': '声道數',
        'en-US': 'Channel Count',
    },
    '曲目增益': {
        'en-US': 'Track Gain',
    },
    '曲目峰值': {
        'en-US': 'Track Peak',
    },
    '专辑增益': {
        'zh-TW': '專輯增益',
        'en-US': 'Album Gain',
    },
    '专辑峰值': {
        'zh-TW': '專輯峰值',
        'en-US': 'Album Peak',
    },
    '元数据版本': {
        'zh-TW': '元數据版本',
        'en-US': 'Metadata Version',
    },
    '分类信息': {
        'en-US': 'Category Information',
    },
    '歌词信息': {
        'zh-TW': '歌詞信息',
        'en-US': 'Lyric Information',
    },
    '媒体信息': {
        'en-US': 'Media Information',
    },
    '元数据信息': {
        'zh-TW': '元數据信息',
        'en-US': 'Metadata Information',
    },
    '技术信息': {
        'zh-TW': '技術信息',
        'en-US': 'Technical Information',
    },
    '音频增益': {
        'en-US': 'Audio Gain',
    },
    '修改成功！': {
        'en-US': 'Update succeeded',
    },
    'AI识别成功！': {
        'en-US': 'AI recognition succeeded',
    },
    'AI识别失败！': {
        'zh-TW': 'AI识别失敗！',
        'en-US': 'AI recognition failed',
    },
    'AI翻译成功！': {
        'en-US': 'AI translation succeeded',
    },
    'AI翻译失败！': {
        'zh-TW': 'AI翻译失敗！',
        'en-US': 'AI translation failed',
    },
    '无法查看版本历史': {
        'zh-TW': '無法查看版本历史',
        'en-US': 'Unable to view version history',
    },
    '当前没有选中的音轨': {
        'zh-TW': '目前没有选中的音轨',
        'en-US': 'No track selected currently',
    },
    '请选择 .lrc 格式的歌词文件': {
        'zh-TW': '请選擇 .lrc 格式的歌詞文件',
        'en-US': 'Please select a .lrc lyrics file',
    },
    '歌词文件大小不能超过1MB': {
        'zh-TW': '歌詞文件大小不能超过1MB',
        'en-US': 'Lyric file size must not exceed 1MB',
    },
    '歌词文件加载成功': {
        'zh-TW': '歌詞文件加载成功',
        'en-US': 'Lyrics file loaded',
    },
    '读取文件失败': {
        'zh-TW': '读取文件失敗',
        'en-US': 'Failed to read file',
    },
    '无法读取歌词文件内容': {
        'zh-TW': '無法读取歌詞文件内容',
        'en-US': 'Unable to read lyrics file content',
    },
    '搜索失败': {
        'zh-TW': '搜索失敗',
        'en-US': 'Search failed',
    },
    '请先填写歌曲标题和艺术家': {
        'zh-TW': '请先填写歌曲標題和藝術家',
        'en-US': 'Please enter song title and artist first',
    },
    '搜索成功': {
        'en-US': 'Search succeeded',
    },
    '网络错误或服务不可用': {
        'zh-TW': '網路错误或服务不可用',
        'en-US': 'Network error or service unavailable',
    },
    '翻译失败': {
        'zh-TW': '翻译失敗',
        'en-US': 'Translation failed',
    },
    '请先填写歌词内容': {
        'zh-TW': '请先填写歌詞内容',
        'en-US': 'Please enter lyrics content first',
    },
    'AI翻译成功': {
        'en-US': 'AI translation succeeded',
    },
    'AI翻译失败': {
        'zh-TW': 'AI翻译失敗',
        'en-US': 'AI translation failed',
    },
    '请输入搜索关键词': {
        'zh-TW': '请輸入搜索关键词',
        'en-US': 'Please enter search keywords',
    },
    '未找到相关图片': {
        'zh-TW': '未找到相關图片',
        'en-US': 'No related images found',
    },
    '封面已选择': {
        'zh-TW': '封面已選擇',
        'en-US': 'Cover selected',
    },
    '标签源：': {
        'zh-TW': '標籤源：',
        'en-US': 'Tag Source:',
    },
    '加载中...': {
        'zh-TW': '加載中...',
        'en-US': 'Loading...',
    },
    '暂无歌曲信息': {
        'zh-TW': '暫無歌曲信息',
        'en-US': 'No song information',
    },
    '音乐下载': {
        'zh-TW': '音樂下載',
        'en-US': 'Music Download',
    },
    '下载任务已创建': {
        'zh-TW': '下載任務已建立',
        'en-US': 'Download task created',
    },
    '音乐正在后台下载中': {
        'zh-TW': '音樂正在後台下載中',
        'en-US': 'Music is downloading in the background',
    },
    '下载失败': {
        'zh-TW': '下載失敗',
        'en-US': 'Download failed',
    },
    '创建下载任务失败': {
        'zh-TW': '建立下載任務失敗',
        'en-US': 'Failed to create download task',
    },
    '搜索音乐': {
        'zh-TW': '搜索音樂',
        'en-US': 'Search Music',
    },
    '正在播放': {
        'zh-TW': '正在播放',
        'en-US': 'Now Playing',
    },
    '播放列表': {
        'zh-TW': '播放列表',
        'en-US': 'Playlists',
    },
    '全部歌曲': {
        'en-US': 'All Songs',
    },
    '歌曲大小': {
        'en-US': 'Song Size',
    },
    '刮削完整度': {
        'en-US': 'Scraping Completeness',
    },
    '全部专辑': {
        'zh-TW': '全部專輯',
        'en-US': 'All Albums',
    },
    '全部艺术家': {
        'zh-TW': '全部藝術家',
        'en-US': 'All Artists',
    },
    '歌曲时长': {
        'zh-TW': '歌曲時长',
        'en-US': 'Song Duration',
    },
    '欢迎回来，{name}': {
        default: '欢迎回来，{name}',
        'zh-TW': '歡迎回來，{name}',
        'en-US': 'Welcome back, {name}',
    },
    '{count}张专辑': {
        default: '{count}张专辑',
        'zh-TW': '{count}張專輯',
        'en-US': '{count} albums',
    },
    '{count}次': {
        default: '{count}次',
        'zh-TW': '{count}次',
        'en-US': '{count} plays',
    },
    '{percent}% 较上月变化': {
        default: '{percent}% 较上月变化',
        'zh-TW': '{percent}% 較上月變化',
        'en-US': '{percent}% vs last month',
    },
    '剩余 {count} 个任务': {
        default: '剩余 {count} 个任务',
        'zh-TW': '剩餘 {count} 個任務',
        'en-US': '{count} tasks remaining',
    },
    '总时长 {seconds}s': {
        default: '总时长 {seconds}s',
        'zh-TW': '總時長 {seconds}s',
        'en-US': 'Total elapsed time {seconds}s',
    },
    '音乐月度趋势': {
        'zh-TW': '音樂月度趨勢',
        'en-US': 'Monthly Music Trends',
    },
    'index.welcome.1': {
        default: '我将刮削标签的过程视为与我的音乐藏品共度的美好时光，而不仅仅是一项单调乏味的任务。',
        'zh-TW': '我將刮削標籤的過程視為與我的音樂藏品共度的美好時光，而不僅僅是一項單調乏味的任務。',
        'en-US': 'I treat tag scraping as quality time with my music collection, not just a dull chore.',
    },
    'index.welcome.2': {
        default: '每一次指尖抚过标签的刮削，都像是与音乐藏品展开一场温柔对话, 这不再是机械重复的劳作，而是我与旋律记忆的重逢时刻。',
        'zh-TW': '每一次指尖拂過標籤的刮削，都像是與音樂藏品展開一場溫柔對話，這不再是機械重複的勞作，而是我與旋律記憶的重逢時刻。',
        'en-US': 'Each scrape under my fingertips feels like a gentle conversation with my collection. It is no longer repetitive work, but a reunion with melodic memories.',
    },
    'index.welcome.3': {
        default: '那些被岁月封存的音符、情感与故事，在轻缓的动作中悄然苏醒, 让时光也变得缱绻悠长。',
        'zh-TW': '那些被歲月封存的音符、情感與故事，在輕緩的動作中悄然甦醒，讓時光也變得繾綣悠長。',
        'en-US': 'Notes, emotions, and stories sealed by time quietly awaken in each gentle motion, making time feel softer and longer.',
    },
    'index.welcome.4': {
        default: '刮刀游走在标签边缘的沙沙声，恰似音乐藏品轻声呢喃，将尘封的韵律与故事娓娓道来，让枯燥的工作化作一场跨越时空的音乐漫游。',
        'zh-TW': '刮刀遊走在標籤邊緣的沙沙聲，恰似音樂藏品輕聲呢喃，將塵封的韻律與故事娓娓道來，讓枯燥的工作化作一場跨越時空的音樂漫遊。',
        'en-US': 'The soft rustle of the scraper along the label edge sounds like my collection whispering old rhythms and stories, turning routine work into a journey across time.',
    },
    'index.welcome.5': {
        default: '刮削标签时，指尖触碰的不只是纸张与胶水，更是每一段旋律的脉搏。那些被收纳的乐章，在细微的动作里重新鲜活，编织成独属于我的音乐时光诗篇。',
        'zh-TW': '刮削標籤時，指尖觸碰的不只是紙張與膠水，更是每一段旋律的脈搏。那些被收納的樂章，在細微的動作裡重新鮮活，編織成獨屬於我的音樂時光詩篇。',
        'en-US': 'When scraping labels, my fingertips touch not only paper and glue, but also the pulse of every melody. Stored movements come alive again in subtle motions, weaving a personal poem of musical time.',
    },
    'index.welcome.6': {
        default: '在音乐的海洋中，我与标签的邂逅，是一场关于旋律、情感与时光的浪漫之旅。每一次刮削，都是对音乐记忆的深情致敬，让时间也变得温柔起来。',
        'zh-TW': '在音樂的海洋中，我與標籤的邂逅，是一場關於旋律、情感與時光的浪漫之旅。每一次刮削，都是對音樂記憶的深情致敬，讓時間也變得溫柔起來。',
        'en-US': 'In the ocean of music, each encounter with a label becomes a romantic journey through melody, emotion, and time. Every scrape is a heartfelt tribute to musical memory, making time gentler.',
    },
    'index.welcome.7': {
        default: '多年后摩挲着泛黄的收藏册，那时以为寻常的整理时光，竟成了串起毕生音乐热爱的金线，每一次标签剥落都在未来的记忆里绽放成永不褪色的音符。',
        'zh-TW': '多年後摩挲著泛黃的收藏冊，那時以為尋常的整理時光，竟成了串起畢生音樂熱愛的金線，每一次標籤剝落都在未來的記憶裡綻放成永不褪色的音符。',
        'en-US': 'Years later, touching a yellowed collection book, I realize those ordinary moments of organizing became the golden thread of a lifelong love for music; every peeled label blooms into notes that never fade.',
    },
    '正在播放:': {
        'zh-TW': '正在播放：',
        'en-US': 'Now Playing:',
    },
    '排行榜': {
        'en-US': 'Ranking',
    },
    '更多': {
        'en-US': 'More',
    },
    '暂无歌曲': {
        'zh-TW': '暫無歌曲',
        'en-US': 'No songs',
    },
    '请从操作台-导入收藏中添加音乐吧！': {
        'zh-TW': '请从操作台-匯入收藏中添加音樂吧！',
        'en-US': 'Please add music from Workspace - Import to Music Library.',
    },
    '缺失歌词': {
        'zh-TW': '缺失歌詞',
        'en-US': 'Missing Lyrics',
    },
    '元数据中缺少歌词信息': {
        'zh-TW': '元数据中缺少歌詞信息',
        'en-US': 'Lyrics information is missing in metadata',
    },
    '缺失封面': {
        'en-US': 'Missing Cover',
    },
    '元数据中缺少封面信息': {
        'zh-TW': '元數据中缺少封面信息',
        'en-US': 'Cover information is missing in metadata',
    },
    '缺失专辑': {
        'zh-TW': '缺失專輯',
        'en-US': 'Missing Album',
    },
    '元数据中缺少专辑信息': {
        'zh-TW': '元数据中缺少專輯信息',
        'en-US': 'Album information is missing in metadata',
    },
    '缺失艺术家': {
        'zh-TW': '缺失藝術家',
        'en-US': 'Missing Artist',
    },
    '元数据中缺少艺术家信息': {
        'zh-TW': '元数据中缺少藝術家信息',
        'en-US': 'Artist information is missing in metadata',
    },
    '缺失流派': {
        'en-US': 'Missing Genres',
    },
    '元数据中缺少流派信息': {
        'zh-TW': '元數据中缺少流派信息',
        'en-US': 'Metadata is missing genre information',
    },
    '缺失年份': {
        'en-US': 'Missing Year',
    },
    '元数据中缺少年份信息': {
        'zh-TW': '元數据中缺少年份信息',
        'en-US': 'Year information is missing in metadata',
    },
    '10条/页': {
        'zh-TW': '10條/页',
        'en-US': '10/page',
    },
    '20条/页': {
        'zh-TW': '20條/页',
        'en-US': '20/page',
    },
    '50条/页': {
        'zh-TW': '50條/页',
        'en-US': '50/page',
    },
    '规则刮削': {
        'en-US': 'Rule-based Scraping',
    },
    '保存': {
        'en-US': 'Save',
    },
    '标签源选择:': {
        'zh-TW': '標籤源選擇:',
        'en-US': 'Tag Source Selection:',
    },
    '修改范围:': {
        'en-US': 'Modification Scope:',
    },
    '跳过匹配:': {
        'zh-TW': '跳过匹設:',
        'en-US': 'Skip Matching:',
    },
    '同目录解释为同一个专辑:': {
        'zh-TW': '同目錄解释为同一个專輯:',
        'en-US': '"Same directory" means the same album:',
    },
    '流派规则配置': {
        'zh-TW': '流派规则設定',
        'en-US': 'Genre Rule Configuration',
    },
    '艺术家流派规则': {
        'zh-TW': '藝術家流派规则',
        'en-US': 'Artist Genre Rules',
    },
    '使用专辑主流派': {
        'zh-TW': '使用專輯主流派',
        'en-US': 'Use album primary genre',
    },
    '同专辑中最多的流派将赋值给缺失歌曲': {
        'zh-TW': '同專輯中最多的流派将赋值给缺失歌曲',
        'en-US': 'Assign the most common genre in the same album to tracks with missing genre',
    },
    '使用AI识别流派': {
        'en-US': 'Use AI for genre recognition',
    },
    'AI识别流派，根据歌曲内容，给出音乐风格': {
        'zh-TW': 'AI识别流派，根据歌曲内容，给出音樂風格',
        'en-US': 'AI genre recognition: infer music style based on song content',
    },
    'AI识别流派': {
        'en-US': 'AI Genre Recognition',
    },
    'AI补充音乐风格，根据歌曲内容，给出音乐风格': {
        'zh-TW': 'AI补充音樂風格，根据歌曲内容，给出音樂風格',
        'en-US': 'AI enriches music style based on song content',
    },
    '音乐播放': {
        'zh-TW': '音樂播放',
        'en-US': 'Music Playback',
    },
    '最佳音乐': {
        'zh-TW': '最佳音樂',
        'en-US': 'Top Music',
    },
    '最佳艺术家': {
        'zh-TW': '最佳藝術家',
        'en-US': 'Top Artist',
    },
    '最佳新艺术家': {
        'zh-TW': '最佳新藝術家',
        'en-US': 'Best New Artist',
    },
    '最佳专辑': {
        'zh-TW': '最佳專輯',
        'en-US': 'Top Album',
    },
    '最佳新专辑': {
        'zh-TW': '最佳新專輯',
        'en-US': 'Best New Album',
    },
    '单曲': {
        'en-US': 'Singles',
    },
    '最佳单曲': {
        'en-US': 'Top Singles',
    },
    '最佳新单曲': {
        'en-US': 'Best New Singles',
    },
    '榜单': {
        'en-US': 'Charts',
    },
    '最热风格': {
        'zh-TW': '最热風格',
        'en-US': 'Hottest Genres',
    },
    '音乐年代': {
        'zh-TW': '音樂年代',
        'en-US': 'Music Eras',
    },
    '平台分布': {
        'en-US': 'Platform Distribution',
    },
    '收听时钟': {
        'zh-TW': '收听時鐘',
        'en-US': 'Listening Clock',
    },
    '快速事实': {
        'en-US': 'Quick Facts',
    },
    '收听时间': {
        'zh-TW': '收听時間',
        'en-US': 'Listening Time',
    },
    '平均记录': {
        'zh-TW': '平均記錄',
        'en-US': 'Average Records',
    },
    '最活跃一天': {
        'zh-TW': '最用跃一天',
        'en-US': 'Most Active Day',
    },
    'record.period.lastWeek': {
        default: '上周',
        'zh-TW': '上週',
        'en-US': 'last week',
    },
    'record.period.lastMonth': {
        default: '上月',
        'zh-TW': '上月',
        'en-US': 'last month',
    },
    'record.period.lastYear': {
        default: '去年',
        'zh-TW': '去年',
        'en-US': 'last year',
    },
    'record.countTimes': {
        default: '{count}次记录',
        'zh-TW': '{count}次記錄',
        'en-US': '{count} records',
    },
    'record.hours': {
        default: '{count}小时',
        'zh-TW': '{count}小時',
        'en-US': '{count}h',
    },
    'record.listenCount': {
        default: '收听次数: {count}',
        'zh-TW': '收聽次數: {count}',
        'en-US': 'Listen count: {count}',
    },
    '编辑专辑信息': {
        'zh-TW': '编辑專輯信息',
        'en-US': 'Edit Album Info',
    },
    '专辑:': {
        'zh-TW': '專輯:',
        'en-US': 'Album:',
    },
    '专辑封面:': {
        'zh-TW': '專輯封面:',
        'en-US': 'Album Cover:',
    },
    '描述:': {
        'en-US': 'Description:',
    },
    '保存并更新音乐元数据': {
        'zh-TW': '保存并更新音樂元数据',
        'en-US': 'Save and Update Music Metadata',
    },
    '删除专辑': {
        'zh-TW': '刪除專輯',
        'en-US': 'Delete Album',
    },
    '从音乐收藏中删除此专辑，但不会删除源文件。': {
        'zh-TW': '从音樂收藏中刪除此專輯，但不会刪除源文件。',
        'en-US': 'Remove this album from Music Library, but do not delete source files.',
    },
    '删除音乐: 将专辑从音乐收藏中移除，同时删除专辑内的音乐文件。': {
        'zh-TW': '刪除音樂: 将專輯从音樂收藏中移除，同时刪除專輯内的音樂文件。',
        'en-US': 'Delete Music: remove the album from Music Library and delete its music files.',
    },
    '删除收藏: 将专辑从音乐收藏中移除，但并不会删除音乐文件。': {
        'zh-TW': '刪除收藏: 将專輯从音樂收藏中移除，但并不会刪除音樂文件。',
        'en-US': 'Remove from Favorites: remove the album from Music Library without deleting music files.',
    },
    '删除成功！': {
        'zh-TW': '刪除成功！',
        'en-US': 'Delete succeeded',
    },
    '删除失败！': {
        'zh-TW': '刪除失敗！',
        'en-US': 'Delete failed',
    },
    '流派': {
        'en-US': 'Genre',
    },
    '歌曲数': {
        'zh-TW': '歌曲數',
        'en-US': 'Number of Songs',
    },
    '收藏': {
        'en-US': 'Favorites',
    },
    '添加时间': {
        'zh-TW': '添加時間',
        'en-US': 'Added Time',
    },
    '收藏时间': {
        'zh-TW': '收藏時間',
        'en-US': 'Favorited Time',
    },
    '立即播放': {
        'en-US': 'Play Now',
    },
    '下一首播放': {
        'en-US': 'Play Next',
    },
    '添加到队列': {
        'en-US': 'Add to Queue',
    },
    '暂无专辑': {
        'zh-TW': '暫無專輯',
        'en-US': 'No albums',
    },
    '还没有找到任何专辑，请稍后再试': {
        'zh-TW': '还没有找到任何專輯，请稍后再试',
        'en-US': 'No albums found yet. Please try again later.',
    },
    '自定义过滤规则': {
        'en-US': 'Custom Filter Rules',
    },
    '排序方式': {
        'en-US': 'Sort Mode',
    },
    '专辑名称': {
        'zh-TW': '專輯名稱',
        'en-US': 'Album Name',
    },
    '歌手名称': {
        'zh-TW': '歌手名稱',
        'en-US': 'Artist Name',
    },
    '发行年份': {
        'zh-TW': '發行年份',
        'en-US': 'Release Year',
    },
    '播放次数': {
        'zh-TW': '播放次數',
        'en-US': 'Play Count',
    },
    '已被播放 {count} 次': {
        'zh-TW': '已被播放 {count} 次',
        'en-US': 'Played {count} times',
    },
    '最多播放': {
        'zh-TW': '最多播放',
        'en-US': 'Most Played',
    },
    '歌手排序': {
        'zh-TW': '歌手排序',
        'en-US': 'Artist Sort',
    },
    '排序方向': {
        'en-US': 'Sort Direction',
    },
    '升序': {
        'en-US': 'Ascending',
    },
    '降序': {
        'en-US': 'Descending',
    },
    '从': {
        'en-US': 'From',
    },
    '到': {
        'en-US': 'To',
    },
    '输入歌手名称': {
        'zh-TW': '輸入歌手名稱',
        'en-US': 'Enter artist name',
    },
    '输入专辑名称': {
        'zh-TW': '輸入專輯名稱',
        'en-US': 'Enter album name',
    },
    '音乐流派': {
        'zh-TW': '音樂流派',
        'en-US': 'Music Genre',
    },
    '输入流派': {
        'zh-TW': '輸入流派',
        'en-US': 'Enter genre',
    },
    '最小播放次数': {
        'zh-TW': '最小播放次數',
        'en-US': 'Minimum Play Count',
    },
    '最少歌曲数': {
        'zh-TW': '最少歌曲數',
        'en-US': 'Minimum Song Count',
    },
    '只显示有封面的专辑': {
        'zh-TW': '只顯示有封面的專輯',
        'en-US': 'Show only albums with covers',
    },
    '只显示已收藏': {
        'zh-TW': '只顯示已收藏',
        'en-US': 'Show favorites only',
    },
    '拖拽调整预设选项顺序，取消勾选可隐藏选项': {
        'zh-TW': '拖拽调整預設選项顺序，取消勾選可隐藏選项',
        'en-US': 'Drag to reorder preset options. Uncheck to hide options.',
    },
    '预设选项管理': {
        'zh-TW': '預設選項管理',
        'en-US': 'Preset Options Management',
    },
    '预设规则': {
        'zh-TW': '預設规则',
        'en-US': 'Preset Rules',
    },
    '全部显示': {
        'zh-TW': '全部顯示',
        'en-US': 'Show All',
    },
    '全部隐藏': {
        'zh-TW': '全部隱藏',
        'en-US': 'Hide All',
    },
    '显示 {count} 个预设': {
        default: '显示 {count} 个预设',
        'zh-TW': '顯示 {count} 個預設',
        'en-US': 'Showing {count} presets',
    },
    '保存预设': {
        'zh-TW': '保存預設',
        'en-US': 'Save Preset',
    },
    '保存自定义规则': {
        'en-US': 'Save Custom Rules',
    },
    '规则名称': {
        'zh-TW': '规则名稱',
        'en-US': 'Rule Name',
    },
    '请输入规则名称': {
        'zh-TW': '请輸入规则名稱',
        'en-US': 'Please enter rule name',
    },
    '请在后台管理创建一个subsonic密码，刷新页面试试吧': {
        'zh-TW': '请在後台管理建立一个subsonic密碼，刷新頁面试试吧',
        'en-US': 'Please create a Subsonic password in Admin Settings, then refresh this page.',
    },
    '加载失败！': {
        'zh-TW': '加载失敗！',
        'en-US': 'Load failed',
    },
    '加载专辑数据失败': {
        'zh-TW': '加載專輯數據失敗',
        'en-US': 'Failed to load album data',
    },
    '保存规则时出现错误': {
        'zh-TW': '保存規則時出現錯誤',
        'en-US': 'An error occurred while saving the rule',
    },
    '保存预设设置时出现错误': {
        'zh-TW': '保存預設設定時出現錯誤',
        'en-US': 'An error occurred while saving preset settings',
    },
    '预设选项保存成功！': {
        'zh-TW': '預設選项保存成功！',
        'en-US': 'Preset options saved',
    },
    '预设选项已保存到服务器': {
        'zh-TW': '預設選项已保存到服務器',
        'en-US': 'Preset options saved to server',
    },
    '移除成功！': {
        'en-US': 'Remove succeeded',
    },
    '移除失败！': {
        'zh-TW': '移除失敗！',
        'en-US': 'Remove failed',
    },
    '自定义预设 "{name}" 已移除': {
        default: '自定义预设 "{name}" 已移除',
        'zh-TW': '自訂預設 "{name}" 已移除',
        'en-US': 'Custom preset "{name}" has been removed',
    },
    '移除预设时出现错误': {
        'zh-TW': '移除預設時出現錯誤',
        'en-US': 'An error occurred while removing preset',
    },
    '艺术家详情': {
        'zh-TW': '藝術家详情',
        'en-US': 'Artist Details',
    },
    '专辑数': {
        'zh-TW': '專輯数',
        'en-US': 'Album Count',
    },
    '播放全部歌曲': {
        'en-US': 'Play All Songs',
    },
    '播放全部': {
        'en-US': 'Play All',
    },
    '播放这首歌': {
        default: '播放这首歌',
        'zh-TW': '播放這首歌',
        'en-US': 'Play this track',
    },
    '暂无艺术家': {
        'zh-TW': '暫無藝術家',
        'en-US': 'No artists',
    },
    '还没有找到任何艺术家，请稍后再试': {
        'zh-TW': '还没有找到任何藝術家，请稍后再试',
        'en-US': 'No artists found yet. Please try again later.',
    },
    '操作失败': {
        'zh-TW': '操作失敗',
        'en-US': 'Operation failed',
    },
    '发现音乐': {
        'zh-TW': '發現音樂',
        'en-US': 'Discover Music',
    },
    '推荐专辑': {
        'zh-TW': '推荐專輯',
        'en-US': 'Recommended Albums',
    },
    '最新发布': {
        'zh-TW': '最新發布',
        'en-US': 'Latest Releases',
    },
    '添加到喜爱': {
        'en-US': 'Add to Favorites',
    },
    '精选专辑': {
        'zh-TW': '精选專輯',
        'en-US': 'Featured Albums',
    },
    '相似艺术家': {
        'zh-TW': '相似藝術家',
        'en-US': 'Similar Artists',
    },
    '最近播放': {
        'en-US': 'Recently Played',
    },
    '查看历史': {
        'en-US': 'View History',
    },
    '播放：': {
        'en-US': 'Play: ',
    },
    'DLNA播放': {
        'zh-TW': 'DLNA播放',
        'en-US': 'DLNA Playback',
    },
    '继续聆听': {
        'zh-TW': '繼續聆聽',
        'en-US': 'Keep Listening',
    },
    '本地播放': {
        'zh-TW': '本地播放',
        'en-US': 'Local Playback',
    },
    '播放队列': {
        'zh-TW': '播放佇列',
        'en-US': 'Play Queue',
    },
    '当前播放': {
        'zh-TW': '目前播放',
        'en-US': 'Now Playing',
    },
    '首': {
        'zh-TW': '首',
        'en-US': 'tracks',
    },
    '打乱顺序': {
        'en-US': 'Shuffle',
    },
    '打乱': {
        'zh-TW': '打亂',
        'en-US': 'Shuffle',
    },
    '随机播放': {
        'en-US': 'Shuffle Play',
    },
    '随机': {
        'zh-TW': '隨機',
        'en-US': 'Random',
    },
    '清空队列': {
        'en-US': 'Clear Queue',
    },
    '清空': {
        'zh-TW': '清空',
        'en-US': 'Clear',
    },
    '上一首': {
        'en-US': 'Previous Track',
    },
    '播放': {
        'en-US': 'Play',
    },
    '暂停': {
        'zh-TW': '暫停',
        'en-US': 'Pause',
    },
    '下一首': {
        'en-US': 'Next Track',
    },
    '暂无播放': {
        'zh-TW': '暫無播放',
        'en-US': 'Not Playing',
    },
    '暂无歌词': {
        'zh-TW': '暫無歌詞',
        'en-US': 'No Lyrics',
    },
    '先添加几首歌，再投送到设备': {
        'zh-TW': '先加入幾首歌，再投送到裝置',
        'en-US': 'Add a few songs, then cast them to a device',
    },
    '小爱音箱': {
        'en-US': 'XiaoAi Speaker',
    },
    'DLNA设备': {
        'zh-TW': 'DLNA裝置',
        'en-US': 'DLNA Device',
    },
    '已切换到DLNA播放': {
        'zh-TW': '已切換到DLNA播放',
        'en-US': 'Switched to DLNA playback',
    },
    '已切换到本地播放': {
        'zh-TW': '已切換到本地播放',
        'en-US': 'Switched to local playback',
    },
    '设备切换失败': {
        'zh-TW': '裝置切换失敗',
        'en-US': 'Device switch failed',
    },
    '通用播放器': {
        'en-US': 'Universal Player',
    },
    '支持本地播放和DLNA投送': {
        'en-US': 'Supports local playback and DLNA casting',
    },
    '推荐': {
        'en-US': 'Recommended',
    },
    '连接到网络音响或电视': {
        'zh-TW': '連線到網路音响或电视',
        'en-US': 'Connect to network speakers or TV',
    },
    '专业': {
        'zh-TW': '專业',
        'en-US': 'Pro',
    },
    '小米设备': {
        'zh-TW': '小米裝置',
        'en-US': 'Xiaomi Devices',
    },
    '连接小爱音箱或小米设备': {
        'zh-TW': '連線小爱音箱或小米裝置',
        'en-US': 'Connect XiaoAi speakers or Xiaomi devices',
    },
    '智能': {
        'en-US': 'Smart',
    },
    '播放设置': {
        'zh-TW': '播放設定',
        'en-US': 'Playback Settings',
    },
    '自动切换到最后使用的设备': {
        'zh-TW': '自动切换到最后使用的裝置',
        'en-US': 'Auto-switch to last used device',
    },
    '记住设备选择': {
        'zh-TW': '记住裝置選擇',
        'en-US': 'Remember device selection',
    },
    '选择你的播放设备': {
        'zh-TW': '選擇你的播放裝置',
        'en-US': 'Select your playback device',
    },
    '选择上方的设备类型开始播放音乐': {
        'zh-TW': '選擇上方的裝置类型开始播放音樂',
        'en-US': 'Select a device type above to start playback',
    },
    '选择播放设备': {
        'zh-TW': '選擇播放裝置',
        'en-US': 'Select Playback Device',
    },
    '当前选择:': {
        'zh-TW': '當前選擇:',
        'en-US': 'Current Selection:',
    },
    '进入播放页面': {
        'zh-TW': '進入播放頁面',
        'en-US': 'Open Player',
    },
    '刷新设备': {
        'zh-TW': '重新整理裝置',
        'en-US': 'Refresh Devices',
    },
    '搜索中...': {
        'zh-TW': '搜尋中...',
        'en-US': 'Searching...',
    },
    '手动添加设备': {
        'zh-TW': '手動添加裝置',
        'en-US': 'Manually Add Device',
    },
    '未发现DLNA设备': {
        'zh-TW': '未發現DLNA裝置',
        'en-US': 'No DLNA devices found',
    },
    '共找到 {count} 个设备': {
        default: '共找到 {count} 个设备',
        'zh-TW': '共找到 {count} 個裝置',
        'en-US': '{count} devices found',
    },
    '设备UDN不能为空': {
        'zh-TW': '裝置UDN不能為空',
        'en-US': 'Device UDN is required',
    },
    'UDN格式不正确，应为uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx': {
        'zh-TW': 'UDN格式不正確，應為uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        'en-US': 'Invalid UDN format. Expected uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    },
    '描述URL不能为空': {
        'zh-TW': '描述URL不能為空',
        'en-US': 'Description URL is required',
    },
    'URL格式不正确': {
        'zh-TW': 'URL格式不正確',
        'en-US': 'Invalid URL format',
    },
    '设备名称不能为空': {
        'zh-TW': '裝置名稱不能為空',
        'en-US': 'Device name is required',
    },
    '设备名称不能超过100个字符': {
        'zh-TW': '裝置名稱不能超過100個字元',
        'en-US': 'Device name cannot exceed 100 characters',
    },
    '该UDN的设备已存在': {
        'zh-TW': '該UDN的裝置已存在',
        'en-US': 'A device with this UDN already exists',
    },
    '未知型号': {
        'zh-TW': '未知型號',
        'en-US': 'Unknown model',
    },
    '未知制造商': {
        'zh-TW': '未知製造商',
        'en-US': 'Unknown manufacturer',
    },
    '设备 "{name}" 已添加到设备列表': {
        default: '设备 "{name}" 已添加到设备列表',
        'zh-TW': '裝置 "{name}" 已添加到裝置列表',
        'en-US': 'Device "{name}" was added to the device list',
    },
    '已选择设备: {name}': {
        default: '已选择设备: {name}',
        'zh-TW': '已選擇裝置: {name}',
        'en-US': 'Selected device: {name}',
    },
    '支持本地播放和DLNA投送，功能最全面': {
        'zh-TW': '支援本地播放與DLNA投送，功能最完整',
        'en-US': 'Supports local playback and DLNA casting with the fullest feature set',
    },
    '专业级网络音频播放，适合高品质音响系统': {
        'zh-TW': '專業級網路音訊播放，適合高品質音響系統',
        'en-US': 'Professional network audio playback for high-fidelity speaker systems',
    },
    '智能家居生态，无缝连接小米设备': {
        'zh-TW': '智慧家居生態，無縫連接小米裝置',
        'en-US': 'Smart-home ecosystem with seamless Xiaomi device connection',
    },
    '正在刷新设备列表...': {
        'zh-TW': '正在刷新裝置列表...',
        'en-US': 'Refreshing device list...',
    },
    '播放成功！': {
        'en-US': 'Playback started',
    },
    '暂停播放！': {
        'zh-TW': '暫停播放！',
        'en-US': 'Playback paused',
    },
    '随机播放成功！': {
        'en-US': 'Shuffle play started',
    },
    '停止成功！': {
        'en-US': 'Stop succeeded',
    },
    '更新成功！': {
        'zh-TW': '更新成功！',
        'en-US': 'Update succeeded',
    },
    '打乱成功！': {
        'en-US': 'Shuffle succeeded',
    },
    '编辑播放列表信息': {
        'zh-TW': '编輯播放列表信息',
        'en-US': 'Edit playlist information',
    },
    '名称:': {
        'zh-TW': '名稱:',
        'en-US': 'Name:',
    },
    '封面:': {
        'en-US': 'Cover:',
    },
    '封面推荐:': {
        'en-US': 'Cover Recommendations:',
    },
    '删除播放列表': {
        'zh-TW': '刪除播放列表',
        'en-US': 'Delete Playlist',
    },
    '从音乐收藏中删除此播放列表，但不会删除源文件。': {
        'zh-TW': '从音樂收藏中刪除此播放列表，但不会刪除源文件。',
        'en-US': 'Remove this playlist from Music Library, but do not delete source files.',
    },
    '删除音乐: 将播放列表从音乐收藏中移除，同时删除列表内的音乐文件。': {
        'zh-TW': '刪除音樂: 将播放列表从音樂收藏中移除，同时刪除列表内的音樂文件。',
        'en-US': 'Delete Music: remove the playlist from Music Library and delete its music files.',
    },
    '删除收藏: 将播放列表从音乐收藏中移除，但并不会删除音乐文件。': {
        'zh-TW': '刪除收藏: 将播放列表从音樂收藏中移除，但并不会刪除音樂文件。',
        'en-US': 'Remove from Favorites: remove the playlist from Music Library without deleting music files.',
    },
    '编辑智能播放列表规则': {
        'zh-TW': '编輯智能播放列表规则',
        'en-US': 'Edit smart playlist rules',
    },
    '满足条件': {
        'zh-TW': '满足條件',
        'en-US': 'Match Conditions',
    },
    '或': {
        'en-US': 'OR',
    },
    '且': {
        'en-US': 'AND',
    },
    '请输入': {
        'zh-TW': '请輸入',
        'en-US': 'Please enter',
    },
    '次': {
        'en-US': 'times',
    },
    '年': {
        'en-US': 'year',
    },
    '天': {
        'en-US': 'days',
    },
    '最多': {
        'en-US': 'Max',
    },
    '项': {
        'en-US': 'items',
    },
    '选择标准': {
        'zh-TW': '選擇标准',
        'en-US': 'Selection Criteria',
    },
    '动态更新': {
        'zh-TW': '動態更新',
        'en-US': 'Dynamic Update',
    },
    '播放失败！': {
        'zh-TW': '播放失敗！',
        'en-US': 'Playback failed',
    },
    '去重成功！': {
        'en-US': 'Deduplication succeeded',
    },
    '获取歌单详情失败': {
        'zh-TW': '获取歌单详情失敗',
        'en-US': 'Failed to fetch playlist details',
    },
    '更新歌单规则成功！': {
        'en-US': 'Playlist rules updated',
    },
    '更新歌单规则失败': {
        'zh-TW': '更新歌单规则失敗',
        'en-US': 'Failed to update playlist rules',
    },
    '导入歌单': {
        'zh-TW': '匯入歌单',
        'en-US': 'Import Playlist',
    },
    '智能歌单': {
        'en-US': 'Smart Playlist',
    },
    '创建智能播放列表': {
        'zh-TW': '建立智能播放列表',
        'en-US': 'Create Smart Playlist',
    },
    '列表名称：': {
        'zh-TW': '列表名稱：',
        'en-US': 'List Name:',
    },
    '请输入播放列表名称': {
        'zh-TW': '请輸入播放列表名稱',
        'en-US': 'Please enter playlist name',
    },
    '导入播放列表': {
        'zh-TW': '匯入播放列表',
        'en-US': 'Import Playlist',
    },
    '文件导入': {
        'zh-TW': '文件匯入',
        'en-US': 'File Import',
    },
    '网易云歌单': {
        'zh-TW': '網易云歌单',
        'en-US': 'NetEase Playlist',
    },
    'QQ音乐歌单': {
        'zh-TW': 'QQ音樂歌单',
        'en-US': 'QQ Music Playlist',
    },
    '替换歌曲路径前缀': {
        'zh-TW': '替換歌曲路径前缀',
        'en-US': 'Replace Song Path Prefix',
    },
    '原始路径前缀 (要被替换的部分)': {
        'zh-TW': '原始路径前缀 (要被替換對部分)',
        'en-US': 'Original path prefix (to be replaced)',
    },
    '例如: /old/music/path/ 或 C:\\\\Music\\\\': {
        'en-US': 'Example: /old/music/path/ or C:\\\\Music\\\\',
    },
    '将替换为系统音乐库路径，保留相对路径结构': {
        'zh-TW': '将替换为系統音樂库路径，保留相对路径结构',
        'en-US': 'Will be replaced with the system Music Library path while keeping relative path structure',
    },
    '警告！': {
        'en-US': 'Warning',
    },
    '播放列表名称不能为空！': {
        'zh-TW': '播放列表名稱不能为空！',
        'en-US': 'Playlist name cannot be empty',
    },
    '此播放列表受密码保护': {
        'zh-TW': '此播放列表受密碼保护',
        'en-US': 'This playlist is password-protected',
    },
    '请输入访问密码': {
        'zh-TW': '请輸入访问密碼',
        'en-US': 'Please enter access password',
    },
    '曲目列表': {
        'en-US': 'Track List',
    },
    '无权限': {
        'zh-TW': '無权限',
        'en-US': 'No Permission',
    },
    '此分享不允许复制': {
        'zh-TW': '此分享不允许複製',
        'en-US': 'Copying is not allowed for this share',
    },
    '播放列表已复制到您的账户': {
        'zh-TW': '播放列表已複製到您的账户',
        'en-US': 'Playlist copied to your account',
    },
    '元数据编辑': {
        'zh-TW': '元數据编輯',
        'en-US': 'Metadata Editing',
    },
    '操作台编辑': {
        'zh-TW': '操作台編輯',
        'en-US': 'Workspace Edit',
    },
    '资源信息': {
        'en-US': 'Resource Information',
    },
    '添加至播放列表': {
        'en-US': 'Add to Playlist',
    },
    '新建播放列表': {
        'zh-TW': '新立播放列表',
        'en-US': 'Create Playlist',
    },
    '删除音乐!': {
        'zh-TW': '刪除音樂!',
        'en-US': 'Delete Music',
    },
    '删除音乐: 将音乐从音乐收藏中移除，同时删除音乐文件。': {
        'zh-TW': '刪除音樂: 将音樂从音樂收藏中移除，同时刪除音樂文件。',
        'en-US': 'Delete Music: remove tracks from Music Library and delete the music files.',
    },
    '删除收藏: 将音乐从音乐收藏中移除，但并不会删除音乐文件。': {
        'zh-TW': '刪除收藏: 将音樂从音樂收藏中移除，但并不会刪除音樂文件。',
        'en-US': 'Remove from Favorites: remove tracks from Music Library without deleting music files.',
    },
    '删除音乐': {
        'zh-TW': '刪除音樂',
        'en-US': 'Delete Music',
    },
    '删除收藏': {
        'zh-TW': '刪除收藏',
        'en-US': 'Remove from Favorites',
    },
    '获取音乐信息失败！': {
        'zh-TW': '获取音樂信息失敗！',
        'en-US': 'Fetch music info failed',
    },
    '移出成功！': {
        'en-US': 'Remove succeeded',
    },
    '获取资源信息失败！': {
        'zh-TW': '获取资源信息失敗！',
        'en-US': 'Fetch resource info failed',
    },
    '添加到播放列表': {
        'en-US': 'Add to Playlist',
    },
    '选择播放列表': {
        'zh-TW': '選擇播放列表',
        'en-US': 'Select Playlist',
    },
    '请选择': {
        'zh-TW': '请選擇',
        'en-US': 'Please select',
    },
    '批量操作': {
        'en-US': 'Batch Operation',
    },
    '添加失败': {
        'zh-TW': '添加失敗',
        'en-US': 'Add failed',
    },
    '暂无音乐': {
        'zh-TW': '暫無音樂',
        'en-US': 'No music',
    },
    '还没有找到任何音乐，请稍后再试': {
        'zh-TW': '还没有找到任何音樂，请稍后再试',
        'en-US': 'No music found yet. Please try again later.',
    },
    '更新失败！': {
        'zh-TW': '更新失敗！',
        'en-US': 'Update failed',
    },
    '已处理记录': {
        'zh-TW': '已处理記錄',
        'en-US': 'Processed Records',
    },
    '已合并': {
        'en-US': 'Merged',
    },
    '合并信息': {
        'en-US': 'Merge Info',
    },
    '主艺术家：': {
        'zh-TW': '主藝術家：',
        'en-US': 'Primary Artist:',
    },
    '合并到：': {
        'en-US': 'Merge To:',
    },
    '相似艺术家 (待合并处理)': {
        'zh-TW': '相似藝術家 (待合并处理)',
        'en-US': 'Similar artists (pending merge)',
    },
    '艺术家 A': {
        'zh-TW': '藝術家 A',
        'en-US': 'Artist A',
    },
    '艺术家名称': {
        'zh-TW': '藝術家名稱',
        'en-US': 'Artist Name',
    },
    '艺术家 B': {
        'zh-TW': '藝術家 B',
        'en-US': 'Artist B',
    },
    '智能合并规则设置': {
        'zh-TW': '智能合并规则設定',
        'en-US': 'Smart Merge Rule Settings',
    },
    '合并优先级': {
        'en-US': 'Merge Priority',
    },
    '歌曲数量规则': {
        'zh-TW': '歌曲數量规则',
        'en-US': 'Song Count Rules',
    },
    '名称规则': {
        'zh-TW': '名稱规则',
        'en-US': 'Name Rules',
    },
    '开始智能合并': {
        'zh-TW': '開始智能合并',
        'en-US': 'Start Smart Merge',
    },
    '此操作将会把一个艺术家的所有歌曲和专辑转移到另一个艺术家下': {
        'zh-TW': '此操作将会把一个藝術家的所有歌曲和專輯转移到另一个藝術家下',
        'en-US': 'This operation will move all songs and albums from one artist to another',
    },
    '智能合并成功！': {
        'en-US': 'Smart merge succeeded',
    },
    '智能合并失败！': {
        'zh-TW': '智能合并失敗！',
        'en-US': 'Smart merge failed',
    },
    '请先选择要合并的艺术家': {
        'zh-TW': '请先選擇要合并的藝術家',
        'en-US': 'Please select artists to merge first',
    },
    '合并成功！': {
        'en-US': 'Merge succeeded',
    },
    '合并失败！': {
        'zh-TW': '合并失敗！',
        'en-US': 'Merge failed',
    },
    '进行中': {
        'en-US': 'In Progress',
    },
    '原因': {
        'en-US': 'Reason',
    },
    '停止': {
        'en-US': 'Stop',
    },
    '未匹配': {
        'zh-TW': '未匹設',
        'en-US': 'Unmatched',
    },
    '跳转操作台': {
        'zh-TW': '跳轉操作台',
        'en-US': 'Open Workspace',
    },
    '待候选': {
        'zh-TW': '待候選',
        'en-US': 'Pending Candidates',
    },
    'AI候选': {
        'zh-TW': 'AI候選',
        'en-US': 'AI Candidate',
    },
    '缺失艺术家和专辑': {
        'zh-TW': '缺失藝術家和專輯',
        'en-US': 'Missing artist and album',
    },
    '异常失败': {
        'zh-TW': '异常失敗',
        'en-US': 'Failed (Exception)',
    },
    '全部删除': {
        'zh-TW': '全部刪除',
        'en-US': 'Delete All',
    },
    '候选': {
        'zh-TW': '候選',
        'en-US': 'Candidate',
    },
    '删除文件': {
        'zh-TW': '刪除文件',
        'en-US': 'Delete File',
    },
    '相似度': {
        'en-US': 'Similarity',
    },
    '复核': {
        'zh-TW': '複核',
        'en-US': 'Review',
    },
    '完全匹配': {
        'zh-TW': '完全匹設',
        'en-US': 'Exact Match',
    },
    '删除记录': {
        'zh-TW': '刪除记录',
        'en-US': 'Delete Records',
    },
    '已删除': {
        'zh-TW': '已刪除',
        'en-US': 'Deleted',
    },
    '删除信息': {
        'zh-TW': '刪除信息',
        'en-US': 'Delete Info',
    },
    '原路径：': {
        'en-US': 'Original Path:',
    },
    '删除原因：': {
        'zh-TW': '刪除原因：',
        'en-US': 'Deletion Reason:',
    },
    '文件hash重复 (完全相同的文件)': {
        'zh-TW': '文件hash重複 (完全相同對文件)',
        'en-US': 'Duplicate file hash (exact same file)',
    },
    '文件 A': {
        'en-US': 'File A',
    },
    '文件路径': {
        'en-US': 'File Path',
    },
    '文件 B': {
        'en-US': 'File B',
    },
    '文件名称重复 (可能不同版本)': {
        'zh-TW': '文件名稱重复 (可能不同版本)',
        'en-US': 'Duplicate filename (possibly different versions)',
    },
    '声纹重复 (音频内容相同)': {
        'zh-TW': '声纹重複 (音频内容相同)',
        'en-US': 'Duplicate fingerprint (same audio content)',
    },
    '元数据重复 (标题艺术家相同)': {
        'zh-TW': '元数据重复 (標題藝術家相同)',
        'en-US': 'Duplicate metadata (same title and artist)',
    },
    '智能删除规则设置': {
        'zh-TW': '智能刪除规则設定',
        'en-US': 'Smart Delete Rule Settings',
    },
    '删除优先级': {
        'zh-TW': '刪除优先级',
        'en-US': 'Deletion Priority',
    },
    '开始智能删除': {
        'zh-TW': '开始智能刪除',
        'en-US': 'Start Smart Delete',
    },
    '此操作不可撤销，请确认要删除以下文件：': {
        'zh-TW': '此操作不可撤销，请确认要刪除以下文件：',
        'en-US': 'This operation cannot be undone. Please confirm deletion of the following files:',
    },
    '请先选择要删除的文件': {
        'zh-TW': '请先選擇要刪除的文件',
        'en-US': 'Please select files to delete first',
    },
    '智能删除成功！': {
        'zh-TW': '智能刪除成功！',
        'en-US': 'Smart delete succeeded',
    },
    '智能删除失败！': {
        'zh-TW': '智能刪除失敗！',
        'en-US': 'Smart delete failed',
    },
    '批量删除失败！': {
        'zh-TW': '批量刪除失敗！',
        'en-US': 'Batch delete failed',
    },
    '元数据扫描': {
        'zh-TW': '元數据扫描',
        'en-US': 'Metadata Scanning',
    },
    '读取元数据': {
        'zh-TW': '读取元數据',
        'en-US': 'Read Metadata',
    },
    '音乐收藏': {
        'zh-TW': '音樂收藏',
        'en-US': 'Library',
    },
    '虚假文件格式': {
        'en-US': 'Fake File Format',
    },
    '元数据错误': {
        'zh-TW': '元數据错误',
        'en-US': 'Metadata Error',
    },
    '确认要删除文件？': {
        'zh-TW': '确认要刪除文件？',
        'en-US': 'Confirm file deletion?',
    },
    '修复任务已提交！': {
        'zh-TW': '修复任務已提交！',
        'en-US': 'Fix task submitted',
    },
    '修复失败！': {
        'zh-TW': '修复失敗！',
        'en-US': 'Repair failed',
    },
    '修复失败': {
        'zh-TW': '修復失敗',
        'en-US': 'Repair failed',
    },
    '修复中...': {
        'zh-TW': '修復中...',
        'en-US': 'Fixing...',
    },
    '批量修复后缀名': {
        'zh-TW': '批量修復後綴名',
        'en-US': 'Batch fix file suffix',
    },
    '批量修复元数据': {
        'zh-TW': '批量修復元數據',
        'en-US': 'Batch fix metadata',
    },
    '找到 {count} 个文件，后台正在处理中，请稍后查看审计日志': {
        default: '找到 {count} 个文件，后台正在处理中，请稍后查看审计日志',
        'zh-TW': '找到 {count} 個檔案，後台正在處理中，請稍後查看審計日誌',
        'en-US': 'Found {count} files. Processing in background, please check audit logs later.',
    },
    '找到 {count} 个文件，后台正在通过 FFmpeg 重新编码修复，请稍后查看审计日志': {
        default: '找到 {count} 个文件，后台正在通过 FFmpeg 重新编码修复，请稍后查看审计日志',
        'zh-TW': '找到 {count} 個檔案，後台正透過 FFmpeg 重新編碼修復，請稍後查看審計日誌',
        'en-US': 'Found {count} files. Re-encoding with FFmpeg in background, please check audit logs later.',
    },
    '操作类型': {
        'en-US': 'Operation Type',
    },
    '全部操作': {
        'en-US': 'All Actions',
    },
    '手动修改': {
        'zh-TW': '手動修改',
        'en-US': 'Manual Edit',
    },
    '重复检查': {
        'zh-TW': '重複检查',
        'en-US': 'Duplicate Check',
    },
    '日志等级': {
        'zh-TW': '日誌等级',
        'en-US': 'Log Level',
    },
    '全部等级': {
        'en-US': 'All Levels',
    },
    '信息': {
        'en-US': 'Info',
    },
    '警告': {
        'en-US': 'Warning',
    },
    '错误': {
        'en-US': 'Error',
    },
    '全部状态': {
        'zh-TW': '全部狀態',
        'en-US': 'All Statuses',
    },
    '成功': {
        'en-US': 'Succeeded',
    },
    '等待': {
        'en-US': 'Waiting',
    },
    '用户': {
        'en-US': 'User',
    },
    '搜索用户': {
        'en-US': 'Search User',
    },
    '等级': {
        'en-US': 'Level',
    },
    '详情': {
        'en-US': 'Details',
    },
    '时间': {
        'zh-TW': '時間',
        'en-US': 'Time',
    },
    '无详情': {
        'zh-TW': '無详情',
        'en-US': 'No Details',
    },
    '暂无操作日志': {
        'zh-TW': '暫無操作日誌',
        'en-US': 'No Operation Logs',
    },
    '当前筛选条件下没有找到相关日志记录': {
        'zh-TW': '目前筛选條件下没有找到相关日誌记录',
        'en-US': 'No logs found under current filter conditions',
    },
    '条记录，第': {
        'zh-TW': '條记录，第',
        'en-US': 'records, page',
    },
    '页码': {
        'zh-TW': '頁碼',
        'en-US': 'Page Number',
    },
    '页': {
        'zh-TW': '頁',
        'en-US': 'Page',
    },
    '服务类型': {
        'zh-TW': '服務类型',
        'en-US': 'Service Type',
    },
    'root用户的日志重定向到docker的logs输出里，请查看docker的logs输出。': {
        'zh-TW': 'root用户的日誌重定向到docker的logs輸出里，请查看docker的logs輸出。',
        'en-US': 'Root user logs are redirected to Docker logs. Please check Docker logs output.',
    },
    '反馈日志': {
        'zh-TW': '反馈日誌',
        'en-US': 'Feedback Logs',
    },
    '等待运行日志...': {
        'zh-TW': '等待运行日誌...',
        'en-US': 'Waiting for runtime logs...',
    },
    '等待错误日志...': {
        'zh-TW': '等待错误日誌...',
        'en-US': 'Waiting for error logs...',
    },
    '反馈内容': {
        'en-US': 'Feedback Content',
    },
    '请详细描述您遇到的问题，这将帮助开发者快速定位和解决问题（至少20字）': {
        'zh-TW': '請详细描述您遇到對问題，这将帮助開發者快速定位和解决问題（至少20字）',
        'en-US': 'Please describe your issue in detail. This helps developers locate and fix it faster (at least 20 characters).',
    },
    '系统会同时上传相关日志文件给开发者进行分析': {
        'zh-TW': '系統会同时上傳相关日誌文件给开发者进行分析',
        'en-US': 'Related log files will also be uploaded for developer analysis',
    },
    '权限失败': {
        'zh-TW': '权限失敗',
        'en-US': 'Permission denied',
    },
    'V1 版本：您没有该功能的操作权限': {
        'zh-TW': 'V1 版本：您没有该功能對操作权限',
        'en-US': 'V1 version: You do not have permission to use this feature',
    },
    '反馈失败！': {
        'zh-TW': '反馈失敗！',
        'en-US': 'Feedback failed',
    },
    '反馈理由至少20字': {
        'en-US': 'Feedback reason must be at least 20 characters',
    },
    '反馈成功！': {
        'en-US': 'Feedback sent',
    },
    '刮削报告': {
        'en-US': 'Scraping Report',
    },
    '标题:': {
        'zh-TW': '標題:',
        'en-US': 'Title:',
    },
    '创建时间:': {
        'zh-TW': '建立時間:',
        'en-US': 'Created Time:',
    },
    '执行状态:': {
        'zh-TW': '執行狀態:',
        'en-US': 'Execution Status:',
    },
    '恢复': {
        'zh-TW': '還原',
        'en-US': 'Restore',
    },
    '运行时间:': {
        'zh-TW': '运行時間:',
        'en-US': 'Runtime:',
    },
    '结束时间:': {
        'zh-TW': '结束時間:',
        'en-US': 'End Time:',
    },
    '已完成': {
        'en-US': 'Completed',
    },
    '包括成功失败和未匹配': {
        'zh-TW': '包括成功失敗和未匹配',
        'en-US': 'Includes succeeded, failed, and unmatched',
    },
    '总数': {
        'zh-TW': '总數',
        'en-US': 'Total',
    },
    '总共个数': {
        'zh-TW': '总共个數',
        'en-US': 'Total Count',
    },
    '完成进度': {
        'en-US': 'Completion Progress',
    },
    '完成进度百分比': {
        'en-US': 'Completion Percentage',
    },
    '成功完成并匹配上的任务': {
        'zh-TW': '成功完成并匹配上的任務',
        'en-US': 'Tasks completed successfully and matched',
    },
    '失败': {
        'zh-TW': '失敗',
        'en-US': 'Failed',
    },
    '文件异常或网络异常的任务': {
        'zh-TW': '文件异常或網路异常的任務',
        'en-US': 'Tasks failed due to file or network issues',
    },
    '未命中当前匹配模式规则': {
        'zh-TW': '未命中目前匹配模式规则',
        'en-US': 'Did not match current matching mode rules',
    },
    'AI 正在分析候选项...': {
        'zh-TW': 'AI 正在分析候選项...',
        'en-US': 'AI is analyzing candidates...',
    },
    '请稍候，这可能需要几秒钟': {
        'zh-TW': '請稍候，这可能需要几秒鐘',
        'en-US': 'Please wait, this may take a few seconds',
    },
    'AI 分析失败': {
        'zh-TW': 'AI 分析失敗',
        'en-US': 'AI analysis failed',
    },
    'AI 已分析音乐元数据和所有候选项，为您推荐最匹配的结果': {
        'zh-TW': 'AI 已分析音樂元数据和所有候选项，为您推荐最匹配的结果',
        'en-US': 'AI has analyzed music metadata and all candidates, and recommended the best match',
    },
    '推荐候选项': {
        'zh-TW': '推荐候選项',
        'en-US': 'Recommended Candidates',
    },
    '标题：': {
        'zh-TW': '標題：',
        'en-US': 'Title:',
    },
    '艺术家：': {
        'zh-TW': '藝術家：',
        'en-US': 'Artist:',
    },
    '专辑：': {
        'zh-TW': '專輯：',
        'en-US': 'Album:',
    },
    '来源：': {
        'zh-TW': '來源：',
        'en-US': 'Source:',
    },
    '此操作将会永久删除音乐文件，删除后无法恢复！': {
        'zh-TW': '此操作将会永久刪除音樂文件，刪除后無法還原！',
        'en-US': 'This operation will permanently delete music files and cannot be undone.',
    },
    '即将删除的文件：': {
        'zh-TW': '即将刪除的文件：',
        'en-US': 'Files to be deleted:',
    },
    '请谨慎操作，确定要删除吗？': {
        'zh-TW': '请谨慎操作，确定要刪除吗？',
        'en-US': 'Please proceed carefully. Are you sure you want to delete?',
    },
    '此操作将会永久删除所有异常失败的音乐文件，删除后无法恢复！': {
        'zh-TW': '此操作将会永久刪除所有异常失敗的音樂文件，刪除后無法還原！',
        'en-US': 'This operation will permanently delete all failed music files and cannot be undone.',
    },
    '即将删除': {
        'zh-TW': '即将刪除',
        'en-US': 'About to Delete',
    },
    '个异常失败的音乐文件': {
        'zh-TW': '个异常失敗的音樂文件',
        'en-US': 'failed music files',
    },
    '请谨慎操作，确定要全部删除吗？': {
        'zh-TW': '请谨慎操作，确定要全部刪除吗？',
        'en-US': 'Please proceed carefully. Are you sure you want to delete all?',
    },
    '停止失败！': {
        'zh-TW': '停止失敗！',
        'en-US': 'Stop failed',
    },
    '恢复失败！': {
        'zh-TW': '還原失敗！',
        'en-US': 'Restore failed',
    },
    '没有待候选项': {
        'zh-TW': '没有待候選项',
        'en-US': 'No pending candidates',
    },
    '批量 AI 候选任务已启动': {
        'zh-TW': '批量 AI 候选任務已啟動',
        'en-US': 'Batch AI candidate task started',
    },
    '任务正在后台处理中，请稍后刷新查看结果': {
        'zh-TW': '任務正在後台处理中，请稍后刷新查看结果',
        'en-US': 'Task is processing in the background. Please refresh later to view results.',
    },
    '启动批量 AI 候选失败': {
        'zh-TW': '啟動批量 AI 候选失敗',
        'en-US': 'Failed to start batch AI candidate task',
    },
    '批量 AI 候选失败': {
        'zh-TW': '批量 AI 候选失敗',
        'en-US': 'Batch AI candidate failed',
    },
    '候选项已应用': {
        'zh-TW': '候選项已应用',
        'en-US': 'Candidates applied',
    },
    '应用候选项失败': {
        'zh-TW': '应用候选项失敗',
        'en-US': 'Failed to apply candidates',
    },
    '读取元数据失败': {
        'zh-TW': '读取元数据失敗',
        'en-US': 'Failed to read metadata',
    },
    '完成成功！': {
        'en-US': 'Completed',
    },
    '标签源插件': {
        'zh-TW': '標籤源插件',
        'en-US': 'Tag Source Plugin',
    },
    '批量操作插件': {
        'en-US': 'Batch Operation Plugin',
    },
    '已安装': {
        'en-US': 'Installed',
    },
    '插件市场': {
        'en-US': 'Plugin Marketplace',
    },
    '新增用户': {
        'en-US': 'Add User',
    },
    '设置': {
        'zh-TW': '設定',
        'en-US': 'Settings',
    },
    '暂无标签源插件': {
        'zh-TW': '暫無標籤源插件',
        'en-US': 'No Tag Source plugins',
    },
    '点击"添加插件"按钮来添加您的第一个标签源插件': {
        'zh-TW': '点击"添加插件"按钮来添加您的第一个標籤源插件',
        'en-US': 'Click "Add Plugin" to add your first Tag Source plugin',
    },
    '暂无操作台插件': {
        'zh-TW': '暫無操作台插件',
        'en-US': 'No workspace plugins',
    },
    '点击"添加插件"按钮来添加您的第一个操作台插件': {
        'zh-TW': '點击"添加插件"按钮來添加您對第一个操作台插件',
        'en-US': 'Click "Add Plugin" to add your first Workspace plugin',
    },
    '添加插件': {
        'en-US': 'Add Plugin',
    },
    '插件类型': {
        'en-US': 'Plugin Type',
    },
    '操作台插件': {
        'en-US': 'Workspace Plugin',
    },
    '下载模板': {
        'zh-TW': '下載模板',
        'en-US': 'Download Template',
    },
    '下载对应类型的模板文件，填写后上传': {
        'zh-TW': '下載对应类型的模板文件，填写后上傳',
        'en-US': 'Download the template file for this type, fill it in, then upload it',
    },
    '上传插件文件': {
        'zh-TW': '上傳插件文件',
        'en-US': 'Upload Plugin File',
    },
    '仅支持 .py 格式': {
        'zh-TW': '僅支持 .py 格式',
        'en-US': 'Only .py format is supported',
    },
    '拖拽文件到这里或': {
        'en-US': 'Drag file here or',
    },
    '已选': {
        'zh-TW': '已選',
        'en-US': 'Selected',
    },
    '识别的插件信息': {
        'zh-TW': '识别對插件信息',
        'en-US': 'Recognized Plugin Info',
    },
    '作者:': {
        'en-US': 'Author:',
    },
    '重置': {
        'zh-TW': '重定',
        'en-US': 'Reset',
    },
    '删除插件': {
        'zh-TW': '刪除插件',
        'en-US': 'Delete Plugin',
    },
    '获取插件列表失败': {
        'zh-TW': '获取插件列表失敗',
        'en-US': 'Failed to fetch plugin list',
    },
    '正在重新加载插件系统...': {
        'zh-TW': '正在重新加载插件系統...',
        'en-US': 'Reloading plugin system...',
    },
    '插件系统重新加载完成': {
        'zh-TW': '插件系統重新加载完成',
        'en-US': 'Plugin system reload completed',
    },
    '部分插件加载失败': {
        'zh-TW': '部分插件加载失敗',
        'en-US': 'Some plugins failed to load',
    },
    '重新加载失败': {
        'zh-TW': '重新加载失敗',
        'en-US': 'Reload failed',
    },
    '列表刷新成功': {
        'en-US': 'List refreshed',
    },
    '刷新失败': {
        'zh-TW': '刷新失敗',
        'en-US': 'Refresh failed',
    },
    '插件配置保存成功': {
        'zh-TW': '插件設定保存成功',
        'en-US': 'Plugin configuration saved',
    },
    '保存配置失败': {
        'zh-TW': '保存設定失敗',
        'en-US': 'Failed to save configuration',
    },
    '插件停用成功': {
        'en-US': 'Plugin disabled',
    },
    '插件激活成功': {
        'zh-TW': '插件啟用成功',
        'en-US': 'Plugin enabled',
    },
    '插件删除成功': {
        'zh-TW': '插件刪除成功',
        'en-US': 'Plugin deleted',
    },
    '删除失败': {
        'zh-TW': '刪除失敗',
        'en-US': 'Delete failed',
    },
    '插件测试完成': {
        'zh-TW': '插件測試完成',
        'en-US': 'Plugin test completed',
    },
    '测试失败': {
        'zh-TW': '測試失敗',
        'en-US': 'Test failed',
    },
    '执行插件中...': {
        'zh-TW': '執行插件中...',
        'en-US': 'Executing plugin...',
    },
    '执行失败': {
        'zh-TW': '執行失敗',
        'en-US': 'Execution failed',
    },
    '插件上传成功': {
        'zh-TW': '插件上傳成功',
        'en-US': 'Plugin uploaded',
    },
    '文件读取成功': {
        'en-US': 'File read completed',
    },
    '正在下载模板...': {
        'zh-TW': '正在下載模板...',
        'en-US': 'Downloading template...',
    },
    '模板下载成功': {
        'zh-TW': '模板下載成功',
        'en-US': 'Template downloaded',
    },
    '立即执行一次': {
        'zh-TW': '立即執行一次',
        'en-US': 'Run Once',
    },
    '开启后台刮削': {
        'zh-TW': '開啟後台刮削',
        'en-US': 'Enable Background Scraping',
    },
    '配置帮助': {
        'zh-TW': '設定帮助',
        'en-US': 'Configuration Help',
    },
    '&lt;宿主机上新建的自定义目录&gt;': {
        'zh-TW': '&lt;宿主机上新建的自定义目錄&gt;',
        'en-US': '&lt;Custom directory created on host machine&gt;',
    },
    '&lt;音乐媒体库目录&gt;': {
        'zh-TW': '&lt;音樂媒体库目錄&gt;',
        'en-US': '<Music Library Directory>',
    },
    '重要提示：': {
        'en-US': 'Important Tip:',
    },
    '/app/download 需要重新部署在部署命令里添加': {
        'en-US': '/app/download requires redeployment with command updates',
    },
    '/app/media/download 无需重新部署': {
        'zh-TW': '/app/media/download 無需重新部署',
        'en-US': '/app/media/download does not require redeployment',
    },
    '宿主目录不支持中文': {
        'zh-TW': '宿主目錄不支持中文',
        'en-US': 'Host directory does not support Chinese characters',
    },
    '/app/download目录和/app/media目录不能重合！': {
        'zh-TW': '/app/download目錄和/app/media目錄不能重合！',
        'en-US': '/app/download and /app/media directories cannot overlap.',
    },
    '容器内地址/app/download不可修改，需保持一致！': {
        'en-US': 'Container path /app/download cannot be modified and must remain consistent.',
    },
    '一般用做新下载的音乐文件目录，不要把媒体库都放在这个目录下': {
        'zh-TW': '一般用做新下載的音樂文件目錄，不要把媒体库都放在这个目錄下',
        'en-US': 'Usually used as the directory for newly downloaded music files. Do not place your entire Music Library here.',
    },
    '监控目录（容器内地址）': {
        'zh-TW': '监控目錄（容器内地址）',
        'en-US': 'Watch Directory (Container Path)',
    },
    '配置复制文件参数': {
        'zh-TW': '設定複製文件參數',
        'en-US': 'Configure file copy parameters',
    },
    '声纹识别': {
        'en-US': 'Audio Fingerprint Recognition',
    },
    '配置自动刮削参数': {
        'zh-TW': '設定自动刮削參數',
        'en-US': 'Configure auto-scraping parameters',
    },
    '配置手动刮削参数': {
        'zh-TW': '設定手动刮削參數',
        'en-US': 'Configure manual scraping parameters',
    },
    '需要先勾选复制文件才能选择此项': {
        'zh-TW': '需要先勾选複製文件才能選擇此项',
        'en-US': 'You must enable file copy before selecting this option',
    },
    '配置整理文件参数': {
        'zh-TW': '設定整理文件參數',
        'en-US': 'Configure file organization parameters',
    },
    '转移文件': {
        'zh-TW': '轉移文件',
        'en-US': 'Move Files',
    },
    '目标目录': {
        'zh-TW': '目标目錄',
        'en-US': 'Target Directory',
    },
    '请输入目标目录路径（容器内地址）': {
        'zh-TW': '请輸入目标目錄路径（容器内地址）',
        'en-US': 'Please enter target directory path (container path)',
    },
    '例如: /app/media/': {
        'en-US': 'Example: /app/media/',
    },
    '复制模式': {
        'zh-TW': '複製模式',
        'en-US': 'Copy Mode',
    },
    '复制文件本体': {
        'zh-TW': '複製文件本体',
        'en-US': 'Copy original files',
    },
    '完整复制音乐文件到目标目录': {
        'zh-TW': '完整複製音樂文件到目标目錄',
        'en-US': 'Copy complete music files to the target directory',
    },
    '创建strm流媒体文件指向原始文件': {
        'zh-TW': '建立strm流媒体文件指向原始文件',
        'en-US': 'Create STRM files pointing to source files',
    },
    '配置后台刮削任务的执行周期': {
        'zh-TW': '設定後台刮削任務的執行周期',
        'en-US': 'Configure execution interval for Background Scraping tasks',
    },
    'Crontab 格式: 分钟 小时 日 月 星期': {
        'zh-TW': 'Crontab 格式: 分鐘 小時 日 月 星期',
        'en-US': 'Crontab format: minute hour day month weekday',
    },
    '当前配置:': {
        'zh-TW': '目前設定:',
        'en-US': 'Current configuration:',
    },
    '上次运行:': {
        'en-US': 'Last run:',
    },
    '快捷预设': {
        'zh-TW': '快捷預設',
        'en-US': 'Quick Presets',
    },
    '自定义 Crontab 表达式': {
        'en-US': 'Custom Crontab Expression',
    },
    '例如: */5 * * * * (每5分钟)': {
        'zh-TW': '例如: */5 * * * * (每5分鐘)',
        'en-US': 'Example: */5 * * * * (every 5 minutes)',
    },
    '格式: 分钟(0-59) 小时(0-23) 日(1-31) 月(1-12) 星期(0-6)': {
        'zh-TW': '格式: 分鐘(0-59) 小時(0-23) 日(1-31) 月(1-12) 星期(0-6)',
        'en-US': 'Format: minute(0-59) hour(0-23) day(1-31) month(1-12) weekday(0-6)',
    },
    '常用示例:': {
        'en-US': 'Common Examples:',
    },
    '• */1 * * * * - 每分钟': {
        'zh-TW': '• */1 * * * * - 每分鐘',
        'en-US': '• */1 * * * * - Every minute',
    },
    '• */3 * * * * - 每3分钟': {
        'zh-TW': '• */3 * * * * - 每3分鐘',
        'en-US': '• */3 * * * * - Every 3 minutes',
    },
    '• */5 * * * * - 每5分钟': {
        'zh-TW': '• */5 * * * * - 每5分鐘',
        'en-US': '• */5 * * * * - Every 5 minutes',
    },
    '• 0 * * * * - 每小时': {
        'zh-TW': '• 0 * * * * - 每小時',
        'en-US': '• 0 * * * * - Every hour',
    },
    '• 0 */2 * * * - 每2小时': {
        'zh-TW': '• 0 */2 * * * - 每2小時',
        'en-US': '• 0 */2 * * * - Every 2 hours',
    },
    '• 0 0 * * * - 每天凌晨': {
        'en-US': '• 0 0 * * * - Every day at midnight',
    },
    '每分钟': {
        'zh-TW': '每分鐘',
        'en-US': 'Every minute',
    },
    '每3分钟': {
        'zh-TW': '每3分鐘',
        'en-US': 'Every 3 minutes',
    },
    '每10分钟': {
        'zh-TW': '每10分鐘',
        'en-US': 'Every 10 minutes',
    },
    '每小时': {
        'zh-TW': '每小時',
        'en-US': 'Every hour',
    },
    '每2小时': {
        'zh-TW': '每2小時',
        'en-US': 'Every 2 hours',
    },
    '每天凌晨': {
        'en-US': 'Every day at midnight',
    },
    '执行成功！': {
        'zh-TW': '執行成功！',
        'en-US': 'Execution succeeded',
    },
    '请输入有效的 crontab 表达式': {
        'zh-TW': '请輸入有效的 crontab 表达式',
        'en-US': 'Please enter a valid crontab expression',
    },
    'crontab 表达式格式错误，应为5个字段': {
        'en-US': 'Invalid crontab expression format. It should contain 5 fields.',
    },
    '刮削周期配置已更新！': {
        'zh-TW': '刮削周期設定已更新！',
        'en-US': 'Scraping schedule updated',
    },
    '后台任务管理': {
        'zh-TW': '後台任務管理',
        'en-US': 'Background Task Management',
    },
    '后台任务用于执行一些定时任务，例如刮削、删除等。': {
        'zh-TW': '後台任務用于執行一些定时任務，例如刮削、刪除等。',
        'en-US': 'Background tasks are used for scheduled jobs, such as scraping and deletion.',
    },
    '停止所有后台任务': {
        'zh-TW': '停止所有後台任務',
        'en-US': 'Stop all background tasks',
    },
    '用于紧急停止正在执行的后台任务。': {
        'zh-TW': '用于紧急停止正在執行的後台任務。',
        'en-US': 'Used to stop running background tasks in emergencies.',
    },
    '网络错误或服务器异常': {
        'zh-TW': '網路错误或服务器异常',
        'en-US': 'Network error or server exception',
    },
    '分析完成！': {
        'en-US': 'Analysis completed',
    },
    '分析完成': {
        'en-US': 'Analysis Completed',
    },
    '未找到相似的艺术家': {
        'zh-TW': '未找到相似的藝術家',
        'en-US': 'No similar artists found',
    },
    '本地音乐标签写入位置': {
        'zh-TW': '本地音樂標籤写入位置',
        'en-US': 'Local music tag write path',
    },
    '元数据': {
        'zh-TW': '元數据',
        'en-US': 'Metadata',
    },
    '元数据：内嵌进音乐文件中。音乐收藏：音乐标签提供的数据库': {
        'zh-TW': '元数据：内嵌进音樂文件中。音樂收藏：音樂標籤提供的数据库',
        'en-US': 'Metadata: embedded in music files. Music Library: database provided by Music Tag.',
    },
    'WebDAV音乐标签写入位置': {
        'zh-TW': 'WebDAV音樂標籤写入位置',
        'en-US': 'WebDAV music tag write path',
    },
    '文件显示数量': {
        'zh-TW': '文件顯示数量',
        'en-US': 'Displayed File Count',
    },
    '请输入数量': {
        'zh-TW': '请輸入数量',
        'en-US': 'Please enter a number',
    },
    '操作台单个目录下的文件夹显示限制，默认为 5000': {
        'zh-TW': '操作台单个目錄下的文件夹顯示限制，預設为 5000',
        'en-US': 'Folder display limit per directory in Workspace. Default is 5000.',
    },
    'ID3 元数据版本': {
        'zh-TW': 'ID3 元數据版本',
        'en-US': 'ID3 Metadata Version',
    },
    'ID3 版本': {
        'zh-TW': 'ID3 版本',
        'en-US': 'ID3 Version',
    },
    '启用版本历史': {
        'zh-TW': '啟用版本历史',
        'en-US': 'Enable Version History',
    },
    '保留历史版本数量': {
        'zh-TW': '保留历史版本數量',
        'en-US': 'Number of versions to retain',
    },
    '默认50条': {
        'zh-TW': '預設50條',
        'en-US': 'Default: 50 items',
    },
    '条': {
        'zh-TW': '條',
        'en-US': 'items',
    },
    '个人配置': {
        'zh-TW': '个人設定',
        'en-US': 'Personal Settings',
    },
    '本系统内置Subsonic服务器，提供以下功能：': {
        'zh-TW': '本系統内置Subsonic服务器，提供以下功能：',
        'en-US': 'This system includes a built-in Subsonic server with the following features:',
    },
    '通过网络播放个人音乐收藏': {
        'zh-TW': '通过網路播放个人音樂收藏',
        'en-US': 'Play your personal Music Library over the network',
    },
    '支持多种音乐格式（MP3、FLAC、OGG等）': {
        'zh-TW': '支持多种音樂格式（MP3、FLAC、OGG等）',
        'en-US': 'Supports multiple audio formats (MP3, FLAC, OGG, etc.)',
    },
    '实时转码以适应不同设备': {
        'zh-TW': '实时转码以适应不同裝置',
        'en-US': 'Real-time transcoding for different devices',
    },
    '播放列表管理和多用户支持': {
        'zh-TW': '播放列表管理和多用戶支援',
        'en-US': 'Playlist management and multi-user support',
    },
    '跨平台客户端支持（Web、手机APP、桌面客户端）': {
        'zh-TW': '跨平台客戶端支援（Web、手機APP、桌面客戶端）',
        'en-US': 'Cross-platform client support (Web, mobile app, desktop client)',
    },
    '配置您的个人Subsonic账号密码后，可使用各种Subsonic客户端连接此服务器': {
        'zh-TW': '設定您的个人Subsonic帳號密碼后，可使用各种Subsonic客户端連線此服务器',
        'en-US': 'After configuring your personal Subsonic account password, you can connect to this server with various Subsonic clients',
    },
    '此密码配置仅对您当前账户有效': {
        'zh-TW': '此密碼設定僅对您目前账户有效',
        'en-US': 'This password setting only applies to your current account',
    },
    '服务器配置': {
        'zh-TW': '服务器設定',
        'en-US': 'Server Configuration',
    },
    '服务器地址': {
        'zh-TW': '服務器地址',
        'en-US': 'Server Address',
    },
    '用户名': {
        'zh-TW': '使用者名稱',
        'en-US': 'Username',
    },
    '密码': {
        'zh-TW': '密碼',
        'en-US': 'Password',
    },
    '请输入密码': {
        'zh-TW': '请輸入密碼',
        'en-US': 'Please enter password',
    },
    '开启记录': {
        'zh-TW': '開啟记录',
        'en-US': 'Enable Logging',
    },
    '将您的个人Subsonic账户连接到': {
        'zh-TW': '将您的个人Subsonic账户連線到',
        'en-US': 'Connect your personal Subsonic account to',
    },
    '，通过任何设备或平台上的播放记录您所听的一切内容。': {
        'zh-TW': '，通过任何裝置或平台上的播放记录您所听的一切内容。',
        'en-US': ', and record everything you listen to across any device or platform.',
    },
    '此配置仅对您当前账户有效，不会影响其他用户': {
        'zh-TW': '此設定僅对您目前账户有效，不会影响其他用户',
        'en-US': 'This configuration only applies to your current account and will not affect other users',
    },
    '请输入用户名': {
        'zh-TW': '请輸入用户名',
        'en-US': 'Please enter username',
    },
    '请输入API Key': {
        'zh-TW': '请輸入API Key',
        'en-US': 'Please enter API Key',
    },
    '请输入API Secret': {
        'zh-TW': '请輸入API Secret',
        'en-US': 'Please enter API Secret',
    },
    '开启转码': {
        'zh-TW': '開啟转码',
        'en-US': 'Enable Transcoding',
    },
    '缓存文件数': {
        'zh-TW': '缓存文件數',
        'en-US': 'Cached File Count',
    },
    '转码命令': {
        'zh-TW': '轉碼命令',
        'en-US': 'Transcoding Command',
    },
    '请输入转码命令': {
        'zh-TW': '请輸入转码命令',
        'en-US': 'Please enter transcoding command',
    },
    '选择配置文件': {
        'zh-TW': '選擇設定文件',
        'en-US': 'Select Config File',
    },
    '确认导入': {
        'zh-TW': '确认匯入',
        'en-US': 'Confirm Import',
    },
    '请先设置管理员密码': {
        'zh-TW': '请先設定管理员密碼',
        'en-US': 'Please set admin password first',
    },
    '密码验证成功！': {
        'zh-TW': '密碼驗證成功！',
        'en-US': 'Password verified',
    },
    'Last.fm配置更新成功！': {
        'zh-TW': 'Last.fm設定更新成功！',
        'en-US': 'Last.fm configuration updated',
    },
    'Last.fm配置更新失败！': {
        'zh-TW': 'Last.fm設定更新失敗！',
        'en-US': 'Failed to update Last.fm configuration',
    },
    'API 管理': {
        'en-US': 'API Management',
    },
    '管理 API 访问令牌、认证配置和接口文档': {
        'zh-TW': '管理 API 访问令牌、认证設定和接口文档',
        'en-US': 'Manage API access tokens, authentication settings, and API documentation',
    },
    '认证管理': {
        'zh-TW': '設證管理',
        'en-US': 'Authentication',
    },
    '生成Token': {
        'en-US': 'Generate Token',
    },
    '复制': {
        'zh-TW': '複製',
        'en-US': 'Copy',
    },
    '使用说明': {
        'zh-TW': '使用說明',
        'en-US': 'Instructions',
    },
    '• Token 用于 API 认证，请在请求头中携带': {
        'zh-TW': '• Token 用于 API 认证，请在請求標頭中携带',
        'en-US': '• Token Used for API authentication; include it in request headers',
    },
    '• 生成新Token会立即使旧Token失效': {
        'en-US': '• Generating a new token immediately invalidates the old token',
    },
    '• 请妥善保管Token，不要泄露给他人': {
        'zh-TW': '• 請妥善保管Token，不要泄露给他人',
        'en-US': '• Keep your token safe and do not disclose it',
    },
    '开放 API 接口': {
        'zh-TW': '開放 API 線口',
        'en-US': 'Open API Endpoints',
    },
    'API 名称': {
        'zh-TW': 'API 名稱',
        'en-US': 'API Name',
    },
    '功能描述': {
        'en-US': 'Feature Description',
    },
    '请求方式': {
        'zh-TW': '請求方式',
        'en-US': 'Request Method',
    },
    '认证方式': {
        'zh-TW': '設證方式',
        'en-US': 'Auth Method',
    },
    '正常': {
        'en-US': 'Normal',
    },
    '异常': {
        'en-US': 'Abnormal',
    },
    '收起': {
        'en-US': 'Collapse',
    },
    '还有 {count} 个艺术家': {
        default: '还有 {count} 个艺术家',
        'zh-TW': '還有 {count} 位藝術家',
        'en-US': '{count} more artists',
    },
    '已添加到收藏': {
        'zh-TW': '已加入收藏',
        'en-US': 'Added to favorites',
    },
    '已取消收藏': {
        'zh-TW': '已取消收藏',
        'en-US': 'Removed from favorites',
    },
    '任务在后台努力运行中': {
        'zh-TW': '任務正在背景執行中',
        'en-US': 'Task is running in background',
    },
    '密码验证失败，请检查密码': {
        'zh-TW': '密碼驗證失敗，請檢查密碼',
        'en-US': 'Password verification failed, please check password',
    },
    '清除Token': {
        'zh-TW': '清除Token',
        'en-US': 'Clear Token',
    },
    '查找设备': {
        'zh-TW': '搜尋裝置',
        'en-US': 'Find Devices',
    },
    '启用': {
        'zh-TW': '啟用',
        'en-US': 'Enabled',
    },
    '未启用': {
        'zh-TW': '未啟用',
        'en-US': 'Not Enabled',
    },
    '你好，我是小爱': {
        'zh-TW': '你好，我是小愛',
        'en-US': 'Hello, I am Xiaoai',
    },
    '测试点播': {
        'zh-TW': '測試點播',
        'en-US': 'Test On-demand',
    },
    '清空播放': {
        'zh-TW': '清空播放',
        'en-US': 'Clear Playback',
    },
    '小爱同学': {
        'zh-TW': '小愛同學',
        'en-US': 'Xiaoai',
    },
    '清除过程中发生错误': {
        'zh-TW': '清除過程中發生錯誤',
        'en-US': 'An error occurred while clearing',
    },
    '文档': {
        'en-US': 'Docs',
    },
    '接口地址': {
        'zh-TW': '線口地址',
        'en-US': 'Endpoint',
    },
    '请求头': {
        'zh-TW': '請求標頭',
        'en-US': 'Request Headers',
    },
    '请求参数': {
        'zh-TW': '請求參數',
        'en-US': 'Request Parameters',
    },
    '必填': {
        'en-US': 'Required',
    },
    '无参数': {
        'zh-TW': '無參數',
        'en-US': 'No parameters',
    },
    '返回示例': {
        'zh-TW': '回傳示例',
        'en-US': 'Response Example',
    },
    'AI大模型接入': {
        'zh-TW': 'AI大模型線入',
        'en-US': 'AI Model Integration',
    },
    '配置 AI 服务以增强系统功能': {
        'zh-TW': '設定 AI 服务以增强系統功能',
        'en-US': 'Configure AI services to enhance system features',
    },
    '对话 URL': {
        'zh-TW': '對話 URL',
        'en-US': 'Chat URL',
    },
    '例如：https://api.deepseek.com/chat/completions': {
        'en-US': 'Example: https://api.deepseek.com/chat/completions',
    },
    '模型名称': {
        'zh-TW': '模型名稱',
        'en-US': 'Model Name',
    },
    '例如：gpt-3.5-turbo': {
        'en-US': 'Example: gpt-3.5-turbo',
    },
    '配置说明': {
        'zh-TW': '設定說明',
        'en-US': 'Configuration Notes',
    },
    '• 请确保 API 接口地址完整且可访问': {
        'zh-TW': '• 請确保 API 線口地址完整且可访问',
        'en-US': '• Ensure the API endpoint URL is complete and accessible',
    },
    '• URL的路径是完整会话，不要省略结尾的chat/completions': {
        'zh-TW': '• URL對路径是完整会話，不要省略需包對chat/completions',
        'en-US': '• The URL path must be a full session endpoint and include chat/completions',
    },
    '• API Key 将加密保存，请妥善保管': {
        'zh-TW': '• API Key 将加密保存，請妥善保管',
        'en-US': '• API Key is stored encrypted. Keep it secure.',
    },
    '• 模型名称需要与服务商提供的名称一致': {
        'zh-TW': '• 模型名稱需要与服务商提供的名稱一致',
        'en-US': '• Model name must match the provider\'s official name',
    },
    '功能列表': {
        'en-US': 'Feature List',
    },
    '功能': {
        'en-US': 'Feature',
    },
    '功能位置': {
        'zh-TW': '功能位定',
        'en-US': 'Feature Location',
    },
    'AI补充音乐风格': {
        'zh-TW': 'AI补充音樂風格',
        'en-US': 'AI Enrich Music Styles',
    },
    '1. 首页-完整度详情-流派规则刮削': {
        'zh-TW': '1. 首頁-完整度详情-流派规则刮削',
        'en-US': '1. Home - Completeness Details - Genre Rule Scraping',
    },
    '2. 操作台-元数据详情-AI识别风格': {
        'zh-TW': '2. 操作台-元数据详情-AI识别風格',
        'en-US': '2. Workspace - Metadata Details - AI Genre Recognition',
    },
    'AI翻译歌词，根据歌曲内容，给出翻译后的歌词': {
        'zh-TW': 'AI翻译歌詞，根据歌曲内容，给出翻译后的歌詞',
        'en-US': 'AI lyric translation: generate translated lyrics based on song content',
    },
    '1. 操作台-元数据详情-AI翻译歌词': {
        'zh-TW': '1. 操作台-元数据详情-AI翻译歌詞',
        'en-US': '1. Workspace - Metadata Details - AI Lyric Translation',
    },
    'AI生成的正则表达式': {
        'zh-TW': 'AI生成對正则表达式',
        'en-US': 'AI Generated Regex',
    },
    'AI生成的正则表达式，根据歌曲内容，给出正则表达式': {
        'zh-TW': 'AI生成對正则表达式，根据歌曲内容，给出正则表达式',
        'en-US': 'AI-generated regex: produce regular expressions based on song content',
    },
    '1. 操作台-元数据详情-拆分元数据/替换文本-预览-AI生成的正则表达式': {
        'zh-TW': '1. 操作台-元数据详情-拆分元数据/替换文本-預覽-AI生成的正则表达式',
        'en-US': '1. Workspace - Metadata Details - Split Metadata/Replace Text - Preview - AI Regex',
    },
    '新Token已生成': {
        'en-US': 'New token generated',
    },
    'Token已复制到剪贴板': {
        'zh-TW': 'Token已複製到剪贴板',
        'en-US': 'Token copied to clipboard',
    },
    '请先生成Token': {
        'zh-TW': '請先生成Token',
        'en-US': 'Please generate token first',
    },
    '为你的音乐收藏分配合适的角色': {
        'zh-TW': '为你的音樂收藏分配合适的角色',
        'en-US': 'Assign appropriate roles for your Music Library',
    },
    '音乐收藏家': {
        'zh-TW': '音樂收藏家',
        'en-US': 'Music Curator',
    },
    '全权管理整个音乐收藏，拥有所有管理权限': {
        'zh-TW': '全权管理整个音樂收藏，拥有所有管理权限',
        'en-US': 'Full control of the entire Music Library with all management permissions',
    },
    '离团': {
        'en-US': 'Leave Team',
    },
    '招募收藏家': {
        'en-US': 'Recruit Curators',
    },
    '听众席位': {
        'en-US': 'Audience Seats',
    },
    '欣赏美妙的音乐乐章，拥有收听音乐的权限': {
        'zh-TW': '欣赏美妙的音樂乐章，拥有收听音樂的权限',
        'en-US': 'Enjoy beautiful music with listening permissions',
    },
    '招募听众': {
        'en-US': 'Recruit Listeners',
    },
    '搜索用户...': {
        'en-US': 'Search users...',
    },
    '更新成功': {
        'en-US': 'Update succeeded',
    },
    '更新失败': {
        'zh-TW': '更新失敗',
        'en-US': 'Update failed',
    },
    '系统版本': {
        'zh-TW': '系統版本',
        'en-US': 'System Version',
    },
    '系统信息': {
        'zh-TW': '系統資訊',
        'en-US': 'System Information',
    },
    '检查更新': {
        'zh-TW': '檢查更新',
        'en-US': 'Check Updates',
    },
    '更新时间': {
        'zh-TW': '更新時間',
        'en-US': 'Updated Time',
    },
    '激活码': {
        'zh-TW': '啟用码',
        'en-US': 'Activation Code',
    },
    '激活服务器': {
        'zh-TW': '啟用服务器',
        'en-US': 'Activate Server',
    },
    '点击复制': {
        'zh-TW': '點擊複製',
        'en-US': 'Click to copy',
    },
    '系统环境': {
        'zh-TW': '系統環境',
        'en-US': 'System Environment',
    },
    '服务进程管理': {
        'zh-TW': '服務進程管理',
        'en-US': 'Service Process Management',
    },
    '数据库': {
        'zh-TW': '數据库',
        'en-US': 'Database',
    },
    'FFmpeg版本': {
        'en-US': 'FFmpeg Version',
    },
    '服务器用户': {
        'zh-TW': '服務器用户',
        'en-US': 'Server User',
    },
    '服务器架构': {
        'zh-TW': '服務器架构',
        'en-US': 'Server Architecture',
    },
    '进程ID': {
        'zh-TW': '進程ID',
        'en-US': 'Process ID',
    },
    '服务名称': {
        'zh-TW': '服務名稱',
        'en-US': 'Service Name',
    },
    '运行状态': {
        'zh-TW': '運行狀態',
        'en-US': 'Status',
    },
    '运行时间': {
        'zh-TW': '運行時間',
        'en-US': 'Uptime',
    },
    '监控': {
        'zh-TW': '監控',
        'en-US': 'Monitor',
    },
    '启动': {
        'zh-TW': '啟動',
        'en-US': 'Start',
    },
    '重启': {
        'zh-TW': '重啟',
        'en-US': 'Restart',
    },
    '正在运行': {
        'zh-TW': '正在運行',
        'en-US': 'Running',
    },
    '进程ID:': {
        'en-US': 'Process ID:',
    },
    '项目自动更新': {
        'zh-TW': '项目自動更新',
        'en-US': 'Project Auto Update',
    },
    '更新说明': {
        'zh-TW': '更新說明',
        'en-US': 'Update Notes',
    },
    '自动更新采用containrrr/watchtower容器更新, 如不存在该镜像会自动拉取，请确保网络可达': {
        'zh-TW': '自動更新採用 containrrr/watchtower 容器更新，如不存在該鏡像會自動拉取，請確保網路可達',
        'en-US': 'Auto update uses the containrrr/watchtower container. If the image is missing, it will be pulled automatically. Ensure network access is available.',
    },
    '本项目容器名称:': {
        'zh-TW': '本项目容器名稱:',
        'en-US': 'Container Name for This Project:',
    },
    'Celery Worker 监控': {
        'en-US': 'Celery Worker Monitor',
    },
    '检查更新失败': {
        'zh-TW': '检查更新失敗',
        'en-US': 'Failed to check updates',
    },
    '激活码为空': {
        'zh-TW': '啟用码为空',
        'en-US': 'Activation code is empty',
    },
    '激活码已复制到剪贴板': {
        'zh-TW': '啟用码已複製到剪贴板',
        'en-US': 'Activation code copied to clipboard',
    },
    '复制失败，请手动复制': {
        'zh-TW': '複製失敗，请手动複製',
        'en-US': 'Copy failed, please copy manually',
    },
    '挂载路径': {
        'zh-TW': '挂載路径',
        'en-US': 'Mount Path',
    },
    '本地挂载模式需要挂载映射到这个目录，直连模式不需要挂载可直接在这个目录查看。': {
        'zh-TW': '本地挂载模式需要挂载映射到这个目錄，直连模式不需要挂载可直接在这个目錄查看。',
        'en-US': 'In Local Mount mode, this directory must be mounted. In Direct mode, no mount is needed and you can browse it directly.',
    },
    '直连模式': {
        'zh-TW': '直連模式',
        'en-US': 'Direct Connection Mode',
    },
    '直接连接OpenList服务': {
        'zh-TW': '直接連線OpenList服务',
        'en-US': 'Connect directly to OpenList service',
    },
    '本地挂载': {
        'zh-TW': '本地挂載',
        'en-US': 'Local Mount',
    },
    '通过本地挂载访问': {
        'zh-TW': '通过本地挂載访问',
        'en-US': 'Access via local mount',
    },
    '请输入 OpenList 的 URL': {
        'zh-TW': '请輸入 OpenList 的 URL',
        'en-US': 'Please enter OpenList URL',
    },
    '确保该系统可以访问到 OpenList 地址，例如：http://192.168.0.115:5244': {
        'zh-TW': '确保该系統可以访问到 OpenList 地址，例如：http://192.168.0.115:5244',
        'en-US': 'Ensure this system can access the OpenList URL, e.g. http://192.168.0.115:5244',
    },
    '根目录': {
        'zh-TW': '根目錄',
        'en-US': 'Root Directory',
    },
    '请输入 OpenList 的根目录': {
        'zh-TW': '请輸入 OpenList 的根目錄',
        'en-US': 'Please enter OpenList root directory',
    },
    'OpenList 根目录地址，例如：/aliyun/音乐': {
        'zh-TW': 'OpenList 根目錄地址，例如：/aliyun/音樂',
        'en-US': 'OpenList root directory path, e.g. /aliyun/music',
    },
    '请输入账号': {
        'zh-TW': '请輸入帳號',
        'en-US': 'Please enter account',
    },
    'OpenList 的用户名': {
        'zh-TW': 'OpenList 對用户名',
        'en-US': 'OpenList Username',
    },
    'OpenList 账号密码': {
        'zh-TW': 'OpenList 帳號密碼',
        'en-US': 'OpenList Account Password',
    },
    '显示条数': {
        'zh-TW': '顯示條数',
        'en-US': 'Display Count',
    },
    '请输入显示的条数': {
        'zh-TW': '请輸入顯示的條数',
        'en-US': 'Please enter display count',
    },
    '限制每个目录显示的条数': {
        'zh-TW': '限制每个目錄顯示的條数',
        'en-US': 'Limit the number of items shown per directory',
    },
    '清除缓存的元数据文件': {
        'zh-TW': '清除缓存對元數据文件',
        'en-US': 'Clear cached metadata files',
    },
    '请输入OpenList的URL地址': {
        'zh-TW': '请輸入OpenList的URL地址',
        'en-US': 'Please enter OpenList URL',
    },
    'Worker 节点': {
        'zh-TW': 'Worker 節點',
        'en-US': 'Worker Nodes',
    },
    '在线节点数量': {
        'zh-TW': '在线節點数量',
        'en-US': 'Online Node Count',
    },
    '活跃任务': {
        'zh-TW': '活跃任務',
        'en-US': 'Active Tasks',
    },
    '正在执行中': {
        'zh-TW': '正在執行中',
        'en-US': 'Running',
    },
    '预留任务': {
        'zh-TW': '预留任務',
        'en-US': 'Reserved Tasks',
    },
    '队列中等待': {
        'en-US': 'Queued',
    },
    'Worker 节点状态': {
        'zh-TW': 'Worker 節點狀態',
        'en-US': 'Worker Node Status',
    },
    '在线': {
        'en-US': 'Online',
    },
    '执行中': {
        'zh-TW': '執行中',
        'en-US': 'Running',
    },
    '复制任务ID': {
        'zh-TW': '複製任務ID',
        'en-US': 'Copy Task ID',
    },
    '开始时间:': {
        'zh-TW': '开始時間:',
        'en-US': 'Start Time:',
    },
    '运行时长:': {
        'zh-TW': '运行時长:',
        'en-US': 'Running Duration:',
    },
    '停止任务': {
        'zh-TW': '停止任務',
        'en-US': 'Stop Task',
    },
    '等待中': {
        'en-US': 'Waiting',
    },
    '该 Worker 当前无任务': {
        'zh-TW': '该 Worker 目前無任務',
        'en-US': 'This worker currently has no tasks',
    },
    '暂无 Worker 节点': {
        'zh-TW': '暫無 Worker 節點',
        'en-US': 'No worker nodes',
    },
    '请确保 Celery Worker 已启动': {
        'zh-TW': '请确保 Celery Worker 已啟動',
        'en-US': 'Please ensure Celery Worker is running',
    },
    '获取 Worker 状态失败': {
        'zh-TW': '获取 Worker 狀態失敗',
        'en-US': 'Failed to fetch worker status',
    },
    '无法获取 Worker 状态信息': {
        'zh-TW': '無法获取 Worker 狀態信息',
        'en-US': 'Unable to get worker status information',
    },
    '复制成功': {
        'zh-TW': '複製成功',
        'en-US': 'Copy succeeded',
    },
    '任务ID已复制到剪贴板': {
        'zh-TW': '任務ID已複製到剪贴板',
        'en-US': 'Task ID copied to clipboard',
    },
    '请手动复制任务ID': {
        'zh-TW': '请手动複製任務ID',
        'en-US': 'Please copy Task ID manually',
    },
    '任务停止成功': {
        'zh-TW': '任務停止成功',
        'en-US': 'Task stopped',
    },
    '停止任务失败': {
        'zh-TW': '停止任務失敗',
        'en-US': 'Failed to stop task',
    },
    '无法停止任务，请检查网络连接': {
        'zh-TW': '無法停止任務，请检查網路連線',
        'en-US': 'Unable to stop task, please check network connection',
    },
    '基础信息': {
        'en-US': 'Basic Information',
    },
    '小米账号ID': {
        'zh-TW': '小米帳號ID',
        'en-US': 'Xiaomi Account ID',
    },
    '请输入小米账号ID': {
        'zh-TW': '请輸入小米帳號ID',
        'en-US': 'Please enter Xiaomi account ID',
    },
    '小米账号ID非手机号': {
        'zh-TW': '小米帳號ID非手机号',
        'en-US': 'Xiaomi account ID is not a phone number',
    },
    '账号密码': {
        'zh-TW': '帳號密碼',
        'en-US': 'Account Password',
    },
    '小米账号密码': {
        'zh-TW': '小米帳號密碼',
        'en-US': 'Xiaomi Account Password',
    },
    'Cookie（可选）': {
        'zh-TW': 'Cookie（可選）',
        'en-US': 'Cookie (Optional)',
    },
    '可选：手动输入小爱登录 Cookie': {
        'zh-TW': '可选：手动輸入小爱登录 Cookie',
        'en-US': 'Optional: manually enter XiaoAi login cookie',
    },
    '账号密码登录查不到设置时,可手动填入登录的Cookie': {
        'zh-TW': '帳號密碼登录查不到設定时,可手动填入登录的Cookie',
        'en-US': 'If settings cannot be retrieved with account login, you can manually enter the login cookie',
    },
    '登录管理': {
        'zh-TW': '登錄管理',
        'en-US': 'Login Management',
    },
    '清除已保存的登录token，需要重新登录': {
        'zh-TW': '清除已保存對登錄token，需要重新登錄',
        'en-US': 'Clear saved login token. Re-login is required',
    },
    '音箱设备管理': {
        'zh-TW': '音箱裝置管理',
        'en-US': 'Speaker Device Management',
    },
    '请输入设备名称': {
        'zh-TW': '请輸入裝置名稱',
        'en-US': 'Please enter device name',
    },
    '请输入设备型号': {
        'zh-TW': '请輸入裝置型号',
        'en-US': 'Please enter device model',
    },
    '暂无设备': {
        'zh-TW': '暫無裝置',
        'en-US': 'No devices',
    },
    '请点击"查找设备"添加设备': {
        'zh-TW': '请点击"查找裝置"添加裝置',
        'en-US': 'Click "Find Devices" to add devices',
    },
    '播放配置': {
        'zh-TW': '播放設定',
        'en-US': 'Playback Configuration',
    },
    '语音控制设置': {
        'zh-TW': '语音控制設定',
        'en-US': 'Voice Control Settings',
    },
    '播放本地音乐口令': {
        'zh-TW': '播放本地音樂口令',
        'en-US': 'Local music playback command phrase',
    },
    '请输入关键字': {
        'zh-TW': '请輸入关键字',
        'en-US': 'Please enter keywords',
    },
    '识别的播放关键字，例如：请播放': {
        'zh-TW': '识别對播放關键字，例如：請播放',
        'en-US': 'Recognized playback keyword, e.g. "please play"',
    },
    '对话间隔时间': {
        'zh-TW': '對話间隔時間',
        'en-US': 'Conversation Interval',
    },
    '建议设置为5': {
        'zh-TW': '建议設定为5',
        'en-US': 'Recommended value: 5',
    },
    '系统查询间隔（秒），建议：5': {
        'zh-TW': '系統查询间隔（秒），建议：5',
        'en-US': 'System query interval (seconds), recommended: 5',
    },
    '网络配置': {
        'zh-TW': '網路設定',
        'en-US': 'Network Configuration',
    },
    '内网地址和端口': {
        'zh-TW': '内網地址和端口',
        'en-US': 'LAN Address and Port',
    },
    '例如：192.168.0.115:8002': {
        'en-US': 'Example: 192.168.0.115:8002',
    },
    '本项目的内网地址和端口号': {
        'zh-TW': '本项目對内網地址和端口號',
        'en-US': 'LAN address and port of this project',
    },
    '功能开关': {
        'zh-TW': '功能開關',
        'en-US': 'Feature Toggles',
    },
    '语音唤醒启用': {
        'zh-TW': '语音唤醒啟用',
        'en-US': 'Enable Voice Wake-up',
    },
    '启动后可通过语音控制，不用时建议关闭': {
        'zh-TW': '啟動后可通过语音控制，不用时建议關閉',
        'en-US': 'After enabling, voice control is available. Disable when not needed',
    },
    '播放列表按钮': {
        'en-US': 'Playlist Button',
    },
    '在播放列表中显示小爱播放按钮': {
        'zh-TW': '在播放列表中顯示小爱播放按钮',
        'en-US': 'Show XiaoAi play button in playlist',
    },
    '测试功能': {
        'zh-TW': '測試功能',
        'en-US': 'Test Features',
    },
    '• 测试连接：连接成功小爱会发出声音提示': {
        'zh-TW': '• 測試連線：連線成功小爱会发出声音提示',
        'en-US': '• Test Connection: XiaoAi will play a sound when connected successfully',
    },
    '• 测试播放：小爱会播放一首你选择的音乐': {
        'zh-TW': '• 測試播放：小爱会播放一首你選擇的音樂',
        'en-US': '• Test Playback: XiaoAi will play a song you selected',
    },
    '• 测试点播：测试语音点播本地音乐功能': {
        'zh-TW': '• 測試点播：測試语音点播本地音樂功能',
        'en-US': '• Test On-demand: test voice on-demand playback for local music',
    },
    '• 测试通过在正在播放页面将输出设备改为“小爱音箱（系统），网页播放会将输出源发送到音箱播放': {
        'zh-TW': '• 測試通過：於播放中頁面將輸出裝置改為「小愛音箱（系統）」，網頁播放會將輸出音源傳送至音箱播放。',
        'en-US': '• Test passed: On the playing page, change the output device to ”Xiaoai Speaker (System)“. Web playback will send the audio output to the speaker',
    },
    '搜索设备': {
        'zh-TW': '搜索裝置',
        'en-US': 'Search Devices',
    },
    '未找到设备': {
        'zh-TW': '未找到裝置',
        'en-US': 'No devices found',
    },
    '1. 请确认账号密码是否正确。': {
        'zh-TW': '1. 请确认帳號密碼是否正确。',
        'en-US': '1. Confirm that account password is correct.',
    },
    '2. 检查并关闭防火墙和网络代理。': {
        'zh-TW': '2. 检查并關閉防火墙和網路代理。',
        'en-US': '2. Check and disable firewall and network proxy.',
    },
    '3. 在同个网络手机小米APP或者小米官网退出登录再重新登录账号后重试。': {
        'zh-TW': '3. 在同个網路手机小米APP或者小米官网退出登录再重新登录帳號后重试。',
        'en-US': '3. On the same network, log out and log back in via Xiaomi app or website, then retry.',
    },
    '测试连接': {
        'zh-TW': '測試連線',
        'en-US': 'Test Connection',
    },
    '测试语音文本': {
        'zh-TW': '測試语音文本',
        'en-US': 'Test Voice Text',
    },
    '输入测试文本': {
        'zh-TW': '輸入測試文本',
        'en-US': 'Enter test text',
    },
    '小爱同学会说出这段文字': {
        'zh-TW': '小爱同学会說出这段文字',
        'en-US': 'XiaoAi will speak this text',
    },
    '确认测试': {
        'zh-TW': '确认測試',
        'en-US': 'Start Test',
    },
    '测试播放': {
        'zh-TW': '測試播放',
        'en-US': 'Test Playback',
    },
    '选择歌曲': {
        'zh-TW': '選擇歌曲',
        'en-US': 'Select Song',
    },
    '搜索歌曲关键词': {
        'zh-TW': '搜索歌曲關键詞',
        'en-US': 'Search songs...',
    },
    '提示：部分机型只支持mp3格式播放': {
        'en-US': 'Tip: some models only support MP3 playback',
    },
    '确认播放': {
        'zh-TW': '确設播放',
        'en-US': 'Start Playback',
    },
    '测试语音唤醒点播': {
        'zh-TW': '測試语音唤醒点播',
        'en-US': 'Test voice wake-up playback',
    },
    '请说出以下语句进行测试：': {
        'zh-TW': '请说出以下语句进行測試：',
        'en-US': 'Please say the following sentence for testing:',
    },
    '小爱同学，': {
        'en-US': 'XiaoAi,',
    },
    '"歌曲名称/艺术家名称/播放列表名称"': {
        'zh-TW': '"歌曲名稱/藝術家名稱/播放列表名稱"',
        'en-US': '"song name / artist name / playlist name"',
    },
    '识别间隔': {
        'zh-TW': '识别間隔',
        'en-US': 'Recognition Interval',
    },
    '音频格式': {
        'en-US': 'Audio Format',
    },
    '监听中': {
        'en-US': 'Listening',
    },
    '等待语音输入...': {
        'zh-TW': '等待语音輸入...',
        'en-US': 'Waiting for voice input...',
    },
    '停止测试': {
        'zh-TW': '停止測試',
        'en-US': 'Stop Test',
    },
    '小爱同学，请播放周杰伦的歌': {
        'zh-TW': '小爱同学，請播放周杰伦對歌',
        'en-US': 'XiaoAi, play Jay Chou songs',
    },
    '好的，正在为您播放周杰伦的音乐': {
        'zh-TW': '好的，正在为您播放周杰伦的音樂',
        'en-US': 'Sure, playing Jay Chou for you',
    },
    '小爱同学，请播放稻香': {
        'zh-TW': '小爱同学，請播放稻香',
        'en-US': 'XiaoAi, play "Dao Xiang"',
    },
    '已找到歌曲《稻香》，正在播放': {
        'en-US': 'Found "Dao Xiang", now playing',
    },
    '小爱同学，请播放我的收藏歌单': {
        'zh-TW': '小爱同学，請播放我對收藏歌单',
        'en-US': 'XiaoAi, play my favorites playlist',
    },
    '正在播放您的收藏歌单，共32首歌曲': {
        'zh-TW': '正在播放您對收藏歌单，共32首歌曲',
        'en-US': 'Playing your favorites playlist, 32 songs in total',
    },
    '测试发送成功！': {
        'zh-TW': '測試发送成功！',
        'en-US': 'Test sent',
    },
    '播放发送成功！': {
        'zh-TW': '播放發送成功！',
        'en-US': 'Playback request sent',
    },
    '请打开"语音唤醒启用"开关！': {
        'zh-TW': '請打開"语音唤醒啟用"開關！',
        'en-US': 'Please enable "Voice Wake-up"',
    },
    '请正确设置"内网地址和端口"！': {
        'zh-TW': '请正确設定"内网地址和端口"！',
        'en-US': 'Please configure "LAN Address and Port" correctly',
    },
    '请正确设置"唤醒词、内网地址和端口、轮询时间"！': {
        'zh-TW': '请正确設定"唤醒词、内网地址和端口、轮询時間"！',
        'en-US': 'Please configure wake word, LAN address/port, and polling interval correctly',
    },
    '请至少选择一个设备！': {
        'zh-TW': '请至少選擇一个裝置！',
        'en-US': 'Please select at least one device',
    },
    '请至少开启一个设备！': {
        'zh-TW': '请至少開啟一个裝置！',
        'en-US': 'Please enable at least one device',
    },
    'Token清除成功！': {
        'en-US': 'Token cleared',
    },
    '已清除小爱音响登录token，查询设备时会重新登录': {
        'zh-TW': '已清除小爱音响登录token，查询裝置时会重新登录',
        'en-US': 'XiaoAi login token cleared. It will log in again when querying devices',
    },
    'Token清除失败！': {
        'zh-TW': 'Token清除失敗！',
        'en-US': 'Clear token failed',
    },
    '网络请求失败，请稍后重试': {
        'zh-TW': '網路請求失敗，请稍后重试',
        'en-US': 'Network request failed, please try again later',
    },
    '登录': {
        'zh-TW': '登入',
        'en-US': 'Sign in',
    },
    '使用 {provider} 登录': {
        'zh-TW': '使用 {provider} 登入',
        'en-US': 'Sign in with {provider}',
    },
    '登录到您的账户': {
        'zh-TW': '登入您的帳戶',
        'en-US': 'Sign in to your account',
    },
    '还没有账号？': {
        'zh-TW': '還沒有帳號？',
        'en-US': 'Not a member?',
    },
    '请联系管理员': {
        'zh-TW': '請聯絡管理員',
        'en-US': 'Please contact the administrator',
    },
    '请输入服务器地址，例如：http://192.168.1.100:8005': {
        'zh-TW': '請輸入服務器地址，例如：http://192.168.1.100:8005',
        'en-US': 'Please enter the server address, for example: http://192.168.1.100:8005',
    },
    'Music Tag Web 标志': {
        'zh-TW': 'Music Tag Web 標誌',
        'en-US': 'Music Tag Web logo',
    },
    '忘记密码？': {
        'zh-TW': '忘记密碼？',
        'en-US': 'Forgot password?',
    },
    '请联系管理员修改密码:': {
        'zh-TW': '请联系管理员修改密碼:',
        'en-US': 'Please contact the administrator to change your password:',
    },
    '1. 首先，您需要进入项目的Docker容器内。': {
        'zh-TW': '1. 首先，您需要进入项目對Docker容器内。',
        'en-US': '1. First, enter the project Docker container.',
    },
    '2. 在容器中打开终端，并执行下面的命令来启动密码更改过程：': {
        'zh-TW': '2. 在容器中打开终端，并執行下面的命令来啟動密碼更改过程：',
        'en-US': '2. Open a terminal in the container and run the following command to start password reset:',
    },
    '3. 执行上述命令后，系统会提示您输入并确认新密码。请根据屏幕上的指示设置一个安全的新密码。': {
        'zh-TW': '3. 執行上述命令后，系統会提示您輸入并确认新密碼。请根据屏幕上的指示設定一个安全的新密碼。',
        'en-US': '3. After running the command, follow prompts to enter and confirm a new secure password.',
    },
    '请输入服务器地址': {
        'zh-TW': '请輸入服务器地址',
        'en-US': 'Please enter server address',
    },
    'URL 格式无效,请输入完整的地址 (如: http://192.168.1.100:8005)': {
        'zh-TW': 'URL 格式無效,请輸入完整的地址 (如: http://192.168.1.100:8005)',
        'en-US': 'Invalid URL format. Please enter a full address (e.g. http://192.168.1.100:8005)',
    },
    '正在测试连接...': {
        'zh-TW': '正在測試連線...',
        'en-US': 'Testing connection...',
    },
    '提示': {
        'en-US': 'Notice',
    },
    '请先填写服务器地址': {
        'zh-TW': '請先填写服務器地址',
        'en-US': 'Please fill in server address first',
    },
    '请先测试服务器连接': {
        'zh-TW': '请先測試服务器連線',
        'en-US': 'Please test server connection first',
    },
    '登录失败！': {
        'zh-TW': '登录失敗！',
        'en-US': 'Login failed',
    },
    '咪咕音乐': {
        'zh-TW': '咪咕音樂',
        'en-US': 'Migu Music',
    },
    '插件管理': {
        'zh-TW': '外掛管理',
        'en-US': 'Plugins',
    },
    '操作台': {
        'en-US': 'Workspace',
    },
    '操作记录': {
        'zh-TW': '操作記錄',
        'en-US': 'Logs',
    },
    '智能标签': {
        'zh-TW': '智慧標籤',
        'en-US': 'Smart Tag',
    },
    '测试': {
        'zh-TW': '測試',
        'en-US': 'Test',
    },
    '系统设置': {
        'zh-TW': '系統設定',
        'en-US': 'Settings',
    },
    '网易云音乐': {
        'zh-TW': '網易雲音樂',
        'en-US': 'NetEase Cloud Music',
    },
    '酷我音乐': {
        'zh-TW': '酷我音樂',
        'en-US': 'Kuwo Music',
    },
    '酷狗音乐': {
        'zh-TW': '酷狗音樂',
        'en-US': 'Kugou Music',
    },
    '例如: /old/music/path/ 或 C:\\Music\\': {
        'en-US': 'Example: /old/music/path/ or C:\\Music\\',
    },
    'artist.details.stats.summary': {
        default: '{albumCount}张专辑 · {trackCount}首歌曲',
        'zh-TW': '{albumCount}張專輯 · {trackCount}首歌曲',
        'en-US': '{albumCount} albums · {trackCount} tracks',
    },
    '{albumCount} 张专辑 · {trackCount} 首歌曲': {
        default: '{albumCount} 张专辑 · {trackCount} 首歌曲',
        'zh-TW': '{albumCount} 張專輯 · {trackCount} 首歌曲',
        'en-US': '{albumCount} albums · {trackCount} tracks',
    },
    '这个风格还没有可播放内容。': {
        default: '这个风格还没有可播放内容。',
        'zh-TW': '這個風格還沒有可播放內容。',
        'en-US': 'This genre has no playable content yet.',
    },
    '收拢 {albumCount} 张专辑和 {trackCount} 首歌曲，适合按同一种气质连续聆听。': {
        default: '收拢 {albumCount} 张专辑和 {trackCount} 首歌曲，适合按同一种气质连续聆听。',
        'zh-TW': '收攏 {albumCount} 張專輯和 {trackCount} 首歌曲，適合按同一種氣質連續聆聽。',
        'en-US': 'Gather {albumCount} albums and {trackCount} tracks for a continuous listen in the same vibe.',
    },
    '已整理 {trackCount} 首歌曲，可以直接播放或随机听。': {
        default: '已整理 {trackCount} 首歌曲，可以直接播放或随机听。',
        'zh-TW': '已整理 {trackCount} 首歌曲，可以直接播放或隨機聽。',
        'en-US': 'Organized {trackCount} tracks, ready to play or shuffle.',
    },
    '已整理 {albumCount} 张专辑，可以从封面开始挑选。': {
        default: '已整理 {albumCount} 张专辑，可以从封面开始挑选。',
        'zh-TW': '已整理 {albumCount} 張專輯，可以從封面開始挑選。',
        'en-US': 'Organized {albumCount} albums, ready to browse by cover.',
    },
    '这里已经收集了 {albumCount} 张专辑和 {trackCount} 首歌曲，适合从同一种气质一路听下去。': {
        default: '这里已经收集了 {albumCount} 张专辑和 {trackCount} 首歌曲，适合从同一种气质一路听下去。',
        'zh-TW': '這裡已經收集了 {albumCount} 張專輯和 {trackCount} 首歌曲，適合從同一種氣質一路聽下去。',
        'en-US': 'Collected {albumCount} albums and {trackCount} tracks, perfect for listening through the same vibe.',
    },
    '这里已经整理出 {trackCount} 首歌曲，适合直接开播。': {
        default: '这里已经整理出 {trackCount} 首歌曲，适合直接开播。',
        'zh-TW': '這裡已經整理出 {trackCount} 首歌曲，適合直接開播。',
        'en-US': 'Organized {trackCount} tracks, ready to play.',
    },
    '这里已经整理出 {albumCount} 张专辑，可以从封面慢慢挑。': {
        default: '这里已经整理出 {albumCount} 张专辑，可以从封面慢慢挑。',
        'zh-TW': '這裡已經整理出 {albumCount} 張專輯，可以從封面慢慢挑。',
        'en-US': 'Organized {albumCount} albums, browse by covers.',
    },
    '{albumCount} / {trackCount}': {
        default: '{albumCount} / {trackCount}',
        'zh-TW': '{albumCount} / {trackCount}',
        'en-US': '{albumCount} / {trackCount}',
    },
    '热门歌曲': {
        'zh-TW': '熱門歌曲',
        'en-US': 'Top Tracks',
    },
    '最新专辑': {
        'zh-TW': '最新專輯',
        'en-US': 'Latest Albums',
    },
    '编辑艺术家信息': {
        'zh-TW': '編輯藝術家資訊',
        'en-US': 'Edit Artist Info',
    },
    '艺术家:': {
        'zh-TW': '藝術家:',
        'en-US': 'Artist:',
    },
    '艺术家封面:': {
        'zh-TW': '藝術家封面:',
        'en-US': 'Artist Cover:',
    },
    '艺术家封面': {
        'zh-TW': '藝術家封面',
        'en-US': 'Artist Cover',
    },
    '艺术家简介:': {
        'zh-TW': '藝術家簡介:',
        'en-US': 'Artist Bio:',
    },
    '删除艺术家': {
        'zh-TW': '刪除藝術家',
        'en-US': 'Delete Artist',
    },
    '从音乐收藏中删除此艺术家，但不会删除源文件。': {
        'zh-TW': '從音樂收藏中刪除此藝術家，但不會刪除來源檔案。',
        'en-US': 'Delete this artist from Music Library without deleting source files.',
    },
    '删除音乐: 将艺术家从音乐收藏中移除，同时删除艺术家名下的音乐文件。': {
        'zh-TW': '刪除音樂: 将藝術家从音樂收藏中移除，同时刪除藝術家名下的音樂文件。',
        'en-US': 'Delete Music: remove the artist from Music Library and delete the artist music files.',
    },
    '删除收藏: 将艺术家从音乐收藏中移除，但并不会删除音乐文件。': {
        'zh-TW': '刪除收藏: 将藝術家从音樂收藏中移除，但并不会刪除音樂文件。',
        'en-US': 'Remove from Favorites: remove the artist from Music Library without deleting music files.',
    },
    '未知错误': {
        'zh-TW': '未知錯誤',
        'en-US': 'Unknown error',
    },
    'HTTP错误: {status}': {
        'zh-TW': 'HTTP錯誤: {status}',
        'en-US': 'HTTP error: {status}',
    },
    '编辑流派/风格信息': {
        'zh-TW': '編輯流派/風格資訊',
        'en-US': 'Edit Genre Info',
    },
    '风格名称:': {
        'zh-TW': '風格名稱:',
        'en-US': 'Genre Name:',
    },
    '风格封面:': {
        'zh-TW': '風格封面:',
        'en-US': 'Genre Cover:',
    },
    '风格封面': {
        'zh-TW': '風格封面',
        'en-US': 'Genre Cover',
    },
    '删除风格': {
        'zh-TW': '刪除風格',
        'en-US': 'Delete Genre',
    },
    '从音乐收藏中删除此风格，但不会删除源文件。': {
        'zh-TW': '從音樂收藏中刪除此風格，但不會刪除來源檔案。',
        'en-US': 'Delete this genre from Music Library without deleting source files.',
    },
    '删除音乐: 将风格从音乐收藏中移除，同时删除该风格下的音乐文件。': {
        'zh-TW': '刪除音樂: 将風格从音樂收藏中移除，同时刪除該風格下的音樂文件。',
        'en-US': 'Delete Music: remove the genre from Music Library and delete its music files.',
    },
    '删除收藏: 将风格从音乐收藏中移除，但并不会删除音乐文件。': {
        'zh-TW': '刪除收藏: 将風格从音樂收藏中移除，但并不会刪除音樂文件。',
        'en-US': 'Remove from Favorites: remove the genre from Music Library without deleting music files.',
    },
    '刷新': {
        'zh-TW': '重新整理',
        'en-US': 'Refresh',
    },
    '配置': {
        'zh-TW': '配置',
        'en-US': 'Configure',
    },
    '测试中...': {
        'zh-TW': '測試中...',
        'en-US': 'Testing...',
    },
    '执行': {
        'zh-TW': '執行',
        'en-US': 'Run',
    },
    '标签源模板': {
        'zh-TW': '標籤源模板',
        'en-US': 'Tag Source Template',
    },
    '选择文件': {
        'zh-TW': '選擇檔案',
        'en-US': 'Choose File',
    },
    '上传插件': {
        'zh-TW': '上傳插件',
        'en-US': 'Upload Plugin',
    },
    '上传自定义插件': {
        'zh-TW': '上傳自訂插件',
        'en-US': 'Upload Custom Plugin',
    },
    '修改用户': {
        'zh-TW': '修改使用者',
        'en-US': 'Edit User',
    },
    'plugin.delete.confirm': {
        default: '确定要删除插件 "{name}" 吗？',
        'zh-TW': '確定要刪除插件 "{name}" 嗎？',
        'en-US': 'Are you sure you want to delete plugin "{name}"?',
    },
    '删除后将无法恢复，请谨慎操作！': {
        'zh-TW': '刪除後將無法恢復，請謹慎操作！',
        'en-US': 'This action cannot be undone. Proceed with caution.',
    },
    'plugin.reload.summary': {
        default: '发现 {total} 个插件，成功加载 {success} 个',
        'zh-TW': '發現 {total} 個插件，成功載入 {success} 個',
        'en-US': 'Discovered {total} plugins, loaded {success} successfully',
    },
    'plugin.reload.failedCount': {
        default: '{failed} 个插件加载失败，请检查插件文件',
        'zh-TW': '{failed} 個插件載入失敗，請檢查插件檔案',
        'en-US': '{failed} plugins failed to load, please check plugin files',
    },
    '插件系统重新加载失败': {
        'zh-TW': '插件系統重新載入失敗',
        'en-US': 'Plugin system reload failed',
    },
    '插件系统重新加载失败，将尝试普通刷新': {
        'zh-TW': '插件系統重新載入失敗，將嘗試一般刷新',
        'en-US': 'Plugin system reload failed, trying normal refresh',
    },
    '执行结果: {status} - {message}': {
        'zh-TW': '執行結果: {status} - {message}',
        'en-US': 'Execution result: {status} - {message}',
    },
    '插件 "{name}" 已成功上传': {
        'zh-TW': '插件 "{name}" 已成功上傳',
        'en-US': 'Plugin "{name}" uploaded successfully',
    },
    '仅支持 .py 文件，当前文件类型：.{ext}': {
        'zh-TW': '僅支持 .py 檔案，當前檔案類型：.{ext}',
        'en-US': 'Only .py files are supported. Current file type: .{ext}',
    },
    '文件过大：{size}。最大允许：{maxSize}': {
        'zh-TW': '檔案過大：{size}。最大允許：{maxSize}',
        'en-US': 'File too large: {size}. Maximum allowed: {maxSize}',
    },
    '无法从文件中识别插件信息，请确保文件包含必要的元数据注释': {
        'zh-TW': '無法從檔案中識別插件資訊，請確保檔案包含必要的中繼資料註解',
        'en-US': 'Unable to identify plugin metadata from file. Ensure required metadata comments are included.',
    },
    '已识别插件: {name}': {
        'zh-TW': '已識別插件: {name}',
        'en-US': 'Identified plugin: {name}',
    },
    '读取文件失败：{message}': {
        'zh-TW': '讀取檔案失敗：{message}',
        'en-US': 'Failed to read file: {message}',
    },
    '文件不是有效的文本格式': {
        'zh-TW': '檔案不是有效的文字格式',
        'en-US': 'The file is not valid text format',
    },
    '文件读取失败': {
        'zh-TW': '檔案讀取失敗',
        'en-US': 'File read failed',
    },
    'plugin.template.downloaded': {
        default: '{type} 插件模板已下载',
        'zh-TW': '{type} 插件模板已下載',
        'en-US': '{type} plugin template downloaded',
    },
    '标签源': {
        'zh-TW': '標籤源',
        'en-US': 'Tag Source',
    },
    '批量操作': {
        'zh-TW': '批量操作',
        'en-US': 'Batch Action',
    },
    '模板下载失败': {
        'zh-TW': '模板下載失敗',
        'en-US': 'Template download failed',
    },
    '离线': {
        'zh-TW': '離線',
        'en-US': 'Offline',
    },
    '禁用': {
        'zh-TW': '禁用',
        'en-US': 'Disabled',
    },
    '停用': {
        'zh-TW': '停用',
        'en-US': 'Deactivate',
    },
    '(无封面)': {
        'zh-TW': '(無封面)',
        'en-US': '(No cover)',
    },
    '(空)': {
        'zh-TW': '(空)',
        'en-US': '(Empty)',
    },
    '回退': {
        'zh-TW': '回退',
        'en-US': 'Restore',
    },
    '返回版本列表': {
        'zh-TW': '返回版本列表',
        'en-US': 'Back to Version List',
    },
    '查看差异': {
        'zh-TW': '查看差異',
        'en-US': 'View Diff',
    },
    '新增 {count}': {
        default: '新增 {count}',
        'zh-TW': '新增 {count}',
        'en-US': 'Added {count}',
    },
    '修改 {count}': {
        default: '修改 {count}',
        'zh-TW': '修改 {count}',
        'en-US': 'Modified {count}',
    },
    '删除 {count}': {
        default: '删除 {count}',
        'zh-TW': '刪除 {count}',
        'en-US': 'Deleted {count}',
    },
    '回退到此版本': {
        'zh-TW': '回退到此版本',
        'en-US': 'Restore to this version',
    },
    '字段详细对比': {
        'zh-TW': '欄位詳細對比',
        'en-US': 'Field Diff Details',
    },
    '对比版本': {
        'zh-TW': '對比版本',
        'en-US': 'Compared Version',
    },
    '当前选中版本': {
        'zh-TW': '當前選中版本',
        'en-US': 'Current Selected Version',
    },
    '测试失败: {message}': {
        'zh-TW': '測試失敗: {message}',
        'en-US': 'Test failed: {message}',
    },
    '登录失败': {
        'zh-TW': '登入失敗',
        'en-US': 'Login failed',
    },
    '网络错误,请检查服务器地址': {
        'zh-TW': '網路錯誤，請檢查伺服器地址',
        'en-US': 'Network error, please check the server address',
    },
    'Cron表达式': {
        'zh-TW': 'Cron 表達式',
        'en-US': 'Cron Expression',
    },
    '一次性执行': {
        'zh-TW': '一次性執行',
        'en-US': 'One-time Run',
    },
    '上次执行时间:': {
        'zh-TW': '上次執行時間:',
        'en-US': 'Last run time:',
    },
    '下发任务': {
        'zh-TW': '下發任務',
        'en-US': 'Schedule Task',
    },
    '不存在的音乐收藏': {
        'zh-TW': '不存在的音樂收藏',
        'en-US': 'Non-existent Library Items',
    },
    '为艺术家自动获取封面图。': {
        'zh-TW': '為藝術家自動獲取封面圖。',
        'en-US': 'Automatically fetch cover images for artists.',
    },
    '仅支持手动执行': {
        'zh-TW': '僅支持手動執行',
        'en-US': 'Manual execution only',
    },
    '分析中...': {
        'zh-TW': '分析中...',
        'en-US': 'Analyzing...',
    },
    '删除所有操作记录。': {
        'zh-TW': '刪除所有操作記錄。',
        'en-US': 'Delete all Operation Logs.',
    },
    '删除数据库中的数据，便于重新导入。': {
        'zh-TW': '刪除資料庫中的資料，便於重新導入。',
        'en-US': 'Delete database entries to allow re-import.',
    },
    '删除管理': {
        'zh-TW': '刪除管理',
        'en-US': 'Deletion Management',
    },
    '刮削艺术家封面': {
        'zh-TW': '刮削藝術家封面',
        'en-US': 'Scrape Artist Covers',
    },
    '刮削记录': {
        'zh-TW': '刮削記錄',
        'en-US': 'Scrape Logs',
    },
    '取消任务': {
        'zh-TW': '取消任務',
        'en-US': 'Cancel Task',
    },
    '合并相似艺术家': {
        'zh-TW': '合併相似藝術家',
        'en-US': 'Merge Similar Artists',
    },
    '同步清理已删除或不存在的音乐。': {
        'zh-TW': '同步清理已刪除或不存在的音樂。',
        'en-US': 'Synchronously clean up deleted or missing tracks.',
    },
    '周期执行': {
        'zh-TW': '週期執行',
        'en-US': 'Interval Run',
    },
    '定时执行': {
        'zh-TW': '定時執行',
        'en-US': 'Scheduled Run',
    },
    '已关闭': {
        'zh-TW': '已關閉',
        'en-US': 'Stopped',
    },
    '手动执行': {
        'zh-TW': '手動執行',
        'en-US': 'Manual Run',
    },
    '执行中...': {
        'zh-TW': '執行中...',
        'en-US': 'Running...',
    },
    '执行方式': {
        'zh-TW': '執行方式',
        'en-US': 'Execution Mode',
    },
    '执行过程中出现错误': {
        'zh-TW': '執行過程中出現錯誤',
        'en-US': 'An error occurred during execution',
    },
    '执行间隔(分钟)': {
        'zh-TW': '執行間隔(分鐘)',
        'en-US': 'Interval (minutes)',
    },
    '找到 {groupCount} 组相似艺术家，共 {detailCount} 条记录。请前往操作日志查看详情并进行合并操作。': {
        'zh-TW': '找到 {groupCount} 組相似藝術家，共 {detailCount} 條記錄。請前往操作日誌查看詳情並進行合併操作。',
        'en-US': 'Found {groupCount} groups of similar artists with {detailCount} records. Check Operation Logs for details and merge actions.',
    },
    '播放记录': {
        'zh-TW': '播放記錄',
        'en-US': 'Play History',
    },
    '未执行': {
        'zh-TW': '未執行',
        'en-US': 'Not run',
    },
    '清理刮削状态记录。': {
        'zh-TW': '清理刮削狀態記錄。',
        'en-US': 'Clean scrape status records.',
    },
    '清理首页播放记录。': {
        'zh-TW': '清理首頁播放記錄。',
        'en-US': 'Clean homepage play records.',
    },
    '生成合并建议，需在审计日志中手动确认。': {
        'zh-TW': '生成合併建議，需在審計日誌中手動確認。',
        'en-US': 'Generate merge suggestions that require manual confirmation in audit logs.',
    },
    '用于清理历史记录与冗余数据，执行前请谨慎确认。': {
        'zh-TW': '用於清理歷史記錄與冗餘資料，執行前請謹慎確認。',
        'en-US': 'Used to clean historical and redundant data. Confirm carefully before execution.',
    },
    '立即执行': {
        'zh-TW': '立即執行',
        'en-US': 'Run Now',
    },
    '运行中': {
        'zh-TW': '運行中',
        'en-US': 'Active',
    },
    '间隔(分钟)': {
        'zh-TW': '間隔(分鐘)',
        'en-US': 'Interval (minutes)',
    },
    '执行后请查看审计日志进行手动合并操作': {
        'zh-TW': '執行後請查看審計日誌進行手動合併操作',
        'en-US': 'After execution, check audit logs and manually merge as needed',
    },
    'worker.monitor.title': {
        default: 'Celery Worker 监控',
        'zh-TW': 'Celery Worker 監控',
        'en-US': 'Celery Worker Monitor',
    },
    'worker.monitor.connection.connected': {
        default: '已连接',
        'zh-TW': '已連線',
        'en-US': 'Connected',
    },
    'worker.monitor.connection.failed': {
        default: '连接失败',
        'zh-TW': '連線失敗',
        'en-US': 'Connection Failed',
    },
    'worker.monitor.desc': {
        default: '实时监控 Celery Worker 状态和任务执行情况',
        'zh-TW': '即時監控 Celery Worker 狀態與任務執行情況',
        'en-US': 'Monitor Celery worker status and task execution in real time',
    },
    'worker.monitor.activeCount': {
        default: '活跃任务: {count}',
        'zh-TW': '活躍任務: {count}',
        'en-US': 'Active tasks: {count}',
    },
    'worker.monitor.lastUpdated': {
        default: '最后更新:',
        'zh-TW': '最後更新:',
        'en-US': 'Last updated:',
    },
    'worker.monitor.activeTasksTitle': {
        default: '活跃任务 ({count})',
        'zh-TW': '活躍任務 ({count})',
        'en-US': 'Active Tasks ({count})',
    },
    'worker.monitor.idLabel': {
        default: 'ID:',
        'en-US': 'ID:',
    },
    'worker.monitor.stopping': {
        default: '停止中...',
        'zh-TW': '停止中...',
        'en-US': 'Stopping...',
    },
    'worker.monitor.reservedTasksTitle': {
        default: '预留任务 ({count})',
        'zh-TW': '預留任務 ({count})',
        'en-US': 'Reserved Tasks ({count})',
    },
    'worker.monitor.unknownTask': {
        default: '未知任务',
        'zh-TW': '未知任務',
        'en-US': 'Unknown Task',
    },
    'worker.monitor.taskIdLabel': {
        default: '任务ID:',
        'zh-TW': '任務ID:',
        'en-US': 'Task ID:',
    },
    'worker.monitor.checkCelery': {
        default: '请检查 Celery 服务状态',
        'zh-TW': '請檢查 Celery 服務狀態',
        'en-US': 'Please check Celery service status',
    },
    'worker.monitor.unknown': {
        default: '未知',
        'zh-TW': '未知',
        'en-US': 'Unknown',
    },
    'worker.monitor.duration.seconds': {
        default: '{duration}秒',
        'zh-TW': '{duration}秒',
        'en-US': '{duration}s',
    },
    'worker.monitor.duration.minutesSeconds': {
        default: '{minutes}分 {seconds}秒',
        'zh-TW': '{minutes}分 {seconds}秒',
        'en-US': '{minutes}m {seconds}s',
    },
    'worker.monitor.duration.hoursMinutes': {
        default: '{hours}小时 {minutes}分',
        'zh-TW': '{hours}小時 {minutes}分',
        'en-US': '{hours}h {minutes}m',
    },
    'worker.monitor.taskStopped': {
        default: '任务 {taskId} 已停止',
        'zh-TW': '任務 {taskId} 已停止',
        'en-US': 'Task {taskId} has been stopped',
    },
    'worker.monitor.stopError': {
        default: '停止任务时发生错误',
        'zh-TW': '停止任務時發生錯誤',
        'en-US': 'An error occurred while stopping the task',
    },
    'batch.toolbar.selectedCount': {
        default: '已选择 {count} 首',
        'zh-TW': '已選擇 {count} 首',
        'en-US': '{count} selected',
    },
    'batch.toolbar.clearSelection': {
        default: '取消选择',
        'zh-TW': '取消選擇',
        'en-US': 'Clear Selection',
    },
    'batch.toolbar.addedToQueue': {
        default: '已添加 {count} 首到队列',
        'zh-TW': '已加入 {count} 首到佇列',
        'en-US': 'Added {count} tracks to queue',
    },
    'batch.toolbar.removedFromQueue': {
        default: '已从队列移除 {count} 首',
        'zh-TW': '已從佇列移除 {count} 首',
        'en-US': 'Removed {count} tracks from queue',
    },
    'batch.toolbar.addedToNext': {
        default: '已添加 {count} 首为下一首',
        'zh-TW': '已加入 {count} 首為下一首',
        'en-US': 'Added {count} tracks as next up',
    },
    'batch.toolbar.addedToPlaylist': {
        default: '已添加 {count} 首到播放列表',
        'zh-TW': '已加入 {count} 首到播放清單',
        'en-US': 'Added {count} tracks to playlist',
    },
    'batch.toolbar.addingToFavorite': {
        default: '正在添加到喜爱...',
        'zh-TW': '正在加入喜愛...',
        'en-US': 'Adding to favorites...',
    },
    'batch.toolbar.successFailed': {
        default: '成功 {succeeded} 首，失败 {failed} 首',
        'zh-TW': '成功 {succeeded} 首，失敗 {failed} 首',
        'en-US': 'Succeeded {succeeded}, failed {failed}',
    },
    'batch.toolbar.successOnly': {
        default: '成功 {succeeded} 首',
        'zh-TW': '成功 {succeeded} 首',
        'en-US': 'Succeeded {succeeded}',
    },
    'batch.toolbar.removingFromPlaylist': {
        default: '正在从播放列表移除...',
        'zh-TW': '正在從播放清單移除...',
        'en-US': 'Removing from playlist...',
    },
    'batch.toolbar.removedFromPlaylist': {
        default: '已从播放列表移除 {count} 首',
        'zh-TW': '已從播放清單移除 {count} 首',
        'en-US': 'Removed {count} tracks from playlist',
    },
    'batch.toolbar.confirmDelete': {
        default: '确定要删除选中的 {count} 首歌曲吗？',
        'zh-TW': '確定要刪除選中的 {count} 首歌曲嗎？',
        'en-US': 'Delete {count} selected tracks?',
    },
    'batch.toolbar.deleting': {
        default: '正在删除...',
        'zh-TW': '正在刪除...',
        'en-US': 'Deleting...',
    },
    'batch.toolbar.deletingProgress': {
        default: '正在删除 ({current}/{total})',
        'zh-TW': '正在刪除 ({current}/{total})',
        'en-US': 'Deleting ({current}/{total})',
    },
    'batch.toolbar.deleteDoneWithFail': {
        default: '删除完成：成功 {succeeded} 首，失败 {failed} 首',
        'zh-TW': '刪除完成：成功 {succeeded} 首，失敗 {failed} 首',
        'en-US': 'Delete done: succeeded {succeeded}, failed {failed}',
    },
    'batch.toolbar.deleteDone': {
        default: '删除完成：成功 {succeeded} 首',
        'zh-TW': '刪除完成：成功 {succeeded} 首',
        'en-US': 'Delete done: succeeded {succeeded}',
    },
    '移出队列': {
        'zh-TW': '移出佇列',
        'en-US': 'Remove from Queue',
    },
    '添加下一首': {
        'zh-TW': '加入下一首',
        'en-US': 'Play Next',
    },
    '移出喜爱': {
        'zh-TW': '移出喜愛',
        'en-US': 'Remove from Favorites',
    },
    '移出播放列表': {
        'zh-TW': '移出播放清單',
        'en-US': 'Remove from Playlist',
    },
    '加入队列': {
        'zh-TW': '加入佇列',
        'en-US': 'Add to Queue',
    },
    '取消选择': {
        'zh-TW': '取消選擇',
        'en-US': 'Clear Selection',
    },
    '已回退到版本 v{version}': {
        'zh-TW': '已回退到版本 v{version}',
        'en-US': 'Rolled back to version v{version}',
    },
    '编辑': {
        'zh-TW': '編輯',
        'en-US': 'Edit',
    },
    '完成': {
        'zh-TW': '完成',
        'en-US': 'Done',
    },
    '第 {page} 页': {
        'zh-TW': '第 {page} 頁',
        'en-US': 'Page {page}',
    },
    'AI 推荐候选项': {
        'zh-TW': 'AI 推薦候選項',
        'en-US': 'AI Recommended Candidate',
    },
    '置信度: {percent}%': {
        'zh-TW': '置信度: {percent}%',
        'en-US': 'Confidence: {percent}%',
    },
    '推荐理由': {
        'zh-TW': '推薦理由',
        'en-US': 'Recommendation Reason',
    },
    '应用此候选项': {
        'zh-TW': '套用此候選項',
        'en-US': 'Apply This Candidate',
    },
    '警告：删除文件操作': {
        'zh-TW': '警告：刪除檔案操作',
        'en-US': 'Warning: Delete File Operation',
    },
    '确认删除': {
        'zh-TW': '確認刪除',
        'en-US': 'Confirm Delete',
    },
    '警告：批量删除文件操作': {
        'zh-TW': '警告：批次刪除檔案操作',
        'en-US': 'Warning: Batch Delete Operation',
    },
    '确认全部删除': {
        'zh-TW': '確認全部刪除',
        'en-US': 'Confirm Delete All',
    },
    '获取音乐元数据失败': {
        'zh-TW': '獲取音樂元資料失敗',
        'en-US': 'Failed to fetch music metadata',
    },
    'AI 分析后认为所有候选项匹配度较低，建议手动选择': {
        'zh-TW': 'AI 分析後認為所有候選項匹配度較低，建議手動選擇',
        'en-US': 'AI found low confidence for all candidates, please choose manually',
    },
    'AI 决策失败': {
        'zh-TW': 'AI 決策失敗',
        'en-US': 'AI decision failed',
    },
    '确定要对 {count} 个待候选项进行批量 AI 候选吗？': {
        'zh-TW': '確定要對 {count} 個待候選項進行批量 AI 候選嗎？',
        'en-US': 'Run batch AI candidate selection for {count} pending items?',
    },
    '已存在标签,无需再刮削': {
        'zh-TW': '已存在標籤，無需再刮削',
        'en-US': 'Tags already exist, no scraping needed',
    },
    '从列表选择封面 ({count})': {
        'zh-TW': '從清單選擇封面 ({count})',
        'en-US': 'Choose cover from list ({count})',
    },
    '保存信息': {
        'zh-TW': '儲存資訊',
        'en-US': 'Save Metadata',
    },
    '内容编辑': {
        'zh-TW': '內容編輯',
        'en-US': 'Content Editing',
    },
    '分类标签': {
        'zh-TW': '分類標籤',
        'en-US': 'Category Tags',
    },
    '媒体文件': {
        'zh-TW': '媒體檔案',
        'en-US': 'Media Files',
    },
    '已从 {source} 获取歌词': {
        'zh-TW': '已從 {source} 取得歌詞',
        'en-US': 'Lyrics fetched from {source}',
    },
    '已选择《{album}》的封面': {
        'zh-TW': '已選擇《{album}》的封面',
        'en-US': 'Selected cover from \"{album}\"',
    },
    '找到 {count} 个结果': {
        'zh-TW': '找到 {count} 個結果',
        'en-US': '{count} results found',
    },
    '技术参数': {
        'zh-TW': '技術參數',
        'en-US': 'Technical Parameters',
    },
    '文件属性': {
        'zh-TW': '檔案屬性',
        'en-US': 'File Attributes',
    },
    '未命名': {
        'zh-TW': '未命名',
        'en-US': 'Untitled',
    },
    '未找到歌词': {
        'zh-TW': '未找到歌詞',
        'en-US': 'Lyrics not found',
    },
    '核心字段': {
        'zh-TW': '核心欄位',
        'en-US': 'Core Fields',
    },
    '翻译服务不可用': {
        'zh-TW': '翻譯服務不可用',
        'en-US': 'Translation service unavailable',
    },
    '请输入标题': {
        'zh-TW': '請輸入標題',
        'en-US': 'Enter title',
    },
    '输入$查看支持的变量': {
        'zh-TW': '輸入$查看支援的變數',
        'en-US': 'Type $ to view supported variables',
    },
    '附加信息': {
        'zh-TW': '附加資訊',
        'en-US': 'Additional Info',
    },
    'HTTP错误: {status}': {
        'zh-TW': 'HTTP錯誤: {status}',
        'en-US': 'HTTP error: {status}',
    },
    '普通(album;album)': {
        'zh-TW': '普通(album;album)',
        'en-US': 'Album (album;album)',
    },
    'EP(ep)': {
        'zh-TW': 'EP(ep)',
        'en-US': 'EP (ep)',
    },
    '合集(album;compilation)': {
        'zh-TW': '合集(album;compilation)',
        'en-US': 'Compilation (album;compilation)',
    },
    '现场(album;live)': {
        'zh-TW': '現場(album;live)',
        'en-US': 'Live (album;live)',
    },
    '混音(album;remix)': {
        'zh-TW': '混音(album;remix)',
        'en-US': 'Remix (album;remix)',
    },
    '原声(album;soundtrack)': {
        'zh-TW': '原聲(album;soundtrack)',
        'en-US': 'Soundtrack (album;soundtrack)',
    },
    '演示(album;demo)': {
        'zh-TW': '演示(album;demo)',
        'en-US': 'Demo (album;demo)',
    },
    '单曲(single)': {
        'zh-TW': '單曲(single)',
        'en-US': 'Single (single)',
    },
    '流行': {
        'zh-TW': '流行',
        'en-US': 'Pop',
    },
    '摇滚': {
        'zh-TW': '搖滾',
        'en-US': 'Rock',
    },
    '说唱': {
        'zh-TW': '說唱',
        'en-US': 'Rap',
    },
    '民谣': {
        'zh-TW': '民謠',
        'en-US': 'Folk',
    },
    '电子': {
        'zh-TW': '電子',
        'en-US': 'Electronic',
    },
    '爵士': {
        'zh-TW': '爵士',
        'en-US': 'Jazz',
    },
    '纯音乐': {
        'zh-TW': '純音樂',
        'en-US': 'Instrumental',
    },
    '金属': {
        'zh-TW': '金屬',
        'en-US': 'Metal',
    },
    '古典': {
        'zh-TW': '古典',
        'en-US': 'Classical',
    },
    '独立': {
        'zh-TW': '獨立',
        'en-US': 'Indie',
    },
    '英文': {
        'zh-TW': '英文',
        'en-US': 'English',
    },
    '日文': {
        'zh-TW': '日文',
        'en-US': 'Japanese',
    },
    '韩文': {
        'zh-TW': '韓文',
        'en-US': 'Korean',
    },
    '法文': {
        'zh-TW': '法文',
        'en-US': 'French',
    },
    '泰文': {
        'zh-TW': '泰文',
        'en-US': 'Thai',
    },
    '自动识别': {
        'zh-TW': '自動識別',
        'en-US': 'Auto Detect',
    },
    'QQ音乐': {
        'en-US': 'QQ Music',
    },
    '⚠️ 请先勾选"复制文件"选项': {
        'zh-TW': '⚠️ 請先勾選「複製檔案」選項',
        'en-US': '⚠️ Please enable "Copy Files" first',
    },
    '上次刮削时间: {time}': {
        'zh-TW': '上次刮削時間: {time}',
        'en-US': 'Last scrape time: {time}',
    },
    '不判断': {
        'en-US': 'No preference',
    },
    '不整理': {
        'zh-TW': '不整理',
        'en-US': 'Do Not Organize',
    },
    '以下文件已被成功删除，操作不可撤销': {
        'zh-TW': '以下檔案已被成功刪除，操作不可撤銷',
        'en-US': 'The following files were deleted successfully and cannot be recovered',
    },
    '保存并关闭': {
        'zh-TW': '儲存並關閉',
        'en-US': 'Save and Close',
    },
    '保存配置': {
        'zh-TW': '儲存設定',
        'en-US': 'Save Config',
    },
    '保持原目录,不进行任何整理或转移操作': {
        'zh-TW': '保持原目錄，不進行任何整理或轉移',
        'en-US': 'Keep original folders without organizing or moving',
    },
    '元数据相同': {
        'zh-TW': '元資料相同',
        'en-US': 'Same Metadata',
    },
    '删除 {count} 项': {
        'zh-TW': '刪除 {count} 項',
        'en-US': 'Delete {count} items',
    },
    '删除不含有后缀名': {
        'zh-TW': '刪除不含後綴名',
        'en-US': 'Delete names without suffix',
    },
    '删除含有后缀名': {
        'zh-TW': '刪除含後綴名',
        'en-US': 'Delete names with suffix',
    },
    '删除此文件': {
        'zh-TW': '刪除此檔案',
        'en-US': 'Delete This File',
    },
    '删除较大文件': {
        'zh-TW': '刪除較大檔案',
        'en-US': 'Delete larger file',
    },
    '删除较大比特率': {
        'zh-TW': '刪除較高位元率',
        'en-US': 'Delete higher bitrate',
    },
    '删除较大采样率': {
        'zh-TW': '刪除較高採樣率',
        'en-US': 'Delete higher sample rate',
    },
    '删除较小文件': {
        'zh-TW': '刪除較小檔案',
        'en-US': 'Delete smaller file',
    },
    '删除较小比特率': {
        'zh-TW': '刪除較低位元率',
        'en-US': 'Delete lower bitrate',
    },
    '删除较小采样率': {
        'zh-TW': '刪除較低採樣率',
        'en-US': 'Delete lower sample rate',
    },
    '刮削周期配置': {
        'zh-TW': '刮削週期設定',
        'en-US': 'Scrape Schedule',
    },
    '原始文件': {
        'zh-TW': '原始檔案',
        'en-US': 'Original File',
    },
    '可自动从音乐流媒体平台搜索元数据实行刮削操作': {
        'zh-TW': '可自動從音樂串流平台搜尋元資料執行刮削',
        'en-US': 'Automatically scrape metadata from music streaming platforms',
    },
    '可自定义修改音乐元数据中的内容，例如：重命名文件、导出歌词文件、导出封面图片等': {
        'zh-TW': '可自訂修改音樂元資料，例如重新命名、匯出歌詞與封面',
        'en-US': 'Customize metadata changes, such as rename, export lyrics, and export cover images',
    },
    '名称重复': {
        'zh-TW': '名稱重複',
        'en-US': 'Same Name',
    },
    '后台刮削的监控目录，会对该目录下新增的音乐文件进行以下一系列操作': {
        'zh-TW': '後台刮削監控目錄會對新增音樂檔案執行以下操作',
        'en-US': 'The monitored folder will apply the following operations to newly added files',
    },
    '后台刮削设置': {
        'zh-TW': '後台刮削設定',
        'en-US': 'Background Scraping Settings',
    },
    '声纹相同': {
        'zh-TW': '聲紋相同',
        'en-US': 'Same Fingerprint',
    },
    '复制文件': {
        'zh-TW': '複製檔案',
        'en-US': 'Copy Files',
    },
    '复制文件配置': {
        'zh-TW': '複製檔案設定',
        'en-US': 'Copy File Settings',
    },
    '复制音乐文件到指定目录，可选择复制文件本体或生成strm文件': {
        'zh-TW': '複製音樂到指定目錄，可複製本體或生成 strm',
        'en-US': 'Copy music files to target directory or generate STRM files',
    },
    '复制音乐文件到指定目录，可选择复制文件本体或生成strm流媒体文件': {
        'zh-TW': '複製音樂到指定目錄，可複製本體或生成 strm 串流檔案',
        'en-US': 'Copy music files to target directory or generate STRM streaming files',
    },
    '完全相同': {
        'zh-TW': '完全相同',
        'en-US': 'Exactly Same',
    },
    '对标题、艺术家、专辑名进行乱码修复': {
        'zh-TW': '修復標題、藝術家、專輯名稱亂碼',
        'en-US': 'Fix mojibake in title, artist, and album',
    },
    '将文件以源目录层级转移到固定completed或failed目录下': {
        'zh-TW': '按原目錄層級轉移到 completed 或 failed 目錄',
        'en-US': 'Move files by source hierarchy into fixed completed/failed folders',
    },
    '将文件以规定的格式整理到统一目录下': {
        'zh-TW': '按規定格式整理到統一目錄',
        'en-US': 'Organize files into a unified directory by configured format',
    },
    '将繁体标题、艺术家、专辑名转换为简体，如本来就是简体，则不会进行转换': {
        'zh-TW': '將繁體標題、藝術家、專輯轉為簡體，若已是簡體則不處理',
        'en-US': 'Convert Traditional Chinese metadata to Simplified Chinese when needed',
    },
    '当音乐文件缺少艺术家或专辑元数据时, 使用声纹识别进行预匹配': {
        'zh-TW': '當缺少藝術家或專輯元資料時，使用聲紋辨識預匹配',
        'en-US': 'Use fingerprint pre-matching when artist or album metadata is missing',
    },
    '您即将删除 {count} 个文件，此操作不可撤销！': {
        'zh-TW': '您即將刪除 {count} 個檔案，此操作不可撤銷！',
        'en-US': 'You are about to delete {count} files. This action cannot be undone!',
    },
    '成功删除 {count} 个文件！': {
        'zh-TW': '成功刪除 {count} 個檔案！',
        'en-US': 'Successfully deleted {count} files!',
    },
    '手动刮削配置': {
        'zh-TW': '手動刮削設定',
        'en-US': 'Manual Scraping Settings',
    },
    '批量选择文件A': {
        'zh-TW': '批量選擇檔案 A',
        'en-US': 'Batch Select File A',
    },
    '批量选择文件B': {
        'zh-TW': '批量選擇檔案 B',
        'en-US': 'Batch Select File B',
    },
    '整理文件夹，按一级目录，二级目录选定的信息分类': {
        'zh-TW': '整理資料夾，按一級與二級目錄設定分類',
        'en-US': 'Organize folders by selected first-level and second-level directory fields',
    },
    '文件信息加载中...': {
        'zh-TW': '檔案資訊載入中...',
        'en-US': 'Loading file info...',
    },
    '文件整理配置': {
        'zh-TW': '檔案整理設定',
        'en-US': 'File Organization Settings',
    },
    '智能删除': {
        'zh-TW': '智慧刪除',
        'en-US': 'Smart Delete',
    },
    '歌词(LRC文件)': {
        'zh-TW': '歌詞(LRC檔案)',
        'en-US': 'Lyrics (LRC file)',
    },
    '添加目录层级': {
        'zh-TW': '新增目錄層級',
        'en-US': 'Add Directory Level',
    },
    '监控目录配置': {
        'zh-TW': '監控目錄設定',
        'en-US': 'Monitored Directory Settings',
    },
    '确认删除 {count} 个文件': {
        'zh-TW': '確認刪除 {count} 個檔案',
        'en-US': 'Confirm deleting {count} files',
    },
    '确认删除文件': {
        'zh-TW': '確認刪除檔案',
        'en-US': 'Confirm File Deletion',
    },
    '确认批量删除': {
        'zh-TW': '確認批次刪除',
        'en-US': 'Confirm Batch Deletion',
    },
    '移动': {
        'zh-TW': '移動',
        'en-US': 'Move',
    },
    '第 {level} 层目录': {
        'zh-TW': '第 {level} 層目錄',
        'en-US': 'Level {level} directory',
    },
    '自动刮削配置': {
        'zh-TW': '自動刮削設定',
        'en-US': 'Auto Scraping Settings',
    },
    '这些文件内容完全相同,建议保留其中一个即可': {
        'zh-TW': '這些檔案內容完全相同，建議保留其中一個',
        'en-US': 'These files are identical. Keep one of them',
    },
    '这些文件名称相同但内容可能不同,请仔细对比后再删除': {
        'zh-TW': '這些檔案名稱相同但內容可能不同，請比較後再刪除',
        'en-US': 'These files share the same name but may differ in content. Compare before deleting',
    },
    '这些文件的标题艺术家相同,但可能是不同专辑的版本': {
        'zh-TW': '這些檔案標題與藝術家相同，但可能來自不同專輯版本',
        'en-US': 'These files share title and artist but may belong to different album versions',
    },
    '这些文件的音频内容相同,但可能是不同格式或质量的版本': {
        'zh-TW': '這些檔案音訊內容相同，但可能為不同格式或品質版本',
        'en-US': 'These files have the same audio content but may differ in format or quality',
    },
    '部署Docker应用时，需额外映射一个自定义目录到此路径，用于后台刮削监控的目录。': {
        'zh-TW': '部署 Docker 時需額外映射自訂目錄到此路徑作為監控目錄。',
        'en-US': 'When deploying with Docker, map an extra custom directory to this path for background scraping monitor',
    },
    '配置扫描周期': {
        'zh-TW': '配置掃描週期',
        'en-US': 'Configure Scan Interval',
    },
    '重名文件': {
        'zh-TW': '重名檔案',
        'en-US': 'Same-name File',
    },
    '重复文件': {
        'zh-TW': '重複檔案',
        'en-US': 'Duplicate File',
    },
    '音乐洗版就是按以下规则换更好的版本': {
        'zh-TW': '音樂洗版會依以下規則替換為更好的版本',
        'en-US': 'Music remastering replaces files with better versions by the rules below',
    },
    'A-Z排序': {
        default: 'A-Z排序',
        'zh-TW': 'A-Z排序',
        'en-US': 'A-Z Sort',
    },
    '{count}首歌曲 · {owner}': {
        default: '{count}首歌曲 · {owner}',
        'zh-TW': '{count}首歌曲 · {owner}',
        'en-US': '{count} tracks · {owner}',
    },
    '不包含': {
        default: '不包含',
        'zh-TW': '不包含',
        'en-US': 'Does not contain',
    },
    '不是': {
        default: '不是',
        'zh-TW': '不是',
        'en-US': 'Is not',
    },
    '专辑图片': {
        default: '专辑图片',
        'zh-TW': '專輯圖片',
        'en-US': 'Album image',
    },
    '列表去重复': {
        default: '列表去重复',
        'zh-TW': '列表去重複',
        'en-US': 'Remove duplicates',
    },
    '动态歌单': {
        default: '动态歌单',
        'zh-TW': '動態歌單',
        'en-US': 'Dynamic playlist',
    },
    '包含': {
        default: '包含',
        'zh-TW': '包含',
        'en-US': 'Contains',
    },
    '大于': {
        default: '大于',
        'zh-TW': '大於',
        'en-US': 'Greater than',
    },
    '导入一个播放列表，支持 m3u8 文件。': {
        default: '导入一个播放列表，支持 m3u8 文件。',
        'zh-TW': '匯入一個播放列表，支援 m3u8 檔案。',
        'en-US': 'Import a playlist. m3u8 files are supported.',
    },
    '导入完成但有警告！': {
        default: '导入完成但有警告！',
        'zh-TW': '匯入完成但有警告！',
        'en-US': 'Import completed with warnings!',
    },
    '导出播放列表': {
        default: '导出播放列表',
        'zh-TW': '匯出播放列表',
        'en-US': 'Export playlist',
    },
    '小于': {
        default: '小于',
        'zh-TW': '小於',
        'en-US': 'Less than',
    },
    '小爱音箱播放': {
        default: '小爱音箱播放',
        'zh-TW': '小愛音箱播放',
        'en-US': 'Play on Xiaoai speaker',
    },
    '开头是': {
        default: '开头是',
        'zh-TW': '開頭是',
        'en-US': 'Starts with',
    },
    '成功导入 {found}/{total} 首歌曲 (成功率: {rate}%)': {
        default: '成功导入 {found}/{total} 首歌曲 (成功率: {rate}%)',
        'zh-TW': '成功匯入 {found}/{total} 首歌曲 (成功率: {rate}%)',
        'en-US': 'Imported {found}/{total} tracks (success rate: {rate}%)',
    },
    '未匹配或存在歧义: {count} 个文件': {
        default: '未匹配或存在歧义: {count} 个文件',
        'zh-TW': '未匹配或存在歧义: {count} 個檔案',
        'en-US': 'Unmatched or ambiguous: {count} files',
    },
    '重复歌曲已跳过: {count} 条': {
        default: '重复歌曲已跳过: {count} 条',
        'zh-TW': '已跳過重複歌曲: {count} 條',
        'en-US': 'Duplicate tracks skipped: {count}',
    },
    '播放列表共 {count} 首歌曲': {
        default: '播放列表共 {count} 首歌曲',
        'zh-TW': '播放列表共 {count} 首歌曲',
        'en-US': '{count} tracks in this playlist',
    },
    '替换规则: {from} → {to}': {
        default: '替换规则: {from} → {to}',
        'zh-TW': '替換規則: {from} → {to}',
        'en-US': 'Replacement rule: {from} → {to}',
    },
    '最少播放': {
        default: '最少播放',
        'zh-TW': '最少播放',
        'en-US': 'Least played',
    },
    '最常播放': {
        default: '最常播放',
        'zh-TW': '最常播放',
        'en-US': 'Most played',
    },
    '最早播放': {
        default: '最早播放',
        'zh-TW': '最早播放',
        'en-US': 'Earliest played',
    },
    '最早添加': {
        default: '最早添加',
        'zh-TW': '最早添加',
        'en-US': 'Earliest added',
    },
    '最近添加': {
        default: '最近添加',
        'zh-TW': '最近添加',
        'en-US': 'Recently added',
    },
    '标记为喜爱的专辑': {
        default: '标记为喜爱的专辑',
        'zh-TW': '標記為喜愛的專輯',
        'en-US': 'Favorite album',
    },
    '标记为喜爱的歌曲': {
        default: '标记为喜爱的歌曲',
        'zh-TW': '標記為喜愛的歌曲',
        'en-US': 'Favorite track',
    },
    '标记为喜爱的艺术家': {
        default: '标记为喜爱的艺术家',
        'zh-TW': '標記為喜愛的藝術家',
        'en-US': 'Favorite artist',
    },
    '标记为过滤列表': {
        default: '标记为过滤列表',
        'zh-TW': '標記為過濾列表',
        'en-US': 'Mark as filtered playlist',
    },
    '由{owner} 创建于{date}': {
        default: '由{owner} 创建于{date}',
        'zh-TW': '由{owner} 建立於{date}',
        'en-US': 'Created by {owner} on {date}',
    },
    '等 {count} 个文件': {
        default: '等 {count} 个文件',
        'zh-TW': '等 {count} 個檔案',
        'en-US': 'and {count} more files',
    },
    '结尾是': {
        default: '结尾是',
        'zh-TW': '結尾是',
        'en-US': 'Ends with',
    },
    '编辑智能歌单规则': {
        default: '编辑智能歌单规则',
        'zh-TW': '編輯智能歌單規則',
        'en-US': 'Edit smart playlist rules',
    },
    '缺失文件示例: {files}': {
        default: '缺失文件示例: {files}',
        'zh-TW': '缺失檔案示例: {files}',
        'en-US': 'Missing file examples: {files}',
    },
    '艺术家图片': {
        default: '艺术家图片',
        'zh-TW': '藝術家圖片',
        'en-US': 'Artist image',
    },
    '警告: {count} 个文件在替换路径下未找到': {
        default: '警告: {count} 个文件在替换路径下未找到',
        'zh-TW': '警告: {count} 個檔案在替換路徑下未找到',
        'en-US': 'Warning: {count} files were not found under the replaced path',
    },
    '评分': {
        default: '评分',
        'zh-TW': '評分',
        'en-US': 'Rating',
    },
    '距离最近播放': {
        default: '距离最近播放',
        'zh-TW': '距離最近播放',
        'en-US': 'Since last played',
    },
    '距离最近添加': {
        default: '距离最近添加',
        'zh-TW': '距離最近添加',
        'en-US': 'Since added',
    },
    '路径替换: {count} 个文件': {
        default: '路径替换: {count} 个文件',
        'zh-TW': '路徑替換: {count} 個檔案',
        'en-US': 'Path replacement: {count} files',
    },
    '过滤歌单': {
        default: '过滤歌单',
        'zh-TW': '過濾歌單',
        'en-US': 'Filtered playlist',
    },
    '随机': {
        default: '随机',
        'zh-TW': '隨機',
        'en-US': 'Random',
    },
    '{count} 首歌曲': {
        default: '{count} 首歌曲',
        'zh-TW': '{count} 首歌曲',
        'en-US': '{count} tracks',
    },
    '{count} 首': {
        default: '{count} 首',
        'zh-TW': '{count} 首',
        'en-US': '{count} tracks',
    },
    '{count}分钟前': {
        default: '{count}分钟前',
        'zh-TW': '{count}分鐘前',
        'en-US': '{count} minutes ago',
    },
    '{count}天前': {
        default: '{count}天前',
        'zh-TW': '{count}天前',
        'en-US': '{count} days ago',
    },
    '{count}小时前': {
        default: '{count}小时前',
        'zh-TW': '{count}小時前',
        'en-US': '{count} hours ago',
    },
    '分享时间：{time}': {
        default: '分享时间：{time}',
        'zh-TW': '分享時間：{time}',
        'en-US': 'Shared at: {time}',
    },
    '最近更新：{time}': {
        default: '最近更新：{time}',
        'zh-TW': '最近更新：{time}',
        'en-US': 'Recently updated: {time}',
    },
    '分享管理': {
        default: '分享管理',
        'zh-TW': '分享管理',
        'en-US': 'Share Management',
    },
    '分享给选中用户': {
        default: '分享给选中用户',
        'zh-TW': '分享給選中用戶',
        'en-US': 'Share to selected users',
    },
    '创建分享': {
        default: '创建分享',
        'zh-TW': '建立分享',
        'en-US': 'Create Share',
    },
    '复制中...': {
        default: '复制中...',
        'zh-TW': '複製中...',
        'en-US': 'Copying...',
    },
    '复制到我的播放列表': {
        default: '复制到我的播放列表',
        'zh-TW': '複製到我的播放列表',
        'en-US': 'Copy to my playlists',
    },
    '复制链接': {
        default: '复制链接',
        'zh-TW': '複製連結',
        'en-US': 'Copy Link',
    },
    '密码错误': {
        default: '密码错误',
        'zh-TW': '密碼錯誤',
        'en-US': 'Incorrect password',
    },
    '已撤销': {
        default: '已撤销',
        'zh-TW': '已撤銷',
        'en-US': 'Revoked',
    },
    '已选择 {count} 个用户：': {
        default: '已选择 {count} 个用户：',
        'zh-TW': '已選擇 {count} 個用戶：',
        'en-US': '{count} users selected:',
    },
    '当前选择: {value} (类型: {type})': {
        default: '当前选择: {value} (类型: {type})',
        'zh-TW': '目前選擇: {value} (類型: {type})',
        'en-US': 'Current value: {value} (type: {type})',
    },
    '成功分享给 {count} 个用户！': {
        default: '成功分享给 {count} 个用户！',
        'zh-TW': '成功分享給 {count} 個用戶！',
        'en-US': 'Shared successfully with {count} users!',
    },
    '撤销': {
        default: '撤销',
        'zh-TW': '撤銷',
        'en-US': 'Revoke',
    },
    '无法访问此分享': {
        default: '无法访问此分享',
        'zh-TW': '無法訪問此分享',
        'en-US': 'Cannot access this share',
    },
    '暂无分享记录': {
        default: '暂无分享记录',
        'zh-TW': '暫無分享記錄',
        'en-US': 'No shared records',
    },
    '有效': {
        default: '有效',
        'zh-TW': '有效',
        'en-US': 'Active',
    },
    '未找到匹配的用户': {
        default: '未找到匹配的用户',
        'zh-TW': '未找到匹配的用戶',
        'en-US': 'No matching users found',
    },
    '未知用户': {
        default: '未知用户',
        'zh-TW': '未知用戶',
        'en-US': 'Unknown user',
    },
    '此播放列表暂无歌曲': {
        default: '此播放列表暂无歌曲',
        'zh-TW': '此播放列表暫無歌曲',
        'en-US': 'This playlist has no tracks',
    },
    '此播放列表由 {user} 分享': {
        default: '此播放列表由 {user} 分享',
        'zh-TW': '此播放列表由 {user} 分享',
        'en-US': 'This playlist was shared by {user}',
    },
    '生成中...': {
        default: '生成中...',
        'zh-TW': '生成中...',
        'en-US': 'Generating...',
    },
    '生成分享链接': {
        default: '生成分享链接',
        'zh-TW': '生成分享連結',
        'en-US': 'Generate share link',
    },
    '确定要撤销此分享吗？撤销后分享链接将失效。': {
        default: '确定要撤销此分享吗？撤销后分享链接将失效。',
        'zh-TW': '確定要撤銷此分享嗎？撤銷後分享連結將失效。',
        'en-US': 'Revoke this share? The share link will become invalid.',
    },
    '网络错误，请稍后重试': {
        default: '网络错误，请稍后重试',
        'zh-TW': '網路錯誤，請稍後重試',
        'en-US': 'Network error, please try again later',
    },
    '访问失败': {
        default: '访问失败',
        'zh-TW': '訪問失敗',
        'en-US': 'Access failed',
    },
    '返回首页': {
        default: '返回首页',
        'zh-TW': '返回首頁',
        'en-US': 'Back to Home',
    },
    '需要访问密码': {
        default: '需要访问密码',
        'zh-TW': '需要訪問密碼',
        'en-US': 'Password Required',
    },
    '验证中...': {
        default: '验证中...',
        'zh-TW': '驗證中...',
        'en-US': 'Verifying...',
    },
    '验证失败，请重试': {
        default: '验证失败，请重试',
        'zh-TW': '驗證失敗，請重試',
        'en-US': 'Verification failed, please try again',
    },
    '{count} 个字段': {
        default: '{count} 个字段',
        'zh-TW': '{count} 個字段',
        'en-US': '{count} fields',
    },
    '拖拽或点击添加字段到分组': {
        default: '拖拽或点击添加字段到分组',
        'zh-TW': '拖拽或點擊添加字段到分組',
        'en-US': 'Drag or click to add fields to this group',
    },
    '新分组': {
        default: '新分组',
        'zh-TW': '新分組',
        'en-US': 'New Group',
    },
    '新建分组': {
        default: '新建分组',
        'zh-TW': '新建分組',
        'en-US': 'Create Group',
    },
    '添加字段': {
        default: '添加字段',
        'zh-TW': '添加字段',
        'en-US': 'Add Field',
    },
    '确定要删除这个分组吗？分组中的字段不会被删除。': {
        default: '确定要删除这个分组吗？分组中的字段不会被删除。',
        'zh-TW': '確定要刪除這個分組嗎？分組中的字段不會被刪除。',
        'en-US': 'Delete this group? Fields inside the group will not be deleted.',
    },
    '确定要清空这个分组的所有字段吗？': {
        default: '确定要清空这个分组的所有字段吗？',
        'zh-TW': '確定要清空這個分組的所有字段嗎？',
        'en-US': 'Clear all fields in this group?',
    },
    '确定要重置为默认配置吗？当前配置将丢失。': {
        default: '确定要重置为默认配置吗？当前配置将丢失。',
        'zh-TW': '確定要重置為默認配置嗎？當前配置將丟失。',
        'en-US': 'Reset to default settings? Current configuration will be lost.',
    },
    '配置文件格式不正确': {
        default: '配置文件格式不正确',
        'zh-TW': '配置文件格式不正確',
        'en-US': 'Invalid configuration file format',
    },
    '## 我的文件名是\n01. 夜曲\n ## 你的任务\n提取出音轨号(tracknumber)和歌曲名(title)': {
        default: '## 我的文件名是\n01. 夜曲\n ## 你的任务\n提取出音轨号(tracknumber)和歌曲名(title)',
        'zh-TW': '## 我的文件名是\n01. 夜曲\n ## 你的任务\n提取出音軌號(tracknumber)和歌曲名(title)',
        'en-US': '## My filename is\n01. Nocturne\n## Your task\nExtract tracknumber and title',
    },
    '## 我的示例文本是\n01. 夜曲[xx出品]\n## 你的任务\n移除所有[]中的内容，包括[]': {
        default: '## 我的示例文本是\n01. 夜曲[xx出品]\n## 你的任务\n移除所有[]中的内容，包括[]',
        'zh-TW': '## 我的示例文本是\n01. 夜曲[xx出品]\n## 你的任务\n移除所有[]中的內容，包括[]',
        'en-US': '## My sample text is\n01. Nocturne[xx]\n## Your task\nRemove all content inside [] including []',
    },
    '01. 夜曲': {
        default: '01. 夜曲',
        'zh-TW': '01. 夜曲',
        'en-US': '01. Nocturne',
    },
    '01. 夜曲[xx出品]': {
        default: '01. 夜曲[xx出品]',
        'zh-TW': '01. 夜曲[xx出品]',
        'en-US': '01. Nocturne [xx]',
    },
    '{"tracknumber":"01","title":"夜曲"}': {
        default: '{"tracknumber":"01","title":"夜曲"}',
        'zh-TW': '{"tracknumber":"01","title":"夜曲"}',
        'en-US': '{"tracknumber":"01","title":"Nocturne"}',
    },
    '{count} 条规则': {
        default: '{count} 条规则',
        'zh-TW': '{count} 條規則',
        'en-US': '{count} rules',
    },
    '全文替换': {
        default: '全文替换',
        'zh-TW': '全文替換',
        'en-US': 'Text Replace',
    },
    '华语流行': {
        default: '华语流行',
        'zh-TW': '華語流行',
        'en-US': 'Mandopop',
    },
    '夜曲[xx出品]': {
        default: '夜曲[xx出品]',
        'zh-TW': '夜曲[xx出品]',
        'en-US': 'Nocturne [xx]',
    },
    '将文件名提取出的音轨号(tracknumber)、歌曲名(title)赋值给元数据中': {
        default: '将文件名提取出的音轨号(tracknumber)、歌曲名(title)赋值给元数据中',
        'zh-TW': '將文件名提取出的音軌號(tracknumber)、歌曲名(title)賦值給元數據中',
        'en-US': 'Assign extracted tracknumber and title from filename to metadata fields',
    },
    '常用模式': {
        default: '常用模式',
        'zh-TW': '常用模式',
        'en-US': 'Common Patterns',
    },
    '执行预览': {
        default: '执行预览',
        'zh-TW': '執行預覽',
        'en-US': 'Run Preview',
    },
    '拆分规则': {
        default: '拆分规则',
        'zh-TW': '拆分規則',
        'en-US': 'Split Rules',
    },
    '提取源': {
        default: '提取源',
        'zh-TW': '提取來源',
        'en-US': 'Source Field',
    },
    '支持普通文本匹配和正则表达式匹配（根据替换模式）': {
        default: '支持普通文本匹配和正则表达式匹配（根据替换模式）',
        'zh-TW': '支持普通文本匹配和正則表達式匹配（根據替換模式）',
        'en-US': 'Supports plain text and regex matching (depending on replace mode)',
    },
    '文件名称': {
        default: '文件名称',
        'zh-TW': '文件名稱',
        'en-US': 'Filename',
    },
    '智能检测并修复音乐文件元数据中的字符编码问题，支持GB2312、GBK、UTF-8等多种编码格式的自动转换。': {
        default: '智能检测并修复音乐文件元数据中的字符编码问题，支持GB2312、GBK、UTF-8等多种编码格式的自动转换。',
        'zh-TW': '智能檢測並修復音樂文件元數據中的字符編碼問題，支持GB2312、GBK、UTF-8等多種編碼格式的自動轉換。',
        'en-US': 'Detect and fix metadata encoding issues automatically (GB2312/GBK/UTF-8 and more)',
    },
    '替换模式': {
        default: '替换模式',
        'zh-TW': '替換模式',
        'en-US': 'Replace Mode',
    },
    '替换规则': {
        default: '替换规则',
        'zh-TW': '替換規則',
        'en-US': 'Replace Rules',
    },
    '正则替换': {
        default: '正则替换',
        'zh-TW': '正則替換',
        'en-US': 'Regex Replace',
    },
    '正在生成...': {
        default: '正在生成...',
        'zh-TW': '正在生成...',
        'en-US': 'Generating...',
    },
    '添加规则': {
        default: '添加规则',
        'zh-TW': '添加規則',
        'en-US': 'Add Rule',
    },
    '清除隐藏在元数据中的无关信息，支持文本替换和正则表达式替换两种模式。': {
        default: '清除隐藏在元数据中的无关信息，支持文本替换和正则表达式替换两种模式。',
        'zh-TW': '清除隱藏在元數據中的無關信息，支持文本替換和正則表達式替換兩種模式。',
        'en-US': 'Clean irrelevant metadata text via text replacement or regex replacement',
    },
    '生成正则表达式': {
        default: '生成正则表达式',
        'zh-TW': '生成正則表達式',
        'en-US': 'Generate Regex',
    },
    '简繁体智能转换': {
        default: '简繁体智能转换',
        'zh-TW': '簡繁體智能轉換',
        'en-US': 'Simplified/Traditional Smart Conversion',
    },
    '自动识别简体中文和繁体中文，支持双向转换。适用于音乐标签中的艺术家、专辑、歌曲名等字段的字体转换。': {
        default: '自动识别简体中文和繁体中文，支持双向转换。适用于音乐标签中的艺术家、专辑、歌曲名等字段的字体转换。',
        'zh-TW': '自動識別簡體中文和繁體中文，支持雙向轉換。適用於音樂標籤中的藝術家、專輯、歌曲名等字段的字體轉換。',
        'en-US': 'Automatically detect Simplified/Traditional Chinese and convert both ways for artist/album/title fields',
    },
    '華語流行': {
        default: '華語流行',
        'zh-TW': '華語流行',
        'en-US': 'Mandopop',
    },
    '规则 {index}': {
        default: '规则 {index}',
        'zh-TW': '規則 {index}',
        'en-US': 'Rule {index}',
    },
    '规则 {index}：请输入正则表达式': {
        default: '规则 {index}：请输入正则表达式',
        'zh-TW': '規則 {index}：請輸入正則表達式',
        'en-US': 'Rule {index}: enter regex',
    },
    '请先勾选文件或文件夹！': {
        default: '请先勾选文件或文件夹！',
        'zh-TW': '請先勾選文件或文件夾！',
        'en-US': 'Please select files or folders first!',
    },
    '请选择替换模式': {
        default: '请选择替换模式',
        'zh-TW': '請選擇替換模式',
        'en-US': 'Please choose a replace mode',
    },
    '选择需要检测和修复乱码的元数据字段': {
        default: '选择需要检测和修复乱码的元数据字段',
        'zh-TW': '選擇需要檢測和修復亂碼的元數據字段',
        'en-US': 'Select metadata fields to detect and fix encoding issues',
    },
    '选择需要进行语言转换的元数据字段': {
        default: '选择需要进行语言转换的元数据字段',
        'zh-TW': '選擇需要進行語言轉換的元數據字段',
        'en-US': 'Select metadata fields for language conversion',
    },
    '未知': {
        default: '未知',
        'zh-TW': '未知',
        'en-US': 'Unknown',
    },
    '通过正则表达式匹配规则，从文件名或其他元数据中提取出艺术家、专辑、标题等信息，并自动填充到对应的标签字段中。': {
        default: '通过正则表达式匹配规则，从文件名或其他元数据中提取出艺术家、专辑、标题等信息，并自动填充到对应的标签字段中。',
        'zh-TW': '通過正則表達式匹配規則，從文件名或其他元數據中提取藝術家、專輯、標題等信息，並自動填充到對應的標籤字段中。',
        'en-US': 'Use regex rules to extract artist/album/title from filename or metadata and fill target tags',
    },
    '预览效果': {
        default: '预览效果',
        'zh-TW': '預覽效果',
        'en-US': 'Preview Effect',
    },
    'SQLite串行处理器': {
        default: 'SQLite串行处理器',
        'zh-TW': 'SQLite串行處理器',
        'en-US': 'SQLite Serial Processor',
    },
    '从下载目录刮削': {
        default: '从下载目录刮削',
        'zh-TW': '從下載目錄刮削',
        'en-US': 'Scrape from download folder',
    },
    '保存音乐元数据': {
        default: '保存音乐元数据',
        'zh-TW': '保存音樂元數據',
        'en-US': 'Save music metadata',
    },
    '保存音乐到数据库': {
        default: '保存音乐到数据库',
        'zh-TW': '保存音樂到資料庫',
        'en-US': 'Save music to database',
    },
    '修复所有艺术家问题': {
        default: '修复所有艺术家问题',
        'zh-TW': '修復所有藝術家問題',
        'en-US': 'Fix all artist issues',
    },
    '停止后台任务': {
        default: '停止后台任务',
        'zh-TW': '停止後台任務',
        'en-US': 'Stop background task',
    },
    '全量扫描文件夹': {
        default: '全量扫描文件夹',
        'zh-TW': '全量掃描資料夾',
        'en-US': 'Full scan folder',
    },
    '切割CUE音轨': {
        default: '切割CUE音轨',
        'zh-TW': '切割 CUE 音軌',
        'en-US': 'Split CUE tracks',
    },
    '删除元数据': {
        default: '删除元数据',
        'zh-TW': '刪除元數據',
        'en-US': 'Delete metadata',
    },
    '删除无效音乐记录': {
        default: '删除无效音乐记录',
        'zh-TW': '刪除無效音樂記錄',
        'en-US': 'Delete invalid music records',
    },
    '刮削工作器': {
        default: '刮削工作器',
        'zh-TW': '刮削工作器',
        'en-US': 'Scraping worker',
    },
    '匹配歌曲': {
        default: '匹配歌曲',
        'zh-TW': '匹配歌曲',
        'en-US': 'Match songs',
    },
    '后台刮削艺术家': {
        default: '后台刮削艺术家',
        'zh-TW': '後台刮削藝術家',
        'en-US': 'Background scrape artists',
    },
    '增量扫描文件夹': {
        default: '增量扫描文件夹',
        'zh-TW': '增量掃描資料夾',
        'en-US': 'Incremental scan folder',
    },
    '完整扫描': {
        default: '完整扫描',
        'zh-TW': '完整掃描',
        'en-US': 'Full scan',
    },
    '导入音乐收藏': {
        default: '导入音乐收藏',
        'zh-TW': '導入音樂收藏',
        'en-US': 'Import music library',
    },
    '小米音箱播放': {
        default: '小米音箱播放',
        'zh-TW': '小米音箱播放',
        'en-US': 'Play on Xiaomi speaker',
    },
    '心跳检测': {
        default: '心跳检测',
        'zh-TW': '心跳檢測',
        'en-US': 'Heartbeat check',
    },
    '手动修改元数据': {
        default: '手动修改元数据',
        'zh-TW': '手動修改元數據',
        'en-US': 'Manual metadata edit',
    },
    '扫描文件夹': {
        default: '扫描文件夹',
        'zh-TW': '掃描資料夾',
        'en-US': 'Scan folder',
    },
    '扫描音乐ID3': {
        default: '扫描音乐ID3',
        'zh-TW': '掃描音樂 ID3',
        'en-US': 'Scan music ID3',
    },
    '批量保存音乐元数据': {
        default: '批量保存音乐元数据',
        'zh-TW': '批量保存音樂元數據',
        'en-US': 'Batch save music metadata',
    },
    '批量自动刮削': {
        default: '批量自动刮削',
        'zh-TW': '批量自動刮削',
        'en-US': 'Batch auto scraping',
    },
    '批量自动刮削V2': {
        default: '批量自动刮削V2',
        'zh-TW': '批量自動刮削 V2',
        'en-US': 'Batch auto scraping V2',
    },
    '整理文件夹': {
        default: '整理文件夹',
        'zh-TW': '整理資料夾',
        'en-US': 'Organize folders',
    },
    '歌曲匹配': {
        default: '歌曲匹配',
        'zh-TW': '歌曲匹配',
        'en-US': 'Song matching',
    },
    '测试睡眠任务': {
        default: '测试睡眠任务',
        'zh-TW': '測試睡眠任務',
        'en-US': 'Test sleep task',
    },
    '清理审计日志': {
        default: '清理审计日志',
        'zh-TW': '清理審計日誌',
        'en-US': 'Clean audit logs',
    },
    '清理播放日志': {
        default: '清理播放日志',
        'zh-TW': '清理播放日誌',
        'en-US': 'Clean playback logs',
    },
    '清理标签日志': {
        default: '清理标签日志',
        'zh-TW': '清理標籤日誌',
        'en-US': 'Clean tag logs',
    },
    '清理音乐数据': {
        default: '清理音乐数据',
        'zh-TW': '清理音樂數據',
        'en-US': 'Clean music data',
    },
    '生成STRM文件': {
        default: '生成STRM文件',
        'zh-TW': '生成 STRM 文件',
        'en-US': 'Generate STRM files',
    },
    '简化全量扫描': {
        default: '简化全量扫描',
        'zh-TW': '簡化全量掃描',
        'en-US': 'Simplified full scan',
    },
    '自动刮削任务(废弃)': {
        default: '自动刮削任务(废弃)',
        'zh-TW': '自動刮削任務(已廢棄)',
        'en-US': 'Auto scrape task (deprecated)',
    },
    '补充缺失元数据': {
        default: '补充缺失元数据',
        'zh-TW': '補充缺失元數據',
        'en-US': 'Fill missing metadata',
    },
    '规则刮削风格': {
        default: '规则刮削风格',
        'zh-TW': '規則刮削風格',
        'en-US': 'Rule-based style scraping',
    },
    '解码音乐路径': {
        default: '解码音乐路径',
        'zh-TW': '解碼音樂路徑',
        'en-US': 'Decode music path',
    },
    '重写专辑元数据': {
        default: '重写专辑元数据',
        'zh-TW': '重寫專輯元數據',
        'en-US': 'Rewrite album metadata',
    },
    '重写艺术家元数据': {
        default: '重写艺术家元数据',
        'zh-TW': '重寫藝術家元數據',
        'en-US': 'Rewrite artist metadata',
    },
    '音频格式转换': {
        default: '音频格式转换',
        'zh-TW': '音頻格式轉換',
        'en-US': 'Audio format conversion',
    },
    '快速过滤': {
        'zh-TW': '快速過濾',
        'en-US': 'Quick Filters',
    },
    '搜索建议': {
        'zh-TW': '搜尋建議',
        'en-US': 'Search Suggestions',
    },
    '将文件夹标记为已完成': {
        'zh-TW': '將資料夾標記為已完成',
        'en-US': 'Mark folder as completed',
    },
    '过滤: 未刮削': {
        'zh-TW': '過濾: 未刮削',
        'en-US': 'Filter: Not Scraped',
    },
    '过滤: 成功': {
        'zh-TW': '過濾: 成功',
        'en-US': 'Filter: Success',
    },
    '过滤: 失败': {
        'zh-TW': '過濾: 失敗',
        'en-US': 'Filter: Failed',
    },
    '勾选': {
        'zh-TW': '勾選',
        'en-US': 'Select',
    },
    '歌词(LRC文件)': {
        'zh-TW': '歌詞(LRC文件)',
        'en-US': 'Lyrics (LRC file)',
    },
    '{count} 项': {
        'zh-TW': '{count} 項',
        'en-US': '{count} items',
    },
    '{count} 个步骤': {
        default: '{count} 个步骤',
        'zh-TW': '{count} 個步驟',
        'en-US': '{count} steps',
    },
    '已选: {count} 项': {
        'zh-TW': '已選: {count} 項',
        'en-US': 'Selected: {count} items',
    },
    '开启': {
        'zh-TW': '開啟',
        'en-US': 'Enabled',
    },
    '暂无可选插件': {
        'zh-TW': '暫無可選插件',
        'en-US': 'No plugins available',
    },
    '暂无可选项': {
        'zh-TW': '暫無可選項',
        'en-US': 'No options available',
    },
    '暂无描述': {
        'zh-TW': '暫無描述',
        'en-US': 'No description',
    },
    '未知插件': {
        'zh-TW': '未知插件',
        'en-US': 'Unknown plugin',
    },
    '请输入内容': {
        'zh-TW': '請輸入內容',
        'en-US': 'Please enter content',
    },
    '请输入数值': {
        'zh-TW': '請輸入數值',
        'en-US': 'Please enter a number',
    },
    '请选择插件': {
        'zh-TW': '請選擇插件',
        'en-US': 'Select plugin',
    },
    '默认: {value}': {
        'zh-TW': '預設: {value}',
        'en-US': 'Default: {value}',
    },
    'Cookie 获取帮助': {
        'zh-TW': 'Cookie 取得幫助',
        'en-US': 'Cookie Help',
    },
    'Cookie 获取步骤示意图': {
        'zh-TW': 'Cookie 取得步驟示意圖',
        'en-US': 'Cookie Retrieval Steps',
    },
    '{count} 位': {
        'zh-TW': '{count} 位',
        'en-US': '{count} users',
    },
    '{value}秒': {
        'zh-TW': '{value}秒',
        'en-US': '{value}s',
    },
    '世界音乐': {
        'zh-TW': '世界音樂',
        'en-US': 'World Music',
    },
    '保存歌词': {
        'zh-TW': '保存歌詞',
        'en-US': 'Save Lyrics',
    },
    '共 {total} 条记录，第 {page} 页': {
        'zh-TW': '共 {total} 筆記錄，第 {page} 頁',
        'en-US': '{total} records, page {page}',
    },
    '在电脑上使用 Chrome 浏览器登录小米账号官网：': {
        'zh-TW': '在電腦上使用 Chrome 瀏覽器登入小米帳號官網：',
        'en-US': 'On a computer, sign in to Xiaomi Account website with Chrome:',
    },
    '在过滤框里输入 account?，过滤出对应连接，点击连接查看 Cookie。': {
        'zh-TW': '在過濾框輸入 account?，篩出對應連線並點擊查看 Cookie。',
        'en-US': 'Enter account? in filter, open the matching request, and view Cookie.',
    },
    '复制完整 Cookie 值，确保其中包含 userId 和 passToken 两个值。': {
        'zh-TW': '複製完整 Cookie 值，確保包含 userId 與 passToken。',
        'en-US': 'Copy the full Cookie value and ensure it contains userId and passToken.',
    },
    '将 Cookie 粘贴到本页设置项中。': {
        'zh-TW': '將 Cookie 貼到本頁設定項中。',
        'en-US': 'Paste Cookie into the settings field on this page.',
    },
    '开始': {
        'zh-TW': '開始',
        'en-US': 'Start',
    },
    '批量选择': {
        'zh-TW': '批量選擇',
        'en-US': 'Batch Select',
    },
    '按 F12 打开网络工具，点击 Network（网络） 标签页。': {
        'zh-TW': '按 F12 開啟網路工具，點擊 Network（網路）分頁。',
        'en-US': 'Press F12, open DevTools, and switch to the Network tab.',
    },
    '按 F5 刷新页面。': {
        'zh-TW': '按 F5 重新整理頁面。',
        'en-US': 'Press F5 to refresh the page.',
    },
    '提交反馈': {
        'zh-TW': '提交反饋',
        'en-US': 'Submit Feedback',
    },
    '操作日志': {
        'zh-TW': '操作日誌',
        'en-US': 'Operation Logs',
    },
    '数量：{count}': {
        'zh-TW': '數量：{count}',
        'en-US': 'Count: {count}',
    },
    '新世纪': {
        'zh-TW': '新世紀',
        'en-US': 'New Age',
    },
    '时长: {duration}': {
        'zh-TW': '時長: {duration}',
        'en-US': 'Duration: {duration}',
    },
    '未选择音频文件': {
        'zh-TW': '未選擇音訊文件',
        'en-US': 'No audio file selected',
    },
    '权限管理': {
        'zh-TW': '權限管理',
        'en-US': 'Permission Management',
    },
    '查看 Cookie 获取帮助': {
        'zh-TW': '查看 Cookie 取得幫助',
        'en-US': 'View Cookie Help',
    },
    '氛围音乐': {
        'zh-TW': '氛圍音樂',
        'en-US': 'Ambient Music',
    },
    '第 {page} 页，共 {total} 条': {
        'zh-TW': '第 {page} 頁，共 {total} 條',
        'en-US': 'Page {page}, total {total}',
    },
    '缺失风格': {
        'zh-TW': '缺失風格',
        'en-US': 'Missing Genre',
    },
    '跳转': {
        'zh-TW': '跳轉',
        'en-US': 'Go',
    },
    '运行日志': {
        'zh-TW': '運行日誌',
        'en-US': 'Runtime Logs',
    },
    '退出批量选择': {
        'zh-TW': '退出批量選擇',
        'en-US': 'Exit Batch Select',
    },
    '错误日志': {
        'zh-TW': '錯誤日誌',
        'en-US': 'Error Logs',
    },
    '主艺术家': {
        'zh-TW': '主藝術家',
        'en-US': 'Primary Artist',
    },
    '以下艺术家已被成功合并，操作不可撤销': {
        'zh-TW': '以下藝術家已成功合併，操作不可撤銷',
        'en-US': 'The following artists were merged successfully. This action cannot be undone.',
    },
    '合并到: {name} ({label})': {
        'zh-TW': '合併到: {name} ({label})',
        'en-US': 'Merge into: {name} ({label})',
    },
    '合并到此艺术家': {
        'zh-TW': '合併到此藝術家',
        'en-US': 'Merge into this artist',
    },
    '您即将合并 {count} 个艺术家，此操作不可撤销！': {
        'zh-TW': '您即將合併 {count} 個藝術家，此操作不可撤銷！',
        'en-US': 'You are about to merge {count} artists. This action cannot be undone!',
    },
    '批量选择艺术家A': {
        'zh-TW': '批量選擇藝術家A',
        'en-US': 'Batch Select Artist A',
    },
    '批量选择艺术家B': {
        'zh-TW': '批量選擇藝術家B',
        'en-US': 'Batch Select Artist B',
    },
    '智能合并': {
        'zh-TW': '智能合併',
        'en-US': 'Smart Merge',
    },
    '相似度: {percent}%': {
        'zh-TW': '相似度: {percent}%',
        'en-US': 'Similarity: {percent}%',
    },
    '确认合并': {
        'zh-TW': '確認合併',
        'en-US': 'Confirm Merge',
    },
    '确认合并 {count} 个艺术家': {
        'zh-TW': '確認合併 {count} 個藝術家',
        'en-US': 'Confirm merge of {count} artists',
    },
    '确认合并艺术家': {
        'zh-TW': '確認合併藝術家',
        'en-US': 'Confirm Artist Merge',
    },
    '确认批量合并': {
        'zh-TW': '確認批量合併',
        'en-US': 'Confirm Batch Merge',
    },
    '这些艺术家名称相似，请选择要保留的主艺术家，其他相似艺术家将被合并到主艺术家': {
        'zh-TW': '這些藝術家名稱相似，請選擇要保留的主藝術家，其他相似藝術家將合併到主藝術家',
        'en-US': 'These artist names are similar. Select the primary artist to keep; others will be merged into it.',
    },
    '处理中...': {
        'zh-TW': '處理中...',
        'en-US': 'Processing...',
    },
    '开始索引': {
        'zh-TW': '開始索引',
        'en-US': 'Start Indexing',
    },
    '默认封面': {
        'zh-TW': '預設封面',
        'en-US': 'Default Cover',
    },
    '上一步': {
        'zh-TW': '上一步',
        'en-US': 'Previous',
    },
    '下一步': {
        'zh-TW': '下一步',
        'en-US': 'Next',
    },
    '下载': {
        'zh-TW': '下載',
        'en-US': 'Download',
    },
    '下载失败: {message}': {
        'zh-TW': '下載失敗: {message}',
        'en-US': 'Download failed: {message}',
    },
    '下载成功！': {
        'zh-TW': '下載成功！',
        'en-US': 'Download successful!',
    },
    '代码存在问题，请查看验证结果': {
        'zh-TW': '代碼存在問題，請查看驗證結果',
        'en-US': 'Code has issues. Please check the validation result.',
    },
    '代码验证通过！': {
        'zh-TW': '代碼驗證通過！',
        'en-US': 'Code validation passed!',
    },
    '加载数据失败: {message}': {
        'zh-TW': '載入數據失敗: {message}',
        'en-US': 'Failed to load data: {message}',
    },
    '加载示例失败: {message}': {
        'zh-TW': '載入示例失敗: {message}',
        'en-US': 'Failed to load example: {message}',
    },
    '安装到系统': {
        'zh-TW': '安裝到系統',
        'en-US': 'Install to System',
    },
    '安装失败: {message}': {
        'zh-TW': '安裝失敗: {message}',
        'en-US': 'Install failed: {message}',
    },
    '必需配置项': {
        'zh-TW': '必需配置項',
        'en-US': 'Required Config Item',
    },
    '插件代码生成成功！': {
        'zh-TW': '插件代碼生成成功！',
        'en-US': 'Plugin code generated successfully!',
    },
    '插件名称只能包含字母、数字和下划线，且必须以字母开头': {
        'zh-TW': '插件名稱只能包含字母、數字和底線，且必須以字母開頭',
        'en-US': 'Plugin name can only contain letters, numbers, and underscores, and must start with a letter.',
    },
    '插件安装成功！': {
        'zh-TW': '插件安裝成功！',
        'en-US': 'Plugin installed successfully!',
    },
    '查看实现示例': {
        'zh-TW': '查看實現示例',
        'en-US': 'View Implementation Example',
    },
    '添加配置项': {
        'zh-TW': '新增配置項',
        'en-US': 'Add Config Item',
    },
    '生成插件代码': {
        'zh-TW': '生成插件代碼',
        'en-US': 'Generate Plugin Code',
    },
    '生成插件失败: {message}': {
        'zh-TW': '生成插件失敗: {message}',
        'en-US': 'Failed to generate plugin: {message}',
    },
    '配置项 {index}': {
        'zh-TW': '配置項 {index}',
        'en-US': 'Config Item {index}',
    },
    '验证代码': {
        'zh-TW': '驗證代碼',
        'en-US': 'Validate Code',
    },
    '验证失败: {message}': {
        'zh-TW': '驗證失敗: {message}',
        'en-US': 'Validation failed: {message}',
    },
    '音频文件': {
        'zh-TW': '音訊文件',
        'en-US': 'Audio File',
    },
    '{count}首': {
        'zh-TW': '{count}首',
        'en-US': '{count} tracks',
    },
    '专辑 • {year}': {
        'zh-TW': '專輯 • {year}',
        'en-US': 'Album • {year}',
    },
    '发布于 {date}': {
        'zh-TW': '發布於 {date}',
        'en-US': 'Published on {date}',
    },
    '收听': {
        'zh-TW': '收聽',
        'en-US': 'Listens',
    },
    '查看更多': {
        'zh-TW': '查看更多',
        'en-US': 'View More',
    },
    '热门·推荐': {
        'zh-TW': '熱門·推薦',
        'en-US': 'Popular · Picks',
    },
    '热门·艺术家': {
        'zh-TW': '熱門·藝術家',
        'en-US': 'Popular · Artists',
    },
    '去聆听音乐吧!': {
        'zh-TW': '去聆聽音樂吧!',
        'en-US': 'Go listen to some music!',
    },
    '专辑：{name}': {
        'zh-TW': '專輯：{name}',
        'en-US': 'Album: {name}',
    },
    '艺术家：{name}': {
        'zh-TW': '藝術家：{name}',
        'en-US': 'Artist: {name}',
    },
    '小爱播放': {
        'zh-TW': '小愛播放',
        'en-US': 'Xiaoai Playback',
    },
    '加入听众团': {
        'zh-TW': '加入聽眾團',
        'en-US': 'joined the listener group',
    },
    '听众': {
        'zh-TW': '聽眾',
        'en-US': 'Listener',
    },
    '收藏家': {
        'zh-TW': '收藏家',
        'en-US': 'Collector',
    },
    '晋升为收藏家': {
        'zh-TW': '晉升為收藏家',
        'en-US': 'promoted to collector',
    },
    '🎉 {name} 已{role}！': {
        'zh-TW': '🎉 {name} 已{role}！',
        'en-US': '🎉 {name} has {role}!',
    },
    '🎉 欢迎 {name} 加入{role}团队！': {
        'zh-TW': '🎉 歡迎 {name} 加入{role}團隊！',
        'en-US': '🎉 Welcome {name} to the {role} team!',
    },
    '👋 {name} 已离开乐团': {
        'zh-TW': '👋 {name} 已離開樂團',
        'en-US': '👋 {name} has left the group',
    },
    'OpenList 服务配置': {
        'zh-TW': 'OpenList 服務配置',
        'en-US': 'OpenList Service Settings',
    },
    '工作模式': {
        'zh-TW': '工作模式',
        'en-US': 'Work Mode',
    },
    '清除缓存': {
        'zh-TW': '清除快取',
        'en-US': 'Clear Cache',
    },
    '网盘音乐管理': {
        'zh-TW': '網盤音樂管理',
        'en-US': 'Cloud Music Management',
    },
    '账号认证': {
        'zh-TW': '帳號認證',
        'en-US': 'Account Authentication',
    },
    '高级设置': {
        'zh-TW': '高級設定',
        'en-US': 'Advanced Settings',
    },
    '最多专辑': {
        'zh-TW': '最多專輯',
        'en-US': 'Most Albums',
    },
    '最多歌曲': {
        'zh-TW': '最多歌曲',
        'en-US': 'Most Tracks',
    },
    '按歌曲数量优先': {
        'zh-TW': '按歌曲數量優先',
        'en-US': 'Prioritize by track count',
    },
    '按专辑数量优先': {
        'zh-TW': '按專輯數量優先',
        'en-US': 'Prioritize by album count',
    },
    '按名称长度优先': {
        'zh-TW': '按名稱長度優先',
        'en-US': 'Prioritize by name length',
    },
    '保留歌曲多的艺术家': {
        'zh-TW': '保留歌曲較多的藝術家',
        'en-US': 'Keep artist with more tracks',
    },
    '保留歌曲少的艺术家': {
        'zh-TW': '保留歌曲較少的藝術家',
        'en-US': 'Keep artist with fewer tracks',
    },
    '保留名称较短的艺术家': {
        'zh-TW': '保留名稱較短的藝術家',
        'en-US': 'Keep artist with shorter name',
    },
    '保留名称较长的艺术家': {
        'zh-TW': '保留名稱較長的藝術家',
        'en-US': 'Keep artist with longer name',
    },
    '维持原格式': {
        'zh-TW': '維持原格式',
        'en-US': 'Keep Original Format',
    },
    '保持原样': {
        'zh-TW': '保持原樣',
        'en-US': 'Keep Original',
    },
    'Last.fm 音乐记录': {
        'zh-TW': 'Last.fm 音樂記錄',
        'en-US': 'Last.fm Music Tracking',
    },
    'Subsonic 服务': {
        'zh-TW': 'Subsonic 服務',
        'en-US': 'Subsonic Service',
    },
    '元数据版本管理': {
        'zh-TW': '元數據版本管理',
        'en-US': 'Metadata Version Management',
    },
    '导出系统设置中的所有配置项，方便备份和转移': {
        'zh-TW': '導出系統設定中的所有配置項，方便備份與轉移',
        'en-US': 'Export all system settings for backup and migration',
    },
    '您的Last.fm 账户': {
        'zh-TW': '您的 Last.fm 帳戶',
        'en-US': 'your Last.fm account',
    },
    '播放前会将音乐解码为特定格式，但不是实时转码会耗费时间。': {
        'zh-TW': '播放前會將音樂解碼為特定格式，但非即時轉碼會耗費時間。',
        'en-US': 'Audio will be decoded to a target format before playback; this is not real-time transcoding and may take time.',
    },
    '播放转码设置': {
        'zh-TW': '播放轉碼設定',
        'en-US': 'Playback Transcoding Settings',
    },
    '文件显示设置': {
        'zh-TW': '文件顯示設定',
        'en-US': 'File Display Settings',
    },
    '自动记录每次元数据修改的历史版本,支持查看差异和回退操作': {
        'zh-TW': '自動記錄每次元數據修改的歷史版本，支持查看差異與回退操作',
        'en-US': 'Automatically keeps history for each metadata change, with diff view and rollback support',
    },
    '超过此数量时,将自动删除最旧的版本记录(1-100条,默认50条)': {
        'zh-TW': '超過此數量時，將自動刪除最舊版本記錄（1-100條，預設50條）',
        'en-US': 'When exceeded, the oldest history entries are removed automatically (1-100, default 50)',
    },
    '选择写入音乐文件的 ID3 标签版本，默认为 ID3v2.4': {
        'zh-TW': '選擇寫入音樂文件的 ID3 標籤版本，預設為 ID3v2.4',
        'en-US': 'Choose the ID3 tag version to write into music files (default: ID3v2.4)',
    },
    '配置管理': {
        'zh-TW': '配置管理',
        'en-US': 'Configuration Management',
    },
    '音乐标签设置': {
        'zh-TW': '音樂標籤設定',
        'en-US': 'Music Tag Settings',
    },
    '{count} 张专辑': {
        'zh-TW': '{count} 張專輯',
        'en-US': '{count} albums',
    },
    '已播放 {count} 次': {
        'zh-TW': '已播放 {count} 次',
        'en-US': 'Played {count} times',
    },
    '{count} 张专辑已载入': {
        'zh-TW': '{count} 張專輯已載入',
        'en-US': '{count} albums loaded',
    },
    '{count} 位艺术家已载入': {
        'zh-TW': '{count} 位藝術家已載入',
        'en-US': '{count} artists loaded',
    },
    '{count} 位艺术家': {
        'zh-TW': '{count} 位藝術家',
        'en-US': '{count} artists',
    },
    '{count} 首歌曲已载入': {
        'zh-TW': '{count} 首歌曲已載入',
        'en-US': '{count} tracks loaded',
    },
    '添加于{createdAt}': {
        'zh-TW': '加入於 {createdAt}',
        'en-US': 'Added on {createdAt}',
    },
    '专辑 由 {artist} · {year} 发行': {
        'zh-TW': '專輯由 {artist} · {year} 發行',
        'en-US': 'Album by {artist} · Released in {year}',
    },
    '{trackCount} 首歌曲, {duration} 时长 添加于{createdAt} · {genre}': {
        'zh-TW': '{trackCount} 首歌曲，時長 {duration}，加入於 {createdAt} · {genre}',
        'en-US': '{trackCount} tracks, {duration}, added on {createdAt} · {genre}',
    },
    '专辑简介:': {
        'zh-TW': '專輯簡介：',
        'en-US': 'Album summary:',
    },
    '成员': {
        'zh-TW': '成員',
        'en-US': 'Member',
    },
    '创建房间': {
        'zh-TW': '創建房間',
        'en-US': 'Create Room',
    },
    '创建房间失败': {
        'zh-TW': '創建房間失敗',
        'en-US': 'Failed to create room',
    },
    '当前编辑:': {
        'zh-TW': '目前編輯:',
        'en-US': 'Currently editing:',
    },
    '多端同播': {
        'zh-TW': '多端同播',
        'en-US': 'Group Cast',
    },
    '发送': {
        'zh-TW': '發送',
        'en-US': 'Send',
    },
    '发送失败': {
        'zh-TW': '發送失敗',
        'en-US': 'Send failed',
    },
    '房间': {
        'zh-TW': '房間',
        'en-US': 'Room',
    },
    '房间成员': {
        'zh-TW': '房間成員',
        'en-US': 'Room Members',
    },
    '房间号': {
        'zh-TW': '房間號',
        'en-US': 'Room ID',
    },
    '房主': {
        'zh-TW': '房主',
        'en-US': 'Host',
    },
    '房主(重连中)': {
        'zh-TW': '房主（重連中）',
        'en-US': 'Host (Reconnecting)',
    },
    '房主连接中，等待重连...若持续掉线会自动解散会话': {
        'zh-TW': '房主連線中，等待重連...若持續掉線將自動解散會話',
        'en-US': 'Host reconnecting. Waiting to reconnect... Session will auto-dismiss if disconnection persists',
    },
    '房主暂时离线': {
        'zh-TW': '房主暫時離線',
        'en-US': 'Host is temporarily offline',
    },
    '滚动歌词': {
        'zh-TW': '滾動歌詞',
        'en-US': 'Scrolling Lyrics',
    },
    '加入': {
        'zh-TW': '加入',
        'en-US': 'Join',
    },
    '加入成功': {
        'zh-TW': '加入成功',
        'en-US': 'Joined',
    },
    '加入房间': {
        'zh-TW': '加入房間',
        'en-US': 'Join room',
    },
    '加入房间失败': {
        'zh-TW': '加入房間失敗',
        'en-US': 'Failed to join room',
    },
    '加入失败': {
        'zh-TW': '加入失敗',
        'en-US': 'Join failed',
    },
    '仅房主可控': {
        'zh-TW': '僅房主可控',
        'en-US': 'Host only control',
    },
    '离开': {
        'zh-TW': '離開',
        'en-US': 'Leave',
    },
    '离开房间': {
        'zh-TW': '離開房間',
        'en-US': 'Leave room',
    },
    '离开房间失败': {
        'zh-TW': '離開房間失敗',
        'en-US': 'Failed to leave room',
    },
    '离开失败': {
        'zh-TW': '離開失敗',
        'en-US': 'Leave failed',
    },
    '例如：': {
        'zh-TW': '例如：',
        'en-US': 'For example:',
    },
    '连接中断，等待重连': {
        'zh-TW': '連線中斷，等待重連',
        'en-US': 'Connection lost, waiting to reconnect',
    },
    '聊天': {
        'zh-TW': '聊天',
        'en-US': 'Chat',
    },
    '路径下创建一个名为download的目录。': {
        'zh-TW': '路徑下建立一個名為 download 的目錄。',
        'en-US': 'Create a directory named download under this path.',
    },
    '每10分钟执行一次': {
        'zh-TW': '每10分鐘執行一次',
        'en-US': 'Run every 10 minutes',
    },
    '每1分钟执行一次': {
        'zh-TW': '每1分鐘執行一次',
        'en-US': 'Run every minute',
    },
    '每2小时执行一次': {
        'zh-TW': '每2小時執行一次',
        'en-US': 'Run every 2 hours',
    },
    '每3分钟执行一次（默认）': {
        'zh-TW': '每3分鐘執行一次（預設）',
        'en-US': 'Run every 3 minutes (default)',
    },
    '每天凌晨0点执行': {
        'zh-TW': '每天凌晨 0 點執行',
        'en-US': 'Run daily at 00:00',
    },
    '每小时整点执行': {
        'zh-TW': '每小時整點執行',
        'en-US': 'Run at the top of every hour',
    },
    '默认配置': {
        'zh-TW': '預設配置',
        'en-US': 'Default Config',
    },
    '启用此配置': {
        'zh-TW': '啟用此配置',
        'en-US': 'Enable this config',
    },
    '启用配置存在父子目录冲突: {left} 与 {right}': {
        'zh-TW': '啟用配置存在父子目錄衝突：{left} 與 {right}',
        'en-US': 'Enabled config has parent-child directory conflict: {left} and {right}',
    },
    '请输入监控目录，例如：/app/download/qbittorrent': {
        'zh-TW': '請輸入監控目錄，例如：/app/download/qbittorrent',
        'en-US': 'Enter monitored directory, e.g. /app/download/qbittorrent',
    },
    '人': {
        'zh-TW': '人',
        'en-US': 'people',
    },
    '删除配置': {
        'zh-TW': '刪除配置',
        'en-US': 'Delete config',
    },
    '使用自定义 crontab 表达式': {
        'zh-TW': '使用自訂 crontab 表達式',
        'en-US': 'Use custom crontab expression',
    },
    '输入消息': {
        'zh-TW': '輸入訊息',
        'en-US': 'Type a message',
    },
    '未命名配置': {
        'zh-TW': '未命名配置',
        'en-US': 'Unnamed config',
    },
    '我': {
        'zh-TW': '我',
        'en-US': 'Me',
    },
    '项目部署时已映射': {
        'zh-TW': '專案部署時已映射',
        'en-US': 'Already mapped during project deployment',
    },
    '消息发送失败': {
        'zh-TW': '訊息發送失敗',
        'en-US': 'Failed to send message',
    },
    '新增配置': {
        'zh-TW': '新增配置',
        'en-US': 'Add config',
    },
    '已加入房间': {
        'zh-TW': '已加入房間',
        'en-US': 'Joined room',
    },
    '已离开房间': {
        'zh-TW': '已離開房間',
        'en-US': 'Left room',
    },
    '已重连房间': {
        'zh-TW': '已重連房間',
        'en-US': 'Reconnected to room',
    },
    '暂无成员': {
        'zh-TW': '暫無成員',
        'en-US': 'No members',
    },
    '展开': {
        'zh-TW': '展開',
        'en-US': 'Expand',
    },
    '只需在': {
        'zh-TW': '只需在',
        'en-US': 'Only need to create under',
    },
    '至少保留一套配置': {
        'zh-TW': '至少保留一套配置',
        'en-US': 'Keep at least one config',
    },
    '当前页 {page} / 本页 {count} 条': {
        'zh-TW': '當前頁 {page} / 本頁 {count} 條',
        'en-US': 'Page {page} / {count} items',
    },
    '筛选 {text}': {
        'zh-TW': '篩選 {text}',
        'en-US': 'Filter: {text}',
    },
    '我的收藏': {
        'zh-TW': '我的收藏',
        'en-US': 'My Collection',
    },
    '已收录 {count} 个{label}': {
        'zh-TW': '已收錄 {count} 個{label}',
        'en-US': '{count} {label} collected',
    },
    '播放全部': {
        'zh-TW': '播放全部',
        'en-US': 'Play All',
    },
    '打乱': {
        'zh-TW': '隨機播放',
        'en-US': 'Shuffle',
    },
    '未知艺术家': {
        'zh-TW': '未知藝術家',
        'en-US': 'Unknown Artist',
    },
    '{count} 张专辑': {
        'zh-TW': '{count} 張專輯',
        'en-US': '{count} albums',
    },
    '这里还没有内容': {
        'zh-TW': '這裡還沒有內容',
        'en-US': 'Nothing here yet',
    },
    '正在加载...': {
        'zh-TW': '正在載入...',
        'en-US': 'Loading...',
    },
    '喜爱的专辑': {
        'zh-TW': '喜愛的專輯',
        'en-US': 'Favorite Albums',
    },
    '喜爱的艺术家': {
        'zh-TW': '喜愛的藝術家',
        'en-US': 'Favorite Artists',
    },
    '喜爱的歌曲': {
        'zh-TW': '喜愛的歌曲',
        'en-US': 'Favorite Tracks',
    },
    '我的喜爱': {
        'zh-TW': '我的喜愛',
        'en-US': 'My Favorites',
    },
    '把常听专辑集中放在这里，随时继续播放。': {
        'zh-TW': '把常聽專輯集中在這裡，隨時繼續播放。',
        'en-US': 'Keep your most-listened albums here for easy playback.',
    },
    '收藏过的艺术家会整理在这里，方便继续探索。': {
        'zh-TW': '收藏過的藝術家會整理在這裡，方便繼續探索。',
        'en-US': 'Artists you\'ve saved are organized here for easy exploration.',
    },
    '你标记过的歌曲会留在这里，适合直接开播。': {
        'zh-TW': '你標記過的歌曲會留在這裡，適合直接開播。',
        'en-US': 'Songs you\'ve marked stay here, ready to play.',
    },
    '还没有喜爱的专辑，去发现页收下几张吧。': {
        'zh-TW': '還沒有喜愛的專輯，去發現頁收下幾張吧。',
        'en-US': 'No favorite albums yet. Head to Discover to save some.',
    },
    '还没有喜爱的艺术家，先去挑几个喜欢的声音。': {
        'zh-TW': '還沒有喜愛的藝術家，先去挑幾個喜歡的聲音。',
        'en-US': 'No favorite artists yet. Start by picking some you like.',
    },
    '还没有喜爱的歌曲，点亮心形后会出现在这里。': {
        'zh-TW': '還沒有喜愛的歌曲，點亮心形後會出現在這裡。',
        'en-US': 'No favorite songs yet. Tap the heart to add them here.',
    },
    '内容': {
        'zh-TW': '內容',
        'en-US': 'Items',
    },
    '已经整理 {count} 首歌': {
        'zh-TW': '已經整理 {count} 首歌',
        'en-US': '{count} songs organized',
    },
    '循环最多的旋律': {
        'zh-TW': '循環最多的旋律',
        'en-US': 'Most Played',
    },
    '按字母慢慢翻': {
        'zh-TW': '按字母慢慢翻',
        'en-US': 'A-Z',
    },
    '歌曲列表': {
        'zh-TW': '歌曲列表',
        'en-US': 'Song List',
    },
    '找到 {count} 首相关歌曲': {
        'zh-TW': '找到 {count} 首相關歌曲',
        'en-US': '{count} matching songs found',
    },
    '和 "{keyword}" 有关的结果会继续出现在这里。': {
        'zh-TW': '和 "{keyword}" 有關的結果會繼續出現在這裡。',
        'en-US': 'Results related to "{keyword}" will keep appearing here.',
    },
    '刚入库的新声音排在前面，适合直接看看最近收了什么。': {
        'zh-TW': '剛入庫的新聲音排在前面，適合直接看看最近收了什麼。',
        'en-US': 'New arrivals are listed first — great for checking what you just added.',
    },
    '把最近点开过的歌聚在一起，接着上次的情绪继续听。': {
        'zh-TW': '把最近點開過的歌聚在一起，接著上次的情緒繼續聽。',
        'en-US': 'Recently played songs gathered together — continue where you left off.',
    },
    '这些歌被你放得最多，适合一键回到熟悉的节奏。': {
        'zh-TW': '這些歌被你放得最多，適合一鍵回到熟悉的節奏。',
        'en-US': 'Your most-played songs — one tap back to your favorite rhythms.',
    },
    '按字母排序慢慢找，翻歌时会更清楚。': {
        'zh-TW': '按字母排序慢慢找，翻歌時會更清楚。',
        'en-US': 'Browse alphabetically — easier to find songs when scrolling.',
    },
    '把常听的歌整理得更顺手一些。': {
        'zh-TW': '把常聽的歌整理得更順手一些。',
        'en-US': 'Organize your frequently played songs for easy access.',
    },
    '没有找到相关歌曲，换个关键词再试试。': {
        'zh-TW': '沒有找到相關歌曲，換個關鍵詞再試試。',
        'en-US': 'No matching songs found. Try different keywords.',
    },
    '这里暂时没有歌曲，稍后再回来看看。': {
        'zh-TW': '這裡暫時沒有歌曲，稍後再回來看看。',
        'en-US': 'No songs here yet. Come back later.',
    },
    '最近添加': {
        'zh-TW': '最近添加',
        'en-US': 'Recently Added',
    },
    '最近播放': {
        'zh-TW': '最近播放',
        'en-US': 'Recently Played',
    },
    '播放最多': {
        'zh-TW': '播放最多',
        'en-US': 'Most Played',
    },
    '按字母排序': {
        'zh-TW': '按字母排序',
        'en-US': 'A-Z',
    },
    '刚收进来的新歌': {
        'zh-TW': '剛收進來的新歌',
        'en-US': 'Newly Added Songs',
    },
    '最近反复想听': {
        'zh-TW': '最近反覆想聽',
        'en-US': 'Recently Played',
    },
    '任务 ID: {id}': {
        'zh-TW': '任務 ID: {id}',
        'en-US': 'Task ID: {id}',
    },
    '开始时间: {time}': {
        'zh-TW': '開始時間: {time}',
        'en-US': 'Start Time: {time}',
    },
    '结束时间: {time}': {
        'zh-TW': '結束時間: {time}',
        'en-US': 'End Time: {time}',
    },
    }

const localeState = Vue.observable({
    locale: DEFAULT_LOCALE
})

function normalizeLocale(rawLocale) {
    const value = String(rawLocale || '').trim()
    if (!value) {
        return DEFAULT_LOCALE
    }

    if (SUPPORTED_LOCALES.includes(value)) {
        return value
    }

    const lowerValue = value.toLowerCase()
    if (lowerValue.startsWith('zh-tw') || lowerValue.startsWith('zh-hk') || lowerValue.startsWith('zh-hant')) {
        return 'zh-TW'
    }
    if (lowerValue.startsWith('zh')) {
        return 'zh-CN'
    }
    if (lowerValue.startsWith('en')) {
        return 'en-US'
    }
    return DEFAULT_LOCALE
}

function setDocumentLanguage(locale) {
    if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.setAttribute('lang', locale)
    }
}

function persistLocale(locale) {
    if (typeof window === 'undefined') {
        return
    }
    try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
        document.cookie = `${LOCALE_STORAGE_KEY}=${encodeURIComponent(locale)};path=/;SameSite=Lax`
    } catch (error) {
        console.error('保存语言设置失败:', error)
    }
}

function readStoredLocale() {
    if (typeof window === 'undefined') {
        return DEFAULT_LOCALE
    }

    try {
        const localLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
        if (localLocale) {
            return normalizeLocale(localLocale)
        }

        const cookieItem = document.cookie.split(';').find(item => item.trim().startsWith(`${LOCALE_STORAGE_KEY}=`))
        if (cookieItem) {
            const cookieLocale = decodeURIComponent(cookieItem.split('=')[1] || '')
            return normalizeLocale(cookieLocale)
        }

        return normalizeLocale(navigator.language)
    } catch (error) {
        return DEFAULT_LOCALE
    }
}

function formatMessage(message, params) {
    return message.replace(/\{(\w+)\}/g, (match, key) => {
        return Object.prototype.hasOwnProperty.call(params, key) ? params[key] : match
    })
}

export function getLocaleState() {
    return localeState
}

export function setAppLocale(locale) {
    const normalized = normalizeLocale(locale)
    localeState.locale = normalized
    persistLocale(normalized)
    setDocumentLanguage(normalized)

    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('mtw-locale-change', { detail: { locale: normalized } }))
    }

    return normalized
}

export function initAppLocale() {
    // 检查是否已有存储的语言设置
    const hasStoredLocale = typeof window !== 'undefined' && window.localStorage.getItem(LOCALE_STORAGE_KEY)

    const locale = readStoredLocale()
    const normalized = normalizeLocale(locale)

    // 只设置内存状态和文档语言，不持久化
    localeState.locale = normalized
    setDocumentLanguage(normalized)

    // 如果已有存储的语言设置，才持久化（更新 cookie）
    if (hasStoredLocale) {
        persistLocale(normalized)
    }

    return normalized
}

export function t(key, params = {}) {
    const source = String(key || '')
    if (!source) {
        return source
    }

    const entry = MESSAGES[source]
    if (!entry) {
        return source
    }

    let template = source
    if (typeof entry === 'string') {
        template = entry
    } else if (entry && typeof entry === 'object') {
        const localeTemplate = entry[localeState.locale]
        const fallbackTemplate = entry.default
        template = localeTemplate || fallbackTemplate || source
    }

    if (typeof template === 'string') {
        return formatMessage(template, params)
    }
    return source
}
