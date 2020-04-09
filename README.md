# Tambola Ticket Generator

A barebones Node.js module to generate Tambola/Housie Tickets.

## Installing

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
npm install tambola --save
```

## Usage

```
import tambola from 'tambola';

let ticket = tambola.generateTicket(); // This generates a standard Tambola Ticket

/* [ [ 4, 0, 21, 31, 0, 0, 64, 71, 85 ],
    [ 0, 11, 0, 0, 0, 58, 70, 74, 0 ],
    [ 0, 0, 28, 40, 43, 59, 0, 0, 87 ] ] */

let sequence = tambola.getDrawSequence(); // This generates 90 Unique Random numbers between 1 & 90

```
