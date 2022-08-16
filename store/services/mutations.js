export function setServices (state, value) {
  state.services = value
}

export function setServicesDetails (state, value) {
  state.servicesDetails = value
}

export function setCrossSell (state, value) {
  state.crossSell = value
}

export function setUpsell (state, value) {
  state.upSell = value
}

export function setServiceReview (state, value) {
  state.serviceReview = value
}

export function setServiceCartFlag (state, value) {
  state.servicesDetails.isAddToCart = value.isAdd
}
