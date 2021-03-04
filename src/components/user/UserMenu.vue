<template>
    <div class="user-menu">
        <b-dropdown class="user-menu" variant="none" no-caret right>
            <template #button-content>
                <span :class="$mq">{{ userInfo.firstname }}</span>
                <div class="user-img" :class="$mq">
                    <Gravatar v-if="isInternalLogin()" :email="userInfo.email" :alt="$t('user.user')" />
                    <img v-else :src="user.photo" :alt="$t('user.user')">
                </div>
            </template>
            <b-dropdown-item v-b-modal.user-profile-modal>
                {{ $t('user.profile') }}
            </b-dropdown-item>
            <b-dropdown-item v-if="isInternalLogin()" href="https://gravatar.com" target="_blank">
                {{ $t('user.changePhoto') }}
            </b-dropdown-item>
            <b-dropdown-item v-if="isInternalLogin()" v-b-modal.user-password-modal>
                {{ $t('user.changePassword') }}
            </b-dropdown-item>
            <b-dropdown-item @click="signOut">
                {{ $t('user.signOut') }}
            </b-dropdown-item>
        </b-dropdown>
		<FormModal entity="user" :record="user" name="user-profile-modal"
            :fields="profileFields" :title="$t('user.profileEdit')"
			:hiddenFunction="resetUser" :submitFunction="saveUser"
            :validationFunction="checkUserValidity"
            :deleteButton="$t('user.delete')" />
		<DeleteModal entity="user" :record="user" name="user-delete-modal"
			:hiddenFunction="resetUser" :deleteFunction="deleteUser"
            :msg="$t('confirmations.user.delete')" />
		<FormModal entity="user" :record="user" name="user-password-modal"
            :fields="passwordFields" :title="$t('user.changePassword')"
			:hiddenFunction="resetUser" :submitFunction="changePassword"
            :validationFunction="checkUserValidity" />
    </div>
</template>

<script>
import FormModal from '@/components/modals/FormModal'
import DeleteModal from '@/components/modals/DeleteModal'
import Gravatar from 'vue-gravatar'

import axios from 'axios'
import userMixin from '@/mixins/userMixin'

export default {
    components: { FormModal, DeleteModal, Gravatar },
    mixins: [ userMixin ],
    data() {
        return {
            userInfo: { ...this.$store.state.user },
            profileFields: [
                { key: 'firstname', state: null, required: true },
                { key: 'lastname' },
                { key: 'email', state: null, required: true, disabled: !this.isInternalLogin(),
                    validation: 'checkEmail', validationMsg: this.$t('messages.user.emailInvalid') }
            ],
            passwordFields: [
                { key: 'passwordOld', type: 'password', state: null, required: true },
                { key: 'passwordNew', type: 'password', state: null, required: true,
                    validation: 'checkPassword',
                    validationMsg: this.$t('messages.user.passwordNewInvalid') },
                { key: 'passwordNewConfirmation', type: 'password', state: null, required: true,
                    validation: 'checkPasswordConfirmation',
                    validationMsg: this.$t('messages.user.passwordNewConfirmationMatch') },
            ]
        }
    },
	computed: {        
		user() { return this.$store.state.user }
    },
    methods: {
        isInternalLogin() {
            return this.$store.state.user.loginType === 'internal'
        },

        resetUser() {
            const json = localStorage.getItem(this.userKey)
			const userData = JSON.parse(json)

			if(userData) {
				this.setUser(userData)
			}
        },

		saveUser() {
            const user = { ...this.user }
            user.firstname = this.removeExtraSpaces(user.firstname)
            user.lastname = this.removeExtraSpaces(user.lastname)

            axios.put(`${this.baseApiUrl}/users/${user.id}`, user)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: this.$t(
                            'messages.user.updated'
                        )
                    })
                    this.setUser(user)
                    localStorage.setItem(this.userKey, JSON.stringify(user))
                    this.userInfo = user
                    this.$bvModal.hide('user-profile-modal')
                })
                .catch(this.showError)
                .finally(() => {
                   this.$store.commit('mutate', { prop: 'buttonSpinner', with: false })
                })
        },
        
        deleteUser() {
            const id = this.user.id

            axios.delete(`${this.baseApiUrl}/users/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: this.$t('messages.user.accountDeleted')
                    })
                    this.signOut()
                })
                .catch(this.showError)
                .finally(() => {
                    this.$store.commit('mutate', { prop: 'buttonSpinner', with: false })
                })
        },

        changePassword() {
            axios.put(`${this.baseApiUrl}/changePassword/${this.user.id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess({
                        msg: this.$t('messages.user.passwordChanged')
                    })
                    this.$bvModal.hide('user-password-modal')
                })
                .catch(this.showError)
                .finally(() => {
                   this.$store.commit('mutate', { prop: 'buttonSpinner', with: false })
                })
        },

        signOut() {
            this.setUser(null)
            localStorage.removeItem(this.userKey)

            this.$store.commit('mutate', { prop: 'tools', with: [] })
            this.$store.commit('mutate', { prop: 'search', with: '' })
            this.$store.commit('mutate', { prop: 'tagsOnly', with: false })
            this.$store.commit('mutate', { prop: 'count', with: 0 })
            this.$store.commit('mutate', { prop: 'page', with: 1 })

            this.$router.push({ path: '/auth' })
        },

        checkUserValidity(record, fields) {
            let valid = this.checkFormValidity(record, fields)
            fields.forEach(field => {
                if(field.validation) {
                    field.state = this[field.validation](record[field.key])
                    if(!field.state) valid = false
                }
            })
            return valid
        },

        checkEmail(value) {
            // eslint-disable-next-line no-control-regex
            const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
            
            return regex.test(value)
        },
        checkPassword(value = '') {
            return value.length >= 8
        },
        checkPasswordConfirmation(value) {
            return !!value && value === this.user.passwordNew
        }
    }
}
</script>

<style lang="scss">
@import "@/styles/custom.scss";

.user-menu .btn {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    color: $gray-600;
    cursor: pointer;    
}
.user-menu span {
    margin: 0 8px 0 40px;
    font-weight: 600;
    &.sm,
    &.xs {
        display: none;
    }
} 
.user-menu .user-img {
    img { 
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    &.sm {
        margin-left: 20px;
    }
    &.xs {
        margin: 10px 0;
    }
}
.user-menu .dropdown-menu {
	box-shadow: $dropdown-box-shadow;
}
.user-menu ul {
    padding: 0;
}
</style>