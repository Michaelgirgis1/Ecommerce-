<template>
  <div class="sign-up">
    <v-row>
      <v-col cols="8" md="8">
        <form-wizard
          ref="wizard"
          shape="tab"
          class="sign-up-__wizard"
          back-button-text="Previous"
          next-button-text="Next"
          finish-button-text="Send"
          @on-complete="onComplete"
        >
          <h2 slot="title">
            Sign Up
          </h2>
          <tab-content title="Basic Info" :before-change="()=> validateStep($refs.FirstStep)">
            <!-- :before-change="()=>validateStep('FirstStep')"-->
            <FirstStep
              ref="FirstStep"
              @firstStepData="firstStepData($event)"
            />
          </tab-content>
          <tab-content title="OTP" :before-change="()=> validateStep($refs.SecondStep)">
            <!-- :before-change="()=>validateStep('FirstStep')"-->
            <SecondStep
              ref="SecondStep"
            />
          </tab-content>
          <tab-content title="Password" :before-change="()=> validateStep($refs.ThirdStep)">
            <!-- :before-change="()=>validateStep('FirstStep')"-->
            <ThirdStep
              v-bind="$props"
              ref="ThirdStep"
              @password="password($event)"
            />
          </tab-content>
        </form-wizard>
      </v-col>
    </v-row>

    <!-- <Loader v-if="isLoaderShow" /> -->
  </div>
</template>
<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import FirstStep from '@/components/registerSteps/FirstStep'
import SecondStep from '@/components/registerSteps/SecondStep'
import ThirdStep from '@/components/registerSteps/ThirdStep'
// import Loader from '@/components/Loader'

export default {
  components: {
    FormWizard,
    TabContent,
    FirstStep,
    SecondStep,
    ThirdStep
    // Loader
  },
  data () {
    return {
      isStepValid: false,
      isLoaderShow: false,
      registerObject: {}
    }
  },
  mounted () {
  },
  methods: {
    validateStep (currentStep) {
      this.isStepValid = currentStep.validate()
      return this.isStepValid
    },
    async onComplete () {
      await this.submitRegisterData()
      this.$router.push('/auth/login')
    },
    firstStepData (data) {
      this.registerObject = { ...data }
    },
    password (data) {
      this.registerObject.password = data
    },
    submitRegisterData () {

    }
  }
}
</script>
