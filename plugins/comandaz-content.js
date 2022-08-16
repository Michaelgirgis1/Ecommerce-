export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const content = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
        'Access-Control-Allow-Origin': true,
        Authorization: 'Bearer'
      }
    }
  })
  // Create a custom axios instance with integration token
  const contentIntegrationToken = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
        Authorization: 'Bearer ' + process.env.INTEGRATION_TOKEN
      }
    }
  })
  // Create a custom axios instance with integration token
  const contentContentToken = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.CONTENT_TOKEN
      }
    }
  })
  // Authorization: 'bearer ' + process.env.INTEGRATION_TOKEN
  content.setBaseURL(
    process.env.CONTENT_API_URL || 'http://dev.magento.com/rest/V1'
  )
  contentIntegrationToken.setBaseURL(
    process.env.CONTENT_API_URL || 'http://dev.magento.com/rest/V1'
  )
  contentContentToken.setBaseURL(
    process.env.CONTENT_API_URL || 'http://dev.magento.com/rest/V1'
  )
  inject('content', content)
  inject('contentInt', contentIntegrationToken)
  inject('contentToken', contentContentToken)
}
