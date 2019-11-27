- [InstanceProfile and role for cloudformation template](https://forums.aws.amazon.com/thread.jspa?messageID=911050)

- [nodejs-not-installed-successfully-in-aws-ec2-inside-user-data](https://stackoverflow.com/questions/54415841/nodejs-not-installed-successfully-in-aws-ec2-inside-user-data)


https://www.turnkeylinux.org/blog/shell-error-handling
https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash


Note: To allow run the 'aws s3 sync' command from the UserData section, you will also need to
1. Create an IAM policy to enable reading of objects from the S3 bucket
2. Create a Role to enable the EC2 instance to access the s3 bucket
3. Add the Role to the EC2 instance on Launch creation time
Steps on how to do this are available at the following Link: https://optimalbi.com/blog/2016/07/12/aws-tips-and-tricks-moving-files-from-s3-to-ec2-instance/


https://medium.com/@seb.nyberg/passing-tags-as-environment-variables-to-an-ec2-instance-12b64e69891e

https://stackoverflow.com/questions/54798083/how-to-access-the-aws-parameter-store-from-a-lambda-using-node-js-and-aws-sdk