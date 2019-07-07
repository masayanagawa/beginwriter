import { Auth } from 'aws-amplify'
import AWSExports from './aws-exports'
export default async () => {
  Auth.configure(AWSExports)
}