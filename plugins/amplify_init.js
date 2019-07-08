import Amplify, { Auth } from 'aws-amplify'
export default async () => {
  Amplify.configure({
    Auth: {
      "region": process.env.AMPLIFY_AUTH_REGION,
      "userPoolId": process.env.AMPLIFY_AUTH_USER_POOL_ID,
      "userPoolWebClientId": process.env.AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID
    }
  })
}