<template>
  <div class="select-time">
    <div class="calender">
      <v-date-picker
        v-model="selectedDate"
        :allowed-dates="allowedDates"
        class=""
        min="2022-06-08"
        max="2022-09-20"
        @input="updateValue"
      />
      <div class="select-time__slots" :class="isTimeSlotsShow? 'show': ''">
        <v-radio-group v-model="timeSelected" label="Select Time">
          <v-radio
            v-for="(time, index) in timeSlots"
            :key="index"
            :label="time"
            :value="time"
            name="some-radios"
          />
        </v-radio-group>
      </div>
    </div>

    <div class="selected-time" :class="timeSelected!= '' && selectedDate != null? 'show' : ''">
      <h2>{{selectedDate}} {{timeSelected}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedDate: null,
      date: '2022-06-02',
      timeSelected: '',
      checkedTime: null,
      isTimeSlotsShow: false,
      timeSlots: ['09:00 AM - 11:00AM', '11:00 AM - 01:00PM', '01:00 PM - 03:00PM'],
      avialableDates: [3, 9, 11, 14, 19, 23, 27, 31]

    }
  },
  methods: {
    allowedDates (val) {
      const currentDay = parseInt(val.split('-')[2], 10)
      return this.avialableDates.includes(currentDay)
    },
    timeChange (args) {
      // console.log(args)
    },
    updateValue () {
      // debugger
      this.isTimeSlotsShow = true
      // this.$emit('input', target.valueAsDate);
    }
  }
}
</script>

<style lang="scss">
.select-time {
  .calender {
    display: flex;
    position: relative;
    margin-bottom: 30px;
    .select-time__slots {
    box-shadow: 10px 10px 5px #aaaaaa;
    padding: 0 20px;
    // position: absolute;
    // left: -100%;
    // width: 0;
    opacity: 0;
    transition: all 0.5s ease;
    z-index: 0;
    margin-left: -20px;
    margin-top: -20px;
    // height: 0;
    &.show {
      opacity: 1;
      width: auto;
      left: 0;
      margin-left: 0;
      margin-top: 0;
      // height: 100%;

    }
    legend {
      font-size: 25px;
      font-weight: bold;
    }
    .custom-control {
      padding-top: 5px;
      padding-bottom: 5px;
      .custom-control-label {
        font-size: 18px;
      }
    }
    }
    label {
      margin-bottom: 2px;
    }
    .v-picker__title {
      display: none;
    }
    .theme--light.v-picker__body {
      background-color: #f3f3f3;
      border-radius: 15px;
    }
  }

  .selected-time {
    transition: all 0.5s ease;
    opacity: 0;
    padding-left: -10px;
    margin-bottom: 30px;
    &.show {
      padding-left: 15px;
      opacity: 1;
    }
  }
}
</style>
