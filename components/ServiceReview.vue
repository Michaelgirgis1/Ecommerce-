<template>
  <div class="service-review match-height">
    <div class="review-card">
      <div class="review-card__info">
        <div class="review-card__image">
          {{review.nickname.charAt(0)}}
        </div>
        <div class="review-card__name">
          <h4>{{review.nickname}}</h4>
          <span class="fa fa-star " :class="review.ratings[0].value >= 1 ? 'checked' : ''" />
          <span class="fa fa-star checked" :class="review.ratings[0].value >= 2 ? 'checked' : ''" />
          <span class="fa fa-star checked" :class="review.ratings[0].value >= 3 ? 'checked' : ''" />
          <span class="fa fa-star" :class="review.ratings[0].value >= 4 ? 'checked' : ''" />
          <span class="fa fa-star" :class="review.ratings[0].value >= 5 ? 'checked' : ''" />
          <p>{{review.created_at}}</p>
        </div>
      </div>
      <div class="review-card__text">
        <p>{{review.detail}}</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { config, dom } from '@fortawesome/fontawesome-svg-core'
export default {
  name: 'ServiceReview',
  props: {
    review: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      rating: 4
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.service-review {
  height: 100%;
  border-bottom: 2px solid rgb(240, 242, 247);
  padding: 20px 0 0;
  &:first-child {
    border-top: 2px solid rgb(240, 242, 247);
  }
}
.checked {
  color: orange;
}
.review-card__info {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    .review-card__image {
      width: 48px;
      height: 48px;
      color: rgb(66, 171, 68);
      background: rgb(226, 246, 226);
      border-radius: 100%;
      font-weight: 900;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      margin-right: 12px;

    }
    .review-card__name {
      h4 {
        font-size: 15px;
      }
      p {
        color: rgb(189, 189, 189);
        margin-bottom: 0;

      }
    }
}
</style>
