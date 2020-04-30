# AWS Node Scheduled to update ECS service

These functions run as a cron job using  `schedule` event to update  the desiredCount value of each ECS service. 
For more information on `schedule` event check out the Serverless docs on [schedule](https://serverless.com/framework/docs/providers/aws/events/schedule/).

## Use Case

Common use is stop and start FRAGATE tasks to optimize costs.

Eg: _all tasks in the Test environment stop at 6 PM and start again at 9 AM._

## Cron syntax

    cron(Minutes Hours Day-of-month Month Day-of-week Year)
   
    
## Configuration

To specify the services that will be updated, it is necessary to edit the `targets.yml` file, which is the Input of each scheduled event.

```
services:
  - cluster: test-cluster
    service: service1
    desiredCount: 1
  - cluster: test-cluster
    service: service2
    desiredCount: 1
```

## Deploy

In order to deploy simply run

    sls deploy
