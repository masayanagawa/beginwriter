import Amplify, { Auth } from 'aws-amplify'
let region =  process.env.AMPLIFY_AUTH_REGION
let userPoolId = process.env.AMPLIFY_AUTH_USER_POOL_ID
let userPoolWebClientId = process.env.AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID
export default async () => {
  Amplify.configure({
    Auth: {
      "region": region,
      "userPoolId": userPoolId,
      "userPoolWebClientId": userPoolWebClientId
    }
  })
}