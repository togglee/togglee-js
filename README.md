# Togglee


## Motivation



## Installation

add it to your project using `npm install togglee --save` or `yarn add togglee`

## Usage



```js
    import Togglee from 'togglee';

    const url = "https://gist.githubusercontent.com/kanekotic/c469f99bef5a5c0634b4a94a4acd6546/raw/toggles"
    const refresh_rate_seconds = 5
    const default_values = {
        prop: {
        type: 'release',
        value: true,
        },
        prop2: {
            "type": "release",
            "value": true
        },
        prop3: {
            "type": "context",
            "conditions": [
            {
                "field": "username",
                "value": "user1",
                "operation": "eq"
            }
            ]
        }
    }
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
