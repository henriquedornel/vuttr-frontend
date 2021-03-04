<template>
	<div class="auth">
        <h1>{{ showSignUp ? $t('user.signUp') : $t('user.signIn') }}</h1>
        <b-form @submit.prevent="showSignUp ? signUp() : signIn()" :class="$mq">
            <b-form-group v-for="field in fields" :key="field.key">
                <b-form-input v-if="!field.display ? showSignUp : field.display"
                    :type="field.type || 'text'" :name="field.key" v-model="user[field.key]"
                    :placeholder="$t(`fields.user.${field.key}`)" :disabled="loginSpinner || buttonSpinner"
                    autocorrect="off" autocapitalize="none" />
            </b-form-group>
            <b-button type="submit" variant="primary" block :disabled="loginSpinner || buttonSpinner">
                <Spinner v-if="buttonSpinner" size="small"
                    :caption="showSignUp ? $t('spinners.save') : $t('spinners.auth')" />
                <span v-else>
                    {{ showSignUp ? $t('user.signUp') : $t('user.signIn') }}
                </span>                
            </b-button>
            <div v-if="loginSpinner" class="login-spinner">
                <Spinner :caption="$t('spinners.auth')" variant="primary" size="small" />
            </div>
            <div v-else class="signin-choice"><span>{{ $t('user.signInWith') }}</span></div>
            <SocialSignIn />
            <a href @click.prevent="showSignUp = !showSignUp" :class="$mq">
                <span v-if="showSignUp">{{ $t('user.signInLink') }}</span>
                <span v-else>{{ $t('user.signUpLink') }}</span>
            </a>
        </b-form>
	</div>
</template>

<script>
import Spinner from '@/components/template/Spinner'
import SocialSignIn from '@/components/user/SocialSignIn'

import { mapState } from 'vuex'
import userMixin from '@/mixins/userMixin'

export default {
	components: { Spinner, SocialSignIn },
    mixins: [ userMixin ],
    computed: mapState(['loginSpinner', 'buttonSpinner']),
	data() {
		return {
            user: {},
            showSignUp: false,
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
        this.$store.commit('mutate', { prop: 'loginSpinner', with: false })
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
    padding-top: 20px;
    font-size: 1.2rem;
}
.auth form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
	&.sm,
	&.xs {
		width: 100%;
        font-size: 0.95rem;
	}
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
    min-width: 98px;
    min-height: 40px;
    margin-top: 5px;
    padding: auto 20px;
}
.auth .signin-choice {
	padding: 15px 0 5px 0;
    font-size: 16px;
    color: $gray-700;
    text-align: center;
}
.auth .login-spinner .spinner {
	margin: 15px 0 10px 0;
}
.auth form a {
    text-align: center;
	&.xs {
        font-size: 0.85rem;
	}
    &:hover {
        text-decoration: none;
    }
}
</style>