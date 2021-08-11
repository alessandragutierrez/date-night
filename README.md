# Date Night

A web application to plan and document date nights.

![Aug-10-2021 20-57-25](https://user-images.githubusercontent.com/82188718/128967383-c6404ac2-c918-4561-9b09-d1469b5e6401.gif)


## Motive

The intention behind Date Night was rather simple... my bullet point list of ideas in my Apple Notes was just not cutting it anymore. I thought to myself, "How can I build an application that takes this list, and turns it into something comprehensive and long-lasting?", and in came the objective for Date Night! 

Date Night allows the user to not only create ideas for dates, but also helps make them a reality by including functionality to set a time and place. Consequently, the dates are saved and stored, giving the user a convenient space to cherish their memories. 

My hope for Date Night is that it can, through the power and practicality of this digital age, help bring people together more even amid the busy lives many of us lead. 


## Live Demo

[Click here to check out the live deployment of Date Night!](https://date-night-ag.herokuapp.com/#)

## Technologies Used

- __React.js__
- __Node.js__
- __Express.js__
- __PostgreSQL__
- __Pgweb__
- __Webpack__
- __Babel__
- __CSS3__
- __Google Places API__

## Features

#### Current Features

  - User can create a date night idea.
  - User can search a location for an idea.
  - User can view a list of ideas.
  - User can edit an idea.
  - User can delete an idea.
  - User can set a calendar date for an idea.
  - User can view a list of upcoming dates.
  - User can view a list of past dates.

#### Potential Stretch Feature(s)

  - User can view all past dates on a map.
  - User can 'invite' another user on a date.

## Getting Started

1. Clone the repository.
```bash
git clone git@github.com:alessandragutierrez/date-night.git
cd date-night
```
2. Install all dependencies with NPM.
```bash
npm install
```
3. Import the example database to PostgreSQL.
```bash
npm run db:import
```
4. Start the project. Once started you can view the application by opening [http://localhost:3000](http://0.0.0.0:3000/#) in your browser.
```bash
npm run dev
```

