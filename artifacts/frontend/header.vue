<template>
    <div>
        <!-- web 端顶部导航栏 -->
        <div v-if="!isListenerMobile" class="magic-header hidden md:flex fade-in">
            <div class="magic-header__shell">
                <div class="magic-header__brand">
                    <button type="button" class="magic-brand-button" @click="handleRefresh">
                        <span class="magic-brand-mark" :class="{ 'magic-brand-mark--image': brandMarkType === 'image' }">
                            <img v-if="brandMarkType === 'image' && brandLogoUrl" :src="brandLogoUrl" alt="" />
                            <span v-else>{{ brandMarkText }}</span>
                        </span>
                        <span class="magic-brand-copy">
                            <span class="magic-brand-title">{{ siteTitle }}</span>
                        </span>
                    </button>
                    <button v-if="showRoleBadge" type="button" class="magic-role-badge"
                        :class="{ 'magic-role-badge--pulse': role === 'V1' }" @click="showActiceCode = true">
                        {{ role || '--' }}
                    </button>
                </div>

                <nav class="magic-nav" aria-label="主导航">
                    <template v-if="role === 'V2'">
                        <button v-for="(item, index) in headerList" :key="index" type="button"
                            class="magic-nav__item" :class="{ 'is-active': item.pathName === navName }"
                            @click="redirectUrl(item)">
                            {{ $tt(item.name) }}
                        </button>
                    </template>
                    <template v-else>
                        <button v-for="(item, index) in header.list" v-if="role === item.role" :key="index"
                            type="button" class="magic-nav__item"
                            :class="{ 'is-active': item.pathName === navName }" @click="redirectUrl(item)">
                            {{ $tt(item.name) }}
                        </button>
                    </template>
                </nav>

                <div class="magic-actions">
                    <div class="magic-search" ref="searchContainer">
                        <div class="search-input-wrapper" :class="{ 'search-expanded': isSearch }">
                            <div class="magic-search-field">
                                <svg class="magic-search-field__icon" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input type="text" ref="inputVal" class="magic-search-field__input"
                                    :placeholder="$tt('搜索艺术家、专辑或歌曲...')" v-model="searchTerm" @input="handleInput"
                                    autocomplete="off" @click="showResults = !showResults" />
                            </div>
                        </div>

                        <div class="magic-popover magic-search-results" v-if="showResults && isSearch">
                            <div v-if="suggestions.artists && suggestions.artists.length > 0" class="magic-result-group">
                                <div class="magic-result-title">
                                    <svg class="magic-result-title__icon" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {{ $tt('艺术家') }}
                                </div>
                                <button v-for="(artist, index) in suggestions.artists" :key="'at' + index"
                                    type="button" class="magic-result-item" @click="redirectArtist(artist)">
                                    <span class="magic-result-art magic-result-art--round">
                                        <svg class="magic-result-art__icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </span>
                                    <span class="magic-result-copy">
                                        <span class="magic-result-name">{{ artist.name }}</span>
                                        <span class="magic-result-meta">{{ artist.albumCount }} {{ $tt('专辑') }}</span>
                                    </span>
                                    <svg class="magic-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div v-if="suggestions.albums && suggestions.albums.length > 0" class="magic-result-group">
                                <div class="magic-result-title">
                                    <svg class="magic-result-title__icon" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                    </svg>
                                    {{ $tt('专辑') }}
                                </div>
                                <button v-for="(album, index) in suggestions.albums" :key="'al' + index"
                                    type="button" class="magic-result-item" @click="redirectAlbum(album)">
                                    <span class="magic-result-art">
                                        <svg class="magic-result-art__icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 12c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm10 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
                                        </svg>
                                    </span>
                                    <span class="magic-result-copy">
                                        <span class="magic-result-name">{{ album.name }}</span>
                                        <span class="magic-result-meta">{{ album.artist }} / {{ album.year }}</span>
                                    </span>
                                    <svg class="magic-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div v-if="suggestions.tracks && suggestions.tracks.length > 0" class="magic-result-group">
                                <div class="magic-result-title">
                                    <svg class="magic-result-title__icon" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                    </svg>
                                    {{ $tt('歌曲') }}
                                </div>
                                <button v-for="(track, index) in suggestions.tracks" :key="'tr' + index"
                                    type="button" class="magic-result-item" @click="redirectTrack(track)">
                                    <span class="magic-result-art">
                                        <svg class="magic-result-art__icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                                        </svg>
                                    </span>
                                    <span class="magic-result-copy">
                                        <span class="magic-result-name">{{ track.title }}</span>
                                        <span class="magic-result-meta">{{ track.artist }} / {{ track.album }} / {{ track.year }}</span>
                                    </span>
                                    <svg class="magic-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            <div v-if="searchTerm && (!suggestions.artists || suggestions.artists.length === 0) && (!suggestions.albums || suggestions.albums.length === 0) && (!suggestions.tracks || suggestions.tracks.length === 0)"
                                class="magic-empty-state">
                                <svg class="magic-empty-state__icon" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p>{{ $tt('未找到相关结果') }}</p>
                                <span>{{ $tt('尝试使用不同的关键词') }}</span>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="magic-icon-button" @click="handleClick" v-if="role === 'V2'"
                        ref="searchButton" :title="$tt('搜索') + ' (' + $formatShortcut('K') + ')'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="magic-icon" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>

                    <div class="dropdown dropdown-end">
                        <button type="button" tabindex="0" class="magic-icon-button" @click="submitRecord"
                            :title="$tt('通知中心')">
                            <svg xmlns="http://www.w3.org/2000/svg" class="magic-icon" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span class="magic-count-badge" v-if="unreadCount !== 0">{{ unreadCount }}</span>
                        </button>
                        <div tabindex="0" class="magic-popover magic-notify-panel dropdown-content">
                            <div class="magic-popover-header">
                                <div>
                                    <h3>{{ $tt('通知中心') }}</h3>
                                    <p v-if="unreadCount > 0">{{ $tt('header.notify.unread', { count: unreadCount }) }}</p>
                                    <p v-else>{{ $tt('暂无新消息') }}</p>
                                </div>
                            </div>

                            <div class="magic-notify-list">
                                <div v-if="msgList && msgList.length > 0">
                                    <button v-for="(item, index) in msgList" :key="index" type="button"
                                        class="magic-notify-item" @click="handleNotifyClick(item)">
                                        <span class="magic-notify-icon">
                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </span>
                                        <span class="magic-notify-copy">
                                            <span class="magic-notify-row">
                                                <span class="magic-notify-title">{{ item.title }}</span>
                                                <time>{{ item.update_at }}</time>
                                            </span>
                                            <span class="magic-notify-content">{{ item.content }}</span>
                                        </span>
                                    </button>
                                </div>

                                <div v-else class="magic-empty-state magic-empty-state--notify">
                                    <svg class="magic-empty-state__icon" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    <p>{{ $tt('暂无通知') }}</p>
                                    <span>{{ $tt('系统消息和执行状态将在这里显示') }}</span>
                                </div>
                            </div>

                            <div class="magic-popover-footer" v-if="msgList && msgList.length > 0">
                                <span>{{ $tt('header.notify.total', { count: msgList.length }) }}</span>
                                <button type="button" @click="redirectNotifyList">{{ $tt('查看全部') }}</button>
                            </div>
                        </div>
                    </div>

                    <div class="dropdown dropdown-end">
                        <button type="button" tabindex="0" class="magic-avatar-button" :title="username">
                            <img src="/static/dist/img/avator.webp" alt="" />
                        </button>
                        <ul tabindex="0" v-if="isSuperuser" class="magic-user-menu dropdown-content">
                            <li @click="handleUserListClic2k">
                                <button type="button">
                                    <span>{{ $tt('后台管理') }}</span>
                                    <span class="magic-menu-badge">{{ this.username }}</span>
                                </button>
                            </li>
                            <li @click="handleUserListClic3k">
                                <button type="button">
                                    <span>{{ $tt('使用手册') }}</span>
                                    <span class="magic-menu-badge">v{{ version }}</span>
                                </button>
                            </li>
                            <li @click="handleUserListClick">
                                <button type="button">
                                    <span>{{ $tt('关于作者') }}</span>
                                    <span class="magic-menu-badge">{{ versionNum }}</span>
                                </button>
                            </li>
                            <li v-if="role === 'V1'" @click="showActiceCode = true">
                                <button type="button" class="magic-user-menu__warning">
                                    <span>{{ $tt('激活V2版本') }}</span>
                                    <span class="magic-menu-badge">{{ $tt('去激活') }}</span>
                                </button>
                            </li>
                            <li @click="handleUserListClic4k">
                                <button type="button">
                                    <span>{{ $tt('退出登录') }}</span>
                                    <span class="magic-menu-badge">Logout</span>
                                </button>
                            </li>
                        </ul>
                        <ul tabindex="0" v-else class="magic-user-menu dropdown-content">
                            <li>
                                <button type="button">
                                    <span>{{ $tt('当前用户') }}</span>
                                    <span class="magic-menu-badge">{{ this.username }}</span>
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <span>{{ $tt('版本时间') }}</span>
                                    <span class="magic-menu-badge">v{{ version }}</span>
                                </button>
                            </li>
                            <li>
                                <button type="button">
                                    <span>{{ $tt('当前版本') }}</span>
                                    <span class="magic-menu-badge">{{ versionNum }}</span>
                                </button>
                            </li>
                            <li v-if="role === 'V1'" @click="showActiceCode = true">
                                <button type="button" class="magic-user-menu__warning">
                                    <span>{{ $tt('激活V2版本') }}</span>
                                    <span class="magic-menu-badge">{{ $tt('永久') }}</span>
                                </button>
                            </li>
                            <li @click="handleUserListClic4k">
                                <button type="button">
                                    <span>{{ $tt('退出登录') }}</span>
                                    <span class="magic-menu-badge">Logout</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="drawer">
            <input id="edit-show-bar" type="checkbox" class="drawer-toggle" v-model="isShowSideBar" />
            <div class="drawer-side z-[120]">
                <label for="edit-show-bar" aria-label="close sidebar" class="drawer-overlay"></label>
                <div class="p-4 min-h-full bg-base-100 text-base-content">
                    <Side />
                </div>
            </div>
        </div>
        <div>
            <input type="checkbox" id="my_modal_6" class="modal-toggle" v-model="showActiceCode" />
            <div class="modal" role="dialog">
                <div class="modal-box">
                    <div v-if="!isForever">
                        <h3 class="font-bold text-lg" v-if="role === 'V1'">{{ $tt('激活V2版本') }}</h3>
                        <h3 class="font-bold text-lg" v-else>{{ $tt('升级 V2 永久版本') }}</h3>
                        <label class="form-control w-full max-w-xs mt-4">
                            <div class="text-gray-500 text-sm mb-2">
                                {{ $tt('注意：V2 版本部署时候容器内的端口为 8002, 如果你部署时添加 command: /start 命令，您需要去掉该行命令。') }}
                            </div>
                            <div class="label">
                                <span class="label-text">{{ $tt('输入你的激活码：') }}</span>
                            </div>
                            <input type="text" :placeholder="$tt('输入你的激活码')" class="input input-bordered w-full max-w-xs"
                                v-model="code" />
                            <div class="mt-1 label-text text-gray-400 underline cursor-pointer" @click="redirectAfdian">
                                {{ $tt('获取激活码？') }}</div>
                        </label>
                        <div class="modal-action">
                            <label for="my_modal_6" class="btn btn-neutral btn-sm" @click="handleActiveCode">{{ $tt('激活') }}</label>
                            <label for="my_modal_6" class="btn btn-sm">{{ $tt('关闭') }}</label>
                        </div>
                    </div>
                    <div v-else>
                        {{ $tt('您已经是永久激活用户！') }}
                        <div class="modal-action">
                            <label for="my_modal_6" class="btn btn-md">{{ $tt('关闭') }}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 移动端底部导航栏 -->
        <MobileNavbar v-if="!isListenerMobile" :role="role" :isSuperuser="isSuperuser" />
    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Side from '@/components/base/magicMenu/side'
