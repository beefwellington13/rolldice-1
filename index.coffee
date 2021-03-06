# Description:
#   Roll some custom dice, supports multiple rolls, multiple dice, constants
#   and certain roll modifiers, such as "[k]eep x highest rolls & reroll rest"
#
# Dependencies:
#   none
#
# Configuration
#   none
#
# Commands:
#   hubot roll - roll 1d6
#   hubot roll [dice] - roll some dice, e.g. 3d10k1+d6-3
#   hubot roll syntax - list the syntax
#
# Notes:
#   All dice rolling is performed entirely in-process. No external calls are needed.
#
# Tags:
#   dice
#
# Examples:
#   hubot roll
#   hubot roll 2d6 for damage
#   hubot roll 8d6kh3 + 2d8 - 2
#   hubot roll 2d20kl1 for disadvantage on attack
#   hubot roll syntax
#
# Author:
#   mentalspike

Dice = require('./src/index')

module.exports = (robot) ->
  robot.respond /roll$/i, (res) ->
    roll = new Dice 'd6'
    res.reply roll.toString()
  robot.respond /roll\s+(.+)/i, (res) ->
    roll = new Dice res.match[1]
    res.reply roll.toString()