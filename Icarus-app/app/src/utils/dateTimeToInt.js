const getMonth = (val) =>{
	if(val =='Jan'){
		return '01'
	}
    if(val =='Feb'){
		return '02'
	}
    if(val =='Mar'){
		return '03'
	}
    if(val =='Apr'){
		return '04'
	}
    if(val =='May'){
		return '05'
	}
    if(val =='Jun'){
		return '06'
	}
    if(val =='Jul'){
		return '07'
	}
    if(val =='Aug'){
		return '08'
	}
    if(val =='Sep'){
		return '09'
	}
    if(val =='Oct'){
		return '10'
	}
    if(val =='Nov'){
		return '11'
	}
    if(val =='Dec'){
		return '12'
	}	
}
const convertDate = (badDate, tempRes) => {
    const stringDateSplit = badDate.toString().split(" ")
    const year = stringDateSplit[3]
    const month = getMonth(stringDateSplit[1])
    const day = stringDateSplit[2]
    const date = year+month+day
    //console.log(date)
    if(tempRes ==='daily'){
        
        return date
    }
    else{
        return year;
    }
        
}
// const month = dummyDate.toString().slice(4,7)
// const day = dummyDate.toString().slice(8,10)
// const year = dummyDate.toString().slice(11,15)
// console.log(dummyDate.toString())
// console.log(day)
// console.log(month)
// console.log(year)
// const intMonth =getMonth(month)
// console.log(intMonth)

// const newDate = year+intMonth+day
// console.log(typeOf newDate)

export default convertDate;