# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Setup
https://docs.aws.amazon.com/ja_jp/neptune/latest/userguide/access-graph-gremlin-console.html


## はまりポイント
### NeptuneはISOLATEDなネットワークにはおけない
https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/aws-neptune/lib/cluster.ts#L422
このあたり？

### 