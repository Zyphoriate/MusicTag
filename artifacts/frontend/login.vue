<template>
    <div>
        <ListenerLogin
          v-if="isListenerMobile"
          :username="formData.username"
          :password="formData.password"
          :is-app-mode="isAppMode"
          :api-url="apiUrl"
          :testing="testing"
          :connection-status="connectionStatus"
          :show-history="showHistory"
          :url-history="urlHistory"
          :login-providers="loginProviders"
          @update:username="formData.username = $event"
          @update:password="formData.password = $event"
          @update:api-url="apiUrl = $event"
          @focus-history="showHistory = true"
          @blur-history="hideHistory"
          @select-history="selectHistoryUrl"
          @test-connection="testConnection"
          @forgot-password="showForgetPassword"
          @social-login="startSocialLogin"
          @submit="submitLogin"
        />
        <div v-else class="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-base-200 text-base-content transition-colors">
          <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-10" src="/static/dist/img/music_null-cutout.png" :alt="$tt('Music Tag Web 标志')" />
            <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-base-content">{{ $tt('登录到您的账户') }}</h2>
          </div>

          <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST">
              <div v-if="isAppMode">
                <label for="apiUrl" class="block text-sm/6 font-medium text-base-content">{{ $tt('服务器地址') }}</label>
                <div class="mt-2 flex gap-2">
                  <div class="flex-1 relative">
                    <input
                      type="text"
                      name="apiUrl"
                      id="apiUrl"
                      v-model="apiUrl"
                      :placeholder="$tt('请输入服务器地址，例如：http://192.168.1.100:8005')"
                      @focus="showHistory = true"
                      @blur="hideHistory"
                      class="block w-full rounded-md border border-base-300 bg-base-100 px-3 py-1.5 text-base text-base-content placeholder:text-base-content/50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm/6"
                    />
                    <div
                      v-if="showHistory && urlHistory.length > 0"
                      class="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-base-300 bg-base-100 shadow-lg"
                    >
                      <div
                        v-for="(url, index) in urlHistory"
                        :key="index"
                        @mousedown.prevent="selectHistoryUrl(url)"
                        class="cursor-pointer px-3 py-2 text-sm text-base-content transition-colors hover:bg-base-200"
                      >
                        {{ url }}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    @click="testConnection"
                    :disabled="testing"
                    class="rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {{ testing ? $tt('测试中...') : $tt('测试连接') }}
                  </button>
                </div>
                <p v-if="connectionStatus.message" :class="['mt-2 text-sm', connectionStatus.success ? 'text-success' : 'text-error']">
                  {{ connectionStatus.message }}
                </p>
              </div>

              <div>
                <label for="email" class="block text-sm/6 font-medium text-base-content">{{ $tt('用户名') }}</label>
                <div class="mt-2">
                  <input name="email" id="email" autocomplete="email" required="" v-model="formData.username" :placeholder="$tt('请输入用户名')" class="block w-full rounded-md border border-base-300 bg-base-100 px-3 py-1.5 text-base text-base-content placeholder:text-base-content/50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm/6" />
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between">
                  <label for="password" class="block text-sm/6 font-medium text-base-content">{{ $tt('密码') }}</label>
                  <div class="text-sm">
                    <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500" @click.prevent="showForgetPassword">{{ $tt('忘记密码？') }}</a>
                  </div>
                </div>
                <div class="mt-2">
                  <input type="password" name="password" id="password" autocomplete="current-password" v-model="formData.password" @keydown.enter="submitLogin" required="" :placeholder="$tt('请输入密码')" class="block w-full rounded-md border border-base-300 bg-base-100 px-3 py-1.5 text-base text-base-content placeholder:text-base-content/50 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm/6" />
                </div>
              </div>

              <div>
                <button type="submit" @click.prevent="submitLogin" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ $tt('登录') }}</button>
              </div>
              <a
                v-for="provider in visibleLoginProviders"
                :key="provider.id"
                :href="`/auth/social/${provider.id}/login`"
                class="flex w-full justify-center rounded-md border border-base-300 px-3 py-1.5 text-sm font-semibold text-base-content"
              >{{ $tt('使用 {provider} 登录', { provider: provider.label }) }}</a>
            </form>

            <p class="mt-10 text-center text-sm/6 text-base-content/70">
              {{ $tt('还没有账号？') }}
              {{ ' ' }}
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">{{ $tt('请联系管理员') }}</a>
            </p>
          </div>
        </div>

        <dialog id="forget_pwd" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box bg-base-100 text-base-content">
            <h3 class="text-lg font-bold">{{ $tt('忘记密码？') }}</h3>
            <p class="py-4">{{ $tt('请联系管理员修改密码:') }}</p>
            <p class="mb-2 text-base-content/70">{{ $tt('1. 首先，您需要进入项目的Docker容器内。') }}</p>
            <p class="mb-2 text-base-content/70">{{ $tt('2. 在容器中打开终端，并执行下面的命令来启动密码更改过程：') }}</p>
            <p class="mb-2 text-base-content/70">python manage.py changepassword admin</p>
            <p class="mb-2 text-base-content/70">{{ $tt('3. 执行上述命令后，系统会提示您输入并确认新密码。请根据屏幕上的指示设置一个安全的新密码。') }}</p>
            <div class="modal-action">
            <form method="dialog">
                <button class="btn">{{ $tt('关闭') }}</button>
            </form>
            </div>
        </div>
        </dialog>
    </div>