import MobileNavbar from '@/components/base/magicMenu/mobileNavbar'
import keyboardShortcutsMixin from '@/mixins/keyboardShortcuts'
import { THEME_LIST, THEME_COLOR_MAP } from '@/utils/themeConfig'
import { initTheme, switchTheme } from '@/utils/themeUtils'

export default {
    mixins: [keyboardShortcutsMixin],
    components: {
        Side,
        MobileNavbar
    },
    data() {
        return {
            logout_url: 'https://github.com/xhongc/music-tag-web',
            pageTitle: '测试',
            currentTheme: 'light',
            userData: {},
            role: '',
            isForever: false,
            isSuperuser: false,
            username: '',
            msgList: [],
            unreadCount: 0,
            showResults: false,
            isSearch: false,
            searchTimeout2: null,
            suggestions: {},
            syncSwitch: true,
            showActiceCode: false,
            siteTitle: 'Music Tag Web', // 网站标题
            brandMarkType: 'letter',
            brandMarkText: 'M',
            brandLogoUrl: '',
            showRoleBadge: true, // 是否显示版本标识
            user: {
                list: [
                    '关于作者'
                ]
            },
            header: {
                list: [
                    {
                        name: '首页',
                        id: 3,
                        show: true,
                        pathName: 'index',
                        role: 'V2',
                        isSuperuser: false
                    },
                    {
                        name: '操作台',
                        id: 1,
                        show: true,
                        pathName: 'home',
                        role: 'V1',
                        isSuperuser: true
                    },
                    {
                        name: '操作记录',
                        id: 6,
                        show: true,
                        pathName: 'log',
                        role: 'V1',
                        isSuperuser: true
                    },
                    {
                        name: '插件管理',
                        id: 4,
                        show: true,
                        pathName: 'mod',
                        role: 'V2',
                        isSuperuser: true
                    },
                    {
                        name: '音乐收藏',
                        id: 2,
                        show: true,
                        pathName: 'library',
                        role: 'V2',
                        isSuperuser: false
                    },
                    {
                        name: '系统设置',
                        id: 5,
                        show: true,
                        pathName: 'system',
                        role: 'V2',
                        isSuperuser: false
                    }
                ],
                active: -1,
            },
            headerListenPerson: {
                list: [
                    {
                        name: '首页',
                        id: 3,
                        show: true,
                        pathName: 'index',
                        role: 'V2',
                        isSuperuser: false
                    },
                    {
                        name: '音乐收藏',
                        id: 2,
                        show: true,
                        pathName: 'library',
                        role: 'V2',
                        isSuperuser: false
                    },
                    {
                        name: '系统设置',
                        id: 5,
                        show: true,
                        pathName: 'system',
                        role: 'V2',
                        isSuperuser: false
                    }
                ],
                active: -1,
            },
            code: '',
            isShowSideBar: false,
            themes: THEME_LIST,
            colorMap: THEME_COLOR_MAP,
        }
    },
    computed: {
        ...mapGetters(['getHasMsg', 'getSearchTerm', 'getIsSuperuser']),
        isListenerMobile() {
            return !this.getIsSuperuser && typeof window !== 'undefined' && window.innerWidth <= 768
        },
        refresh() {
            if (this.getHasMsg) {
                this.$store.commit('setHasMsg', false)
                this.fetchRecord()
            }
        },
        headerList() {
            return this.isSuperuser ? this.header.list : this.headerListenPerson.list
        },
        searchTerm: {
            get() {
                return this.getSearchTerm
            },
            set(value) {
                this.$store.commit('setSearchTerm', value)
            }
        },
        headerTitle() {
            return this.$route.meta.title
        },
        navName() {
            const name = this.$route.meta.hasOwnProperty('fatherName') ? this.$route.meta.fatherName : this.$route.name
            return name
        },
        version() {
            return window.projectVersion || '--'
        },
        versionNum() {
            return window.projectVersionNum || '--'
        },
        isHiddenBGP: {
            get() {
                return window.localStorage.getItem('isHiddenBGP') === 'true'
            },
            set(value) {
                window.localStorage.setItem('isHiddenBGP', value ? 'true' : 'false')
            }
        }
    },
    mounted() {
        this.loginUser()
        document.addEventListener('click', this.handleClickOutside)
        // 监听网站标题刷新事件
        this.$root.$on('refresh-site-title', this.fetchSiteTitle)
        this.$root.$on('refresh-brand-mark', this.fetchBrandMark)
        // 监听版本标识显示刷新事件
        this.$root.$on('refresh-role-badge', this.fetchShowRoleBadge)
    },
    created() {
        this.initTheme()
        this.fetchRecord()
        this.fetchSiteTitle()
        this.fetchBrandMark()
        this.fetchShowRoleBadge()
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside)
        // 移除网站标题刷新事件监听
        this.$root.$off('refresh-site-title', this.fetchSiteTitle)
        this.$root.$off('refresh-brand-mark', this.fetchBrandMark)
        // 移除版本标识显示刷新事件监听
        this.$root.$off('refresh-role-badge', this.fetchShowRoleBadge)
    },
    methods: {
        initTheme() {
            this.currentTheme = initTheme(this.currentTheme, this.colorMap)
        },
        switchTheme(theme) {
            this.currentTheme = switchTheme(theme, this.colorMap)
        },
        handleSwitchSync(v) {
            this.$api.Task.UpdateSys({
                'key': 'is_watch_file',
                'value': v ? '1' : '0'
            }).then((res) => {
                if (!res.result) {
                    this.syncSwitch = !v
                }
            })
        },
        handleRedirect(item) {
            if (this.$route.name !== 'home') {
                this.$router.push({ name: 'home' })
            }
            this.$store.commit('setFullPath', item.full_path)
        },
        handleUserListClick(e) {
            const btn = document.createElement('a')
            btn.setAttribute('href', this.logout_url)
            btn.setAttribute('target', '_blank') // 添加target属性在新窗口打开
            document.body.appendChild(btn)
            btn.click()
            document.body.removeChild(btn) // 清理DOM
        },
        handleUserListClic2k(e) {
            const btn = document.createElement('a')
            btn.setAttribute('href', '/admin/')
            btn.setAttribute('target', '_blank') // 添加target属性在新窗口打开
            document.body.appendChild(btn)
            btn.click()
            document.body.removeChild(btn) // 清理DOM
        },
        redirectNotifyList() {
            const btn = document.createElement('a')
            btn.setAttribute('href', '/admin/task/notify/')
            btn.setAttribute('target', '_blank') // 添加target属性在新窗口打开
            document.body.appendChild(btn)
            btn.click()
            document.body.removeChild(btn) // 清理DOM
        },
        handleUserListClic3k(e) {
            const btn = document.createElement('a')
            if (this.role === 'V2') {
                btn.setAttribute('href', 'https://xiers-organization.gitbook.io/music-tag-web-v2')
            } else {
                btn.setAttribute('href', 'https://xiers-organization.gitbook.io/music-tag-web/')
            }
            btn.setAttribute('target', '_blank') // 添加target属性在新窗口打开
            document.body.appendChild(btn)
            btn.click()
            document.body.removeChild(btn) // 清理DOM
        },
        handleUserListClic4k(e) {
            this.$router.push({ name: 'login' })
        },
        loginUser() {
            this.$api.Task.loginInfo().then((res) => {
                if (res.result) {
                    this.userData = res.data
                    this.role = res.data.role
                    this.isForever = res.data.is_forever
                    this.isSuperuser = res.data.is_superuser
                    this.username = res.data.username
                    this.$store.commit('setDisplayName', res.data.display_name)
                    this.$store.commit('setUserRole', res.data.role)
                    this.$store.commit('setIsSuperuser', res.data.is_superuser)
                    this.$store.commit('setUsername', res.data.username)
                    this.$store.commit('setSysDict', res.data.sys_dict)
                    this.fetchBrandMark()
                    this.setCookie('username', res.data.username, 7)
                    this.setCookie('salt', res.data.salt, 7)
                    this.setCookie('hash', res.data.hash, 7)
                    window.localStorage.setItem('mi_play_in_pl', res.data.sys_dict.mi_play_in_pl)

                    // 如果 localStorage 中未设置语言，使用后端返回的默认语言
                    const LOCALE_STORAGE_KEY = 'mtw_app_locale'
                    if (!window.localStorage.getItem(LOCALE_STORAGE_KEY) && res.data.locale) {
                        window.localStorage.setItem(LOCALE_STORAGE_KEY, res.data.locale)
                    }

                    // 用户信息加载完成后，触发路由权限重新检查
                    this.$nextTick(() => {
                        const currentRoute = this.$route

                        // 如果当前在首页相关路由，进行权限重定向
                        if (currentRoute.path === '/' || currentRoute.name === 'home') {
                            const defaultRoute = res.data.is_superuser ? '/' : '/discover'
                            if (currentRoute.path !== defaultRoute) {
                                this.$router.replace(defaultRoute)
                            }
                        }

                        // 注册全局搜索快捷键 (Cmd/Ctrl + K) - 仅 V2 版本
                        if (this.role === 'V2') {
                            this.$registerShortcut('k', () => {
                                this.triggerSearch()
                            }, {
                                preventDefault: true,
                                requireModifier: true,
                                allowInInput: true  // 允许在搜索输入框中也能触发,实现切换效果
                            })
                        }
                    })
                } else {
                    this.$router.push({ name: 'login' })
                }
            })
        },
        getSysSetting() {
            this.$api.Task.getSys({ 'key': 'is_watch_file' }).then((res) => {
                if (res.result) {
                    this.syncSwitch = res.data.items[0].value === '1'
                }
            })
        },
        handleBack() {
            this.$router.go(-1)
        },
        fetchRecord() {
            this.$api.Task.getRecord({ 'state': 'failed', 'page_size': 10 }).then((res) => {
                if (res.result) {
                    if (res.data.items.length > 0) {
                        this.$store.commit('setRemoteVersion', res.data.items[0].version)
                        this.msgList = res.data.items.filter(item => item.version >= window.projectVersion);
                        this.unreadCount = res.data.unread_count
                    }
                }
            })
        },
        submitRecord() {
            this.$api.Task.postRecord(this.msgList).then((res) => {
                if (res.result) {
                    this.unreadCount = 0
                }
            })
        },
        redirectUrl(item) {
            this.header.active = item.id
            if (item.pathName === 'library') {
                this.$router.push({ path: '/discover/' })
            } else {
                this.$router.push({ name: item.pathName })
            }
        },
        handleInput() {
            if (this.searchTerm.length > 0) {
                // 发送AJAX请求获取联想结果
                // 假设返回的结果为一个数组，存储在suggestions变量中
                if (this.searchTimeout2) {
                    clearTimeout(this.searchTimeout2)
                }
                this.searchTimeout2 = setTimeout(() => {
                    this.searchTimeout2 = null
                    this.$api.subsonic.search(this.searchTerm).then((res) => {
                        this.suggestions = res
                        this.showResults = true
                    })
                }, 300)
            } else {
                this.suggestions = {}
                this.showResults = false
            }
        },
        redirectArtist(item) {
            this.isSearch = false
            this.$router.push({ path: '/artist/id/' + item.id })
        },
        redirectAlbum(item) {
            this.isSearch = false
            this.$router.push({ path: '/album/id/' + item.id })
        },
        redirectTrack(item) {
            this.isSearch = false
            this.$router.push({ path: '/album/id/' + item.albumId })
        },
        handleClick() {
            this.triggerSearch()
        },
        triggerSearch() {
            this.isSearch = !this.isSearch
            this.searchTerm = ''
            this.$nextTick(function () {
                if (this.isSearch && this.$refs.inputVal) {
                    this.$refs.inputVal.focus()
                }
            })
        },
        handleClickOutside(event) {
            if (this.isSearch && this.$refs.searchContainer) {
                // 检查是否点击在搜索容器内
                const isClickInSearchContainer = this.$refs.searchContainer.contains(event.target)

                // 检查是否点击在搜索按钮上（包括按钮内的SVG图标）
                const isClickOnSearchButton = this.$refs.searchButton &&
                    this.$refs.searchButton.contains(event.target)

                if (!isClickInSearchContainer && !isClickOnSearchButton) {
                    this.isSearch = false
                    this.showResults = false
                }
            }
        },
        handleActiveCode() {
            this.$api.Task.activeCode({ 'code': this.code }).then((res) => {
                if (res.result) {
                    window.location.reload()
                } else {
                    this.$myMsg.notify({
                        title: this.$tt('激活失败！'),
                        content: res.message,
                        type: 'error',
                        time: 5000,
                    })
                }
            })
        },
        showSideBar() {
            this.isShowSideBar = !this.isShowSideBar
        },
        redirectAfdian() {
            window.open('https://ifdian.net/a/music-tag-web')
        },
        handleRefresh() {
            // 触发全局刷新事件
            this.$root.$emit('refresh-page')
        },
        handleBackgroundUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('upload_file', file);

                this.$api.Task.uploadImageAndSave(formData).then((res) => {
                    if (res.result) {
                        this.$myMsg.notify({
                            title: this.$tt('上传成功！'),
                            content: this.$tt('图片已保存到本地'),
                            type: 'success',
                            time: 3000,
                        });
                    } else {
                        this.$myMsg.notify({
                            title: this.$tt('上传失败！'),
                            content: res.message,
                            type: 'error',
                            time: 3000,
                        });
                    }
                }).catch(error => {
                    this.$myMsg.notify({
                        title: this.$tt('上传失败！'),
                        content: error.message,
                        type: 'error',
                        time: 3000,
                    });
                });
            }
        },
        clearBackground() {
            this.$api.Task.restoreLogo().then((res) => {
                if (res.result) {
                    this.$myMsg.notify({
                        title: this.$tt('恢复成功！'),
                        content: this.$tt('背景已恢复为默认'),
                        type: 'success',
                        time: 3000,
                    });
                }
            });
        },
        fetchSiteTitle() {
            this.$api.Task.getSys({ 'key': 'site_title' }).then((res) => {
                if (res.result && res.data.items && res.data.items.length > 0) {
                    this.siteTitle = res.data.items[0].value || 'Music Tag Web'
                }
            }).catch(() => {
                // 如果获取失败，使用默认值
                this.siteTitle = 'Music Tag Web'
            })
        },
        fetchBrandMark() {
            this.$api.Task.getSysDict().then((res) => {
                if (!res.result) return
                const data = res.data || {}
                this.brandMarkType = data.brand_mark_type === 'image' && data.brand_logo_url ? 'image' : 'letter'
                this.brandMarkText = (data.brand_mark_text || 'M').slice(0, 3)
                this.brandLogoUrl = data.brand_logo_url || ''
            }).catch(() => {
                this.brandMarkType = 'letter'
                this.brandMarkText = 'M'
                this.brandLogoUrl = ''
            })
        },
        fetchShowRoleBadge() {
            this.$api.Task.getSys({ 'key': 'show_role_badge' }).then((res) => {
                if (res.result && res.data.items && res.data.items.length > 0) {
                    this.showRoleBadge = res.data.items[0].value === '1'
                }
            }).catch(() => {
                // 如果获取失败，使用默认值
                this.showRoleBadge = true
            })
        },
        handleNotifyClick(item) {
            this.$router.push({ name: 'system' })
        }
    }
}
</script>

