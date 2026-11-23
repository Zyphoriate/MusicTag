<template>
    <div class="space-y-6">
        <!-- 系统基本信息卡片 -->
        <div class="card bg-base-100 shadow-lg border border-base-200">
            <div class="card-body">
                <h2 class="card-title text-lg font-semibold mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ $tt('系统信息') }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- 版本信息 -->
                    <div class="stats shadow-sm bg-base-200/50 flex justify-between items-center">
                        <div class="stat px-4 py-3">
                            <div class="stat-title text-sm">{{ $tt('系统版本') }}</div>
                            <div class="stat-value text-lg font-medium text-primary">{{ versionNum }}</div>
                        </div>
                        <div class="w-40">
                            <button class="btn btn-primary btn-sm gap-1 mr-2" onclick="docker_update_modal.showModal()" v-if="getRemoteVersion !== version">
                                <div class="flex items-center gap-1">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                        </path>
                                    </svg>
                                    {{ $tt('检查更新') }}
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- 更新时间 -->
                    <div class="stats shadow-sm bg-base-200/50">
                        <div class="stat px-4 py-3">
                            <div class="stat-title text-sm">{{ $tt('更新时间') }}</div>
                            <div class="stat-value text-lg font-medium">{{ version }}</div>
                        </div>
                    </div>
                </div>

                <!-- 激活信息 -->
                <div class="divider my-4"></div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">{{ $tt('激活码') }}</span>
                        </label>
                        <div class="flex items-center space-x-2">
                            <div class="badge badge-outline badge-lg cursor-pointer hover:badge-primary transition-colors duration-200"
                                @click="copyActivationCode">
                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z">
                                    </path>
                                </svg>
                                {{ $tt('点击复制') }}
                            </div>
                        </div>
                    </div>

                    <div class="form-control">
                        <label class="label">
                            <span class="label-text font-medium">{{ $tt('激活服务器') }}</span>
                        </label>
                        <div class="badge badge-success badge-lg text-white">{{ sysInfo.code_server_status }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 系统环境信息卡片 -->
        <div class="card bg-base-100 shadow-lg border border-base-200">
            <div class="card-body">
                <h2 class="card-title text-lg font-semibold mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                        </path>
                    </svg>
                    {{ $tt('系统环境') }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                        class="stat bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <div class="stat-title text-blue-600 dark:text-blue-400">{{ $tt('数据库') }}</div>
                        <div class="stat-value text-sm text-blue-800 dark:text-blue-200">{{ sysInfo.database_name }}
                        </div>
                    </div>

                    <div
                        class="stat bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-700">
                        <div class="stat-title text-green-600 dark:text-green-400">{{ $tt('FFmpeg版本') }}</div>
                        <div class="stat-value text-sm text-green-800 dark:text-green-200 break-words whitespace-pre-wrap">{{ sysInfo.ffmpeg_version }}
                        </div>
                        <button
                            v-if="isFfmpegMissing"
                            class="btn btn-success btn-xs mt-2"
                            :class="{ loading: ffmpegDownloading }"
                            :disabled="ffmpegDownloading"
                            @click="downloadFfmpeg">
                            {{ ffmpegDownloading ? $tt('安装中') : $tt('安装 FFmpeg') }}
                        </button>
                    </div>

                    <div
                        class="stat bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-700">
                        <div class="stat-title text-purple-600 dark:text-purple-400">{{ $tt('服务器用户') }}</div>
                        <div class="stat-value text-sm text-purple-800 dark:text-purple-200 break-words whitespace-pre-wrap">{{ sysInfo.linux_user_id }}
                        </div>
                    </div>

                    <div
                        class="stat bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg border border-orange-200 dark:border-orange-700">
                        <div class="stat-title text-orange-600 dark:text-orange-400">{{ $tt('服务器架构') }}</div>
                        <div class="stat-value text-sm text-orange-800 dark:text-orange-200">{{ sysInfo.linux_uname }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 服务进程管理卡片 -->
        <div class="card bg-base-100 shadow-lg border border-base-200">
            <div class="card-body">
                <h2 class="card-title text-lg font-semibold mb-4 flex items-center">
                    <svg class="w-5 h-5 mr-2 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    {{ $tt('服务进程管理') }}
                </h2>

                <!-- 桌面端表格显示 -->
                <div class="overflow-x-auto hidden md:block">
                    <table class="table table-zebra w-full">
                        <thead>
                            <tr class="bg-base-200">
                                <th class="text-center">#</th>
                                <th>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z">
                                            </path>
                                        </svg>
                                        {{ $tt('进程ID') }}
                                    </div>
                                </th>
                                <th>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z">
                                            </path>
                                        </svg>
                                        {{ $tt('服务名称') }}
                                    </div>
                                </th>
                                <th>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {{ $tt('运行状态') }}
                                    </div>
                                </th>
                                <th>
                                    <div class="flex items-center">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {{ $tt('运行时间') }}
                                    </div>
                                </th>
                                <th class="text-center">
                                    <div class="flex items-center justify-center">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4">
                                            </path>
                                        </svg>
                                        {{ $tt('操作') }}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in sysInfo.process_info" :key="index" class="hover:bg-base-200/50">
                                <td class="text-center">
                                    <div class="badge badge-neutral badge-sm">{{ index + 1 }}</div>
                                </td>
                                <td>
                                    <div class="font-mono text-sm bg-base-200 px-2 py-1 rounded">{{ item.pid_name }}
                                    </div>
                                </td>
                                <td>
                                    <div class="font-medium">{{ item.name }}</div>
                                </td>
                                <td>
                                    <div class="flex items-center space-x-2">
                                        <span class="loading loading-ball loading-sm text-success"
                                            v-if="isProcessRunning(item)"></span>
                                        <svg v-else class="w-4 h-4 text-error" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                            </path>
                                        </svg>
                                        <span :class="{
                                            'badge-success': isProcessRunning(item),
                                            'badge-error': !isProcessRunning(item)
                                        }" class="badge badge-sm text-white">
                                            {{ $tt(item.state_name) }}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-sm text-base-content/70">{{ item.description }}</div>
                                </td>
                                <td>
                                    <div class="flex items-center space-x-1">
                                        <!-- Worker 特殊操作按钮 -->
                                        <button v-if="item.pid_name === 'worker'" 
                                                class="btn btn-info btn-xs gap-1 text-white"
                                                @click="openWorkerMonitor">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                                            </svg>
                                            {{ $tt('监控') }}
                                        </button>
                                        <!-- 通用操作按钮 -->
                                        <button class="btn btn-success btn-xs gap-1 text-white"
                                            v-if="!isProcessRunning(item)"
                                            @click="controlSupervisor('start', item.pid_name, item.group)">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m5-5a9 9 0 11-18 0 9 9 0 0118 0z">
                                                </path>
                                            </svg>
                                            {{ $tt('启动') }}
                                        </button>
                                        <button class="btn btn-error btn-xs gap-1 text-white" v-if="canStop(item)"
                                            @click="controlSupervisor('stop', item.pid_name, item.group)">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 9h6v6H9z"></path>
                                            </svg>
                                            {{ $tt('停止') }}
                                        </button>
                                        <button class="btn btn-warning btn-xs gap-1 text-white"
                                            @click="controlSupervisor('restart', item.pid_name, item.group)">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                                </path>
                                            </svg>
                                            {{ $tt('重启') }}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- 移动端卡片显示 -->
                <div class="block md:hidden space-y-3">
                    <div v-for="(item, index) in sysInfo.process_info" :key="index" 
                         class="card bg-base-100 shadow-sm border border-base-200 hover:shadow-md transition-shadow">
                        <div class="card-body p-4">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center space-x-2">
                                    <div class="badge badge-neutral badge-sm">{{ index + 1 }}</div>
                                    <div class="font-medium text-base">{{ item.name }}</div>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <span class="loading loading-ball loading-sm text-success"
                                        v-if="isProcessRunning(item)"></span>
                                    <svg v-else class="w-4 h-4 text-error" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                        </path>
                                    </svg>
                                    <span :class="{
                                        'badge-success': isProcessRunning(item),
                                        'badge-error': !isProcessRunning(item)
                                    }" class="badge badge-sm text-white">
                                        {{ $tt(item.state_name) }}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-base-content/70">{{ $tt('进程ID:') }}</span>
                                    <span class="font-mono bg-base-200 px-2 py-0.5 rounded text-xs">{{ item.pid_name }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-base-content/70">{{ $tt('运行时间:') }}</span>
                                    <span>{{ item.description }}</span>
                                </div>
                            </div>
                            
                            <div class="flex flex-wrap gap-2 mt-4">
                                <!-- Worker 特殊监控按钮 -->
                                <button v-if="item.pid_name === 'worker'" 
                                        class="btn btn-info btn-xs gap-1 text-white flex-1 min-w-0"
                                        @click="openWorkerMonitor">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                                    </svg>
                                    {{ $tt('监控') }}
                                </button>
                                <!-- 通用操作按钮 -->
                                <button class="btn btn-success btn-xs gap-1 text-white flex-1 min-w-0"
                                    v-if="!isProcessRunning(item)"
                                    @click="controlSupervisor('start', item.pid_name, item.group)">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m5-5a9 9 0 11-18 0 9 9 0 0118 0z">
                                        </path>
                                    </svg>
                                    {{ $tt('启动') }}
                                </button>
                                <button class="btn btn-error btn-xs gap-1 text-white flex-1 min-w-0" v-if="canStop(item)"
                                    @click="controlSupervisor('stop', item.pid_name, item.group)">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 9h6v6H9z"></path>
                                    </svg>
                                    {{ $tt('停止') }}
                                </button>
                                <button class="btn btn-warning btn-xs gap-1 text-white flex-1 min-w-0"
                                    @click="controlSupervisor('restart', item.pid_name, item.group)">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                        </path>
                                    </svg>
                                    {{ $tt('重启') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <dialog id="docker_update_modal" class="modal" ref="dockerUpdateModal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">{{ $tt('项目自动更新') }}</h3>
                <div class="bg-info/10 border border-info/20 rounded-lg p-4 my-4">
                    <div class="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-info mt-0.5 flex-shrink-0"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <h3 class="font-medium text-info mb-1">{{ $tt('更新说明') }}</h3>
                            <p class="text-sm text-base-content/70">
                                {{ $tt('自动更新采用containrrr/watchtower容器更新, 如不存在该镜像会自动拉取，请确保网络可达') }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">{{ $tt('本项目容器名称:') }}</span>
                    </label>
                    <input type="text" class="input input-bordered" v-model="dockerUpdateContainer" />
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-neutral btn-sm mr-2" @click="checkUpdate" :disabled="updateChecking">
                            {{ $tt('确认') }}
                            <span v-if="updateChecking" class="loading loading-spinner loading-sm"></span>
                        </button>
                        <button class="btn btn-sm">{{ $tt('取消') }}</button>
                    </form>
                </div>
            </div>
        </dialog>

        <!-- Worker 监控模态框 -->
        <dialog id="worker_monitor_modal" class="modal" ref="workerMonitorModal" @close="closeWorkerMonitor">
            <div class="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeWorkerMonitor">✕</button>
                </form>
                <h3 class="text-lg font-bold mb-4">{{ $tt('Celery Worker 监控') }}</h3>
                <WorkerMonitor ref="workerMonitor" />
            </div>
        </dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WorkerMonitor from './WorkerMonitor.vue'

export default {
    name: 'SystemInfo',
    components: {
        WorkerMonitor
    },
    props: {
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            sysInfo: {
                raw_code: '',
                app_version: '',
                app_channel: '',
                code_server_status: '',
                database_name: '',
                ffmpeg_version: '',
                linux_user_id: '',
                linux_uname: '',
                process_info: [],
                cpu_usage: 0,
                memory_usage: 0,
                disk_usage: 0
            },
            updateChecking: false,
            updateInfo: '',
            dockerUpdateContainer: 'music-tag-web',
            ffmpegDownloading: false
        }
    },
    created() {
        this.fetchSystemInfo()
    },
    computed: {
        ...mapGetters(['getRemoteVersion']),
        version() {
            return window.projectVersion
        },
        versionNum() {
            return this.sysInfo.app_version || window.projectVersionNum
        },
        isFfmpegMissing() {
            return this.sysInfo.ffmpeg_version === '未安装'
        }
    },
    methods: {
        normalizeProcessState(item) {
            const code = String((item && (item.state || item.state_code)) || '').trim().toLowerCase()
            const name = String((item && item.state_name) || '').trim().toLowerCase()
            return { code, name }
        },
        isProcessRunning(item) {
            const { code, name } = this.normalizeProcessState(item)
            if (['running', 'run', 'started', 'up'].includes(code)) {
                return true
            }
            const runningNames = ['running', '正在运行', '正在運行', '运行中', '運行中']
            return runningNames.some((stateName) => name === stateName.toLowerCase())
        },
        fetchSystemInfo() {
            this.$api.Task.getSysInfo().then((res) => {
                if (res.result) {
                    this.sysInfo = res.data
                }
            })
        },
        downloadFfmpeg() {
            this.ffmpegDownloading = true
            this.$api.Task.downloadFfmpeg({}).then((res) => {
                if (res.result) {
                    this.$myMsg.notify({
                        title: this.$tt('FFmpeg 安装成功'),
                        content: res.data.ffmpeg_version,
                        type: 'success',
                        time: 3000
                    })
                    this.fetchSystemInfo()
                } else {
                    this.$myMsg.notify({
                        title: this.$tt('FFmpeg 安装失败'),
                        content: res.msg,
                        type: 'error',
                        time: 4000
                    })
                }
            }).catch(() => {
                this.$myMsg.notify({
                    title: this.$tt('FFmpeg 安装失败'),
                    type: 'error',
                    time: 4000
                })
            }).finally(() => {
                this.ffmpegDownloading = false
            })
        },
        controlSupervisor(action, pidName, group) {
            this.$api.Task.supervisorControl({
                action: action,
                name: pidName,
                group: group
            }).then((res) => {
                if (res.result) {
                    this.$myMsg.notify({
                        title: this.$tt('修改成功！'),
                        type: 'success',
                        time: 2000,
                    })
                    // 刷新进程信息
                    setTimeout(() => {
                        this.fetchSystemInfo()
                    }, 1000)
                }
            })
        },
        canStop(item) {
            // 某些关键进程不允许停止
            const criticalProcesses = ['gunicorn', 'nginx']
            return this.isProcessRunning(item) && !criticalProcesses.includes(item.pid_name)
        },
        checkUpdate() {
            this.updateChecking = true
            this.updateInfo = ''
            this.$api.Task.dockerUpdate({
                container_name: this.dockerUpdateContainer
            }).then((res) => {
                this.updateChecking = false
                if (res.result) {
                    this.$refs.dockerUpdateModal.close()
                    this.$myMsg.notify({
                        title: this.$tt('更新成功'),
                        content: res.data.message,
                        type: 'success',
                        time: 4000,
                    })
                } else {
                    this.$myMsg.notify({
                        title: this.$tt('更新失败'),
                        content: res.data.message,
                        type: 'error',
                        time: 4000,
                    })
                }
            }).catch(() => {
                this.updateChecking = false
                this.$myMsg.notify({
                    title: this.$tt('更新失败'),
                    content: this.$tt('检查更新失败'),
                    type: 'error',
                    time: 2000,
                })
            })
        },
        copyActivationCode() {
            if (!this.sysInfo.raw_code) {
                this.$myMsg.notify({
                    title: this.$tt('激活码为空'),
                    type: 'warning',
                    time: 2000,
                })
                return
            }

            // 使用现代的 Clipboard API
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(this.sysInfo.raw_code).then(() => {
                    this.$myMsg.notify({
                        title: this.$tt('激活码已复制到剪贴板'),
                        type: 'success',
                        time: 2000,
                    })
                }).catch(() => {
                    this.fallbackCopyTextToClipboard(this.sysInfo.raw_code)
                })
            } else {
                // 降级处理，使用传统方法
                this.fallbackCopyTextToClipboard(this.sysInfo.raw_code)
            }
        },
        fallbackCopyTextToClipboard(text) {
            const textArea = document.createElement('textarea')
            textArea.value = text
            textArea.style.top = '0'
            textArea.style.left = '0'
            textArea.style.position = 'fixed'
            textArea.style.opacity = '0'
            document.body.appendChild(textArea)
            textArea.focus()
            textArea.select()

            try {
                const successful = document.execCommand('copy')
                if (successful) {
                    this.$myMsg.notify({
                        title: this.$tt('激活码已复制到剪贴板'),
                        type: 'success',
                        time: 2000,
                    })
                } else {
                    this.$myMsg.notify({
                        title: this.$tt('复制失败，请手动复制'),
                        type: 'error',
                        time: 2000,
                    })
                }
            } catch (err) {
                this.$myMsg.notify({
                    title: this.$tt('复制失败，请手动复制'),
                    type: 'error',
                    time: 2000,
                })
            }

            document.body.removeChild(textArea)
        },
        openWorkerMonitor() {
            // 打开 Worker 监控模态框
            this.$refs.workerMonitorModal.showModal()
            // 启动监控
            this.$nextTick(() => {
                if (this.$refs.workerMonitor) {
                    this.$refs.workerMonitor.startMonitoring()
                }
            })
        },
        closeWorkerMonitor() {
            // 停止监控
            if (this.$refs.workerMonitor) {
                this.$refs.workerMonitor.stopMonitoring()
            }
        }
    }
}
</script>
