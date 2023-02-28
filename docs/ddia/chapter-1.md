---
sidebar_position: 1
---

# Chapter 1: Foundations of Data Systems

Three main concerns that are important in modern applications:

- <b>Reliability</b> - The system should continue to work correctly in the face of adversity.

- <b>Scalability</b> - As the system grows, there should be ways to deal with the growth.

- <b>Maintainability</b> - Over time, many different people will work on the system and they should all be able to work on it productively.

:::info

Latency and response time are not the same.

**Response Time** - What the client sees: besides the actual time to process the request(service time), it includes network and queueing delays.

**Latency** - Duration that a request is waiting to be handled -during which it is latent,awaiting service.

:::

## Describing Performance

It is usually better to use percentiles and use median as the halfway point - half of the users are served in less than the median response time and the other half takes more than the median.

High percentiles of response time, also known as tail latencies, are important because they directly affect users' experience of the service.

:::note
Amazon describes response time requirements for internal services in terms of the 99.9th percentile, even though it only affects 1 in 1,000 requests. This is becausae the customers with the slowest requests are often those who have the most data on their accounts because they have made many purchases.
:::

**Head-of-Line blocking ** - It only takes a small number of requests to hold up the processing of subsequent requests.

## Approaches for coping with load

:::info
_Twitter Example_

**Post tweet**: a user can publish a new message to their followers (4.6k req/sec, over 12k req/sec peak)

**Home timeline**: a user can view tweets posted by the people they follow (300k req/sec)

Two ways of implementing those operations:

1. Posting a tweet simply inserts the new tweet into a global collection of tweets. When a user requests their home timeline, look up all the people they follow, find all the tweets for those users, and merge them (sorted by time). This could be done with a SQL JOIN.

2. Maintain a cache for each user's home timeline. When a user posts a tweet, look up all the people who follow that user, and insert the new tweet into each of their home timeline caches.

Approach 1, systems struggle to keep up with the load of home timeline queries. So the company switched to approach 2. The ** average rate of published tweets is almost two orders of magnitude lower than the rate of home timeline reads**.

Downside of approach 2 is that **posting a tweet now requires a lot of extra work**. Some users have over 30 million followers. A single tweet may result in over 30 million writes to home timelines.

Twitter moved to an hybrid of both approaches. Tweets continue to be fanned out to home timelines but a small number of users with a very large number of followers are fetched separately and merged with that user's home timeline when it is read, like in approach 1.
:::

- Scaling up or vertical scaling: Moving to a more powerful machine
- Scaling out or horizontal scaling: Distributing the load across multiple smaller machines.
- Elastic systems: Automatically add computing resources when detected load increase. Quite useful if load is unpredictable.

## Three Design Principles

** Operability ** - Make it easy for operations team to keep the system running smoothly.

** Simplicity ** - Make it easy for new engineers to understand the system by removing as much complexity as possible

** Evolvability ** - Make it easy for engineers to make changes to the system in the future, adapting for unanticipated use cases such as requirements change.

```

```