<style scoped>
.monitor-navigation-header {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
}

.monitor-navigation-header .header-title {
    color: #63656E;
    font-size: 16px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-left: -6px;
}

.monitor-navigation-header .header-title-icon {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 28px;
    height: 28px;
    font-size: 28px;
    color: #3A84FF;
    cursor: pointer;
}

.monitor-navigation-header .header-select {
    width: 240px;
    margin-left: auto;
    margin-right: 34px;
    border: none;
    background: #f0f1f5;
    color: #63656e;
    -webkit-box-shadow: none;
    box-shadow: none
}

.monitor-navigation-header .header-user {
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #96A2B9;
    /*       margin-left: 8px; */
}


.monitor-navigation-header .header-user:hover {
    cursor: pointer;
    color: #3A84FF
}

.monitor-navigation-admin {
    width: 170px #63656E;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background: #FFFFFF;
    border: 1px solid #E2E2E2;
    -webkit-box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
    box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
    padding: 6px 0;
    margin: 0;
    color: #63656E;
}

.monitor-navigation-admin .nav-item {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 32px;
    flex: 0 0 32px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 0 20px;
    list-style: none
}

.monitor-navigation-admin .nav-item:hover {
    color: #3A84FF;
    cursor: pointer;
    background-color: #F0F1F5;
}