</template>

<script>
import {
  getApiBaseUrl,
  saveApiBaseUrl,
  getApiUrlHistory,
  isValidUrl,
  testApiConnection,
  isAppMode
} from '@/utils/apiConfig'
import ListenerLogin from './ListenerLogin.vue'

export default {
    name: 'login',
    components: {
        ListenerLogin
    },
    data() {
        return {
            formData: {
                username: '',
                password: '',
                code: ''
            },
            isHasCode: false,
            // App 模式相关
            apiUrl: '',
            testing: false,
            connectionStatus: {
                success: false,
                message: ''
            },
            showHistory: false,
            urlHistory: [],
            viewportWidth: typeof window !== 'undefined' ? window.innerWidth : 1200
        }
    },
    computed: {
        loginProviders() {
            return window.MUSIC_TAG_LOGIN_PROVIDERS || []
        },
        visibleLoginProviders() {
            return this.isAppMode ? [] : this.loginProviders
        },
        isAppMode() {
            return isAppMode()
        },
        isListenerMobile() {
            return this.viewportWidth <= 768
        }
    },
    mounted() {
        this.clearToken()
        window.addEventListener('resize', this.handleResize, { passive: true })
        if (this.isAppMode) {
            this.loadApiUrl()
            this.loadUrlHistory()
        }
        this.consumeOidcToken()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        handleResize() {
            this.viewportWidth = window.innerWidth
        },
        clearToken() {
            this.setCookie('AUTHORIZATION', '', -1)
        },
        consumeOidcToken() {
            const match = window.location.hash.match(/(?:^#|&)oidc_token=([^&]+)/)
            if (!match) return
            window.history.replaceState(null, '', window.location.pathname + window.location.search)
            this.setCookie('AUTHORIZATION', 'JWT ' + decodeURIComponent(match[1]), 7)
            this.fetchUserSessionAndRedirect().catch(() => this.$router.replace({ name: 'home' }))
        },
        startSocialLogin(provider) {
            window.location.href = `/auth/social/${provider}/login`
        },
        showForgetPassword() {
            const dialog = document.getElementById('forget_pwd')
            if (dialog && typeof dialog.showModal === 'function') {
                dialog.showModal()
            }
        },
        loadApiUrl() {
            // 加载保存的 API 地址
            this.apiUrl = getApiBaseUrl()
        },
        loadUrlHistory() {
            // 加载历史记录
            this.urlHistory = getApiUrlHistory()
        },
        selectHistoryUrl(url) {
            this.apiUrl = url
            this.showHistory = false
        },
        hideHistory() {
            // 延迟隐藏,以便点击事件能够触发
            setTimeout(() => {
                this.showHistory = false
            }, 200)
        },
        async testConnection() {
            if (!this.apiUrl) {
                this.connectionStatus = {
                    success: false,
                    message: this.$tt('请输入服务器地址')
                }
                return
            }

            if (!isValidUrl(this.apiUrl)) {
                this.connectionStatus = {
                    success: false,
                    message: this.$tt('URL 格式无效,请输入完整的地址 (如: http://192.168.1.100:8005)')
                }
                return
            }

            this.testing = true
            this.connectionStatus = {
                success: false,
                message: this.$tt('正在测试连接...')
            }

            try {
                const result = await testApiConnection(this.apiUrl)
                this.connectionStatus = result

                if (result.success) {
                    // 保存成功的地址
                    saveApiBaseUrl(this.apiUrl)
                    // 重新加载历史记录
                    this.loadUrlHistory()
                    // 更新 axios baseURL
                    this.updateAxiosBaseUrl()
                }
            } catch (error) {
                this.connectionStatus = {
                    success: false,
                    message: this.$tt('测试失败: {message}', { message: error.message })
                }
            } finally {
                this.testing = false
            }
        },
        updateAxiosBaseUrl() {
            // 更新 axios 的 baseURL
            if (window.axios) {
                window.axios.defaults.baseURL = this.apiUrl
            }
        },
        getDefaultRouteByUserInfo(userInfo) {
            if (userInfo.role === 'V1') {
                return '/'
            }
            if (userInfo.is_superuser) {
                return '/'
            }
            return '/discover'
        },
        applyUserSession(userInfo) {
            this.$store.commit('setUserRole', userInfo.role)
            this.$store.commit('setIsSuperuser', userInfo.is_superuser)
            this.$store.commit('setUsername', userInfo.username)
            this.$store.commit('setDisplayName', userInfo.display_name)
            this.$store.commit('setSysDict', userInfo.sys_dict)
            this.setCookie('username', userInfo.username, 7)
            this.setCookie('salt', userInfo.salt, 7)
            this.setCookie('hash', userInfo.hash, 7)

            if (userInfo.sys_dict && userInfo.sys_dict.mi_play_in_pl !== undefined) {
                window.localStorage.setItem('mi_play_in_pl', userInfo.sys_dict.mi_play_in_pl)
            }

            const localeStorageKey = 'mtw_app_locale'
            if (!window.localStorage.getItem(localeStorageKey) && userInfo.locale) {
                window.localStorage.setItem(localeStorageKey, userInfo.locale)
            }
        },
        async fetchUserSessionAndRedirect() {
            const profile = await this.$api.Task.loginInfo()
            if (!profile.result) {
                throw new Error(profile.message || this.$tt('获取用户信息失败'))
            }
            this.applyUserSession(profile.data)
            const targetPath = this.getDefaultRouteByUserInfo(profile.data)
            this.$router.replace({ path: targetPath })
        },
        submitLogin() {
            // 如果是 app 模式,必须先配置并测试服务器地址
            if (this.isAppMode) {
                if (!this.apiUrl) {
                    this.$myMsg.notify({
                        title: this.$tt('提示'),
                        content: this.$tt('请先填写服务器地址'),
                        type: 'warning',
                        time: 2000,
                    })
                    return
                }

                // 检查是否已经测试连接成功
                if (!this.connectionStatus.success) {
                    this.$myMsg.notify({
                        title: this.$tt('提示'),
                        content: this.$tt('请先测试服务器连接'),
                        type: 'warning',
                        time: 2000,
                    })
                    return
                }

                // 保存 API 地址并更新 axios 配置
                saveApiBaseUrl(this.apiUrl)
                this.updateAxiosBaseUrl()
                // 清除需要配置服务器地址的标记
                window.needsServerConfig = false
            }

            this.$api.Task.login(this.formData).then((res) => {
                if (res.result) {
                    this.setCookie('AUTHORIZATION', 'JWT ' + res.token, 7)
                    this.fetchUserSessionAndRedirect().catch((error) => {
                        this.$router.replace({ name: 'home' })
                        this.$myMsg.notify({
                            title: this.$tt('提示'),
                            content: error.message || this.$tt('登录成功，但获取用户信息失败'),
                            type: 'warning',
                            time: 2000,
                        })
                    })
                } else {
                    this.$myMsg.notify({
                        title: this.$tt('登录失败！'),
                        content: res.message || this.$tt('登录失败'),
                        type: 'error',
                        time: 2000,
                    })
                }
            }).catch((error) => {
                this.$myMsg.notify({
                    title: this.$tt('登录失败！'),
                    content: error.message || this.$tt('网络错误,请检查服务器地址'),
                    type: 'error',
                    time: 2000,
                })
            })
        }
    }
}
</script>

<style scoped>
.login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    padding: 40px;
    margin: 20px auto;
    transform: translate(-50%, -55%);
    background: rgba(255, 255, 255, .9);
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
    border-radius: 10px;
}

.login-box p:first-child {
    margin: 0 0 30px;
    padding: 0;
    color: #465e65;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
}

.login-box .user-box {
    position: relative;
}

.login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #8c8c8c;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #465e65;
    outline: none;
    background: transparent;
}

