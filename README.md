# ![LogoMakr_4ojFPZ](https://user-images.githubusercontent.com/3071208/90978825-2b93de00-e540-11ea-8e0d-60267e95fec8.png)

![Build & Publish](https://github.com/togglee/togglee-js/workflows/Build%20&%20Publish/badge.svg?branch=master)
[![codecov](https://codecov.io/gh/togglee/togglee-js/branch/master/graph/badge.svg)](https://codecov.io/gh/togglee/togglee-js)
[![npm](https://img.shields.io/npm/dt/togglee.svg)](https://github.com/togglee/togglee-js)
[![GitHub license](https://img.shields.io/github/license/togglee/togglee-js.svg)](https://github.com/togglee/togglee-js/blob/master/LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/togglee/togglee-js/graphs/commit-activity)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/kanekotic/)

## Motivation

Simple library to separate deployment of features from release time. It uses network accesible files without the need of a server to provide feature toggles.


## Type of toggles


### Release

Simple true/false logical path definition.
```js
{
    type: 'release',
    value: true,
}
```
### Context

Allows complex logic to decide the outcome of the logical path (example traffic, users, resources available). 
```js
{
    "type": "context",
    "conditions": [
        {
            "field": "username",
            "value": "user1",
            "operation": "eq"
        }
    ]
}
```
available operations are:
* 'eq': equal (===)
* 'ne': not equal (!==)
* 'gt': greater than (>)
* 'ge': greater equal (>=)
* 'lt': lesser than (<)
* 'le': lesser qqual (<=)



## Installation

add it to your project using `npm install togglee --save` or `yarn add togglee`

## Usage



```js
    import pkg from 'togglee';
    const {Togglee} = pkg;

    const url = "https://gist.githubusercontent.com/kanekotic/c469f99bef5a5c0634b4a94a4acd6546/raw/toggles"
    const refresh_rate_seconds = 5
    const default_values = [
        {
        type: 'release',
        value: true,
        },
        {
        "type": "release",
        "value": true
        },
        {
        "type": "context",
        "conditions": [
            {
            "field": "username",
            "value": "user1",
            "operation": "eq"
            }
        ]
        }
    ]
    const subject = new Togglee(url, refresh_rate_seconds, default_values)


    setInterval(() => {
        if (subject.isEnabled("prop"))
            console.log("do stuff")
        else
            console.log("dont do stuff")
        if (subject.isEnabled("prop3", {"username": "user1"}))
            console.log("do stuff for user 1")
        else
            console.log("dont do stuff for user 1")
        if (subject.isEnabled("prop3", {"username": "user2"}))
            console.log("do stuff for user 2")
        else
            console.log("dont do stuff for user 2")
            
        console.log("-----------")
    }, 10000);
```