.navigation-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    font-size: 14px;
}

.monitor-navigation-header .header-mind {
    color: #768197;
    font-size: 16px;
    position: relative;
    height: 32px;
    width: 32px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-right: 8px
}

.monitor-navigation-header .header-mind.is-left {
    color: #63656E;
}

.monitor-navigation-header .header-mind.is-left:hover {
    color: #3A84FF;
    background: #F0F1F5
}

.monitor-navigation-header .header-mind-mark {
    position: absolute;
    right: 8px;
    top: 8px;
    height: 7px;
    width: 7px;
    border: 1px solid #27334C;
    background-color: #EA3636;
    border-radius: 100%
}

.monitor-navigation-header .header-mind-mark.is-left {
    border-color: #F0F1F5;
}

.monitor-navigation-header .header-mind:hover {
    background: -webkit-gradient(linear, right top, left top, from(rgba(37, 48, 71, 1)), to(rgba(38, 50, 71, 1)));
    background: linear-gradient(270deg, rgba(37, 48, 71, 1) 0%, rgba(38, 50, 71, 1) 100%);
    border-radius: 100%;
    cursor: pointer;
    color: #D3D9E4;
}

.monitor-navigation-header .header-mind .lang-icon {
    font-size: 20px;
}

.monitor-navigation-header .header-mind-mark {
    position: absolute;
    right: 8px;
    top: 8px;
    height: 7px;
    width: 7px;
    border: 1px solid #27334C;
    background-color: #EA3636;
    border-radius: 100%
}

