@ECHO OFF

REM Assumes UK style date format for date environment variable (DD/MM/YYYY).
REM Assumes times before 10:00:00 (10am) displayed padded with a space instead of a zero.
REM If first character of time is a space (less than 1) then set DATETIME to:
REM YYYY-MM-DD-0h-mm-ss
REM Otherwise, set DATETIME to:
REM YYYY-MM-DD-HH-mm-ss
REM Year, month, day format provides better filename sorting (otherwise, days grouped
REM together when sorted alphabetically).

IF "%time:~0,1%" LSS "1" (
   SET DATETIME=%date:~6,4%-%date:~3,2%-%date:~0,2%-0%time:~1,1%-%time:~3,2%-%time:~6,2%
) ELSE (
   SET DATETIME=%date:~6,4%-%date:~3,2%-%date:~0,2%-%time:~0,2%-%time:~3,2%-%time:~6,2%
)

ECHO Push any key to create stack on datetime : %DATETIME%

PAUSE

REM **we create the cloudformation template
aws cloudformation create-stack --stack-name aws-sqs-demo-stack-%DATETIME% --template-body file://aws.sqs.demo.cfn.yml --parameters file://parameters.json --profile default --region eu-west-3 --capabilities CAPABILITY_NAMED_IAM

PAUSE
