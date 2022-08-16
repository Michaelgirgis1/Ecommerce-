import Vue from 'vue'
import VCalendar from 'v-calendar'
import Calendar from 'v-calendar/lib/components/calendar.umd'
import DatePicker from 'v-calendar/lib/components/date-picker.umd'

Vue.use(VCalendar, {
  componentPrefix: 'vc'
})
Vue.component('Calendar', Calendar)
Vue.component('DatePicker', DatePicker)