.monitor-navigation-header .header-mind-mark.is-left {
    border-color: #F0F1F5;
}

.monitor-navigation-message {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 360px;
    background-color: #FFFFFF;
    border: 1px solid #E2E2E2;
    border-radius: 2px;
    -webkit-box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
    box-shadow: 0px 3px 4px 0px rgba(64, 112, 203, 0.06);
    color: #979BA5;
    font-size: 12px;
}

.monitor-navigation-message .message-title {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 48px;
    flex: 0 0 48px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #313238;
    font-size: 14px;
    padding: 0 20px;
    margin: 0;
    border-bottom: 1px solid #F0F1F5;
}

.monitor-navigation-message .message-list {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    max-height: 450px;
    overflow: auto;
    margin: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 0;
}

.monitor-navigation-message .message-list-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 100%;
    padding: 0 20px;
}

.monitor-navigation-message .message-list-item .item-message {
    padding: 13px 0;
    line-height: 16px;
    min-height: 42px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    color: #63656E;
}

.monitor-navigation-message .message-list-item .item-date {
    padding: 13px 0;
    margin-left: 16px;
    color: #979BA5;
}

.monitor-navigation-message .message-list-item:hover {
    cursor: pointer;
    background: #F0F1F5;
}

.monitor-navigation-message .message-footer {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 42px;
    flex: 0 0 42px;
    border-top: 1px solid #F0F1F5;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: #3A84FF;
}

