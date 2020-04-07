# tambola

A barebones Node.js module to generate Tambola/Housie Tickets.

## Installing

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
npm install tambola --save
```

## Usage

```
import tambola from 'tambola';

let tickets = tambola.generateTickets(5); // This generates 5 Tickets and returns as Array

/*[ [ [ 4, 0, 21, 31, 0, 0, 64, 71, 85 ],
    [ 0, 11, 0, 0, 0, 58, 70, 74, 0 ],
    [ 0, 0, 28, 40, 43, 59, 0, 0, 87 ] ],
  [ [ 0, 0, 26, 33, 46, 52, 66, 73, 0 ],
    [ 6, 0, 0, 39, 49, 0, 67, 0, 82 ],
    [ 0, 14, 28, 0, 0, 59, 0, 74, 0 ] ],
  [ [ 9, 11, 29, 37, 0, 0, 0, 74, 84 ],
    [ 10, 18, 0, 0, 45, 54, 64, 0, 88 ],
    [ 0, 0, 0, 39, 49, 59, 0, 0, 0 ] ],
  [ [ 3, 12, 28, 0, 0, 51, 0, 0, 89 ],
    [ 0, 20, 0, 39, 47, 0, 0, 79, 0 ],
    [ 6, 0, 29, 0, 49, 54, 68, 80, 0 ] ],
  [ [ 5, 0, 0, 0, 47, 0, 69, 0, 88 ],
    [ 6, 12, 0, 32, 0, 53, 70, 76, 0 ],
    [ 0, 19, 24, 38, 50, 0, 0, 78, 0 ] ] ]*/

let tickets = tambola.getDrawSequence(); // This generates 90 Unique Random numbers between 1 & 90

```