.login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #465e65;
    pointer-events: none;
    transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #465e65;
    font-size: 12px;
}

.login-box form a {
    position: relative;
    display: inline-block;
    padding: 10px 20px;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    text-decoration: none;
    text-transform: uppercase;
    overflow: hidden;
    transition: .5s;
    margin-top: 40px;
    letter-spacing: 3px;
    width: 100%;
    text-align: center;
    background: #465e65;
}

.login-box a:hover {
    background: #465e65;
    color: #465e65;
    border-radius: 5px;
}

.login-box a span {
    position: absolute;
    display: block;
}

.login-box a span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #fff);
    animation: btn-anim1 1.5s linear infinite;
}

@keyframes btn-anim1 {
    0% {
        left: -100%;
    }

    50%, 100% {
        left: 100%;
    }
}

.login-box a span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #fff);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s;
}

@keyframes btn-anim2 {
    0% {
        top: -100%;
    }

    50%, 100% {
        top: 100%;
    }
}

.login-box a span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #fff);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s;
}

@keyframes btn-anim3 {
    0% {
        right: -100%;
    }

    50%, 100% {
        right: 100%;
    }
}

.login-box a span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #fff);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s;
}

@keyframes btn-anim4 {
    0% {
        bottom: -100%;
    }

    50%, 100% {
        bottom: 100%;
    }
}

.login-box p:last-child {
    color: #aaa;
    font-size: 14px;
}

.login-box a.a2 {
    color: #465e65;
    text-decoration: none;
}

.login-box a.a2:hover {
    background: transparent;
    color: #aaa;
    border-radius: 5px;
}
</style>