.header-nav-item {
    list-style: none;
    height: 50px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-right: 40px;
    color: #96A2B9;
}

.header-nav-item:hover {
    cursor: pointer;
    color: #000;
}

.header-nav-item::before {
    content: "";
    position: absolute;
    left: 25%;
    bottom: 10px;
    width: 0;
    height: 2px;
    background: rgb(1, 158, 213);
    transition: all .3s;
}

.header-nav-item:hover::before {
    width: calc(100% - 40px);
    left: 0;
    right: 0;
}

.item-active {
    color: rgb(3, 41, 81);
}

.item-active::before {
    color: #000;
    content: "";
    position: absolute;
    left: 0;
    bottom: 10px;
    height: 2px;
    background: rgb(1, 158, 213);
    width: calc(100% - 40px);
}

.animate-ping-6 {
    animation: ping-6 6s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping-6 {
    0% {
        /* 动画开始的状态 */
        transform: scale(1);
        /* 假设原始尺寸是1 */
        opacity: 1;
        /* 完全不透明 */
    }

    14.28% {
        /* 约等于1秒/7秒周期 */
        transform: scale(2);
        opacity: 0;
    }

    100% {
        /* 保持最终状态 */
        transform: scale(2);
        opacity: 0;
    }
}

.magic-header {
    position: relative;
    z-index: 80;
    width: 100%;
    align-items: center;
    padding: 8px 10px 0px;
    background:
        linear-gradient(180deg, oklch(var(--b2) / 0.96), oklch(var(--b2) / 0.72));
}

.magic-header__shell {
    display: grid;
    grid-template-columns: minmax(238px, 1fr) auto minmax(238px, 1fr);
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 64px;
    padding: 8px;
    border: 1px solid oklch(var(--bc) / 0.08);
    border-radius: 16px;
    background:
        linear-gradient(135deg, oklch(var(--b1) / 0.96), oklch(var(--b1) / 0.84)),
        oklch(var(--b1));
    box-shadow:
        inset 0 1px 0 oklch(var(--bc) / 0.05),
        0 18px 45px oklch(var(--bc) / 0.08);
}

.magic-header__brand,
.magic-actions,
.magic-nav,
.magic-brand-button,
.magic-result-item,
.magic-notify-item,
.magic-notify-row,
.magic-user-menu button {
    display: flex;
    align-items: center;
}

.magic-header__brand {
    justify-self: start;
    min-width: 0;
    gap: 8px;
}

.magic-brand-button {
    min-width: 0;
    gap: 10px;
    padding: 4px 8px 4px 4px;
    border: 0;
    border-radius: 12px;
    color: oklch(var(--bc));
    background: transparent;
    cursor: pointer;
    text-align: left;
    transition: background 180ms ease, transform 180ms ease;
}

.magic-brand-button:hover {
    background: oklch(var(--bc) / 0.06);
}

.magic-brand-button:active,
.magic-icon-button:active,
.magic-avatar-button:active,
.magic-nav__item:active,
.magic-result-item:active,
.magic-notify-item:active,
.magic-user-menu button:active {
    transform: translateY(1px);
}

.magic-brand-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    color: oklch(var(--pc));
    background:
        radial-gradient(circle at 32% 20%, oklch(var(--pc) / 0.28), transparent 34%),
        oklch(var(--p));
    font-weight: 800;
    letter-spacing: 0;
    box-shadow: inset 0 1px 0 oklch(var(--pc) / 0.28);
    overflow: hidden;
    font-size: 15px;
}

.magic-brand-mark--image {
    background: oklch(var(--b2));
}

.magic-brand-mark img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.magic-brand-copy {
    display: flex;
    min-width: 0;
    flex-direction: column;
    line-height: 1.1;
}

