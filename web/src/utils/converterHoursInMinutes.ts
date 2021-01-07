import { StringifyOptions } from "querystring";


export default function converterHoursInMinutes(time: string){
  const [newhour, minute ] = time.split(':').map(Number);

  const hourInMinute = (newhour * 60) + minute;

  return hourInMinute;
}