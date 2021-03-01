<template>
	<div class="auth">
        <h1>{{ showSignup ? $t('user.signup') : $t('user.signin') }}</h1>
        <b-form>
			<b-form-group v-for="field in fields" :key="field.key">
				<b-form-input v-if="!field.display ? showSignup : field.display"
					:type="field.type || 'text'" :name="field.key" v-model="user[field.key]"
                    :placeholder="$t(`fields.user.${field.key}`)" :disabled="buttonSpinner"
					autocomplete="off" autocorrect="off" autocapitalize="none" />
			</b-form-group>

			<b-button v-if="showSignup" variant="primary" @click="signup" :disabled="buttonSpinner">
                <Spinner v-if="buttonSpinner" :caption="$t('spinners.save')" size="small" />
                <span v-else>{{ $t('user.signup') }}</span>                
            </b-button>
            <b-button v-else variant="primary" @click="signin" :disabled="buttonSpinner">
                <Spinner v-if="buttonSpinner" :caption="$t('spinners.auth')" size="small" />
                <span v-else>{{ $t('user.signin') }}</span>                
            </b-button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">{{ $t('user.signinLink') }}</span>
                <span v-else>{{ $t('user.signupLink') }}</span>
            </a>
		</b-form>
	</div>
</template>

<script>
import Spinner from '@/components/template/Spinner'

import axios from 'axios'
import userMixin from '@/mixins/userMixin'

export default {
	components: { Spinner },
    mixins: [ userMixin ],
	data() {
		return {
            user: {},
            showSignup: false,
            buttonSpinner: false,
            fields: [
                { key: 'firstname', display: false },
                { key: 'lastname', display: false },
                { key: 'email', type: 'email', display: true },
                { key: 'password', type: 'password', display: true },
                { key: 'passwordConfirmation', type: 'password', display: false }
            ]
		}
	},
    mounted() {
        this.setUser(null)
        localStorage.removeItem(this.userKey)
    },
	methods: {        
        signup() {
            this.buttonSpinner = true

            const user = { ...this.user }
            user.firstname = this.removeExtraSpaces(user.firstname),
            user.lastname = this.removeExtraSpaces(user.lastname),

            axios.post(`${this.baseApiUrl}/signup`, user)
                .then(() => {
                    this.signin()
                })
                .catch(this.showError)
                .finally(() => {
                    this.buttonSpinner = false
                })
        },
        signin() {
            this.buttonSpinner = true

            axios.post(`${this.baseApiUrl}/signin`, this.user)
                .then(res => {
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
                })
                .catch(this.showError)
                .finally(() => {
                    this.buttonSpinner = false
                })
        }
	}
}
</script>

<style lang="scss">
@import '@/styles/custom.scss';

.auth {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.auth h1 {
    padding-top: 10px;
    font-size: 1.2rem;
}
.auth form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
}
.auth form .form-group {
    width: 100%;
}
.auth form .form-group input {
    font-size: 0.95rem;
}
.auth form .form-group.is-invalid {
	margin: 0;
}
.auth form .form-group input.is-invalid {
    background: $white-red;
}
.auth form .form-group .invalid-feedback {
	text-align: right;
}
.auth form button {
    align-self: flex-end;
    min-width: 98px;
    min-height: 40px;
    margin: 5px 0 25px 0;
    padding: auto 20px;
}
</style>