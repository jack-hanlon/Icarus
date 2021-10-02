const toDate = (string_date) =>{
    
	tmp_year = string_date.slice(0,4)
	tmp_month = string_date.slice(4,6)
	tmp_day = string_date.slice(6,8)
	tmp_date = new Date(tmp_year, tmp_month, tmp_day)
	return tmp_date
	
}

const dataFormater = (raw_data) => {  
    const dates_arr = Object.keys(raw_data)
    const data_arr = Object.values(raw_data)

    data = []

    for(var i=0; i<dates_arr.length; i++){
    tmp_object = {}
	tmp_date = toDate(dates_arr[i])
    
    tmp_object.date=tmp_date
    //tmp_object.date=dates_arr[i]
    tmp_object.data=data_arr[i]
    data.push(tmp_object)
    //console.log(data)
    }
    return {
        data
    }
};

export default dataFormater
