import React, { useEffect, useState } from 'react'

const Rdoctor = () => {
  // const [currDate, setCurrDate] = useState(new Date())
  // useEffect(() => {
  //   const intervalID = setInterval(() => {
  //     setCurrDate(new Date())
  //   }, 1000)
  //   return () => {
  //     clearInterval(intervalID)
  //   }
  // }, [])

  // const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  // const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' }
  // const formattedDate = currDate.toLocaleDateString(undefined, dateOptions).split('/').join(' / ')
  // const formattedTime = currDate.toLocaleTimeString(undefined, timeOptions).split(':').join(' : ')

  let tmpDate = new Date().toLocaleDateString()
  let dateParts = tmpDate.split('/')
  let date = `${dateParts[1]} / ${dateParts[0]} / ${dateParts[2]}`;
  let [currDate, setCurrDate] = useState(date)
  useEffect(() => {
    const intervalID = setInterval(() => {
      tmpDate = new Date().toLocaleDateString()
      dateParts = tmpDate.split('/')
      date = `${dateParts[1]} / ${dateParts[0]} / ${dateParts[2]}`;
      setCurrDate(date);
    }, 1000)
  })

  let tmpTime = new Date().toLocaleTimeString()
  let timeParts = tmpTime.split(':')
  let time = `${timeParts[1]} : ${timeParts[0]} : ${timeParts[2]}`;
  let [currTime, setCurrTime] = useState(time)
  useEffect(() => {
    const intervalID = setInterval(() => {
      tmpTime = new Date().toLocaleTimeString()
      timeParts = tmpTime.split(':')
      time = `${timeParts[0]} : ${timeParts[1]} : ${timeParts[2]}`;
      setCurrTime(time);
    }, 1000)
  })

  return (
    <div style={{fontFamily: "'Josefin Sans', sans-serif"}}>
      Date: {currDate},&ensp;&ensp;Time: {currTime}
    </div>
  )
}

export default Rdoctor
