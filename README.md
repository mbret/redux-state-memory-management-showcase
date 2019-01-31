# redux-state-memory-management-showcase

This repository is a showcase of different strategy and implementation to help you deal with redux state memory impact. Most of the time, the strategies try to deal with a forever growing state which is a symptom in many apps.

A common example of growing state that might leads to memory leak or high consumption is an application that shows a list of scrollable items. Every time the user scroll down to display more items they are loaded into the state. Without any specific cleaning strategy and considering the user uses the application for a long time the state might keep growing and always load new items.

## **Disclaimer !!**
Although the problem presented here are common. **You probably don't need** to optimize to that point. In most case the memory leak is so small that it does not really matter. Also it's important to note that the users is not likely to run your application for month without restarting it or being forced to.

Therefore **before jumping into possible premature optimization, make sure you really need to have that control over your state** and if the time spending into implementing a cleaning strategy is worth it.

# Context and strategies
Every strategy is implemented in a different app with its own store, reducers, middleware etc. Every app use the same (fake) api that return more than a thousand of entities.

A global web page that features all the apps is available at [https://mbret.github.io/redux-state-memory-management-showcase/](https://mbret.github.io/redux-state-memory-management-showcase/) to help you visualize and understand all the different approach. 

- [Strategy on release](https://github.com/mbret/redux-state-memory-management-showcase/tree/master/src/app-on-release) (Clean the entities from the state as soon as no one is using them anymore)
- [Strategy on timeout](https://github.com/mbret/redux-state-memory-management-showcase/tree/master/src/app-on-timeout) (Clean the entities from the state as soon as no one is using it and after a timeout)
- [Strategy on threshold](https://github.com/mbret/redux-state-memory-management-showcase/tree/master/src/app-on-threshold) (Clean the entities from the state as soon as no one is using it and the threshold is full)


# Getting started
If you want to run the project locally just run:

`npm install && npm start`

# Contributing
PR are welcome