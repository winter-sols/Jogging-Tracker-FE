var hour=0,
      min=0,
      sec=0,
      durationMin=0;
      

export default(duration)=>{
    console.log(duration)
    if(duration>=3600){
        hour=Math.floor(duration/3600);
        durationMin = duration%3600;
        if(durationMin>=60){
            min=Math.floor(durationMin/60);
            sec=durationMin%60;            
        }else{
                sec=durationMin

        }
    }else{
        hour=0;
        if(duration>=60){
            min=Math.floor(duration/60);
            sec=duration%60;            
        }else{
            sec=duration;
        }
    }
    console.log(hour,min,sec)
    return {hour, min, sec}
}

