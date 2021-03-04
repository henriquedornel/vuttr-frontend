import axios from 'axios'
import globalMixin from '@/mixins/globalMixin'

export default {
    mixins: [ globalMixin ],
    data: () => ({
        userKey: '__vuttr_user',
        googleClientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        facebookAppId: process.env.VUE_APP_FACEBOOK_APP_ID
    }),
	methods: {
        setUser(user) {
            this.$store.commit('mutate', { prop: 'user', with: user })
            
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
            } else {
                delete axios.defaults.headers.common['Authorization']
            }
        },
        
        signUp() {
            this.$store.commit('mutate', { prop: 'buttonSpinner', with: true })

            const user = { ...this.user }
            user.firstname = this.removeExtraSpaces(user.firstname),
            user.lastname = this.removeExtraSpaces(user.lastname),

            axios.post(`${this.baseApiUrl}/signUp`, user)
                .then(() => {
                    this.$store.commit('mutate', { prop: 'loginSpinner', with: true })
                    this.signIn()
                })
                .catch(this.showError)
                .finally(() => {
                    this.$store.commit('mutate', { prop: 'buttonSpinner', with: false })
                })
        },
        
        signIn() {
            this.$store.commit('mutate', { prop: 'buttonSpinner', with: true })

            axios.post(`${this.baseApiUrl}/signIn`, this.user)
                .then(res => {
                    if(res.data === 'google') {
                        this.signInWithGoogle()
                    } else if(res.data === 'facebook') {
                        this.signInWithFacebook()
                    } else {
                        let name = res.data.firstname
                    if(res.data.lastname) {
                        name += ' ' + res.data.lastname
                    }
                    this.$toasted.global.defaultSuccess({
                        msg: this.$t('messages.user.welcome', { name })
                    })
                    this.setUser(res.data)
                    localStorage.setItem(this.userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                    }                    
                })
                .catch(this.showError)
                .finally(() => {
                    this.$store.commit('mutate', { prop: 'buttonSpinner', with: false })
                })
        },
        
		signInWithGoogle() {
            this.$store.commit('mutate', { prop: 'loginSpinner', with: true })
            this.$gAuth
                .signIn()
                .then(googleUser => {
                    googleUser.clientId = this.googleClientId
                    axios.post(`${this.baseApiUrl}/signInWithGoogle`, googleUser)
                        .then(res => {
                            this.user = res.data
                            this.signIn()
                        })
                        .catch(this.showError)
                })
                .catch(() => this.$store.commit('mutate', { prop: 'loginSpinner', with: false }))
        },

		signInWithFacebook () {
			/*window.FB.login(response => {
				var userInfo = {
					loginType: 'fb',
					fb: response
				}
				console.log('fb response', response)
				this.$store.commit('setLoginUser', userInfo)
				router.push('/home')
			}, this.params)*/
		}
    }
}