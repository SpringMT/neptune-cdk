import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as neptune from '@aws-cdk/aws-neptune'
import { RemovalPolicy } from '@aws-cdk/core';

export class NeptuneCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpc = new ec2.Vpc(this, 'neptune-vpc', {
      subnetConfiguration: [
         {
           cidrMask: 24,
           name: 'application',
           subnetType: ec2.SubnetType.PUBLIC,
         },
         {
           cidrMask: 28,
           name: 'neptune',
           subnetType: ec2.SubnetType.PRIVATE,
         }
      ]
    })
    const ec2ToNeputune = new ec2.SecurityGroup(this, 'EC2 to Neptune',{
      vpc,
    })

    const neputuneGroup = new ec2.SecurityGroup(this, 'Neputune',{
      vpc,
    })
    neputuneGroup.addIngressRule(
      ec2ToNeputune,
      ec2.Port.tcp(8182),
      'allow ec2 connection'
    )

    const host = new ec2.BastionHostLinux(this, 'BastionHost', {
      vpc,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T2,
        ec2.InstanceSize.MICRO
      ),
      securityGroup: ec2ToNeputune,
      subnetSelection: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
    })
    host.instance.addUserData('yum -y update', 'yum install -y mysql jq java-1.8.0-devel wget')

    const cluster = new neptune.DatabaseCluster(this, 'NeptuneTest', {
      vpc,
      instanceType: neptune.InstanceType.R5_LARGE,
      securityGroups: [neputuneGroup],
      removalPolicy: cdk.RemovalPolicy.DESTROY // テスト用なので消す
    })
  }
}
