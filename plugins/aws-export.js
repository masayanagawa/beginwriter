Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    AWS_AMPLIFY_AUTH_REGION=`${process.env.AMPLIFY_AUTH_REGION}`,
    AWS_AMPLIFY_AUTH_USER_POOL_ID=`${process.env.AMPLIFY_AUTH_USER_POOL_ID}`,
    AWS_AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID=`${process.env.AMPLIFY_AUTH_USER_POOL_WEB_CLIENT_ID}`,
    AWS_AMPLIFY_AUTH_IDENTITY_POOL_ID=`${process.env.AMPLIFY_AUTH_IDENTITY_POOL_ID}`,
};
exports.default = config;