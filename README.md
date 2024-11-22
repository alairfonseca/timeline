# Timeline Assignment

## setup and run
```shell
yarn #install
yarn dev #start
```

## testing
```shell
yarn test
```

## Questions
* How long you spent on the assignment.

Around 6 hours

I used the first ~1.5 hours to study and come up with a solution
~2.5 more hours creating the grid and events placing algorithm
and ~2 hours on the enhancements (drag and drop, title editing, tooltip for small events)


* What you like about your implementation.

I like the code organization, separation of responsibilities and clarity
I also believe this implementation has room to extend and add new features without much effort because of its flexibility

* What you would change if you were going to do it again.

I believe I would go with html canvas or simply use absolute positions controlling the events positions with `left` and `top` properties.
This way I would have more control over the grid


* How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.

During my search I found [this tool](https://demo.mobiscroll.com/fullscreen/timeline/month-view) and decided to use it as a reference


* How you would test this if you had more time.

I'd first setup vitest and testing library then in the tests I would use testing library's `fireEvent` object to simulate drag and drop, double click, hover etc
