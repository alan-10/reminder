

export default function converterDates(dateNOW:  any){

  const [day, month, year] = dateNOW.split('/')
  
  return `${year}-${month}-${day}`;
  

}