.magic-brand-title {
    max-width: 190px;
    overflow: hidden;
    color: oklch(var(--bc));
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.magic-role-badge {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    min-width: 38px;
    padding: 0 10px;
    border: 1px solid oklch(var(--bc) / 0.1);
    border-radius: 999px;
    color: oklch(var(--bc) / 0.78);
    background: oklch(var(--b2) / 0.86);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
}

.magic-role-badge--pulse::before {
    content: "";
    position: absolute;
    inset: -3px;
    border: 1px solid oklch(var(--p) / 0.45);
    border-radius: inherit;
    animation: magic-badge-pulse 2.4s ease-out infinite;
}

.magic-nav {
    justify-self: center;
    min-width: 0;
    justify-content: center;
    gap: 4px;
    padding: 4px;
    border: 1px solid oklch(var(--bc) / 0.06);
    border-radius: 14px;
    background: oklch(var(--b2) / 0.58);
    overflow: hidden;
}

.magic-nav__item {
    position: relative;
    flex: 0 1 auto;
    height: 38px;
    padding: 0 14px;
    border: 0;
    border-radius: 11px;
    color: oklch(var(--bc) / 0.62);
    background: transparent;
    font-size: 14px;
    font-weight: 650;
    letter-spacing: 0;
    white-space: nowrap;
    cursor: pointer;
    transition: color 180ms ease, background 180ms ease, transform 180ms ease;
}

.magic-nav__item:hover {
    color: oklch(var(--bc));
    background: oklch(var(--b1) / 0.72);
}

.magic-nav__item.is-active {
    color: oklch(var(--pc));
    background: oklch(var(--p));
    box-shadow: 0 8px 24px oklch(var(--p) / 0.22);
}

.magic-actions {
    position: relative;
    z-index: 90;
    justify-self: end;
    justify-content: flex-end;
    gap: 6px;
    min-width: 0;
}

.magic-actions .dropdown {
    position: relative;
    z-index: 90;
}

.magic-icon-button,
.magic-avatar-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border: 1px solid transparent;
    border-radius: 12px;
    color: oklch(var(--bc) / 0.72);
    background: transparent;
    cursor: pointer;
    transition: border-color 180ms ease, background 180ms ease, color 180ms ease, transform 180ms ease;
}

.magic-icon-button:hover,
.magic-avatar-button:hover {
    border-color: oklch(var(--p) / 0.18);
    color: oklch(var(--p));
    background: oklch(var(--p) / 0.08);
}

.magic-icon {
    width: 20px;
    height: 20px;
}

.magic-count-badge {
    position: absolute;
    top: -4px;
    right: -5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 19px;
    height: 19px;
    padding: 0 5px;
    border: 2px solid oklch(var(--b1));
    border-radius: 999px;
    color: oklch(var(--erc));
    background: oklch(var(--er));
    font-size: 10px;
    font-weight: 800;
    line-height: 1;
}

.magic-avatar-button {
    overflow: hidden;
    padding: 2px;
    background: oklch(var(--b2) / 0.7);
}

.magic-avatar-button img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
}

.magic-search {
    position: relative;
    display: flex;
    align-items: center;
}

.search-input-wrapper {
    width: 0;
    overflow: hidden;
    opacity: 0;
    transition: width 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease, margin 240ms ease;
}

.search-input-wrapper.search-expanded {
    width: min(260px, 24vw);
    opacity: 1;
    margin-right: 8px;
}

.magic-search-field {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    border: 1px solid oklch(var(--p) / 0.34);
    border-radius: 12px;
    background: oklch(var(--b2) / 0.72);
    box-shadow: inset 0 1px 0 oklch(var(--bc) / 0.05);
}

.magic-search-field__icon {
    position: absolute;
    left: 12px;
    width: 17px;
    height: 17px;
    color: oklch(var(--bc) / 0.48);
}

.magic-search-field__input {
    width: 100%;
    height: 100%;
    min-width: 0;
    border: 0;
    border-radius: inherit;
    padding: 0 12px 0 38px;
    color: oklch(var(--bc));
    background: transparent;
    font-size: 14px;
    outline: none;
}

.magic-search-field__input::placeholder {
    color: oklch(var(--bc) / 0.42);
}

.magic-search-field:focus-within {
    border-color: oklch(var(--p) / 0.7);
    box-shadow: 0 0 0 3px oklch(var(--p) / 0.12);
}

.magic-popover {
    border: 1px solid oklch(var(--bc) / 0.1);
    border-radius: 16px;
    background: oklch(var(--b1) / 0.98);
    box-shadow:
        inset 0 1px 0 oklch(var(--bc) / 0.04),
        0 24px 70px oklch(var(--bc) / 0.16);
}

.magic-search-results {
    position: absolute;
    top: 52px;
    right: 8px;
    z-index: 12;
    width: min(320px, 76vw);
    max-height: 440px;
    padding: 8px;
    overflow-y: auto;
}

.magic-result-group + .magic-result-group {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid oklch(var(--bc) / 0.07);
}

.magic-result-title {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 9px 6px;
    color: oklch(var(--bc) / 0.58);
    font-size: 12px;
    font-weight: 750;
}

.magic-result-title__icon {
    width: 15px;
    height: 15px;
}

.magic-result-item {
    width: 100%;
    gap: 10px;
    min-height: 48px;
    padding: 8px;
    border: 0;
    border-radius: 12px;
    color: oklch(var(--bc));
    background: transparent;
    text-align: left;
    cursor: pointer;
    transition: background 160ms ease, transform 160ms ease;
}

.magic-result-item:hover {
    background: oklch(var(--p) / 0.08);
}

.magic-result-art {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    color: oklch(var(--p));
    background: linear-gradient(135deg, oklch(var(--p) / 0.16), oklch(var(--s) / 0.12));
}

.magic-result-art--round {
    border-radius: 999px;
}

.magic-result-art__icon {
    width: 16px;
    height: 16px;
}

.magic-result-copy {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: 2px;
}

.magic-result-name,
.magic-notify-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.magic-result-name {
    color: oklch(var(--bc));
    font-size: 14px;
    font-weight: 700;
}

