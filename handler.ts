import 'source-map-support/register';
import * as AWS from 'aws-sdk';

export interface Target {
  services: Service[]
}

export interface Service {
    cluster: string,
    service: string
    desiredCount: number
}

function updateService(ecs: AWS.ECS, params: AWS.ECS.UpdateServiceRequest): Promise<string> {
    return new Promise((resolve) => {
        ecs.updateService(params, function (err, data) {
            if (err) {
                console.log(err, err.stack); // An error occurred
                resolve(`${params.service} not updated`);
            } else {
                console.log(data); // Successful response
                resolve(`${params.service} updated => Desired count: ${params.desiredCount}`)
            }
        });
    })
}

export const stop = async (event: Target): Promise<string[]> => {
    const ecs = new AWS.ECS();
    const promises = new Array<Promise<any>>();
    console.log(event);
    event.services.forEach(target => {
            const params: AWS.ECS.UpdateServiceRequest = {
                cluster: target.cluster,
                service: target.service,
                desiredCount: 0
            };
            promises.push(updateService(ecs, params))
        }
    )
    return Promise.all(promises)
};

export const start = async (event: Target): Promise<string[]> => {
  const ecs = new AWS.ECS();
  const promises = new Array<Promise<any>>();

  event.services.forEach(target => {
        const params: AWS.ECS.UpdateServiceRequest = {
          cluster: target.cluster,
          service: target.service,
          desiredCount: target.desiredCount
        };
        promises.push(updateService(ecs, params))
      }
  )
  return Promise.all(promises)
};
