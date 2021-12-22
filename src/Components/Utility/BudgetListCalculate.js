import {display, propertyDisplayConvert} from './NumberConverter'

export const priceOptions = (min, max) => {
    let key = 0
    let arr = []
    while(parseInt(min) < max){
        if(key === 0){
            arr.push({ key, text: display(min), value: min })
        }
        key++
        if(parseInt(min) < 10000000){
            min = parseInt(min) + 500000
        } else if(min < 100000000){
            min = parseInt(min) + 2500000
        } else if (min < 1000000000){
            min =  parseInt(min) + 100000000
        }   
        arr.push({ key, text: display(min), value: min })
    }
    return arr
}

export const rentOptions = (min, max) => {
    let key = 0
    let arr = []
    while(parseInt(min) < max){
        if(key === 0){
            arr.push({ key, text: propertyDisplayConvert(min), value: min })
        }
        key++
        if(parseInt(min) < 10000){
            min = parseInt(min) + 1000
        } else if(min < 100000){
            min = parseInt(min) + 5000
        } else if (min < 500000){
            min =  parseInt(min) + 25000
        } else if (min < 1000000){
            min =  parseInt(min) + 100000
        }  
        arr.push({ key, text: propertyDisplayConvert(min), value: min })
    }
    return arr
}

export const areaOptions = (min, max) => {
    let key = 0
    let arr = []
    while(parseInt(min) < max){
        if(key === 0){
            arr.push({ key, text: min, value: min })
        }
        key++
        //min =  parseInt(min) + 100
        if(parseInt(min) < 4000){
            min = parseInt(min) + 100
        } else if(min < 6000){
            min = parseInt(min) + 250
        } else if (min < 10000){
            min =  parseInt(min) + 500
        }  
        arr.push({ key, text: min, value: min })
    }
    return arr
}