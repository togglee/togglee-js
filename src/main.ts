import { Togglee } from '../lib'

const url = "https://gist.githubusercontent.com/alvarolorentedev/c469f99bef5a5c0634b4a94a4acd6546/raw/toggles"
const refreshRateSeconds = 5
const defaultValues: any[] = [
    {
      type: "release",
      name: "prop",
      value: true,
    },
    {
      type: "release",
      name: "prop2",
      value: true
    },
    {
      type: "context",
      name: "prop3",
      conditions: [
        {
          field: "username",
          value: "user1",
          operation: "eq"
        }
      ]
    }
]

const subject = new Togglee(url, refreshRateSeconds, defaultValues)


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