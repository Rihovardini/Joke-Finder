export enum timeBoundaries {
  milisecondsInSecond = 1000,
  secondsInMinute = 60,
  minutesInHour = 60,
  hoursInDay = 24,
  daysInMonth = 31,
  daysInYear = 365
}

export enum times {
  seconds = timeBoundaries.milisecondsInSecond,
  minutes = (timeBoundaries.milisecondsInSecond * timeBoundaries.secondsInMinute),
  hours = (times.minutes* timeBoundaries.minutesInHour),
  days = (times.hours * timeBoundaries.hoursInDay)
}