.magic-result-meta {
    overflow: hidden;
    color: oklch(var(--bc) / 0.52);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.magic-chevron {
    width: 16px;
    height: 16px;
    color: oklch(var(--bc) / 0.35);
    opacity: 0;
    transform: translateX(-3px);
    transition: opacity 160ms ease, transform 160ms ease;
}

.magic-result-item:hover .magic-chevron {
    opacity: 1;
    transform: translateX(0);
}

.magic-empty-state {
    padding: 28px 18px;
    text-align: center;
}

.magic-empty-state__icon {
    width: 44px;
    height: 44px;
    margin: 0 auto 10px;
    color: oklch(var(--bc) / 0.28);
}

.magic-empty-state p {
    margin: 0;
    color: oklch(var(--bc) / 0.68);
    font-size: 14px;
    font-weight: 700;
}

.magic-empty-state span {
    display: block;
    margin-top: 4px;
    color: oklch(var(--bc) / 0.42);
    font-size: 12px;
}

.magic-notify-panel {
    z-index: 900;
    width: min(430px, 88vw);
    margin-top: 12px;
    overflow: hidden;
}

.magic-popover-header,
.magic-popover-footer {
    padding: 14px 16px;
}

.magic-popover-header {
    border-bottom: 1px solid oklch(var(--bc) / 0.07);
}

.magic-popover-header h3 {
    margin: 0;
    color: oklch(var(--bc));
    font-size: 15px;
    font-weight: 800;
}

.magic-popover-header p {
    margin: 3px 0 0;
    color: oklch(var(--bc) / 0.54);
    font-size: 12px;
}

.magic-notify-list {
    max-height: 340px;
    overflow-y: auto;
}

.magic-notify-item {
    width: 100%;
    align-items: flex-start;
    gap: 10px;
    padding: 13px 16px;
    border: 0;
    border-bottom: 1px solid oklch(var(--bc) / 0.06);
    color: oklch(var(--bc));
    background: transparent;
    text-align: left;
    cursor: pointer;
    transition: background 160ms ease;
}

.magic-notify-item:hover {
    background: oklch(var(--p) / 0.07);
}

.magic-notify-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    color: oklch(var(--er));
    background: oklch(var(--er) / 0.1);
}

.magic-notify-icon svg {
    width: 16px;
    height: 16px;
}

.magic-notify-copy {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: 4px;
}

.magic-notify-row {
    min-width: 0;
    justify-content: space-between;
    gap: 12px;
}

.magic-notify-title {
    min-width: 0;
    color: oklch(var(--bc));
    font-size: 13px;
    font-weight: 750;
}

.magic-notify-row time {
    flex: 0 0 auto;
    color: oklch(var(--bc) / 0.42);
    font-size: 11px;
}

.magic-notify-content {
    display: -webkit-box;
    overflow: hidden;
    color: oklch(var(--bc) / 0.62);
    font-size: 12px;
    line-height: 1.45;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.magic-empty-state--notify {
    padding: 44px 24px;
}

.magic-popover-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid oklch(var(--bc) / 0.07);
    background: oklch(var(--b2) / 0.5);
}

.magic-popover-footer span {
    color: oklch(var(--bc) / 0.56);
    font-size: 12px;
}

.magic-popover-footer button {
    border: 0;
    color: oklch(var(--p));
    background: transparent;
    font-size: 12px;
    font-weight: 750;
    cursor: pointer;
}

.magic-user-menu {
    position: absolute;
    z-index: 1000;
    width: 230px;
    margin-top: 12px;
    padding: 8px;
    border: 1px solid oklch(var(--bc) / 0.1);
    border-radius: 16px;
    background: oklch(var(--b1) / 0.98);
    box-shadow: 0 24px 70px oklch(var(--bc) / 0.16);
}

.magic-user-menu li {
    list-style: none;
}

.magic-user-menu button {
    justify-content: space-between;
    width: 100%;
    min-height: 38px;
    padding: 8px 10px;
    border: 0;
    border-radius: 11px;
    color: oklch(var(--bc) / 0.74);
    background: transparent;
    font-size: 13px;
    font-weight: 650;
    cursor: pointer;
    transition: background 160ms ease, color 160ms ease;
}

.magic-user-menu button:hover {
    color: oklch(var(--bc));
    background: oklch(var(--p) / 0.08);
}

.magic-user-menu__warning {
    color: oklch(var(--wa)) !important;
}

.magic-menu-badge {
    max-width: 92px;
    overflow: hidden;
    padding: 3px 7px;
    border-radius: 999px;
    color: oklch(var(--bc) / 0.62);
    background: oklch(var(--b2));
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
}

@keyframes magic-badge-pulse {
    0% {
        opacity: 0.72;
        transform: scale(0.95);
    }

    100% {
        opacity: 0;
        transform: scale(1.35);
    }
}

@media (max-width: 1180px) {
    .magic-header__shell {
        grid-template-columns: minmax(190px, 1fr) auto minmax(190px, 1fr);
    }

    .magic-nav__item {
        padding: 0 10px;
        font-size: 13px;
    }

    .search-input-wrapper.search-expanded {
        width: 230px;
    }
}

@media (max-width: 900px) {
    .magic-header__shell {
        grid-template-columns: minmax(180px, 1fr) auto;
    }

    .magic-nav {
        display: none;
    }

    .search-input-wrapper.search-expanded {
        width: 220px;
    }
}

@media (prefers-reduced-motion: reduce) {
    .magic-role-badge--pulse::before {
        animation: none;
    }

    .magic-brand-button,
    .magic-icon-button,
    .magic-avatar-button,
    .magic-nav__item,
    .magic-result-item,
    .magic-notify-item,
    .magic-user-menu button,
    .search-input-wrapper,
    .magic-chevron {
        transition: none;
    }
}
</style>

<style>
.tippy-popper .tippy-tooltip.navigation-message-theme {
    padding: 0;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
}
</style>
