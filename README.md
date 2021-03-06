Roll some dice
---

## Installation

1. `npm install hubot-rolldice --save`
2. Add a reference to `"hubot-rolldice"` in your external-scripts.json
3. Deploy/run your hubot

## How do things

A simple hubot script that listens for the following strings in chat

    @hubot roll
    @hubot roll 2d6

The script understands basic dice notation, with a few modifiers.

    d6
    d6 + 2
    4d6k3 - 1
    d4 + 2d12 + 3d3
    4d6dl2r1 + 8
    
You can also ask hubot to output the syntax for rolls

    @hubot roll syntax

## Issues/contributing

I'm open to contributions with pull requests. This is not a primary project for me in any way, so don't expect a lot of expedience on issues.

## License

This script has been released under the [MIT license](./LICENSE).