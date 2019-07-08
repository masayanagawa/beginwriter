import Amplify, { Auth } from 'aws-amplify'
export default async () => {
  Amplify.configure({
    Auth: {
      "region": 'ap-northeast-1',
      "userPoolId": 'ap-northeast-1_eGGJctmO3',
      "userPoolWebClientId": '7df08tmuii8o4lec0cpk752sin'
    }
  })
}